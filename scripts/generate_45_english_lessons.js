/**
 * scripts/generate_45_english_lessons.js
 *
 * Generuje komplet 45 autentycznych mikrolekcji Core-4 dla Języka Angielskiego (Formuła 2023)
 * podzielonych równomiernie po 3 lekcje na każdy z 15 Działów Egzaminacyjnych.
 * Zgodnie ze standardem Bento:
 * - concept_essence ("Klucz do tematu", brak zakazanej zakładki "Wzory")
 * - worked_examples (min. 2 modelowe zadania z krokami, wynikiem i poradą CKE)
 * - exam_trap (pułapka CKE)
 * - matura_context (wymogi punktowe)
 * - taskIds (wyselekcjonowane zadania z bazy 1500)
 */

import fs from 'fs';
import path from 'path';

const LESSONS_SPEC = [
  // =========================================================================
  // DZIAŁ 1: Czasy i Aspekty Czasownika (Filar I)
  // =========================================================================
  {
    id: 'eng-lesson-1-1',
    topicId: 'eng-dzial-1',
    pillarId: 'pillar-use-of-english',
    title: 'Present Perfect vs Past Simple – Skutek tu i teraz vs Zakończona przeszłość',
    subtitle: 'Kluczowe rozróżnienie w zadaniach wielokrotnego wyboru i lukach CKE',
    estimatedMinutes: 5,
    concept_essence: `Present Perfect i Past Simple to najczęściej testowany kontrast gramatyczny na maturze podstawowej.

### 1. Istota różnicy w pigułce:
* **Present Perfect (have/has + III forma):** Łączy przeszłość z teraźniejszością. Czynność wydarzyła się kiedyś, ale jej **rezultat, skutek lub doświadczenie** liczy się W TEJ CHWILI. Czas wykonania jest nieokreślony.
  * *Schemat:* Podmiot + **have / has + V₃** (pytania: *Have/Has + podmiot + V₃?*, przeczenia: *haven't / hasn't + V₃*).
  * *Przykład:* „I have lost my key.” (Zgubiłem klucz – skutek: stoję pod drzwiami i nie mogę wejść).
* **Past Simple (forma przeszła V₂ / did):** Czynność została **całkowicie zakończona w przeszłości** w ściśle określonym punkcie czasu.
  * *Schemat:* Podmiot + **V₂ / -ed** (pytania: *Did + podmiot + V₁?*, przeczenia: *didn't + V₁*).
  * *Przykład:* „I lost my key yesterday.” (Wczoraj zgubiłem klucz – fakt z przeszłości).

### 2. Słowa-klucze, które natychmiast zdradzają czas:
* **Wybierz Present Perfect, gdy widzisz:**
  * \`already\` (już w twierdzeniach), \`yet\` (już w pytaniach / jeszcze w przeczeniach), \`just\` (właśnie),
  * \`ever\` (kiedykolwiek), \`never\` (nigdy w życiu),
  * \`since\` + punkt w czasie (np. *since Monday, since 2020*),
  * \`for\` + okres trwania (np. *for three years, for a long time*).
* **Wybierz Past Simple, gdy widzisz:**
  * \`yesterday\`, \`ago\` (np. *two days ago*), \`last\` (np. *last week, last year*), \`in 2019\`, \`when I was a child\`.

### 3. Złota reguła egzaminatora CKE:
Jeżeli w zdaniu występuje konkretna data lub określenie minionego momentu, użycie Present Perfect jest **bezwzględnym błędem**!`,
    worked_examples: [
      {
        title: 'Przykład 1: Dobór czasu na podstawie sygnału czasowego',
        problem: 'Uzupełnij lukę w zdaniu: „We [...] (live) in this town for five years and we still love it here.”',
        steps: [
          { num: 1, label: 'Identyfikacja sygnału', text: 'Określenie „for five years” wraz z dopiskiem „and we still love it here” wskazuje, że czynność trwa nieprzerwanie do teraz.' },
          { num: 2, label: 'Wybór właściwej formy', text: 'Czynność trwająca od przeszłości do teraz wymaga czasu Present Perfect: have + V₃.' },
          { num: 3, label: 'Poprawna forma czasownika', text: 'Dla podmiotu „We” formą pomocniczą jest „have”, a czasownik „live” tworzy formę regularną „lived”.' }
        ],
        result: 'have lived',
        matura_tip: 'Gdyby zdanie brzmiało: „We lived there for five years before moving to Warsaw”, użylibyśmy Past Simple, bo czynność już się zakończyła!'
      },
      {
        title: 'Przykład 2: Eliminacja dystraktorów w teście wyboru ABC',
        problem: 'Wybierz poprawną odpowiedź: „Tom isn\'t hungry because he has [...] eaten lunch.”\nA. already  |  B. yet  |  C. ago',
        steps: [
          { num: 1, label: 'Analiza struktury', text: 'Zdanie jest twierdzące i występuje w nim czas Present Perfect („has eaten”).' },
          { num: 2, label: 'Weryfikacja opcji', text: '„Ago” łączy się tylko z Past Simple. „Yet” stosujemy na końcu zdań przeczących i pytań. Słowo „already” stoi pomiędzy czasownikiem pomocniczym a głównym w zdaniach twierdzących.' }
        ],
        result: 'A (already)',
        matura_tip: 'Pamiętaj o pozycji wyrazów: already/just/never wstawiamy PRZED czasownikiem głównym, a yet NA KOŃCU zdania.'
      }
    ],
    exam_trap: 'Stosowanie Present Perfect z pytaniem „When...?”! W języku angielskim pytanie o czas rozpoczęcia czynności ZAWSZE wymaga Past Simple: „When did you buy this car?” (NIGDY: „When have you bought...?”).',
    matura_context: 'Pojawia się w każdym arkuszu CKE (zadania 8, 9 lub 11) – 1–2 punkty.',
    taskIds: ['eng_uoe_076', 'eng_uoe_077', 'eng_uoe_078', 'eng_uoe_079', 'eng_uoe_080']
  },
  {
    id: 'eng-lesson-1-2',
    topicId: 'eng-dzial-1',
    pillarId: 'pillar-use-of-english',
    title: 'Past Continuous & Past Perfect w opowiadaniu CKE – Budowanie tła i chronologii',
    subtitle: 'Konstrukcje while/when oraz zaprzeszłość (had + V₃) w tekstach narracyjnych',
    estimatedMinutes: 5,
    concept_essence: `Na maturze w zadaniach z lukami i minidialogach kluczowe jest odróżnienie czynności długiej (tła) od czynności krótkiej, która ją przerwała, oraz wydarzenia wcześniejszego od innego wydarzenia przeszłego.

### 1. Zderzenie Past Continuous i Past Simple (While vs When):
* **Past Continuous (was/were + -ing):** Czynność długa, będąca tłem wydarzeń.
* **Past Simple (V₂):** Czynność krótka, która nagle przerwała tło.
* *Wzorce maturalne:*
  * \`While I was walking home, it started to rain.\` (Gdy wracałem do domu [tło], zaczęło padać [przerwanie]).
  * \`I was doing my homework when the lights went out.\`

### 2. Past Perfect (had + V₃) – Czas zaprzeszły:
* Wyraża czynność, która wydarzyła się **zanim** nastąpiło inne wydarzenie w czasie Past Simple.
* *Wzorzec CKE:* \`When we arrived at the cinema, the film had already started.\` (Najpierw zaczął się film, a dopiero potem dotarliśmy do kina).`,
    worked_examples: [
      {
        title: 'Przykład 1: Dobór spójnika while vs when',
        problem: 'Uzupełnij: „What were you doing [...] the fire alarm rang?”',
        steps: [
          { num: 1, label: 'Analiza części zdania', text: 'Pierwsza część to czynność w toku: „What were you doing” (Past Continuous). Druga część to zdarzenie punktowe: „the fire alarm rang” (Past Simple).' },
          { num: 2, label: 'Wybór łącznika', text: 'Przed czynnością krótką w Past Simple stawiamy spójnik „when”.' }
        ],
        result: 'when',
        matura_tip: 'Zapamiętaj: „While” łączy się najczęściej z formą ciągłą -ing (While I was cooking), a „When” z formą przeszłą dokonaną (When the phone rang).'
      },
      {
        title: 'Przykład 2: Ustalenie chronologii z czasem Past Perfect',
        problem: 'Uzupełnij: „Mark couldn\'t pay for dinner because he [...] (leave) his wallet at home.”',
        steps: [
          { num: 1, label: 'Logika wydarzeń', text: 'Mark nie mógł zapłacić w restauracji (Past Simple), ponieważ WCZEŚNIEJ zostawił portfel w domu.' },
          { num: 2, label: 'Zastosowanie reguły', text: 'Czynność wcześniejsza od innej przeszłej wymaga Past Perfect: had + V₃.' }
        ],
        result: 'had left',
        matura_tip: 'Leave jest czasownikiem nieregularnym: leave - left - left.'
      }
    ],
    exam_trap: 'Nadużywanie Past Perfect tam, gdzie występuje prosta sekwencja wydarzeń (np. „He woke up, brushed his teeth and had breakfast”). Jeśli czynności dzieją się po kolei jedna po drugiej, stosujemy WYŁĄCZNIE Past Simple!',
    matura_context: 'Częste w zadaniach 8 i 11 (tłumaczenia fragmentów i luki w opowiadaniu) – 1–2 punkty.',
    taskIds: ['eng_uoe_081', 'eng_uoe_082', 'eng_uoe_083', 'eng_uoe_084', 'eng_uoe_085']
  },
  {
    id: 'eng-lesson-1-3',
    topicId: 'eng-dzial-1',
    pillarId: 'pillar-use-of-english',
    title: 'Wyrażanie Przyszłości: will vs be going to vs Present Continuous',
    subtitle: 'Decyzja spontaniczna, zamiar i intencja, a zaplanowane spotkanie w kalendarzu',
    estimatedMinutes: 5,
    concept_essence: `Język angielski posiada 3 podstawowe sposoby mówienia o przyszłości, a CKE bezlitośnie sprawdza ich rozróżnienie w minidialogach:

### 1. Trzy formy przyszłości w pigułce:
* **Will + bezokolicznik:**
  * Spontaniczna decyzja podjęta w chwili mówienia: „The phone is ringing. I will answer it!”
  * Przepowiednie i opinie oparte na domysłach (zwykle po *I think, I believe, probably*): „I think it will rain tomorrow.”
  * Obietnice, oferty pomocy: „Don't worry, I won't tell anyone.”
* **Be going to + bezokolicznik:**
  * Wcześniejszy zamiar lub intencja: „I am going to study medicine next year.”
  * Przewidywanie na podstawie widocznych oznak (dowodów fizycznych): „Look at those dark clouds! It is going to rain.”
* **Present Continuous (am/is/are + -ing):**
  * Ściśle zaplanowane, ustalone z inną osobą wydarzenie z konkretną datą/miejscem: „I am seeing the dentist on Friday at 3 PM.”`,
    worked_examples: [
      {
        title: 'Przykład 1: Reakcja językowa w minidialogu',
        problem: 'X: „This suitcase is way too heavy for me.”\nY: „Don\'t worry, I [...] (help) you with it.”',
        steps: [
          { num: 1, label: 'Rozpoznanie kontekstu', text: 'Rozmówca Y oferuje natychmiastową, spontaniczną pomoc w odpowiedzi na uwagę X.' },
          { num: 2, label: 'Wybór struktury', text: 'Spontaniczna decyzja i oferta pomocy wymaga formy „will”.' }
        ],
        result: 'will help / \'ll help',
        matura_tip: 'Nigdy nie używaj „I am helping you” w znaczeniu spontanicznej oferty!'
      }
    ],
    exam_trap: 'Używanie „will” w zdaniach czasowych po spójnikach when, as soon as, before, after! W zdaniach podrzędnych czasowych zamiast will ZAWSZE stosujemy Present Simple: „I will call you when I arrive” (NIGDY: „when I will arrive”).',
    matura_context: 'Pewniak w minidialogach Zadania 9 i lukach Zadania 8 – 1 punkt.',
    taskIds: ['eng_uoe_086', 'eng_uoe_087', 'eng_uoe_088', 'eng_uoe_089', 'eng_uoe_090']
  },

  // =========================================================================
  // DZIAŁ 2: Formy bezokolicznika, Gerundium, Modals & Funkcje (Filar I)
  // =========================================================================
  {
    id: 'eng-lesson-2-1',
    topicId: 'eng-dzial-2',
    pillarId: 'pillar-use-of-english',
    title: 'Gerund vs Infinitive – Formy z -ing i bezokolicznik po czasownikach',
    subtitle: 'Kluczowe rekcje czasowników oraz zmiana znaczenia przy stop, remember i forget',
    estimatedMinutes: 5,
    concept_essence: `Na maturze musisz wiedzieć, czy dany czasownik wymaga po sobie formy z **-ing** (gerund), czy **to + bezokolicznik** (infinitive).

### 1. Złote listy czasowników CKE:
* **Tylko forma z -ing (Gerund):**
  * \`enjoy\`, \`avoid\`, \`mind\` (np. *Would you mind closing the window?*),
  * \`suggest\`, \`practise\`, \`finish\`, \`can't stand\`, \`look forward to\` (uwaga: *to* jest tu przyimkiem!).
  * **Żelazna zasada:** Po KAŻDYM przyimku (*in, at, about, without, of, for*) czasownik ZAWSZE przyjmuje formę z **-ing** (np. *interested in learning, good at drawing, thank you for coming*).
* **Tylko to + bezokolicznik (Infinitive):**
  * \`decide to\`, \`hope to\`, \`refuse to\`, \`promise to\`, \`afford to\`, \`agree to\`, \`want to\`, \`manage to\`.

### 2. Czasowniki zmieniające znaczenie:
* \`remember to do\` = pamiętać, by coś zrobić (obowiązek w przyszłości).
* \`remember doing\` = pamiętać, że się coś kiedyś zrobiło (wspomnienie z przeszłości).
* \`stop to do\` = zatrzymać się, ABY coś zrobić (w celu).
* \`stop doing\` = przestać robić daną czynność (rzucić nawyk).`,
    worked_examples: [
      {
        title: 'Przykład 1: Wybór formy po przyimku',
        problem: 'Uzupełnij zdanie: „She left the party without [...] (say) goodbye to anyone.”',
        steps: [
          { num: 1, label: 'Lokalizacja wyrazu sterującego', text: 'Przed luką znajduje się słowo „without”, które jest przyimkiem.' },
          { num: 2, label: 'Zastosowanie reguły', text: 'Po każdym przyimku czasownik musi mieć końcówkę -ing.' }
        ],
        result: 'saying',
        matura_tip: 'Nawet jeśli po polsku mówimy „bez pożegnania” (rzeczownik) lub „nie żegnając się”, po angielsku to zawsze forma -ing.'
      }
    ],
    exam_trap: 'Błąd przy konstrukcji „look forward to”! Maturzyści widzą „to” i myślą, że to bezokolicznik. W rzeczywistości „to” jest przyimkiem, dlatego poprawna forma to: „I look forward to hearing from you” (NIGDY: „to hear”).',
    matura_context: 'Pojawia się w każdym teście luk i parafraz – 1–2 punkty.',
    taskIds: ['eng_uoe_001', 'eng_uoe_002', 'eng_uoe_003', 'eng_uoe_004', 'eng_uoe_005']
  },
  {
    id: 'eng-lesson-2-2',
    topicId: 'eng-dzial-2',
    pillarId: 'pillar-use-of-english',
    title: 'Czasowniki modalne: Must, Can\'t, Should, Have to w zadaniach CKE',
    subtitle: 'Logiczna dedukcja, powinność i brak konieczności (don\'t have to vs mustn\'t)',
    estimatedMinutes: 5,
    concept_essence: `Czasowniki modalne na maturze podstawowej sprawdzają precyzję myślenia o zasadach, zakazach i logicznym wnioskowaniu.

### 1. Obowiązek, zakaz i brak konieczności:
* **Must:** Wewnętrzny nakaz, silne przekonanie mówcy („I must call my mom”).
* **Have to:** Zewnętrzny obowiązek narzucony przepisami, pracą, szkołą („I have to wear a uniform”).
* **Mustn't (ZAKAZ):** Kategoryczny zakaz! Robienie tego jest nielegalne lub niebezpieczne („You mustn't park here”).
* **Don't have to / Needn't (BRAK KONIECZNOŚCI):** Nie musisz, ale możesz, jeśli chcesz („Tomorrow is Sunday, so I don't have to wake up early”).

### 2. Logiczna dedukcja w teraźniejszości:
* **Must be:** Z pewnością tak jest, na 99% prawda („He has three sports cars. He must be very rich.”).
* **Can't be:** To niemożliwe, na 99% nieprawda („She can't be at school today, she is ill in bed.”).`,
    worked_examples: [
      {
        title: 'Przykład 1: Rozróżnienie zakazu i braku konieczności',
        problem: 'Wybierz: „You [...] touch this wire! It is extremely dangerous.”\nA. mustn\'t  |  B. don\'t have to  |  C. shouldn\'t',
        steps: [
          { num: 1, label: 'Ocena powagi sytuacji', text: 'Kabel jest skrajnie niebezpieczny, więc dotknięcie go grozi porażeniem – mamy bezwzględny zakaz.' },
          { num: 2, label: 'Wybór modalnego', text: '„Don\'t have to” oznacza opcjonalność, a „mustn\'t” oznacza ścisły zakaz.' }
        ],
        result: 'A (mustn\'t)',
        matura_tip: 'Polskie „nie musisz” to ZAWSZE „don\'t have to”, NIGDY „mustn\'t”!'
      }
    ],
    exam_trap: 'Mylenie „mustn\'t” z „don\'t have to”! Pamiętaj: „You don\'t have to go” = masz wybór. „You mustn\'t go” = nie wolno ci wyjść.',
    matura_context: 'Pewniak w parafrazach i minidialogach – 1 punkt.',
    taskIds: ['eng_uoe_006', 'eng_uoe_007', 'eng_uoe_008', 'eng_uoe_009', 'eng_uoe_010']
  },
  {
    id: 'eng-lesson-2-3',
    topicId: 'eng-dzial-2',
    pillarId: 'pillar-use-of-english',
    title: 'Minidialogi i oficjalny vs nieoficjalny rejestr w reakcjach językowych',
    subtitle: 'Reakcje na propozycje, przeprosiny, prośby o opinię i podziękowania',
    estimatedMinutes: 5,
    concept_essence: `Zadanie 9 CKE sprawdza naturalność reakcji językowych w codziennych sytuacjach. Kluczem jest wyczucie rejestru (nieformalny z kolegą vs uprzejmy z nieznajomym) oraz idiomatycznych zwrotów.

### 1. Złoty kanon reakcji językowych CKE:
* **Pytanie o drogę / pomoc:** „Could you tell me how to get to...?” -> Reakcja: „Go straight on and take the second turning on your left.”
* **Zgoda i odmowa na propozycję:**
  * „Why don't we go to the cinema?” -> „I'd love to, but I'm busy” / „Sounds like a great plan!”
* **Życzenia i gratulacje:**
  * „I passed my driving test!” -> „Congratulations! I'm so happy for you!” (NIGDY: „I congratulate you”).
  * „I'm taking my matura exam tomorrow.” -> „Fingers crossed! / Good luck!”
* **Reakcja na podziękowanie:** „Thank you so much!” -> „You're welcome / Don't mention it / Not at all.”`,
    worked_examples: [
      {
        title: 'Przykład 1: Reakcja na komplement',
        problem: 'X: „What a lovely jacket you\'re wearing!”\nY: „[...]”\nA. Never mind.  |  B. Thank you, I\'m glad you like it.  |  C. No problem.',
        steps: [
          { num: 1, label: 'Identyfikacja funkcji wypowiedzi', text: 'Rozmówca X prawi komplement na temat ubioru.' },
          { num: 2, label: 'Naturalna odpowiedź kulturowa', text: 'Na komplement w języku angielskim odpowiadamy uprzejmym podziękowaniem.' }
        ],
        result: 'B',
        matura_tip: '„Never mind” oznacza „Nieważne / Nic nie szkodzi” w reakcji na przeprosiny, nie pasuje do komplementu.'
      }
    ],
    exam_trap: 'Kalka z języka polskiego: „Please” jako odpowiedź na „Thank you”! Po angielsku „Proszę” w odpowiedzi na podziękowanie to ZAWSZE „You\'re welcome”, a nigdy samo słowo „Please”.',
    matura_context: 'Zadanie 9 w arkuszu maturalnym – 3–4 punkty.',
    taskIds: ['eng_uoe_011', 'eng_uoe_012', 'eng_uoe_013', 'eng_uoe_014', 'eng_uoe_015']
  },

  // =========================================================================
  // DZIAŁ 3: Okresy Warunkowe & Uzupełnianie Luk (Filar I)
  // =========================================================================
  {
    id: 'eng-lesson-3-1',
    topicId: 'eng-dzial-3',
    pillarId: 'pillar-use-of-english',
    title: 'Zero & First Conditional – Prawdy ogólne i realne plany z if / unless',
    subtitle: 'Niezmienne prawa natury oraz prawdopodobna przyszłość w strukturach CKE',
    estimatedMinutes: 5,
    concept_essence: `Okresy warunkowe to filar gramatyki na maturze. Zero i First Conditional opisują sytuacje rzeczywiste.

### 1. Zero Conditional (Fakty i prawa natury):
* **Struktura:** \`If + Present Simple, ... Present Simple\`
* *Przykład:* „If you heat ice, it melts.” (Gdy podgrzewasz lód, on topnieje).
* Stosujemy, gdy rezultat jest ZAWSZE pewny i niezmienny.

### 2. First Conditional (Realna przyszłość):
* **Struktura:** \`If + Present Simple, ... will + bezokolicznik\`
* *Przykład:* „If it rains tomorrow, we will stay at home.” (Jeśli jutro będzie padać, zostaniemy w domu).
* **Żelazna reguła egzaminatora:** Po słówku \`if\` NIGDY nie wstawiamy \`will\`!

### 3. Pułapka słówka UNLESS:
* \`Unless\` oznacza dokładnie to samo co \`If ... not\` (chyba że / jeśli nie).
* Ponieważ samo \`unless\` zawiera w sobie przeczenie, czasownik po nim musi być TWIERDZĄCY!
* *Przykład:* „Unless you study, you will fail.” = „If you do not study, you will fail.”`,
    worked_examples: [
      {
        title: 'Przykład 1: Parafraza z użyciem unless',
        problem: 'Przekształć zdanie: „If we don\'t leave now, we will miss the bus.”\nUżyj: UNLESS\nOdpowiedź: „[...] now, we will miss the bus.”',
        steps: [
          { num: 1, label: 'Zastąpienie if + not', text: 'Zastępujemy frazę „If we don\'t leave” słowem „Unless”.' },
          { num: 2, label: 'Czasownik w twierdzeniu', text: 'Po unless czasownik przyjmuje postać twierdzącą: „Unless we leave”.' }
        ],
        result: 'Unless we leave',
        matura_tip: 'Nigdy nie pisz „Unless we don\'t leave” – to byłoby podwójne zaprzeczenie!'
      }
    ],
    exam_trap: 'Wstawianie „will” po „if”: „If it will rain tomorrow...” to błąd kardynalny! W części warunkowej po if zawsze stosujemy czas teraźniejszy (Present Simple).',
    matura_context: 'Pojawia się w niemal każdym arkuszu w zadaniach 8 i 11 – 1–2 punkty.',
    taskIds: ['eng_uoe_331', 'eng_uoe_332', 'eng_uoe_333', 'eng_uoe_334', 'eng_uoe_335']
  },
  {
    id: 'eng-lesson-3-2',
    topicId: 'eng-dzial-3',
    pillarId: 'pillar-use-of-english',
    title: 'Second Conditional – Gdybanie i rady („If I were you”)',
    subtitle: 'Nierealne warunki w teraźniejszości i dawanie wskazówek w zadaniach otwartych',
    estimatedMinutes: 5,
    concept_essence: `Second Conditional (drugi okres warunkowy) służy do mówienia o sytuacjach hipotetycznych, nierealnych marzeniach oraz udzielaniu rad.

### 1. Budowa Drugiego Okresu Warunkowego:
* **Struktura:** \`If + Past Simple, ... would + bezokolicznik\`
* *Przykład:* „If I had a million dollars, I would travel around the world.” (Gdybym miał milion dolarów [a nie mam], podróżowałbym dookoła świata).
* Zamiast \`would\` możemy użyć \`could\` (mógłbym) lub \`might\` (być może bym).

### 2. Formuła dawania rad (If I were you):
* Na maturze tradycyjna i rekomendowana forma czasownika „to be” dla wszystkich osób (w tym *I, he, she*) to **were**:
* \`If I were you, I would talk to the teacher.\` (Na Twoim miejscu porozmawiałbym z nauczycielem).`,
    worked_examples: [
      {
        title: 'Przykład 1: Przekształcenie ze zwrotem doradczym',
        problem: 'Uzupełnij: „You should go to bed earlier.” -> „If I [...] you, I would go to bed earlier.”',
        steps: [
          { num: 1, label: 'Rozpoznanie idiomu', text: 'Zdanie wyraża radę („You should”). Odpowiednikiem jest idiomatyczny drugi okres warunkowy.' },
          { num: 2, label: 'Forma czasownika be', text: 'Oficjalna forma w konstrukcji to „were”.' }
        ],
        result: 'were',
        matura_tip: 'Forma „was” bywa potocznie tolerowana, ale klucz CKE jako wzorzec preferuje „were”.'
      }
    ],
    exam_trap: 'Mylenie First z Second Conditional! Zwróć uwagę na rezultat: jeśli w zdaniu głównym jest „will”, w warunku musi być Present Simple. Jeśli w zdaniu głównym jest „would”, w warunku musi być Past Simple!',
    matura_context: 'Pewniak w parafrazach ze słowem-kluczem i tłumaczeniach zdań – 1 punkt.',
    taskIds: ['eng_uoe_336', 'eng_uoe_337', 'eng_uoe_338', 'eng_uoe_339', 'eng_uoe_340']
  },
  {
    id: 'eng-lesson-3-3',
    topicId: 'eng-dzial-3',
    pillarId: 'pillar-use-of-english',
    title: 'Zdania czasowe z as soon as, when, until oraz konstrukcje w lukach',
    subtitle: 'Rygorystyczna reguła czasu teraźniejszego po spójnikach czasu w przyszłości',
    estimatedMinutes: 5,
    concept_essence: `Zdania czasowe (Time Clauses) w języku angielskim podlegają tej samej żelaznej regule co okresy warunkowe:

### 1. Spójniki czasowe odcinające „will”:
Gdy mówimy o przyszłości, po następujących spójnikach **nie wolno** użyć czasu przyszłego (will). Zamiast tego stosujemy **Present Simple**:
* \`when\` (kiedy)
* \`as soon as\` (jak tylko)
* \`until / till\` (dopóki nie / aż do momentu gdy)
* \`before\` (zanim)
* \`after\` (po tym jak)

### 2. Porównanie wzorców:
* \`I will call you as soon as I get home.\` (Zadzwonię, jak tylko dotrę do domu).
* \`We will wait here until she finishes her exam.\` (Poczekamy tutaj, dopóki ona nie skończy egzaminu).`,
    worked_examples: [
      {
        title: 'Przykład 1: Luka ze spójnikiem as soon as',
        problem: 'Uzupełnij: „I will give Tom the book as soon as I [...] (see) him tomorrow.”',
        steps: [
          { num: 1, label: 'Identyfikacja łącznika', text: 'Występuje spójnik czasowy „as soon as”.' },
          { num: 2, label: 'Czas po łączniku', text: 'Mimo odniesienia do jutra („tomorrow”), po as soon as stosujemy Present Simple.' }
        ],
        result: 'see',
        matura_tip: 'Napisanie „as soon as I will see” to gwarantowana utrata punktu!'
      }
    ],
    exam_trap: 'Kalka ze słowem „until”! W języku polskim mówimy „poczekam, aż nie przyjdzie” (z przeczeniem). W angielskim „until” oznacza stan do momentu zajścia faktu: „Wait until he arrives” (twierdzenie!).',
    matura_context: 'Zadania 8 i 11 – 1 punkt.',
    taskIds: ['eng_uoe_341', 'eng_uoe_342', 'eng_uoe_343', 'eng_uoe_344', 'eng_uoe_345']
  },

  // =========================================================================
  // DZIAŁ 4: Słowotwórstwo & False Friends (Filar I)
  // =========================================================================
  {
    id: 'eng-lesson-4-1',
    topicId: 'eng-dzial-4',
    pillarId: 'pillar-use-of-english',
    title: 'Przedrostki zaprzeczające un-, in-, im-, dis- i ir- w zadaniach CKE',
    subtitle: 'Jak tworzyć antonimy i nie pomylić dopasowania przedrostka do litery początkowej',
    estimatedMinutes: 5,
    concept_essence: `Słowotwórstwo w zadaniach otwartych CKE często wymaga utworzenia wyrazu o przeciwnym znaczeniu za pomocą prefiksu:

### 1. Złote zasady dopasowania prefiksów:
* **im-** stosujemy najczęściej przed literami **m** oraz **p**:
  * *possible -> impossible*, *polite -> impolite*, *patient -> impatient*, *mature -> immature*.
* **ir-** stosujemy przed literą **r**:
  * *responsible -> irresponsible*, *regular -> irregular*.
* **il-** stosujemy przed literą **l**:
  * *legal -> illegal*, *logical -> illogical*.
* **dis-** łączy się często z czasownikami i przymiotnikami:
  * *agree -> disagree*, *appear -> disappear*, *honest -> dishonest*, *like -> dislike*.
* **un-** to najbardziej uniwersalny przedrostek negujący:
  * *happy -> unhappy*, *known -> unknown*, *comfortable -> uncomfortable*, *lucky -> unlucky*.`,
    worked_examples: [
      {
        title: 'Przykład 1: Kontekstowe zaprzeczenie przymiotnika',
        problem: 'Uzupełnij: „It was very [...] (RESPONSIBLE) of him to leave the door unlocked all night.”',
        steps: [
          { num: 1, label: 'Ocena sensu zdania', text: 'Zostawienie otwartych drzwi na całą noc było lekkomyślne / nieodpowiedzialne.' },
          { num: 2, label: 'Dobór prefiksu negującego', text: 'Dla słowa na literę „r” (responsible) prefiksem jest „ir-”.' }
        ],
        result: 'irresponsible',
        matura_tip: 'Zawsze czytaj całe zdanie do końca! Często baza słowotwórcza pasuje gramatycznie, ale sens wymaga antonimu.'
      }
    ],
    exam_trap: 'Niedokładne czytanie kontekstu! Jeśli uczeń wpisze słowo bazowe bez prefiksu zaprzeczającego, zdanie staje się nielogiczne i egzaminator przyznaje 0 punktów.',
    matura_context: 'Zadanie 10 lub 11 CKE (słowotwórstwo w tekście) – 1 punkt.',
    taskIds: ['eng_uoe_151', 'eng_uoe_152', 'eng_uoe_153', 'eng_uoe_154', 'eng_uoe_155']
  },
  {
    id: 'eng-lesson-4-2',
    topicId: 'eng-dzial-4',
    pillarId: 'pillar-use-of-english',
    title: 'Sufiksy tworzące rzeczowniki i przymiotniki (-tion, -ment, -ful, -less, -ity)',
    subtitle: 'Rozpoznawanie brakującej części mowy w luce i bezbłędny zapis ortograficzny',
    estimatedMinutes: 5,
    concept_essence: `Aby bezbłędnie rozwiązać zadanie słowotwórcze, musisz najpierw ustalić, jakiej części mowy brakuje w luce:

### 1. Rozpoznawanie części mowy z pozycji w zdaniu:
* Przedimek + luka + rzeczownik -> potrzebujesz **przymiotnika** (np. *a SUCCESSFUL career*).
* Przedimek + luka + czasownik -> potrzebujesz **rzecznika** (np. *the DECISION was made*).
* Czasownik + luka -> potrzebujesz **przysłówka** z końcówką \`-ly\` (np. *drove CAREFULLY*).

### 2. Najpopularniejsze sufiksy maturalne:
* **Rzeczowniki:** \`-tion\` (*inform -> information*), \`-ment\` (*develop -> development*), \`-ness\` (*dark -> darkness*), \`-ity\` (*active -> activity*).
* **Przymiotniki:** \`-ful\` (*hope -> hopeful*), \`-less\` (*care -> careless*), \`-ous\` (*danger -> dangerous*), \`-able\` (*comfort -> comfortable*).`,
    worked_examples: [
      {
        title: 'Przykład 1: Zamiana czasownika na rzeczownik',
        problem: 'Uzupełnij: „We need your [...] (CONFIRM) before we can send the package.”',
        steps: [
          { num: 1, label: 'Analiza pozycji', text: 'Po zaimku dzierżawczym „your” musi wystąpić rzeczownik.' },
          { num: 2, label: 'Transformacja sufixem', text: 'Czasownik confirm tworzy rzeczownik za pomocą sufiksu -ation.' }
        ],
        result: 'confirmation',
        matura_tip: 'Uważaj na pisownię – litera „e” często zanika przed samogłoską w sufiksie (np. decide -> decision).'
      }
    ],
    exam_trap: 'Błędy literowe w pisowni sufiksów! CKE nie uznaje odpowiedzi z błędem ortograficznym, np. „developement” zamiast „development” lub „beautyful” zamiast „beautiful”.',
    matura_context: 'Zadania 10 i 11 – 1–2 punkty.',
    taskIds: ['eng_uoe_156', 'eng_uoe_157', 'eng_uoe_158', 'eng_uoe_159', 'eng_uoe_160']
  },
  {
    id: 'eng-lesson-4-3',
    topicId: 'eng-dzial-4',
    pillarId: 'pillar-use-of-english',
    title: 'Leksykalne False Friends – Pułapki fałszywych przyjaciół na maturze',
    subtitle: 'Wyrazy brzmiące identycznie jak polskie słowa, ale o zupełnie innym znaczeniu',
    estimatedMinutes: 5,
    concept_essence: `False Friends (fałszywi przyjaciele) to ulubiona broń autorów arkuszy CKE w dystraktorach zadań wielokrotnego wyboru.

### 1. Zestawienie 6 największych pułapek CKE:
* **Actually:** Nie oznacza „aktualnie”! Oznacza **„tak naprawdę / w rzeczywistości”**. „Aktualnie” to \`currently\` lub \`at present\`.
* **Eventual / Eventually:** Nie oznacza „ewentualny / ewentualnie”! Oznacza **„ostateczny / w końcu / ostatecznie”**. „Ewentualnie” to \`possibly\` lub \`if necessary\`.
* **Sympathetic:** Nie oznacza „sympatyczny”! Oznacza **„współczujący / pełen zrozumienia”**. „Sympatyczny” to \`nice\`, \`friendly\` lub \`likeable\`.
* **Receipt:** To nie jest „recepta lekarska”! To **„paragon fiskalny”**. Recepta to \`prescription\`.
* **Chef:** To nie jest „szef w biurze”! To **„szef kuchni / kucharz”**. Szef w pracy to \`boss\` lub \`manager\`.
* **Fabric:** To nie jest „fabryka”! To **„tkanina / materiał”**. Fabryka to \`factory\`.`,
    worked_examples: [
      {
        title: 'Przykład 1: Eliminacja w teście ABC',
        problem: 'Wybierz: „I thought the exam would be hard, but [...] it was quite easy.”\nA. actually  |  B. currently  |  C. eventually',
        steps: [
          { num: 1, label: 'Sens zdania', text: 'Autor porównuje swoje wcześniejsze wyobrażenie z rzeczywistością: „ale tak naprawdę był całkiem prosty”.' },
          { num: 2, label: 'Wybór wyrazu', text: '„Actually” znaczy „tak naprawdę / w rzeczywistości”.' }
        ],
        result: 'A (actually)',
        matura_tip: 'Gdy widzisz słowo „actually” w opcjach, zastanów się dwa razy – to najczęstsza pułapka egzaminu!'
      }
    ],
    exam_trap: 'Kalka myślowa przy słowie „receipt” – uczeń widzi scenę u lekarza i wybiera „receipt”, podczas gdy lekarz wystawia „prescription”.',
    matura_context: 'Zadania 8 i 9 – 1 punkt.',
    taskIds: ['eng_uoe_161', 'eng_uoe_162', 'eng_uoe_163', 'eng_uoe_164', 'eng_uoe_165']
  },

  // =========================================================================
  // DZIAŁ 5: Parafrazy ze słowem-kluczem & Tłumaczenia Fragmentów (Filar I)
  // =========================================================================
  {
    id: 'eng-lesson-5-1',
    topicId: 'eng-dzial-5',
    pillarId: 'pillar-use-of-english',
    title: 'Strona bierna (Passive Voice) w transformacjach maturalnych',
    subtitle: 'Przekształcanie zdań z zachowaniem czasu gramatycznego i dopasowaniem liczby',
    estimatedMinutes: 5,
    concept_essence: `Strona bierna pojawia się w arkuszu maturalnym w niemal każdej sesji. Kluczem jest zachowanie TEGO SAMEGO czasu gramatycznego!

### 1. Uniwersalny algorytm strony biernej:
Dopełnienie staje się podmiotem + **odpowiednia forma czasownika „to be”** + **V₃ (trzecia forma czasownika głównego)**.

### 2. Tabela czasów w stronie biernej:
* **Present Simple:** \`am / is / are + V₃\` (The room is cleaned every day).
* **Past Simple:** \`was / were + V₃\` (The bridge was built in 1995).
* **Present Perfect:** \`has been / have been + V₃\` (The car has been repaired).
* **Czasowniki modalne:** \`modal + be + V₃\` (It can be done / Tickets must be shown).`,
    worked_examples: [
      {
        title: 'Przykład 1: Parafraza ze słowem kluczem',
        problem: 'Przekształć zdanie: „Someone stole my bike last night.”\nSłowo-klucz: WAS\n„My bike [...] last night.”',
        steps: [
          { num: 1, label: 'Rozpoznanie czasu wyjściowego', text: 'Zdanie wyjściowe jest w Past Simple („stole”).' },
          { num: 2, label: 'Forma strony biernej w Past Simple', text: 'Podmiot „My bike” jest w liczbie pojedynczej, więc: was + V₃ czasownika steal (stolen).' }
        ],
        result: 'was stolen',
        matura_tip: 'Sprawdź formę nieregularną: steal - stole - stolen. Pomyłka w III formie oznacza 0 punktów.'
      }
    ],
    exam_trap: 'Niewłaściwa liczba czasownika „to be”! Gdy zamieniasz dopełnienie w liczbie mnogiej na podmiot, czasownik musi być w liczbie mnogiej (np. „The letters WERE sent”, a nie „was sent”).',
    matura_context: 'Pewniak Zadania 11 CKE (parafrazy) – 1 punkt.',
    taskIds: ['eng_uoe_211', 'eng_uoe_212', 'eng_uoe_213', 'eng_uoe_214', 'eng_uoe_215']
  },
  {
    id: 'eng-lesson-5-2',
    topicId: 'eng-dzial-5',
    pillarId: 'pillar-use-of-english',
    title: 'Mowa zależna (Reported Speech) i pytania pośrednie w kluczu CKE',
    subtitle: 'Zasada cofnięcia czasów (Backshift) oraz prosty szyk zdania w pytaniach pośrednich',
    estimatedMinutes: 5,
    concept_essence: `Relacjonowanie wypowiedzi innych osób wymaga znajomości reguły cofnięcia czasów gramatycznych:

### 1. Zasada cofania czasów (Backshift of Tenses):
* Present Simple -> **Past Simple** (am/is/are -> was/were, like -> liked).
* Present Continuous -> **Past Continuous** (is doing -> was doing).
* Past Simple / Present Perfect -> **Past Perfect** (went / have gone -> had gone).
* will -> **would**, can -> **could**.

### 2. Pytania pośrednie (Indirect Questions):
Pytanie pośrednie traci strukturę pytania i przyjmuje **zwykły szyk zdania oznajmującego** (bez did, does, do):
* „Where does he live?” -> „Can you tell me where he lives?”
* „What time is it?” -> „Do you know what time it is?” (NIGDY: what time is it).`,
    worked_examples: [
      {
        title: 'Przykład 1: Szyk w pytaniu pośrednim',
        problem: 'Uzupełnij: „Could you tell me how much [...]?”\nA. does this ticket cost  |  B. this ticket costs  |  C. costs this ticket',
        steps: [
          { num: 1, label: 'Struktura pytania pośredniego', text: 'Po zwrocie wprowadzającym „Could you tell me...” następuje szyk zdania twierdzącego: podmiot + orzeczenie.' },
          { num: 2, label: 'Wybór opcji', text: 'Prawidłowy szyk to: this ticket (podmiot) costs (orzeczenie).' }
        ],
        result: 'B',
        matura_tip: 'W pytaniu pośrednim operator „does” całkowicie znika!'
      }
    ],
    exam_trap: 'Stosowanie inwersji i operatora did/does w pytaniu pośrednim: „Can you tell me where do you live?” to jeden z najczęstszych błędów na maturze!',
    matura_context: 'Zadania 9 i 11 – 1 punkt.',
    taskIds: ['eng_uoe_216', 'eng_uoe_217', 'eng_uoe_218', 'eng_uoe_219', 'eng_uoe_220']
  },
  {
    id: 'eng-lesson-5-3',
    topicId: 'eng-dzial-5',
    pillarId: 'pillar-use-of-english',
    title: 'Konstrukcje kluczowe: so / such, too / enough oraz used to w tłumaczeniach PL->EN',
    subtitle: 'Niezbędnik transformacji zdań i tłumaczeń fragmentów w Formule 2023',
    estimatedMinutes: 5,
    concept_essence: `Trzy potężne konstrukcje gramatyczne, które pojawiają się w każdym arkuszu maturalnym:

### 1. So vs Such (a):
* \`so + przymiotnik:\` „He was so tired that he fell asleep.”
* \`such + (a/an) + przymiotnik + rzeczownik:\` „It was such a boring film that I left.”

### 2. Too vs Enough:
* \`too + przymiotnik (zbyt...):\` „This coffee is too hot to drink.”
* \`przymiotnik + enough (wystarczająco...):\` „He is old enough to drive a car.” (Uwaga na pozycję: przymiotnik stoi PRZED enough!).

### 3. Used to (Dawne nawyki):
* Wyraża nawyki lub stany z przeszłości, które są już nieaktualne:
* „I used to play tennis every week, but now I don't have time.”
* W przeczeniach: \`didn't use to\` (bez litery „d”!).`,
    worked_examples: [
      {
        title: 'Przykład 1: Pozycja słowa enough',
        problem: 'Przekształć zdanie: „I can\'t buy this laptop because it is too expensive.”\nUżyj: ENOUGH\n„I don\'t have [...] to buy this laptop.”',
        steps: [
          { num: 1, label: 'Dopasowanie z rzeczownikiem', text: 'Z rzeczownikiem (pieniądze - money) słowo enough stoi PRZED nim: enough money.' }
        ],
        result: 'enough money',
        matura_tip: 'Przymiotnik stoi przed enough (warm enough), ale rzeczownik stoi PO enough (enough money).'
      }
    ],
    exam_trap: 'Błędny zapis w przeczeniu: „didn\'t used to”. Pamiętaj, że operator „did” przejmuje formę przeszłą, więc czasownik wraca do bezokolicznika: „didn\'t use to”.',
    matura_context: 'Zadanie 11 (tłumaczenie fragmentów zdań) – 1–2 punkty.',
    taskIds: ['eng_uoe_221', 'eng_uoe_222', 'eng_uoe_223', 'eng_uoe_224', 'eng_uoe_225']
  },

  // =========================================================================
  // DZIAŁ 6: Słuchanie: Wybór Wielokrotny ABC (Filar II)
  // =========================================================================
  {
    id: 'eng-lesson-6-1',
    topicId: 'eng-dzial-6',
    pillarId: 'pillar-listening',
    title: 'Wychwytywanie intencji i nastawienia emocjonalnego mówcy ze słuchu',
    subtitle: 'Rozpoznawanie czy głośnik przeprasza, doradza, narzeka czy zachęca do działania',
    estimatedMinutes: 5,
    concept_essence: `W zadaniu 1 na maturze pytanie często dotyczy intencji lub celu wypowiedzi: „The speaker is calling to...”, „The woman is talking about...”.

### 1. Strategia pre-listening (Przed włączeniem nagrania):
* W ciągu 20 sekund przed odsłuchem przeczytaj same czasowniki w opcjach: *complain, invite, remind, warn, apologize*.
* Zastanów się, jakich słów kluczowych spodziewasz się usłyszeć dla każdej intencji.

### 2. Słownictwo intencji mówcy:
* **To complain (narzekać):** rozczarowanie, zwroty *disappointed, terrible, didn't work, waste of money*.
* **To warn (ostrzegać):** *be careful, danger, don't forget to watch out, avoid*.
* **To encourage (zachęcać):** *you should definitely try, don't give up, it's worth it*.
* **To enquire / ask for information (zasięgnąć informacji):** *I was wondering if, could you let me know*.`,
    worked_examples: [
      {
        title: 'Przykład 1: Identyfikacja intencji w wypowiedzi',
        problem: 'Tekst audio: „Look, I know you promised to finish the presentation by noon, but it\'s already 1:30 and the client is waiting. You really need to speed up.”\nJaki jest cel wypowiedzi?\nA. To praise a colleague.  |  B. To express dissatisfaction.  |  C. To offer help.',
        steps: [
          { num: 1, label: 'Wychwycenie tonu', text: 'Mówca wskazuje na niedotrzymanie terminu i zniecierpliwienie klienta.' },
          { num: 2, label: 'Dopasowanie intencji', text: 'Wyraża niezadowolenie z opóźnienia pracy (dissatisfaction).' }
        ],
        result: 'B',
        matura_tip: 'Nawet jeśli mówca nie używa wulgaryzmów ani krzyku, formalny ton krytyki oznacza „dissatisfaction” lub „complaint”.'
      }
    ],
    exam_trap: 'Zwracanie uwagi tylko na jedno izolowane miłe słowo (np. „I appreciate...”) w wypowiedzi, która jako całość jest reklamacją lub skargą.',
    matura_context: 'Zadanie 1 CKE – 1–2 punkty.',
    taskIds: ['eng_lis_121', 'eng_lis_122', 'eng_lis_123', 'eng_lis_124', 'eng_lis_125']
  },
  {
    id: 'eng-lesson-6-2',
    topicId: 'eng-dzial-6',
    pillarId: 'pillar-listening',
    title: 'Selekcja informacji faktograficznych i eliminacja zmyłek w wywiadach',
    subtitle: 'Jak nie dać się nabrać na zaprzeczoną informację wymienioną chwilę później',
    estimatedMinutes: 5,
    concept_essence: `W dłuższych wywiadach maturalnych autorzy arkusza CKE celowo umieszczają w tekście audio **wszystkie trzy opcje z pytań ABC**, ale dwie z nich są negowane!

### 1. Mechanizm pułapki „Zwrot akcji”:
* Lektor zaczyna: „Initially, I planned to take the train...” (uczeń słyszy *train* i od razu zaznacza opcję A).
* Następnie dodaje: „...but my sister offered to lend me her car, which was so convenient.”
* Właściwa odpowiedź to podróż samochodem, a nie pociągiem!

### 2. Słowa sygnalizujące zmianę zdania:
Gdy w nagraniu słyszysz: \`actually\`, \`however\`, \`instead of\`, \`in the end\`, \`to tell the truth\` – to właśnie po tym spójniku padnie **właściwa odpowiedź**!`,
    worked_examples: [
      {
        title: 'Przykład 1: Wychwycenie ostatecznej decyzji',
        problem: 'Audio: „We considered visiting the museum, but the queues were enormous. So we headed straight to the botanic gardens instead.”\nWhere did they go?\nA. Museum  |  B. Botanic gardens  |  C. Train station',
        steps: [
          { num: 1, label: 'Lokalizacja zmiany decyzji', text: 'Słowo „considered” oznacza jedynie rozważanie. Spójnik „instead” wskazuje ostateczny cel.' },
          { num: 2, label: 'Wybór właściwej odpowiedzi', text: 'Udali się do ogrodu botanicznego (botanic gardens).' }
        ],
        result: 'B',
        matura_tip: 'Nigdy nie zaznaczaj pierwszej usłyszanej nazwy – zawsze czekaj na konkluzję zdania!'
      }
    ],
    exam_trap: 'Pośpiech i zaznaczanie odpowiedzi po pierwszym usłyszanym słowie-kluczu. Zawsze wysłuchaj obu odtworzeń nagrania do końca.',
    matura_context: 'Zadanie 1 CKE – 2–3 punkty.',
    taskIds: ['eng_lis_126', 'eng_lis_127', 'eng_lis_128', 'eng_lis_129', 'eng_lis_130']
  },
  {
    id: 'eng-lesson-6-3',
    topicId: 'eng-dzial-6',
    pillarId: 'pillar-listening',
    title: 'Komunikaty publiczne i ogłoszenia – słuchanie pod kątem miejsca i celu',
    subtitle: 'Rozpoznawanie komunikatów na dworcu, lotnisku, w galerii handlowej i teatrze',
    estimatedMinutes: 5,
    concept_essence: `CKE regularnie testuje krótkie komunikaty przez radiowęzeł lub automatyczne nagrania telefoniczne:

### 1. Typowe miejsca akcji i ich słownictwo dźwiękowe:
* **Airport / Flight:** *gate, boarding, delayed, luggage, security check, departure*.
* **Railway station:** *platform, track, coach number, return ticket, change trains*.
* **Department store / Mall:** *discount, cashier, receipt, changing rooms, customer service*.
* **Theatre / Cinema:** *performance, interval, auditorium, switch off mobile phones*.

### 2. Pytanie o adresata komunikatu:
* „Who is the announcement addressed to?” -> Zwróć uwagę na zwroty powitalne: *Dear passengers, Shoppers, Hotel guests, Students*.`,
    worked_examples: [
      {
        title: 'Przykład 1: Identyfikacja miejsca komunikatu',
        problem: 'Audio: „May I have your attention, please. The 14:15 service to Manchester Piccadilly has been moved to platform 4. Please cross the footbridge carefully.”\nWhere is the speaker?\nA. At an airport  |  B. At a railway station  |  C. On a bus',
        steps: [
          { num: 1, label: 'Identyfikacja słów kluczy', text: 'Słowa: „service to Manchester”, „platform 4”, „footbridge”.' },
          { num: 2, label: 'Dopasowanie miejsca', text: 'Termin „platform” w kontekście podróży oznacza peron kolejowy.' }
        ],
        result: 'B',
        matura_tip: 'Na lotnisku peron to nie platform, lecz wyjście do samolotu to „gate”.'
      }
    ],
    exam_trap: 'Mylenie „platform” (peron kolejowy) z „gate” (bramka na lotnisku).',
    matura_context: 'Zadanie 1 CKE – 1 punkt.',
    taskIds: ['eng_lis_131', 'eng_lis_132', 'eng_lis_133', 'eng_lis_134', 'eng_lis_135']
  },

  // =========================================================================
  // DZIAŁ 7: Słuchanie: Dobieranie Wypowiedzi Matching (Filar II)
  // =========================================================================
  {
    id: 'eng-lesson-7-1',
    topicId: 'eng-dzial-7',
    pillarId: 'pillar-listening',
    title: 'Główna myśl vs poboczne szczegóły w 4 różnych wypowiedziach (Zadanie 2 CKE)',
    subtitle: 'Jak połączyć 4 mówców z 5 nagłówkami (jeden nagłówek jest zmyłką!)',
    estimatedMinutes: 5,
    concept_essence: `W Zadaniu 2 słyszysz 4 różne osoby wypowiadające się na ten sam ogólny temat (np. wakacje, hobby, pierwsza praca). Do wyboru masz 5 zdań (A–E). Jedno zdanie jest zbędne!

### 1. Metoda dwóch przejść:
* **Przejście 1 (pierwsze odtworzenie):** Skup się na ogólnym wydźwięku każdego mówcy. Zanotuj przy każdym numerze 1–4 jedno słowo kluczowe (np. *zmęczony, zachwycony, zły na koszty*).
* **Przejście 2 (drugie odtworzenie):** Zweryfikuj, który nagłówek odpowiada sednu wypowiedzi, a który jest zmyłką opartą na pojedynczym słowie.

### 2. Szukaj synonimów, a nie identycznych słów!
Prawidłowa odpowiedź w Zadaniu 2 **niemal nigdy** nie używa dokładnie tych samych wyrazów co nagranie. Używa parafraz:
* W nagraniu: „It cost an arm and a leg” -> W nagłówku: „The speaker was shocked by the price”.`,
    worked_examples: [
      {
        title: 'Przykład 1: Parafraza nagłówka',
        problem: 'Mówca: „I spent three hours cleaning the grease off the kitchen ovens. My back was aching for days.”\nNagłówek w teście:\nA. The speaker found the job physically demanding.\nB. The speaker quit after an argument with the chef.',
        steps: [
          { num: 1, label: 'Analiza doświadczenia', text: 'Ból pleców i wielogodzinne szorowanie pieców oznacza wysiłek fizyczny.' },
          { num: 2, label: 'Dopasowanie parafrazy', text: '„Physically demanding” to dokładna synonimiczna parafraza bólu i ciężkiej pracy.' }
        ],
        result: 'A',
        matura_tip: 'Brak wzmianki o kłótni eliminuje opcję B, nawet jeśli praca była w kuchni.'
      }
    ],
    exam_trap: 'Wybieranie nagłówka, który zawiera to samo słowo co wypowiedź, ale odnosi się do pobocznego wątku (tzw. zmyłka leksykalna).',
    matura_context: 'Zadanie 2 CKE – 4 punkty (po 1 pkt za każdego mówcę).',
    taskIds: ['eng_lis_001', 'eng_lis_002', 'eng_lis_003', 'eng_lis_004', 'eng_lis_005']
  },
  {
    id: 'eng-lesson-7-2',
    topicId: 'eng-dzial-7',
    pillarId: 'pillar-listening',
    title: 'Pułapka „word-spotting” – jak nie dać się złapać na dosłowne powtórzenia',
    subtitle: 'Dlaczego dosłownie powtórzone słowo z nagrania jest w 80% błędnym dystraktorem',
    estimatedMinutes: 5,
    concept_essence: `Word-spotting to odruchowe zaznaczanie odpowiedzi dlatego, że usłyszało się dokładnie to samo słowo w głośniku. Egzaminatorzy CKE doskonale znają ten odruch i celowo konstruują na nim pułapki!

### 1. Jak działa ta pułapka w arkuszu CKE:
* Mówca mówi: „I was thinking about buying a **motorcycle**, but my parents convinced me it was unsafe, so I bought a dependable second-hand car.”
* Opcja ze zmyłką: „The speaker bought a new motorcycle.” (Słowo *motorcycle* padło, ale treść zdania jest sprzeczna z nagraniem!).
* Prawidłowa opcja: „The speaker chose a safer vehicle.”

### 2. Żelazna zasada bezpiecznego zdawania:
Jeśli nagłówek zawiera słowo powtórzone 1:1 z nagrania, sprawdź go **trzykrotnie**! Bardzo często prawdziwa odpowiedź ukrywa się pod synonimem.`,
    worked_examples: [
      {
        title: 'Przykład 1: Rozpoznanie zmyłki word-spotting',
        problem: 'Audio: „My uncle told me that working as a tour guide means you travel for free. Well, that wasn\'t true at all – I was stuck in the office answering emails.”\nNagłówek A: The speaker enjoyed free travelling as a guide.\nNagłówek B: The job did not match the speaker\'s expectations.',
        steps: [
          { num: 1, label: 'Wychwycenie zmyłki', text: 'Nagłówek A zawiera słowa „free travelling”, ale mówca wyraźnie zaznacza: „that wasn\'t true at all”.' },
          { num: 2, label: 'Wybór właściwej parafrazy', text: 'Nagłówek B podsumowuje rozczarowanie i niezgodność z oczekiwaniami.' }
        ],
        result: 'B',
        matura_tip: 'Zwrot „that wasn\'t true at all” całkowicie unieważnia dosłowne słowa z nagrania!'
      }
    ],
    exam_trap: 'Wybieranie opcji na podstawie pierwszego skojarzenia słownego bez weryfikacji przeczenia w zdaniu.',
    matura_context: 'Zadanie 2 CKE – klucz do zdobycia kompletu 4 punktów.',
    taskIds: ['eng_lis_006', 'eng_lis_007', 'eng_lis_008', 'eng_lis_009', 'eng_lis_010']
  },
  {
    id: 'eng-lesson-7-3',
    topicId: 'eng-dzial-7',
    pillarId: 'pillar-listening',
    title: 'Wnioskowanie po spójnikach zwrotu akcji (however, but, actually, on the other hand)',
    subtitle: 'Jak wyłapać moment, w którym mówca rewiduje swoją początkową opinię',
    estimatedMinutes: 5,
    concept_essence: `W zadaniach na dobieranie mówcy bardzo rzadko wyrażają prostą, jednostajną opinię. Standardowy schemat CKE to:
\`Początkowy entuzjazm / plan -> SPÓJNIK KONTRASTU -> Rzeczywisty wniosek / rozczarowanie\`.

### 1. Kluczowe spójniki zmiany zdania:
* \`However\` (jednakże)
* \`Although / Even though\` (chociaż)
* \`To be honest / Actually\` (szczerze mówiąc / tak naprawdę)
* \`The only downside was...\` (jedynym minusem było...)
* \`Despite my high hopes...\` (pomimo moich wielkich nadziei...)

### 2. Strategia uwagi:
Cokolwiek mówca powie PRZED słowem „However”, to zazwyczaj tylko wstęp lub tło. Twoje ucho musi wychwycić to, co następuje **BEZPOŚREDNIO PO SPÓJNIKU**!`,
    worked_examples: [
      {
        title: 'Przykład 1: Wnioskowanie po zwrocie akcji',
        problem: 'Audio: „The hotel had a huge pool and the weather was glorious. However, the non-stop construction noise next door made sleeping impossible.”\nJaka była dominująca opinia gościa?\nA. He was delighted with the recreational facilities.\nB. His stay was ruined by disturbing noise.',
        steps: [
          { num: 1, label: 'Wychwycenie spójnika', text: 'Po słowie „However” mówca przedstawia problem: hałas z budowy uniemożliwiający sen.' },
          { num: 2, label: 'Ocena nadrzędnej opinii', text: 'Brak snu z powodu hałasu przeważa nad basenem – pobyt został zepsuty.' }
        ],
        result: 'B',
        matura_tip: 'Zawsze oceniaj ostateczny bilans emocjonalny wypowiedzi.'
      }
    ],
    exam_trap: 'Skupienie się na pierwszej połowie zdania i zignorowanie spójnika kontrastu.',
    matura_context: 'Zadania 1 i 2 CKE – 1–2 punkty.',
    taskIds: ['eng_lis_011', 'eng_lis_012', 'eng_lis_013', 'eng_lis_014', 'eng_lis_015']
  },

  // =========================================================================
  // DZIAŁ 8: Słuchanie: Uzupełnianie Luk & Prawda/Fałsz (Filar II)
  // =========================================================================
  {
    id: 'eng-lesson-8-1',
    topicId: 'eng-dzial-8',
    pillarId: 'pillar-listening',
    title: 'Zapisywanie liczb, dat, cen i nazw własnych z nagrania CKE (Zadanie 3)',
    subtitle: 'Zadanie otwarte ze słuchu: fonetyka liczb -teen vs -ty oraz poprawne literowanie',
    estimatedMinutes: 5,
    concept_essence: `W Zadaniu 3 na maturze uczeń musi wpisać w lukę brakujące słowo, liczbę lub wyrażenie na podstawie usłyszanego tekstu.

### 1. Klasyczna pułapka fonetyczna: -teen vs -ty:
* **13 vs 30:** \`thirteen\` [akcent na -TEEN] vs \`thirty\` [akcent na THIR-].
* **15 vs 50:** \`fifteen\` vs \`fifty\`.
* Pamiętaj: liczebniki od 13 do 19 mają długą, mocno akcentowaną końcówkę *-teen*. Liczebniki dziesiątek (30, 40, 50...) mają krótki, słaby dźwięk *-ty*.

### 2. Zapis dat i godzin:
* Godziny: \`quarter past seven\` = 7:15, \`half past eight\` = 8:30, \`twenty to nine\` = 8:40.
* Zapis cyframi jest jak najbardziej dopuszczalny i znacznie bezpieczniejszy (mniej szans na błąd ortograficzny!).`,
    worked_examples: [
      {
        title: 'Przykład 1: Wpisanie liczby z nagrania',
        problem: 'Tekst w notatce: „The workshop starts at [...] a.m.”\nNagranie: „Please remember that our morning session begins at a quarter to ten sharp.”',
        steps: [
          { num: 1, label: 'Przeliczenie czasu', text: '„A quarter to ten” oznacza za piętnaście dziesiąta, czyli 9:45.' },
          { num: 2, label: 'Zapis odpowiedzi', text: 'Możesz zapisać: „9:45” lub „nine forty-five”. Zapis cyfrowy jest w 100% poprawny.' }
        ],
        result: '9:45 / 9.45',
        matura_tip: 'Wpisanie „9:45” chroni Cię przed błędem w pisowni słów „quarter” czy „forty”!'
      }
    ],
    exam_trap: 'Błąd ortograficzny w liczebnikach, np. „fourty” zamiast „forty”!',
    matura_context: 'Zadanie 3 (zadanie otwarte ze słuchu) – 3–4 punkty.',
    taskIds: ['eng_lis_241', 'eng_lis_242', 'eng_lis_243', 'eng_lis_244', 'eng_lis_245']
  },
  {
    id: 'eng-lesson-8-2',
    topicId: 'eng-dzial-8',
    pillarId: 'pillar-listening',
    title: 'Prawda czy Fałsz ze słuchu – Pułapka kwantyfikatorów (always, all vs some, rarely)',
    subtitle: 'Jak jedno słowo ograniczające zmienia wartość logiczną całego zdania w teście P/F',
    estimatedMinutes: 5,
    concept_essence: `W zadaniach typu Prawda/Fałsz (True/False) kluczem nie są rzeczowniki, lecz **kwantyfikatory** i przysłówki częstotliwości:

### 1. Kwantyfikatory absolutne (Często fałszywe!):
Słowa takie jak: \`all\`, \`every\`, \`always\`, \`never\`, \`completely\`, \`impossible\` czynią zdanie kategorycznym.
* Jeśli w nagraniu padło: „Most students enjoyed the trip, though a few found it boring...”
* A w teście masz: „All students were pleased with the trip...” -> To jest **FAŁSZ (False)**!

### 2. Kwantyfikatory łagodne:
Słowa: \`some\`, \`most\`, \`often\`, \`sometimes\`, \`may\`, \`can\` są znacznie bardziej elastyczne i zgodne z realną wypowiedzią.`,
    worked_examples: [
      {
        title: 'Przykład 1: Weryfikacja kwantyfikatora',
        problem: 'Zdanie w teście: „The entrance to the museum is always free of charge.”\nAudio: „Tickets are normally twelve pounds, except on the first Sunday of each month when visitors can enter for free.”',
        steps: [
          { num: 1, label: 'Porównanie warunków', text: 'Nagranie mówi, że wstęp jest darmowy tylko w pierwszą niedzielę miesiąca, a normalnie kosztuje 12 funtów.' },
          { num: 2, label: 'Weryfikacja słowa always', text: 'Słowo „always” (zawsze) powoduje, że zdanie w teście jest niezgodne z prawdą.' }
        ],
        result: 'FALSE (Fałsz)',
        matura_tip: 'Bądź wyczulony na słowa „always” i „never” – w arkuszach CKE rzadko opisują one stan faktyczny.'
      }
    ],
    exam_trap: 'Uznanie zdania za prawdziwe tylko dlatego, że temat i nazwa instytucji zgadzają się z nagraniem, ignorując kwantyfikator „always”.',
    matura_context: 'Zadania ze słuchu i czytania – 1–2 punkty.',
    taskIds: ['eng_lis_246', 'eng_lis_247', 'eng_lis_248', 'eng_lis_249', 'eng_lis_250']
  },
  {
    id: 'eng-lesson-8-3',
    topicId: 'eng-dzial-8',
    pillarId: 'pillar-listening',
    title: 'Uzupełnianie streszczenia i notatki ze słuchu z poprawnością gramatyczną luki',
    subtitle: 'Dopasowanie formy wpisywanego wyrazu do otoczenia gramatycznego w notatce',
    estimatedMinutes: 5,
    concept_essence: `W zadaniu otwartym ze słuchu nie wystarczy tylko usłyszeć słowo – musisz upewnić się, że pasuje ono gramatycznie do luki w arkuszu!

### 1. Sprawdzenie gramatyczne przed i po luce:
* Jeśli przed luką stoi **a / an** -> wpisujesz rzeczownik policzalny w liczbie pojedynczej (np. *an umbrella*).
* Jeśli przed luką stoi liczba mnoga lub brak przedimka -> uważaj na końcówkę **-s** (np. *two tickets*).
* Jeśli po luce stoi czasownik w liczbie pojedynczej (np. *... was found*) -> wpisany rzeczownik musi być pojedynczy!

### 2. Limit wyrazów CKE:
* Polecenie precyzuje: „Wpisz od 1 do 3 wyrazów”. Wpisanie 4 wyrazów to automatyczne 0 punktów, nawet jeśli sens jest poprawny!`,
    worked_examples: [
      {
        title: 'Przykład 1: Dopasowanie liczby pojedynczej/mnogiej',
        problem: 'Notatka: „The hotel offers two heated outdoor [...] for all guests.”\nNagranie: „Guests can enjoy swimming in our two large heated outdoor pools.”',
        steps: [
          { num: 1, label: 'Lokalizacja brakującego słowa', text: 'Brakującym elementem jest rzeczownik po przymiotnikach „heated outdoor”.' },
          { num: 2, label: 'Weryfikacja liczby', text: 'Liczebnik „two” wymusza liczbę mnogą rzeczownika: pools.' }
        ],
        result: 'pools',
        matura_tip: 'Napisanie „pool” w liczbie pojedynczej po słowie „two” to błąd gramatyczny skutkujący 0 pkt!'
      }
    ],
    exam_trap: 'Wpisanie rzeczownika w liczbie pojedynczej tam, gdzie kontekst notatki wymaga liczby mnogiej.',
    matura_context: 'Zadanie 3 CKE – 1 punkt.',
    taskIds: ['eng_lis_251', 'eng_lis_252', 'eng_lis_253', 'eng_lis_254', 'eng_lis_255']
  },

  // =========================================================================
  // DZIAŁ 9: Czytanie: Dobieranie Nagłówków do Akapitów (Filar III)
  // =========================================================================
  {
    id: 'eng-lesson-9-1',
    topicId: 'eng-dzial-9',
    pillarId: 'pillar-reading',
    title: 'Identyfikacja Topic Sentence (zdania przewodniego akapitu) w czytaniu CKE',
    subtitle: 'Jak pierwsze i ostatnie zdanie akapitu zdradza właściwy nagłówek w Zadaniu 4',
    estimatedMinutes: 5,
    concept_essence: `W Zadaniu 4 dopasowujesz nagłówki do akapitów dłuższego tekstu. Angielskie akapity dziennikarskie i eseistyczne są zbudowane według ścisłej dyscypliny kompozycyjnej:

### 1. Struktura klasycznego akapitu:
* **Topic Sentence (Zdanie przewodnie):** W 85% przypadków jest to **pierwsze zdanie akapitu**. Formułuje ono główną myśl, której dotyczy cały akapit.
* **Supporting Sentences (Zdania rozwijające):** Podają przykłady, liczby, cytaty i dowody.
* **Concluding Sentence (Zdanie podsumowujące):** Ostatnie zdanie, które zbiera konkluzję lub stanowi pomost do kolejnego akapitu.

### 2. Strategia 3 kroków:
1. Przeczytaj pierwsze zdanie każdego akapitu i podsumuj je w głowie 2 słowami.
2. Przeczytaj listę nagłówków i odrzuć te, które w ogóle nie pasują tematycznie.
3. Przeczytaj ostatnie zdanie akapitu, aby upewnić się, że konkluzja nie zmieniła kierunku myśli.`,
    worked_examples: [
      {
        title: 'Przykład 1: Dobór nagłówka po zdaniu przewodnim',
        problem: 'Akapit: „Finding a quiet place to study in a crowded university dormitory is almost impossible. Students are constantly distracted by music, loud phone conversations in corridors, and roommates inviting friends over.”\nWybierz nagłówek:\nA. The advantages of living on campus.\nB. Major obstacles to focused revision.\nC. How to find cheap student accommodation.',
        steps: [
          { num: 1, label: 'Analiza Topic Sentence', text: 'Pierwsze zdanie mówi o niemożliwości znalezienia cichego miejsca do nauki.' },
          { num: 2, label: 'Dopasowanie parafrazy', text: 'Hałas i rozproszenia to „major obstacles to focused revision” (główne przeszkody w skupionej nauce).' }
        ],
        result: 'B',
        matura_tip: 'Nagłówek A jest sprzeczny z wymową, a nagłówek C w ogóle nie porusza kwestii kosztów.'
      }
    ],
    exam_trap: 'Wybór nagłówka na podstawie jednego pobocznego przykładu wymienionego w środku akapitu, ignorując ogólny sens topic sentence.',
    matura_context: 'Zadanie 4 CKE – 4 punkty.',
    taskIds: ['eng_read_001', 'eng_read_002', 'eng_read_003', 'eng_read_004', 'eng_read_005']
  },
  {
    id: 'eng-lesson-9-2',
    topicId: 'eng-dzial-9',
    pillarId: 'pillar-reading',
    title: 'Nagłówek podsumowujący vs zbyt wąski detal – eliminacja zmyłek w Zadaniu 4',
    subtitle: 'Odróżnianie nagłówka obejmującego cały akapit od opcji opisującej tylko jeden fakt',
    estimatedMinutes: 5,
    concept_essence: `Typowy dystraktor CKE w zadaniu na dobieranie nagłówków jest **prawdziwy pod kątem faktów**, ale **zbyt wąski**, by stanowić nagłówek!

### 1. Test „Parasola” (Umbrella Test):
Dobry nagłówek działa jak parasol – musi przykrywać KAŻDE zdanie w danym akapicie.
* Jeśli nagłówek brzmi: „The cost of the ticket”, a w akapicie o cenie jest tylko pół zdania, podczas gdy reszta mówi o godzinach otwarcia, dojeździe i przewodnikach – ten nagłówek jest ZBYT WĄSKI!
* Właściwym nagłówkiem parasolowym byłoby: „Practical visitor information”.

### 2. Dystraktor nadinterpretacji:
Drugim typem zmyłki jest nagłówek, który idzie o krok za daleko niż sam tekst (nadinterpretacja wniosków autora). Trzymaj się wyłącznie tego, co napisano wprost.`,
    worked_examples: [
      {
        title: 'Przykład 1: Zastosowanie testu parasola',
        problem: 'Akapit opisuje: 1) nowe ścieżki rowerowe w mieście, 2) rozbudowę miejskiego metra, 3) dopłaty do biletów tramwajowych.\nNagłówek A: The rising popularity of cycling in the city.\nNagłówek B: Comprehensive improvements in green public transport.',
        steps: [
          { num: 1, label: 'Weryfikacja opcji A', text: 'Opcja A dotyczy tylko rowerów – ignoruje metro i tramwaje (jest za wąska).' },
          { num: 2, label: 'Weryfikacja opcji B', text: 'Opcja B („green public transport”) obejmuje rowery, metro i tramwaje pod jednym wspólnym mianownikiem.' }
        ],
        result: 'B',
        matura_tip: 'Nagłówek nadrzędny (parasolowy) zawsze wygrywa ze zbyt wąskim detalem!'
      }
    ],
    exam_trap: 'Wybieranie nagłówka ze słowem „cycling”, bo było w pierwszym zdaniu, pomimo że reszta tekstu omawiała inne środki transportu.',
    matura_context: 'Zadanie 4 CKE – 1–2 punkty.',
    taskIds: ['eng_read_006', 'eng_read_007', 'eng_read_008', 'eng_read_009', 'eng_read_010']
  },
  {
    id: 'eng-lesson-9-3',
    topicId: 'eng-dzial-9',
    pillarId: 'pillar-reading',
    title: 'Szybkie skanowanie (Skimming) i parafrazy słownikowe nagłówków',
    subtitle: 'Oszczędność czasu na maturze: jak przeczytać artykuł w 90 sekund i wyłapać synonimy',
    estimatedMinutes: 5,
    concept_essence: `Czas na maturze jest ograniczony (120 minut na cały arkusz). Nie możesz czytać każdego artykułu słowo w słowo ze słownikiem w ręku!

### 1. Skimming vs Scanning:
* **Skimming (przelatywanie wzrokiem):** Czytanie selektywne pod kątem ogólnego sensu (tytuł, nagłówki, pierwsze zdania, pogrubienia).
* **Scanning (namierzanie radarem):** Szukanie konkretnego faktu: nazwiska, roku, ceny, nazwy własnej pisanej wielką literą.

### 2. Mapa synonimów CKE:
Nagłówki maturalne to niemal zawsze leksykalne parafrazy zwrotów z tekstu:
* W tekście: *affordable, inexpensive* -> W nagłówku: *Low costs / Budget-friendly*.
* W tekście: *boost confidence, believe in yourself* -> W nagłówku: *Psychological benefits*.
* W tekście: *polluted air, global warming, carbon emissions* -> W nagłówku: *Environmental impact*.`,
    worked_examples: [
      {
        title: 'Przykład 1: Namierzenie synonimu',
        problem: 'W tekście: „The course is completely free of charge and requires no prior qualifications.”\nNagłówek w arkuszu:\nA. High entry requirements for beginners.\nB. An accessible learning opportunity for everyone.',
        steps: [
          { num: 1, label: 'Lokalizacja cech kursu', text: 'Darmowy („free of charge”) i brak wymogów („no prior qualifications”).' },
          { num: 2, label: 'Dopasowanie synonimu', text: '„Accessible” (dostępny) dla każdego idealnie parafrazuje brak barier finansowych i formalnych.' }
        ],
        result: 'B',
        matura_tip: '„Accessible” i „available” to ulubione słowa klucza CKE dla oznaczenia dostępności.'
      }
    ],
    exam_trap: 'Spędzanie 15 minut na analizowaniu jednego trudnego słówka w tekście, które nie ma żadnego wpływu na poprawność wyboru nagłówka.',
    matura_context: 'Zadania 4 i 5 – optymalizacja czasu egzaminu.',
    taskIds: ['eng_read_011', 'eng_read_012', 'eng_read_013', 'eng_read_014', 'eng_read_015']
  },

  // =========================================================================
  // DZIAŁ 10: Czytanie: Uzupełnianie Luk Zadaniami Gapped Text (Filar III)
  // =========================================================================
  {
    id: 'eng-lesson-10-1',
    topicId: 'eng-dzial-10',
    pillarId: 'pillar-reading',
    title: 'Zaimki anaforiczne (he, they, this, such) jako drogowskazy w luce (Zadanie 5)',
    subtitle: 'Jak zaimki wskazujące i osobowe zdradzają brakujące zdanie w luce tekstu',
    estimatedMinutes: 5,
    concept_essence: `W Zadaniu 5 z tekstu wycięto 3 lub 4 całe zdania. Aby wstawić właściwe zdanie w lukę, musisz zbadać **spójność referencyjną (cohesion)**.

### 1. Zaimki jako klej łączący zdania:
Jeśli w wyciętym zdaniu występuje zaimek, w zdaniu poprzedzającym lukę MUSI znajdować się rzeczownik, do którego ten zaimek się odnosi:
* Jeśli wycięte zdanie zaczyna się od: **„They decided to investigate...”** -> przed luką MUSI być mowa o grupie ludzi w liczbie mnogiej (np. *scientists, detectives, students*).
* Jeśli wycięte zdanie brzmi: **„This unexpected discovery changed everything.”** -> przed luką musi być opisane konkretne odkrycie!
* Słowa takie jak **„such measures”**, **„these problems”** wymagają wcześniejszego wymienienia tych środków lub problemów.`,
    worked_examples: [
      {
        title: 'Przykład 1: Rozpoznanie odniesienia zaimka',
        problem: 'Przed luką: „Dr Harris spent twelve years studying rare tree frogs in the Amazon rainforest. [LUKA] After publishing his findings, he received an international award.”\nBrakujące zdania do wyboru:\nA. These birds migrate south every autumn.\nB. His dedicated research provided groundbreaking data on climate change.\nC. They refused to sponsor the project.',
        steps: [
          { num: 1, label: 'Identyfikacja podmiotu przed luką', text: 'Dr Harris (mężczyzna, naukowiec) prowadził badania nad żabami.' },
          { num: 2, label: 'Weryfikacja zaimków', text: 'Opcja A mówi o ptakach (brak w tekście). Opcja C używa „They” (brak grupy osób). Opcja B odnosi się do niego: „His dedicated research”.' }
        ],
        result: 'B',
        matura_tip: 'Zaimek dzierżawczy „His” i słowo „research” idealnie spajają zdanie o Dr. Harrisie z nagrodą za publikację wyników.'
      }
    ],
    exam_trap: 'Wstawienie zdania ze słowem „They”, gdy w zdaniu przed luką była mowa tylko o jednej osobie w liczbie pojedynczej.',
    matura_context: 'Zadanie 5 CKE – 3–4 punkty.',
    taskIds: ['eng_read_131', 'eng_read_132', 'eng_read_133', 'eng_read_134', 'eng_read_135']
  },
  {
    id: 'eng-lesson-10-2',
    topicId: 'eng-dzial-10',
    pillarId: 'pillar-reading',
    title: 'Łączniki logiczne i związki przyczynowo-skutkowe w spójności tekstu',
    subtitle: 'Analiza spójników However, As a result, In addition na styku luki',
    estimatedMinutes: 5,
    concept_essence: `Zdanie wstawiane w lukę musi pasować do tekstu pod kątem logiki następstwa faktów:

### 1. Kategorie łączników logicznych w brakujących zdaniach:
* **Kontrast (Zwrot akcji):** \`However\`, \`On the contrary\`, \`Nevertheless\`, \`In spite of this\`.
  * Wymaga, by treść w luce była przeciwieństwem lub niespodzianką w stosunku do zdania przed luką.
* **Skutek / Konsekwencja:** \`As a result\`, \`Consequently\`, \`Therefore\`, \`For this reason\`.
  * Treść w luce musi być logicznym następstwem zdarzenia opisanego wcześniej.
* **Dodanie informacji:** \`Furthermore\`, \`What is more\`, \`In addition\`.
  * Rozwija ten sam wątek o kolejny pozytywny lub negatywny element.`,
    worked_examples: [
      {
        title: 'Przykład 1: Dobór zdania z łącznikiem skutku',
        problem: 'Przed luką: „The heavy blizzard knocked down power lines across the entire county. [LUKA] Local schools were forced to cancel all classes for three days.”\nWybierz zdanie:\nA. Consequently, thousands of residents were left without heating in sub-zero temperatures.\nB. However, the sunny weather attracted tourists to the ski resort.',
        steps: [
          { num: 1, label: 'Ocena przyczyny', text: 'Śnieżyca zerwała linie energetyczne (brak prądu i ogrzewania).' },
          { num: 2, label: 'Wybór łącznika', text: 'Skutkiem zerwania linii jest brak prądu, wprowadzony przez „Consequently”.' }
        ],
        result: 'A',
        matura_tip: '„Consequently” oraz „As a result” wskazują bezpośredni skutek katastrofy.'
      }
    ],
    exam_trap: 'Wstawienie zdania z łącznikiem kontrastu „However”, gdy drugie zdanie tak naprawdę potwierdza i kontynuuje pierwszą myśl.',
    matura_context: 'Zadanie 5 CKE – 1–2 punkty.',
    taskIds: ['eng_read_136', 'eng_read_137', 'eng_read_138', 'eng_read_139', 'eng_read_140']
  },
  {
    id: 'eng-lesson-10-3',
    topicId: 'eng-dzial-10',
    pillarId: 'pillar-reading',
    title: 'Analiza kontekstu obustronnego: zdanie przed luką i zdanie po luce',
    subtitle: 'Najważniejszy test weryfikacyjny: czy wstawione zdanie płynnie przechodzi w kolejne',
    estimatedMinutes: 5,
    concept_essence: `Najczęstszy błąd maturzystów w Zadaniu 5 polega na tym, że czytają tylko zdanie PRZED luką i od razu wstawiają odpowiedź, **nie sprawdzając zdania PO luce**!

### 1. Reguła podwójnego mostu (The Double-Bridge Rule):
Brakujące zdanie to most łączący dwa brzegi rzeki:
* **Lewy brzeg:** Treść i gramatyka zdania przed luką.
* **Prawy brzeg:** Treść, czasy i zaimki zdania PO LUCE.
* Jeśli zdanie pasuje do lewego brzegu, ale z prawego wynika sprzeczność – **ta odpowiedź jest błędna**!

### 2. Algorytm weryfikacji końcowej:
Po wstawieniu wszystkich zdań przeczytaj cały akapit ciągiem. Jeśli w którymkolwiek momencie odczuwasz zgrzyt lub nielogiczny skok myślowy, zamień kandydatów.`,
    worked_examples: [
      {
        title: 'Przykład 1: Weryfikacja zdania po luce',
        problem: 'Tekst: „The young programmer submitted her mobile app to the contest. [LUKA] To her amazement, the judges unanimously declared it the most innovative app of the year.”\nWybierz zdanie:\nA. She didn\'t think it had any chance of winning against professional developers.\nB. The app immediately won top prizes in international competitions.',
        steps: [
          { num: 1, label: 'Sprawdzenie prawego brzegu', text: 'Zdanie po luce mówi: „To her amazement...” (Ku jej zdumieniu). Zdumienie ma sens tylko wtedy, gdy wcześniej NIE spodziewała się wygranej!' },
          { num: 2, label: 'Eliminacja opcji B', text: 'Gdybyśmy wstawili opcję B, zdanie po luce o jej zdumieniu z werdyktu byłoby nielogicznym powtórzeniem.' }
        ],
        result: 'A',
        matura_tip: '„To her amazement” / „Surprisingly” to klucze kontekstowe, które wymagają wcześniejszego sceptycyzmu!'
      }
    ],
    exam_trap: 'Ignorowanie zdania następującego bezpośrednio po luce. Zawsze czytaj pełne otoczenie luki!',
    matura_context: 'Zadanie 5 CKE – decydujący krok do 100% poprawności.',
    taskIds: ['eng_read_141', 'eng_read_142', 'eng_read_143', 'eng_read_144', 'eng_read_145']
  },

  // =========================================================================
  // DZIAŁ 11: Czytanie: Artykuły Prasowe & Mediacja Językowa (Filar III)
  // =========================================================================
  {
    id: 'eng-lesson-11-1',
    topicId: 'eng-dzial-11',
    pillarId: 'pillar-reading',
    title: 'Mediacja językowa: Przenoszenie informacji z artykułu do e-maila / notatki (Zadanie 7)',
    subtitle: 'Zadanie otwarte z czytania: parafraza danych z tekstu angielskiego do polskiej lub angielskiej luki',
    estimatedMinutes: 5,
    concept_essence: `Mediacja językowa (Language Mediation) to jeden z najważniejszych nowych formatów w Formule 2023. Czytasz angielski artykuł, a następnie uzupełniasz luki w e-mailu lub notatce.

### 1. Zasady punktowania mediacji CKE:
* Odpowiedź musi być **precyzyjna merytorycznie** (zgodna z faktami z artykułu).
* Odpowiedź musi być **poprawna gramatycznie i ortograficznie** w języku, w którym pisana jest notatka.
* Zwykle obowiązuje rygorystyczny limit słów (np. *od 1 do 3 wyrazów*).

### 2. Krok po kroku:
1. Zlokalizuj w notatce słowa kluczowe otaczające lukę.
2. Zeskanuj artykuł, aby znaleźć ten sam fragment (uwaga na synonimy!).
3. Przepisz dokładnie tę informację, dopasowując formę gramatyczną do zdania w notatce.`,
    worked_examples: [
      {
        title: 'Przykład 1: Uzupełnienie luki mediacyjnej',
        problem: 'Artykuł: „The exhibition at the City Gallery will be open to visitors until November 15th, after which the paintings will travel to Paris.”\nNotatka do uzupełnienia: „Pamiętaj, że wystawę obrazów w galerii można obejrzeć tylko do [...], bo potem przenoszą ją do Francji.”',
        steps: [
          { num: 1, label: 'Lokalizacja daty w tekście', text: 'W tekście padła data: „until November 15th”.' },
          { num: 2, label: 'Wpisanie w języku notatki', text: 'Notatka jest po polsku, więc wpisujemy: „15 listopada”.' }
        ],
        result: '15 listopada / 15.11',
        matura_tip: 'Zwróć uwagę na język luki! Jeśli notatka jest po polsku, wpisujesz po polsku. Jeśli po angielsku – po angielsku.'
      }
    ],
    exam_trap: 'Wpisanie odpowiedzi w złym języku (np. wpisanie angielskiego „November 15th” w polskiej notatce mediacyjnej).',
    matura_context: 'Zadanie 7 CKE – 3–4 punkty.',
    taskIds: ['eng_read_251', 'eng_read_252', 'eng_read_253', 'eng_read_254', 'eng_read_255']
  },
  {
    id: 'eng-lesson-11-2',
    topicId: 'eng-dzial-11',
    pillarId: 'pillar-reading',
    title: 'Fakty vs Opinie autora – Wykrywanie tonu, ironii i intencji w artykule prasowym',
    subtitle: 'Jak odróżnić twarde dane statystyczne od subiektywnego komentarza publicysty',
    estimatedMinutes: 5,
    concept_essence: `W Zadaniu 6 (wybór wielokrotny do dłuższego tekstu) ostatnie pytanie często sprawdza intencję całego artykułu: „What is the author's main purpose?”, „The author's tone in the final paragraph can be described as...”.

### 1. Identyfikacja tonu autora:
* **Critical (krytyczny):** autor punktuje wady, błędy, zaniedbania (*flawed, failed to, unacceptable*).
* **Enthusiastic / Optimistic (entuzjastyczny):** pochwały, nadzieja (*breakthrough, impressive, bright future*).
* **Neutral / Objective (neutralny / informacyjny):** czyste fakty, dane liczbowe, brak emocjonalnych przymiotników.
* **Humorous / Ironic (ironiczny):** lekki ton, przejaskrawienia, żarty sytuacyjne.

### 2. Pytanie o główny cel tekstu (Author's Purpose):
Zawsze czytaj tytuł artykułu oraz ostatni akapit – tam publicysta stawia ostateczną tezę!`,
    worked_examples: [
      {
        title: 'Przykład 1: Ocena intencji publicysty',
        problem: 'Ostatni akapit: „While city officials boast about their green initiatives, the streets remain littered and recycling rates have dropped by 10%. Until real funds are allocated, these eco-campaigns are nothing more than empty slogans.”\nJaki jest stosunek autora do działań władz?\nA. Enthusiastic about upcoming projects.  |  B. Sceptical of their true effectiveness.  |  C. Indifferent to environmental issues.',
        steps: [
          { num: 1, label: 'Wychwycenie słownictwa nacechowanego', text: 'Zwroty: „empty slogans” (puste hasła), spadek recyklingu, krytyka przechwałek urzędników.' },
          { num: 2, label: 'Określenie postawy', text: 'Autor powątpiewa w skuteczność i nazywa je pustymi hasłami – jest sceptyczny (sceptical).' }
        ],
        result: 'B',
        matura_tip: '„Empty slogans” to jednoznaczny sygnał sceptycyzmu i krytyki.'
      }
    ],
    exam_trap: 'Wybór odpowiedzi pochwalnej na podstawie wzmianki o „green initiatives”, ignorując słowa „empty slogans” na końcu zdania.',
    matura_context: 'Zadanie 6 CKE – 1 punkt.',
    taskIds: ['eng_read_256', 'eng_read_257', 'eng_read_258', 'eng_read_259', 'eng_read_260']
  },
  {
    id: 'eng-lesson-11-3',
    topicId: 'eng-dzial-11',
    pillarId: 'pillar-reading',
    title: 'Teksty wieloźródłowe: Wyszukiwanie informacji w 3 różnych ofertach i recenzjach',
    subtitle: 'Porównywanie warunków, cen, lokalizacji i ograniczeń wiekowych w krótkich tekstach użytkowych',
    estimatedMinutes: 5,
    concept_essence: `Zadania oparte na 3 lub 4 krótkich tekstach (A, B, C, D) sprawdzają umiejętność szybkiej nawigacji po ogłoszeniach, ulotkach i forach internetowych:

### 1. Anatomia zadania wieloźródłowego:
W poleceniu masz serię pytań (np. *Which place offers a discount for students?*, *In which text does the author complain about bad service?*), a Twoim zadaniem jest przypisanie litery tekstu A, B lub C.

### 2. Taktyka „Skanowanie od pytania”:
1. Zamiast czytać wszystkie teksty po kolei, zacznij od pytania nr 1.
2. Zidentyfikuj słowo-klucz w pytaniu (np. *discount for students*).
3. Przeskanuj teksty pod kątem synonimów rabatu (*special rate, reduced price, student card*).
4. Zaznacz właściwy tekst i przejdź do kolejnego pytania.`,
    worked_examples: [
      {
        title: 'Przykład 1: Wyszukanie kryterium wiekowego',
        problem: 'Pytanie: „Which summer camp is suitable only for teenagers aged 15 and above?”\nTekst A: „Open to children of all age groups from 7 to 14.”\nTekst B: „Participants must be between 10 and 16 years old.”\nTekst C: „Applicants must have completed primary school and be at least 15 on the start date.”',
        steps: [
          { num: 1, label: 'Lokalizacja kryterium wieku', text: 'Szukamy zwrotu „aged 15 and above”.' },
          { num: 2, label: 'Dopasowanie tekstu', text: 'Tekst C wyraźnie zaznacza: „at least 15 on the start date”.' }
        ],
        result: 'Tekst C',
        matura_tip: '„At least” oznacza „co najmniej”, co odpowiada sformułowaniu „aged 15 and above”.'
      }
    ],
    exam_trap: 'Mylenie przedziałów wiekowych (np. 15–18 vs poniżej 15 roku życia).',
    matura_context: 'Zadanie 6 lub 7 CKE – 3–4 punkty.',
    taskIds: ['eng_read_261', 'eng_read_262', 'eng_read_263', 'eng_read_264', 'eng_read_265']
  },

  // =========================================================================
  // DZIAŁ 12: Wypowiedź Pisemna: Warsztat 4 Kropek Polecenia (Filar IV)
  // =========================================================================
  {
    id: 'eng-lesson-12-1',
    topicId: 'eng-dzial-12',
    pillarId: 'pillar-writing',
    title: 'Zasada 2-elementowego rozwinięcia: Różnica między wzmianką a rozwinięciem',
    subtitle: 'Jak zdobyć komplet 5 punktów za treść w Zadaniu 12 według oficjalnej tabeli CKE',
    estimatedMinutes: 5,
    concept_essence: `Wypowiedź pisemna (Zadanie 12) jest warta aż **12 punktów** (20% całego egzaminu!). Kryterium treści (Content) to aż 5 punktów.

### 1. Oficjalne kryteria egzaminatora CKE:
Dla każdego z 4 podpunktów polecenia egzaminator decyduje, czy podpunkt został:
* **Pominięty (0 pkt):** brak jakiejkolwiek informacji na ten temat.
* **Jedynie odniesiony / wspomniany (Wzmianka):** jedno krótkie, ogólne zdanie bez szczegółów (np. *„I bought a bike.”*).
* **Rozwinięty (Rozwinięcie):** uczeń podał szczegół, powód, emocję, opis lub konsekwencję (np. *„I bought a vintage red bicycle because I wanted to commute to school faster.”*).

### 2. Tabela punktacji za treść:
* 4 podpunkty rozwinięte = **5 punktów**.
* 3 rozwinięte + 1 odniesiony = **4 punkty**.
* 2 rozwinięte + 2 odniesione = **3 punkty**.
* Tylko odniesione (bez rozwinięć) = maksymalnie **2 punkty**!

### 3. Złota Zasada Podwójnego Zdania:
Do KAŻDEJ z 4 kropek polecenia napisz **minimum dwa rozbudowane zdania**:
1. Zdanie 1: Odniesienie wprost do kropki (fakt).
2. Zdanie 2: Rozwinięcie (dlaczego? jak to wyglądało? jakie były emocje? co stało się potem?).`,
    worked_examples: [
      {
        title: 'Przykład 1: Przekształcenie wzmianki w pełne rozwinięcie',
        problem: 'Kropka polecenia: „Wyjaśnij, dlaczego zdecydowałeś się wziąć udział w biegu charytatywnym.”',
        steps: [
          { num: 1, label: 'Wersja słaba (Tylko wzmianka - ryzyko straty punktu)', text: '„I took part in a charity run last Sunday.” (Brak wyjaśnienia DLACZEGO – niepełna realizacja kropki!).' },
          { num: 2, label: 'Wersja wzorcowa (Pełne rozwinięcie na max punktów)', text: '„I decided to take part in the charity run because our local animal shelter urgently needed money for medical supplies. What is more, I wanted to test my physical stamina before the upcoming marathon.”' },
          { num: 3, label: 'Dlaczego to działa', text: 'Podano konkretny cel (schronisko dla zwierząt), powód osobisty (test wytrzymałości) oraz łącznik „What is more”.' }
        ],
        result: 'Pełne rozwinięcie kwalifikujące do 5/5 pkt',
        matura_tip: 'Nigdy nie zostawiaj kropki z jednym 4-wyrazowym zdaniem!'
      }
    ],
    exam_trap: 'Odpowiedź tylko na pierwszą część kropki, gdy polecenie zawiera dwa elementy (np. „Opisz swoje wrażenia I wyjaśnij, jak zareagowali widzowie”). Jeśli pominiesz reakcję widzów, kropka jest tylko wspomniana!',
    matura_context: 'Kryterium Treści Zadania 12 CKE (0–5 pkt).',
    taskIds: ['eng_wri_001', 'eng_wri_002', 'eng_wri_003', 'eng_wri_004', 'eng_wri_005']
  },
  {
    id: 'eng-lesson-12-2',
    topicId: 'eng-dzial-12',
    pillarId: 'pillar-writing',
    title: 'Kryteria CKE dla treści (0–5 pkt): Jak nie stracić punktu za pominięcie podpunktu',
    subtitle: 'Format 4 akapitów i fizyczne odhaczanie kropek na arkuszu egzaminacyjnym',
    estimatedMinutes: 5,
    concept_essence: `Najbardziej bolesnym błędem na maturze jest napisanie pięknej pracy językowej, która dostaje obniżoną notę, bo uczeń zapomniał o czwartej kropce polecenia!

### 1. Anatomia idealnego układu akapitów:
* **Wstęp:** Powitanie + powód napisania (ok. 15–20 słów).
* **Akapit 1:** Rozwinięcie KROPKI 1 (ok. 25 słów).
* **Akapit 2:** Rozwinięcie KROPKI 2 (ok. 25 słów).
* **Akapit 3:** Rozwinięcie KROPKI 3 (ok. 25 słów).
* **Akapit 4:** Rozwinięcie KROPKI 4 (ok. 25 słów).
* **Zakończenie:** Wezwanie do odpowiedzi + podpis XYZ (ok. 15 słów).
* **Łącznie:** ok. 100–120 słów (idealnie w bezpiecznym przedziale 80–130 słów).

### 2. Ołówek w dłoni – technika egzaminacyjna:
Przed napisaniem każdego akapitu przeczytaj na głos w myślach treść kropki. Po napisaniu akapitu weź ołówek i postaw **wielki ptaszek (V)** przy zrealizowanej kropce w arkuszu.`,
    worked_examples: [
      {
        title: 'Przykład 1: Planowanie 4 akapitów',
        problem: 'Polecenie: 1) Opisz miejsce, 2) Przedstaw napotkany problem, 3) Napisz, kto ci pomógł, 4) Zaproponuj spotkanie.',
        steps: [
          { num: 1, label: 'Podział na akapity', text: 'Tworzymy 4 odrębne akapity treści, każdy poświęcony dokładnie jednej kropce.' },
          { num: 2, label: 'Kontrola realizacji', text: 'Każdy akapit zawiera zdanie wprowadzające kropkę oraz minimum jedno zdanie rozwijające.' }
        ],
        result: 'Czysta, przejrzysta struktura czytelna dla egzaminatora w 10 sekund',
        matura_tip: 'Egzaminator CKE ma tylko kilka minut na ocenę Twojej pracy. Przejrzyste akapity ułatwiają mu przyznanie maksymalnej noty.'
      }
    ],
    exam_trap: 'Zlewanie całej pracy w jeden wielki, niepodzielony blok tekstu. Za brak akapitów traci się punkty w kryterium Spójności i Logiki!',
    matura_context: 'Kryterium Treści i Spójności – 7 punktów łącznie.',
    taskIds: ['eng_wri_006', 'eng_wri_007', 'eng_wri_008', 'eng_wri_009', 'eng_wri_010']
  },
  {
    id: 'eng-lesson-12-3',
    topicId: 'eng-dzial-12',
    pillarId: 'pillar-writing',
    title: 'Płynne łączenie 4 wątków w jedną całość bez sztucznego wyliczania',
    subtitle: 'Jak uniknąć mechanicznego pisania „Po pierwsze... Po drugie...” i stworzyć naturalną historię',
    estimatedMinutes: 5,
    concept_essence: `Twoja praca nie może wyglądać jak lista odpowiedzi na ankietę! Egzaminator CKE ocenia płynność narracji:

### 1. Sztuczne vs Naturalne przejścia:
* **Sztuczne (brzmi jak robot):** „Point one is about my trip. Point two is about my car accident.”
* **Naturalne (brzmi jak autentyczny list):** „You won't believe what happened when I arrived at the campsite. While I was pitching my tent, a sudden storm broke out...”

### 2. Spójniki mostkowe (Transition bridges):
* \`To make matters worse, ...\` (Na domiar złego, ...)
* \`Fortunately, just when I was about to give up, ...\` (Na szczęście, właśnie gdy miałem się poddać, ...)
* \`Anyway, the best part of the whole experience was...\` (W każdym razie, najlepszą częścią całego doświadczenia było...)`,
    worked_examples: [
      {
        title: 'Przykład 1: Mostek narracyjny między kropką 2 a 3',
        problem: 'Kropka 2: Problem z transportem. Kropka 3: Pomoc od nieznajomego.',
        steps: [
          { num: 1, label: 'Zastosowanie mostka', text: '„I was stranded at the bus stop in the pouring rain with no buses running. Luckily, an elderly gentleman noticed my distress and kindly offered me a ride to the station.”' }
        ],
        result: 'Płynne przejście z dramatu sytuacji do rozwiązania za pomocą słowa „Luckily”',
        matura_tip: 'Słowa takie jak „Luckily”, „Unluckily”, „Unexpectedly” natychmiast ożywiają styl.'
      }
    ],
    exam_trap: 'Stosowanie zbyt formalnych łączników (np. „Furthermore”, „In conclusion”) w luźnym e-mailu do kolegi – to błąd rejestru stylu.',
    matura_context: 'Kryterium Spójności i Logiki (0–2 pkt).',
    taskIds: ['eng_wri_011', 'eng_wri_012', 'eng_wri_013', 'eng_wri_014', 'eng_wri_015']
  },

  // =========================================================================
  // DZIAŁ 13: Wypowiedź Pisemna: Poprawność Językowa & Eliminacja Błędów L1
  // =========================================================================
  {
    id: 'eng-lesson-13-1',
    topicId: 'eng-dzial-13',
    pillarId: 'pillar-writing',
    title: 'Eliminacja kalk z języka polskiego (Ponglish: depend of, congratulate for, explain me)',
    subtitle: 'Najpopularniejsze błędy leksykalno-przyimkowe polskich maturzystów w pisaniu',
    estimatedMinutes: 5,
    concept_essence: `Kryterium poprawności językowej (0–2 pkt) ocenia liczbę i ciężar popełnionych błędów. Polscy uczniowie nagminnie tłumaczą dosłownie polskie przyimki:

### 1. Złota dziesiątka błędnych kalk i ich poprawnych wersji:
* ❌ *It depends of the weather* -> ✔️ **It depends on the weather** (zależeć od = depend on).
* ❌ *I congratulate you your success* -> ✔️ **Congratulations on your success** (gratulować z okazji = congratulate on).
* ❌ *Explain me this rule* -> ✔️ **Explain this rule to me** (wyjaśnić komuś = explain to somebody).
* ❌ *I am married with a doctor* -> ✔️ **I am married to a doctor** (być w związku małżeńskim z = married to).
* ❌ *She arrived to London* -> ✔️ **She arrived in London** (przybyć do miasta = arrive in / na dworzec = arrive at).
* ❌ *I listen music* -> ✔️ **I listen to music** (słuchać czegoś = listen to).
* ❌ *I agree with you in 100%* -> ✔️ **I agree with you 100%** (bez przyimka in!).`,
    worked_examples: [
      {
        title: 'Przykład 1: Korekta błędnego przyimka',
        problem: 'Zdanie ucznia: „Everything depends of our teacher’s decision.”',
        steps: [
          { num: 1, label: 'Lokalizacja błędu interferencyjnego', text: 'Czasownik depend łączy się wyłącznie z przyimkiem on.' },
          { num: 2, label: 'Wzorcowa poprawka', text: '„Everything depends on our teacher\'s decision.”' }
        ],
        result: 'depends on',
        matura_tip: 'Zapamiętaj: „depend ON”, nigdy „depend of”!'
      }
    ],
    exam_trap: 'Pomijanie przyimka „to” po czasowniku listen („I listened the lecture” to rażący błąd).',
    matura_context: 'Kryterium Poprawności Środków Językowych (0–2 pkt).',
    taskIds: ['eng_wri_081', 'eng_wri_082', 'eng_wri_083', 'eng_wri_084', 'eng_wri_085']
  },
  {
    id: 'eng-lesson-13-2',
    topicId: 'eng-dzial-13',
    pillarId: 'pillar-writing',
    title: 'Szyk zdania angielskiego (S-V-O) i unikanie podwójnych przeczeń',
    subtitle: 'Dlaczego w angielskim nie można przestawiać słów tak dowolnie jak w języku polskim',
    estimatedMinutes: 5,
    concept_essence: `Polski szyk zdania jest bardzo swobodny, bo końcówki fleksyjne pokazują, kto co robi. W języku angielskim szyk jest **sztywny i żelazny**:

### 1. Złoty szyk zdania twierdzącego:
\`Podmiot (Subject) -> Orzeczenie (Verb) -> Dopełnienie (Object) -> Miejsce (Place) -> Czas (Time)\`
* ❌ *Yesterday bought I a new computer.*
* ✔️ **I bought a new computer yesterday.** (Określnik czasu stoi na samym końcu lub na początku).

### 2. Zakaz podwójnego przeczenia (Double Negative):
W języku polskim mówimy: „Nigdy nikomu nic nie powiedziałem” (4 przeczenia!).
W języku angielskim w jednym zdaniu może wystąpić **TYLKO JEDNO PRZECZENIE**:
* ❌ *I didn't see nobody nowhere.*
* ✔️ **I didn't see anybody anywhere.**
* ✔️ **I saw nobody.** (Gdy używasz nobody, czasownik musi być twierdzący: saw, a nie didn't see).`,
    worked_examples: [
      {
        title: 'Przykład 1: Eliminacja podwójnego przeczenia',
        problem: 'Zdanie ucznia: „She didn\'t know nothing about the surprise party.”',
        steps: [
          { num: 1, label: 'Wykrycie dwóch zaprzeczeń', text: 'Mamy przeczenie w operatorze („didn\'t”) oraz zaprzeczone słowo „nothing”.' },
          { num: 2, label: 'Zastosowanie reguły any-', text: 'Po przeczeniu słowa zaprzeczone zamieniamy na formy z any-: anything.' }
        ],
        result: 'She didn\'t know anything about the surprise party.',
        matura_tip: 'Nigdy nie łącz „didn\'t” z „nothing”, „nobody”, „never”!'
      }
    ],
    exam_trap: 'Kalka polskiego szyku: stawianie przysłówka czasu między czasownikiem a dopełnieniem, np. „I like very much this film” zamiast „I like this film very much”.',
    matura_context: 'Kryterium Poprawności (0–2 pkt).',
    taskIds: ['eng_wri_086', 'eng_wri_087', 'eng_wri_088', 'eng_wri_089', 'eng_wri_090']
  },
  {
    id: 'eng-lesson-13-3',
    topicId: 'eng-dzial-13',
    pillarId: 'pillar-writing',
    title: 'Poprawność ortograficzna i interpunkcyjna w słowach kluczowych matury',
    subtitle: 'Podwójne litery (accommodation, embarrassed) oraz zasady apostrofów w pisaniu',
    estimatedMinutes: 5,
    concept_essence: `Błędy ortograficzne w wyrazach popularnych obniżają ocenę za poprawność. Oto słowa, w których maturzyści mylą się najczęściej:

### 1. Zestawienie wyrazów podwyższonego ryzyka:
* \`accommodation\` (podwójne **cc** i podwójne **mm**!).
* \`embarrassed\` (podwójne **rr** i podwójne **ss**).
* \`definitely\` (przez **i**, nigdy przez a: *definitly* czy *definately*).
* \`necessary\` (jedno **c**, podwójne **ss** – mnemotechnika: *one Coffee, two Sugars*).
* \`until\` (jedno **l** na końcu! Podwójne ll ma słowo *till*).
* \`which\` (z literą **h**, a nie *witch* – czarownica).

### 2. Apostrofy i formy skrócone:
W nieformalnym e-mailu formy skrócone (*I'm, don't, can't, wouldn't*) są jak najbardziej mile widziane, ale pamiętaj o precyzyjnym wstawieniu apostrofu:
* \`it's\` = it is (to jest), \`its\` = jego/jej (zaimek dzierżawczy).`,
    worked_examples: [
      {
        title: 'Przykład 1: Bezbłędna pisownia trudnego słowa',
        problem: 'Napisz zdanie o zakwaterowaniu na obozie.',
        steps: [
          { num: 1, label: 'Sprawdzenie trudnych liter', text: 'Słowo accommodation ma dwie litery c i dwie litery m.' },
          { num: 2, label: 'Zastosowanie w zdaniu', text: '„The accommodation provided by the organizers was exceptionally comfortable.”' }
        ],
        result: 'accommodation (2x c, 2x m)',
        matura_tip: 'Przed oddaniem pracy poświęć 2 minuty na przeczytanie wyrazów z podwójnymi literami.'
      }
    ],
    exam_trap: 'Mylenie „there” (tam), „their” (ich) oraz „they\'re” (oni są).',
    matura_context: 'Kryterium Poprawności Środków Językowych.',
    taskIds: ['eng_wri_091', 'eng_wri_092', 'eng_wri_093', 'eng_wri_094', 'eng_wri_095']
  },

  // =========================================================================
  // DZIAŁ 14: Wypowiedź Pisemna: Spójność i Łączniki Zdań (Filar IV)
  // =========================================================================
  {
    id: 'eng-lesson-14-1',
    topicId: 'eng-dzial-14',
    pillarId: 'pillar-writing',
    title: 'Złota siódemka łączników: First of all, What is more, However, As a result',
    subtitle: 'Niezbędny bank spójników podnoszący ocenę za Spójność i Logikę (Coherence)',
    estimatedMinutes: 5,
    concept_essence: `Kryterium Spójności i Logiki (0–2 pkt) bada, czy Twoja wypowiedź tworzy harmonijną całość. Jeśli używasz wyłącznie słówek *and*, *but* i *because*, Twoja praca brzmi ubogo!

### 1. Złota Siódemka Łączników dla Maturzysty B1/B2:
1. **First of all, / To begin with,** (Przede wszystkim / Na początek) – idealne do otwarcia pierwszego akapitu rozwinięcia.
2. **What is more, / In addition,** (Co więcej / Ponadto) – dodawanie kolejnego argumentu lub faktu.
3. **However, / On the other hand,** (Jednakże / Z drugiej strony) – wprowadzanie kontrastu lub niespodziewanego problemu.
4. **As a result, / Therefore,** (W rezultacie / Dlatego też) – przedstawianie logicznego skutku.
5. **Luckily, / Fortunately,** (Na szczęście) – pozytywny zwrot akcji po trudnej sytuacji.
6. **To make matters worse,** (Co gorsza / Na domiar złego) – podbicie dramatyzmu w opowiadaniu.
7. **All in all, / To sum up,** (Podsumowując) – płynne przejście do podsumowania.

### 2. Interpunkcja po łącznikach:
Wszystkie powyższe łączniki postawione na początku zdania **muszą być oddzielone przecinkiem**!
* *„What is more, the tickets were surprisingly cheap.”*`,
    worked_examples: [
      {
        title: 'Przykład 1: Podniesienie jakości stylu łącznikiem',
        problem: 'Wersja prosta: „The weather was bad. We couldn\'t go hiking. We went to a museum.”\nZmień to w płynny styl B2.',
        steps: [
          { num: 1, label: 'Zastosowanie łącznika skutku', text: 'Zamiast kropki łączymy przyczynę i skutek za pomocą „As a result”.' },
          { num: 2, label: 'Zastosowanie spójnika alternatywy', text: '„Instead” na końcu pokazuje alternatywę.' },
          { num: 3, label: 'Wersja ulepszona', text: '„The weather was terrible. As a result, we couldn\'t go hiking and decided to visit a local museum instead.”' }
        ],
        result: 'Płynny styl maturalny na 2/2 pkt za spójność',
        matura_tip: 'Użycie choćby 3 różnych łączników z listy gwarantuje pełną pulę 2 pkt za spójność!'
      }
    ],
    exam_trap: 'Nadużywanie łącznika „Besides” w nieformalnym liście w tonie protekcjonalnym lub wstawianie łączników bez przecinka.',
    matura_context: 'Kryterium Spójności i Logiki (0–2 pkt).',
    taskIds: ['eng_wri_141', 'eng_wri_142', 'eng_wri_143', 'eng_wri_144', 'eng_wri_145']
  },
  {
    id: 'eng-lesson-14-2',
    topicId: 'eng-dzial-14',
    pillarId: 'pillar-writing',
    title: 'Kompozycja akapitu: Wstęp, rozwinięcie z argumentacją i podsumowanie',
    subtitle: 'Wewnętrzna struktura każdego akapitu e-maila: idea główna -> szczegół -> wniosek',
    estimatedMinutes: 5,
    concept_essence: `Dobry akapit maturalny nie składa się z przypadkowych zdań. Każdy akapit powinien stanowić zwartą mini-historię:

### 1. Wzorzec 3-zdaniowego akapitu maturalnego:
* **Zdanie 1 (Fakt powiązany z kropką CKE):** *„First of all, I decided to take up voluntary work at a local animal shelter.”*
* **Zdanie 2 (Szczegół i rozwinięcie):** *„My main responsibilities include feeding the dogs and taking them for long walks in the nearby park.”*
* **Zdanie 3 (Uczucie / Konkluzja):** *„It is physically tiring, but seeing the happy animals gives me incredible satisfaction.”*

### 2. Spójność wewnętrzna:
Zauważ, jak słowa w tym akapicie łączą się ze sobą: *voluntary work -> animal shelter -> feeding dogs -> happy animals -> satisfaction*. Taki przepływ myśli uczeń osiąga automatycznie, stosując ten model.`,
    worked_examples: [
      {
        title: 'Przykład 1: Wzorcowy akapit o zakupie prezentu',
        problem: 'Zrealizuj kropkę: „Napisz, jaki prezent kupiłeś koledze i uzasadnij swój wybór.”',
        steps: [
          { num: 1, label: 'Zdanie 1 (Fakt)', text: '„For his birthday, I decided to buy him a high-quality leather guitar strap.”' },
          { num: 2, label: 'Zdanie 2 (Uzasadnienie)', text: '„I chose it because he has been practicing guitar for hours every day, and his old strap was completely worn out.”' },
          { num: 3, label: 'Zdanie 3 (Reakcja)', text: '„I’m absolutely sure he will love the vintage look and the soft padding.”' }
        ],
        result: 'Perfekcyjne 35 słów realizujące kropkę w 100%',
        matura_tip: 'Trzy precyzyjne zdania w akapicie to gwarancja idealnego limitu słów bez lania wody!'
      }
    ],
    exam_trap: 'Wprowadzanie do akapitu dygresji niezwiązanych z kropką polecenia (np. opowiadanie o swoim psie w akapicie o naprawie roweru).',
    matura_context: 'Kryterium Treści i Spójności.',
    taskIds: ['eng_wri_146', 'eng_wri_147', 'eng_wri_148', 'eng_wri_149', 'eng_wri_150']
  },
  {
    id: 'eng-lesson-14-3',
    topicId: 'eng-dzial-14',
    pillarId: 'pillar-writing',
    title: 'Płynność i naturalność tekstu – eliminacja urywanych, izolowanych zdań',
    subtitle: 'Zastępowanie prostych konstrukcji zdaniami złożonymi z which, who, where, because',
    estimatedMinutes: 5,
    concept_essence: `Kryterium Zakresu Środków Językowych (0–3 pkt) nagradza używanie zdań podrzędnie złożonych (Complex Sentences). 

### 1. Poziom A2 vs Poziom B1/B2:
* **Styl podstawowy A2 (proste zdanka):**
  * *„I met a boy. His name is Alex. He lives in London. He plays tennis very well.”*
* **Styl dojrzały B1/B2 (zdanie złożone):**
  * *„During my stay in London, I met a boy named Alex, **who** is an exceptionally talented tennis player.”*

### 2. Narzędzia scalania zdań:
* Zaimki względne: \`who\` (ludzie), \`which\` (rzeczy), \`where\` (miejsca), \`whose\` (czyj).
* Łączniki przyczynowo-skutkowe: \`since / as\` (jako że / ponieważ), \`so that\` (aby / w celu).
* Imiesłowy: *„Arriving at the hotel, we realized that...”*`,
    worked_examples: [
      {
        title: 'Przykład 1: Połączenie dwóch zdań zaimkiem względnym',
        problem: 'Połącz: „We stayed in a lovely guesthouse. It was located right next to a peaceful lake.”',
        steps: [
          { num: 1, label: 'Wybór spójnika', text: 'Guesthouse to budynek/rzecz, więc używamy „which” lub „that”.' },
          { num: 2, label: 'Połączenie w zdanie złożone', text: '„We stayed in a lovely guesthouse which was located right next to a peaceful lake.”' }
        ],
        result: 'Jedno eleganckie zdanie złożone',
        matura_tip: 'Zdania ze spójnikami „who/which” natychmiast podnoszą ocenę za zakres środków językowych (Range).'
      }
    ],
    exam_trap: 'Nadużywanie słowa „and” do łączenia 5 zdań w jedno tasiemcowe zdanie bez żadnej interpunkcji.',
    matura_context: 'Kryterium Zakresu Środków Językowych (0–3 pkt).',
    taskIds: ['eng_wri_151', 'eng_wri_152', 'eng_wri_153', 'eng_wri_154', 'eng_wri_155']
  },

  // =========================================================================
  // DZIAŁ 15: Wypowiedź Pisemna: Pełne Formy Użytkowe Zadanie 12 CKE
  // =========================================================================
  {
    id: 'eng-lesson-15-1',
    topicId: 'eng-dzial-15',
    pillarId: 'pillar-writing',
    title: 'Wzorcowy e-mail nieformalny (80–130 słów) – szablon, 4 kropki i podpis XYZ',
    subtitle: 'Kompletny szkielet oficjalnego e-maila maturalnego z pełnym omówieniem każdego elementu',
    estimatedMinutes: 5,
    concept_essence: `E-mail do znajomego to najczęstsza forma wypowiedzi w Zadaniu 12 CKE. Musi spełniać żelazne wymogi kompozycyjne:

### 1. Nienaruszalna struktura e-maila:
1. **Zwrot powitalny:** \`Hi Mark,\` lub \`Dear Anna,\` (uwaga: po powitaniu stawiamy przecinek!).
2. **Wstęp (1–2 zdania):** Nawiązanie kontaktu i podanie celu:
   * *„Hope you're doing well! I'm writing to tell you some exciting news about...”*
3. **Rozwinięcie 4 kropek (w 3–4 akapitach):** Realizacja poleceń arkusza z wykorzystaniem łączników.
4. **Zakończenie (1–2 zdania):** Uprzejma formuła zamykająca i prośba o kontakt:
   * *„That's all for now. Write back soon and let me know what you think!”*
5. **Formuła pożegnalna i podpis:**
   * \`Best wishes,\` / \`Take care,\` / \`All the best,\`
   * **XYZ** (OBOWIĄZKOWO! Zakaz podpisywania się imieniem!).

### 2. Dopuszczalny limit słów CKE:
* Wymagany limit: **80–130 słów**.
* Bezpieczny przedział: celuj w **100–115 słów** – wtedy masz pewność, że wszystkie kropki są rozwinięte, a praca nie przekroczy dopuszczalnego limitu.`,
    worked_examples: [
      {
        title: 'Przykład 1: Pełny wzorcowy szkielet e-maila',
        problem: 'Napisz e-mail do kolegi z Londynu o nowym kursie językowym.',
        steps: [
          { num: 1, label: 'Wstęp', text: '„Hi Tom,\nHope you’re having a great week! I’m writing to let you know that I’ve just enrolled in an intensive Spanish course.”' },
          { num: 2, label: 'Rozwinięcie z łącznikami', text: '„First of all, the classes take place twice a week in a cozy language school downtown. Our native speaker teacher is incredibly enthusiastic and encourages us to speak from day one. What is more, I have already made friends with three students who share my passion for travel.”' },
          { num: 3, label: 'Zakończenie i podpis', text: '„What about you? Have you started any new hobbies recently? Write back soon!\n\nBest wishes,\nXYZ”' }
        ],
        result: 'Dokładnie 92 słowa – 100% punktów (12/12 pkt)',
        matura_tip: 'Nigdy nie podpisuj się własnym imieniem! Podpisanie się jako Oskar czy Ania grozi unieważnieniem pracy przez CKE!'
      }
    ],
    exam_trap: 'Podpisanie się własnym imieniem lub nazwiskiem! Zgodnie z wytycznymi CKE uczeń ma obowiązek podpisać się wyłącznie jako XYZ.',
    matura_context: 'Zadanie 12 CKE (12 punktów – 20% całej matury).',
    taskIds: ['eng_wri_191', 'eng_wri_192', 'eng_wri_193', 'eng_wri_194', 'eng_wri_195']
  },
  {
    id: 'eng-lesson-15-2',
    topicId: 'eng-dzial-15',
    pillarId: 'pillar-writing',
    title: 'Wzorcowy wpis na blogu internetowym – chwytliwy tytuł i wezwanie do dyskusji',
    subtitle: 'Specyfika gatunkowa bloga: angażowanie czytelników, nagłówki i sekcja komentarzy',
    estimatedMinutes: 5,
    concept_essence: `Wpis na blogu (Blog post) to druga dopuszczalna forma w Zadaniu 12. Różni się od e-maila stylem komunikacji – zwracasz się nie do jednej osoby, lecz do **społeczności czytelników bloga**:

### 1. Elementy charakterystyczne wpisu na blogu:
* **Chwytliwy tytuł (Title):** Zawsze dodaj krótki, intrygujący tytuł na samej górze:
  * *„Why I gave up my smartphone for a week!”*, *„My unforgettable volunteer adventure”*.
* **Powitanie społeczności:**
  * *„Hi everyone! Welcome back to my blog!”*, *„Hello fellow readers!”*.
* **Bezpośrednie zwroty do czytelników:**
  * *„Have you ever wondered...?”, „As you probably know from my last post...”, „Believe me when I say...”*.
* **Call to Action (Wezwanie do komentowania):**
  * *„What are your thoughts on this? Have you had a similar experience? Drop a comment below and let me know!”*.
* **Podpis:** Brak formalnego pożegnania – wystarczy sam podpis: **XYZ**.`,
    worked_examples: [
      {
        title: 'Przykład 1: Wzorcowy wpis na blogu o ekologii',
        problem: 'Napisz wpis na blogu o akcji sprzątania lasu.',
        steps: [
          { num: 1, label: 'Tytuł i powitanie', text: '„Green Weekend: How We Cleaned Our Local Forest!\n\nHi everyone! Welcome back to my blog.”' },
          { num: 2, label: 'Treść', text: '„Last Saturday, my classmates and I took part in an eco-campaign. We collected over twenty bags of plastic bottles and old tires. Although it was hard work, we felt proud of the visible transformation.”' },
          { num: 3, label: 'Zakończenie z wezwaniem', text: '„Do you take part in ecological events in your area? Share your stories in the comments below!\n\nXYZ”' }
        ],
        result: 'Wzorcowy blog post (88 słów) z pełną realizacją cech gatunkowych',
        matura_tip: 'Tytuł i wezwanie do komentowania gwarantują maksymalną notę za spójność i zakres stylu.'
      }
    ],
    exam_trap: 'Pominięcie tytułu na blogu lub zwracanie się w liczbie pojedynczej jak w liście do jednej osoby („Hi Mark” na blogu to błąd gatunkowy!).',
    matura_context: 'Zadanie 12 CKE – alternatywna forma pisemna.',
    taskIds: ['eng_wri_196', 'eng_wri_197', 'eng_wri_198', 'eng_wri_199', 'eng_wri_200']
  },
  {
    id: 'eng-lesson-15-3',
    topicId: 'eng-dzial-15',
    pillarId: 'pillar-writing',
    title: 'Strategia 5 minut przed oddaniem arkusza: Liczenie słów, autokorekta i podpis XYZ',
    subtitle: 'Checklista kontrolna maturzysty: szybkie wyłapanie brakujących liter, -s w 3. osobie i limitu 80–130 słów',
    estimatedMinutes: 5,
    concept_essence: `Ostatnie 5–7 minut egzaminu powinno być przeznaczone wyłącznie na **świadomą autokorektę** napisanego tekstu. Statystyki pokazują, że uważna korekta pozwala uratować od 2 do 4 cennych punktów!

### 1. Checklista Autokorekty w 4 Krokach:
1. **Krok 1: Sprawdzenie 4 Kropek:** Czy na pewno odniosłem się do każdej kropki i dopisałem drugie zdanie rozwijające? (5/5 pkt za treść).
2. **Krok 2: Liczenie słów:** Szybko policz słowa.
   * Jeśli masz mniej niż 80 słów -> natychmiast dopisz jedno zdanie z przymiotnikami w wybranym akapicie.
   * Jeśli masz powyżej 130 słów (np. 150) -> skreśl jedno niepotrzebne zdanie poboczne. Za przekroczenie limitu egzaminator nie odbiera punktów bezpośrednio, ale im więcej piszesz, tym większe ryzyko błędów językowych!
3. **Krok 3: Końcówka -s w Present Simple:** Sprawdź czasowniki po *he, she, it* (np. *he plays, she thinks*). To najczęstszy błąd pośpiechu!
4. **Krok 4: Podpis XYZ:** Upewnij się, że praca kończy się literami **XYZ**, a nie Twoim prawdziwym imieniem.`,
    worked_examples: [
      {
        title: 'Przykład 1: Szybka korekta tekstu w brudnopisie',
        problem: 'Zdanie ucznia przed korektą: „My brother live in London and he always help me when I has a problem.”',
        steps: [
          { num: 1, label: 'Wykrycie braku -s w 3. osobie', text: '„My brother” to he -> wymaga „lives” oraz „helps”.' },
          { num: 2, label: 'Korekta czasownika have dla I', text: 'Dla podmiotu „I” formą teraźniejszą jest „have”, a nie has.' },
          { num: 3, label: 'Wersja po autokorekcie', text: '„My brother lives in London and he always helps me when I have a problem.”' }
        ],
        result: 'Wyeliminowano 3 kardynalne błędy gramatyczne w jednym zdaniu',
        matura_tip: 'Przeznaczenie 5 minut na sprawdzenie tych 4 kroków często decyduje o zyskaniu dodatkowych punktów.'
      }
    ],
    exam_trap: 'Oddanie pracy bez policzenia słów (np. 65 słów oznacza dotkliwą redukcję punktacji za treść i formę).',
    matura_context: 'Zadanie 12 CKE – bezpiecznik maksymalnego wyniku.',
    taskIds: ['eng_wri_201', 'eng_wri_202', 'eng_wri_203', 'eng_wri_204', 'eng_wri_205']
  }
];

// Generowanie pliku docelowego TypeScript
const code = `/**
 * englishLessonsData.ts
 *
 * Komplet 45 mikro-lekcji Core-4 dla Języka Angielskiego (Formuła 2023)
 * podzielonych równomiernie: po dokładnie 3 lekcje na każdy z 15 Działów CKE.
 * Każda lekcja posiada uniwersalną Pigułkę Bento dostosowaną do specyfiki języka:
 * - concept_essence: "Klucz do tematu", bogata esencja, schematy struktur, reguły CKE
 * - worked_examples: tablica 2–3 autentycznych zadań z modelowym rozwiązaniem krok po kroku
 * - exam_trap: typowa pułapka egzaminacyjna CKE / false friends / interferencja L1
 * - matura_context: wskazówka egzaminatora i waga punktowa
 * - taskIds: wyselekcjonowana porcja zadań z bazy 1500
 */

import { LessonTheoryPill } from '../../types';
import { ALL_ENGLISH_TASKS } from './allEnglishTasks';

export interface EnglishWorkedExample {
  title?: string;
  problem: string;
  steps: { num: number | string; label?: string; text: string }[];
  result?: string;
  matura_tip?: string;
}

export interface EnglishLessonData {
  id: string;
  topicId: string;
  pillarId: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  theoryPill: LessonTheoryPill;
  taskIds: string[];
}

export const ENGLISH_LESSONS: EnglishLessonData[] = ${JSON.stringify(
  LESSONS_SPEC.map(l => ({
    id: l.id,
    topicId: l.topicId,
    pillarId: l.pillarId,
    title: l.title,
    subtitle: l.subtitle,
    estimatedMinutes: l.estimatedMinutes,
    theoryPill: {
      concept_essence: l.concept_essence,
      worked_examples: l.worked_examples,
      worked_example: l.worked_examples[0],
      exam_trap: l.exam_trap,
      matura_context: l.matura_context
    },
    taskIds: l.taskIds
  })),
  null,
  2
)};

export function getEnglishLessonById(lessonId: string): EnglishLessonData | undefined {
  return ENGLISH_LESSONS.find(l => l.id === lessonId);
}

export function getEnglishLessonsByTopic(topicId: string): EnglishLessonData[] {
  return ENGLISH_LESSONS.filter(l => l.topicId === topicId);
}

export function getEnglishLessonsByPillar(pillarId: string): EnglishLessonData[] {
  return ENGLISH_LESSONS.filter(l => l.pillarId === pillarId);
}
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/english/englishLessonsData.ts'), code, 'utf-8');
console.log('SUCCESS: Generated 45 English Core-4 Lessons in src/data/english/englishLessonsData.ts!');
