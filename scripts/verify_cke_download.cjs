const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', 'baza_cke_matematyka');
const manifestPath = path.join(ROOT_DIR, 'manifest.json');

function verify() {
  console.log(`Verifying downloaded materials in ${ROOT_DIR}...`);
  if (!fs.existsSync(manifestPath)) {
    console.error('Missing manifest.json!');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  console.log(`Total items in manifest: ${manifest.length}`);

  let errors = 0;
  let totalBytes = 0;

  for (const item of manifest) {
    const fullPath = path.join(ROOT_DIR, item.filename);
    if (!fs.existsSync(fullPath)) {
      console.error(`[ERROR] File missing: ${item.filename}`);
      errors++;
      continue;
    }

    const stat = fs.statSync(fullPath);
    totalBytes += stat.size;

    if (stat.size < 10000) {
      console.error(`[ERROR] File too small (${stat.size} bytes): ${item.filename}`);
      errors++;
      continue;
    }

    // Check PDF header
    const head = Buffer.alloc(5);
    const fd = fs.openSync(fullPath, 'r');
    fs.readSync(fd, head, 0, 5, 0);
    fs.closeSync(fd);

    if (!head.toString().startsWith('%PDF')) {
      console.error(`[ERROR] Invalid PDF header in: ${item.filename}`);
      errors++;
      continue;
    }
  }

  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`\n========================================`);
  console.log(`Total verified files: ${manifest.length - errors}/${manifest.length}`);
  console.log(`Total database size: ${totalMB} MB`);
  console.log(`Errors found: ${errors}`);
  if (errors > 0) {
    process.exit(1);
  } else {
    console.log(`ALL FILES VERIFIED SUCCESSFULLY!`);
  }
}

verify();
