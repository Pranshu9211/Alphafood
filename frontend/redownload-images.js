import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const failedImages = [
  {
    url: 'https://images.unsplash.com/photo-1628840042765-356cda07f423?w=500&h=500&fit=crop',
    filename: 'pepperoni-pizza.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1541013391-f41ffe7d0055?w=500&h=500&fit=crop',
    filename: 'dessert-parfait.jpg'
  }
];

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Re-downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
};

const downloadAll = async () => {
  console.log('🔄 Re-downloading failed images...\n');
  
  for (const image of failedImages) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`✗ Failed to download ${image.filename}: ${error.message}`);
    }
  }
  
  console.log('\n✅ Re-download complete!');
};

downloadAll();
