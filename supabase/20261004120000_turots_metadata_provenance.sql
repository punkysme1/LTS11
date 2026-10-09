create table if not exists public.turots_metadata_provenance (
  id uuid primary key default gen_random_uuid(),
  text_unit_id uuid not null references public.turots_text_units(id) on delete cascade,
  field_name text not null,
  claim_value text not null,
  source_label text not null,
  source_locator text,
  method text,
  confidence text not null default 'belum dinilai'
    check (confidence in ('tinggi', 'sedang', 'rendah', 'belum dinilai')),
  note text,
  recorded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

grant select on public.turots_metadata_provenance to anon, authenticated;
grant insert, update, delete on public.turots_metadata_provenance to authenticated;

create index if not exists turots_provenance_unit_idx
  on public.turots_metadata_provenance(text_unit_id, created_at);

comment on table public.turots_metadata_provenance is
  'Source evidence for individual manuscript metadata claims; provenance is recorded per text unit and field.';
comment on column public.turots_metadata_provenance.field_name is
  'Metadata field supported by the claim (for example author, title, or date).';
comment on column public.turots_metadata_provenance.source_locator is
  'Precise folio, catalog page, URL, or archival reference locating the evidence.';

alter table public.turots_metadata_provenance enable row level security;

create policy "admins manage metadata provenance"
  on public.turots_metadata_provenance for all to authenticated
  using (exists (select 1 from public.turots_admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.turots_admins a where a.user_id = auth.uid()));

create policy "public read provenance for published units"
  on public.turots_metadata_provenance for select to anon, authenticated
  using (exists (
    select 1 from public.turots_text_units u
    join public.turots_bundles b on b.id = u.bundle_id
    where u.id = text_unit_id and b.publication_status = 'published'
  ));
