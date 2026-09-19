import { MathTaskItem, PolishArgumentBlock } from '../types';

export interface CanonicalLektura {
  id: string;
  aliases: string[];
  bookId: string;
  epochId: string;
  numericTopicId: number;
  badge: string;
  title: string;
  bookTitle: string;
  author: string;
  epoch: string;
  estimatedTime: string;
  heroCharacter: string;
  keyTheme: string;
  theoryPill: {
    title: string;
    concept_essence: string;
    book_summary: {
      title: string;
      author: string;
      genre: string;
      plot_overview: string;
      key_events: string[];
      key_scenes: { scene: string; significance: string }[];
    };
    key_concepts: { title: string; def: string }[];
    worked_example: {
      title: string;
      quote: string;
      context: string;
      analysis: string;
      matura_tip: string;
    };
    cke_trap: {
      error: string;
      correct: string;
      correction: string;
      matura_tip: string;
    };
    golden_rule: string;
  };
  tasks: MathTaskItem[];
  unlockedBlockPreview: PolishArgumentBlock;
}

// =========================================================================
// 1. SOFOKLES: ANTYGONA (ANTYK • DZIAŁ 8)
// =========================================================================
export const ANTYGONA_LEKTURA: CanonicalLektura = {
  id: 'pol-lesson-5-2',
  aliases: ['antygona', 'sofokles-antygona', 'pol-antygona', 'pol-lesson-5-2', 'pol-lesson-8-2', '5.2', '8.2'],
  bookId: 'antygona',
  epochId: 'pol-dzial-5',
  numericTopicId: 5,
  badge: '5.2',
  title: 'Sofokles „Antygona” – Tragizm, Prawo Boskie a Ludzkie',
  bookTitle: 'Antygona',
  author: 'Sofokles',
  epoch: 'Antyk',
  estimatedTime: '5 min',
  heroCharacter: 'Antygona i Kreon',
  keyTheme: 'Konflikt tragiczny i zderzenie racji moralnych',
  theoryPill: {
    title: 'Sofokles: Antygona – Mechanizm Tragedii Antycznej',
    concept_essence: 'Antygona ucieleśnia istotę greckiego tragizmu: bohaterka staje w obliczu nierozstrzygalnego konfliktu między dwiema równorzędnymi racjami moralnymi. Prawo boskie (nakaz pochówku brata Polinika) zderza się z prawem stanowionym (zakaz władcy Teb, Kreona). Każdy wybór Antygony oraz Kreona prowadzi do nieuchronnej katastrofy.',
    book_summary: {
      title: 'Antygona',
      author: 'Sofokles',
      genre: 'Tragedia antyczna',
      plot_overview: 'Po bratobójczej walce o tron Teb między Eteoklesem a Polinikiem, nowy władca Kreon nakazuje uroczysty pogrzeb Eteoklesa, a ciało Polinika – uznanego za zdrajcę – skazuje na zbezczeszczenie. Siostra poległych, Antygona, wbrew zakazowi posypuje zwłoki brata ziemią. Zostaje schwytana i skazana na zamurowanie żywcem w grobowcu. Przepowiednia wróżbity Tyrezjasza skłania Kreona do zmiany decyzji, lecz jest za późno: Antygona odbiera sobie życie, a w ślad za nią giną syn Kreona Hajmon i żona Eurydyka.',
      key_events: [
        'Rozmowa Antygony z Ismeną o zamiarze pochówku brata wbrew prawu królewskiemu.',
        'Kreon ogłasza edykt państwowy zakazujący grzebania zwłok Polinika pod karą śmierci.',
        'Schwytanie Antygony na gorącym uczynku przy zwłokach brata i duma bohaterki przed sądem.',
        'Wystąpienie syna Kreona, Hajmona, w obronie narzeczonej i ostrzeżenie o gniewie ludu.',
        'Przepowiednia Tyrezjasza, spóźniona próba ułaskawienia i samobójcza śmierć Antygony, Hajmona i Eurydyki.'
      ],
      key_scenes: [
        {
          scene: 'Agon (spór słowny) Antygony z Kreonem',
          significance: 'Klasyczne starcie dwóch porządków: wiecznych praw religijno-moralnych reprezentowanych przez kobietę i pragmatyki władzy państwowej reprezentowanej przez króla.'
        },
        {
          scene: 'Przemowa Tyrezjasza do Kreona',
          significance: 'Odkrycie pychy władcy (hybris), który postawił własny dekret ponad wolę bogów Olimpu.'
        }
      ]
    },
    key_concepts: [
      { title: 'Konflikt tragiczny', def: 'Zderzenie dwóch równorzędnych racji (prawo boskie vs prawo państwowe), w którym każda decyzja bohatera niesie katastrofalne skutki.' },
      { title: 'Wina tragiczna (Hamartia)', def: 'Błędne rozpoznanie sytuacji przez bohatera (Kreon uważał swój rozkaz za ratowanie państwa, ściągając klątwę).' },
      { title: 'Hybris (Pycha)', def: 'Zuchwałość wobec bogów i praw kosmicznych, która oślepia Kreona i sprowadza na niego karę.' },
      { title: 'Katharsis', def: 'Oczyszczenie emocjonalne widza przez współprzeżywanie trwogi (phobos) i litości (eleos).' }
    ],
    worked_example: {
      title: 'Antygona przed Kreonem – Słynna deklaracja praw niepisanych',
      quote: 'Nie wierzyłam, by twe rozkazy miały taką siłę, ażeby śmiertelnik mógł łamać niezmienne, niepisane prawa bogów. Bo nie od dziś one żyją ani od wczoraj, lecz od wieków, i nikt nie wie, skąd się pojawiły.',
      context: 'Fragment pochodzi z epeisodionu drugiego, gdy Antygona staje przed rozgniewanym Kreonem po ponownym rytualnym posypaniu ziemią ciała Polinika.',
      analysis: 'Antygona powołuje się na transcendencję prawa boskiego ponad arbitralnymi dekretami doczesnych monarchów. Używa antytezy: śmiertelny król kontra wieczne bóstwo. Dowodzi to niezłomności i gotowości poniesienia męczeństwa za wierność sumieniu.',
      matura_tip: 'W wypracowaniu o odwadze cywilnej lub konflikcie jednostki z państwem zacytuj ten fragment jako uniwersalny manifest prymatu sumienia nad prawem stanowionym.'
    },
    cke_trap: {
      error: 'Przedstawianie Kreona jako bezdusznego tyrana działającego wyłącznie ze złośliwości.',
      correct: 'Kreon jest również postacią tragiczną: jako świeży władca chciał zapobiec anarchii i wojnie domowej, lecz zaślepiła go pycha (hybris).',
      correction: 'Kreon działa w imię dobra państwa i ładu publicznego; jego dramatem jest brak elastyczności i postawienie prawa ludzkiego ponad boskim.',
      matura_tip: 'Egzaminatorzy CKE natychmiast wychwytują czarno-białe oceny Kreona. Zawsze podkreślaj, że w tragedii greckiej racje obu stron mają swoje uzasadnienie!'
    },
    golden_rule: 'Zawsze pamiętaj dewizę Antygony: „Współkochać przyszłam, nie współnienawidzić”. To najczystsza definicja jej etycznego wyboru na maturze.'
  },
  unlockedBlockPreview: {
    id: 'arg-block-antygona-konflikt',
    bookId: 'antygona',
    bookTitle: 'Antygona',
    character: 'Antygona i Kreon',
    theme: 'Konflikt wartości i wierność własnemu sumieniu',
    claim: 'Wierność prawom wyższym wymaga od jednostki heroicznej odwagi, stawiając ją w dramatycznym konflikcie z bezduszną machiną władzy państwowej.',
    evidence: 'Antygona decyduje się pochować brata Polinika pomimo edyktu Kreona grożącego śmiercią. Wybiera bezwzględne posłuszeństwo wiecznemu prawu religijnemu („niepisane prawa bogów”) oraz siostrzaną miłość („współkochać przyszłam, nie współnienawidzić”), ponosząc śmierć za wierność własnemu sumieniu.',
    contextType: 'FILOZOFICZNY',
    contextDescription: 'Antyczna koncepcja fatum, tragizmu oraz etyka prawa naturalnego (ius naturale) przeciwstawionego prawu stanowionemu (ius civile)',
    linkToThesis: 'Postawa Antygony dowodzi, że autentyczna godność człowieka polega na prymacie imperatywu moralnego nad doraźnymi zakazami władzy politycznej.',
    ckeSafetyRating: '100%_SAFE'
  },
  tasks: [
    {
      id: 'task-antygona-swipe',
      type: 'SWIPE_MATCH',
      title: 'KROK 1 • Tinder Lekturowy: Antygona',
      topic: 'Antygona • Sofokles',
      instruction: 'Przesuń kartę w PRAWO jeśli to fakt z tragedii Sofoklesa, lub w LEWO jeśli to fałsz bądź pułapka CKE!',
      math_statement: 'Rozgrzewka błyskawiczna: 5 twierdzeń sprawdzających znajomość faktów i motywów Antygony.',
      hints: {
        level_1: 'Pamiętaj o motywacji Ismeny i roli Tyrezjasza.',
        level_2: 'Uważaj na to, kto ostatecznie przeżył wydarzenia w Tebach.'
      },
      points: 1,
      xp: 25,
      swipeData: {
        themeTitle: 'Antygona • Sofokles',
        cards: [
          {
            id: 'ant-c1',
            statement: 'Antygona została skazana na ścięcie toporem na rynku tebańskim.',
            isTrue: false,
            explanation: 'Antygona została skazana na zamurowanie żywcem w kamiennym grobowcu, gdzie sama powiesiła się na chuście.',
            ckeTrap: 'Częsty błąd: zamiana kary zamurowania żywcem na ścięcie.'
          },
          {
            id: 'ant-c2',
            statement: 'Ismena początkowo odmówiła siostrze pomocy w pochówku brata z lęku przed prawem.',
            isTrue: true,
            explanation: 'Ismena uważała, że jako kobiety nie mogą sprzeciwiać się męskim rządom Kreona („My z natury słabe niewiasty”).'
          },
          {
            id: 'ant-c3',
            statement: 'Hajmon, syn Kreona, poparł wyrok ojca i osobiście zamurował wejście do grobowca.',
            isTrue: false,
            explanation: 'Hajmon gwałtownie sprzeciwił się ojcu, bronił Antygony, a widząc jej śmierć, przebił się mieczem.',
            ckeTrap: 'Pułapka CKE: Hajmon kochał Antygonę i popełnił samobójstwo u jej boku!'
          },
          {
            id: 'ant-c4',
            statement: 'Tyrezjasz ostrzega Kreona, że bogowie odrzucają ofiary z powodu bezczeszczenia zwłok Polinika.',
            isTrue: true,
            explanation: 'Ptaki roznoszą skrawki zwłok po ołtarzach, a ogień ofiarny gaśnie – bogowie są zagniewani na Teby.'
          },
          {
            id: 'ant-c5',
            statement: 'Na koniec tragedii Kreon ginie w pojedynku z oburzonym ludem Teb.',
            isTrue: false,
            explanation: 'Kreon NIE ginie! Zostaje przy życiu jako wrak człowieka, tracąc żonę i syna – to najcięższa kara w tragedii greckiej.',
            ckeTrap: 'Kluczowa cecha tragedii: zbrodniczy władca często żyje dalej ze świadomością swojej winy.'
          }
        ]
      }
    },
    {
      id: 'task-antygona-cardinal',
      type: 'CARDINAL_DETECTOR',
      title: 'KROK 2 • Polowanie na Kardynała: Motywacja Antygony',
      topic: 'Antygona • Sofokles',
      instruction: 'Jeden z poniższych fragmentów wypracowania zawiera kompromitujący Błąd Kardynalny CKE. Znajdź go i unieszkodliw (-2 ❤️ przy pomyłce)!',
      math_statement: 'Uważaj: tylko jeden fragment zniekształca sens utworu i intencje bohaterów!',
      hints: {
        level_1: 'Zwróć uwagę na to, dlaczego Antygona grzebała brata i czy dążyła do przejęcia władzy.',
        level_2: 'Błąd kardynalny to całkowite zafałszowanie fabuły lub motywacji postaci.'
      },
      points: 2,
      xp: 50,
      cardinalData: {
        contextBadge: 'BŁĄD KARDYNALNY • MOTYWACJA ANTYGONY',
        examPrompt: 'Oceń fragmenty uczniowskich prac maturalnych na temat: „Bunt w imię wartości”.',
        snippets: [
          {
            id: 'snip-ant-1',
            text: 'Antygona sprzeciwiła się prawu stanowionemu przez Kreona, ponieważ uważała, że jej ród Labdakidów ma większe prawo do władzy w Tebach. Jej bunt miał na celu obalenie wuja i koronację na królową.',
            isCardinal: true,
            examinerNote: 'KARDYNAŁ! Antygona nie walczyła o koronę ani władzę polityczną! Jej jedyną motywacją był religijny i moralny obowiązek pochówku brata oraz miłość rodzinna.'
          },
          {
            id: 'snip-ant-2',
            text: 'Bohaterka Sofoklesa jest postacią bezkompromisową. Zdaje sobie sprawę z konsekwencji swego czynu, lecz woli ponieść śmierć niż żyć z poczuciem zdrady nakazów religijnych.',
            isCardinal: false,
            examinerNote: 'Wzorcowe odczytanie psychologii i etyki Antygony.'
          },
          {
            id: 'snip-ant-3',
            text: 'Kreon reprezentuje rację stanu. Wierzy, że bezkarność zdrajcy Polinika doprowadziłaby do anarchii i kolejnej wojny domowej w Tebach.',
            isCardinal: false,
            examinerNote: 'Właściwa, zniuansowana interpretacja motywów władcy.'
          }
        ]
      }
    },
    {
      id: 'task-antygona-teel',
      type: 'ARGUMENT_BUILDER',
      title: 'KROK 3 • Klocki TEEL: Wierność Sumieniu a Prawo',
      topic: 'Antygona • Sofokles',
      instruction: 'Zbuduj żelazny argument maturalny (Teza -> Dowód -> Kontekst -> Puenta), aby zdobyć klocek do Skarbca!',
      math_statement: 'Temat: „Wierność własnym przekonaniom a kompromis ze światem”.',
      hints: {
        level_1: 'Wybierz tezę akcentującą prymat sumienia.',
        level_2: 'Jako kontekst dobierz koncepcję prawa naturalnego.'
      },
      points: 2,
      xp: 50,
      argumentBuilderData: {
        essayTopic: 'Czy człowiek powinien dochować wierności sobie nawet za cenę życia?',
        theses: [
          { id: 't1', text: 'Jednostka stawiająca imperatyw moralny ponad arbitralne dekrety władzy zyskuje nieśmiertelną godność, lecz płaci za to najwyższą cenę biologiczną.', isOptimal: true },
          { id: 't2', text: 'Złamanie prawa przez obywatela jest zawsze błędem, ponieważ prowadzi do upadku struktur państwowych.', isOptimal: false, trapNote: 'Zbyt powierzchowne, ignoruje rację Antygony.' }
        ],
        evidenceOptions: [
          { id: 'e1', text: 'Antygona wbrew zakazowi Kreona posypuje zwłoki brata ziemią, a zapytana o motywację powołuje się na niezmienne, niepisane prawa bogów.', isOptimal: true },
          { id: 'e2', text: 'Kreon po wysłuchaniu ludu natychmiast ułaskawia Antygonę i oddaje jej tron Teb.', isOptimal: false, trapNote: 'Błąd rzeczowy: Kreon nie oddał tronu, a ułaskawienie było spóźnione.' }
        ],
        contextOptions: [
          { id: 'c1', text: 'Filozoficzny spór o prymat prawa naturalnego (ius naturale – godność, prawo do pochówku) nad prawem pozytywnym (ius civile – wola monarchy).', isOptimal: true },
          { id: 'c2', text: 'Pozytywistyczna koncepcja pracy organicznej i lojalności wobec zaborcy.', isOptimal: false, trapNote: 'Anachronizm! Praca organiczna to wiek XIX, a nie grecki antyk.' }
        ],
        linkOptions: [
          { id: 'l1', text: 'Historia Antygony dowodzi, że o wielkości człowieka decyduje nie uległość wobec strachu, lecz wierność wartościom absolutnym, które przetrwają każdy reżim.', isOptimal: true },
          { id: 'l2', text: 'Dlatego też kompromis z tyranem jest najlepszą strategią przetrwania w trudnych czasach.', isOptimal: false, trapNote: 'Sprzeczne z puentą tragedii Sofoklesa!' }
        ]
      }
    }
  ]
};

// =========================================================================
// 2. STANISŁAW WYSPIAŃSKI: WESELE (MŁODA POLSKA • DZIAŁ 15)
// =========================================================================
export const WESELE_LEKTURA: CanonicalLektura = {
  id: 'pol-lesson-13-2',
  aliases: ['wesele', 'wyspianski-wesele', 'pol-wesele', 'pol-lesson-13-2', 'pol-lesson-15-2', '13.2', '15.2'],
  bookId: 'wesele',
  epochId: 'pol-dzial-13',
  numericTopicId: 13,
  badge: '13.2',
  title: 'Stanisław Wyspiański „Wesele” – Narodowa Niemoc i Chocholi Taniec',
  bookTitle: 'Wesele',
  author: 'Stanisław Wyspiański',
  epoch: 'Młoda Polska',
  estimatedTime: '5 min',
  heroCharacter: 'Gospodarz, Jasiek, Chochoł',
  keyTheme: 'Mit uśpionego narodu, chłopomania i niemoc czynu',
  theoryPill: {
    title: 'Wyspiański: Wesele – Wiwisekcja Polskiego Społeczeństwa',
    concept_essence: '„Wesele” to arcydramat narodowy demaskujący ułudę bratania się inteligencji z chłopstwem (chłopomanii) oraz niezdolność Polaków do zorganizowanego powstania niepodległościowego. W bronowickiej chacie spotykają się dwa odrębne światy, a w akcie II postaciom ukazują się widma uosabiające ich ukryte lęki, kompleksy i niespełnione marzenia.',
    book_summary: {
      title: 'Wesele',
      author: 'Stanisław Wyspiański',
      genre: 'Dramat symboliczny / narodowy',
      plot_overview: 'Ślub poety Lucjana Rydla z wiejską dziewczyną Jadwigą Mikołajczykówną w podkrakowskich Bronowicach staje się pretekstem do wielkiej dyskusji o kondycji Polski. Akt I to realistyczna satyra na powierzchowną chłopomanię panów z miasta. W akcie II w chacie zjawiają się zjawy: Chochoł, Stańczyk, Rycerz Czarny, Hetman Branicki, Upiór Jakuba Szeli oraz Wernyhora. Wernyhora przekazuje Gospodarzowi złoty róg wzywający naród do powstania. Gospodarz powierza róg Jaśkowi, ten jednak gubi go, schylając się po czapkę z pawich piór. O świcie zebrani z kosami w dłoniach zastygają w hipnotycznym chocholim tańcu.',
      key_events: [
        'Zabawa weselna i kompromitujące rozmowy inteligencji z chłopami (np. Radczyni pytająca o zasiewy w listopadzie).',
        'Zaproszenie Chochoła na wesele przez parę młodą i poetów.',
        'Pochód Osób Dramatu (Widm) odsłaniający traumy i wyrzuty sumienia biesiadników.',
        'Przybycie legendarnego wieszcza Wernyhory i wręczenie Złotego Rogu Gospodarzowi.',
        'Zgromadzenie kosynierów przed chatą, zgubienie rogu przez Jaśka i hipnotyczny taniec Chochoła.'
      ],
      key_scenes: [
        {
          scene: 'Spotkanie Dziennikarza ze Stańczykiem',
          significance: 'Bolesny dialog o grzechu usypiania narodu lojalizmem galicyjskim. Stańczyk wręcza Dziennikarzowi Kaduceusz Polski – „laskę błazeńską do mącenia narodowej wody”.'
        },
        {
          scene: 'Finałowy Chocholi Taniec',
          significance: 'Absolutny symbol narodowego marazmu, zaklęcia w zaklętym kręgu niemocy i braku dojrzałości do niepodległości.'
        }
      ]
    },
    key_concepts: [
      { title: 'Chłopomania (Ludomania)', def: 'Powierzchowna fascynacja folklorem i życiem wsi wśród inteligencji młodopolskiej, bez zrozumienia realnych problemów i historii chłopstwa.' },
      { title: 'Złoty Róg', def: 'Symbol idei przewodniej, sygnału do narodowego zrywu i walki o wolność.' },
      { title: 'Czapka z pawimi piórami', def: 'Symbol próżności, przywiązania do blichtru i egoizmu materialnego, przez który gubi się sprawy najważniejsze („Miałeś, chamie, złoty róg”).' },
      { title: 'Chocholi Taniec', def: 'Metafora paraliżu woli narodu, letargu społecznego i uśpienia sił witalnych Polaków pod zaborami.' }
    ],
    worked_example: {
      title: 'Dramat Jaśka o świcie – Słynny finał z gubieniem rogu',
      quote: 'Ostał ci sie ino sznur, ostał ci sie ino sznur... Miałeś, chamie, złoty róg, miałeś, chamie, czapke z piór: czapke wicher z głowy zdjął, róg huka po lesie, a tobie ino sznur na szyi ostanie!',
      context: 'Słowa wypowiadane przez Chochoła do zrozpaczonego Jaśka o świcie, gdy ten orientuje się, że zgubił powierzony mu skarb.',
      analysis: 'Wyspiański zestawia tragizm z gorzką groteską. Złoty róg reprezentował historyczną szansę na wolność, a pawie pióra – tani blichtr. Chochoł bezlitośnie obnaża słabość: Polacy są gotowi zaprzepaścić niepodległość dla błahostek i własnego próżnego wizerunku.',
      matura_tip: 'Wykorzystaj ten cytat przy tematach o zaprzepaszczonych szansach historycznych, wadach narodowych Polaków i rozczarowaniu elitami.'
    },
    cke_trap: {
      error: 'Uznanie, że Chochoł jest postacią wyłącznie demoniczną i negatywną.',
      correct: 'Chochoł to słoma chroniąca żywą różę na zimę! Taniec jest uśpieniem, lecz pod słomianą powłoką kryje się nadzieja na odrodzenie narodu na wiosnę.',
      correction: 'Chochoł symbolizuje stan przejściowy: naród uśpiony i skrępowany marazmem, który pod zimową osłoną zachowuje życie i obudzi się, gdy nadejdzie właściwy czas.',
      matura_tip: 'Pamiętaj o podwójnej symbolice Chochoła! Egzaminatorzy punktują dostrzeżenie, że chochoł to nie tylko mara, ale zabezpieczenie krzaku róży przed mrozem.'
    },
    golden_rule: 'Zawsze pamiętaj słowa Czepca do Dziennikarza: „Wyście sobie, a my sobie. Każden sobie rzepkę skrobie”. To kluczowa diagnoza braku solidaryzmu w Weselu.'
  },
  unlockedBlockPreview: {
    id: 'arg-block-wesele-niemoc',
    bookId: 'wesele',
    bookTitle: 'Wesele',
    character: 'Gospodarz, Dziennikarz, Jasiek',
    theme: 'Wady narodowe i niezdolność do wspólnego działania',
    claim: 'Wewnętrzne podziały klasowe, powierzchowna chłopomania oraz skłonność do pustych gestów paraliżują wolę narodu, uniemożliwiając realną walkę o niepodległość.',
    evidence: 'W „Weselu” Stanisława Wyspiańskiego inteligencja brata się z chłopami tylko na pokaz. Kiedy Wernyhora przynosi szansę na powstanie i wręcza Gospodarzowi złoty róg, ten oddaje go młodemu Jaśkowi. Chłopak gubi bezcenny instrument, schylając się po czapkę z pawimi piórami, a zebrany tłum zastygł w chocholim tańcu.',
    contextType: 'HISTORYCZNY',
    contextDescription: 'Pamięć o krwawej rabacji galicyjskiej 1846 roku (reprezentowana przez zjawę Upiora – Jakuba Szeli) jako trwała przepaść uniemożliwiająca zaufanie między szlachtą a chłopami',
    linkToThesis: 'Finał dramatu unaocznia, że naród zachwycony własnymi mitami i tradycją, lecz pozbawiony odpowiedzialnego przywództwa, skazuje się na bezsilny letarg.',
    ckeSafetyRating: '100%_SAFE'
  },
  tasks: [
    {
      id: 'task-wesele-swipe',
      type: 'SWIPE_MATCH',
      title: 'KROK 1 • Tinder Lekturowy: Wesele',
      topic: 'Wesele • Stanisław Wyspiański',
      instruction: 'Przesuń kartę w PRAWO jeśli to fakt z Wesela, lub w LEWO jeśli to fałsz bądź pułapka!',
      math_statement: 'Sprawdź, czy pamiętasz symbole i relacje w bronowickiej chacie!',
      hints: {
        level_1: 'Pamiętaj, kto z kim rozmawiał w akcie I i jakie widma ukazały się bohaterom.',
        level_2: 'Zwróć uwagę na rekwizyty: kaduceusz, złoty róg, czapkę z pawich piór.'
      },
      points: 1,
      xp: 25,
      swipeData: {
        themeTitle: 'Wesele • Symbole & Widma',
        cards: [
          {
            id: 'wes-c1',
            statement: 'Stańczyk wręcza Poecie złote pióro do napisania narodowego hymnu.',
            isTrue: false,
            explanation: 'Stańczyk ukazuje się Dziennikarzowi i wręcza mu Kaduceusz – błazeńską laskę do mącenia głów Polakom.',
            ckeTrap: 'Pułapka: Stańczyk rozmawia z Dziennikarzem (redaktorem lojalistycznego „Czasu”), a Rycerz z Poetą!'
          },
          {
            id: 'wes-c2',
            statement: 'Upiór, który ukazuje się Dziadowi, to Jakub Szela – przywódca krwawej rabacji galicyjskiej.',
            isTrue: true,
            explanation: 'Upiór domaga się kubełka wody, by zmyć krew szlachty ze swoich rąk, przypominając o dawnych rzeziach.'
          },
          {
            id: 'wes-c3',
            statement: 'Gospodarz osobiście zadął w złoty róg, wyprowadzając kosynierów do ataku na Kraków.',
            isTrue: false,
            explanation: 'Gospodarz poszedł spać, a róg powierzył Jaśkowi, który go zgubił. Powstanie nigdy się nie rozpoczęło!',
            ckeTrap: 'Absolutny kardynał: w Weselu NIE ma walki, jest tylko paraliżujący chocholi taniec.'
          },
          {
            id: 'wes-c4',
            statement: 'Gospodyni ukryła złotą podkowę zgubioną przez konia Wernyhory w skrzyni na przyszłość.',
            isTrue: true,
            explanation: 'Chłopski pragmatyzm zwyciężył nad narodowym zrywem – Gospodyni schowała złoto na zaś.'
          },
          {
            id: 'wes-c5',
            statement: 'Pod koniec wesela Chochoł gra na skrzypcach z patyków, wprowadzając gości w trans.',
            isTrue: true,
            explanation: 'Chochoł gra monotonną melodię, a goście w takt muzyki krążą w hipnotycznym kręgu bezwolności.'
          }
        ]
      }
    },
    {
      id: 'task-wesele-cardinal',
      type: 'CARDINAL_DETECTOR',
      title: 'KROK 2 • Polowanie na Kardynała: Finał Wesela',
      topic: 'Wesele • Stanisław Wyspiański',
      instruction: 'Jeden z poniższych fragmentów zawiera katastrofalny Błąd Kardynalny CKE. Wskaż go (-2 ❤️ za fałszywy alarm)!',
      math_statement: 'Uważaj: CKE nie wybacza fałszowania wymowy finału Wesela!',
      hints: {
        level_1: 'Sprawdź, co stało się ze złotym rogiem i czy Polacy ruszyli do walki.',
        level_2: 'Finał Wesela to letarg i uśpienie, nie triumf powstańczy.'
      },
      points: 2,
      xp: 50,
      cardinalData: {
        contextBadge: 'BŁĄD KARDYNALNY • FINAŁ WESELA',
        examPrompt: 'Sprawdź analizy zakończenia „Wesela” pod kątem zgodności z fabułą CKE.',
        snippets: [
          {
            id: 'snip-wes-1',
            text: 'Dźwięk złotego rogu wyrwał chłopów i inteligentów z marazmu. Zjednoczeni ponad podziałami mieszkańcy Bronowic ruszają z kosami na Kraków, dając sygnał do zwycięskiego powstania niepodległościowego.',
            isCardinal: true,
            examinerNote: 'KARDYNAŁ ROKU! Róg został bezpowrotnie zgubiony przez Jaśka, a powstanie poniosło klęskę przed rozpoczęciem. Scenę wieńczy chocholi taniec bezsilności!'
          },
          {
            id: 'snip-wes-2',
            text: 'Wyspiański ukazuje tragikomizm polskiego losu: wielka idea wyzwolenia przegrywa z przyziemnym egoizmem i chciwością, czego symbolem jest schylenie się Jaśka po czapkę z pawich piór.',
            isCardinal: false,
            examinerNote: 'Wnikliwa i dojrzała analiza symboliki sceny finałowej.'
          },
          {
            id: 'snip-wes-3',
            text: 'Postaci zjaw w drugim akcie nie są realnymi bohaterami, lecz projekcjami psychologicznymi biesiadników, ujawniającymi ich tłumione lęki i wyrzuty sumienia.',
            isCardinal: false,
            examinerNote: 'Prawidłowa interpretacja konwencji dramatu symbolicznego.'
          }
        ]
      }
    },
    {
      id: 'task-wesele-teel',
      type: 'ARGUMENT_BUILDER',
      title: 'KROK 3 • Klocki TEEL: Naród w Chocholim Tańcu',
      topic: 'Wesele • Stanisław Wyspiański',
      instruction: 'Złóż spójny argument TEEL i dołącz klocek Wesela do swojego Skarbca Argumentów!',
      math_statement: 'Temat: „Wady narodowe jako przeszkoda na drodze do wielkich celów”.',
      hints: {
        level_1: 'Teza powinna podkreślać iluzję solidaryzmu narodowego.',
        level_2: 'Jako kontekst wskaż rabację galicyjską 1846 roku.'
      },
      points: 2,
      xp: 50,
      argumentBuilderData: {
        essayTopic: 'Dlaczego społeczeństwa ponoszą klęskę w dążeniu do wolności?',
        theses: [
          { id: 't1', text: 'Brak rzeczywistej jedności społecznej i zastępowanie odpowiedzialnego czynu pustymi deklaracjami prowadzi do bezsilności narodu w chwilach próby.', isOptimal: true },
          { id: 't2', text: 'Chłopi podkrakowscy byli zbyt prymitywni, by zrozumieć poezję młodopolską.', isOptimal: false, trapNote: 'Protekcjonalna ocena niezgodna z myślą dramatu.' }
        ],
        evidenceOptions: [
          { id: 'e1', text: 'W „Weselu” inteligencja zachwyca się wsią jedynie estetycznie, a gdy Wernyhora daje sygnał do czynu, powierzony Jaśkowi złoty róg zostaje zgubiony w pogoni za błahą czapką z pawimi piórami.', isOptimal: true },
          { id: 'e2', text: 'Ksiądz w bronowickiej chacie organizuje tajny komitet powstańczy z udziałem Czepca.', isOptimal: false, trapNote: 'Błąd fabularny: Ksiądz kłóci się z Żydem o zaległe dzierżawy!' }
        ],
        contextOptions: [
          { id: 'c1', text: 'Kontekst historyczny: pamięć o rabacji galicyjskiej z 1846 roku (postać Jakuba Szeli), która trwale uniemożliwiła szczere zaufanie między szlachtą a chłopstwem.', isOptimal: true },
          { id: 'c2', text: 'Filozofia epikurejska głosząca wycofanie się z życia publicznego do ogrodu.', isOptimal: false, trapNote: 'Nietrafiony kontekst filozoficzny dla dramatu narodowego.' }
        ],
        linkOptions: [
          { id: 'l1', text: 'Finałowy chocholi taniec dowodzi, że naród niezdolny do przezwyciężenia egoizmów i historycznych urazów pozostaje uwięziony w letargu, marnując historyczne szanse.', isOptimal: true },
          { id: 'l2', text: 'Dlatego też zabawa weselna okazała się największym sukcesem kulturalnym Młodej Polski.', isOptimal: false, trapNote: 'Całkowite niezrozumienie wymowy utworu!' }
        ]
      }
    }
  ]
};

// =========================================================================
// 3. JULIUSZ SŁOWACKI: KORDIAN (ROMANTYZM • DZIAŁ 13)
// =========================================================================
export const KORDIAN_LEKTURA: CanonicalLektura = {
  id: 'pol-lesson-10-2',
  aliases: ['kordian', 'slowacki-kordian', 'pol-kordian', 'pol-lesson-10-2', 'pol-lesson-10-3', 'pol-lesson-13-3', '10.2', '10.3', '13.3'],
  bookId: 'kordian',
  epochId: 'pol-dzial-10',
  numericTopicId: 10,
  badge: '10.2',
  title: 'Juliusz Słowacki „Kordian” – Winkelriedyzm i Paraliż Czynu',
  bookTitle: 'Kordian',
  author: 'Juliusz Słowacki',
  epoch: 'Romantyzm',
  estimatedTime: '5 min',
  heroCharacter: 'Kordian',
  keyTheme: 'Dojrzewanie do czynu, winkelriedyzm i spór o sens powstania',
  theoryPill: {
    title: 'Słowacki: Kordian – Anatomia Romantycznej Porażki',
    concept_essence: '„Kordian” to polemika z mickiewiczowskim mesjanizmem („Dziady cz. III”). Słowacki odrzuca bierne cierpienie na rzecz aktywnego czynu zbrojnego (winkelriedyzm: „Polska Winkelriedem narodów!”). Ukazuje jednak dramat młodego idealisty, którego paraliżuje etyczny dylemat skrytobójstwa i osamotnienie w starciu z bezwzględną polityką.',
    book_summary: {
      title: 'Kordian',
      author: 'Juliusz Słowacki',
      genre: 'Dramat romantyczny',
      plot_overview: 'Akt I ukazuje 15-letniego Kordiana cierpiącego na ból istnienia (Weltschmerz) i nieodwzajemnioną miłość do Laury, co kończy się nieudaną próbą samobójczą. Akt II to edukacyjna podróż po Europie: Kordian odkrywa, że światem rządzi pieniądz (Londyn), miłość można kupić (Włochy – Wioletta), a papież nakazuje Polakom uległość wobec cara (Watykan). Na szczycie Mont Blanc bohater przeżywa metamorfozę i ogłasza ideę winkelriedyzmu. W akcie III Kordian planuje zamach na cara Mikołaja I koronowanego na króla Polski. W drodze do sypialni tyrana mdleje pod drzwiami wskutek walki ze Strachem i Imaginacją.',
      key_events: [
        'Młodzieńcza próba samobójcza Kordiana w parku po odrzuceniu przez Laurę.',
        'Wędrówka po Europie: James Park, Dover (Szekspir), Włochy i audiencja u Papieża.',
        'Monolog na Mont Blanc: przemiana z nieszczęśliwego kochanka w narodowego mściciela.',
        'Spisek koronacyjny w podziemiach katedry św. Jana i odrzucenie zamachu przez większość spiskowców.',
        'Nocna wyprawa Kordiana na sypialnię cara, walka ze Strachem i Imaginacją oraz omdlenie na progu.'
      ],
      key_scenes: [
        {
          scene: 'Monolog na Mont Blanc',
          significance: 'Punkt kulminacyjny przemiany bohatera. Kordian na „iglicy lodu” stawia diagnozę swojej epoce i formułuje ideę winkelriedyzmu.'
        },
        {
          scene: 'Droga przez korytarz carskiego zamku',
          significance: 'Ucieleśnienie psychologicznego paraliżu: Strach i Imaginacja reprezentują sumienie Kordiana, który nie potrafi przekroczyć granicy skrytobójstwa.'
        }
      ]
    },
    key_concepts: [
      { title: 'Winkelriedyzm', def: 'Koncepcja aktywnego poświęcenia: Polska jak szwajcarski bohater Arnold Winkelried skupia na sobie uderzenie wroga („Polska Winkelriedem narodów!”), dając wolność innym ludom.' },
      { title: 'Ból istnienia (Weltschmerz)', def: 'Romantyczne poczucie bezsensu egzystencji, pustki duchowej i apatii, dominujące w akcie I.' },
      { title: 'Strach i Imaginacja', def: 'Uosobienie wewnętrznych rozterek moralnych Kordiana – imaginacja potęguje grozę, a strach odbiera siłę fizyczną.' },
      { title: 'Spisek koronacyjny', def: 'Historyczne tło roku 1829: dylemat etyczny, czy zabicie koronowanego monarchy (królobójstwo) jest moralnie dopuszczalne.' }
    ],
    worked_example: {
      title: 'Monolog na Mont Blanc – Kordian odnajduje cel życia',
      quote: 'Jam posąg człowieka, na posągu świata... Uczucie wściekłości i ognia we mnie drzemie! Jam jest posąg, co wchłonął w siebie ból narodów! Niech zginę, niech moja krew obmyje ziemię: Polska Winkelriedem narodów!',
      context: 'Zwieńczenie aktu drugiego, gdy Kordian po rozczarowaniach Europą wchodzi na najwyższy szczyt Alp.',
      analysis: 'Bohater odrzuca bierność. Porównanie do posągu na dachu świata nadaje mu wymiar tytaniczny. Hasło winkelriedyzmu jest jawnym atakiem na mesjanizm Mickiewicza: Polska nie ma cierpieć jak Chrystus, lecz ma zadać cios i zginąć w walce jak Winkelried.',
      matura_tip: 'Pamiętaj o kontraście: Dziady cz. III = Mesjanizm (Chrystus narodów, pokora) vs Kordian = Winkelriedyzm (Winkelried narodów, aktywny czyn bojowy).'
    },
    cke_trap: {
      error: 'Uznanie, że Kordian zastrzelił cara w sypialni.',
      correct: 'Kordian nigdy nie wszedł do sypialni cara! Zemdlał na progu komnaty wskutek paraliżu psychicznego (Strach i Imaginacja).',
      correction: 'Kordiana powstrzymało własne sumienie i etos rycerski niepozwalający na skrytobójstwo; car odnalazł go nieprzytomnego na podłodze korytarza.',
      matura_tip: 'Napisanie, że Kordian dokonał zamachu lub zabił cara, to kardynalny błąd rzeczowy eliminujący pracę z oceny pozytywnej!'
    },
    golden_rule: 'Pamiętaj: Kordian to „dramat zrodzony z klęski powstania listopadowego”. Słowacki tłumaczy, dlaczego zryw upadł: przez brak dojrzałości przywódców i paraliż woli.'
  },
  unlockedBlockPreview: {
    id: 'arg-block-kordian-winkelriedyzm',
    bookId: 'kordian',
    bookTitle: 'Kordian',
    character: 'Kordian',
    theme: 'Czyn zbrojny a dylemat moralny jednostki',
    claim: 'Nawet najszlachetniejsza idea poświęcenia za ojczyznę ponosi klęskę, gdy jednostka pozostaje osamotniona i próbuje realizować cel metodami sprzecznymi z etyką.',
    evidence: 'Kordian na szczycie Mont Blanc rzuca hasło winkelriedyzmu, pragnąc w pojedynkę zabić cara Mikołaja I i ocalić naród. Kiedy jednak staje przed sypialnią tyrana, ulega wewnętrznemu paraliżowi wywołanemu przez Strach i Imaginację – rycerskie sumienie nie pozwala mu na skrytobójstwo.',
    contextType: 'POLEMICZNY',
    contextDescription: 'Polemika Juliusza Słowackiego z mesjanizmem Adama Mickiewicza: odrzucenie bierności chrystusowej na rzecz zbrojnego oporu (mit Arnolda Winkelrieda)',
    linkToThesis: 'Porażka Kordiana udowadnia, że romantyczny kult samotnego bohatera jest iluzją – prawdziwe wyzwolenie wymaga dojrzałości całego społeczeństwa, a nie jednostkowego aktu desperacji.',
    ckeSafetyRating: '100%_SAFE'
  },
  tasks: [
    {
      id: 'task-kordian-swipe',
      type: 'SWIPE_MATCH',
      title: 'KROK 1 • Tinder Lekturowy: Kordian',
      topic: 'Kordian • Juliusz Słowacki',
      instruction: 'Przesuń w PRAWO jeśli to fakt z dramatu Słowackiego, lub w LEWO jeśli to fałsz!',
      math_statement: 'Sprawdź, czy znasz wędrówki i rozterki Kordiana!',
      hints: {
        level_1: 'Pamiętaj o podróży do Rzymu i audiencji u papieża.',
        level_2: 'Uważaj na to, co stało się w podziemiach katedry św. Jana.'
      },
      points: 1,
      xp: 25,
      swipeData: {
        themeTitle: 'Kordian • Fakty i Pułapki',
        cards: [
          {
            id: 'kor-c1',
            statement: 'W Watykanie Papież błogosławi polskie dążenia niepodległościowe i potępia cara.',
            isTrue: false,
            explanation: 'Papież nakazuje Polakom czcić cara i modlić się za niego, a w razie buntu grozi rzuceniem klątwy!',
            ckeTrap: 'Kluczowa scena: Papież radzi Polakom, by czcili cara i całowali carskie progi.'
          },
          {
            id: 'kor-c2',
            statement: 'Włoszka Wioletta kochała Kordiana szczerze i bezinteresownie aż do śmierci.',
            isTrue: false,
            explanation: 'Wioletta interesowała się wyłącznie majątkiem Kordiana; opuściła go, gdy dowiedziała się o utracie złotych podków.',
            ckeTrap: 'Lekcja z aktu II: miłość romantyczna bywa towarem na sprzedaż.'
          },
          {
            id: 'kor-c3',
            statement: 'Monolog na Mont Blanc jest odpowiedzią Słowackiego na Wielką Improwizację Mickiewicza.',
            isTrue: true,
            explanation: 'To literacka polemika: Kordian na iglicy lodu formułuje winkelriedyzm przeciw mesjanizmowi Konrada.'
          },
          {
            id: 'kor-c4',
            statement: 'W podziemiach katedry większość spiskowców poparła plan zamachu na cara.',
            isTrue: false,
            explanation: 'Większość spiskowców pod wodzą Prezesa (Niemcewicza) zagłosowała PRZECIW zamachowi – Kordian został sam!'
          },
          {
            id: 'kor-c5',
            statement: 'Dramat ma otwarte zakończenie: car podpisuje ułaskawienie, a oficer na placu czeka na znak.',
            isTrue: true,
            explanation: 'Słowacki nie pokazuje egzekucji Kordiana; książę Konstanty pędzi z ułaskawieniem, a oficer podnosi rękę.'
          }
        ]
      }
    },
    {
      id: 'task-kordian-cardinal',
      type: 'CARDINAL_DETECTOR',
      title: 'KROK 2 • Polowanie na Kardynała: Zamach na Cara',
      topic: 'Kordian • Juliusz Słowacki',
      instruction: 'Zdemaskuj Kardynalny Błąd w interpretacji losów Kordiana (-2 ❤️ za błąd)!',
      math_statement: 'Czy wiesz, czym zakończyła się misja bohatera w carskim pałacu?',
      hints: {
        level_1: 'Sprawdź, czy car zginął i co powstrzymało Kordiana.',
        level_2: 'Strach i Imaginacja to personifikacje stanu psychicznego bohatera.'
      },
      points: 2,
      xp: 50,
      cardinalData: {
        contextBadge: 'BŁĄD KARDYNALNY • ZAMACH KORDIANA',
        examPrompt: 'Wskaż fragment zawierający dyskwalifikujący błąd merytoryczny CKE.',
        snippets: [
          {
            id: 'snip-kor-1',
            text: 'Kordian zakrada się do sypialni cara Mikołaja I i zadaje mu śmiertelny cios sztyletem, mszcząc krzywdy narodu. Następnie zostaje ujęty przez straż pałacową z zakrwawioną bronią.',
            isCardinal: true,
            examinerNote: 'KARDYNAŁ! Kordian NIE zabił cara! Zemdlał pod drzwiami sypialni z powodu moralnego paraliżu (Strach i Imaginacja). Car znalazł go żywego i śpiącego na korytarzu!'
          },
          {
            id: 'snip-kor-2',
            text: 'Kordian reprezentuje postawę winkelriedyzmu – gotowości do złożenia siebie w ofierze w walce czynnej, co różni go od biernego mesjanizmu mickiewiczowskiego.',
            isCardinal: false,
            examinerNote: 'Perfekcyjne zrozumienie idei historiozoficznej Słowackiego.'
          },
          {
            id: 'snip-kor-3',
            text: 'Podróż po Europie w akcie II leczy Kordiana z młodzieńczego idealizmu, uświadamiając mu, że światem polityki i relacji międzyludzkich rządzi bezwzględny pragmatyzm i pieniądz.',
            isCardinal: false,
            examinerNote: 'Wzorcowe streszczenie wymowy aktu drugiego.'
          }
        ]
      }
    },
    {
      id: 'task-kordian-teel',
      type: 'ARGUMENT_BUILDER',
      title: 'KROK 3 • Klocki TEEL: Winkelriedyzm w Wypracowaniu',
      topic: 'Kordian • Juliusz Słowacki',
      instruction: 'Zbuduj modelowy argument TEEL i powiększ swój Skarbiec o kolejną lekturę!',
      math_statement: 'Temat: „Cena idealizmu i samotności w walce o wielką sprawę”.',
      hints: {
        level_1: 'Dobierz tezę akcentującą zgubne skutki osamotnienia bohatera.',
        level_2: 'Jako dowód opisz noc w carskim pałacu.'
      },
      points: 2,
      xp: 50,
      argumentBuilderData: {
        essayTopic: 'Czy jednostka może w pojedynkę zmienić bieg historii?',
        theses: [
          { id: 't1', text: 'Samotna walka wybitnej jednostki bez poparcia społeczeństwa prowadzi do psychicznego paraliżu i klęski szlachetnych zamiarów.', isOptimal: true },
          { id: 't2', text: 'Winkelriedyzm jest najskuteczniejszą taktyką wojenną w dziejach ludzkości.', isOptimal: false, trapNote: 'Błędne ujęcie – to idea literacko-filozoficzna, a nie taktyka wojskowa.' }
        ],
        evidenceOptions: [
          { id: 'e1', text: 'Kordian po odrzuceniu zamachu przez spiskowców sam podejmuje próbę zabicia cara, lecz na progu carskiej sypialni ulega własnym skrupułom moralnym personifikowanym przez Strach i Imaginację.', isOptimal: true },
          { id: 'e2', text: 'Kordian gromadzi wielką armię szwajcarską i zdobywa Warszawę.', isOptimal: false, trapNote: 'Absurdalny błąd fabularny.' }
        ],
        contextOptions: [
          { id: 'c1', text: 'Rozliczenie romantyków z klęską powstania listopadowego 1830 roku – diagnoza braku solidarności elit i psychicznej słabości przywódców.', isOptimal: true },
          { id: 'c2', text: 'Renesansowy humanizm i afirmacja harmonijnego życia na wsi.', isOptimal: false, trapNote: 'Zupełnie chybiony kontekst epoki.' }
        ],
        linkOptions: [
          { id: 'l1', text: 'Dzieje Kordiana dowodzą, że czysty entuzjazm i etos rycerski nie wystarczą do obalenia tyranii, gdy brak politycznego realizmu i powszechnego poparcia narodu.', isOptimal: true },
          { id: 'l2', text: 'Dlatego też Kordian jest symbolem człowieka, który osiągnął pełnię szczęścia osobistego.', isOptimal: false, trapNote: 'Sprzeczne z wymową dramatu Słowackiego!' }
        ]
      }
    }
  ]
};

// =========================================================================
// 4. STEFAN ŻEROMSKI: PRZEDWIOŚNIE (DWUDZIESTOLECIE • DZIAŁ 16)
// =========================================================================
export const PRZEDWIOSNIE_LEKTURA: CanonicalLektura = {
  id: 'pol-lesson-14-1',
  aliases: ['przedwiosnie', 'zeromski-przedwiosnie', 'pol-przedwiosnie', 'pol-lesson-14-1', 'pol-lesson-16-2', '14.1', '16.2'],
  bookId: 'przedwiosnie',
  epochId: 'pol-dzial-14',
  numericTopicId: 14,
  badge: '14.1',
  title: 'Stefan Żeromski „Przedwiośnie” – Mit Szklanych Domów a Rzeczywistość',
  bookTitle: 'Przedwiośnie',
  author: 'Stefan Żeromski',
  epoch: 'Dwudziestolecie międzywojenne',
  estimatedTime: '5 min',
  heroCharacter: 'Cezary Baryka, Seweryn Baryka',
  keyTheme: 'Konfrontacja mitu z rzeczywistością, rewolucja i drogi odbudowy Polski',
  theoryPill: {
    title: 'Żeromski: Przedwiośnie – Rozczarowanie Odrodzoną Polską',
    concept_essence: '„Przedwiośnie” to powieść rozliczeniowa z pierwszych lat niepodległej II Rzeczypospolitej. Żeromski zderza naiwny, romantyczny mit o Polsce nowoczesnej i sprawiedliwej („szklane domy” Seweryna Baryki) z ponurą rzeczywistością biedy, zniszczenia i podziałów klasowych. Cezary Baryka staje się reprezentantem młodego pokolenia poszukującego drogi dla ojczyzny między ewolucją a rewolucją.',
    book_summary: {
      title: 'Przedwiośnie',
      author: 'Stefan Żeromski',
      genre: 'Powieść polityczno-społeczna',
      plot_overview: 'Część I („Szklane domy”) ukazuje młodość Cezarego w Baku, krwawą rewolucję bolszewicką, śmierć matki i podróż z ojcem do odrodzonej Polski. Ojciec karmi syna wizją szklanych domów, lecz umiera tuż przed granicą. W Polsce Cezary widzi błoto, nędzę i ruderki przygraniczne. W części II („Nawłoć”) po udziale w wojnie polsko-bolszewickiej Cezary odpoczywa w ziemiańskim majątku Hipolita Wielosławskiego, przeżywając romanse z Karoliną, Wandą i Laurą Kościeniecką. W części III („Wiatr od wschodu”) w Warszawie ścierają się dwie koncepcje naprawy państwa: ewolucyjne reformy Gajowca oraz krwawa rewolucja komunistów Lulka. W finale Cezary w czapce legionowej idzie na Belweder, lecz „odrębnie, w osobnym szeregu”.',
      key_events: [
        'Wybuch rewolucji w Baku i początkowa naiwna fascynacja Cezarego bolszewizmem.',
        'Wstrząsające doświadczenie pracy przy zakopywaniu ciał i widok zwłok pięknej Ormianki.',
        'Podróż pociągiem repatriacyjnym i opowieść schorowanego ojca o szklanych domach.',
        'Pobyt w sielskiej Nawłoci: miłosny czworokąt i tragiczna śmierć otrutej Karoliny.',
        'Dyskusje ideowe w Warszawie (Gajowiec vs Lulek) i marsz bezrobotnych na Belweder.'
      ],
      key_scenes: [
        {
          scene: 'Opowieść o szklanych domach',
          significance: 'Utopijna wizja Polski opartej na czystości, higienie, elektryczności i powszechnym dobrobycie. Mit ten brutalnie pęka po przekroczeniu granicy w Chotyłowie.'
        },
        {
          scene: 'Marsz na Belweder w finale',
          significance: 'Cezary w mundurze polskim idzie na czele manifestacji robotniczej, lecz idzie sam, obok – symbol buntu przeciw niesprawiedliwości bez akceptacji bolszewizmu.'
        }
      ]
    },
    key_concepts: [
      { title: 'Szklane domy', def: 'Utopijny mit o Polsce sprawiedliwej, czystej i zaawansowanej technicznie, stworzony przez Seweryna Barykę, by skłonić syna do powrotu do ojczyzny.' },
      { title: 'Rewolucja komunistyczna', def: 'Żeromski ukazuje ją naturalistycznie jako krwawy żywioł niszczący kulturę, rodzinę i moralność (Baku), odrzucając drogę komunistów (Lulek).' },
      { title: 'Program reform Gajowca', def: 'Ewolucyjny program państwowy: reforma walutowa, edukacja, umocnienie granic i stopniowa poprawa losu robotników.' },
      { title: 'Nawłoć – Arkadia ziemiańska', def: 'Sielski obraz dworku szlacheckiego, w którym życie toczy się beztrosko na obiadach i flirtach, w oderwaniu od problemów biedoty czworaków.' }
    ],
    worked_example: {
      title: 'Przekroczenie granicy polskiej – Zderzenie mitu z błotem',
      quote: 'Cezary wysiadł z wagonu na stacji granicznej. Spojrzał dokoła: gdzież są owe szklane domy? Wszędzie stały plugawe, odrapane chaty z przegniłego drzewa, oblepione gnojem i błotem. Chude konie i wynędzniali ludzie w łachmanach snuli się po peronie...',
      context: 'Początek pobytu Cezarego na ziemiach polskich po śmierci ojca w pociągu repatriacyjnym.',
      analysis: 'Uderzający kontrast między świetlaną wizją ojca a realiami Chotyłowa. Żeromski posługuje się turpizmem i bezlitosnym realizmem, by pokazać dramatyczny stan państwa po 123 latach niewoli i wojnie. Pytanie Cezarego: „Gdzież są twoje szklane domy?” to wyrzut całego młodego pokolenia.',
      matura_tip: 'Świetny materiał do motywu rozczarowania rzeczywistością, zderzenia marzeń z prozą życia oraz motywu powrotu do ojczyzny.'
    },
    cke_trap: {
      error: 'Uznanie, że w finale Cezary został członkiem partii komunistycznej i poparł rewolucję.',
      correct: 'Cezary idzie w marszu na Belweder, ale „odrębnie, w osobnym szeregu”, w polskim mundurze legionisty!',
      correction: 'Cezary protestuje przeciwko nędzy i bezduszności rządu, lecz wcześniej ostro krytykował komunistów na zebraniu u Lulka. Jego gest to krzyk rozpaczy, a nie akces do partii bolszewickiej.',
      matura_tip: 'Egzaminatorzy CKE natychmiast wychwytują uproszczenie, że Baryka stał się komunistą. Pamiętaj: szedł OSOBNO!'
    },
    golden_rule: 'W Przedwiośniu kluczem jest tytuł: przedwiośnie to czas topnienia śniegów, błota i chłodu, ale zwiastujący nadejście wiosny. Taka właśnie była Polska po 1918 roku.'
  },
  unlockedBlockPreview: {
    id: 'arg-block-przedwiosnie-mit',
    bookId: 'przedwiosnie',
    bookTitle: 'Przedwiośnie',
    character: 'Cezary Baryka, Seweryn Baryka',
    theme: 'Konfrontacja marzeń z rzeczywistością i poszukiwanie tożsamości',
    claim: 'Wzniosłe mity i utopijne obietnice rozpadają się w zderzeniu z twardymi realiami życia, zmuszając człowieka do bolesnego przedefiniowania własnych ideałów.',
    evidence: 'W „Przedwiośniu” Stefana Żeromskiego Seweryn Baryka roztacza przed synem wizję Polski szklanych domów – kraju powszechnego dobrobytu i sprawiedliwości. Po przyjeździe do kraju Cezary zastaje jednak przygraniczne błoto, nędzę czworaków w Nawłoci i bezduszność polityków w Warszawie. Finałowy marsz na Belweder ukazuje jego niezgodę na krzywdę, lecz także poczucie tragicznego osamotnienia.',
    contextType: 'SPOŁECZNY',
    contextDescription: 'Doświadczenie rewolucji bolszewickiej w Baku oraz pierwsze lata niepodległości II RP – kryzys społeczny i ekonomiczny młodego państwa polskiego',
    linkToThesis: 'Losy Cezarego Baryki pokazują, że dojrzałość obywatelska wymaga odrzucenia skrajnych utopii na rzecz trzeźwej, często gorzkiej pracy nad naprawą ojczyzny.',
    ckeSafetyRating: '100%_SAFE'
  },
  tasks: [
    {
      id: 'task-przedwiosnie-swipe',
      type: 'SWIPE_MATCH',
      title: 'KROK 1 • Tinder Lekturowy: Przedwiośnie',
      topic: 'Przedwiośnie • Stefan Żeromski',
      instruction: 'Przesuń kartę w PRAWO jeśli to fakt z powieści Żeromskiego, lub w LEWO jeśli to fałsz!',
      math_statement: 'Sprawdź swoją wiedzę o losach Cezarego Baryki pod presją czasu!',
      hints: {
        level_1: 'Pamiętaj o wydarzeniach w Baku, Nawłoci i Warszawie.',
        level_2: 'Zwróć uwagę na relację z Laurą Kościeniecką i Barwickim.'
      },
      points: 1,
      xp: 25,
      swipeData: {
        themeTitle: 'Przedwiośnie • Szklane Domy & Nawłoć',
        cards: [
          {
            id: 'prz-c1',
            statement: 'Seweryn Baryka zamieszkał z synem w Warszawie i dożył późnej starości.',
            isTrue: false,
            explanation: 'Seweryn Baryka zmarł z wycieńczenia w pociągu tuż przed przekroczeniem granicy polskiej.',
            ckeTrap: 'Pułapka CKE: ojciec umiera w drodze do Polski, Cezary wkracza do kraju jako sierota!'
          },
          {
            id: 'prz-c2',
            statement: 'Cezary wziął udział w wojnie polsko-bolszewickiej w 1920 roku i uratował życie Wielosławskiemu.',
            isTrue: true,
            explanation: 'Wyniesienie rannego Hipolita Wielosławskiego z pola bitwy dało początek ich przyjaźni i zaproszeniu do Nawłoci.'
          },
          {
            id: 'prz-c3',
            statement: 'W Nawłoci Cezary zaręczył się z Karoliną Szarłatowiczówną za zgodą jej rodziny.',
            isTrue: false,
            explanation: 'Karolina kochała Cezarego, lecz została otruta z zazdrości przez Wandę Okszyńską; Cezary kochał mężatkę Laurę.'
          },
          {
            id: 'prz-c4',
            statement: 'Szymon Gajowiec proponował natychmiastową rewolucję proletariatu i wywłaszczenie fabrykantów.',
            isTrue: false,
            explanation: 'Gajowiec był państwowcem i ewolucjonistą (reforma waluty, armia, edukacja); rewolucji chciał komunistyczny Lulek!'
          },
          {
            id: 'prz-c5',
            statement: 'W scenie finałowej Cezary idzie w marszu na Belweder w mundurze legionowym.',
            isTrue: true,
            explanation: 'Cezary ubrany w mundur polskiego żołnierza maszeruje obok manifestantów, lecz osobno.'
          }
        ]
      }
    },
    {
      id: 'task-przedwiosnie-cardinal',
      type: 'CARDINAL_DETECTOR',
      title: 'KROK 2 • Polowanie na Kardynała: Szklane Domy',
      topic: 'Przedwiośnie • Stefan Żeromski',
      instruction: 'Zdemaskuj Kardynalny Błąd w interpretacji symbolu szklanych domów (-2 ❤️ za pomyłkę)!',
      math_statement: 'Wskaż fragment całkowicie sprzeczny z wymową utworu!',
      hints: {
        level_1: 'Pamiętaj, czym w rzeczywistości były szklane domy dla Seweryna i Cezarego.',
        level_2: 'Czy szklane domy naprawdę istniały w Polsce w 1918 roku?'
      },
      points: 2,
      xp: 50,
      cardinalData: {
        contextBadge: 'BŁĄD KARDYNALNY • SZKLANE DOMY',
        examPrompt: 'Wskaż fragment zawierający kardynalne przeinaczenie faktów z powieści Żeromskiego.',
        snippets: [
          {
            id: 'snip-prz-1',
            text: 'Po przyjeździe do Warszawy Cezary zamieszkał w nowoczesnym osiedlu szklanych domów zbudowanych przez inżyniera Barykę. Dzięki temu przekonał się o wielkim sukcesie gospodarczym i technicznym II Rzeczypospolitej.',
            isCardinal: true,
            examinerNote: 'KARDYNAŁ! Szklane domy były wyłącznie zmyśloną przez ojca utopijną opowieścią! W Polsce Baryka zastał ruderki, błoto, zubożenie i brud przygranicznego Chotyłowa.'
          },
          {
            id: 'snip-prz-2',
            text: 'Mit szklanych domów pełni w utworze funkcję metafory nadziei na cywilizacyjny skok odrodzonego państwa, który został brutalnie skonfrontowany z prowincjonalną nędzą.',
            isCardinal: false,
            examinerNote: 'Wzorcowe odczytanie symboliki szklanych domów.'
          },
          {
            id: 'snip-prz-3',
            text: 'Obraz rewolucji w Baku jest przestrogą Żeromskiego przed bezmyślnym okrucieństwem tłumu, który niszczy wszelkie więzi moralne i obraca miasto w ruinę.',
            isCardinal: false,
            examinerNote: 'Właściwa ocena antybolszewickiej wymowy pierwszej części utworu.'
          }
        ]
      }
    },
    {
      id: 'task-przedwiosnie-teel',
      type: 'ARGUMENT_BUILDER',
      title: 'KROK 3 • Klocki TEEL: Rozczarowanie Rzeczywistością',
      topic: 'Przedwiośnie • Stefan Żeromski',
      instruction: 'Złóż dojrzały argument TEEL i zdobądź klocek Przedwiośnia do Skarbca!',
      math_statement: 'Temat: „Konfrontacja młodzieńczego buntu i marzeń z realiami społecznymi”.',
      hints: {
        level_1: 'Teza powinna uwzględniać kryzys tożsamości młodego pokolenia.',
        level_2: 'Jako dowód wykorzystaj zderzenie mitu szklanych domów z realiami.'
      },
      points: 2,
      xp: 50,
      argumentBuilderData: {
        essayTopic: 'Jak konfrontacja z rzeczywistością kształtuje charakter młodego człowieka?',
        theses: [
          { id: 't1', text: 'Zderzenie idealistycznych wyobrażeń z brutalną prawdą o świecie niszczy naiwne złudzenia, stając się bolesnym katalizatorem dojrzałości i odpowiedzialności moralnej.', isOptimal: true },
          { id: 't2', text: 'Młodzi ludzie powinni unikać jakiegokolwiek zaangażowania w sprawy społeczne, by nie doznać rozczarowania.', isOptimal: false, trapNote: 'Sprzeczne z postawą Cezarego Baryki.' }
        ],
        evidenceOptions: [
          { id: 'e1', text: 'Cezary Baryka wkracza do Polski oczarowany opowieścią ojca o szklanych domach, lecz zderza się z nędzą Chotyłowa i Warszawy, co popycha go do poszukiwania własnej drogi naprawy ojczyzny.', isOptimal: true },
          { id: 'e2', text: 'Cezary w Baku natychmiast zdobywa wielki majątek i otwiera sieć hut szkła.', isOptimal: false, trapNote: 'Błąd fabularny: Cezary stracił w Baku cały dobytek i pracował przy trupach!' }
        ],
        contextOptions: [
          { id: 'c1', text: 'Kontekst historyczno-społeczny: trudne narodziny II RP po 1918 roku, zniszczenia wojenne i spór ideowy o kształt niepodległej Polski między komunistami a obozem państwowym.', isOptimal: true },
          { id: 'c2', text: 'Mistycyzm towianizmu i wiara w nadejście tajemniczego męża czterdzieści i cztery.', isOptimal: false, trapNote: 'Nietrafiony kontekst – to domena romantyzmu, a nie powieści Żeromskiego z 1924 r.' }
        ],
        linkOptions: [
          { id: 'l1', text: 'Doświadczenia Baryki dowodzą, że prawdziwy patriotyzm nie polega na bezkrytycznym zachwycie krajem, lecz na odwadze dostrzeżenia jego wad i poszukiwaniu sprawiedliwości.', isOptimal: true },
          { id: 'l2', text: 'Dlatego też powrót do Baku okazał się jedynym rozsądnym wyborem dla bohatera.', isOptimal: false, trapNote: 'Fałsz: Baryka pozostał w Polsce!' }
        ]
      }
    }
  ]
};

// =========================================================================
// 5. GUSTAW HERLING-GRUDZIŃSKI: INNY ŚWIAT (WOJNA • DZIAŁ 17)
// =========================================================================
export const INNY_SWIAT_LEKTURA: CanonicalLektura = {
  id: 'pol-lesson-15-2',
  aliases: ['inny-swiat', 'herling-inny-swiat', 'pol-inny-swiat', 'pol-lesson-15-2', 'pol-lesson-17-2', '15.2', '17.2'],
  bookId: 'inny-swiat',
  epochId: 'pol-dzial-15',
  numericTopicId: 15,
  badge: '15.2',
  title: 'Gustaw Herling-Grudziński „Inny świat” – Człowiek Złagrowany',
  bookTitle: 'Inny świat',
  author: 'Gustaw Herling-Grudziński',
  epoch: 'Literatura wojny i okupacji',
  estimatedTime: '5 min',
  heroCharacter: 'Gustaw (narrator), Kostylew, Rusto Karinen',
  keyTheme: 'Granice człowieczeństwa, system totalitarny i człowiek złagrowany',
  theoryPill: {
    title: 'Herling-Grudziński: Inny świat – Granice Moralności w Łagrze',
    concept_essence: '„Inny świat” to autobiograficzny dokument o radzieckim obozie w Jercewie (Archangielsk). Tytuł nawiązuje do Dostojewskiego („Wspomnienia z domu umarłych”): łagier to planeta poza normalną cywilizacją, gdzie reguły moralne ulegają zawieszeniu. Herling-Grudziński zadaje fundamentalne pytanie: czy w warunkach nieludzkich można zachować człowieczeństwo?',
    book_summary: {
      title: 'Inny świat',
      author: 'Gustaw Herling-Grudziński',
      genre: 'Literatura faktu / wspomnienia łagrowe',
      plot_overview: 'Narrator zostaje aresztowany przez NKWD w 1940 roku pod kuriozalnym zarzutem szpiegostwa (buty z cholewami i polskie nazwisko brzmiące jak marszałek Göring). Trafia do łagru w Jercewie. Opisuje morderczą pracę przy wyrębie lasu, głodowe racje żywnościowe, hierarchię obozową (urki – kryminaliści na szczycie, więźniowie polityczni na dnie), dom trupów (morgownię) oraz powolny rozkład więzi międzyludzkich. Po głodówce protestacyjnej zostaje zwolniony na mocy amnestii i dołącza do Armii Andersa. W epilogu w Rzymie odmawia rozgrzeszenia dawnemu współwięźniowi, który doniósł na kolegów, by ratować własne życie.',
      key_events: [
        'Aresztowanie Gustawa przez NKWD i paranoiczne śledztwo w grodzieńskim więzieniu.',
        'Przybycie do Jercewa: podział na kotły żywnościowe uzależnione od wyrobienia normy.',
        'Historia inżyniera Kostylewa: samookaleczenie (przypalanie ręki w ogniu), by nie pracować dla oprawców.',
        'Tragiczna próba ucieczki Rusto Karinena i samosąd urków.',
        'Głodówka protestacyjna Gustawa, zwolnienie z obozu i spotkanie w Rzymie z żydowskim krawcem (epilog).'
      ],
      key_scenes: [
        {
          scene: 'Opowieść o Michale Kostylewie',
          significance: 'Bohater woli codziennie przypalać rękę w ogniu, cierpiąc nieludzki ból, niż oddać swoje siły nienawistnemu systemowi łagrowemu – bunt w obronie wolności wewnętrznej.'
        },
        {
          scene: 'Epilog w Rzymie („Milczenie”) – odmowa słowa „Rozumiem”',
          significance: 'Wstrząsający finał: Gustaw w wolnym świecie nie potrafi powiedzieć „rozumiem” człowiekowi, który w łagrze kupił ocalenie życiem czterech towarzyszy.'
        }
      ]
    },
    key_concepts: [
      { title: 'Człowiek złagrowany', def: 'Więzień, którego psychika i system wartości zostały bezwzględnie zredukowane do instynktu biologicznego przetrwania i zdobycia jedzenia.' },
      { title: 'Kotły żywnościowe (I, II, III)', def: 'Szatański mechanizm: więzień pracujący ponad siły otrzymuje najwięcej strawy, a słabnący dostaje mniej, co przyspiesza jego śmierć.' },
      { title: 'Urkowie', def: 'Recydywiści kryminalni, elita obozu radzieckiego, terroryzująca bezkarnie więźniów politycznych (tzw. „bytownicy”).' },
      { title: 'Granica człowieczeństwa', def: 'Słynna teza Grudzińskiego: „Człowiek jest ludzki w ludzkich warunkach; bezsensem jest sądzić go tam, gdzie warunki są nieludzkie”.' }
    ],
    worked_example: {
      title: 'Epilog w Rzymie – Odmowa rozgrzeszenia zbrodni obozowej',
      quote: 'Czekałem na to jedno słowo: „Rozumiem”... Niech pan powie: rozumiem! (...) Patrzyłem na niego z obcością i lękiem. Nie mogłem wymówić tego słowa. Dzieliła nas przepaść wolnego świata, w którym zdrada znowu była zdradą, a krew krwią.',
      context: 'Zakończenie książki – rozmowa narratora w 1945 roku w rzymskim hotelu z byłym współwięźniem z Jercewa.',
      analysis: 'Współwięzień oczekuje od Gustawa absolucji moralnej. Narrator jednak milczy. Grudziński dowodzi, że w wolnym świecie nie wolno relatywizować zła ani usprawiedliwiać podłości – oznaczałoby to zatrucie cywilizacji logiką obozową.',
      matura_tip: 'Niezwykle wartościowy cytat do tematów o cenie ocalenia, pamięci o zbrodniach i dylematach etycznych epoki pieców i łagrów.'
    },
    cke_trap: {
      error: 'Twierdzenie, że Gustaw Herling-Grudziński opisuje obóz w Oświęcimiu (Auschwitz).',
      correct: '„Inny świat” opisuje sowiecki ŁAGIER w Jercewie (Gułag ZSRR), a nie niemiecki obóz koncentracyjny (KL)!',
      correction: 'Auschwitz opisywał Tadeusz Borowski („Proszę państwa do gazu”), natomiast Grudziński był więźniem Gułagu NKWD na północy Rosji.',
      matura_tip: 'Pomylenie łagru radzieckiego (Gułag) z niemieckim obozem koncentracyjnym (Auschwitz/Majdanek) to kardynalny błąd rzeczowy!'
    },
    golden_rule: 'Pamiętaj najważniejsze zdanie Herlinga: „Człowiek może być ludzki tylko w ludzkich warunkach”. To naczelna teza antropologiczna Innego świata.'
  },
  unlockedBlockPreview: {
    id: 'arg-block-inny-swiat-czlowiek',
    bookId: 'inny-swiat',
    bookTitle: 'Inny świat',
    character: 'Gustaw, Kostylew',
    theme: 'Ocalenie godności w warunkach totalitaryzmu',
    claim: 'System totalitarny dąży do całkowitego odczłowieczenia więźnia, lecz jednostka zdolna do heroicznego buntu wewnętrznego potrafi zachować resztki wolności nawet za cenę własnego ciała.',
    evidence: 'W „Innym świecie” Gustawa Herlinga-Grudzińskiego sowiecki łagier w Jercewie został zaprojektowany tak, by głodem i katorżniczą pracą złamać moralność człowieka (człowiek złagrowany). Wyjątkiem jest inżynier Kostylew, który po odkryciu prawdy o systemie co noc przypala w ogniu własną rękę, by nie pracować dla oprawców – wybiera fizyczne męczeństwo w imię zachowania czystości sumienia.',
    contextType: 'FILOZOFICZNO-ETYCZNY',
    contextDescription: 'Refleksja nad totalitaryzmem XX wieku i kondycją człowieka poddanego skrajnemu zniewoleniu na nieludzkiej ziemi (nawiązanie do Dostojewskiego)',
    linkToThesis: 'Postawa Kostylewa oraz głodówka protestacyjna narratora dowodzą, że nawet w nieludzkim świecie istnieją granice, których tyrania nie jest w stanie przekroczyć bez zgody samej ofiary.',
    ckeSafetyRating: '100%_SAFE'
  },
  tasks: [
    {
      id: 'task-inny-swiat-swipe',
      type: 'SWIPE_MATCH',
      title: 'KROK 1 • Tinder Lekturowy: Inny świat',
      topic: 'Inny świat • Gustaw Herling-Grudziński',
      instruction: 'Przesuń kartę w PRAWO jeśli to fakt z Jercewa, lub w LEWO jeśli to błąd/pułapka!',
      math_statement: 'Sprawdź znajomość realiów łagrowych Gułagu pod presją czasu!',
      hints: {
        level_1: 'Pamiętaj o różnicy między łagrem a niemieckim obozem.',
        level_2: 'Zwróć uwagę na postać Kostylewa i rolę „Domu Swidanij”.'
      },
      points: 1,
      xp: 25,
      swipeData: {
        themeTitle: 'Inny świat • Realia Jercewa',
        cards: [
          {
            id: 'is-c1',
            statement: 'Gustaw Herling-Grudziński był więziony w niemieckim obozie zagłady Treblinka.',
            isTrue: false,
            explanation: 'Grudziński był więźniem sowieckiego ŁAGRU w Jercewie koło Archangielska pod władzą NKWD!',
            ckeTrap: 'Błąd kardynalny: mylenie łagru sowieckiego z niemieckim obozem zagłady!'
          },
          {
            id: 'is-c2',
            statement: 'Inżynier Kostylew celowo przypalał swoją rękę w ogniu, by nie pracować na rzecz sowieckiego łagru.',
            isTrue: true,
            explanation: 'Uważał pracę w obozie za zdradę samego siebie i wolał ból oparzeń niż budowanie potęgi Stalina.'
          },
          {
            id: 'is-c3',
            statement: 'Trzeci kocioł w łagrze otrzymywali więźniowie najciężej chorzy i umierający.',
            isTrue: false,
            explanation: 'III kocioł (największy) otrzymywali stachanowcy wyrabiający ponad 125% normy! Chorzy dostawali głodowy I kocioł.',
            ckeTrap: 'Pułapka: w łagrze jedzenie było nagrodą za wydajność, a nie pomocą dla słabych.'
          },
          {
            id: 'is-c4',
            statement: 'W „Domu Swidanij” (domu widzeń) więźniowie mogli na krótko spotkać się z rodziną i poczuć ludźmi.',
            isTrue: true,
            explanation: 'To było jedyne miejsce, gdzie nie obowiązywały obozowe łachmany i można było zjeść posiłek z bliskimi.'
          },
          {
            id: 'is-c5',
            statement: 'W epilogu w Rzymie narrator z płaczem wybacza zdrajcy i wypowiada słowo „Rozumiem”.',
            isTrue: false,
            explanation: 'Narrator MILCZY i odmawia wypowiedzenia słowa „rozumiem”, bo w wolnym świecie zdrada nie może być usprawiedliwiona.',
            ckeTrap: 'Kluczowe zakończenie utworu: brak zgody na przenoszenie obozowej moralności do normalnego świata.'
          }
        ]
      }
    },
    {
      id: 'task-inny-swiat-cardinal',
      type: 'CARDINAL_DETECTOR',
      title: 'KROK 2 • Polowanie na Kardynała: Morze Łagrów',
      topic: 'Inny świat • Gustaw Herling-Grudziński',
      instruction: 'Zdemaskuj Kardynalny Błąd rzeczowy w analizie „Innego świata” (-2 ❤️ za pomyłkę)!',
      math_statement: 'Uważaj: precyzja historyczna decyduje o wyniku matury z polskiego!',
      hints: {
        level_1: 'Sprawdź, jakie państwo stworzyło łagry i kto dowodził obozem.',
        level_2: 'Pamiętaj o różnicy między Gułagiem a Holokaustem.'
      },
      points: 2,
      xp: 50,
      cardinalData: {
        contextBadge: 'BŁĄD KARDYNALNY • GUŁAG VS OBOZY NIEMIECKIE',
        examPrompt: 'Wskaż fragment zawierający dyskwalifikujący błąd historyczno-literacki.',
        snippets: [
          {
            id: 'snip-is-1',
            text: 'W „Innym świecie” Gustaw Herling-Grudziński opisuje swoje tragiczne przeżycia w hitlerowskim obozie koncentracyjnym, gdzie pod okiem oficerów SS więźniowie byli masowo uśmiercani w komorach gazowych Cyklonem B.',
            isCardinal: true,
            examinerNote: 'KARDYNAŁ CAŁKOWITY! „Inny świat” dotyczy radzieckiego Gułagu (obóz NKWD w Jercewie), a nie hitlerowskich obozów zagłady! W Jercewie nie było SS ani komór gazowych – więźniowie umierali z głodu, mrozu i katorgi leśnej.'
          },
          {
            id: 'snip-is-2',
            text: 'Herling-Grudziński ukazuje obóz jako przemyślany system niszczenia ludzkiej godności, w którym więźniowie są zmuszani do walki o przetrwanie kosztem innych skazańców.',
            isCardinal: false,
            examinerNote: 'Właściwe odczytanie mechanizmów działania obozu sowieckiego.'
          },
          {
            id: 'snip-is-3',
            text: 'Pisarz polemizuje z poglądem, że człowiek jest z natury zły. Dowodzi, że to nieludzkie warunki niszczą moralność, a pojedyncze akty dobra świadczą o niezniszczalności ludzkiego sumienia.',
            isCardinal: false,
            examinerNote: 'Głęboka i trafna refleksja filozoficzna.'
          }
        ]
      }
    },
    {
      id: 'task-inny-swiat-teel',
      type: 'ARGUMENT_BUILDER',
      title: 'KROK 3 • Klocki TEEL: Ocalenie Człowieczeństwa',
      topic: 'Inny świat • Gustaw Herling-Grudziński',
      instruction: 'Zbuduj argument TEEL i odbierz klocek do Skarbca Argumentów!',
      math_statement: 'Temat: „Postawy człowieka w sytuacjach skrajnych”.',
      hints: {
        level_1: 'Teza: godność wymaga heroicznego oporu wobec narzuconego zła.',
        level_2: 'Dowód: postawa inżyniera Kostylewa.'
      },
      points: 2,
      xp: 50,
      argumentBuilderData: {
        essayTopic: 'Czy w warunkach odczłowieczenia możliwe jest zachowanie godności?',
        theses: [
          { id: 't1', text: 'Nawet w warunkach skrajnego terroru jednostka może zachować wewnętrzną wolność, odmawiając duchowej współpracy z systemem oprawców.', isOptimal: true },
          { id: 't2', text: 'W obozie każdy człowiek bez wyjątku staje się bezwzględnym zbrodniarzem.', isOptimal: false, trapNote: 'Zbyt kategoryczne, przeczy postawie Kostylewa i Gustawa.' }
        ],
        evidenceOptions: [
          { id: 'e1', text: 'Inżynier Kostylew w Jercewie przypala sobie rękę w ogniu, wybierając fizyczne cierpienie, by nie pracować dla znienawidzonego reżimu stalinowskiego.', isOptimal: true },
          { id: 'e2', text: 'Więźniowie w Jercewie organizują zbrojne powstanie i uciekają na zachód.', isOptimal: false, trapNote: 'Błąd fabularny: nie było powstania zbrojnego.' }
        ],
        contextOptions: [
          { id: 'c1', text: 'Filozoficzna koncepcja człowieka złagrowanego i moralności obozowej – zderzenie etyki dekalogu z walką o biologiczną wegetację w ZSRR.', isOptimal: true },
          { id: 'c2', text: 'Romantyczny mesjanizm głoszący zmartwychwstanie narodów bez walki.', isOptimal: false, trapNote: 'Chybiony kontekst dla literatury obozowej XX wieku.' }
        ],
        linkOptions: [
          { id: 'l1', text: 'Heroizm Kostylewa dowodzi słów pisarza, że człowiek ma w sobie pierwiastek niezłomny, który pozwala mu pozostać człowiekiem nawet na nieludzkiej ziemi.', isOptimal: true },
          { id: 'l2', text: 'Dlatego też jedynym ratunkiem w łagrze było bezwzględne donoszenie na współtowarzyszy.', isOptimal: false, trapNote: 'Sprzeczne z puentą utworu!' }
        ]
      }
    }
  ]
};

import { LALKA_SHOWCASE, DZIADY_SHOWCASE } from './polishVerticalSliceData';

export const LALKA_CANONICAL: CanonicalLektura = {
  id: 'pol-lesson-11-2',
  aliases: ['lalka', 'prus-lalka', 'pol-lalka', 'pol-showcase-lalka'],
  bookId: 'lalka',
  epochId: 'pol-dzial-11',
  numericTopicId: 11,
  badge: '11.2',
  title: LALKA_SHOWCASE.title,
  bookTitle: 'Lalka',
  author: 'Bolesław Prus',
  epoch: 'Pozytywizm',
  estimatedTime: '5 min',
  heroCharacter: 'Stanisław Wokulski',
  keyTheme: 'Idealizm a twarda rzeczywistość',
  theoryPill: {
    ...LALKA_SHOWCASE.theoryPill,
    title: 'Bolesław Prus: Lalka – Panorama Epoki i Anatomia Złudzeń'
  } as any,
  tasks: LALKA_SHOWCASE.tasks,
  unlockedBlockPreview: LALKA_SHOWCASE.unlockedBlockPreview
};

export const DZIADY_CANONICAL: CanonicalLektura = {
  id: 'pol-lesson-10-1',
  aliases: ['dziady', 'dziady-3', 'dziady-cz-3', 'dziady-cz-iii', 'mickiewicz-dziady', 'pol-dziady', 'pol-showcase-dziady', 'pol-lesson-10-1', 'pol-lesson-10-2', 'pol-lesson-13-2', '10.1', '10.2', '13.2'],
  bookId: 'dziady-cz-3',
  epochId: 'pol-dzial-10',
  numericTopicId: 10,
  badge: '10.1',
  title: DZIADY_SHOWCASE.title,
  bookTitle: 'Dziady cz. III',
  author: 'Adam Mickiewicz',
  epoch: 'Romantyzm',
  estimatedTime: '5 min',
  heroCharacter: 'Konrad',
  keyTheme: 'Bunt prometejski i mesjanizm',
  theoryPill: {
    ...DZIADY_SHOWCASE.theoryPill,
    title: 'Adam Mickiewicz: Dziady cz. III – Martyrologia i Bunt'
  } as any,
  tasks: DZIADY_SHOWCASE.tasks,
  unlockedBlockPreview: DZIADY_SHOWCASE.unlockedBlockPreview
};

// =========================================================================
// ZBIORCZY KATALOG KANONU LEKTUR PRODUKCYJNYCH
// =========================================================================
export const CANONICAL_LEKTURY_CATALOG: Record<string, CanonicalLektura> = {
  'pol-lesson-5-2': ANTYGONA_LEKTURA,
  'pol-lesson-8-2': ANTYGONA_LEKTURA,
  'antygona': ANTYGONA_LEKTURA,
  'pol-lesson-10-1': DZIADY_CANONICAL,
  'pol-showcase-dziady': DZIADY_CANONICAL,
  'dziady-3': DZIADY_CANONICAL,
  'dziady-cz-3': DZIADY_CANONICAL,
  'dziady': DZIADY_CANONICAL,
  'pol-lesson-10-2': KORDIAN_LEKTURA,
  'pol-lesson-10-3': KORDIAN_LEKTURA,
  'pol-lesson-13-3': KORDIAN_LEKTURA,
  'kordian': KORDIAN_LEKTURA,
  'pol-lesson-11-1': LALKA_CANONICAL,
  'pol-lesson-11-2': LALKA_CANONICAL,
  'pol-lesson-14-2': LALKA_CANONICAL,
  'pol-showcase-lalka': LALKA_CANONICAL,
  'lalka': LALKA_CANONICAL,
  'pol-lesson-13-1': WESELE_LEKTURA,
  'pol-lesson-13-2': WESELE_LEKTURA,
  'wesele': WESELE_LEKTURA,
  'pol-lesson-14-1': PRZEDWIOSNIE_LEKTURA,
  'pol-lesson-16-2': PRZEDWIOSNIE_LEKTURA,
  'przedwiosnie': PRZEDWIOSNIE_LEKTURA,
  'pol-lesson-15-2': INNY_SWIAT_LEKTURA,
  'pol-lesson-17-2': INNY_SWIAT_LEKTURA,
  'inny-swiat': INNY_SWIAT_LEKTURA
};

/**
 * Wyszukuje lekturę z kanonu po ID lekcji lub tytule/aliasie
 */
export function findCanonicalLektura(identifier: string): CanonicalLektura | null {
  if (!identifier) return null;
  const clean = identifier.toLowerCase().trim();
  
  if (CANONICAL_LEKTURY_CATALOG[clean]) {
    return CANONICAL_LEKTURY_CATALOG[clean];
  }

  for (const lek of Object.values(CANONICAL_LEKTURY_CATALOG)) {
    if (lek.id.toLowerCase() === clean || lek.bookId.toLowerCase() === clean) {
      return lek;
    }
    if (lek.aliases.some(a => a.toLowerCase() === clean)) {
      return lek;
    }
    if (clean.includes(lek.bookId.toLowerCase()) || lek.title.toLowerCase().includes(clean)) {
      return lek;
    }
  }

  return null;
}

export const CANONICAL_LEKTURY_LIST: CanonicalLektura[] = [
  ANTYGONA_LEKTURA,
  DZIADY_CANONICAL,
  KORDIAN_LEKTURA,
  LALKA_CANONICAL,
  WESELE_LEKTURA,
  PRZEDWIOSNIE_LEKTURA,
  INNY_SWIAT_LEKTURA
];

/**
 * Zwraca lektury kanoniczne przypisane do danego tematu / epoki
 */
export function getLekturaByTopic(numericTopicId: number): CanonicalLektura[] {
  return CANONICAL_LEKTURY_LIST.filter(l => l.numericTopicId === numericTopicId);
}
