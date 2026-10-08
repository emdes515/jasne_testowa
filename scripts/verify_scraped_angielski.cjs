const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '..', 'matura_angielski_podstawowy');

function checkDir(dir) {
  let count = 0;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      count += checkDir(full);
    } else if (item.name.endsWith('.pdf')) {
      const buf = Buffer.alloc(5);
      const fd = fs.openSync(full, 'r');
      fs.readSync(fd, buf, 0, 5, 0);
      fs.closeSync(fd);
      const header = buf.toString('utf8');
      if (!header.startsWith('%PDF')) {
        console.error('INVALID PDF:', full, header);
      } else {
        count++;
      }
    } else if (item.name.endsWith('.mp3')) {
      const stat = fs.statSync(full);
      if (stat.size < 500000) {
        console.error('SUSPICIOUS MP3 SIZE:', full, stat.size);
      } else {
        count++;
      }
    }
  }
  return count;
}

const totalValid = checkDir(base);
console.log('Total verified valid files (PDF / MP3):', totalValid);

const manifest = JSON.parse(fs.readFileSync(path.join(base, 'manifest.json'), 'utf8'));
console.log('Sessions in manifest:', manifest.sessions.length);
manifest.sessions.forEach(s => {
  console.log(` - ${s.name}: ${s.files.length} plików (${s.folder})`);
});
