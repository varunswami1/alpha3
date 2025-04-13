const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImages = {
  'garden-soil.jpg': 'garden soil image path',
  'balcony-floor.jpg': 'balcony floor image path',
  'terrace-floor.jpg': 'terrace floor image path',
  'indoor-floor.jpg': 'indoor floor image path',
  'windowsill.jpg': 'windowsill image path'
};

const outputDir = path.join(__dirname, '../public/images/locations');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process each image
Object.entries(sourceImages).forEach(([filename, sourcePath]) => {
  // Process full size image
  sharp(sourcePath)
    .resize(800, 600, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 })
    .toFile(path.join(outputDir, filename))
    .catch(err => console.error(`Error processing ${filename}:`, err));

  // Process blur version
  sharp(sourcePath)
    .resize(50, 50, {
      fit: 'cover',
      position: 'center'
    })
    .blur(20)
    .jpeg({ quality: 60 })
    .toFile(path.join(outputDir, filename.replace('.jpg', '-blur.jpg')))
    .catch(err => console.error(`Error processing blur version of ${filename}:`, err));
}); 