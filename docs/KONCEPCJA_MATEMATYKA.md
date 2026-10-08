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

## 🔄 4. 15 Działów Tematycznych (Kanon CKE Formuła 2023)

1. **Dział 1:** Liczby rzeczywiste i błędy przybliżeń
2. **Dział 2:** Potęgi, pierwiastki i logarytmy
3. **Dział 3:** Równania i nierówności liniowe oraz kwadratowe
4. **Dział 4:** Układy równań i algebra
5. **Dział 5:** Własności i wykresy funkcji
6. **Dział 6:** Funkcja liniowa i kwadratowa
7. **Dział 7:** Ciągi liczbowe (arytmetyczny i geometryczny)
8. **Dział 8:** Trygonometria kąta ostrego i wypukłego
9. **Dział 9:** Planimetria (trójkąty, czworokąty, okręgi)
10. **Dział 10:** Geometria analityczna na płaszczyźnie kartezjańskiej
11. **Dział 11:** Stereometria (graniastosłupy, ostrosłupy, bryły obrotowe)
12. **Dział 12:** Kombinatoryka i reguła mnożenia
13. **Dział 13:** Rachunek prawdopodobieństwa
14. **Dział 14:** Statystyka opisowa (średnia, mediana, odchylenie)
15. **Dział 15:** Zadania optymalizacyjne

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
