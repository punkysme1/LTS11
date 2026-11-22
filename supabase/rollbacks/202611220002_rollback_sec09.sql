-- =============================================================================
-- ROLLBACK SEC-09 (DARURAT SAJA)
-- Memulihkan signature 3-parameter record_turots_site_visitor & statistik lama.
-- =============================================================================

BEGIN;
SET LOCAL lock_timeout = '15s';

DROP FUNCTION IF EXISTS public.record_turots_site_visitor(uuid);

CREATE OR REPLACE FUNCTION public.record_turots_site_visitor(
  p_visitor_id uuid,
  p_country_code text DEFAULT NULL,
  p_country_name text DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_headers jsonb;
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

  v_header_code := upper(trim(coalesce(
    v_headers->>'cf-ipcountry',
    v_headers->>'x-vercel-ip-country',
    v_headers->>'x-country-code',
    ''
  )));

  IF v_header_code ~ '^[A-Z]{2}$' AND v_header_code NOT IN ('XX', 'T1') THEN
    v_code := v_header_code;
  ELSIF upper(trim(coalesce(p_country_code, ''))) ~ '^[A-Z]{2}$' THEN
    v_code := upper(trim(p_country_code));
  ELSE
    v_code := 'ID';
  END IF;

  v_name := nullif(trim(coalesce(p_country_name, '')), '');
  IF v_name IS NULL THEN
    v_name := v_code;
  END IF;

  INSERT INTO public.turots_site_visitors (visitor_id, country_code, country_name, first_seen_at, last_seen_at, visit_count)
  VALUES (p_visitor_id, v_code, v_name, now(), now(), 1)
  ON CONFLICT (visitor_id) DO UPDATE SET
    country_code = excluded.country_code,
    country_name = excluded.country_name,
    last_seen_at = now(),
    visit_count = public.turots_site_visitors.visit_count + 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_turots_visitor_stats()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH totals AS (
    SELECT count(*)::bigint AS total_visitors FROM public.turots_site_visitors
  ),
  top_countries AS (
    SELECT country_code, max(country_name) AS country_name, count(*)::bigint AS visitors
    FROM public.turots_site_visitors
    GROUP BY country_code
    ORDER BY count(*) DESC, max(country_name) ASC
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

GRANT EXECUTE ON FUNCTION public.record_turots_site_visitor(uuid, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_turots_visitor_stats() TO anon, authenticated;

DROP FUNCTION IF EXISTS public.turots_country_name(text);

DO $$
DECLARE
  c record;
BEGIN
  IF to_regclass('public.turots_public_rate_events') IS NOT NULL THEN
    DELETE FROM public.turots_public_rate_events WHERE event_type = 'visitor';
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
      CHECK (event_type IN ('guestbook', 'view'));
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
COMMIT;
