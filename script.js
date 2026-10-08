const videoUrl = document.getElementById("videoUrl");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

downloadBtn.addEventListener("click", async () => {
  const url = videoUrl.value.trim();

  if (!url) {
    message.textContent = "Please paste a video link first.";
    return;
  }

  try {
    new URL(url);
  } catch {
    message.textContent = "Please enter a valid video URL.";
    return;
  }

  downloadBtn.disabled = true;
  downloadBtn.textContent = "Downloading...";
  message.textContent = "Preparing your download...";

  try {
    const response = await fetch(
      "https://vidloada.vercel.app/api/download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      }
    );

    if (!response.ok) {
      let errorMessage = "Download failed.";

      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch {}

      throw new Error(errorMessage);
    }

    const blob = await response.blob();

    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "vidload-video.mp4";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(downloadUrl);

    message.textContent = "Download started successfully.";

  } catch (error) {
    console.error(error);
    message.textContent = error.message;
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download";
  }
});
