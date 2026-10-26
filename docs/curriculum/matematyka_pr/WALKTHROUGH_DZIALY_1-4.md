# Walkthrough: działy 1–4 kursu PR (partia 1 etapu 5)

> Stan: 2026-10-22 · Gałąź `feat/matematyka-rozszerzona` · Plan: [`../PLAN_MATEMATYKA_ROZSZERZONA.md`](../PLAN_MATEMATYKA_ROZSZERZONA.md) §2.2, etap 5

## Co zostało zrobione

| Dział | Lekcje (wymagania) | Zadania otwarte |
| :--- | :--- | :--- |
| 1. Logarytmy i dowody algebraiczne | 1.1 zamiana podstawy (`I.R1`) · 1.2 wyrażenia i dziedzina (`I.R1`, `I.9`) · 1.3 dowody podzielności (`I.2`) · 1.4 dowody nierówności (`II.R5`, `II.1`) · 1.5 sześciany i dwumian Newtona (`II.R5`, `II.R4`) | 2–3 pkt, w tym 12 dowodów (`OPEN_PROOF`) |
| 2. Wielomiany | 2.1 dzielenie i reszta (`II.R1`) · 2.2 pierwiastki całkowite (`II.R3`, `III.R1`) · 2.3 rozkład (`II.R2`, `II.R5`) · 2.4 równania i dwukwadratowe (`III.R1`, `III.R6`) · 2.5 nierówności – wężyk (`III.R1`) | 3–4 pkt |
| 3. Wyrażenia wymierne i wartość bezwzględna | 3.1 działania (`II.R6`) · 3.2 równania wymierne (`III.R7`, `III.R2`) · 3.3 nierówności wymierne (`III.R2`) · 3.4 równania z modułem (`III.R4`) · 3.5 nierówności z modułem (`III.R4`) | 2–4 pkt, w tym 4 dowody tożsamości |
| 4. Funkcje | 4.1 symetrie wykresu (`V.R1`) · 4.2 wykres \|f\| i parametr (`V.R1`, `III.R4`) · 4.3 złożenie (`V.R2`) · 4.4 monotoniczność z definicji (`V.R3`) · 4.5 modele wykładnicze (`V.14`, `I.R1`) | 2–3 pkt, w tym 4 dowody monotoniczności |

Kurs PR ma teraz **5 działów, 25 lekcji i 500 zadań**:
- 192 ABCD, 95 P/F, 113 liczbowych;
- 80 `OPEN_CALCULATION` i 20 `OPEN_PROOF` z etapami CKE.

Pokryte wymagania PR: `I.R1`, `II.R1`–`II.R6`, `III.R1`–`III.R7`, `V.R1`–`V.R3` (oraz PP `I.2`, `I.9`, `II.1`, `V.14`).

Wspólne narzędzia:
- `sets.js`: `signSet` (metoda wężyka z krotnościami), `removePoints` (zera mianownika), `union`, `normalize`;
- `common.js`: `pickTwo`, `co`, `coef`, `frs`.

Dział 5 po refaktorze daje identyczne zadania (sprawdzone porównaniem z commitem `02c01d3`).

## Weryfikacja
- `node scripts/math_pr/build.js`: 0 błędów lintu i kontroli. Każdy zbiór rozwiązań nierówności (wielomianowe, wymierne, z modułem) i każda liczba rozwiązań równania z \|f\| jest sprawdzana niezależnie: wyrażenie liczone wprost na siatce punktów i w końcach przedziałów.
- Ręczny przegląd próbki (5 zadań na lekcję). Poprawione m.in.:
  - dystraktor „6” przy iloczynie 5 kolejnych liczb (też poprawna odpowiedź);
  - czynnik „(x)”;
  - ułamki „\frac{-2}{…}”;
  - odmiana „1 rozwiązań”.
- `npx tsc --noEmit` bez błędów; `npx vitest run`: 473/473.
- Przeglądarka (`localhost:3001`, tryb dev):
  - lista działów 1–5 z poprawną numeracją (problem „Dział 1” z pilota zniknął);
  - sesja lekcji 1.3: zadanie liczbowe → ABCD → dowód za 3 pkt na 3. pozycji z samooceną etapami.

**Nie sprawdzone na żywo:** ocena dowodu przez egzaminatora AI, widok 375 px, tryb gościa `?dev=0`.

## Odstępstwa i uwagi
- Jak w pilocie: zamiast `TWO_PART` są dodatkowe zadania ABCD.
- W trybie dev wszystkie działy są „zaliczone”, więc widać baner „MATURA ZDANA NA 100%”. Kurs ma 5 z 15 działów, ten stan pokazuje tylko tryb dev.

## Zgodność z Bazą Wiedzy JASNE

| Notatka / zasada | Realizacja |
| :--- | :--- |
| Mechanika Dydaktyczna Core-4 | Lekcje ~5 min, pigułka Bento z „Z polskiego na nasze”, Format Matrix (ABCD, P/F, liczbowe, otwarte) i pułapki z zasad oceniania CKE w każdym wyjaśnieniu. |
| Kurikulum – Matematyka Podstawowa | Ten sam generator i schemat. Każda lekcja ma `prereq` do konkretnej lekcji PP (np. 2.5 → `math-lesson-3-3`). |
| Model Danych Cloud Firestore | Dane z leniwej paczki (0 odczytów). Seed `curriculum_matematyka_pr.json` zaktualizowany, ale nie wysłany. |
| Design System – Nocturne Luminary | Bez zmian w UI; treść renderowana istniejącymi komponentami. |
| Architektura Systemu i BFF / Unit Economics | Zadania otwarte korzystają z oceny etapowej z etapu 3 (samoocena domyślnie, AI w limicie). |
| Inżynieria Behawioralna | Bez zmian w ekonomii i streaku. Dowody i zadania otwarte dają nagrodę za każdy zaliczony etap. |
