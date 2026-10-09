insert into collections (code, name, source_project)
values ('ND', 'Ndalem', 'Dreamsea')
on conflict (code) do nothing;

insert into physical_bundles (
  collection_id, bundle_code, shelfmark, display_title,
  extent_pages, source_identifier, archive_identifier,
  iiif_manifest_url, access_level, metadata_status
)
select id, 'DS.001', '01.001.1', 'Shu''bah al-Iman', 242,
  'DS.001', 'REPLACE_WITH_ARCHIVE_IDENTIFIER',
  'https://iiif.archive.org/iiif/REPLACE_WITH_ARCHIVE_IDENTIFIER/manifest.json',
  'public_preview', 'imported'
from collections where code = 'ND'
on conflict (bundle_code) do nothing;

insert into text_units (
  bundle_id, display_id, sequence_no, title_original,
  title_curatorial, description, author, scribe,
  folio_start, folio_end, year_original, language, script
)
select id, '01.A.04.0001', 1, 'شعب الإيمان',
  'كتاب شعب الايمان',
  'Teks komentar atas syair tentang bagian-bagian iman.',
  'Anonymous', 'Anonymous', null, null,
  '14 Dhū al-ḥijjah Tahun Ha', null, null
from physical_bundles where bundle_code = 'DS.001'
on conflict (display_id) do nothing;

insert into text_units (
  bundle_id, display_id, sequence_no, title_original,
  title_curatorial, folio_start, folio_end, language, script
)
select id, '01.A.04.0002', 2, 'شعر',
  'Syair pendahulu tentang bagian-bagian iman',
  '2r', '2v', null, null
from physical_bundles where bundle_code = 'DS.001'
on conflict (display_id) do nothing;

