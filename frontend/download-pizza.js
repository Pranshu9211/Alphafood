import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pizzaUrls = [
  'https://images.unsplash.com/photo-1568458874698-d4f94dca9a16?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&h=500&fit=crop',
  'https://images.unsplash.com/photo-1594007653517-01340b6fa0db?w=500&h=500&fit=crop'
];

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const pizzaPath = path.join(imagesDir, 'pepperoni-pizza.jpg');

// Check if file exists and has size > 1000 bytes
const fileExists = fs.existsSync(pizzaPath);
const fileSize = fileExists ? fs.statSync(pizzaPath).size : 0;

console.log(`Current pizza file: ${fileSize} bytes`);

if (fileSize < 1000) {
  const downloadImage = (url) => {
    return new Promise((resolve) => {
      const file = fs.createWriteStream(pizzaPath);
      
      https.get(url, (response) => {
        console.log(`Trying: ${url.substring(0, 50)}...`);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const finalSize = fs.statSync(pizzaPath).size;
          console.log(`Downloaded: ${finalSize} bytes`);
          if (finalSize > 1000) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }).on('error', (err) => {
        console.log(`Failed: ${err.message}`);
        resolve(false);
      });
    });
  };

  const tryDownload = async () => {
    for (const url of pizzaUrls) {
      const success = await downloadImage(url);
      if (success) break;
      await new Promise(r => setTimeout(r, 1000));
    }
  };

  await tryDownload();
} else {
  console.log('✓ Pizza image already exists with valid size');
}
