#!/usr/bin/env node
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../public/img/hero-home.jpg');
const outputPath = join(__dirname, '../public/img/hero-home-optimized.jpg');

async function optimizeImage() {
  try {
    const metadata = await sharp(inputPath).metadata();
    console.log('Original image:', metadata);

    await sharp(inputPath)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 75,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath);

    const stats = await sharp(outputPath).metadata();
    console.log('Optimized image:', stats);
    console.log('✓ Image optimized successfully!');
  } catch (error) {
    console.error('Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();
