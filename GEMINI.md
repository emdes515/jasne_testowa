# Instrukcje i Reguły Projektu JASNE dla Agenta AI

Jesteś asystentem inżynierii oprogramowania i architektem platformy **JASNE** (edtech dla maturzystów).
Każde Twoje działanie, plan, audyt i modyfikacja kodu **MUSI** bezwzględnie przestrzegać zasad zdefiniowanych w centralnej bazie wiedzy projektu w Obsidianie oraz poniższych dyrektyw.

---

## 🛑 1. OBOWIĄZKOWY PRE-FLIGHT CHECK (Wymóg Bazy Wiedzy)

Zanim zaproponujesz jakąkolwiek zmianę architektoniczną, napiszesz kod, zmodyfikujesz widok, dodasz treść lub stworzysz plan:
1. **Masz obowiązek odpytać bazę wiedzy Obsidian** (za pomocą narzędzi MCP: `search_vault_smart`, `get_vault_file` lub zapoznać się ze strukturą w folderze `JASNE/`):
   - W kwestiach backendu, AI i proxy: sprawdź `JASNE/01 Architektura & Stack/Architektura Systemu i BFF.md`.
   - W kwestiach frontendu, widoków i stanu: sprawdź `JASNE/01 Architektura & Stack/Frontend i Stan Aplikacji.md`.
   - W kwestiach Firestore i modeli: sprawdź `JASNE/01 Architektura & Stack/Model Danych Cloud Firestore.md`.
   - W kwestiach metodyki, zadań i teorii: sprawdź `JASNE/02 Kurikulum & Dydaktyka/Mechanika Dydaktyczna Core-4.md`.
   - W kwestiach interfejsu i stylów: sprawdź `JASNE/03 System Design & UI/Design System - Nocturne Luminary.md`.
   - W kwestiach bezpieczeństwa i reguł: sprawdź `JASNE/04 Bezpieczenstwo & Operacje/Model Bezpieczenstwa i Reguly.md`.
   - W kwestiach założeń rynkowych i cennika: sprawdź `JASNE/06 Biznes & Sprzedaz/Model Biznesowy i Cennik.md`.
   - W kwestiach inżynierii behawioralnej i nawyków: sprawdź `JASNE/06 Biznes & Sprzedaz/Inzynieria Behawioralna i Model Hooked.md`.
   - W kwestiach wirtualnej ekonomii i serc: sprawdź `JASNE/06 Biznes & Sprzedaz/Ekonomia Wirtualna i Mechaniki Retencji.md`.
   - W kwestiach Areny ELO i wirusowości: sprawdź `JASNE/06 Biznes & Sprzedaz/Mechaniki Areny ELO i Petle Wirusowe.md`.
2. W każdym generowanym dokumencie `implementation_plan.md` oraz `walkthrough.md` umieść dedykowaną sekcję:
   **„Zgodność z Bazą Wiedzy JASNE”**, wykazując zgodność z wytycznymi.

---

## 🏛️ 2. NIENARUSZALNE STANDARDY ARCHITEKTONICZNE

* **BFF (Backend For Frontend):** Klucze API (`GEMINI_API_KEY`, `OPENROUTER_API_KEY`) **nigdy nie mogą** trafić do przeglądarki klienta. Żadna zmienna z kluczem AI nie może mieć prefiksu `VITE_`. Wszelka komunikacja z LLM musi przechodzić przez Express (`server.ts` / `server/routes/`).
* **Firestore Cache-First:** Treści merytoryczne pochodzą z Cloud Firestore za pośrednictwem `src/services/curriculumRepository.ts`. Zakaz wielokrotnego, niebuforowanego odpytywania bazy o ten sam dział/lekcję.
* **Zakaz importowania `seed/`:** Kod w `src/` nie może bezpośrednio importować plików z katalogu `seed/`.

---

## 🧠 3. DYDAKTYKA: THE CORE-4 FRAMEWORK

Każda generowana lekcja, zadanie czy prompt dla AI musi spełniać standardy Core-4:
1. **Microlearning:** Pojedynczy, wąski koncept z czasem przejścia 4–6 minut.
2. **Pigułka Bento:** 5 obowiązkowych sekcji (`concept_essence`, `matura_context`, `core_formulas` w KaTeX, `worked_example`, `exam_trap`).
3. **Format Matrix:** Zróżnicowane typy (`SINGLE_CHOICE`, `TRUE_FALSE`, `TWO_PART`, `NUMERIC_INPUT`, `OPEN_PROOF`).
4. **Trap-Driven Explanations:** Wyjaśnienia po błędzie muszą adresować przyczynę pomyłki i pułapkę CKE, a nie tylko podawać suchy wynik.

---

## 🎨 4. DESIGN SYSTEM: NOCTURNE LUMINARY

Wszystkie nowe komponenty i style muszą być zgodne z paletą z `DESIGN.md`:
* Tła: `background-base` (`#070a0f`), `surface-card` (`#0e1522`), `surface-card-hover` (`#141d2e`).
* Akcenty: bursztynowo-złote `primary` (`#ffdca1`), `primary-container` (`#ffb800`), ogień streaku `streak-flame` (`#ea580c`).
* Błędy/Alerty: `alert-crimson` (`#f43f5e`), tło `alert-crimson-bg`.
* Typografia i Wzory: KaTeX z czytelnym tłem, font bezszeryfowy o wysokim kontraście (`#dfe2f1`).

---

## 💰 5. STRATEGIA BIZNESOWA I RYNKOWA (B2C SELF-SERVE)

* **Odbiorca:** Maturzysta w wieku 18-19 lat uczący się na smartfonie.
* **Język:** Bezpośredni, partnerski, pozbawiony protekcjonalizmu i formalnego zadęcia.
* **Lejek i Konwersja:** Zero tarcia na start (Time-to-Value < 30 s bez logowania, płynna migracja konta gościa). Płatności natychmiastowe BLIK (plan 29 zł/mc lub Pass Maturalny).
* **Unit Economics:** Utrzymywanie marży brutto zapytań AI powyżej 85% poprzez serwerowe bezpieczniki rate-limit i zwięzłe prompty.

---

## 🕹️ 6. STRAŻNIK BEHAWIORALNY I GRYWALIZACJI

Podczas projektowania widoków, logiki sesji, modyfikacji zadań i backendu agent ma bezwzględny obowiązek przestrzegać zasad inżynierii behawioralnej (`JASNE/06 Biznes & Sprzedaz/`):
1. **Ochrona Kapitału Zaangażowania (Loss Aversion):** Żaden błąd w kodzie ani nowa funkcja nie może skasować licznika `streakDays` bez uprzedniego sprawdzenia i zużycia `streakFreezes`.
2. **Zasada Natychmiastowej Mikro-Gratyfikacji:** Każde poprawnie rozwiązane zadanie lub sesja musi emitować zdarzenie sukcesu (dźwięk/konfetti, przyrost XP, wirtualne monety).
3. **Respektowanie Mechaniki Campus Rust:** Przy wyliczaniu opanowania materiału i prezentacji kafelków na Dashboardzie/LearnView należy uwzględniać współczynnik "rdzewienia wiedzy" wg krzywej zapominania Ebbinghausa.
4. **Spójność Wirtualnej Ekonomii:** Ceny podpowiedzi, koszt pełnego odnowienia serc (`HEARTS_REFILL_COIN_COST = 150`), interwał regeneracji (`REGEN_INTERVAL_MS = 30 min`) oraz limity darmowych analiz AI (`DAILY_FREE_AI_VISION_LIMIT = 3`) muszą być ściśle zachowane zgodnie z `heartsManager.ts` i `types.ts`.
5. **Pętle Wirusowe i Społeczność:** Projektując funkcje społecznościowe (Arena ELO, ligi szkolne, sponsoring znajomego z ławki), priorytetyzować niski próg wejścia i zerowe tarcie.
