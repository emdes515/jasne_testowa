const { chromium } = require('playwright-core');
const fs = require('fs');

async function deepInspect() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('has_seen_onboarding', 'true');
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('matura_quest_onboarding_completed', 'true');
    localStorage.setItem('matura_quest_user_state', JSON.stringify({
      uid: 'audit-user-001',
      coins: 450,
      hearts: 5,
      maxHearts: 5,
      level: 4,
      xp: 3420,
      streakDays: 14,
      lastStreakDate: new Date().toISOString().split('T')[0],
      streakActiveDates: [new Date().toISOString().split('T')[0]],
      completed_lessons: ['dzial-1/lesson-1-1'],
      completedTasks: ['LESSON-lesson-1-1'],
      maturaBestScore: 78
    }));
    localStorage.setItem('matura_quest_selected_subject', 'math');
    localStorage.removeItem('jasne_active_session_v1');
  });
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // 1. Inspect Header children widths
  const headerAudit = await page.evaluate(() => {
    const header = document.querySelector('header');
    if (!header) return null;
    const children = Array.from(header.children).map(child => {
      const rect = child.getBoundingClientRect();
      return {
        tag: child.tagName,
        className: child.className.slice(0, 80),
        width: rect.width,
        scrollWidth: child.scrollWidth,
        subChildren: Array.from(child.children).map(sub => ({
          tag: sub.tagName,
          className: sub.className.slice(0, 60),
          width: sub.getBoundingClientRect().width,
          scrollWidth: sub.scrollWidth,
          text: sub.innerText?.slice(0, 30)
        }))
      };
    });
    return {
      headerClientWidth: header.clientWidth,
      headerScrollWidth: header.scrollWidth,
      children
    };
  });

  // 2. Inspect Hero Card and Exam Center Card overflow causes
  const cardsAudit = await page.evaluate(() => {
    const overflowCards = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 5) {
        const rect = el.getBoundingClientRect();
        overflowCards.push({
          tag: el.tagName,
          id: el.id,
          className: el.className ? el.className.toString().slice(0, 100) : '',
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          width: rect.width,
          childrenOverflowing: Array.from(el.children).filter(c => c.scrollWidth > el.clientWidth).map(c => ({
            tag: c.tagName,
            className: c.className ? c.className.toString().slice(0, 80) : '',
            clientWidth: c.clientWidth,
            scrollWidth: c.scrollWidth,
            text: c.innerText?.slice(0, 40)
          }))
        });
      }
    });
    return overflowCards;
  });

  // 3. Inspect Typography and Font Sizes across the page
  const typoAudit = await page.evaluate(() => {
    const fontSizes = {};
    const fontFamilies = {};
    const colors = {};
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && el.innerText && el.innerText.trim().length > 0) {
        const style = window.getComputedStyle(el);
        const fSize = style.fontSize;
        const fFamily = style.fontFamily;
        const col = style.color;
        fontSizes[fSize] = (fontSizes[fSize] || 0) + 1;
        fontFamilies[fFamily] = (fontFamilies[fFamily] || 0) + 1;
        colors[col] = (colors[col] || 0) + 1;
      }
    });
    return { fontSizes, fontFamilies, colors };
  });

  console.log('HEADER AUDIT:', JSON.stringify(headerAudit, null, 2));
  console.log('OVERFLOW CARDS:', JSON.stringify(cardsAudit.slice(0, 8), null, 2));
  console.log('TYPO AUDIT:', JSON.stringify(typoAudit, null, 2));

  await browser.close();
}

deepInspect();
