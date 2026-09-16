# Design System Specification: JASNE. (Matura z Głowy)
*Theme: Nocturne Luminary EdTech*

## 1. Brand Identity & Vision
**JASNE.** to nowoczesna, wysoce zgamifikowana platforma EdTech przygotowująca uczniów do matury w formule CKE (2023/2024+). Łączy predykcyjny silnik punktowy AI z mikrolekcjami, streakami motywacyjnymi i pojedynkami 1v1 na Arenie.
- **Tone & Voice**: Motywujący, rzeczowy, bezstresowy, precyzyjny, młodzieżowy ale profesjonalny ("Zero lania wody, czyste punkty").
- **Główny kontrast emocjonalny**: Ciemny, wyciszający interfejs (focus mode do nauki nocą) rozświetlony energetycznym, ciepłym żółtym neonem i akcentami gamifikacji.

---

## 2. Color Palette & Tokens

### Core Colors & Surfaces
- `color-surface-bg`: `#0a0e18` (Głęboka czerń kosmosu / tło aplikacji)
- `color-surface-card`: `#131824` (Główna powierzchnia kart i paneli)
- `color-surface-elevated`: `#1a2030` (Elementy uniesione, modale, aktywne stany)
- `color-surface-border`: `rgba(255, 255, 255, 0.08)` (Subtelny obrys separatorów)
- `color-surface-border-active`: `rgba(255, 184, 0, 0.35)` (Złoty akcent ramki)

### Brand & Gamification Accents
- `color-primary-amber`: `#ffb800` (Główny akcent CTA, logo żarówki, XP, monety)
- `color-primary-glow`: `rgba(255, 184, 0, 0.20)` (Poświata dla głównych akcji)
- `color-accent-streak`: `#ff782d` (Płomień streaku, motywacja, intensywność)
- `color-accent-danger`: `#f43f5e` (Prognoza poniżej progu 30%, błędy, utracone życia)
- `color-accent-success`: `#10b981` (Zaliczony cel dzienny, wysoki wynik, +punkty)
- `color-accent-arena`: `#06b6d4` (Niebiesko-turkusowy neon Areny, rankingi)
- `color-accent-ai`: `#a855f7` (Generator pytań AI, predykcje, fiolet inteligentny)

### Typography Colors
- `color-text-primary`: `#ffffff` (Główne nagłówki, kluczowe liczby)
- `color-text-secondary`: `#94a3b8` (Podtytuły, etykiety formularzy, opisy)
- `color-text-muted`: `#64748b` (Metadane, nieaktywne ikony, stopki)
- `color-text-accent`: `#ffb800` (Wyróżnienia punktowe i kluczowe linki)

---

## 3. Typography Scale
- **Primary Font**: `Plus Jakarta Sans`, sans-serif (Nowoczesny, techniczny, świetna czytelność liczb)
- **Display 1** (Wynik procentowy / Hero): `36px / 1.1`, Weight: 800 (ExtraBold)
- **Heading 1** (Tytuły modułów, lekcji): `20px / 1.3`, Weight: 700 (Bold)
- **Heading 2** (Nazwy sekcji, karty narzędzi): `15px / 1.4`, Weight: 600 (SemiBold), Uppercase tracking `0.05em`
- **Body Regular** (Opisy, wskazówki AI): `14px / 1.5`, Weight: 400 (Regular)
- **Body Small / Captions** (Tagi, metadata, badge): `12px / 1.4`, Weight: 500 (Medium)
- **Micro / Status** (Dni streaku, liczniki): `11px / 1.2`, Weight: 700 (Bold)

---

## 4. UI Components & Layout Guidelines

### 1. Radial Progress Dial (Wskaźnik Szansy Zdania)
- Podwójny okrąg SVG ze ściętymi końcami (`stroke-linecap: round`).
- Wewnętrzny wskaźnik bazowy w kolorze `rgba(244, 63, 94, 0.15)` oraz dynamiczny łuk w kolorze koralowym/czerwonym (`#f43f5e`) dla wyników <30% lub szmaragdowym (`#10b981`) dla >70%.

### 2. Gamified Top Bar (Pasek Zasobów)
- Pigułki (Pills) o wysokości `32px` z tłem `rgba(255, 255, 255, 0.05)` i zaokrągleniem `pill (9999px)`.
- Zintegrowane mikroikony: Nieskończone życia ($\infty$), Płomień streaku ($1$), Monety ($65$), Awatar ucznia z ringiem XP.

### 3. Subject Switcher (Przełącznik Przedmiotów)
- Poziomy slider horyzontalny z kafelkami przedmiotów.
- Aktywny przedmiot posiada obrys z gradientem bursztynowym (`#ffb800`) oraz wskaźnik pulsującej kropki.

### 4. Interactive Tool Cards (Narzędzia Egzaminacyjne)
- Tło `surface-card` z gradientem w hover/focus.
- Lewa ikona w zaokrąglonym kwadracie `40x40px` z tłem o przezroczystości `15%` akcentu danej funkcji.
- Etykieta przyrostu punktów (np. `+4.4 pkt do matury`) jako silny motywator behawioralny.

---

## 5. Spacing & Elevation
- **Spacing Grid**: 4px base (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`).
- **Corner Radii**:
  - Małe elementy (badge, tagi): `6px`
  - Kafelki, inputy, przyciski akcji: `12px` - `16px`
  - Główne karty sekcji: `20px` - `24px`
- **Elevation / Shadows**:
  - Subtelne cienie z poświatą neonową: `box-shadow: 0 8px 32px -4px rgba(0, 0, 0, 0.5), 0 0 16px -2px rgba(255, 184, 0, 0.12)`.
