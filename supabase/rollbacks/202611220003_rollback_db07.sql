-- =============================================================================
-- ROLLBACK DB-07 (DARURAT SAJA)
-- Memulihkan public.apply_turots_title_metadata_v2(jsonb) ke definisi 202611160001.
-- Catatan: Judul yang sempat diarsipkan (archived_at IS NOT NULL) tetap aman
-- di database dan dapat di-restore manual bila diperlukan.
-- =============================================================================

BEGIN;
SET LOCAL lock_timeout = '15s';

CREATE OR REPLACE FUNCTION public.apply_turots_title_metadata_v2(p_operations jsonb) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  op jsonb;
  vals jsonb;
  changes jsonb;
  before_row jsonb;
  bid uuid;
  uid uuid;
  k text;
  cols text;
  pair jsonb;
  completed text[] := array[]::text[];
  expected jsonb;
  actual jsonb;
  allowed text[];
  v_kind text;
  v_auto_replace_bids uuid[] := array[]::uuid[];
BEGIN
  IF (auth.uid() IS NULL OR NOT EXISTS (SELECT 1 FROM public.turots_admins WHERE user_id = auth.uid()))
     AND session_user NOT IN ('nawra_app', 'postgres', 'supabase_admin') THEN
    RAISE EXCEPTION 'Akses hanya untuk admin Turots.' USING ERRCODE = '42501';
  END IF;
  IF jsonb_typeof(p_operations) IS DISTINCT FROM 'array' OR jsonb_array_length(p_operations) > 5000 THEN
    RAISE EXCEPTION 'Format operasi tidak valid.';
  END IF;

  PERFORM pg_advisory_xact_lock(13112026, 1);

  allowed := array[
    'title_original','title_latin','title_curatorial','category_primary','category_secondary','category_tertiary',
    'page_ranges_label','description','author','scribe','year_original','year_masehi','copying_location',
    'manuscript_origin','language','script','cover','cover_size','binding','paper_size','dimensions',
    'watermark','countermark','ink','total_pages','blank_pages','lines_per_page','rubrication','illumination',
    'illustration','marginal_notes','meaning_notes','colophon','marginal_note','physical_condition',
    'readability','completeness','notes','keywords','glossary','references_text','related_manuscripts',
    'related_persons','paper_type','metadata_status'
  ];

  FOR op IN SELECT value FROM jsonb_array_elements(p_operations) LOOP
    IF op->>'sheet' IS DISTINCT FROM 'Judul' OR jsonb_array_length(coalesce(op->'photos', '[]')) > 0 THEN
      RAISE EXCEPTION 'Impor hanya metadata judul, bukan bendel atau foto.';
    END IF;
    bid := public.resolve_turots_bundle_id(op->>'code');
    IF bid IS NULL THEN
      RAISE EXCEPTION 'Bendel tidak ditemukan.';
    END IF;
    PERFORM 1 FROM public.turots_bundles WHERE id = bid FOR UPDATE;
    PERFORM 1 FROM public.turots_pages WHERE bundle_id = bid FOR UPDATE;

    v_kind := coalesce(op->>'kind', '');
    uid := nullif(op->>'id', '')::uuid;

    IF v_kind = 'delete' THEN
      IF uid IS NULL THEN
        RAISE EXCEPTION 'ID judul lama wajib ada untuk penghapusan.';
      END IF;
      PERFORM 1 FROM public.turots_text_units u WHERE u.id = uid AND u.bundle_id = bid;
    ELSE
      vals := coalesce(op->'values', '{}');
      FOR k IN SELECT jsonb_object_keys(vals) LOOP
        IF NOT k = ANY(allowed) THEN
          RAISE EXCEPTION 'Kolom % tidak dapat diubah melalui metadata.', k;
        END IF;
      END LOOP;

      IF uid IS NOT NULL THEN
        SELECT to_jsonb(u) INTO before_row FROM public.turots_text_units u WHERE id = uid AND bundle_id = bid AND archived_at IS NULL FOR UPDATE;
        IF before_row IS NULL THEN
          RAISE EXCEPTION 'UUID judul tidak ditemukan pada bendel ini.';
        END IF;
        FOR k IN SELECT jsonb_object_keys(vals) LOOP
          SELECT value INTO changes FROM jsonb_array_elements(coalesce(op->'changes', '[]')) WHERE value->>'field' = k;
          IF changes IS NULL OR before_row->k IS DISTINCT FROM changes->'before' THEN
            RAISE EXCEPTION 'Data % berubah sejak pratinjau. Muat ulang.', k USING ERRCODE = '40001';
          END IF;
        END LOOP;
        IF op->'folios' IS NOT NULL AND op->'folios' <> 'null'::jsonb THEN
          expected := op->'expected_pages';
          SELECT coalesce(jsonb_agg(page_order ORDER BY page_order), '[]') INTO actual FROM public.turots_pages WHERE text_unit_id = uid AND bundle_id = bid;
          IF expected IS NULL OR expected IS DISTINCT FROM actual THEN
            RAISE EXCEPTION 'Pemetaan halaman berubah sejak pratinjau. Muat ulang.' USING ERRCODE = '40001';
          END IF;
        END IF;
      ELSE
        IF nullif(btrim(vals->>'title_original'), '') IS NULL OR public.turots_category_code(vals->>'category_primary') IS NULL THEN
          RAISE EXCEPTION 'Judul asli dan kategori wajib diisi.';
        END IF;
        IF coalesce(op->>'key', '') ~ '^baru-[0-9]+$' AND NOT (bid = ANY(v_auto_replace_bids)) THEN
          IF NOT EXISTS (
            SELECT 1 FROM jsonb_array_elements(p_operations) elem
            WHERE public.resolve_turots_bundle_id(elem->>'code') = bid
              AND (nullif(elem->>'id', '') IS NOT NULL OR coalesce(elem->>'kind', '') = 'delete')
          ) THEN
            v_auto_replace_bids := array_append(v_auto_replace_bids, bid);
          END IF;
        END IF;
      END IF;
    END IF;
  END LOOP;

  PERFORM set_config('turots.defer_numbering', 'on', true);

  IF array_length(v_auto_replace_bids, 1) > 0 THEN
    UPDATE public.turots_pages SET text_unit_id = NULL WHERE bundle_id = ANY(v_auto_replace_bids);
    DELETE FROM public.turots_text_units WHERE bundle_id = ANY(v_auto_replace_bids) AND archived_at IS NULL;
  END IF;

  FOR op IN SELECT value FROM jsonb_array_elements(p_operations) LOOP
    v_kind := coalesce(op->>'kind', '');
    uid := nullif(op->>'id', '')::uuid;
    bid := public.resolve_turots_bundle_id(op->>'code');
    IF v_kind = 'delete' AND uid IS NOT NULL THEN
      UPDATE public.turots_pages SET text_unit_id = NULL WHERE text_unit_id = uid AND bundle_id = bid;
      DELETE FROM public.turots_text_units WHERE id = uid AND bundle_id = bid;
    ELSIF uid IS NOT NULL AND op->'folios' IS NOT NULL AND op->'folios' <> 'null'::jsonb THEN
      UPDATE public.turots_pages SET text_unit_id = NULL WHERE text_unit_id = uid;
    END IF;
  END LOOP;

  FOR op IN SELECT value FROM jsonb_array_elements(p_operations) LOOP
    v_kind := coalesce(op->>'kind', '');
    bid := public.resolve_turots_bundle_id(op->>'code');
    uid := nullif(op->>'id', '')::uuid;
    vals := coalesce(op->'values', '{}');

    IF v_kind = 'delete' THEN
      completed := array_append(completed, 'Hapus Judul ' || coalesce(op->>'key', uid::text));
      CONTINUE;
    END IF;

    IF uid IS NULL THEN
      uid := gen_random_uuid();
      vals := vals || jsonb_build_object(
        'id', uid,
        'bundle_id', bid,
        'display_id', 'pending:' || uid::text,
        'sequence_no', (SELECT coalesce(max(sequence_no), 0) + 1 FROM public.turots_text_units WHERE bundle_id = bid)
      );
      SELECT string_agg(format('%I', key), ',' ORDER BY key) INTO cols FROM jsonb_object_keys(vals) keys(key);
      EXECUTE format('INSERT INTO public.turots_text_units(%s) SELECT %s FROM jsonb_populate_record(null::public.turots_text_units, $1)', cols, cols) USING vals;
    ELSIF vals <> '{}'::jsonb THEN
      vals := vals || jsonb_build_object('updated_at', now());
      SELECT string_agg(format('%I', key), ',' ORDER BY key) INTO cols FROM jsonb_object_keys(vals) keys(key);
      EXECUTE format('UPDATE public.turots_text_units SET (%s) = (SELECT %s FROM jsonb_populate_record(null::public.turots_text_units, $1)) WHERE id = $2', cols, cols) USING vals, uid;
    END IF;

    IF op->'folios' IS NOT NULL AND op->'folios' <> 'null'::jsonb THEN
      IF NOT coalesce((op->'folios'->>'clear')::boolean, false) THEN
        IF jsonb_typeof(op->'folios'->'ranges') IS DISTINCT FROM 'array' THEN
          RAISE EXCEPTION 'Rentang halaman harus berupa daftar.';
        END IF;
        FOR pair IN SELECT value FROM jsonb_array_elements(op->'folios'->'ranges') LOOP
          IF jsonb_array_length(pair) <> 2 OR (pair->>0)::integer < 1 OR (pair->>1)::integer < (pair->>0)::integer THEN
            RAISE EXCEPTION 'Rentang halaman tidak valid.';
          END IF;
          IF NOT EXISTS (SELECT 1 FROM public.turots_pages WHERE bundle_id = bid AND page_order = (pair->>0)::integer)
             OR NOT EXISTS (SELECT 1 FROM public.turots_pages WHERE bundle_id = bid AND page_order = (pair->>1)::integer) THEN
            RAISE EXCEPTION 'Batas rentang halaman tidak ditemukan.';
          END IF;
          IF EXISTS (
            SELECT 1 FROM public.turots_pages
            WHERE bundle_id = bid AND page_order BETWEEN (pair->>0)::integer AND (pair->>1)::integer AND text_unit_id IS NOT NULL
          ) THEN
            RAISE EXCEPTION 'Halaman telah dipakai judul lain atau rentang saling bertumpang tindih.';
          END IF;
          UPDATE public.turots_pages
          SET text_unit_id = uid
          WHERE bundle_id = bid AND page_order BETWEEN (pair->>0)::integer AND (pair->>1)::integer;
        END LOOP;
      END IF;
    END IF;

    completed := array_append(completed, 'Judul ' || coalesce(op->>'key', uid::text));
  END LOOP;

  PERFORM set_config('turots.defer_numbering', 'off', true);
  PERFORM public.turots_renumber_titles();
  RETURN jsonb_build_object('completed', to_jsonb(completed));
END $$;

REVOKE ALL ON FUNCTION public.apply_turots_title_metadata_v2(jsonb) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.apply_turots_title_metadata_v2(jsonb) TO authenticated;
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'nawra_app') THEN
    GRANT EXECUTE ON FUNCTION public.apply_turots_title_metadata_v2(jsonb) TO nawra_app;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
COMMIT;
