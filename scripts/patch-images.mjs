import sharp from 'sharp';
import fs from 'fs';

const items = [
  {
    url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/products/janap-toor-savaj/main.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/products/bidian-toor-nilkanth/main.jpg',
  },
  {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&auto=format&fit=crop&q=80',
    dest: 'public/images/process/step-3-sortex.jpg',
  },
];

async function run() {
  for (const it of items) {
    const res = await fetch(it.url);
    if (!res.ok) {
      console.error(`Failed ${it.dest}: ${res.status}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (fs.existsSync(it.dest)) {
      fs.unlinkSync(it.dest);
    }
    await sharp(buf)
      .resize({ width: 1000, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(it.dest);
    console.log(`Successfully saved real photo: ${it.dest}`);
  }
}

run().catch(console.error);
