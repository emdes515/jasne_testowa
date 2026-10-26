# Prompt celu: kurs Matematyka – poziom rozszerzony (JASNE)

> Do wklejenia agentowi na start nowej sesji. Na tym etapie oczekujemy **planu działania**, a nie kodu ani treści.

---

## CEL

Zaprojektuj plan budowy kursu **Matematyka – poziom rozszerzony (Formuła 2023, wymagania CKE od 2025)** dla platformy JASNE.
Kurs ma być **kontynuacją kursu podstawowego, a nie osobnym produktem**: ta sama struktura, ten sam pipeline, ta sama Pigułka Bento, ten sam ton i ta sama karta wzorów.
Maturzysta przechodzący z PP na PR nie powinien zauważyć zmiany stylu, tylko wyższy poziom trudności.

Gotowy plan ma pozwolić zespołowi zbudować kurs dział po dziale bez podejmowania decyzji projektowych w trakcie.

## DLACZEGO

Uczeń PR zdaje **oba** poziomy. Program PR zakłada znajomość całej PP (informator CKE: „wymagania PP obowiązują także na PR”). Dlatego kurs PR nie powtarza PP, tylko na niej buduje i odsyła do niej, gdy uczeń ma luki.
Kryterium sukcesu: pokrycie **100% wymagań z informatora PR** oraz każdego typu zadania, który pojawił się na arkuszach CKE.

---

## ŹRÓDŁA PRAWDY (w tej kolejności)

1. **Informator CKE PR**: `baza_cke_matematyka/informatory_i_zbiory_zadan/Informator_EM2024_matematyka_pr.pdf`. Lista wymagań szczegółowych (numeracja typu R I.1, R XIII.2) jest szkieletem programu. Każda lekcja musi wskazywać, które wymagania pokrywa.
2. **Arkusze PR z kluczami** ze strony https://arkusze.pl/matematyka-matura-poziom-rozszerzony/: wszystkie sesje Formuły 2023 (maj, czerwiec, sierpień, próbne/diagnostyczne CKE) oraz, osobno oznaczone, starsze arkusze Formuły 2015 jako materiał pomocniczy. Pobierz arkusze i klucze/zasady oceniania do `baza_cke_matematyka/rozszerzona/<rok>/` i zapisz `manifest.json` (rok, sesja, formuła, URL, plik, czy jest klucz). Część plików jest już w `C:\Users\mateu\Downloads\mat\Matematyka_rozszerzona\`, sprawdź je przed pobieraniem.
3. **Zbiór zadań CKE PR**: `CKE_zbior_zadan_matematyka_rozszerzenie.pdf`.
4. **Karta wzorów**: `baza_cke_matematyka/tablice_wzorow/wybrane_wzory_matematyczne_EM2023.pdf`. Ta sama karta dla PP i PR.
5. **Wzorzec do naśladowania, czyli kurs PP**: `scripts/math_pp/` (`build.js`, `lib.js`, `dzial_XX.js`, `figures.js`, `cke/`), wynik w `src/data/math/generated/` i `seed/curriculum/curriculum_matematyka_pp.json`.
6. **Baza wiedzy JASNE** (Obsidian, zgodnie z `AGENTS.md`): Core-4, Design System Nocturne Luminary, Model Danych Firestore, Frontend i Stan.

Obecny `seed/curriculum/curriculum_matematyka_rozszerzona.json` (20 lekcji, 120 zadań, fioletowy `#8B5CF6` spoza palety) to **stary szkic**. Oceń, co nadaje się do odzysku, ale nie traktuj go jako wzorca.

PDF-y czytaj przez PyMuPDF (`fitz`): `page.get_text()` do tekstu, renderowanie do PNG do wzorów i rysunków. `pdftotext` gubi ułamki i indeksy.

---

## CO MA ZAWIERAĆ PLAN

### 1. Analiza arkuszy (na niej opiera się cały plan)
- Tabela: każde zadanie z każdego arkusza Formuły 2023 → wymaganie z informatora → dział → typ zadania → punkty.
- Wagi działów: średnia liczba punktów na arkusz, częstość, „pewniaki” PR (np. optymalizacja z pochodną, dowód, trygonometria, prawdopodobieństwo warunkowe, ciągi z granicą).
- Katalog **typów zadań PR**: zamknięte ABCD, kodowane (3 cyfry rozwinięcia dziesiętnego), otwarte krótkie (2–3 pkt), otwarte rozszerzone (4–6 pkt), dowody algebraiczne i geometryczne, zadania optymalizacyjne. Dla każdego typu: jak CKE punktuje (schemat oceniania) i jak to odwzorujemy.
- Lista **pułapek CKE** z zasad oceniania: za co konkretnie odejmowano punkty.

### 2. Mapa programu
- Działy PR (orientacyjnie 12–15) z lekcjami po **4–6 minut**: jeden wąski koncept na lekcję.
- Każdy dział oznaczony jednym z typów:
  - **(A) rozszerzenie działu PP**, np. funkcja kwadratowa z parametrem, równania trygonometryczne. Lekcja zaczyna się od odwołania do lekcji PP (`math-lesson-X-Y`), a nie od powtórki.
  - **(B) dział tylko na PR**: pochodna, granice, wielomiany i twierdzenie Bezouta, prawdopodobieństwo warunkowe i całkowite, indukcja/dowody, geometria analityczna okręgu i stycznych itd.
- Kolejność zgodna z zależnościami (graf wymagań wstępnych: co musi być przed pochodną, co przed optymalizacją).
- **Macierz pokrycia**: wymaganie z informatora × lekcja. Żadna pusta komórka nie może zostać bez uzasadnienia.

### 3. Spójność z PP (twarde wymagania)
- **Ten sam schemat danych** co PP: `topics[] → lessons[] → theory_pill + tasks[]`, te same pola lekcji (`theory_pill`: `concept_essence`, `matura_context`, `plain_polish`, `algorithm_steps`, `core_formulas`, `worked_examples`, `trap_details`, `exam_trap`, `key_points`) i zadania (`type`, `points`, `question`, `math_statement`, `options`, `correct_answer`, `explanation`, `matura_tip`, `hints`, `source`). Jeśli PR wymaga nowych pól (np. schemat punktowania dowodu, rubryka kroków), zaproponuj je jako **rozszerzenie wstecznie zgodne**, a nie osobny model.
- **Ten sam pipeline**: `scripts/math_pr/` z tym samym `lib.js` (lint KaTeX, `evalTex`, `Retry`) i `figures.js`, czyli współdzielone, a nie skopiowane. Wyjście w `src/data/math/generated/` z prefiksem `pr_`. Identyfikatory `math-pr-lesson-X-Y`, żeby nie kolidowały z PP.
- **Ta sama karta wzorów**: jedna karta (`cke_formulas.json` / `CkeFormulaSheet`) rozszerzona o wzory z części PR, z numerem strony CKE przy każdym wzorze. `core_formulas` w lekcjach PR odsyłają do konkretnej strony karty. Zero wzorów spoza karty prezentowanych tak, jakby na niej były. Wzory, których na karcie nie ma, ale trzeba je znać, oznacz wprost: „nie ma na karcie – zapamiętaj”.
- **Ten sam styl**: ton partnerski, „Z polskiego na nasze”, mnemoniki wizualne, przykład liczbowy przy każdym wzorze, brak poziomego overflow na mobile. Na PR formalizm (∀, ∃, ⇔) jest dopuszczalny tylko tam, gdzie wymaga go treść zadania CKE (np. dowód), zawsze z tłumaczeniem obok.
- **Paleta Nocturne Luminary**: odróżnienie PR od PP przez etykietę/badge, a nie przez kolor spoza palety.

### 4. Zadania
- Docelowa liczba zadań na lekcję (dla PP jest to 20) z uzasadnieniem, jeśli dla PR ma być inna.
- Proporcje: autentyczne zadania CKE (z polem `source` wskazującym arkusz i numer) do zadań autorskich w stylu CKE. Zadania CKE odwzorowane wiernie, z kluczem.
- **Format Matrix PR**: rozkład typów (`SINGLE_CHOICE`, `TRUE_FALSE`, `TWO_PART`, `NUMERIC_INPUT` do zadań kodowanych, `OPEN_CALCULATION`, `OPEN_PROOF`). Plan oceniania zadań otwartych zgodny z istniejącą ścieżką AI przez BFF (`server/routes/`), z rubryką punktową CKE i bez nagradzania samej długości odpowiedzi.
- Wyjaśnienia trap-driven: każda błędna opcja ma przypisaną przyczynę pomyłki.
- Progresja trudności w lekcji i „boss” działu w formie mini-arkusza PR.

### 5. Integracja z aplikacją
- Gdzie PR pojawia się w UI (wybór poziomu, LearnView, Dashboard, symulator matury PR 180 min / 50 pkt), bez łamania istniejącego flow PP.
- Firestore: kolekcje i dokumenty, seedowanie, cache-first przez `curriculumRepository.ts`. `src/` nie importuje `seed/`.
- Grywalizacja bez zmian w ekonomii (`heartsManager.ts`, `types.ts`), Campus Rust liczony również dla lekcji PR, a postęp PP uwzględniany jako wymaganie wstępne.

### 6. Kontrola jakości
- Automatyczne: lint treści (jak w `build.js`), weryfikacja numeryczna odpowiedzi, sprawdzenie, że każdy wzór ma stronę na karcie, unikalność zadań, testy renderowania KaTeX (wzorem jest `src/data/__tests__/mathContentRendering.test.tsx`).
- Ręczne: próbka zadań porównana z arkuszem źródłowym, przegląd mobilny (375 px) na żywym serwerze (port 3001).
- Definicja „działu gotowego” (Definition of Done).

### 7. Harmonogram
- Etapy w kolejności: (0) pobranie i analiza arkuszy → (1) mapa programu i macierz pokrycia → (2) rozszerzenie karty wzorów → (3) pilotażowy dział od początku do końca → przegląd → (4) pozostałe działy partiami → (5) integracja UI + symulator → (6) QA całości.
- Jeden **dział pilotażowy** (proponuję pochodną z optymalizacją, bo to najwięcej punktów i dział tylko na PR) budowany w całości przed resztą, żeby zweryfikować wzorzec.
- Ryzyka i otwarte pytania do decyzji właściciela produktu.

---

## OGRANICZENIA

- Przestrzegaj `AGENTS.md`: BFF (żadnych kluczy z prefiksem `VITE_`), Firestore cache-first, zakaz importu `seed/` w `src/`, Core-4, Nocturne Luminary, strażnik behawioralny.
- Nie zmieniaj kursu PP poza wspólnymi modułami (`lib.js`, `figures.js`, karta wzorów). Każda zmiana wspólna musi przejść testy PP.
- Treści CKE służą wyłącznie jako materiał dydaktyczny z podaniem źródła. Nie publikujemy PDF-ów w aplikacji.
- Pobieraj tylko z arkusze.pl i stron CKE. Zachowuj oryginalne nazwy plików w manifeście.

## FORMAT ODPOWIEDZI

Jeden dokument `docs/curriculum/PLAN_MATEMATYKA_ROZSZERZONA.md` zawierający:
1. Podsumowanie dla decydenta (max 10 zdań).
2. Sekcje 1–7 powyżej, w formie tabel tam, gdzie to możliwe.
3. Sekcję **„Zgodność z Bazą Wiedzy JASNE”** (wymaganą przez `AGENTS.md`).
4. Listę decyzji do podjęcia przez właściciela, każdą z rekomendacją.

Najpierw pokaż plan, a z budową treści poczekaj na akceptację.
