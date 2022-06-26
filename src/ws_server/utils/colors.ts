import { Bitmap } from "robotjs";

export const swapRedAndBlueChannel = (bmp: Bitmap) => {
  for (let i = 0; i < bmp.width * bmp.height * 4; i += 4) {
    [bmp.image[i], bmp.image[i + 2]] = [bmp.image[i + 2], bmp.image[i]];
  }
};
