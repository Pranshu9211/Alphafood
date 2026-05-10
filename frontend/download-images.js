import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop',
    filename: 'truffle-lobster.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=500&fit=crop',
    filename: 'gourmet-pasta.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1628840042765-356cda07f423?w=500&h=500&fit=crop',
    filename: 'pepperoni-pizza.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop',
    filename: 'burger-supreme.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop',
    filename: 'gourmet-plated.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&h=500&fit=crop',
    filename: 'pancakes-stack.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1541013391-f41ffe7d0055?w=500&h=500&fit=crop',
    filename: 'dessert-parfait.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    filename: 'avatar-sarah.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    filename: 'avatar-james.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    filename: 'avatar-maria.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    filename: 'avatar-david.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=500&fit=crop',
    filename: 'chef-marcus.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    filename: 'chef-elena.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&h=400&fit=crop',
    filename: 'kitchen-about.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop',
    filename: 'hero-background.jpg'
  }
];

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

// Create directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file on error
      reject(err);
    });
  });
};

const downloadAll = async () => {
  console.log('🚀 Starting image download...\n');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`✗ Failed to download ${image.filename}: ${error.message}`);
    }
  }
  
  console.log('\n✅ All images downloaded successfully!');
};

downloadAll();
