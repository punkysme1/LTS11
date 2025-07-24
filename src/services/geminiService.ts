import { GoogleGenerativeAI } from "@google/generative-ai";
import { Manuskrip } from "../types";

// Mengambil API key dari environment variables, ini sudah benar untuk Vite.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("API key for Gemini is not set. AI features will not work.");
}

// 1. Inisialisasi klien dengan cara yang benar
const genAI = new GoogleGenerativeAI(API_KEY!);

export async function askAboutManuscript(question: string, manuscript: Manuskrip) {
  if (!API_KEY) {
    throw new Error("API_KEY tidak dikonfigurasi untuk Layanan Gemini.");
  }

  // Membuat konteks yang bersih untuk prompt
  const manuscriptContext = {
    judul: manuscript.judul_dari_tim,
    pengarang: manuscript.pengarang,
    tahun: `${manuscript.tahun_penulisan_di_teks} (${manuscript.konversi_masehi} M)`,
    kategori: manuscript.kategori_ilmu_pesantren,
    deskripsi: manuscript.deskripsi_umum,
    bahasa: manuscript.bahasa,
    aksara: manuscript.aksara,
    kolofon: manuscript.kolofon,
    kondisi: manuscript.kondisi_fisik_naskah,
  };

  const prompt = `
Anda adalah seorang ahli filologi dan sejarawan yang berspesialisasi dalam manuskrip Islam Nusantara.
Berdasarkan data manuskrip berikut, jawab pertanyaan pengguna dengan informatif, ringkas, dan dalam bahasa Indonesia.
Jangan hanya mengulangi data, tetapi berikan analisis atau konteks tambahan jika memungkinkan.

Data Manuskrip:
\`\`\`json
${JSON.stringify(manuscriptContext, null, 2)}
\`\`\`

Pertanyaan Pengguna: "${question}"

Jawaban Anda:
`;

  try {
    // 2. Dapatkan model terlebih dahulu
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Panggil generateContentStream pada model dengan prompt
    const result = await model.generateContentStream(prompt);

    // 4. Kembalikan stream untuk di-handle oleh frontend
    return result.stream;

  } catch (error) {
    console.error("Error saat memanggil Gemini API:", error);
    // Melempar error agar bisa ditangkap oleh komponen UI
    throw new Error("Gagal mendapatkan respons dari AI.");
  }
}