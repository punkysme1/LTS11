-- Historical schema fixture from Services/Supabase/turots-local; contains no production data.
-- gen_random_uuid is built in to the PostgreSQL test engine.

create table if not exists public.turots_collections (
  id uuid primary key default gen_random_uuid(), code text not null unique, name text not null,
  source_project text not null, description text, created_at timestamptz not null default now()
);

create table if not exists public.turots_bundles (
  id uuid primary key default gen_random_uuid(), collection_id uuid not null references public.turots_collections(id),
  bundle_code text not null unique, shelfmark text, display_title text, extent_pages integer,
  source_identifier text, archive_identifier text, item_url text, iiif_manifest_url text,
  access_level text not null default 'public_preview' check (access_level in ('public_preview','public_full','researcher','private')),
  metadata_status text not null default 'imported' check (metadata_status in ('imported','curated','verified','provisional','conflicting','unknown')),
  publication_status text not null default 'draft' check (publication_status in ('draft','review','published','archived')),
  created_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.turots_text_units (
  id uuid primary key default gen_random_uuid(), bundle_id uuid not null references public.turots_bundles(id) on delete cascade,
  display_id text not null unique, sequence_no integer not null, title_original text, title_latin text,
  title_curatorial text, title_from_team text, folio_start text, folio_end text, author text, scribe text,
  language text, script text, year_original text, year_normalized_start integer, year_normalized_end integer,
  description text, category_primary text, category_secondary text, category_tertiary text,
  keywords text, glossary text, references_text text, notes text,
  metadata_status text not null default 'imported' check (metadata_status in ('imported','curated','verified','provisional','conflicting','unknown')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.turots_pages (
  id uuid primary key default gen_random_uuid(), bundle_id uuid not null references public.turots_bundles(id) on delete cascade,
  text_unit_id uuid references public.turots_text_units(id) on delete set null, canvas_id text not null,
  page_order integer not null, folio_label text, side text check (side in ('recto','verso','unknown')),
  label text, image_url text, thumbnail_url text, access_level text not null default 'public_preview',
  checksum_sha256 text, unique(bundle_id, page_order)
);

create table if not exists public.turots_classifications (
  id uuid primary key default gen_random_uuid(), name text not null, parent_id uuid references public.turots_classifications(id), classification_type text not null default 'scholarly', unique(name, classification_type)
);
create table if not exists public.turots_text_unit_classifications (
  text_unit_id uuid not null references public.turots_text_units(id) on delete cascade,
  classification_id uuid not null references public.turots_classifications(id) on delete cascade,
  level integer not null default 1, primary key(text_unit_id, classification_id)
);

create table if not exists public.turots_research_items (
  id uuid primary key default gen_random_uuid(), title text not null, author text, institution text,
  publication_year integer, abstract text, url text, status text not null default 'submitted' check(status in ('submitted','curated','verified')), created_at timestamptz not null default now()
);
create table if not exists public.turots_research_text_units (
  research_id uuid not null references public.turots_research_items(id) on delete cascade,
  text_unit_id uuid not null references public.turots_text_units(id) on delete cascade, locator text,
  primary key(research_id, text_unit_id)
);
create table if not exists public.turots_relations (
  id uuid primary key default gen_random_uuid(), from_text_unit_id uuid not null references public.turots_text_units(id) on delete cascade,
  to_text_unit_id uuid not null references public.turots_text_units(id) on delete cascade, relation_type text not null,
  description text, evidence_reference text, status text not null default 'provisional' check(status in ('provisional','verified','conflicting')),
  unique(from_text_unit_id, to_text_unit_id, relation_type)
);
create table if not exists public.turots_audit_log (
  id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id), entity_type text not null,
  entity_id uuid, action text not null, before_data jsonb, after_data jsonb, created_at timestamptz not null default now()
);

create index if not exists turots_bundles_public_idx on public.turots_bundles(publication_status, updated_at desc);
create index if not exists turots_units_bundle_idx on public.turots_text_units(bundle_id);
create index if not exists turots_pages_bundle_idx on public.turots_pages(bundle_id, page_order);

alter table public.turots_collections enable row level security;
alter table public.turots_bundles enable row level security;
alter table public.turots_text_units enable row level security;
alter table public.turots_pages enable row level security;
alter table public.turots_classifications enable row level security;
alter table public.turots_text_unit_classifications enable row level security;
alter table public.turots_research_items enable row level security;
alter table public.turots_research_text_units enable row level security;
alter table public.turots_relations enable row level security;
alter table public.turots_audit_log enable row level security;

create policy "public read published bundles" on public.turots_bundles for select to anon, authenticated using (publication_status = 'published');
create policy "public read published units" on public.turots_text_units for select to anon, authenticated using (exists(select 1 from public.turots_bundles b where b.id=bundle_id and b.publication_status='published'));
create policy "public read published pages" on public.turots_pages for select to anon, authenticated using (exists(select 1 from public.turots_bundles b where b.id=bundle_id and b.publication_status='published'));
create policy "public read collections" on public.turots_collections for select to anon, authenticated using (true);
create policy "public read classifications" on public.turots_classifications for select to anon, authenticated using (true);
create policy "admin manage bundles" on public.turots_bundles for all to authenticated using (true) with check (true);
create policy "admin manage units" on public.turots_text_units for all to authenticated using (true) with check (true);
create policy "admin manage pages" on public.turots_pages for all to authenticated using (true) with check (true);
create policy "admin manage collections" on public.turots_collections for all to authenticated using (true) with check (true);
create policy "admin manage classifications" on public.turots_classifications for all to authenticated using (true) with check (true);
create policy "admin manage unit classifications" on public.turots_text_unit_classifications for all to authenticated using (true) with check (true);
create policy "public read verified research" on public.turots_research_items for select to anon, authenticated using (status='verified');
create policy "admin manage research" on public.turots_research_items for all to authenticated using (true) with check (true);
create policy "public read relations" on public.turots_relations for select to anon, authenticated using (status='verified');
create policy "admin manage relations" on public.turots_relations for all to authenticated using (true) with check (true);
create policy "admin read audit" on public.turots_audit_log for select to authenticated using (true);
create policy "admin write audit" on public.turots_audit_log for insert to authenticated with check (true);

insert into public.turots_classifications(name, classification_type) values
 ('Akidah','scholarly'),('Fikih','scholarly'),('Munakahat','pedagogical'),('Nahwu','scholarly'),('Sejarah','scholarly'),('Akhlak','scholarly'),('Tafsir','scholarly'),('Hadis','scholarly')
on conflict (name, classification_type) do nothing;

alter table public.turots_text_units
  add column if not exists scholarly_classification_1 text,
  add column if not exists scholarly_classification_2 text,
  add column if not exists scholarly_classification_3 text,
  add column if not exists record_no text,
  add column if not exists folio_separator text,
  add column if not exists year_masehi text,
  add column if not exists copying_location text,
  add column if not exists manuscript_origin text,
  add column if not exists cover text,
  add column if not exists cover_size text,
  add column if not exists binding text,
  add column if not exists paper_size text,
  add column if not exists dimensions text,
  add column if not exists watermark text,
  add column if not exists countermark text,
  add column if not exists ink text,
  add column if not exists total_pages text,
  add column if not exists blank_pages text,
  add column if not exists lines_per_page text,
  add column if not exists rubrication text,
  add column if not exists illumination text,
  add column if not exists illustration text,
  add column if not exists marginal_notes text,
  add column if not exists meaning_notes text,
  add column if not exists colophon text,
  add column if not exists marginal_note text,
  add column if not exists physical_condition text,
  add column if not exists readability text,
  add column if not exists completeness text,
  add column if not exists related_manuscripts text,
  add column if not exists related_persons text,
  add column if not exists paper_type text;

alter table public.turots_bundles
  add column if not exists affiliation text,
  add column if not exists collection_number text,
  add column if not exists digitalization_number text;

create index if not exists turots_units_classification_idx on public.turots_text_units(category_primary, scholarly_classification_1);
