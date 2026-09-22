---
name: Nocturne Luminary & Solar Luminary Dual-Theme EdTech
themes:
  dark: Nocturne Luminary
  light: Solar Luminary
colors-dark:
  background-base: '#070A0F'
  surface-card: '#0E1522'
  surface-card-hover: '#141D2E'
  surface-elevated: '#141D2E'
  surface-border: rgba(255, 255, 255, 0.08)
  surface-border-hover: rgba(255, 255, 255, 0.16)
  surface-border-active: '#FFB800'
  primary: '#FFB800'
  primary-hover: '#FFC72C'
  primary-glow: rgba(255, 184, 0, 0.25)
  primary-dark: '#B37F00'
  text-primary: '#F8FAFC'
  text-secondary: '#94A3B8'
  text-muted: '#64748B'
  text-subtle: '#475569'
  text-accent: '#FFB800'
  alert-crimson: '#F43F5E'
  alert-crimson-bg: rgba(244, 63, 94, 0.12)
  streak-flame: '#EA580C'
  accent-success: '#10B981'
  accent-blue: '#38BDF8'
  accent-purple: '#8B5CF6'
colors-light:
  background-base: '#F8F9FC'
  surface-card: '#FFFFFF'
  surface-card-hover: '#F1F5F9'
  surface-elevated: '#FFFFFF'
  surface-border: '#E2E8F0'
  surface-border-hover: '#CBD5E1'
  surface-border-active: '#D97706'
  primary: '#D97706'
  primary-hover: '#B45309'
  primary-glow: rgba(217, 119, 6, 0.2)
  primary-dark: '#92400E'
  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-muted: '#64748B'
  text-subtle: '#94A3B8'
  text-accent: '#D97706'
  alert-crimson: '#E11D48'
  alert-crimson-bg: rgba(225, 29, 72, 0.08)
  streak-flame: '#EA580C'
  accent-success: '#059669'
  accent-blue: '#0284C7'
  accent-purple: '#7C3AED'
motion:
  spring-snappy:
    type: spring
    stiffness: 450
    damping: 32
  spring-smooth:
    type: spring
    stiffness: 300
    damping: 25
  spring-bouncy:
    type: spring
    stiffness: 400
    damping: 20
  duration-micro: 0.15s
  duration-short: 0.25s
  duration-medium: 0.35s
  active-scale: 0.97
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
  label-xs:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
  metric-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

# Design System: Nocturne Luminary & Solar Luminary EdTech

## 1. Wizja Marki & Filozofia Stylu

Wizualna tożsamość **JASNE.** wspiera bezstresowe, intensywne i skuteczne przygotowanie maturzysty do egzaminów CKE z matematyki i języka polskiego. Nazwa marki („Jasne!”) reprezentuje olśnienie, klarowność, prostotę i natychmiastowe zrozumienie skomplikowanych koncepcji.

Aplikacja wspiera dwa dopełniające się, dopracowane motywy:
1. **Nocturne Luminary (Dark Mode):** Głęboki, inky-czarny kosmos (`#070A0F`, `#0E1522`) redukujący zmęczenie oczu podczas wieczornych sesji nauki, z radiantnym bursztynowo-złotym akcentem (`#FFB800`).
2. **Solar Luminary (Light Mode):** Ciepły, papierowy minimalizm (`#F8F9FC`, czyste karty `#FFFFFF`) z precyzyjnymi ramkami 1px (`#E2E8F0`) i kontrastowo skalibrowanym bursztynem (`#D97706` / `#B45309`), idealny do nauki w świetle dziennym i na zewnątrz.

---

## 2. Architektura Barw & Kontrast WCAG

W obu motywach rygorystycznie przestrzegamy standardu WCAG AAA / AA dla tekstu i elementów interaktywnych:

| Rola Semantyczna | Nocturne Luminary (Dark) | Solar Luminary (Light) | Zastosowanie |
| :--- | :--- | :--- | :--- |
| `background-base` | `#070A0F` | `#F8F9FC` | Płótno bazowe całej aplikacji |
| `surface-card` | `#0E1522` | `#FFFFFF` | Karty lekcji, panele Bento, moduły |
| `surface-card-hover` | `#141D2E` | `#F1F5F9` | Stan najechania karty |
| `surface-border` | `rgba(255,255,255,0.08)` | `#E2E8F0` | Subtelne krawędzie 1px |
| `primary` | `#FFB800` | `#D97706` | Główny kolor akcji, aktywne pastylki |
| `primary-hover` | `#FFC72C` | `#B45309` | Hover głównego przycisku |
| `text-primary` | `#F8FAFC` | `#0F172A` | Tytuły, treść pytań, formuły matematyczne |
| `text-secondary` | `#94A3B8` | `#475569` | Podtytuły, etykiety wyjaśnień |
| `text-muted` | `#64748B` | `#64748B` | Dyskretne metryki, daty |
| `alert-crimson` | `#F43F5E` | `#E11D48` | Błędy, pułapki CKE, brak serc |
| `accent-success` | `#10B981` | `#059669` | Sukces, opanowana lekcja, poprawny wynik |
| `streak-flame` | `#EA580C` | `#EA580C` | Płomień passy i retencji |

---

## 3. Typografia & Czytelność

- **Nagłówki i Metryki:** *Plus Jakarta Sans* (`display-hero`, `headline-xl`, `headline-lg`, `text-metric`). Nowoczesna geometria, szerokie oczka, zoptymalizowana pod polskie znaki diakrytyczne.
- **Treść i Wyjaśnienia:** *DM Sans* (`body-lg`, `body-md`, `body-sm`). Maksymalna czytelność ciągłego tekstu zadań i teorii.
- **Liczby i Timery:** Zawsze stylizowane z klasą `font-mono tabular-nums`, zapobiegając drganiom layoutu przy zmianie sekund i punktów XP.
- **Formuły Matematyczne:** Renderowane przez silnik KaTeX z dynamicznym kolorem tekstu `var(--text-primary)` i ciepłym tłem kasetonów `var(--formula-bg)`.

---

## 4. Fizyka Ruchu Cyber-Tactile (Motion Engineering)

Zgodnie z zasadami wyeliminowania AI Slop, interfejs unika pływających w nieskończoność animacji. Wszystkie mikrointerakcje opierają się na fizyce sprężyny (`spring physics`) z biblioteki `motion/react`:

1. **Mikrointerakcja Dotykowa:** Wszystkie klikalne kafelki, przyciski i opcje A/B/C/D reagują sprężystym skalowaniem `whileTap={{ scale: 0.97 }}` z natychmiastowym feedbackiem dotykowym (`triggerHaptic`).
2. **Przełączanie Zakładek:** Pływająca pastylka aktywnej zakładki (zarówno w dolnym docku mobilnym, jak i w bocznej nawigacji oraz w przełącznikach widoków) przemieszcza się płynnie dzięki `layoutId` i sprężynie:
   ```ts
   transition: { type: "spring", stiffness: 450, damping: 32 }
   ```
3. **Kaskadowy Wlot Kart (Stagger):** Listy zadań i sekcje ładują się z dyskretną kaskadą 30ms i czasem trwania 250ms, dając poczucie lekkości bez spowalniania użytkownika.
4. **Slide-Up Drawer Sheets:** Ekrany feedbacku i arkusze wysuwają się od dołu ekranu z obsługą gestu przeciągnięcia w dół (drag-to-dismiss).
5. **Dostępność Ruchowa:** Każda animacja bezwzględnie respektuje regułę `prefers-reduced-motion: reduce`.

---

## 5. Rygor Inżynierii Wizualnej: Anti-AI-Slop

- **0% Emojis:** Wszystkie stany opierają się na wektorowych ikonach Lucide (`Sun`, `Moon`, `Monitor`, `CheckCircle2`, `Target`, `GraduationCap`).
- **Płaskie, precyzyjne granice:** Brak niepotrzebnych rozmytych neonowych obwódek; wyraziste karty o stałym promieniu `rounded-2xl` (`16px`) lub `rounded-[26px]` (dock mobilny).
- **Zrównoważona gęstość informacji:** 1 kluczowy CTA na ekranie, przejrzysty podział Bento Box.