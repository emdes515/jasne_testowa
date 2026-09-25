const { chromium } = require('playwright-core');

async function test() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true
  });
  
  await page.addInitScript(() => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('jasne_user_prefs', JSON.stringify({ goal: 'pass', mathLevel: 'basic' }));
    localStorage.setItem('seen_promo_guest', 'true');
    localStorage.setItem('streakDays', '7');
    localStorage.setItem('hearts', '5');
  });

  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 15000 });
  console.log('Page title:', await page.title());
  await browser.close();
  console.log('Playwright test passed!');
}

test().catch(err => {
  console.error('Playwright error:', err);
  process.exit(1);
});
