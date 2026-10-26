# Walkthrough: karta wzorów PR, ocena etapami i pilot działu 5

> Stan: 2026-10-22 · Gałąź `feat/matematyka-rozszerzona` · Plan: [`../PLAN_MATEMATYKA_ROZSZERZONA.md`](../PLAN_MATEMATYKA_ROZSZERZONA.md), etapy 2–4

## Co zostało zrobione

### Etap 2 – jedna karta wzorów PP + PR
- `src/data/ckeFormulasData.ts`: 15 wzorów PR (`level: 'PR'`) i nowy temat „Granice i Pochodne”. Strony sprawdzone w `wybrane_wzory_matematyczne_EM2023.pdf` (tekst + render stron 13 i 30).
- `withLocalCkeFormulas` / `withLocalCkeFormulaTopics`: katalog z Firestore (`system/ckeFormulas`) jest uzupełniany wzorami z paczki po `id`, a Firestore wygrywa przy konflikcie. Wzory PR widać od razu, bez zapisu do produkcyjnej bazy. Konsumenci: `CkeFormulasModal`, `SessionRunner`.
- Badge „Rozszerzenie” przy wzorach PR w `CkeFormulasModal`.
- `seed/curriculum/cke_formulas.json` zsynchronizowany (`node scripts/sync_cke_formulas.cjs`): 41 wzorów, 11 tematów.

### Etap 3 – model zadań i ocena etapami
- Typy (wstecznie zgodne, opcjonalne):
  - `RubricStage`;
  - `MathTaskItem.rubric_stages`, `zero_rules`, `bundle_id`, `requirements`;
  - `LessonDocument.prereq`, `requirements`.
- BFF:
  - `sanitizeRubricStages` w `server/aiRequest.ts`: maks. 8 etapów, kryterium do 600 znaków, progi ≤ `maxPoints`, sortowanie i usuwanie duplikatów. Bez tego `...body` przepuściłby surowe etapy do promptu.
  - Prompt (`buildEvaluationUserPrompt`) dostaje blok etapów i reguł zerujących.
  - `snapScoreToStage`: wynik AI jest zaokrąglany w dół do progu osiągniętego etapu.
  - Gdy AI nie odpowie, zadanie etapowe **nie** jest oceniane heurystyką słów kluczowych. Dostaje `provider: 'none'`, więc uczeń nie traci serca i może ocenić się sam.
- UI: `RubricSelfAssessment.tsx` – „Oceń się etapami CKE (bez AI)”.
  - Wybrany próg przechodzi tę samą ścieżkę co ocena AI (`handleScanAnimationComplete`): XP, monety, konfetti, bank błędów.
  - Uczciwe „0 pkt” w samoocenie nie zabiera serca, żeby nie opłacało się zawyżać wyniku.
- `SessionRunner`:
  - przekazuje `rubric_stages` / `zero_rules` do `/api/evaluate-task`;
  - `OPEN_CALCULATION` jest teraz rozpoznawany jako zadanie otwarte.

### Etap 4 – pilot: dział 5 „Parametr i wzory Viète’a”
- `scripts/math_pr/build.js` + `dzial_05.js` + `sets.js`. Konstruktor `open()` jest we wspólnym `scripts/math_pp/lib.js` (PP bez zmian w wyniku).
- 5 lekcji × 20 zadań:
  - 46 ABCD, 18 P/F, 16 liczbowych;
  - 20 otwartych za 3–6 pkt z etapami z zasad oceniania CKE.
- Każde zadanie z parametrem jest weryfikowane niezależnie (`verifySet`): warunek liczony na faktycznych pierwiastkach na siatce `m ∈ [−40, 40]` plus dokładne sprawdzenie końców przedziałów.
- Aplikacja:
  - `mathRozCurriculumData.ts` (osobna, leniwie ładowana paczka);
  - gałęzie `matematyka-rozszerzona` w `curriculumRepository` (przed PP, bez kolizji kluczy `5.1`);
  - `normalizeMathTaskForRunner` przepuszcza zadania otwarte.
- `drawSessionTasks`: zadanie otwarte trafia na 3. pozycję sesji. Sesja kończy się po 3 poprawnych odpowiedziach, więc na 5. pozycji uczeń nigdy by go nie zobaczył.

## Weryfikacja
- `node scripts/math_pr/build.js`: 0 błędów lintu i kontroli.
- `npx tsc --noEmit`: bez błędów.
- `npx vitest run`: 473/473 (nowe testy: `server/__tests__/rubricStages.test.ts` i strony/scalanie wzorów w `CkeFormulaSheetPages.test.ts`).
  - Test `SessionRecoveryIntegration` raz padł w pełnym przebiegu i przechodzi w izolacji (4/4) oraz w kolejnym pełnym przebiegu. Jest niestabilny czasowo, a dwa `AbortError` z animacji happy-dom występują też bez tych zmian.
- Przeglądarka (`localhost:3001`, tryb dev):
  - dział 5 w Nauce;
  - pigułka (etykiety „Karta wzorów, str. 8” / „Brak w tablicach. Zapamiętaj.”);
  - zadania ABCD, liczbowe i P/F;
  - zadanie 6 pkt z samooceną (wynik 3/6 z brakującym progiem i regułą zerującą);
  - wzory PR w szufladzie „Wszystkie działy CKE”.

**Nie sprawdzone na żywo:** ocena zadania otwartego przez egzaminatora AI (pokryta testami z atrapą modelu), tryb gościa `?dev=0`, widok 375 px.

## Odstępstwa od planu
- Format Matrix pilota: zamiast 2 zadań `TWO_PART` na lekcję są dodatkowe ABCD. Konstruktor `TWO_PART` nie istnieje w generatorze PP i nie był potrzebny do sprawdzenia wzorca.
- Stary szkic `curriculum_matematyka_rozszerzona.json` zostaje w repozytorium do czasu zbudowania wszystkich działów. Aplikacja go już nie czyta, bo działy PR pochodzą z paczki.

## Znane drobiazgi do poprawy przy kolejnych działach
- Okruszek LearnView i Dashboard numerują dział pozycją na liście („Dział 1”), a nie `numericId`. Widać to, dopóki istnieje tylko dział 5.
- Karta przedmiotu „Matematyka Rozszerzona” na Dashboardzie ma fiolet `#8B5CF6` ze starej konfiguracji przedmiotu (`DEFAULT_CKE_SUBJECT_OPTIONS` / Firestore).
- Pasek po ocenie częściowej (np. 3/6) mówi „Świetnie! Poprawna odpowiedź”. Lepiej byłoby „Zaliczone częściowo”.

## Zgodność z Bazą Wiedzy JASNE

| Notatka / zasada | Realizacja |
| :--- | :--- |
| Architektura Systemu i BFF | Ocena AI tylko przez `/api/evaluate-task`. Nowe pola sanityzowane w `aiRequest.ts`. Zero kluczy w kliencie. |
| Frontend i Stan Aplikacji | Kurs PR jako leniwie ładowana paczka (jak PP). Ścieżka sesji i stan bez zmian. Samoocena korzysta z istniejącego przepływu wyniku. |
| Model Danych Cloud Firestore | 0 odczytów: dane z paczki. Seed `curriculum_matematyka_pr.json` gotowy dla `seed_database.cjs` (nie wysłany). Brak importu `seed/` w `src/`. |
| Mechanika Dydaktyczna Core-4 | Lekcje ~5 min, pigułka Bento z `plain_polish`, Format Matrix (ABCD, P/F, liczbowe, otwarte), wyjaśnienia trap-driven z pułapek z kluczy CKE (np. Δ ≥ 0 → 0 pkt). |
| Design System – Nocturne Luminary | Nowe elementy tylko na tokenach (`surface-*`, `primary`, `alert-crimson`). Bez nowych kolorów. |
| Model Bezpieczeństwa i Reguły | Limity długości i liczby etapów po stronie serwera. Bez nowych kolekcji z zapisem klienta. |
| Unit Economics i Koszty AI | Samoocena domyślnie (0 zł). Przy awarii AI brak ponownych prób ani zgadywania wyniku. |
| Inżynieria Behawioralna / Ekonomia Wirtualna | Zdarzenie sukcesu za każdy zaliczony etap. Stałe ekonomii (`heartsManager.ts`) bez zmian. Brak kary za uczciwe 0 pkt w samoocenie. |
