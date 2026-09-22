---
name: dynamic-learning-ui
description: "Build dynamic, interactive learning interfaces, math manipulatives, explorable explanations, and step-by-step scaffolds for EdTech applications (specifically JASNE Core-4 microlearning). Use when designing or implementing interactive sliders, draggable points, parameter-driven graphs (Mafs/SVG), interactive number lines, dynamic KaTeX-synced diagrams, and active recall task widgets in React, Tailwind CSS, and Framer Motion."
---

# Dynamic Learning UI & Interactive Manipulatives Skill

Ten skill instruuje agenta, jak projektować i implementować **dynamiczne, interaktywne interfejsy edukacyjne** (tzw. *Explorable Explanations* w stylu Breta Victora i interaktywne widgety w stylu Khan Academy / 3Blue1Brown) w platformie **JASNE** (React, TypeScript, Tailwind CSS, Framer Motion, KaTeX, Lucide).

---

## 🎯 Kluczowe Założenia Dydaktyczne (Core-4 & Active Learning)

1. **Zasada Bezpośredniej Manipulacji (Direct Manipulation):**
   - Uczeń nie powinien tylko czytać wzoru — powinien mieć możliwość zmiany parametrów (suwakiem, przeciąganiem punktu) i natychmiastowego zobaczenia reakcji wizualnej.
2. **Dwukierunkowa Synchronizacja (Formula $\leftrightarrow$ Visual Sync):**
   - Zmiana parametru na suwaku lub wykresie natychmiast aktualizuje formułę w KaTeX (np. zmiana $a, p, q$ w postaci kanonicznej funkcji kwadratowej podświetla zmieniający się człon we wzorze i na paraboli).
3. **Redukcja Obciążenia Poznawczego (Cognitive Load Theory):**
   - Interaktywny widget musi być skupiony na **jednym konkretnym zjawisku** (np. „Co robi znak $a$ w paraboli?”, „Czym jest $r$ w nierówności z wartością bezwzględną?”).
   - Unikaj przeładowania: maksymalnie 2–3 interaktywne kontrolki na widget.
4. **Wskaźnik Pułapek CKE (Trap-Driven Feedback):**
   - Gdy uczeń ustawi parametry w strefie typowego błędu maturalnego (np. $a = 0$ w równaniu kwadratowym lub ujemna liczba pod pierwiastkiem parzystego stopnia), interfejs natychmiast wyświetla dyskretny, cyber-tactile alert pułapki CKE.

---

## 🛠️ Architektura Komponentów Dynamicznych w JASNE

### 1. Paleta i Stylistyka (Nocturne Luminary)
- **Tło widgetu:** `bg-[#0e1522]` (surface-card) z obramowaniem `border-[#1e293b]` i `rounded-2xl`.
- **Aktywny parametr / wskaźnik:** `text-[#ffdca1]` / `bg-[#ffb800]` (bursztynowo-złoty akcent).
- **Strefa błędu / pułapki:** `border-[#f43f5e]/50 text-[#f43f5e] bg-[#f43f5e]/10`.
- **Suwaki (Sliders):** Duże dotykowe uchwyty (min. `h-7 w-7` lub `min-h-[44px]` touch target na mobile), z haptic feedbackiem (`triggerHaptic('selection')`).

### 2. Formaty Widgetów Edukacyjnych

#### Typ A: Dynamiczny Eksplorator Funkcji / Wykresu (Function Explorer)
- **Zastosowanie:** Funkcja liniowa ($y = ax+b$), kwadratowa ($y = a(x-p)^2+q$), wykładnicza ($y = a^x$).
- **Elementy:**
  - Dynamiczny układ współrzędnych SVG (lub Mafs).
  - Płynnie interpolowana ścieżka `<path d={generatePath(params)} />` animowana przez Framer Motion.
  - Wycentrowany kaseton z dynamiczną formułą KaTeX.
  - Dotykowe suwaki z presetami kluczowych punktów CKE (np. $a > 0$, $a < 0$, $a = 0$).

#### Typ B: Interaktywna Oś Liczbowa z Suwakiem (Interactive Number Line)
- **Zastosowanie:** Nierówności z wartością bezwzględną ($|x - a| \le r$), badanie znaku ciągu ($a_n > 0$), przedziały liczbowe.
- **Elementy:**
  - Wektorowa oś z podziałką.
  - Przeciągane punkty brzegowe z przełącznikiem kropki otwartej ($\circ$) / domkniętej ($\bullet$).
  - Dynamiczny zapis przedziału $x \in \langle a-r, a+r \rangle$.

#### Typ C: Krokowy Scaffolding / Odwrócone Rozwiązywanie (Step-by-Step Interactive Scaffolder)
- **Zastosowanie:** Równania z wartością bezwzględną, rozkład na czynniki, przekształcenia wzorów.
- **Elementy:**
  - Zadanie podzielone na 2–3 mikro-kroki.
  - Uczeń nie wpisuje całego rozwiązania na raz; klika/wybiera poprawną operację elementarną (np. „Dodaj 4 obustronnie”, „Podziel przez 2”).
  - Po poprawnym wyborze animuje się przejście do kolejnego wiersza równania.

#### Typ D: Interaktywny Manipulator Geometryczny (Geometry Manipulative)
- **Zastosowanie:** Kąty środkowe i wpisane, twierdzenie Pitagorasa, podobieństwo trójkątów.
- **Elementy:**
  - Okrąg ze swobodnie przesuwanym punktem na łuku okręgu.
  - Kąt wpisany dynamicznie pokazuje $\alpha$, podczas gdy kąt środkowy pokazuje $2\alpha$, bez względu na pozycję wierzchołka na łuku.

---

## 📱 Standardy Mobilne & Dostępność (Mobile-First)

1. **Zero Hover-Only:** Wszystkie interakcje muszą działać na pojedyncze dotknięcie (tap) lub przeciągnięcie (drag).
2. **Rozmiary celów dotykowych:** Przyciski i suwaki minimum $44 \times 44\text{ px}$.
3. **Płynność 60 FPS:** Unikaj ciężkich re-renderów całej lekcji — izoluj stan interaktywnego manipulatora w dedykowanym komponencie z `React.memo` lub lokalnym `useState`.
4. **Haptyka:** Zawsze wywołuj `triggerHaptic('selection')` przy zmianie wartości dyskretnej oraz `triggerHaptic('success')` przy poprawnym rozwiązaniu.
