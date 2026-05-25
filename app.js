const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileElem");
const fileSelectBtn = document.getElementById("fileSelect");
const resultDiv = document.getElementById("result");

// Open file picker on button click
fileSelectBtn.addEventListener("click", () => fileInput.click());

// Handle file selection
fileInput.addEventListener("change", handleFiles);

// Drag & Drop events
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.background = "#e6f2ff";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.background = "#fff";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.background = "#fff";
  const files = e.dataTransfer.files;
  handleFiles({ target: { files } });
});

// Handle files
async function handleFiles(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    alert("File too large! Max 10MB.");
    return;
  }

  // Show file name
  resultDiv.innerHTML = `<p>Uploading: ${file.name}</p>`;

  // Example API call (replace with your own endpoint)
  const formData = new FormData();
  formData.append("prescription", file);

  try {
    const response = await fetch("https://your-api-endpoint.com/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    resultDiv.innerHTML = `
      <h3>Extracted Data:</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p style="color:red;">Upload failed. Please try again.</p>`;
  }
}
