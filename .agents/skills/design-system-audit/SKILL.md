---
name: design-system-audit
description: >-
  Audits visual design, design token consistency, typography, color contrast, layout spacing, and Tailwind CSS implementation against design system specifications.
  Use when the user requests a UI audit, design system consistency review, Tailwind code review, or visual polish of components and pages.
---

# Design System & UI Consistency Audit Skill

Skill do technicznego i wizualnego audytu **Design Systemu**, czystości kodu Tailwind CSS, hierarchii typograficznej, kontrastu kolorów oraz spójności komponentów UI.

---

## 1. Obszary Weryfikacji

### A. Spójność z Tokenami Design Systemu (`design.md_jasne_edtech_design_system.md` / `DESIGN.md`)
* **Kolory i Semantyka**:
  - Czy w kodzie używane są zdefiniowane tokeny (np. `bg-primary`, `text-muted-foreground`, `border-border`), czy występują "magiczne" wartości HEX/RGB (np. `text-[#3B82F6]`, `bg-[#f8f9fa]`)?
  - Czy kolory semantyczne (sukces, błąd, ostrzeżenie, informacja) są jednolite w całej aplikacji?
* **Typografia i Skala Tekstu**:
  - Czy nagłówki zachowują ścisłą hierarchię (H1: `text-3xl font-bold`, H2: `text-2xl font-semibold`, itd.)?
  - Czy tekst pomocniczy ma odpowiedni rozmiar i czytelność (`text-sm`, `text-xs`)?
  - Czy wzory matematyczne (KaTeX) wtapiają się harmonijnie w rytm tekstu i nie powodują dziwnych przeskoków interczerpaka (line-height)?

### B. Odstępy (Spacing Scale) i Rytm Pionowy
* Czy marginesy i dopełnienia (padding) bazują na siatce 4px/8px (`p-2`, `p-4`, `p-6`, `gap-4`)?
* Wykrywanie arbitralnych wartości Tailwind (np. `p-[13px]`, `mt-[7px]`, `gap-[18px]`) i zamiana na standardowe klasy skali Tailwind.

### C. Komponenty Bazowe (UI Component Library)
Sprawdź spójność implementacji powtarzalnych elementów w `src/components/`:
* **Przyciski (`Button`)**:
  - Warianty: Primary, Secondary, Ghost, Outline, Destructive.
  - Rozmiary: Small, Medium, Large.
  - Stany: Normal, Hover, Active, Focus-visible (outline), Disabled (z `cursor-not-allowed` i zmniejszonym `opacity`), Loading (ze spinnerem i zablokowanym klikaniem).
* **Pola wejściowe (`Input`, `Textarea`)**:
  - Czytelny label, placeholder, stan błędu z czerwoną ramką i komunikatem pod spodem.
* **Karty i Kontenery (`Card`, `Surface`)**:
  - Jednolite zaokrąglenia (`rounded-xl` / `rounded-2xl`).
  - Jednolite cienie (`shadow-sm`, `shadow-md`) – unikanie przesadnych, brudnych cieni.

### D. Kontrast i Dostępność Wizualna (WCAG AA)
* Czy kontrast tekstu do tła wynosi co najmniej:
  - **4.5:1** dla normalnego tekstu,
  - **3:1** dla dużego tekstu (powyżej 18pt / 24px) oraz elementów interfejsu (ikony, ramki inputów)?
* Czy w trybie ciemnym (Dark Mode - jeśli istnieje) nie ma czystej czerni `#000` kontrastującej z czystą bielą `#fff` (powodującej zmęczenie wzroku)?

### E. Responsywność i Touch Targets
* **Mobile-first**: Czy interfejs nie generuje niepożądanego poziomego paska przewijania (`overflow-x`) na małych ekranach (360px - 430px)?
* **Minimalny obszar dotykowy**: Czy każdy przycisk i ikona klikalna na telefonie ma minimum `44x44px` (lub dopełnienie `p-2` / `p-3`)?

---

## 2. Procedura Przeprowadzenia Audytu UI

1. **Skanowanie kodu**: Przeszukaj pliki w `src/` pod kątem:
   - Klas arbitralnych: `grep_search` dla wzorców `-\[[0-9]` lub `-\[#`.
   - Zduplikowanych wariantów stylów przycisków lub kart.
2. **Porównanie ze specyfikacją**: Zestaw znalezione komponenty z założeniami z plików `DESIGN.md` i `design.md_jasne_edtech_design_system.md`.
3. **Przygotowanie Diffs & Refactoring**: Przedstaw konkretne propozycje refaktoryzacji klas Tailwind na spójne komponenty / utility classes.
