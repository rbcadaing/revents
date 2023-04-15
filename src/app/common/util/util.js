export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFileExtension(fileName) {
  // zero fill right shift operator (>>>)
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}
