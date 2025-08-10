const fs = require('fs');
const path = require('path');

// Image mapping for WebP conversion
const imageMapping = {
  // Sertifikat images
  '/img/sertiflsp.jpeg': { webp: '/img/sertiflsp.webp', fallback: '/img/sertiflsp.jpeg' },
  '/img/skorttoeic.jpeg': { webp: '/img/skorttoeic.webp', fallback: '/img/skorttoeic.jpeg' },
  '/img/sertifpkl.jpeg': { webp: '/img/sertifpkl.webp', fallback: '/img/sertifpkl.jpeg' },
  '/img/setifgame.jpg': { webp: '/img/setifgame.webp', fallback: '/img/setifgame.jpg' },
  '/img/sertifpublik.png': { webp: '/img/sertifpublik.webp', fallback: '/img/sertifpublik.png' },
  '/img/sertifikasikelasindustri.jpg': { webp: '/img/sertifikasikelasindustri.webp', fallback: '/img/sertifikasikelasindustri.jpg' },
  '/img/sertifjepang.png': { webp: '/img/sertifjepang.webp', fallback: '/img/sertifjepang.png' },
  '/img/sertifdibimbing.jpg': { webp: '/img/sertifdibimbing.webp', fallback: '/img/sertifdibimbing.jpg' },
  
  // Company/School images
  '/img/ciptadra.jpg': { webp: '/img/ciptadra.webp', fallback: '/img/ciptadra.jpg' },
  '/img/smkn1depok.jpg': { webp: '/img/smkn1depok.webp', fallback: '/img/smkn1depok.jpg' },
  '/img/smpn3depok.jpg': { webp: '/img/smpn3depok.webp', fallback: '/img/smpn3depok.jpg' },
  
  // Avatar and logo
  '/img/avatar.png': { webp: '/img/avatar.webp', fallback: '/img/avatar.png' },
  '/img/logo.png': { webp: '/img/logo.webp', fallback: '/img/logo.png' },
  
  // Project images (from Imgur)
  'https://i.imgur.com/g605c6S.png': { webp: '/img/ciptalife-mobile.webp', fallback: '/img/ciptalife-mobile.png' },
  'https://i.imgur.com/e7xm0Si.png': { webp: '/img/ciptalife-desktop.webp', fallback: '/img/ciptalife-desktop.png' },
  'https://i.imgur.com/gPUbjsn.png': { webp: '/img/erp-mobile.webp', fallback: '/img/erp-mobile.png' },
  'https://i.imgur.com/4IyEJuN.jpeg': { webp: '/img/erp-desktop.webp', fallback: '/img/erp-desktop.jpeg' },
  'https://i.imgur.com/3XEuJR3.png': { webp: '/img/portfolio-mobile.webp', fallback: '/img/portfolio-mobile.png' },
  'https://i.imgur.com/1syNMQl.jpeg': { webp: '/img/portfolio-desktop.webp', fallback: '/img/portfolio-desktop.jpeg' },
  
  // Placeholder images
  '/placeholder.jpg': { webp: '/placeholder.webp', fallback: '/placeholder.jpg' },
  '/placeholder-logo.png': { webp: '/placeholder-logo.webp', fallback: '/placeholder-logo.png' },
  '/placeholder-user.jpg': { webp: '/placeholder-user.webp', fallback: '/placeholder-user.jpg' }
};

// Files to scan and update
const filesToScan = [
  'app/page.tsx',
  'app/blog/page.tsx',
  'app/projects/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/projects/[slug]/page.tsx',
  'components/navbar.tsx',
  'components/chat-widget.tsx'
];

function updateImageReferences() {
  let totalFilesUpdated = 0;
  let totalReplacements = 0;

  for (const filePath of filesToScan) {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      continue;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let fileUpdated = false;
    let replacements = 0;

    // Replace Image components with OptimizedImage
    for (const [oldSrc, newMapping] of Object.entries(imageMapping)) {
      const oldPattern = new RegExp(`src=["']${oldSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g');
      
      if (oldPattern.test(content)) {
        // Replace Image with OptimizedImage if not already done
        if (!content.includes('OptimizedImage')) {
          content = content.replace(/import Image from "next\/image"/g, 'import Image from "next/image"\nimport OptimizedImage from "@/components/optimized-image"');
        }
        
        // Replace the src attribute
        content = content.replace(oldPattern, `src="${newMapping.webp}" fallback="${newMapping.fallback}"`);
        replacements++;
        fileUpdated = true;
      }
    }

    if (fileUpdated) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated ${filePath} (${replacements} replacements)`);
      totalFilesUpdated++;
      totalReplacements += replacements;
    } else {
      console.log(`ℹ️  No changes needed for ${filePath}`);
    }
  }

  console.log(`\n📈 Update Summary:`);
  console.log(`✅ Files updated: ${totalFilesUpdated}`);
  console.log(`📊 Total replacements: ${totalReplacements}`);
}

// Run the update
updateImageReferences();
