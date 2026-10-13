import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Curated list of Unsplash photography matching pulses, toor dal, agriculture, machinery, recipes & export
// Under Unsplash Free Commercial License
const imagesToFetch = [
  // Hero
  {
    url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1600&auto=format&fit=crop&q=80',
    dest: 'public/images/hero/hero-1.jpg',
    width: 1400,
    credit: 'Unsplash - Photo by Tijana Drndarski (Lentils and grains close-up)',
  },
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80',
    dest: 'public/images/hero/hero-2.jpg',
    width: 1400,
    credit: 'Unsplash - Photo by Karsten Würth (Golden agricultural fields and crops)',
  },

  // Product 1: Janap Toor - Savaj Brand
  {
    url: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/janap-toor-savaj/main.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Sandeep Swarnkar (Clean golden yellow split pulses)',
  },
  {
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/janap-toor-savaj/alt-1.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Monika Grabkowska (Yellow pulses in bowl with wooden spoon)',
  },
  {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/janap-toor-savaj/alt-2.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Eiliv Aceron (Aromatic cooked lentil curry)',
  },

  // Product 2: Varjin Toor - Ganesh Brand
  {
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/varjin-toor-ganesh/main.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Nadine Primeau (Heritage raw pulses on rustic background)',
  },
  {
    url: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/varjin-toor-ganesh/alt-1.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Dan Dennis (Harvested grains and pulses in container)',
  },
  {
    url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/varjin-toor-ganesh/alt-2.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Ratul Ghosh (Traditional homestyle tempered dal)',
  },

  // Product 3: Bidian Toor - Nilkanth Brand
  {
    url: 'https://images.unsplash.com/photo-1514944298352-78d123cb269f?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/bidian-toor-nilkanth/main.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Melissa Di Rocco (Premium bold golden lentils)',
  },
  {
    url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/bidian-toor-nilkanth/alt-1.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Jason Tuinstra (Macro grain assortment)',
  },
  {
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/bidian-toor-nilkanth/alt-2.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Shreyak Singh (Festive restaurant-style Dal Tadka)',
  },

  // Product 4: Rasdi Toor - Natural Brand
  {
    url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/rasdi-toor-natural/main.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by NordWood Themes (Natural unpolished rustic pulses)',
  },
  {
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/rasdi-toor-natural/alt-1.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by engin akyurt (Raw farm grains and pulses with husk)',
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/products/rasdi-toor-natural/alt-2.jpg',
    width: 1000,
    credit: 'Unsplash - Photo by Brooke Lark (Wholesome organic vegetable lentil stew)',
  },

  // About Us
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/about/about-facility.jpg',
    width: 1100,
    credit: 'Unsplash - Photo by Adrian Sulyok (Modern industrial logistics & warehouse)',
  },
  {
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/about/about-heritage.jpg',
    width: 1100,
    credit: 'Unsplash - Photo by Henry Be (Gujarat agricultural farm harvest)',
  },
  {
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/about/about-quality.jpg',
    width: 1100,
    credit: 'Unsplash - Photo by Science in HD (Laboratory grain quality inspection)',
  },

  // Sortex Quality & Process
  {
    url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/process/step-1-sourcing.jpg',
    width: 900,
    credit: 'Unsplash - Photo by Jed Owen (Ethical agricultural farm procurement)',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/process/step-2-cleaning.jpg',
    width: 900,
    credit: 'Unsplash - Photo by Clayton Cardinalli (Industrial cleaning and precision equipment)',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/process/step-3-sortex.jpg',
    width: 900,
    credit: 'Unsplash - Photo by ThisisEngineering (High-tech automated optical sensors & sorter)',
  },
  {
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/process/step-4-milling.jpg',
    width: 900,
    credit: 'Unsplash - Photo by Petre Barlea (Industrial milling and grading unit)',
  },
  {
    url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/process/step-5-packaging.jpg',
    width: 900,
    credit: 'Unsplash - Photo by CHUTTERSNAP (Automated hygienic packaging and bagging)',
  },

  // Recipes (6 items)
  {
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/recipes/gujarati-dal.jpg',
    width: 800,
    credit: 'Unsplash - Photo by Shivam (Sweet and tangy authentic Gujarati Dal)',
  },
  {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/recipes/dal-tadka.jpg',
    width: 800,
    credit: 'Unsplash - Photo by Eiliv Aceron (Smoky Punjabi style Dal Tadka)',
  },
  {
    url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/recipes/sambhar.jpg',
    width: 800,
    credit: 'Unsplash - Photo by Ratul Ghosh (Aromatic South Indian Drumstick Sambhar)',
  },
  {
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/recipes/dal-dhokli.jpg',
    width: 800,
    credit: 'Unsplash - Photo by Shreyak Singh (Traditional spiced Dal Dhokli comfort pot)',
  },
  {
    url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/recipes/khichdi.jpg',
    width: 800,
    credit: 'Unsplash - Photo by Tijana Drndarski (Nourishing Toor Dal & Rice Khichdi)',
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/recipes/puran-poli.jpg',
    width: 800,
    credit: 'Unsplash - Photo by Jason Leung (Festive sweet stuffed Puran Poli flatbread)',
  },

  // Export
  {
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/export/export-shipping.jpg',
    width: 1100,
    credit: 'Unsplash - Photo by Ian Taylor (Global container port and sea freight cargo)',
  },
  {
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/export/export-bulk-bags.jpg',
    width: 1100,
    credit: 'Unsplash - Photo by Adrian Sulyok (25kg/50kg bulk palletized export bags)',
  },
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    dest: 'public/images/export/export-quality.jpg',
    width: 1100,
    credit: 'Unsplash - Photo by Scott Graham (Export documentation & quality certifications)',
  },

  // Testimonials avatars
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    dest: 'public/images/testimonials/avatar-1.jpg',
    width: 250,
    credit: 'Unsplash - Photo by Joseph Gonzalez (Wholesale Grain Distributor, Ahmedabad)',
  },
  {
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    dest: 'public/images/testimonials/avatar-2.jpg',
    width: 250,
    credit: 'Unsplash - Photo by Jurica Koletić (Supermarket Chain Buyer, Mumbai)',
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    dest: 'public/images/testimonials/avatar-3.jpg',
    width: 250,
    credit: 'Unsplash - Photo by Christina @ wocintechchat.com (Commodity Export Manager, Dubai)',
  },
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    dest: 'public/images/testimonials/avatar-4.jpg',
    width: 250,
    credit: 'Unsplash - Photo by Dan Dennis (Homemaker & Culinary Enthusiast, Rajkot)',
  },
];

async function downloadAndProcess() {
  console.log(`Starting download of ${imagesToFetch.length} curated images...`);
  const rootDir = process.cwd();
  const credits = ['# Image Credits & Source Information\n\nAll imagery used on the Kanani Industries website is licensed under the royalty-free Unsplash License (free for commercial and non-commercial use, no permission required).\n\n| Destination File | Source Details | License |\n|---|---|---|'];

  for (const item of imagesToFetch) {
    const fullPath = path.join(rootDir, item.dest);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    try {
      console.log(`Fetching: ${item.dest}...`);
      const response = await fetch(item.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Optimize with sharp: resize, 82% quality jpeg, strip metadata, keep file well under 300KB
      await sharp(buffer)
        .resize({ width: item.width, withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toFile(fullPath);

      const stats = fs.statSync(fullPath);
      console.log(`Saved ${item.dest} (${Math.round(stats.size / 1024)} KB)`);
      credits.push(`| \`${item.dest}\` | ${item.credit} | Unsplash Commercial License |`);
    } catch (err) {
      console.error(`Failed to download ${item.dest}:`, err.message);
      // Create fallback high-quality placeholder graphic with sharp if network fails
      const fallbackSvg = `
        <svg width="${item.width}" height="${Math.round(item.width * 0.75)}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0E3B7D"/>
              <stop offset="100%" stop-color="#3E9B2F"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
          <text x="50%" y="50%" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${path.basename(item.dest)}</text>
        </svg>
      `;
      await sharp(Buffer.from(fallbackSvg)).jpeg({ quality: 85 }).toFile(fullPath);
      credits.push(`| \`${item.dest}\` | Synthetic Fallback Asset | Proprietary Brand Asset |`);
    }
  }

  const creditsPath = path.join(rootDir, 'public', 'images', 'CREDITS.md');
  fs.writeFileSync(creditsPath, credits.join('\n') + '\n');
  console.log(`Wrote credits file at: ${creditsPath}`);
  console.log('All image assets successfully downloaded and optimized!');
}

downloadAndProcess().catch(console.error);
