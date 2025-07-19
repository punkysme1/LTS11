
import React from 'react';

const DonationPage: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold font-serif text-primary-900 dark:text-white mb-6 text-center">Dukung Misi Kami</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p className="text-center">
                    Upaya pelestarian dan digitalisasi manuskrip adalah kerja jangka panjang yang membutuhkan sumber daya berkelanjutan. Setiap kontribusi dari Anda sangat berarti untuk memastikan warisan ini tetap hidup dan dapat diakses oleh semua orang.
                </p>
                <p>
                    Donasi Anda akan digunakan secara langsung untuk:
                </p>
                <ul>
                    <li>Perawatan dan restorasi fisik naskah yang rentan.</li>
                    <li>Biaya operasional peralatan digitalisasi (scanner, server, dll).</li>
                    <li>Pengembangan platform digital ini agar lebih baik dan bermanfaat.</li>
                    <li>Mendukung kegiatan penelitian dan publikasi hasil kajian naskah.</li>
                </ul>
                <h2 className="font-serif text-center mt-8">Salurkan Donasi Anda</h2>
                <div className="mt-4 p-6 bg-primary-50 dark:bg-gray-900 rounded-lg border border-primary-200 dark:border-gray-700 text-center">
                    <p className="text-lg font-semibold">Bank Syariah Indonesia (BSI)</p>
                    <p className="text-2xl font-mono my-2 tracking-widest">7123456789</p>
                    <p className="font-semibold">a.n. Yayasan Pondok Pesantren Qomaruddin</p>
                </div>
                <p className="mt-6 text-center">
                    Untuk konfirmasi donasi atau jika Anda memiliki pertanyaan lebih lanjut, silakan hubungi kami melalui halaman <a href="#/kontak" className="text-primary-600 hover:underline">Kontak</a>.
                </p>
                <p className="mt-4 text-center font-semibold">
                    Terima kasih atas kepedulian dan dukungan Anda.
                </p>
            </div>
        </div>
    );
};

export default DonationPage;
