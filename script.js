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
  message.textContent = "Checking your link...";

  try {
    const response = await fetch("/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      throw new Error(
        "The API is not available yet. Please check the Vercel deployment."
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    message.textContent =
      `Link received successfully from ${data.source}`;

  } catch (error) {
    console.error(error);
    message.textContent = error.message;
  } finally {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download";
  }
});
