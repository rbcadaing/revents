export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFileExtension(fileName) {
  // zero fill right shift operator (>>>)
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function createDataTree(dataset) {
  let hashTable = Object.create(null);

  dataset.forEach((a) => (hashTable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataset.forEach((a) => {
    if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
    else dataTree.push(hashTable[a.id]);
  });
  return dataTree;
}
