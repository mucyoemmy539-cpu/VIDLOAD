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
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Invalid URL");
    }
  } catch {
    message.textContent = "Please enter a valid video URL.";
    return;
  }

  downloadBtn.disabled = true;
  downloadBtn.textContent = "Checking...";
  message.textContent = "Detecting video source...";

  try {
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
      throw new Error(
        data.message || "Unable to process this link."
      );
    }

    message.textContent =
      `${data.source} detected successfully.`;

  } catch (error) {
    console.error(error);

    message.textContent =
      error.message || "Something went wrong.";
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download";
  }
});
