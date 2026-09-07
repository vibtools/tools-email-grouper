import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

function createIcon(size, isMaskable = false) {
  const png = new PNG({ width: size, height: size });
  const center = size / 2;
  const radius = isMaskable ? size / 2 : size * 0.45;
  const safeZoneRadius = size * 0.38;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;
      const dx = x - center;
      const dy = y - center;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Dark theme background #09090b
      let r = 9, g = 9, b = 11, a = 255;

      if (dist < safeZoneRadius) {
        // Inner circle with gradient towards indigo (#4f46e5 to #6366f1)
        const factor = (y / size);
        r = Math.round(30 + factor * 40);
        g = Math.round(27 + factor * 45);
        b = Math.round(75 + factor * 140);

        // Simple envelope glyph drawn in center
        const ex = Math.abs(dx);
        const ey = Math.abs(dy);
        const ew = size * 0.22;
        const eh = size * 0.16;

        if (ex <= ew && ey <= eh) {
          // Envelope outline or body
          if (ex >= ew - 3 || ey >= eh - 3) {
            r = 165; g = 180; b = 252; // #a5b4fc
          } else if (Math.abs(ey - (eh - (ex / ew) * eh)) < 4 && dy < 0) {
            // Fold line
            r = 199; g = 210; b = 254; // #c7d2fe
          } else {
            r = 79; g = 70; b = 229; // #4f46e5
          }
        }
      } else if (!isMaskable && dist > radius) {
        // Transparent outside rounded corners
        a = 0;
      }

      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }

  return PNG.sync.write(png);
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createIcon(192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createIcon(512));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createIcon(512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createIcon(180));

console.log('All PWA icons generated successfully!');
