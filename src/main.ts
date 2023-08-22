import fs from 'fs';
import puppeteer from 'puppeteer';
import { downloadImage } from './helpers/downloadImage';
import { genItemForCategory } from './helpers/genItemForCategory';
import { genIndexHtmlFile } from './helpers/genIndexHtmlFile';
import { genImageHtmlFile } from './helpers/genImagesHtmlFile';

const generatedFilesFolder = 'generated-files';
const currentPage = 'https://vigorita.com.ar/';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  page.goto(currentPage);
  await page.waitForNetworkIdle();

  await page.waitForSelector(
    '.nav.header-nav.header-bottom-nav.nav-center.nav-line-grow.nav-size-xsmall.nav-spacing-small.nav-uppercase'
  );

  const categories: string[] = [];

  const items = await page?.evaluate(() => {
    const menu = document.querySelector(
      '.nav.header-nav.header-bottom-nav.nav-center.nav-line-grow.nav-size-xsmall.nav-spacing-small.nav-uppercase'
    );

    if (!menu) return;

    const items: {
      name: string;
      url: string;
    }[] = [];

    Array.from(menu.children).forEach((e) => {
      const mainTitle = e.querySelector('.nav-top-link')?.textContent ?? '';
      const submenu = e.querySelectorAll(
        '.sub-menu .menu-item.menu-item-type-taxonomy.menu-item-object-product_cat a'
      );

      if (submenu.length) {
        Array.from(submenu).forEach((subItem) => {
          const subTitle = subItem?.textContent ?? '';

          items.push({
            name: mainTitle + ' ' + subTitle,
            url: subItem?.getAttribute('href') ?? '',
          });
        });
      } else {
        items.push({
          name: mainTitle,
          url: e.querySelector('.nav-top-link')?.getAttribute('href') ?? '',
        });
      }
    });

    return items;
  });

  for await (const [index, item] of (items ?? []).entries()) {
    console.log('Getting item', item.name, `${index + 1} of ${items?.length}`, item.url);

    const folderName = item.name.toLowerCase().split(' ').join('-');
    await page.goto(item.url);

    const elements = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.image-fade_in_back a'))
        .map((e) => e.getAttribute('href'))
        .reduce((prev, cur) => (cur ? [...prev, cur] : prev), Array<string>())
    );

    const dirToCreate = `${generatedFilesFolder}/${folderName}/images`;
    if (!fs.existsSync(dirToCreate)) {
      fs.mkdirSync(dirToCreate, { recursive: true });
    }

    const imagesInfo: { title: string; value: string }[][] = [];

    for (const [index, anchorLink] of elements.entries()) {
      try {
        await page.goto(anchorLink);
        await page.waitForSelector(
          '.woocommerce-product-gallery__image.slide.first a'
        );
      } catch (error) {
        console.log('Failed to get image for:', anchorLink);
        continue;
      }

      const image = await page.evaluate(() =>
        document
          .querySelector('.woocommerce-product-gallery__image.slide.first a')
          ?.getAttribute('href')
      );

      const infoForImage = await page.evaluate(() => {
        const info = Array.from(
          document.querySelectorAll(
            '.woocommerce-product-attributes.shop_attributes .woocommerce-product-attributes-item'
          )
        ).filter((item) => !item.textContent?.includes('Precio'));

        return info.map((item) => ({
          title: (item.querySelector('th')?.textContent ?? '').replace(
            '\n',
            ''
          ).trim(),
          value: (item.querySelector('td')?.textContent ?? '').replace(
            '\n',
            ''
          ).trim(),
        }));
      });

      imagesInfo.push(infoForImage);

      await downloadImage(image ?? '', `${dirToCreate}/${index + 1}.jpg`);
    }

    categories.push(genItemForCategory(item.name, folderName));

    const imageHtmlFile = genImageHtmlFile(imagesInfo);

    fs.writeFileSync(
      `${generatedFilesFolder}/${folderName}/images.html`,
      imageHtmlFile
    );

    const indexHtmlFile = await genIndexHtmlFile(item.name);
    fs.writeFileSync(
      `${generatedFilesFolder}/${folderName}/index.html`,
      indexHtmlFile
    );
  }

  fs.writeFileSync(
    `${generatedFilesFolder}/categories.html`,
    categories.join('')
  );

  console.log('Finished');
  await page.close();
  return;
})();
