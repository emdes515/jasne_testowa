# Plan: kurs Matematyka – poziom rozszerzony (JASNE)

> Stan: 2026-10-22 · Etap: plan do akceptacji (bez budowy treści)
> Dane źródłowe analizy: [`matematyka_pr/zadania_cke_f2023.json`](matematyka_pr/zadania_cke_f2023.json) (147 zadań CKE → wymagania), [`matematyka_pr/wymagania_2024.json`](matematyka_pr/wymagania_2024.json) (119 wymagań podstawy 2024). Skrypty: [`scripts/math_pr/analysis/`](../../scripts/math_pr/analysis/).

---

## 0. Podsumowanie dla decydenta

1. Pobrałem **wszystkie 82 sesje PR z arkusze.pl** (163 PDF-y, arkusze + zasady oceniania) do `baza_cke_matematyka/rozszerzona/` (katalog w `.gitignore`), z `manifest.json`. **Formuła 2023: 14 sesji** (11 CKE + 3 Politechniki Łódzkiej), F2015: 35, archiwalne F2005: 33.
2. Szkieletem programu jest **podstawa programowa z nowelizacją 2024** (Dz.U. 2024 poz. 1019, pobrana z CKE): **46 wymagań PR** + 73 PP, które obowiązują też na PR.
3. 11 arkuszy CKE F2023 (147 zadań) przypisałem do wymagań. Każdy arkusz sumuje się do 50 pkt, co potwierdza poprawność parsera.
4. **Od 2025 r. arkusz PR to wyłącznie zadania otwarte**: 10–14 zadań, 2–6 pkt, ocena etapami („niewielki postęp → istotny postęp → zasadnicze trudności → usterki”). To najważniejsza różnica względem PP.
5. Arkusze 2023–2024 cytują **starą numerację z 2018 r.** Część ich treści **wypadła z podstawy 2024** (pierwiastki wymierne wielomianu, prosta i parabola, tw. o dwusiecznej, odległość punktu od prostej). Kurs uczy wyłącznie zakresu 2024.
6. Proponuję **15 działów × 5 lekcji = 75 lekcji**, czyli dokładnie siatkę PP. Dzięki temu ten sam pipeline, UI i Campus Rust działają bez zmian. Pokrycie 46/46 wymagań PR, macierz w §2.3.
7. Pewniaki PR: **wiązka „Wykaż, że P(x) = …” (2 pkt) + optymalizacja pochodną (4 pkt)** w 10/11 arkuszy, **parametr + wzory Viète'a (5–6 pkt)** w 11/11, **równanie trygonometryczne** w 11/11, **dowody** (31 zadań, śr. 8 pkt/arkusz).
8. Największa luka techniczna: ewaluator AI obsługuje rubrykę do 2 pkt (`criterion_1_point`/`criterion_2_points`). PR wymaga **rubryki etapowej do 6 pkt**. Proponuję wstecznie zgodne pole `rubric_stages` oraz darmową samoocenę etapami jako domyślną ścieżkę, żeby utrzymać marżę > 85%.
9. Na pilota proponuję **dział 5 (parametr + Viète)** zamiast optymalizacji. Ma najstabilniejszą wagę (11/11), najtrudniejszą rubrykę i zależy wyłącznie od PP. Optymalizacja wymaga najpierw działu 14 (pochodna).
10. Do decyzji: 8 punktów w §8, każdy z rekomendacją.

---

## 1. Analiza arkuszy

### 1.1 Zbiór danych

| Formuła | Sesje | Rola w kursie |
| :--- | :--- | :--- |
| **F2023 – CKE** (maj/czerwiec 2023–2026, próbne XII 2022 i XII 2024, przykładowy 2023) | 11 | **Źródło prawdy**: zadania 1:1 w symulatorze, wagi działów, rubryki |
| F2023 – Politechnika Łódzka (XII 2022, III 2024, III 2025) | 3 | Inspiracja; klucze bez kodów wymagań i bez schematu CKE |
| F2015 (2015–2022 + „stara” 2023–2026) | 35 | Pula pomocnicza po **filtrze zakresu 2024** (zadania ze stylu CKE, oznaczone `source`) |
| F2005 (2002–2014) | 33 | Tylko inspiracja, inny zakres i styl |

Brak klucza ma tylko jedna sesja: 2010 styczeń (F2005). PR nie ma sesji sierpniowej.

### 1.2 Wagi obszarów (11 arkuszy CKE F2023, numeracja 2024)

Punkty zadania dzielone równo między działy podstawy, które cytuje klucz.

| Dział podstawy | śr. pkt / arkusz | W ilu arkuszach |
| :--- | :---: | :---: |
| III Równania i nierówności (parametr, Viète, moduł) | **7,5** | 11/11 |
| XIII Optymalizacja i rachunek różniczkowy | **6,7** | 11/11 |
| VIII Planimetria (+ dowody) | **6,5** | 11/11 |
| VII Trygonometria | **5,9** | 11/11 |
| VI Ciągi (szereg, granice) | **5,1** | 10/11 |
| X Stereometria | 4,5 | 10/11 |
| IX Geometria analityczna | 4,4 | 11/11 |
| XII Prawdopodobieństwo | 3,2 | 11/11 |
| I Liczby rzeczywiste (logarytmy, dowody) | 2,1 | 8/11 |
| II Wyrażenia algebraiczne | 1,8 | 7/11 |
| V Funkcje | 1,3 | 6/11 |
| XI Kombinatoryka | 1,2 | 5/11 |
| IV Układy równań | 0,0 | 0/11 |

**Wnioski:**
- **34 ze 147 zadań (105 pkt) cytuje wyłącznie wymagania PP.** Na PR bardzo często pojawia się PP na trudniejszym poziomie: `X.5` objętości (21 pkt), `VIII.11` dowody geometryczne (21 pkt), `VI.7` ciągi (18 pkt). Kurs PR musi zawierać takie zadania, a nie tylko „nowe” tematy.
- Najczęstsze wymagania PR (zadania / pkt łącznie): `VII.R6` równania tryg. (11 / 45), `III.R5` parametr (12 / 34), `VIII.R1` czworokąty wpisane/opisane (9 / 34), `VI.R2` szereg (7 / 27), `XIII.R4` pochodna (16 / 26), `III.R3` Viète (9 / 24).
- **16 wymagań PR nigdy nie było cytowanych wprost**, np. `II.R1` dzielenie wielomianów, `VII.R1` radiany, `VII.R4` wzory redukcyjne, `XIII.R2` Darboux, `X.R1` trzy prostopadłe, `IV.R1` układy nieliniowe. Większość to narzędzia używane po cichu w innych zadaniach. Podstawa wymaga ich wszystkich, więc każde dostaje lekcję (§2.3).

### 1.3 Katalog typów zadań PR

| Typ | Udział (zadania / pkt) | Jak CKE punktuje | Odwzorowanie w JASNE |
| :--- | :--- | :--- | :--- |
| Krótka odpowiedź 2–4 pkt | 112 / 304 | 2 pkt: postęp → wynik; 3–4 pkt: niewielki / istotny postęp → zasadnicze trudności | `OPEN_CALCULATION` z `rubric_stages` |
| Rozszerzona 5–6 pkt | 35 / 196 | etapy z punktacją cząstkową; „usterki” obniżają o 1 pkt | `OPEN_CALCULATION` z `rubric_stages` (etapy jak w kluczu) |
| Dowód (algebraiczny / geometryczny) | 31 / 88 | pełne rozumowanie; brak uzasadnienia kroku daje maks. punkty cząstkowe | `OPEN_PROOF` z `rubric_stages` |
| Parametr + Viète | 12 / 59 | **4 etapy**: Δ > 0 (1) · znaki/warunek (1) · warunek z $x_1, x_2$ (3) · część wspólna (1) | `OPEN_CALCULATION` + mikro-kroki zamknięte w lekcjach |
| Wiązka 2 + 4 „Wykaż, że P(x) = …” + optymalizacja | 10 wiązek / 60 | część 1: model i dziedzina; część 2: pochodna (1) · miejsce zerowe (2) · uzasadnienie min/max (3) · wartość (4) | wiązka = 2 powiązane zadania (`bundle_id`) |
| Prawdopodobieństwo (warunkowe, Bernoulli) | 10 / 32 | model + obliczenie | `OPEN_CALCULATION` + `NUMERIC_INPUT` |

Średnio 13,4 zadania w arkuszu. Wymaganie ogólne **IV (rozumowanie i argumentacja)** pojawia się w 85/147 zadań.

### 1.4 Pułapki CKE (z zasad oceniania)

| Pułapka | Skutek wg klucza | Gdzie uczymy |
| :--- | :--- | :--- |
| Warunek $\Delta \ge 0$ zamiast $\Delta > 0$ („dwa różne rozwiązania”) | 0 pkt za etap | 5.2, 5.5 |
| Pochodna ilorazu jako iloraz pochodnych | **0 pkt za całe zadanie** | 14.4, 15.2 |
| Miejsce zerowe pochodnej bez uzasadnienia, że to minimum/maksimum | maks. 2 z 4 pkt | 14.5, 15.2 |
| Odgadnięcie wyniku bez uzasadnienia jednoznaczności | 1 zamiast 2 pkt | 4.5, 1.2 |
| Zgubienie serii rozwiązań / brak odrzucenia rozwiązań spoza dziedziny | „usterka”, −1 pkt w 5–6 pkt | 8.2, 3.2, 2.4 |
| Błąd rachunkowy po pokonaniu zasadniczych trudności | −1 pkt (najczęstsza uwaga: 14/49) | wszystkie `OPEN_*` (rubryka „usterki”) |
| Dowód „na przykładzie” zamiast dla dowolnych liczb | 0–1 pkt | 1.3, 1.4, 10.1 |

Na etapie pilota rozszerzam tę tabelę o pełny przegląd uwag w kluczach (zadanie w §7, etap 0b).

### 1.5 Zmiany zakresu 2018 → 2024 (ważne dla symulatora)

Arkusze 2022–2024 cytują starą numerację. Dopasowałem cytowane wymagania do podstawy 2024 po treści: 56 przenumerowań, np. `X.R5` → `X.R2` przekroje, `VIII.R3` → `VIII.11` dowody, `XIII.R2..R5` → `XIII.R3..R6`. Treści, których **nie ma** w podstawie 2024:

| Treść z arkuszy 2022–2024 | Teraz |
| :--- | :--- |
| Pierwiastki **wymierne** wielomianu | tylko całkowite (`II.R3`) |
| Punkty wspólne prostej i **paraboli** | tylko prosta–okrąg (`IX.R1`) |
| Twierdzenie o **dwusiecznej** kąta | usunięte (`VIII.7` = tylko Tales) |
| **Odległość punktu od prostej** | usunięte z PP (wzór nadal jest na karcie, str. 22) |
| Równania trygonometryczne „nie trudniejsze niż …” | bez ograniczenia przykładem (`VII.R6`) |

Uwaga dla PP: **prosta prostopadła** jest w 2024 wymaganiem PR (`IX.R4`). W PP `IX.2` wymienia tylko równoległość. Lekcja PP 10.3 „Proste równoległe i prostopadłe” jest do weryfikacji (osobne zadanie, poza zakresem PR).

---

## 2. Mapa programu

### 2.1 Zasady
- **15 działów × 5 lekcji** (identycznie jak PP), lekcja 4–6 min, jeden wąski koncept.
- **(A)** rozszerzenie działu PP: lekcja zaczyna się od odwołania `prereq: ["math-lesson-X-Y"]` zamiast powtórki. **(B)** dział tylko PR.
- Punkty CKE = średnia z 11 arkuszy F2023 przypisana do działu (zadanie z `XIII.R6` liczone w całości do działu 15).

### 2.2 Działy i lekcje

| # | Dział | Typ · PP | pkt CKE | Lekcje (wymagania) |
| :---: | :--- | :--- | :---: | :--- |
| 1 | **Logarytmy i dowody algebraiczne** | A · 1.3, 2.5 | 3,7 (10/11) | 1.1 Zamiana podstawy logarytmu (`I.R1`) · 1.2 Wyrażenia logarytmiczne z dziedziną (`I.R1`, `I.9`) · 1.3 Dowody podzielności i reszt (`I.2`) · 1.4 Dowody nierówności: kwadrat różnicy i przekształcenia równoważne (`II.1`, `II.R5`) · 1.5 Sześciany, $a^n - b^n$ i $(a+b)^n$ w dowodach (`II.R5`) |
| 2 | **Wielomiany** | B · 2.2, 3.4 | 0,3 *(narzędzie dla 5, 14, 15)* | 2.1 Dzielenie przez $(x-a)$ i reszta (`II.R1`) · 2.2 Pierwiastki całkowite (`II.R3`) · 2.3 Rozkład: grupowanie i wzory stopnia 3 (`II.R2`, `II.R5`) · 2.4 Równania wielomianowe i dwukwadratowe (`III.R1`, `III.R6`) · 2.5 Nierówności wielomianowe – „wężyk” (`III.R1`) |
| 3 | **Wyrażenia wymierne i wartość bezwzględna** | A · 2.4, 3.5, 1.4 | 2,1 (6/11) | 3.1 Dodawanie wyrażeń wymiernych (`II.R6`) · 3.2 Równania $\frac{V(x)}{W(x)} = 0$ (`III.R7`, `III.R2`) · 3.3 Nierówności wymierne przez iloczyn (`III.R2`) · 3.4 Równania z modułem – metoda przedziałów (`III.R4`) · 3.5 Nierówności z modułem (`III.R4`) |
| 4 | **Funkcje: przekształcenia, złożenie, monotoniczność** | A · 4.2–4.5 | 1,3 (6/11) | 4.1 $y=-f(x)$, $y=f(-x)$ (`V.R1`) · 4.2 Wykresy z modułem i liczba rozwiązań $f(x)=m$ (`V.R1`, `III.R4`) · 4.3 Złożenie funkcji i dziedzina (`V.R2`) · 4.4 Dowód monotoniczności z definicji (`V.R3`) · 4.5 Modele wykładnicze i logarytmiczne (`V.14`, `I.R1`) |
| 5 | **Parametr i wzory Viète'a** ⭐ | A · 3.2, 6.1–6.3 | **5,3 (11/11)** | 5.1 Viète i wyrażenia symetryczne (`III.R3`) · 5.2 Liczba rozwiązań w zależności od $m$, też liniowe (`III.R5`) · 5.3 Znaki pierwiastków, pierwiastki w przedziale (`III.R5`) · 5.4 Warunki: $x_1^2+x_2^2$, $(x_1-x_2)^2$, $\frac{1}{x_1}+\frac{1}{x_2}$ (`III.R3`, `III.R5`) · 5.5 Pełne rozwiązanie za 6 pkt: etapy i część wspólna (`III.R5`) |
| 6 | **Ciągi: granice i szereg geometryczny** | A · 7.2–7.5 | **5,1 (10/11)** | 6.1 Granica: dzielenie przez najwyższą potęgę (`VI.R1`) · 6.2 Pierwiastki i twierdzenie o trzech ciągach (`VI.R1`) · 6.3 Szereg: warunek zbieżności i suma (`VI.R2`) · 6.4 Szereg w równaniach i nierównościach (`VI.R2`) · 6.5 Ciąg arytmetyczny i geometryczny w jednym zadaniu (`VI.7`) |
| 7 | **Trygonometria: funkcje i wzory** | A · 8.3–8.4 | 0,7 *(narzędzie dla 8, 9)* | 7.1 Miara łukowa i koło trygonometryczne (`VII.R1`) · 7.2 Wykresy i okresowość (`VII.R2`, `VII.R3`) · 7.3 Wzory redukcyjne (`VII.R4`) · 7.4 Suma, różnica i kąt podwojony (`VII.R5`) · 7.5 Tożsamości i dowody trygonometryczne (`VII.R5`, `VII.2`) |
| 8 | **Równania trygonometryczne** ⭐ | B | **4,1 (11/11)** | 8.1 Równania elementarne (`VII.R6`) · 8.2 Rozwiązania w zadanym przedziale (`VII.R6`) · 8.3 Sprowadzanie do kwadratowego (`VII.R6`) · 8.4 Kąt podwojony i suma kątów w równaniach (`VII.R6`, `VII.R5`) · 8.5 Iloczyn i pełny zapis rozwiązania (`VII.R6`) |
| 9 | **Planimetria: okręgi, czworokąty, rozwiązywanie trójkątów** | A · 8.5, 9.1–9.5 | **5,0 (11/11)** | 9.1 Czworokąt wpisany w okrąg (`VIII.R1`) · 9.2 Czworokąt opisany na okręgu (`VIII.R1`) · 9.3 Twierdzenie sinusów (`VII.R7`) · 9.4 Rozwiązywanie trójkątów: sinusy + cosinusy (`VII.R8`) · 9.5 Odwrotne tw. Talesa i zadania wieloetapowe (`VIII.R2`) |
| 10 | **Dowody geometryczne** | A · 9.2, 9.4 | 2,5 (9/11) | 10.1 Założenie, teza, uzasadnienie (`VIII.11`) · 10.2 Kąty wpisane i środkowe (`VIII.5`) · 10.3 Podobieństwo i przystawanie (`VIII.8`) · 10.4 Pola i długości odcinków (`VIII.11`, `VIII.12`) · 10.5 Czworokąty i okręgi w dowodach (`VIII.R1`) |
| 11 | **Geometria analityczna: wektory, okręgi, styczne** | A · 10.1–10.4 | 4,4 (11/11) | 11.1 Wektory (`IX.R3`) · 11.2 Prosta prostopadła i styczna do okręgu (`IX.R4`) · 11.3 Prosta i okrąg – układ równań (`IX.R1`, `IV.R1`) · 11.4 Dwa okręgi (`IX.R2`, `IV.R1`) · 11.5 Zadania 5–6 pkt: figury, pola, parametry (`IX.R1`, `IX.2`) |
| 12 | **Stereometria: kąty i przekroje** | A · 11.1–11.3 | 4,5 (10/11) | 12.1 Trzy prostopadłe i kąt dwuścienny (`X.R1`, `X.2`) · 12.2 Kąty w ostrosłupach (`X.3`) · 12.3 Przekroje sześcianu (`X.R2`) · 12.4 Przekroje ostrosłupów prawidłowych (`X.R2`) · 12.5 Bryły z trygonometrią – zadanie 5–6 pkt (`X.5`, `X.R2`) |
| 13 | **Kombinatoryka i prawdopodobieństwo** | A · 12.*, 13.* | 4,4 (11/11) | 13.1 Permutacje, wariacje, kombinacje (`XI.R1`) · 13.2 Symbol Newtona i trójkąt Pascala (`XI.R2`, `II.R4`) · 13.3 Prawdopodobieństwo warunkowe (`XII.R1`) · 13.4 Prawdopodobieństwo całkowite i Bayes (`XII.R1`) · 13.5 Schemat Bernoullego (`XII.R2`) |
| 14 | **Granice, ciągłość i pochodna** | B | 2,7 (7/11) | 14.1 Granica w punkcie, granice jednostronne (`XIII.R1`) · 14.2 Ciągłość i własność Darboux (`XIII.R2`) · 14.3 Definicja pochodnej i styczna (`XIII.R3`) · 14.4 Iloczyn, iloraz, funkcja złożona (`XIII.R4`) · 14.5 Monotoniczność i ekstrema (`XIII.R5`) |
| 15 | **Optymalizacja z pochodną** ⭐ | B · rozbudowa PP 15 | **4,0 + ~2 (10/11)** | 15.1 Model, funkcja celu i dziedzina („Wykaż, że P(x) = …”) · 15.2 Schemat 4 pkt: pochodna → zero → znak → wartość · 15.3 Bryły: stożek, graniastosłup, ostrosłup · 15.4 Układ współrzędnych i figury płaskie · 15.5 Kontekst praktyczny: pełna wiązka 2 + 4 (`XIII.R6`, `X.5`, `VIII.8`) |

### 2.3 Macierz pokrycia: 46 wymagań PR → lekcje

| Wymaganie | Lekcje | | Wymaganie | Lekcje |
| :--- | :--- | --- | :--- | :--- |
| I.R1 | 1.1, 1.2, 4.5 | | VII.R5 | 7.4, 7.5, 8.4 |
| II.R1 | 2.1 | | VII.R6 | 8.1–8.5 |
| II.R2 | 2.3 | | VII.R7 | 9.3 |
| II.R3 | 2.2 | | VII.R8 | 9.4 |
| II.R4 | 13.2 | | VIII.R1 | 9.1, 9.2, 10.5 |
| II.R5 | 1.4, 1.5, 2.3 | | VIII.R2 | 9.5 |
| II.R6 | 3.1 | | IX.R1 | 11.3, 11.5 |
| III.R1 | 2.4, 2.5 | | IX.R2 | 11.4 |
| III.R2 | 3.2, 3.3 | | IX.R3 | 11.1 |
| III.R3 | 5.1, 5.4 | | IX.R4 | 11.2 |
| III.R4 | 3.4, 3.5, 4.2 | | X.R1 | 12.1 |
| III.R5 | 5.2–5.5 | | X.R2 | 12.3–12.5 |
| III.R6 | 2.4 | | XI.R1 | 13.1 |
| III.R7 | 3.2 | | XI.R2 | 13.2 |
| IV.R1 | 11.3, 11.4 | | XII.R1 | 13.3, 13.4 |
| V.R1 | 4.1, 4.2 | | XII.R2 | 13.5 |
| V.R2 | 4.3 | | XIII.R1 | 14.1 |
| V.R3 | 4.4 | | XIII.R2 | 14.2 |
| VI.R1 | 6.1, 6.2 | | XIII.R3 | 14.3 |
| VI.R2 | 6.3, 6.4 | | XIII.R4 | 14.4 |
| VII.R1 | 7.1 | | XIII.R5 | 14.5 |
| VII.R2, VII.R3 | 7.2 | | XIII.R6 | 15.1–15.5 |
| VII.R4 | 7.3 | | | |

**46/46 pokrytych.** Wymagania PP najczęstsze na PR (`X.5`, `VIII.11`, `VI.7`, `I.9`, `IX.2`, `VIII.8`) mają lekcje w działach 1, 6, 10, 11, 12 i 15.

### 2.4 Graf wymagań wstępnych

```
PP (cały kurs) ──► 1 ──► 2 ──► 3 ──► 4
                         │      └──► 5 ◄── PP 6 (kwadratowa)
                         └────────────────────────► 14 ──► 15
PP 7 ──► 6 ──► 14 (granice)
PP 8 ──► 7 ──► 8
         └──► 9 ──► 10
PP 10 ──► 11 (◄── 5: układy kwadratowe) ──► 15.4
PP 11 ──► 12 ──► 15.3
PP 12–13 ──► 13
```

Kolejność w aplikacji = numeracja działów. Lekcja z niespełnionym `prereq` jest dostępna, ale pokazuje link „Najpierw powtórz: PP 6.2”, bez blokowania (zero tarcia).

---

## 3. Spójność z kursem PP (twarde wymagania)

| Obszar | Decyzja |
| :--- | :--- |
| **Schemat danych** | Ten sam co PP: `topics[] → lessons[] → theory_pill + tasks[]`; te same pola `theory_pill` (`concept_essence`, `matura_context`, `plain_polish`, `algorithm_steps`, `core_formulas`, `worked_examples`, `trap_details`, `exam_trap`, `key_points`) i zadania (`type`, `points`, `question`, `math_statement`, `options`, `correct_answer`, `explanation`, `matura_tip`, `hints`, `source`). |
| **Rozszerzenia (wstecznie zgodne, opcjonalne)** | `lesson.prereq: string[]`, `lesson.requirements: string[]` (np. `["III.R5"]`), `task.rubric_stages: {points, label, criterion}[]`, `task.bundle_id`, `task.scope: "2024"`. PP ich nie potrzebuje, a ich brak nic nie psuje. |
| **Pipeline** | `scripts/math_pr/` (`build.js`, `dzial_01..15.js`, `cke/*.js`), które **importują** `scripts/math_pp/lib.js` i `figures.js` (lint KaTeX, `evalTex`, `Retry`, generatory losowe), a nie ich kopie. Wyjście: `src/data/math/generated/pr_blueprints.json`, `pr_tasks.json`, `seed/curriculum/curriculum_matematyka_pr.json` (zastępuje szkic). |
| **Identyfikatory** | `math-pr-lesson-X-Y`, działy `pr-dzial-X`, przedmiot `math-roz` (już istnieje w `LearnView`/`DashboardView`). |
| **Karta wzorów** | Jedna karta (`src/data/ckeFormulasData.ts`, obecnie 26 wzorów PP) + wzory PR z numerem strony CKE, zweryfikowanym w PDF (test w stylu `CkeFormulaSheetPages.test.ts`). Wzory spoza karty mają etykietę **„Nie ma na karcie – zapamiętaj”**: twierdzenie o pierwiastkach całkowitych, granice funkcji, Darboux, trzy prostopadłe, pochodna złożenia. |
| **Styl** | Ton partnerski, „Z polskiego na nasze”, mnemonik wizualny + przykład liczbowy przy każdym wzorze, bez poziomego overflow (375 px). Symbole $\wedge, \vee, \Rightarrow, \Leftrightarrow$ dopuszczalne, bo informator PR je dopuszcza, **zawsze z tłumaczeniem słownym obok**. $\forall, \exists$ nie występują w informatorze, więc ich nie używamy. |
| **Paleta** | Nocturne Luminary bez zmian. PR wyróżnia badge „Rozszerzenie” (`primary-container` `#ffb800` na `surface-card`), a nie fiolet `#8B5CF6` ze szkicu. |

#### Wzory PR na karcie CKE (do dodania do `ckeFormulasData.ts`)

| Temat | Strona | | Temat | Strona |
| :--- | :---: | --- | :--- | :---: |
| Zamiana podstawy logarytmu | 6 | | Twierdzenie sinusów | 14 |
| Silnia, symbol Newtona | 6 | | Okrąg opisany / wpisany w czworokąt | 20 |
| Dwumian Newtona, $a^3 \pm b^3$, $a^n - b^n$ | 7 | | Wektory | 23 |
| Wzory Viète'a | 8 | | Permutacje, wariacje, kombinacje | 26–27 |
| Granice ciągów, szereg geometryczny | 9–10 | | Bernoulli, warunkowe, całkowite, Bayes | 28 |
| Funkcje tryg. dowolnego kąta, wykresy | 11 | | Pochodne wybranych funkcji, reguły | 30–31 |
| Suma i różnica kątów | 12 | | | |
| Kąt podwojony, redukcyjne, okresowość | 13 | | | |

Numery stron pochodzą z ekstrakcji tekstu PDF. Przed użyciem w `cke_page` każdy zostanie potwierdzony renderem strony.

---

## 4. Zadania

### 4.1 Pula lekcji: 20 zadań (jak PP)

Egzamin PR jest w 100% otwarty, a mikrolekcja musi trwać 4–6 min i nie może kosztować AI przy każdym kroku. Dlatego zadania zamknięte **trenują etapy rozwiązania**, a zadania otwarte ćwiczą pełny zapis.

| Format | Na lekcję | Rola |
| :--- | :---: | :--- |
| `NUMERIC_INPUT` | 6 | wynik etapu (np. „rozwiąż $\Delta > 0$ – podaj mniejszy koniec przedziału”) |
| `SINGLE_CHOICE` | 5 | wybór następnego kroku / poprawnego warunku; dystraktory = pułapki z §1.4 |
| `TRUE_FALSE` | 3 | warunki brzegowe (np. „$\Delta \ge 0$ gwarantuje dwa różne pierwiastki”) |
| `TWO_PART` | 2 | „warunek A/B, ponieważ 1/2/3” |
| `OPEN_CALCULATION` / `OPEN_PROOF` | 4 | pełne rozwiązanie z `rubric_stages` |

Sesja = 5 zadań z dziennego okna puli (jak PP), w tym **co najmniej 1 otwarte od lekcji 3 działu**.

### 4.2 Proporcje źródeł
- **Symulator PR:** 11 arkuszy CKE F2023, przepisane 1:1 (`scripts/math_pr/cke/*.js`, wzorem `scripts/math_pp/cke/`). Zadania spoza zakresu 2024 (§1.5) dostają flagę `scope: "2018"` i są pomijane w trybie „Matura 2027”.
- **Lekcje:** ≥ 2 zadania na lekcję z autentycznych arkuszy CKE lub zbioru zadań CKE PR, z `source: "CKE maj 2025, zad. 11"`. Reszta to generatory autorskie w stylu CKE, a zadania F2015 trafiają do puli tylko po filtrze zakresu.
- Zadania otwarte w lekcjach mają rubrykę przepisaną z klucza CKE albo zbudowaną według tych samych etapów.

### 4.3 Ocena zadań otwartych (rubryka etapowa)

```jsonc
"rubric_stages": [
  { "points": 1, "label": "Etap 1", "criterion": "Rozwiązanie nierówności Δ > 0: m ∈ (−∞, −3) ∪ (1, +∞)" },
  { "points": 2, "label": "Etap 2", "criterion": "Warunek x₁·x₂ > 0: m ∈ (−8, 2)" },
  { "points": 5, "label": "Etap 3", "criterion": "Nierówność równoważna (x₁ − x₂)² ≤ 180 rozwiązana" },
  { "points": 6, "label": "Komplet", "criterion": "Część wspólna warunków" }
],
"zero_rules": ["Δ ≥ 0 zamiast Δ > 0 → 0 pkt za etap 1"]
```

- **Domyślnie (0 zł kosztu AI):** uczeń rozwiązuje na kartce lub tablicy, odsłania etapy i zaznacza, do którego doszedł (samoocena), a potem widzi wzorcowe rozwiązanie i `exam_trap`.
- **Ocena AI (limit `DAILY_FREE_AI_VISION_LIMIT = 3`, PRO bez limitu):** `server/services/taskEvaluator.service.ts` dostaje `rubric_stages` i zwraca osiągnięty etap. Zmiany w BFF: walidacja (`server/validation.ts`), prompt z etapami, `fallbackEvaluator` liczący etapy. `ai_tutor_rubric` dla PP działa jak dotąd.
- Długość odpowiedzi nie daje punktów (zgodnie z poprawką z `e1f56c5`).

### 4.4 Progresja i boss działu
- W lekcji: zamknięte etapy → `NUMERIC_INPUT` pełnego wyniku → 1 zadanie otwarte.
- **Boss działu** = mini-arkusz 15 min, 3 zadania otwarte (2 + 3 + 5/6 pkt), z co najmniej jednym zadaniem CKE. Zaliczenie od 50% pkt.

---

## 5. Integracja z aplikacją

| Element | Zmiana |
| :--- | :--- |
| Dane | `src/data/mathRozCurriculumData.ts` (wzorem `mathCurriculumData.ts`) importuje `pr_blueprints.json` + `pr_tasks.json`. `curriculumRepository.getTopics('matematyka-rozszerzona')` zwraca paczkę, czyli 0 odczytów Firestore, tak jak PP. Seed do Firestore przez `scripts/seed_database.cjs` z `curriculum_matematyka_pr.json`. `src/` nie importuje `seed/`. |
| LearnView / Dashboard | Karta `math-roz` już istnieje. Podmiana danych, badge „Rozszerzenie”, link `prereq` do lekcji PP. Kolor karty zmieniony na paletę. |
| Symulator | `MaturaSimulatorView` w trybie PR: 180 min, 50 pkt, 10–14 zadań otwartych, ocena rubryką etapową (samoocena + AI w limicie). |
| Grywalizacja | Bez zmian w ekonomii (`heartsManager.ts`: `HEARTS_REFILL_COIN_COST = 150`, `REGEN_INTERVAL_MS = 30 min`). XP za zadanie otwarte proporcjonalne do etapu, a każde zaliczenie emituje zdarzenie sukcesu. **Campus Rust** liczony dla lekcji PR tak samo jak w PP. `streakDays` nigdy nie spada bez zużycia `streakFreezes`. |
| Plan PRO | PR w tym samym planie (29 zł / Pass Maturalny). Pierwsza lekcja każdego działu darmowa. |

---

## 6. Kontrola jakości

**Automatycznie (`build.js` PR, CI):**
- lint treści z `math_pp/build.js` (nieparzyste `$`, `undefined`, podwójne znaki, współczynnik 1);
- weryfikacja numeryczna każdej odpowiedzi (`evalTex`), unikalność 20 zadań w lekcji;
- każdy `core_formulas` ma `cke_page` albo etykietę „nie ma na karcie”, z testem stron jak `CkeFormulaSheetPages.test.ts`;
- każda lekcja ma niepuste `requirements`, a test pokrycia pilnuje 46/46;
- `rubric_stages`: rosnące punkty, ostatni etap = `maxPoints`;
- render KaTeX: rozszerzenie `src/data/__tests__/mathContentRendering.test.tsx` o PR;
- testy PP przechodzą bez zmian, bo moduły `lib.js`/`figures.js` są wspólne.

**Ręcznie:** 10% zadań CKE porównanych z PDF, przegląd mobilny 375 px na `http://localhost:3001/?dev=0` (Playwright), jedna pełna sesja i boss na dział.

**Definition of Done działu:** 5 lekcji × (pigułka + 20 zadań) · lint i testy zielone · ≥ 2 zadania CKE na lekcję · rubryki dla wszystkich `OPEN_*` · zrzuty mobilne bez overflow · sekcja „Zgodność z Bazą Wiedzy JASNE” w `walkthrough.md`.

---

## 7. Harmonogram

| Etap | Zakres | Wynik |
| :--- | :--- | :--- |
| **0a ✅** | Pobranie arkuszy, manifest, podstawa 2024, mapowanie 147 zadań | ten dokument + `matematyka_pr/*.json` |
| 0b | Pełny przegląd uwag w kluczach i transkrypcja 11 arkuszy CKE do `scripts/math_pr/cke/` | rozszerzona tabela pułapek, dane symulatora |
| 1 | Akceptacja mapy programu (§2) i decyzji (§8) | zamrożona lista lekcji |
| **2 ✅** | Karta wzorów PR w `ckeFormulasData.ts` + test stron | 1 karta PP+PR |
| **3 ✅** | Rozszerzenie modelu (`rubric_stages`, `bundle_id`, `prereq`) + BFF ewaluatora + UI samooceny | ścieżka zadań otwartych |
| **4 ✅** | **Pilot: dział 5** od początku do końca → przegląd ([walkthrough](matematyka_pr/WALKTHROUGH_ETAPY_2-4.md)) | czeka na akceptację wzorca |
| **5 ✅** | Pozostałe działy partiami: **(1, 2, 3, 4) ✅** → **(6, 7, 8) ✅** ([walkthrough](matematyka_pr/WALKTHROUGH_DZIALY_6-8.md)) → **(9, 10, 11, 12) ✅** ([walkthrough](matematyka_pr/WALKTHROUGH_DZIALY_9-12.md)) → **(13, 14, 15) ✅** ([walkthrough](matematyka_pr/WALKTHROUGH_DZIALY_13-15.md)) | 75 lekcji, 1500 zadań – komplet |
| 6 | Integracja: LearnView, Dashboard, symulator PR, seed Firestore | PR w aplikacji |
| 7 | QA całości, notatka `Kurikulum - Matematyka Rozszerzona.md` w Obsidianie | wydanie |

**Dlaczego pilot to dział 5, a nie optymalizacja:** ma wagę 11/11 i 5–6 pkt, najbardziej złożoną rubrykę (4 etapy, reguła „0 pkt za Δ ≥ 0”) i zależy tylko od PP. Optymalizacja (15) wymaga działu 14, więc pilot musiałby objąć dwa działy.

**Ryzyka:**
- koszt AI przy samych zadaniach otwartych (mitygacja: samoocena domyślnie, AI w limicie);
- ocena dowodów przez AI jest mniej pewna niż obliczeń (mitygacja: przy `OPEN_PROOF` AI tylko wskazuje etap, a wynik jest oznaczony „orientacyjnie”);
- rozjazd numeracji w arkuszach 2023–2024 (rozwiązany przez mapowanie po treści, §1.5);
- rozmiar paczki: drugi kurs ~4 MB JSON (mitygacja: lazy import paczki PR dopiero po wejściu w `math-roz`).

---

## Zgodność z Bazą Wiedzy JASNE

| Notatka / zasada | Jak plan ją spełnia |
| :--- | :--- |
| **Architektura Systemu i BFF** | Ocena zadań otwartych wyłącznie przez `server/services/taskEvaluator.service.ts`. Brak kluczy z prefiksem `VITE_`. Nowe pole `rubric_stages` walidowane w `server/validation.ts`. |
| **Frontend i Stan Aplikacji** | Przedmiot `math-roz` istnieje. Dane z paczki (`mathRozCurriculumData.ts`), stan postępu jak w PP. |
| **Model Danych Cloud Firestore** | 0 odczytów w aplikacji (paczka). Seed `curriculum_matematyka_pr.json` przez `seed_database.cjs`. `src/` nie importuje `seed/`. Nowe pola opcjonalne, PP bez migracji. |
| **Kurikulum – Matematyka Podstawowa** | Siatka 15 × 5 × 20 i generator `scripts/math_pp` jako wzorzec. Wspólne `lib.js`/`figures.js`, odwołania `prereq` do lekcji PP. |
| **Mechanika Dydaktyczna Core-4** | Lekcje 4–6 min, pigułka Bento (5 sekcji + `plain_polish`), Format Matrix (5 formatów), trap-driven `explanation` zbudowane z pułapek z zasad oceniania CKE. |
| **Design System – Nocturne Luminary** | Bez nowych kolorów. Badge PR w `#ffb800`, usunięcie `#8B5CF6` ze szkicu. KaTeX o kontraście `#dfe2f1`, 375 px bez overflow. |
| **Model Bezpieczeństwa i Reguły** | Brak nowych kolekcji z zapisem klienta. Oceny AI rate-limitowane po stronie serwera. |
| **Model Biznesowy i Cennik / Unit Economics** | PR w planie PRO, pierwsza lekcja działu darmowa. Samoocena domyślnie, AI w limicie `DAILY_FREE_AI_VISION_LIMIT = 3`, więc marża > 85%. |
| **Inżynieria Behawioralna / Ekonomia Wirtualna** | Zdarzenie sukcesu po każdym zadaniu (XP proporcjonalne do etapu). Streak chroniony `streakFreezes`. Campus Rust dla lekcji PR. Bez zmian stałych ekonomii. |
| **Arena ELO** | Poza zakresem. W przyszłości PR może zasilić osobną ligę „Rozszerzenie”. |

---

## 8. Decyzje dla właściciela produktu

| # | Decyzja | Rekomendacja |
| :---: | :--- | :--- |
| 1 | Siatka kursu | **15 × 5 × 20, jak PP** (ten sam UI, pipeline i rytm). |
| 2 | Pilot | **Dział 5 (parametr + Viète)**, potem 14 → 15. |
| 3 | Ocena zadań otwartych | **Samoocena etapami domyślnie + AI w limicie** (PRO bez limitu). |
| 4 | Zadania F2015 | **Tak, po filtrze zakresu 2024**, z `source`. Arkusze Politechniki Łódzkiej i F2005 tylko jako inspiracja. |
| 5 | Zadania z arkuszy 2023–2024 spoza zakresu 2024 | **Zostają w archiwum symulatora** z flagą `scope: "2018"`, bez punktów w trybie „Matura 2027”. |
| 6 | Stary szkic `curriculum_matematyka_rozszerzona.json` | **Zastąpić** generowanym `curriculum_matematyka_pr.json`. Treści nie da się odzyskać 1:1 (inna siatka, brak rubryk). |
| 7 | Dostęp do PR | **W planie PRO**, pierwsza lekcja każdego działu darmowa. |
| 8 | Prosta prostopadła w PP (`IX.R4` to w 2024 wymaganie PR) | **Osobna weryfikacja kursu PP**, poza tym planem. |
