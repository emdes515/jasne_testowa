# ⚡ Raport Audytu AI Modułu 1: TypeSafe AI Jev 1.13 via OpenRouter

**Data audytu:** 21 września 2026  
**Model:** `typesafe/jev-1.13` (System 1 Decision Engine)  
**Provider:** OpenRouter (`https://openrouter.ai/api/alpha/decisions`)  
**Zakres:** Moduł 1 ("NA 30% – ŻELAZNE PEWNIAKI MATURALNE" – 10 działów, 34 mikrolekcje, 164 zadania)  
**Czas wykonania pełnego skanu (164 zadania):** 13.55 sekund (~0.08 s / zadanie)  
**Łączny koszt API:** **$0.007576 USD** (~0.03 PLN za audyt całego modułu!)

---

## 📊 1. Podsumowanie Wyników Metrycznych

| Wymiar Audytu | Wynik | Procent / Średnia | Ocena Jakości |
| :--- | :---: | :---: | :---: |
| **Zgodność Klucza Odpowiedzi (`key_accuracy`)** | 164 / 164 | **100.0%** | 🟢 Bezbłędny (0 błędnych kluczy, 0 wieloznaczności) |
| **Higiena KaTeX / LaTeX (`latex_hygiene`)** | 164 / 164 | **100.0%** | 🟢 Czysta typografia matematyczna |
| **Jakość Dystraktorów i Pułapek CKE (`cke_trap_alignment`)** | 130 / 164 | **79.3%** | 🟢 Autentyczne pułapki maturalne CKE |
| **Średni Wynik Dydaktyczny Core-4 (`didactic_score`)** | 164 zadania | **3.65 / 5.00** | 🟡 Solidny standard (wymaga wzbogacenia 4 zadań) |

---

## 🔍 2. Wykryte Defekty Dydaktyczne (Zadania oflagowane do wzbogacenia)

Model Jev 1.13 precyzyjnie wykrył 4 zadania, w których wyjaśnienie oraz sekcja `cke_trap` były zbyt lakoniczne (score < 2.6) i zamiast tłumaczyć pułapkę poznawczą, jedynie powtarzały suchy wynik:

1. **`task-9-2-5` (Dział 9, Lekcja 2 – Odczytywanie własności z wykresu, Zadanie 5):**
   - *Treść:* "Wykres funkcji przecina oś $OX$ w punktach o współrzędnych $x_1 = -4$, $x_2 = 1$, $x_3 = 5$. Oblicz sumę wszystkich miejsc zerowych tej funkcji."
   - *Aktualne wyjaśnienie:* "Suma miejsc zerowych wynosi: $(-4) + 1 + 5 = 2$."
   - *Aktualny cke_trap:* "Dodawaj same iksy: $(-4) + 1 + 5 = 2$."
   - *Diagnoza Jev (Score 2.37):* Brak wyjaśnienia, dlaczego ignorujemy współrzędną $y=0$ oraz pułapki polegającej na myleniu miejsc zerowych z punktem przecięcia z osią $OY$.

2. **`task-9-3-5` (Dział 9, Lekcja 3 – Monotoniczność funkcji, Zadanie 5):**
   - *Treść:* "Wykres funkcji opada w dół na przedziale $x \in [2, 8]$. Oblicz długość przedziału, w którym ta funkcja maleje."
   - *Aktualne wyjaśnienie:* "Długość przedziału $[2, 8]$ wynosi $8 - 2 = 6$."
   - *Aktualny cke_trap:* "Długość to różnica iksów: $8 - 2 = 6$."
   - *Diagnoza Jev (Score 2.28):* Zbyt skrótowe; brak omówienia pułapki CKE, gdzie uczniowie odczytują wartości funkcji ($y$) zamiast argumentów ($x$).

3. **`task-9-4-5` (Dział 9, Lekcja 4 – Liczba rozwiązań równania f(x)=m, Zadanie 5):**
   - *Treść:* "Pozioma prosta $y = 1$ przecina łuk paraboli w dwóch punktach oraz odcinek poziomy w nieskończenie wielu punktach... Ile punktów wspólnych z parabolą ma prosta styczna w wierzchołku?"
   - *Aktualne wyjaśnienie:* "Prosta przechodząca przez wierzchołek paraboli poziomo dotyka jej w dokładnie jednym punkcie (jest do niej styczna)."
   - *Diagnoza Jev (Score 2.48):* Brak formalnego nawiązania do wyróżnika $\Delta=0$ lub interpretacji wierzchołka $q=y_w$.

4. **`task-10-4-5` (Dział 10, Lekcja 4 – Zastosowania funkcji liniowej, Zadanie 5):**
   - *Treść:* "Abonament telefoniczny kosztuje 25 zł miesięcznie, a każdy dodatkowy gigabajt internetu kosztuje 4 zł. Ile zapłaci klient za miesiąc, w którym zużył 10 dodatkowych gigabajtów?"
   - *Aktualne wyjaśnienie:* "Wzór: $K(x) = 4x + 25$. Dla $x = 10$: $K(10) = 4 \cdot 10 + 25 = 40 + 25 = 65$ zł."
   - *Aktualny cke_trap:* "Koszt to $4 \cdot 10 + 25 = 65$ zł."
   - *Diagnoza Jev (Score 2.54):* cke_trap jest pusty poznawczo (jedynie powtarza rachunek); typowa pułapka CKE to zapomnienie o opłacie stałej (uczeń liczy tylko $4 \cdot 10 = 40$ zł) lub pomnożenie $25 \cdot 10$.

---

## 🚀 3. Architektura Wywołania Jev w OpenRouter

W przeciwieństwie do standardowych modeli chatowych (GPT-4o, Claude), Jev na OpenRouter wymaga dedykowanego endpointu decyzyjnego:
- **URL:** `POST https://openrouter.ai/api/alpha/decisions`
- **Nagłówki:** `Authorization: Bearer <OPENROUTER_API_KEY>`, `Content-Type: application/json`
- **Payload:**
  - `model`: `"typesafe/jev-1.13"`
  - `state`: stan wejściowy (dowolny JSON: zadanie, opcje, treść, lekcja)
  - `questions`: słownik pytań z typem:
    - `"choice"`: wybór dyskretny z kryteriami wagi (`criteria: { KLUCZ: "opis" }`)
    - `"score"`: ocena ciągła z tablicą kryteriów (`criteria: ["opis 1", "opis 2", ...]`)

### Skrypt Audytujący:
Narzędzie zostało zapisane i jest w pełni gotowe do wielokrotnego użytku:
`node scripts/audit_module1_jev.cjs [--all | --sample N | --topic X]`
