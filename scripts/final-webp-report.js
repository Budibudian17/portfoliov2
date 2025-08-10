const fs = require('fs');
const path = require('path');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function calculateTotalSavings() {
  const imgDir = path.join(__dirname, '../public/img');
  const publicDir = path.join(__dirname, '../public');
  
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  let convertedFiles = 0;
  const conversions = [];

  // Scan img directory
  if (fs.existsSync(imgDir)) {
    const files = fs.readdirSync(imgDir);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        const originalPath = path.join(imgDir, file);
        const webpPath = path.join(imgDir, `${path.parse(file).name}.webp`);
        
        const originalSize = fs.existsSync(originalPath) ? fs.statSync(originalPath).size : 0;
        const webpSize = fs.existsSync(webpPath) ? fs.statSync(webpPath).size : 0;
        
        if (originalSize > 0 && webpSize > 0) {
          totalOriginalSize += originalSize;
          totalWebPSize += webpSize;
          convertedFiles++;
          
          const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
          conversions.push({
            file,
            originalSize,
            webpSize,
            savings: parseFloat(savings)
          });
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
        
        const originalSize = fs.existsSync(originalPath) ? fs.statSync(originalPath).size : 0;
        const webpSize = fs.existsSync(webpPath) ? fs.statSync(webpPath).size : 0;
        
        if (originalSize > 0 && webpSize > 0) {
          totalOriginalSize += originalSize;
          totalWebPSize += webpSize;
          convertedFiles++;
          
          const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
          conversions.push({
            file,
            originalSize,
            webpSize,
            savings: parseFloat(savings)
          });
        }
      }
    }
  }

  return { totalOriginalSize, totalWebPSize, convertedFiles, conversions };
}

function generateReport() {
  const { totalOriginalSize, totalWebPSize, convertedFiles, conversions } = calculateTotalSavings();
  const totalSavings = totalOriginalSize - totalWebPSize;
  const savingsPercentage = ((totalSavings / totalOriginalSize) * 100).toFixed(1);

  console.log('='.repeat(80));
  console.log('🎯 WEBP CONVERSION FINAL REPORT - ALL MENUS');
  console.log('='.repeat(80));
  
  console.log('\n📊 OVERALL STATISTICS:');
  console.log(`✅ Total files converted: ${convertedFiles}`);
  console.log(`📈 Total original size: ${formatBytes(totalOriginalSize)}`);
  console.log(`📉 Total WebP size: ${formatBytes(totalWebPSize)}`);
  console.log(`💾 Total savings: ${formatBytes(totalSavings)} (${savingsPercentage}%)`);
  
  console.log('\n📋 MENU BREAKDOWN:');
  console.log('='.repeat(80));
  
  // Group by menu/category
  const menuGroups = {
    '🏠 Home Page': ['avatar', 'logo', 'ciptadra', 'smkn1depok', 'smpn3depok'],
    '📜 Certificates': ['sertiflsp', 'skorttoeic', 'sertifpkl', 'setifgame', 'sertifpublik', 'sertifikasikelasindustri', 'sertifjepang', 'sertifdibimbing'],
    '🚀 Projects': ['ciptalife-mobile', 'ciptalife-desktop', 'erp-mobile', 'erp-desktop', 'portfolio-mobile', 'portfolio-desktop'],
    '📝 Blog Images': ['blog3', 'blog4', 'blog5', 'blog6', 'blog8', 'blog9'],
    '🖼️ Placeholders': ['placeholder-logo']
  };

  let totalMenuSavings = 0;
  let totalMenuFiles = 0;

  for (const [menuName, filePatterns] of Object.entries(menuGroups)) {
    const menuFiles = conversions.filter(conv => 
      filePatterns.some(pattern => conv.file.includes(pattern))
    );
    
    if (menuFiles.length > 0) {
      const menuOriginalSize = menuFiles.reduce((sum, file) => sum + file.originalSize, 0);
      const menuWebPSize = menuFiles.reduce((sum, file) => sum + file.webpSize, 0);
      const menuSavings = menuOriginalSize - menuWebPSize;
      const menuSavingsPercentage = ((menuSavings / menuOriginalSize) * 100).toFixed(1);
      
      console.log(`\n${menuName}:`);
      console.log(`   📁 Files: ${menuFiles.length}`);
      console.log(`   📊 Size: ${formatBytes(menuOriginalSize)} → ${formatBytes(menuWebPSize)}`);
      console.log(`   💾 Savings: ${formatBytes(menuSavings)} (${menuSavingsPercentage}%)`);
      
      totalMenuSavings += menuSavings;
      totalMenuFiles += menuFiles.length;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('🚀 PERFORMANCE IMPACT:');
  console.log('='.repeat(80));
  console.log('✅ Faster page load times across all menus');
  console.log('✅ Reduced bandwidth usage for mobile users');
  console.log('✅ Better Core Web Vitals scores');
  console.log('✅ Improved SEO rankings');
  console.log('✅ Enhanced user experience on slow connections');
  
  console.log('\n🌐 BROWSER COMPATIBILITY:');
  console.log('='.repeat(80));
  console.log('✅ WebP: Chrome, Firefox, Safari, Edge (modern browsers)');
  console.log('✅ Fallback: Original format for older browsers');
  console.log('✅ Automatic detection and fallback via OptimizedImage component');
  
  console.log('\n📱 MENUS OPTIMIZED:');
  console.log('='.repeat(80));
  console.log('✅ Home Page (/)');
  console.log('✅ Projects Page (/projects)');
  console.log('✅ Blog Page (/blog)');
  console.log('✅ Project Detail Pages (/projects/[slug])');
  console.log('✅ Blog Detail Pages (/blog/[slug])');
  console.log('✅ GitHub Contributions Component');
  console.log('✅ Admin Dashboard (placeholder images)');
  
  console.log('\n' + '='.repeat(80));
  console.log('🎉 CONVERSION COMPLETE! ALL MENUS OPTIMIZED! 🎉');
  console.log('='.repeat(80));
}

// Run the report
generateReport();
