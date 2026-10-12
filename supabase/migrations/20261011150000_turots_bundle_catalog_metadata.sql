-- Extend bundle-level catalog records with archive and repository description fields.
-- These are metadata attributes, not new academic catalog categories.
ALTER TABLE public.turots_bundles
  ADD COLUMN IF NOT EXISTS dreamsea_identifier text,
  ADD COLUMN IF NOT EXISTS institution text,
  ADD COLUMN IF NOT EXISTS surrogate_format text,
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS city_province text,
  ADD COLUMN IF NOT EXISTS right_to_left boolean,
  ADD COLUMN IF NOT EXISTS subject_matter text,
  ADD COLUMN IF NOT EXISTS copyist text,
  ADD COLUMN IF NOT EXISTS copying_date_native text,
  ADD COLUMN IF NOT EXISTS copying_place text,
  ADD COLUMN IF NOT EXISTS bundle_script text,
  ADD COLUMN IF NOT EXISTS writing_support text,
  ADD COLUMN IF NOT EXISTS rubrication text,
  ADD COLUMN IF NOT EXISTS bundle_description text,
  ADD COLUMN IF NOT EXISTS colophon text,
  ADD COLUMN IF NOT EXISTS current_status text;

NOTIFY pgrst, 'reload schema';
