import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Basic Middlewares
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // Cloudinary Config - Lazy loaded to prevent crash if keys missing
  const getCloudinary = () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Missing Cloudinary Config in Environment:", { 
        hasCloudName: !!cloudName, 
        hasApiKey: !!apiKey, 
        hasApiSecret: !!apiSecret 
      });
      throw new Error("Konfigurasi Cloudinary (Cloud Name/API Key/Secret) belum diset di variabel lingkungan (Secrets).");
    }
    
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
    return cloudinary;
  };

  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });

  // Health check to verify custom server is running
  app.get("/api/health", (req, res) => {
    console.log("Health check hit");
    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      env: { 
        hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
        hasApiKey: !!process.env.CLOUDINARY_API_KEY,
        hasApiSecret: !!process.env.CLOUDINARY_API_SECRET
      } 
    });
  });

  // Debug route for /api/upload
  app.get("/api/upload", (req, res) => {
    res.json({ message: "This endpoint only accepts POST requests for file uploads." });
  });

  // API Route for Cloudinary Upload
  app.post("/api/upload", (req, res, next) => {
    console.log("Incoming POST request to /api/upload");
    next();
  }, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        console.warn("Upload attempt without file");
        return res.status(400).json({ error: "Tidak ada file yang dipilih" });
      }

      console.log("Processing file upload to Cloudinary:", req.file.originalname);
      const c = getCloudinary();
      
      // Use upload_stream for better reliability with buffers
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = c.uploader.upload_stream(
          { folder: "manuscripts", resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Error during upload stream:", error);
              reject(error);
            }
            else resolve(result);
          }
        );
        stream.end(req.file!.buffer);
      });

      const result = await uploadPromise as any;
      console.log("Cloudinary Upload Successful:", result.secure_url);
      res.json({ url: result.secure_url });
    } catch (error) {
      console.error("Internal Server Error during upload:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Gagal mengunggah ke Cloudinary" 
      });
    }
  });

  // Vite middleware or Static files
  const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  
  if (!isProd) {
    console.log("Running in DEVELOPMENT mode with Vite Middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running in PRODUCTION mode serving static files");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening on 0.0.0.0:${PORT}`);
    console.log(`Environment: ${isProd ? 'Production' : 'Development'}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
