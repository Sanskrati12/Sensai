let pdfjsLib = null;
let loadPromise = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToImage(file) {
  try {
    const lib = await loadPdfJs();

    const buffer = await file.arrayBuffer();

    const pdf = await lib.getDocument({
      data: buffer,
    }).promise;

    const page = await pdf.getPage(1);

    const viewport = page.getViewport({
      scale: 1.5,
    });

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    return await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }

        const imageFile = new File(
          [blob],
          file.name.replace(".pdf", ".jpg"),
          {
            type: "image/jpeg",
          }
        );

        resolve(imageFile);
      }, "image/jpeg", 0.8);
    });
  } catch (err) {
    console.error(err);
    return null;
  }
}