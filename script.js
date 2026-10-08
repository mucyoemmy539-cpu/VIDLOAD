const videoUrl = document.getElementById("videoUrl");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

function detectSource(url) {
  const hostname = new URL(url).hostname
    .toLowerCase()
    .replace(/^www\./, "");

  if (hostname === "youtube.com" || hostname.endsWith(".youtube.com")) {
    return "YouTube";
  }

  if (hostname === "youtu.be") {
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

  message.textContent = "";

  if (!url) {
    message.textContent = "Please paste a video link first.";
    return;
  }

  let validUrl;

  try {
    validUrl = new URL(url);

    if (!["http:", "https:"].includes(validUrl.protocol)) {
      throw new Error();
    }
  } catch {
    message.textContent = "Please enter a valid video URL.";
    return;
  }

  const source = detectSource(url);

  if (source === "Unknown") {
    message.textContent =
      "Source not supported yet. We will add more sources later.";
    return;
  }

  message.textContent =
    `Source detected: ${source}. Download support will be connected next.`;
});
