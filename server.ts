import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Cloudinary Config - Lazy loaded to prevent crash if keys missing
  const getCloudinary = () => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary environment variables are missing (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)");
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
  };

  const upload = multer({ storage: multer.memoryStorage() });

  // API Route for Cloudinary Upload
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const c = getCloudinary();
      
      // Use upload_stream for better reliability with buffers
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = c.uploader.upload_stream(
          { folder: "manuscripts", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file!.buffer);
      });

      const result = await uploadPromise as any;
      res.json({ url: result.secure_url });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Upload failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
