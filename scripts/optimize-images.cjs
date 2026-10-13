const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Disable Sharp file caching so Windows file locks are never retained
sharp.cache(false);

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

async function run() {
  console.log('Starting image optimization in:', IMAGES_DIR);
  const files = fs.readdirSync(IMAGES_DIR);
  
  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const filePath = path.join(IMAGES_DIR, file);
    const statBefore = fs.statSync(filePath);
    totalBefore += statBefore.size;

    try {
      const inputBuffer = fs.readFileSync(filePath);
      const metadata = await sharp(inputBuffer).metadata();

      let pipeline = sharp(inputBuffer);

      // Max display size needed on desktop is 1200px width/height
      const maxDim = 1200;
      if (metadata.width > maxDim || metadata.height > maxDim) {
        pipeline = pipeline.resize({
          width: metadata.width > metadata.height ? maxDim : undefined,
          height: metadata.height >= metadata.width ? maxDim : undefined,
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      let buffer;
      if (ext === '.jpg' || ext === '.jpeg') {
        buffer = await pipeline
          .jpeg({
            quality: 80,
            mozjpeg: true,
            progressive: true
          })
          .toBuffer();
      } else if (ext === '.png') {
        buffer = await pipeline
          .png({
            quality: 82,
            compressionLevel: 8
          })
          .toBuffer();
      }

      if (buffer && buffer.length < statBefore.size) {
        fs.writeFileSync(filePath, buffer);
        totalAfter += buffer.length;
        const savedPercent = Math.round((1 - buffer.length / statBefore.size) * 100);
        console.log(`✓ Optimized ${file}: ${(statBefore.size / 1024).toFixed(1)}KB -> ${(buffer.length / 1024).toFixed(1)}KB (${savedPercent}% saved)`);
      } else {
        totalAfter += statBefore.size;
        console.log(`- Kept ${file}: ${(statBefore.size / 1024).toFixed(1)}KB`);
      }
      count++;
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
      totalAfter += statBefore.size;
    }
  }

  const savedMb = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2);
  const percentOverall = Math.round((1 - totalAfter / totalBefore) * 100);
  console.log('\n=======================================');
  console.log(`Summary: Processed ${count} images.`);
  console.log(`Initial total size: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total size: ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total space saved: ${savedMb} MB (${percentOverall}% reduction!)`);
  console.log('=======================================');
}

run();
