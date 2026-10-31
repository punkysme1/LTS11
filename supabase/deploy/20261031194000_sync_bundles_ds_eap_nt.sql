-- =============================================================================
-- SINKRONISASI METADATA BENDEL DREAMSEA (79), EAP/BL (204), DAN NT (138)
-- CATATAN PENTING: TIDAK MENGHAPUS / MENGUBAH FOTO YANG SUDAH ADA DI SERVER.
-- =============================================================================
begin;

-- 1. DREAMSEA (79 Bendel)
update public.turots_bundles set
  msid = '4443',
  dreamsea_identifier = 'DS 0097 00001',
  source_identifier = '4443',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4443',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791537',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = 'Anonymous',
  copying_date_native = '14 Dhū al-ḥijjah Tahun Ha',
  copying_date_gregorian = NULL,
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '32.9 x 20.7 cm',
  paper_size = '32.9 x 20.9 cm',
  dimensions = '23 x 12.7 cm',
  pages_text = '242 pages',
  blank_pages_text = '126 pages',
  blank_pages = 126,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript is divided in 77 parts that deal with questions about the Islamic faith. The text is a commentary (sharḥ) on a poem on the various parts of the Islamic faith which itself is a translation of a text in Persian written by Nūr al-Dīn al-Ījī.',
  colophon = 'Tammat fī waqt al’Ishā fī hilāl al-rābi‘ ‘ashr fī shar Dhū al-ḥijjah fī sannah al-hā’ wa Allahu a‘lam bi al-ṣawwāb wa ighffir khaṭā’ī fī khaṭ al-kitāb hadhā wa thabbit īmānanā wa īmān abawaynā, hadha al-kitāb almusammá Shu‘bah al-īmān.',
  bundle_notes = 'At the start of the manuscript is written wa ṣāḥib hadha al-kitāb Madyān. Another text in the form of a poem (syair) on the various parts of the faith precedes the main text. The text is written in black ink with rubrications in red.',
  affiliate_items = '[{"item_no": 1, "title_native": "Shu‘ab al-īmān", "title_roman": "Branches of faith", "title_english": "Abū Yaḥyā Zayn al-dīn bin ‘Alī bin Aḥmād al-Shāfi‘ī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00001';
update public.turots_bundles set
  msid = '4444',
  dreamsea_identifier = 'DS 0097 00002',
  source_identifier = '4444',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4444',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791538',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Grammar',
  copyist = '‘Abdullāh ibn Haji ‘Abdullah',
  copying_date_native = '27 Rajab Tahun Alif',
  copying_date_gregorian = NULL,
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Bungah, Tandes (Gresik)',
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '34 x 20.3 cm',
  paper_size = '34 x 21 cm',
  dimensions = '21.5 x 12 cm',
  pages_text = '268 pages',
  blank_pages_text = '11 pages',
  blank_pages = 11,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript is about Arabic morphology (ṣarf) and Arabic grammar.',
  colophon = 'Wa qad tamma hadha al-kitāb fī laylah li yawm al-arbi‘a fī shar Rajab wa fī hilāl sab‘ah wa ‘ishrūn wa fī sanah al-alif, wa ṣāḥib hadha al-kitāb al-musammá arba‘ata aḥruf aḥaduhā al-mīm al-maḍmūmah wa thānihā al-ḥā’ al-maftūḥah wa thalithuhā al-mīm al-maftūḥah ma‘a al-tashdīd wa rābi‘uhā al-dāl al-sukūn wa jam‘uhā qawlunā Muḥammad ibn Kiai Muṣṭafá fī qaryah Bungah fī bilād Tandes wa kataba hadha al-kitāb al-musammá ‘Abdullāh ibn Haji ‘Abdullah',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "al-Ṣarf", "title_roman": "Arabic morphology", "title_english": "Shaykh ‘Abd al-Wahhāb ibn Ibrāhim al-Zanjānī", "author": "Arabic; Javanese", "language": "العوامل"}, {"item_no": 2, "title_native": "al-‘Awāmil", "title_roman": "Shaykh ‘Abd al-Qāhir al-Jurjānī", "title_english": "Arabic; Javanese", "author": "الأجورمية", "language": "al-Ajurūmiyah"}, {"item_no": 3, "title_native": "Abū ‘Abdillāh Muḥammad bin Muḥammad bin Dawud al-Ṣanhājī", "title_roman": "Arabic; Javanese", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00002';
update public.turots_bundles set
  msid = '4445',
  dreamsea_identifier = 'DS 0097 00003',
  source_identifier = '4445',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4445',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791539',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Grammar',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1890',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '33 x 20.6 cm',
  paper_size = '33 x 21 cm',
  dimensions = '20 x 11.3 cm',
  pages_text = '330 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript deals with Arabic morphology and grammar.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Al-Ṣarf", "title_roman": "Arabic morphology", "title_english": "Shaykh ‘Abd al-Wahhāb ibn Ibrāhim al-Zanjānī", "author": "Arabic; Javanese", "language": "العوامل"}, {"item_no": 2, "title_native": "al-‘Awāmil", "title_roman": "Shaykh ‘Abd al-Qāhir al-Jurjānī", "title_english": "Arabic; Javanese", "author": "الأجورمية", "language": "al-Ajurūmiyah"}, {"item_no": 3, "title_native": "Abū ‘Abdillāh Muḥammad bin Muḥammad bin Dawud al-Ṣanhājī", "title_roman": "Arabic; Javanese", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00003';
update public.turots_bundles set
  msid = '4446',
  dreamsea_identifier = 'DS 0097 00004',
  source_identifier = '4446',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4446',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791540',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Amir',
  copying_date_native = '1324 AH',
  copying_date_gregorian = '1906',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.7 x 17.2 cm',
  dimensions = '15.8 x 10 cm',
  pages_text = '24 pages',
  blank_pages_text = '5 pages',
  blank_pages = 5,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript deals with marriage and divorce law in Islam.',
  colophon = 'Wa Allāh a‘lam biyad al-ḥaqīr al-faqīr Amīr sanah 1324 H.',
  bundle_notes = 'On the first page is written Muhammad Hasyim bin Ahmad Kaliwud Gresik.',
  affiliate_items = '[{"item_no": 1, "title_native": "Kitāb al-Nikāḥ", "title_roman": "The Book of Marriage", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00004';
update public.turots_bundles set
  msid = '4447',
  dreamsea_identifier = 'DS 0097 00005',
  source_identifier = '4447',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4447',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791541',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Biography',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = 'Sampurnan, Bungah, Gresik',
  sponsor = NULL,
  bundle_script = 'Pegon',
  writing_support = 'Lined paper',
  paper_type = 'Lined paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '23 x 14.4 cm',
  dimensions = '18.8 x 11 cm',
  pages_text = '20 pages',
  blank_pages_text = '5 pages',
  blank_pages = 5,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains the biography of the founder of Pondok Pesantren Sampurnan who was known under the name Kiai Kanugrahan (Kiai Qomaruddin).',
  colophon = NULL,
  bundle_notes = 'Some pages have been repaired with paper in another color. The text also contains information that Kiai Basyir got this story directly from Kiai Kanugrahan (Kiai Qomaruddin). According to sources around the pesantren, Kiai Basyir lived from 1838-1860.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[The Story of Kiai Kanugrahan]", "title_english": "Anonymous", "author": "Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00005';
update public.turots_bundles set
  msid = '4448',
  dreamsea_identifier = 'DS 0097 00006',
  source_identifier = '4448',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4448',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791542',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Sermons',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.2 x 16.3 cm',
  paper_size = '21 x 17.4 cm',
  dimensions = '15 x 11 cm',
  pages_text = '46 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'Yes',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript contains a collection of sermons about the magnificence of the month Ramadhan.',
  colophon = NULL,
  bundle_notes = 'The manuscript is very pretty and contains illumination in golden ink.',
  affiliate_items = '[{"item_no": 1, "title_native": "[al-Khuṭbah li shahr Ramaḍān]", "title_roman": "[Ramadan Sermons]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00006';
update public.turots_bundles set
  msid = '4449',
  dreamsea_identifier = 'DS 0097 00007',
  source_identifier = '4449',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4449',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791543',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Grammar',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21 x 15.8 cm',
  paper_size = '20.4 x 15.9 cm',
  dimensions = '11.5 x 7.4 cm',
  pages_text = '272 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text explains the poems of Ibn Mālik (known as Alfīyah ibn Mālik) on Arabic grammar.',
  colophon = NULL,
  bundle_notes = 'There are many marginal glosses. The manuscript is incomplete and some parts are missing. The ink has started to corrode the paper but is still well readable.',
  affiliate_items = '[{"item_no": 1, "title_native": "Taqrāb al-Aqṣá li Muḥammad ibn Mālik", "title_roman": "Taqrāb al-Aqṣá li Muḥammad ibn Mālik", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00007';
update public.turots_bundles set
  msid = '4450',
  dreamsea_identifier = 'DS 0097 00008',
  source_identifier = '4450',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4450',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791544',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Sufism',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1800',
  end_year_date = '1900',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Tree bark paper',
  paper_type = 'Tree bark paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'Yes',
  cover_size = NULL,
  paper_size = '18.8 x 13.5 cm',
  dimensions = '11.5 x 7.4 cm',
  pages_text = '100 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'Yes',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript discusses four different kinds of ‘marriages’ seen from the Sufi point of view. They are (1) marriage with the portent of the Qur’an, (2) marriage between men and women, (3) marriage between body and soul, and (4) marriage between a wise follower of Allah with his master.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete and the end is missing. Although the text is on marriages, it is not Islamic jurisprudence. Other short texts preceed the main text. They are (1) Surat Al-Fātiḥah, (2) Surat al-Nabā’, (3) quotes from the hadith of the Prophet on the prohibition of putting a statue in the house, and (4) Arabic alphabet.',
  affiliate_items = '[{"item_no": 1, "title_native": "Ma‘rifat al-Nikāḥ", "title_roman": "Ma‘rifat al-Nikāḥ", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00008';
update public.turots_bundles set
  msid = '4451',
  dreamsea_identifier = 'DS 0097 00009',
  source_identifier = '4451',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4451',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791545',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Sermons',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.4 x 17.6 cm',
  paper_size = '20.9 x 17.6 cm',
  dimensions = '15.8 x x 11.4 cm',
  pages_text = '22 pages',
  blank_pages_text = '6 pages',
  blank_pages = 6,
  rubrication = 'Yes',
  illumination = 'Yes',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript contains Friday sermons for the month Jumadil thanī.',
  colophon = NULL,
  bundle_notes = 'The manuscript is very pretty with illuminations in golden ink.',
  affiliate_items = '[{"item_no": 1, "title_native": "[al-Khuṭbah li shahr Jumadi al-thānī]", "title_roman": "[The friday sermons for Jumadi al-thānī]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00009';
update public.turots_bundles set
  msid = '4452',
  dreamsea_identifier = 'DS 0097 00010',
  source_identifier = '4452',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4452',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791546',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Astrology',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Lined paper',
  paper_type = 'Lined paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.4 x 16.6 cm',
  paper_size = '21.4 x 16.6 cm',
  dimensions = '13.8 x 10.4 cm',
  pages_text = '56 pages',
  blank_pages_text = '18 pages',
  blank_pages = 18,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'Yes',
  physical_condition = 'Good',
  bundle_description = 'The manuscript is about the calculations of the months and the years.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Astrology]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00010';
update public.turots_bundles set
  msid = '4453',
  dreamsea_identifier = 'DS 0097 00011',
  source_identifier = '4453',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4453',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791547',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Hagiography',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Lined paper',
  paper_type = 'Lined paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.2 x 16.3 cm',
  paper_size = '21.2 x 16.4 cm',
  dimensions = '16.5 x 9.4 cm',
  pages_text = '28 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript contains the biography of the Prophet Muhammad, known as ṣalawat Burdah.',
  colophon = NULL,
  bundle_notes = 'The text has interlinear glosses in Javanese.',
  affiliate_items = '[{"item_no": 1, "title_native": "Qaṣīdah al-Burdah", "title_roman": "Qaṣīdah al-Burdah", "title_english": "Al-Imām al-Buṣīrī", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00011';
update public.turots_bundles set
  msid = '4454',
  dreamsea_identifier = 'DS 0097 00012',
  source_identifier = '4454',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4454',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791548',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology; Islamic Jurisprudence; Qur''anic Exegesis',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Lined paper',
  paper_type = 'Lined paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '22.4 x 17.7 cm',
  paper_size = '21.2 x 16.7 cm',
  dimensions = '16.3 x 12.6 cm',
  pages_text = '38 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with the triology Theology, Islamic Jurisprudence and Exegesis but mostly deals with Sufi matters.',
  colophon = NULL,
  bundle_notes = 'Some parts of the binding have become loose and the manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "Sullam al-Tawfīq", "title_roman": "Sullam al-Tawfīq", "title_english": "‘Abdu Allāh ibn Ḥusayn bin Ṭāhir", "author": "Arabic", "language": "عقيدة العوام"}, {"item_no": 2, "title_native": "‘Aqīdat al-‘awwām", "title_roman": "Sayyid Aḥmad al-Marzūqī", "title_english": "Arabic; Javanese", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00012';
update public.turots_bundles set
  msid = '4455',
  dreamsea_identifier = 'DS 0097 00013',
  source_identifier = '4455',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4455',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791549',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = 'Muttaqin Khabibullah, et al. 2020. Katalog Naskah Pesantren Qomaruddin Sampurnan Bungah Gresik Jilid 1. Gresik: Oase Publishing. p. 130.',
  subject_matter = 'Islamic Theology',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '31.5 x 22.8 cm',
  paper_size = '33.2 x 21 cm',
  dimensions = '22.3 x 11.3 cm',
  pages_text = '118 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript deals with Islamic theology.',
  colophon = 'Tammat hadha al-kitāb al-musammá bi [al-durrah] wallahu a‘lam bi al-ṣawāb.',
  bundle_notes = 'Some prayers preceed the main text such as the prayer to open the fast, the intention (niat) for the fast during the month Ramadhan, the prayer at the grave, and prayers when making a pilgrimage to graves. On the back of the binding is written that a woman named Maimunah died on Monday, in the month Jumadil ‘Ula, 1339 H. At the end is text about the meaning of the shahada that is unrelated to the rest of the text in the manuscript.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[al-Samarqandī]", "title_english": "Abū al-Laith Muḥammad ibn Abī Naṣr ibn Ibrāhīm al-Samarqandī", "author": "Arabic; Javanese", "language": "[Dasar-dasar Ajaran Islam]"}, {"item_no": 2, "title_native": "", "title_roman": "Anonymous", "title_english": "Arabic; Javanese", "author": "[Ma’rifat al-Islām]", "language": "[Islamic Mystical Knowledge]"}, {"item_no": 3, "title_native": "", "title_roman": "Arabic; Javanese", "title_english": "al-Durrah", "author": "al-Durrah", "language": "Anonymous"}]'::jsonb
where bundle_code = 'DS 0097 00013';
update public.turots_bundles set
  msid = '4456',
  dreamsea_identifier = 'DS 0097 00014',
  source_identifier = '4456',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4456',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791550',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = 'Muttaqin Khabibullah, et al. 2020. Katalog Naskah Pesantren Qomaruddin Sampurnan Bungah Gresik Jilid 1. Gresik: Oase Publishing. p. 73.',
  subject_matter = 'Arabic Grammar',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '32 x 20 cm',
  paper_size = '32.3 x 20 cm',
  dimensions = '14.3 x 9.7 cm',
  pages_text = '248 pages',
  blank_pages_text = '3 pages',
  blank_pages = 3,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The text deals with Arabic grammar.',
  colophon = NULL,
  bundle_notes = 'The main text is preceded by some short unrelated texts about pledges. There is a short note about Kiai Ahmad.',
  affiliate_items = '[{"item_no": 1, "title_native": "Al-Miṣbāḥ", "title_roman": "Al-Miṣbāḥ", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00014';
update public.turots_bundles set
  msid = '4457',
  dreamsea_identifier = 'DS 0097 00015',
  source_identifier = '4457',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4457',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791551',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = 'Muttaqin Khabibullah, et al. 2020. Katalog Naskah Pesantren Qomaruddin Sampurnan Bungah Gresik Jilid 1. Gresik: Oase Publishing. p. 109.',
  subject_matter = 'Arabic Grammar',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '36 x 25.5 cm',
  paper_size = '33.5 x 21 cm',
  dimensions = '19.5 x 11.5 cm',
  pages_text = '324 pages',
  blank_pages_text = '4 pages',
  blank_pages = 4,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with Arabic morphology.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete. In the middle are hadiths of the Prophet about intention (niat) in Islamic teachings.',
  affiliate_items = '[{"item_no": 1, "title_native": "[al-Ṣarf]", "title_roman": "[Arabic morphology)", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00015';
update public.turots_bundles set
  msid = '4458',
  dreamsea_identifier = 'DS 0097 00016',
  source_identifier = '4458',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4458',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791552',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Diary',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = '1965 March 06',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Sampurnan, Bungah, Gresik',
  sponsor = NULL,
  bundle_script = 'Arabic; Jawi',
  writing_support = 'Lined paper',
  paper_type = 'Lined paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '20.8 x 14 cm',
  paper_size = '20.8 x 14.1 cm',
  dimensions = '18.3 x 13 cm',
  pages_text = '52 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript contains the diary of Kiai Shaleh Mustofa (the seventh pesantren leader) who was the son-in-law of Kiai Shaleh Tsani who was the fifth leader of the pesantren.',
  colophon = NULL,
  bundle_notes = 'The manuscripts contains the note that states KH. M. Sholeh Soebaraja 3-3-65. It also contains information about Kiai Mustofa’s teachers and criticism of the Wahabi movement that entered Indonesia. The text is written in blue ink.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "Ahl al-Sunnah wa al-Jamā‘ah", "title_english": "K.H. M. Sholeh", "author": "Arabic; Indonesian", "language": "[Silsilah Guru-Guru Kiai Mustofa dan Kiai Ṣāliḥ Thāni]"}, {"item_no": 2, "title_native": "", "title_roman": "K.H. M. Sholeh", "title_english": "Javanese; Indonesian", "author": "جواز التوسل بالنبي والصالحين", "language": "Jawāz al-tawasul bi al-Nabī wa al-ṣāliḥīn"}, {"item_no": 3, "title_native": "K.H. M. Sholeh", "title_roman": "Arabic", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00016';
update public.turots_bundles set
  msid = '4459',
  dreamsea_identifier = 'DS 0097 00017',
  source_identifier = '4459',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4459',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791553',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Morphology',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'Yes',
  cover_size = NULL,
  paper_size = '24.3 x 18.1 cm',
  dimensions = '19.1 x 11.4 cm',
  pages_text = '148 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The text is on Arabic morphology.',
  colophon = NULL,
  bundle_notes = 'On the first page is written in Javanese and Arabic “Punika ing kang nggadahi kitab Saraf Mujtahid. Hādha al-Ḥaq Mujtahid Japura Wetan.”',
  affiliate_items = '[{"item_no": 1, "title_native": "al-Ṣarf", "title_roman": "[Arabic Morfology]", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00017';
update public.turots_bundles set
  msid = '4460',
  dreamsea_identifier = 'DS 0097 00018',
  source_identifier = '4460',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4460',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791554',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Qur''anic Recitation; Islamic Jurisprudence; Hadith',
  copyist = 'Nawawī ibn Muhammad Abī Isḥāq ibn Abī Madyā',
  copying_date_native = '1279 AH',
  copying_date_gregorian = '1863',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Tuban',
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'Yes',
  cover_size = NULL,
  paper_size = '21.3 x 17.2 cm',
  dimensions = '16.3 x 9.5 cm',
  pages_text = '56 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript is about tajwīd (how to recite the Qur’an) and contains quotes from poems.',
  colophon = 'Tammah biyad al-faqīr ilallāh al-ḥaqīr Nawawī ibn Muhammad abī Isḥāq ibn abī Madyā al-Tūbānī ghafarallāh lahu wa lahum wa al-muslimīn wa ṣallāllāh ‘alā Sayyidinā Muḥammadin wa alihi wa ṣaḥbihi wa salim wa al-ḥamdulillāh rabb al-‘ālamīn sanah 1279 H.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Sharḥ al-Jazarī fī tajwīd al-Qur’ān", "title_roman": "Sharḥ al-Jazarī fī tajwīd al-Qur’ān", "title_english": "Zakariyā al-Anṣārī", "author": "Arabic", "language": "المنظومة"}, {"item_no": 2, "title_native": "al-Manẓūmah", "title_roman": "Anonymous", "title_english": "Arabic", "author": "المنظومة", "language": "al-Manẓūmah"}, {"item_no": 3, "title_native": "Muḥammad bin Ḥusain", "title_roman": "Arabic", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00018';
update public.turots_bundles set
  msid = '4461',
  dreamsea_identifier = 'DS 0097 00019',
  source_identifier = '4461',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4461',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791555',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '26.2 x 18 cm',
  dimensions = '19.7 x 10 cm',
  pages_text = '24 pages',
  blank_pages_text = '14 pages',
  blank_pages = 14,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text is about the law for people who late to perform the ṣalat with the imām (masbūq).',
  colophon = NULL,
  bundle_notes = 'The text is incomplete',
  affiliate_items = '[{"item_no": 1, "title_native": "Hidāyah al-Mubtadī li Mas‘alah al-Muqtadī", "title_roman": "Hidāyah al-Mubtadī li Mas‘alah al-Muqtadī", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00019';
update public.turots_bundles set
  msid = '4462',
  dreamsea_identifier = 'DS 0097 00020',
  source_identifier = '4462',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4462',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791556',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Morphology',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '25.1 x 17.4 cm',
  dimensions = '19.3 x 9.5 cm',
  pages_text = '28 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text is on Arabic morphology.',
  colophon = NULL,
  bundle_notes = 'The start of the manuscript is missing.',
  affiliate_items = '[{"item_no": 1, "title_native": "al-Ṣarf", "title_roman": "Arabic morphology", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00020';
update public.turots_bundles set
  msid = '4463',
  dreamsea_identifier = 'DS 0097 00021',
  source_identifier = '4463',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4463',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791557',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Hadith; Ethics',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24 x 17 cm',
  dimensions = '15 x 9.5 cm',
  pages_text = '20 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text contains Hadiths on being respectful to guests.',
  colophon = NULL,
  bundle_notes = 'The start and finish of the manuscript are missing. At the start is a reminder of the death of a person who died on 27 Rajab 1329 H.',
  affiliate_items = '[{"item_no": 1, "title_native": "[Ḥadīth fī ikrām al-ḍayf]", "title_roman": "[Ḥadīth about respecting guests]", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00021';
update public.turots_bundles set
  msid = '4464',
  dreamsea_identifier = 'DS 0097 00022',
  source_identifier = '4464',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4464',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791558',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17 cm',
  dimensions = '16.5 x 10 cm',
  pages_text = '42 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text is a poem on Islamic theology.',
  colophon = NULL,
  bundle_notes = 'The text is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[‘Ilm uṣūl al-dīn]", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00022';
update public.turots_bundles set
  msid = '4465',
  dreamsea_identifier = 'DS 0097 00023',
  source_identifier = '4465',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4465',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791559',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.7 x 17 cm',
  dimensions = '15 x 10 cm',
  pages_text = '20 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains the text of instruction on Islamic Jurisprudence.',
  colophon = NULL,
  bundle_notes = 'The text is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "Zubad", "title_roman": "Zubad", "title_english": "Shihāb al-Dīn Abū al-Abbās Aḥmad ibn Ḥusayn ibn ‘Alī ibn Yūsuf ibn ‘Alī ibn Ruslān", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00023';
update public.turots_bundles set
  msid = '4466',
  dreamsea_identifier = 'DS 0097 00024',
  source_identifier = '4466',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4466',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791560',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1880',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European paper',
  paper_type = 'European paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21 x 17 cm',
  dimensions = '17 x 9.5 cm',
  pages_text = '20 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains a text on Islamic Jurisprudence.',
  colophon = NULL,
  bundle_notes = 'The text is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Islamic Jurisprudence]", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00024';
update public.turots_bundles set
  msid = '4467',
  dreamsea_identifier = 'DS 0097 00025',
  source_identifier = '4467',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4467',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791561',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence; Islamic Theology; Prayers',
  copyist = 'Anonymous',
  copying_date_native = 'Rajab 1282 AH',
  copying_date_gregorian = '1866',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21 x 16.9 cm',
  dimensions = '15 x 10.9 cm',
  pages_text = '80 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic Jurisprudence.',
  colophon = 'Tammat shahr al-Rajab sanah 1282 H. Tammah al-kitāb bi ḥamdillahi wa ḥusni tawfīqihi sanah 1282 H.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "al-Safīnat al-najāt", "title_roman": "al-Safīnat al-najāt", "title_english": "Sālim ibn Sumayr", "author": "Arabic", "language": "[أحكام الشريعة]"}, {"item_no": 2, "title_native": "[Aḥkām al-Sharī‘ah]", "title_roman": "‘Abdullāh ibn ‘Umar ibn Abū Bakr ibn Yaḥyā Ba‘lawī al-Ḥaḍramī", "title_english": "Arabic", "author": "[Nubdhah fī umūr al-dīn]", "language": "[Nubdhah fī umūr al-dīn]"}, {"item_no": 3, "title_native": "", "title_roman": "Arabic", "title_english": "رسالة الجامعة والتذكرة النافعة", "author": "al-Risālah al-jāmi‘ah wa al-tadhkirah al-nāfi‘ah", "language": "al-Risālah al-jāmi‘ah wa al-tadhkirah al-nāfi‘ah"}, {"item_no": 4, "title_native": "Arabic", "title_roman": "سلم التوفيق", "title_english": "Sullam al-tawfīq", "author": "Sullam al-tawfīq", "language": "‘Abdullāh ibn Ḥusayn bin Ṭāhir ibn Muḥammad ibn Hāshim Ba‘lawī"}, {"item_no": 5, "title_native": "[Nubdhah fī I‘tiqād]", "title_roman": "[Nubdhah fī I‘tiqād]", "title_english": "Anonymous", "author": "Arabic", "language": "[التذكرة]"}, {"item_no": 6, "title_native": "", "title_roman": "[al-Tadhkirah]", "title_english": "‘Abd Allāh bin ‘Umar", "author": "Arabic", "language": "راتب الحداد"}, {"item_no": 7, "title_native": "Rātib al-Ḥadād", "title_roman": "Anonymous", "title_english": "Arabic", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00025';
update public.turots_bundles set
  msid = '4468',
  dreamsea_identifier = 'DS 0097 00026',
  source_identifier = '4468',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4468',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791562',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '26 x 17.1 cm',
  dimensions = '21.6 x 11.8 cm',
  pages_text = '10 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains the way to perform daily religious obligations and the regulations to be met to perform daily prayers and the hajj.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Islamic Jurisprudence]", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00026';
update public.turots_bundles set
  msid = '4469',
  dreamsea_identifier = 'DS 0097 00027',
  source_identifier = '4469',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4469',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791563',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.2 x 14 cm',
  dimensions = '18.5 x 10.3 cm',
  pages_text = '4 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains parts of prayers to be said over a dead person (talqīn).',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "[talqīn]", "title_roman": "[talqīn]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00027';
update public.turots_bundles set
  msid = '4470',
  dreamsea_identifier = 'DS 0097 00028',
  source_identifier = '4470',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4470',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791564',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'History',
  copyist = NULL,
  copying_date_native = '1271 AH',
  copying_date_gregorian = '1855',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21 X 17 cm',
  dimensions = '14 x 9 cm',
  pages_text = '24 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains various historical tales about the travels made by an unspecified figure mentioned in the text. It also deals with Islamic jurisprudence such as marriage and fasting in Ramaḍān.',
  colophon = 'Wa amla’ahu al-faqīr ilā ‘afw mawlahu ‘Abdullāh ibn ‘Umar ibn Abī Bakr ibn Yaḥyā bi tārīkh Jumādil akhīr sanah 1271 H',
  bundle_notes = 'At the start of the manuscript are notes on year divination and on the age of Kiai Saleh Sepuh and Kiai Saleh Muda. The end of the manuscript is missing.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[History]", "title_english": "‘Abdullāh ibn ‘Umar ibn Abī Bakr ibn Yaḥyā", "author": "Arabic", "language": "[فقه]"}, {"item_no": 2, "title_native": "[Islamic Jurisprudence]", "title_roman": "Anonymous", "title_english": "Arabic", "author": "[Kitāb al-Nikāḥ]", "language": "[The book of marriage]"}, {"item_no": 3, "title_native": "", "title_roman": "Arabic", "title_english": "فتاوي إبن حجر", "author": "Fatāwā ibn Ḥajar", "language": "Anonymous"}, {"item_no": 4, "title_native": "[Bab Awal Puasa]", "title_roman": "[The Beginning of Ramaḍān Fasting]", "title_english": "", "author": "Anonymous", "language": "Arabic"}]'::jsonb
where bundle_code = 'DS 0097 00028';
update public.turots_bundles set
  msid = '4471',
  dreamsea_identifier = 'DS 0097 00029',
  source_identifier = '4471',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4471',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791565',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Ethics; Sufism; Prayers',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21 x 17 cm',
  dimensions = '19.5 x 11 cm',
  pages_text = '12 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains poems on the supremacy of science and prayers on repentance.',
  colophon = NULL,
  bundle_notes = 'The manuscript also contains many other notes including notes on leaving for and returning from the hajj.',
  affiliate_items = '[{"item_no": 1, "title_native": "[Faḍīlatu al-''ilm]", "title_roman": "[The virtue of science]", "title_english": "Anonymous", "author": "Arabic", "language": "مناجات زين العابدين"}, {"item_no": 2, "title_native": "Prayer of Zayn al-‘Ābidīn", "title_roman": "Zayn al-‘Ābidīn", "title_english": "Arabic", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00029';
update public.turots_bundles set
  msid = '4472',
  dreamsea_identifier = 'DS 0097 00030',
  source_identifier = '4472',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4472',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791566',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = 'Anonymous',
  copying_date_native = '1309 AH',
  copying_date_gregorian = '1892',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Sampurnan, Bungah',
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = '25 x 16.8 cm',
  paper_size = '26 x 18 cm',
  dimensions = '19 x 10 cm',
  pages_text = '18 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript is about Islamic theology and Allah’s attributes.',
  colophon = 'Qad tamma hadha al-mukhtaṣar ba‘da ṣalāt al-Maghrīb sanah tis‘a wa thalāth mi’ah ba‘da alf min hijrah al-muṣtafā al-mukhtār …kataba hadha al-‘aqā’id Isma‘īl bin Muḥammad ibn Muḥammad Maddīn al-Sampurnānī.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Umm al-Barāhīn", "title_roman": "Umm al-Barāhīn", "title_english": "Muḥammad bin Yūsuf al-Sanūsī", "author": "Arabic", "language": "[Sifat Allah]"}, {"item_no": 2, "title_native": "", "title_roman": "Anonymous", "title_english": "Arabic", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00030';
update public.turots_bundles set
  msid = '4473',
  dreamsea_identifier = 'DS 0097 00031',
  source_identifier = '4473',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4473',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791567',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Logic',
  copyist = 'Anonymous',
  copying_date_native = '1281 AH',
  copying_date_gregorian = '1865',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17.5 cm',
  dimensions = '15 x 10 cm',
  pages_text = '16 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with logic (ilmu mantiq).',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Sullam al-Munawaraq", "title_roman": "Sullam al-Munawaraq", "title_english": "Abū Zayd ‘Abd al-Raḥmān al-Akhḍarī", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00031';
update public.turots_bundles set
  msid = '4474',
  dreamsea_identifier = 'DS 0097 00032',
  source_identifier = '4474',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4474',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791568',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Stylistic',
  copyist = 'Nawāwī ibn Muḥamad al-Tūbānī',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = 'Nawāwī ibn Muḥamad al-Tūbānī',
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17.5 cm',
  dimensions = '18 x 16.5 cm',
  pages_text = '8 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Arabic stylistics.',
  colophon = NULL,
  bundle_notes = 'At the start is written that the manuscript was made and owned by Nawāwī ibn Muḥamad al-Tūbānī.',
  affiliate_items = '[{"item_no": 1, "title_native": "‘Ilm al-Bayān", "title_roman": "Arabic stylistics", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00032';
update public.turots_bundles set
  msid = '4475',
  dreamsea_identifier = 'DS 0097 00033',
  source_identifier = '4475',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4475',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791569',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Stylistic',
  copyist = 'Nawāwī ibn Muḥamad al-Tūbānī',
  copying_date_native = '1284 ah',
  copying_date_gregorian = '1867',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.2 x 17.4 cm',
  dimensions = '13 x 8 cm',
  pages_text = '44 pages',
  blank_pages_text = '10 pages',
  blank_pages = 10,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Arabic stylistics.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Summary of Arabic Stylistics]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00033';
update public.turots_bundles set
  msid = '4476',
  dreamsea_identifier = 'DS 0097 00034',
  source_identifier = '4476',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4476',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791570',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Nawawī ibn Muḥammad ibn Isḥāq ibn Abī Madyān al-Tūbānī',
  copying_date_native = 'Rajab 1278 AH',
  copying_date_gregorian = 'January 1862',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.2 x 17.5 cm',
  dimensions = '16 x 10.5 cm',
  pages_text = '20 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with how to divide an inheritance according to Islam.',
  colophon = 'Qad tamma ‘alá yad kātibihi al-‘āṣiyah Nawāwī ibn Muḥammad ibn Isḥāq ibn Abī Madyān al-Tūbānī ghafarallāh lahu wa lijamī‘ āmīn sanah 1278 min al-hijrah ‘alá ṣāḥibihā afḍala al-ṣalāt wa al-salām shahr Rajab.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Kifayat al-khā’iḍ fi ‘ilm al-farā’iḍ", "title_roman": "Kifayat al-khā’iḍ fi ‘ilm al-farā’iḍ", "title_english": "Ṭāhir bin al-Habīb Ḥusayn ibn Ṭāhir ibn Muḥammad bin Hāshim Ba‘lawī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00034';
update public.turots_bundles set
  msid = '4477',
  dreamsea_identifier = 'DS 0097 00035',
  source_identifier = '4477',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4477',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791571',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Quranic Science',
  copyist = 'Anonymous',
  copying_date_native = '23 Muḥarram 1296',
  copying_date_gregorian = '1879 January 16',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '25.5 x 18 cm',
  dimensions = '24 x 17 cm',
  pages_text = '20 pages',
  blank_pages_text = '13 pages',
  blank_pages = 13,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'Yes',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with tones in reciting the Qur’an.',
  colophon = 'Qad tamma al-abyāt fī shahr al-Muḥarram 23 sanah 1296.',
  bundle_notes = 'The text is in the form of a poem.',
  affiliate_items = '[{"item_no": 1, "title_native": "[al-Buḥūr]", "title_roman": "[al-Buḥūr]", "title_english": "Muḥammad al-Damanhūrī al-Miṣrī al-Azharī", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00035';
update public.turots_bundles set
  msid = '4478',
  dreamsea_identifier = 'DS 0097 00036',
  source_identifier = '4478',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4478',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791572',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Syntax; Arabic Morphology',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = NULL,
  writing_support = NULL,
  paper_type = NULL,
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = NULL,
  dimensions = NULL,
  pages_text = NULL,
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = NULL,
  bundle_description = 'The manuscript contains various texts on Arabic grammar.',
  colophon = 'Tammat hadha al-kitāb al-musammā bi Taqwīm al-lisān fi yawm al-Ithnayn fī shar Rajab fī waqt al-Ẓuhr... Tammat al-kitāb bi ‘awnillāh al-malik al-wahhāb biyad al-faqīr al-ḥaqīr ilallāh ta‘alā al-Ḥāj ‘Abd al-Raḥīm Barmawī ibn al-Shaykh al-Ḥāj Muḥammad Ṣāliḥ Sampurnan ghafarallāh lahu wa li walidayhi wa liman qara’a wa da‘a lahu ajma‘īn wa al-muslimīn āmīn, fī hilāl 19, sembilan min shar Safar fī yawm al-Ithnayn fi al-waqt al-Dhuhr, 1254, tammat.. Hadha ṣāhib al-kitāb al-musammā al-faqīr al-ḥaqīr al-ḥāj ‘Abd al-Raḥīm Barmāwī al-Qaryah Bungah, Hijrat Nabī 1254...',
  bundle_notes = 'At the start is stated that the manuscript used to belong to Haji Abdurahim bin Haji Muhamad Saleh Sampurnan.',
  affiliate_items = '[{"item_no": 1, "title_native": "Taqwīm al-lisān", "title_roman": "Taqwīm al-lisān", "title_english": "Anonymous", "author": "Arabic", "language": "[الشرح العوامل]"}, {"item_no": 2, "title_native": "[al-Sharḥ al-‘Awāmil]", "title_roman": "Ḥasan Nu’lī", "title_english": "Arabic", "author": "المصباح في علم النحو", "language": "l-Miṣbāḥ fī ‘ilm al-nahw"}, {"item_no": 3, "title_native": "Abū al-Fatḥ Nāṣir al-dīn ‘Abd al-Sayyid ibn ‘Alī al-Shahīr bi al-Muṭarrazī", "title_roman": "Arabic", "title_english": "[صرف]", "author": "[Ṣarf]", "language": "[Ṣarf]"}, {"item_no": 4, "title_native": "Arabic", "title_roman": "", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00036';
update public.turots_bundles set
  msid = '4479',
  dreamsea_identifier = 'DS 0097 00037',
  source_identifier = '4479',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4479',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791573',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = NULL,
  copyist = 'Anonymous',
  copying_date_native = '1350 AH',
  copying_date_gregorian = '1931',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.5 x 18 cm',
  dimensions = '17.5 x 10 cm',
  pages_text = '60 pages',
  blank_pages_text = '4 pages',
  blank_pages = 4,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript explains Islamic law pertaining to the obligatory daily prayers (ṣalat).',
  colophon = 'Wallāhu a‘lam tammat al-Risālah al-rābi‘ah bi ‘awnillāh ghafarallāh li al-kātib wa li man aṭala ‘alayha ‘alá khaṭī’atihim wa raḍiyallāh ta‘alā ‘alayhim āmīn ya rabb al-‘ālamīn sanah 1350.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "[al-Rasā’il fī al-Ṣalāh]", "title_roman": "[Treatise about Praying]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00037';
update public.turots_bundles set
  msid = '4480',
  dreamsea_identifier = 'DS 0097 00038',
  source_identifier = '4480',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4480',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791574',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology; Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '20.2 x 16.2 cm',
  paper_size = '20.2 x 16.2 cm',
  dimensions = '17 x 9.5 cm',
  pages_text = '16 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text is a poem on Islamic theology.',
  colophon = NULL,
  bundle_notes = 'There is a torn page at the start of the manuscript. On the cover is written: “Punika Kitab Bab Puasa Kiai Muhamad Ahmad bin Muhamad Ya‘qub. The end of the manuscript is missing.',
  affiliate_items = '[{"item_no": 1, "title_native": "Al-Kharīdah al-Bahīyah", "title_roman": "Al-Kharīdah al-Bahīyah", "title_english": "Aḥmad al-Dardirī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00038';
update public.turots_bundles set
  msid = '4481',
  dreamsea_identifier = 'DS 0097 00039',
  source_identifier = '4481',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4481',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791575',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17 cm',
  dimensions = '15 x 10.5 cm',
  pages_text = '16 pages',
  blank_pages_text = '7 pages',
  blank_pages = 7,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains Islamic jurisprudence on various matters pertaining to religious ritual obligations.',
  colophon = NULL,
  bundle_notes = 'The text is in the form of a poem.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[The Poetry of Advice]", "title_english": "Zayn al-Dīn Abū Hafṣ ‘Umar bin Muḍaffar", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00039';
update public.turots_bundles set
  msid = '4482',
  dreamsea_identifier = 'DS 0097 00040',
  source_identifier = '4482',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4482',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791576',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Literature',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.3 x 16.5 cm',
  dimensions = '17.5 x 8.5 cm',
  pages_text = '16 pages',
  blank_pages_text = '9 pages',
  blank_pages = 9,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains the story of the nocturnal journey of Prophet Muhammad.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "Qiṣṣat al-Isrā’ wa al-Mi‘rāj", "title_roman": "The Story of Isra’ and Mi‘raj", "title_english": "Najm al-Dīn al-Ghayṭī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00040';
update public.turots_bundles set
  msid = '4483',
  dreamsea_identifier = 'DS 0097 00041',
  source_identifier = '4483',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4483',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791577',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Morphology',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17.2 cm',
  dimensions = '15.5 x 10.5 cm',
  pages_text = '16 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with Arabic morphology.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "Al-Maqṣūd fī al-ṣarf", "title_roman": "Al-Maqṣūd fī al-ṣarf", "title_english": "Abū Ḥanīfah Nu’man bin Thabit", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00041';
update public.turots_bundles set
  msid = '4484',
  dreamsea_identifier = 'DS 0097 00042',
  source_identifier = '4484',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4484',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791578',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.6 x 17 cm',
  dimensions = '15.5 x 10.5 cm',
  pages_text = '8 pages',
  blank_pages_text = '4 pages',
  blank_pages = 4,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with matters pertaining to ṣalat tarāwīḥ in Ramadan.',
  colophon = NULL,
  bundle_notes = 'The text is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "Kashf al-tabārikh fī bayān ṣalāt al-tarāwīḥ", "title_roman": "Kashf al-tabārikh fī bayān ṣalāt al-tarāwīḥ", "title_english": "Abū Faḍl al-Sanūrī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00042';
update public.turots_bundles set
  msid = '4485',
  dreamsea_identifier = 'DS 0097 00043',
  source_identifier = '4485',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4485',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791579',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Hagiography',
  copyist = 'Anonymous',
  copying_date_native = '1338 AH',
  copying_date_gregorian = '1918',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '20.5 x 16.5 cm',
  dimensions = '15.9 x 11 cm',
  pages_text = '70 pages',
  blank_pages_text = '3 pages',
  blank_pages = 3,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains the biography of Shaikh ‘Abd al-Qādir al-Jaylānī.',
  colophon = NULL,
  bundle_notes = 'The manuscript also contains notes such as those on the birth date of a child.',
  affiliate_items = '[{"item_no": 1, "title_native": "Manāqib al-Shaykh ‘Abd al-Qādir Jaylānī", "title_roman": "Manāqib al-Shaykh ‘Abd al-Qādir Jaylānī", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00043';
update public.turots_bundles set
  msid = '4486',
  dreamsea_identifier = 'DS 0097 00044',
  source_identifier = '4486',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4486',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791580',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Sufism',
  copyist = 'Anonymous',
  copying_date_native = '30 Rajab 1247 AH',
  copying_date_gregorian = '1832 January 3',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Dluwang',
  paper_type = 'Dluwang',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.2 x 16.6 cm',
  dimensions = '17 x 10.8 cm',
  pages_text = '74 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'Yes',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript is about Sufism and the Samaniyah Sufi Order.',
  colophon = 'Wa qad tamma min kitābah fī layl al-Jum‘ah fī hilāl thalāthīn min shar Rajab fī sanah 1247 al-Zā’. Ṣāḥib al-kitāb wa al-khaṭ Ibn Madyan fī balad Gresik fī qaryah Sampurnan.',
  bundle_notes = 'The manuscript is incomplete as the start is missing.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Tarekat Samaniyah]", "title_english": "Anonymous", "author": "Arabic", "language": "بيان ألف"}, {"item_no": 2, "title_native": "The Explanation of Alif", "title_roman": "Anonymous", "title_english": "Arabic", "author": "[Tarekat Samaniyah]", "language": "[Samaniyah Order]"}, {"item_no": 3, "title_native": "", "title_roman": "Arabic", "title_english": "[Faḍīlah al-dhikr lā ilaha illallāh]", "author": "[The Virtue of Dhikr]", "language": "Anonymous"}, {"item_no": 4, "title_native": "", "title_roman": "كيفية راتب بعد العشاء", "title_english": "Kayfiat rātib ba‘d al-‘Ishā", "author": "Procedures of Dhikr after Ishā'' prayer", "language": "Anonymous"}, {"item_no": 5, "title_native": "[Mulāḥaẓat al-muwaḥḥid]", "title_roman": "[Mulāḥaẓat al-muwaḥḥid]", "title_english": "Shams al-Dīn Abī ‘Abdillāh", "author": "Arabic", "language": "[Munqūl min Shihāb al-Dīn]"}, {"item_no": 6, "title_native": "", "title_roman": "Anonymous", "title_english": "Arabic", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00044';
update public.turots_bundles set
  msid = '4487',
  dreamsea_identifier = 'DS 0097 00045',
  source_identifier = '4487',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4487',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791581',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = '‘Abd al-Raḥmān ibn ‘Abd al-Salām',
  copying_date_native = 'Ramaḍān 1302 AH',
  copying_date_gregorian = '1885',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '25 x 18 cm',
  dimensions = '20 x 17.5 cm',
  pages_text = '20 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Damaged',
  bundle_description = 'The manuscript deals with Islamic Jurisprudence pertaining to the fast.',
  colophon = 'Tamma al-kitāb….fī shahr al-Ramaḍān fī sanah Alf wa thalāth al-mi’ah …yad ‘Abd al-Raḥmān ibn ‘Abd al-Salām.',
  bundle_notes = 'This manuscript was made by a kiai in Pondok Pesantren Qomaruddin as stated at the start of the text. The text is in the form of a poem.',
  affiliate_items = '[{"item_no": 1, "title_native": "Qaṣīdah fī al-ṣawm", "title_roman": "Poem on Fasting", "title_english": "Muḥammad ibn Abī Isḥāq al-Sampurnānī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00045';
update public.turots_bundles set
  msid = '4488',
  dreamsea_identifier = 'DS 0097 00046',
  source_identifier = '4488',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4488',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791582',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Prayer',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '32.3 x 21 cm',
  dimensions = '18.5 x 11.4 cm',
  pages_text = '30 pages',
  blank_pages_text = '6 pages',
  blank_pages = 6,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript contains a collection of ṣalawat that are usually sung in Islamic singing sessions (qaṣīdah/ḥadrah).',
  colophon = NULL,
  bundle_notes = 'At the end of the manuscript are various notes about disasters caused by rain storms that ruin houses and notes on people sentenced to death because they violently robbed Dutch people. The manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Ṣalawāt]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00046';
update public.turots_bundles set
  msid = '4489',
  dreamsea_identifier = 'DS 0097 00047',
  source_identifier = '4489',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4489',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791583',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Morphology',
  copyist = '‘Abd al-Raḥmān ‘Abd al-Salām Sampurnanī',
  copying_date_native = '7 Dhū al-Hijjah 1214 AH',
  copying_date_gregorian = '1897 May 8',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Sampurnan, Bungah, Gresik',
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '24.5 x 18.3 cm',
  paper_size = '24.5 x 18 cm',
  dimensions = '18 x 11.5 cm',
  pages_text = '64 pages',
  blank_pages_text = '7 pages',
  blank_pages = 7,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The text deals with Arabic morphology.',
  colophon = 'Tammat li sab‘in khalwan min Dhi al-Ḥijjah fī sanah Ghashyadin ‘alá yad kātibihā ‘Abd al-Raḥmān ‘Abd al-Salām Sampurnanī ‘afallāh ‘anhumā wa ‘an jami‘i al-Muslimān āmīn yā rabb al-‘ālamīn.',
  bundle_notes = 'At the start, it is stated that the manuscript used to belong to ‘Abd al-Raḥmān ibn ‘Abd al-Salām. In the inside cover is written that the manuscript used to belong to Haji Muhammad Sa’id bin Haji Muhammad Saleh Sampurnan, and then went to Muhammad ‘Aqib bin Haji Abdurrahman bin Haji ‘Abdus Salam in 1329 H.',
  affiliate_items = '[{"item_no": 1, "title_native": "Kitāb Taṣrifan (al-Taṣrīf)", "title_roman": "The Book of Arabic Morpologhy", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00047';
update public.turots_bundles set
  msid = '4490',
  dreamsea_identifier = 'DS 0097 00048',
  source_identifier = '4490',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4490',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791584',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '4 Ramaḍān 1332 AH',
  copying_date_gregorian = '1914 July 27',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.4 x 13.9 cm',
  paper_size = '21 x 13.5 cm',
  dimensions = '18 x 9 cm',
  pages_text = '120 pages',
  blank_pages_text = '6 pages',
  blank_pages = 6,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The text deals with Islamic theology.',
  colophon = 'Tamma yawm al-Aḥad Legi 4 Ramaḍān sanah 1332... Tammat kitābah hadhā al-naẓm yawm al-Ithnayn Legi li thamaniyata ‘ashara min shar Ramaḍān sanah 1332 H... Tamma yawm al-Thulathā’ Pahing 19 aw 20 Ramaḍān sanah 1332... Tammat al-kitabah waqt al-‘Aṣr yawm al-Thulāthā’ li tis‘ khalwan min shar Rabī‘ al-Thānī fī 1333 sanah Jim al-Awwal. Jumi‘a hadhihi al-qaṣīdah Muḥammad ibn Muḥammad Abī Isḥāq ibn Abī Madyā al-Sampurnānī...',
  bundle_notes = 'At the start is stated that the manuscript used to belong to ‘Abd al-Raḥmān ‘Abd al-Salām.',
  affiliate_items = '[{"item_no": 1, "title_native": "Al-Kharīdah al-Bahīyah", "title_roman": "Al-Kharīdah al-Bahīyah", "title_english": "Aḥmad al-Dardirī", "author": "Arabic", "language": "متن جوهر التوحيد"}, {"item_no": 2, "title_native": "Matn Jawhar al-Tawḥīd", "title_roman": "Burhān al-Dīn Ibrāhim ibn Hārun al-Laqqānī", "title_english": "Arabic; Javanese", "author": "بدئ الأمالي", "language": "Bad’ al-amālī"}, {"item_no": 3, "title_native": "Anonymous", "title_roman": "Arabic; Javanese", "title_english": "عقيدة العوام", "author": "‘Aqīdat al-‘awām", "language": "‘Aqīdat al-‘awām"}, {"item_no": 4, "title_native": "Arabic; Javanese", "title_roman": "Riyāḍah al-ṣibyān", "title_english": "Riyāḍah al-ṣibyān", "author": "al-Ramlī", "language": "Arabic; Javanese"}]'::jsonb
where bundle_code = 'DS 0097 00048';
update public.turots_bundles set
  msid = '4491',
  dreamsea_identifier = 'DS 0097 00049',
  source_identifier = '4491',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4491',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791585',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence; Quranic Recitation; Islamic Theology',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '22.2 x 15.5 cm',
  paper_size = '22.2 x 15.5 cm',
  dimensions = '16.8 x 10.2 cm',
  pages_text = '60 pages',
  blank_pages_text = '5 pages',
  blank_pages = 5,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text seals with Islamic Jurisprudence, Quranic recitation, and Islamic theology.',
  colophon = NULL,
  bundle_notes = 'At the start is stated that the manuscript used to belong to Muḥammad ‘Arīf Cirebon.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Islamic Jurisprudence]", "title_english": "Anonymous", "author": "Arabic", "language": "متن جوهر التوحيد"}, {"item_no": 2, "title_native": "Jawhar al-tawḥīd", "title_roman": "Anonymous", "title_english": "Arabic", "author": "[al-Risālah fī al-tajwīd]", "language": "[al-Risālah fī al-tajwīd]"}, {"item_no": 3, "title_native": "", "title_roman": "Arabic", "title_english": "رياضة الصبيان", "author": "Riyāḍah al-ṣibyān", "language": "Riyāḍah al-ṣibyān"}, {"item_no": 4, "title_native": "Arabic; Javanese", "title_roman": "[Fiqh]", "title_english": "[Islamic Jurisprudence]", "author": "Anonymous", "language": "Arabic; Javanese"}]'::jsonb
where bundle_code = 'DS 0097 00049';
update public.turots_bundles set
  msid = '4492',
  dreamsea_identifier = 'DS 0097 00050',
  source_identifier = '4492',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4492',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791586',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Mathematics',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '25.2 x 17.7 cm',
  dimensions = '18.5 x 10 cm',
  pages_text = '12 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with mathematics.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Mathematics]", "title_english": "Aḥmad Zayn al-Daḥlān", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00050';
update public.turots_bundles set
  msid = '4493',
  dreamsea_identifier = 'DS 0097 00051',
  source_identifier = '4493',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4493',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791587',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology; Islamic Jurisprudence',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1780',
  end_year_date = '1850',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.2 x 17 cm',
  dimensions = '15.5 x 10 cm',
  pages_text = '21 pages',
  blank_pages_text = '5 pages',
  blank_pages = 5,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with Islamic theology and Jurisprudence.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Ilmu kalām/tawḥīd]", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00051';
update public.turots_bundles set
  msid = '4494',
  dreamsea_identifier = 'DS 0097 00052',
  source_identifier = '4494',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4494',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791588',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1800',
  end_year_date = '1900',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.2 x 17.3 cm',
  dimensions = '16.2 x 11 cm',
  pages_text = '8 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with Islamic theology.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Qaṣīdah li ṣibyān", "title_roman": "Poetry for Children", "title_english": "KH. Shaleh Tsani (KH. Nawawi)", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00052';
update public.turots_bundles set
  msid = '4495',
  dreamsea_identifier = 'DS 0097 00053',
  source_identifier = '4495',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4495',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791589',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = '18 Sha''bān 1318 AH',
  copying_date_gregorian = '1900 December 10',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17.5 cm',
  dimensions = '16 x 10 cm',
  pages_text = '56 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with Islamic Jurisprudence and theology, especially pertaining to the ṣalat.',
  colophon = 'Tamma hadha al-kitāb thāmin ‘ashara khalat min Sha‘ban al-mukaram sanah 1318 alf wa thalath mi’ah wa thamaniyah ‘ashara min al-hijrah al-nabawiyah.',
  bundle_notes = 'At the start it is stated that the manuscript belonged to Isḥāq ibn Muḥammad ibn Muḥammad Abī Isḥāq al-Ra‘ilī. The text also gives information about the death of a certain Haji Muḥammad ‘Alī Abu Muḥammad Shahīd Kalangun Bojonegoro.',
  affiliate_items = '[{"item_no": 1, "title_native": "Safīnat al-ṣalāh", "title_roman": "Safīnat al-ṣalāh", "title_english": "‘Abdullāh ibn ‘Umar bin Yaḥyā al-Ḥaḍramī", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00053';
update public.turots_bundles set
  msid = '4496',
  dreamsea_identifier = 'DS 0097 00054',
  source_identifier = '4496',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4496',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791590',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = '11 Muḥarram 1346 AH',
  copying_date_gregorian = '1927 July 10',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.6 x 18.2 cm',
  dimensions = '17.5 x 13.5 cm',
  pages_text = '16 pages',
  blank_pages_text = '9 pages',
  blank_pages = 9,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains the stipulations of the qibla (the direction to be faced during performing the ṣalat).',
  colophon = 'Tammat kitabah hadha al-kitāb al-musammā bi Radd al-ghaflah ‘an al-ijtihād fī al-qiblah laylah al-Aḥad liaḥada ‘ashara min shahr al-Muḥarram fī tārīkh 1346 sanah Jim al-akhīr fī 10 min Juli 1927 dan 1857 Jawa.',
  bundle_notes = 'At the start is written hadhā al-kitāb al-musammā bi radd al-ghaflah ‘an al-ijtihād fi al-qiblah. Ta’lif kathīr nuzulah rāji raḥmat rabbih al-ghaffār Abū ‘Abdillah Muḥammad Faqīh ibn ‘Abd al-Jabbār.',
  affiliate_items = '[{"item_no": 1, "title_native": "Radd al-ghaflah ‘an al-ijtihād fī al-qiblah", "title_roman": "Radd al-ghaflah ‘an al-ijtihād fī al-qiblah", "title_english": "‘Abdillah Muḥammad Faqīh ibn ‘Abd al-Jabbār", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00054';
update public.turots_bundles set
  msid = '4497',
  dreamsea_identifier = 'DS 0097 00055',
  source_identifier = '4497',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4497',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791591',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = '‘Abd al-Raḥman bin ‘Abd Salām',
  copying_date_native = '13 Rabī‘ al-Thānī 1328',
  copying_date_gregorian = '1910 April 22',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Sampurnan',
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.5 x 18 cm',
  dimensions = '22 x 15 cm',
  pages_text = '66 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The text deals with Islamic jurisprudence.',
  colophon = 'Tammat al-kitabah waqt al-Ḍuḥa lithalāth ‘ashara min Shahr Rabī‘ al-Thānī sanah al-Bā’ sanah 1328 ‘alá yad katibihā ‘Abd al-Raḥman bin ‘Abd Salām Sampurnan ghafarallāh.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Fayḍ al-mulk la-‘alām limā ishtamala ‘alayh al-nusuk min al-aḥkām", "title_roman": "Fayḍ al-mulk al-‘alām limā ishtamala ‘alayh al-nusuk min al-aḥkām", "title_english": "Yūsuf al-Baṭaḥ al-Makkī al-Shāfi‘ī", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00055';
update public.turots_bundles set
  msid = '4498',
  dreamsea_identifier = 'DS 0097 00056',
  source_identifier = '4498',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4498',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791592',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Sufism; Literature',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '1293 AH',
  copying_date_gregorian = '1876',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.5 X 17 cm',
  dimensions = '19 x 12 cm',
  pages_text = '20 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains Sufi poetic prayers.',
  colophon = 'Tamma al-kitāb bi ḥamdillāh wa ‘awnih sanah 1293 H.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Qaṣīdah al-munfarijah", "title_roman": "Qaṣīdah al-munfarijah", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": "قصيدة يا أرحم الراحمين"}, {"item_no": 2, "title_native": "Qaṣīdah yā arḥama al-rāḥimīn", "title_roman": "‘Abdullāh bin Ḥusayn bin Ṭāhir al-‘Alawī al-Ḥaḍramī", "title_english": "Arabic", "author": "قصيدة الأمالي", "language": "Qaṣīdah al-amālī"}, {"item_no": 3, "title_native": "Sirāj al-Dīn ‘Alī bin ‘Uthmān al-Uwhī al-Farghānī", "title_roman": "Arabic; Javanese", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00056';
update public.turots_bundles set
  msid = '4499',
  dreamsea_identifier = 'DS 0097 00057',
  source_identifier = '4499',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4499',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791593',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Arabic Stylistics',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '1309 AH',
  copying_date_gregorian = '1892',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Sampurnan, Bungah, Gresik',
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.5 X 18.5 cm',
  dimensions = '19 x 18 cm',
  pages_text = '20 pages',
  blank_pages_text = '7 pages',
  blank_pages = 7,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with the basics of Arabic stylistics.',
  colophon = 'Tamma biqalam ‘Abd al-Raḥmān ibn al-marḥūm al-ḥaj ‘Abd al-Salām al-Sampurnani ‘afallāh ‘anhumā āmīn rabb al-‘ālamīn lithamān khalwan min dhi al-qa‘dah 1309.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Mukhtaṣar fī balāghah wa tawabi‘ihi", "title_roman": "Mukhtaṣar fī balāghah wa tawabi‘ihi", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00057';
update public.turots_bundles set
  msid = '4500',
  dreamsea_identifier = 'DS 0097 00058',
  source_identifier = '4500',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4500',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791594',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = NULL,
  copying_date_native = '28 Ramaḍān 1311 AH',
  copying_date_gregorian = '1894 April 03',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '27 x 17.5 cm',
  dimensions = '17.8 x 10 cm',
  pages_text = '32 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with Islamic theology.',
  colophon = 'Tammat wallāh a‘lam li Ithnayn baqiyat min Ramaḍān wa fī alif ya ghain sha min hijrah al-Nabī ṣallallāh ‘alayhi wa ‘alā alihi wa aṣḥābihi ajma‘īn ‘alā yad kātibihā ‘Abd al-Raḥmān bin ‘Abd al-Salām ‘afallāh wa ‘an mashayikhi āmīn.',
  bundle_notes = 'The text is in the form of a poem.',
  affiliate_items = '[{"item_no": 1, "title_native": "Qaṣīdah li al-ṣibyān", "title_roman": "Poems for children", "title_english": "KH. Shaleh Tsani (KH. Nawawi)", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00058';
update public.turots_bundles set
  msid = '4501',
  dreamsea_identifier = 'DS 0097 00059',
  source_identifier = '4501',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4501',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791595',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Astrology',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '20 Shawwāl 1313 AH',
  copying_date_gregorian = '1896 April 03',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '25 x 17.7 cm',
  dimensions = '17 x 12.8 cm',
  pages_text = '32 pages',
  blank_pages_text = '2 pages',
  blank_pages = 2,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'Yes',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic astrology (falak).',
  colophon = 'Katabahu al-ḥaqīr al-faqīr ilāllāh ta‘alā Ḥajj ‘Abd al-Raḥmān ibn Ḥaj Ibrāhīm ibn al-marḥūm Khāṭīb Malayu fī Makkah al-Musharafah fī sūq al-layl fī al-diwān Shaykh Aḥmad Rūm fī layla al-Sabt 20 Shawwāl sanah 1313 H.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Tawḍīḥ laṭīf ‘alá al-Risālah al-mawḍū’ah fī al-‘amal", "title_roman": "Tawḍīḥ laṭīf ‘alá al-Risālah al-mawḍū’ah fī al-‘amal", "title_english": "Aḥmad bin Aḥmad bin ‘Abd al-Ḥaq al-Nabāṭī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00059';
update public.turots_bundles set
  msid = '4502',
  dreamsea_identifier = 'DS 0097 00060',
  source_identifier = '4502',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4502',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791596',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '13 Sha‘bān 1355 AH',
  copying_date_gregorian = '1936 October 28',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Sampurnan, Bungah, Gresik',
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.2 x 17 cm',
  paper_size = '21.2 x 17 cm',
  dimensions = '14 x 11 cm',
  pages_text = '16 pages',
  blank_pages_text = '4 pages',
  blank_pages = 4,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The text deals with legal matters around the fast.',
  colophon = 'Tamat al-kitāb wa al-qirā’ah bi Madrasah al-Sa‘ādah yawm al-Khamsi al-hilāl thalāthah ‘ashara fi shahr Sha‘bān fi sanah 1355 H ghasanah.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Qaṣīdah al-Ṣawm", "title_roman": "Qaṣīdah al-Ṣawm", "title_english": "KH. Shaleh Tsani (KH. Nawawi)", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00060';
update public.turots_bundles set
  msid = '4503',
  dreamsea_identifier = 'DS 0097 00061',
  source_identifier = '4503',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4503',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791597',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Sermons',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '17 x 10.8 cm',
  dimensions = '15 x 8 cm',
  pages_text = '16 pages',
  blank_pages_text = '8 pages',
  blank_pages = 8,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript contains Friday and marriage sermons.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Khuṭbah Jum''at", "title_roman": "Friday Sermons", "title_english": "‘Abdullāh ibn al-Sayyid ‘Umar ibn Muḥammad Shaṭā al-Makkī", "author": "Arabic", "language": "خطبة لعقد النكاح"}, {"item_no": 2, "title_native": "Marriage sermons", "title_roman": "Anonymous", "title_english": "Arabic", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00061';
update public.turots_bundles set
  msid = '4504',
  dreamsea_identifier = 'DS 0097 00062',
  source_identifier = '4504',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4504',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791598',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence; Islamic Theology',
  copyist = 'Anonymous',
  copying_date_native = '28 Rajab 1331 AH',
  copying_date_gregorian = '1913 July 2',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = 'Sampurnan',
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.4 x 13.4 cm',
  paper_size = '20.8 x 13.4 cm',
  dimensions = '17.5 cm x 9.5 cm',
  pages_text = '44 pages',
  blank_pages_text = '7 pages',
  blank_pages = 7,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript deals with the fast.',
  colophon = 'Tammat al-kitābah waqt al-‘asr fī tārīkh 28 Rajab sanah 1331 aw 2 Juli sanah 1913... Tamma bi ‘awnillāh…fī 20 Sha‘bān 1331 sanah alif waqt al-Ḍuḥā yawm al-Khamīs...',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Kitāb al-ṣiyām", "title_roman": "Kitāb al-ṣiyām", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": "خاتمة مراقى فى السعادات فى التوحيد"}, {"item_no": 2, "title_native": "Khātimah murāqī al-sa‘ādah fī tawḥīd", "title_roman": "Anonymous", "title_english": "Arabic; Javanese", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00062';
update public.turots_bundles set
  msid = '4505',
  dreamsea_identifier = 'DS 0097 00063',
  source_identifier = '4505',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4505',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791599',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Astrology',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '20 Shawwāl 1313 AH',
  copying_date_gregorian = '1896 April 03',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '25 x 17.7 cm',
  dimensions = '17 x 12.8 cm',
  pages_text = '32 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic astrology (falak).',
  colophon = 'Katabahu al-ḥaqīr al-faqīr ilallāh ta‘alā Ḥajj ‘Abd al-Raḥmān ibn Ḥaj Ibrāhīm ibn al-marḥūm Khāṭīb Malayu fī Makkah al-Musharafah fī sūq al-layl fī al-diwān Shaykh Aḥmad Rūm fī layla al-Sabt 20 Shawāl sanah 1313 H.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Tawḍīḥ laṭīf ‘alá al-Risālah al-mawḍū’ah fī al-‘amal", "title_roman": "Tawḍīḥ laṭīf ‘alá al-Risālah al-mawḍū’ah fī al-‘amal", "title_english": "Aḥmad bin Aḥmad bin ‘Abd al-Ḥaq al-Nabāṭī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00063';
update public.turots_bundles set
  msid = '4506',
  dreamsea_identifier = 'DS 0097 00064',
  source_identifier = '4506',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4506',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791600',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17 cm',
  dimensions = '19 x 14 cm',
  pages_text = '16 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic theology.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete as the start and ending are missing.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Islamic theology]", "title_english": "Anonymous", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00064';
update public.turots_bundles set
  msid = '4507',
  dreamsea_identifier = 'DS 0097 00065',
  source_identifier = '4507',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4507',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791601',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Prayers',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17 cm',
  dimensions = '15 x 10 cm',
  pages_text = '20 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains Islamic prayers.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "Fatḥ al-raḥmān", "title_roman": "The key of love", "title_english": "Muḥammad Ibn Ziyāḍ al-Waḍāḥ", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00065';
update public.turots_bundles set
  msid = '4508',
  dreamsea_identifier = 'DS 0097 00066',
  source_identifier = '4508',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4508',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791602',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology; Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.5 x 17 cm',
  dimensions = '18 x 12 cm',
  pages_text = '24 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'Yes',
  illustration = 'Yes',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic theology and Islamic Jurisprudence.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "Sullam al-tawfīq", "title_english": "‘Abdullāh ibn Ḥusayn ibn Ṭāhir", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00066';
update public.turots_bundles set
  msid = '4509',
  dreamsea_identifier = 'DS 0097 00067',
  source_identifier = '4509',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4509',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791603',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21 x 16.8 cm',
  dimensions = '14.2 x 12 cm',
  pages_text = '20 pages',
  blank_pages_text = '4 pages',
  blank_pages = 4,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic theology.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete.',
  affiliate_items = '[{"item_no": 1, "title_native": "Kharīdah al-bahīyah", "title_roman": "Kharīdah al-bahīyah", "title_english": "Aḥmad al-Dardirī", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00067';
update public.turots_bundles set
  msid = '4510',
  dreamsea_identifier = 'DS 0097 00068',
  source_identifier = '4510',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4510',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791604',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Hagiography',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1800',
  end_year_date = '1900',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.6 x 18 cm',
  dimensions = '20 x 13.5 cm',
  pages_text = '102 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with the history of the prophets.',
  colophon = NULL,
  bundle_notes = 'The manuscript is incomplete. At the start is stated that it used to belong to ‘Abd al-Ḥamīd ibn ‘Abd al-Raḥmān ibn ‘Abd al-Salām Sampurnan, Bungah, Gresik.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Qaṣīdah sharf al-anām]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00068';
update public.turots_bundles set
  msid = '4511',
  dreamsea_identifier = 'DS 0097 00069',
  source_identifier = '4511',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4511',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791605',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Astrology',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '20 Shawwāl 1313 AH',
  copying_date_gregorian = '1896 April 03',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '25 x 17.7 cm',
  dimensions = '17 x 12.8 cm',
  pages_text = '32 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'Yes',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic astrology (falak).',
  colophon = 'Katabahu al-ḥaqīr al-faqīr ilallāh ta‘alā Ḥajj ‘Abd al-Raḥmān ibn Ḥaj Ibrāhīm ibn al-marḥūm Khāṭīb Malayu fī Makkah al-Musharifah fī sūq al-layl fī al-diwān Shaykh Aḥmad Rūm fī layla al-Sabt 20 Shawāl sanah 1313 H.',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Tawḍīḥ laṭīf ‘alá al-Risālah al-mawḍū’ah fī al-‘amal", "title_roman": "Tawḍīḥ laṭīf ‘alá al-Risālah al-mawḍū’ah fī al-‘amal", "title_english": "Aḥmad bin Aḥmad bin ‘Abd al-Ḥaq al-Nabāṭī", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00069';
update public.turots_bundles set
  msid = '4512',
  dreamsea_identifier = 'DS 0097 00070',
  source_identifier = '4512',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4512',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791606',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Literature',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1800',
  end_year_date = '1900',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24.8 x 17.9 cm',
  dimensions = '21 x 13.5 cm',
  pages_text = '16 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript contains various Arabic songs (qaṣīdah).',
  colophon = NULL,
  bundle_notes = 'At the start is stated that the manuscript used to belong to ‘Abd al-Ḥamīd bin ‘Abd al-Raḥmān bin ‘Abd al-Salām.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Qaṣīdah Compilation]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00070';
update public.turots_bundles set
  msid = '4513',
  dreamsea_identifier = 'DS 0097 00071',
  source_identifier = '4513',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4513',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791607',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Theology; Islamic Jurisprudence',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = 'Rabī‘ al-thānī 1335 AH',
  copying_date_gregorian = 'February 1917',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '24 x 18 cm',
  dimensions = '21 x 19.5 cm',
  pages_text = '40 pages',
  blank_pages_text = '3 pages',
  blank_pages = 3,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text deals with Islamic theology and jurisprudence.',
  colophon = 'Tammat al-Khātimah yawm al-Aḥad…min sharḥ Rabī‘ al-thānī sanah al-dāl tārikh 1335 al-muwfiq bitārīkh al-Jāwī 1847 wa bitārīkh al-masīh 1917 ‘alá yad kātibihā ‘Abd al-Raḥmān bin ‘Abd al-Salām.',
  bundle_notes = 'At the end is a note about a debate about and the construction of a mosque between kiais from Gresik. The note is: “tahun jim awal 1349 saking hijrah nabi ana wara-wara Kiai ana ing distrik Bunguh Kiai Ismail munsuh Kiai Faqih Dukun Maskumambang lan kiai-kiai Gresik lan kiai-kiai Sedayu saking wulan Syawwal tanggal 22 dina Khamis Wage wulan Maet tanggal 21 tarikh 1931 (perdebatan tentang salat mu’adah/salat zuhur setelah Jumatan).',
  affiliate_items = '[{"item_no": 1, "title_native": "‘Aqīdah al-‘awām", "title_roman": "‘Aqīdah al-‘awām", "title_english": "Aḥmad al-Marzūqī", "author": "Arabic; Javanese", "language": "خاتمة فى التوحيد"}, {"item_no": 2, "title_native": "Khātimah fī al-tawḥīd", "title_roman": "Anonymous", "title_english": "Arabic; Javanese", "author": "باب في حكم الاثرار بالملاءة", "language": "Bāb fī ḥukm al-ithrār bi al-milā’"}, {"item_no": 3, "title_native": "Anonymous", "title_roman": "Arabic; Javanese", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00071';
update public.turots_bundles set
  msid = '4514',
  dreamsea_identifier = 'DS 0097 00072',
  source_identifier = '4514',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4514',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791608',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Quranic Recitation; Islamic Jurisprudence; Prayers',
  copyist = 'Muḥammad ‘Āqib bin ‘Abd al-Raḥmān',
  copying_date_native = '1334 AH',
  copying_date_gregorian = '1915',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '21.8 x 17.2 cm',
  dimensions = '18 x 12 cm',
  pages_text = '64 pages',
  blank_pages_text = '4 pages',
  blank_pages = 4,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Quranic recitation (tajwīd), Islamic Jurisprudence, and Islamic prayers.',
  colophon = 'Tammat al-kitābah biyad al-ḥaqīr Muḥammad ‘Āqib bin ‘Abd al-Raḥmān fi sanah ghaslad 1334',
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Quranic recitation]", "title_english": "Anonymous", "author": "Arabic", "language": "إرشاد العباد: باب النكاح"}, {"item_no": 2, "title_native": "Irshād al-‘ibād (bāb al-nikāḥ)", "title_roman": "Aḥmad Zayn al-Malībārī", "title_english": "Arabic", "author": "منحة الفتاح في اداب النكاح", "language": "Minhat al-fatāḥ fī adāb al-nikāḥ"}, {"item_no": 3, "title_native": "Aḥmad Zayn al-Dīn al-Malībārī", "title_roman": "Arabic", "title_english": "[Kumpulan doa]", "author": "[Collection of prayers]", "language": "Anonymous"}]'::jsonb
where bundle_code = 'DS 0097 00072';
update public.turots_bundles set
  msid = '4515',
  dreamsea_identifier = 'DS 0097 00073',
  source_identifier = '4515',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4515',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791609',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Sufism; Quranic Exegesis',
  copyist = 'Anonymous',
  copying_date_native = '21 Dhū al-ḥijjah 1274 AH',
  copying_date_gregorian = '1858 August 01',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21.5 x 17 cm',
  paper_size = '21.3 x 17 cm',
  dimensions = '15.8 x 10.8 cm',
  pages_text = '198 pages',
  blank_pages_text = '14 pages',
  blank_pages = 14,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Sufism.',
  colophon = 'Wa qad khatama min nuskhah hadha al-kitāb fī shahr dhi al-ḥijjah hilāl iḥdā wa ‘ishrīn wa yawm al-arbi‘a wa sanah waw alf wa miatayn wa sab‘īn wa arba‘ata sanah hijrah al-Nabī ṣalallāh ‘alayhi wa sallama... Tammat al-Futūḥāt al-Ilahiyah bi ḥamd Allāh wa ‘awnih nafa‘ Allah bihā mualifaha wa katibahā…wa qad tamma min kitābah fī yawm al-Ithnayn fi thālith shar al-Muḥaram wa huwa mimā ‘alaqahu linafsihi Muḥammad Rifā‘i Abū Idrīs...',
  bundle_notes = 'One one page is the genealogy and the ijazah of Kiai Rifa’i Rengel Tuban of the Samaniyah sufi order. Many pages are missing or have become detached from the binding.',
  affiliate_items = '[{"item_no": 1, "title_native": "Tuḥfah al-mursalah ilá rūḥ al-Nabī", "title_roman": "The Gift Addressed to TheSpirit of The Prophet", "title_english": "Muḥammad Faḍlullāh al-Burhanfūrī", "author": "Arabic", "language": "فتح الرحمن"}, {"item_no": 2, "title_native": "Fatḥ al-Raḥmān", "title_roman": "Abū Yaḥyā Zakariyā’ al-Anṣāri", "title_english": "فتوحات الإلهية", "author": "Futūḥat al-ilahīyah", "language": ""}, {"item_no": 3, "title_native": "Sulaymān Jamal", "title_roman": "Arabic", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00073';
update public.turots_bundles set
  msid = '4516',
  dreamsea_identifier = 'DS 0097 00074',
  source_identifier = '4516',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4516',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791610',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = '‘Abd al-Raḥmān',
  copying_date_native = '11 Sha‘bān',
  copying_date_gregorian = NULL,
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'Dluwang',
  paper_type = 'Dluwang',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'Yes',
  cover_size = NULL,
  paper_size = '26.5 x 17.8 cm',
  dimensions = '19.5 x 11.7 cm',
  pages_text = '426 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic Jurisprudence.',
  colophon = 'Tammat hadha al-kitāb al-musammā bi al-Taqrīb fī layl al-Sabt fī Shahr al-Sha‘bān al-hilāl al-ḥādī ‘ashara... Tamat Kitab Ghāyah al-marām ing dina Arba‘ fī al-waqt al-ḍuḥā...',
  bundle_notes = 'At the start is a note on ownership and on the genealogy of the Sufi Order that links Kiai Qomaruddin yang with Shaykh ‘Abd al-Muḥyi Pamijahan.',
  affiliate_items = '[{"item_no": 1, "title_native": "Fatḥ al-qarīb", "title_roman": "Fatḥ al-qarīb", "title_english": "Ibn Qāsim al-Ghazī", "author": "Arabic", "language": "مقدمة في غاية المرام في بيان أحكام النكاح على سائر الأنام"}, {"item_no": 2, "title_native": "Muqaddimah fī ghāyah al-marām fī bayān aḥkām al-nikāḥ ‘alā sā’ir al-anām", "title_roman": "Anonymous", "title_english": "Arabic", "author": "المختصر في أحكام النكاح", "language": "Al-Mukhtaṣar fī Aḥkām al-Nikāḥ"}, {"item_no": 3, "title_native": "Anonymous", "title_roman": "Arabic", "title_english": "", "author": "", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00074';
update public.turots_bundles set
  msid = '4517',
  dreamsea_identifier = 'DS 0097 00075',
  source_identifier = '4517',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4517',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791611',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Literature',
  copyist = 'Anonymous',
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1800',
  end_year_date = '1900',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'Yes',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '36 x 24.5 cm',
  dimensions = '30.5 x 17.8 cm',
  pages_text = '56 pages',
  blank_pages_text = '17 pages',
  blank_pages = 17,
  rubrication = 'Yes',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript contains a collection of songs in praise of the Prophet Muhammad (qaṣīdah salawat).',
  colophon = NULL,
  bundle_notes = 'At the start is a note that someone died in 1322 H.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Anthology of Qasidah]", "title_english": "Anonymous", "author": "Arabic", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00075';
update public.turots_bundles set
  msid = '4518',
  dreamsea_identifier = 'DS 0097 00076',
  source_identifier = '4518',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4518',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791612',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Diary',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = 'Sampurnan, Bungah, Gresik',
  sponsor = NULL,
  bundle_script = 'Pegon',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'Yes',
  binding = 'Yes',
  cover_size = '21 x 16.7 cm',
  paper_size = '21 x 16.5 cm',
  dimensions = '18.0 x 10.5 cm',
  pages_text = '32 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Good',
  bundle_description = 'The manuscript is a diary of a person who replaced another person on the hajj (badal).',
  colophon = NULL,
  bundle_notes = 'On the cover is written that Haji Kiai Muhamad ‘Aqib went on the hajj.',
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "[Notes about the person who acted as a substitute for the hajj]", "title_english": "‘Abd al-Raḥmān", "author": "Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00076';
update public.turots_bundles set
  msid = '4519',
  dreamsea_identifier = 'DS 0097 00077',
  source_identifier = '4519',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4519',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791613',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Diary',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = 'Sampurnan, Bungah, Gresik',
  sponsor = NULL,
  bundle_script = 'Pegon',
  writing_support = 'Lined Paper',
  paper_type = 'Lined Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'Yes',
  cover_size = NULL,
  paper_size = '21.3 x 16.8 cm',
  dimensions = '19 x 14.5 cm',
  pages_text = '74 pages',
  blank_pages_text = '41 pages',
  blank_pages = 41,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text is a diary of a kiai and contains notes on deaths, marriages and the building of a mosque.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "Diary", "title_english": "Anonymous", "author": "Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00077';
update public.turots_bundles set
  msid = '4520',
  dreamsea_identifier = 'DS 0097 00078',
  source_identifier = '4520',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4520',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791614',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Islamic Jurisprudence',
  copyist = 'Anonymous',
  copying_date_native = '1313 AH',
  copying_date_gregorian = '1895',
  begin_year_date = NULL,
  end_year_date = NULL,
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Arabic; Pegon',
  writing_support = 'European Paper',
  paper_type = 'European Paper',
  right_to_left = true,
  watermark = 'Yes',
  countermark = 'No',
  cover = 'No',
  binding = 'Yes',
  cover_size = NULL,
  paper_size = '25.3 x 17.6 cm',
  dimensions = '18 x 10 cm',
  pages_text = '24 pages',
  blank_pages_text = '1 page',
  blank_pages = 1,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The manuscript deals with Islamic Jurisprudence on marriage and on marriage ethics.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "Minḥat al-fattāḥ fī adāb al-nikāḥ", "title_roman": "Minḥat al-fattāḥ fī adāb al-nikāḥ", "title_english": "Muḥammad ibn Sa‘īd ibn Muḥammad ‘Ammarī Al-Shahrī", "author": "Arabic; Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00078';
update public.turots_bundles set
  msid = '4521',
  dreamsea_identifier = 'DS 0097 00079',
  source_identifier = '4521',
  affiliation_url = 'https://hmmlcloud.org/dreamsea/detail.php?msid=4521',
  iiif_manifest_url = 'https://www.vhmml.org/image/manifest/791615',
  institution = 'HMML; DREAMSEA',
  affiliation = 'Pondok Pesantren Qomaruddin',
  country = 'Indonesia',
  city_province = 'Gresik (Jawa Timur)',
  current_status = 'In situ',
  surrogate_format = 'Digital',
  catalog_reference = NULL,
  subject_matter = 'Diary',
  copyist = NULL,
  copying_date_native = NULL,
  copying_date_gregorian = NULL,
  begin_year_date = '1900',
  end_year_date = '1950',
  copying_place = NULL,
  sponsor = NULL,
  bundle_script = 'Pegon',
  writing_support = 'Paper',
  paper_type = 'Paper',
  right_to_left = true,
  watermark = 'No',
  countermark = 'No',
  cover = 'No',
  binding = 'No',
  cover_size = NULL,
  paper_size = '34 cm x 21.5 cm',
  dimensions = '33 x 20 cm',
  pages_text = '4 pages',
  blank_pages_text = NULL,
  blank_pages = NULL,
  rubrication = 'No',
  illumination = 'No',
  illustration = 'No',
  physical_condition = 'Poor',
  bundle_description = 'The text is a diary on the construction of a mosque.',
  colophon = NULL,
  bundle_notes = NULL,
  affiliate_items = '[{"item_no": 1, "title_native": "", "title_roman": "Diary", "title_english": "Anonymous", "author": "Javanese", "language": ""}]'::jsonb
where bundle_code = 'DS 0097 00079';

-- 2. BRITISH LIBRARY / EAP (204 Bendel)
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_001',
  source_identifier = 'EAP1564/1/1',
  reference_code = 'EAP1564/1/1',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-1',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-1',
  display_title = 'بوكو كيتاب المخفوظات اخلاق',
  file_title = 'بوكو كيتاب المخفوظات اخلاق',
  variant_titles = 'The manners book
بوكو كيتاب المخفوظات اخلاق
Buku kitab al-makhfū ẓat al-akhlaq',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains text about manners in Islam. The text is in question and answer models. Some of the text is written using blue while some with pencil.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Height 20cm, widht 16,8cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'بوكو كيتاب المخفوظات اخلاق, British Library, EAP1564/1/1, https://eap.bl.uk/archive-file/EAP1564-1-1',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_1';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_002',
  source_identifier = 'EAP1564/1/2',
  reference_code = 'EAP1564/1/2',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-2',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-2',
  display_title = 'موليد شفىيل انام',
  file_title = 'موليد شفىيل انام',
  variant_titles = 'The birth of Prophet Muhammad
موليد شفىيل انام
Mawlīd shafī''íl Anām',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '28',
  digitisation_date = '2024',
  bundle_description = 'This text tells about praise for The Prophet Muhammad and gartitude to Allah. The precense of a prophet who soothe the soul and bring intercession for the people who follow him. The text has 6 rows per page with the use of black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 16cm, width 10cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'موليد شفىيل انام, British Library, EAP1564/1/2, https://eap.bl.uk/archive-file/EAP1564-1-2',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_2';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_003',
  source_identifier = 'EAP1564/1/3',
  reference_code = 'EAP1564/1/3',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-3',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-3',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'Islamic Jurisprudence
فقه
Fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'Islamic jurisprudence is the main core discussed in this manuscript. The laws are described start from the chapter of denying religion, the law of accusing adultery, the law on stealing and robbing. The manuscript has 13 rows per page with black ink. This manuscript can be read properly. There found a catch word.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Height 25.3cm, width 17.9cm..

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'فقه, British Library, EAP1564/1/3, https://eap.bl.uk/archive-file/EAP1564-1-3',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_3';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_004',
  source_identifier = 'EAP1564/1/4',
  reference_code = 'EAP1564/1/4',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-4',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-4',
  display_title = 'صلوات ظعتيل حبيب',
  file_title = 'صلوات ظعتيل حبيب',
  variant_titles = 'Selawat Nabi (Blessing of The Prophet)
صلوات ظعتيل حبيب
Ṣalawat ẓo''atil ḥabib',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '116',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains praise for The Prophet Muhammad, gained blessings from the beloved prophet to eliminate the complexities of life. The manuscript has 9 rows per page with black and red ink. It has rubrication as well.

Extent: 1 European manuscript.

Size and dimensions of original material: height 20cm, width 16cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'صلوات ظعتيل حبيب, British Library, EAP1564/1/4, https://eap.bl.uk/archive-file/EAP1564-1-4',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_4';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_005',
  source_identifier = 'EAP1564/1/5',
  reference_code = 'EAP1564/1/5',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-5',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-5',
  display_title = 'حسابة موسم الحساب',
  file_title = 'حسابة موسم الحساب',
  variant_titles = 'Harvest Season Calculation
حسابة موسم الحساب
Ḥisābat musim al-ḥisāb',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a sheet of columnar calculations for farming seasons. A description of the months suitable from planting to harvesting. The manuscript has 9 rows per page with black ink.

Extent: 1 European manuscript.

Size and dimensions of original material: height 10.6cm, width 16.8cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'حسابة موسم الحساب, British Library, EAP1564/1/5, https://eap.bl.uk/archive-file/EAP1564-1-5',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_5';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_006',
  source_identifier = 'EAP1564/1/6',
  reference_code = 'EAP1564/1/6',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-6',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-6',
  display_title = 'فريدة الباهية',
  file_title = 'فريدة الباهية',
  variant_titles = 'Islamic interpretation of monotheism
فريدة الباهية
Farīdat al-bāhiyyah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'The nature of Allah and the apostles is explained in this manuscript. The beginning of the text explains that knowing the nature of Allah is important for the beliefs of muslims. Continued with explanations about the nature of Allah and the apostles. The manuscript has 11 rows in every page. Some in the form of two columns and some in the form of rows. The text is written in different font sizes on lined paper with black ink and pencil.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Height 21cm, width 16.4cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'فريدة الباهية, British Library, EAP1564/1/6, https://eap.bl.uk/archive-file/EAP1564-1-6',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_6';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_007',
  source_identifier = 'EAP1564/1/7',
  reference_code = 'EAP1564/1/7',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-7',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-7',
  display_title = 'شعير فرجوواڠان فميليهان عموم اشاره سيمبول نَهْضَةُلْعُلَماَءْ',
  file_title = 'شعير فرجوواڠان فميليهان عموم اشاره سيمبول نَهْضَةُلْعُلَماَءْ',
  variant_titles = 'Struggle poems of Nadhatul Ulama
شعير فرجوواڠان فميليهان عموم اشاره سيمبول نَهْضَةُلْعُلَماَءْ
Syingir Perjuangan Pemilihan Umum lan Isyarah Simbul Nadhatul Ulama',
  creation_date = '8 Jan 1955',
  copying_date_native = '8 Jan 1955',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '10',
  digitisation_date = '2024',
  bundle_description = 'This manuscript reveal the meaning of Nadhatul Ulama symbols and struggle poems to strengthen the spirit of Nadhatul Ulama members facing the general election. There is a statement that manuscript was disseminated by Nadhatul Ulama Branch Officers at Wanakrama Tengah 2/8 Surabaya. This printed manuscript is written in 23 rows devided into 2 columns.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Height 21.9cm, width 17.4cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'شعير فرجوواڠان فميليهان عموم اشاره سيمبول نَهْضَةُلْعُلَماَءْ, British Library, EAP1564/1/7, https://eap.bl.uk/archive-file/EAP1564-1-7',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_7';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_008',
  source_identifier = 'EAP1564/1/8',
  reference_code = 'EAP1564/1/8',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-8',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-8',
  display_title = 'اويه وٓروه',
  file_title = 'اويه وٓروه',
  variant_titles = 'Personal Notes
اويه وٓروه
Aweh weruh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript has two contents. The first pages is a diary of someone about the problems of life faced. He cries remembering Allah and his late father. The next two pages are prayers during the Hajj pilgrimage accompanied bi pictures of the place where the prayers must be recited. This text was written with pencil and black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: height 33.7cm, width 21.8cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'اويه وٓروه, British Library, EAP1564/1/8, https://eap.bl.uk/archive-file/EAP1564-1-8',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_8';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_009',
  source_identifier = 'EAP1564/1/9',
  reference_code = 'EAP1564/1/9',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-9',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-9',
  display_title = 'دعاء الختمة المكتوب في بعض المصحف العثمان',
  file_title = 'دعاء الختمة المكتوب في بعض المصحف العثمان',
  variant_titles = 'Prayer for Completion of The Qur''an
دعاء الختمة المكتوب في بعض المصحف العثمان
Du''a min al-khatimah al-maktū b fī ba''ḍa al-muṣḥaf al-''uthmani',
  creation_date = '20th century',
  copying_date_native = '20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains the prayer for completion of The Qur''an. There is information that the prayer has been written is a partial copy of The Usman Mushaf published in Egypt. This text was 14 rows per page with black ink. There is a catchword in this text

Extent: 1 Merang paper manuscript.

Size and dimensions of original material: Height 21.8cm, width 16.9cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic, Ramadhan 1341 Hijriah.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'دعاء الختمة المكتوب في بعض المصحف العثمان, British Library, EAP1564/1/9, https://eap.bl.uk/archive-file/EAP1564-1-9',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_9';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_010',
  source_identifier = 'EAP1564/1/10',
  reference_code = 'EAP1564/1/10',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-10',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-10',
  display_title = 'علم صرف',
  file_title = 'علم صرف',
  variant_titles = 'Arabic Grammar
علم صرف
Ilmu ṣarf',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains one of the branches Arabic grammar namely Sharaf. Starting from chapter Al-Ajwaf (verb in Arabic grammar that has a three-letter root and undergoes a change in its final form) and ending with chapter An-Naqis (verb where one of the original letters is the letter ''illat). This text has 14 rows per pages and written with black ink. Some in the form of two columns and some in the form of rows. There found a catch word in this manuscript.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 24.7cm, width 17.7cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'علم صرف, British Library, EAP1564/1/10, https://eap.bl.uk/archive-file/EAP1564-1-10',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_10';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_011',
  source_identifier = 'EAP1564/1/11',
  reference_code = 'EAP1564/1/11',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-11',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-11',
  display_title = 'برزانجي',
  file_title = 'برزانجي',
  variant_titles = 'Praise of The Prophet Muhammad
برزانجي
Barzanji',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'This manuscript tells praising the Prophet Muhammad. This text is in the form of an excerpt that begins with praise for the prophet, followed by the story of the prophet''s struggle. Each page consists of 8 lines and written using black ink. In this manuscript there found a catch word. There is ionformation in this manuscript about members of Barzanji association in Bungah village that written with pencil.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 25cm, width 17.8cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'برزانجي, British Library, EAP1564/1/11, https://eap.bl.uk/archive-file/EAP1564-1-11',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_11';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_012',
  source_identifier = 'EAP1564/1/12',
  reference_code = 'EAP1564/1/12',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-12',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-12',
  display_title = 'نظمن صرف',
  file_title = 'نظمن صرف',
  variant_titles = 'Arabic Grammar in Verse
نظمن صرف
Naẓoman ṣaraf',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'Arabic grammar in verse form is the content of this manuscript. This verse form is the creation of Syaikh Imam Ahmad Abi Abbas Syihabuddin bin Imaduddin Imad. This text has 13 rows of two columns form written in black ink and found a catch word in several pages.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 25.5cm, width 18cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'نظمن صرف, British Library, EAP1564/1/12, https://eap.bl.uk/archive-file/EAP1564-1-12',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_12';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_013',
  source_identifier = 'EAP1564/1/13',
  reference_code = 'EAP1564/1/13',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-13',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-13',
  display_title = 'غلب مغلوب',
  file_title = 'غلب مغلوب',
  variant_titles = 'Islamic-Javanese Astronomy
غلب مغلوب
Gholib Maghlub',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains information about the Javanese Islamic calendar system in the form of triangles facing each other with the word name of the day in Javanese calendar written on each corner. In this text, it is stated that knowledge comes from Haji Rawi Rengel. This unique manuscript is written in black ink. There is countermark in this manuscript material with the word "Salim Nahban Soerabaja".

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 24.3cm, width 18.8cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'غلب مغلوب, British Library, EAP1564/1/13, https://eap.bl.uk/archive-file/EAP1564-1-13',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_13';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_014',
  source_identifier = 'EAP1564/1/14',
  reference_code = 'EAP1564/1/14',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-14',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-14',
  display_title = 'كتاب الحداد ثاني',
  file_title = 'كتاب الحداد ثاني',
  variant_titles = 'Praise to The Appostle and Allah
كتاب الحداد ثاني
Kitāb al-ḥaddād thānī',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '40',
  digitisation_date = '2024',
  bundle_description = 'This manuscript tells about dhikr as a practice in order to save oneself from heretical teachings by praising and glorifying Allah and the Prophet Muhammad and asking forgiveness for all sins on lined papers. This manuscript has 8 lines per page and written in black ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Height 21cm, width 16.5cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'كتاب الحداد ثاني, British Library, EAP1564/1/14, https://eap.bl.uk/archive-file/EAP1564-1-14',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_14';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_015',
  source_identifier = 'EAP1564/1/15',
  reference_code = 'EAP1564/1/15',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-15',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-15',
  display_title = 'Hajj certificate',
  file_title = 'Hajj certificate',
  variant_titles = 'Hajj certificate
Certifikaat',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '10',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains three text. First, notes about instructions of moslems practices when prayer time. The text explain that moslem who sell, they must stop selling and pray first when hear adzan (call for prayer). Second, on page 5 there are letter in Dutch with Javanese information regarding the departure for the hajj in 1310 Hijri and returning in 1311 Hijri. Third, on page 9 to 10 there is a Hajj Certificate in the name of Haji Abdurahman issued by the Dutch- Grissee goverment in 1893.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Height 32.2cm, width 21.3cm.

Condition of original material: Around the edges of the page is torn.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'Hajj certificate, British Library, EAP1564/1/15, https://eap.bl.uk/archive-file/EAP1564-1-15',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_15';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_016',
  source_identifier = 'EAP1564/1/16',
  reference_code = 'EAP1564/1/16',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-16',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-16',
  display_title = 'نٓتو حول',
  file_title = 'نٓتو حول',
  variant_titles = 'Calculating days in Javanese culture
نٓتو حول
Netu Haul',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '10',
  digitisation_date = '2024',
  bundle_description = 'There are four texts are the contents of this manuscript: First, a table of gregorian calendar calculations connected to the Javanese calendar system. Second, List of kiai names whose death anniveesaries are commemorated. Third, short note in page 6-7 about the wedding day of the scriptwritter. The last, A diary about buying a house that includes the time, price and land area. This manuscript was written in black ink and a small part with bule ink that had been smudged.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Height 32.5cm, width 20.4cm.

Condition of original material: Binding still good but the edges of the pages are torn and have holes..',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'نٓتو حول, British Library, EAP1564/1/16, https://eap.bl.uk/archive-file/EAP1564-1-16',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_16';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_017',
  source_identifier = 'EAP1564/1/17',
  reference_code = 'EAP1564/1/17',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-17',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-17',
  display_title = 'سفيةالنجاة',
  file_title = 'سفيةالنجاة',
  variant_titles = 'Islamic law
سفيةالنجاة
Safīnah al-najaḥ',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '40',
  digitisation_date = '2024',
  bundle_description = 'The contents of manuscript are excerpts from a fiqh book that begins with an explanation of the impurity types (najis), the conditions for valid ablution and an explanation about prayer (sholat). At the end of the text, a description of the manuscript tittle is included, namely Safiinatin Najah by Syeikh Salim bin Sumair alHadrami, which is taught in Islamic boarding schools for novice students. This manuscript generally written in black ink but the chapter change marker are writtwn in red ink. There is a cacth word in the manuscript.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21cm, width 17.5cm.

Condition of original material: There are holes in several pages but text is still readable..',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'سفيةالنجاة, British Library, EAP1564/1/17, https://eap.bl.uk/archive-file/EAP1564-1-17',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_17';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_018',
  source_identifier = 'EAP1564/1/18',
  reference_code = 'EAP1564/1/18',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-18',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-18',
  display_title = 'الروض ميزان الشعر و الصرف',
  file_title = 'الروض ميزان الشعر و الصرف',
  variant_titles = 'Composing Arabic Poetry and grammar
الروض ميزان الشعر و الصرف
al-Rū ḍ mīzān al-shi''ir wa al-ṣarf',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains two texts. The first text is part from the book of science of Arabic poetry scales (Arudh), which explains how to compose Arabic poetry consisting of sixteen considerations. The second text discusses about Arabic grammar namely sharaf. In this manuscript written in black ink, catch word is found.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 25.5cm, width 17.9cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'الروض ميزان الشعر و الصرف, British Library, EAP1564/1/18, https://eap.bl.uk/archive-file/EAP1564-1-18',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_18';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_019',
  source_identifier = 'EAP1564/1/19',
  reference_code = 'EAP1564/1/19',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-19',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-19',
  display_title = 'صرف',
  file_title = 'صرف',
  variant_titles = 'Arabic Grammar
صرف
Ṣarf',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '84',
  digitisation_date = '2024',
  bundle_description = 'This manuscript expains about Aarabic grammar namely Sharaf, which is important to learn. The explanations includes fi''il madhi, mudlori'' dan amr (verbs in arabic grammar). In this manuscript explained that learned Sharaf is a means be able to deepen the knowledge of Islamic law. There found catch word in this manuscript written in black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21.8cm, width 17.4cm, depth 0.6cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'صرف, British Library, EAP1564/1/19, https://eap.bl.uk/archive-file/EAP1564-1-19',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_19';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_020',
  source_identifier = 'EAP1564/1/20',
  reference_code = 'EAP1564/1/20',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-20',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-20',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'Islamic Jurisprudence
فقه
Fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '76',
  digitisation_date = '2023',
  bundle_description = 'This manuscript explains about the law of islamic jurisprudence. The text explanation begins with the problems of woman''s islamic jurisprudence, including mentruasion, postpartum bleeding and istihadhah. Things that are allowed and prohibited when experiencing one of the three situation. The end of the text explains about the five daily prayers with certain limitations based on the path of the sun. this manuscript written in black ink consists of 11 lines per page. There found a catch word in ithis manuscript.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 22.5cm, width 17.7cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'فقه, British Library, EAP1564/1/20, https://eap.bl.uk/archive-file/EAP1564-1-20',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_20';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_021',
  source_identifier = 'EAP1564/1/21',
  reference_code = 'EAP1564/1/21',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-21',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-21',
  display_title = 'القران الكريم',
  file_title = 'القران الكريم',
  variant_titles = 'Holy Quran
القران الكريم
al-Quran al-karīm',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '1066',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a holy quran. The text is incomplete because of the last pages are missing. The beginning and end of the manuscript are badly torn so that they cannot be read properly.The manuscript is written in black ink for most of the text and red ink for rubrication such as stop reading marker (waqaf), end of verse, surah names and illumination. This manuscript has 11 lines per page and a catch word found at the bottom of each page. There are flower and vine-shaped illuminations typycal of Islam an the Surah Al-Fatihah and three-line frames on each page.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Height 23.2cm, width 14cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'القران الكريم, British Library, EAP1564/1/21, https://eap.bl.uk/archive-file/EAP1564-1-21',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_21';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_022',
  source_identifier = 'EAP1564/1/22',
  reference_code = 'EAP1564/1/22',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-22',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-22',
  display_title = 'هاشيّة العلم',
  file_title = 'هاشيّة العلم',
  variant_titles = 'Knowledgeable Muslim notes
هاشيّة العلم
Hashiyah al-''ilm',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '568',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a note that tells about the importance of someone having knowledge in order to uphold religion and maintain traditions in religion without leaving the purity of the knowledge chain from previous imams, ulama and masyayih. There is information that this note come from Imam Abdul Burhanuddin Syafiq Ali alFatih bin abdul Qasim and this manuscript belong to Haji Abdussalam alTubani. The text with 23 lines per page is written in black ink and the rubrication is maerked in red ink. There is a catch word in the text. Concordia watermark

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 20.7cm, width 16.5cm, depth 6.3cm.

Condition of original material: Poor.

Scribe(s): Haji Abdussalam alTubani.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'هاشيّة العلم, British Library, EAP1564/1/22, https://eap.bl.uk/archive-file/EAP1564-1-22',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_22';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_023',
  source_identifier = 'EAP1564/1/23',
  reference_code = 'EAP1564/1/23',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-23',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-23',
  display_title = 'تعلم المتعلم',
  file_title = 'تعلم المتعلم',
  variant_titles = 'Learner learning
تعلم المتعلم
Ta''lim al-muta''alim',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a note about how to a learning. Maybe it is a part of Ta''lim al-muta''alim text. The text is written with pencil.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Height 9.3cm, width 17.2cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'تعلم المتعلم, British Library, EAP1564/1/23, https://eap.bl.uk/archive-file/EAP1564-1-23',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_23';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_024',
  source_identifier = 'EAP1564/1/24',
  reference_code = 'EAP1564/1/24',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-24',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-24',
  display_title = 'إحياء علوم الدين',
  file_title = 'إحياء علوم الدين',
  variant_titles = 'Bring Religious Knowledge to Life
إحياء علوم الدين
Iḥya'' ''ulumuddin',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'A manuscript in the form of a poem compiled based on Ihya Ulumuddin book about the importance of education for children from an early age. It will determine their success in old age in achieving happiness in the world and good fortune in the hereafter. There is a reccommendation in the text to follow the opinion of Imam Ghazali in term of education that parents must teach their children in the Ihya Ulumuddin book whose knowledge is as wide as the ocean. The manuscript written in black ink consists of 17 lines divided into two columns. Catch words are found in this manuscript.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 19.4cm, width 14.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'إحياء علوم الدين, British Library, EAP1564/1/24, https://eap.bl.uk/archive-file/EAP1564-1-24',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_24';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_025',
  source_identifier = 'EAP1564/1/25',
  reference_code = 'EAP1564/1/25',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-25',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-25',
  display_title = 'نور حسنة',
  file_title = 'نور حسنة',
  variant_titles = 'A Small note
نور حسنة
Nur Hasanah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript with the word "Sate Embik" (goat meat satay) and the name of a person, namely Nur Hasanah Nursilam binti Rodiaulromlah. This text is written on a cigarette wrapper of the brand "Gudang garam Djaja".

Extent: 1 Cigarette wrapper manuscript.

Size and dimensions of original material: Height 26.2cm, width 18cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'نور حسنة, British Library, EAP1564/1/25, https://eap.bl.uk/archive-file/EAP1564-1-25',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_25';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_026',
  source_identifier = 'EAP1564/1/26',
  reference_code = 'EAP1564/1/26',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-26',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-26',
  display_title = 'كوكب متقرب',
  file_title = 'كوكب متقرب',
  variant_titles = 'Life of living things in Arab
كوكب متقرب
Kawakib mutaqorib',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'The story written in this manuscript is about climate changes that occured in Arab, animal life, plants and human movement during their Safar (journey). No beginning and end pages were found. The manuscript consisting of two pages was written in black ink on 18 lines per page.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 7.2cm, width 18.8cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'كوكب متقرب, British Library, EAP1564/1/26, https://eap.bl.uk/archive-file/EAP1564-1-26',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_26';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_027',
  source_identifier = 'EAP1564/1/27',
  reference_code = 'EAP1564/1/27',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-27',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-27',
  display_title = 'تردالمرعة',
  file_title = 'تردالمرعة',
  variant_titles = 'Women and Marriage Guidance
تردالمرعة
Tarod al-mar''ah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '32',
  digitisation_date = '2024',
  bundle_description = 'This manuscript discusses about married life. It begins with an explaination of things that women need to pay attention if there are defects in themselves in their married life. The obligation to provider a dowry and maintenance by man is also explained in the manuscript. The manuscript ends with an explaination of the husband''s fair attitude if he has more than 1 wife. Manuscript with 14 lines per page is written in black ink and accompanied by a catch word at the bottom of the page.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 22.7cm, width 17.2cm.

Condition of original material: Fair.

Scribe(s): Muhammad Aqib bin Abdurrahman Abdussalam..',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'تردالمرعة, British Library, EAP1564/1/27, https://eap.bl.uk/archive-file/EAP1564-1-27',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_27';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_028',
  source_identifier = 'EAP1564/1/28',
  reference_code = 'EAP1564/1/28',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-28',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-28',
  display_title = 'وابدابنفسيك',
  file_title = 'وابدابنفسيك',
  variant_titles = 'Manners start from oneself
وابدابنفسيك
Wabda'' binafsika',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a poem containing various manners of praying, knowing the time of prayer that is easily answered to the manners of eating and drinking, also manners when attending a wmeal invitation. This manuscript consists of 16 lines divided into two columns.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Height 22.2cm, width 17.7cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'وابدابنفسيك, British Library, EAP1564/1/28, https://eap.bl.uk/archive-file/EAP1564-1-28',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_28';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_029',
  source_identifier = 'EAP1564/1/29',
  reference_code = 'EAP1564/1/29',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-29',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-29',
  display_title = 'احكام الصيد والذبائح',
  file_title = 'احكام الصيد والذبائح',
  variant_titles = 'The Law of Slaughtering Sacrificial Animal
احكام الصيد والذبائح
Ahkam al-ṣoid wa al-dhabaiḥ',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This manuscript explains the law of slaughtering sacrificial animal. It begins with an explaination about the law of hunting, animal that are suitable for sacrifice, slaughtering sacrificial animal and the law of eating sacrificial meat. The manuscript has 13 lines per page written in black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 24.7cm, width 17.3cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'احكام الصيد والذبائح, British Library, EAP1564/1/29, https://eap.bl.uk/archive-file/EAP1564-1-29',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_29';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_030',
  source_identifier = 'EAP1564/1/30',
  reference_code = 'EAP1564/1/30',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-30',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-30',
  display_title = 'لمحت المفاده في بيان الجمعة',
  file_title = 'لمحت المفاده في بيان الجمعة',
  variant_titles = 'Treatise of Friday Prayer
لمحت المفاده في بيان الجمعة
Lamḥat al-mufādah fī al-bayān al-jum''ah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '26',
  digitisation_date = '2024',
  bundle_description = 'Friday prayer treatise is the main topic explained in this manuscript. There is information in this manuscript that it was compiled by Syeikh Salim alKhadari and copied Abdurrohman bin Haji Abdussalam Rembang di Tuban Rengel. This manuscript has 22 lines on each page and is written in black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 20.4cm, widht 16cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'لمحت المفاده في بيان الجمعة, British Library, EAP1564/1/30, https://eap.bl.uk/archive-file/EAP1564-1-30',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_30';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_031',
  source_identifier = 'EAP1564/1/31',
  reference_code = 'EAP1564/1/31',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-31',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-31',
  display_title = 'لؤلؤالمرحمه',
  file_title = 'لؤلؤالمرحمه',
  variant_titles = 'A Jewel Blessed by Allah
لؤلؤالمرحمه
Lu''lu'' al-marḥumah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '64',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a collection of prayers about God giving ease after hardship. The manuscript consists of 12 lines per page written in black, blue and green ink. The manuscript material is lined paper from a notebook made by Jacobson Van der Berg & Co. Words were found in this manuscript.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 20.4cm, widht 16cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'لؤلؤالمرحمه, British Library, EAP1564/1/31, https://eap.bl.uk/archive-file/EAP1564-1-31',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_31';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_032',
  source_identifier = 'EAP1564/1/32',
  reference_code = 'EAP1564/1/32',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-32',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-32',
  display_title = 'كتاب التوحيد',
  file_title = 'كتاب التوحيد',
  variant_titles = 'Monotheism Book
كتاب التوحيد
Kitabu al-tauḥid',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '38',
  digitisation_date = '2024',
  bundle_description = 'This manuscript about Tawhid begins with an explanation about meaning of the shahada sentences and ends with a chapter about the Ramadan fast. There are 6 lines on each page and it is written using black ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 20.4cm, widht 16cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'كتاب التوحيد, British Library, EAP1564/1/32, https://eap.bl.uk/archive-file/EAP1564-1-32',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_32';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_033',
  source_identifier = 'EAP1564/1/33',
  reference_code = 'EAP1564/1/33',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-33',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-33',
  display_title = 'الذكر بعد الصلاة',
  file_title = 'الذكر بعد الصلاة',
  variant_titles = 'Dhikr after Prayer
الذكر بعد الصلاة
Dzikru ba''da al-ṣolat',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a collection of dhikr after prayer. There are 9 lines on each page written in black ink.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 18cm, widht 11.3cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'الذكر بعد الصلاة, British Library, EAP1564/1/33, https://eap.bl.uk/archive-file/EAP1564-1-33',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_33';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_034',
  source_identifier = 'EAP1564/1/34',
  reference_code = 'EAP1564/1/34',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-34',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-34',
  display_title = 'ادب هڠ كوبوران',
  file_title = 'ادب هڠ كوبوران',
  variant_titles = 'Manners in The Cemetery Area
ادب هڠ كوبوران
Adab ing Kuburan',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This two-page manuscript is a study material for the Islamic religion. The Javanese manuscript in Pegon script explains the prohibitions and manners of being in the cemetery or grave area, such as the prohibition of stepping on graves, the prohibition of urinating, defecating and raising livestock in the cemetery area. The manuscript is written in black ink.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 27.8cm, widht 16.7cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'ادب هڠ كوبوران, British Library, EAP1564/1/34, https://eap.bl.uk/archive-file/EAP1564-1-34',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_34';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_035',
  source_identifier = 'EAP1564/1/35',
  reference_code = 'EAP1564/1/35',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-35',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-35',
  display_title = 'كيتاب الربع ليعضهم',
  file_title = 'كيتاب الربع ليعضهم',
  variant_titles = 'كيتاب الربع ليعضهم
Kitāb al-rabi'' liya''ḍihim',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'Undefined text. Some text shown about the reduction of years. The text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 16.7cm, widht 11cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'كيتاب الربع ليعضهم, British Library, EAP1564/1/35, https://eap.bl.uk/archive-file/EAP1564-1-35',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_35';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_036',
  source_identifier = 'EAP1564/1/36',
  reference_code = 'EAP1564/1/36',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-36',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-36',
  display_title = 'Samauddin''s Genealogy',
  file_title = 'Samauddin''s Genealogy',
  variant_titles = 'Samauddin''s Genealogy
Nasab Samauddin',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This genealogical tree manuscript is a record that describes the lineage or descendants of Samauddin bin Nurani. This manuscript is written in black ink. There is a watermark with the Propatria logo and a countermark with the words Soerabaja

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 20.7cm, widht 16.8cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'Samauddin''s Genealogy, British Library, EAP1564/1/36, https://eap.bl.uk/archive-file/EAP1564-1-36',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_36';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_037',
  source_identifier = 'EAP1564/1/37',
  reference_code = 'EAP1564/1/37',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-37',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-37',
  display_title = 'الحديث مفتاح الجنّة',
  file_title = 'الحديث مفتاح الجنّة',
  variant_titles = 'The Keys to Heaven Hadith''s
الحديث مفتاح الجنّة
Alḥadits miftaḥ al-jannah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '32',
  digitisation_date = '2024',
  bundle_description = 'A collection of hadiths about love is the content of this manuscript, it contains information that everything has a key and the key to heaven is loving the poor and needy. This manuscript consists of 6 lines on each page. The manuscript is written in black ink on lined paper.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 19.8cm, widht 15.3cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'الحديث مفتاح الجنّة, British Library, EAP1564/1/37, https://eap.bl.uk/archive-file/EAP1564-1-37',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_37';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_038',
  source_identifier = 'EAP1564/1/38',
  reference_code = 'EAP1564/1/38',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-38',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-38',
  display_title = 'ألفية ابن مالك',
  file_title = 'ألفية ابن مالك',
  variant_titles = 'Arabic Grammar Poem
ألفية ابن مالك
Alfiyah Ibnu Malik',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '56',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a collection of rhythmic poems about Arabic grammar or the rules of nahwu shorof. The manuscript was written in black ink on lined paper from a notebook printed by Oei Kong Hwa Soerabaja. The manuscript consists of 10 lines divided into two columns on each page.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 20.9cm, widht 16cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'ألفية ابن مالك, British Library, EAP1564/1/38, https://eap.bl.uk/archive-file/EAP1564-1-38',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_38';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_039',
  source_identifier = 'EAP1564/1/39',
  reference_code = 'EAP1564/1/39',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-39',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-39',
  display_title = 'كتاب الصيام',
  file_title = 'كتاب الصيام',
  variant_titles = 'Ramadan Fasting''s Book
كتاب الصيام
Kitab al-ṣiyām',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '32',
  digitisation_date = '2024',
  bundle_description = 'The main content of this manuscript is a discussion of the Ramadan fast. This manuscript was compiled by Abdurrahman in 1358 Hijri. This manuscript consists of 10 lines on each page and is written using black ink on lined paper from a notebook printed by the "Internationale Crediet-en Handelsvereeniging Rotterdam" factory.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 20.7cm, widht 16.5cm.

Condition of original material: Fair.

Alternative calendar and date: Islamic, 1358 Hijri.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'كتاب الصيام, British Library, EAP1564/1/39, https://eap.bl.uk/archive-file/EAP1564-1-39',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_39';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_040',
  source_identifier = 'EAP1564/1/40',
  reference_code = 'EAP1564/1/40',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-40',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-40',
  display_title = 'ذكرو رّمضان',
  file_title = 'ذكرو رّمضان',
  variant_titles = 'Coolection of Ramadan Dhikr
ذكرو رّمضان
Dhikru ramaḍan',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '138',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains several things, starting from a collection of Ramadan dhikr; special practices for the month of Ramadan; how to make a sacrifice for the safety of a house or rice field; to a collection of writings of several hadiths taken from the Buluughul Maram Book, page 13. This manuscript is written in black ink on lined paper.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 16.9cm, widht 10.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'ذكرو رّمضان, British Library, EAP1564/1/40, https://eap.bl.uk/archive-file/EAP1564-1-40',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_40';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_041',
  source_identifier = 'EAP1564/1/41',
  reference_code = 'EAP1564/1/41',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-41',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-41',
  display_title = 'Qomaruddin Genealogy',
  file_title = 'Qomaruddin Genealogy',
  variant_titles = 'Qomaruddin Genealogy
Nasab Qomaruddin',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a picture of the genealogy of the descendants of the Qomarudin Islamic boarding school family. The manuscript was written in black ink on lined paper.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 26.8cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'Qomaruddin Genealogy, British Library, EAP1564/1/41, https://eap.bl.uk/archive-file/EAP1564-1-41',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_41';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_042',
  source_identifier = 'EAP1564/1/42',
  reference_code = 'EAP1564/1/42',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-42',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-42',
  display_title = 'Qomaruddin Genealogy',
  file_title = 'Qomaruddin Genealogy',
  variant_titles = 'Qomaruddin Genealogy
Nasab Qomaruddin',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a picture of the genealogy of the descendants of the Qomarudin Islamic boarding school family. The manuscript was written in black ink on lined paper.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21.5cm, widht 16.4cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'Qomaruddin Genealogy, British Library, EAP1564/1/42, https://eap.bl.uk/archive-file/EAP1564-1-42',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_42';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_043',
  source_identifier = 'EAP1564/1/43',
  reference_code = 'EAP1564/1/43',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-43',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-43',
  display_title = 'جتتن وليمه',
  file_title = 'جتتن وليمه',
  variant_titles = 'Notes on Marriage
جتتن وليمه
Catetan Walimah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a personal note by Abdurrahman bin Abdul Salam about the marriage of a boy named Abdul Hamid, the son of his brother Ahmad Faqih, with the marriage registrar from Kerta village, Gresik city, Mas Haji Adlan. This manuscript was written on Wednesday night in the month of Dzulhijjah in the year 1345 Hijriyah. This manuscript was written in black ink. There is a pesantren stamp on the notes.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17.5cm.

Condition of original material: Fair.

Alternative calendar and date: Islamic, Dzulhijjah 1345 Hijri.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'جتتن وليمه, British Library, EAP1564/1/43, https://eap.bl.uk/archive-file/EAP1564-1-43',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_43';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_044',
  source_identifier = 'EAP1564/1/44',
  reference_code = 'EAP1564/1/44',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-44',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-44',
  display_title = 'خزينةالاسرار',
  file_title = 'خزينةالاسرار',
  variant_titles = 'The Secret of Dhikr
خزينةالاسرار
Khazīnat al-asror',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is an excerpt from the book Khazīatul Asror written by Sheikh Muhammad Haqqi anNazili. The fragment of the book written in this manuscript is a prayer to be able to meet the prophet through a dream which begins with two rakaat Sunnah prayer then reading 100 times the prayer that has been written in the book. This manuscript is written in black ink on lined paper.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 20.4cm, widht 17.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'خزينةالاسرار, British Library, EAP1564/1/44, https://eap.bl.uk/archive-file/EAP1564-1-44',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_44';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_045',
  source_identifier = 'EAP1564/1/45',
  reference_code = 'EAP1564/1/45',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-45',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-45',
  display_title = 'الماْثورات',
  file_title = 'الماْثورات',
  variant_titles = 'Prophet''s Prayer Guide
الماْثورات
al-Ma''thūrat',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'The contents of this manuscript are a collection of prayers that are answered, including: Prayers of forgiveness for oneself, parents, siblings and all believers; Prayer asking for Khusnul Khotimah to be given goodness at the end of her life, to be given goodness at the end of her deeds and to be looked after the best when she meets before Allah; Prayer asking for zuhutan for the world and asking for love for the afterlife; Prayer asking for guidance to do good deeds and good morals; and, prayers for safety in life. This manuscript is written in black ink

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 20.9cm, widht 10.6cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'الماْثورات, British Library, EAP1564/1/45, https://eap.bl.uk/archive-file/EAP1564-1-45',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_45';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_046',
  source_identifier = 'EAP1564/1/46',
  reference_code = 'EAP1564/1/46',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-46',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-46',
  display_title = 'وليمةالابناتي',
  file_title = 'وليمةالابناتي',
  variant_titles = 'Notes of Daughter Marriage
وليمةالابناتي
Walīmat al-abnātī',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a personal note of Haji Abdul Wahab bin Haji Abdurrahim about his sermon for the wedding of his brother''s daughter, Halimah binti Abu Ammar. The manuscript was written on Monday, 15 Dzulhijjah of 1344 Hijri in black ink.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 13.5cm, widht 14.6cm.

Condition of original material: Fair.

Alternative calendar and date: Islamic, 15 Dzulhijjah 1344 Hijri.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'وليمةالابناتي, British Library, EAP1564/1/46, https://eap.bl.uk/archive-file/EAP1564-1-46',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_46';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_047',
  source_identifier = 'EAP1564/1/47',
  reference_code = 'EAP1564/1/47',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-47',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-47',
  display_title = 'ذكر القويّ',
  file_title = 'ذكر القويّ',
  variant_titles = 'Dhikr Strength of Heart
ذكر القويّ
Dhikru al-qawiyyu',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a fragment containing the practice of wirid or dhikr asking for strength of heart. The dhikr is Ya Qawwiyu Ya Matinu Ya Qohhar. The manuscript is written in blue ink on lined paper.

Extent: 1Lined paper manuscript.

Size and dimensions of original material: Heigt 8cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'ذكر القويّ, British Library, EAP1564/1/47, https://eap.bl.uk/archive-file/EAP1564-1-47',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_47';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_048',
  source_identifier = 'EAP1564/1/48',
  reference_code = 'EAP1564/1/48',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-48',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-48',
  display_title = 'ذكر التوحيد',
  file_title = 'ذكر التوحيد',
  variant_titles = 'Dhikr for Forgiveness of sins
ذكر التوحيد
Dhikru al-tauḥīd',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript written in black ink is a fragment of a dhikr practice asking for forgiveness for sins. There is a statement in the text that if this dhikr is read 10 times after the Subuh and Maghrib prayers, then Allah will forgive his sins.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 12.1cm, widht 21.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'ذكر التوحيد, British Library, EAP1564/1/48, https://eap.bl.uk/archive-file/EAP1564-1-48',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_48';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_049',
  source_identifier = 'EAP1564/1/49',
  reference_code = 'EAP1564/1/49',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-49',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-49',
  display_title = 'ذكر لي رزقي',
  file_title = 'ذكر لي رزقي',
  variant_titles = 'Dhikr for Good Fortune
ذكر لي رزقي
Dhikri lī rizqī',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A collection of dhikr for the sake of good fortune is the content from this manuscript, it contains information that good fortune will flow if this dhikr is read when entering and leaving the house. This manuscript is written in black ink

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 14cm, widht 13.6cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'ذكر لي رزقي, British Library, EAP1564/1/49, https://eap.bl.uk/archive-file/EAP1564-1-49',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_49';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_050',
  source_identifier = 'EAP1564/1/50',
  reference_code = 'EAP1564/1/50',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-50',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-50',
  display_title = 'الولادة',
  file_title = 'الولادة',
  variant_titles = 'Script About Newborn Care
الولادة
al-Wilādah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains instructions on how to care for a newborn baby accompanied by "Kakang Kawah Adi Ari-Ari" (amniotic fluid and placenta). There is a special practice of fasting for 7 days for the parents and one day of fasting "Pati Geni" (not allowed to light fires/lamps) on Friday night. The practice is closed with the recitation of dhikr istighfar, Sholawat and Baqiyatus Sholihat and the prayer of Asmaul Husna. This manuscript is written in black ink.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'الولادة, British Library, EAP1564/1/50, https://eap.bl.uk/archive-file/EAP1564-1-50',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_50';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_051',
  source_identifier = 'EAP1564/1/51',
  reference_code = 'EAP1564/1/51',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-1-51',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-1-51',
  display_title = 'فضيلة الذكر',
  file_title = 'فضيلة الذكر',
  variant_titles = 'The Primacy of Dhikr
فضيلة الذكر
Faḍīlah al-dhikr',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'This manuscript consists of several topics, including the priority of seeking knowledge, the primacy of monotheism, prayers to the Prophet Muhammad and the primacy of reciting Basmallah. It consists of 12 lines and is written in black. Catch words are found in this manuscript.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21.2cm, widht 16.6cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  citation_text = 'فضيلة الذكر, British Library, EAP1564/1/51, https://eap.bl.uk/archive-file/EAP1564-1-51',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_51';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_001',
  source_identifier = 'EAP1564/2/1',
  reference_code = 'EAP1564/2/1',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-1',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-1',
  display_title = 'حكمة العبادة',
  file_title = 'حكمة العبادة',
  variant_titles = 'The Wisdom of Worship
حكمة العبادة
ḥikmah al-''ibādah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Indonesian',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '30',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a record of the wisdom of worship, such as the wisdom of prayer, congregational prayer, ablution, zakat, and other worship. The manuscript has 24 rows per page with black ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'حكمة العبادة, British Library, EAP1564/2/1, https://eap.bl.uk/archive-file/EAP1564-2-1',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_1';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_002',
  source_identifier = 'EAP1564/2/2',
  reference_code = 'EAP1564/2/2',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-2',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-2',
  display_title = 'كتاب منحة الفتاح فى أداب النكاح',
  file_title = 'كتاب منحة الفتاح فى أداب النكاح',
  variant_titles = 'The Book of Grants of Conquest in the Etiquette of Marriage
كتاب منحة الفتاح فى أداب النكاح
Kitab minḥat al-fatāḥ fī adāb al-nikāḥ',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '58',
  digitisation_date = '2024',
  bundle_description = 'This manuscript teaches the procedures and manners of finding a life partner and getting married.The manuscript has 15 rows per page with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.3cm, widht 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب منحة الفتاح فى أداب النكاح, British Library, EAP1564/2/2, https://eap.bl.uk/archive-file/EAP1564-2-2',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_2';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_003',
  source_identifier = 'EAP1564/2/3',
  reference_code = 'EAP1564/2/3',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-3',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-3',
  display_title = 'شرح أم البراهين',
  file_title = 'شرح أم البراهين',
  variant_titles = 'Commentary on Ummul Barahin
شرح أم البراهين
Sharaḥ ummu al-baraḥīn',
  creation_date = '15th century',
  copying_date_native = '15th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a commentary on the book Ummu al-Baraḥīn, a book that contains arguments and evidence that form the basis for understanding and believing in the basic teachings of the Islamic religion. The manuscript has 13 rows per page with black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.3cm, widht 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'شرح أم البراهين, British Library, EAP1564/2/3, https://eap.bl.uk/archive-file/EAP1564-2-3',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_3';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_004',
  source_identifier = 'EAP1564/2/4',
  reference_code = 'EAP1564/2/4',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-4',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-4',
  display_title = 'رسالة فنراڠن انتار حق دڠن باطل',
  file_title = 'رسالة فنراڠن انتار حق دڠن باطل',
  variant_titles = 'A Treatise on the Clarification between Truth and Falsehood
رسالة فنراڠن انتار حق دڠن باطل
Risālah penerangan antara ḥaq dengan bāṭil',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Indonesian',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '50',
  digitisation_date = '2024',
  bundle_description = 'This manuscript explains the concept and in-depth explanation regarding the call to prayer, both the etiquette of the call to prayer and the iqamah, the meaning and interpretation of each pronunciation.The manuscript has 13 rows per page with black ink.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21.6cm, widht 16.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'رسالة فنراڠن انتار حق دڠن باطل, British Library, EAP1564/2/4, https://eap.bl.uk/archive-file/EAP1564-2-4',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_4';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_005',
  source_identifier = 'EAP1564/2/5',
  reference_code = 'EAP1564/2/5',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-5',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-5',
  display_title = 'تفسير سورة عبس',
  file_title = 'تفسير سورة عبس',
  variant_titles = 'The Exegesis of Surah Abasa
تفسير سورة عبس
Tafsir surah ''abasa',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '10',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of the incomplete interpretation of Surah Abasa. The interpretation models presented are short, both from the reading of the nahwu and the editorial meaning of the words.The manuscript has 15 rows per page with black and red ink

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.5cm, widht 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'تفسير سورة عبس, British Library, EAP1564/2/5, https://eap.bl.uk/archive-file/EAP1564-2-5',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_5';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_006',
  source_identifier = 'EAP1564/2/6',
  reference_code = 'EAP1564/2/6',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-6',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-6',
  display_title = 'مجموع مشتمل على جملة رسائل في علم الصرف الشافعية',
  file_title = 'مجموع مشتمل على جملة رسائل في علم الصرف الشافعية',
  variant_titles = 'A collection containing a number of letters on Shafi''i morphology
مجموع مشتمل على جملة رسائل في علم الصرف الشافعية
Majmu'' mushtamal ''alá jumlat rasāil fī ''ulumi al-ṣarf al-shāfi''iyat',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '166',
  digitisation_date = '2024',
  bundle_description = 'This printed book binded together with european paper manuscript is a collection of Arabic morphology and syntax. This book consists of 36 lines per page while the manuscript consist of 7 lines per page. The text is written using black ink and red.

Extent: 1 yellow plain paper book and european paper manuscript.

Size and dimensions of original material: Heigt 26cm, widht 18cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'مجموع مشتمل على جملة رسائل في علم الصرف الشافعية, British Library, EAP1564/2/6, https://eap.bl.uk/archive-file/EAP1564-2-6',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_6';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_007',
  source_identifier = 'EAP1564/2/7',
  reference_code = 'EAP1564/2/7',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-7',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-7',
  display_title = 'تحقيق المقام على كفاية العوام',
  file_title = 'تحقيق المقام على كفاية العوام',
  variant_titles = 'an investigation into the book of kifayatul awam
تحقيق المقام على كفاية العوام
Taḥqīq almaqām ''alá kifāyat al-''awām',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '30',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of the tahqiq book of kifāyat al-''awām in the field of monotheism. This manuscript contains 25 lines per page and the text is written using black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'تحقيق المقام على كفاية العوام, British Library, EAP1564/2/7, https://eap.bl.uk/archive-file/EAP1564-2-7',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_7';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_008',
  source_identifier = 'EAP1564/2/8',
  reference_code = 'EAP1564/2/8',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-8',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-8',
  display_title = 'تفسير لغوي',
  file_title = 'تفسير لغوي',
  variant_titles = 'interpretation of Quranic verses linguistics
تفسير لغوي
Tafsīr al-ghawá',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a book of interpretation of the Qur''anic verses. each page consists of 23 lines. the text is written using black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 24.8cm, widht 17.2cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'تفسير لغوي, British Library, EAP1564/2/8, https://eap.bl.uk/archive-file/EAP1564-2-8',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_8';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_009',
  source_identifier = 'EAP1564/2/9',
  reference_code = 'EAP1564/2/9',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-9',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-9',
  display_title = 'خريدة البهية',
  file_title = 'خريدة البهية',
  variant_titles = 'Khoridatul Bahiyah
خريدة البهية
Khorīdat al-bahiyah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2020',
  bundle_description = 'This is a manuscript of the Book of Khorīdat al-bahiyah, a book that discusses tawhid and kalam, written by Al-Imam Al-Allamah Al-Arif Billah Bin Muhammad Al-Adawi, also known as Al-Imam Ar-Dardir. This book explains the basics of the science of kalam in detail and simply. By studying this book, Muslims can recognize the obligatory, muhal, and jaiz attributes of Allah and the Messenger. Each page of this manuscript consists of 10 lines, and the text is written using black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 25.2cm, widht 18cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'خريدة البهية, British Library, EAP1564/2/9, https://eap.bl.uk/archive-file/EAP1564-2-9',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_9';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_010',
  source_identifier = 'EAP1564/2/10',
  reference_code = 'EAP1564/2/10',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-10',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-10',
  display_title = 'كراسات في المذاهب الفقهية،',
  file_title = 'كراسات في المذاهب الفقهية،',
  variant_titles = 'Notebooks on mazhab fiqh and others
كراسات في المذاهب الفقهية،
Karāsāt fī al-madhāhib al-fiqhiyah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '172',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a notebook for pesantren teachers/students. in it there are notes related to the fiqh madhhab, important hadiths, salawat, and records of the results of the fiqh congress. it also includes a record of the birth of the Bani Musthofa family. at the beginning of the text is written in black ink, using Arabic script in Arabic and Indonesian. at the end of the book there are notes using Latin script in Indonesian, using black and blue ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كراسات في المذاهب الفقهية،, British Library, EAP1564/2/10, https://eap.bl.uk/archive-file/EAP1564-2-10',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_10';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_011',
  source_identifier = 'EAP1564/2/11',
  reference_code = 'EAP1564/2/11',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-11',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-11',
  display_title = 'وفق الإصم الأعظم',
  file_title = 'وفق الإصم الأعظم',
  variant_titles = 'A Wifiq of Ismu al A''dhom
وفق الإصم الأعظم
Wifiq al-iṣam al i''ẓam',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript sheet is a wifiq of Ismu a''dhom. Ismul a''dhom are the great names of Allah Swt that are commonly used in prayer sentences. The manuscript text consists of only one page, written in black ink.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 11cm, widht 21.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'وفق الإصم الأعظم, British Library, EAP1564/2/11, https://eap.bl.uk/archive-file/EAP1564-2-11',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_11';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_012',
  source_identifier = 'EAP1564/2/12',
  reference_code = 'EAP1564/2/12',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-12',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-12',
  display_title = 'علم الأخلاق وكراسات اللغة العربية',
  file_title = 'علم الأخلاق وكراسات اللغة العربية',
  variant_titles = 'Notebooks on moral science and Arabic
علم الأخلاق وكراسات اللغة العربية
Ilmu al-akhlaq wa karāsāt al-lughah al-''arabiyah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '18',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a notebook on the science of morals and Arabic. it contains pieces of moral nazam, and explanations of Arabic grammar. The text is written using Arabic script, in Arabic language. the text is written using black ink. on nazam pages, each page consists of 7 lines, while on prose pages each page consists of 10 lines.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.8cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'علم الأخلاق وكراسات اللغة العربية, British Library, EAP1564/2/12, https://eap.bl.uk/archive-file/EAP1564-2-12',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_12';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_013',
  source_identifier = 'EAP1564/2/13',
  reference_code = 'EAP1564/2/13',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-13',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-13',
  display_title = 'تحفة الأطفال',
  file_title = 'تحفة الأطفال',
  variant_titles = 'Childreen Masterpiece
تحفة الأطفال
Tuḥfat al-aṭfāl',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '36',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the book Tuḥfat al-aṭfāl by Shaykh Sulaiman bin Hasan bin Muhammad Al-Jamzuri, one of the scholars from Egypt in the 12th century Hijri. The manuscript is written in black ink. each page consists of an average of 6 lines for the nazam/poetry section, and 20-26 lines per page for the natsar/prose section.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21.2cm, widht 16.8cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'تحفة الأطفال, British Library, EAP1564/2/13, https://eap.bl.uk/archive-file/EAP1564-2-13',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_13';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_014',
  source_identifier = 'EAP1564/2/14',
  reference_code = 'EAP1564/2/14',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-14',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-14',
  display_title = 'كتاب الفقه',
  file_title = 'كتاب الفقه',
  variant_titles = 'Jurisprudence book
كتاب الفقه
Kitāb al-fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '28',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of the syarah fiqh Syafiiyah. the text of the manuscript is incomplete at the beginning and end. The legible part of the text talks about prayer and the call to prayer. The text is written using red ink for the main part, and black ink for the explanatory part. Each page consists of 15 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الفقه, British Library, EAP1564/2/14, https://eap.bl.uk/archive-file/EAP1564-2-14',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_14';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_015',
  source_identifier = 'EAP1564/2/15',
  reference_code = 'EAP1564/2/15',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-15',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-15',
  display_title = 'هداية المبتدي لمسئلة المقتدي',
  file_title = 'هداية المبتدي لمسئلة المقتدي',
  variant_titles = 'Basic instructions for followers
هداية المبتدي لمسئلة المقتدي
Hidāyat al-mubtadi limasalat al-muqtadi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '22',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of a book Hidāyat al-mubtadi limasalat al-muqtadi. The manuscript is incomplete at the end. The text discusses the procedure of congregational prayer for the imam and the congregation. The text is written using black ink. Each page consists of 7 lines of text with the meaning of each word underneath.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.5cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'هداية المبتدي لمسئلة المقتدي, British Library, EAP1564/2/15, https://eap.bl.uk/archive-file/EAP1564-2-15',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_15';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_016',
  source_identifier = 'EAP1564/2/16',
  reference_code = 'EAP1564/2/16',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-16',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-16',
  display_title = 'Teacher''s master book of Quran, Akhlak, Tajweed',
  file_title = 'Teacher''s master book of Quran, Akhlak, Tajweed',
  variant_titles = 'Teacher''s master book of Quran, Akhlak, Tajweed
... Quran...',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Report',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '22',
  digitisation_date = '2024',
  bundle_description = 'This is the master book of a teacher in 1950 who taught Quran, Akhlaq, and Tajweed. It contains the names of students per class and grades for two semesters. This book mentions the month of August 1950. The book is written in Latin script, using black and blue ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 19cm, widht 15.6cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Teacher''s master book of Quran, Akhlak, Tajweed, British Library, EAP1564/2/16, https://eap.bl.uk/archive-file/EAP1564-2-16',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_16';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_017',
  source_identifier = 'EAP1564/2/17',
  reference_code = 'EAP1564/2/17',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-17',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-17',
  display_title = 'كتاب الفقه',
  file_title = 'كتاب الفقه',
  variant_titles = 'Jurisprudence book
كتاب الفقه
Kitāb al-fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a fiqh book that contains matters of ablution, tayammum, hajj. The manuscript is written using black ink. Each page consists of six lines of matan/main text, which are then interpreted per word.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الفقه, British Library, EAP1564/2/17, https://eap.bl.uk/archive-file/EAP1564-2-17',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_17';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_018',
  source_identifier = 'EAP1564/2/18',
  reference_code = 'EAP1564/2/18',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-18',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-18',
  display_title = 'كتاب التوحيد',
  file_title = 'كتاب التوحيد',
  variant_titles = 'Book of Monotheism
كتاب التوحيد
Kitāb al-tawḥīd',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '22',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of the book of Tawhid, the beginning and end are missing, with no page numbers. No title was found in it. The manuscript is written using red and black ink. Each page consists of 25 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.8cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب التوحيد, British Library, EAP1564/2/18, https://eap.bl.uk/archive-file/EAP1564-2-18',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_18';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_019',
  source_identifier = 'EAP1564/2/19',
  reference_code = 'EAP1564/2/19',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-19',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-19',
  display_title = 'دفتر أموال أمين صندوق المدرسة',
  file_title = 'دفتر أموال أمين صندوق المدرسة',
  variant_titles = 'Madrasah treasurer cash book
دفتر أموال أمين صندوق المدرسة
Daftar amwāl amīn ṣunduq al-madrasah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '30',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a madrasa treasurer''s cash book recorded in 1355 AH/1936 AD. It records the monthly expenses of the madrasa. The text is written in Arabic and Arabic script.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'دفتر أموال أمين صندوق المدرسة, British Library, EAP1564/2/19, https://eap.bl.uk/archive-file/EAP1564-2-19',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_19';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_020',
  source_identifier = 'EAP1564/2/20',
  reference_code = 'EAP1564/2/20',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-20',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-20',
  display_title = 'Madrasah meeting invitation',
  file_title = 'Madrasah meeting invitation',
  variant_titles = 'Madrasah meeting invitation
Dari saya Anwar....',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Correspondence',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is an example of an invitation to a Madrasah meeting. It is written inviting the head of MI As Sa''adah to attend the foundation meeting. The date and time are listed, but not the year. The text is written using Arabic script in Arabic and Indonesian.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 9cm, widht 14.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Madrasah meeting invitation, British Library, EAP1564/2/20, https://eap.bl.uk/archive-file/EAP1564-2-20',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_20';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_021',
  source_identifier = 'EAP1564/2/21',
  reference_code = 'EAP1564/2/21',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-21',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-21',
  display_title = 'دفتر حساب توزيع ميراث المرحوم عبد الرحمن موجوكرتو',
  file_title = 'دفتر حساب توزيع ميراث المرحوم عبد الرحمن موجوكرتو',
  variant_titles = 'The inheritance calculation book for the deceased Abdurrahman Mojokerto
دفتر حساب توزيع ميراث المرحوم عبد الرحمن موجوكرتو
Daftar hisab tauzi'' mīrath almarhum ''abdur rahman mojokerto',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Diary',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '18',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a calculation book for the division of inheritance from a man named Abdurrahman from Mojokerto. He left behind a wife and several children. It contains details of his wealth and its division. At the beginning are written the witnesses. The text is written in Arabic and Indonesian script.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21.7cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'دفتر حساب توزيع ميراث المرحوم عبد الرحمن موجوكرتو, British Library, EAP1564/2/21, https://eap.bl.uk/archive-file/EAP1564-2-21',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_21';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_022',
  source_identifier = 'EAP1564/2/22',
  reference_code = 'EAP1564/2/22',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-22',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-22',
  display_title = 'بيت النظام هو فريضة الله والصيام',
  file_title = 'بيت النظام هو فريضة الله والصيام',
  variant_titles = 'Bait nazam is the obligatory nature of God and fasting
بيت النظام هو فريضة الله والصيام
Bait naẓām huwa farīḍat Allah wa al-ṣiyām',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a book of nazam couplets of obligatory books for Allah and couplets of fasting nazam. The text is written using blue ink. Each page consists of 14 lines.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 19.8cm, widht 16cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'بيت النظام هو فريضة الله والصيام, British Library, EAP1564/2/22, https://eap.bl.uk/archive-file/EAP1564-2-22',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_22';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_023',
  source_identifier = 'EAP1564/2/23',
  reference_code = 'EAP1564/2/23',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-23',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-23',
  display_title = 'كتاب نظام الأخلاق',
  file_title = 'كتاب نظام الأخلاق',
  variant_titles = 'Bait nazam book of morals
كتاب نظام الأخلاق
Kitāb naẓām al-akhlaq',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '30',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a book of moral nazam for a student. The text is written using black ink. Each page consists of 7 lines which are then given a meaning per word.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.3cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب نظام الأخلاق, British Library, EAP1564/2/23, https://eap.bl.uk/archive-file/EAP1564-2-23',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_23';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_024',
  source_identifier = 'EAP1564/2/24',
  reference_code = 'EAP1564/2/24',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-24',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-24',
  display_title = 'Khotbah Jum''at',
  file_title = 'Khotbah Jum''at',
  variant_titles = 'Khotbah Jum''at
Khutbah Jum''at',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '14',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains teacher''s notes containing studies and notes related to student contributions. The text is written in Latin and Arabic script using blue ink. There is no complete study section in this book.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 20.8cm, widht 16.3cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Khotbah Jum''at, British Library, EAP1564/2/24, https://eap.bl.uk/archive-file/EAP1564-2-24',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_24';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_025',
  source_identifier = 'EAP1564/2/25',
  reference_code = 'EAP1564/2/25',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-25',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-25',
  display_title = 'الدنيا مطية الآخرة',
  file_title = 'الدنيا مطية الآخرة',
  variant_titles = 'This world is a ride to the afterlife
الدنيا مطية الآخرة
al-Dunya maṭiyat al-akhirat',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is the text of a sermon on the theme ''The world is a vehicle to the hereafter''. The text is written in Arabic script using black ink. The page consists of 29 lines.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 27.2cm, widht 21.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الدنيا مطية الآخرة, British Library, EAP1564/2/25, https://eap.bl.uk/archive-file/EAP1564-2-25',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_25';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_026',
  source_identifier = 'EAP1564/2/26',
  reference_code = 'EAP1564/2/26',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-26',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-26',
  display_title = 'ملاحظات تنظيم بيزانترين',
  file_title = 'ملاحظات تنظيم بيزانترين',
  variant_titles = 'Notes on boarding school regulations
ملاحظات تنظيم بيزانترين
Mulaḥaẓāt tanẓīm bizantarīn',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '6',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a record of part of the caretaker''s message copied in Arabic script in a mixture of Javanese and Arabic. Among other things, it discusses the procedures when leaving the pesantren for reasons, smoking and joking while reading the Quran or near people praying. Fines vary between 10 and 20 cents. Using lined paper, each page consists of 19 lines. The text is written using black ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.8cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ملاحظات تنظيم بيزانترين, British Library, EAP1564/2/26, https://eap.bl.uk/archive-file/EAP1564-2-26',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_26';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_027',
  source_identifier = 'EAP1564/2/27',
  reference_code = 'EAP1564/2/27',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-27',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-27',
  display_title = 'قصيدة أركان الإيمان',
  file_title = 'قصيدة أركان الإيمان',
  variant_titles = 'Recitation of the pillars of faith
قصيدة أركان الإيمان
Qaṣīdat arkān al-īmān',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of a poem about messages of faith and the attitude of a disciple, but it is incomplete and untitled. The text is written in Arabic script and language. One page consists of 29 lines.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 23cm, widht 14.4cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'قصيدة أركان الإيمان, British Library, EAP1564/2/27, https://eap.bl.uk/archive-file/EAP1564-2-27',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_27';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_028',
  source_identifier = 'EAP1564/2/28',
  reference_code = 'EAP1564/2/28',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-28',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-28',
  display_title = 'The Grade Book',
  file_title = 'The Grade Book',
  variant_titles = 'The Grade Book
Nilai Ketjakapan',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Malay',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '28',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a teaching teacher''s note containing the name of the student and the grade of the subject he taught. The text is written in Indonesian Latin script.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'The Grade Book, British Library, EAP1564/2/28, https://eap.bl.uk/archive-file/EAP1564-2-28',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_28';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_029',
  source_identifier = 'EAP1564/2/29',
  reference_code = 'EAP1564/2/29',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-29',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-29',
  display_title = 'دعاء',
  file_title = 'دعاء',
  variant_titles = 'Do''a
دعاء
Doa',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a student exercise book, showing students making practice prayer notes. The text is written using Arabic script and language.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 13.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'دعاء, British Library, EAP1564/2/29, https://eap.bl.uk/archive-file/EAP1564-2-29',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_29';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_030',
  source_identifier = 'EAP1564/2/30',
  reference_code = 'EAP1564/2/30',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-30',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-30',
  display_title = 'كتاب البناء الصرف',
  file_title = 'كتاب البناء الصرف',
  variant_titles = 'Morfology book
كتاب البناء الصرف
Kitāb al-binā'' al-ṣarf',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the sharf/morphology book. It discusses various kinds of bina'' from sulasi onwards. The text is written in Arabic script and language. The text is written using black and red ink. Each page consists of 12 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 25.5cm, widht 17.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب البناء الصرف, British Library, EAP1564/2/30, https://eap.bl.uk/archive-file/EAP1564-2-30',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_30';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_031',
  source_identifier = 'EAP1564/2/31',
  reference_code = 'EAP1564/2/31',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-31',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-31',
  display_title = 'ملاحظات الحضرة لإرسال الدعوات',
  file_title = 'ملاحظات الحضرة لإرسال الدعوات',
  variant_titles = 'ملاحظات الحضرة لإرسال الدعوات
Mulaḥaẓāt al-ḥaḍrati li irsāli al-da''awāt',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a hadrah record for sending prayers to teachers. The text is written in Arabic script and language, written in black ink.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 20.5cm, widht 12.8cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ملاحظات الحضرة لإرسال الدعوات, British Library, EAP1564/2/31, https://eap.bl.uk/archive-file/EAP1564-2-31',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_31';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_032',
  source_identifier = 'EAP1564/2/32',
  reference_code = 'EAP1564/2/32',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-32',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-32',
  display_title = 'Letter',
  file_title = 'Letter',
  variant_titles = 'Letter
S. M. Said Sata Imam Safii di Makah Arabia',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a correspondence letter from Shaykh M Said Syatho Makkah to Kiai Haji Muhammad Solih bin Kiai Mustofa Abdul Karim. The letter was written in 1352 AH/1933 AD. This letter wants to ask how the Muslims and the people in Indonesia are doing, because the news received from the pilgrims, the condition of Indonesia is in trouble.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 32.8cm, widht 23.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Letter, British Library, EAP1564/2/32, https://eap.bl.uk/archive-file/EAP1564-2-32',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_32';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_033',
  source_identifier = 'EAP1564/2/33',
  reference_code = 'EAP1564/2/33',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-33',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-33',
  display_title = 'الفية ابن مالك',
  file_title = 'الفية ابن مالك',
  variant_titles = 'Alfiya Ibn Malik
الفية ابن مالك
Alfiyah Ibn mālik',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '72',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a copy of the nazam Alfiyah Ibn Malik. The beginning and end are missing, the binding is loose, and there is no pagination. Each page consists of seven lines. The text is written in Arabic script and language, some of which have word-for-word meanings underneath. The text is written using black ink, and red ink to mark chapters/subchapters.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 24.3cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الفية ابن مالك, British Library, EAP1564/2/33, https://eap.bl.uk/archive-file/EAP1564-2-33',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_33';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_034',
  source_identifier = 'EAP1564/2/34',
  reference_code = 'EAP1564/2/34',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-34',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-34',
  display_title = 'كتاب التوحيد',
  file_title = 'كتاب التوحيد',
  variant_titles = 'كتاب التوحيد
Kitāb tawḥid',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of the book of monotheism in the form of pieces of paper that have been damaged and are not intact. Each page consists of ten lines of Arabic language and script which are interpreted word by word in Javanese Arabic script. The text is written using black and red ink to mark important parts.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب التوحيد, British Library, EAP1564/2/34, https://eap.bl.uk/archive-file/EAP1564-2-34',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_34';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_035',
  source_identifier = 'EAP1564/2/35',
  reference_code = 'EAP1564/2/35',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-35',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-35',
  display_title = 'دفتر ملاحظات الطالب',
  file_title = 'دفتر ملاحظات الطالب',
  variant_titles = 'Student notebook
دفتر ملاحظات الطالب
Daftar mulāḥaẓāt al-ṭālib',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '38',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a notebook written by students at the Bungah Gresik pesantren. It contains notes on various religious subjects, there are notes on hadith, nazam of linguistics, and so on. The text is written using Arabic script and language, using black ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.7cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'دفتر ملاحظات الطالب, British Library, EAP1564/2/35, https://eap.bl.uk/archive-file/EAP1564-2-35',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_35';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_036',
  source_identifier = 'EAP1564/2/36',
  reference_code = 'EAP1564/2/36',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-36',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-36',
  display_title = 'كفاية العوام',
  file_title = 'كفاية العوام',
  variant_titles = 'Kifayatul Awam
كفاية العوام
Kifāyat al-''awām',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a copy of the book Kifāyat al-''awām, one of the main references in understanding the beliefs of Ahlussunnah wal Jamaah (Aswaja), especially in the Asy''ariyah and Maturidiyah madhhabs. Compiled by Sheikh Muhammad Al-Fudhali (Egypt), this book provides a comprehensive guide to tawhid and kalam. Each page consists of 11 lines. The text is written using black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كفاية العوام, British Library, EAP1564/2/36, https://eap.bl.uk/archive-file/EAP1564-2-36',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_36';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_037',
  source_identifier = 'EAP1564/2/37',
  reference_code = 'EAP1564/2/37',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-37',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-37',
  display_title = 'كتاب الفقه',
  file_title = 'كتاب الفقه',
  variant_titles = 'Fiqh Book
كتاب الفقه
Kitāb al-fiqḥ',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of a fiqh book. It''s just that the binding is incomplete, the beginning and end are not found, so it is difficult to know the identity of the title of the book. The text of this book consists of natsar/prose and also nazam/poetry. The text is written using black ink. Each page consists of 11 lines. The text is written using Arabic language and script.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.4cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الفقه, British Library, EAP1564/2/37, https://eap.bl.uk/archive-file/EAP1564-2-37',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_37';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_038',
  source_identifier = 'EAP1564/2/38',
  reference_code = 'EAP1564/2/38',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-38',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-38',
  display_title = 'نظم الإمرطي',
  file_title = 'نظم الإمرطي',
  variant_titles = 'Imrithi
نظم الإمرطي
Naẓām al-imriṭi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the book Naẓām al-imriṭi which discusses Arabic syntax. It''s just that the binding is incomplete, the beginning and end are not found. The text of the book is in the form of nazam written in large letters to leave room for students to interpret each word, so that each page only consists of 7 lines. The text is written using black ink. The text is written using Arabic language and script.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.5cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'نظم الإمرطي, British Library, EAP1564/2/38, https://eap.bl.uk/archive-file/EAP1564-2-38',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_38';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_039',
  source_identifier = 'EAP1564/2/39',
  reference_code = 'EAP1564/2/39',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-39',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-39',
  display_title = 'كتاب نور البال فى غض بصر الرجال عن النساء و النساء عن الرجال',
  file_title = 'كتاب نور البال فى غض بصر الرجال عن النساء و النساء عن الرجال',
  variant_titles = 'The book of light of mind in lowering men''s gaze from women and women from men
كتاب نور البال فى غض بصر الرجال عن النساء و النساء عن الرجال
Kitab Nur al-bāl fī ghaḍ baṣar al-rijāl ''an al-nisā'' ''an al-rijāl',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a book of morals written by Habib Umar bin Habib Abdullah bin Umar bin Yahya Baalawi. It discusses the procedures for restraining the gaze/lust between the opposite sex. The text was copied by Mbah Zubair bin Abi Muthimah Sampurnan (Gresik) on Tuesday Rabiul Akhir in the year 1284. The text was written using black ink, in Arabic script and language. Each page consists of 19 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.8cm, widht 17.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب نور البال فى غض بصر الرجال عن النساء و النساء عن الرجال, British Library, EAP1564/2/39, https://eap.bl.uk/archive-file/EAP1564-2-39',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_39';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_040',
  source_identifier = 'EAP1564/2/40',
  reference_code = 'EAP1564/2/40',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-40',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-40',
  display_title = 'كتاب التفسير',
  file_title = 'كتاب التفسير',
  variant_titles = 'Tafsiir
كتاب التفسير
Kitab al-tafsir',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '18',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the Quranic commentary book. The beginning and end are no longer found. The identity of the title of the book is difficult to trace. The text is written in red and black ink, each page consists of 19 lines. The text is written using Arabic script and language.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 23cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب التفسير, British Library, EAP1564/2/40, https://eap.bl.uk/archive-file/EAP1564-2-40',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_40';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_041',
  source_identifier = 'EAP1564/2/41',
  reference_code = 'EAP1564/2/41',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-41',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-41',
  display_title = 'ملاحظات موجزة عن الموضوع',
  file_title = 'ملاحظات موجزة عن الموضوع',
  variant_titles = 'Subject summary notes
ملاحظات موجزة عن الموضوع
Mulaḥaẓāt mu''jizat ''an al-mauḍu''',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '6',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a summary of the lesson notes that the teacher might have. The text is written using Arabic script in a mixture of Arabic and Indonesian. Each page consists of 24 lines. The text is written using blue ink.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 23cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ملاحظات موجزة عن الموضوع, British Library, EAP1564/2/41, https://eap.bl.uk/archive-file/EAP1564-2-41',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_41';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_042',
  source_identifier = 'EAP1564/2/42',
  reference_code = 'EAP1564/2/42',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-42',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-42',
  display_title = 'pro justitia copy',
  file_title = 'pro justitia copy',
  variant_titles = 'pro justitia copy
Turunan Pro Justitia',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Dutch, Middle (ca.1050-1350)',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '6',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of pro justitia in dutch language. The text is written using Latin script.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 30cm, widht 23.8cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'pro justitia copy, British Library, EAP1564/2/42, https://eap.bl.uk/archive-file/EAP1564-2-42',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_42';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_043',
  source_identifier = 'EAP1564/2/43',
  reference_code = 'EAP1564/2/43',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-43',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-43',
  display_title = 'كتاب تمارين الطالب',
  file_title = 'كتاب تمارين الطالب',
  variant_titles = 'Student exercise book
كتاب تمارين الطالب
Kitāb tamārīn al-ṭullab',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is similar to a student''s exercise book. It contains a lot of incomplete content, there are various brief notes on subjects or themes that are not finished. The text is written in various scripts (Arabic, Latin), and also languages ​​(Arabic, Javanese, and Indonesian). The text is written using red, blue, and black ink. The number of lines per page also varies.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 10.8cm, widht 16.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب تمارين الطالب, British Library, EAP1564/2/43, https://eap.bl.uk/archive-file/EAP1564-2-43',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_43';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_044',
  source_identifier = 'EAP1564/2/44',
  reference_code = 'EAP1564/2/44',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-44',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-44',
  display_title = 'Doctor''s statement',
  file_title = 'Doctor''s statement',
  variant_titles = 'Doctor''s statement
Katrangan dari mantri.....',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Malay',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a statement letter from a paramedic/doctor in Bangkalan Madura. It says January 1894.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21.8cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Doctor''s statement, British Library, EAP1564/2/44, https://eap.bl.uk/archive-file/EAP1564-2-44',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_44';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_045',
  source_identifier = 'EAP1564/2/45',
  reference_code = 'EAP1564/2/45',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-45',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-45',
  display_title = 'Teacher''s master book',
  file_title = 'Teacher''s master book',
  variant_titles = 'Teacher''s master book
Tadjwid....',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Malay',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '18',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a master book for teachers of the Quran and Tajweed subjects. It contains many grades and lists of student names. The text is written using Latin script in Indonesian.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 16.2cm, widht 11cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Teacher''s master book, British Library, EAP1564/2/45, https://eap.bl.uk/archive-file/EAP1564-2-45',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_45';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_046',
  source_identifier = 'EAP1564/2/46',
  reference_code = 'EAP1564/2/46',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-46',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-46',
  display_title = 'شرح الستين المسألة',
  file_title = 'شرح الستين المسألة',
  variant_titles = 'Syarah Sittin
شرح الستين المسألة
Sharaḥ al-sittin al-masalah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the Book of Sharaḥ al-sittin al-masalah in the field of jurisprudence, written by Abu Abbas Syihabuddin Ahmad bin Hamzah Ar Romly. The text is written using red and black ink, each page consists of 13 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.5cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'شرح الستين المسألة, British Library, EAP1564/2/46, https://eap.bl.uk/archive-file/EAP1564-2-46',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_46';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_047',
  source_identifier = 'EAP1564/2/47',
  reference_code = 'EAP1564/2/47',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-47',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-47',
  display_title = 'كتاب الفقه',
  file_title = 'كتاب الفقه',
  variant_titles = 'Fiqh Book
كتاب الفقه
Kitāb al-fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a fiqh book. The beginning and end are missing, making it difficult to identify the title of the book. The parts found here are the discussion and procedures for prayer. The text is written in red and black ink. Each page consists of 17 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.8cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الفقه, British Library, EAP1564/2/47, https://eap.bl.uk/archive-file/EAP1564-2-47',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_47';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_048',
  source_identifier = 'EAP1564/2/48',
  reference_code = 'EAP1564/2/48',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-48',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-48',
  display_title = '...الحق والباطل...',
  file_title = '...الحق والباطل...',
  variant_titles = 'Teachers notebook
...الحق والباطل...
... al-ḥaq wa al-bāṭil...',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a teacher''s notebook. It does not contain any sequential chapters. Once upon a time there was a note about the interpretation of the Quran which was then explained using Arabic mixed with Indonesian. The text was written using black ink. Each page consists of 17 lines.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 14.2cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '...الحق والباطل..., British Library, EAP1564/2/48, https://eap.bl.uk/archive-file/EAP1564-2-48',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_48';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_049',
  source_identifier = 'EAP1564/2/49',
  reference_code = 'EAP1564/2/49',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-49',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-49',
  display_title = 'Permit Letter',
  file_title = 'Permit Letter',
  variant_titles = 'Permit Letter
Aweh Permisi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Javanese',
  bundle_script = 'Javanese',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains two texts. The first texts is a permit document to travel from Tanggul village to Wadeng village in Gresik district for five days by paying a fee of 20 rupiah to the Dutch government. This travel permit document is written using Javanese script and mixed Javanese and Dutch languages. It is written using black ink, and stamped blue. The second texts is a herbal medicine recipes and written in Pegon.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 17cm, widht 21.4cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Permit Letter, British Library, EAP1564/2/49, https://eap.bl.uk/archive-file/EAP1564-2-49',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_49';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_050',
  source_identifier = 'EAP1564/2/50',
  reference_code = 'EAP1564/2/50',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-50',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-50',
  display_title = 'كتاب صفات النبي',
  file_title = 'كتاب صفات النبي',
  variant_titles = 'Book of the Characteristics of the Prophet
كتاب صفات النبي
Kitāb al-ṣifāt al-nabi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = NULL,
  country = NULL,
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This manuscript discusses atsar which explains the nature and description of the Prophet Muhammad, such as the discussion between Abu Hurairah and Ali bin Abi Thalib. The text is written using black ink. Each page consists of 7 lines of core text, which are then interpreted word by word in Javanese.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 22cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب صفات النبي, British Library, EAP1564/2/50, https://eap.bl.uk/archive-file/EAP1564-2-50',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_50';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_051',
  source_identifier = 'EAP1564/2/51',
  reference_code = 'EAP1564/2/51',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-51',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-51',
  display_title = 'Postal Receipt',
  file_title = 'Postal Receipt',
  variant_titles = 'Postal Receipt
Warkat pos',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Malay',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a postcard sent by a colleague/agency/Religious Office in Samarinda, addressed to colleagues/alim ulama of the Religious Office in Gresik. The letter is dated January 13, 1952. The text is written in Latin script, in Indonesian with the old spelling. This letter could be a kind of Eid greeting.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 18cm, widht 13.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Postal Receipt, British Library, EAP1564/2/51, https://eap.bl.uk/archive-file/EAP1564-2-51',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_51';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_052',
  source_identifier = 'EAP1564/2/52',
  reference_code = 'EAP1564/2/52',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-52',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-52',
  display_title = 'Correspondence letter',
  file_title = 'Correspondence letter',
  variant_titles = 'Correspondence letter
Surat korespondensi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '6',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a correspondence letter from an anonymous figure to K.H. Abdulkarim in Kranji Tebuireng Jombang. The cover of the letter has a kind of letterhead that reads Masjoemi Islamic Political Party, Blimbing Tuban Branch. The content of the letter is a request from the figure who entrusted Muhammad Thohir to K.H. Abdulkarim. The text is written using a mixture of Latin and Indonesian characters, and the content of the letter uses Arabic script in Javanese/Pegon.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 12.5cm, widht 15.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Correspondence letter, British Library, EAP1564/2/52, https://eap.bl.uk/archive-file/EAP1564-2-52',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_52';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_053',
  source_identifier = 'EAP1564/2/53',
  reference_code = 'EAP1564/2/53',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-53',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-53',
  display_title = 'كتاب الجبر للخوارزمي',
  file_title = 'كتاب الجبر للخوارزمي',
  variant_titles = 'Algebra Al Khawarizmi
كتاب الجبر للخوارزمي
Kitāb al-jabr lilkhawarijmi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '40',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the book of Algebra by Muhamamd bin Musa Al Khawarizmi. The cover is missing, the end is also incomplete. The text is written in Arabic script and language, using black ink. Each page consists of 17 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 25cm, widht 17.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الجبر للخوارزمي, British Library, EAP1564/2/53, https://eap.bl.uk/archive-file/EAP1564-2-53',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_53';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_054',
  source_identifier = 'EAP1564/2/54',
  reference_code = 'EAP1564/2/54',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-54',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-54',
  display_title = 'كتاب الفقه',
  file_title = 'كتاب الفقه',
  variant_titles = 'Fiqh Book
كتاب الفقه
Kitāb al-fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a fiqh book. The condition of the manuscript is not intact and has holes. The beginning and end are not found so it is difficult to identify the title. The text is written using Arabic script and two languages ​​(Arabic and Javanese). The text is written using red and black ink. Each page consists of 11 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21.7cm, widht 16.7cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الفقه, British Library, EAP1564/2/54, https://eap.bl.uk/archive-file/EAP1564-2-54',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_54';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_055',
  source_identifier = 'EAP1564/2/55',
  reference_code = 'EAP1564/2/55',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-55',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-55',
  display_title = 'كتاب فتح الكريم الرحمن بما يغتفر للموافق من الأركان',
  file_title = 'كتاب فتح الكريم الرحمن بما يغتفر للموافق من الأركان',
  variant_titles = 'The fatḥu al-karīm al-rahman book
كتاب فتح الكريم الرحمن بما يغتفر للموافق من الأركان
Kitāb fatḥu al-karīm al-raḥman bimā yaghtafiru lilmuwāfiq min al-arkān',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the book fatḥu al-karīm al-raḥman bimā yaghtafiru lilmuwāfiq min al-arkān by Shaykh Jamaluddin Muhammad bin Solih bin Muhammad az Zubairi as Syafi''i. This book discusses fiqh. The text is written in Arabic script and language. The text is written in black and red ink. Each page consists of 22 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 22cm, widht 16cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب فتح الكريم الرحمن بما يغتفر للموافق من الأركان, British Library, EAP1564/2/55, https://eap.bl.uk/archive-file/EAP1564-2-55',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_55';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_056',
  source_identifier = 'EAP1564/2/56',
  reference_code = 'EAP1564/2/56',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-56',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-56',
  display_title = 'ديوان شعر للإمام علي بن أبي طالب',
  file_title = 'ديوان شعر للإمام علي بن أبي طالب',
  variant_titles = 'Poems by Imam Ali bin Abi Talib
ديوان شعر للإمام علي بن أبي طالب
Dīwān lilimām ''ali bin abi ṭalib',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of a book of poems by Imam Ali bin Abi Talib on manners. The text is written in Arabic script and language. The text is written in black and red ink. Each page consists of 7 spaced lines, and is interpreted word by word in pegon / Javanese Arabic script.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ديوان شعر للإمام علي بن أبي طالب, British Library, EAP1564/2/56, https://eap.bl.uk/archive-file/EAP1564-2-56',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_56';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_057',
  source_identifier = 'EAP1564/2/57',
  reference_code = 'EAP1564/2/57',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-57',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-57',
  display_title = 'يقول راجى',
  file_title = 'يقول راجى',
  variant_titles = 'Practice book
يقول راجى
Yaqūlu rājī',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a separate part of the complete book, possibly the first volume of a copy of the nazam text entitled Al Kharidatul bahiyyah. The text is written in Arabic script and language. The text is written in black ink. Each page consists of 6 lines that are spaced for the meaning of each word.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21.5cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'يقول راجى, British Library, EAP1564/2/57, https://eap.bl.uk/archive-file/EAP1564-2-57',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_57';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_058',
  source_identifier = 'EAP1564/2/58',
  reference_code = 'EAP1564/2/58',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-58',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-58',
  display_title = 'كتاب الطب النبوي لابن القيم',
  file_title = 'كتاب الطب النبوي لابن القيم',
  variant_titles = 'Ibn al-Qayyim''s Prophetic Medicine
كتاب الطب النبوي لابن القيم
Kitāb al-tibb al-nabawi li ibn al-qayyim',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript may be part of a copy of Ibnul Qayyim''s al-tibb al-nabawi. However, this manuscript is only an incomplete sheet. The visible parts, for example, include chapters on types of mixtures, colors, blood, and phlegm. Each page consists of 22 lines. The text is written in Arabic script and language.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 21.8cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الطب النبوي لابن القيم, British Library, EAP1564/2/58, https://eap.bl.uk/archive-file/EAP1564-2-58',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_58';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_059',
  source_identifier = 'EAP1564/2/59',
  reference_code = 'EAP1564/2/59',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-59',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-59',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'Fiqh Book
فقه
Fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is part of a copy of a fiqh book. The text explains the procedure of congregational prayer. Each page consists of 8 spaced lines, then there is the meaning of each word using pegon Arabic (Javanese Arabic script). On the back is written in different ink: written by Muhammad Nafi'' bin Muhammad Ismail Sampurnan (Gresik).

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 21.5cm, widht 15.6cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'فقه, British Library, EAP1564/2/59, https://eap.bl.uk/archive-file/EAP1564-2-59',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_59';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_060',
  source_identifier = 'EAP1564/2/60',
  reference_code = 'EAP1564/2/60',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-60',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-60',
  display_title = '... pipe section g and factory pipe krian ...',
  file_title = '... pipe section g and factory pipe krian ...',
  variant_titles = '... pipe section g and factory pipe krian ...
...Leiding vak g en fabriekleiding Krian...',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Dutch',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is an administration note from Prawirodinoto to, maybe, the authority in Krian. There is the sign by Prawirodinoto. Written in black ink

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Heigt 33.5cm, widht 20.8cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '... pipe section g and factory pipe krian ..., British Library, EAP1564/2/60, https://eap.bl.uk/archive-file/EAP1564-2-60',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_60';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_061',
  source_identifier = 'EAP1564/2/61',
  reference_code = 'EAP1564/2/61',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-61',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-61',
  display_title = '... اصول٢ تياف٢...',
  file_title = '... اصول٢ تياف٢...',
  variant_titles = 'Notes
... اصول٢ تياف٢...
... usul-usul tiap-tiap....',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Malay',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is probably a record of a marriage officer at the Office of Religious Affairs. The note is written in Arabic script in Indonesian on the reverse side of a marriage certificate slip. The text is not clearly legible due to the context of Indonesian spelling, making the information difficult to capture. However, the text is more or less a record of the results of a meeting related to the rules and laws regarding divorce.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 16.5cm, widht 21.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '... اصول٢ تياف٢..., British Library, EAP1564/2/61, https://eap.bl.uk/archive-file/EAP1564-2-61',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_61';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_062',
  source_identifier = 'EAP1564/2/62',
  reference_code = 'EAP1564/2/62',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-62',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-62',
  display_title = 'كتاب فتح الرحمة',
  file_title = 'كتاب فتح الرحمة',
  variant_titles = 'Kitab Fathurrahmah
كتاب فتح الرحمة
Kitāb fatḥu al-raḥmah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '34',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is entitled Kitāb fatḥu al-raḥmah by Imam Muhammad bin Ziyad Al Waddlahi, as stated in the colophon. The beginning of the book is not found, directly in the chapter on the sin of the limbs. It was completed/copied in 1305 A.H. The content of the text contains morals and worship. The text is written using Arabic script and language, some are in the form of natsar/prose and some are in the form of nazam/poetry. Each page consists of 11-13 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 20.8cm, widht 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب فتح الرحمة, British Library, EAP1564/2/62, https://eap.bl.uk/archive-file/EAP1564-2-62',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_62';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_063',
  source_identifier = 'EAP1564/2/63',
  reference_code = 'EAP1564/2/63',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-63',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-63',
  display_title = 'ملاحظات الدعاء',
  file_title = 'ملاحظات الدعاء',
  variant_titles = 'Prayer note
ملاحظات الدعاء
Mulaḥaẓāt al-du''ā',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is like the beginning of a book, which is initially a blank page, then made into a sheet containing excerpts of prayers and so on. The text is written using Arabic script and language.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 16.8cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ملاحظات الدعاء, British Library, EAP1564/2/63, https://eap.bl.uk/archive-file/EAP1564-2-63',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_63';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_064',
  source_identifier = 'EAP1564/2/64',
  reference_code = 'EAP1564/2/64',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-64',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-64',
  display_title = 'Letter',
  file_title = 'Letter',
  variant_titles = 'Letter
Sheikh Ali Soleiman Kemp. Shamiah - Mecca Hedjaz...',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a correspondence letter from Shaykh Ali Sulaiman, Makkah Shamiah Camp to Haji Abdul Karim. The text is handwritten on paper with Sheikh Ali Soleiman''s stamp, dated 27/5/1371 A.H. The text is written in Arabic script and language.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Heigt 27.2cm, widht 20.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Letter, British Library, EAP1564/2/64, https://eap.bl.uk/archive-file/EAP1564-2-64',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_64';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_065',
  source_identifier = 'EAP1564/2/65',
  reference_code = 'EAP1564/2/65',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-65',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-65',
  display_title = 'خطبة جمعة',
  file_title = 'خطبة جمعة',
  variant_titles = 'Friday Khutbah
خطبة جمعة
Khutbah jum''at',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a Friday sermon text that talks about buying and selling. The text is written using Arabic script, in Arabic and Indonesian.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 27cm, widht 21cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'خطبة جمعة, British Library, EAP1564/2/65, https://eap.bl.uk/archive-file/EAP1564-2-65',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_65';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_066',
  source_identifier = 'EAP1564/2/66',
  reference_code = 'EAP1564/2/66',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-66',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-66',
  display_title = 'كتاب الفقه',
  file_title = 'كتاب الفقه',
  variant_titles = 'Fiqh Book
كتاب الفقه
Kitāb al-fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a part item of the book of Fikih Syafiiyah. The text discusses absolute/clean water. The text is written using Arabic language and script. The text is written using red and black ink. Each page consists of 19 lines.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 23cm, widht 16.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الفقه, British Library, EAP1564/2/66, https://eap.bl.uk/archive-file/EAP1564-2-66',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_66';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_067',
  source_identifier = 'EAP1564/2/67',
  reference_code = 'EAP1564/2/67',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-67',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-67',
  display_title = 'كتاب الأذكار والدعاء',
  file_title = 'كتاب الأذكار والدعاء',
  variant_titles = 'The book of wirid and dua
كتاب الأذكار والدعاء
Kitāb al-azkār wa al-du''a',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a part item of the book of wirid and dua. The text appears to show the recitation of salawat and prayers, and the narrator. The text is written using Arabic language and script. The text is written using black ink. Each page consists of 9 lines.

Extent: 1 Lined paper manuscript.

Size and dimensions of original material: Heigt 17cm, widht 11cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الأذكار والدعاء, British Library, EAP1564/2/67, https://eap.bl.uk/archive-file/EAP1564-2-67',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_67';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_068',
  source_identifier = 'EAP1564/2/68',
  reference_code = 'EAP1564/2/68',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-68',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-68',
  display_title = 'كتاب الصرف',
  file_title = 'كتاب الصرف',
  variant_titles = 'Morfology book
كتاب الصرف
Kitāb al-ṣarf',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a copy of the Arabic Sharaf/morphology book. The text is written in Arabic language and script. Each page consists of 7 spaced lines which are then given meaning per word in pegon script (Javanese Arabic script).

Extent: 1 European paper manuscript.

Size and dimensions of original material: Heigt 21cm, widht 17.5cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'كتاب الصرف, British Library, EAP1564/2/68, https://eap.bl.uk/archive-file/EAP1564-2-68',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_68';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_069',
  source_identifier = 'EAP1564/2/69',
  reference_code = 'EAP1564/2/69',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-69',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-69',
  display_title = 'Land ownership certificate',
  file_title = 'Land ownership certificate',
  variant_titles = 'Land ownership certificate
Katrangan',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Malay',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Land ownership certificate in Wonoredjo Village in the name of Srijanah or Doeliksan, in Glagah Sub-district. The text is written with black ink

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 32,5, width 20cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Land ownership certificate, British Library, EAP1564/2/69, https://eap.bl.uk/archive-file/EAP1564-2-69',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_69';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_070',
  source_identifier = 'EAP1564/2/70',
  reference_code = 'EAP1564/2/70',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-70',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-70',
  display_title = 'دعاء من كتاب النجاة',
  file_title = 'دعاء من كتاب النجاة',
  variant_titles = 'Prayer from book of Najat
دعاء من كتاب النجاة
Du''a min kitab al-najat',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains praying and shalawat text. Some of text with black ink while other written using pencil

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 20,8, width 13,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'دعاء من كتاب النجاة, British Library, EAP1564/2/70, https://eap.bl.uk/archive-file/EAP1564-2-70',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_70';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_071',
  source_identifier = 'EAP1564/2/71',
  reference_code = 'EAP1564/2/71',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-71',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-71',
  display_title = 'سرات',
  file_title = 'سرات',
  variant_titles = 'Letter requesting donations for the construction of an Islamic boarding school
سرات
Serat',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'Letter requesting donations for the construction of an Islamic boarding school Letter of Request for Donation for Pesantren Development from Kiai Ma''sum at Al-Hidayat Lasem Islamic Boarding School to students and. parents of students. The text is written with black and blue ink.

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 34,5, width 21,8cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'سرات, British Library, EAP1564/2/71, https://eap.bl.uk/archive-file/EAP1564-2-71',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_71';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_072',
  source_identifier = 'EAP1564/2/72',
  reference_code = 'EAP1564/2/72',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-72',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-72',
  display_title = 'قواعد الإعراب',
  file_title = 'قواعد الإعراب',
  variant_titles = 'Rules of I''rab
قواعد الإعراب
Qawā''id al-I''rāb',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'The rules of i''rab (Arabic grammar) are conveyed in the form of poetry (verse). Some of text with black ink while other written using pencil

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21, width 16,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'قواعد الإعراب, British Library, EAP1564/2/72, https://eap.bl.uk/archive-file/EAP1564-2-72',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_72';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_073',
  source_identifier = 'EAP1564/2/73',
  reference_code = 'EAP1564/2/73',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-73',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-73',
  display_title = 'ام البراهين',
  file_title = 'ام البراهين',
  variant_titles = 'The mother of proofs
ام البراهين
Um al-barahīn',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '36',
  digitisation_date = '2024',
  bundle_description = 'This book is about the Aqidah Ahlusunnah Wal Jama''ah perspective of Abu Al-Hassan Al-Asy''ari. There is catchword in some page. The text is written in blank ink

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21, width 16,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ام البراهين, British Library, EAP1564/2/73, https://eap.bl.uk/archive-file/EAP1564-2-73',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_73';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_074',
  source_identifier = 'EAP1564/2/74',
  reference_code = 'EAP1564/2/74',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-74',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-74',
  display_title = 'بهجة العلوم في الشرح في بيان عقيدة الأصول',
  file_title = 'بهجة العلوم في الشرح في بيان عقيدة الأصول',
  variant_titles = 'The Joy of Science in the Explanation of the Doctrine of Fundamentals
بهجة العلوم في الشرح في بيان عقيدة الأصول
Bahjah al-''ulū m fī al-sharḥ fī ''aqīdah al-uṣul',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This book contains the pillars of faith and the pillars of Islam in the form of questions and answers. Twenty three rowsper pages. The text written ini blank and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 25, width 17,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'بهجة العلوم في الشرح في بيان عقيدة الأصول, British Library, EAP1564/2/74, https://eap.bl.uk/archive-file/EAP1564-2-74',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_74';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_075',
  source_identifier = 'EAP1564/2/75',
  reference_code = 'EAP1564/2/75',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-75',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-75',
  display_title = 'خطبة الجمعة',
  file_title = 'خطبة الجمعة',
  variant_titles = 'Friday Khutbah
خطبة الجمعة
Khutbah jum''at',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a Friday sermon text in Arabic. The text is written in blue ink.

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 33,8 width 21,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'خطبة الجمعة, British Library, EAP1564/2/75, https://eap.bl.uk/archive-file/EAP1564-2-75',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_75';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_076',
  source_identifier = 'EAP1564/2/76',
  reference_code = 'EAP1564/2/76',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-76',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-76',
  display_title = 'هداية المبتدي لمسألة المقتدي',
  file_title = 'هداية المبتدي لمسألة المقتدي',
  variant_titles = 'Guidance of the Beginner to the Question of Al-Mubtadi (Ma''mum)
هداية المبتدي لمسألة المقتدي
Hidāyat al-mubtadi li mas''alat al-muqtadi',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '40',
  digitisation_date = '2024',
  bundle_description = 'A book that explains the rulings and procedures for those who are left behind in prayer. Seven rowsper page. There is catchword in each page. The text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 22 width 17cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'هداية المبتدي لمسألة المقتدي, British Library, EAP1564/2/76, https://eap.bl.uk/archive-file/EAP1564-2-76',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_76';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_077',
  source_identifier = 'EAP1564/2/77',
  reference_code = 'EAP1564/2/77',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-77',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-77',
  display_title = 'مختصر على المقدمة رحبية في علم الفرائيض',
  file_title = 'مختصر على المقدمة رحبية في علم الفرائيض',
  variant_titles = 'Abridged on the Rahabiya Introduction to the Science of Inheritance
مختصر على المقدمة رحبية في علم الفرائيض
Mukhtaṣar ''ala al-muqaddimah raḥībiyah fi ''ilm al-fara''id',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic|Malay',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '62',
  digitisation_date = '2024',
  bundle_description = 'The science of the fiqh of the division of inheritance in Islam; and the preceding text contains the science of astrology. The text is written in black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 22 width 17cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'مختصر على المقدمة رحبية في علم الفرائيض, British Library, EAP1564/2/77, https://eap.bl.uk/archive-file/EAP1564-2-77',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_77';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_078',
  source_identifier = 'EAP1564/2/78',
  reference_code = 'EAP1564/2/78',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-78',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-78',
  display_title = 'سورة',
  file_title = 'سورة',
  variant_titles = 'Letter of invitation
سورة
Surat',
  creation_date = '1952',
  copying_date_native = '1952',
  languages = 'Malay|Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'Letter of invitation from Jakarta to Kiai Abdul Karim in Gresik to attend the inviter''s son''s circumcision party. The text is written in black ink

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 27, width 20,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'سورة, British Library, EAP1564/2/78, https://eap.bl.uk/archive-file/EAP1564-2-78',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_78';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_079',
  source_identifier = 'EAP1564/2/79',
  reference_code = 'EAP1564/2/79',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-79',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-79',
  display_title = 'متن الجرومية',
  file_title = 'متن الجرومية',
  variant_titles = 'متن الجرومية
Matn al-jurūmiyah',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '44',
  digitisation_date = '2024',
  bundle_description = 'The manuscript contains about Arabic grammar. Five rows per page. The text written with black ink. Some pages have holes, probably from bookworms.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 24 width 18cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'متن الجرومية, British Library, EAP1564/2/79, https://eap.bl.uk/archive-file/EAP1564-2-79',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_79';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_080',
  source_identifier = 'EAP1564/2/80',
  reference_code = 'EAP1564/2/80',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-80',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-80',
  display_title = 'الف الفات في كلام العرب',
  file_title = 'الف الفات في كلام العرب',
  variant_titles = 'الف الفات في كلام العرب
Alif alafāt fī kalām al-''arab',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'Arabic grammar about alif, but incomplete. Fourteen rows per page. Some pages have holes, probably from bookworms.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 20,5, width 16cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الف الفات في كلام العرب, British Library, EAP1564/2/80, https://eap.bl.uk/archive-file/EAP1564-2-80',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_80';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_081',
  source_identifier = 'EAP1564/2/81',
  reference_code = 'EAP1564/2/81',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-81',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-81',
  display_title = 'توحيد',
  file_title = 'توحيد',
  variant_titles = 'Tauhid
توحيد
Tauḥīd',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'Framents of Islamic theology. Manuscript is incomplete. It has holes, probably due to bookworms. There is catchwords. The text is written with black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21, width 15,8cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'توحيد, British Library, EAP1564/2/81, https://eap.bl.uk/archive-file/EAP1564-2-81',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_81';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_082',
  source_identifier = 'EAP1564/2/82',
  reference_code = 'EAP1564/2/82',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-82',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-82',
  display_title = 'عمدة السالك وعدة الناسك',
  file_title = 'عمدة السالك وعدة الناسك',
  variant_titles = 'عمدة السالك وعدة الناسك
Umdah al-salikin wa ''adat al-nasikin',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'Fragments of fiqh/Islamic law. Twenty one rows per page. It has holes, probably due to bookworms. There is catchwords. The text is written with black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 22,8, width 16,4cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'عمدة السالك وعدة الناسك, British Library, EAP1564/2/82, https://eap.bl.uk/archive-file/EAP1564-2-82',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_82';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_083',
  source_identifier = 'EAP1564/2/83',
  reference_code = 'EAP1564/2/83',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-83',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-83',
  display_title = 'نحو',
  file_title = 'نحو',
  variant_titles = 'Arabic grammar
نحو
Naḥw',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '6',
  digitisation_date = '2024',
  bundle_description = 'Fragments of Arabic grammar in verse form. Six rows per page. The text is written with black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21,5, width 16,5cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'نحو, British Library, EAP1564/2/83, https://eap.bl.uk/archive-file/EAP1564-2-83',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_83';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_084',
  source_identifier = 'EAP1564/2/84',
  reference_code = 'EAP1564/2/84',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-84',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-84',
  display_title = 'خطبة الجمعة',
  file_title = 'خطبة الجمعة',
  variant_titles = 'Friday Khutbah/Sermon
خطبة الجمعة
Khutbah al-jum''at',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'Khutbah in Friday prayer. The text is written with blue ink.

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 33,6, width 21cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'خطبة الجمعة, British Library, EAP1564/2/84, https://eap.bl.uk/archive-file/EAP1564-2-84',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_84';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_085',
  source_identifier = 'EAP1564/2/85',
  reference_code = 'EAP1564/2/85',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-85',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-85',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'فقه
Fiqh',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'Fragments of fiqh/Islamic law. Seven rows per page. There is catchwords. The text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21, width 17cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'فقه, British Library, EAP1564/2/85, https://eap.bl.uk/archive-file/EAP1564-2-85',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_85';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_086',
  source_identifier = 'EAP1564/2/86',
  reference_code = 'EAP1564/2/86',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-86',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-86',
  display_title = 'صرف',
  file_title = 'صرف',
  variant_titles = 'صرف
Ṣaraf',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesa',
  country = 'Indonesa',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'Arabic morphology in verse form. Five rows per page. There is catchwords. The text is written with black ink.

Extent: 1 European papers.

Size and dimensions of original material: Height 26,5, width 17cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'صرف, British Library, EAP1564/2/86, https://eap.bl.uk/archive-file/EAP1564-2-86',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_86';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_087',
  source_identifier = 'EAP1564/2/87',
  reference_code = 'EAP1564/2/87',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-87',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-87',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'فقه
Fiqh',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '22',
  digitisation_date = '2024',
  bundle_description = 'Fragments of fiqh of worship. Ten rows per page. It has holes, probably due to bookworms. There is catchwords. The text is written with black ink.

Extent: 1 European papers.

Size and dimensions of original material: Height 21, width 17cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'فقه, British Library, EAP1564/2/87, https://eap.bl.uk/archive-file/EAP1564-2-87',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_87';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_088',
  source_identifier = 'EAP1564/2/88',
  reference_code = 'EAP1564/2/88',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-88',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-88',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'فقه
Fiqh',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'Fragments of fiqh of worship. Seventeen rows per page. It has holes, probably due to bookworms. There is catchwords. The text is written with black and red ink.

Extent: 1 European papers.

Size and dimensions of original material: Height 22, width 16,2cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'فقه, British Library, EAP1564/2/88, https://eap.bl.uk/archive-file/EAP1564-2-88',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_88';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_089',
  source_identifier = 'EAP1564/2/89',
  reference_code = 'EAP1564/2/89',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-89',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-89',
  display_title = 'تيجان الدراري',
  file_title = 'تيجان الدراري',
  variant_titles = 'Crowns of Tiaras
تيجان الدراري
Tijān al-darāri',
  creation_date = '1929',
  copying_date_native = '1929',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'The book explains tauhid, the attributes of Allah, the attributes of the messenger, the pillars of Islam, and the rukum iman. The cover made from animal skin. Eight rows per page. There is catchwords. The text is written with black ink.

Extent: 1 European papers.

Size and dimensions of original material: Height 24,5, width 18cm.

Condition of original material: Good.

Alternative calendar and date: Islamic, 1348.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'تيجان الدراري, British Library, EAP1564/2/89, https://eap.bl.uk/archive-file/EAP1564-2-89',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_89';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_090',
  source_identifier = 'EAP1564/2/90',
  reference_code = 'EAP1564/2/90',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-90',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-90',
  display_title = '.....دوماتڠ راما ياهي....',
  file_title = '.....دوماتڠ راما ياهي....',
  variant_titles = 'Letter of invitation
.....دوماتڠ راما ياهي....
Dumateng rama yai',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter of invitation to Kiai Salih from Mr Burhan, delivered by his son, to attend a wedding. The text is written with black ink

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 13, width 21,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '.....دوماتڠ راما ياهي...., British Library, EAP1564/2/90, https://eap.bl.uk/archive-file/EAP1564-2-90',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_90';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_091',
  source_identifier = 'EAP1564/2/91',
  reference_code = 'EAP1564/2/91',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-91',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-91',
  display_title = 'Notes',
  file_title = 'Notes',
  variant_titles = 'Notes
Note book',
  creation_date = '1959',
  copying_date_native = '1959',
  languages = 'Malay',
  bundle_script = 'Arabic|Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '34',
  digitisation_date = '2024',
  bundle_description = 'Records of all kinds, from debts, income, and lecture notes. Text written in black ink

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 19, width 19,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Notes, British Library, EAP1564/2/91, https://eap.bl.uk/archive-file/EAP1564-2-91',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_91';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_092',
  source_identifier = 'EAP1564/2/92',
  reference_code = 'EAP1564/2/92',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-92',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-92',
  display_title = 'Notes book',
  file_title = 'Notes book',
  variant_titles = 'Notes book',
  creation_date = '1975',
  copying_date_native = '1975',
  languages = 'Indonesian',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '46',
  digitisation_date = '2024',
  bundle_description = 'Notes on madrasa lessons and assignments. Text written with black ink.

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 24, width 15,7cm.

Condition of original material: Good.

Scribe(s): Asma Karim.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Notes book, British Library, EAP1564/2/92, https://eap.bl.uk/archive-file/EAP1564-2-92',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_92';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_093',
  source_identifier = 'EAP1564/2/93',
  reference_code = 'EAP1564/2/93',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-93',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-93',
  display_title = 'إن أعمال الحج ثلاثة أقسام',
  file_title = 'إن أعمال الحج ثلاثة أقسام',
  variant_titles = 'Three parts of Hajj deeds
إن أعمال الحج ثلاثة أقسام
In a''māl al-ḥajj thalathah al-aqsām',
  creation_date = '1896',
  copying_date_native = '1896',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '30',
  digitisation_date = '2024',
  bundle_description = 'Explanation of the pillars and sunnahs of Hajj. Eleven rows per page. There is catchword. Text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21, width 17cm.

Condition of original material: Good.

Alternative calendar and date: Islamic, 1313.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'إن أعمال الحج ثلاثة أقسام, British Library, EAP1564/2/93, https://eap.bl.uk/archive-file/EAP1564-2-93',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_93';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_094',
  source_identifier = 'EAP1564/2/94',
  reference_code = 'EAP1564/2/94',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-94',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-94',
  display_title = 'Notes',
  file_title = 'Notes',
  variant_titles = 'Notes',
  creation_date = '1954',
  copying_date_native = '1954',
  languages = 'Malay|Arabic',
  bundle_script = 'Arabic|Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '44',
  digitisation_date = '2024',
  bundle_description = 'A wide variety of records, including a brief biography of Kiai Muhammad Soleh Sampurnan. Some text is written with black ink while others written with pencil.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 29, width 20,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Notes, British Library, EAP1564/2/94, https://eap.bl.uk/archive-file/EAP1564-2-94',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_94';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_095',
  source_identifier = 'EAP1564/2/95',
  reference_code = 'EAP1564/2/95',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-95',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-95',
  display_title = 'Notes book',
  file_title = 'Notes book',
  variant_titles = 'Notes book',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '26',
  digitisation_date = '2024',
  bundle_description = 'Various kinds of lesson writings in madrasas, including poems, lesson exercises. The text written with black and blue ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height11, width 16,3cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Notes book, British Library, EAP1564/2/95, https://eap.bl.uk/archive-file/EAP1564-2-95',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_95';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_096',
  source_identifier = 'EAP1564/2/96',
  reference_code = 'EAP1564/2/96',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-96',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-96',
  display_title = 'خطبة الجمعة',
  file_title = 'خطبة الجمعة',
  variant_titles = 'خطبة الجمعة
Khutbah al-jum''at',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '40',
  digitisation_date = '2024',
  bundle_description = 'Khutbah in Friday prayer. The text is written with blue and black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21, width 13,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'خطبة الجمعة, British Library, EAP1564/2/96, https://eap.bl.uk/archive-file/EAP1564-2-96',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_96';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_097',
  source_identifier = 'EAP1564/2/97',
  reference_code = 'EAP1564/2/97',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-97',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-97',
  display_title = 'الأديان',
  file_title = 'الأديان',
  variant_titles = 'Religions
الأديان
al-Adyān',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '44',
  digitisation_date = '2024',
  bundle_description = 'Explanations and critiques of various religions other than Islam. Some text is written with black ink while others written with pencil.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21, width 16,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الأديان, British Library, EAP1564/2/97, https://eap.bl.uk/archive-file/EAP1564-2-97',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_97';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_098',
  source_identifier = 'EAP1564/2/98',
  reference_code = 'EAP1564/2/98',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-98',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-98',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'فقه
Fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '32',
  digitisation_date = '2024',
  bundle_description = 'Fragments on fiqh laws, such as purification, prayer and menstruation. There are also verses in it. There is catchword. Text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 24,5 width 18cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'فقه, British Library, EAP1564/2/98, https://eap.bl.uk/archive-file/EAP1564-2-98',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_98';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_099',
  source_identifier = 'EAP1564/2/99',
  reference_code = 'EAP1564/2/99',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-99',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-99',
  display_title = 'سلم التوفيق الى محبة الله على التحقيق',
  file_title = 'سلم التوفيق الى محبة الله على التحقيق',
  variant_titles = 'The ladder of salvation to the ultimate love of Allah
سلم التوفيق الى محبة الله على التحقيق
Sullam al-tawfiq ila maḥabbati Allah ''ala al-taḥqīq',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'The chapters in this book include ushuluddin, thoharoh, prayer, zakat, fasting, hajj, muamalat, tazkiyatun nafsi, and bayanul ma''ashi. It can be said that this book is a guide for ordinary Muslims. The text is written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21,5 width 16,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'سلم التوفيق الى محبة الله على التحقيق, British Library, EAP1564/2/99, https://eap.bl.uk/archive-file/EAP1564-2-99',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_99';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_100',
  source_identifier = 'EAP1564/2/100',
  reference_code = 'EAP1564/2/100',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-100',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-100',
  display_title = 'فقه',
  file_title = 'فقه',
  variant_titles = 'فقه
Fiqh',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '60',
  digitisation_date = '2024',
  bundle_description = 'Fragments of fiqh of worship. There is catchword. Some pages has holes, probably due to bookworms. There is catchwords. The text is written with black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 22,5 width 16,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'فقه, British Library, EAP1564/2/100, https://eap.bl.uk/archive-file/EAP1564-2-100',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_100';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_101',
  source_identifier = 'EAP1564/2/101',
  reference_code = 'EAP1564/2/101',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-101',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-101',
  display_title = 'هداية الصبىيان',
  file_title = 'هداية الصبىيان',
  variant_titles = 'هداية الصبىيان
Hidāyat al-ṣibyān',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Fragment of kitab Hidayat al-Sibyan, the book of rules in reciting the Qur''an. Some text written with black ink, while others is written with pencil.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 20,8 width 16,3cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'هداية الصبىيان, British Library, EAP1564/2/101, https://eap.bl.uk/archive-file/EAP1564-2-101',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_101';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_102',
  source_identifier = 'EAP1564/2/102',
  reference_code = 'EAP1564/2/102',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-102',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-102',
  display_title = '......محمد صالح مصطفى',
  file_title = '......محمد صالح مصطفى',
  variant_titles = 'Letter from Saleh Mustafa to Sheikh Ali Suleiman in Mecca
......محمد صالح مصطفى
Muḥammad ṣalih mustafa....',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter from Kiai Salih Mustafa to Shaykh ‘Ali Usman in Makkah requesting Misik and Za''faron oil from Makkah. The text is written with blue ink.

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 22,1 width 14,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '......محمد صالح مصطفى, British Library, EAP1564/2/102, https://eap.bl.uk/archive-file/EAP1564-2-102',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_102';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_103',
  source_identifier = 'EAP1564/2/103',
  reference_code = 'EAP1564/2/103',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-103',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-103',
  display_title = 'Surat Keterangan Djalan/Bepergian',
  file_title = 'Surat Keterangan Djalan/Bepergian',
  variant_titles = 'Surat Keterangan Djalan/Bepergian',
  creation_date = '1969',
  copying_date_native = '1969',
  languages = 'Indonesian',
  bundle_script = 'Latin',
  content_type = 'Document',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter from the village head about someone who would give sheep to Kiai Salih Mustafa in Sampurnan, Bungah, Gresik, East Java.

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 21,7 width 14,2cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Surat Keterangan Djalan/Bepergian, British Library, EAP1564/2/103, https://eap.bl.uk/archive-file/EAP1564-2-103',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_103';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_104',
  source_identifier = 'EAP1564/2/104',
  reference_code = 'EAP1564/2/104',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-104',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-104',
  display_title = '.....حجنى عمراهى.....',
  file_title = '.....حجنى عمراهى.....',
  variant_titles = 'Financial notes
.....حجنى عمراهى.....
Ḥajine umrohe....',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Financial notes. Problably it is notes about of hajj or umrah costs. Written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 23 width 14,4cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '.....حجنى عمراهى....., British Library, EAP1564/2/104, https://eap.bl.uk/archive-file/EAP1564-2-104',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_104';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_105',
  source_identifier = 'EAP1564/2/105',
  reference_code = 'EAP1564/2/105',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-105',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-105',
  display_title = 'Lagu kebangsaan Indonesia',
  file_title = 'Lagu kebangsaan Indonesia',
  variant_titles = 'Lagu kebangsaan Indonesia',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Indonesian|Javanese',
  bundle_script = 'Latin|Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'Notes on the Indonesian national anthem. There is also text in pegon, probably it is the answer of student exam. The text written with blue ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21,5 width 16cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Lagu kebangsaan Indonesia, British Library, EAP1564/2/105, https://eap.bl.uk/archive-file/EAP1564-2-105',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_105';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_106',
  source_identifier = 'EAP1564/2/106',
  reference_code = 'EAP1564/2/106',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-106',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-106',
  display_title = 'الأخلاق',
  file_title = 'الأخلاق',
  variant_titles = 'الأخلاق
Akhlaq',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Indonesian|Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'About manners when entering and studying at the madrasa. The text is written with pencil

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21,5 width 16cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الأخلاق, British Library, EAP1564/2/106, https://eap.bl.uk/archive-file/EAP1564-2-106',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_106';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_107',
  source_identifier = 'EAP1564/2/107',
  reference_code = 'EAP1564/2/107',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-107',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-107',
  display_title = 'عقيدة',
  file_title = 'عقيدة',
  variant_titles = 'عقيدة
Aqīdah',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Questions and answers for ''aqidah lessons at the Islamic Boarding School. The text is written with pencil.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 10,4 width 16,3cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'عقيدة, British Library, EAP1564/2/107, https://eap.bl.uk/archive-file/EAP1564-2-107',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_107';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_108',
  source_identifier = 'EAP1564/2/108',
  reference_code = 'EAP1564/2/108',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-108',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-108',
  display_title = 'الأخلاق في المعهد',
  file_title = 'الأخلاق في المعهد',
  variant_titles = 'Ethics in boarding school
الأخلاق في المعهد
Al-akhlaq fi al-ma''had',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Indonesian',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'About Ethics in boarding school. The text is written with pencil.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 10,4 width 16,3cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الأخلاق في المعهد, British Library, EAP1564/2/108, https://eap.bl.uk/archive-file/EAP1564-2-108',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_108';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_109',
  source_identifier = 'EAP1564/2/109',
  reference_code = 'EAP1564/2/109',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-109',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-109',
  display_title = 'جدول علم الفلك',
  file_title = 'جدول علم الفلك',
  variant_titles = 'جدول علم الفلك
Jadwal ''ilm al-falak',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'About the day calculation schedule in ''ilm falak (Islamic astronomy). It written in table form. The text is written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21,8 width 18cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'جدول علم الفلك, British Library, EAP1564/2/109, https://eap.bl.uk/archive-file/EAP1564-2-109',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_109';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_110',
  source_identifier = 'EAP1564/2/110',
  reference_code = 'EAP1564/2/110',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-110',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-110',
  display_title = 'الرسالة',
  file_title = 'الرسالة',
  variant_titles = 'Letter
الرسالة
Al-risalah',
  creation_date = '1960',
  copying_date_native = '1960',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Letter about receiving donations from Pesantren Sampurnan. The text is written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21,3 width 15,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic, 1380.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الرسالة, British Library, EAP1564/2/110, https://eap.bl.uk/archive-file/EAP1564-2-110',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_110';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_111',
  source_identifier = 'EAP1564/2/111',
  reference_code = 'EAP1564/2/111',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-111',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-111',
  display_title = 'خطبة الجمعة',
  file_title = 'خطبة الجمعة',
  variant_titles = 'Friday sermon
خطبة الجمعة
Khutbah al-jum''at',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Javanese|Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Friday sermon. The text is written in pegon with blue ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21,4 width 16cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'خطبة الجمعة, British Library, EAP1564/2/111, https://eap.bl.uk/archive-file/EAP1564-2-111',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_111';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_112',
  source_identifier = 'EAP1564/2/112',
  reference_code = 'EAP1564/2/112',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-112',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-112',
  display_title = '...برساما ايني...',
  file_title = '...برساما ايني...',
  variant_titles = 'Letter
...برساما ايني...
...Bersama ini....',
  creation_date = '1955',
  copying_date_native = '1955',
  languages = 'Indonesian',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter containing information on the delivery of food ingredients for a santri, complete with side dishes. The text is written with blue ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 15 width 10,5cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '...برساما ايني..., British Library, EAP1564/2/112, https://eap.bl.uk/archive-file/EAP1564-2-112',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_112';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_113',
  source_identifier = 'EAP1564/2/113',
  reference_code = 'EAP1564/2/113',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-113',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-113',
  display_title = '...ويوسيفون بوتن...',
  file_title = '...ويوسيفون بوتن...',
  variant_titles = 'Letter
...ويوسيفون بوتن...
... Wayosipun mboten....',
  creation_date = '1893',
  copying_date_native = '1893',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'A letter informing that my mother-in-law was sick with a fever. The text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21,5 width 18,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic, 1310.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '...ويوسيفون بوتن..., British Library, EAP1564/2/113, https://eap.bl.uk/archive-file/EAP1564-2-113',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_113';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_114',
  source_identifier = 'EAP1564/2/114',
  reference_code = 'EAP1564/2/114',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-114',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-114',
  display_title = 'A Note Letter',
  file_title = 'A Note Letter',
  variant_titles = 'A Note Letter
Srat Cathethtan',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Javanese',
  bundle_script = 'Javanese',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesa',
  country = 'Indonesa',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a Javanese letter containing the submission of zakat from someone named Narakusuma, a Glagah Village Supervisor to Kyai Basir at the Bungah Islamic boarding school. Because the Kyai was not at home, the money was entrusted to the Kyai''s wife accompanied by this letter. The manuscript is written in Javanese script using black ink. The manuscript is still relatively legible although there are words that are illegible because the paper has holes and the edges of the pages are damaged.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 20,2cm, width 15cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'A Note Letter, British Library, EAP1564/2/114, https://eap.bl.uk/archive-file/EAP1564-2-114',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_114';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_115',
  source_identifier = 'EAP1564/2/115',
  reference_code = 'EAP1564/2/115',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-115',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-115',
  display_title = '...بعد السلام...',
  file_title = '...بعد السلام...',
  variant_titles = 'Letter
...بعد السلام...
... Ba''da al-salam...',
  creation_date = '1950',
  copying_date_native = '1950',
  languages = 'Javanese|Indonesian',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter from someone in Waru informing Kiai ‘Abdul Karim that he was coming to enrol his children in the pesantren. The text is written with pencil.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 20,7 width 16cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = '...بعد السلام..., British Library, EAP1564/2/115, https://eap.bl.uk/archive-file/EAP1564-2-115',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_115';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_116',
  source_identifier = 'EAP1564/2/116',
  reference_code = 'EAP1564/2/116',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-116',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-116',
  display_title = 'خطبة الاول عيد الفطر',
  file_title = 'خطبة الاول عيد الفطر',
  variant_titles = 'Eid al-Fitr sermon
خطبة الاول عيد الفطر
Khutbah al-awal ''id al-fiṭr',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic|Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'Eid al-Fitr sermon. The paper is broken, maybe from bookworm. The text is written with blue ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 33 width 21,5cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'خطبة الاول عيد الفطر, British Library, EAP1564/2/116, https://eap.bl.uk/archive-file/EAP1564-2-116',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_116';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_117',
  source_identifier = 'EAP1564/2/117',
  reference_code = 'EAP1564/2/117',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-117',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-117',
  display_title = 'ألرسالة عن البحث الكتاب المنكابو',
  file_title = 'ألرسالة عن البحث الكتاب المنكابو',
  variant_titles = 'Letter on the discussion of Shaykh al-Minangkabau''s book
ألرسالة عن البحث الكتاب المنكابو
Al-Risālah ''an al-bahth al-kitāb al-minakabau',
  creation_date = 'Early 20th century',
  copying_date_native = 'Early 20th century',
  languages = 'Javanese|Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Letter on the discussion of Shaykh al-Minangkabau''s book. Letter on the discussion of Shaykh al-Minangkabau''s book. The discussion seems to be about gold and money. The text is written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21 width 13,7cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ألرسالة عن البحث الكتاب المنكابو, British Library, EAP1564/2/117, https://eap.bl.uk/archive-file/EAP1564-2-117',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_117';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_118',
  source_identifier = 'EAP1564/2/118',
  reference_code = 'EAP1564/2/118',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-118',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-118',
  display_title = 'الرسالة',
  file_title = 'الرسالة',
  variant_titles = 'Letter
الرسالة
al-Risālah',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Javanese|Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter addressed to Shaykh ‘Abd al-Karim about the condition of a santri. The text is written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21,7 width 15,3cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الرسالة, British Library, EAP1564/2/118, https://eap.bl.uk/archive-file/EAP1564-2-118',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_118';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_119',
  source_identifier = 'EAP1564/2/119',
  reference_code = 'EAP1564/2/119',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-119',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-119',
  display_title = 'الرسالة',
  file_title = 'الرسالة',
  variant_titles = 'Letter
الرسالة
al-Risālah',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter apologising to Kiai Muhammad Saleh. The text is written with blue ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 16 width 16cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الرسالة, British Library, EAP1564/2/119, https://eap.bl.uk/archive-file/EAP1564-2-119',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_119';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_120',
  source_identifier = 'EAP1564/2/120',
  reference_code = 'EAP1564/2/120',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-120',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-120',
  display_title = 'Postcard',
  file_title = 'Postcard',
  variant_titles = 'Postcard
Kartu Pos',
  creation_date = '1952',
  copying_date_native = '1952',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'An invitation to attend a celebration of the birth of a child to Kiai ‘Abdul Karim. The text written with blue ink.

Extent: 1 postcard manuscript.

Size and dimensions of original material: Height 10 width 15cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Postcard, British Library, EAP1564/2/120, https://eap.bl.uk/archive-file/EAP1564-2-120',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_120';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_121',
  source_identifier = 'EAP1564/2/121',
  reference_code = 'EAP1564/2/121',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-121',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-121',
  display_title = 'افضل العلم و الأخر',
  file_title = 'افضل العلم و الأخر',
  variant_titles = 'The virtue of knowledge etc.
افضل العلم و الأخر
Afḍal al-''ilm wa al-akhar',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '40',
  digitisation_date = '2024',
  bundle_description = 'A quote about the virtues of knowledge and just leadership. The text is written with blue and black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21 width 13,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'افضل العلم و الأخر, British Library, EAP1564/2/121, https://eap.bl.uk/archive-file/EAP1564-2-121',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_121';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_122',
  source_identifier = 'EAP1564/2/122',
  reference_code = 'EAP1564/2/122',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-122',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-122',
  display_title = 'Catatan',
  file_title = 'Catatan',
  variant_titles = 'Catatan',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Indonesian|Javanese',
  bundle_script = 'Latin|Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '32',
  digitisation_date = '2024',
  bundle_description = 'Various kinds of records, such as receipts for giving rice and others. The text is written with blue and black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 20,7 width 13,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Catatan, British Library, EAP1564/2/122, https://eap.bl.uk/archive-file/EAP1564-2-122',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_122';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_123',
  source_identifier = 'EAP1564/2/123',
  reference_code = 'EAP1564/2/123',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-123',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-123',
  display_title = 'A wide variety of notes, letters, and Friday sermons',
  file_title = 'A wide variety of notes, letters, and Friday sermons',
  variant_titles = 'A wide variety of notes, letters, and Friday sermons
Berbagai macam catatan, surat-surat, dan khutbah Jumat',
  creation_date = '1952',
  copying_date_native = '1952',
  languages = 'Javanese|Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '28',
  digitisation_date = '2024',
  bundle_description = 'A wide variety of notes, letters, and Friday sermons

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21 width 14cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'A wide variety of notes, letters, and Friday sermons, British Library, EAP1564/2/123, https://eap.bl.uk/archive-file/EAP1564-2-123',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_123';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_124',
  source_identifier = 'EAP1564/2/124',
  reference_code = 'EAP1564/2/124',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-124',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-124',
  display_title = 'Schedule Notes and Invitations',
  file_title = 'Schedule Notes and Invitations',
  variant_titles = 'Schedule Notes and Invitations
Catatan Jadwal dan Undangan',
  creation_date = '1952',
  copying_date_native = '1952',
  languages = 'Javanese|Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '70',
  digitisation_date = '2024',
  bundle_description = 'Various records of a kiai''s schedule of invitation activities. The text is written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 21 width 13,5cm.

Condition of original material: Good.

Alternative calendar and date: Islamic.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Schedule Notes and Invitations, British Library, EAP1564/2/124, https://eap.bl.uk/archive-file/EAP1564-2-124',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_124';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_125',
  source_identifier = 'EAP1564/2/125',
  reference_code = 'EAP1564/2/125',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-125',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-125',
  display_title = 'Chess game strategy',
  file_title = 'Chess game strategy',
  variant_titles = 'Chess game strategy
Strategi permainan catur',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Indonesian',
  bundle_script = 'Latin',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '30',
  digitisation_date = '2024',
  bundle_description = 'Various chess game strategy notes. The text is written with blue ink.

Extent: 1 plain paper manuscript.

Size and dimensions of original material: Height 32,5 width 21,5cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'Chess game strategy, British Library, EAP1564/2/125, https://eap.bl.uk/archive-file/EAP1564-2-125',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_125';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_126',
  source_identifier = 'EAP1564/2/126',
  reference_code = 'EAP1564/2/126',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-126',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-126',
  display_title = 'الصلاة على النبي محمد صلى الله عليه وسلم',
  file_title = 'الصلاة على النبي محمد صلى الله عليه وسلم',
  variant_titles = 'Praise to Prophet Muhammad
الصلاة على النبي محمد صلى الله عليه وسلم
al-Ṣalātu ''ala al-nabi muḥammad ṣalla Allah ''alayhi wa sallam',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '24',
  digitisation_date = '2024',
  bundle_description = 'A collection of salawat to the Prophet Muhammad. The text is written with black and red ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 21 width 17cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الصلاة على النبي محمد صلى الله عليه وسلم, British Library, EAP1564/2/126, https://eap.bl.uk/archive-file/EAP1564-2-126',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_126';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_127',
  source_identifier = 'EAP1564/2/127',
  reference_code = 'EAP1564/2/127',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-127',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-127',
  display_title = 'سلسلة نسب كياي قمر الدين',
  file_title = 'سلسلة نسب كياي قمر الدين',
  variant_titles = 'Kiai Qomaruddin''s genealogy
سلسلة نسب كياي قمر الدين
Silsilah nasb kiai qamaruddin',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '6',
  digitisation_date = '2024',
  bundle_description = 'Kiai Qomaruddin''s genealogy. Some part of paper are broken. The text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 18 width 25,5cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'سلسلة نسب كياي قمر الدين, British Library, EAP1564/2/127, https://eap.bl.uk/archive-file/EAP1564-2-127',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_127';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_128',
  source_identifier = 'EAP1564/2/128',
  reference_code = 'EAP1564/2/128',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-128',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-128',
  display_title = 'فضائل',
  file_title = 'فضائل',
  variant_titles = 'The Virtues
فضائل
Fadā''il',
  creation_date = 'Mid 19th century',
  copying_date_native = 'Mid 19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '4',
  digitisation_date = '2024',
  bundle_description = 'Virtues, such as the virtue of entering the mosque. The text is written with black ink.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 22 width 17cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'فضائل, British Library, EAP1564/2/128, https://eap.bl.uk/archive-file/EAP1564-2-128',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_128';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_129',
  source_identifier = 'EAP1564/2/129',
  reference_code = 'EAP1564/2/129',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-129',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-129',
  display_title = 'ألمان النكاح',
  file_title = 'ألمان النكاح',
  variant_titles = 'Invitation to attend a wedding
ألمان النكاح
Uleman nikah',
  creation_date = 'Mid 20th century',
  copying_date_native = 'Mid 20th century',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'Invitation to attend a wedding. The text is written with blue ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 22 width 17cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'ألمان النكاح, British Library, EAP1564/2/129, https://eap.bl.uk/archive-file/EAP1564-2-129',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_129';
update public.turots_bundles set
  archive_identifier = 'EAP1564_2_130',
  source_identifier = 'EAP1564/2/130',
  reference_code = 'EAP1564/2/130',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-2-130',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-2-130',
  display_title = 'الرسالة',
  file_title = 'الرسالة',
  variant_titles = 'Letter
الرسالة
al-Risalah',
  creation_date = '1960',
  copying_date_native = '1960',
  languages = 'Javanese',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  city_province = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  bundle_description = 'A letter from a man studying at the Denanyar boarding school to his father giving news of his situation. The text is written with black ink.

Extent: 1 lined paper manuscript.

Size and dimensions of original material: Height 22 width 17cm.

Condition of original material: Good.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/2: Collection of Ala''uddin (Ndalem)',
  citation_text = 'الرسالة, British Library, EAP1564/2/130, https://eap.bl.uk/archive-file/EAP1564-2-130',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_2_130';
update public.turots_bundles set
  archive_identifier = 'EAP1564_3_001',
  source_identifier = 'EAP1564/3/1',
  reference_code = 'EAP1564/3/1',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-3-1',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-3-1',
  display_title = 'تبيان الأسرار',
  file_title = 'تبيان الأسرار',
  variant_titles = 'Interpretation of Surah Yusuf
تبيان الأسرار
Tibyan al-asror',
  creation_date = '1851',
  copying_date_native = '1851',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '168',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains the interpretation of one letter in the Quran, namely Surah Yusuf, which contains the life story of the Prophet Yusuf from birth to adulthood, including his advantages in interpreting dreams. On several pages at the beginning and end of the manuscript, there are notes about the Islamic calendar system. The manuscript consists of 17 lines per page and there is a catch word in the upper right corner of the page near the binding. Written using black ink, but tere are several rubrication written in red ink. There is a watermark on the written material with the word Propatria.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 20cm, widht 16,3cm.

Condition of original material: Poor. The Animal skin cover is damaged and there are many holes in the pages with torn edges.

Alternative calendar and date: Islamic, 1267 Hijriah.

Scribe(s): Syam''un. He is the young brother of Kiai Madyani.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/3: Collection of Zamroni',
  citation_text = 'تبيان الأسرار, British Library, EAP1564/3/1, https://eap.bl.uk/archive-file/EAP1564-3-1',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_3_1';
update public.turots_bundles set
  archive_identifier = 'EAP1564_3_002',
  source_identifier = 'EAP1564/3/2',
  reference_code = 'EAP1564/3/2',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-3-2',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-3-2',
  display_title = 'ربيس و الاتعس',
  file_title = 'ربيس و الاتعس',
  variant_titles = 'The Faith of Monotheism
ربيس و الاتعس
Robais wa al-atu''asi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '278',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains the interpretation of Imam Samarqandi''s treatise on the principal of Islamic theology. In the manuscript explained how to know Allah through the interpretation of the beautiful names of Allah (Asmaul Husna). On several pages at the beginning there are notes about the Islamic-Javanese calendar system. The manuscript consists of 17 lines per page and there is a catch word at the bottom of the page close to the binding. Written using black ink and rubrication marker written in red ink. There is a watermark on the written material with the word Concordia.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 20cm, widht 16,3cm.

Condition of original material: Poor. The Animal skin cover is damaged and there are many holes in the pages with torn edges.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/3: Collection of Zamroni',
  citation_text = 'ربيس و الاتعس, British Library, EAP1564/3/2, https://eap.bl.uk/archive-file/EAP1564-3-2',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_3_2';
update public.turots_bundles set
  archive_identifier = 'EAP1564_3_003',
  source_identifier = 'EAP1564/3/3',
  reference_code = 'EAP1564/3/3',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-3-3',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-3-3',
  display_title = 'تحفةالتّلاميد',
  file_title = 'تحفةالتّلاميد',
  variant_titles = 'Learner''s humming
تحفةالتّلاميد
Tuhfat al-talāmīd',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '260',
  digitisation_date = '2024',
  bundle_description = 'The manuscript entitled Tuhfatut Talaamid contains the Islamic creed of the Syafii''s tought which begins with an explanation of purification, prayer, fasting to the matter of oaths and trials. There is information that this manuscript belongs to Madyani, the son-in-law of Kiai Sholeh Awwal who founded Qomaruddin. The manuscript with 23 lines is written in black and red ink. A catch word is found as a marker for changing pages. There is a watermark on the written material with the word Propatria.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 31.5cm, width 19.5cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/3: Collection of Zamroni',
  citation_text = 'تحفةالتّلاميد, British Library, EAP1564/3/3, https://eap.bl.uk/archive-file/EAP1564-3-3',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_3_3';
update public.turots_bundles set
  archive_identifier = 'EAP1564_3_004',
  source_identifier = 'EAP1564/3/4',
  reference_code = 'EAP1564/3/4',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-3-4',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-3-4',
  display_title = 'كتاب النكاح',
  file_title = 'كتاب النكاح',
  variant_titles = 'Marriage Practice in Islam
كتاب النكاح
Kitāb al-nikāḥ',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '180',
  digitisation_date = '2024',
  bundle_description = 'This manuscript explains the rules and practices of marriage. The explanation begins with the obligation to lower the gaze other than to the mahram, followed by the procedures for marriage, then marriage practices, and a discussion of divorce. This manuscript has 19 lines per page and is written in black and red ink. There is a watermark on the written material with the word Propatria.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 32cm, width 20cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/3: Collection of Zamroni',
  citation_text = 'كتاب النكاح, British Library, EAP1564/3/4, https://eap.bl.uk/archive-file/EAP1564-3-4',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_3_4';
update public.turots_bundles set
  archive_identifier = 'EAP1564_3_005',
  source_identifier = 'EAP1564/3/5',
  reference_code = 'EAP1564/3/5',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-3-5',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-3-5',
  display_title = 'بهجة العلوم',
  file_title = 'بهجة العلوم',
  variant_titles = 'Basic Belief in Islam
بهجة العلوم
Bahjat al-''ulūm',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '416',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a summary of the great book by Syeikh Samarqandi which explains the basic beliefs in Islam. Starting from a discussion of the oneness of Allah, followed by the pillars of faith, an explanation of the jurisprudence of worship such as fasting during Ramadan and prostration of forgetfulness (sujud sahwi), to an explanation of the nature of Allah and the Messenger. The manuscript, written in black and red ink, has 17 lines per page. A catch word is found at the bottom of the page. There is a watermark on the written material with the word Propatria.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 33cm, width 20cm.

Condition of original material: Poor.

Scribe(s): Syam''un. He is the young brother of Kiai Madyani.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/3: Collection of Zamroni',
  citation_text = 'بهجة العلوم, British Library, EAP1564/3/5, https://eap.bl.uk/archive-file/EAP1564-3-5',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_3_5';
update public.turots_bundles set
  archive_identifier = 'EAP1564_3_006',
  source_identifier = 'EAP1564/3/6',
  reference_code = 'EAP1564/3/6',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-3-6',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-3-6',
  display_title = 'تسهيل المحرر',
  file_title = 'تسهيل المحرر',
  variant_titles = 'Islamic Jurisprudence
تسهيل المحرر
Tashīl al-muḥarrar',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '524',
  digitisation_date = '2024',
  bundle_description = 'This Islamic fiqh manuscript has 21 lines on each page. The explanation of the manuscript begins with the law of purification, about prayer, fasting, the implementation of the hajj, to the law of inheritance and the law of freeing slaves. The manuscript is written in black ink and a small part in red ink as a marker for the rubric. This manuscript has a catch word. There is a watermark on the written material with the word Propatria.

Extent: 1 European paper manuscript.

Size and dimensions of original material: Height 32cm, width 20cm.

Condition of original material: Poor.

Alternative calendar and date: Islamic, 1251 Hijriah.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/3: Collection of Zamroni',
  citation_text = 'تسهيل المحرر, British Library, EAP1564/3/6, https://eap.bl.uk/archive-file/EAP1564-3-6',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_3_6';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_001',
  source_identifier = 'EAP1564/4/1',
  reference_code = 'EAP1564/4/1',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-1',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-1',
  display_title = 'حديث اربعين',
  file_title = 'حديث اربعين',
  variant_titles = 'Hadith About Prayer
حديث اربعين
Ḥadith arba''in',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '44',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a collection of hadiths related to prayer, congregational prayer and the threat of leaving prayer. This manuscript consists of 15 lines per page. The manuscript is written in black ink and has a catch word. There is watermark in this manuscript material with writing Propatria and countermark with word VdL.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21.5cm, width 17cm.

Condition of original material: Fair.

Alternative calendar and date: Islamic, Syawal 1267 Hijri.

Scribe(s): Kiai Madyani abu Ishaq.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'حديث اربعين, British Library, EAP1564/4/1, https://eap.bl.uk/archive-file/EAP1564-4-1',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_1';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_002',
  source_identifier = 'EAP1564/4/2',
  reference_code = 'EAP1564/4/2',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-2',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-2',
  display_title = 'كتاب التوحيد',
  file_title = 'كتاب التوحيد',
  variant_titles = 'Monotheism Book
كتاب التوحيد
Kitāb al-tauḥīd',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '48',
  digitisation_date = '2024',
  bundle_description = 'This manuscript explains the importance of maintaining belief in Allah and warns against practices that cause a person to be judged as leaving the Islamic religion or practicing Shirk. This manuscript consists of 15 lines on each page. The manuscript is written in black ink and contains catch words.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21.5cm, width 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'كتاب التوحيد, British Library, EAP1564/4/2, https://eap.bl.uk/archive-file/EAP1564-4-2',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_2';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_003',
  source_identifier = 'EAP1564/4/3',
  reference_code = 'EAP1564/4/3',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-3',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-3',
  display_title = 'عشرين اسماء الحسنى',
  file_title = 'عشرين اسماء الحسنى',
  variant_titles = 'Twenty Mndatory Attributes of Allah
عشرين اسماء الحسنى
Ishrīna asma'' al-ḥusna',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'This manuscript explains about twenty mandatory attributes for Allah. The manuscript discusses the concept of God in Islam according to the Ash''ariyah school of thought. There is a statement in the text that this manuscript is an excerpt from a manuscript formulated by Muhammad bin Yusuf bin Umar bin Syu''aib As-Sanusi Al Hasani made in 832-895 Hijri. The manuscript, written in black and red ink, consists of five lines on each page.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'عشرين اسماء الحسنى, British Library, EAP1564/4/3, https://eap.bl.uk/archive-file/EAP1564-4-3',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_3';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_004',
  source_identifier = 'EAP1564/4/4',
  reference_code = 'EAP1564/4/4',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-4',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-4',
  display_title = 'مجرّبات',
  file_title = 'مجرّبات',
  variant_titles = 'مجرّبات
Mujarrabat',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This is "Mujarrabat" manuscript. "Mujarrabat" text contains various properties and benefits of verses from the Quran, there are verses from the Quran written on sheets of paper as a means of healing or protection and some are practiced in the form of prayer or dhikr. This manuscript consists of 11 lines on each page and is written in black and red ink.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'مجرّبات, British Library, EAP1564/4/4, https://eap.bl.uk/archive-file/EAP1564-4-4',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_4';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_005',
  source_identifier = 'EAP1564/4/5',
  reference_code = 'EAP1564/4/5',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-5',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-5',
  display_title = 'تحفتالسنية شرح الجرومية',
  file_title = 'تحفتالسنية شرح الجرومية',
  variant_titles = 'Arabic Grammar
تحفتالسنية شرح الجرومية
Tuḥfat al-thaniyah sharaḥ al-jurūmiyah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a collection of Nahwu or Arabic grammar materials quoted from the book "Tuḥfat al-thaniyah sharaḥ al-jurūmiyah". This manuscript consists of ten pages written in black ink.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'تحفتالسنية شرح الجرومية, British Library, EAP1564/4/5, https://eap.bl.uk/archive-file/EAP1564-4-5',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_5';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_006',
  source_identifier = 'EAP1564/4/6',
  reference_code = 'EAP1564/4/6',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-6',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-6',
  display_title = 'كتاب الفقه',
  file_title = 'كتاب الفقه',
  variant_titles = 'Islamic Jurisprudence
كتاب الفقه
Kitab al-fiqḥ',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '12',
  digitisation_date = '2024',
  bundle_description = 'There are several things discussed in this Islamic law manuscript, including the pillars of Islam, the pillars of faith, signs of the coming of age for men and women, and purification. This manuscript consists of 6 lines on each page. The manuscript is written in black and red ink. There is catch word in this manuscript. There is a watermark with the word Concordia.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'كتاب الفقه, British Library, EAP1564/4/6, https://eap.bl.uk/archive-file/EAP1564-4-6',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_6';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_007',
  source_identifier = 'EAP1564/4/7',
  reference_code = 'EAP1564/4/7',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-7',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-7',
  display_title = 'تاديب الصبيان',
  file_title = 'تاديب الصبيان',
  variant_titles = 'How to Educate Children
تاديب الصبيان
at-Tādīb al-ṣibyān',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a study of Imam Ghazali''s book entitled at-Tādīb al-ṣibyān which is written in the form of poetry and contains about how to educate children. This manuscript consists of 11 lines on each page. The manuscript is written in black ink and the catch word is found in the lower left corner of the page.

Extent: 1 Plain paper manuscript.

Size and dimensions of original material: Height 23.8cm, width 15cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'تاديب الصبيان, British Library, EAP1564/4/7, https://eap.bl.uk/archive-file/EAP1564-4-7',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_7';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_008',
  source_identifier = 'EAP1564/4/8',
  reference_code = 'EAP1564/4/8',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-8',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-8',
  display_title = 'تفسير الحمدلة',
  file_title = 'تفسير الحمدلة',
  variant_titles = 'Interpretation of Hamdalah
تفسير الحمدلة
Tafsir al-ḥamdalah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '16',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains the interpretation of Hamdalah which was compiled based on the request from the lover of Sheikh Abdullah Muhammad Ibn Umar Ibn Ibrahim. This manuscript consists of 15 lines on each page. The manuscript is written on daluang sheets using black and red ink. There is an illustration of a picture manuscript like a bird using black and red ink on the first page of the manuscript.

Extent: 1 Daluang manuscript.

Size and dimensions of original material: Height 27.5cm, width 19.5cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'تفسير الحمدلة, British Library, EAP1564/4/8, https://eap.bl.uk/archive-file/EAP1564-4-8',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_8';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_009',
  source_identifier = 'EAP1564/4/9',
  reference_code = 'EAP1564/4/9',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-9',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-9',
  display_title = 'تفسير العشري',
  file_title = 'تفسير العشري',
  variant_titles = 'Interpretation of ''Isyari
تفسير العشري
Tafsir al-''ishari',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '36',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a study of "Tafsir al-''ishari" which is the work of Ibrahim Al Bajuri about the inner and outer meaning of the obligatory and impossible nature of Allah.This manuscript consists of 15 lines per page and there is a catch word on each page. This manuscript, written with black ink, has a countermark with the writing VdL

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21.5cm, width 18cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'تفسير العشري, British Library, EAP1564/4/9, https://eap.bl.uk/archive-file/EAP1564-4-9',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_9';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_010',
  source_identifier = 'EAP1564/4/10',
  reference_code = 'EAP1564/4/10',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-10',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-10',
  display_title = 'معراج النبي',
  file_title = 'معراج النبي',
  variant_titles = 'Prophet Muhammad''s Spiritual Journey
معراج النبي
Mi''raj al-nabi',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '8',
  digitisation_date = '2024',
  bundle_description = 'There are two contents of this manuscript. The first is the story of the Isra'' Mi''raj journey of the Prophet Muhammad which is compiled in a muttasil manner from the original author, namely Al Hafidz Najmuddin Al Ghaiti. The second is the Javanese Islamic acculturation calendar system. This manuscript written in black ink has a countermark with the words Vdl

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'معراج النبي, British Library, EAP1564/4/10, https://eap.bl.uk/archive-file/EAP1564-4-10',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_10';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_011',
  source_identifier = 'EAP1564/4/11',
  reference_code = 'EAP1564/4/11',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-11',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-11',
  display_title = 'سلّم التّوفيق',
  file_title = 'سلّم التّوفيق',
  variant_titles = 'Ladder of Allah''s Help
سلّم التّوفيق
Sullam al-taufīq',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '30',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a summary of the book "Sullam al-taufīq" which means the ladder of help towards prosperity written by Habib Abdullah bin Hisyam bin Thohir bin Muhammad bin Hasyim Al Alawi Al Hasani. This manuscript discusses Monotheism faith, Islamic jurisprudence, Sufism and morality. There are three fragments of the Quranic surah at the end of the manuscript with decorative illumination in the form of a frame, namely Al-Insyiqaq, Al-Buruj and Al Mutaffifin. In this manuscript there are 7 lines on each page. The manuscript is written in black ink and a catch word is found. There is a watermark in this writing material with the word Concordia.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'سلّم التّوفيق, British Library, EAP1564/4/11, https://eap.bl.uk/archive-file/EAP1564-4-11',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_11';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_012',
  source_identifier = 'EAP1564/4/12',
  reference_code = 'EAP1564/4/12',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-12',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-12',
  display_title = 'عقيدةالعوام',
  file_title = 'عقيدةالعوام',
  variant_titles = 'Faith Learning for Lay Poeple
عقيدةالعوام
Aqīdah al-''awwām',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is entitled Aqīdah al-''awwām which contains the faith basic theory of Ahlus Sunnah Wal Jamaah for lay people, the author is Sheikh Ahmad Al Marzuki Al Maliki Al Makki. The manuscript is written in the form of poetry (nadoman) consisting of 57 verses. The manuscript written in red and black ink has 19 lines per page. This manuscript has a catchword; and there is a watermark with the writing Concordia.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.

Condition of original material: Fair.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'عقيدةالعوام, British Library, EAP1564/4/12, https://eap.bl.uk/archive-file/EAP1564-4-12',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_12';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_013',
  source_identifier = 'EAP1564/4/13',
  reference_code = 'EAP1564/4/13',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-13',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-13',
  display_title = 'الامثلة التّصريفيّة',
  file_title = 'الامثلة التّصريفيّة',
  variant_titles = 'Arabic Grammar Poem
الامثلة التّصريفيّة
al-Amthilati al-taṣrīfiyyah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '18',
  digitisation_date = '2024',
  bundle_description = 'This manuscript studies the basics of Arabic morphology. The manuscript was written by Haji Muhammad Ali Maksum bin Ali. There are 14 lines on each page divided into two columns. The manuscript is written using black ink. There is a catch word in this manuscript. There is a watermark on the writing material with the words Propatria.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'الامثلة التّصريفيّة, British Library, EAP1564/4/13, https://eap.bl.uk/archive-file/EAP1564-4-13',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_13';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_014',
  source_identifier = 'EAP1564/4/14',
  reference_code = 'EAP1564/4/14',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-14',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-14',
  display_title = 'الذكرالصباح إلي ليل',
  file_title = 'الذكرالصباح إلي ليل',
  variant_titles = 'Guidance for Daily Dhikr
الذكرالصباح إلي ليل
al-Dhikru al-ṣobāḥ ila al-lail',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '20',
  digitisation_date = '2024',
  bundle_description = 'This manuscript contains a collection of dhikr throughout the day and night accompanied by an explanation of the procedures for congregational prayer for the imam and followers. The manuscript consists of 15 lines per page. found catch word in the manuscript written in black ink.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21cm, width 16cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'الذكرالصباح إلي ليل, British Library, EAP1564/4/14, https://eap.bl.uk/archive-file/EAP1564-4-14',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_14';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_015',
  source_identifier = 'EAP1564/4/15',
  reference_code = 'EAP1564/4/15',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-15',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-15',
  display_title = 'النّحو',
  file_title = 'النّحو',
  variant_titles = 'Arabic Grammar
النّحو
al-Naḥwu',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '74',
  digitisation_date = '2024',
  bundle_description = 'This manuscript has three main topics, the first is a record of the Allah''s propherts short lineages; the second is the Arabic grammar (Naḥwu) book which discusses personal pronoun in grammar (dhomir muttasil-munfasil) and the accompanying chapters; the third is a short excerpt from Al Ghazali''s book about the virtue of knowledge. On the topic of Arabic grammar there are 7 lines on each page, but on the topic of science there are 11 lines on each page. this manuscript is written in red and black ink and a catch word is found at the end of each page. There is a watermark on the written material with the word Concordia.

Extent: 1 European manuscript.

Size and dimensions of original material: Height 21.5cm, width 17cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'النّحو, British Library, EAP1564/4/15, https://eap.bl.uk/archive-file/EAP1564-4-15',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_15';
update public.turots_bundles set
  archive_identifier = 'EAP1564_4_016',
  source_identifier = 'EAP1564/4/16',
  reference_code = 'EAP1564/4/16',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  affiliation_url = 'https://eap.bl.uk/archive-file/EAP1564-4-16',
  item_url = 'https://eap.bl.uk/archive-file/EAP1564-4-16',
  display_title = 'التّصريفيّة',
  file_title = 'التّصريفيّة',
  variant_titles = 'Arabic Grammar
التّصريفيّة
al-Taṣrifiyah',
  creation_date = '19th century',
  copying_date_native = '19th century',
  languages = 'Arabic',
  bundle_script = 'Arabic',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  country = 'Indonesia',
  originals_information = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  city_province = 'The original material is located in Rengel, Tuban, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '102',
  digitisation_date = '2024',
  bundle_description = 'This manuscript is a Taṣrif (Arabic grammar) book mentioned by the owner of the manuscript in the description at the end of the manuscript, namely Haji Abdussalam. On the first page there is a black and red illumination in the form of a frame with small triangle decorations along the frame. The manuscript written in black and red ink consists of 7 lines per page. This manuscript has a cover embroidered with mendongan leaves but has been damaged.

Extent: 1 Daluang paper manuscript.

Size and dimensions of original material: Height 32cm, width 23cm.

Condition of original material: Poor.',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/4: Collection of Burhan',
  citation_text = 'التّصريفيّة, British Library, EAP1564/4/16, https://eap.bl.uk/archive-file/EAP1564-4-16',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_4_16';
update public.turots_bundles set
  archive_identifier = 'EAP1564_1_052',
  source_identifier = 'EAP1564/1/52',
  reference_code = 'EAP1564/1/52',
  affiliation = 'British Library',
  institution = 'British Library · Endangered Archives Programme',
  content_type = 'Manuscript',
  place_of_origin = 'Indonesia',
  originals_information = 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  archive_level = 'File',
  extent_text = '2',
  digitisation_date = '2024',
  project_name = 'EAP1564: Digitisation of Pesantren manuscripts in Gresik and Tuban, East Java, Indonesia: The neglected Islamic intellectual treasure',
  collection_full_name = 'EAP1564/1: Collection of Ahmad Wasil',
  digitised_by = 'Ma''had Jamiah Universitas Qomaruddin',
  digitisation_funded_by = 'Endangered Archives Programme supported by Arcadia',
  attribution_license = 'Creative commons attribution non-commercial licence (https://creativecommons.org/licenses/by-nc/4.0/)'
where bundle_code = 'EAP1564_1_52';

-- 3. NAHDLATUT TUROTS / NT (138 Bendel dengan format EAP)
update public.turots_bundles set
  archive_identifier = 'NT 001 Syarhul Amil',
  source_identifier = 'NT 001',
  reference_code = 'NT/001',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarhul Amil'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarhul Amil'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '34'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 001';
update public.turots_bundles set
  archive_identifier = 'NT 002 Syarhul Jurmiyah',
  source_identifier = 'NT 002',
  reference_code = 'NT/002',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarhul Jurmiyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarhul Jurmiyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '52'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 002';
update public.turots_bundles set
  archive_identifier = 'NT 003 Al-Dlorari',
  source_identifier = 'NT 003',
  reference_code = 'NT/003',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Dlorari'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Dlorari'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '36'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 003';
update public.turots_bundles set
  archive_identifier = 'NT 004 Wiqayatul Abrar',
  source_identifier = 'NT 004',
  reference_code = 'NT/004',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Wiqayatul Abrar'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Wiqayatul Abrar'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '15'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 004';
update public.turots_bundles set
  archive_identifier = 'NT 005 Nuril Bal fi Ghodhdhi Bashorirrijal',
  source_identifier = 'NT 005',
  reference_code = 'NT/005',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Nuril Bal fi Ghodhdhi Bashorirrijal'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Nuril Bal fi Ghodhdhi Bashorirrijal'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '13'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 005';
update public.turots_bundles set
  archive_identifier = 'NT 006 Kitab Khutbah',
  source_identifier = 'NT 006',
  reference_code = 'NT/006',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Khutbah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Khutbah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '8'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 006';
update public.turots_bundles set
  archive_identifier = 'NT 007 al-Fawaid al-Jaliyah',
  source_identifier = 'NT 007',
  reference_code = 'NT/007',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'al-Fawaid al-Jaliyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'al-Fawaid al-Jaliyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '23'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 007';
update public.turots_bundles set
  archive_identifier = 'NT 008 Barahir al-Wadihaar',
  source_identifier = 'NT 008',
  reference_code = 'NT/008',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Barahir al-Wadihaar'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Barahir al-Wadihaar'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '1'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 008';
update public.turots_bundles set
  archive_identifier = 'NT 009 An-Nubdzah',
  source_identifier = 'NT 009',
  reference_code = 'NT/009',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'An-Nubdzah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'An-Nubdzah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '2'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 009';
update public.turots_bundles set
  archive_identifier = 'NT 010 Risalah Musykilah fi Sanggapuro 962 H',
  source_identifier = 'NT 010',
  reference_code = 'NT/010',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Risalah Musykilah fi Sanggapuro 962 H'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Risalah Musykilah fi Sanggapuro 962 H'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '17'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 010';
update public.turots_bundles set
  archive_identifier = 'NT 011 Waraqat',
  source_identifier = 'NT 011',
  reference_code = 'NT/011',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Waraqat'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Waraqat'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '12'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 011';
update public.turots_bundles set
  archive_identifier = 'NT 012 Al-Futuhat Al-Ilahiyah',
  source_identifier = 'NT 012',
  reference_code = 'NT/012',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Futuhat Al-Ilahiyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Futuhat Al-Ilahiyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 012';
update public.turots_bundles set
  archive_identifier = 'NT 013 Al-Kunhu Ma La Budda lil Murid',
  source_identifier = 'NT 013',
  reference_code = 'NT/013',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Kunhu Ma La Budda lil Murid'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Kunhu Ma La Budda lil Murid'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 013';
update public.turots_bundles set
  archive_identifier = 'NT 014 Kitabul Bayan An Adatitarawih',
  source_identifier = 'NT 014',
  reference_code = 'NT/014',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitabul Bayan An Adatitarawih'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitabul Bayan An Adatitarawih'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '30'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 014';
update public.turots_bundles set
  archive_identifier = 'NT 015 Alfiyah Ibn Malik',
  source_identifier = 'NT 015',
  reference_code = 'NT/015',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Alfiyah Ibn Malik'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Alfiyah Ibn Malik'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '62'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 015';
update public.turots_bundles set
  archive_identifier = 'NT 016 Qishosul Anbiya',
  source_identifier = 'NT 016',
  reference_code = 'NT/016',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Qishosul Anbiya'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Qishosul Anbiya'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '39'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 016';
update public.turots_bundles set
  archive_identifier = 'NT 017 Hadis Malam Nishfu Syaban',
  source_identifier = 'NT 017',
  reference_code = 'NT/017',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Hadis Malam Nishfu Syaban'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Hadis Malam Nishfu Syaban'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '4'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 017';
update public.turots_bundles set
  archive_identifier = 'NT 018 Aqidatul _Awam',
  source_identifier = 'NT 018',
  reference_code = 'NT/018',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Aqidatul _Awam'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Aqidatul _Awam'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '14'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 018';
update public.turots_bundles set
  archive_identifier = 'NT 019 Mikraj',
  source_identifier = 'NT 019',
  reference_code = 'NT/019',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Mikraj'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Mikraj'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '31'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 019';
update public.turots_bundles set
  archive_identifier = 'NT 020 Al-Kailani',
  source_identifier = 'NT 020',
  reference_code = 'NT/020',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Kailani'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Kailani'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '72'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 020';
update public.turots_bundles set
  archive_identifier = 'NT 021 Khulasi',
  source_identifier = 'NT 021',
  reference_code = 'NT/021',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Khulasi'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Khulasi'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 021';
update public.turots_bundles set
  archive_identifier = 'NT 022 Fathul Muin',
  source_identifier = 'NT 022',
  reference_code = 'NT/022',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fathul Muin'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fathul Muin'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '191'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 022';
update public.turots_bundles set
  archive_identifier = 'NT 023 Kitab Faroid',
  source_identifier = 'NT 023',
  reference_code = 'NT/023',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Faroid'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Faroid'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '17'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 023';
update public.turots_bundles set
  archive_identifier = 'NT 024 Majhul',
  source_identifier = 'NT 024',
  reference_code = 'NT/024',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Majhul'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Majhul'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 024';
update public.turots_bundles set
  archive_identifier = 'NT 025 Jami Ash-Sholawat',
  source_identifier = 'NT 025',
  reference_code = 'NT/025',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Jami Ash-Sholawat'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Jami Ash-Sholawat'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 025';
update public.turots_bundles set
  archive_identifier = 'NT 026 Fiqhush Sholah',
  source_identifier = 'NT 026',
  reference_code = 'NT/026',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fiqhush Sholah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fiqhush Sholah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '20'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 026';
update public.turots_bundles set
  archive_identifier = 'NT 027 Hidayatus Shibyan',
  source_identifier = 'NT 027',
  reference_code = 'NT/027',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Hidayatus Shibyan'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Hidayatus Shibyan'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '16'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 027';
update public.turots_bundles set
  archive_identifier = 'NT 028 Doa-Doa Dan Faidah-Faedah',
  source_identifier = 'NT 028',
  reference_code = 'NT/028',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Doa-Doa Dan Faidah-Faedah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Doa-Doa Dan Faidah-Faedah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '13'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 028';
update public.turots_bundles set
  archive_identifier = 'NT 029 Al-Mukhtar',
  source_identifier = 'NT 029',
  reference_code = 'NT/029',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Mukhtar'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Mukhtar'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 029';
update public.turots_bundles set
  archive_identifier = 'NT 030 Syarhu Adabi Al-Bahtsi',
  source_identifier = 'NT 030',
  reference_code = 'NT/030',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarhu Adabi Al-Bahtsi'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarhu Adabi Al-Bahtsi'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '14'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 030';
update public.turots_bundles set
  archive_identifier = 'NT 031 Kitab Risalah Al-Wadli',
  source_identifier = 'NT 031',
  reference_code = 'NT/031',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Risalah Al-Wadli'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Risalah Al-Wadli'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '13'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 031';
update public.turots_bundles set
  archive_identifier = 'NT 032 Maqalah Al-Asyr',
  source_identifier = 'NT 032',
  reference_code = 'NT/032',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Maqalah Al-Asyr'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Maqalah Al-Asyr'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '15'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 032';
update public.turots_bundles set
  archive_identifier = 'NT 033 Risalah Tata_Allaqu Bijaa Zaidun',
  source_identifier = 'NT 033',
  reference_code = 'NT/033',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Risalah Tata_Allaqu Bijaa Zaidun'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Risalah Tata_Allaqu Bijaa Zaidun'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 033';
insert into public.turots_bundles (
  collection_id, bundle_code, display_title, file_title, variant_titles,
  extent_pages, extent_text, reference_code, source_identifier, archive_identifier,
  affiliation, institution, content_type, place_of_origin, country,
  originals_information, city_province, archive_level, digitisation_date,
  project_name, collection_full_name, digitised_by, access_level, metadata_status, publication_status
) select
  c.id, 'NT 034', 'Khutbah dan Surat', 'Khutbah dan Surat', 'Khutbah dan Surat',
  0, '0', 'NT/034', 'NT 034', 'NT 034 Khutbah dan Surat',
  'Nahdlatut Turots', 'Nahdlatut Turots · Pondok Pesantren Qomaruddin', 'Manuscript', 'Indonesia', 'Indonesia',
  'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  'Sampurnan, Bungah, Gresik, East Java, Indonesia', 'File', '2024',
  'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin',
  'Koleksi Ndalem Pondok Pesantren Qomaruddin', 'Tim Nahdlatut Turots & TPPKP Qomaruddin',
  'public_preview', 'imported', 'draft'
from public.turots_collections c where c.code = 'NAHDLATUT TUROTS-NDALEM'
on conflict (bundle_code) do nothing;
update public.turots_bundles set
  archive_identifier = 'NT 035 Syarah Idahul Mubham',
  source_identifier = 'NT 035',
  reference_code = 'NT/035',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarah Idahul Mubham'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarah Idahul Mubham'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '39'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 035';
update public.turots_bundles set
  archive_identifier = 'NT 036 Al-Awamil Al-Jurjani',
  source_identifier = 'NT 036',
  reference_code = 'NT/036',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Awamil Al-Jurjani'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Awamil Al-Jurjani'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '96'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 036';
update public.turots_bundles set
  archive_identifier = 'NT 037 Kitab Nahwu',
  source_identifier = 'NT 037',
  reference_code = 'NT/037',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Nahwu'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Nahwu'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '15'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 037';
update public.turots_bundles set
  archive_identifier = 'NT 038 Syiir',
  source_identifier = 'NT 038',
  reference_code = 'NT/038',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syiir'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syiir'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '6'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 038';
update public.turots_bundles set
  archive_identifier = 'NT 039 Fathul Jawad',
  source_identifier = 'NT 039',
  reference_code = 'NT/039',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fathul Jawad'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fathul Jawad'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '64'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 039';
update public.turots_bundles set
  archive_identifier = 'NT 040 Tashrif',
  source_identifier = 'NT 040',
  reference_code = 'NT/040',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tashrif'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tashrif'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '25'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 040';
update public.turots_bundles set
  archive_identifier = 'NT 041 Kitab Sharraf',
  source_identifier = 'NT 041',
  reference_code = 'NT/041',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Sharraf'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Sharraf'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '69'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 041';
update public.turots_bundles set
  archive_identifier = 'NT 042 Kitab Awamil',
  source_identifier = 'NT 042',
  reference_code = 'NT/042',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Awamil'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Awamil'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '19'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 042';
update public.turots_bundles set
  archive_identifier = 'NT 043 Imrithi',
  source_identifier = 'NT 043',
  reference_code = 'NT/043',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Imrithi'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Imrithi'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '44'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 043';
update public.turots_bundles set
  archive_identifier = 'NT 044 Jurumiyah',
  source_identifier = 'NT 044',
  reference_code = 'NT/044',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Jurumiyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Jurumiyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 044';
update public.turots_bundles set
  archive_identifier = 'NT 045 Al-Kafiyah',
  source_identifier = 'NT 045',
  reference_code = 'NT/045',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Kafiyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Kafiyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '19'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 045';
update public.turots_bundles set
  archive_identifier = 'NT 046 Fathul Muin Fi Syarhi Qurrotil Ain',
  source_identifier = 'NT 046',
  reference_code = 'NT/046',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fathul Muin Fi Syarhi Qurrotil Ain'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fathul Muin Fi Syarhi Qurrotil Ain'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '92'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 046';
update public.turots_bundles set
  archive_identifier = 'NT 047 Qissotul Miraj',
  source_identifier = 'NT 047',
  reference_code = 'NT/047',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Qissotul Miraj'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Qissotul Miraj'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '24'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 047';
update public.turots_bundles set
  archive_identifier = 'NT 048 Hasyiyah Bajuri Ala Sanusi',
  source_identifier = 'NT 048',
  reference_code = 'NT/048',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Hasyiyah Bajuri Ala Sanusi'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Hasyiyah Bajuri Ala Sanusi'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '25'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 048';
update public.turots_bundles set
  archive_identifier = 'NT 049 Hadits',
  source_identifier = 'NT 049',
  reference_code = 'NT/049',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Hadits'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Hadits'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '16'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 049';
update public.turots_bundles set
  archive_identifier = 'NT 050 Faroidatul Banan As-Sunah',
  source_identifier = 'NT 050',
  reference_code = 'NT/050',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Faroidatul Banan As-Sunah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Faroidatul Banan As-Sunah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '26'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 050';
update public.turots_bundles set
  archive_identifier = 'NT 051 Kitab Tauhid',
  source_identifier = 'NT 051',
  reference_code = 'NT/051',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Tauhid'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Tauhid'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 051';
update public.turots_bundles set
  archive_identifier = 'NT 052 At-Tanwir',
  source_identifier = 'NT 052',
  reference_code = 'NT/052',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'At-Tanwir'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'At-Tanwir'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '5'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 052';
update public.turots_bundles set
  archive_identifier = 'NT 053 Taliqu Ala Sittina Mas_Alatun',
  source_identifier = 'NT 053',
  reference_code = 'NT/053',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Taliqu Ala Sittina Mas_Alatun'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Taliqu Ala Sittina Mas_Alatun'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '18'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 053';
update public.turots_bundles set
  archive_identifier = 'NT 054 Al-Miftah Fi Bayani Tauhid',
  source_identifier = 'NT 054',
  reference_code = 'NT/054',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Miftah Fi Bayani Tauhid'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Miftah Fi Bayani Tauhid'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '14'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 054';
update public.turots_bundles set
  archive_identifier = 'NT 055 Mufidz',
  source_identifier = 'NT 055',
  reference_code = 'NT/055',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Mufidz'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Mufidz'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '16'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 055';
insert into public.turots_bundles (
  collection_id, bundle_code, display_title, file_title, variant_titles,
  extent_pages, extent_text, reference_code, source_identifier, archive_identifier,
  affiliation, institution, content_type, place_of_origin, country,
  originals_information, city_province, archive_level, digitisation_date,
  project_name, collection_full_name, digitised_by, access_level, metadata_status, publication_status
) select
  c.id, 'NT 056.1', 'Fathu Al-Mubin', 'Fathu Al-Mubin', 'Fathu Al-Mubin',
  0, '0', 'NT/056.1', 'NT 056.1', 'NT 056.1 Fathu Al-Mubin',
  'Nahdlatut Turots', 'Nahdlatut Turots · Pondok Pesantren Qomaruddin', 'Manuscript', 'Indonesia', 'Indonesia',
  'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia',
  'Sampurnan, Bungah, Gresik, East Java, Indonesia', 'File', '2024',
  'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin',
  'Koleksi Ndalem Pondok Pesantren Qomaruddin', 'Tim Nahdlatut Turots & TPPKP Qomaruddin',
  'public_preview', 'imported', 'draft'
from public.turots_collections c where c.code = 'NAHDLATUT TUROTS-NDALEM'
on conflict (bundle_code) do nothing;
update public.turots_bundles set
  archive_identifier = 'NT 056.2 Ummul Barahain',
  source_identifier = 'NT 056.2',
  reference_code = 'NT/056.2',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Ummul Barahain'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Ummul Barahain'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '23'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 056.2';
update public.turots_bundles set
  archive_identifier = 'NT 057 Ummu Al-Barahain',
  source_identifier = 'NT 057',
  reference_code = 'NT/057',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Ummu Al-Barahain'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Ummu Al-Barahain'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '49'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 057';
update public.turots_bundles set
  archive_identifier = 'NT 058 Keberangkatan Haji',
  source_identifier = 'NT 058',
  reference_code = 'NT/058',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Keberangkatan Haji'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Keberangkatan Haji'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '6'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 058';
update public.turots_bundles set
  archive_identifier = 'NT 059 Hasyiah An-Naja Ala Tarwiyyah',
  source_identifier = 'NT 059',
  reference_code = 'NT/059',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Hasyiah An-Naja Ala Tarwiyyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Hasyiah An-Naja Ala Tarwiyyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '53'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 059';
update public.turots_bundles set
  archive_identifier = 'NT 060 Tafsir Jalalain Juz 1',
  source_identifier = 'NT 060',
  reference_code = 'NT/060',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tafsir Jalalain Juz 1'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tafsir Jalalain Juz 1'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '174'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 060';
update public.turots_bundles set
  archive_identifier = 'NT 062 Tafsir Jalalain Juz 2',
  source_identifier = 'NT 062',
  reference_code = 'NT/062',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tafsir Jalalain Juz 2'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tafsir Jalalain Juz 2'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '273'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 062';
update public.turots_bundles set
  archive_identifier = 'NT 063 Fathurrahman (21x17,2), Eropa',
  source_identifier = 'NT 063',
  reference_code = 'NT/063',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fathurrahman (21x17,2), Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fathurrahman (21x17,2), Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 063';
update public.turots_bundles set
  archive_identifier = 'NT 064 Daftar Belanja (21,3x16,4), HVS',
  source_identifier = 'NT 064',
  reference_code = 'NT/064',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Daftar Belanja (21,3x16,4), HVS'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Daftar Belanja (21,3x16,4), HVS'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 064';
update public.turots_bundles set
  archive_identifier = 'NT 065 Sullam Taufik (21,1x17,5), Asia Bergaris',
  source_identifier = 'NT 065',
  reference_code = 'NT/065',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Sullam Taufik (21,1x17,5), Asia Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Sullam Taufik (21,1x17,5), Asia Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '16'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 065';
update public.turots_bundles set
  archive_identifier = 'NT 066 Al-Kafiyah Maa Syarhi Najiyah(11,5x7,6), Daluang',
  source_identifier = 'NT 066',
  reference_code = 'NT/066',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Kafiyah Maa Syarhi Najiyah(11,5x7,6), Daluang'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Kafiyah Maa Syarhi Najiyah(11,5x7,6), Daluang'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 066';
update public.turots_bundles set
  archive_identifier = 'NT 067 Tarikh',
  source_identifier = 'NT 067',
  reference_code = 'NT/067',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tarikh'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tarikh'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 067';
update public.turots_bundles set
  archive_identifier = 'NT 068 I_anah Thalibin',
  source_identifier = 'NT 068',
  reference_code = 'NT/068',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'I_anah Thalibin'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'I_anah Thalibin'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '63'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 068';
update public.turots_bundles set
  archive_identifier = 'NT 069 Shorof',
  source_identifier = 'NT 069',
  reference_code = 'NT/069',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Shorof'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Shorof'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '9'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 069';
update public.turots_bundles set
  archive_identifier = 'NT 070 Tafsir Jalalain{23x18} Eropa',
  source_identifier = 'NT 070',
  reference_code = 'NT/070',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tafsir Jalalain{23x18} Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tafsir Jalalain{23x18} Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '212'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 070';
update public.turots_bundles set
  archive_identifier = 'NT 071 Al-Masa’il Fi Thoharoh (28x18,8)Asia Bergaris',
  source_identifier = 'NT 071',
  reference_code = 'NT/071',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Masa’il Fi Thoharoh (28x18,8)Asia Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Masa’il Fi Thoharoh (28x18,8)Asia Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '13'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 071';
update public.turots_bundles set
  archive_identifier = 'NT 072 Kitab Fikih (21,9x16,8)Eropa',
  source_identifier = 'NT 072',
  reference_code = 'NT/072',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Fikih (21,9x16,8)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Fikih (21,9x16,8)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '7'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 072';
update public.turots_bundles set
  archive_identifier = 'NT 073 Matan Al-Yasminiyah (25x18)Eropa',
  source_identifier = 'NT 073',
  reference_code = 'NT/073',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Matan Al-Yasminiyah (25x18)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Matan Al-Yasminiyah (25x18)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '5'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 073';
update public.turots_bundles set
  archive_identifier = 'NT 074 Kitab Tauhid (21,5x17,5)Asia Bergaris',
  source_identifier = 'NT 074',
  reference_code = 'NT/074',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Tauhid (21,5x17,5)Asia Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Tauhid (21,5x17,5)Asia Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '13'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 074';
update public.turots_bundles set
  archive_identifier = 'NT 075 Nashoihud Diniyah',
  source_identifier = 'NT 075',
  reference_code = 'NT/075',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Nashoihud Diniyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Nashoihud Diniyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '7'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 075';
update public.turots_bundles set
  archive_identifier = 'NT 076 Tabaruj An-Nisa',
  source_identifier = 'NT 076',
  reference_code = 'NT/076',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tabaruj An-Nisa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tabaruj An-Nisa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '23'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 076';
update public.turots_bundles set
  archive_identifier = 'NT 077 Maulid Barzanji',
  source_identifier = 'NT 077',
  reference_code = 'NT/077',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Maulid Barzanji'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Maulid Barzanji'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '4'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 077';
update public.turots_bundles set
  archive_identifier = 'NT 077.1 Maulid.Barzanji(21,3x17,2)Asia Bergaris',
  source_identifier = 'NT 077.1',
  reference_code = 'NT/077.1',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Maulid.Barzanji(21,3x17,2)Asia Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Maulid.Barzanji(21,3x17,2)Asia Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '9'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 077.1';
update public.turots_bundles set
  archive_identifier = 'NT 078 Bayanul Musykilat lil Mubtadiin',
  source_identifier = 'NT 078',
  reference_code = 'NT/078',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Bayanul Musykilat lil Mubtadiin'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Bayanul Musykilat lil Mubtadiin'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '20'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 078';
update public.turots_bundles set
  archive_identifier = 'NT 079 Bidayatul Hidayah',
  source_identifier = 'NT 079',
  reference_code = 'NT/079',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Bidayatul Hidayah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Bidayatul Hidayah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '48'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 079';
update public.turots_bundles set
  archive_identifier = 'NT 080 Fathurrahman',
  source_identifier = 'NT 080',
  reference_code = 'NT/080',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fathurrahman'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fathurrahman'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '31'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 080';
update public.turots_bundles set
  archive_identifier = 'NT 081 Syarah Aqidatul Awam',
  source_identifier = 'NT 081',
  reference_code = 'NT/081',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarah Aqidatul Awam'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarah Aqidatul Awam'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '14'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 081';
update public.turots_bundles set
  archive_identifier = 'NT 082 Riyadlatush Shibyan',
  source_identifier = 'NT 082',
  reference_code = 'NT/082',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Riyadlatush Shibyan'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Riyadlatush Shibyan'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 082';
update public.turots_bundles set
  archive_identifier = 'NT 083 Haudh fi Dukhon',
  source_identifier = 'NT 083',
  reference_code = 'NT/083',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Haudh fi Dukhon'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Haudh fi Dukhon'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '32'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 083';
update public.turots_bundles set
  archive_identifier = 'NT 085 Aqidatul Awam (21x16,4)Asia.Bergaris',
  source_identifier = 'NT 085',
  reference_code = 'NT/085',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Aqidatul Awam (21x16,4)Asia.Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Aqidatul Awam (21x16,4)Asia.Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '32'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 085';
update public.turots_bundles set
  archive_identifier = 'NT 086 Kitab Tauhid)(20x16,4)Eropa',
  source_identifier = 'NT 086',
  reference_code = 'NT/086',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Tauhid)(20x16,4)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Tauhid)(20x16,4)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '5'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 086';
update public.turots_bundles set
  archive_identifier = 'NT 088 Kitab Fikih(22,4x16,6)Eropa',
  source_identifier = 'NT 088',
  reference_code = 'NT/088',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Fikih(22,4x16,6)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Fikih(22,4x16,6)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '22'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 088';
update public.turots_bundles set
  archive_identifier = 'NT 088.1 Imrithi (21,3x17) hvs',
  source_identifier = 'NT 088.1',
  reference_code = 'NT/088.1',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Imrithi (21,3x17) hvs'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Imrithi (21,3x17) hvs'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '27'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 088.1';
update public.turots_bundles set
  archive_identifier = 'NT 089 Sullam Taufiq(21,2x16,9) hvs',
  source_identifier = 'NT 089',
  reference_code = 'NT/089',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Sullam Taufiq(21,2x16,9) hvs'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Sullam Taufiq(21,2x16,9) hvs'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '12'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 089';
update public.turots_bundles set
  archive_identifier = 'NT 090 Al-Barmawi',
  source_identifier = 'NT 090',
  reference_code = 'NT/090',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Barmawi'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Barmawi'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '53'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 090';
update public.turots_bundles set
  archive_identifier = 'NT 091 Tajwid',
  source_identifier = 'NT 091',
  reference_code = 'NT/091',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tajwid'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tajwid'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 091';
update public.turots_bundles set
  archive_identifier = 'NT 092 Fikih',
  source_identifier = 'NT 092',
  reference_code = 'NT/092',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fikih'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fikih'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 092';
update public.turots_bundles set
  archive_identifier = 'NT 093 Kitab Fikihi(22,8x16,4)Eropa',
  source_identifier = 'NT 093',
  reference_code = 'NT/093',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Fikihi(22,8x16,4)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Fikihi(22,8x16,4)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '70'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 093';
update public.turots_bundles set
  archive_identifier = 'NT 094 Belum.Di.Ketahui(28,5x19,5)Asia.Bergaris',
  source_identifier = 'NT 094',
  reference_code = 'NT/094',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Belum.Di.Ketahui(28,5x19,5)Asia.Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Belum.Di.Ketahui(28,5x19,5)Asia.Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '3'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 094';
update public.turots_bundles set
  archive_identifier = 'NT 095 Kitab Akhlaq (25,4x18,7) HVS',
  source_identifier = 'NT 095',
  reference_code = 'NT/095',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Kitab Akhlaq (25,4x18,7) HVS'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Kitab Akhlaq (25,4x18,7) HVS'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 095';
update public.turots_bundles set
  archive_identifier = 'NT 096 Syarah Al-Madkhol Fil Maani',
  source_identifier = 'NT 096',
  reference_code = 'NT/096',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarah Al-Madkhol Fil Maani'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarah Al-Madkhol Fil Maani'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '97'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 096';
update public.turots_bundles set
  archive_identifier = 'NT 097 Mukhtashor fi Fannil Balagoh',
  source_identifier = 'NT 097',
  reference_code = 'NT/097',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Mukhtashor fi Fannil Balagoh'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Mukhtashor fi Fannil Balagoh'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 097';
update public.turots_bundles set
  archive_identifier = 'NT 098 Safinatun Najah(25,4x17,9)Eropa',
  source_identifier = 'NT 098',
  reference_code = 'NT/098',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Safinatun Najah(25,4x17,9)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Safinatun Najah(25,4x17,9)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '12'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 098';
update public.turots_bundles set
  archive_identifier = 'NT 099 Nadzom Al-Badi (24,6x17,4)Eropa',
  source_identifier = 'NT 099',
  reference_code = 'NT/099',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Nadzom Al-Badi (24,6x17,4)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Nadzom Al-Badi (24,6x17,4)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 099';
update public.turots_bundles set
  archive_identifier = 'NT 100 Syarah Arbain Nawawi',
  source_identifier = 'NT 100',
  reference_code = 'NT/100',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarah Arbain Nawawi'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarah Arbain Nawawi'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '7'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 100';
update public.turots_bundles set
  archive_identifier = 'NT 101 Fathul Muin Bi Syarhi Qurrotil Ain',
  source_identifier = 'NT 101',
  reference_code = 'NT/101',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fathul Muin Bi Syarhi Qurrotil Ain'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fathul Muin Bi Syarhi Qurrotil Ain'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 101';
update public.turots_bundles set
  archive_identifier = 'NT 102 Minhajul Qowim',
  source_identifier = 'NT 102',
  reference_code = 'NT/102',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Minhajul Qowim'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Minhajul Qowim'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '64'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 102';
update public.turots_bundles set
  archive_identifier = 'NT 103 Belum(.21,3x17,2)Eropa',
  source_identifier = 'NT 103',
  reference_code = 'NT/103',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Belum(.21,3x17,2)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Belum(.21,3x17,2)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '8'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 103';
update public.turots_bundles set
  archive_identifier = 'NT 104 Belum(21,4x17)Eropa',
  source_identifier = 'NT 104',
  reference_code = 'NT/104',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Belum(21,4x17)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Belum(21,4x17)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 104';
update public.turots_bundles set
  archive_identifier = 'NT 105 Al-Fathu Al-Mubin Li Syarhil Arbain (20,8x15,4) Eropa',
  source_identifier = 'NT 105',
  reference_code = 'NT/105',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Fathu Al-Mubin Li Syarhil Arbain (20,8x15,4) Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Fathu Al-Mubin Li Syarhil Arbain (20,8x15,4) Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '207'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 105';
update public.turots_bundles set
  archive_identifier = 'NT 106 Bissorfi (31,9x20,1)Eropa',
  source_identifier = 'NT 106',
  reference_code = 'NT/106',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Bissorfi (31,9x20,1)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Bissorfi (31,9x20,1)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '64'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 106';
update public.turots_bundles set
  archive_identifier = 'NT 107 Al-Awamil (31,9x20,1)Eropa',
  source_identifier = 'NT 107',
  reference_code = 'NT/107',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Awamil (31,9x20,1)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Awamil (31,9x20,1)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '15'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 107';
update public.turots_bundles set
  archive_identifier = 'NT 108 Matan Al-Jurumiyah (31,9x20,1)Eropa',
  source_identifier = 'NT 108',
  reference_code = 'NT/108',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Matan Al-Jurumiyah (31,9x20,1)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Matan Al-Jurumiyah (31,9x20,1)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '40'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 108';
update public.turots_bundles set
  archive_identifier = 'NT 109 Fikih (22,5x16,5) Asia bergaris',
  source_identifier = 'NT 109',
  reference_code = 'NT/109',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fikih (22,5x16,5) Asia bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fikih (22,5x16,5) Asia bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '307'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 109';
update public.turots_bundles set
  archive_identifier = 'NT 110 Aqidatul Awam (21x16,5) HVS Bergaris',
  source_identifier = 'NT 110',
  reference_code = 'NT/110',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Aqidatul Awam (21x16,5) HVS Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Aqidatul Awam (21x16,5) HVS Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '13'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 110';
update public.turots_bundles set
  archive_identifier = 'NT 111 Syarhul Awamil',
  source_identifier = 'NT 111',
  reference_code = 'NT/111',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Syarhul Awamil'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Syarhul Awamil'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '26'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 111';
update public.turots_bundles set
  archive_identifier = 'NT 112 Awamil Miah Al-Jurjani',
  source_identifier = 'NT 112',
  reference_code = 'NT/112',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Awamil Miah Al-Jurjani'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Awamil Miah Al-Jurjani'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '28'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 112';
update public.turots_bundles set
  archive_identifier = 'NT 113 Taqwimul Alsan',
  source_identifier = 'NT 113',
  reference_code = 'NT/113',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Taqwimul Alsan'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Taqwimul Alsan'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '28'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 113';
update public.turots_bundles set
  archive_identifier = 'NT 114 Al-Mutammimah',
  source_identifier = 'NT 114',
  reference_code = 'NT/114',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Al-Mutammimah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Al-Mutammimah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '43'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 114';
update public.turots_bundles set
  archive_identifier = 'NT 115 Maulid Dibai (21,8x17,3) Asia Bergaris',
  source_identifier = 'NT 115',
  reference_code = 'NT/115',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Maulid Dibai (21,8x17,3) Asia Bergaris'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Maulid Dibai (21,8x17,3) Asia Bergaris'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 115';
update public.turots_bundles set
  archive_identifier = 'NT 116 Risalah Al-Bajuri Tijan Ad-Darori (24,4x18)Eropa',
  source_identifier = 'NT 116',
  reference_code = 'NT/116',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Risalah Al-Bajuri Tijan Ad-Darori (24,4x18)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Risalah Al-Bajuri Tijan Ad-Darori (24,4x18)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '21'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 116';
update public.turots_bundles set
  archive_identifier = 'NT 117 belum.di.ketahui.(25x17,4)Eropa',
  source_identifier = 'NT 117',
  reference_code = 'NT/117',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'belum.di.ketahui.(25x17,4)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'belum.di.ketahui.(25x17,4)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '9'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 117';
update public.turots_bundles set
  archive_identifier = 'NT 118 Nuzhatut Tullap',
  source_identifier = 'NT 118',
  reference_code = 'NT/118',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Nuzhatut Tullap'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Nuzhatut Tullap'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '5'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 118';
update public.turots_bundles set
  archive_identifier = 'NT 119 Akhlaq (26,2x19) eropa',
  source_identifier = 'NT 119',
  reference_code = 'NT/119',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Akhlaq (26,2x19) eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Akhlaq (26,2x19) eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '10'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 119';
update public.turots_bundles set
  archive_identifier = 'NT 120 Fikih (23x16,9) Eropa',
  source_identifier = 'NT 120',
  reference_code = 'NT/120',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Fikih (23x16,9) Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Fikih (23x16,9) Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '25'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 120';
update public.turots_bundles set
  archive_identifier = 'NT 121 TIDAK DIKETAHUI (21,3x17)Eropa',
  source_identifier = 'NT 121',
  reference_code = 'NT/121',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI (21,3x17)Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI (21,3x17)Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '20'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 121';
update public.turots_bundles set
  archive_identifier = 'NT 122 Khutbah (24,5x17,2) asia',
  source_identifier = 'NT 122',
  reference_code = 'NT/122',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Khutbah (24,5x17,2) asia'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Khutbah (24,5x17,2) asia'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '7'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 122';
update public.turots_bundles set
  archive_identifier = 'NT 123 TIDAK DIKETAHUI daluang & Eropa',
  source_identifier = 'NT 123',
  reference_code = 'NT/123',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI daluang & Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI daluang & Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '9'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 123';
update public.turots_bundles set
  archive_identifier = 'NT 124 Tuhfatul Muhtaj Bab Faraidh kitab ummahat aulad (23x16,5) Eropa',
  source_identifier = 'NT 124',
  reference_code = 'NT/124',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Tuhfatul Muhtaj Bab Faraidh kitab ummahat aulad (23x16,5) Eropa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Tuhfatul Muhtaj Bab Faraidh kitab ummahat aulad (23x16,5) Eropa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '554'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 124';
update public.turots_bundles set
  archive_identifier = 'NT 125 TIDAK DIKETAHUI',
  source_identifier = 'NT 125',
  reference_code = 'NT/125',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 125';
update public.turots_bundles set
  archive_identifier = 'NT 126 TIDAK DIKETAHUI',
  source_identifier = 'NT 126',
  reference_code = 'NT/126',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '12'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 126';
update public.turots_bundles set
  archive_identifier = 'NT 127 TIDAK DIKETAHUI',
  source_identifier = 'NT 127',
  reference_code = 'NT/127',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '9'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 127';
update public.turots_bundles set
  archive_identifier = 'NT 128 Alfiyah',
  source_identifier = 'NT 128',
  reference_code = 'NT/128',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Alfiyah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Alfiyah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '44'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 128';
update public.turots_bundles set
  archive_identifier = 'NT 129 TIDAK DIKETAHUI',
  source_identifier = 'NT 129',
  reference_code = 'NT/129',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '32'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 129';
update public.turots_bundles set
  archive_identifier = 'NT 130 Doa-doa',
  source_identifier = 'NT 130',
  reference_code = 'NT/130',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Doa-doa'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Doa-doa'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '88'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 130';
update public.turots_bundles set
  archive_identifier = 'NT 131 Khutbah',
  source_identifier = 'NT 131',
  reference_code = 'NT/131',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Khutbah'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Khutbah'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '11'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 131';
update public.turots_bundles set
  archive_identifier = 'NT 132 Surat',
  source_identifier = 'NT 132',
  reference_code = 'NT/132',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Surat'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Surat'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '6'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 132';
update public.turots_bundles set
  archive_identifier = 'NT 133 Serpihan',
  source_identifier = 'NT 133',
  reference_code = 'NT/133',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Serpihan'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Serpihan'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '33'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 133';
update public.turots_bundles set
  archive_identifier = 'NT 134 Serpihan',
  source_identifier = 'NT 134',
  reference_code = 'NT/134',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Serpihan'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Serpihan'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '25'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 134';
update public.turots_bundles set
  archive_identifier = 'NT 135 TIDAK DIKETAHUI',
  source_identifier = 'NT 135',
  reference_code = 'NT/135',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '74'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 135';
update public.turots_bundles set
  archive_identifier = 'NT 136 TIDAK DIKETAHUI',
  source_identifier = 'NT 136',
  reference_code = 'NT/136',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'TIDAK DIKETAHUI'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '4'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 136';
update public.turots_bundles set
  archive_identifier = 'NT 137 Dokumen Penting PP. Qomaruddin Bungah Gresik',
  source_identifier = 'NT 137',
  reference_code = 'NT/137',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'Dokumen Penting PP. Qomaruddin Bungah Gresik'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'Dokumen Penting PP. Qomaruddin Bungah Gresik'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '5'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 137';
update public.turots_bundles set
  archive_identifier = 'NT 138 SYARAH JAUSYAN',
  source_identifier = 'NT 138',
  reference_code = 'NT/138',
  affiliation = 'Nahdlatut Turots',
  institution = 'Nahdlatut Turots · Pondok Pesantren Qomaruddin',
  file_title = coalesce(nullif(display_title, ''), 'SYARAH JAUSYAN'),
  variant_titles = coalesce(nullif(variant_titles, ''), nullif(display_title, ''), 'SYARAH JAUSYAN'),
  content_type = coalesce(nullif(content_type, ''), 'Manuscript'),
  place_of_origin = coalesce(nullif(place_of_origin, ''), 'Indonesia'),
  country = coalesce(nullif(country, ''), 'Indonesia'),
  originals_information = coalesce(nullif(originals_information, ''), 'The original material is located in Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  city_province = coalesce(nullif(city_province, ''), 'Sampurnan, Bungah, Gresik, East Java, Indonesia'),
  archive_level = coalesce(nullif(archive_level, ''), 'File'),
  extent_text = coalesce(nullif(extent_text, ''), extent_pages::text, '45'),
  digitisation_date = coalesce(nullif(digitisation_date, ''), '2024'),
  project_name = coalesce(nullif(project_name, ''), 'Nahdlatut Turots: Digitalisasi Manuskrip Pondok Pesantren Qomaruddin'),
  collection_full_name = coalesce(nullif(collection_full_name, ''), 'Koleksi Ndalem Pondok Pesantren Qomaruddin'),
  digitised_by = coalesce(nullif(digitised_by, ''), 'Tim Nahdlatut Turots & TPPKP Qomaruddin')
where bundle_code = 'NT 138';

-- 4. Backfill record_no (TQ0001..), category_sequence_no, dan page_ranges_label untuk judul yang sudah ada
with ordered as (
  select u.id,
         row_number() over (order by b.bundle_code, u.sequence_no, u.id) as global_rn,
         case when u.display_id ~ '^\d{2}\.[A-Z]\.\d{2}\.(\d{3,4})$'
              then (regexp_match(u.display_id, '^\d{2}\.[A-Z]\.\d{2}\.(\d{3,4})$'))[1]::integer
              else row_number() over (partition by b.collection_id, u.category_primary order by b.bundle_code, u.sequence_no, u.id)
         end as cat_seq
  from public.turots_text_units u
  join public.turots_bundles b on b.id = u.bundle_id
)
update public.turots_text_units u
set record_no = coalesce(nullif(u.record_no, ''), 'TQ' || lpad(o.global_rn::text, 4, '0')),
    category_sequence_no = coalesce(u.category_sequence_no, o.cat_seq),
    page_ranges_label = coalesce(
      nullif(u.page_ranges_label, ''),
      case when nullif(u.folio_start, '') is not null and nullif(u.folio_end, '') is not null and u.folio_start <> u.folio_end
           then u.folio_start || '-' || u.folio_end
           when nullif(u.folio_start, '') is not null then u.folio_start
           else null end
    )
from ordered o
where u.id = o.id;

commit;
notify pgrst, 'reload schema';
