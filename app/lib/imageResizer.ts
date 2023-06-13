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
  const MAX_WIDTH = 480; // Maximum width for resized image
  const MAX_HEIGHT = 360; // Maximum height for resized image

  const srcCanvas = document.createElement('canvas');
  const dstCanvas = document.createElement('canvas');

  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise((resolve) => (img.onload = resolve));

  let newWidth;
  let newHeight;

  // Calculate new dimensions that keep aspect ratio
  if (img.width > img.height) {
    newWidth = MAX_WIDTH;
    newHeight = (img.height * newWidth) / img.width;
  } else {
    newHeight = MAX_HEIGHT;
    newWidth = (img.width * newHeight) / img.height;
  }

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

// export const resizeAdImage = async (file: File): Promise<File> => {
//   const srcCanvas = document.createElement('canvas');
//   const dstCanvas = document.createElement('canvas');
//   const newWidth = 480;
//   const newHeight = 360;

//   const img = new Image();
//   img.src = URL.createObjectURL(file);
//   await new Promise((resolve) => (img.onload = resolve));

//   srcCanvas.width = img.width;
//   srcCanvas.height = img.height;
//   srcCanvas.getContext('2d')?.drawImage(img, 0, 0);

//   dstCanvas.width = newWidth;
//   dstCanvas.height = newHeight;

//   // Fill the background with white
//   const ctx = dstCanvas.getContext('2d');
//   if (ctx) {
//     ctx.fillStyle = 'white';
//     ctx.fillRect(0, 0, newWidth, newHeight);
//   }

//   await pica().resize(srcCanvas, dstCanvas);

//   return new Promise((resolve) => {
//     dstCanvas.toBlob((blob) => {
//       if (blob) {
//         const resizedFile = new File([blob], 'resized-image.png', {
//           type: 'image/png',
//         });
//         resolve(resizedFile);
//       } else {
//         throw new Error('Failed to resize image');
//       }
//     }, 'image/png');
//   });
// };
