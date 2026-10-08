const videoUrl = document.getElementById("videoUrl");
const downloadBtn = document.getElementById("downloadBtn");
const message = document.getElementById("message");

downloadBtn.addEventListener("click", async () => {
  const url = videoUrl.value.trim();

  message.textContent = "";

  if (!url) {
    message.textContent = "Please paste a video link first.";
    return;
  }

  try {
    new URL(url);
  } catch {
    message.textContent = "Please enter a valid URL.";
    return;
  }

  downloadBtn.disabled = true;
  downloadBtn.textContent = "Checking...";
  message.textContent = "Checking the video link...";

  try {
    // Backend tuzayihuza hano
    const response = await fetch("/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url: url
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Download failed.");
    }

    message.textContent = "Your download is ready.";

    if (data.downloadUrl) {
      window.location.href = data.downloadUrl;
    }

  } catch (error) {
    message.textContent =
      error.message || "Something went wrong.";
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download";
  }
});
