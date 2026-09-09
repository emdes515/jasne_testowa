# Metodyka Tworzenia Zadań i Treści (The Core-4 Framework)

Ten dokument stanowi standard operacyjny (SOP) dla twórców treści, edukatorów i skryptów AI generujących nowe lekcje do aplikacji.

## 1. Atomizacja (Microlearning)
Nie tworzymy kobył. Każda lekcja dotyczy JEDNEGO, bardzo wąskiego konceptu (np. Pierwiastki dzielimy na 3 osobne lekcje). Działy są potężne (ok. 15 lekcji). Cel: Uczeń musi móc ukończyć lekcję w 4-6 minut.

## 2. Architektura Pigułki Wiedzy (Bento/Card)
1. concept_essence: Tłumaczenie na chłopski rozum.
2. matura_context: Dlaczego to jest ważne na maturze.
3. core_formulas: Czysty KaTeX.
4. worked_example: Konkretny przykład poprowadzony za rękę krok po kroku.
5. exam_trap: Wskazanie najczęstszego błędu.

## 3. Pule Zadań i Reguła 360 Stopni (Format Matrix)
W puli lekcji znajduje się wiele zadań, aplikacja losuje np. 4 potrzebne do zaliczenia.
Formaty zamknięte:
*   TRUE_FALSE, SINGLE_CHOICE, TWO_PART, NUMERIC_INPUT.
*   WSKAZÓWKI (Ekonomia Gry): Każde zadanie zamknięte posiada z góry zdefiniowane pole 'hint'. Odblokowanie wskazówki kosztuje Walutę w Grze (in-game currency).

Formaty Otwarte (Egzaminator AI):
*   OPEN_GENERAL / OPEN_PROOF: Wymagają dłuższego rozpisania.
*   System Inputu (Ekskluzywny): Tryb [ ⌨ Klawiatura matematyczna ] albo [ ✏ Tablica (Canvas) ]. Zmiana trybu wymaga potwierdzenia i czyści stan.
*   AI Hint (Interaktywna Wskazówka): W zadaniach otwartych wskazówka nie jest statyczna. Po kupieniu wskazówki za walutę, aplikacja wysyła aktualny stan tablicy/klawiatury do LLM, a AI Tutor odpowiada np. 'Zacząłeś dobrze, ale spróbuj teraz wyciągnąć X przed nawias'.
*   Scoring: Zadania te posiadają obiekt scoring_key (Klucz odpowiedzi). Na koniec AI Tutor odtwarza animację sprawdzania, analizuje wejście z tablicy/klawiatury (Vision + LLM) i przyznaje punkty zgodnie z kluczem.

## 4. Wyjaśnienia Oparte na Błędach (Trap-Driven Explanations)
Wyjaśnienie zadania po ostatecznym błędzie NIE MOŻE być tylko podaniem poprawnego rozwiązania. Musi adresować pułapkę.
