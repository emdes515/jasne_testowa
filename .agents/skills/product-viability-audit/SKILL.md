---
name: product-viability-audit
description: >-
  Audits product logic, feature relevance, business viability, and user value proposition (sensowność aplikacji).
  Use when the user asks whether an application or feature makes sense, requests a product teardown, product-market fit evaluation, value proposition analysis, or wants to simplify product workflows.
---

# Product Viability & Value Proposition Audit Skill

Skill do bezstronnej, wnikliwej analizy **sensowności produktu**, dopasowania do problemu użytkownika (*Problem-Solution Fit*), architektury ścieżki wartości (*Core Loop*) oraz eliminacji zbędnego skomplikowania (*Feature Bloat*).

---

## 1. Filary Analizy Sensowności Produktu

Podczas audytu oceń aplikację według 5 kluczowych filarów:

### Filar 1: Problem-Solution Fit & Value Proposition (Propozycja Wartości)
* **Jaki konkretny ból rozwiązuje aplikacja?** (np. *„Uczeń nie rozumie rozwiązania zadania z podręcznika i nie ma kogo zapytać o 22:00”*).
* **Czy aplikacja oferuje unikalną wartość (Unfair Advantage)?**
  - Czy jest to tylko „kolejna nakładka na ChatGPT/Gemini”, czy oferuje specyficzny, przemyślany proces dydaktyczny (np. naprowadzanie metodą sokratyczną zamiast podawania gotowca)?
* **Dla kogo to jest (Ideal Customer Profile / Persona)?**
  - Uczeń szkoły podstawowej, licealista przed maturą, student, czy nauczyciel? Czy język i funkcje odpowiadają tej grupie?

### Filar 2: Core Loop (Pętla Wartości)
Zidentyfikuj i przeanalizuj główny cykl użytkownika:
1. **Trigger (Wyzwalacz)**: Co sprawia, że uczeń otwiera aplikację? (np. praca domowa, przygotowanie do sprawdzianu, powiadomienie o powtórce).
2. **Action (Działanie)**: Jak prosta jest pierwsza akcja? (Wklejenie zadania, zrobienie zdjęcia, wybór tematu).
3. **Reward / Value (Nagroda/Wartość)**: Zrozumienie trudnego konceptu, rozwiązane zadanie, poczucie ulgi (*„Wreszcie to łapię!”*).
4. **Investment (Inwestycja)**: Zapisanie notatki, rozwiązanie quizu sprawdzającego, powrót po kolejną dawkę wiedzy.

*Pytanie audytowe:* Gdzie pętla pęka? W którym momencie uczeń może się zniechęcić lub odpaść?

### Filar 3: Time-to-Value (TTV) i Friction Audit
* **Ile sekund mija od wejścia na stronę do momentu "Aha!"?**
* **Czy rejestracja/logowanie jest wymuszana zbyt wcześnie?** (Najlepsza praktyka: pozwól użytkownikowi wypróbować 1 zadanie/pytanie zanim zmusisz go do zakładania konta Firebase).
* **Jakie bariery poznawcze występują w procesie?** (Zbyt wiele opcji do wyboru na start, niejasne etykiety, konieczność konfigurowania wielu parametrów).

### Filar 4: Macierz Wartości Funkcji (Feature Value Matrix)
Dla każdej obecnej w aplikacji funkcji przypisz kategorię:
| Kategoria | Definicja | Działanie |
| :--- | :--- | :--- |
| **Core (Kluczowa)** | Bez tego aplikacja traci sens istnienia. | Maksymalnie uprościć, wyeksponować, dopracować do perfekcji. |
| **Delighter (Wyróżnik)** | Drobiazg budujący zachwyt (np. confetti po rozwiązaniu, pochwała AI). | Zostawić, nie przeładowywać. |
| **Distraction (Rozpraszacz)** | Funkcja skomplikowana w utrzymaniu, z której nikt nie korzysta lub odciąga od celu. | Uprościć lub bezwzględnie usunąć. |
| **Missing Link (Brakujące ogniwo)** | Kluczowy krok, bez którego flow jest niepełny (np. brak podsumowania lekcji lub brak historii pytań). | Zaprojektować i wdrożyć. |

### Filar 5: Retencja i Długoterminowa Użyteczność
* Dlaczego uczeń miałby wrócić jutro lub za tydzień?
* Czy aplikacja buduje postęp (system powtórek *spaced repetition*, śledzenie opanowanych tematów)?
* Czy system motywacyjny nie jest sztuczny (gamifikacja bez realnej wartości edukacyjnej)?

---

## 2. Format Raportu Sensowności (Product Teardown)

1. **Podsumowanie "Brutalna Prawda" (The Verdict)**:
   - Jednozdaniowa diagnoza: Czy ten produkt ma sens w obecnej formie i komu naprawdę służy?
2. **Mapa Wartości vs Tarcie**:
   - Główne punkty tarcia (gdzie użytkownik odpada).
3. **Ocena funkcji (Zatrzymaj / Wyrzuć / Dodaj)**:
   - **Do wzmocnienia (Core)**
   - **Do usunięcia / uproszczenia (Zmniejszenie długu UX)**
   - **Brakujące elementy (Must-haves)**
4. **Proponowany zoptymalizowany User Flow (Lean Journey)**:
   - Krok po kroku od pierwszego wejścia do sukcesu użytkownika.
