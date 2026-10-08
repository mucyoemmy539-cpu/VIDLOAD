export default async function handler(req, res) {
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

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({
      success: false,
      message: "Invalid URL."
    });
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return res.status(400).json({
      success: false,
      message: "Only HTTP and HTTPS URLs are supported."
    });
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        message: "The video could not be downloaded."
      });
    }

    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.startsWith("video/")) {
      return res.status(400).json({
        success: false,
        message: "This URL is not a direct video file."
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const filename = "vidload-video.mp4";

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    res.setHeader("Content-Length", buffer.length);

    return res.status(200).send(buffer);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Download failed."
    });
  }
}
