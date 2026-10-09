# 📐 Master Design & Product Spec: JASNE Matematyka
**„Autentyczne CKE, Zero Chaosu & Karta Wzorów pod Ręką”**
*Koncepcja modułu matematyki dla platformy JASNE (Matura Formuła 2023 / 2026)*

---

## 🏛️ 1. Zgodność z Bazą Wiedzy JASNE i Wytycznymi Projektu

| Filar JASNE | Realizacja w Module Matematyki |
| :--- | :--- |
| **BFF & Architektura** | Komunikacja z modelami AI (wskazówki, analiza toku rozumowania) odbywa się wyłącznie przez bezpieczny Express Backend For Frontend (`server/routes/`). Zero kluczy API na frontendzie. |
| **Microlearning Core-4** | 15 działów tematycznych CKE Formuła 2023 podzielonych na zwięzłe lekcje 4–6 minut; Pigułka Bento (5 sekcji: `concept_essence`, `matura_context`, `core_formulas` w KaTeX ze zmapowanymi stronami CKE, `worked_example`, `exam_trap`). |
| **Format Matrix** | Pełna różnorodność formatów zadań: `SINGLE_CHOICE` (ABCD), `TRUE_FALSE`, `TWO_PART`, `NUMERIC_INPUT` (krótka odpowiedź / kodowanie), `OPEN_PROOF` (dowody) oraz `OPEN_CALCULATION`. |
| **Trap-Driven Explanations** | Każde zadanie po błędnej odpowiedzi wyświetla natychmiastową wskazówkę egzaminatora CKE adresującą typowe pułapki (np. nieuwzględnienie dziedziny przy logarytmach, ujemna delta, pierwiastkowanie obustronne). |
| **Design System (Nocturne Luminary)** | Tła bazy (`#070a0f`, `#0e1522`, `#141d2e`), bursztynowo-złote akcenty (`#ffdca1`, `#ffb800`), ogień streaku (`#ea580c`), alarmy błędów (`#f43f5e`), typografia KaTeX o wysokim kontraście (`#dfe2f1`). |
| **Inżynieria Behawioralna & Hooked** | Natychmiastowa mikro-gratyfikacja (dźwięki sukcesu, konfetti, +XP, monety), ochrona kapitału zaangażowania (`streakFreezes`), mechanika rdzewienia wiedzy Ebbinghausa (**Campus Rust**). |
| **Wirtualna Ekonomia** | Zachowanie stawek: regeneracja serc co 30 min (`REGEN_INTERVAL_MS = 30 min`), pełne odnowienie za 150 monet (`HEARTS_REFILL_COIN_COST = 150`), limit 3 darmowych podpowiedzi AI dziennie. |
| **Autentyczna Baza CKE** | Integracja z 54 oficjalnymi arkuszami CKE (roczniki 2022–2026: sesje główne, dodatkowe, poprawkowe i diagnostyczne) oraz 34-stronicową oficjalną Kartą Wzorów Formuła 2023. |

---

## 🎯 2. Core Hook: Dlaczego to pokochają maturzyści?

### Główny ból maturzysty z matematyki:
1. **Paraliż wzorami:** Gruba 34-stronicowa karta wzorów CKE, w której uczeń gubi się podczas stresu egzaminacyjnego.
2. **Pułapki rachunkowe i dziedzinowe:** Tracenie cennych punktów na zadaniach zamkniętych przez drobne nieuwagi (np. dzielenie przez wyrażenie ze zmienną, ujemna podstawa potęgi).
3. **Strach przed zadaniami otwartymi:** Brak umiejętności zapisu formalnego dowodu matematycznego i schematu punktowania CKE.
4. **Niewygodny zapis na smartfonie:** Rozwiązywanie zadań matematycznych na telefonie bywa uciążliwe bez dedykowanego brudnopisu i czytelnego KaTeX.

### Nasza odpowiedź: MathStudyHub
- **Zintegrowana Karta Wzorów CKE pod ręką:** Każda formuła w lekcji ma bezpośredni odsyłacz (`Karta wzorów: str. X`), a jedno kliknięcie otwiera oficjalny dokument na właściwej stronie.
- **Dwa czyste tryby nauki:**
  - **Kurs Działowy:** Przejrzysta ścieżka 15 działów tematycznych CKE z paskami opanowania i rdzewienia wiedzy (Campus Rust).
  - **Baza Zadań CKE:** Błyskawiczna przeglądarka autentycznych zadań z arkuszy maturalnych z prostymi filtrami (Dział 1–15 oraz Zamknięte vs Otwarte).
- **Inline Task Solving:** Rozwiązywanie zadań bezpośrednio w kafelkach bez przeładowania ekranu, z dynamicznym renderem KaTeX, osiami liczbowymi, natychmiastowym feedbackiem i wskazówkami egzaminatora.

---

## 📱 3. Architektura Interfejsu (MathStudyHub)

Ekran główny przedmiotu `matematyka` w `App.tsx` przyjmuje architekturę nowoczesnego centrum dowodzenia:

```text
+-------------------------------------------------------------------+
|  [<-]  MATEMATYKA (Formuła 2023)             ❤️ x5  🪙 420  🔥 14 |
+-------------------------------------------------------------------+
|  📊 Przewidywany Wynik CKE: 82% (41/50 pkt)         [Szczegóły]   |
|  ⚠️ 2 działy wymagają powtórki (Campus Rust: Ciągi, Trygonometria)|
+-------------------------------------------------------------------+
|  [ 📚 Kurs Działowy (15 Działów) ]   [ 🎯 Baza Zadań CKE (Filtry) ]|
+-------------------------------------------------------------------+
|  TRYB 1: KURS DZIAŁOWY                                            |
|  • Siatka 15 kafelków działów (Liczby, Algebra, Równania...)      |
|  • Pasek postępu opanowania (0-100%)                              |
|  • Wskaźnik rdzewienia Ebbinghausa                                |
|  • Rozwijana lista mikrolekcji Core-4 z pigułkami Bento           |
|                                                                   |
|  TRYB 2: BAZA ZADAŃ CKE (TASK BROWSER)                            |
|  • Filtry szybkie: [Wszystkie działy ▼] [Wszystkie typy / ABCD / Otwarte ▼] |
|  • Wyszukiwarka po treści zadania lub roczniku                    |
|  • Kafelki zadań z plakietką CKE (np. "Matura Maj 2024 (PP)")     |
|  • Rozwiązywanie INLINE w karcie zadania                          |
|  • Szybki podgląd Karty Wzorów CKE                                |
+-------------------------------------------------------------------+
|  💼 PŁYWAJĄCY PRZYCISK: [ 📐 Oficjalna Karta Wzorów CKE ]         |
+-------------------------------------------------------------------+
```

---

## 🔄 4. 15 Działów Tematycznych (wymagania egzaminacyjne CKE od 2025 r.)

Numeracja działów jest jedna w całej aplikacji (`MATH_SECTIONS`, mapa nauki, zadania CKE, generator arkuszy).
Każdy dział ma 5 mikrolekcji; każda lekcja ma własną pigułkę Core-4 i pulę 20 zadań.

1. **Dział 1: Liczby rzeczywiste** – Potęgi; Pierwiastki; Logarytmy; Wartość bezwzględna; Procenty i lokaty. Karta wzorów: str. 4–5, 10.
2. **Dział 2: Wyrażenia algebraiczne** – Wzory skróconego mnożenia; Działania na wielomianach; Rozkład na czynniki; Wyrażenia wymierne; Dowody algebraiczne. Karta wzorów: str. 7.
3. **Dział 3: Równania i nierówności** – Równania i nierówności liniowe; Równania kwadratowe; Nierówności kwadratowe; Równania wielomianowe; Równania wymierne. Karta wzorów: str. 7–8.
4. **Dział 4: Funkcje i ich własności** – Wzór funkcji; Czytanie wykresu; Monotoniczność i znak; Przesunięcia wykresów; Wykładnicza i logarytmiczna. Karta wzorów: str. 4–5.
5. **Dział 5: Funkcja liniowa i układy równań** – Współczynniki a i b; Wzór funkcji liniowej; Układy równań; Układ równań a proste; Zadania tekstowe. Karta wzorów: str. 21–22.
6. **Dział 6: Funkcja kwadratowa** – Trzy postacie; Wierzchołek i oś symetrii; Miejsca zerowe; Wartości skrajne w przedziale; Wyznaczanie wzoru. Karta wzorów: str. 7–8.
7. **Dział 7: Ciągi liczbowe** – Wzór ogólny i rekurencja; Ciąg arytmetyczny; Suma ciągu arytmetycznego; Ciąg geometryczny; Trzy kolejne wyrazy. Karta wzorów: str. 9–10.
8. **Dział 8: Trygonometria** – Definicje sin, cos, tg; Kąty 30°, 45°, 60°; Jedynka trygonometryczna; Kąty rozwarte; Pole i twierdzenie cosinusów. Karta wzorów: str. 10–15.
9. **Dział 9: Planimetria** – Pitagoras i pola trójkątów; Podobieństwo i Tales; Czworokąty; Kąty w okręgu; Łuk, wycinek, okręgi. Karta wzorów: str. 14–20.
10. **Dział 10: Geometria analityczna** – Odległość i środek; Równanie prostej; Równoległe i prostopadłe; Równanie okręgu; Symetrie. Karta wzorów: str. 21–23.
11. **Dział 11: Stereometria** – Graniastosłupy; Ostrosłupy; Kąty w bryłach; Walec, stożek, kula; Bryły podobne. Karta wzorów: str. 24–26.
12. **Dział 12: Kombinatoryka** – Reguła mnożenia; Reguła dodawania; Zliczanie liczb; Bez powtórzeń; Pary i dopełnienie. Karta wzorów: str. 26–27.
13. **Dział 13: Rachunek prawdopodobieństwa** – Model klasyczny; Dwie kostki; Losowanie liczb; Dwa losowania i drzewo; Zdarzenie przeciwne. Karta wzorów: str. 27.
14. **Dział 14: Statystyka** – Średnia arytmetyczna; Średnia ważona; Mediana; Dominanta i odchylenie; Tabele i diagramy. Karta wzorów: str. 29–30.
15. **Dział 15: Optymalizacja** – Pole przy stałym obwodzie; Dziedzina i wierzchołek; Ogrodzenia z przegrodami; Przychód i cena; Schemat za 4 punkty. Karta wzorów: str. 7–8.

Poza zakresem poziomu podstawowego (i dlatego nieobecne w lekcjach): błąd względny i bezwzględny, sześciany sumy/różnicy, dzielenie wielomianów, wzory Viète’a, twierdzenie sinusów, kombinacje, przekształcenia `−f(x)` i `f(−x)`.

---

## 🧩 5. Narzędzia Interaktywne w Lekcjach i Zadaniach

1. **Inline Math Solver:**
   - Czyste formatowanie formuł KaTeX (`MathRenderer`).
   - Obsługa diagramów wektorowych (`MathDiagram`) oraz dynamicznych osi liczbowych (`NumberLineDiagram`).
   - Opcje ABCD o wysokim kontraście ze stanami hover/active.
   - Puste pole numeryczne dla zadań z krótką odpowiedzią.
2. **Wskazówka Egzaminatora:**
   - Wyjaśnienie pułapki CKE odsłaniane natychmiast po błędnym wyborze lub po zaznaczeniu poprawnej odpowiedzi.
3. **Karta Wzorów CKE Modal:**
   - Szybki podgląd oficjalnych tablic CKE Formuła 2023 zintegrowany bezpośrednio z pigułką wiedzy.
4. **Brudnopis (Whiteboard / Scratchpad):**
   - Cyfrowy notatnik do szybkich obliczeń na smartfonie.

---

## 🚀 6. Wdrożenie i Integracja

Moduł matematyki jest zintegrowany w `src/components/math/MathStudyHub.tsx` i renderowany w `App.tsx` symetrycznie do `PolishStudyHub.tsx`, zapewniając spójne, profesjonalne doświadczenie edukacyjne na poziomie platform edtech klasy światowej.

---

## 🧪 7. Skąd biorą się treści matematyczne (jedno źródło prawdy)

Treści nie są pisane ręcznie w komponentach ani w `src/data/*.ts` – powstają w `scripts/math_pp/` i są walidowane przy każdym buildzie.

| Co | Źródło | Polecenie | Wynik |
| --- | --- | --- | --- |
| 75 lekcji (pigułki Core-4) i 1500 zadań autorskich | `scripts/math_pp/dzial_01.js` … `dzial_15.js`, `lib.js` | `node scripts/math_pp/build.js` | `src/data/math/generated/math_blueprints.json`, `all_1500_tasks.json` |
| 211 autentycznych zadań CKE (6 arkuszy 2023–2024) | `scripts/math_pp/cke/<arkusz>.js` | `node scripts/math_pp/build_cke.js` | `AUTHENTIC_CKE_TASKS` w `src/data/math/allMathTasks.ts`, `seed/curriculum/exams/*.json`, `zadania_matura.json`, `cke_tasks_matematyka.json`, `official_cke_tasks_reference.json` |

Zabezpieczenia jakości:

- **Zadania autorskie:** poprawna odpowiedź jest liczona arytmetycznie, a następnie niezależnie odczytywana z tekstu LaTeX właściwej opcji (`evalTex`) – rozjazd przerywa build. Linter odrzuca m.in. powtórzone lub równe wartością opcje, kropkę dziesiętną, artefakty typu `1x`, symbole formalnej logiki (`\iff`, `ee`, `\wedge`, `orall`, `\exists`) oraz odwołanie do rysunku bez rysunku.
- **Zadania CKE:** klucz każdej transkrypcji jest porównywany z oficjalnym kluczem (wersja A) zapisanym w `scripts/math_pp/cke/official_keys.json`, a suma punktów każdego arkusza musi wynosić 46.
- **Uczciwe etykiety:** zadania autorskie mają `isCke: false` i źródło „JASNE • zadanie autorskie w stylu CKE”; etykietę CKE noszą wyłącznie zadania z arkuszy.
- **Karta wzorów:** numery stron odpowiadają „Wybranym wzorom matematycznym” CKE (wydanie 2023); wzory, których w karcie nie ma (np. reguła mnożenia), są oznaczone jako „do zapamiętania”.
- **Renderowanie:** `src/data/__tests__/mathContentRendering.test.tsx` przepuszcza każdy tekst 75 lekcji, 1500 zadań i 211 zadań CKE przez `MathRenderer`, a każdy rysunek przez `MathDiagram` / `NumberLineDiagram` – wzór, którego KaTeX nie złoży, albo surowy LaTeX widoczny dla ucznia przerywa testy.
- **Testy:** `src/data/__tests__/mathCurriculumIntegrity.test.ts`, `src/data/__tests__/authenticCkeTasks.test.ts`, `src/lib/__tests__/structuredAnswer.test.ts`, `src/services/__tests__/maturaExamGenerator.test.ts`, `src/components/__tests__/CkeFormulaSheetPages.test.ts`.

### Formaty zadań (Format Matrix)

| Format | Gdzie występuje | Jak jest sprawdzany |
| --- | --- | --- |
| `SINGLE_CHOICE` (A–D) | lekcje, arkusze CKE | litera klucza |
| `TRUE_FALSE` – stwierdzenia P/F | lekcje (48 zadań), arkusze CKE | każde stwierdzenie osobno; punkt za komplet (klucz np. `PF`) |
| `TWO_PART` – „A/B oraz 1/2/3” i tabele z dopasowaniem | arkusze CKE | `parts`; tabele: punkt za każdą poprawną pozycję |
| `MULTI_CHOICE` – „wybierz dwie odpowiedzi” | arkusze CKE | 2 pkt za obie, 1 pkt za dokładnie jedną poprawną (zasady CKE) |
| `NUMERIC_INPUT` | lekcje, arkusze CKE | porównanie liczbowe (przecinek dziesiętny) |
| `OPEN_CALCULATION` / `OPEN_PROOF` | arkusze CKE, arkusze próbne | AI Tutor według rozwiązania wzorcowego |

Logika punktacji formatów strukturalnych jest w `src/lib/structuredAnswer.ts`, a wspólne pole odpowiedzi w `src/components/math/StructuredAnswerInput.tsx` (symulator, maraton, bank zadań, lekcje w MathStudyHub). W silniku sesji (`SessionRunner`) zadania P/F korzystają z natywnej obsługi pola `statements`.

### Firestore

`node scripts/math_pp/build.js` zapisuje też `seed/curriculum/curriculum_matematyka_pp.json` – ten sam kurs w schemacie `subjects/{id}/topics/{id}/lessons/{id}`. `scripts/seed_database.cjs` wgrywa właśnie ten plik (starszy `curriculum_matematyka.json` z 21 działami pozostaje wyłącznie danymi testowymi), a arkusze CKE bierze z `seed/curriculum/exams/*.json` i `zadania_matura.json`. Po każdej zmianie treści trzeba ponownie uruchomić zasilanie, żeby dokumenty w Firestore odpowiadały aplikacji; sama aplikacja czyta matematykę z paczki (0 odczytów).
