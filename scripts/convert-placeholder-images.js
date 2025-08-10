const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Placeholder images to convert
const placeholderImages = [
  'placeholder.jpg',
  'placeholder.svg',
  'placeholder-logo.png',
  'placeholder-logo.svg',
  'placeholder-user.jpg'
];

console.log(`Found ${placeholderImages.length} placeholder images to convert:`);
placeholderImages.forEach(file => console.log(`- ${file}`));

async function convertPlaceholderImages() {
  let convertedCount = 0;
  let totalOriginalSize = 0;
  let totalWebPSize = 0;

  for (const file of placeholderImages) {
    try {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
      
      // Skip if WebP already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⚠️  ${file} -> WebP already exists, skipping...`);
        continue;
      }

      // Check if file exists
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  ${file} not found, skipping...`);
        continue;
      }

      // Skip SVG files (can't convert to WebP)
      if (path.extname(file).toLowerCase() === '.svg') {
        console.log(`⚠️  ${file} is SVG, skipping...`);
        continue;
      }

      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      console.log(`🔄 Converting ${file}...`);

      // Convert to WebP with optimization for placeholder images
      await sharp(inputPath)
        .webp({ 
          quality: 75, // Lower quality for placeholder images
          effort: 6,   // Higher effort = better compression
          nearLossless: false
        })
        .toFile(outputPath);

      // Get WebP file size
      const webpStats = fs.statSync(outputPath);
      const webpSize = webpStats.size;
      totalWebPSize += webpSize;

      // Calculate savings
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ ${file} -> ${path.basename(outputPath)}`);
      console.log(`   📊 Size: ${(originalSize / 1024).toFixed(1)}KB -> ${(webpSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
      
      convertedCount++;

    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }

  // Summary
  console.log('\n📈 Placeholder Images Conversion Summary:');
  console.log(`✅ Converted: ${convertedCount} images`);
  console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📊 Total WebP size: ${(totalWebPSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Total savings: ${((totalOriginalSize - totalWebPSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`💾 Space saved: ${((totalOriginalSize - totalWebPSize) / 1024 / 1024).toFixed(2)}MB`);
}

// Run the conversion
convertPlaceholderImages().catch(console.error);
