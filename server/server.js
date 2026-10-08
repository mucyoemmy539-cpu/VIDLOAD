import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "..")));

// Download API
app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "Video URL is required."
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(url);
    } catch {
      return res.status(400).json({
        message: "Invalid URL."
      });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        message: "Only HTTP and HTTPS URLs are supported."
      });
    }

    /*
      Source-specific download logic will go here.

      For now we only confirm that the URL
      was received successfully.
    */

    return res.json({
      success: true,
      message: "URL received successfully.",
      source: parsedUrl.hostname
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error."
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`VIDLOAD running at http://localhost:${PORT}`);
});
