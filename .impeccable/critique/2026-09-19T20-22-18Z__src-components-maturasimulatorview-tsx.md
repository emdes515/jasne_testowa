---
target: src/components/MaturaSimulatorView.tsx
total_score: 23
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 2
target_identity: "file:C:\\Users\\mateu\\Downloads\\0.45-main\\src\\components\\MaturaSimulatorView.tsx"
target_fingerprint: "sha256:938f5e7390d1ee7abe5b41764362938b3f56a39ab738c14b9cff4aa4cff876c2"
target_path: "C:\\Users\\mateu\\Downloads\\0.45-main\\src\\components\\MaturaSimulatorView.tsx"
timestamp: 2026-09-19T20-22-18Z
slug: src-components-maturasimulatorview-tsx
---
Method: dual-agent (A: 74405911-1440-40a8-9441-c12f4786e42a · B: 330c7054-d8fc-44b8-b4ce-f691c33d8dbe)

# Design Critique: Symulator Matur CKE (`MaturaSimulatorView.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|:---|:---:|:---|
| 1 | Visibility of System Status | 3/4 | Dobry zegar i paski postępu; brak wskaźnika autozapisu sesji |
| 2 | Match System / Real World | 2/4 | Autentyczne pojęcia CKE, ale samoocena otwartych w trakcie zegara łamie realizm |
| 3 | User Control and Freedom | 2/4 | Pauza działa, ale brak historii nawigacji (powrót z drillu gubi katalog działu) |
| 4 | Consistency and Standards | 1/4 | Przejście do MaturaExamReview.tsx zmienia Nocturne Luminary na fiolet/indygo Tailwind |
| 5 | Error Prevention | 2/4 | W maratonie dotknięcie opcji natychmiast zalicza odpowiedź (miss-click przy scrollu) |
| 6 | Recognition Rather Than Recall | 3/4 | Wzory CKE i Brudnopis pod ręką; brak oznaczeń zadań otwartych na wstędze 31 pytań |
| 7 | Flexibility and Efficiency | 3/4 | 1-Click Quick Drill świetny na mobile; brak skrótów klawiszowych (1-4, Enter) na desktopie |
| 8 | Aesthetic and Minimalist Design | 2/4 | KaTeX czysty; antywzorzec `animate-bounce` w pauzie oraz 16 celów dotykowych <44px |
| 9 | Error Recovery | 3/4 | Pułapka CKE i Baza Błędów znakomite; brak Pułapki CKE w podsumowaniu arkusza |
| 10 | Help and Documentation | 2/4 | Karta wzorów zintegrowana; brak wyjaśnienia działania predyktora i punktacji CKE |
| **Total** | | **23/40** | **Wymaga doszlifowania (Needs Refinement)** |

## Design Specificity Verdict

### LLM Assessment
Symulator CKE posiada wybitne zakorzenienie merytoryczne w specyfice egzaminu dojrzałości: 1006 oficjalnych zadań CKE, podział na 15 działów maturalnych, pigułki pułapek CKE (`ckeTrap`) oraz zintegrowany brudnopis i Karta Wzorów 2023. Jednak na styku komponentów występuje krytyczne pęknięcie tożsamości wizualnej: ekran podsumowania egzaminu (`MaturaExamReview.tsx`) porzuca Nocturne Luminary i przechodzi w fiolet/indygo, a dialogi natywne `window.alert()` i `window.confirm()` obnażają surowy silnik przeglądarki.

### Deterministic Scan
Detektor CLI wykrył **19 znalezisk** (1 Warning, 18 Advisory):
- **1 Warning (`bounce-easing` na linii 1336):** Niepotrzebna animacja `animate-bounce` na ikonie zapauzowanego arkusza, podnosząca poziom stresu.
- **1 Błąd czytelności (`text-[9px]` na linii 722):** Zbyt mały tekst etykiety `Szybki start` na ekranach OLED smartfonów.
- **4 Błędy rampy typograficznej (`text-[10px]`):** Zastosowanie rozmiaru 10px na zwykłych etykietach tekstowych (`Predictor:`, `Arkusze:`, punkty).
- **13 False Positives / Wyborów domenowych:** Rozmiar 10px w pigułkach statusowych (`31 zadań • 50 pkt`, `Formuła 2023`) ratujący gęsty układ Bento przed łamaniem wiersza.

### Visual Overlays & Browser Evidence (Mobile 390×844px)
- **Dock Clearance:** Zastosowany margines dolny `pb-40` (160px) zapewnia wzorowy prześwit nad 68px dolnym dockiem nawigacji.
- **Touch Targets:** 16 elementów interaktywnych (przyciski Wzory, Brudnopis, Wróć, Pauza, Oflaguj, Oddaj arkusz) ma wysokość 28–36px, poniżej progu 44px WCAG.
- **Kontrasty OLED:** Wszystkie kluczowe tokeny spełniają WCAG AAA (>10:1 dla `#FFB800`, >7:1 dla `#10B981`, >17:1 dla `#F8FAFC`).

## Overall Impression
Imponujący, unikalny na polskim rynku silnik symulatora CKE z bogatą bazą pytań i natychmiastowym feedbackiem pułapek egzaminacyjnych. Aby platforma osiągnęła poziom światowej klasy EdTechu, należy wyeliminować przypadkowe zatwierdzanie odpowiedzi przy scrollu mobilnym, ujednolicić ekran podsumowania z systemem Nocturne Luminary oraz powiększyć strefy dotyku do min. 44px.

## What's Working
1. **Autentyczna architektura 4 filarów CKE:** Podział na Mini Matury z zegarem, pełne arkusze rocznikowe, 15 działów oraz szybki trening losowy 1-click idealnie trafia w potrzeby maturzysty.
2. **Pętla rehabilitacji błędów (Baza Twoich Błędów):** Automatyczne zapisywanie pomyłek i możliwość ich natychmiastowego przetrenowania jednym kliknięciem.
3. **Cyfrowy pulpit egzaminacyjny:** Błyskawiczny dostęp do oficjalnej Karty Wzorów CKE i Brudnopisu bez opuszczania widoku pytania.

## Priority Issues

### 🔴 [P0] Przypadkowe zatwierdzanie odpowiedzi przy scrollowaniu na mobile
- **Problem:** W trybie szybkiego treningu (`maraton`) dotknięcie kafelka opcji A/B/C/D natychmiast wywołuje `handleMaratonAnswer`, blokuje zadanie i dodaje je do bazy błędów.
- **Dlaczego to ważne:** Uczeń przewijający ekran kciukiem niechcący rejestruje błędne odpowiedzi i niszczy statystyki.
- **Rozwiązanie:** Wprowadzenie dwustopniowego wyboru: dotknięcie zaznacza odpowiedź (ramka bursztynowa), a zatwierdzenie wymaga kliknięcia przycisku "Zatwierdź odpowiedź".
- **Sugerowana komenda:** `$impeccable polish src/components/MaturaSimulatorView.tsx`

### 🔴 [P0] Nierealistyczna samoocena zadań otwartych w trakcie egzaminu z zegarem
- **Problem:** W trybie arkusza z odliczającym zegarem 180 min, uczeń musi sam wybrać `0 pkt`, `1 pkt` lub `2 pkt` przed poznaniem oficjalnego klucza CKE.
- **Dlaczego to ważne:** Niszczy realizm symulacji egzaminu i zmusza do sztucznej samooceny pod presją czasu.
- **Rozwiązanie:** W trakcie egzaminu uczeń zaznacza jedynie `[x] Rozwiązane w brudnopisie`. Właściwa ocena punktowa z kryteriami CKE następuje w podsumowaniu arkusza.
- **Sugerowana komenda:** `$impeccable polish src/components/MaturaSimulatorView.tsx`

### 🟠 [P1] Zerwanie systemu wizualnego w `MaturaExamReview.tsx`
- **Problem:** Po oddaniu arkusza widok podsumowania przełącza się na fioletowo-indygo motyw Tailwind (`bg-[#1A1B23]`, `from-purple-600 to-indigo-600`).
- **Dlaczego to ważne:** Narusza spójność z `DESIGN.md` (Nocturne Luminary) i obniża poczucie dopracowania produktu.
- **Rozwiązanie:** Przeniesienie `MaturaExamReview.tsx` na tokeny `surface-card` (`#0E1522`), `#FFB800`, `#10B981` i `#F43F5E`.
- **Sugerowana komenda:** `$impeccable polish src/components/MaturaExamReview.tsx`

### 🟠 [P1] Zbyt małe cele dotykowe na smartfonie (<44px)
- **Problem:** Przyciski narzędziowe w nagłówku (Wróć, Wzory, Brudnopis) oraz akcje arkusza (Pauza, Oflaguj, Oddaj) mają wysokość 28–36px.
- **Dlaczego to ważne:** Ryzyko nietrafienia kciukiem na telefonie, szczególnie w stresie egzaminacyjnym.
- **Rozwiązanie:** Ustawienie `min-h-[44px] min-w-[44px]` na wszystkich przyciskach akcji.
- **Sugerowana komenda:** `$impeccable adapt src/components/MaturaSimulatorView.tsx`

### 🟡 [P2] Agresywne pulsowanie zegara poniżej 5 minut
- **Problem:** Efekt `animate-pulse text-rose-400` wywołuje nadmierny stres i panikę u zdających.
- **Dlaczego to ważne:** Maturzyści z lękiem przed matematyką zaczynają popełniać chaotyczne błędy.
- **Rozwiązanie:** Zastąpienie migotania statycznym bursztynowo-czerwonym akcentem z dyskretnym komunikatem "Ostatnie 5 minut – sprawdź odpowiedzi".
- **Sugerowana komenda:** `$impeccable quieter src/components/MaturaSimulatorView.tsx`

## Persona Red Flags

### Kasia (Stresowana maturzystka, 3 miesiące do matury, lęk przed matematyką)
- **Czerwona flaga 1:** Agresywne miganie czerwonego zegara w ostatnich minutach wywołuje paraliż decyzyjny.
- **Czerwona flaga 2:** Komunikat `✕ Poniżej progu 30%` potęguje poczucie bezradności zamiast motywować do zdobycia brakujących 3–4 punktów na łatwych działach.

### Bartek (Ambitny uczeń mierzący w 95%+, speed-driller)
- **Czerwona flaga 1:** Brak skrótów klawiaturowych (1-4 / A-D, Enter) na desktopie spowalnia tempo rozwiązywania zadań seryjnych.
- **Czerwona flaga 2:** Surowy browser popup `alert()` po ukończeniu maratonu gasi motywację; oczekuje statystyk tempa (np. 1.8 min/zadanie) i mnożników XP.

## Minor Observations
1. **Brak filtra oflagowanych:** Uczeń może oflagować zadania, ale musi ręcznie przewijać 31 kropek, by je odnaleźć.
2. **Ucinanie ułamków w spisie zadań:** `line-clamp-2` w widoku katalogu działu może pionowo obcinać złożone ułamki KaTeX.
3. **Pusty stan błędów:** Kliknięcie w pustą Bazę Błędów powinno wyświetlać motywującą ilustrację i zaproszenie do testu diagnostycznego zamiast `alert()`.

## Questions to Consider
- *Co jeśli zadania otwarte w arkuszu byłyby oceniane przez asystenta AI ze zdjęć brudnopisu (Socratic OCR), zamiast surowego klikania punktów?*
- *Czy Mini Matury mogłyby wyświetlać delikatny wskaźnik sugerowanego tempa egzaminacyjnego (np. "Świetne tempo: 2.5 min/zadanie")?*
- *Jak wyglądałby ekran podsumowania, który zamiast suchego wyniku 24% podaje gotową receptę: "Oto 3 zadania, które dadzą Ci 34% i zdany egzamin"?*
