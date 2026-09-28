const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.resolve(__dirname, '..', 'audit_screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function runAudit() {
  console.log('Launching browser for mobile QA audit (390 x 844)...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:3001...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Initial page screenshot
    await page.screenshot({ path: path.join(screenshotsDir, '01_home_mobile.png') });
    console.log('Home page loaded, screenshot saved.');

    // Let's inspect available buttons/topics or directly navigate to a lesson
    // Let's see if we can click on a topic or use curriculum store/navigation
    const content = await page.content();
    console.log('Page title:', await page.title());

    // Look for topic cards or buttons
    const buttons = await page.$$eval('button, a', els => els.map(e => ({ text: e.innerText?.trim(), role: e.getAttribute('role') })));
    console.log('Found elements:', buttons.slice(0, 10));

    // Let's look for Dział 10 or Dział 12 in the DOM
    const topicLinks = await page.$$('text=Funkcja liniowa');
    if (topicLinks.length > 0) {
      console.log('Found Funkcja liniowa link, clicking...');
      await topicLinks[0].click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, '02_dzial_10_clicked.png') });
    }

    // Let's check localStorage or directly trigger lesson in SessionRunner via URL or UI
    console.log('Current URL:', page.url());

    // Let's test direct session or interactive buttons
    const startLessonBtn = await page.$('button:has-text("Rozpocznij"), button:has-text("Ucz się"), button:has-text("Trening"), button:has-text("Start")');
    if (startLessonBtn) {
      await startLessonBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(screenshotsDir, '03_lesson_started.png') });
    }

    // Now let's test specific lesson directly by setting state in localStorage or rendering TaskView
    console.log('Audit completed successfully.');
  } catch (err) {
    console.error('Audit error:', err);
  } finally {
    await browser.close();
  }
}

runAudit();
