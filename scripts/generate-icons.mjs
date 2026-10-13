import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const brandDir = path.join(rootDir, 'public', 'brand');
const logoPath = path.join(brandDir, 'kanani-logo.png');

async function generateBrandAssets() {
  console.log('Generating brand assets and icons...');

  if (!fs.existsSync(logoPath)) {
    console.error('Logo file not found at:', logoPath);
    process.exit(1);
  }

  // 1. Read logo into buffer to prevent file lock
  const inputBuffer = fs.readFileSync(logoPath);
  const logoBuffer = await sharp(inputBuffer).png().toBuffer();
  fs.writeFileSync(logoPath, logoBuffer);

  // 2. Generate transparent logo version:
  // Detect near-white/cream background pixels (e.g. r > 235, g > 235, b > 235) and make transparent
  const { data, info } = await sharp(logoBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const transparentData = Buffer.from(data);
  for (let i = 0; i < transparentData.length; i += 4) {
    const r = transparentData[i];
    const g = transparentData[i + 1];
    const b = transparentData[i + 2];
    // Background is near white/light-cream
    if (r > 232 && g > 232 && b > 230) {
      // Fade alpha if very close to white
      const minVal = Math.min(r, g, b);
      if (minVal > 245) {
        transparentData[i + 3] = 0; // Fully transparent
      } else {
        const factor = (245 - minVal) / 13;
        transparentData[i + 3] = Math.round(255 * factor);
      }
    }
  }

  const transparentLogoPath = path.join(brandDir, 'kanani-logo-transparent.png');
  await sharp(transparentData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(transparentLogoPath);
  console.log('Created transparent logo:', transparentLogoPath);

  // 3. Generate icon.png (512x512)
  const icon512Path = path.join(rootDir, 'public', 'icon.png');
  const appIcon512 = path.join(rootDir, 'src', 'app', 'icon.png');
  await sharp(logoBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 246, g: 249, b: 242, alpha: 1 } })
    .png()
    .toFile(icon512Path);
  if (fs.existsSync(path.dirname(appIcon512))) {
    fs.copyFileSync(icon512Path, appIcon512);
  }
  console.log('Created 512x512 icon');

  // 4. Generate apple-icon.png (180x180)
  const appleIconPath = path.join(rootDir, 'public', 'apple-icon.png');
  const appAppleIcon = path.join(rootDir, 'src', 'app', 'apple-icon.png');
  await sharp(logoBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 246, g: 249, b: 242, alpha: 1 } })
    .png()
    .toFile(appleIconPath);
  if (fs.existsSync(path.dirname(appAppleIcon))) {
    fs.copyFileSync(appleIconPath, appAppleIcon);
  }
  console.log('Created 180x180 apple icon');

  // 5. Generate favicon.ico (32x32 / 48x48 icon)
  const faviconPath = path.join(rootDir, 'public', 'favicon.ico');
  const appFavicon = path.join(rootDir, 'src', 'app', 'favicon.ico');
  await sharp(logoBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 246, g: 249, b: 242, alpha: 1 } })
    .toFormat('png')
    .toFile(faviconPath);
  if (fs.existsSync(path.dirname(appFavicon))) {
    fs.copyFileSync(faviconPath, appFavicon);
  }
  console.log('Created favicon');

  // 6. Generate Open Graph Image (1200x630)
  // Centered logo on brand gradient (navy #0A2A5A -> #0E3B7D -> #3E9B2F)
  const ogWidth = 1200;
  const ogHeight = 630;

  // Create SVG background with gradient and brand text
  const svgBackground = `
    <svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A2A5A" />
          <stop offset="60%" stop-color="#0E3B7D" />
          <stop offset="100%" stop-color="#2C7522" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#E8B23A" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#0E3B7D" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#brandGrad)" />
      <circle cx="600" cy="315" r="400" fill="url(#goldGlow)" />
      
      <!-- Card for logo -->
      <rect x="425" y="60" width="350" height="350" rx="36" fill="#F6F9F2" filter="drop-shadow(0 20px 40px rgba(0,0,0,0.35))" />

      <!-- Typography -->
      <text x="600" y="480" font-family="'Montserrat', sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">KANANI INDUSTRIES</text>
      <text x="600" y="530" font-family="'Plus Jakarta Sans', sans-serif" font-size="22" font-weight="600" fill="#E8B23A" text-anchor="middle" letter-spacing="4">SORTEX TOOR TRADING | IMPORT &amp; EXPORT</text>
      <text x="600" y="575" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500" fill="#CAD8EC" text-anchor="middle" letter-spacing="1">Gujarat, India &#8226; Premium Quality Pigeon Peas &#8226; Global Bulk Supply</text>
    </svg>
  `;

  // Resize logo for the card
  const resizedLogo = await sharp(logoBuffer)
    .resize(290, 290, { fit: 'contain', background: { r: 246, g: 249, b: 242, alpha: 0 } })
    .toBuffer();

  const ogBuffer = await sharp(Buffer.from(svgBackground))
    .composite([
      {
        input: resizedLogo,
        top: 90,
        left: 455,
      },
    ])
    .png()
    .toFile(path.join(brandDir, 'og-image.png'));

  // Also copy to public/og-image.png and src/app/opengraph-image.png
  fs.copyFileSync(path.join(brandDir, 'og-image.png'), path.join(rootDir, 'public', 'og-image.png'));
  const appOg = path.join(rootDir, 'src', 'app', 'opengraph-image.png');
  if (fs.existsSync(path.dirname(appOg))) {
    fs.copyFileSync(path.join(brandDir, 'og-image.png'), appOg);
  }

  console.log('Created OG image (1200x630)');
  console.log('Brand assets generation finished successfully!');
}

generateBrandAssets().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
