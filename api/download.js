export default function handler(req, res) {
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
      message: "Video URL is required."
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

    return res.status(200).json({
      success: true,
      message: "URL received successfully.",
      source: parsedUrl.hostname
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid URL."
    });
  }
}
