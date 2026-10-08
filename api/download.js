export default async function handler(req, res) {
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

    const response = await fetch(parsedUrl.href);

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        message: "Could not access this video file."
      });
    }

    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.startsWith("video/")) {
      return res.status(400).json({
        success: false,
        message:
          "This is not a direct video file. Use a direct public video URL such as an MP4 link."
      });
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="vidload-video.mp4"'
    );

    return res.status(200).send(buffer);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to download the video."
    });
  }
}
