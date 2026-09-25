const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.resolve(__dirname, '..', 'audit_screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function auditBrowser() {
  console.log('===============================================================');
  console.log('  🔍 BROWSER QA: AUDYT DIAGRAMÓW, WZORÓW I CKE (DZIAŁY 13–21)  ');
  console.log('  Target: Mobile Viewport 390x844 (iPhone 14/15)               ');
  console.log('===============================================================\n');

  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();

  // Pre-seed localStorage to bypass onboarding, suppress promo modals, set tab to 'learn'
  await page.addInitScript(() => {
    localStorage.setItem('matura_quest_onboarding_completed', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('jasne_user_prefs', JSON.stringify({ goal: 'pass', mathLevel: 'basic' }));
    localStorage.setItem('jasne_guest_promo_modal_seen', 'true');
    localStorage.setItem('jasne_guest_promo_start', '0');
    localStorage.setItem('seen_promo_guest', 'true');
    localStorage.setItem('streakDays', '7');
    localStorage.setItem('hearts', '5');
    localStorage.setItem('jasne_hearts_v2', JSON.stringify({ hearts: 5, lastRefillTime: Date.now(), isPro: false }));
    localStorage.setItem('matura_quest_guest_user', JSON.stringify({
      streakDays: 7,
      hasCompletedOnboarding: true,
      hearts: 5,
      maxHearts: 5,
      coins: 100,
      xp: 500
    }));
    localStorage.setItem('jasne_active_tab_v1', 'learn');
    localStorage.setItem('matura_quest_selected_subject', 'math');
    localStorage.setItem('matura_quest_last_viewed', JSON.stringify({ viewState: 'topics', topicIndex: 0 }));
  });

  console.log('1. Ładowanie aplikacji http://127.0.0.1:3001...');
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(2000);

  // Suppress any open modal if needed
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  // Take screenshot of LearnView topics list
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_learn_topics_list.png') });
  console.log('   📸 Zapisano widok listy działów: 01_learn_topics_list.png');

  const targetTopics = [
    { num: 13, name: 'Przekształcenia wykresów', expectedCkePages: ['brak'] },
    { num: 14, name: 'Trygonometria', expectedCkePages: ['10', '12', '13', '15'] },
    { num: 15, name: 'Planimetria – Trójkąty', expectedCkePages: ['15', '16', '17'] },
    { num: 16, name: 'Czworokąty oraz Okrąg', expectedCkePages: ['15', '17', '18', '19', '20'] },
    { num: 17, name: 'Geometria Analityczna', expectedCkePages: ['21', '22', '23'] },
    { num: 18, name: 'Stereometria', expectedCkePages: ['24', '25', '26'] },
    { num: 19, name: 'Kombinatoryka', expectedCkePages: ['26', '27', '28'] },
    { num: 20, name: 'Statystyka', expectedCkePages: ['29', '30'] },
    { num: 21, name: 'Optymalizacyjne', expectedCkePages: ['7', '8'] }
  ];

  const auditResults = [];

  for (const t of targetTopics) {
    console.log(`\n---------------------------------------------------------------`);
    console.log(`▶ AUDYT DZIAŁU ${t.num}: ${t.name}`);
    console.log(`---------------------------------------------------------------`);

    // Ensure we are on topics view
    const backBtn = page.locator('#lessons-back-button');
    if (await backBtn.isVisible().catch(() => false)) {
      await backBtn.click();
      await page.waitForTimeout(600);
    }

    // Try clicking "Pokaż wszystkie działy" if sentinel button exists
    const showAllBtn = page.locator('button:has-text("Pokaż wszystkie działy")').first();
    if (await showAllBtn.isVisible().catch(() => false)) {
      await showAllBtn.click();
      await page.waitForTimeout(500);
    }

    // Strictly match by ID first, fallback to regex-anchored DZIAŁ N button
    let topicMatcher = page.locator(`#topic-card-dzial-${t.num}`).first();
    let isTopicVisible = await topicMatcher.isVisible({ timeout: 2000 }).catch(() => false);

    if (!isTopicVisible) {
      topicMatcher = page.locator('button').filter({ hasText: new RegExp(`DZIAŁ\\s+${t.num}\\b`, 'i') }).first();
    }

    await topicMatcher.scrollIntoViewIfNeeded().catch(() => {});
    await page.waitForTimeout(300);

    if (await topicMatcher.isVisible().catch(() => false)) {
      await topicMatcher.click();
      await page.waitForTimeout(1000);
      console.log(`   ✓ Kliknięto kartę Działu ${t.num} -> przejście do listy lekcji`);
    } else {
      console.log(`   ⚠️ Nie znaleziono przycisku Działu ${t.num} bezpośrednio w DOM.`);
      continue;
    }

    // Now on lessons view. Find start button for first lesson
    const startLessonBtn = page.locator('button[id^="start-lesson-btn-"], button[id^="repeat-lesson-btn-"]').first();
    const canStart = await startLessonBtn.isVisible({ timeout: 3000 }).catch(() => false);

    if (!canStart) {
      console.log(`   ⚠️ Brak aktywnego przycisku lekcji w Dziale ${t.num}`);
      if (await backBtn.isVisible().catch(() => false)) await backBtn.click();
      continue;
    }

    await startLessonBtn.click();
    await page.waitForTimeout(1500);
    console.log(`   ✓ Uruchomiono SessionRunner dla Działu ${t.num}`);

    // Verify Bento Tabs using exact aria-label selectors
    const tabs = ['Istota', 'Wzory', 'Przykład', 'Typowy błąd'];
    const topicAudit = {
      topicNum: t.num,
      name: t.name,
      hasDiagram: false,
      diagramValid: false,
      ckePages: [],
      noSigmas: true,
      noLogicSymbols: true,
      noOverflow: true
    };

    for (let tabIdx = 0; tabIdx < tabs.length; tabIdx++) {
      const tabName = tabs[tabIdx];
      const tabBtn = page.locator(`button[aria-label="Przejdź do zakładki: ${tabName}"]`).first();
      if (await tabBtn.isVisible().catch(() => false)) {
        await tabBtn.click();
        await page.waitForTimeout(400);

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        if (overflow) topicAudit.noOverflow = false;

        // Check Tab 0: Istota
        if (tabIdx === 0) {
          const svgLocator = page.locator('svg.w-full, svg.math-diagram, svg[viewBox]').first();
          const svgPresent = await svgLocator.isVisible().catch(() => false);
          topicAudit.hasDiagram = svgPresent;

          if (svgPresent) {
            const svgValid = await svgLocator.evaluate(svg => {
              const rect = svg.getBoundingClientRect();
              const hasElements = svg.querySelectorAll('path, line, circle, rect, text').length > 0;
              return rect.width > 100 && rect.height > 50 && hasElements;
            }).catch(() => false);
            topicAudit.diagramValid = svgValid;
          }

          // Screenshot Tab 0
          await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `dzial_${t.num}_tab0_istota.png`) });
          console.log(`     [Tab 0 Istota]: Diagram SVG: ${svgPresent ? '✓ Wyrenderowany' : '– (Brak SVG)'} | Screenshot zapisany.`);
        }

        // Check Tab 1: Wzory
        if (tabIdx === 1) {
          const ckeBadges = await page.locator('span:has-text("Karta wzorów:"), span:has-text("Brak w tablicach")').allTextContents();
          topicAudit.ckePages = ckeBadges.map(b => b.trim());
          console.log(`     [Tab 1 Wzory]: Odnalezione adnotacje CKE (${ckeBadges.length}):`, ckeBadges.slice(0, 3).join(' | '));

          // Check for forbidden academic symbols in visible text
          const forbiddenCheck = await page.evaluate(() => {
            const text = document.getElementById('session-theory-pill-content')?.innerText || '';
            const hasSigma = text.includes('∑') || text.includes('Σ');
            const hasImplies = text.includes('⟹') || text.includes('⇒') || text.includes('\\implies');
            const hasIff = text.includes('⟺') || text.includes('⇔') || text.includes('\\iff');
            return { hasSigma, hasImplies, hasIff };
          });

          if (forbiddenCheck.hasSigma) topicAudit.noSigmas = false;
          if (forbiddenCheck.hasImplies || forbiddenCheck.hasIff) topicAudit.noLogicSymbols = false;

          await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `dzial_${t.num}_tab1_wzory.png`) });
        }

        // Check Tab 2: Przykład
        if (tabIdx === 2) {
          const formulas = await page.locator('.katex').count();
          console.log(`     [Tab 2 Przykład]: Znaleziono ${formulas} elementów KaTeX.`);
        }

        // Check Tab 3: Typowy błąd
        if (tabIdx === 3) {
          const alertBox = await page.locator('div:has-text("Pułapka CKE"), div:has-text("Uwaga"), div:has-text("Błąd")').count();
          console.log(`     [Tab 3 Typowy błąd]: Sekcja alertu/pułapki CKE aktywna (${alertBox > 0 ? '✓' : '–'}).`);
        }
      }
    }

    auditResults.push(topicAudit);

    // Exit session using exact IDs
    const exitBtn = page.locator('#session-exit-button');
    if (await exitBtn.isVisible().catch(() => false)) {
      await exitBtn.click();
      await page.waitForTimeout(400);

      const quitBtn = page.locator('#session-modal-quit-button');
      if (await quitBtn.isVisible().catch(() => false)) {
        await quitBtn.click();
        await page.waitForTimeout(800);
      }
    } else {
      // Fallback reload to LearnView
      await page.goto('http://127.0.0.1:3001', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);
    }
  }

  console.log('\n===============================================================');
  console.log('  📊 PODSUMOWANIE AUDYTU BROWSER QA (DZIAŁY 13–21)             ');
  console.log('===============================================================');
  console.table(auditResults.map(r => ({
    Dział: r.topicNum,
    Nazwa: r.name.slice(0, 22),
    'Diagram SVG': r.hasDiagram ? (r.diagramValid ? '✓ Poprawny' : '⚠️ Błąd') : '–',
    'Brak Sigm': r.noSigmas ? '✓ TAK' : '❌ ZNALEZIONO',
    'Brak Logiki': r.noLogicSymbols ? '✓ TAK' : '❌ ZNALEZIONO',
    'Brak Overflow': r.noOverflow ? '✓ TAK' : '❌ OVERFLOW',
    'Strony CKE': r.ckePages.slice(0, 2).join(' | ') || 'Brak w tablicach'
  })));

  await browser.close();
}

auditBrowser().catch(err => {
  console.error('Błąd testu Playwright:', err);
  process.exit(1);
});
