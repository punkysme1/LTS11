-- =============================================================================
-- SEC-09: Turots Site Visitor Hardening
-- 1. Menghapus input bebas p_country_code / p_country_name dari anon pada
--    record_turots_site_visitor agar statistik tidak dapat di-deface.
-- 2. Memetakan negara murni dari header proxy server (cf-ipcountry /
--    x-vercel-ip-country) + fungsi IMMUTABLE turots_country_name().
-- 3. Menambahkan rate-limit per IP hash (maks 30 request/jam) di
--    turots_public_rate_events.
-- =============================================================================

BEGIN;
SET LOCAL lock_timeout = '15s';
SET LOCAL statement_timeout = '120s';

CREATE TABLE IF NOT EXISTS public.turots_site_visitors (
  visitor_id uuid PRIMARY KEY,
  country_code text NOT NULL DEFAULT 'ID',
  country_name text NOT NULL DEFAULT 'Indonesia',
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  visit_count integer NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS turots_site_visitors_country_idx
  ON public.turots_site_visitors (country_code, country_name);

ALTER TABLE public.turots_site_visitors ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.turots_public_rate_events (
  ip_hash text NOT NULL,
  event_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.turots_public_rate_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.turots_public_rate_events FROM PUBLIC, anon, authenticated;
CREATE INDEX IF NOT EXISTS turots_public_rate_events_lookup_idx
  ON public.turots_public_rate_events (ip_hash, event_type, created_at DESC);

-- Perluas constraint event_type agar menerima 'visitor'
DO $$
DECLARE
  c record;
BEGIN
  FOR c IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.turots_public_rate_events'::regclass
      AND contype = 'c'
      AND pg_get_constraintdef(oid) LIKE '%event_type%'
  LOOP
    EXECUTE format('ALTER TABLE public.turots_public_rate_events DROP CONSTRAINT %I', c.conname);
  END LOOP;
  ALTER TABLE public.turots_public_rate_events
    ADD CONSTRAINT turots_public_rate_events_event_type_check
    CHECK (event_type IN ('guestbook', 'view', 'visitor'));
END $$;

CREATE OR REPLACE FUNCTION public.turots_country_name(p_code text)
RETURNS text
LANGUAGE sql
IMMUTABLE
STRICT
PARALLEL SAFE
SET search_path = ''
AS $$
  SELECT CASE upper(btrim(p_code))
    WHEN 'ID' THEN 'Indonesia'
    WHEN 'MY' THEN 'Malaysia'
    WHEN 'SG' THEN 'Singapura'
    WHEN 'SA' THEN 'Arab Saudi'
    WHEN 'EG' THEN 'Mesir'
    WHEN 'GB' THEN 'Inggris Raya'
    WHEN 'US' THEN 'Amerika Serikat'
    WHEN 'NL' THEN 'Belanda'
    WHEN 'DE' THEN 'Jerman'
    WHEN 'JP' THEN 'Jepang'
    WHEN 'AU' THEN 'Australia'
    WHEN 'FR' THEN 'Prancis'
    WHEN 'TR' THEN 'Turki'
    WHEN 'AE' THEN 'Uni Emirat Arab'
    WHEN 'QA' THEN 'Qatar'
    WHEN 'BN' THEN 'Brunei Darussalam'
    WHEN 'TH' THEN 'Thailand'
    WHEN 'PH' THEN 'Filipina'
    WHEN 'IN' THEN 'India'
    WHEN 'PK' THEN 'Pakistan'
    WHEN 'MA' THEN 'Maroko'
    WHEN 'JO' THEN 'Yordania'
    WHEN 'YE' THEN 'Yaman'
    WHEN 'CN' THEN 'Tiongkok'
    WHEN 'KR' THEN 'Korea Selatan'
    WHEN 'CA' THEN 'Kanada'
    WHEN 'NZ' THEN 'Selandia Baru'
    WHEN 'IT' THEN 'Italia'
    WHEN 'ES' THEN 'Spanyol'
    WHEN 'RU' THEN 'Rusia'
    WHEN 'BR' THEN 'Brasil'
    WHEN 'KW' THEN 'Kuwait'
    WHEN 'OM' THEN 'Oman'
    WHEN 'BH' THEN 'Bahrain'
    ELSE CASE WHEN upper(btrim(p_code)) ~ '^[A-Z]{2}$' THEN upper(btrim(p_code)) ELSE 'Indonesia' END
  END;
$$;

REVOKE ALL ON FUNCTION public.turots_country_name(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.turots_country_name(text) TO anon, authenticated;

-- Hapus overload lama 3-argumen yang menerima p_country_code/p_country_name bebas dari anon
DROP FUNCTION IF EXISTS public.record_turots_site_visitor(uuid, text, text);

CREATE OR REPLACE FUNCTION public.record_turots_site_visitor(
  p_visitor_id uuid
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_headers jsonb;
  v_client_ip text;
  v_client_hash text;
  v_event_count integer;
  v_header_code text;
  v_code text;
  v_name text;
BEGIN
  IF p_visitor_id IS NULL THEN
    RETURN;
  END IF;

  BEGIN
    v_headers := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  EXCEPTION WHEN OTHERS THEN
    v_headers := '{}'::jsonb;
  END;

  -- Rate-limit per IP hash: maks 30 kali per jam
  v_client_ip := nullif(btrim(coalesce(
    v_headers->>'cf-connecting-ip',
    split_part(coalesce(v_headers->>'x-forwarded-for', ''), ',', 1),
    ''
  )), '');

  IF v_client_ip IS NOT NULL THEN
    v_client_hash := encode(pg_catalog.sha256(pg_catalog.convert_to(v_client_ip, 'UTF8')), 'hex');
    PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext('visitor:' || v_client_hash));
    DELETE FROM public.turots_public_rate_events WHERE created_at < now() - interval '24 hours';
    SELECT count(*) INTO v_event_count
      FROM public.turots_public_rate_events e
     WHERE e.ip_hash = v_client_hash
       AND e.event_type = 'visitor'
       AND e.created_at > now() - interval '1 hour';
    IF v_event_count >= 30 THEN
      RETURN;
    END IF;
    INSERT INTO public.turots_public_rate_events(ip_hash, event_type) VALUES (v_client_hash, 'visitor');
  END IF;

  v_header_code := upper(btrim(coalesce(
    v_headers->>'cf-ipcountry',
    v_headers->>'x-vercel-ip-country',
    ''
  )));

  IF v_header_code ~ '^[A-Z]{2}$' AND v_header_code NOT IN ('XX', 'T1') THEN
    v_code := v_header_code;
  ELSE
    v_code := 'ID';
  END IF;

  v_name := public.turots_country_name(v_code);

  INSERT INTO public.turots_site_visitors (visitor_id, country_code, country_name, first_seen_at, last_seen_at, visit_count)
  VALUES (p_visitor_id, v_code, v_name, now(), now(), 1)
  ON CONFLICT (visitor_id) DO UPDATE SET
    country_code = excluded.country_code,
    country_name = excluded.country_name,
    last_seen_at = now(),
    visit_count = public.turots_site_visitors.visit_count + 1;
END;
$$;

-- Bersihkan seluruh entri historis yang mungkin telah dimanipulasi sebelumnya
UPDATE public.turots_site_visitors
   SET country_code = CASE
         WHEN upper(btrim(country_code)) ~ '^[A-Z]{2}$' AND upper(btrim(country_code)) NOT IN ('XX', 'T1')
           THEN upper(btrim(country_code))
         ELSE 'ID'
       END,
       country_name = public.turots_country_name(
         CASE
           WHEN upper(btrim(country_code)) ~ '^[A-Z]{2}$' AND upper(btrim(country_code)) NOT IN ('XX', 'T1')
             THEN upper(btrim(country_code))
           ELSE 'ID'
         END
       )
 WHERE country_name IS DISTINCT FROM public.turots_country_name(
         CASE
           WHEN upper(btrim(country_code)) ~ '^[A-Z]{2}$' AND upper(btrim(country_code)) NOT IN ('XX', 'T1')
             THEN upper(btrim(country_code))
           ELSE 'ID'
         END
       )
    OR country_code !~ '^[A-Z]{2}$'
    OR country_code IN ('XX', 'T1');

CREATE OR REPLACE FUNCTION public.get_turots_visitor_stats()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH totals AS (
    SELECT count(*)::bigint AS total_visitors
    FROM public.turots_site_visitors
  ),
  top_countries AS (
    SELECT
      country_code,
      public.turots_country_name(country_code) AS country_name,
      count(*)::bigint AS visitors
    FROM public.turots_site_visitors
    GROUP BY country_code
    ORDER BY count(*) DESC, public.turots_country_name(country_code) ASC
    LIMIT 4
  )
  SELECT jsonb_build_object(
    'total_visitors', coalesce((SELECT total_visitors FROM totals), 0),
    'countries', coalesce(
      (SELECT jsonb_agg(jsonb_build_object(
        'country_code', country_code,
        'country_name', country_name,
        'visitors', visitors
      ) ORDER BY visitors DESC, country_name ASC) FROM top_countries),
      '[]'::jsonb
    )
  );
$$;

REVOKE ALL ON FUNCTION public.record_turots_site_visitor(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.record_turots_site_visitor(uuid) TO anon, authenticated;
REVOKE ALL ON FUNCTION public.get_turots_visitor_stats() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_turots_visitor_stats() TO anon, authenticated;

NOTIFY pgrst, 'reload schema';
COMMIT;
