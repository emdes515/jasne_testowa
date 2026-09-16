---
name: ux-heuristic-evaluator
description: >-
  Audits user interface and experience (UI/UX) against Jakob Nielsen's 10 Usability Heuristics and human-centered design principles.
  Use when the user requests a UX audit, usability review, heuristic evaluation, or wants to identify friction points and usability bugs in workflows and components.
---

# UX Heuristic Evaluator Skill

Przeprowadza rygorystyczny audyt heurystyczny interfejsu i doświadczenia użytkownika (UI/UX) na podstawie **10 Heurystyk Jakoba Nielsena** oraz zasad ergonomii kognitywnej.

## 1. Zakres Audytu (10 Heurystyk Nielsena)

Podczas oceny widoków, komponentów i ścieżek użytkownika sprawdź każdy z poniższych punktów:

1. **Widoczność stanu systemu (Visibility of system status)**:
   - Czy użytkownik zawsze wie, co aplikacja w danym momencie robi?
   - Czy zapytania do AI / bazy danych mają czytelne stany ładowania (szkielety, spinnery, wskaźniki postępu, komunikaty "Generuję odpowiedź...")?
   - Czy akcje zakończone sukcesem dają natychmiastowe potwierdzenie (toast, ikona sukcesu, zmiana stanu przycisku)?

2. **Dopasowanie do świata realnego (Match between system and the real world)**:
   - Czy terminologia jest naturalna dla ucznia/nauczyciela, a nie zaczerpnięta z backendu (np. unikanie żargonu: "doc_id", "parse error", "token payload")?
   - Czy metafory wizualne (np. fiszki, zeszyt, zadania, postęp) odzwierciedlają nawyki ze świata edukacji?

3. **Kontrola i swoboda użytkownika (User control and freedom)**:
   - Czy każdą akcję można łatwo anulować, cofnąć lub zresetować?
   - Czy modale mają widoczne ikony zamknięcia [x], reagują na klawisz `Escape` oraz kliknięcie w tło (backdrop)?
   - Czy nawigacja powrotna (wstecz, chlebki / breadcrumbs) jest zawsze dostępna?

4. **Spójność i standardy (Consistency and standards)**:
   - Czy te same akcje (np. "Zatwierdź", "Dalej", "Usuń") mają identyczne kolory, ikony i zachowanie na każdym ekranie?
   - Czy rozmieszczenie nawigacji, przycisków akcji i nagłówków jest jednolite w całej aplikacji?

5. **Zapobieganie błędom (Error prevention)**:
   - Czy interfejs zapobiega wysłaniu pustych formularzy lub błędnych danych wejściowych zanim użytkownik kliknie wyślij?
   - Czy akcje nieodwracalne (np. skasowanie wątku, reset postępów) wymagają wyraźnego potwierdzenia?

6. **Rozpoznawanie zamiast przypominania (Recognition rather than recall)**:
   - Czy użytkownik widzi podpowiedzi, kontekst i wcześniejsze wybory bez konieczności pamiętania ich z poprzedniego ekranu?
   - Czy wzory matematyczne, symbole i instrukcje są czytelnie wyeksponowane w miejscu pracy?

7. **Elastyczność i efektywność (Flexibility and efficiency of use)**:
   - Czy początkujący uczeń przechodzi przez intuicyjny kreator/prowadzenie za rękę, a zaawansowany ma skróty klawiszowe (np. Enter aby wysłać, Cmd/Ctrl+K do szukania)?
   - Czy najczęstsze zadania wymagają minimalnej liczby kliknięć?

8. **Estetyka i minimalizm (Aesthetic and minimalist design)**:
   - Czy ekran nie jest przeładowany niepotrzebnymi informacjami i ozdobnikami?
   - Czy hierarchia wizualna jednoznacznie wskazuje, co jest główną akcją (Primary CTA), a co elementem drugorzędnym?

9. **Pomoc w rozpoznawaniu i naprawie błędów (Help users recognize, diagnose, and recover from errors)**:
   - Czy komunikaty o błędach są pisane prostym językiem z jednoznaczną sugestią: *co się stało i co użytkownik powinien teraz zrobić*?
   - Czy pole z błędem jest wyraźnie podświetlone wraz z opisem pod samym inputem?

10. **Pomoc i dokumentacja (Help and documentation)**:
    - Czy w miejscach skomplikowanych (np. wprowadzanie wzorów LaTeX/KaTeX) dostępny jest tooltip lub ściągawka składni?
    - Czy onboarding wyjaśnia pierwsze kroki bez zmuszania do czytania długiej instrukcji?

---

## 2. Skala Powagi Problemów (Severity Scale 0–4)

Raportując błędy UX, przypisz każdemu znalezisku priorytet:
* **0 - Kosmetyczny**: Nie utrudnia pracy, drobna niespójność wizualna.
* **1 - Niski**: Użytkownik lekko się zawaha, ale sam sobie poradzi.
* **2 - Średni**: Spowalnia pracę lub irytuje, wymaga obejścia.
* **3 - Poważny (High)**: Blokuje typowy flow, użytkownik gubi się lub porzuca zadanie.
* **4 - Katastrofalny (Critical)**: Uniemożliwia korzystanie z kluczowej funkcji produktu.

---

## 3. Procedura Wykonania Audytu

1. **Przejrzyj mapę widoków (`src/routes`, `src/pages` lub `src/components`)**:
   Zidentyfikuj główne ekrany aplikacji: lądowanie, logowanie, dashboard, ekran zadania/lekcji, profil.
2. **Przeanalizuj interakcje**:
   Sprawdź stany: Domyślny, Pusty (Empty State), Ładowanie (Loading), Błąd (Error State), Sukces (Success State).
3. **Sformułuj raport audytu**:
   Opisz problem, wskaż naruszoną heurystykę, przypisz wagę i zaproponuj konkretną zmianę w kodzie lub projekcie UI.
