export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed"
    });
  }

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({
      message: "Video URL is required."
    });
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        message: "Invalid URL."
      });
    }

    return res.status(200).json({
      success: true,
      message: "URL received successfully.",
      source: parsedUrl.hostname
    });

  } catch {
    return res.status(400).json({
      message: "Invalid URL."
    });
  }
}
