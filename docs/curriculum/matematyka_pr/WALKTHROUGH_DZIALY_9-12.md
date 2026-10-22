# Walkthrough: działy 9–12 kursu PR (partia 3 etapu 5)

> Stan: 2026-10-22 · Gałąź `feat/matematyka-rozszerzona` · Plan: [`../PLAN_MATEMATYKA_ROZSZERZONA.md`](../PLAN_MATEMATYKA_ROZSZERZONA.md) §2.2, etap 5

## Co zostało zrobione

| Dział | Lekcje (wymagania) | Zadania otwarte |
| :--- | :--- | :--- |
| 9. Planimetria: okręgi, czworokąty, rozwiązywanie trójkątów | 9.1 czworokąt wpisany (`VIII.R1`) · 9.2 czworokąt opisany (`VIII.R1`) · 9.3 twierdzenie sinusów (`VII.R7`) · 9.4 rozwiązywanie trójkątów (`VII.R8`, `VIII.12`) · 9.5 odwrotne twierdzenie Talesa (`VIII.R2`, `VIII.8`) | 3–4 pkt (przekątna i promień, trapez opisany, kąt i pole) |
| 10. Dowody geometryczne | 10.1 założenie, teza, uzasadnienie (`VIII.11`) · 10.2 kąty wpisane i środkowe (`VIII.5`) · 10.3 podobieństwo i przystawanie (`VIII.8`) · 10.4 pola i długości (`VIII.11`, `VIII.12`) · 10.5 czworokąty i okręgi (`VIII.R1`) | 20 dowodów (`OPEN_PROOF`) za 2–3 pkt, z puli 25 dowodów |
| 11. Geometria analityczna: wektory, okręgi, styczne | 11.1 wektory (`IX.R3`) · 11.2 prostopadła i styczna (`IX.R4`, `IX.2`) · 11.3 prosta i okrąg (`IX.R1`, `IV.R1`) · 11.4 dwa okręgi (`IX.R2`, `IV.R1`) · 11.5 zadania wieloetapowe (`IX.R1`, `IX.2`) | 3–5 pkt, w tym trójkąt równoramienny za 5 pkt |
| 12. Stereometria: kąty i przekroje | 12.1 trzy prostopadłe i kąt dwuścienny (`X.R1`, `X.2`) · 12.2 kąty w ostrosłupach (`X.3`, `X.2`) · 12.3 przekroje sześcianu (`X.R2`) · 12.4 przekroje ostrosłupów (`X.R2`) · 12.5 bryły z trygonometrią (`X.5`, `X.R2`) | 3–5 pkt, w tym objętość ostrosłupa z cosinusem kąta za 5 pkt |

Kurs PR ma teraz **12 działów, 60 lekcji i 1200 zadań**:
- 411 ABCD, 237 P/F, 312 liczbowych;
- 192 `OPEN_CALCULATION` i 48 `OPEN_PROOF` z etapami CKE.

Nowe wymagania PR: `VII.R7`, `VII.R8`, `VIII.R1`, `VIII.R2`, `IX.R1`–`IX.R4`, `IV.R1`, `X.R1`, `X.R2`. Do tego wymagania PP najczęstsze na arkuszu PR: `VIII.5`, `VIII.8`, `VIII.11`, `VIII.12`, `IX.2`, `X.2`, `X.3`, `X.5`.

Nowe narzędzia:
- `geo.js`:
  - liczby postaci $\frac{n}{d}\sqrt{r}$ (`surd`, `sTex`, `sMul`, `sDiv`) z usuwaniem niewymierności z mianownika;
  - dokładne sinusy i cosinusy kątów specjalnych;
  - punkty, wektory i proste w notacji CKE;
  - kratowe punkty okręgu o promieniu 5;
- `common.js`: `terms` (przeniesione z działu 8), czyli sumy wyrazów bez „1x”, „+ 0” i „+ −”;
- `build.js`: lint łapie teraz także „1k”, „1t” oraz podwójny znak przed ułamkiem lub pierwiastkiem („− −\frac”).

## Weryfikacja
- `node scripts/math_pr/build.js`: 0 błędów lintu i kontroli.
  - Każda odpowiedź ABCD z liczbą ma `val` liczone niezależnie, na liczbach zmiennoprzecinkowych z geometrii (`Math.sin`, współrzędne). Parser sprawdza, że zapis z pierwiastkami ma tę samą wartość.
  - Punkty wspólne prostej i okręgu oraz dwóch okręgów są budowane z punktów kratowych i sprawdzane w obu równaniach.
  - Warunek parametru w 11.3 jest sprawdzany wyróżnikiem: $\Delta = 0$ na końcach przedziału i $\Delta > 0$ w środku.
- KaTeX z `throwOnError`: 21 750 wzorów z działów 1–12, 0 błędów.
- Ręczny przegląd próbki (5 zadań na lekcję). Poprawione m.in.:
  - „1k” w proporcji;
  - zdublowane równości („$\frac{7}{10} = \frac{7}{10}$”);
  - „$5 - -\frac{3}{4}$”;
  - odległość 0 i $\sqrt{1}$ w odległości punktu od prostej;
  - zdegenerowany trapez (podstawy 8 i 7, $|SD| = 56$);
  - za duże wymiary w zadaniu za 5 pkt (krawędź 72);
  - pusta lista kątów przy $\alpha = 150^\circ$.
- `npx tsc --noEmit` bez błędów; `npx vitest run`: 473/473. Dwa nieobsłużone błędy animacji w `SessionRecoveryIntegration` są znane i były przed tą partią.
- Przeglądarka (`localhost:3001`):
  - lista kursu PR pokazuje 12 działów;
  - każda lekcja 9.1–12.5 ma 20 zadań, w tym 4 otwarte;
  - pigułka lekcji 10.1 renderuje się poprawnie.

**Nie sprawdzone na żywo:**
- przejście całej sesji w działach 9–12;
- ocena dowodów przez egzaminatora AI;
- widok 375 px;
- tryb gościa `?dev=0`.

## Zmiana w aplikacji
- `LearnView.tsx`: do `subjectIconMap` doszły ikony działów matematyki po nazwie (te same, które już są w `mathIcons`).
  - Kurs PP wygląda tak samo: każda nazwa z blueprintów PP odpowiada ikonie na tej samej pozycji.
  - Działy PR dostają ikony po nazwie, a nie po pozycji. Wcześniej dział 11 PR (geometria analityczna) pokazywałby sześcian.
- Dział 5 PR ma ikonę `Activity` (funkcja kwadratowa), żeby nie dublować ikony działu 4.

## Odstępstwa i uwagi
- Jak w poprzednich partiach: zamiast `TWO_PART` są dodatkowe zadania ABCD.
- Zadania zamknięte z geometrii nie mają rysunków. Treść jest pełna (oznaczenia wierzchołków jak w arkuszach CKE), ale rysunki SVG do działów 9–12 to osobna praca na etap 6 (integracja).
- Dowody w dziale 10 pochodzą z autorskiej puli (5 na lekcję, 4 trafiają do puli zadań). Etapy i pułapki wzorowane są na zasadach oceniania CKE. Parametryzacja liczbami nie ma tu sensu – dowód musi być ogólny.
- Dział 10 ma priorytet `HIGH` (2–3 pkt); działy 9, 11 i 12 – `CRITICAL_PEWNIAK`.

## Zgodność z Bazą Wiedzy JASNE

| Notatka / zasada | Realizacja |
| :--- | :--- |
| Mechanika Dydaktyczna Core-4 | Lekcje ~5 min z pigułką Bento. Każda ma 5 sekcji, wzory KaTeX ze stroną karty CKE (str. 14–25), „Z polskiego na nasze” (np. „wektor to przepis na przesunięcie”, „cień ołówka to rzut”) i przykład liczbowy. Format Matrix: ABCD, P/F, liczbowe, otwarte. Każde wyjaśnienie ma pułapkę CKE: $h = 2r$ w trapezie opisanym, $2R$ zamiast $R$, kąt krawędzi a kąt ściany, rzut a punkt symetryczny. |
| Kurikulum – Matematyka Podstawowa | Ten sam generator i schemat co PP. Każda lekcja ma `prereq` do lekcji PP (np. 9.3 → `math-lesson-8-4`, 11.3 → `math-lesson-10-4`, 12.2 → `math-lesson-11-2`). |
| Model Danych Cloud Firestore | Dane z leniwej paczki (0 odczytów). Seed `curriculum_matematyka_pr.json` zaktualizowany, ale nie wysłany do Firestore. `src/` nie importuje `seed/`. |
| Design System – Nocturne Luminary | Kolor działów `#FFB800` (`primary-container`). Ikony z istniejącego zestawu lucide. Bez nowych stylów. |
| Architektura Systemu i BFF / Unit Economics | Zadania otwarte i dowody korzystają z oceny etapowej z etapu 3: samoocena domyślnie, AI w dziennym limicie. Bez nowych wywołań LLM. |
| Inżynieria Behawioralna / Ekonomia Wirtualna | Bez zmian w streaku, sercach i monetach. Zadania otwarte dają nagrodę za każdy zaliczony etap. |
