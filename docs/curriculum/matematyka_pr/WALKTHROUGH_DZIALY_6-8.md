# Walkthrough: działy 6–8 kursu PR (partia 2 etapu 5)

> Stan: 2026-10-22 · Gałąź `feat/matematyka-rozszerzona` · Plan: [`../PLAN_MATEMATYKA_ROZSZERZONA.md`](../PLAN_MATEMATYKA_ROZSZERZONA.md) §2.2, etap 5

## Co zostało zrobione

| Dział | Lekcje (wymagania) | Zadania otwarte |
| :--- | :--- | :--- |
| 6. Ciągi: granice i szereg geometryczny | 6.1 granica ciągu (`VI.R1`) · 6.2 sprzężenie i trzy ciągi (`VI.R1`) · 6.3 suma szeregu (`VI.R2`) · 6.4 szereg z parametrem (`VI.R2`) · 6.5 ciągi razem (`VI.5`–`VI.7`) | 2–5 pkt, w tym 4 zadania za 5 pkt (ciąg arytmetyczny + geometryczny) |
| 7. Trygonometria: funkcje i wzory | 7.1 miara łukowa (`VII.R1`) · 7.2 wykresy i okresowość (`VII.R2`, `VII.R3`) · 7.3 wzory redukcyjne (`VII.R4`) · 7.4 wzory na sumę kątów (`VII.R5`) · 7.5 tożsamości (`VII.R5`, `VII.2`) | 2–3 pkt, w tym 8 dowodów tożsamości (`OPEN_PROOF`) |
| 8. Równania trygonometryczne | 8.1 równania elementarne · 8.2 rozwiązania w przedziale · 8.3 podstawienie `t = sin x` · 8.4 kąt podwojony (`VII.R5`) · 8.5 równania iloczynowe (wszystkie `VII.R6`) | 2–4 pkt, 12 zadań za 4 pkt w układzie etapów CKE |

Kurs PR ma teraz **8 działów, 40 lekcji i 800 zadań**:
- 302 ABCD, 158 P/F, 180 liczbowych;
- 132 `OPEN_CALCULATION` i 28 `OPEN_PROOF` z etapami CKE.

Nowe wymagania PR: `VI.R1`, `VI.R2`, `VII.R1`–`VII.R6` (oraz PP `VI.5`–`VI.7`, `VII.2`).

Nowe narzędzia:
- `trig.js`: dokładne wartości (`valTex`), kąty w radianach z obsługą połówek stopnia (`piTex`: π/8, π/12), zbiory i przedziały w notacji CKE (`piSet`, `piInterval`) oraz `solveDeg`, który wyznacza rozwiązania równania przez przeszukanie siatki kątów co 2,5°;
- `sets.js`: `numTex` przyjmuje mianowniki do 30 (granice i sumy szeregów);
- `build.js`: nowa reguła lintu wyłapuje znaki sterujące w tekście (np. `'\frac'` w zwykłym stringu JS daje form-feed).

## Weryfikacja
- `node scripts/math_pr/build.js`: 0 błędów lintu i kontroli.
  - W dziale 8 każdy zbiór i każda liczba rozwiązań są liczone niezależnie, przez `solveDeg` na **oryginalnym** równaniu (np. `sin 2x − √2·cos x`), a nie na postaci po przekształceniu. Błąd w rozkładzie na czynniki nie przejdzie więc do klucza.
  - W dziale 6 granice i sumy szeregów są sprawdzane numerycznie.
- Wszystkie 14 795 wzorów z działów 1–8 (zadania i teoria) parsuje KaTeX z `throwOnError`: 0 błędów.
- Ręczny przegląd próbki (5 zadań na lekcję). Poprawione w działach 6–8:
  - **błędna poprawna odpowiedź** w zadaniu z jedynką trygonometryczną (zły znak stałej przy `−2cos²x`);
  - brak nawiasu przy ujemnym argumencie (`\sin -\frac{\pi}{4}` → `\sin\left(-\frac{\pi}{4}\right)`);
  - zapisy `1\sin x`, `+ 0 = 0`, `- (-\sqrt{2})\cos x` (nowy pomocnik `terms`);
  - zdanie „leży 0 rozwiązań”;
  - `prereq` lekcji 8.2 wskazuje teraz PP 8.4 (kąty 0°–180°) zamiast trójkąta prostokątnego.
- **Poprawka w dziale 3 (już zacommitowanym):** pomocnik `sfrac` zawierał znak form-feed zamiast `\\frac`. W efekcie 7 zadań lekcji 3.1 miało ułamki, których KaTeX nie renderował. Naprawione; nowa reguła lintu blokuje powtórkę.
- `npx tsc --noEmit` bez błędów; `npx vitest run`: 473/473. Dwa nieobsłużone błędy animacji w `SessionRecoveryIntegration` są znane i były przed tą partią.
- Przeglądarka (`localhost:3001`): moduł `mathRozCurriculumData` ładuje 8 działów, a lekcja 8.4 ma 20 zadań.

**Nie sprawdzone na żywo:**
- wygląd lekcji działów 6–8 na ekranie (ukryty panel podglądu nie odświeżał widoku);
- ocena zadań otwartych przez egzaminatora AI;
- widok 375 px;
- tryb gościa `?dev=0`.

## Odstępstwa i uwagi
- Jak w poprzednich partiach: zamiast `TWO_PART` są dodatkowe zadania ABCD.
- Rozwiązania równań w dziale 8 są ograniczone do kątów, które są wielokrotnościami 7,5° (siatka `solveDeg`). Obejmuje to wszystkie wartości z tablic CKE i argumenty `kx` dla k ≤ 3, czyli zakres zadań maturalnych.
- Dział 7 ma priorytet `HIGH` (1–3 pkt), bo wzory trygonometryczne na arkuszu pojawiają się zwykle wewnątrz zadania z działu 8 albo geometrii.

## Zgodność z Bazą Wiedzy JASNE

| Notatka / zasada | Realizacja |
| :--- | :--- |
| Mechanika Dydaktyczna Core-4 | Lekcje ~5 min z pigułką Bento: 5 sekcji, wzory KaTeX ze stroną karty CKE, mnemonik „Z polskiego na nasze” (np. „sin 2x kręci się dwa razy szybciej”) i przykład liczbowy. Format Matrix: ABCD, P/F, liczbowe, otwarte. Każde wyjaśnienie kończy się pułapką CKE: druga seria sinusa, okres po podzieleniu przez k, dzielenie przez sin x gubi rozwiązania. |
| Kurikulum – Matematyka Podstawowa | Ten sam generator i schemat co PP. Każda lekcja ma `prereq` do konkretnej lekcji PP (np. 6.3 → `math-lesson-7-4`, 8.3 → `math-lesson-3-2`). |
| Model Danych Cloud Firestore | Dane z leniwej paczki (0 odczytów). Seed `curriculum_matematyka_pr.json` zaktualizowany, ale nie wysłany do Firestore. `src/` nie importuje `seed/`. |
| Design System – Nocturne Luminary | Bez zmian w UI. Kolor działów `#FFB800` (`primary-container`). Długie zbiory rozwiązań są zapisane jako `\left\{…\right\}` z przecinkami, żeby KaTeX mógł je łamać. |
| Architektura Systemu i BFF / Unit Economics | Zadania otwarte korzystają z oceny etapowej z etapu 3: samoocena domyślnie, AI w dziennym limicie. Bez nowych wywołań LLM. |
| Inżynieria Behawioralna / Ekonomia Wirtualna | Bez zmian w streaku, sercach i monetach. Zadania otwarte dają nagrodę za każdy zaliczony etap. |
