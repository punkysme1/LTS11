import { getSupabase, isSupabaseConfigured } from "../lib/supabase";

/**
 * Robust file upload service that handles backend uploads and automatically
 * falls back to direct client-side uploads (Supabase Storage or Cloudinary)
 * when hosted on static platforms (like Cloudflare Pages or Vercel static).
 */
export const uploadFile = async (file: File): Promise<string> => {
  // Method 1: Try the Express Node.js backend API first (best for localhost / server environments)
  try {
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
        console.log("Successfully uploaded via Express backend:", result.url);
        return result.url;
      }
    }
    
    console.warn(`Express API upload returned status ${response.status} or invalid content. Trying client fallbacks...`);
  } catch (error) {
    console.warn("Express API upload failed/unavailable. Trying client fallbacks...", error);
  }

  // Method 2: Supabase Storage direct client-side upload (extremely robust and works everywhere)
  if (isSupabaseConfigured()) {
    const supabase = getSupabase();
    if (supabase) {
      console.log("Supabase is active. Direct uploading to Supabase Storage...");
      const fileExt = file.name.split(".").pop();
      // Generate clean file name to prevent encoding issues
      const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 35);
      const fileName = `${cleanOriginalName}_${Date.now()}.${fileExt}`;
      const filePath = `manuscripts/${fileName}`;

      // List of candidate buckets we will try in order
      const buckets = ["manuscripts", "images", "gallery", "files"];
      let lastErrorMessage = "";

      for (const bucket of buckets) {
        try {
          console.log(`Attempting upload to Supabase bucket: '${bucket}'...`);
          const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (!error && data) {
            const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);
            console.log(`Successfully uploaded directly to Supabase Storage ('${bucket}'):`, publicUrl);
            return publicUrl;
          }
          if (error) {
            lastErrorMessage = error.message;
            console.log(`Failed for bucket '${bucket}':`, error.message);
          }
        } catch (e: any) {
          lastErrorMessage = e.message || String(e);
          console.log(`Exception for bucket '${bucket}':`, e);
        }
      }

      // If we failed all buckets, we throw an error with exact instructions
      throw new Error(
        `[Supabase Storage Error]: ${lastErrorMessage || "Bucket tidak ditemukan"}\n\n` +
        `Solusi Hosting Statis:\n` +
        `Website Anda dideploy di hosting mandiri/statis (Cloudflare Pages), sehingga backend Node.js di server tidak aktif di produksi. Agar unggahan gambar berhasil:\n\n` +
        `1. Buka Dashboard Supabase Anda (https://supabase.com)\n` +
        `2. Masuk ke menu "Storage" (di sebelah kiri) -> klik "New Bucket"\n` +
        `3. Beri nama bucket: "manuscripts" atau "images"\n` +
        `4. Aktifkan opsi "Public" sehingga siapa saja bisa melihat gambar\n` +
        `5. Masuk ke "Policies" -> Klik "New Policy" untuk bucket tersebut\n` +
        `6. Pilih "Get started quickly" -> berikan izin "INSERT" dan "SELECT" untuk "Anon/Authenticated Users" agar browser Anda diizinkan untuk mengunggah.`
      );
    }
  }

  // Method 3: Direct Client-Side Cloudinary Upload (using Unsigned Preset)
  // Retrieve cloud name and upload preset from localStorage or Vite env
  const cloudNameLocal = typeof window !== 'undefined' ? (localStorage.getItem("cloudinary_cloud_name") || localStorage.getItem("CLOUDINARY_CLOUD_NAME")) : null;
  const uploadPresetLocal = typeof window !== 'undefined' ? (localStorage.getItem("cloudinary_upload_preset") || localStorage.getItem("CLOUDINARY_UPLOAD_PRESET")) : null;

  const cloudNameEnv = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const finalCloudName = cloudNameLocal || cloudNameEnv;
  const finalPreset = uploadPresetLocal || uploadPreset;
  
  if (finalCloudName && finalPreset) {
    console.log("Direct client-side Cloudinary configurations found. Trying direct upload...", { finalCloudName, finalPreset });
    try {
      const cleanCloudName = finalCloudName.replace("@", "").trim();
      const url = `https://api.cloudinary.com/v1_1/${cleanCloudName}/image/upload`;
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", finalPreset);
      
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.secure_url) {
          console.log("Successfully uploaded to Cloudinary directly from client:", result.secure_url);
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
        throw new Error(`Cloudinary API Error: ${errorReason}`);
      }
    } catch (error: any) {
      console.error("Cloudinary native upload exception:", error);
      throw new Error(`Gagal mengunggah langsung ke Cloudinary: ${error.message || error}`);
    }
  }

  // Global Error fallback if hosting is static and no storage mechanism is set up
  throw new Error(
    "Gagal Mengunggah Gambar!\n\n" +
    "Penyebab:\n" +
    "Website Anda dideploy di hosting STATIS (seperti Cloudflare Pages atau Vercel), sehingga backend Express di 'server.ts' tidak aktif di produksi, dan kredensial untuk unggah langsung ke Cloudinary belum terbaca.\n\n" +
    "Cara Memperbaiki (Sangat Mudah):\n\n" +
    "Masuk ke PANEL ADMIN di website Anda, lalu cari bagian \"KOFURASI CLOUDINARY CLIENT-SIDE (UNSIGNED)\" di bagian bawah layar. Masukkan:\n" +
    "  - Cloud Name (contoh: dzussloo4)\n" +
    "  - Upload Preset (unsigned preset dari dashboard Cloudinary Anda)\n\n" +
    "Konfigurasi akan disimpan langsung di browser Anda secara aman dan Anda bisa langsung mengunggah gambar!"
  );
};
