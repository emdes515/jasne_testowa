const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = path.resolve('C:\\Users\\mateu\\.gemini\\antigravity\\brain\\ee8891ce-a8fe-4647-b66e-13abf120b14f');

async function run() {
  console.log('=== PLAYWRIGHT E2E AUDIT: MATH VISUALS & SVG METRICS (iPhone 390x844) ===');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  try {
    // 1. Otwórz aplikację i bypass onboarding
    await page.addInitScript(() => {
      localStorage.setItem('hasCompletedOnboarding', 'true');
      localStorage.setItem('jasne_user_prefs', JSON.stringify({ goal: 'pass', mathLevel: 'basic' }));
      localStorage.setItem('seen_promo_guest', 'true');
    });

    console.log('Nawigacja do http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Zamknij ewentualny modal powitalny
    const closeBtn = page.locator('button:has-text("Rozpocznij"), button:has-text("Zamknij"), button[aria-label="Close"]');
    if (await closeBtn.count() > 0) {
      try { await closeBtn.first().click({ timeout: 2000 }); } catch (e) {}
    }

    // 2. Przejdź do zakładki Nauka
    console.log('Kliknięcie zakładki Nauka...');
    const naukaTab = page.locator('button:has-text("Nauka"), nav button:has-text("Nauka")').first();
    if (await naukaTab.isVisible()) {
      await naukaTab.click();
      await page.waitForTimeout(1500);
    }

    // Zrób zrzut widoku nauki
    const learnScreenshot = path.join(ARTIFACTS_DIR, 'playwright_learn_view.png');
    await page.screenshot({ path: learnScreenshot });
    console.log(`Zapisano zrzut widoku nauki: ${learnScreenshot}`);

    // 3. Znajdź i rozwiń Dział 7 (Ciągi)
    console.log('Szukanie Działu 7 (Ciągi)...');
    const topic7 = page.locator('text=Ciągi').first();
    if (await topic7.isVisible()) {
      await topic7.click();
      await page.waitForTimeout(1000);
    } else {
      console.log('Nie znaleziono bezpośrednio tekstu "Ciągi", sprawdzam kafelki...');
      const topicCard = page.locator('div:has-text("Dział 7"), div:has-text("Ciągi")').first();
      if (await topicCard.isVisible()) {
        await topicCard.click();
        await page.waitForTimeout(1000);
      }
    }

    // 4. Kliknij w Lekcję 7.15 (Zadania dowodowe z ciągów)
    console.log('Szukanie Lekcji 7.15...');
    const lesson15 = page.locator('text=Zadania dowodowe z ciągów, text=7.15, text=Dowodowe').first();
    if (await lesson15.isVisible()) {
      console.log('Znaleziono Lekcję 7.15, klikam...');
      await lesson15.click();
      await page.waitForTimeout(2500);
    } else {
      console.log('Szukanie po tekście lekcji w liście...');
      const anyLesson = page.locator('button:has-text("Rozpocznij lekcję"), div:has-text("7.15")').first();
      if (await anyLesson.isVisible()) {
        await anyLesson.click();
        await page.waitForTimeout(2500);
      }
    }

    // Sprawdź czy otworzył się widok lekcji / pigułki Bento
    const theoryHeader = page.locator('text=WPROWADZENIE DO LEKCJI, text=Wprowadzenie do lekcji, text=Istota pojęcia, text=Przejdź do zadań').first();
    if (await theoryHeader.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('Pomyślnie otwarto pigułkę Bento lekcji!');

      // Zrób zrzut Tab 0 (Istota pojęcia)
      const tab0Path = path.join(ARTIFACTS_DIR, 'lesson_7_15_tab0_istota.png');
      await page.screenshot({ path: tab0Path });
      console.log(`Zapisano zrzut Tab 0: ${tab0Path}`);

      // Przełącz na Tab 1 (Wzory)
      const tab1Btn = page.locator('button:has-text("Wzory"), button:has-text("Zależności")').first();
      if (await tab1Btn.isVisible()) {
        await tab1Btn.click();
        await page.waitForTimeout(1000);
        const tab1Path = path.join(ARTIFACTS_DIR, 'lesson_7_15_tab1_wzory.png');
        await page.screenshot({ path: tab1Path });
        console.log(`Zapisano zrzut Tab 1: ${tab1Path}`);
      }

      // Przełącz na Tab 2 (Przykład)
      const tab2Btn = page.locator('button:has-text("Przykład")').first();
      if (await tab2Btn.isVisible()) {
        await tab2Btn.click();
        await page.waitForTimeout(1000);
        const tab2Path = path.join(ARTIFACTS_DIR, 'lesson_7_15_tab2_przyklad.png');
        await page.screenshot({ path: tab2Path });
        console.log(`Zapisano zrzut Tab 2: ${tab2Path}`);
      }

      // Przełącz na Tab 3 (Typowy błąd / Pułapka CKE)
      const tab3Btn = page.locator('button:has-text("Typowy błąd"), button:has-text("Pułapka")').first();
      if (await tab3Btn.isVisible()) {
        await tab3Btn.click();
        await page.waitForTimeout(1000);
        const tab3Path = path.join(ARTIFACTS_DIR, 'lesson_7_15_tab3_typowy_blad.png');
        await page.screenshot({ path: tab3Path });
        console.log(`Zapisano zrzut Tab 3: ${tab3Path}`);
      }
    } else {
      console.log('Nie widać bezpośrednio nagłówka pigułki, robię zrzut stanu obecnego...');
      const fallbackPath = path.join(ARTIFACTS_DIR, 'playwright_current_state.png');
      await page.screenshot({ path: fallbackPath });
      console.log(`Zapisano zrzut stanu: ${fallbackPath}`);
    }

    console.log('=== ZAKOŃCZONO AUDYT PLAYWRIGHT ===');

  } catch (err) {
    console.error('Błąd podczas testu Playwright:', err);
  } finally {
    await browser.close();
  }
}

run();
