export default function handler(req, res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mucyoemmy539-cpu.github.io"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Please provide a video URL."
    });
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        success: false,
        message: "Only HTTP and HTTPS URLs are supported."
      });
    }

    const hostname = parsedUrl.hostname
      .toLowerCase()
      .replace(/^www\./, "");

    let source = "Unknown";

    if (
      hostname === "youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtu.be"
    ) {
      source = "YouTube";
    } else if (
      hostname === "facebook.com" ||
      hostname.endsWith(".facebook.com")
    ) {
      source = "Facebook";
    } else if (
      hostname === "tiktok.com" ||
      hostname.endsWith(".tiktok.com")
    ) {
      source = "TikTok";
    } else if (
      hostname === "instagram.com" ||
      hostname.endsWith(".instagram.com")
    ) {
      source = "Instagram";
    } else if (
      hostname === "vimeo.com" ||
      hostname.endsWith(".vimeo.com")
    ) {
      source = "Vimeo";
    } else if (
      hostname === "dailymotion.com" ||
      hostname.endsWith(".dailymotion.com")
    ) {
      source = "Dailymotion";
    }

    if (source === "Unknown") {
      return res.status(400).json({
        success: false,
        message: "This website is not supported yet."
      });
    }

    return res.status(200).json({
      success: true,
      source: source,
      message: `${source} link detected successfully.`
    });

  } catch {
    return res.status(400).json({
      success: false,
      message: "Invalid URL."
    });
  }
}
