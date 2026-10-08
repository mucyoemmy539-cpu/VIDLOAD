const videoUrl = document.getElementById("videoUrl");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

function detectSource(url) {
  const hostname = new URL(url).hostname
    .toLowerCase()
    .replace(/^www\./, "");

  if (hostname === "youtube.com" || hostname.endsWith(".youtube.com") || hostname === "youtu.be") {
    return "YouTube";
  }

  if (hostname === "vimeo.com" || hostname.endsWith(".vimeo.com")) {
    return "Vimeo";
  }

  if (hostname === "dailymotion.com" || hostname.endsWith(".dailymotion.com")) {
    return "Dailymotion";
  }

  if (hostname === "facebook.com" || hostname.endsWith(".facebook.com")) {
    return "Facebook";
  }

  if (hostname === "instagram.com" || hostname.endsWith(".instagram.com")) {
    return "Instagram";
  }

  if (hostname === "tiktok.com" || hostname.endsWith(".tiktok.com")) {
    return "TikTok";
  }

  return "Unknown";
}

downloadBtn.addEventListener("click", () => {
  const url = videoUrl.value.trim();

  if (!url) {
    message.textContent = "Please paste a video link first.";
    return;
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error();
    }

    const source = detectSource(url);

    if (source === "Unknown") {
      message.textContent =
        "This source is not supported yet.";
      return;
    }

    message.textContent =
      `Source detected: ${source}`;
      
  } catch {
    message.textContent = "Please enter a valid URL.";
  }
});
