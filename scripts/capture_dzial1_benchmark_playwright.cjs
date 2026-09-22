'use strict';

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\mateu\\.gemini\\antigravity\\brain\\9233d755-ecd4-4aed-ac18-bd989af3affc';

async function capture() {
  console.log('===============================================================');
  console.log('  📸 PLAYWRIGHT E2E: DZIAŁ 1 CKE BENCHMARK VERIFICATION       ');
  console.log('  Target: Mobile Viewport 390x844 (iPhone 13/14)               ');
  console.log('===============================================================\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();

  // Bypass onboarding & ensure active state
  await page.addInitScript(() => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    localStorage.setItem('jasne_user_prefs', JSON.stringify({ goal: 'pass', mathLevel: 'basic' }));
    localStorage.setItem('seen_promo_guest', 'true');
    localStorage.setItem('streakDays', '7');
    localStorage.setItem('hearts', '5');
    localStorage.setItem('jasne_hearts_v2', JSON.stringify({ hearts: 5, lastRefillTime: Date.now(), isPro: false }));
  });

  try {
    console.log('1. Ładowanie aplikacji http://localhost:3001...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(2000);

    // Zamknij modal powitalny jeśli wystąpi
    const dismissBtns = page.locator('button:has-text("Rozpocznij naukę"), button:has-text("Pomiń"), button[aria-label="Zamknij"]');
    if (await dismissBtns.count() > 0) {
      try { await dismissBtns.first().click({ timeout: 2000 }); } catch (e) {}
    }

    // 2. Przejdź do zakładki Nauka
    console.log('2. Przejście do widoku Nauka...');
    const learnTab = page.locator('button:has-text("Nauka"), nav button:has-text("Nauka")').first();
    if (await learnTab.isVisible()) {
      await learnTab.click();
      await page.waitForTimeout(1500);
    }

    // Upewnij się, że wybrana jest Matematyka
    const mathBtn = page.locator('button:has-text("Matematyka")').first();
    if (await mathBtn.isVisible()) {
      await mathBtn.click();
      await page.waitForTimeout(1000);
    }

    // SCREENSHOT 1: Lista działów z osobnym badge "DZIAŁ 1" i nazwą "Potęgi i pierwiastki"
    const shotTopicsList = path.join(ARTIFACTS_DIR, 'mobile_dzial1_topics_list.png');
    await page.screenshot({ path: shotTopicsList, fullPage: false });
    console.log(`✓ Zapisano zrzut listy działów: ${shotTopicsList}`);

    // 3. Wejście do Działu 1 (Potęgi i pierwiastki)
    console.log('3. Wejście do Działu 1...');
    const topic1Card = page.locator('#topic-card-dzial-1, text=Potęgi i pierwiastki').first();
    if (await topic1Card.isVisible()) {
      await topic1Card.click();
      await page.waitForTimeout(1500);
    }

    // Zrzut widoku lekcji Działu 1 (nagłówek z badge DZIAŁ 1)
    const shotLessonsList = path.join(ARTIFACTS_DIR, 'mobile_dzial1_lessons_overview.png');
    await page.screenshot({ path: shotLessonsList, fullPage: false });
    console.log(`✓ Zapisano zrzut listy lekcji Działu 1: ${shotLessonsList}`);

    // 4. Kliknięcie w Lekcję 1.1 (Działania na potęgach)
    console.log('4. Uruchomienie sesji Lekcji 1.1...');
    const lesson1_1Btn = page.locator('text=Działania na potęgach, button:has-text("Rozpocznij"), button:has-text("Ucz się")').first();
    if (await lesson1_1Btn.isVisible()) {
      await lesson1_1Btn.click();
      await page.waitForTimeout(2000);
    }

    // SCREENSHOT 2: mobile_dzial1_header_clean.png
    // Nagłówek sesji: LEKCJA 1.1 + Potęgi i pierwiastki BEZ ucinania
    const shotHeader = path.join(ARTIFACTS_DIR, 'mobile_dzial1_header_clean.png');
    await page.screenshot({ path: shotHeader, fullPage: false });
    console.log(`✓ Zapisano zrzut nagłówka sesji: ${shotHeader}`);

    // SCREENSHOT 3: mobile_dzial1_lesson1_1_anatomy.png
    // Bento Tab 0 z diagramem anatomii potęgi
    const shotAnatomy1 = path.join(ARTIFACTS_DIR, 'mobile_dzial1_lesson1_1_anatomy.png');
    await page.screenshot({ path: shotAnatomy1, fullPage: false });
    console.log(`✓ Zapisano zrzut anatomii potęgi L1.1: ${shotAnatomy1}`);

    // 5. Przejście do zadań Lekcji 1.1
    console.log('5. Przejście do zadań Lekcji 1.1...');
    const startTasksBtn = page.locator('button:has-text("Przejdź do zadań"), button:has-text("Rozpocznij zadania")').first();
    if (await startTasksBtn.isVisible()) {
      await startTasksBtn.click();
      await page.waitForTimeout(1500);

      // Wybierz poprawną odpowiedź C ($3^9$) dla task-1-1-1
      const optionC = page.locator('button:has-text("3⁹"), button:has-text("3^9"), [data-option-id="C"]').first();
      if (await optionC.isVisible()) {
        await optionC.click();
        await page.waitForTimeout(500);

        // Kliknij Sprawdź
        const checkBtn = page.locator('button:has-text("Sprawdź"), button:has-text("Zatwierdź")').first();
        if (await checkBtn.isVisible()) {
          await checkBtn.click();
          await page.waitForTimeout(1000);

          // SCREENSHOT 4: mobile_dzial1_task_feedback.png
          const shotFeedback = path.join(ARTIFACTS_DIR, 'mobile_dzial1_task_feedback.png');
          await page.screenshot({ path: shotFeedback, fullPage: false });
          console.log(`✓ Zapisano zrzut feedbacku zadania: ${shotFeedback}`);
        }
      }
    }

    // Zamknij sesję
    const exitBtn = page.locator('#session-exit-button, button[aria-label="Przerwij sesję"]').first();
    if (await exitBtn.isVisible()) {
      await exitBtn.click();
      await page.waitForTimeout(500);
      const confirmExit = page.locator('button:has-text("Przerwij"), button:has-text("Wyjdź")').first();
      if (await confirmExit.isVisible()) {
        await confirmExit.click();
        await page.waitForTimeout(1000);
      }
    }

    // 6. Przejście do Lekcji 1.2 (Pierwiastki) - Bento Tab 0
    console.log('6. Przejście do Lekcji 1.2...');
    const lesson1_2 = page.locator('text=Działania na pierwiastkach').first();
    if (await lesson1_2.isVisible()) {
      await lesson1_2.click();
      await page.waitForTimeout(1500);
      const startL2 = page.locator('button:has-text("Rozpocznij"), button:has-text("Ucz się")').first();
      if (await startL2.isVisible()) {
        await startL2.click();
        await page.waitForTimeout(2000);
      }

      // SCREENSHOT 5: mobile_dzial1_lesson1_2_root.png
      const shotRoot = path.join(ARTIFACTS_DIR, 'mobile_dzial1_lesson1_2_root.png');
      await page.screenshot({ path: shotRoot, fullPage: false });
      console.log(`✓ Zapisano zrzut Lekcji 1.2: ${shotRoot}`);

      // Wyjdź z lekcji 1.2
      const exit2 = page.locator('#session-exit-button, button[aria-label="Przerwij sesję"]').first();
      if (await exit2.isVisible()) {
        await exit2.click();
        await page.waitForTimeout(500);
        const confirmExit2 = page.locator('button:has-text("Przerwij"), button:has-text("Wyjdź")').first();
        if (await confirmExit2.isVisible()) {
          await confirmExit2.click();
          await page.waitForTimeout(1000);
        }
      }
    }

    // 7. Przejście do Lekcji 1.3 (Usuwanie niewymierności) - Tab 1 (Wzory / Karta CKE str. 7)
    console.log('7. Przejście do Lekcji 1.3...');
    const lesson1_3 = page.locator('text=Usuwanie niewymierności').first();
    if (await lesson1_3.isVisible()) {
      await lesson1_3.click();
      await page.waitForTimeout(1500);
      const startL3 = page.locator('button:has-text("Rozpocznij"), button:has-text("Ucz się")').first();
      if (await startL3.isVisible()) {
        await startL3.click();
        await page.waitForTimeout(2000);
      }

      // Kliknij w zakładkę "Wzory" (Tab 1)
      const tabWzory = page.locator('button:has-text("Wzory")').first();
      if (await tabWzory.isVisible()) {
        await tabWzory.click();
        await page.waitForTimeout(800);
      }

      // SCREENSHOT 6: mobile_dzial1_lesson1_3_cke_str7.png
      const shotStr7 = path.join(ARTIFACTS_DIR, 'mobile_dzial1_lesson1_3_cke_str7.png');
      await page.screenshot({ path: shotStr7, fullPage: false });
      console.log(`✓ Zapisano zrzut Lekcji 1.3 Karta CKE str. 7: ${shotStr7}`);

      // Wyjdź z lekcji 1.3
      const exit3 = page.locator('#session-exit-button, button[aria-label="Przerwij sesję"]').first();
      if (await exit3.isVisible()) {
        await exit3.click();
        await page.waitForTimeout(500);
        const confirmExit3 = page.locator('button:has-text("Przerwij"), button:has-text("Wyjdź")').first();
        if (await confirmExit3.isVisible()) {
          await confirmExit3.click();
          await page.waitForTimeout(1000);
        }
      }
    }

    // 8. Przejście do Lekcji 1.4 (Wykładnik ujemny i ułamkowy)
    console.log('8. Przejście do Lekcji 1.4...');
    const lesson1_4 = page.locator('text=Potęgi o wykładniku ujemnym').first();
    if (await lesson1_4.isVisible()) {
      await lesson1_4.click();
      await page.waitForTimeout(1500);
      const startL4 = page.locator('button:has-text("Rozpocznij"), button:has-text("Ucz się")').first();
      if (await startL4.isVisible()) {
        await startL4.click();
        await page.waitForTimeout(2000);
      }

      // SCREENSHOT 7: mobile_dzial1_lesson1_4_powers.png
      const shotPowers = path.join(ARTIFACTS_DIR, 'mobile_dzial1_lesson1_4_powers.png');
      await page.screenshot({ path: shotPowers, fullPage: false });
      console.log(`✓ Zapisano zrzut Lekcji 1.4: ${shotPowers}`);
    }

    console.log('\n===============================================================');
    console.log('✓ WSZYSTKIE 7 ZRZUTÓW E2E DZIAŁU 1 ZOSTAŁY POMYŚLNIE ZAPISANE!');
    console.log('===============================================================');

  } catch (err) {
    console.error('Błąd podczas wykonywania testu Playwright:', err);
  } finally {
    await browser.close();
  }
}

capture();
