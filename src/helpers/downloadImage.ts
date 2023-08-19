import axios from "axios";
import fs from 'fs/promises'

export const downloadImage = async (src: string, filename: string) => {
  const response = await axios(src, { responseType: 'arraybuffer' });

  await fs.writeFile(filename, response.data);
}