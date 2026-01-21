const pdfUrl = "sotay.pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const container = document.getElementById("book");

const pageFlip = new St.PageFlip(container, {
  width: 600,
  height: 800,
  size: "stretch",
  minWidth: 300,
  maxWidth: 1000,
  minHeight: 400,
  maxHeight: 1200,
  showCover: true,
  mobileScrollSupport: true
});

(async function () {
  const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
  const images = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    images.push(canvas.toDataURL("image/png"));
  }

  pageFlip.loadFromImages(images);
})();
