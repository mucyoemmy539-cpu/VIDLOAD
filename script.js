const videoUrl = document.getElementById("videoUrl");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

function detectSource(url) {
  const hostname = new URL(url).hostname
    .toLowerCase()
    .replace(/^www\./, "");

  if (
    hostname === "youtube.com" ||
    hostname.endsWith(".youtube.com") ||
    hostname === "youtu.be"
  ) {
    return "YouTube";
  }

  if (
    hostname === "vimeo.com" ||
    hostname.endsWith(".vimeo.com")
  ) {
    return "Vimeo";
  }

  if (
    hostname === "dailymotion.com" ||
    hostname.endsWith(".dailymotion.com")
  ) {
    return "Dailymotion";
  }

  if (
    hostname === "facebook.com" ||
    hostname.endsWith(".facebook.com")
  ) {
    return "Facebook";
  }

  if (
    hostname === "instagram.com" ||
    hostname.endsWith(".instagram.com")
  ) {
    return "Instagram";
  }

  if (
    hostname === "tiktok.com" ||
    hostname.endsWith(".tiktok.com")
  ) {
    return "TikTok";
  }

  return "Unknown";
}

downloadBtn.addEventListener("click", async () => {
  const url = videoUrl.value.trim();

  if (!url) {
    message.textContent = "Please paste a video link first.";
    return;
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Invalid protocol");
    }

    const source = detectSource(url);

    if (source === "Unknown") {
      message.textContent = "This website is not supported yet.";
      return;
    }

    message.textContent = "Connecting to VIDLOAD...";

    downloadBtn.disabled = true;
    downloadBtn.textContent = "Checking...";

    const response = await fetch(
      "https://vidloada.vercel.app/api/download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      message.textContent =
        data.message || "Something went wrong.";
      return;
    }

    message.textContent =
      `Connected successfully. Source: ${source}`;

  } catch (error) {
    console.error(error);

    message.textContent =
      "Unable to connect to the VIDLOAD server.";

  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download";
  }
});
