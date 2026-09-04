const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const now = new Date();
const pad = value => String(value).padStart(2, '0');
const generatedVersion = [
  now.getFullYear(),
  pad(now.getMonth() + 1),
  pad(now.getDate())
].join('') + '.' + pad(now.getHours()) + pad(now.getMinutes());
const version = process.argv[2] || generatedVersion;

for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  const updated = content
    .replace(/href="style\.css(?:\?v=[^"]+)?"/g, `href="style.css?v=${version}"`)
    .replace(/src="header\.js(?:\?v=[^"]+)?"/g, `src="header.js?v=${version}"`)
    .replace(/src="hero-slider\.js(?:\?v=[^"]+)?"/g, `src="hero-slider.js?v=${version}"`);
  
  if (updated !== content) {
    fs.writeFileSync(p, updated, 'utf8');
    console.log(`Updated cache buster in ${file}`);
  }
}

console.log(`Asset version: ${version}`);
