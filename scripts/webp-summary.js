const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../public/img');
const publicDir = path.join(__dirname, '../public');

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function calculateWebPSavings() {
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  let convertedFiles = 0;
  let skippedFiles = 0;

  console.log('🔍 Scanning for WebP conversions...\n');

  // Scan img directory
  if (fs.existsSync(imgDir)) {
    const files = fs.readdirSync(imgDir);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        const originalPath = path.join(imgDir, file);
        const webpPath = path.join(imgDir, `${path.parse(file).name}.webp`);
        
        const originalSize = getFileSize(originalPath);
        const webpSize = getFileSize(webpPath);
        
        if (originalSize > 0) {
          totalOriginalSize += originalSize;
          
          if (webpSize > 0) {
            totalWebPSize += webpSize;
            convertedFiles++;
            
            const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
            console.log(`✅ ${file} -> ${path.parse(file).name}.webp`);
            console.log(`   📊 ${formatBytes(originalSize)} -> ${formatBytes(webpSize)} (${savings}% smaller)`);
          } else {
            skippedFiles++;
            console.log(`⚠️  ${file} (no WebP version found)`);
          }
        }
      }
    }
  }

  // Scan public directory for placeholder images
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext) && file.startsWith('placeholder')) {
        const originalPath = path.join(publicDir, file);
        const webpPath = path.join(publicDir, `${path.parse(file).name}.webp`);
        
        const originalSize = getFileSize(originalPath);
        const webpSize = getFileSize(webpPath);
        
        if (originalSize > 0) {
          totalOriginalSize += originalSize;
          
          if (webpSize > 0) {
            totalWebPSize += webpSize;
            convertedFiles++;
            
            const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
            console.log(`✅ ${file} -> ${path.parse(file).name}.webp`);
            console.log(`   📊 ${formatBytes(originalSize)} -> ${formatBytes(webpSize)} (${savings}% smaller)`);
          } else {
            skippedFiles++;
            console.log(`⚠️  ${file} (no WebP version found)`);
          }
        }
      }
    }
  }

  // Calculate total savings
  const totalSavings = totalOriginalSize - totalWebPSize;
  const savingsPercentage = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;

  console.log('\n' + '='.repeat(60));
  console.log('📈 WEBP CONVERSION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Converted files: ${convertedFiles}`);
  console.log(`⚠️  Skipped files: ${skippedFiles}`);
  console.log(`📊 Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`📊 Total WebP size: ${formatBytes(totalWebPSize)}`);
  console.log(`💾 Total savings: ${formatBytes(totalSavings)} (${savingsPercentage}%)`);
  console.log('='.repeat(60));

  // Performance benefits
  console.log('\n🚀 PERFORMANCE BENEFITS:');
  console.log(`• Faster page load times`);
  console.log(`• Reduced bandwidth usage`);
  console.log(`• Better Core Web Vitals scores`);
  console.log(`• Improved SEO rankings`);
  console.log(`• Better user experience on slow connections`);
  
  // Browser support
  console.log('\n🌐 BROWSER SUPPORT:');
  console.log(`• WebP: Chrome, Firefox, Safari, Edge (modern browsers)`);
  console.log(`• Fallback: Original format for older browsers`);
  console.log(`• Automatic detection and fallback`);
}

// Run the summary
calculateWebPSavings();
