// imageResizer.ts
import pica from 'pica';

export const resizeProfileImage = async (file: File): Promise<File> => {
  const srcCanvas = document.createElement('canvas');
  const dstCanvas = document.createElement('canvas');
  const newWidth = 160;
  const newHeight = 160;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise((resolve) => (img.onload = resolve));

  srcCanvas.width = img.width;
  srcCanvas.height = img.height;
  srcCanvas.getContext('2d')?.drawImage(img, 0, 0);

  dstCanvas.width = newWidth;
  dstCanvas.height = newHeight;

  // Fill the background with white
  const ctx = dstCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, newWidth, newHeight);
  }

  await pica().resize(srcCanvas, dstCanvas);

  return new Promise((resolve) => {
    dstCanvas.toBlob((blob) => {
      if (blob) {
        const resizedFile = new File([blob], 'resized-image.png', {
          type: 'image/png',
        });
        resolve(resizedFile);
      } else {
        throw new Error('Failed to resize image');
      }
    }, 'image/png');
  });
};

export const resizeAdImage = async (file: File): Promise<File> => {
  const srcCanvas = document.createElement('canvas');
  const dstCanvas = document.createElement('canvas');
  const newWidth = 480;
  const newHeight = 360;

  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise((resolve) => (img.onload = resolve));

  srcCanvas.width = img.width;
  srcCanvas.height = img.height;
  srcCanvas.getContext('2d')?.drawImage(img, 0, 0);

  dstCanvas.width = newWidth;
  dstCanvas.height = newHeight;

  // Fill the background with white
  const ctx = dstCanvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, newWidth, newHeight);
  }

  await pica().resize(srcCanvas, dstCanvas);

  return new Promise((resolve) => {
    dstCanvas.toBlob((blob) => {
      if (blob) {
        const resizedFile = new File([blob], 'resized-image.png', {
          type: 'image/png',
        });
        resolve(resizedFile);
      } else {
        throw new Error('Failed to resize image');
      }
    }, 'image/png');
  });
};
