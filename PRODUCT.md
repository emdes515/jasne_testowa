# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Maturzyści w wieku 18–19 lat zdający egzamin maturalny z matematyki (oraz języka polskiego) w Nowej Formule 2023 CKE. Uczą się głównie na smartfonie, często wieczorami lub w drodze, zmagając się ze stresem egzaminacyjnym, prokrastynacją i brakiem czasu.

## Product Purpose
JASNE to platforma edukacyjna nowej generacji dla maturzystów, która eliminuje chaos i lęk przed egzaminem dojrzałości. Zamiast biernego oglądania wielogodzinnych materiałów wideo, JASNE rozbija całą podstawę programową CKE na natychmiastowe, 4–6 minutowe sesje mikrolearningowe Core-4 oraz autentyczny symulator arkuszy maturalnych CKE.

## Positioning
Jedyne rozwiązanie maturalne łączące 100% autentyczną bazę zadań CKE (1006 oficjalnych pytań z sesji głównych, dodatkowych i arkuszy pokazowych Formuła 2023) z natychmiastowym feedbackiem, analizą pułapek egzaminacyjnych CKE, bazą własnych błędów oraz predyktorem wyniku maturalnego w czasie rzeczywistym.

## Operating Context
Uczeń korzysta z aplikacji mobilnie w mikro-sesjach (20–35 min Mini Matury lub 4–6 min lekcje) w trybie web mobile / PWA. Doświadczenie opiera się na pętlach zaangażowania (streaki, odznaki, wirtualna ekonomia z sercami i monetami) oraz partnerskim, bezpośrednim języku pozbawionym protekcjonalizmu.

## Capabilities and Constraints
- **Metodyka Core-4**: Każda lekcja składa się z esencji konceptu, kontekstu maturalnego, formuł KaTeX z numerem strony w Karcie Wzorów CKE, przykładu z pełnym rozwiązaniem oraz pułapki egzaminacyjnej CKE.
- **Symulator Matur CKE**: 4 filary – Mini Matury (ekspresowe 7 lub 12 zadań z zegarem), Pełne Arkusze CKE 180 min (sesje 2023-2024), Bank 15 Działów z indywidualnym paskiem opanowania materiału, 1-Click Quick Drill oraz Baza Twoich Błędów.
- **Architektura BFF (Backend-for-Frontend)**: Wszystkie zapytania AI i klucze API (Gemini, OpenRouter) są hermetycznie chronione po stronie serwera Express.
- **Firestore Cache-First**: Treści merytoryczne ładowane są z Cloud Firestore z buforowaniem pamięci podręcznej.

## Brand Commitments
- **Nazwa**: JASNE. („Matura staje się prosta”)
- **Design System**: Nocturne Luminary – głębokie tła `#070A0F` i `#0E1522`, złoty bursztyn `#FFB800`, szmaragd `#10B981` (oficjalne arkusze CKE), crimson `#F43F5E` (błędy i pułapki CKE).
- **Styl komunikacji**: Bezpośredni, kumpelski, motywujący, bez akademickiego zadęcia.

## Evidence on Hand
- Skonsolidowana baza 1006 autentycznych zadań CKE Formuła 2023 (`seed/curriculum/cke_tasks_matematyka.json`).
- Baza 15 działów i 225 lekcji matematyki podstawowej (`seed/curriculum/curriculum_matematyka.json`).
- Oficjalna Karta Wzorów CKE 2023 z przypisanymi numerami stron (`ckeFormulasData.ts`).
- Recenzowane badania naukowe w Drugim Mózgu: Maloney (Math Anxiety), Ding (Socratic AI), Sweller (Cognitive Load Theory), Sailer (Gamification Retention).

## Product Principles
1. **Zero Tarcia (Time-to-Value < 30 s)**: Start sesji i rozwiązywanie zadań CKE dostępne od razu, bez zbędnych barier i wieloetapowej konfiguracji.
2. **Trap-Driven Learning**: Każde wyjaśnienie błędu musi adresować przyczynę pomyłki i pułapkę CKE, a nie tylko podawać suchy wynik.
3. **Ochrona Kapitału Zaangażowania (Loss Aversion)**: Ochrona streaku (zamrażacze), wirtualna ekonomia oraz automatyczne przekazywanie trudnych pytań do Bazy Błędów.
4. **Wierność Egzaminacyjna**: Wyłącznie autentyczne zadania, standardy i terminologia CKE Nowa Formuła 2023.

## Accessibility & Inclusion
- Wysoki kontrast kolorystyczny (WCAG AA) na ciemnym tle OLED.
- Formuły matematyczne renderowane w KaTeX z horyzontalnym przewijaniem na wąskich ekranach smartfonów.
- Minimalne cele dotykowe 44 × 44 px dla wszystkich kluczowych interakcji mobilnych.
