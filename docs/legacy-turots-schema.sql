-- Schema for Galeri Manuskrip Sampurnan

-- 1. Manuscripts Table
CREATE TABLE manuscripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inputer TEXT,
    kode_inventarisasi TEXT UNIQUE NOT NULL,
    judul_dari_tim TEXT NOT NULL,
    afiliasi TEXT,
    nama_koleksi TEXT,
    nomor_koleksi TEXT,
    judul_dari_afiliasi TEXT,
    nomor_digitalisasi TEXT,
    link_digital_afiliasi TEXT,
    link_digital_tppkp_qomaruddin TEXT,
    url_kover TEXT,
    url_konten TEXT,
    klasifikasi_kailani TEXT,
    kategori_ilmu_pesantren TEXT,
    deskripsi_umum TEXT,
    hlm_pemisah TEXT,
    pengarang TEXT,
    penyalin TEXT,
    tahun_penulisan_di_teks TEXT,
    konversi_masehi TEXT,
    lokasi_penyalinan TEXT,
    asal_usul_naskah TEXT,
    bahasa TEXT,
    aksara TEXT,
    kover TEXT,
    ukuran_kover TEXT,
    jilid TEXT,
    ukuran_kertas TEXT,
    ukuran_dimensi TEXT,
    watermark TEXT,
    countermark TEXT,
    tinta TEXT,
    jumlah_halaman INTEGER,
    halaman_kosong INTEGER,
    jumlah_baris_per_halaman INTEGER,
    rubrikasi TEXT,
    iluminasi TEXT,
    ilustrasi TEXT,
    catatan_pinggir TEXT,
    catatan_makna TEXT,
    kolofon TEXT,
    catatan_marginal TEXT,
    kondisi_fisik_naskah TEXT,
    keterbacaan TEXT,
    kelengkapan_naskah TEXT,
    catatan_catatan TEXT,
    kata_kunci TEXT,
    glosarium TEXT,
    referensi TEXT,
    manuskrip_terkait TEXT,
    tokoh_terkait TEXT,
    jenis_kertas TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Blog Posts Table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    image_url TEXT,
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Guestbook Table
CREATE TABLE guestbook (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sample Data for Manuscripts
INSERT INTO manuscripts (
    inputer, kode_inventarisasi, judul_dari_tim, afiliasi, nama_koleksi, nomor_koleksi, 
    judul_dari_afiliasi, nomor_digitalisasi, kategori_ilmu_pesantren, deskripsi_umum, 
    bahasa, aksara, jumlah_halaman, kondisi_fisik_naskah, url_kover
) VALUES 
('Punky S.', 'TPPKP.02.1', 'شرح عومل الجرجاني', 'Nahdlatut Turats', 'NDALEM', '02.001.1', 'Syarhul Amil', 'NT.001', 'NAHWU', 'Gramatika bahasa Arab dasar.', 'Jawa, Arab', 'Arab, Pego', 62, 'Sangat bagus', 'https://images.unsplash.com/photo-1544640808-32ca72ac7f67?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.2', 'فتح المنان', 'Nahdlatut Turats', 'NDALEM', '02.001.2', 'Fathul Mannan', 'NT.002', 'FIKIH', 'Penjelasan tentang dasar-dasar ibadah.', 'Arab', 'Arab', 104, 'Sangat bagus', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.3', 'إعانة الطالبين', 'Nahdlatut Turats', 'NDALEM', '02.001.3', 'I''anatut Thalibin', 'NT.003', 'FIKIH', 'Syarah Fathul Mu''in yang populer di pesantren.', 'Arab', 'Arab', 450, 'Bagus', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.4', 'وقاية الأبرار', 'Nahdlatut Turats', 'NDALEM', '02.002.1', 'Wiqayatul Abrar', 'NT.004', 'FIKIH NIKAH', 'Hak-hak suami istri.', 'Jawa, Arab', 'Arab, Pego', 29, 'Sangat bagus', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.5', 'جوهر التوحيد', 'Nahdlatut Turats', 'NDALEM', '02.002.2', 'Jauharatut Tauhid', 'NT.005', 'AQIDAH', 'Nazam tentang ilmu tauhid.', 'Jawa', 'Pego', 45, 'Rapuh', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.6', 'خلاصة الكلام', 'Nahdlatut Turats', 'NDALEM', '02.002.3', 'Khulasatul Kalam', 'NT.006', 'SEJARAH', 'Sejarah Islam klasik.', 'Melayu', 'Jawi', 120, 'Bagus', 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.7', 'تفسير الجلالين', 'Nahdlatut Turats', 'NDALEM', '02.003.1', 'Tafsir Jalalain', 'NT.007', 'TAFSIR', 'Tafsir Al-Quran ringkas.', 'Arab', 'Arab', 340, 'Bagus', 'https://images.unsplash.com/photo-1543003919-a995d52255ad?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.8', 'رياض الصالحين', 'Nahdlatut Turats', 'NDALEM', '02.003.2', 'Riyadus Shalihin', 'NT.008', 'HADITS', 'Kumpulan hadits-hadits utama.', 'Arab', 'Arab', 280, 'Sangat bagus', 'https://images.unsplash.com/photo-1532012197367-2bb45423f124?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.9', 'بداية الهداية', 'Nahdlatut Turats', 'NDALEM', '02.003.3', 'Bidayatul Hidayah', 'NT.009', 'TASAWUF', 'Adab dan etika keseharian.', 'Jawa', 'Pego', 85, 'Bagus', 'https://images.unsplash.com/photo-1474367658818-e301a2f5eccd?auto=format&fit=crop&q=80&w=800'),
('Punky S.', 'TPPKP.02.10', 'سلم المنورق', 'Nahdlatut Turats', 'NDALEM', '02.004.1', 'Sullamul Munaurah', 'NT.010', 'MANTHIQ', 'Ilmu logika dasar.', 'Jawa', 'Pego', 55, 'Bagus', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800');

-- Sample Data for Blogs
INSERT INTO blog_posts (title, excerpt, content, author, image_url) VALUES
('Pentingnya Pelestarian Manuskrip Nusantara', 'Manuskrip Nusantara adalah jendela bagi kita untuk melihat masa lalu...', 'Konten lengkap artikel tentang pelestarian naskah kuno.', 'Admin', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800'),
('Mengenal Aksara Pego', 'Aksara Pego merupakan adaptasi abjad Arab untuk menuliskan bahasa Jawa...', 'Penjelasan mendalam mengenai sejarah dan penggunaan aksara Pego.', 'Kurator', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800');

-- Sample Data for Guestbook
INSERT INTO guestbook (name, message) VALUES
('Ahmad Fauzi', 'Sangat mengapresiasi upaya digitalisasi manuskrip ini.'),
('Siti Aminah', 'Visualisasi webnya sangat bagus dan mudah digunakan.');
