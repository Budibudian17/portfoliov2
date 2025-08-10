import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Function to download image from URL
function downloadImage(url: string, outputPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const location = response.headers.location;
        if (location) {
          console.log(`🔄 Redirecting to: ${location}`);
          // Recursively call downloadImage with the new location
          downloadImage(location, outputPath).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(outputPath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    });

    request.on('error', reject);
    
    // Set timeout to prevent hanging requests
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Download timeout'));
    });
  });
}

// Function to convert image to WebP
async function convertToWebP(inputPath: string, outputPath: string, quality: number = 80) {
  try {
    await sharp(inputPath)
      .webp({ quality, effort: 6 })
      .toFile(outputPath);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    return {
      originalPath: inputPath,
      webpPath: outputPath,
      originalSize,
      webpSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
    throw error;
  }
}

// Function to extract Imgur ID from various URL formats
function extractImgurId(url: string): string | null {
  // First, try to extract from hash fragment (most reliable for gallery URLs)
  const hashMatch = url.match(/#([a-zA-Z0-9]+)$/);
  if (hashMatch) {
    return hashMatch[1];
  }
  
  // Then try direct image patterns
  const patterns = [
    /i\.imgur\.com\/([a-zA-Z0-9]+)\.(png|jpg|jpeg|gif)/,
    /imgur\.com\/([a-zA-Z0-9]{5,})/, // At least 5 chars to avoid "gallery", "a", etc.
    /imgur\.com\/a\/([a-zA-Z0-9]+)/,
    /imgur\.com\/gallery\/([a-zA-Z0-9]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      const id = match[1];
      // Skip common words that aren't image IDs
      if (id && !['gallery', 'a', 'user', 'album'].includes(id)) {
        return id;
      }
    }
  }
  
  return null;
}

// Function to check if URL is Imgur
function isImgurUrl(url: string): boolean {
  return Boolean(url && (url.includes('imgur.com') || url.includes('i.imgur.com')));
}

// Function to process Imgur URL
async function processImgurUrl(imgurUrl: string) {
  try {
    // Extract image ID from Imgur URL
    const imgurId = extractImgurId(imgurUrl);
    if (!imgurId) {
      throw new Error('Invalid Imgur URL');
    }

    // Create direct image URL (high quality)
    const directUrl = `https://i.imgur.com/${imgurId}.png`;
    
    // Create filenames
    const timestamp = Date.now();
    const originalFilename = `imgur-${imgurId}-${timestamp}.png`;
    const webpFilename = `imgur-${imgurId}-${timestamp}.webp`;
    
    const imgDir = path.join(process.cwd(), 'public/img');
    const originalPath = path.join(imgDir, originalFilename);
    const webpPath = path.join(imgDir, webpFilename);
    
    // Ensure img directory exists
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    // Download image
    await downloadImage(directUrl, originalPath);
    
    // Convert to WebP
    const result = await convertToWebP(originalPath, webpPath, 85);
    
    // Clean up original file
    fs.unlinkSync(originalPath);
    
    // Return the paths for database storage
    return {
      originalUrl: imgurUrl,
      localWebpPath: `/img/${webpFilename}`,
      localFallbackPath: `/img/${originalFilename}`,
      ...result
    };
    
  } catch (error) {
    console.error(`Error processing Imgur URL ${imgurUrl}:`, error);
    throw error;
  }
}

// Main function to process image URLs
async function processImageUrl(imageUrl: string) {
  if (!imageUrl) {
    return null;
  }
  
  if (isImgurUrl(imageUrl)) {
    return await processImgurUrl(imageUrl);
  } else {
    return {
      originalUrl: imageUrl,
      localWebpPath: imageUrl,
      localFallbackPath: imageUrl,
      savings: 0,
      originalSize: 0,
      webpSize: 0
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();
    
    if (!imageUrl) {
      console.error('❌ No imageUrl provided');
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    console.log(`🖼️ Processing image URL: ${imageUrl}`);
    
    try {
      const result = await processImageUrl(imageUrl);
      
      if (!result) {
        console.error('❌ processImageUrl returned null');
        return NextResponse.json(
          { error: 'Failed to process image URL' },
          { status: 500 }
        );
      }

      console.log(`✅ Successfully processed: ${imageUrl}`);
      console.log(`📊 WebP saved: ${result.localWebpPath}`);
      console.log(`💾 Size savings: ${result.savings}%`);

      return NextResponse.json({
        success: true,
        data: {
          originalUrl: result.originalUrl,
          webpPath: result.localWebpPath,
          fallbackPath: result.localFallbackPath,
          savings: result.savings,
          originalSize: result.originalSize,
          webpSize: result.webpSize
        }
      });
    } catch (processError: any) {
      console.error('❌ Error in processImageUrl:', processError);
      return NextResponse.json(
        { error: `Processing failed: ${processError.message}` },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: `API Error: ${error.message}` },
      { status: 500 }
    );
  }
}
