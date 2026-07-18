export async function fileToBase64(file) {
  const bytes = await file.arrayBuffer();

  return Buffer.from(bytes).toString("base64");
}