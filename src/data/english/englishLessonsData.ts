/**
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

export const ENGLISH_LESSONS: EnglishLessonData[] = [
  // ==========================================
  // DZIAŁ 1: CZASY GRAMATYCZNE I ASPEKTY (7 ROZBUDOWANYCH LEKCJI)
  // ==========================================
  {
    "id": "eng-lesson-1-1",
    "topicId": "eng-dzial-1",
    "pillarId": "pillar-use-of-english",
    "title": "Present Simple vs Present Continuous & Czasowniki Statyczne",
    "subtitle": "Nawyki, rutyna i rozkłady jazdy vs czynności w tej chwili oraz błąd „I am knowing”",
    "estimatedMinutes": 6,
    "theoryPill": {
      "concept_essence": "Dwa fundamentalne czasy teraźniejsze, których rozróżnienie CKE sprawdza w każdym arkuszu w zadaniach zamkniętych i minidialogach.\n\n### 1. Wymiar Czasu i Zastosowanie w Pigułce:\n* **Present Simple (Podmiot + V₁ / -s)**: Służy do opisywania nawyków, rutyny, faktów naukowych i stałych sytuacji życiowych.\n  * *Schemat:* Podmiot + `V₁` (dla *he/she/it*: `V₁ + -s/-es`). Pytania: `Do / Does + podmiot + V₁?`. Przeczenia: `don't / doesn't + V₁` (uwaga: po does/doesn't końcówka -s znika!).\n  * *Przykład:* „She drinks coffee every morning, but she doesn't drink tea.”\n  * *Zastosowanie CKE:* Oficjalne rozkłady jazdy i harmonogramy (*„The train leaves at 18:30”*).\n* **Present Continuous (Podmiot + am/is/are + V-ing)**: Wyraża czynności dziejące się dokładnie w momencie mówienia lub sytuacje tymczasowe.\n  * *Schemat:* Podmiot + `am / is / are + V-ing`. Pytania: `Am / Is / Are + podmiot + V-ing?`. Przeczenia: `am not / isn't / aren't + V-ing`.\n  * *Przykład:* „Please be quiet! My brother is studying for his final exam.”\n  * *Zastosowanie CKE:* Tymczasowe stany w obecnym okresie (*„I'm living with my aunt this month while my flat is renovated”*).\n\n### 2. Słowa-Sygnały Egzaminatora (Time Markers):\n* **Dla Present Simple szukaj:**\n  * Przysłówków częstotliwości: `always`, `usually`, `often`, `sometimes`, `rarely`, `never` (stawianych przed czasownikiem głównym, ale po *to be*).\n  * Wyrażeń okresowych: `every day/week/year`, `on Mondays`, `once a month`, `in the morning`.\n* **Dla Present Continuous szukaj:**\n  * Bezpośrednich markerów chwili: `now`, `at the moment`, `right now`, `currently`.\n  * Zwrotów przyciągających uwagę: `Look!`, `Listen!`, `Hurry up!`.\n  * Markerów tymczasowości: `this week`, `these days`, `today`.\n\n### 3. Czasowniki Statyczne (State Verbs – Pułapka Nr 1 CKE):\n* **Czasowniki stanu NIGDY nie przyjmują formy z -ing** na maturze podstawowej:\n  * Uczucia i emocje: `like`, `love`, `hate`, `prefer`, `want`, `need`.\n  * Myślenie i wiedza: `know`, `understand`, `remember`, `believe`, `mean`.\n  * Zmysły i posiadanie: `belong to`, `own`, `seem`, `hear`.\n  * *Błędne myślenie:* „I am knowing this person.” ➔ *Poprawnie:* `I know this person.`\n* **Czasowniki o podwójnym znaczeniu:**\n  * `have`: stan posiadania (*„I have a car”*) vs dynamiczna czynność (*„I am having lunch / a shower”*).\n  * `think`: opinia (*„I think you are right”*) vs proces myślowy w toku (*„I am thinking about moving abroad”*).\n\n### 4. Złota Reguła Egzaminatora CKE:\nJeżeli czasownik opisuje trwały stan umysłu, wiedzę lub własność, dodanie końcówki `-ing` oznacza natychmiastowe 0 punktów!",
      "worked_examples": [
        {
          "title": "Przykład 1: Dobór czasu na podstawie sygnału tymczasowości",
          "problem": "Wybierz poprawną formę: „Normally I [...] to school by bus, but this week my dad [...] me by car.”\nA. go / is driving  |  B. am going / drives  |  C. go / drives",
          "steps": [
            {
              "num": 1,
              "label": "Analiza pierwszej części",
              "text": "Słowo „Normally” wskazuje na stałą rutynę i nawyk, co wymusza czas Present Simple: „I go”."
            },
            {
              "num": 2,
              "label": "Analiza drugiej części",
              "text": "Zwrot „this week” definiuje sytuację wyjątkową i tymczasową, wymagającą czasu Present Continuous: „is driving”."
            }
          ],
          "result": "A (go / is driving)",
          "matura_tip": "Zestawienie „normally ... but today/this week” to klasyczny szablon zadań maturalnych CKE!"
        },
        {
          "title": "Przykład 2: Pułapka czasownika statycznego w dialogu",
          "problem": "Uzupełnij minidialog: X: „Why are you staring at that poster?” — Y: „I [...] (not / understand) this French slogan.”",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja typu czasownika",
              "text": "Czasownik „understand” jest czasownikiem stanu (stan umysłu) i nie tworzy form ciągłych."
            },
            {
              "num": 2,
              "label": "Konstrukcja przeczenia",
              "text": "Dla osoby „I” w czasie Present Simple przeczenie tworzymy za pomocą operatora do: „don't understand”."
            }
          ],
          "result": "don't understand / do not understand",
          "matura_tip": "Nigdy nie wpisuj „am not understanding” – egzaminator od razu uzna to za błąd kardynalny."
        }
      ],
      "exam_trap": "Używanie Present Continuous z czasownikami statycznymi (np. „I am knowing him”, „She is wanting a coffee”) oraz błąd kalki językowej: „I live in Poland for 10 years” zamiast Present Perfect.",
      "matura_context": "Pojawia się w każdym arkuszu CKE w Zadaniach 8 i 9 (wybór wielokrotny leksykalno-gramatyczny) – waga: 1–2 pkt."
    },
    "taskIds": ["eng_uoe_088", "eng_uoe_103", "eng_uoe_118", "eng_uoe_133", "eng_uoe_148"]
  },
  {
    "id": "eng-lesson-1-2",
    "topicId": "eng-dzial-1",
    "pillarId": "pillar-use-of-english",
    "title": "Past Simple vs Past Continuous – Opowiadanie, Tło i Przerywanie Czynności",
    "subtitle": "Struktury while / when, formy nieregularne oraz pytania z „Did” bez błędu podwójnej przeszłości",
    "estimatedMinutes": 6,
    "theoryPill": {
      "concept_essence": "Fundament narracji w zadaniach z lukami, minidialogach oraz w wypowiedzi pisemnej (Zadanie 12 e-mail/wpis na blogu).\n\n### 1. Dwa Czasy w Opowiadaniu:\n* **Past Simple (Podmiot + V₂ / -ed)**: Czynność punktowa, całkowicie zakończona w przeszłości w określonym momencie.\n  * *Schemat:* Podmiot + `V₂` (czasowniki nieregularne, np. *went, saw, bought*) lub `V₁ + -ed` (regularne, np. *played, watched*).\n  * *Pytania:* `Did + podmiot + V₁?` (*„Did you see that?”* – czasownik wraca do formy podstawowej!).\n  * *Przeczenia:* `Podmiot + didn't + V₁` (*„I didn't buy anything”*).\n* **Past Continuous (Podmiot + was/were + V-ing)**: Czynność długa, która trwała przez pewien czas w przeszłości i stanowi tło narracji.\n  * *Schemat:* Podmiot + `was / were + V-ing` (dla *I, he, she, it* stosujemy `was`, dla *we, you, they* stosujemy `were`).\n  * *Przykład:* „At 9 PM yesterday, I was studying in the library.”\n\n### 2. Maturalne Zderzenie Czynności (While vs When):\n* **Zasada Przerwania:** Czynność długa (tło – Past Continuous) trwała w najlepsze, gdy nagle przerwało ją krótkie wydarzenie punktowe (Past Simple).\n  * *Spójnik WHILE / AS:* Wprowadza czynność dłuższą w czasie ciągłym: `While I was taking a shower, the doorbell rang.`\n  * *Spójnik WHEN:* Wprowadza krótkie zdarzenie przerywające: `I was doing my homework when the electricity went off.`\n* **Dwie Czynności Równoległe:** Gdy dwa procesy trwały jednocześnie w przeszłości, oba występują w Past Continuous:\n  * *Przykład:* „While my brother was cooking dinner, I was cleaning the kitchen.”\n\n### 3. Złote Sygnały Czasu Past Simple:\n* Słowa-kotwice zamykające przeszłość: `yesterday`, `ago` (np. *three days ago*), `last` (np. *last night, last year*), `in 2020`, `when I was a child`.\n\n### 4. Złota Reguła Egzaminatora CKE:\nPo operatorze `did` lub `didn't` czasownik ZAWSZE wraca do formy bezokolicznika V₁ – formy typu *„Did you went?”* lub *„I didn't saw”* to automatyczne 0 punktów!",
      "worked_examples": [
        {
          "title": "Przykład 1: Dobór spójnika while vs when w teście CKE",
          "problem": "Wybierz poprawny łącznik: „We were walking along the beach [...] we suddenly found an old wooden box.”\nA. while  |  B. when  |  C. during",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja natury zdarzenia",
              "text": "Druga część zdania („we suddenly found...”) opisuje nagłe zdarzenie punktowe w czasie Past Simple."
            },
            {
              "num": 2,
              "label": "Dobór spójnika",
              "text": "Przed czynnością w Past Simple przerywającą tło stosujemy spójnik „when”. Spójnik „while” wymaga czasu ciągłego, a „during” łączy się tylko z rzeczownikiem."
            }
          ],
          "result": "B (when)",
          "matura_tip": "Pamiętaj: When + Past Simple (krótka akcja), While + Past Continuous (długie tło)!"
        },
        {
          "title": "Przykład 2: Transformacja z czasownikiem nieregularnym",
          "problem": "Uzupełnij zdanie: „What [...] (you / do) when the fire alarm started ringing?”",
          "steps": [
            {
              "num": 1,
              "label": "Ustalenie pytania o tło",
              "text": "Pytanie dotyczy tego, jaka czynność była w toku w momencie wybuchu alarmu."
            },
            {
              "num": 2,
              "label": "Konstrukcja pytania w Past Continuous",
              "text": "Dla podmiotu „you” operatorem jest „were”: „were you doing”."
            }
          ],
          "result": "were you doing",
          "matura_tip": "Zwróć uwagę na szyk pytania: słówko pytające + were + podmiot + doing."
        }
      ],
      "exam_trap": "Nieuważne stosowanie podwójnej formy przeszłej po operatorze didn't (np. „didn't went”, „didn't had”) oraz mylenie spójnika „during” (który jest przyimkiem i łączy się z rzeczownikiem: during the lesson) ze spójnikiem „while” (który łączy się z całym zdaniem: while I was studying).",
      "matura_context": "Stały element Zadań 8, 9 i 11 oraz klucz do zdobycia kompletu punktów za poprawność w opowiadaniu w Zadaniu 12 – waga: 2–3 pkt."
    },
    "taskIds": ["eng_uoe_085", "eng_uoe_100", "eng_uoe_115", "eng_uoe_130", "eng_uoe_145"]
  },
  {
    "id": "eng-lesson-1-3",
    "topicId": "eng-dzial-1",
    "pillarId": "pillar-use-of-english",
    "title": "Present Perfect Simple – Skutek tu i teraz, Doświadczenia i Duet Since vs For",
    "subtitle": "Połączenie przeszłości z teraźniejszością, określniki already/yet/just oraz been to vs gone to",
    "estimatedMinutes": 6,
    "theoryPill": {
      "concept_essence": "Najważniejszy czas na maturze podstawowej, łączący przeszłość z teraźniejszością. Brak tego czasu w języku polskim sprawia, że jest to numer 1 w testowaniu CKE.\n\n### 1. Istota Czasu: Most Przeszłość ➔ Teraźniejszość:\n* **Present Perfect Simple (Podmiot + have/has + V₃)**: Czynność wydarzyła się w przeszłości, ale jej **rezultat, skutek fizyczny lub doświadczenie** liczy się w tej chwili. Czas dokonania jest nieokreślony.\n  * *Schemat:* Podmiot + `have / has + V₃` (III forma / regularne -ed).\n  * *Przeczenia:* `haven't / hasn't + V₃`.\n  * *Pytania:* `Have / Has + podmiot + V₃?`.\n  * *Przykład:* „I have lost my house keys.” (Skutek teraz: stoję przed drzwiami i nie mogę wejść).\n\n### 2. Żelazny Zestaw Określników i Ich Pozycja w Zdaniu:\n* `already` (już): w zdaniach twierdzących między operatorem a czasownikiem (*„I have already packed my suitcase.”*).\n* `just` (właśnie, przed ułamkiem sekundy): przed V₃ (*„The train has just left the station.”*).\n* `yet` (już w pytaniach / jeszcze nie w przeczeniach): **ZAWSZE na samym końcu zdania** (*„Have you called him yet?”* / *„I haven't eaten breakfast yet.”*).\n* `ever` (kiedykolwiek w życiu): w pytaniach o życiowe doświadczenia (*„Have you ever climbed a mountain?”*).\n* `never` (nigdy w życiu): w zdaniach twierdzących o znaczeniu przeczącym (*„I have never tried sushi.”*).\n\n### 3. Maturalny Duet: Since vs For:\n* **SINCE (od konkretnego punktu w przeszłości):** Wskazuje moment startowy na osi czasu:\n  * `since Monday`, `since 2018`, `since 8 AM`, `since I finished school`.\n* **FOR (przez określony przedział czasu):** Wskazuje długość trwania okresu:\n  * `for two hours`, `for three days`, `for five years`, `for a long time`.\n  * *Wzorzec CKE:* „We have known each other since primary school.” / „They have worked here for ten years.”\n\n### 4. Semantyczna Pułapka Egzaminatora: Been To vs Gone To:\n* `have been to`: ktoś był w danym miejscu i **już stamtąd wrócił** (*„She has been to London three times”* – teraz siedzi z nami w pokoju).\n* `have gone to`: ktoś wyjechał i **nadal tam przebywa** (*„Mark is not here; he has gone to London”* – jest w podróży).\n\n### 5. Złota Reguła Egzaminatora CKE:\nJeżeli w języku polskim mówisz: *„Znam go od 3 lat”* (czas teraźniejszy), w języku angielskim czynność trwająca z przeszłości do teraz to ZAWSZE Present Perfect: `I have known him for 3 years`!",
      "worked_examples": [
        {
          "title": "Przykład 1: Dobór since vs for w zdaniu z luką",
          "problem": "Uzupełnij zdanie: „Adam has lived in this apartment [...] he bought it five years ago.”",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja wyrażenia za luką",
              "text": "Wyrażenie „he bought it five years ago” określa konkretny moment startowy w przeszłości (zdanie okolicznikowe czasu)."
            },
            {
              "num": 2,
              "label": "Wybór przyimka",
              "text": "Punkt startowy na osi czasu wymaga przyimka „since”. Gdyby było samo „five years”, użylibyśmy „for”."
            }
          ],
          "result": "since",
          "matura_tip": "Zwróć uwagę: po „since” całe podrzędne zdanie okolicznikowe występuje w Past Simple (bought)!"
        },
        {
          "title": "Przykład 2: Been to vs Gone to w minidialogu CKE",
          "problem": "Wybierz właściwe słowo: X: „Can I speak to Mr Davis?” — Y: „I'm afraid he isn't in his office. He has [...] to a conference in Berlin.”\nA. been  |  B. gone  |  C. went",
          "steps": [
            {
              "num": 1,
              "label": "Weryfikacja obecności rozmówcy",
              "text": "Rozmówca Y mówi: „he isn't in his office”, co oznacza, że pana Davisa fizycznie nie ma na miejscu."
            },
            {
              "num": 2,
              "label": "Zastosowanie reguły",
              "text": "Gdy ktoś wyjechał i jeszcze nie wrócił, jedyną poprawną formą jest „gone”."
            }
          ],
          "result": "B (gone)",
          "matura_tip": "Gdyby pan Davis wrócił i opowiadał o konferencji, użylibyśmy „been”."
        }
      ],
      "exam_trap": "Kalka z języka polskiego: tłumaczenie zdań typu „Mieszkam tu od roku” jako „I live here since a year” (błąd podwójny: zły czas Present Simple + słowo since zamiast for). Prawidłowo: „I have lived here for a year”.",
      "matura_context": "Bezwzględny pewniak w każdym arkuszu CKE (Zadania 8, 9 i 11) – waga: 2–3 pkt."
    },
    "taskIds": ["eng_uoe_077", "eng_uoe_092", "eng_uoe_107", "eng_uoe_122", "eng_uoe_137"]
  },
  {
    "id": "eng-lesson-1-4",
    "topicId": "eng-dzial-1",
    "pillarId": "pillar-use-of-english",
    "title": "Kontrast Gigantów: Present Perfect Simple vs Past Simple",
    "subtitle": "Rozstrzygający pojedynek na maturze: konkretna data vs nieokreślony czas i skutek",
    "estimatedMinutes": 6,
    "theoryPill": {
      "concept_essence": "Pojedynek stulecia na egzaminie maturalnym. CKE regularnie zestawia te dwa czasy w zadaniach ABC, transformacjach i tłumaczeniach fragmentów zdań.\n\n### 1. Tabela Decyzyjna Egzaminatora (Matryca Wyboru):\n* **Past Simple (V₂ / did)**: Stosuj, gdy okres czasu jest całkowicie zamknięty i miniony (yesterday, last week, ago, in 2019) lub pada pytanie ze słowem „When...?”.\n  * Okres czasu jest **całkowicie zamknięty i miniony** (*yesterday, last week, in 2019*).\n  * Podano **dokładny moment lub datę** wydarzenia (*two days ago, on Friday*).\n  * Osoba, o której mowa, już nie żyje (*„Shakespeare wrote Hamlet”*).\n  * Występuje pytanie ze słowem **„When...?”** (*„When did you buy this coat?”*).\n* **Present Perfect (have/has + V₃)**: Stosuj, gdy okres czasu jest wciąż otwarty i trwa (today, this year), liczy się widoczny rezultat teraz lub opisujesz doświadczenia życiowe.\n  * Okres czasu jest **wciąż otwarty i trwa** (*today, this morning, this year*).\n  * Czas wykonania jest **nieokreślony**, a liczy się widoczny **rezultat teraz**.\n  * Chodzi o **życiowe doświadczenie** (*„She has visited five countries”*).\n  * Występują określniki: `already`, `just`, `yet`, `ever`, `never`, `since`, `for`.\n\n### 2. Porównanie Zdań w Praktyce Maturalnej:\n* *„I lost my wallet yesterday.”* (Past Simple: fakt z przeszłości, określony dzień).\n* *„I have lost my wallet!”* (Present Perfect: skutek teraz, nie mam pieniędzy na bilet).\n* *„Tom lived in London for two years.”* (Past Simple: już tam nie mieszka, okres zamknięty).\n* *„Tom has lived in London for two years.”* (Present Perfect: nadal tam mieszka).\n\n### 3. Zabójcza Pułapka Pytania z „When...?”:\n* W języku angielskim pytanie o czas rozpoczęcia czynności ZAWSZE wymaga czasu Past Simple:\n  * **POPRAWNIE:** `When did you start learning German?`\n  * **BŁĄD DYSKWALIFIKUJĄCY:** `When have you started...?`\n* Jeśli chcesz zapytać o czas trwania do chwili obecnej, użyj zwrotu **„How long...?”**:\n  * `How long have you lived here?`\n\n### 4. Transformacje CKE ze Słowem-Kluczem (Parafrazy):\n* *Wzorzec 1:* „The last time I saw Peter was in 2021.” ➔ `I haven't seen Peter since 2021.`\n* *Wzorzec 2:* „She started working here three months ago.” ➔ `She has worked here for three months.`\n\n### 5. Złota Reguła Egzaminatora CKE:\nWidzisz w zdaniu słówko `ago`, `yesterday` lub datę z przeszłości? Wstaw formę przeszłą V₂ / did. Widzisz `since`, `already` lub `so far`? Wstaw have/has + V₃!",
      "worked_examples": [
        {
          "title": "Przykład 1: Dobór czasu w zadaniu wielokrotnego wyboru",
          "problem": "Wybierz poprawną formę: „I [...] my driving test two months ago, and since then I [...] over 1000 km.”\nA. passed / have driven  |  B. have passed / drove  |  C. passed / drove",
          "steps": [
            {
              "num": 1,
              "label": "Analiza pierwszej części zdania",
              "text": "Określenie „two months ago” zawiera słowo „ago”, które bezwzględnie wymaga czasu Past Simple: „passed”."
            },
            {
              "num": 2,
              "label": "Analiza drugiej części zdania",
              "text": "Zwrot „since then” (od tamtej pory do teraz) łączy przeszłość z teraźniejszością i wymusza czas Present Perfect: „have driven”."
            }
          ],
          "result": "A (passed / have driven)",
          "matura_tip": "Obecność słowa „ago” w pierwszej części wyklucza opcję have passed!"
        },
        {
          "title": "Przykład 2: Parafraza ze słowem kluczem CKE",
          "problem": "Uzupełnij drugie zdanie tak, aby zachować sens: „We haven't met our cousins for three years.” (MET)\n„The last time we [...] three years ago.”",
          "steps": [
            {
              "num": 1,
              "label": "Rozpoznanie transformacji",
              "text": "Przekształcamy zdanie z czasem Present Perfect i „for” na konstrukcję z „The last time” i słówkiem „ago”."
            },
            {
              "num": 2,
              "label": "Zastosowanie formy Past Simple",
              "text": "Po „The last time we” czasownik musi być w II formie (Past Simple): „met our cousins”."
            }
          ],
          "result": "met our cousins",
          "matura_tip": "Pamiętaj o nieregularności czasownika: meet – met – met."
        }
      ],
      "exam_trap": "Mylenie określnika „ago” z określnikiem „before” oraz wstawianie Present Perfect po pytaniu „When” (np. „When have you arrived?” zamiast „When did you arrive?”).",
      "matura_context": "Występuje w 100% arkuszy maturalnych CKE (Zadania 8, 9, 11) – waga: 2–3 pkt."
    },
    "taskIds": ["eng_uoe_076", "eng_uoe_091", "eng_uoe_106", "eng_uoe_121", "eng_uoe_136"]
  },
  {
    "id": "eng-lesson-1-5",
    "topicId": "eng-dzial-1",
    "pillarId": "pillar-use-of-english",
    "title": "Past Perfect & Chronologia Zdarzeń – Zaprzeszłość (had + V₃)",
    "subtitle": "Przeszłość przed inną przeszłością, spójniki by the time, before, after oraz mowa zależna",
    "estimatedMinutes": 6,
    "theoryPill": {
      "concept_essence": "Czas zaprzeszły (Past Perfect) to eleganckie narzędzie gramatyczne, które pozwala uporządkować kolejność zdarzeń w przeszłości.\n\n### 1. Istota Czasu Zaprzeszłego:\n* **Past Perfect (Podmiot + had + V₃)**: Określa czynność, która wydarzyła się i zakończyła **zanim nastąpiło inne wydarzenie w czasie przeszłym**.\n  * *Oś czasu:* [Wydarzenie 1: Past Perfect (had + V₃)] ➔ [Wydarzenie 2: Past Simple (V₂)] ➔ [TERAZ].\n  * *Schemat:* Podmiot + `had + V₃` (ta sama forma dla wszystkich osób: *I had, you had, he had, they had*).\n  * *Przeczenia:* `hadn't + V₃`. Pytania: `Had + podmiot + V₃?`.\n  * *Przykład:* „When we arrived at the airport, our flight had already departed.” (Najpierw odleciał samolot, a dopiero potem przybyliśmy na lotnisko).\n\n### 2. Złote Spójniki Chronologiczne CKE:\n* `by the time...` (do czasu gdy / zanim):\n  * *Wzorzec CKE:* `By the time the fire brigade arrived, the neighbours had put out the fire.`\n* `after...` (po tym jak – po after następuje wcześniejsza czynność):\n  * *Wzorzec CKE:* `After she had finished her project, she went out for dinner.`\n* `before...` (zanim – czynność po before jest późniejsza):\n  * *Wzorzec CKE:* `He had locked all the doors before he left the house.`\n\n### 3. Cofnięcie Czasów w Mowie Zależnej (Reported Speech):\n* W zadaniach maturalnych na parafrazę wypowiedzi w Past Simple lub Present Perfect po czasowniku wprowadzającym w przeszłości (*said, told, asked*) cofają się do Past Perfect:\n  * Bezpośrednia: *„I lost my passport yesterday.”* ➔ Zależna: *He said that he `had lost` his passport.*\n  * Bezpośrednia: *„I have seen this movie.”* ➔ Zależna: *She told me that she `had seen` that movie.*\n\n### 4. Kiedy NIE UŻYWAĆ Past Perfect (Pułapka Przekombinowania):\n* Jeżeli opisujemy chronologiczną serię czynności następujących bezpośrednio jedna po drugiej, stosujemy **WYŁĄCZNIE Past Simple**:\n  * *„He woke up, brushed his teeth and left the house.”* (NIGDY: *had woken up*!).\n\n### 5. Złota Reguła Egzaminatora CKE:\nCzas Past Perfect nigdy nie występuje samotnie w próżni – musi zawsze odnosić się do innego wydarzenia w przeszłości!",
      "worked_examples": [
        {
          "title": "Przykład 1: Uzupełnianie luki z konstrukcją by the time",
          "problem": "Uzupełnij zdanie: „By the time the teacher entered the classroom, all students [...] (take) their seats.”",
          "steps": [
            {
              "num": 1,
              "label": "Ustalenie chronologii",
              "text": "Zdarzenie późniejsze: wejście nauczyciela („entered” – Past Simple). Zdarzenie wcześniejsze: zajęcie miejsc przez uczniów."
            },
            {
              "num": 2,
              "label": "Wybór czasu",
              "text": "Czynność wcześniejsza od innej przeszłej wymaga Past Perfect: had + V₃ (taken)."
            }
          ],
          "result": "had taken",
          "matura_tip": "Take jest czasownikiem nieregularnym: take – took – taken."
        },
        {
          "title": "Przykład 2: Parafraza mowy zależnej CKE",
          "problem": "Przekształć zdanie: „Mark said: 'I bought this ticket online yesterday'.”\n„Mark said that he [...] that ticket online the day before.”",
          "steps": [
            {
              "num": 1,
              "label": "Zasada cofnięcia czasów",
              "text": "Czasownik wprowadzający „said” jest w przeszłości. Past Simple („bought”) cofa się o jeden stopień do Past Perfect."
            },
            {
              "num": 2,
              "label": "Forma czasownika",
              "text": "Past Perfect dla czasownika buy to: „had bought”."
            }
          ],
          "result": "had bought",
          "matura_tip": "Zwróć uwagę na zmianę zaimków i określeń czasu: yesterday zmienia się w the day before!"
        }
      ],
      "exam_trap": "Nadużywanie Past Perfect przy prostym wymienianiu kolejnych czynności w opowiadaniu oraz zapominanie o nieregularnej III formie czasownika (np. had went zamiast had gone).",
      "matura_context": "Kluczowe w Zadaniach 8, 9 i 11 (parafrazy oraz luki leksykalno-gramatyczne) – waga: 1–2 pkt."
    },
    "taskIds": ["eng_uoe_082", "eng_uoe_097", "eng_uoe_112", "eng_uoe_127", "eng_uoe_142"]
  },
  {
    "id": "eng-lesson-1-6",
    "topicId": "eng-dzial-1",
    "pillarId": "pillar-use-of-english",
    "title": "Czasy Przyszłe: Will vs Be Going To vs Present Continuous vs Rozkłady Jazdy",
    "subtitle": "4 twarze przyszłości, spontaniczna decyzja vs zamiar vs kalendarz oraz reguła zdań czasowych",
    "estimatedMinutes": 6,
    "theoryPill": {
      "concept_essence": "Język angielski posiada 4 podstawowe sposoby mówienia o przyszłości, a egzamin maturalny bezlitośnie weryfikuje ich rozróżnienie w minidialogach i reakcjach językowych.\n\n### 1. Cztery Twarze Przyszłości w Pigułce:\n* **Will + bezokolicznik (Future Simple):**\n  * Spontaniczna decyzja podjęta w chwili mówienia: *„The phone is ringing. – I'll answer it!”*\n  * Oferta pomocy lub obietnica: *„Don't worry, I will help you with this heavy suitcase.”* / *„I promise I won't tell anyone.”*\n  * Przewidywania oparte na własnej opinii i przeczuciu (często po zwrotach: *I think, I believe, probably, I'm sure*): *„I think robots will replace many jobs in the future.”*\n* **Be going to + bezokolicznik:**\n  * Wcześniejszy zamiar, intencja lub plan w głowie (decyzja zapadła PRZED rozmową): *„I am going to study law after finishing high school.”*\n  * Przewidywanie oparte na **widocznych dowodach fizycznych**: *„Look at those dark clouds! It is going to rain.”* / *„Watch out! That cyclist is going to fall!”*\n* **Present Continuous (am/is/are + V-ing):**\n  * Ściśle zaplanowane, ustalone i potwierdzone spotkanie z inną osobą (zapisane w kalendarzu, kupione bilety): *„I am seeing my dentist tomorrow at 4 PM.”* / *„We are flying to Barcelona next Monday.”*\n* **Present Simple (V₁ / -s):**\n  * Oficjalne rozkłady jazdy, harmonogramy publiczne, godziny seansów kinowych, odjazdy pociągów: *„The train leaves at 07:15 tomorrow morning.”* / *„The chemistry exam starts at 9:00.”*\n\n### 2. Śmiertelna Pułapka CKE: Zdania Podrzędne Czasowe (Time Clauses):\n* Po spójnikach czasu: `when`, `as soon as`, `before`, `after`, `until`, `while` oraz w warunku `if`:\n  * **KATEGORYCZNY ZAKAZ UŻYCIA WILL!**\n  * Stosujemy **Present Simple**, mimo że w języku polskim myślimy o przyszłości:\n    * *POPRAWNIE:* `I will call you as soon as I arrive at the hotel.`\n    * *BŁĄD DYSKWALIFIKUJĄCY:* `as soon as I will arrive` (0 punktów!).\n\n### 3. Złota Reguła Egzaminatora CKE:\nSpontaniczna reakcja i obietnica ➔ `will`. Widoczny dowód zmysłowy ➔ `be going to`. Spotkanie w kalendarzu ➔ `Present Continuous`. Rozkład jazdy ➔ `Present Simple`. Po spójniku `when/as soon as` ➔ kasuj `will`!",
      "worked_examples": [
        {
          "title": "Przykład 1: Reakcja językowa w minidialogu maturalnym",
          "problem": "Wybierz najlepszą reakcję rozmówcy Y:\nX: „This box is way too heavy for me to lift.”\nY: „Don't worry, [...]”\nA. I am helping you.  |  B. I will help you.  |  C. I am going to help you.",
          "steps": [
            {
              "num": 1,
              "label": "Rozpoznanie funkcji językowej",
              "text": "Rozmówca Y składa spontaniczną ofertę natychmiastowej pomocy w odpowiedzi na trudność X."
            },
            {
              "num": 2,
              "label": "Dobór struktury",
              "text": "Spontaniczne oferty i decyzje podjęte w tej chwili wymagają formy „will”."
            }
          ],
          "result": "B (I will help you)",
          "matura_tip": "Nigdy nie używaj „I am helping you” w funkcji oferty pomocy!"
        },
        {
          "title": "Przykład 2: Zdanie czasowe ze spójnikiem as soon as",
          "problem": "Uzupełnij lukę: „We will start the meeting as soon as our manager [...] (arrive).”",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja spójnika czasu",
              "text": "Wyrażenie „as soon as” wprowadza zdanie podrzędne czasowe."
            },
            {
              "num": 2,
              "label": "Zastosowanie reguły Time Clause",
              "text": "Zamiast will stosujemy czas Present Simple. Dla podmiotu „our manager” (he/she) czasownik przyjmuje końcówkę -s: „arrives”."
            }
          ],
          "result": "arrives",
          "matura_tip": "Pamiętaj o dodaniu końcówki -s dla 3. osoby liczby pojedynczej!"
        }
      ],
      "exam_trap": "Wstawianie słowa „will” po spójnikach „when”, „as soon as”, „before” oraz mylenie zamiaru („I'm going to”) z oficjalnym rozkładem jazdy pociągu („The train leaves at 5:00”).",
      "matura_context": "Standardowe zagadnienie w Zadaniach 8, 9 i 10 CKE – waga: 1–2 pkt."
    },
    "taskIds": ["eng_uoe_086", "eng_uoe_087", "eng_uoe_101", "eng_uoe_102", "eng_uoe_117"]
  },
  {
    "id": "eng-lesson-1-7",
    "topicId": "eng-dzial-1",
    "pillarId": "pillar-use-of-english",
    "title": "Aspekty Ciągłe (Present Perfect Continuous) & Wielki Maturalny Miks Czasów",
    "subtitle": "Nacisk na proces trwania (have been doing), pytania How long? oraz zbiorcza mapa time-markerów",
    "estimatedMinutes": 6,
    "theoryPill": {
      "concept_essence": "Zwieńczenie działu czasów: zaawansowany aspekt ciągły oraz kompleksowa matryca decyzyjna do bezbłędnego rozwiązywania zadań egzaminacyjnych CKE.\n\n### 1. Present Perfect Continuous (Podmiot + have/has been + V-ing):\n* Kładzie nacisk na **sam proces trwania czynności** oraz czas, jaki na nią poświęcono, a nie na jej ostateczny rezultat.\n* **Typowe sytuacje maturalne:**\n  1. Czynność rozpoczęła się w przeszłości i nadal trwa, z naciskiem na długość: *„I have been waiting for you for forty minutes!”* (Ciągle czekam i jestem zniecierpliwiony).\n  2. Czynność właśnie się zakończyła, ale widać jej **bezpośredni fizyczny skutek uboczny**:\n     * *„Why are your hands dirty? – I have been repairing my bicycle.”*\n     * *„Her eyes are red because she has been crying.”*\n* **Porównanie Simple vs Continuous w Present Perfect:**\n  * `Present Perfect Simple:` *„I have painted three rooms today.”* (Nacisk na wymierny, policzalny wynik – ile pokoi gotowych).\n  * `Present Perfect Continuous:` *„I have been painting all day.”* (Nacisk na to, jak spędziłem czas – jestem zmęczony i ubrudzony farbą).\n\n### 2. Wielka Maturalna Matryca Słów-Kluczy (Time Marker Matrix):\n* `every day / usually / always / rarely` ➔ **Present Simple** (nawyk)\n* `now / at the moment / currently / Look!` ➔ **Present Continuous** (w tej chwili)\n* `yesterday / ago / last week / in 2021` ➔ **Past Simple** (zamknięta przeszłość)\n* `while / as / when (czynność przerwana)` ➔ **Past Continuous** (tło)\n* `already / just / yet / ever / never / since / for` ➔ **Present Perfect Simple** (skutek)\n* `by the time / after / before (wcześniejsza czynność)` ➔ **Past Perfect** (zaprzeszłość)\n* `as soon as / when (w zdaniu o przyszłości)` ➔ **Present Simple** (zdanie czasowe)\n* `tomorrow / next week / I think / I promise` ➔ **Future Simple (will)** (decyzja/przypuszczenie)\n\n### 3. Złoty Algorytm Egzaminacyjny w 3 Krokach:\n* **Krok 1:** Zlokalizuj słowo-klucz (time-marker) w zdaniu.\n* **Krok 2:** Sprawdź czy czasownik nie jest statyczny (*know, understand, want, believe*). Jeśli jest statyczny, ZAWSZE wybierz formę prostą (Simple)!\n* **Krok 3:** Sprawdź czy podmiot to 3. osoba l. pojedynczej (*he/she/it*), aby nie zapomnieć o końcówce -s lub operatorze has!\n\n### 4. Złota Reguła Egzaminatora CKE:\nGdy pytanie brzmi: *„How many...?”* (ile sztuk/razy) ➔ wybierz Present Perfect Simple. Gdy pytanie brzmi: *„How long...?”* (jak długo trwa proces) ➔ wybierz Present Perfect Continuous!",
      "worked_examples": [
        {
          "title": "Przykład 1: Dobór czasu na podstawie widocznego skutku fizycznego",
          "problem": "Uzupełnij minidialog: X: „Why are you breathing so heavily?” — Y: „Because I [...] (run) in the park.”",
          "steps": [
            {
              "num": 1,
              "label": "Analiza pytania",
              "text": "Pytanie dotyczy bezpośredniego, widocznego skutku fizycznego w teraźniejszości (ciężki oddech)."
            },
            {
              "num": 2,
              "label": "Wybór czasu",
              "text": "Czynność niedawno trwająca, której skutek fizyczny widzimy teraz, wymaga czasu Present Perfect Continuous: have + been + V-ing."
            }
          ],
          "result": "have been running / 've been running",
          "matura_tip": "Pamiętaj o podwojeniu litery 'n' w czasowniku run: running!"
        },
        {
          "title": "Przykład 2: Transformacja z kontrastem Simple vs Continuous",
          "problem": "Wybierz poprawną opcję: „Tom is tired because he has [...] all afternoon, but he has [...] only two chapters.”\nA. read / been reading  |  B. been reading / read  |  C. read / read",
          "steps": [
            {
              "num": 1,
              "label": "Pierwsza luka (proces)",
              "text": "Wyrażenie „all afternoon” wraz ze skutkiem „Tom is tired” kładzie nacisk na proces trwania: „been reading”."
            },
            {
              "num": 2,
              "label": "Druga luka (wynik)",
              "text": "Wyrażenie „only two chapters” podaje policzalny rezultat czynności, co wymaga Present Perfect Simple: „read”."
            }
          ],
          "result": "B (been reading / read)",
          "matura_tip": "Forma III czasownika read pisze się tak samo (read), ale wymawia się jak słowo 'red'!"
        }
      ],
      "exam_trap": "Stosowanie Present Perfect Continuous z czasownikami statycznymi (np. „I have been knowing him for years” zamiast „I have known him for years”) oraz pomijanie słowa „been” w konstrukcji (np. „I have running”).",
      "matura_context": "Zadania 8, 9 i 11 CKE (wybór wielokrotny i parafrazy ze słowem kluczem) – waga: 1–2 pkt."
    },
    "taskIds": ["eng_uoe_079", "eng_uoe_094", "eng_uoe_109", "eng_uoe_124", "eng_uoe_139"]
  },
  {
    "id": "eng-lesson-2-1",
    "topicId": "eng-dzial-2",
    "pillarId": "pillar-use-of-english",
    "title": "Gerund vs Infinitive – Formy z -ing i bezokolicznik po czasownikach",
    "subtitle": "Kluczowe rekcje czasowników oraz zmiana znaczenia przy stop, remember i forget",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Na maturze musisz wiedzieć, czy dany czasownik wymaga po sobie formy z **-ing** (gerund), czy **to + bezokolicznik** (infinitive).\n\n### 1. Złote listy czasowników CKE:\n* **Tylko forma z -ing (Gerund):**\n  * `enjoy`, `avoid`, `mind` (np. *Would you mind closing the window?*),\n  * `suggest`, `practise`, `finish`, `can't stand`, `look forward to` (uwaga: *to* jest tu przyimkiem!).\n  * **Żelazna zasada:** Po KAŻDYM przyimku (*in, at, about, without, of, for*) czasownik ZAWSZE przyjmuje formę z **-ing** (np. *interested in learning, good at drawing, thank you for coming*).\n* **Tylko to + bezokolicznik (Infinitive):**\n  * `decide to`, `hope to`, `refuse to`, `promise to`, `afford to`, `agree to`, `want to`, `manage to`.\n\n### 2. Czasowniki zmieniające znaczenie:\n* `remember to do` = pamiętać, by coś zrobić (obowiązek w przyszłości).\n* `remember doing` = pamiętać, że się coś kiedyś zrobiło (wspomnienie z przeszłości).\n* `stop to do` = zatrzymać się, ABY coś zrobić (w celu).\n* `stop doing` = przestać robić daną czynność (rzucić nawyk).",
      "worked_examples": [
        {
          "title": "Przykład 1: Wybór formy po przyimku",
          "problem": "Uzupełnij zdanie: „She left the party without [...] (say) goodbye to anyone.”",
          "steps": [
            {
              "num": 1,
              "label": "Lokalizacja wyrazu sterującego",
              "text": "Przed luką znajduje się słowo „without”, które jest przyimkiem."
            },
            {
              "num": 2,
              "label": "Zastosowanie reguły",
              "text": "Po każdym przyimku czasownik musi mieć końcówkę -ing."
            }
          ],
          "result": "saying",
          "matura_tip": "Nawet jeśli po polsku mówimy „bez pożegnania” (rzeczownik) lub „nie żegnając się”, po angielsku to zawsze forma -ing."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Wybór formy po przyimku",
        "problem": "Uzupełnij zdanie: „She left the party without [...] (say) goodbye to anyone.”",
        "steps": [
          {
            "num": 1,
            "label": "Lokalizacja wyrazu sterującego",
            "text": "Przed luką znajduje się słowo „without”, które jest przyimkiem."
          },
          {
            "num": 2,
            "label": "Zastosowanie reguły",
            "text": "Po każdym przyimku czasownik musi mieć końcówkę -ing."
          }
        ],
        "result": "saying",
        "matura_tip": "Nawet jeśli po polsku mówimy „bez pożegnania” (rzeczownik) lub „nie żegnając się”, po angielsku to zawsze forma -ing."
      },
      "exam_trap": "Błąd przy konstrukcji „look forward to”! Maturzyści widzą „to” i myślą, że to bezokolicznik. W rzeczywistości „to” jest przyimkiem, dlatego poprawna forma to: „I look forward to hearing from you” (NIGDY: „to hear”).",
      "matura_context": "Pojawia się w każdym teście luk i parafraz – 1–2 punkty."
    },
    "taskIds": [
      "eng_uoe_001",
      "eng_uoe_002",
      "eng_uoe_003",
      "eng_uoe_004",
      "eng_uoe_005"
    ]
  },
  {
    "id": "eng-lesson-2-2",
    "topicId": "eng-dzial-2",
    "pillarId": "pillar-use-of-english",
    "title": "Czasowniki modalne: Must, Can't, Should, Have to w zadaniach CKE",
    "subtitle": "Logiczna dedukcja, powinność i brak konieczności (don't have to vs mustn't)",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Czasowniki modalne na maturze podstawowej sprawdzają precyzję myślenia o zasadach, zakazach i logicznym wnioskowaniu.\n\n### 1. Obowiązek, zakaz i brak konieczności:\n* **Must:** Wewnętrzny nakaz, silne przekonanie mówcy („I must call my mom”).\n* **Have to:** Zewnętrzny obowiązek narzucony przepisami, pracą, szkołą („I have to wear a uniform”).\n* **Mustn't (ZAKAZ):** Kategoryczny zakaz! Robienie tego jest nielegalne lub niebezpieczne („You mustn't park here”).\n* **Don't have to / Needn't (BRAK KONIECZNOŚCI):** Nie musisz, ale możesz, jeśli chcesz („Tomorrow is Sunday, so I don't have to wake up early”).\n\n### 2. Logiczna dedukcja w teraźniejszości:\n* **Must be:** Z pewnością tak jest, na 99% prawda („He has three sports cars. He must be very rich.”).\n* **Can't be:** To niemożliwe, na 99% nieprawda („She can't be at school today, she is ill in bed.”).",
      "worked_examples": [
        {
          "title": "Przykład 1: Rozróżnienie zakazu i braku konieczności",
          "problem": "Wybierz: „You [...] touch this wire! It is extremely dangerous.”\nA. mustn't  |  B. don't have to  |  C. shouldn't",
          "steps": [
            {
              "num": 1,
              "label": "Ocena powagi sytuacji",
              "text": "Kabel jest skrajnie niebezpieczny, więc dotknięcie go grozi porażeniem – mamy bezwzględny zakaz."
            },
            {
              "num": 2,
              "label": "Wybór modalnego",
              "text": "„Don't have to” oznacza opcjonalność, a „mustn't” oznacza ścisły zakaz."
            }
          ],
          "result": "A (mustn't)",
          "matura_tip": "Polskie „nie musisz” to ZAWSZE „don't have to”, NIGDY „mustn't”!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Rozróżnienie zakazu i braku konieczności",
        "problem": "Wybierz: „You [...] touch this wire! It is extremely dangerous.”\nA. mustn't  |  B. don't have to  |  C. shouldn't",
        "steps": [
          {
            "num": 1,
            "label": "Ocena powagi sytuacji",
            "text": "Kabel jest skrajnie niebezpieczny, więc dotknięcie go grozi porażeniem – mamy bezwzględny zakaz."
          },
          {
            "num": 2,
            "label": "Wybór modalnego",
            "text": "„Don't have to” oznacza opcjonalność, a „mustn't” oznacza ścisły zakaz."
          }
        ],
        "result": "A (mustn't)",
        "matura_tip": "Polskie „nie musisz” to ZAWSZE „don't have to”, NIGDY „mustn't”!"
      },
      "exam_trap": "Mylenie „mustn't” z „don't have to”! Pamiętaj: „You don't have to go” = masz wybór. „You mustn't go” = nie wolno ci wyjść.",
      "matura_context": "Pewniak w parafrazach i minidialogach – 1 punkt."
    },
    "taskIds": [
      "eng_uoe_006",
      "eng_uoe_007",
      "eng_uoe_008",
      "eng_uoe_009",
      "eng_uoe_010"
    ]
  },
  {
    "id": "eng-lesson-2-3",
    "topicId": "eng-dzial-2",
    "pillarId": "pillar-use-of-english",
    "title": "Minidialogi i oficjalny vs nieoficjalny rejestr w reakcjach językowych",
    "subtitle": "Reakcje na propozycje, przeprosiny, prośby o opinię i podziękowania",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Zadanie 9 CKE sprawdza naturalność reakcji językowych w codziennych sytuacjach. Kluczem jest wyczucie rejestru (nieformalny z kolegą vs uprzejmy z nieznajomym) oraz idiomatycznych zwrotów.\n\n### 1. Złoty kanon reakcji językowych CKE:\n* **Pytanie o drogę / pomoc:** „Could you tell me how to get to...?” -> Reakcja: „Go straight on and take the second turning on your left.”\n* **Zgoda i odmowa na propozycję:**\n  * „Why don't we go to the cinema?” -> „I'd love to, but I'm busy” / „Sounds like a great plan!”\n* **Życzenia i gratulacje:**\n  * „I passed my driving test!” -> „Congratulations! I'm so happy for you!” (NIGDY: „I congratulate you”).\n  * „I'm taking my matura exam tomorrow.” -> „Fingers crossed! / Good luck!”\n* **Reakcja na podziękowanie:** „Thank you so much!” -> „You're welcome / Don't mention it / Not at all.”",
      "worked_examples": [
        {
          "title": "Przykład 1: Reakcja na komplement",
          "problem": "X: „What a lovely jacket you're wearing!”\nY: „[...]”\nA. Never mind.  |  B. Thank you, I'm glad you like it.  |  C. No problem.",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja funkcji wypowiedzi",
              "text": "Rozmówca X prawi komplement na temat ubioru."
            },
            {
              "num": 2,
              "label": "Naturalna odpowiedź kulturowa",
              "text": "Na komplement w języku angielskim odpowiadamy uprzejmym podziękowaniem."
            }
          ],
          "result": "B",
          "matura_tip": "„Never mind” oznacza „Nieważne / Nic nie szkodzi” w reakcji na przeprosiny, nie pasuje do komplementu."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Reakcja na komplement",
        "problem": "X: „What a lovely jacket you're wearing!”\nY: „[...]”\nA. Never mind.  |  B. Thank you, I'm glad you like it.  |  C. No problem.",
        "steps": [
          {
            "num": 1,
            "label": "Identyfikacja funkcji wypowiedzi",
            "text": "Rozmówca X prawi komplement na temat ubioru."
          },
          {
            "num": 2,
            "label": "Naturalna odpowiedź kulturowa",
            "text": "Na komplement w języku angielskim odpowiadamy uprzejmym podziękowaniem."
          }
        ],
        "result": "B",
        "matura_tip": "„Never mind” oznacza „Nieważne / Nic nie szkodzi” w reakcji na przeprosiny, nie pasuje do komplementu."
      },
      "exam_trap": "Kalka z języka polskiego: „Please” jako odpowiedź na „Thank you”! Po angielsku „Proszę” w odpowiedzi na podziękowanie to ZAWSZE „You're welcome”, a nigdy samo słowo „Please”.",
      "matura_context": "Zadanie 9 w arkuszu maturalnym – 3–4 punkty."
    },
    "taskIds": [
      "eng_uoe_011",
      "eng_uoe_012",
      "eng_uoe_013",
      "eng_uoe_014",
      "eng_uoe_015"
    ]
  },
  {
    "id": "eng-lesson-3-1",
    "topicId": "eng-dzial-3",
    "pillarId": "pillar-use-of-english",
    "title": "Zero & First Conditional – Prawdy ogólne i realne plany z if / unless",
    "subtitle": "Niezmienne prawa natury oraz prawdopodobna przyszłość w strukturach CKE",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Okresy warunkowe to filar gramatyki na maturze. Zero i First Conditional opisują sytuacje rzeczywiste.\n\n### 1. Zero Conditional (Fakty i prawa natury):\n* **Struktura:** `If + Present Simple, ... Present Simple`\n* *Przykład:* „If you heat ice, it melts.” (Gdy podgrzewasz lód, on topnieje).\n* Stosujemy, gdy rezultat jest ZAWSZE pewny i niezmienny.\n\n### 2. First Conditional (Realna przyszłość):\n* **Struktura:** `If + Present Simple, ... will + bezokolicznik`\n* *Przykład:* „If it rains tomorrow, we will stay at home.” (Jeśli jutro będzie padać, zostaniemy w domu).\n* **Żelazna reguła egzaminatora:** Po słówku `if` NIGDY nie wstawiamy `will`!\n\n### 3. Pułapka słówka UNLESS:\n* `Unless` oznacza dokładnie to samo co `If ... not` (chyba że / jeśli nie).\n* Ponieważ samo `unless` zawiera w sobie przeczenie, czasownik po nim musi być TWIERDZĄCY!\n* *Przykład:* „Unless you study, you will fail.” = „If you do not study, you will fail.”",
      "worked_examples": [
        {
          "title": "Przykład 1: Parafraza z użyciem unless",
          "problem": "Przekształć zdanie: „If we don't leave now, we will miss the bus.”\nUżyj: UNLESS\nOdpowiedź: „[...] now, we will miss the bus.”",
          "steps": [
            {
              "num": 1,
              "label": "Zastąpienie if + not",
              "text": "Zastępujemy frazę „If we don't leave” słowem „Unless”."
            },
            {
              "num": 2,
              "label": "Czasownik w twierdzeniu",
              "text": "Po unless czasownik przyjmuje postać twierdzącą: „Unless we leave”."
            }
          ],
          "result": "Unless we leave",
          "matura_tip": "Nigdy nie pisz „Unless we don't leave” – to byłoby podwójne zaprzeczenie!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Parafraza z użyciem unless",
        "problem": "Przekształć zdanie: „If we don't leave now, we will miss the bus.”\nUżyj: UNLESS\nOdpowiedź: „[...] now, we will miss the bus.”",
        "steps": [
          {
            "num": 1,
            "label": "Zastąpienie if + not",
            "text": "Zastępujemy frazę „If we don't leave” słowem „Unless”."
          },
          {
            "num": 2,
            "label": "Czasownik w twierdzeniu",
            "text": "Po unless czasownik przyjmuje postać twierdzącą: „Unless we leave”."
          }
        ],
        "result": "Unless we leave",
        "matura_tip": "Nigdy nie pisz „Unless we don't leave” – to byłoby podwójne zaprzeczenie!"
      },
      "exam_trap": "Wstawianie „will” po „if”: „If it will rain tomorrow...” to błąd kardynalny! W części warunkowej po if zawsze stosujemy czas teraźniejszy (Present Simple).",
      "matura_context": "Pojawia się w niemal każdym arkuszu w zadaniach 8 i 11 – 1–2 punkty."
    },
    "taskIds": [
      "eng_uoe_331",
      "eng_uoe_332",
      "eng_uoe_333",
      "eng_uoe_334",
      "eng_uoe_335"
    ]
  },
  {
    "id": "eng-lesson-3-2",
    "topicId": "eng-dzial-3",
    "pillarId": "pillar-use-of-english",
    "title": "Second Conditional – Gdybanie i rady („If I were you”)",
    "subtitle": "Nierealne warunki w teraźniejszości i dawanie wskazówek w zadaniach otwartych",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Second Conditional (drugi okres warunkowy) służy do mówienia o sytuacjach hipotetycznych, nierealnych marzeniach oraz udzielaniu rad.\n\n### 1. Budowa Drugiego Okresu Warunkowego:\n* **Struktura:** `If + Past Simple, ... would + bezokolicznik`\n* *Przykład:* „If I had a million dollars, I would travel around the world.” (Gdybym miał milion dolarów [a nie mam], podróżowałbym dookoła świata).\n* Zamiast `would` możemy użyć `could` (mógłbym) lub `might` (być może bym).\n\n### 2. Formuła dawania rad (If I were you):\n* Na maturze tradycyjna i rekomendowana forma czasownika „to be” dla wszystkich osób (w tym *I, he, she*) to **were**:\n* `If I were you, I would talk to the teacher.` (Na Twoim miejscu porozmawiałbym z nauczycielem).",
      "worked_examples": [
        {
          "title": "Przykład 1: Przekształcenie ze zwrotem doradczym",
          "problem": "Uzupełnij: „You should go to bed earlier.” -> „If I [...] you, I would go to bed earlier.”",
          "steps": [
            {
              "num": 1,
              "label": "Rozpoznanie idiomu",
              "text": "Zdanie wyraża radę („You should”). Odpowiednikiem jest idiomatyczny drugi okres warunkowy."
            },
            {
              "num": 2,
              "label": "Forma czasownika be",
              "text": "Oficjalna forma w konstrukcji to „were”."
            }
          ],
          "result": "were",
          "matura_tip": "Forma „was” bywa potocznie tolerowana, ale klucz CKE jako wzorzec preferuje „were”."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Przekształcenie ze zwrotem doradczym",
        "problem": "Uzupełnij: „You should go to bed earlier.” -> „If I [...] you, I would go to bed earlier.”",
        "steps": [
          {
            "num": 1,
            "label": "Rozpoznanie idiomu",
            "text": "Zdanie wyraża radę („You should”). Odpowiednikiem jest idiomatyczny drugi okres warunkowy."
          },
          {
            "num": 2,
            "label": "Forma czasownika be",
            "text": "Oficjalna forma w konstrukcji to „were”."
          }
        ],
        "result": "were",
        "matura_tip": "Forma „was” bywa potocznie tolerowana, ale klucz CKE jako wzorzec preferuje „were”."
      },
      "exam_trap": "Mylenie First z Second Conditional! Zwróć uwagę na rezultat: jeśli w zdaniu głównym jest „will”, w warunku musi być Present Simple. Jeśli w zdaniu głównym jest „would”, w warunku musi być Past Simple!",
      "matura_context": "Pewniak w parafrazach ze słowem-kluczem i tłumaczeniach zdań – 1 punkt."
    },
    "taskIds": [
      "eng_uoe_336",
      "eng_uoe_337",
      "eng_uoe_338",
      "eng_uoe_339",
      "eng_uoe_340"
    ]
  },
  {
    "id": "eng-lesson-3-3",
    "topicId": "eng-dzial-3",
    "pillarId": "pillar-use-of-english",
    "title": "Zdania czasowe z as soon as, when, until oraz konstrukcje w lukach",
    "subtitle": "Rygorystyczna reguła czasu teraźniejszego po spójnikach czasu w przyszłości",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Zdania czasowe (Time Clauses) w języku angielskim podlegają tej samej żelaznej regule co okresy warunkowe:\n\n### 1. Spójniki czasowe odcinające „will”:\nGdy mówimy o przyszłości, po następujących spójnikach **nie wolno** użyć czasu przyszłego (will). Zamiast tego stosujemy **Present Simple**:\n* `when` (kiedy)\n* `as soon as` (jak tylko)\n* `until / till` (dopóki nie / aż do momentu gdy)\n* `before` (zanim)\n* `after` (po tym jak)\n\n### 2. Porównanie wzorców:\n* `I will call you as soon as I get home.` (Zadzwonię, jak tylko dotrę do domu).\n* `We will wait here until she finishes her exam.` (Poczekamy tutaj, dopóki ona nie skończy egzaminu).",
      "worked_examples": [
        {
          "title": "Przykład 1: Luka ze spójnikiem as soon as",
          "problem": "Uzupełnij: „I will give Tom the book as soon as I [...] (see) him tomorrow.”",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja łącznika",
              "text": "Występuje spójnik czasowy „as soon as”."
            },
            {
              "num": 2,
              "label": "Czas po łączniku",
              "text": "Mimo odniesienia do jutra („tomorrow”), po as soon as stosujemy Present Simple."
            }
          ],
          "result": "see",
          "matura_tip": "Napisanie „as soon as I will see” to gwarantowana utrata punktu!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Luka ze spójnikiem as soon as",
        "problem": "Uzupełnij: „I will give Tom the book as soon as I [...] (see) him tomorrow.”",
        "steps": [
          {
            "num": 1,
            "label": "Identyfikacja łącznika",
            "text": "Występuje spójnik czasowy „as soon as”."
          },
          {
            "num": 2,
            "label": "Czas po łączniku",
            "text": "Mimo odniesienia do jutra („tomorrow”), po as soon as stosujemy Present Simple."
          }
        ],
        "result": "see",
        "matura_tip": "Napisanie „as soon as I will see” to gwarantowana utrata punktu!"
      },
      "exam_trap": "Kalka ze słowem „until”! W języku polskim mówimy „poczekam, aż nie przyjdzie” (z przeczeniem). W angielskim „until” oznacza stan do momentu zajścia faktu: „Wait until he arrives” (twierdzenie!).",
      "matura_context": "Zadania 8 i 11 – 1 punkt."
    },
    "taskIds": [
      "eng_uoe_341",
      "eng_uoe_342",
      "eng_uoe_343",
      "eng_uoe_344",
      "eng_uoe_345"
    ]
  },
  {
    "id": "eng-lesson-4-1",
    "topicId": "eng-dzial-4",
    "pillarId": "pillar-use-of-english",
    "title": "Przedrostki zaprzeczające un-, in-, im-, dis- i ir- w zadaniach CKE",
    "subtitle": "Jak tworzyć antonimy i nie pomylić dopasowania przedrostka do litery początkowej",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Słowotwórstwo w zadaniach otwartych CKE często wymaga utworzenia wyrazu o przeciwnym znaczeniu za pomocą prefiksu:\n\n### 1. Złote zasady dopasowania prefiksów:\n* **im-** stosujemy najczęściej przed literami **m** oraz **p**:\n  * *possible -> impossible*, *polite -> impolite*, *patient -> impatient*, *mature -> immature*.\n* **ir-** stosujemy przed literą **r**:\n  * *responsible -> irresponsible*, *regular -> irregular*.\n* **il-** stosujemy przed literą **l**:\n  * *legal -> illegal*, *logical -> illogical*.\n* **dis-** łączy się często z czasownikami i przymiotnikami:\n  * *agree -> disagree*, *appear -> disappear*, *honest -> dishonest*, *like -> dislike*.\n* **un-** to najbardziej uniwersalny przedrostek negujący:\n  * *happy -> unhappy*, *known -> unknown*, *comfortable -> uncomfortable*, *lucky -> unlucky*.",
      "worked_examples": [
        {
          "title": "Przykład 1: Kontekstowe zaprzeczenie przymiotnika",
          "problem": "Uzupełnij: „It was very [...] (RESPONSIBLE) of him to leave the door unlocked all night.”",
          "steps": [
            {
              "num": 1,
              "label": "Ocena sensu zdania",
              "text": "Zostawienie otwartych drzwi na całą noc było lekkomyślne / nieodpowiedzialne."
            },
            {
              "num": 2,
              "label": "Dobór prefiksu negującego",
              "text": "Dla słowa na literę „r” (responsible) prefiksem jest „ir-”."
            }
          ],
          "result": "irresponsible",
          "matura_tip": "Zawsze czytaj całe zdanie do końca! Często baza słowotwórcza pasuje gramatycznie, ale sens wymaga antonimu."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Kontekstowe zaprzeczenie przymiotnika",
        "problem": "Uzupełnij: „It was very [...] (RESPONSIBLE) of him to leave the door unlocked all night.”",
        "steps": [
          {
            "num": 1,
            "label": "Ocena sensu zdania",
            "text": "Zostawienie otwartych drzwi na całą noc było lekkomyślne / nieodpowiedzialne."
          },
          {
            "num": 2,
            "label": "Dobór prefiksu negującego",
            "text": "Dla słowa na literę „r” (responsible) prefiksem jest „ir-”."
          }
        ],
        "result": "irresponsible",
        "matura_tip": "Zawsze czytaj całe zdanie do końca! Często baza słowotwórcza pasuje gramatycznie, ale sens wymaga antonimu."
      },
      "exam_trap": "Niedokładne czytanie kontekstu! Jeśli uczeń wpisze słowo bazowe bez prefiksu zaprzeczającego, zdanie staje się nielogiczne i egzaminator przyznaje 0 punktów.",
      "matura_context": "Zadanie 10 lub 11 CKE (słowotwórstwo w tekście) – 1 punkt."
    },
    "taskIds": [
      "eng_uoe_151",
      "eng_uoe_152",
      "eng_uoe_153",
      "eng_uoe_154",
      "eng_uoe_155"
    ]
  },
  {
    "id": "eng-lesson-4-2",
    "topicId": "eng-dzial-4",
    "pillarId": "pillar-use-of-english",
    "title": "Sufiksy tworzące rzeczowniki i przymiotniki (-tion, -ment, -ful, -less, -ity)",
    "subtitle": "Rozpoznawanie brakującej części mowy w luce i bezbłędny zapis ortograficzny",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Aby bezbłędnie rozwiązać zadanie słowotwórcze, musisz najpierw ustalić, jakiej części mowy brakuje w luce:\n\n### 1. Rozpoznawanie części mowy z pozycji w zdaniu:\n* Przedimek + luka + rzeczownik -> potrzebujesz **przymiotnika** (np. *a SUCCESSFUL career*).\n* Przedimek + luka + czasownik -> potrzebujesz **rzecznika** (np. *the DECISION was made*).\n* Czasownik + luka -> potrzebujesz **przysłówka** z końcówką `-ly` (np. *drove CAREFULLY*).\n\n### 2. Najpopularniejsze sufiksy maturalne:\n* **Rzeczowniki:** `-tion` (*inform -> information*), `-ment` (*develop -> development*), `-ness` (*dark -> darkness*), `-ity` (*active -> activity*).\n* **Przymiotniki:** `-ful` (*hope -> hopeful*), `-less` (*care -> careless*), `-ous` (*danger -> dangerous*), `-able` (*comfort -> comfortable*).",
      "worked_examples": [
        {
          "title": "Przykład 1: Zamiana czasownika na rzeczownik",
          "problem": "Uzupełnij: „We need your [...] (CONFIRM) before we can send the package.”",
          "steps": [
            {
              "num": 1,
              "label": "Analiza pozycji",
              "text": "Po zaimku dzierżawczym „your” musi wystąpić rzeczownik."
            },
            {
              "num": 2,
              "label": "Transformacja sufixem",
              "text": "Czasownik confirm tworzy rzeczownik za pomocą sufiksu -ation."
            }
          ],
          "result": "confirmation",
          "matura_tip": "Uważaj na pisownię – litera „e” często zanika przed samogłoską w sufiksie (np. decide -> decision)."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Zamiana czasownika na rzeczownik",
        "problem": "Uzupełnij: „We need your [...] (CONFIRM) before we can send the package.”",
        "steps": [
          {
            "num": 1,
            "label": "Analiza pozycji",
            "text": "Po zaimku dzierżawczym „your” musi wystąpić rzeczownik."
          },
          {
            "num": 2,
            "label": "Transformacja sufixem",
            "text": "Czasownik confirm tworzy rzeczownik za pomocą sufiksu -ation."
          }
        ],
        "result": "confirmation",
        "matura_tip": "Uważaj na pisownię – litera „e” często zanika przed samogłoską w sufiksie (np. decide -> decision)."
      },
      "exam_trap": "Błędy literowe w pisowni sufiksów! CKE nie uznaje odpowiedzi z błędem ortograficznym, np. „developement” zamiast „development” lub „beautyful” zamiast „beautiful”.",
      "matura_context": "Zadania 10 i 11 – 1–2 punkty."
    },
    "taskIds": [
      "eng_uoe_156",
      "eng_uoe_157",
      "eng_uoe_158",
      "eng_uoe_159",
      "eng_uoe_160"
    ]
  },
  {
    "id": "eng-lesson-4-3",
    "topicId": "eng-dzial-4",
    "pillarId": "pillar-use-of-english",
    "title": "Leksykalne False Friends – Pułapki fałszywych przyjaciół na maturze",
    "subtitle": "Wyrazy brzmiące identycznie jak polskie słowa, ale o zupełnie innym znaczeniu",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "False Friends (fałszywi przyjaciele) to ulubiona broń autorów arkuszy CKE w dystraktorach zadań wielokrotnego wyboru.\n\n### 1. Zestawienie 6 największych pułapek CKE:\n* **Actually:** Nie oznacza „aktualnie”! Oznacza **„tak naprawdę / w rzeczywistości”**. „Aktualnie” to `currently` lub `at present`.\n* **Eventual / Eventually:** Nie oznacza „ewentualny / ewentualnie”! Oznacza **„ostateczny / w końcu / ostatecznie”**. „Ewentualnie” to `possibly` lub `if necessary`.\n* **Sympathetic:** Nie oznacza „sympatyczny”! Oznacza **„współczujący / pełen zrozumienia”**. „Sympatyczny” to `nice`, `friendly` lub `likeable`.\n* **Receipt:** To nie jest „recepta lekarska”! To **„paragon fiskalny”**. Recepta to `prescription`.\n* **Chef:** To nie jest „szef w biurze”! To **„szef kuchni / kucharz”**. Szef w pracy to `boss` lub `manager`.\n* **Fabric:** To nie jest „fabryka”! To **„tkanina / materiał”**. Fabryka to `factory`.",
      "worked_examples": [
        {
          "title": "Przykład 1: Eliminacja w teście ABC",
          "problem": "Wybierz: „I thought the exam would be hard, but [...] it was quite easy.”\nA. actually  |  B. currently  |  C. eventually",
          "steps": [
            {
              "num": 1,
              "label": "Sens zdania",
              "text": "Autor porównuje swoje wcześniejsze wyobrażenie z rzeczywistością: „ale tak naprawdę był całkiem prosty”."
            },
            {
              "num": 2,
              "label": "Wybór wyrazu",
              "text": "„Actually” znaczy „tak naprawdę / w rzeczywistości”."
            }
          ],
          "result": "A (actually)",
          "matura_tip": "Gdy widzisz słowo „actually” w opcjach, zastanów się dwa razy – to najczęstsza pułapka egzaminu!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Eliminacja w teście ABC",
        "problem": "Wybierz: „I thought the exam would be hard, but [...] it was quite easy.”\nA. actually  |  B. currently  |  C. eventually",
        "steps": [
          {
            "num": 1,
            "label": "Sens zdania",
            "text": "Autor porównuje swoje wcześniejsze wyobrażenie z rzeczywistością: „ale tak naprawdę był całkiem prosty”."
          },
          {
            "num": 2,
            "label": "Wybór wyrazu",
            "text": "„Actually” znaczy „tak naprawdę / w rzeczywistości”."
          }
        ],
        "result": "A (actually)",
        "matura_tip": "Gdy widzisz słowo „actually” w opcjach, zastanów się dwa razy – to najczęstsza pułapka egzaminu!"
      },
      "exam_trap": "Kalka myślowa przy słowie „receipt” – uczeń widzi scenę u lekarza i wybiera „receipt”, podczas gdy lekarz wystawia „prescription”.",
      "matura_context": "Zadania 8 i 9 – 1 punkt."
    },
    "taskIds": [
      "eng_uoe_161",
      "eng_uoe_162",
      "eng_uoe_163",
      "eng_uoe_164",
      "eng_uoe_165"
    ]
  },
  {
    "id": "eng-lesson-5-1",
    "topicId": "eng-dzial-5",
    "pillarId": "pillar-use-of-english",
    "title": "Strona bierna (Passive Voice) w transformacjach maturalnych",
    "subtitle": "Przekształcanie zdań z zachowaniem czasu gramatycznego i dopasowaniem liczby",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Strona bierna pojawia się w arkuszu maturalnym w niemal każdej sesji. Kluczem jest zachowanie TEGO SAMEGO czasu gramatycznego!\n\n### 1. Uniwersalny algorytm strony biernej:\nDopełnienie staje się podmiotem + **odpowiednia forma czasownika „to be”** + **V₃ (trzecia forma czasownika głównego)**.\n\n### 2. Tabela czasów w stronie biernej:\n* **Present Simple:** `am / is / are + V₃` (The room is cleaned every day).\n* **Past Simple:** `was / were + V₃` (The bridge was built in 1995).\n* **Present Perfect:** `has been / have been + V₃` (The car has been repaired).\n* **Czasowniki modalne:** `modal + be + V₃` (It can be done / Tickets must be shown).",
      "worked_examples": [
        {
          "title": "Przykład 1: Parafraza ze słowem kluczem",
          "problem": "Przekształć zdanie: „Someone stole my bike last night.”\nSłowo-klucz: WAS\n„My bike [...] last night.”",
          "steps": [
            {
              "num": 1,
              "label": "Rozpoznanie czasu wyjściowego",
              "text": "Zdanie wyjściowe jest w Past Simple („stole”)."
            },
            {
              "num": 2,
              "label": "Forma strony biernej w Past Simple",
              "text": "Podmiot „My bike” jest w liczbie pojedynczej, więc: was + V₃ czasownika steal (stolen)."
            }
          ],
          "result": "was stolen",
          "matura_tip": "Sprawdź formę nieregularną: steal - stole - stolen. Pomyłka w III formie oznacza 0 punktów."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Parafraza ze słowem kluczem",
        "problem": "Przekształć zdanie: „Someone stole my bike last night.”\nSłowo-klucz: WAS\n„My bike [...] last night.”",
        "steps": [
          {
            "num": 1,
            "label": "Rozpoznanie czasu wyjściowego",
            "text": "Zdanie wyjściowe jest w Past Simple („stole”)."
          },
          {
            "num": 2,
            "label": "Forma strony biernej w Past Simple",
            "text": "Podmiot „My bike” jest w liczbie pojedynczej, więc: was + V₃ czasownika steal (stolen)."
          }
        ],
        "result": "was stolen",
        "matura_tip": "Sprawdź formę nieregularną: steal - stole - stolen. Pomyłka w III formie oznacza 0 punktów."
      },
      "exam_trap": "Niewłaściwa liczba czasownika „to be”! Gdy zamieniasz dopełnienie w liczbie mnogiej na podmiot, czasownik musi być w liczbie mnogiej (np. „The letters WERE sent”, a nie „was sent”).",
      "matura_context": "Pewniak Zadania 11 CKE (parafrazy) – 1 punkt."
    },
    "taskIds": [
      "eng_uoe_211",
      "eng_uoe_212",
      "eng_uoe_213",
      "eng_uoe_214",
      "eng_uoe_215"
    ]
  },
  {
    "id": "eng-lesson-5-2",
    "topicId": "eng-dzial-5",
    "pillarId": "pillar-use-of-english",
    "title": "Mowa zależna (Reported Speech) i pytania pośrednie w kluczu CKE",
    "subtitle": "Zasada cofnięcia czasów (Backshift) oraz prosty szyk zdania w pytaniach pośrednich",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Relacjonowanie wypowiedzi innych osób wymaga znajomości reguły cofnięcia czasów gramatycznych:\n\n### 1. Zasada cofania czasów (Backshift of Tenses):\n* Present Simple -> **Past Simple** (am/is/are -> was/were, like -> liked).\n* Present Continuous -> **Past Continuous** (is doing -> was doing).\n* Past Simple / Present Perfect -> **Past Perfect** (went / have gone -> had gone).\n* will -> **would**, can -> **could**.\n\n### 2. Pytania pośrednie (Indirect Questions):\nPytanie pośrednie traci strukturę pytania i przyjmuje **zwykły szyk zdania oznajmującego** (bez did, does, do):\n* „Where does he live?” -> „Can you tell me where he lives?”\n* „What time is it?” -> „Do you know what time it is?” (NIGDY: what time is it).",
      "worked_examples": [
        {
          "title": "Przykład 1: Szyk w pytaniu pośrednim",
          "problem": "Uzupełnij: „Could you tell me how much [...]?”\nA. does this ticket cost  |  B. this ticket costs  |  C. costs this ticket",
          "steps": [
            {
              "num": 1,
              "label": "Struktura pytania pośredniego",
              "text": "Po zwrocie wprowadzającym „Could you tell me...” następuje szyk zdania twierdzącego: podmiot + orzeczenie."
            },
            {
              "num": 2,
              "label": "Wybór opcji",
              "text": "Prawidłowy szyk to: this ticket (podmiot) costs (orzeczenie)."
            }
          ],
          "result": "B",
          "matura_tip": "W pytaniu pośrednim operator „does” całkowicie znika!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Szyk w pytaniu pośrednim",
        "problem": "Uzupełnij: „Could you tell me how much [...]?”\nA. does this ticket cost  |  B. this ticket costs  |  C. costs this ticket",
        "steps": [
          {
            "num": 1,
            "label": "Struktura pytania pośredniego",
            "text": "Po zwrocie wprowadzającym „Could you tell me...” następuje szyk zdania twierdzącego: podmiot + orzeczenie."
          },
          {
            "num": 2,
            "label": "Wybór opcji",
            "text": "Prawidłowy szyk to: this ticket (podmiot) costs (orzeczenie)."
          }
        ],
        "result": "B",
        "matura_tip": "W pytaniu pośrednim operator „does” całkowicie znika!"
      },
      "exam_trap": "Stosowanie inwersji i operatora did/does w pytaniu pośrednim: „Can you tell me where do you live?” to jeden z najczęstszych błędów na maturze!",
      "matura_context": "Zadania 9 i 11 – 1 punkt."
    },
    "taskIds": [
      "eng_uoe_216",
      "eng_uoe_217",
      "eng_uoe_218",
      "eng_uoe_219",
      "eng_uoe_220"
    ]
  },
  {
    "id": "eng-lesson-5-3",
    "topicId": "eng-dzial-5",
    "pillarId": "pillar-use-of-english",
    "title": "Konstrukcje kluczowe: so / such, too / enough oraz used to w tłumaczeniach PL->EN",
    "subtitle": "Niezbędnik transformacji zdań i tłumaczeń fragmentów w Formule 2023",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Trzy potężne konstrukcje gramatyczne, które pojawiają się w każdym arkuszu maturalnym:\n\n### 1. So vs Such (a):\n* `so + przymiotnik:` „He was so tired that he fell asleep.”\n* `such + (a/an) + przymiotnik + rzeczownik:` „It was such a boring film that I left.”\n\n### 2. Too vs Enough:\n* `too + przymiotnik (zbyt...):` „This coffee is too hot to drink.”\n* `przymiotnik + enough (wystarczająco...):` „He is old enough to drive a car.” (Uwaga na pozycję: przymiotnik stoi PRZED enough!).\n\n### 3. Used to (Dawne nawyki):\n* Wyraża nawyki lub stany z przeszłości, które są już nieaktualne:\n* „I used to play tennis every week, but now I don't have time.”\n* W przeczeniach: `didn't use to` (bez litery „d”!).",
      "worked_examples": [
        {
          "title": "Przykład 1: Pozycja słowa enough",
          "problem": "Przekształć zdanie: „I can't buy this laptop because it is too expensive.”\nUżyj: ENOUGH\n„I don't have [...] to buy this laptop.”",
          "steps": [
            {
              "num": 1,
              "label": "Dopasowanie z rzeczownikiem",
              "text": "Z rzeczownikiem (pieniądze - money) słowo enough stoi PRZED nim: enough money."
            }
          ],
          "result": "enough money",
          "matura_tip": "Przymiotnik stoi przed enough (warm enough), ale rzeczownik stoi PO enough (enough money)."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Pozycja słowa enough",
        "problem": "Przekształć zdanie: „I can't buy this laptop because it is too expensive.”\nUżyj: ENOUGH\n„I don't have [...] to buy this laptop.”",
        "steps": [
          {
            "num": 1,
            "label": "Dopasowanie z rzeczownikiem",
            "text": "Z rzeczownikiem (pieniądze - money) słowo enough stoi PRZED nim: enough money."
          }
        ],
        "result": "enough money",
        "matura_tip": "Przymiotnik stoi przed enough (warm enough), ale rzeczownik stoi PO enough (enough money)."
      },
      "exam_trap": "Błędny zapis w przeczeniu: „didn't used to”. Pamiętaj, że operator „did” przejmuje formę przeszłą, więc czasownik wraca do bezokolicznika: „didn't use to”.",
      "matura_context": "Zadanie 11 (tłumaczenie fragmentów zdań) – 1–2 punkty."
    },
    "taskIds": [
      "eng_uoe_221",
      "eng_uoe_222",
      "eng_uoe_223",
      "eng_uoe_224",
      "eng_uoe_225"
    ]
  },
  {
    "id": "eng-lesson-6-1",
    "topicId": "eng-dzial-6",
    "pillarId": "pillar-listening",
    "title": "Wychwytywanie intencji i nastawienia emocjonalnego mówcy ze słuchu",
    "subtitle": "Rozpoznawanie czy głośnik przeprasza, doradza, narzeka czy zachęca do działania",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W zadaniu 1 na maturze pytanie często dotyczy intencji lub celu wypowiedzi: „The speaker is calling to...”, „The woman is talking about...”.\n\n### 1. Strategia pre-listening (Przed włączeniem nagrania):\n* W ciągu 20 sekund przed odsłuchem przeczytaj same czasowniki w opcjach: *complain, invite, remind, warn, apologize*.\n* Zastanów się, jakich słów kluczowych spodziewasz się usłyszeć dla każdej intencji.\n\n### 2. Słownictwo intencji mówcy:\n* **To complain (narzekać):** rozczarowanie, zwroty *disappointed, terrible, didn't work, waste of money*.\n* **To warn (ostrzegać):** *be careful, danger, don't forget to watch out, avoid*.\n* **To encourage (zachęcać):** *you should definitely try, don't give up, it's worth it*.\n* **To enquire / ask for information (zasięgnąć informacji):** *I was wondering if, could you let me know*.",
      "worked_examples": [
        {
          "title": "Przykład 1: Identyfikacja intencji w wypowiedzi",
          "problem": "Tekst audio: „Look, I know you promised to finish the presentation by noon, but it's already 1:30 and the client is waiting. You really need to speed up.”\nJaki jest cel wypowiedzi?\nA. To praise a colleague.  |  B. To express dissatisfaction.  |  C. To offer help.",
          "steps": [
            {
              "num": 1,
              "label": "Wychwycenie tonu",
              "text": "Mówca wskazuje na niedotrzymanie terminu i zniecierpliwienie klienta."
            },
            {
              "num": 2,
              "label": "Dopasowanie intencji",
              "text": "Wyraża niezadowolenie z opóźnienia pracy (dissatisfaction)."
            }
          ],
          "result": "B",
          "matura_tip": "Nawet jeśli mówca nie używa wulgaryzmów ani krzyku, formalny ton krytyki oznacza „dissatisfaction” lub „complaint”."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Identyfikacja intencji w wypowiedzi",
        "problem": "Tekst audio: „Look, I know you promised to finish the presentation by noon, but it's already 1:30 and the client is waiting. You really need to speed up.”\nJaki jest cel wypowiedzi?\nA. To praise a colleague.  |  B. To express dissatisfaction.  |  C. To offer help.",
        "steps": [
          {
            "num": 1,
            "label": "Wychwycenie tonu",
            "text": "Mówca wskazuje na niedotrzymanie terminu i zniecierpliwienie klienta."
          },
          {
            "num": 2,
            "label": "Dopasowanie intencji",
            "text": "Wyraża niezadowolenie z opóźnienia pracy (dissatisfaction)."
          }
        ],
        "result": "B",
        "matura_tip": "Nawet jeśli mówca nie używa wulgaryzmów ani krzyku, formalny ton krytyki oznacza „dissatisfaction” lub „complaint”."
      },
      "exam_trap": "Zwracanie uwagi tylko na jedno izolowane miłe słowo (np. „I appreciate...”) w wypowiedzi, która jako całość jest reklamacją lub skargą.",
      "matura_context": "Zadanie 1 CKE – 1–2 punkty."
    },
    "taskIds": [
      "eng_lis_121",
      "eng_lis_122",
      "eng_lis_123",
      "eng_lis_124",
      "eng_lis_125"
    ]
  },
  {
    "id": "eng-lesson-6-2",
    "topicId": "eng-dzial-6",
    "pillarId": "pillar-listening",
    "title": "Selekcja informacji faktograficznych i eliminacja zmyłek w wywiadach",
    "subtitle": "Jak nie dać się nabrać na zaprzeczoną informację wymienioną chwilę później",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W dłuższych wywiadach maturalnych autorzy arkusza CKE celowo umieszczają w tekście audio **wszystkie trzy opcje z pytań ABC**, ale dwie z nich są negowane!\n\n### 1. Mechanizm pułapki „Zwrot akcji”:\n* Lektor zaczyna: „Initially, I planned to take the train...” (uczeń słyszy *train* i od razu zaznacza opcję A).\n* Następnie dodaje: „...but my sister offered to lend me her car, which was so convenient.”\n* Właściwa odpowiedź to podróż samochodem, a nie pociągiem!\n\n### 2. Słowa sygnalizujące zmianę zdania:\nGdy w nagraniu słyszysz: `actually`, `however`, `instead of`, `in the end`, `to tell the truth` – to właśnie po tym spójniku padnie **właściwa odpowiedź**!",
      "worked_examples": [
        {
          "title": "Przykład 1: Wychwycenie ostatecznej decyzji",
          "problem": "Audio: „We considered visiting the museum, but the queues were enormous. So we headed straight to the botanic gardens instead.”\nWhere did they go?\nA. Museum  |  B. Botanic gardens  |  C. Train station",
          "steps": [
            {
              "num": 1,
              "label": "Lokalizacja zmiany decyzji",
              "text": "Słowo „considered” oznacza jedynie rozważanie. Spójnik „instead” wskazuje ostateczny cel."
            },
            {
              "num": 2,
              "label": "Wybór właściwej odpowiedzi",
              "text": "Udali się do ogrodu botanicznego (botanic gardens)."
            }
          ],
          "result": "B",
          "matura_tip": "Nigdy nie zaznaczaj pierwszej usłyszanej nazwy – zawsze czekaj na konkluzję zdania!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Wychwycenie ostatecznej decyzji",
        "problem": "Audio: „We considered visiting the museum, but the queues were enormous. So we headed straight to the botanic gardens instead.”\nWhere did they go?\nA. Museum  |  B. Botanic gardens  |  C. Train station",
        "steps": [
          {
            "num": 1,
            "label": "Lokalizacja zmiany decyzji",
            "text": "Słowo „considered” oznacza jedynie rozważanie. Spójnik „instead” wskazuje ostateczny cel."
          },
          {
            "num": 2,
            "label": "Wybór właściwej odpowiedzi",
            "text": "Udali się do ogrodu botanicznego (botanic gardens)."
          }
        ],
        "result": "B",
        "matura_tip": "Nigdy nie zaznaczaj pierwszej usłyszanej nazwy – zawsze czekaj na konkluzję zdania!"
      },
      "exam_trap": "Pośpiech i zaznaczanie odpowiedzi po pierwszym usłyszanym słowie-kluczu. Zawsze wysłuchaj obu odtworzeń nagrania do końca.",
      "matura_context": "Zadanie 1 CKE – 2–3 punkty."
    },
    "taskIds": [
      "eng_lis_126",
      "eng_lis_127",
      "eng_lis_128",
      "eng_lis_129",
      "eng_lis_130"
    ]
  },
  {
    "id": "eng-lesson-6-3",
    "topicId": "eng-dzial-6",
    "pillarId": "pillar-listening",
    "title": "Komunikaty publiczne i ogłoszenia – słuchanie pod kątem miejsca i celu",
    "subtitle": "Rozpoznawanie komunikatów na dworcu, lotnisku, w galerii handlowej i teatrze",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "CKE regularnie testuje krótkie komunikaty przez radiowęzeł lub automatyczne nagrania telefoniczne:\n\n### 1. Typowe miejsca akcji i ich słownictwo dźwiękowe:\n* **Airport / Flight:** *gate, boarding, delayed, luggage, security check, departure*.\n* **Railway station:** *platform, track, coach number, return ticket, change trains*.\n* **Department store / Mall:** *discount, cashier, receipt, changing rooms, customer service*.\n* **Theatre / Cinema:** *performance, interval, auditorium, switch off mobile phones*.\n\n### 2. Pytanie o adresata komunikatu:\n* „Who is the announcement addressed to?” -> Zwróć uwagę na zwroty powitalne: *Dear passengers, Shoppers, Hotel guests, Students*.",
      "worked_examples": [
        {
          "title": "Przykład 1: Identyfikacja miejsca komunikatu",
          "problem": "Audio: „May I have your attention, please. The 14:15 service to Manchester Piccadilly has been moved to platform 4. Please cross the footbridge carefully.”\nWhere is the speaker?\nA. At an airport  |  B. At a railway station  |  C. On a bus",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja słów kluczy",
              "text": "Słowa: „service to Manchester”, „platform 4”, „footbridge”."
            },
            {
              "num": 2,
              "label": "Dopasowanie miejsca",
              "text": "Termin „platform” w kontekście podróży oznacza peron kolejowy."
            }
          ],
          "result": "B",
          "matura_tip": "Na lotnisku peron to nie platform, lecz wyjście do samolotu to „gate”."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Identyfikacja miejsca komunikatu",
        "problem": "Audio: „May I have your attention, please. The 14:15 service to Manchester Piccadilly has been moved to platform 4. Please cross the footbridge carefully.”\nWhere is the speaker?\nA. At an airport  |  B. At a railway station  |  C. On a bus",
        "steps": [
          {
            "num": 1,
            "label": "Identyfikacja słów kluczy",
            "text": "Słowa: „service to Manchester”, „platform 4”, „footbridge”."
          },
          {
            "num": 2,
            "label": "Dopasowanie miejsca",
            "text": "Termin „platform” w kontekście podróży oznacza peron kolejowy."
          }
        ],
        "result": "B",
        "matura_tip": "Na lotnisku peron to nie platform, lecz wyjście do samolotu to „gate”."
      },
      "exam_trap": "Mylenie „platform” (peron kolejowy) z „gate” (bramka na lotnisku).",
      "matura_context": "Zadanie 1 CKE – 1 punkt."
    },
    "taskIds": [
      "eng_lis_131",
      "eng_lis_132",
      "eng_lis_133",
      "eng_lis_134",
      "eng_lis_135"
    ]
  },
  {
    "id": "eng-lesson-7-1",
    "topicId": "eng-dzial-7",
    "pillarId": "pillar-listening",
    "title": "Główna myśl vs poboczne szczegóły w 4 różnych wypowiedziach (Zadanie 2 CKE)",
    "subtitle": "Jak połączyć 4 mówców z 5 nagłówkami (jeden nagłówek jest zmyłką!)",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W Zadaniu 2 słyszysz 4 różne osoby wypowiadające się na ten sam ogólny temat (np. wakacje, hobby, pierwsza praca). Do wyboru masz 5 zdań (A–E). Jedno zdanie jest zbędne!\n\n### 1. Metoda dwóch przejść:\n* **Przejście 1 (pierwsze odtworzenie):** Skup się na ogólnym wydźwięku każdego mówcy. Zanotuj przy każdym numerze 1–4 jedno słowo kluczowe (np. *zmęczony, zachwycony, zły na koszty*).\n* **Przejście 2 (drugie odtworzenie):** Zweryfikuj, który nagłówek odpowiada sednu wypowiedzi, a który jest zmyłką opartą na pojedynczym słowie.\n\n### 2. Szukaj synonimów, a nie identycznych słów!\nPrawidłowa odpowiedź w Zadaniu 2 **niemal nigdy** nie używa dokładnie tych samych wyrazów co nagranie. Używa parafraz:\n* W nagraniu: „It cost an arm and a leg” -> W nagłówku: „The speaker was shocked by the price”.",
      "worked_examples": [
        {
          "title": "Przykład 1: Parafraza nagłówka",
          "problem": "Mówca: „I spent three hours cleaning the grease off the kitchen ovens. My back was aching for days.”\nNagłówek w teście:\nA. The speaker found the job physically demanding.\nB. The speaker quit after an argument with the chef.",
          "steps": [
            {
              "num": 1,
              "label": "Analiza doświadczenia",
              "text": "Ból pleców i wielogodzinne szorowanie pieców oznacza wysiłek fizyczny."
            },
            {
              "num": 2,
              "label": "Dopasowanie parafrazy",
              "text": "„Physically demanding” to dokładna synonimiczna parafraza bólu i ciężkiej pracy."
            }
          ],
          "result": "A",
          "matura_tip": "Brak wzmianki o kłótni eliminuje opcję B, nawet jeśli praca była w kuchni."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Parafraza nagłówka",
        "problem": "Mówca: „I spent three hours cleaning the grease off the kitchen ovens. My back was aching for days.”\nNagłówek w teście:\nA. The speaker found the job physically demanding.\nB. The speaker quit after an argument with the chef.",
        "steps": [
          {
            "num": 1,
            "label": "Analiza doświadczenia",
            "text": "Ból pleców i wielogodzinne szorowanie pieców oznacza wysiłek fizyczny."
          },
          {
            "num": 2,
            "label": "Dopasowanie parafrazy",
            "text": "„Physically demanding” to dokładna synonimiczna parafraza bólu i ciężkiej pracy."
          }
        ],
        "result": "A",
        "matura_tip": "Brak wzmianki o kłótni eliminuje opcję B, nawet jeśli praca była w kuchni."
      },
      "exam_trap": "Wybieranie nagłówka, który zawiera to samo słowo co wypowiedź, ale odnosi się do pobocznego wątku (tzw. zmyłka leksykalna).",
      "matura_context": "Zadanie 2 CKE – 4 punkty (po 1 pkt za każdego mówcę)."
    },
    "taskIds": [
      "eng_lis_001",
      "eng_lis_002",
      "eng_lis_003",
      "eng_lis_004",
      "eng_lis_005"
    ]
  },
  {
    "id": "eng-lesson-7-2",
    "topicId": "eng-dzial-7",
    "pillarId": "pillar-listening",
    "title": "Pułapka „word-spotting” – jak nie dać się złapać na dosłowne powtórzenia",
    "subtitle": "Dlaczego dosłownie powtórzone słowo z nagrania jest w 80% błędnym dystraktorem",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Word-spotting to odruchowe zaznaczanie odpowiedzi dlatego, że usłyszało się dokładnie to samo słowo w głośniku. Egzaminatorzy CKE doskonale znają ten odruch i celowo konstruują na nim pułapki!\n\n### 1. Jak działa ta pułapka w arkuszu CKE:\n* Mówca mówi: „I was thinking about buying a **motorcycle**, but my parents convinced me it was unsafe, so I bought a dependable second-hand car.”\n* Opcja ze zmyłką: „The speaker bought a new motorcycle.” (Słowo *motorcycle* padło, ale treść zdania jest sprzeczna z nagraniem!).\n* Prawidłowa opcja: „The speaker chose a safer vehicle.”\n\n### 2. Żelazna zasada bezpiecznego zdawania:\nJeśli nagłówek zawiera słowo powtórzone 1:1 z nagrania, sprawdź go **trzykrotnie**! Bardzo często prawdziwa odpowiedź ukrywa się pod synonimem.",
      "worked_examples": [
        {
          "title": "Przykład 1: Rozpoznanie zmyłki word-spotting",
          "problem": "Audio: „My uncle told me that working as a tour guide means you travel for free. Well, that wasn't true at all – I was stuck in the office answering emails.”\nNagłówek A: The speaker enjoyed free travelling as a guide.\nNagłówek B: The job did not match the speaker's expectations.",
          "steps": [
            {
              "num": 1,
              "label": "Wychwycenie zmyłki",
              "text": "Nagłówek A zawiera słowa „free travelling”, ale mówca wyraźnie zaznacza: „that wasn't true at all”."
            },
            {
              "num": 2,
              "label": "Wybór właściwej parafrazy",
              "text": "Nagłówek B podsumowuje rozczarowanie i niezgodność z oczekiwaniami."
            }
          ],
          "result": "B",
          "matura_tip": "Zwrot „that wasn't true at all” całkowicie unieważnia dosłowne słowa z nagrania!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Rozpoznanie zmyłki word-spotting",
        "problem": "Audio: „My uncle told me that working as a tour guide means you travel for free. Well, that wasn't true at all – I was stuck in the office answering emails.”\nNagłówek A: The speaker enjoyed free travelling as a guide.\nNagłówek B: The job did not match the speaker's expectations.",
        "steps": [
          {
            "num": 1,
            "label": "Wychwycenie zmyłki",
            "text": "Nagłówek A zawiera słowa „free travelling”, ale mówca wyraźnie zaznacza: „that wasn't true at all”."
          },
          {
            "num": 2,
            "label": "Wybór właściwej parafrazy",
            "text": "Nagłówek B podsumowuje rozczarowanie i niezgodność z oczekiwaniami."
          }
        ],
        "result": "B",
        "matura_tip": "Zwrot „that wasn't true at all” całkowicie unieważnia dosłowne słowa z nagrania!"
      },
      "exam_trap": "Wybieranie opcji na podstawie pierwszego skojarzenia słownego bez weryfikacji przeczenia w zdaniu.",
      "matura_context": "Zadanie 2 CKE – klucz do zdobycia kompletu 4 punktów."
    },
    "taskIds": [
      "eng_lis_006",
      "eng_lis_007",
      "eng_lis_008",
      "eng_lis_009",
      "eng_lis_010"
    ]
  },
  {
    "id": "eng-lesson-7-3",
    "topicId": "eng-dzial-7",
    "pillarId": "pillar-listening",
    "title": "Wnioskowanie po spójnikach zwrotu akcji (however, but, actually, on the other hand)",
    "subtitle": "Jak wyłapać moment, w którym mówca rewiduje swoją początkową opinię",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W zadaniach na dobieranie mówcy bardzo rzadko wyrażają prostą, jednostajną opinię. Standardowy schemat CKE to:\n`Początkowy entuzjazm / plan -> SPÓJNIK KONTRASTU -> Rzeczywisty wniosek / rozczarowanie`.\n\n### 1. Kluczowe spójniki zmiany zdania:\n* `However` (jednakże)\n* `Although / Even though` (chociaż)\n* `To be honest / Actually` (szczerze mówiąc / tak naprawdę)\n* `The only downside was...` (jedynym minusem było...)\n* `Despite my high hopes...` (pomimo moich wielkich nadziei...)\n\n### 2. Strategia uwagi:\nCokolwiek mówca powie PRZED słowem „However”, to zazwyczaj tylko wstęp lub tło. Twoje ucho musi wychwycić to, co następuje **BEZPOŚREDNIO PO SPÓJNIKU**!",
      "worked_examples": [
        {
          "title": "Przykład 1: Wnioskowanie po zwrocie akcji",
          "problem": "Audio: „The hotel had a huge pool and the weather was glorious. However, the non-stop construction noise next door made sleeping impossible.”\nJaka była dominująca opinia gościa?\nA. He was delighted with the recreational facilities.\nB. His stay was ruined by disturbing noise.",
          "steps": [
            {
              "num": 1,
              "label": "Wychwycenie spójnika",
              "text": "Po słowie „However” mówca przedstawia problem: hałas z budowy uniemożliwiający sen."
            },
            {
              "num": 2,
              "label": "Ocena nadrzędnej opinii",
              "text": "Brak snu z powodu hałasu przeważa nad basenem – pobyt został zepsuty."
            }
          ],
          "result": "B",
          "matura_tip": "Zawsze oceniaj ostateczny bilans emocjonalny wypowiedzi."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Wnioskowanie po zwrocie akcji",
        "problem": "Audio: „The hotel had a huge pool and the weather was glorious. However, the non-stop construction noise next door made sleeping impossible.”\nJaka była dominująca opinia gościa?\nA. He was delighted with the recreational facilities.\nB. His stay was ruined by disturbing noise.",
        "steps": [
          {
            "num": 1,
            "label": "Wychwycenie spójnika",
            "text": "Po słowie „However” mówca przedstawia problem: hałas z budowy uniemożliwiający sen."
          },
          {
            "num": 2,
            "label": "Ocena nadrzędnej opinii",
            "text": "Brak snu z powodu hałasu przeważa nad basenem – pobyt został zepsuty."
          }
        ],
        "result": "B",
        "matura_tip": "Zawsze oceniaj ostateczny bilans emocjonalny wypowiedzi."
      },
      "exam_trap": "Skupienie się na pierwszej połowie zdania i zignorowanie spójnika kontrastu.",
      "matura_context": "Zadania 1 i 2 CKE – 1–2 punkty."
    },
    "taskIds": [
      "eng_lis_011",
      "eng_lis_012",
      "eng_lis_013",
      "eng_lis_014",
      "eng_lis_015"
    ]
  },
  {
    "id": "eng-lesson-8-1",
    "topicId": "eng-dzial-8",
    "pillarId": "pillar-listening",
    "title": "Zapisywanie liczb, dat, cen i nazw własnych z nagrania CKE (Zadanie 3)",
    "subtitle": "Zadanie otwarte ze słuchu: fonetyka liczb -teen vs -ty oraz poprawne literowanie",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W Zadaniu 3 na maturze uczeń musi wpisać w lukę brakujące słowo, liczbę lub wyrażenie na podstawie usłyszanego tekstu.\n\n### 1. Klasyczna pułapka fonetyczna: -teen vs -ty:\n* **13 vs 30:** `thirteen` [akcent na -TEEN] vs `thirty` [akcent na THIR-].\n* **15 vs 50:** `fifteen` vs `fifty`.\n* Pamiętaj: liczebniki od 13 do 19 mają długą, mocno akcentowaną końcówkę *-teen*. Liczebniki dziesiątek (30, 40, 50...) mają krótki, słaby dźwięk *-ty*.\n\n### 2. Zapis dat i godzin:\n* Godziny: `quarter past seven` = 7:15, `half past eight` = 8:30, `twenty to nine` = 8:40.\n* Zapis cyframi jest jak najbardziej dopuszczalny i znacznie bezpieczniejszy (mniej szans na błąd ortograficzny!).",
      "worked_examples": [
        {
          "title": "Przykład 1: Wpisanie liczby z nagrania",
          "problem": "Tekst w notatce: „The workshop starts at [...] a.m.”\nNagranie: „Please remember that our morning session begins at a quarter to ten sharp.”",
          "steps": [
            {
              "num": 1,
              "label": "Przeliczenie czasu",
              "text": "„A quarter to ten” oznacza za piętnaście dziesiąta, czyli 9:45."
            },
            {
              "num": 2,
              "label": "Zapis odpowiedzi",
              "text": "Możesz zapisać: „9:45” lub „nine forty-five”. Zapis cyfrowy jest w 100% poprawny."
            }
          ],
          "result": "9:45 / 9.45",
          "matura_tip": "Wpisanie „9:45” chroni Cię przed błędem w pisowni słów „quarter” czy „forty”!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Wpisanie liczby z nagrania",
        "problem": "Tekst w notatce: „The workshop starts at [...] a.m.”\nNagranie: „Please remember that our morning session begins at a quarter to ten sharp.”",
        "steps": [
          {
            "num": 1,
            "label": "Przeliczenie czasu",
            "text": "„A quarter to ten” oznacza za piętnaście dziesiąta, czyli 9:45."
          },
          {
            "num": 2,
            "label": "Zapis odpowiedzi",
            "text": "Możesz zapisać: „9:45” lub „nine forty-five”. Zapis cyfrowy jest w 100% poprawny."
          }
        ],
        "result": "9:45 / 9.45",
        "matura_tip": "Wpisanie „9:45” chroni Cię przed błędem w pisowni słów „quarter” czy „forty”!"
      },
      "exam_trap": "Błąd ortograficzny w liczebnikach, np. „fourty” zamiast „forty”!",
      "matura_context": "Zadanie 3 (zadanie otwarte ze słuchu) – 3–4 punkty."
    },
    "taskIds": [
      "eng_lis_241",
      "eng_lis_242",
      "eng_lis_243",
      "eng_lis_244",
      "eng_lis_245"
    ]
  },
  {
    "id": "eng-lesson-8-2",
    "topicId": "eng-dzial-8",
    "pillarId": "pillar-listening",
    "title": "Prawda czy Fałsz ze słuchu – Pułapka kwantyfikatorów (always, all vs some, rarely)",
    "subtitle": "Jak jedno słowo ograniczające zmienia wartość logiczną całego zdania w teście P/F",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W zadaniach typu Prawda/Fałsz (True/False) kluczem nie są rzeczowniki, lecz **kwantyfikatory** i przysłówki częstotliwości:\n\n### 1. Kwantyfikatory absolutne (Często fałszywe!):\nSłowa takie jak: `all`, `every`, `always`, `never`, `completely`, `impossible` czynią zdanie kategorycznym.\n* Jeśli w nagraniu padło: „Most students enjoyed the trip, though a few found it boring...”\n* A w teście masz: „All students were pleased with the trip...” -> To jest **FAŁSZ (False)**!\n\n### 2. Kwantyfikatory łagodne:\nSłowa: `some`, `most`, `often`, `sometimes`, `may`, `can` są znacznie bardziej elastyczne i zgodne z realną wypowiedzią.",
      "worked_examples": [
        {
          "title": "Przykład 1: Weryfikacja kwantyfikatora",
          "problem": "Zdanie w teście: „The entrance to the museum is always free of charge.”\nAudio: „Tickets are normally twelve pounds, except on the first Sunday of each month when visitors can enter for free.”",
          "steps": [
            {
              "num": 1,
              "label": "Porównanie warunków",
              "text": "Nagranie mówi, że wstęp jest darmowy tylko w pierwszą niedzielę miesiąca, a normalnie kosztuje 12 funtów."
            },
            {
              "num": 2,
              "label": "Weryfikacja słowa always",
              "text": "Słowo „always” (zawsze) powoduje, że zdanie w teście jest niezgodne z prawdą."
            }
          ],
          "result": "FALSE (Fałsz)",
          "matura_tip": "Bądź wyczulony na słowa „always” i „never” – w arkuszach CKE rzadko opisują one stan faktyczny."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Weryfikacja kwantyfikatora",
        "problem": "Zdanie w teście: „The entrance to the museum is always free of charge.”\nAudio: „Tickets are normally twelve pounds, except on the first Sunday of each month when visitors can enter for free.”",
        "steps": [
          {
            "num": 1,
            "label": "Porównanie warunków",
            "text": "Nagranie mówi, że wstęp jest darmowy tylko w pierwszą niedzielę miesiąca, a normalnie kosztuje 12 funtów."
          },
          {
            "num": 2,
            "label": "Weryfikacja słowa always",
            "text": "Słowo „always” (zawsze) powoduje, że zdanie w teście jest niezgodne z prawdą."
          }
        ],
        "result": "FALSE (Fałsz)",
        "matura_tip": "Bądź wyczulony na słowa „always” i „never” – w arkuszach CKE rzadko opisują one stan faktyczny."
      },
      "exam_trap": "Uznanie zdania za prawdziwe tylko dlatego, że temat i nazwa instytucji zgadzają się z nagraniem, ignorując kwantyfikator „always”.",
      "matura_context": "Zadania ze słuchu i czytania – 1–2 punkty."
    },
    "taskIds": [
      "eng_lis_246",
      "eng_lis_247",
      "eng_lis_248",
      "eng_lis_249",
      "eng_lis_250"
    ]
  },
  {
    "id": "eng-lesson-8-3",
    "topicId": "eng-dzial-8",
    "pillarId": "pillar-listening",
    "title": "Uzupełnianie streszczenia i notatki ze słuchu z poprawnością gramatyczną luki",
    "subtitle": "Dopasowanie formy wpisywanego wyrazu do otoczenia gramatycznego w notatce",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W zadaniu otwartym ze słuchu nie wystarczy tylko usłyszeć słowo – musisz upewnić się, że pasuje ono gramatycznie do luki w arkuszu!\n\n### 1. Sprawdzenie gramatyczne przed i po luce:\n* Jeśli przed luką stoi **a / an** -> wpisujesz rzeczownik policzalny w liczbie pojedynczej (np. *an umbrella*).\n* Jeśli przed luką stoi liczba mnoga lub brak przedimka -> uważaj na końcówkę **-s** (np. *two tickets*).\n* Jeśli po luce stoi czasownik w liczbie pojedynczej (np. *... was found*) -> wpisany rzeczownik musi być pojedynczy!\n\n### 2. Limit wyrazów CKE:\n* Polecenie precyzuje: „Wpisz od 1 do 3 wyrazów”. Wpisanie 4 wyrazów to automatyczne 0 punktów, nawet jeśli sens jest poprawny!",
      "worked_examples": [
        {
          "title": "Przykład 1: Dopasowanie liczby pojedynczej/mnogiej",
          "problem": "Notatka: „The hotel offers two heated outdoor [...] for all guests.”\nNagranie: „Guests can enjoy swimming in our two large heated outdoor pools.”",
          "steps": [
            {
              "num": 1,
              "label": "Lokalizacja brakującego słowa",
              "text": "Brakującym elementem jest rzeczownik po przymiotnikach „heated outdoor”."
            },
            {
              "num": 2,
              "label": "Weryfikacja liczby",
              "text": "Liczebnik „two” wymusza liczbę mnogą rzeczownika: pools."
            }
          ],
          "result": "pools",
          "matura_tip": "Napisanie „pool” w liczbie pojedynczej po słowie „two” to błąd gramatyczny skutkujący 0 pkt!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Dopasowanie liczby pojedynczej/mnogiej",
        "problem": "Notatka: „The hotel offers two heated outdoor [...] for all guests.”\nNagranie: „Guests can enjoy swimming in our two large heated outdoor pools.”",
        "steps": [
          {
            "num": 1,
            "label": "Lokalizacja brakującego słowa",
            "text": "Brakującym elementem jest rzeczownik po przymiotnikach „heated outdoor”."
          },
          {
            "num": 2,
            "label": "Weryfikacja liczby",
            "text": "Liczebnik „two” wymusza liczbę mnogą rzeczownika: pools."
          }
        ],
        "result": "pools",
        "matura_tip": "Napisanie „pool” w liczbie pojedynczej po słowie „two” to błąd gramatyczny skutkujący 0 pkt!"
      },
      "exam_trap": "Wpisanie rzeczownika w liczbie pojedynczej tam, gdzie kontekst notatki wymaga liczby mnogiej.",
      "matura_context": "Zadanie 3 CKE – 1 punkt."
    },
    "taskIds": [
      "eng_lis_251",
      "eng_lis_252",
      "eng_lis_253",
      "eng_lis_254",
      "eng_lis_255"
    ]
  },
  {
    "id": "eng-lesson-9-1",
    "topicId": "eng-dzial-9",
    "pillarId": "pillar-reading",
    "title": "Identyfikacja Topic Sentence (zdania przewodniego akapitu) w czytaniu CKE",
    "subtitle": "Jak pierwsze i ostatnie zdanie akapitu zdradza właściwy nagłówek w Zadaniu 4",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W Zadaniu 4 dopasowujesz nagłówki do akapitów dłuższego tekstu. Angielskie akapity dziennikarskie i eseistyczne są zbudowane według ścisłej dyscypliny kompozycyjnej:\n\n### 1. Struktura klasycznego akapitu:\n* **Topic Sentence (Zdanie przewodnie):** W 85% przypadków jest to **pierwsze zdanie akapitu**. Formułuje ono główną myśl, której dotyczy cały akapit.\n* **Supporting Sentences (Zdania rozwijające):** Podają przykłady, liczby, cytaty i dowody.\n* **Concluding Sentence (Zdanie podsumowujące):** Ostatnie zdanie, które zbiera konkluzję lub stanowi pomost do kolejnego akapitu.\n\n### 2. Strategia 3 kroków:\n1. Przeczytaj pierwsze zdanie każdego akapitu i podsumuj je w głowie 2 słowami.\n2. Przeczytaj listę nagłówków i odrzuć te, które w ogóle nie pasują tematycznie.\n3. Przeczytaj ostatnie zdanie akapitu, aby upewnić się, że konkluzja nie zmieniła kierunku myśli.",
      "worked_examples": [
        {
          "title": "Przykład 1: Dobór nagłówka po zdaniu przewodnim",
          "problem": "Akapit: „Finding a quiet place to study in a crowded university dormitory is almost impossible. Students are constantly distracted by music, loud phone conversations in corridors, and roommates inviting friends over.”\nWybierz nagłówek:\nA. The advantages of living on campus.\nB. Major obstacles to focused revision.\nC. How to find cheap student accommodation.",
          "steps": [
            {
              "num": 1,
              "label": "Analiza Topic Sentence",
              "text": "Pierwsze zdanie mówi o niemożliwości znalezienia cichego miejsca do nauki."
            },
            {
              "num": 2,
              "label": "Dopasowanie parafrazy",
              "text": "Hałas i rozproszenia to „major obstacles to focused revision” (główne przeszkody w skupionej nauce)."
            }
          ],
          "result": "B",
          "matura_tip": "Nagłówek A jest sprzeczny z wymową, a nagłówek C w ogóle nie porusza kwestii kosztów."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Dobór nagłówka po zdaniu przewodnim",
        "problem": "Akapit: „Finding a quiet place to study in a crowded university dormitory is almost impossible. Students are constantly distracted by music, loud phone conversations in corridors, and roommates inviting friends over.”\nWybierz nagłówek:\nA. The advantages of living on campus.\nB. Major obstacles to focused revision.\nC. How to find cheap student accommodation.",
        "steps": [
          {
            "num": 1,
            "label": "Analiza Topic Sentence",
            "text": "Pierwsze zdanie mówi o niemożliwości znalezienia cichego miejsca do nauki."
          },
          {
            "num": 2,
            "label": "Dopasowanie parafrazy",
            "text": "Hałas i rozproszenia to „major obstacles to focused revision” (główne przeszkody w skupionej nauce)."
          }
        ],
        "result": "B",
        "matura_tip": "Nagłówek A jest sprzeczny z wymową, a nagłówek C w ogóle nie porusza kwestii kosztów."
      },
      "exam_trap": "Wybór nagłówka na podstawie jednego pobocznego przykładu wymienionego w środku akapitu, ignorując ogólny sens topic sentence.",
      "matura_context": "Zadanie 4 CKE – 4 punkty."
    },
    "taskIds": [
      "eng_read_001",
      "eng_read_002",
      "eng_read_003",
      "eng_read_004",
      "eng_read_005"
    ]
  },
  {
    "id": "eng-lesson-9-2",
    "topicId": "eng-dzial-9",
    "pillarId": "pillar-reading",
    "title": "Nagłówek podsumowujący vs zbyt wąski detal – eliminacja zmyłek w Zadaniu 4",
    "subtitle": "Odróżnianie nagłówka obejmującego cały akapit od opcji opisującej tylko jeden fakt",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Typowy dystraktor CKE w zadaniu na dobieranie nagłówków jest **prawdziwy pod kątem faktów**, ale **zbyt wąski**, by stanowić nagłówek!\n\n### 1. Test „Parasola” (Umbrella Test):\nDobry nagłówek działa jak parasol – musi przykrywać KAŻDE zdanie w danym akapicie.\n* Jeśli nagłówek brzmi: „The cost of the ticket”, a w akapicie o cenie jest tylko pół zdania, podczas gdy reszta mówi o godzinach otwarcia, dojeździe i przewodnikach – ten nagłówek jest ZBYT WĄSKI!\n* Właściwym nagłówkiem parasolowym byłoby: „Practical visitor information”.\n\n### 2. Dystraktor nadinterpretacji:\nDrugim typem zmyłki jest nagłówek, który idzie o krok za daleko niż sam tekst (nadinterpretacja wniosków autora). Trzymaj się wyłącznie tego, co napisano wprost.",
      "worked_examples": [
        {
          "title": "Przykład 1: Zastosowanie testu parasola",
          "problem": "Akapit opisuje: 1) nowe ścieżki rowerowe w mieście, 2) rozbudowę miejskiego metra, 3) dopłaty do biletów tramwajowych.\nNagłówek A: The rising popularity of cycling in the city.\nNagłówek B: Comprehensive improvements in green public transport.",
          "steps": [
            {
              "num": 1,
              "label": "Weryfikacja opcji A",
              "text": "Opcja A dotyczy tylko rowerów – ignoruje metro i tramwaje (jest za wąska)."
            },
            {
              "num": 2,
              "label": "Weryfikacja opcji B",
              "text": "Opcja B („green public transport”) obejmuje rowery, metro i tramwaje pod jednym wspólnym mianownikiem."
            }
          ],
          "result": "B",
          "matura_tip": "Nagłówek nadrzędny (parasolowy) zawsze wygrywa ze zbyt wąskim detalem!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Zastosowanie testu parasola",
        "problem": "Akapit opisuje: 1) nowe ścieżki rowerowe w mieście, 2) rozbudowę miejskiego metra, 3) dopłaty do biletów tramwajowych.\nNagłówek A: The rising popularity of cycling in the city.\nNagłówek B: Comprehensive improvements in green public transport.",
        "steps": [
          {
            "num": 1,
            "label": "Weryfikacja opcji A",
            "text": "Opcja A dotyczy tylko rowerów – ignoruje metro i tramwaje (jest za wąska)."
          },
          {
            "num": 2,
            "label": "Weryfikacja opcji B",
            "text": "Opcja B („green public transport”) obejmuje rowery, metro i tramwaje pod jednym wspólnym mianownikiem."
          }
        ],
        "result": "B",
        "matura_tip": "Nagłówek nadrzędny (parasolowy) zawsze wygrywa ze zbyt wąskim detalem!"
      },
      "exam_trap": "Wybieranie nagłówka ze słowem „cycling”, bo było w pierwszym zdaniu, pomimo że reszta tekstu omawiała inne środki transportu.",
      "matura_context": "Zadanie 4 CKE – 1–2 punkty."
    },
    "taskIds": [
      "eng_read_006",
      "eng_read_007",
      "eng_read_008",
      "eng_read_009",
      "eng_read_010"
    ]
  },
  {
    "id": "eng-lesson-9-3",
    "topicId": "eng-dzial-9",
    "pillarId": "pillar-reading",
    "title": "Szybkie skanowanie (Skimming) i parafrazy słownikowe nagłówków",
    "subtitle": "Oszczędność czasu na maturze: jak przeczytać artykuł w 90 sekund i wyłapać synonimy",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Czas na maturze jest ograniczony (120 minut na cały arkusz). Nie możesz czytać każdego artykułu słowo w słowo ze słownikiem w ręku!\n\n### 1. Skimming vs Scanning:\n* **Skimming (przelatywanie wzrokiem):** Czytanie selektywne pod kątem ogólnego sensu (tytuł, nagłówki, pierwsze zdania, pogrubienia).\n* **Scanning (namierzanie radarem):** Szukanie konkretnego faktu: nazwiska, roku, ceny, nazwy własnej pisanej wielką literą.\n\n### 2. Mapa synonimów CKE:\nNagłówki maturalne to niemal zawsze leksykalne parafrazy zwrotów z tekstu:\n* W tekście: *affordable, inexpensive* -> W nagłówku: *Low costs / Budget-friendly*.\n* W tekście: *boost confidence, believe in yourself* -> W nagłówku: *Psychological benefits*.\n* W tekście: *polluted air, global warming, carbon emissions* -> W nagłówku: *Environmental impact*.",
      "worked_examples": [
        {
          "title": "Przykład 1: Namierzenie synonimu",
          "problem": "W tekście: „The course is completely free of charge and requires no prior qualifications.”\nNagłówek w arkuszu:\nA. High entry requirements for beginners.\nB. An accessible learning opportunity for everyone.",
          "steps": [
            {
              "num": 1,
              "label": "Lokalizacja cech kursu",
              "text": "Darmowy („free of charge”) i brak wymogów („no prior qualifications”)."
            },
            {
              "num": 2,
              "label": "Dopasowanie synonimu",
              "text": "„Accessible” (dostępny) dla każdego idealnie parafrazuje brak barier finansowych i formalnych."
            }
          ],
          "result": "B",
          "matura_tip": "„Accessible” i „available” to ulubione słowa klucza CKE dla oznaczenia dostępności."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Namierzenie synonimu",
        "problem": "W tekście: „The course is completely free of charge and requires no prior qualifications.”\nNagłówek w arkuszu:\nA. High entry requirements for beginners.\nB. An accessible learning opportunity for everyone.",
        "steps": [
          {
            "num": 1,
            "label": "Lokalizacja cech kursu",
            "text": "Darmowy („free of charge”) i brak wymogów („no prior qualifications”)."
          },
          {
            "num": 2,
            "label": "Dopasowanie synonimu",
            "text": "„Accessible” (dostępny) dla każdego idealnie parafrazuje brak barier finansowych i formalnych."
          }
        ],
        "result": "B",
        "matura_tip": "„Accessible” i „available” to ulubione słowa klucza CKE dla oznaczenia dostępności."
      },
      "exam_trap": "Spędzanie 15 minut na analizowaniu jednego trudnego słówka w tekście, które nie ma żadnego wpływu na poprawność wyboru nagłówka.",
      "matura_context": "Zadania 4 i 5 – optymalizacja czasu egzaminu."
    },
    "taskIds": [
      "eng_read_011",
      "eng_read_012",
      "eng_read_013",
      "eng_read_014",
      "eng_read_015"
    ]
  },
  {
    "id": "eng-lesson-10-1",
    "topicId": "eng-dzial-10",
    "pillarId": "pillar-reading",
    "title": "Zaimki anaforiczne (he, they, this, such) jako drogowskazy w luce (Zadanie 5)",
    "subtitle": "Jak zaimki wskazujące i osobowe zdradzają brakujące zdanie w luce tekstu",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W Zadaniu 5 z tekstu wycięto 3 lub 4 całe zdania. Aby wstawić właściwe zdanie w lukę, musisz zbadać **spójność referencyjną (cohesion)**.\n\n### 1. Zaimki jako klej łączący zdania:\nJeśli w wyciętym zdaniu występuje zaimek, w zdaniu poprzedzającym lukę MUSI znajdować się rzeczownik, do którego ten zaimek się odnosi:\n* Jeśli wycięte zdanie zaczyna się od: **„They decided to investigate...”** -> przed luką MUSI być mowa o grupie ludzi w liczbie mnogiej (np. *scientists, detectives, students*).\n* Jeśli wycięte zdanie brzmi: **„This unexpected discovery changed everything.”** -> przed luką musi być opisane konkretne odkrycie!\n* Słowa takie jak **„such measures”**, **„these problems”** wymagają wcześniejszego wymienienia tych środków lub problemów.",
      "worked_examples": [
        {
          "title": "Przykład 1: Rozpoznanie odniesienia zaimka",
          "problem": "Przed luką: „Dr Harris spent twelve years studying rare tree frogs in the Amazon rainforest. [LUKA] After publishing his findings, he received an international award.”\nBrakujące zdania do wyboru:\nA. These birds migrate south every autumn.\nB. His dedicated research provided groundbreaking data on climate change.\nC. They refused to sponsor the project.",
          "steps": [
            {
              "num": 1,
              "label": "Identyfikacja podmiotu przed luką",
              "text": "Dr Harris (mężczyzna, naukowiec) prowadził badania nad żabami."
            },
            {
              "num": 2,
              "label": "Weryfikacja zaimków",
              "text": "Opcja A mówi o ptakach (brak w tekście). Opcja C używa „They” (brak grupy osób). Opcja B odnosi się do niego: „His dedicated research”."
            }
          ],
          "result": "B",
          "matura_tip": "Zaimek dzierżawczy „His” i słowo „research” idealnie spajają zdanie o Dr. Harrisie z nagrodą za publikację wyników."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Rozpoznanie odniesienia zaimka",
        "problem": "Przed luką: „Dr Harris spent twelve years studying rare tree frogs in the Amazon rainforest. [LUKA] After publishing his findings, he received an international award.”\nBrakujące zdania do wyboru:\nA. These birds migrate south every autumn.\nB. His dedicated research provided groundbreaking data on climate change.\nC. They refused to sponsor the project.",
        "steps": [
          {
            "num": 1,
            "label": "Identyfikacja podmiotu przed luką",
            "text": "Dr Harris (mężczyzna, naukowiec) prowadził badania nad żabami."
          },
          {
            "num": 2,
            "label": "Weryfikacja zaimków",
            "text": "Opcja A mówi o ptakach (brak w tekście). Opcja C używa „They” (brak grupy osób). Opcja B odnosi się do niego: „His dedicated research”."
          }
        ],
        "result": "B",
        "matura_tip": "Zaimek dzierżawczy „His” i słowo „research” idealnie spajają zdanie o Dr. Harrisie z nagrodą za publikację wyników."
      },
      "exam_trap": "Wstawienie zdania ze słowem „They”, gdy w zdaniu przed luką była mowa tylko o jednej osobie w liczbie pojedynczej.",
      "matura_context": "Zadanie 5 CKE – 3–4 punkty."
    },
    "taskIds": [
      "eng_read_131",
      "eng_read_132",
      "eng_read_133",
      "eng_read_134",
      "eng_read_135"
    ]
  },
  {
    "id": "eng-lesson-10-2",
    "topicId": "eng-dzial-10",
    "pillarId": "pillar-reading",
    "title": "Łączniki logiczne i związki przyczynowo-skutkowe w spójności tekstu",
    "subtitle": "Analiza spójników However, As a result, In addition na styku luki",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Zdanie wstawiane w lukę musi pasować do tekstu pod kątem logiki następstwa faktów:\n\n### 1. Kategorie łączników logicznych w brakujących zdaniach:\n* **Kontrast (Zwrot akcji):** `However`, `On the contrary`, `Nevertheless`, `In spite of this`.\n  * Wymaga, by treść w luce była przeciwieństwem lub niespodzianką w stosunku do zdania przed luką.\n* **Skutek / Konsekwencja:** `As a result`, `Consequently`, `Therefore`, `For this reason`.\n  * Treść w luce musi być logicznym następstwem zdarzenia opisanego wcześniej.\n* **Dodanie informacji:** `Furthermore`, `What is more`, `In addition`.\n  * Rozwija ten sam wątek o kolejny pozytywny lub negatywny element.",
      "worked_examples": [
        {
          "title": "Przykład 1: Dobór zdania z łącznikiem skutku",
          "problem": "Przed luką: „The heavy blizzard knocked down power lines across the entire county. [LUKA] Local schools were forced to cancel all classes for three days.”\nWybierz zdanie:\nA. Consequently, thousands of residents were left without heating in sub-zero temperatures.\nB. However, the sunny weather attracted tourists to the ski resort.",
          "steps": [
            {
              "num": 1,
              "label": "Ocena przyczyny",
              "text": "Śnieżyca zerwała linie energetyczne (brak prądu i ogrzewania)."
            },
            {
              "num": 2,
              "label": "Wybór łącznika",
              "text": "Skutkiem zerwania linii jest brak prądu, wprowadzony przez „Consequently”."
            }
          ],
          "result": "A",
          "matura_tip": "„Consequently” oraz „As a result” wskazują bezpośredni skutek katastrofy."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Dobór zdania z łącznikiem skutku",
        "problem": "Przed luką: „The heavy blizzard knocked down power lines across the entire county. [LUKA] Local schools were forced to cancel all classes for three days.”\nWybierz zdanie:\nA. Consequently, thousands of residents were left without heating in sub-zero temperatures.\nB. However, the sunny weather attracted tourists to the ski resort.",
        "steps": [
          {
            "num": 1,
            "label": "Ocena przyczyny",
            "text": "Śnieżyca zerwała linie energetyczne (brak prądu i ogrzewania)."
          },
          {
            "num": 2,
            "label": "Wybór łącznika",
            "text": "Skutkiem zerwania linii jest brak prądu, wprowadzony przez „Consequently”."
          }
        ],
        "result": "A",
        "matura_tip": "„Consequently” oraz „As a result” wskazują bezpośredni skutek katastrofy."
      },
      "exam_trap": "Wstawienie zdania z łącznikiem kontrastu „However”, gdy drugie zdanie tak naprawdę potwierdza i kontynuuje pierwszą myśl.",
      "matura_context": "Zadanie 5 CKE – 1–2 punkty."
    },
    "taskIds": [
      "eng_read_136",
      "eng_read_137",
      "eng_read_138",
      "eng_read_139",
      "eng_read_140"
    ]
  },
  {
    "id": "eng-lesson-10-3",
    "topicId": "eng-dzial-10",
    "pillarId": "pillar-reading",
    "title": "Analiza kontekstu obustronnego: zdanie przed luką i zdanie po luce",
    "subtitle": "Najważniejszy test weryfikacyjny: czy wstawione zdanie płynnie przechodzi w kolejne",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Najczęstszy błąd maturzystów w Zadaniu 5 polega na tym, że czytają tylko zdanie PRZED luką i od razu wstawiają odpowiedź, **nie sprawdzając zdania PO luce**!\n\n### 1. Reguła podwójnego mostu (The Double-Bridge Rule):\nBrakujące zdanie to most łączący dwa brzegi rzeki:\n* **Lewy brzeg:** Treść i gramatyka zdania przed luką.\n* **Prawy brzeg:** Treść, czasy i zaimki zdania PO LUCE.\n* Jeśli zdanie pasuje do lewego brzegu, ale z prawego wynika sprzeczność – **ta odpowiedź jest błędna**!\n\n### 2. Algorytm weryfikacji końcowej:\nPo wstawieniu wszystkich zdań przeczytaj cały akapit ciągiem. Jeśli w którymkolwiek momencie odczuwasz zgrzyt lub nielogiczny skok myślowy, zamień kandydatów.",
      "worked_examples": [
        {
          "title": "Przykład 1: Weryfikacja zdania po luce",
          "problem": "Tekst: „The young programmer submitted her mobile app to the contest. [LUKA] To her amazement, the judges unanimously declared it the most innovative app of the year.”\nWybierz zdanie:\nA. She didn't think it had any chance of winning against professional developers.\nB. The app immediately won top prizes in international competitions.",
          "steps": [
            {
              "num": 1,
              "label": "Sprawdzenie prawego brzegu",
              "text": "Zdanie po luce mówi: „To her amazement...” (Ku jej zdumieniu). Zdumienie ma sens tylko wtedy, gdy wcześniej NIE spodziewała się wygranej!"
            },
            {
              "num": 2,
              "label": "Eliminacja opcji B",
              "text": "Gdybyśmy wstawili opcję B, zdanie po luce o jej zdumieniu z werdyktu byłoby nielogicznym powtórzeniem."
            }
          ],
          "result": "A",
          "matura_tip": "„To her amazement” / „Surprisingly” to klucze kontekstowe, które wymagają wcześniejszego sceptycyzmu!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Weryfikacja zdania po luce",
        "problem": "Tekst: „The young programmer submitted her mobile app to the contest. [LUKA] To her amazement, the judges unanimously declared it the most innovative app of the year.”\nWybierz zdanie:\nA. She didn't think it had any chance of winning against professional developers.\nB. The app immediately won top prizes in international competitions.",
        "steps": [
          {
            "num": 1,
            "label": "Sprawdzenie prawego brzegu",
            "text": "Zdanie po luce mówi: „To her amazement...” (Ku jej zdumieniu). Zdumienie ma sens tylko wtedy, gdy wcześniej NIE spodziewała się wygranej!"
          },
          {
            "num": 2,
            "label": "Eliminacja opcji B",
            "text": "Gdybyśmy wstawili opcję B, zdanie po luce o jej zdumieniu z werdyktu byłoby nielogicznym powtórzeniem."
          }
        ],
        "result": "A",
        "matura_tip": "„To her amazement” / „Surprisingly” to klucze kontekstowe, które wymagają wcześniejszego sceptycyzmu!"
      },
      "exam_trap": "Ignorowanie zdania następującego bezpośrednio po luce. Zawsze czytaj pełne otoczenie luki!",
      "matura_context": "Zadanie 5 CKE – decydujący krok do 100% poprawności."
    },
    "taskIds": [
      "eng_read_141",
      "eng_read_142",
      "eng_read_143",
      "eng_read_144",
      "eng_read_145"
    ]
  },
  {
    "id": "eng-lesson-11-1",
    "topicId": "eng-dzial-11",
    "pillarId": "pillar-reading",
    "title": "Mediacja językowa: Przenoszenie informacji z artykułu do e-maila / notatki (Zadanie 7)",
    "subtitle": "Zadanie otwarte z czytania: parafraza danych z tekstu angielskiego do polskiej lub angielskiej luki",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Mediacja językowa (Language Mediation) to jeden z najważniejszych nowych formatów w Formule 2023. Czytasz angielski artykuł, a następnie uzupełniasz luki w e-mailu lub notatce.\n\n### 1. Zasady punktowania mediacji CKE:\n* Odpowiedź musi być **precyzyjna merytorycznie** (zgodna z faktami z artykułu).\n* Odpowiedź musi być **poprawna gramatycznie i ortograficznie** w języku, w którym pisana jest notatka.\n* Zwykle obowiązuje rygorystyczny limit słów (np. *od 1 do 3 wyrazów*).\n\n### 2. Krok po kroku:\n1. Zlokalizuj w notatce słowa kluczowe otaczające lukę.\n2. Zeskanuj artykuł, aby znaleźć ten sam fragment (uwaga na synonimy!).\n3. Przepisz dokładnie tę informację, dopasowując formę gramatyczną do zdania w notatce.",
      "worked_examples": [
        {
          "title": "Przykład 1: Uzupełnienie luki mediacyjnej",
          "problem": "Artykuł: „The exhibition at the City Gallery will be open to visitors until November 15th, after which the paintings will travel to Paris.”\nNotatka do uzupełnienia: „Pamiętaj, że wystawę obrazów w galerii można obejrzeć tylko do [...], bo potem przenoszą ją do Francji.”",
          "steps": [
            {
              "num": 1,
              "label": "Lokalizacja daty w tekście",
              "text": "W tekście padła data: „until November 15th”."
            },
            {
              "num": 2,
              "label": "Wpisanie w języku notatki",
              "text": "Notatka jest po polsku, więc wpisujemy: „15 listopada”."
            }
          ],
          "result": "15 listopada / 15.11",
          "matura_tip": "Zwróć uwagę na język luki! Jeśli notatka jest po polsku, wpisujesz po polsku. Jeśli po angielsku – po angielsku."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Uzupełnienie luki mediacyjnej",
        "problem": "Artykuł: „The exhibition at the City Gallery will be open to visitors until November 15th, after which the paintings will travel to Paris.”\nNotatka do uzupełnienia: „Pamiętaj, że wystawę obrazów w galerii można obejrzeć tylko do [...], bo potem przenoszą ją do Francji.”",
        "steps": [
          {
            "num": 1,
            "label": "Lokalizacja daty w tekście",
            "text": "W tekście padła data: „until November 15th”."
          },
          {
            "num": 2,
            "label": "Wpisanie w języku notatki",
            "text": "Notatka jest po polsku, więc wpisujemy: „15 listopada”."
          }
        ],
        "result": "15 listopada / 15.11",
        "matura_tip": "Zwróć uwagę na język luki! Jeśli notatka jest po polsku, wpisujesz po polsku. Jeśli po angielsku – po angielsku."
      },
      "exam_trap": "Wpisanie odpowiedzi w złym języku (np. wpisanie angielskiego „November 15th” w polskiej notatce mediacyjnej).",
      "matura_context": "Zadanie 7 CKE – 3–4 punkty."
    },
    "taskIds": [
      "eng_read_251",
      "eng_read_252",
      "eng_read_253",
      "eng_read_254",
      "eng_read_255"
    ]
  },
  {
    "id": "eng-lesson-11-2",
    "topicId": "eng-dzial-11",
    "pillarId": "pillar-reading",
    "title": "Fakty vs Opinie autora – Wykrywanie tonu, ironii i intencji w artykule prasowym",
    "subtitle": "Jak odróżnić twarde dane statystyczne od subiektywnego komentarza publicysty",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "W Zadaniu 6 (wybór wielokrotny do dłuższego tekstu) ostatnie pytanie często sprawdza intencję całego artykułu: „What is the author's main purpose?”, „The author's tone in the final paragraph can be described as...”.\n\n### 1. Identyfikacja tonu autora:\n* **Critical (krytyczny):** autor punktuje wady, błędy, zaniedbania (*flawed, failed to, unacceptable*).\n* **Enthusiastic / Optimistic (entuzjastyczny):** pochwały, nadzieja (*breakthrough, impressive, bright future*).\n* **Neutral / Objective (neutralny / informacyjny):** czyste fakty, dane liczbowe, brak emocjonalnych przymiotników.\n* **Humorous / Ironic (ironiczny):** lekki ton, przejaskrawienia, żarty sytuacyjne.\n\n### 2. Pytanie o główny cel tekstu (Author's Purpose):\nZawsze czytaj tytuł artykułu oraz ostatni akapit – tam publicysta stawia ostateczną tezę!",
      "worked_examples": [
        {
          "title": "Przykład 1: Ocena intencji publicysty",
          "problem": "Ostatni akapit: „While city officials boast about their green initiatives, the streets remain littered and recycling rates have dropped by 10%. Until real funds are allocated, these eco-campaigns are nothing more than empty slogans.”\nJaki jest stosunek autora do działań władz?\nA. Enthusiastic about upcoming projects.  |  B. Sceptical of their true effectiveness.  |  C. Indifferent to environmental issues.",
          "steps": [
            {
              "num": 1,
              "label": "Wychwycenie słownictwa nacechowanego",
              "text": "Zwroty: „empty slogans” (puste hasła), spadek recyklingu, krytyka przechwałek urzędników."
            },
            {
              "num": 2,
              "label": "Określenie postawy",
              "text": "Autor powątpiewa w skuteczność i nazywa je pustymi hasłami – jest sceptyczny (sceptical)."
            }
          ],
          "result": "B",
          "matura_tip": "„Empty slogans” to jednoznaczny sygnał sceptycyzmu i krytyki."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Ocena intencji publicysty",
        "problem": "Ostatni akapit: „While city officials boast about their green initiatives, the streets remain littered and recycling rates have dropped by 10%. Until real funds are allocated, these eco-campaigns are nothing more than empty slogans.”\nJaki jest stosunek autora do działań władz?\nA. Enthusiastic about upcoming projects.  |  B. Sceptical of their true effectiveness.  |  C. Indifferent to environmental issues.",
        "steps": [
          {
            "num": 1,
            "label": "Wychwycenie słownictwa nacechowanego",
            "text": "Zwroty: „empty slogans” (puste hasła), spadek recyklingu, krytyka przechwałek urzędników."
          },
          {
            "num": 2,
            "label": "Określenie postawy",
            "text": "Autor powątpiewa w skuteczność i nazywa je pustymi hasłami – jest sceptyczny (sceptical)."
          }
        ],
        "result": "B",
        "matura_tip": "„Empty slogans” to jednoznaczny sygnał sceptycyzmu i krytyki."
      },
      "exam_trap": "Wybór odpowiedzi pochwalnej na podstawie wzmianki o „green initiatives”, ignorując słowa „empty slogans” na końcu zdania.",
      "matura_context": "Zadanie 6 CKE – 1 punkt."
    },
    "taskIds": [
      "eng_read_256",
      "eng_read_257",
      "eng_read_258",
      "eng_read_259",
      "eng_read_260"
    ]
  },
  {
    "id": "eng-lesson-11-3",
    "topicId": "eng-dzial-11",
    "pillarId": "pillar-reading",
    "title": "Teksty wieloźródłowe: Wyszukiwanie informacji w 3 różnych ofertach i recenzjach",
    "subtitle": "Porównywanie warunków, cen, lokalizacji i ograniczeń wiekowych w krótkich tekstach użytkowych",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Zadania oparte na 3 lub 4 krótkich tekstach (A, B, C, D) sprawdzają umiejętność szybkiej nawigacji po ogłoszeniach, ulotkach i forach internetowych:\n\n### 1. Anatomia zadania wieloźródłowego:\nW poleceniu masz serię pytań (np. *Which place offers a discount for students?*, *In which text does the author complain about bad service?*), a Twoim zadaniem jest przypisanie litery tekstu A, B lub C.\n\n### 2. Taktyka „Skanowanie od pytania”:\n1. Zamiast czytać wszystkie teksty po kolei, zacznij od pytania nr 1.\n2. Zidentyfikuj słowo-klucz w pytaniu (np. *discount for students*).\n3. Przeskanuj teksty pod kątem synonimów rabatu (*special rate, reduced price, student card*).\n4. Zaznacz właściwy tekst i przejdź do kolejnego pytania.",
      "worked_examples": [
        {
          "title": "Przykład 1: Wyszukanie kryterium wiekowego",
          "problem": "Pytanie: „Which summer camp is suitable only for teenagers aged 15 and above?”\nTekst A: „Open to children of all age groups from 7 to 14.”\nTekst B: „Participants must be between 10 and 16 years old.”\nTekst C: „Applicants must have completed primary school and be at least 15 on the start date.”",
          "steps": [
            {
              "num": 1,
              "label": "Lokalizacja kryterium wieku",
              "text": "Szukamy zwrotu „aged 15 and above”."
            },
            {
              "num": 2,
              "label": "Dopasowanie tekstu",
              "text": "Tekst C wyraźnie zaznacza: „at least 15 on the start date”."
            }
          ],
          "result": "Tekst C",
          "matura_tip": "„At least” oznacza „co najmniej”, co odpowiada sformułowaniu „aged 15 and above”."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Wyszukanie kryterium wiekowego",
        "problem": "Pytanie: „Which summer camp is suitable only for teenagers aged 15 and above?”\nTekst A: „Open to children of all age groups from 7 to 14.”\nTekst B: „Participants must be between 10 and 16 years old.”\nTekst C: „Applicants must have completed primary school and be at least 15 on the start date.”",
        "steps": [
          {
            "num": 1,
            "label": "Lokalizacja kryterium wieku",
            "text": "Szukamy zwrotu „aged 15 and above”."
          },
          {
            "num": 2,
            "label": "Dopasowanie tekstu",
            "text": "Tekst C wyraźnie zaznacza: „at least 15 on the start date”."
          }
        ],
        "result": "Tekst C",
        "matura_tip": "„At least” oznacza „co najmniej”, co odpowiada sformułowaniu „aged 15 and above”."
      },
      "exam_trap": "Mylenie przedziałów wiekowych (np. 15–18 vs poniżej 15 roku życia).",
      "matura_context": "Zadanie 6 lub 7 CKE – 3–4 punkty."
    },
    "taskIds": [
      "eng_read_261",
      "eng_read_262",
      "eng_read_263",
      "eng_read_264",
      "eng_read_265"
    ]
  },
  {
    "id": "eng-lesson-12-1",
    "topicId": "eng-dzial-12",
    "pillarId": "pillar-writing",
    "title": "Zasada 2-elementowego rozwinięcia: Różnica między wzmianką a rozwinięciem",
    "subtitle": "Jak zdobyć komplet 5 punktów za treść w Zadaniu 12 według oficjalnej tabeli CKE",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Wypowiedź pisemna (Zadanie 12) jest warta aż **12 punktów** (20% całego egzaminu!). Kryterium treści (Content) to aż 5 punktów.\n\n### 1. Oficjalne kryteria egzaminatora CKE:\nDla każdego z 4 podpunktów polecenia egzaminator decyduje, czy podpunkt został:\n* **Pominięty (0 pkt):** brak jakiejkolwiek informacji na ten temat.\n* **Jedynie odniesiony / wspomniany (Wzmianka):** jedno krótkie, ogólne zdanie bez szczegółów (np. *„I bought a bike.”*).\n* **Rozwinięty (Rozwinięcie):** uczeń podał szczegół, powód, emocję, opis lub konsekwencję (np. *„I bought a vintage red bicycle because I wanted to commute to school faster.”*).\n\n### 2. Tabela punktacji za treść:\n* 4 podpunkty rozwinięte = **5 punktów**.\n* 3 rozwinięte + 1 odniesiony = **4 punkty**.\n* 2 rozwinięte + 2 odniesione = **3 punkty**.\n* Tylko odniesione (bez rozwinięć) = maksymalnie **2 punkty**!\n\n### 3. Złota Zasada Podwójnego Zdania:\nDo KAŻDEJ z 4 kropek polecenia napisz **minimum dwa rozbudowane zdania**:\n1. Zdanie 1: Odniesienie wprost do kropki (fakt).\n2. Zdanie 2: Rozwinięcie (dlaczego? jak to wyglądało? jakie były emocje? co stało się potem?).",
      "worked_examples": [
        {
          "title": "Przykład 1: Przekształcenie wzmianki w pełne rozwinięcie",
          "problem": "Kropka polecenia: „Wyjaśnij, dlaczego zdecydowałeś się wziąć udział w biegu charytatywnym.”",
          "steps": [
            {
              "num": 1,
              "label": "Wersja słaba (Tylko wzmianka - ryzyko straty punktu)",
              "text": "„I took part in a charity run last Sunday.” (Brak wyjaśnienia DLACZEGO – niepełna realizacja kropki!)."
            },
            {
              "num": 2,
              "label": "Wersja wzorcowa (Pełne rozwinięcie na max punktów)",
              "text": "„I decided to take part in the charity run because our local animal shelter urgently needed money for medical supplies. What is more, I wanted to test my physical stamina before the upcoming marathon.”"
            },
            {
              "num": 3,
              "label": "Dlaczego to działa",
              "text": "Podano konkretny cel (schronisko dla zwierząt), powód osobisty (test wytrzymałości) oraz łącznik „What is more”."
            }
          ],
          "result": "Pełne rozwinięcie kwalifikujące do 5/5 pkt",
          "matura_tip": "Nigdy nie zostawiaj kropki z jednym 4-wyrazowym zdaniem!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Przekształcenie wzmianki w pełne rozwinięcie",
        "problem": "Kropka polecenia: „Wyjaśnij, dlaczego zdecydowałeś się wziąć udział w biegu charytatywnym.”",
        "steps": [
          {
            "num": 1,
            "label": "Wersja słaba (Tylko wzmianka - ryzyko straty punktu)",
            "text": "„I took part in a charity run last Sunday.” (Brak wyjaśnienia DLACZEGO – niepełna realizacja kropki!)."
          },
          {
            "num": 2,
            "label": "Wersja wzorcowa (Pełne rozwinięcie na max punktów)",
            "text": "„I decided to take part in the charity run because our local animal shelter urgently needed money for medical supplies. What is more, I wanted to test my physical stamina before the upcoming marathon.”"
          },
          {
            "num": 3,
            "label": "Dlaczego to działa",
            "text": "Podano konkretny cel (schronisko dla zwierząt), powód osobisty (test wytrzymałości) oraz łącznik „What is more”."
          }
        ],
        "result": "Pełne rozwinięcie kwalifikujące do 5/5 pkt",
        "matura_tip": "Nigdy nie zostawiaj kropki z jednym 4-wyrazowym zdaniem!"
      },
      "exam_trap": "Odpowiedź tylko na pierwszą część kropki, gdy polecenie zawiera dwa elementy (np. „Opisz swoje wrażenia I wyjaśnij, jak zareagowali widzowie”). Jeśli pominiesz reakcję widzów, kropka jest tylko wspomniana!",
      "matura_context": "Kryterium Treści Zadania 12 CKE (0–5 pkt)."
    },
    "taskIds": [
      "eng_wri_001",
      "eng_wri_002",
      "eng_wri_003",
      "eng_wri_004",
      "eng_wri_005"
    ]
  },
  {
    "id": "eng-lesson-12-2",
    "topicId": "eng-dzial-12",
    "pillarId": "pillar-writing",
    "title": "Kryteria CKE dla treści (0–5 pkt): Jak nie stracić punktu za pominięcie podpunktu",
    "subtitle": "Format 4 akapitów i fizyczne odhaczanie kropek na arkuszu egzaminacyjnym",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Najbardziej bolesnym błędem na maturze jest napisanie pięknej pracy językowej, która dostaje obniżoną notę, bo uczeń zapomniał o czwartej kropce polecenia!\n\n### 1. Anatomia idealnego układu akapitów:\n* **Wstęp:** Powitanie + powód napisania (ok. 15–20 słów).\n* **Akapit 1:** Rozwinięcie KROPKI 1 (ok. 25 słów).\n* **Akapit 2:** Rozwinięcie KROPKI 2 (ok. 25 słów).\n* **Akapit 3:** Rozwinięcie KROPKI 3 (ok. 25 słów).\n* **Akapit 4:** Rozwinięcie KROPKI 4 (ok. 25 słów).\n* **Zakończenie:** Wezwanie do odpowiedzi + podpis XYZ (ok. 15 słów).\n* **Łącznie:** ok. 100–120 słów (idealnie w bezpiecznym przedziale 80–130 słów).\n\n### 2. Ołówek w dłoni – technika egzaminacyjna:\nPrzed napisaniem każdego akapitu przeczytaj na głos w myślach treść kropki. Po napisaniu akapitu weź ołówek i postaw **wielki ptaszek (V)** przy zrealizowanej kropce w arkuszu.",
      "worked_examples": [
        {
          "title": "Przykład 1: Planowanie 4 akapitów",
          "problem": "Polecenie: 1) Opisz miejsce, 2) Przedstaw napotkany problem, 3) Napisz, kto ci pomógł, 4) Zaproponuj spotkanie.",
          "steps": [
            {
              "num": 1,
              "label": "Podział na akapity",
              "text": "Tworzymy 4 odrębne akapity treści, każdy poświęcony dokładnie jednej kropce."
            },
            {
              "num": 2,
              "label": "Kontrola realizacji",
              "text": "Każdy akapit zawiera zdanie wprowadzające kropkę oraz minimum jedno zdanie rozwijające."
            }
          ],
          "result": "Czysta, przejrzysta struktura czytelna dla egzaminatora w 10 sekund",
          "matura_tip": "Egzaminator CKE ma tylko kilka minut na ocenę Twojej pracy. Przejrzyste akapity ułatwiają mu przyznanie maksymalnej noty."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Planowanie 4 akapitów",
        "problem": "Polecenie: 1) Opisz miejsce, 2) Przedstaw napotkany problem, 3) Napisz, kto ci pomógł, 4) Zaproponuj spotkanie.",
        "steps": [
          {
            "num": 1,
            "label": "Podział na akapity",
            "text": "Tworzymy 4 odrębne akapity treści, każdy poświęcony dokładnie jednej kropce."
          },
          {
            "num": 2,
            "label": "Kontrola realizacji",
            "text": "Każdy akapit zawiera zdanie wprowadzające kropkę oraz minimum jedno zdanie rozwijające."
          }
        ],
        "result": "Czysta, przejrzysta struktura czytelna dla egzaminatora w 10 sekund",
        "matura_tip": "Egzaminator CKE ma tylko kilka minut na ocenę Twojej pracy. Przejrzyste akapity ułatwiają mu przyznanie maksymalnej noty."
      },
      "exam_trap": "Zlewanie całej pracy w jeden wielki, niepodzielony blok tekstu. Za brak akapitów traci się punkty w kryterium Spójności i Logiki!",
      "matura_context": "Kryterium Treści i Spójności – 7 punktów łącznie."
    },
    "taskIds": [
      "eng_wri_006",
      "eng_wri_007",
      "eng_wri_008",
      "eng_wri_009",
      "eng_wri_010"
    ]
  },
  {
    "id": "eng-lesson-12-3",
    "topicId": "eng-dzial-12",
    "pillarId": "pillar-writing",
    "title": "Płynne łączenie 4 wątków w jedną całość bez sztucznego wyliczania",
    "subtitle": "Jak uniknąć mechanicznego pisania „Po pierwsze... Po drugie...” i stworzyć naturalną historię",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Twoja praca nie może wyglądać jak lista odpowiedzi na ankietę! Egzaminator CKE ocenia płynność narracji:\n\n### 1. Sztuczne vs Naturalne przejścia:\n* **Sztuczne (brzmi jak robot):** „Point one is about my trip. Point two is about my car accident.”\n* **Naturalne (brzmi jak autentyczny list):** „You won't believe what happened when I arrived at the campsite. While I was pitching my tent, a sudden storm broke out...”\n\n### 2. Spójniki mostkowe (Transition bridges):\n* `To make matters worse, ...` (Na domiar złego, ...)\n* `Fortunately, just when I was about to give up, ...` (Na szczęście, właśnie gdy miałem się poddać, ...)\n* `Anyway, the best part of the whole experience was...` (W każdym razie, najlepszą częścią całego doświadczenia było...)",
      "worked_examples": [
        {
          "title": "Przykład 1: Mostek narracyjny między kropką 2 a 3",
          "problem": "Kropka 2: Problem z transportem. Kropka 3: Pomoc od nieznajomego.",
          "steps": [
            {
              "num": 1,
              "label": "Zastosowanie mostka",
              "text": "„I was stranded at the bus stop in the pouring rain with no buses running. Luckily, an elderly gentleman noticed my distress and kindly offered me a ride to the station.”"
            }
          ],
          "result": "Płynne przejście z dramatu sytuacji do rozwiązania za pomocą słowa „Luckily”",
          "matura_tip": "Słowa takie jak „Luckily”, „Unluckily”, „Unexpectedly” natychmiast ożywiają styl."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Mostek narracyjny między kropką 2 a 3",
        "problem": "Kropka 2: Problem z transportem. Kropka 3: Pomoc od nieznajomego.",
        "steps": [
          {
            "num": 1,
            "label": "Zastosowanie mostka",
            "text": "„I was stranded at the bus stop in the pouring rain with no buses running. Luckily, an elderly gentleman noticed my distress and kindly offered me a ride to the station.”"
          }
        ],
        "result": "Płynne przejście z dramatu sytuacji do rozwiązania za pomocą słowa „Luckily”",
        "matura_tip": "Słowa takie jak „Luckily”, „Unluckily”, „Unexpectedly” natychmiast ożywiają styl."
      },
      "exam_trap": "Stosowanie zbyt formalnych łączników (np. „Furthermore”, „In conclusion”) w luźnym e-mailu do kolegi – to błąd rejestru stylu.",
      "matura_context": "Kryterium Spójności i Logiki (0–2 pkt)."
    },
    "taskIds": [
      "eng_wri_011",
      "eng_wri_012",
      "eng_wri_013",
      "eng_wri_014",
      "eng_wri_015"
    ]
  },
  {
    "id": "eng-lesson-13-1",
    "topicId": "eng-dzial-13",
    "pillarId": "pillar-writing",
    "title": "Eliminacja kalk z języka polskiego (Ponglish: depend of, congratulate for, explain me)",
    "subtitle": "Najpopularniejsze błędy leksykalno-przyimkowe polskich maturzystów w pisaniu",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Kryterium poprawności językowej (0–2 pkt) ocenia liczbę i ciężar popełnionych błędów. Polscy uczniowie nagminnie tłumaczą dosłownie polskie przyimki:\n\n### 1. Złota dziesiątka błędnych kalk i ich poprawnych wersji:\n* ❌ *It depends of the weather* -> ✔️ **It depends on the weather** (zależeć od = depend on).\n* ❌ *I congratulate you your success* -> ✔️ **Congratulations on your success** (gratulować z okazji = congratulate on).\n* ❌ *Explain me this rule* -> ✔️ **Explain this rule to me** (wyjaśnić komuś = explain to somebody).\n* ❌ *I am married with a doctor* -> ✔️ **I am married to a doctor** (być w związku małżeńskim z = married to).\n* ❌ *She arrived to London* -> ✔️ **She arrived in London** (przybyć do miasta = arrive in / na dworzec = arrive at).\n* ❌ *I listen music* -> ✔️ **I listen to music** (słuchać czegoś = listen to).\n* ❌ *I agree with you in 100%* -> ✔️ **I agree with you 100%** (bez przyimka in!).",
      "worked_examples": [
        {
          "title": "Przykład 1: Korekta błędnego przyimka",
          "problem": "Zdanie ucznia: „Everything depends of our teacher’s decision.”",
          "steps": [
            {
              "num": 1,
              "label": "Lokalizacja błędu interferencyjnego",
              "text": "Czasownik depend łączy się wyłącznie z przyimkiem on."
            },
            {
              "num": 2,
              "label": "Wzorcowa poprawka",
              "text": "„Everything depends on our teacher's decision.”"
            }
          ],
          "result": "depends on",
          "matura_tip": "Zapamiętaj: „depend ON”, nigdy „depend of”!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Korekta błędnego przyimka",
        "problem": "Zdanie ucznia: „Everything depends of our teacher’s decision.”",
        "steps": [
          {
            "num": 1,
            "label": "Lokalizacja błędu interferencyjnego",
            "text": "Czasownik depend łączy się wyłącznie z przyimkiem on."
          },
          {
            "num": 2,
            "label": "Wzorcowa poprawka",
            "text": "„Everything depends on our teacher's decision.”"
          }
        ],
        "result": "depends on",
        "matura_tip": "Zapamiętaj: „depend ON”, nigdy „depend of”!"
      },
      "exam_trap": "Pomijanie przyimka „to” po czasowniku listen („I listened the lecture” to rażący błąd).",
      "matura_context": "Kryterium Poprawności Środków Językowych (0–2 pkt)."
    },
    "taskIds": [
      "eng_wri_081",
      "eng_wri_082",
      "eng_wri_083",
      "eng_wri_084",
      "eng_wri_085"
    ]
  },
  {
    "id": "eng-lesson-13-2",
    "topicId": "eng-dzial-13",
    "pillarId": "pillar-writing",
    "title": "Szyk zdania angielskiego (S-V-O) i unikanie podwójnych przeczeń",
    "subtitle": "Dlaczego w angielskim nie można przestawiać słów tak dowolnie jak w języku polskim",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Polski szyk zdania jest bardzo swobodny, bo końcówki fleksyjne pokazują, kto co robi. W języku angielskim szyk jest **sztywny i żelazny**:\n\n### 1. Złoty szyk zdania twierdzącego:\n`Podmiot (Subject) -> Orzeczenie (Verb) -> Dopełnienie (Object) -> Miejsce (Place) -> Czas (Time)`\n* ❌ *Yesterday bought I a new computer.*\n* ✔️ **I bought a new computer yesterday.** (Określnik czasu stoi na samym końcu lub na początku).\n\n### 2. Zakaz podwójnego przeczenia (Double Negative):\nW języku polskim mówimy: „Nigdy nikomu nic nie powiedziałem” (4 przeczenia!).\nW języku angielskim w jednym zdaniu może wystąpić **TYLKO JEDNO PRZECZENIE**:\n* ❌ *I didn't see nobody nowhere.*\n* ✔️ **I didn't see anybody anywhere.**\n* ✔️ **I saw nobody.** (Gdy używasz nobody, czasownik musi być twierdzący: saw, a nie didn't see).",
      "worked_examples": [
        {
          "title": "Przykład 1: Eliminacja podwójnego przeczenia",
          "problem": "Zdanie ucznia: „She didn't know nothing about the surprise party.”",
          "steps": [
            {
              "num": 1,
              "label": "Wykrycie dwóch zaprzeczeń",
              "text": "Mamy przeczenie w operatorze („didn't”) oraz zaprzeczone słowo „nothing”."
            },
            {
              "num": 2,
              "label": "Zastosowanie reguły any-",
              "text": "Po przeczeniu słowa zaprzeczone zamieniamy na formy z any-: anything."
            }
          ],
          "result": "She didn't know anything about the surprise party.",
          "matura_tip": "Nigdy nie łącz „didn't” z „nothing”, „nobody”, „never”!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Eliminacja podwójnego przeczenia",
        "problem": "Zdanie ucznia: „She didn't know nothing about the surprise party.”",
        "steps": [
          {
            "num": 1,
            "label": "Wykrycie dwóch zaprzeczeń",
            "text": "Mamy przeczenie w operatorze („didn't”) oraz zaprzeczone słowo „nothing”."
          },
          {
            "num": 2,
            "label": "Zastosowanie reguły any-",
            "text": "Po przeczeniu słowa zaprzeczone zamieniamy na formy z any-: anything."
          }
        ],
        "result": "She didn't know anything about the surprise party.",
        "matura_tip": "Nigdy nie łącz „didn't” z „nothing”, „nobody”, „never”!"
      },
      "exam_trap": "Kalka polskiego szyku: stawianie przysłówka czasu między czasownikiem a dopełnieniem, np. „I like very much this film” zamiast „I like this film very much”.",
      "matura_context": "Kryterium Poprawności (0–2 pkt)."
    },
    "taskIds": [
      "eng_wri_086",
      "eng_wri_087",
      "eng_wri_088",
      "eng_wri_089",
      "eng_wri_090"
    ]
  },
  {
    "id": "eng-lesson-13-3",
    "topicId": "eng-dzial-13",
    "pillarId": "pillar-writing",
    "title": "Poprawność ortograficzna i interpunkcyjna w słowach kluczowych matury",
    "subtitle": "Podwójne litery (accommodation, embarrassed) oraz zasady apostrofów w pisaniu",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Błędy ortograficzne w wyrazach popularnych obniżają ocenę za poprawność. Oto słowa, w których maturzyści mylą się najczęściej:\n\n### 1. Zestawienie wyrazów podwyższonego ryzyka:\n* `accommodation` (podwójne **cc** i podwójne **mm**!).\n* `embarrassed` (podwójne **rr** i podwójne **ss**).\n* `definitely` (przez **i**, nigdy przez a: *definitly* czy *definately*).\n* `necessary` (jedno **c**, podwójne **ss** – mnemotechnika: *one Coffee, two Sugars*).\n* `until` (jedno **l** na końcu! Podwójne ll ma słowo *till*).\n* `which` (z literą **h**, a nie *witch* – czarownica).\n\n### 2. Apostrofy i formy skrócone:\nW nieformalnym e-mailu formy skrócone (*I'm, don't, can't, wouldn't*) są jak najbardziej mile widziane, ale pamiętaj o precyzyjnym wstawieniu apostrofu:\n* `it's` = it is (to jest), `its` = jego/jej (zaimek dzierżawczy).",
      "worked_examples": [
        {
          "title": "Przykład 1: Bezbłędna pisownia trudnego słowa",
          "problem": "Napisz zdanie o zakwaterowaniu na obozie.",
          "steps": [
            {
              "num": 1,
              "label": "Sprawdzenie trudnych liter",
              "text": "Słowo accommodation ma dwie litery c i dwie litery m."
            },
            {
              "num": 2,
              "label": "Zastosowanie w zdaniu",
              "text": "„The accommodation provided by the organizers was exceptionally comfortable.”"
            }
          ],
          "result": "accommodation (2x c, 2x m)",
          "matura_tip": "Przed oddaniem pracy poświęć 2 minuty na przeczytanie wyrazów z podwójnymi literami."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Bezbłędna pisownia trudnego słowa",
        "problem": "Napisz zdanie o zakwaterowaniu na obozie.",
        "steps": [
          {
            "num": 1,
            "label": "Sprawdzenie trudnych liter",
            "text": "Słowo accommodation ma dwie litery c i dwie litery m."
          },
          {
            "num": 2,
            "label": "Zastosowanie w zdaniu",
            "text": "„The accommodation provided by the organizers was exceptionally comfortable.”"
          }
        ],
        "result": "accommodation (2x c, 2x m)",
        "matura_tip": "Przed oddaniem pracy poświęć 2 minuty na przeczytanie wyrazów z podwójnymi literami."
      },
      "exam_trap": "Mylenie „there” (tam), „their” (ich) oraz „they're” (oni są).",
      "matura_context": "Kryterium Poprawności Środków Językowych."
    },
    "taskIds": [
      "eng_wri_091",
      "eng_wri_092",
      "eng_wri_093",
      "eng_wri_094",
      "eng_wri_095"
    ]
  },
  {
    "id": "eng-lesson-14-1",
    "topicId": "eng-dzial-14",
    "pillarId": "pillar-writing",
    "title": "Złota siódemka łączników: First of all, What is more, However, As a result",
    "subtitle": "Niezbędny bank spójników podnoszący ocenę za Spójność i Logikę (Coherence)",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Kryterium Spójności i Logiki (0–2 pkt) bada, czy Twoja wypowiedź tworzy harmonijną całość. Jeśli używasz wyłącznie słówek *and*, *but* i *because*, Twoja praca brzmi ubogo!\n\n### 1. Złota Siódemka Łączników dla Maturzysty B1/B2:\n1. **First of all, / To begin with,** (Przede wszystkim / Na początek) – idealne do otwarcia pierwszego akapitu rozwinięcia.\n2. **What is more, / In addition,** (Co więcej / Ponadto) – dodawanie kolejnego argumentu lub faktu.\n3. **However, / On the other hand,** (Jednakże / Z drugiej strony) – wprowadzanie kontrastu lub niespodziewanego problemu.\n4. **As a result, / Therefore,** (W rezultacie / Dlatego też) – przedstawianie logicznego skutku.\n5. **Luckily, / Fortunately,** (Na szczęście) – pozytywny zwrot akcji po trudnej sytuacji.\n6. **To make matters worse,** (Co gorsza / Na domiar złego) – podbicie dramatyzmu w opowiadaniu.\n7. **All in all, / To sum up,** (Podsumowując) – płynne przejście do podsumowania.\n\n### 2. Interpunkcja po łącznikach:\nWszystkie powyższe łączniki postawione na początku zdania **muszą być oddzielone przecinkiem**!\n* *„What is more, the tickets were surprisingly cheap.”*",
      "worked_examples": [
        {
          "title": "Przykład 1: Podniesienie jakości stylu łącznikiem",
          "problem": "Wersja prosta: „The weather was bad. We couldn't go hiking. We went to a museum.”\nZmień to w płynny styl B2.",
          "steps": [
            {
              "num": 1,
              "label": "Zastosowanie łącznika skutku",
              "text": "Zamiast kropki łączymy przyczynę i skutek za pomocą „As a result”."
            },
            {
              "num": 2,
              "label": "Zastosowanie spójnika alternatywy",
              "text": "„Instead” na końcu pokazuje alternatywę."
            },
            {
              "num": 3,
              "label": "Wersja ulepszona",
              "text": "„The weather was terrible. As a result, we couldn't go hiking and decided to visit a local museum instead.”"
            }
          ],
          "result": "Płynny styl maturalny na 2/2 pkt za spójność",
          "matura_tip": "Użycie choćby 3 różnych łączników z listy gwarantuje pełną pulę 2 pkt za spójność!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Podniesienie jakości stylu łącznikiem",
        "problem": "Wersja prosta: „The weather was bad. We couldn't go hiking. We went to a museum.”\nZmień to w płynny styl B2.",
        "steps": [
          {
            "num": 1,
            "label": "Zastosowanie łącznika skutku",
            "text": "Zamiast kropki łączymy przyczynę i skutek za pomocą „As a result”."
          },
          {
            "num": 2,
            "label": "Zastosowanie spójnika alternatywy",
            "text": "„Instead” na końcu pokazuje alternatywę."
          },
          {
            "num": 3,
            "label": "Wersja ulepszona",
            "text": "„The weather was terrible. As a result, we couldn't go hiking and decided to visit a local museum instead.”"
          }
        ],
        "result": "Płynny styl maturalny na 2/2 pkt za spójność",
        "matura_tip": "Użycie choćby 3 różnych łączników z listy gwarantuje pełną pulę 2 pkt za spójność!"
      },
      "exam_trap": "Nadużywanie łącznika „Besides” w nieformalnym liście w tonie protekcjonalnym lub wstawianie łączników bez przecinka.",
      "matura_context": "Kryterium Spójności i Logiki (0–2 pkt)."
    },
    "taskIds": [
      "eng_wri_141",
      "eng_wri_142",
      "eng_wri_143",
      "eng_wri_144",
      "eng_wri_145"
    ]
  },
  {
    "id": "eng-lesson-14-2",
    "topicId": "eng-dzial-14",
    "pillarId": "pillar-writing",
    "title": "Kompozycja akapitu: Wstęp, rozwinięcie z argumentacją i podsumowanie",
    "subtitle": "Wewnętrzna struktura każdego akapitu e-maila: idea główna -> szczegół -> wniosek",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Dobry akapit maturalny nie składa się z przypadkowych zdań. Każdy akapit powinien stanowić zwartą mini-historię:\n\n### 1. Wzorzec 3-zdaniowego akapitu maturalnego:\n* **Zdanie 1 (Fakt powiązany z kropką CKE):** *„First of all, I decided to take up voluntary work at a local animal shelter.”*\n* **Zdanie 2 (Szczegół i rozwinięcie):** *„My main responsibilities include feeding the dogs and taking them for long walks in the nearby park.”*\n* **Zdanie 3 (Uczucie / Konkluzja):** *„It is physically tiring, but seeing the happy animals gives me incredible satisfaction.”*\n\n### 2. Spójność wewnętrzna:\nZauważ, jak słowa w tym akapicie łączą się ze sobą: *voluntary work -> animal shelter -> feeding dogs -> happy animals -> satisfaction*. Taki przepływ myśli uczeń osiąga automatycznie, stosując ten model.",
      "worked_examples": [
        {
          "title": "Przykład 1: Wzorcowy akapit o zakupie prezentu",
          "problem": "Zrealizuj kropkę: „Napisz, jaki prezent kupiłeś koledze i uzasadnij swój wybór.”",
          "steps": [
            {
              "num": 1,
              "label": "Zdanie 1 (Fakt)",
              "text": "„For his birthday, I decided to buy him a high-quality leather guitar strap.”"
            },
            {
              "num": 2,
              "label": "Zdanie 2 (Uzasadnienie)",
              "text": "„I chose it because he has been practicing guitar for hours every day, and his old strap was completely worn out.”"
            },
            {
              "num": 3,
              "label": "Zdanie 3 (Reakcja)",
              "text": "„I’m absolutely sure he will love the vintage look and the soft padding.”"
            }
          ],
          "result": "Perfekcyjne 35 słów realizujące kropkę w 100%",
          "matura_tip": "Trzy precyzyjne zdania w akapicie to gwarancja idealnego limitu słów bez lania wody!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Wzorcowy akapit o zakupie prezentu",
        "problem": "Zrealizuj kropkę: „Napisz, jaki prezent kupiłeś koledze i uzasadnij swój wybór.”",
        "steps": [
          {
            "num": 1,
            "label": "Zdanie 1 (Fakt)",
            "text": "„For his birthday, I decided to buy him a high-quality leather guitar strap.”"
          },
          {
            "num": 2,
            "label": "Zdanie 2 (Uzasadnienie)",
            "text": "„I chose it because he has been practicing guitar for hours every day, and his old strap was completely worn out.”"
          },
          {
            "num": 3,
            "label": "Zdanie 3 (Reakcja)",
            "text": "„I’m absolutely sure he will love the vintage look and the soft padding.”"
          }
        ],
        "result": "Perfekcyjne 35 słów realizujące kropkę w 100%",
        "matura_tip": "Trzy precyzyjne zdania w akapicie to gwarancja idealnego limitu słów bez lania wody!"
      },
      "exam_trap": "Wprowadzanie do akapitu dygresji niezwiązanych z kropką polecenia (np. opowiadanie o swoim psie w akapicie o naprawie roweru).",
      "matura_context": "Kryterium Treści i Spójności."
    },
    "taskIds": [
      "eng_wri_146",
      "eng_wri_147",
      "eng_wri_148",
      "eng_wri_149",
      "eng_wri_150"
    ]
  },
  {
    "id": "eng-lesson-14-3",
    "topicId": "eng-dzial-14",
    "pillarId": "pillar-writing",
    "title": "Płynność i naturalność tekstu – eliminacja urywanych, izolowanych zdań",
    "subtitle": "Zastępowanie prostych konstrukcji zdaniami złożonymi z which, who, where, because",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Kryterium Zakresu Środków Językowych (0–3 pkt) nagradza używanie zdań podrzędnie złożonych (Complex Sentences). \n\n### 1. Poziom A2 vs Poziom B1/B2:\n* **Styl podstawowy A2 (proste zdanka):**\n  * *„I met a boy. His name is Alex. He lives in London. He plays tennis very well.”*\n* **Styl dojrzały B1/B2 (zdanie złożone):**\n  * *„During my stay in London, I met a boy named Alex, **who** is an exceptionally talented tennis player.”*\n\n### 2. Narzędzia scalania zdań:\n* Zaimki względne: `who` (ludzie), `which` (rzeczy), `where` (miejsca), `whose` (czyj).\n* Łączniki przyczynowo-skutkowe: `since / as` (jako że / ponieważ), `so that` (aby / w celu).\n* Imiesłowy: *„Arriving at the hotel, we realized that...”*",
      "worked_examples": [
        {
          "title": "Przykład 1: Połączenie dwóch zdań zaimkiem względnym",
          "problem": "Połącz: „We stayed in a lovely guesthouse. It was located right next to a peaceful lake.”",
          "steps": [
            {
              "num": 1,
              "label": "Wybór spójnika",
              "text": "Guesthouse to budynek/rzecz, więc używamy „which” lub „that”."
            },
            {
              "num": 2,
              "label": "Połączenie w zdanie złożone",
              "text": "„We stayed in a lovely guesthouse which was located right next to a peaceful lake.”"
            }
          ],
          "result": "Jedno eleganckie zdanie złożone",
          "matura_tip": "Zdania ze spójnikami „who/which” natychmiast podnoszą ocenę za zakres środków językowych (Range)."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Połączenie dwóch zdań zaimkiem względnym",
        "problem": "Połącz: „We stayed in a lovely guesthouse. It was located right next to a peaceful lake.”",
        "steps": [
          {
            "num": 1,
            "label": "Wybór spójnika",
            "text": "Guesthouse to budynek/rzecz, więc używamy „which” lub „that”."
          },
          {
            "num": 2,
            "label": "Połączenie w zdanie złożone",
            "text": "„We stayed in a lovely guesthouse which was located right next to a peaceful lake.”"
          }
        ],
        "result": "Jedno eleganckie zdanie złożone",
        "matura_tip": "Zdania ze spójnikami „who/which” natychmiast podnoszą ocenę za zakres środków językowych (Range)."
      },
      "exam_trap": "Nadużywanie słowa „and” do łączenia 5 zdań w jedno tasiemcowe zdanie bez żadnej interpunkcji.",
      "matura_context": "Kryterium Zakresu Środków Językowych (0–3 pkt)."
    },
    "taskIds": [
      "eng_wri_151",
      "eng_wri_152",
      "eng_wri_153",
      "eng_wri_154",
      "eng_wri_155"
    ]
  },
  {
    "id": "eng-lesson-15-1",
    "topicId": "eng-dzial-15",
    "pillarId": "pillar-writing",
    "title": "Wzorcowy e-mail nieformalny (80–130 słów) – szablon, 4 kropki i podpis XYZ",
    "subtitle": "Kompletny szkielet oficjalnego e-maila maturalnego z pełnym omówieniem każdego elementu",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "E-mail do znajomego to najczęstsza forma wypowiedzi w Zadaniu 12 CKE. Musi spełniać żelazne wymogi kompozycyjne:\n\n### 1. Nienaruszalna struktura e-maila:\n1. **Zwrot powitalny:** `Hi Mark,` lub `Dear Anna,` (uwaga: po powitaniu stawiamy przecinek!).\n2. **Wstęp (1–2 zdania):** Nawiązanie kontaktu i podanie celu:\n   * *„Hope you're doing well! I'm writing to tell you some exciting news about...”*\n3. **Rozwinięcie 4 kropek (w 3–4 akapitach):** Realizacja poleceń arkusza z wykorzystaniem łączników.\n4. **Zakończenie (1–2 zdania):** Uprzejma formuła zamykająca i prośba o kontakt:\n   * *„That's all for now. Write back soon and let me know what you think!”*\n5. **Formuła pożegnalna i podpis:**\n   * `Best wishes,` / `Take care,` / `All the best,`\n   * **XYZ** (OBOWIĄZKOWO! Zakaz podpisywania się imieniem!).\n\n### 2. Dopuszczalny limit słów CKE:\n* Wymagany limit: **80–130 słów**.\n* Bezpieczny przedział: celuj w **100–115 słów** – wtedy masz pewność, że wszystkie kropki są rozwinięte, a praca nie przekroczy dopuszczalnego limitu.",
      "worked_examples": [
        {
          "title": "Przykład 1: Pełny wzorcowy szkielet e-maila",
          "problem": "Napisz e-mail do kolegi z Londynu o nowym kursie językowym.",
          "steps": [
            {
              "num": 1,
              "label": "Wstęp",
              "text": "„Hi Tom,\nHope you’re having a great week! I’m writing to let you know that I’ve just enrolled in an intensive Spanish course.”"
            },
            {
              "num": 2,
              "label": "Rozwinięcie z łącznikami",
              "text": "„First of all, the classes take place twice a week in a cozy language school downtown. Our native speaker teacher is incredibly enthusiastic and encourages us to speak from day one. What is more, I have already made friends with three students who share my passion for travel.”"
            },
            {
              "num": 3,
              "label": "Zakończenie i podpis",
              "text": "„What about you? Have you started any new hobbies recently? Write back soon!\n\nBest wishes,\nXYZ”"
            }
          ],
          "result": "Dokładnie 92 słowa – 100% punktów (12/12 pkt)",
          "matura_tip": "Nigdy nie podpisuj się własnym imieniem! Podpisanie się jako Oskar czy Ania grozi unieważnieniem pracy przez CKE!"
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Pełny wzorcowy szkielet e-maila",
        "problem": "Napisz e-mail do kolegi z Londynu o nowym kursie językowym.",
        "steps": [
          {
            "num": 1,
            "label": "Wstęp",
            "text": "„Hi Tom,\nHope you’re having a great week! I’m writing to let you know that I’ve just enrolled in an intensive Spanish course.”"
          },
          {
            "num": 2,
            "label": "Rozwinięcie z łącznikami",
            "text": "„First of all, the classes take place twice a week in a cozy language school downtown. Our native speaker teacher is incredibly enthusiastic and encourages us to speak from day one. What is more, I have already made friends with three students who share my passion for travel.”"
          },
          {
            "num": 3,
            "label": "Zakończenie i podpis",
            "text": "„What about you? Have you started any new hobbies recently? Write back soon!\n\nBest wishes,\nXYZ”"
          }
        ],
        "result": "Dokładnie 92 słowa – 100% punktów (12/12 pkt)",
        "matura_tip": "Nigdy nie podpisuj się własnym imieniem! Podpisanie się jako Oskar czy Ania grozi unieważnieniem pracy przez CKE!"
      },
      "exam_trap": "Podpisanie się własnym imieniem lub nazwiskiem! Zgodnie z wytycznymi CKE uczeń ma obowiązek podpisać się wyłącznie jako XYZ.",
      "matura_context": "Zadanie 12 CKE (12 punktów – 20% całej matury)."
    },
    "taskIds": [
      "eng_wri_191",
      "eng_wri_192",
      "eng_wri_193",
      "eng_wri_194",
      "eng_wri_195"
    ]
  },
  {
    "id": "eng-lesson-15-2",
    "topicId": "eng-dzial-15",
    "pillarId": "pillar-writing",
    "title": "Wzorcowy wpis na blogu internetowym – chwytliwy tytuł i wezwanie do dyskusji",
    "subtitle": "Specyfika gatunkowa bloga: angażowanie czytelników, nagłówki i sekcja komentarzy",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Wpis na blogu (Blog post) to druga dopuszczalna forma w Zadaniu 12. Różni się od e-maila stylem komunikacji – zwracasz się nie do jednej osoby, lecz do **społeczności czytelników bloga**:\n\n### 1. Elementy charakterystyczne wpisu na blogu:\n* **Chwytliwy tytuł (Title):** Zawsze dodaj krótki, intrygujący tytuł na samej górze:\n  * *„Why I gave up my smartphone for a week!”*, *„My unforgettable volunteer adventure”*.\n* **Powitanie społeczności:**\n  * *„Hi everyone! Welcome back to my blog!”*, *„Hello fellow readers!”*.\n* **Bezpośrednie zwroty do czytelników:**\n  * *„Have you ever wondered...?”, „As you probably know from my last post...”, „Believe me when I say...”*.\n* **Call to Action (Wezwanie do komentowania):**\n  * *„What are your thoughts on this? Have you had a similar experience? Drop a comment below and let me know!”*.\n* **Podpis:** Brak formalnego pożegnania – wystarczy sam podpis: **XYZ**.",
      "worked_examples": [
        {
          "title": "Przykład 1: Wzorcowy wpis na blogu o ekologii",
          "problem": "Napisz wpis na blogu o akcji sprzątania lasu.",
          "steps": [
            {
              "num": 1,
              "label": "Tytuł i powitanie",
              "text": "„Green Weekend: How We Cleaned Our Local Forest!\n\nHi everyone! Welcome back to my blog.”"
            },
            {
              "num": 2,
              "label": "Treść",
              "text": "„Last Saturday, my classmates and I took part in an eco-campaign. We collected over twenty bags of plastic bottles and old tires. Although it was hard work, we felt proud of the visible transformation.”"
            },
            {
              "num": 3,
              "label": "Zakończenie z wezwaniem",
              "text": "„Do you take part in ecological events in your area? Share your stories in the comments below!\n\nXYZ”"
            }
          ],
          "result": "Wzorcowy blog post (88 słów) z pełną realizacją cech gatunkowych",
          "matura_tip": "Tytuł i wezwanie do komentowania gwarantują maksymalną notę za spójność i zakres stylu."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Wzorcowy wpis na blogu o ekologii",
        "problem": "Napisz wpis na blogu o akcji sprzątania lasu.",
        "steps": [
          {
            "num": 1,
            "label": "Tytuł i powitanie",
            "text": "„Green Weekend: How We Cleaned Our Local Forest!\n\nHi everyone! Welcome back to my blog.”"
          },
          {
            "num": 2,
            "label": "Treść",
            "text": "„Last Saturday, my classmates and I took part in an eco-campaign. We collected over twenty bags of plastic bottles and old tires. Although it was hard work, we felt proud of the visible transformation.”"
          },
          {
            "num": 3,
            "label": "Zakończenie z wezwaniem",
            "text": "„Do you take part in ecological events in your area? Share your stories in the comments below!\n\nXYZ”"
          }
        ],
        "result": "Wzorcowy blog post (88 słów) z pełną realizacją cech gatunkowych",
        "matura_tip": "Tytuł i wezwanie do komentowania gwarantują maksymalną notę za spójność i zakres stylu."
      },
      "exam_trap": "Pominięcie tytułu na blogu lub zwracanie się w liczbie pojedynczej jak w liście do jednej osoby („Hi Mark” na blogu to błąd gatunkowy!).",
      "matura_context": "Zadanie 12 CKE – alternatywna forma pisemna."
    },
    "taskIds": [
      "eng_wri_196",
      "eng_wri_197",
      "eng_wri_198",
      "eng_wri_199",
      "eng_wri_200"
    ]
  },
  {
    "id": "eng-lesson-15-3",
    "topicId": "eng-dzial-15",
    "pillarId": "pillar-writing",
    "title": "Strategia 5 minut przed oddaniem arkusza: Liczenie słów, autokorekta i podpis XYZ",
    "subtitle": "Checklista kontrolna maturzysty: szybkie wyłapanie brakujących liter, -s w 3. osobie i limitu 80–130 słów",
    "estimatedMinutes": 5,
    "theoryPill": {
      "concept_essence": "Ostatnie 5–7 minut egzaminu powinno być przeznaczone wyłącznie na **świadomą autokorektę** napisanego tekstu. Statystyki pokazują, że uważna korekta pozwala uratować od 2 do 4 cennych punktów!\n\n### 1. Checklista Autokorekty w 4 Krokach:\n1. **Krok 1: Sprawdzenie 4 Kropek:** Czy na pewno odniosłem się do każdej kropki i dopisałem drugie zdanie rozwijające? (5/5 pkt za treść).\n2. **Krok 2: Liczenie słów:** Szybko policz słowa.\n   * Jeśli masz mniej niż 80 słów -> natychmiast dopisz jedno zdanie z przymiotnikami w wybranym akapicie.\n   * Jeśli masz powyżej 130 słów (np. 150) -> skreśl jedno niepotrzebne zdanie poboczne. Za przekroczenie limitu egzaminator nie odbiera punktów bezpośrednio, ale im więcej piszesz, tym większe ryzyko błędów językowych!\n3. **Krok 3: Końcówka -s w Present Simple:** Sprawdź czasowniki po *he, she, it* (np. *he plays, she thinks*). To najczęstszy błąd pośpiechu!\n4. **Krok 4: Podpis XYZ:** Upewnij się, że praca kończy się literami **XYZ**, a nie Twoim prawdziwym imieniem.",
      "worked_examples": [
        {
          "title": "Przykład 1: Szybka korekta tekstu w brudnopisie",
          "problem": "Zdanie ucznia przed korektą: „My brother live in London and he always help me when I has a problem.”",
          "steps": [
            {
              "num": 1,
              "label": "Wykrycie braku -s w 3. osobie",
              "text": "„My brother” to he -> wymaga „lives” oraz „helps”."
            },
            {
              "num": 2,
              "label": "Korekta czasownika have dla I",
              "text": "Dla podmiotu „I” formą teraźniejszą jest „have”, a nie has."
            },
            {
              "num": 3,
              "label": "Wersja po autokorekcie",
              "text": "„My brother lives in London and he always helps me when I have a problem.”"
            }
          ],
          "result": "Wyeliminowano 3 kardynalne błędy gramatyczne w jednym zdaniu",
          "matura_tip": "Przeznaczenie 5 minut na sprawdzenie tych 4 kroków często decyduje o zyskaniu dodatkowych punktów."
        }
      ],
      "worked_example": {
        "title": "Przykład 1: Szybka korekta tekstu w brudnopisie",
        "problem": "Zdanie ucznia przed korektą: „My brother live in London and he always help me when I has a problem.”",
        "steps": [
          {
            "num": 1,
            "label": "Wykrycie braku -s w 3. osobie",
            "text": "„My brother” to he -> wymaga „lives” oraz „helps”."
          },
          {
            "num": 2,
            "label": "Korekta czasownika have dla I",
            "text": "Dla podmiotu „I” formą teraźniejszą jest „have”, a nie has."
          },
          {
            "num": 3,
            "label": "Wersja po autokorekcie",
            "text": "„My brother lives in London and he always helps me when I have a problem.”"
          }
        ],
        "result": "Wyeliminowano 3 kardynalne błędy gramatyczne w jednym zdaniu",
        "matura_tip": "Przeznaczenie 5 minut na sprawdzenie tych 4 kroków często decyduje o zyskaniu dodatkowych punktów."
      },
      "exam_trap": "Oddanie pracy bez policzenia słów (np. 65 słów oznacza dotkliwą redukcję punktacji za treść i formę).",
      "matura_context": "Zadanie 12 CKE – bezpiecznik maksymalnego wyniku."
    },
    "taskIds": [
      "eng_wri_201",
      "eng_wri_202",
      "eng_wri_203",
      "eng_wri_204",
      "eng_wri_205"
    ]
  }
];

export function getEnglishLessonById(lessonId: string): EnglishLessonData | undefined {
  return ENGLISH_LESSONS.find(l => l.id === lessonId);
}

export function getEnglishLessonsByTopic(topicId: string): EnglishLessonData[] {
  return ENGLISH_LESSONS.filter(l => l.topicId === topicId);
}

export function getEnglishLessonsByPillar(pillarId: string): EnglishLessonData[] {
  return ENGLISH_LESSONS.filter(l => l.pillarId === pillarId);
}
