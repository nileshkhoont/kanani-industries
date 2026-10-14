import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\online\\.gemini\\antigravity-ide\\brain\\4309bdd8-39f7-4c9a-96c7-2ff55079b34f';
const projectDir = 'd:\\Kanani Industries';

const mappings = [
  // Hero
  {
    src: 'hero_toor_dal_1791959941168.jpg',
    dest: 'public/images/hero/hero-1.jpg',
  },
  {
    src: 'dal_mill_bags_1791960493089.jpg',
    dest: 'public/images/hero/hero-2.jpg',
  },

  // Janap Toor - Savaj Brand
  {
    src: 'janap_toor_dal_1791960020650.jpg',
    dest: 'public/images/products/janap-toor-savaj/main.jpg',
  },
  {
    src: 'dal_macro_purity_1791960410626.jpg',
    dest: 'public/images/products/janap-toor-savaj/alt-1.jpg',
  },
  {
    src: 'gujarati_toor_dal_bowl_1791960614341.jpg',
    dest: 'public/images/products/janap-toor-savaj/alt-2.jpg',
  },

  // Varjin Toor - Ganesh Brand
  {
    src: 'varjin_toor_dal_1791960078400.jpg',
    dest: 'public/images/products/varjin-toor-ganesh/main.jpg',
  },
  {
    src: 'dal_macro_purity_1791960410626.jpg',
    dest: 'public/images/products/varjin-toor-ganesh/alt-1.jpg',
  },
  {
    src: 'dal_mill_bags_1791960493089.jpg',
    dest: 'public/images/products/varjin-toor-ganesh/alt-2.jpg',
  },

  // Bidian Toor - Nilkanth Brand
  {
    src: 'bidian_toor_dal_1791960252997.jpg',
    dest: 'public/images/products/bidian-toor-nilkanth/main.jpg',
  },
  {
    src: 'dal_macro_purity_1791960410626.jpg',
    dest: 'public/images/products/bidian-toor-nilkanth/alt-1.jpg',
  },
  {
    src: 'gujarati_toor_dal_bowl_1791960614341.jpg',
    dest: 'public/images/products/bidian-toor-nilkanth/alt-2.jpg',
  },

  // Rasdi Toor - Natural Brand
  {
    src: 'rasdi_toor_dal_1791960301232.jpg',
    dest: 'public/images/products/rasdi-toor-natural/main.jpg',
  },
  {
    src: 'dal_macro_purity_1791960410626.jpg',
    dest: 'public/images/products/rasdi-toor-natural/alt-1.jpg',
  },
  {
    src: 'dal_mill_bags_1791960493089.jpg',
    dest: 'public/images/products/rasdi-toor-natural/alt-2.jpg',
  },

  // Recipes
  {
    src: 'gujarati_toor_dal_bowl_1791960614341.jpg',
    dest: 'public/images/recipes/gujarati-dal.jpg',
  },
];

console.log('Copying Toor Dal authentic images...');
for (const m of mappings) {
  const fullSrc = path.join(brainDir, m.src);
  const fullDest = path.join(projectDir, m.dest);
  fs.mkdirSync(path.dirname(fullDest), { recursive: true });
  fs.copyFileSync(fullSrc, fullDest);
  console.log(`✓ Copied ${m.src} -> ${m.dest}`);
}
console.log('All Toor Dal images copied successfully!');
