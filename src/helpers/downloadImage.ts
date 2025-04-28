import axios from "axios";
import fs from 'fs/promises'
import sharp from "sharp";

export const downloadImage = async (src: string, filename: string) => {
  const response = await axios(src, { responseType: 'arraybuffer' });

  await sharp(response.data).jpeg({
    quality: 80
  }).toFile(filename);

  // await fs.writeFile(filename, response.data);
}