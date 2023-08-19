import fs from 'fs/promises';
import Handlebars from 'handlebars';

export const genIndexHtmlFile = async (title: string) => {
  const file = await fs.readFile('src/templates/index.handlebars');
  const template = Handlebars.compile(file.toString());

  return template({
    title: title.toUpperCase(),
  });
};
