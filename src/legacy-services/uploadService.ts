import { getSupabase, isSupabaseConfigured } from "../lib/supabase";

/**
 * Robust file upload service that handles backend uploads and automatically
 * falls back to direct client-side uploads (Supabase Storage or Cloudinary)
 * when hosted on static platforms (like Cloudflare Pages or Vercel static).
 */
export const uploadFile = async (file: File): Promise<string> => {
  const errors: string[] = [];

  // --- METODE 1: Express Backend API (/api/upload) ---
  try {
    console.log("Metode 1: Mencoba mengunggah via Express backend (/api/upload)...");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type");
    if (response.ok && contentType && contentType.includes("application/json")) {
      const result = await response.json();
      if (result.url) {
        console.log("Berhasil mengunggah via Express backend:", result.url);
        return result.url;
      }
    }
    const errText = !response.ok ? `Status ${response.status}` : "Respon JSON tidak valid";
    errors.push(`Express Backend API: ${errText}`);
    console.warn(`Unggahan backend tidak menghasilkan URL (${errText}). Mencoba metode klien...`);
  } catch (error: any) {
    errors.push(`Express Backend API error: ${error.message || error}`);
    console.warn("Unggahan via Express backend gagal/tidak tersedia. Mencoba metode klien...", error);
  }

  // --- METODE 2: Direct Client-Side Cloudinary Upload (Unsigned Preset) ---
  // Ambil data Cloudinary dari LocalStorage (jika diset lewat panel Admin) atau dari Vite Env
  const cloudNameLocal = typeof window !== 'undefined' ? (localStorage.getItem("cloudinary_cloud_name") || localStorage.getItem("CLOUDINARY_CLOUD_NAME")) : null;
  const uploadPresetLocal = typeof window !== 'undefined' ? (localStorage.getItem("cloudinary_upload_preset") || localStorage.getItem("CLOUDINARY_UPLOAD_PRESET")) : null;

  const cloudNameEnv = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const finalCloudName = cloudNameLocal || cloudNameEnv;
  const finalPreset = uploadPresetLocal || uploadPreset;

  if (finalCloudName && finalPreset) {
    console.log("Metode 2: Mencoba unggah langsung ke Cloudinary dari browser...", { finalCloudName, finalPreset });
    try {
      const cleanCloudName = finalCloudName.replace("@", "").trim();
      const url = `https://api.cloudinary.com/v1_1/${cleanCloudName}/image/upload`;
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", finalPreset.trim());
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.secure_url) {
          console.log("Berhasil mengunggah langsung ke Cloudinary via browser:", result.secure_url);
          return result.secure_url;
        }
      } else {
        const errorText = await response.text();
        console.error("Cloudinary native upload error response:", errorText);
        let errorReason = errorText;
        try {
          const errJson = JSON.parse(errorText);
          errorReason = errJson.error?.message || errorText;
        } catch (_) {}
        errors.push(`Cloudinary Unsigned API: ${errorReason}`);
      }
    } catch (error: any) {
      console.error("Cloudinary native upload exception:", error);
      errors.push(`Cloudinary Unsigned Exception: ${error.message || error}`);
    }
  } else {
    console.log("Metode 2 dilewati: Kredensial Cloudinary Unsigned (Cloud Name atau Upload Preset) belum diatur.");
    errors.push("Cloudinary Unsigned: Kredensial belum diatur (Cloud Name atau Preset kosong).");
  }

  // --- METODE 3: Direct Supabase Storage Upload ---
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    if (supabase) {
      console.log("Metode 3: Mencoba unggah langsung ke Supabase Storage...");
      const fileExt = file.name.split(".").pop();
      // Generate nama file yang bersih untuk mencegah masalah pengodean URL
      const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 35);
      const fileName = `${cleanOriginalName}_${Date.now()}.${fileExt}`;
      const filePath = `manuscripts/${fileName}`;

      // Daftar bucket kandidat yang akan dicoba secara berurutan
      const buckets = ["manuscripts", "images", "gallery", "files"];
      let lastErrorMessage = "";

      for (const bucket of buckets) {
        try {
          console.log(`Mencoba mengunggah ke bucket Supabase: '${bucket}'...`);
          const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (!error && data) {
            const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
            console.log(`Berhasil mengunggah langsung ke Supabase Storage ('${bucket}'):`, publicUrl);
            return publicUrl;
          }
          if (error) {
            lastErrorMessage = error.message;
            console.log(`Gagal untuk bucket '${bucket}':`, error.message);
          }
        } catch (e: any) {
          lastErrorMessage = e.message || String(e);
          console.log(`Pengecualian untuk bucket '${bucket}':`, e);
        }
      }
      errors.push(`Supabase Storage Gagal: ${lastErrorMessage || "Bucket tidak ditemukan"}`);
    }
  } else {
    errors.push("Supabase Storage: Supabase tidak dikonfigurasi.");
  }

  // --- KESALAHAN GLOBAL JIKA SEMUA METODE GAGAL ---
  throw new Error(
    `❌ Gagal Mengunggah Berkas!\n\n` +
    `Detail status & error dari setiap metode:\n` +
    errors.map((err, idx) => `  [Metode ${idx + 1}] ${err}`).join("\n") +
    `\n\n💡 SOLUSI DI CLOUDFLARE PAGES / HOSTING STATIS:\n` +
    `Karena Anda dideploy di hosting statis (seperti Cloudflare Pages), Node.js server (/api/upload) tidak merespons (menghasilkan status HTTP 405/404).\n\n` +
    `Sangat disarankan untuk memasukkan Cloud Name & Unsigned Upload Preset Anda pada panel "Konfigurasi Cloudinary Client-Side" di bagian paling bawah halaman Admin di website Anda! Setelah Anda menyimpannya sekali, unggahan gambar akan langsung lancar dari browser ke Cloudinary tanpa server backend.`
  );
};
