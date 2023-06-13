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
  const TARGET_ASPECT_RATIO = 4 / 3;
  const MAX_WIDTH = 400;
  const MAX_HEIGHT = 300;

  const srcCanvas = document.createElement('canvas');
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise((resolve) => (img.onload = resolve));

  // Create the original canvas
  srcCanvas.width = img.width;
  srcCanvas.height = img.height;
  srcCanvas.getContext('2d')?.drawImage(img, 0, 0);

  let cropWidth, cropHeight;

  // Calculate the dimensions of the crop while maintaining aspect ratio
  if (img.width / img.height > TARGET_ASPECT_RATIO) {
    cropHeight = img.height;
    cropWidth = cropHeight * TARGET_ASPECT_RATIO;
  } else {
    cropWidth = img.width;
    cropHeight = cropWidth / TARGET_ASPECT_RATIO;
  }

  // Calculate the position to start cropping
  const startX = (img.width - cropWidth) / 2;
  const startY = (img.height - cropHeight) / 2;

  // Create a new canvas for the cropped image
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = cropWidth;
  cropCanvas.height = cropHeight;

  // Draw the cropped image onto the new canvas
  const ctxCrop = cropCanvas.getContext('2d');
  ctxCrop?.drawImage(
    srcCanvas,
    startX,
    startY,
    cropWidth,
    cropHeight, // source dimensions
    0,
    0,
    cropWidth,
    cropHeight // destination dimensions
  );

  // Create a new canvas for the resized image
  const resizeCanvas = document.createElement('canvas');
  resizeCanvas.width = MAX_WIDTH;
  resizeCanvas.height = MAX_HEIGHT;

  // Fill the background with white
  const ctxResize = resizeCanvas.getContext('2d');
  if (ctxResize) {
    ctxResize.fillStyle = 'white';
    ctxResize.fillRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
  }

  // Draw the cropped image onto the new canvas, resizing it
  ctxResize?.drawImage(cropCanvas, 0, 0, MAX_WIDTH, MAX_HEIGHT);

  return new Promise((resolve) => {
    resizeCanvas.toBlob((blob) => {
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
//   const MAX_WIDTH = 480; // Maximum width for resized image
//   const MAX_HEIGHT = 360; // Maximum height for resized image

//   const srcCanvas = document.createElement('canvas');
//   const dstCanvas = document.createElement('canvas');

//   const img = new Image();
//   img.src = URL.createObjectURL(file);
//   await new Promise((resolve) => (img.onload = resolve));

//   let newWidth;
//   let newHeight;

//   // Calculate new dimensions that keep aspect ratio
//   if (img.width > img.height) {
//     newWidth = MAX_WIDTH;
//     newHeight = (img.height * newWidth) / img.width;
//   } else {
//     newHeight = MAX_HEIGHT;
//     newWidth = (img.width * newHeight) / img.height;
//   }

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
