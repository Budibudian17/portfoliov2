const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/img');
const outputDir = path.join(__dirname, '../public/img');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const files = fs.readdirSync(inputDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return imageExtensions.includes(ext) && !file.endsWith('.webp');
});

console.log(`Found ${files.length} images to convert:`);
files.forEach(file => console.log(`- ${file}`));

async function convertToWebP() {
  let convertedCount = 0;
  let totalOriginalSize = 0;
  let totalWebPSize = 0;

  for (const file of files) {
    try {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
      
      // Skip if WebP already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⚠️  ${file} -> WebP already exists, skipping...`);
        continue;
      }

      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      console.log(`🔄 Converting ${file}...`);

      // Convert to WebP with optimization
      await sharp(inputPath)
        .webp({ 
          quality: 80, // Good balance between quality and size
          effort: 6,   // Higher effort = better compression but slower
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
  console.log('\n📈 Conversion Summary:');
  console.log(`✅ Converted: ${convertedCount} images`);
  console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📊 Total WebP size: ${(totalWebPSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Total savings: ${((totalOriginalSize - totalWebPSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`💾 Space saved: ${((totalOriginalSize - totalWebPSize) / 1024 / 1024).toFixed(2)}MB`);
}

// Run the conversion
convertToWebP().catch(console.error);
