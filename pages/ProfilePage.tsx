
import React from 'react';

const ProfilePage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold font-serif text-primary-900 dark:text-white mb-6">Profil Galeri Manuskrip Sampurnan</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>
                    Galeri Manuskrip Sampurnan adalah sebuah inisiatif digital yang didedikasikan untuk melestarikan, mengkatalogisasi, dan membagikan warisan intelektual tak ternilai yang terkandung dalam koleksi manuskrip kuno Pondok Pesantren Qomaruddin, Gresik. Nama "Sampurnan" diambil sebagai penghormatan kepada Kiai Sampurnan, seorang ulama kharismatik yang koleksi pribadinya menjadi cikal bakal dari galeri ini.
                </p>
                <h2 className="font-serif">Visi & Misi</h2>
                <p>
                    Visi kami adalah menjadi pusat rujukan utama bagi para peneliti, akademisi, dan masyarakat umum yang tertarik pada studi naskah Islam Nusantara. Kami berupaya menjembatani masa lalu dengan masa kini melalui teknologi, memastikan bahwa kearifan yang terkandung dalam lembaran-lembaran tua ini dapat terus diakses dan dipelajari oleh generasi mendatang.
                </p>
                <ul>
                    <li><strong>Pelestarian:</strong> Mendigitalisasi manuskrip untuk melindunginya dari kerusakan fisik dan degradasi oleh waktu.</li>
                    <li><strong>Aksesibilitas:</strong> Menyediakan akses terbuka dan mudah bagi siapa saja, di mana saja, untuk mempelajari koleksi kami.</li>
                    <li><strong>Penelitian:</strong> Mendorong dan memfasilitasi penelitian ilmiah yang mendalam terhadap konten manuskrip.</li>
                    <li><strong>Edukasi:</strong> Mengedukasi publik tentang pentingnya warisan naskah sebagai bagian dari sejarah dan identitas bangsa.</li>
                </ul>
                <h2 className="font-serif">Sejarah Singkat</h2>
                <p>
                    Koleksi ini bermula dari puluhan naskah pribadi milik Kiai Sampurnan yang diwariskan secara turun-temurun. Menyadari nilai historis dan keilmuan yang luar biasa, Pondok Pesantren Qomaruddin membentuk Tim Pelestarian dan Pengkajian Khazanah Pustaka (TPPKP) untuk merawat dan mengelola naskah-naskah ini secara profesional. Proyek Galeri Digital ini merupakan langkah evolutif dari upaya tersebut, membawa koleksi berharga ini ke panggung dunia.
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;
