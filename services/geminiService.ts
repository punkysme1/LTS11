
import { GoogleGenAI } from "@google/genai";
import { Manuskrip } from "../types";

// IMPORTANT: In a real-world application, the API key should be handled securely
// and not be hardcoded or exposed on the client-side. We are using `process.env`
// as a placeholder for a secure environment variable injection method.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API key for Gemini is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function askAboutManuscript(question: string, manuscript: Manuskrip) {
  if (!API_KEY) {
    throw new Error("API_KEY is not configured for Gemini Service.");
  }
  
  // Create a simplified and clean version of manuscript data for the prompt
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

  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response;
}
