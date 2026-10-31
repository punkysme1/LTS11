-- Stage 3/5 prerequisite. Run only within the fresh-restore migration runner.
-- A snapshot of the current policy and function definitions is required for rollback.
DO $$ BEGIN
 IF NOT EXISTS(SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='turots_text_units' AND policyname='public read published units') THEN
 RAISE EXCEPTION 'Expected public reader policy absent: inspect server first'; END IF;
END $$;
ALTER POLICY "public read published units" ON public.turots_text_units
 USING (archived_at IS NULL AND public.turots_text_units.metadata_status IN ('imported','curated','verified') AND EXISTS (
 SELECT 1 FROM public.turots_bundles b WHERE b.id=public.turots_text_units.bundle_id
 AND b.publication_status='published' AND b.access_level IN ('public_preview','public_full')));
DO $$ DECLARE r record; original text; revised text; updated integer:=0;
BEGIN
 FOR r IN SELECT p.oid FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace
 WHERE n.nspname='public' AND p.proname IN ('search_turots_catalog','get_turots_catalog_filter_options') LOOP
 original:=pg_get_functiondef(r.oid);
 revised:=regexp_replace(original,'u\.metadata_status\s*=\s*''imported''','u.metadata_status IN (''imported'',''curated'',''verified'')','g');
 IF revised=original THEN RAISE EXCEPTION 'Expected imported predicate missing: %',r.oid::regprocedure; END IF;
 EXECUTE revised;updated:=updated+1;
 END LOOP;
 IF updated<>2 THEN RAISE EXCEPTION 'Expected two catalog functions, found %',updated; END IF;
END $$;
NOTIFY pgrst, 'reload schema';
