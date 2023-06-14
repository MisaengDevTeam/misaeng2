export default async function imageToBlob(imageFile: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const blob = new Blob([new Uint8Array(reader.result)], {
        type: imageFile.type,
      });
      resolve(blob);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(imageFile);
  });
}
