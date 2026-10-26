# Walkthrough: działy 13–15 kursu PR (partia 4, koniec etapu 5)

> Stan: 2026-10-26 · Gałąź `feat/matematyka-rozszerzona` · Plan: [`../PLAN_MATEMATYKA_ROZSZERZONA.md`](../PLAN_MATEMATYKA_ROZSZERZONA.md) §2.2, etap 5

## Co zostało zrobione

| Dział | Lekcje (wymagania) | Zadania otwarte |
| :--- | :--- | :--- |
| 13. Kombinatoryka i prawdopodobieństwo | 13.1 permutacje, wariacje, kombinacje (`XI.R1`) · 13.2 symbol Newtona i trójkąt Pascala (`XI.R2`, `II.R4`) · 13.3 prawdopodobieństwo warunkowe (`XII.R1`) · 13.4 prawdopodobieństwo całkowite i Bayes (`XII.R1`) · 13.5 schemat Bernoullego (`XII.R2`) | 3–4 pkt: liczby o zadanych cyfrach, równanie z symbolem Newtona, losowanie z warunkiem, drzewo + Bayes, „co najmniej n − 1 sukcesów” |
| 14. Granice, ciągłość i pochodna | 14.1 granica w punkcie, jednostronne (`XIII.R1`) · 14.2 ciągłość i Darboux (`XIII.R2`) · 14.3 definicja pochodnej i styczna (`XIII.R3`) · 14.4 iloczyn, iloraz, złożenie (`XIII.R4`) · 14.5 monotoniczność i ekstrema (`XIII.R5`) | 2–4 pkt, w tym 4 dowody z własności Darboux i zadanie z regułą zerującą CKE („iloraz pochodnych – 0 pkt”) |
| 15. Optymalizacja z pochodną | 15.1 model i dziedzina · 15.2 schemat 4 pkt · 15.3 bryły (`X.5`) · 15.4 figury w układzie współrzędnych (`IX.2`) · 15.5 kontekst praktyczny (`X.5`, `VIII.8`); wszystkie `XIII.R6` | 2–6 pkt: „Wykaż, że P(x) = …” (2 pkt), schemat 4 pkt, bryła 5 pkt, prostokąt pod parabolą 5 pkt, wiązka 2 + 4 jako jedno zadanie za 6 pkt |

**Kurs PR jest kompletny: 15 działów, 75 lekcji i 1500 zadań.**
- 495 ABCD, 294 P/F, 411 liczbowych;
- 243 `OPEN_CALCULATION` i 57 `OPEN_PROOF` z etapami CKE.

Pokrycie podstawy: **46 z 46 wymagań PR** (zgodnie z macierzą z §2.3 planu).

Nowe narzędzia:
- `rational.js`: dokładne ułamki (`q`, `qAdd`, `qMul`, `qDiv`, `qPow`) oraz `fact` i `binom` – całe prawdopodobieństwo liczone bez liczb zmiennoprzecinkowych;
- w dziale 15 `argOpt` – niezależne wyszukiwanie minimum i maksimum funkcji celu na siatce 200 000 punktów.

## Weryfikacja
- `node scripts/math_pr/build.js`: 0 błędów lintu i kontroli. Niezależne kontrole w nowych działach:
  - liczba liczb o zadanych cyfrach (13.1) jest liczona wzorem **i** przez przejrzenie wszystkich liczb 5- i 6-cyfrowych – oba wyniki muszą być równe;
  - prawdopodobieństwa warunkowe są wyznaczane przez wypisanie zdarzeń elementarnych (dwie kostki, pary kul);
  - granice typu „zero przez zero” są sprawdzane numerycznie tuż obok punktu;
  - każde minimum i maksimum w dziale 15 jest potwierdzane przeszukaniem funkcji celu na siatce.
- KaTeX z `throwOnError`: 26 743 wzory z działów 1–15, 0 błędów.
- Zadania działów 1–12 są identyczne z poprzednim commitem.
- Ręczny przegląd próbki (5 zadań na lekcję). Poprawione m.in.:
  - odmiana liczebników („6 białych”, „1 czarna”, „3 strzały”, „Pozostałe miejsce”);
  - „$y = 1(x - 1)$”, „$3(x)(x - 6)$”, „$1 + 1m$”;
  - przypadek $(x - 1)(x - 1)$ z granicą $0$;
  - nieskrócone wyrażenia w zadaniu z pudełkiem („$\frac{36}{2x^2}$”, „$108 \cdot \frac{1}{x}$”).
- `npx tsc --noEmit` bez błędów; `npx vitest run`: 473/473. Dwa nieobsłużone błędy animacji w `SessionRecoveryIntegration` są znane i były przed tą partią.
- Przeglądarka (`localhost:3001`): kurs PR ma 15 działów, a każda lekcja 13.1–15.5 ma 20 zadań, w tym 4 otwarte.

**Nie sprawdzone na żywo:**
- przejście sesji w działach 13–15;
- ocena dowodów i zadań za 5–6 pkt przez egzaminatora AI;
- widok 375 px;
- tryb gościa `?dev=0`.

## Odstępstwa i uwagi
- **Wiązka 2 + 4:** model ma pole `bundle_id`, ale generator i interfejs go jeszcze nie obsługują. Dlatego w 15.5 wiązka to jedno zadanie za 6 pkt z częściami a) i b), a etapy są oznaczone „(a)” i „(b)”. Część a) osobno ćwiczy lekcja 15.1 („Wykaż, że…”, 2 pkt). Rozdzielenie na dwa powiązane zadania to praca na etap 6.
- Granice typu „zero przez zero” w teorii i pułapkach są zapisane słowami, a nie jako ułamek $0/0$, bo lint słusznie blokuje zero w mianowniku. Reguły nie osłabiałem.
- Jak w poprzednich partiach: zamiast `TWO_PART` są dodatkowe zadania ABCD, a zadania z geometrii przestrzennej nie mają rysunków.
- Dział 14 ma priorytet `HIGH` (2–4 pkt); działy 13 i 15 – `CRITICAL_PEWNIAK`.

## Co dalej (etap 6 planu)
Integracja:
- LearnView i Dashboard (rdzewienie wiedzy dla kursu PR);
- symulator arkusza PR z 50 pkt;
- rysunki do geometrii;
- wiązki `bundle_id`;
- wysłanie seeda do Firestore – dopiero po akceptacji, bez zapisu na produkcję z tej gałęzi.

## Zgodność z Bazą Wiedzy JASNE

| Notatka / zasada | Realizacja |
| :--- | :--- |
| Mechanika Dydaktyczna Core-4 | Lekcje ~5 min z pigułką Bento: 5 sekcji, wzory KaTeX ze stroną karty CKE (str. 24–31), „Z polskiego na nasze” (np. „funkcja złożona to cebula”, „za płaskie pudełko – ogromne dno”) i przykład liczbowy. Format Matrix: ABCD, P/F, liczbowe, otwarte. Pułapki z zasad oceniania CKE: iloraz pochodnych = 0 pkt, brak uzasadnienia ekstremum = maks. 2/4 pkt, brak $\binom{n}{k}$ w Bernoullim, mianownik warunku. |
| Kurikulum – Matematyka Podstawowa | Ten sam generator i schemat. Każda lekcja ma `prereq` do lekcji PP (np. 13.3 → `math-lesson-13-4`, 14.5 → `math-lesson-6-3`, 15.1 → `math-lesson-15-2`). |
| Model Danych Cloud Firestore | Dane z leniwej paczki (0 odczytów). Seed `curriculum_matematyka_pr.json` zaktualizowany, ale nie wysłany do Firestore. `src/` nie importuje `seed/`. |
| Design System – Nocturne Luminary | Bez zmian w UI. Kolor działów `#FFB800`; ikony z istniejącej mapy (`PieChart`, `TrendingUp`, `Target`). |
| Architektura Systemu i BFF / Unit Economics | Zadania otwarte (do 6 pkt) korzystają z oceny etapowej z etapu 3: samoocena domyślnie, AI w dziennym limicie. Reguły zerujące (`zero_rules`) trafiają do promptu oceniającego. Bez nowych wywołań LLM. |
| Inżynieria Behawioralna / Ekonomia Wirtualna | Bez zmian w streaku, sercach i monetach. Zadania otwarte dają nagrodę za każdy zaliczony etap. |
