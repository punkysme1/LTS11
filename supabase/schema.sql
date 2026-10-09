create extension if not exists pgcrypto;

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  source_project text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists physical_bundles (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references collections(id),
  bundle_code text not null unique,
  shelfmark text,
  display_title text,
  extent_pages integer,
  source_identifier text,
  archive_identifier text,
  iiif_manifest_url text,
  access_level text not null default 'public_preview'
    check (access_level in ('public_preview', 'public_full', 'researcher', 'private')),
  metadata_status text not null default 'imported'
    check (metadata_status in ('imported', 'curated', 'verified', 'provisional', 'conflicting', 'unknown')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists text_units (
  id uuid primary key default gen_random_uuid(),
  bundle_id uuid not null references physical_bundles(id) on delete cascade,
  display_id text not null unique,
  sequence_no integer not null,
  title_original text,
  title_latin text,
  title_curatorial text,
  description text,
  author text,
  scribe text,
  folio_start text,
  folio_end text,
  language text,
  script text,
  year_original text,
  year_normalized_start integer,
  year_normalized_end integer,
  source_reference text,
  metadata_status text not null default 'imported'
    check (metadata_status in ('imported', 'curated', 'verified', 'provisional', 'conflicting', 'unknown')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists classifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  parent_id uuid references classifications(id),
  classification_type text not null default 'scholarly'
);

create table if not exists text_unit_classifications (
  text_unit_id uuid not null references text_units(id) on delete cascade,
  classification_id uuid not null references classifications(id) on delete cascade,
  level integer not null default 1,
  primary key (text_unit_id, classification_id)
);

create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  bundle_id uuid not null references physical_bundles(id) on delete cascade,
  page_order integer not null,
  folio_label text,
  side text check (side in ('recto', 'verso', 'unknown')),
  text_unit_id uuid references text_units(id),
  image_service_id text,
  image_url text,
  thumbnail_url text,
  access_level text not null default 'public_preview'
    check (access_level in ('public_preview', 'public_full', 'researcher', 'private')),
  checksum_sha256 text,
  unique (bundle_id, page_order)
);

create table if not exists manuscript_relations (
  id uuid primary key default gen_random_uuid(),
  from_text_unit_id uuid not null references text_units(id) on delete cascade,
  to_text_unit_id uuid not null references text_units(id) on delete cascade,
  relation_type text not null,
  description text,
  evidence_reference text,
  status text not null default 'provisional'
    check (status in ('provisional', 'verified', 'conflicting')),
  unique (from_text_unit_id, to_text_unit_id, relation_type)
);

create table if not exists research_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  institution text,
  publication_year integer,
  abstract text,
  url text,
  status text not null default 'submitted'
    check (status in ('submitted', 'curated', 'verified')),
  created_at timestamptz not null default now()
);

create table if not exists research_text_units (
  research_id uuid not null references research_items(id) on delete cascade,
  text_unit_id uuid not null references text_units(id) on delete cascade,
  locator text,
  primary key (research_id, text_unit_id)
);

create index if not exists idx_text_units_bundle on text_units(bundle_id);
create index if not exists idx_pages_bundle_order on pages(bundle_id, page_order);
create index if not exists idx_text_units_titles on text_units using gin (to_tsvector('simple', coalesce(title_original, '') || ' ' || coalesce(title_latin, '') || ' ' || coalesce(title_curatorial, '')));

