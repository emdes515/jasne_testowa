import { PolishTask } from '../../types/maturaTypes';

export const POLISH_TASKS_PART_1: PolishTask[] = [
  // --- ZESTAW 1: Turystyka i doświadczanie świata (wzorowane na CKE Maj 2023) ---
  {
    id: 'pol-p1-001',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'true_false',
    title: 'Analiza tekstu 1 – Fakty i opinie o turystyce',
    points: 1,
    passage: {
      author: 'Agnieszka Krzemińska',
      sourceTitle: 'Podróże w czasie i przestrzeni',
      text: 'Masowa turystyka stała się jednym z najbardziej ekspansywnych zjawisk XXI wieku. Współczesny turysta często nie szuka autentycznego spotkania z Innym, lecz pragnie jedynie potwierdzić wyobrażenia ukształtowane przez foldery reklamowe i media społecznościowe. Miejsca o głębokiej tożsamości historycznej przekształcają się w swoiste parki rozrywki, gdzie kultura staje się towarem na sprzedaż, a mieszkańcy – dekoracją dla poszukujących idealnego kadru przybyszów.'
    },
    question: 'Oceń prawdziwość poniższych stwierdzeń na podstawie tekstu Agnieszki Krzemińskiej.',
    trueFalseStatements: [
      {
        statement: 'Autorka uważa, że współczesny turysta stawia na autentyczne, pogłębione relacje z obcą kulturą.',
        isTrue: false,
        explanation: 'Fałsz: Autorka wyraźnie stwierdza, że turysta „nie szuka autentycznego spotkania z Innym”, lecz potwierdzenia wyobrażeń.'
      },
      {
        statement: 'Według autorki masowa turystyka prowadzi do komercjalizacji tradycyjnych przestrzeni kulturowych.',
        isTrue: true,
        explanation: 'Prawda: Autorka pisze, że miejsca przekształcają się w „parki rozrywki”, a kultura staje się „towarem na sprzedaż”.'
      }
    ],
    explanation: 'Zadanie wymaga precyzyjnego odróżnienia tezy autorki od manipulacji informacyjnych.',
    sourceYear: 'CKE Maj 2023 (Formuła 2023)'
  },
  {
    id: 'pol-p1-002',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'short_open',
    title: 'Rozumienie metafory: „kultura staje się towarem na sprzedaż”',
    points: 1,
    passage: {
      author: 'Agnieszka Krzemińska',
      sourceTitle: 'Podróże w czasie i przestrzeni',
      text: 'Miejsca o głębokiej tożsamości historycznej przekształcają się w swoiste parki rozrywki, gdzie kultura staje się towarem na sprzedaż, a mieszkańcy – dekoracją dla poszukujących idealnego kadru przybyszów.'
    },
    question: 'Wyjaśnij własnymi słowami sens sformułowania „kultura staje się towarem na sprzedaż” w kontekście przytoczonego akapitu.',
    correctAnswerText: 'Sformułowanie to oznacza, że wartości kulturowe, tradycje i dziedzictwo tracą swój autentyczny, duchowy charakter, a zaczynają być traktowane wyłącznie materialnie i komercyjnie – jako produkt oferowany turystom dla zysku.',
    ckeKeyCriteria: [
      '1 pkt – poprawne wyjaśnienie sensu sformułowania w kontekście komercjalizacji kultury / utraty autentyczności na rzecz zysku.',
      '0 pkt – odpowiedź błędna, powtórzenie słów z tekstu bez wyjaśnienia lub brak odpowiedzi.'
    ],
    explanation: 'W zadaniach CKE tego typu należy unikać cytowania – kluczem jest parafraza i synteza znaczenia metafory.',
    sourceYear: 'CKE Maj 2023 (Formuła 2023)'
  },
  {
    id: 'pol-p1-003',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'single_choice',
    title: 'Funkcja językowa wypowiedzi',
    points: 1,
    passage: {
      author: 'Ola Stanisławska',
      sourceTitle: 'Świat na wyciągnięcie ręki',
      text: 'Zatrzymaj się na chwilę. Wyłącz telefon, odłóż aparat i po prostu spójrz na to wzgórze w promieniach zachodzącego słońca. Nie rejestruj – przeżywaj!'
    },
    question: 'Jaka funkcja językowa dominuje w przytoczonym fragmencie tekstu Oli Stanisławskiej?',
    options: [
      'A. Funkcja poznawcza (informacyjna)',
      'B. Funkcja impresywna (apelatywna)',
      'C. Funkcja fatyczna',
      'D. Funkcja metajęzykowa'
    ],
    correctOptionIndex: 1,
    explanation: 'Występują czasowniki w trybie rozkazującym („zatrzymaj się”, „wyłącz”, „odłóż”, „przeżywaj”), których celem jest wpłynięcie na zachowanie odbiorcy (funkcja impresywna).',
    sourceYear: 'CKE Maj 2023 (Formuła 2023)'
  },
  {
    id: 'pol-p1-004',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'short_open',
    title: 'Środek retoryczny i jego funkcja w tekście',
    points: 1,
    passage: {
      author: 'Ola Stanisławska',
      sourceTitle: 'Świat na wyciągnięcie ręki',
      text: 'Czy podróż ma jeszcze sens, gdy zamiast pytać o drogę tubylców, sprawdzamy jedynie algorytm mapy? Czy potrafimy jeszcze zgubić się z zachwytem?'
    },
    question: 'Nazwij zabieg retoryczny zastosowany w powyższym fragmencie i określ jego funkcję w wywodzie autorki.',
    correctAnswerText: 'Zabieg: Pytania retoryczne. Funkcja: Zmuszenie czytelnika do autorefleksji nad współczesnym sposobem podróżowania oraz zakwestionowanie bezrefleksyjnego polegania na technologii kosztem żywego kontaktu ze światem.',
    ckeKeyCriteria: [
      '1 pkt – poprawne nazwanie środka (pytania retoryczne) oraz trafne określenie jego funkcji (skłonienie do refleksji, zaangażowanie odbiorcy).',
      '0 pkt – tylko nazwanie środka bez funkcji LUB funkcja bez nazwy środka LUB odpowiedź błędna.'
    ],
    explanation: 'Zawsze należy podać zarówno nazwę środka stylistycznego/retorycznego, jak i jego cel perswazyjny w tekście.',
    sourceYear: 'CKE Maj 2023'
  },
  {
    id: 'pol-p1-005',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'short_open',
    title: 'Konfrontacja stanowisk autorów tekstu 1 i 2',
    points: 1,
    passage: {
      author: 'Agnieszka Krzemińska',
      sourceTitle: 'Podróże w czasie i przestrzeni',
      text: 'Masowa turystyka niszczy bezpowrotnie unikalność miejsc. Napływ milionów ludzi uniformizuje krajobraz kulturowy.'
    },
    passage2: {
      author: 'Ola Stanisławska',
      sourceTitle: 'Świat na wyciągnięcie ręki',
      text: 'Podróżowanie, nawet to popularne, otwiera ludzkie umysły i burzy uprzedzenia. Wszystko zależy od indywidualnej wrażliwości podróżującego.'
    },
    question: 'Czy Agnieszka Krzemińska zgodziłaby się ze stwierdzeniem Oli Stanisławskiej, że współczesna turystyka burzy uprzedzenia i otwiera umysły? Uzasadnij odpowiedź na podstawie obu tekstów.',
    correctAnswerText: 'Nie, Krzemińska nie zgodziłaby się z tym optymistycznym poglądem. W swoim tekście dowodzi ona, że współczesny turysta masowy nie poszukuje rzeczywistego dialogu z Innym, lecz wyłącznie utwierdza się w powierzchownych, marketingowych stereotypach i traktuje obce kultury jak scenerię do zdjęć.',
    ckeKeyCriteria: [
      '1 pkt – jednoznaczne określenie stanowiska (nie zgodziłaby się) oraz poprawne uzasadnienie odwołujące się do sensu obu tekstów.',
      '0 pkt – brak uzasadnienia lub błędna interpretacja intencji autorów.'
    ],
    explanation: 'Zadanie bada umiejętność syntetycznego zestawiania sprzecznych perspektyw badawczych i publicystycznych.',
    sourceYear: 'CKE Maj 2023'
  },
  {
    id: 'pol-p1-006',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'synthesis_note',
    title: 'Notatka syntetyzująca: Człowiek a masowa turystyka',
    points: 4,
    passage: {
      author: 'Agnieszka Krzemińska',
      sourceTitle: 'Tekst 1: Komercjalizacja podróży',
      text: 'Turystyka masowa redukuje doświadczenie kulturowe do konsumpcji. Miejsca ulegają degradacji, a relacja z gospodarzami staje się transakcją.'
    },
    passage2: {
      author: 'Ola Stanisławska',
      sourceTitle: 'Tekst 2: Szansa na empatię',
      text: 'Podróż ma potencjał humanistyczny. O ile człowiek zrezygnuje z pośpiechu i technologii, podróżowanie buduje tolerancję i przełamuje stereotypy.'
    },
    question: 'Napisz notatkę syntetyzującą na temat: „Wpływ podróżowania na człowieka i kulturę”. Twoja notatka musi liczyć od 60 do 90 wyrazów.',
    synthesisTheme: 'Wpływ podróżowania na człowieka i kulturę',
    synthesisAuthor1Stance: 'Krzemińska podkreśla negatywne skutki: komercjalizację kultury, powierzchowność przeżyć oraz degradację tożsamości miejsc.',
    synthesisAuthor2Stance: 'Stanisławska dostrzega w podróży szansę na rozwój empatii, przełamywanie barier i budowanie otwartości na Innego.',
    synthesisModelSummary: 'Obie autorki analizują wpływ podróżowania na człowieka i kulturę, prezentując jednak odmienne perspektywy. Agnieszka Krzemińska zwraca uwagę na destrukcyjny wymiar turystyki masowej, która sprowadza kulturę do komercyjnego towaru i niszczy tożsamość zwiedzanych miejsc. Z kolei Ola Stanisławska akcentuje humanistyczny potencjał wędrówki, wskazując, że świadome podróżowanie kształtuje empatię i przełamuje stereotypy. Ostatecznie obie publicystki dowodzą, że rzeczywista wartość podróży zależy od dojrzałości i intencji samego wędrowca.',
    ckeKeyCriteria: [
      'Zgodność z tematem i synteza obu tekstów (0–2 pkt): przedstawienie stanowiska autora tekstu 1, autora tekstu 2 oraz uogólnienia / części wspólnej.',
      'Spójność i zwięzłość tekstu ciągłego (0–1 pkt).',
      'Poprawność językowa, ortograficzna i interpunkcyjna (0–1 pkt, max 1 błąd każdego typu).'
    ],
    explanation: 'Złota reguła CKE: Notatka musi mieć ściśle 60–90 wyrazów, być tekstem ciągłym i nie zawierać własnych dygresji niezwiązanych z tekstami.',
    sourceYear: 'CKE Maj 2023 (Formuła 2023)'
  },

  // --- ZESTAW 2: Człowiek wobec czasu i przemijania (wzorowane na CKE Maj 2024) ---
  {
    id: 'pol-p1-007',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'true_false',
    title: 'Prawda / Fałsz: Koncepcje czasu w kulturze',
    points: 1,
    passage: {
      author: 'Richard Luecke',
      sourceTitle: 'Czas jako waluta nowoczesności',
      text: 'Nowożytność zdefiniowała czas jako zasób skończony i mierzalny. Słynna maksyma Franklina „czas to pieniądz” przekształciła ludzką egzystencję w nieustanny wyścig z zegarkiem. Czas przestał być przestrzenią dojrzewania i kontemplacji, a stał się wskaźnikiem wydajności produkcyjnej.'
    },
    question: 'Oceń prawdziwość zdań na podstawie tekstu Richarda Lueckego.',
    trueFalseStatements: [
      {
        statement: 'Według autora w nowożytności czas zaczął być postrzegany przede wszystkim jako narzędzie kontemplacji i spokoju.',
        isTrue: false,
        explanation: 'Fałsz: Autor wskazuje, że czas przestał być przestrzenią kontemplacji, a stał się miarą produktywności.'
      },
      {
        statement: 'Maksyma Franklina przyczyniła się do powiązania upływu czasu z wymierną wartością ekonomiczną.',
        isTrue: true,
        explanation: 'Prawda: Luecke pisze wprost, że sentencja ta przekształciła egzystencję w wyścig i powiązała czas z pieniądzem.'
      }
    ],
    explanation: 'Dokładna weryfikacja logiki tekstu Lueckego.',
    sourceYear: 'CKE Maj 2024 (Formuła 2024)'
  },
  {
    id: 'pol-p1-008',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'synthesis_note',
    title: 'Notatka syntetyzująca: Człowiek wobec upływu czasu',
    points: 4,
    passage: {
      author: 'Richard Luecke',
      sourceTitle: 'Tekst 1: Tyrania zegara',
      text: 'Cywilizacja zachodnia uczyniła z czasu tyrana. Zegary mechaniczne wymusiły dyscyplinę, która alienuje człowieka od jego naturalnego rytmu biologicznego i psychicznego.'
    },
    passage2: {
      author: 'Halina Gadomska',
      sourceTitle: 'Tekst 2: Czas wewnętrzny',
      text: 'Czas nie jest jedynie obiektywną miarą fizyczną. Istnieje czas subiektywny – mierzony intensywnością przeżyć, zachwytem i twórczą aktywnością, który wymyka się mechanicznej presji.'
    },
    question: 'Napisz notatkę syntetyzującą na temat: „Relacja człowieka z czasem”. Twoja notatka musi liczyć od 60 do 90 wyrazów.',
    synthesisTheme: 'Relacja człowieka z czasem',
    synthesisAuthor1Stance: 'Luecke zwraca uwagę na alienujący charakter czasu mechanicznego i ekonomizację życia.',
    synthesisAuthor2Stance: 'Gadomska kładzie nacisk na czas psychologiczny, wewnętrzny i subiektywne przeżywanie chwil.',
    synthesisModelSummary: 'Teksty podejmują problematykę relacji człowieka z upływem czasu. Richard Luecke wskazuje na opresyjny charakter czasu zmechanizowanego, który podporządkowuje egzystencję rygorom ekonomii i wydajności. Z kolei Halina Gadomska podkreśla istnienie czasu wewnętrznego, którego miarą jest głębia emocjonalna oraz intensywność ludzkich przeżyć. Autorzy wspólnie dochodzą do wniosku, że choć zegar organizuje życie społeczne, to subiektywne doświadczanie chwil stanowi o prawdziwej jakości ludzkiego bytu.',
    ckeKeyCriteria: [
      'Zestawienie obu autorów i synteza (0–2 pkt)',
      'Spójność wypowiedzi (0–1 pkt)',
      'Poprawność gramatyczna i limit 60–90 słów (0–1 pkt)'
    ],
    explanation: 'Modelowa notatka liczy 74 wyrazy i łączy mechaniczne ujęcie czasu z psychologicznym.',
    sourceYear: 'CKE Maj 2024'
  },

  // --- ZESTAW 3: Pamięć i tożsamość kulturowa (wzorowane na CKE Czerwiec 2024) ---
  {
    id: 'pol-p1-009',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'matching',
    title: 'Funkcje pamięci w życiu społecznym',
    points: 2,
    passage: {
      author: 'Leon Dyczewski',
      sourceTitle: 'Kultura w ciągłości pokoleniowej',
      text: 'Pamięć zbiorowa pełni funkcję spajającą wspólnotę, podczas gdy pamięć autobiograficzna buduje unikalną tożsamość jednostki. Z kolei pamięć historyczna weryfikuje mity narodowe.'
    },
    question: 'Dopasuj rodzaj pamięci (kolumna lewa) do jej głównej roli opisanej w tekście (kolumna prawa).',
    matchingPairs: [
      { left: 'Pamięć zbiorowa', right: 'Integrowanie wspólnoty wokół wspólnych wartości' },
      { left: 'Pamięć autobiograficzna', right: 'Kształtowanie jednostkowego poczucia tożsamości' },
      { left: 'Pamięć historyczna', right: 'Krytyczna weryfikacja mitów i faktów z przeszłości' }
    ],
    explanation: 'Zadanie sprawdza zdolność precyzyjnej kategoryzacji pojęć socjologicznych i kulturoznawczych.',
    sourceYear: 'CKE Czerwiec 2024'
  },
  {
    id: 'pol-p1-010',
    part: 1,
    partName: 'Język polski w użyciu',
    taskType: 'synthesis_note',
    title: 'Notatka syntetyzująca: Pamięć jako fundament tożsamości',
    points: 4,
    passage: {
      author: 'Leon Dyczewski',
      sourceTitle: 'Tekst 1: Ciągłość kultury',
      text: 'Bez pamięci wspólnotowej naród traci korzenie i staje się podatny na manipulację. Przekaz międzypokoleniowy chroni wartości fundamentalne.'
    },
    passage2: {
      author: 'Jerzy Limon',
      sourceTitle: 'Tekst 2: Pułapki pamięci',
      text: 'Pamięć nie jest wierną kroniką, lecz żywym teatrem wyobraźni. Często ulega mitologizacji i zniekształceniom pod wpływem aktualnych potrzeb.'
    },
    question: 'Napisz notatkę syntetyzującą na temat: „Rola i charakter pamięci w życiu człowieka”. Długość: 60–90 wyrazów.',
    synthesisTheme: 'Rola i charakter pamięci w życiu człowieka',
    synthesisAuthor1Stance: 'Dyczewski akcentuje ochronną rolę pamięci dla tożsamości i kultury narodu.',
    synthesisAuthor2Stance: 'Limon przestrzega przed zawodnością pamięci i jej podatnością na kreację i mitologizację.',
    synthesisModelSummary: 'Autorzy analizują zjawisko pamięci oraz jej wpływ na tożsamość człowieka. Leon Dyczewski traktuje pamięć jako niezastąpione spoiwo wspólnoty, które umożliwia przekaz tradycji i chroni kulturę przed zanikiem. Natomiast Jerzy Limon zwraca uwagę na subiektywny, kreacyjny wymiar pamięci, wskazując, że podlega ona ciągłym zniekształceniom i mitologizacji. W konkluzji obaj badacze zgadzają się, że pamięć – mimo swej niedoskonałości – pozostaje kluczowym elementem definiującym ludzką świadomość.',
    ckeKeyCriteria: [
      'Podsumowanie Dyczewskiego i Limona + synteza (0–2 pkt)',
      'Tekst spójny (0–1 pkt)',
      'Poprawność językowa i przedział 60–90 słów (0–1 pkt)'
    ],
    explanation: 'Notatka liczy 75 słów, precyzyjnie konfrontuje stabilność tradycji z mechanizmami zniekształcania pamięci.',
    sourceYear: 'CKE Czerwiec 2024'
  }
];
