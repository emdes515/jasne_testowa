# Metodyka Tworzenia Zadań i Treści (The Core-4 Framework)

Ten dokument stanowi standard operacyjny (SOP) dla twórców treści, edukatorów i skryptów AI generujących nowe lekcje do aplikacji.

## 1. Atomizacja (Microlearning) i Struktura Działu
- Dział zawiera **około 15 lekcji** (zamiast kilku kobył). 
- Trudniejsze, wieloaspektowe tematy dzielimy na 2–3 osobne lekcje (np. *Logarytmy 1: Odwrócona potęga*, *Logarytmy 2: Zwijanie sumy*, *Logarytmy 3: Skakanie potęgi i szacowanie*).
- Czyste tytuły: Tytuł lekcji w bazie NIE MOŻE zawierać numerków (np. pisać `Przedziały: Bramkarze na osi`, a NIE `1.1. Przedziały...`), ponieważ frontend sam dokleja numer lekcji.
- Cel: Uczeń ma skończyć pojedynczą lekcję w 4–6 minut.

## 2. Pule Zadań (Task Pool) i Losowość
- Każda lekcja zawiera pulę **8–12 zadań**.
- Z puli aplikacja losuje dla ucznia wymaganą liczbę zadań (np. 3 lub 4 zadania do zaliczenia celu lekcji). Dzięki temu uczeń przy powtórce nie trafia na te same zadania.
- Metadane zadania:
  - `points`: Liczba punktów za zadanie (1 dla standardowych zamkniętych/krótkich, 2–3 dla złożonych zadań otwartych).
  - `source`: Źródło zadania, np. `"Matura maj 2025"`, `"Informator CKE"`, `"Arkusz pokazowy"` lub `"Zadanie autorskie"`.
- Czyste opcje odpowiedzi (ABCD): W tablicy `options` podajemy WYŁĄCZNIE czystą wartość matematyczną (np. `"$\\frac{7}{12}$"`). NIGDY nie wpisujemy `"Odp A"`, `"A."` ani `"A"`, ponieważ interfejs aplikacji sam generuje kółka/przyciski A, B, C, D!

## 3. Tone of Voice (Prosty, Konkretny Język Korepetytora)
- Teoria i pułapki pisane językiem prostym, zrozumiałym i bezpośrednim, ale w 100% dojrzałym.
- **KATEGORYCZNY ZAKAZ infantylnych i krindżowych metafor**: Żadnych "bramkarzy na osi", "wściekłych psów", "salta potęgi" czy "imprez liczbowych". Uczeń liceum traktowany jest poważnie.
- Zamiast bajek stosujemy zwięzłe reguły i bezpośrednie mechanizmy matematyczne (np. *minus w wykładniku odwraca liczbę do ułamka*, *nawias otwarty wyklucza punkt krańcowy*, *dodawanie w liczniku uniemożliwia bezpośrednie skracanie*).

## 4. Architektura Pigułki Wiedzy (Bento/Card)
1. `concept_essence`: Tłumaczenie na chłopski rozum z trafną metaforą.
2. `matura_context`: Dlaczego to jest pewniak na maturze i ile punktów można stracić.
3. `core_formulas`: Czysty KaTeX.
4. `worked_example`: Konkretny przykład poprowadzony za rękę krok po kroku.
5. `exam_trap`: Wskazanie najczęstszego błędu (haczyk do Cyklu Kolba).

## 5. Pule Zadań i Reguła 360 Stopni (Format Matrix)
Formaty zamknięte:
*   `TRUE_FALSE`, `SINGLE_CHOICE`, `TWO_PART`, `NUMERIC_INPUT`.
*   WSKAZÓWKI (Ekonomia Gry): Każde zadanie zamknięte posiada z góry zdefiniowane pole `hint` oraz `hint_cost` (np. 10–15 monet).

Formaty Otwarte (Egzaminator AI):
*   `OPEN_GENERAL` / `OPEN_PROOF`: Wymagają dłuższego rozpisania.
*   System Inputu (Ekskluzywny): Tryb `[ ⌨ Klawiatura matematyczna ]` albo `[ ✏ Tablica (Canvas) ]`. Zmiana trybu wymaga potwierdzenia i czyści stan.
*   `ai_hint_enabled: true` oraz `hint_cost: 20-25`: Wskazówka kontekstowa z analizy aktualnego szkicu ucznia.
*   `scoring_key`: Szczegółowy klucz punktowania krok po kroku dla LLM (np. "1 pkt za..., 1 pkt za...").

## 6. Wyjaśnienia Oparte na Błędach (Trap-Driven Explanations)
Wyjaśnienie zadania po ostatecznym błędzie NIE MOŻE być tylko podaniem poprawnego rozwiązania. Musi adresować pułapkę.
