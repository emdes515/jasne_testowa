const { chromium } = require('playwright-core');

async function inspectHero() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);

  const heroDetails = await page.evaluate(() => {
    const hero = document.querySelector('button#dashboard-resume-learning-button')?.closest('.bg-surface-card');
    if (!hero) return 'hero not found';
    const all = Array.from(hero.querySelectorAll('*')).map(el => {
      if (el.scrollWidth > hero.clientWidth) {
        return {
          tag: el.tagName,
          id: el.id,
          className: el.className?.slice?.(0, 80),
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          innerText: el.innerText?.slice(0, 40)
        };
      }
      return null;
    }).filter(Boolean);
    return {
      heroClientWidth: hero.clientWidth,
      heroScrollWidth: hero.scrollWidth,
      elementsExceeding: all
    };
  });

  const examDetails = await page.evaluate(() => {
    const examBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Centrum Egzaminacyjne'));
    const examCard = examBtn?.closest('.bg-surface-card');
    if (!examCard) return 'examCard not found';
    const all = Array.from(examCard.querySelectorAll('*')).map(el => {
      if (el.scrollWidth > examCard.clientWidth) {
        return {
          tag: el.tagName,
          id: el.id,
          className: el.className?.slice?.(0, 80),
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          innerText: el.innerText?.slice(0, 40)
        };
      }
      return null;
    }).filter(Boolean);
    return {
      examClientWidth: examCard.clientWidth,
      examScrollWidth: examCard.scrollWidth,
      elementsExceeding: all
    };
  });

  console.log('HERO DETAILS:', JSON.stringify(heroDetails, null, 2));
  console.log('EXAM DETAILS:', JSON.stringify(examDetails, null, 2));

  await browser.close();
}

inspectHero();
