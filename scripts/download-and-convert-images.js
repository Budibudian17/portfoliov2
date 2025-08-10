const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '../public/img');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Images to download and convert
const images = [
  {
    url: 'https://i.imgur.com/g605c6S.png',
    filename: 'ciptalife-mobile.png',
    webpName: 'ciptalife-mobile.webp'
  },
  {
    url: 'https://i.imgur.com/e7xm0Si.png',
    filename: 'ciptalife-desktop.png',
    webpName: 'ciptalife-desktop.webp'
  },
  {
    url: 'https://i.imgur.com/gPUbjsn.png',
    filename: 'erp-mobile.png',
    webpName: 'erp-mobile.webp'
  },
  {
    url: 'https://i.imgur.com/4IyEJuN.jpeg',
    filename: 'erp-desktop.jpeg',
    webpName: 'erp-desktop.webp'
  },
  {
    url: 'https://i.imgur.com/3XEuJR3.png',
    filename: 'portfolio-mobile.png',
    webpName: 'portfolio-mobile.webp'
  },
  {
    url: 'https://i.imgur.com/1syNMQl.jpeg',
    filename: 'portfolio-desktop.jpeg',
    webpName: 'portfolio-desktop.webp'
  }
];

// Download function
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(outputDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`⚠️  ${filename} already exists, skipping download...`);
      resolve(filepath);
      return;
    }

    console.log(`📥 Downloading ${filename}...`);
    
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded ${filename}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if download failed
      reject(err);
    });
  });
}

// Convert to WebP function
async function convertToWebP(inputPath, webpName) {
  const outputPath = path.join(outputDir, webpName);
  
  // Skip if WebP already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⚠️  ${webpName} already exists, skipping conversion...`);
    return outputPath;
  }

  console.log(`🔄 Converting ${path.basename(inputPath)} to ${webpName}...`);
  
  try {
    await sharp(inputPath)
      .webp({ 
        quality: 80,
        effort: 6,
        nearLossless: false
      })
      .toFile(outputPath);
    
    // Get file sizes
    const originalStats = fs.statSync(inputPath);
    const webpStats = fs.statSync(outputPath);
    const savings = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(1);
    
    console.log(`✅ ${webpName} created`);
    console.log(`   📊 Size: ${(originalStats.size / 1024).toFixed(1)}KB -> ${(webpStats.size / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
    return outputPath;
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(inputPath)}:`, error.message);
    throw error;
  }
}

// Main function
async function downloadAndConvert() {
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  let processedCount = 0;

  for (const image of images) {
    try {
      // Download image
      const downloadedPath = await downloadImage(image.url, image.filename);
      
      // Convert to WebP
      const webpPath = await convertToWebP(downloadedPath, image.webpName);
      
      // Calculate sizes
      const originalStats = fs.statSync(downloadedPath);
      const webpStats = fs.statSync(webpPath);
      totalOriginalSize += originalStats.size;
      totalWebPSize += webpStats.size;
      processedCount++;
      
    } catch (error) {
      console.error(`❌ Error processing ${image.filename}:`, error.message);
    }
  }

  // Summary
  console.log('\n📈 Download and Conversion Summary:');
  console.log(`✅ Processed: ${processedCount} images`);
  console.log(`📊 Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📊 Total WebP size: ${(totalWebPSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Total savings: ${((totalOriginalSize - totalWebPSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`💾 Space saved: ${((totalOriginalSize - totalWebPSize) / 1024 / 1024).toFixed(2)}MB`);
}

// Run the script
downloadAndConvert().catch(console.error);
