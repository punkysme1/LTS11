// src/pages/ContactPage.tsx
import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-serif text-center mb-10 text-gray-900 dark:text-white">Hubungi Kami</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold font-serif mb-4 text-gray-900 dark:text-white">Informasi Kontak</h2>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        <div>
                            <h3 className="font-semibold text-primary-800 dark:text-accent-400">Alamat</h3>
                            <p>Pondok Pesantren Qomaruddin</p>
                            <p>Jl. Sampurnan, Bungah, Kabupaten Gresik, Jawa Timur 61152</p>
                            <p>Indonesia</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary-800 dark:text-accent-400">Email</h3>
                            <p>
                                <a href="mailto:info@galerimanuskrip.org" className="hover:underline">info@galerimanuskrip.org</a>
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-primary-800 dark:text-accent-400">Telepon</h3>
                            <p>
                                <a href="tel:+62313949444" className="hover:underline">+62 31 3949444</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg shadow-lg overflow-hidden">
                    {/* --- PERBAIKAN: Menggunakan URL embed Google Maps yang valid --- */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.380963844626!2d112.59363387499805!3d-7.08111249292214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77e0b3c1b63e91%3A0xf6396495b291c94a!2sPondok%20Pesantren%20Qomaruddin!5e0!3m2!1sen!2sid!4v1722847778393!5m2!1sen!2sid"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Peta Lokasi Pondok Pesantren Qomaruddin"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;