import { MathTaskItem, PolishArgumentBlock } from '../types';

export interface PolishLessonShowcase {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  bookTitle: string;
  epoch: string;
  estimatedTime: string;
  heroCharacter: string;
  keyTheme: string;
  theoryPill: {
    concept_essence: string;
    key_points: string[];
    golden_rule: string;
    book_summary?: any;
    key_concepts?: any;
    worked_example?: any;
    cke_trap: {
      error: string;
      correction: string;
      correct?: string;
      matura_tip: string;
    };
  };
  tasks: MathTaskItem[];
  unlockedBlockPreview: PolishArgumentBlock;
}

// -------------------------------------------------------------
// 1. LALKA – BOLESŁAW PRUS (POKAZOWY PIONOWY PLASTER)
// -------------------------------------------------------------
export const LALKA_ARGUMENT_BLOCK: PolishArgumentBlock = {
  id: 'arg-block-lalka-idealizm',
  bookId: 'lalka',
  bookTitle: 'Lalka',
  character: 'Stanisław Wokulski',
  theme: 'Idealizm a twarda rzeczywistość',
  claim: 'Konflikt między romantycznymi ideałami a pozytywistycznym pragmatyzmem prowadzi wybitną jednostkę do osamotnienia i emocjonalnej klęski.',
  evidence: 'Stanisław Wokulski gromadzi olbrzymi kapitał w handlu, by zaimponować arystokracji, lecz w relacji z Izabelą Łęcką kieruje się ślepym uwielbieniem kobiety-anioła. Przełomem jest zdemaskowanie flirtu Izabeli ze Starskim w pociągu, co niszczy sens jego egzystencji.',
  contextType: 'FILOZOFICZNY',
  contextDescription: 'Pozytywistyczna koncepcja pracy organicznej i scjentyzmu (fascynacja Geistem i Ochockim) zderzona z romantycznym mitem miłości tragicznej (lektura Mickiewicza)',
  linkToThesis: 'Los Wokulskiego dowodzi, że jednostka zawieszona między dwiema epokami staje się obca dla obydwu światów: dla arystokracji pozostaje parweniuszem, a dla warszawskich kupców – niebezpiecznym marzycielem.',
  ckeSafetyRating: '100%_SAFE'
};

export const LALKA_SHOWCASE: PolishLessonShowcase = {
  id: 'pol-showcase-lalka',
  badge: 'LEKTURA 01',
  title: 'Lalka – Stanisław Wokulski i Anatomia Złudzeń',
  subtitle: 'Pętla 3-krokowa: Tinder Motywów • Polowanie na Kardynała • Klocki TEEL',
  bookTitle: 'Lalka',
  epoch: 'Pozytywizm',
  estimatedTime: '5 min',
  heroCharacter: 'Stanisław Wokulski',
  keyTheme: 'Idealizm a rzeczywistość',
  theoryPill: {
    concept_essence: 'Stanisław Wokulski to bohater rozdarty pomiędzy dwiema formacjami: sercem romantyk (udział w powstaniu styczniowym, idealizacja Izabeli Łęckiej), a umysłem pozytywista (praca organiczna, scjentyzm, pomnażanie kapitału). Prus ukazuje kryzys polskich elit feudalnych, które nie potrafią wykorzystać energii takich ludzi jak Wokulski.',
    key_points: [
      'Trzy pokolenia idealistów: Rzecki (romantyczny bonapartyzm), Wokulski (idealizm przełomu epok), Ochocki (pozytywistyczny kult nauki).',
      'Warszawa w Lalce: ostry kontrast między nędzą Powiśla a blichtrem i zepsuciem Salonu Arystokracji (Łęccy, Starski).',
      'Metafora teatru i marionetek: lalki w oknie sklepowym Rzeckiego symbolizują ludzi jako zabawki w rękach ślepego losu.'
    ],
    golden_rule: 'Na maturze CKE nigdy nie oceniaj Wokulskiego jednostronnie jako „zwykłego kupca” ani jako „typowego romantyka”. Zawsze używaj pojęcia „bohater przełomu epok”.',
    book_summary: {
      title: 'Lalka',
      author: 'Bolesław Prus',
      genre: 'Powieść realistyczna / społeczno-obyczajowa',
      plot_overview: 'Dzieje warszawskiego kupca Stanisława Wokulskiego, który zbija olbrzymią fortunę na dostawach wojskowych, by zdobyć miłość zubożałej arystokratki Izabeli Łęckiej. Pomimo sukcesu finansowego i wsparcia dla najuboższych, Wokulski zostaje odrzucony przez feudalną arystokrację, a zdrada Izabeli w pociągu prowadzi go do próby samobójczej i tajemniczego zniknięcia w ruinach Zasławia.',
      key_events: [
        'Powrót Wokulskiego z Bułgarii ze zdobytym kapitałem i założenie spółki do handlu ze Wschodem.',
        'Wizyta na Powiślu i pomoc ubogim (bracia Wysoccy, furman, Maria magdalenka).',
        'Zakup kamienicy Łęckich, licytacja klaczy i pojedynek z baronem Krzeszowskim.',
        'Pobyt w Paryżu, współpraca z Suzynem i fascynacja metalem lżejszym od powietrza prof. Geista.',
        'Zaręczyny z Izabelą, podsłuchanie flirtu ze Starskim w pociągu i próba samobójcza pod kołami.'
      ],
      key_scenes: [
        {
          scene: 'Spacer po Powiślu',
          significance: 'Obraz nędzy i upadku cywilizacyjnego Warszawy; refleksje Wokulskiego nad koniecznością pracy organicznej i zepsuciem arystokracji.'
        },
        {
          scene: 'Rozmowa w pociągu do Krakowa',
          significance: 'Podsłuchanie flirtu Izabeli ze Starskim po angielsku; moment gwałtownego rozbicia iluzji miłosnej Wokulskiego i punkt zwrotny akcji.'
        }
      ]
    },
    key_concepts: [
      { title: 'Bohater przełomu epok', def: 'Postać zawieszona między romantycznym idealizmem uczuć a pozytywistycznym kultem wiedzy i pracy organicznej.' },
      { title: 'Praca organiczna i u podstaw', def: 'Program unowocześnienia gospodarki i podniesienia poziomu życia nizin społecznych.' },
      { title: 'Kult nauki (scjentyzm)', def: 'Wiara w zbawczą moc postępu technicznego (Geist, Ochocki) i racjonalne poznanie świata.' },
      { title: 'Theatrum mundi', def: 'Motyw świata jako teatru lalek i marionetek poruszanych przez niewidzialną siłę losu (zabawy Rzeckiego).' }
    ],
    worked_example: {
      title: 'Stanisław Wokulski na Powiślu – Diagnoza narodu polskiego',
      quote: 'Oto miniatura kraju – myślał – w którym wszystko dąży do zgnilizny, uśpienia i śmierci. Nic nie może się podźwignąć, bo wszystko ugina się pod ciężarem nędzy, a na górze pyszni się zepsuta elita, która marnuje miliony za granicą...',
      context: 'Spacer Wokulskiego po nadrzecznym Powiślu po kolejnym chłodnym potraktowaniu przez salon arystokratyczny.',
      analysis: 'Prus ukazuje dramatyczny kontrast między luksusem salonów a nędzą warszawskiego Powiśla. Wokulski widzi, że bez reform i pracy organicznej naród jest skazany na wegetację. Fragment ujawnia jego głęboki humanizm i patriotyzm.',
      matura_tip: 'Idealny fragment do tematów o obrazie miasta, kontrastach społecznych, pracy u podstaw i krytyce arystokracji.'
    },
    cke_trap: {
      error: 'Twierdzenie, że Wokulski bezspornie popełnił samobójstwo w ruinach zamku w Zasławiu.',
      correct: 'Zakończenie powieści jest otwarte! Wokulski wysadza zamek, lecz jego losy pozostają tajemnicą (list z Odessy, wersje o wyjeździe do Geista w Paryżu).',
      correction: 'Zakończenie powieści jest otwarte! Wokulski wysadza zamek, lecz jego losy pozostają tajemnicą (list z Odessy, wersje o wyjeździe do Geista w Paryżu).',
      matura_tip: 'Przedstawienie samobójstwa Wokulskiego jako bezspornego faktu fabularnego bywa traktowane przez egzaminatorów CKE jako rażąca nadinterpretacja lub błąd rzeczowy!'
    }
  },
  unlockedBlockPreview: LALKA_ARGUMENT_BLOCK,
  tasks: [
    {
      id: 'pol-lalka-t1-swipe',
      type: 'SWIPE_MATCH',
      title: 'KROK 1 • Tinder Lekturowy: Fakty i Motywy Lalki',
      topic: 'Lalka • Bolesław Prus',
      instruction: 'Przesuń kartę w PRAWO jeśli to czysty fakt z lektury CKE, lub w LEWO jeśli to fałsz bądź pułapka maturalna!',
      math_statement: 'Rozgrzewka błyskawiczna: 5 kluczowych twierdzeń pod presją czasu.',
      hints: {
        level_1: 'Pamiętaj o relacjach Łęckich i pamiętniku Rzeckiego.',
        level_2: 'Uważaj na zakończenie powieści – Prus nie dał jednoznacznej odpowiedzi!'
      },
      official_solution_steps: [],
      points: 1,
      xp: 25,
      swipeData: {
        themeTitle: 'Lalka • Wokulski & Izabela',
        leftLabel: 'FAŁSZ / PUŁAPKA',
        rightLabel: 'PRAWDA / CZYSTY FAKT',
        cards: [
          {
            id: 'sw-lalka-1',
            statement: 'Wokulski dorobił się milionowej fortuny dzięki dostawom dla wojska podczas wojny rosyjsko-tureckiej.',
            isCorrect: true,
            explanation: 'PRAWDA: Wokulski wyjechał na Bałkany i w Bułgarii pomnożył majątek zdobyty po małżeństwie z Małgorzatą Minclową.'
          },
          {
            id: 'sw-lalka-2',
            statement: 'Izabela Łęcka odwzajemniła miłość Stanisława i zerwała wszelki kontakt z Kazimierzem Starskim.',
            isCorrect: false,
            isCardinalTrap: true,
            explanation: 'FAŁSZ: Izabela traktowała Wokulskiego z wyższością jako kupca, a ze Starskim flirtowała nawet w pociągu w obecności Stanisława!'
          },
          {
            id: 'sw-lalka-3',
            statement: 'Ignacy Rzecki w swoim Pamiętniku starego subiekta z tęsknotą wspomina czasy Napoleona i Wiosnę Ludów.',
            isCorrect: true,
            explanation: 'PRAWDA: Rzecki reprezentuje pokolenie romantycznych idealistów politycznych, wierzących w wyzwolenie narodów przez dynastię Bonaparte.'
          },
          {
            id: 'sw-lalka-4',
            statement: 'Wokulski zginął pod kołami pociągu w Skierniewicach po zdemaskowaniu zdrady Izabeli.',
            isCorrect: false,
            isCardinalTrap: true,
            explanation: 'FAŁSZ (PUŁAPKA!): W Skierniewicach Wokulski rzucił się pod pociąg, ale został uratowany przez dróżnika Wysockiego, któremu wcześniej pomógł!'
          },
          {
            id: 'sw-lalka-5',
            statement: 'Julian Ochocki poświęcił karierę salonową, by badać możliwość stworzenia machiny latającej.',
            isCorrect: true,
            explanation: 'PRAWDA: Ochocki jest idealistą naukowym nowej generacji, który gardzi salonowym próżniactwem i marzy o metalu lżejszym od powietrza.'
          }
        ]
      }
    },
    {
      id: 'pol-lalka-t2-cardinal',
      type: 'CARDINAL_DETECTOR',
      title: 'KROK 2 • Rewizor CKE: Polowanie na Błąd Kardynalny',
      topic: 'Lalka • Analiza wypracowania',
      instruction: 'Jeden z poniższych fragmentów wypracowania zawiera śmiertelny BŁĄD KARDYNALNY, który unieważnia pracę na maturze. Wskaż go!',
      math_statement: 'Egzaminator CKE ocenia fragmenty rozprawki na temat: „Samotność w tłumie jako doświadczenie bohatera literackiego”.',
      hints: {
        level_1: 'Sprawdź dokładnie motywacje Wokulskiego wobec Zasławka i kamienicy.',
        level_2: 'Pamiętaj o relacji Wokulskiego z Rzeckim i jego ślubie z Minclową.'
      },
      official_solution_steps: [],
      points: 2,
      xp: 40,
      cardinalData: {
        contextTopic: 'Samotność w tłumie i motywacje bohaterów w „Lalce”',
        workTitle: 'Lalka • Bolesław Prus',
        ckeWarningTip: 'Błąd kardynalny polega na całkowitym zniekształceniu sensu lektury obowiązkowej lub kardynalnym przekręceniu losów kluczowej postaci.',
        snippets: [
          {
            id: 'cardinal-lalka-ok1',
            text: 'Wokulski czuje się wyobcowany zarówno wśród arystokracji gardzącej jego kupieckim pochodzeniem, jak i wśród mieszczan, którzy nie rozumieją jego filantropijnych i naukowych ambicji.',
            isCardinalError: false,
            explanation: 'To zdanie jest w 100% poprawne merytorycznie i funkcjonalne.'
          },
          {
            id: 'cardinal-lalka-bad',
            text: 'Wokulski ożenił się z Izabelą Łęcką po wykupieniu weksli jej ojca, jednak z powodu jej ciągłych zdrad porzucił ją i został mnichem w Zasławiu.',
            isCardinalError: true,
            explanation: 'ŚMIERTELNY BŁĄD KARDYNALNY! Do ślubu Wokulskiego z Łęcką NIGDY nie doszło (zaręczyny zostały zerwane po incydencie z blaszką w pociągu), a Wokulski nigdy nie został mnichem!',
            safeRevision: 'Wokulski wykupił weksle Tomasza Łęckiego i doprowadził do zaręczyn z Izabelą, lecz po odkryciu jej romansu ze Starskim zerwał zaręczyny i zniknął z Warszawy.'
          },
          {
            id: 'cardinal-lalka-ok2',
            text: 'Jedyną osobą szczerze oddaną Wokulskiemu był Ignacy Rzecki, jednak i on nie potrafił przeniknąć mrocznych rozterek przyjaciela, tłumacząc je sobie politycznymi planami bonapartystów.',
            isCardinalError: false,
            explanation: 'Prawidłowa interpretacja psychologiczna i zgodna z Pamiętnikiem starego subiekta.'
          }
        ]
      }
    },
    {
      id: 'pol-lalka-t3-builder',
      type: 'ARGUMENT_BUILDER',
      title: 'KROK 3 • Klocki TEEL: Zbuduj Argument do Skarbca',
      topic: 'Lalka • Warsztat Wypracowania',
      instruction: 'Ułóż logiczny, wysoko punktowany argument w strukturze TEEL (Teza -> Dowód -> Kontekst -> Puenta). Po poprawnym złożeniu klocek trafi do Twojego Skarbca!',
      math_statement: 'Temat wypracowania: „Czy miłość dodaje człowiekowi skrzydeł, czy go niszczy? Rozważ problem na podstawie lektury obowiązkowej”.',
      hints: {
        level_1: 'Zacznij od uniwersalnej tezy cząstkowej [T].',
        level_2: 'Wybierz dowód z Wokulskim i zderz go z kontekstem pozytywizmu [C].'
      },
      official_solution_steps: [],
      points: 2,
      xp: 50,
      argumentBuilderData: {
        theme: 'Miłość niszcząca i idealizm',
        workTitle: 'Lalka',
        character: 'Stanisław Wokulski',
        thesisPrompt: 'Uczucie do Izabeli Łęckiej jako siła destrukcyjna w życiu Wokulskiego.',
        claimOptions: [
          {
            id: 'c-correct',
            text: 'Ślepa miłość romantyczna podporządkowana fałszywemu ideałowi prowadzi do degradacji psychicznej wybitnej jednostki i marnotrawstwa jej potencjału.',
            isCorrect: true
          },
          {
            id: 'c-trap',
            text: 'Miłość jest zawsze pozytywną siłą budującą harmonię w małżeństwie bez względu na pochodzenie klasowe.',
            isCorrect: false,
            trapNote: 'Ta teza stoi w sprzeczności z wymową powieści Prusa!'
          }
        ],
        evidenceOptions: [
          {
            id: 'e-correct',
            text: 'Wokulski podporządkowuje cały majątek i czas zachciankom salonu, a zdemaskowanie zakłamania Izabeli (rozmowa ze Starskim o medalionie) wpędza go w głęboką depresję i próbę samobójczą w Skierniewicach.',
            isCorrect: true
          },
          {
            id: 'e-trap',
            text: 'Wokulski razem z Izabelą otworzył szpital dla ubogich na Powiślu i wspólnie cieszyli się uznaniem warszawiaków.',
            isCorrect: false,
            trapNote: 'Błąd rzeczowy! Izabela brzydziła się biedotą Powiśla.'
          }
        ],
        contextOptions: [
          {
            id: 'ctx-correct',
            text: 'Kontekst epoki: zderzenie romantycznego kultu kochanki-bóstwa (Cierpienia młodego Wertera, Dziady cz. IV) z pozytywistyczną koniecznością chłodnej kalkulacji społecznej.',
            isCorrect: true
          },
          {
            id: 'ctx-trap',
            text: 'Kontekst średniowieczny: motyw Danse Macabre i ascezy św. Aleksego.',
            isCorrect: false,
            trapNote: 'Anachronizm! Średniowiecze nie tłumaczy psychologii Wokulskiego.'
          }
        ],
        linkOptions: [
          {
            id: 'l-correct',
            text: 'Prus udowadnia, że miłość nie oparta na prawdzie i wzajemności staje się niszczącą obsesją, która uniemożliwia realizację pożytecznych celów społecznych.',
            isCorrect: true
          },
          {
            id: 'l-trap',
            text: 'Zatem Wokulski powinien był od razu zrezygnować z handlu i zająć się wyłącznie pisaniem poezji.',
            isCorrect: false,
            trapNote: 'Wniosek nielogiczny i nieadekwatny do natury bohatera.'
          }
        ],
        resultingBlock: LALKA_ARGUMENT_BLOCK
      }
    }
  ]
};

// -------------------------------------------------------------
// 2. DZIADY CZĘŚĆ III – ADAM MICKIEWICZ (POKAZOWY PLASTER)
// -------------------------------------------------------------
export const DZIADY_ARGUMENT_BLOCK: PolishArgumentBlock = {
  id: 'arg-block-dziady-prometeizm',
  bookId: 'dziady-cz-3',
  bookTitle: 'Dziady cz. III',
  character: 'Konrad',
  theme: 'Bunt prometejski i odpowiedzialność za ojczyznę',
  claim: 'Bunt w imię cierpiącej zbiorowości może wynosić człowieka na wyżyny heroizmu, lecz bez pokory przeradza się w niszczącą pychę oddalającą od Boga.',
  evidence: 'W Wielkiej Improwizacji Konrad w celi bazyliańskiej utożsamia się z całym cierpiącym narodem („Ja i ojczyzna to jedno. Nazywam się Milijon – bo za milijony kocham i cierpię katusze”). Żąda od Boga władzy absolutnej nad duszami ludzkimi.',
  contextType: 'LITERACKI',
  contextDescription: 'Mit prometejski (poświęcenie dla dobra ludzkości) oraz koncepcja poety-wieszcza (artysty równego stwórcy) charakterystyczna dla europejskiego romantyzmu (byronizm)',
  linkToThesis: 'Upadek Konrada i ocalenie jego duszy przez pokornego księdza Piotra pokazuje mickiewiczowską hierarchię wartości: zbawienie ojczyzny nie nastąpi drogą samotnego buntu pychy, lecz przez ofiarę i chrześcijańską pokorę (mesjanizm).',
  ckeSafetyRating: '100%_SAFE'
};

export const DZIADY_SHOWCASE: PolishLessonShowcase = {
  id: 'pol-showcase-dziady',
  badge: 'LEKTURA 02',
  title: 'Dziady cz. III – Konrad, Prometeizm i Bunt',
  subtitle: 'Pętla 3-krokowa: Tinder Motywów • Polowanie na Kardynała • Klocki TEEL',
  bookTitle: 'Dziady cz. III',
  epoch: 'Romantyzm',
  estimatedTime: '5 min',
  heroCharacter: 'Konrad',
  keyTheme: 'Bunt prometejski i mesjanizm',
  theoryPill: {
    concept_essence: 'Dziady cz. III to polski dramat narodowy o martyrologii młodzieży wileńskiej, carskim terrorze oraz filozoficznym sensie polskiego cierpienia. Konrad reprezentuje bunt prometejski i pychę artysty, podczas gdy Ksiądz Piotr głosi ideę mesjanizmu narodowego: Polska jako Chrystus Narodów, którego ofiara przyniesie wolność Europie.',
    key_points: [
      'Wielka Improwizacja: pojedynek Konrada z milczącym Bogiem; Konrad kocha swój naród, lecz gardzi ludźmi jako jednostkami.',
      'Widzenie Księdza Piotra: mistyczna zapowiedź wskrzeszenia Polski przez tajemniczego męża o imieniu „czterdzieści i cztery”.',
      'Salon warszawski: podział społeczeństwa na patriotów stojących przy drzwiach oraz zaprzańców/urzędników carskich pijących herbatę przy stoliku.'
    ],
    golden_rule: 'Pamiętaj o słowach Wysockiego w Salonie Warszawskim: „Nasz naród jak lawa, z wierzchu zimna i twarda, sucha i plugawa, lecz wewnętrznego ognia sto lat nie wyziębi”. To klucz do całego dramatu!',
    book_summary: {
      title: 'Dziady część III',
      author: 'Adam Mickiewicz',
      genre: 'Dramat romantyczny / narodowy',
      plot_overview: 'Dramat ukazuje martyrologię polskiej młodzieży aresztowanej w Wilnie przez carskiego senatora Nowosilcowa. W celi klasztoru bazylianów Gustaw przeistacza się w Konrada („Umarł Gustaw, narodził się Konrad”) i w Wielkiej Improwizacji wyzywa Boga na pojedynek o władzę nad duszami narodu. Pychę Konrada równoważy pokora Księdza Piotra, który w Widzeniu ogląda przyszłe zmartwychwstanie Polski jako Chrystusa Narodów. W Salonie Warszawskim Mickiewicz diagnozuje podział Polaków na obojętne elity i płomiennych patriotów.',
      key_events: [
        'Prolog: duchowa przemiana Gustawa w Konrada w wileńskim więzieniu.',
        'Wigilia w celi bazylianów i opowieści więźniów (Sobolewski o wywózce kibitkami na Sybir, los Janczewskiego i Wasilewskiego).',
        'Wielka Improwizacja: prometejski bunt Konrada przeciw milczeniu Boga.',
        'Widzenie Ewy oraz Widzenie Księdza Piotra (mesjanistyczna wizja Polski i męża czterdzieści i cztery).',
        'Salon Warszawski oraz Bal u Senatora Nowosilcowa (cierpienie pani Rollisonowej i śmierć Doktora od pioruna).'
      ],
      key_scenes: [
        {
          scene: 'Wielka Improwizacja',
          significance: 'Najsłynniejszy monolog polskiego romantyzmu; pojedynek człowieka z Bogiem o miłość do narodu i władzę („Nazywam się Milijon – bo za milijony kocham i cierpię katusze”).'
        },
        {
          scene: 'Widzenie Księdza Piotra',
          significance: 'Wykładnia idei mesjanizmu narodowego: Polska jako Chrystus Narodów, ukrzyżowana przez trzech zaborców (Austrię, Prusy i Rosję), zmartwychwstanie i przyniesie wolność ludzkości.'
        }
      ]
    },
    key_concepts: [
      { title: 'Prometeizm', def: 'Bunt wybitnej jednostki przeciw Bogu lub siłom wyższym w imię bezinteresownej miłości do cierpiącej ludzkości (Konrad).' },
      { title: 'Mesjanizm narodowy', def: 'Przekonanie o szczególnej, zbawczej misji Polski cierpiącej niewinnie pod zaborami (Polska Chrystusem Narodów).' },
      { title: 'Martyrologia młodzieży', def: 'Obraz cierpienia, tortur i carskich wywózek młodego pokolenia Polaków (filomatów i filaretów) na Syberię.' },
      { title: 'Metafora lawy', def: 'Diagnoza narodu z Salonu Warszawskiego: wierzch zimny i plugawy (elity), wnętrze pełne ognia (młodzi patrioci).' }
    ],
    worked_example: {
      title: 'Wielka Improwizacja – Utożsamienie Konrada z narodem',
      quote: 'Ja i ojczyzna to jedno. Nazywam się Milijon – bo za milijony kocham i cierpię katusze. Patrzę na ojczyznę biedną, jak syn na ojca wplecionego w koło; czuję całego narodu cierpienia, jak matka czuje w łonie boleść swego płodu.',
      context: 'Kulminacyjny punkt Wielkiej Improwizacji w celi bazylianów, gdy samotny Konrad żąda od Stwórcy „rządu dusz”.',
      analysis: 'Mickiewicz ukazuje szczyt romantycznego prometeizmu i tytanizmu. Konrad nie prosi o dobra doczesne – żąda władzy, by uszczęśliwić zniewolony naród. Jego pycha polega na przekonaniu, że kocha Polskę mocniej niż sam Bóg. Utożsamienie jednostki z milionami to fundament polskiej tożsamości romantycznej.',
      matura_tip: 'Niezbędny cytat do tematów dotyczących buntu, odpowiedzialności za naród, patriotyzmu, samotności poety i relacji człowiek–Bóg.'
    },
    cke_trap: {
      error: 'Przypisanie Konradowi wypowiedzenia słowa „carem” w stronę Boga.',
      correct: 'Konrad mdleje przed wypowiedzeniem najgorszego bluźnierstwa! To Głos Szatana kończy zdanie za niego.',
      correction: 'Konrad mdleje przed wypowiedzeniem najgorszego bluźnierstwa! To Głos Szatana kończy zdanie za niego.',
      matura_tip: 'Napisanie, że Konrad przeklął Boga i został potępiony, to klasyczny błąd kardynalny. Dusza Konrada zostaje ocalona dzięki egzorcyzmom Księdza Piotra!'
    }
  },
  unlockedBlockPreview: DZIADY_ARGUMENT_BLOCK,
  tasks: [
    {
      id: 'pol-dziady-t1-swipe',
      type: 'SWIPE_MATCH',
      title: 'KROK 1 • Tinder Lekturowy: Fakty i Symbole Dziadów cz. III',
      topic: 'Dziady cz. III • Adam Mickiewicz',
      instruction: 'Przesuń kartę w PRAWO jeśli to fakt z dramatu, lub w LEWO jeśli to fałsz i pułapka maturalna!',
      math_statement: 'Rozgrzewka błyskawiczna: postacie, motywy i kluczowe sceny dramatu.',
      hints: {
        level_1: 'Pamiętaj o scenie więziennej w klasztorze bazylianów.',
        level_2: 'Kto reprezentował carski aparat terroru w Wilnie?'
      },
      official_solution_steps: [],
      points: 1,
      xp: 25,
      swipeData: {
        themeTitle: 'Dziady cz. III • Mickiewicz',
        leftLabel: 'FAŁSZ / PUŁAPKA',
        rightLabel: 'PRAWDA / CZYSTY FAKT',
        cards: [
          {
            id: 'sw-dziady-1',
            statement: 'Przemiana Gustawa w Konrada symbolizuje porzucenie nieszczęśliwej miłości na rzecz walki o wolność ojczyzny.',
            isCorrect: true,
            explanation: 'PRAWDA: Napis w celi więziennej: „Umarł Gustaw, narodził się Konrad” (1 listopada 1823).'
          },
          {
            id: 'sw-dziady-2',
            statement: 'Pani Rollisonowa przyszła błagać Nowosilcowa o ułaskawienie męża, który był generałem wojsk polskich.',
            isCorrect: false,
            isCardinalTrap: true,
            explanation: 'FAŁSZ: Błagała o ratunek dla swojego nastoletniego, niewidomego jedynego SYNA, Jana Rollisona, katowanego w celi!'
          },
          {
            id: 'sw-dziady-3',
            statement: 'Senator Nowosilcow w swoim śnie drży przed utratą łaski u cara, ukazując naturę carskiego despotyzmu.',
            isCorrect: true,
            explanation: 'PRAWDA: Scena „Sen Senatora” ukazuje neurotyczny strach karierowicza przed popadnięciem w carską niełaskę.'
          },
          {
            id: 'sw-dziady-4',
            statement: 'Ksiądz Piotr w widzeniu dowiaduje się, że Polska musi zginąć na zawsze bez nadziei na zmartwychwstanie.',
            isCorrect: false,
            isCardinalTrap: true,
            explanation: 'FAŁSZ: Widzenie Księdza Piotra to manifest mesjanizmu – Polska jako Chrystus Narodów zmartwychwstanie i wyzwoli inne ludy!'
          },
          {
            id: 'sw-dziady-5',
            statement: 'Doktor w dramacie ginie od uderzenia pioruna, co zostało zapowiedziane jako kara boża za wysługiwanie się caratowi.',
            isCorrect: true,
            explanation: 'PRAWDA: Doktor (postać wzorowana na Auguście Becu) ginie rażony piorunem we własnym mieszkaniu.'
          }
        ]
      }
    },
    {
      id: 'pol-dziady-t2-cardinal',
      type: 'CARDINAL_DETECTOR',
      title: 'KROK 2 • Rewizor CKE: Polowanie na Błąd Kardynalny',
      topic: 'Dziady cz. III • Wielka Improwizacja',
      instruction: 'Jeden z poniższych fragmentów wypracowania zawiera śmiertelny BŁĄD KARDYNALNY. Kliknij w fałszywy fragment, by ocalić maturę!',
      math_statement: 'Temat wypracowania: „Buntownik czy szaleniec? Różne oblicza buntu przeciwko siłom wyższym w literaturze”.',
      hints: {
        level_1: 'Co DOKŁADNIE dzieje się w finale Wielkiej Improwizacji?',
        level_2: 'Kto wypowiada najcięższe oskarżenie wobec Boga?'
      },
      official_solution_steps: [],
      points: 2,
      xp: 40,
      cardinalData: {
        contextTopic: 'Postawa Konrada w Wielkiej Improwizacji i jego ostateczny los',
        workTitle: 'Dziady cz. III • Adam Mickiewicz',
        ckeWarningTip: 'Egzaminator CKE wyzeruje wypracowanie za kardynalne zniekształcenie losu Konrada w III części Dziadów.',
        snippets: [
          {
            id: 'cardinal-dziady-ok1',
            text: 'Wielka Improwizacja to szczytowy moment prometejskiego uniesienia Konrada, który gotów jest poświęcić własne zbawienie w imię ulżenia cierpieniom rodaków ciemiężonych przez cara.',
            isCardinalError: false,
            explanation: 'Poprawna i głęboka interpretacja motywacji bohatera romantycznego.'
          },
          {
            id: 'cardinal-dziady-bad',
            text: 'Konrad doprowadzony do ostateczności nazywa Boga carem i tyranem, po czym zostaje uśmiercony przez piorun i jego potępiona dusza na zawsze trafia do piekła.',
            isCardinalError: true,
            explanation: 'BŁĄD KARDYNALNY! Konrad MDLEJE przed dokończeniem bluźnierstwa, słowo „carem” wykrzykuje Szatan, a dusza Konrada zostaje ocalona przez modlitwy Ewy i egzorcyzm księdza Piotra!',
            safeRevision: 'Konrad na krawędzi bluźnierstwa mdleje z wyczerpania, a słowo „carem” dopowiada szatan. Bohater nie ginie, lecz otrzymuje szansę pokuty dzięki wstawiennictwu księdza Piotra.'
          },
          {
            id: 'cardinal-dziady-ok2',
            text: 'Mickiewicz ukazuje wyższość postawy Księdza Piotra nad Konradem: podczas gdy pycha Konrada przynosi mu jedynie niemoc, pokora i modlitwa zakonnika otwierają przed nim tajemnicę przyszłych losów Polski.',
            isCardinalError: false,
            explanation: 'Trafna antyteza wieszcz-buntownik vs pokorny mistyk w mesjanizmie polskim.'
          }
        ]
      }
    },
    {
      id: 'pol-dziady-t3-builder',
      type: 'ARGUMENT_BUILDER',
      title: 'KROK 3 • Klocki TEEL: Zbuduj Argument do Skarbca',
      topic: 'Dziady cz. III • Warsztat Wypracowania',
      instruction: 'Złóż klocki TEEL w kompletny argument gotowy do użycia na maturze z języka polskiego!',
      math_statement: 'Temat wypracowania: „Cena poświęcenia dla wielkiej idei. Rozważ problem, odwołując się do lektury obowiązkowej”.',
      hints: {
        level_1: 'Teza musi wiązać poświęcenie z ryzykiem pychy.',
        level_2: 'Wybierz kontekst prometeizmu i byronizmu.'
      },
      official_solution_steps: [],
      points: 2,
      xp: 50,
      argumentBuilderData: {
        theme: 'Poświęcenie i prometeizm',
        workTitle: 'Dziady cz. III',
        character: 'Konrad',
        thesisPrompt: 'Poświęcenie Konrada dla narodu i niebezpieczeństwo pychy prometejskiej.',
        claimOptions: [
          {
            id: 'c-dziady-correct',
            text: 'Poświęcenie jednostki dla dobra ogółu jest najwyższą formą heroizmu, lecz gdy przeradza się w pychę i chęć zastąpienia boskiego porządku, prowadzi do duchowego upadku.',
            isCorrect: true
          },
          {
            id: 'c-dziady-trap',
            text: 'Walka narodowowyzwoleńcza nie ma sensu i Mickiewicz zaleca pogodzenie się z carskim uciskiem.',
            isCorrect: false,
            trapNote: 'Sprzeczne z całą ideologią Mickiewicza i duchem martyrologii wileńskiej!'
          }
        ],
        evidenceOptions: [
          {
            id: 'e-dziady-correct',
            text: 'Konrad w Wielkiej Improwizacji wyznaje bezgraniczną miłość do ojczyzny („Nazywam się Milijon – bo za milijony kocham i cierpię katusze”), lecz w żądaniu „rządu dusz” zatraca pokorę i niemal potępia swą duszę.',
            isCorrect: true
          },
          {
            id: 'e-dziady-trap',
            text: 'Konrad podpisał lojalkę u Nowosilcowa i wyjechał do Petersburga robić karierę na dworze carskim.',
            isCorrect: false,
            trapNote: 'Błąd kardynalny! Konrad nigdy nie zdradził przyjaciół.'
          }
        ],
        contextOptions: [
          {
            id: 'ctx-dziady-correct',
            text: 'Kontekst mityczny: topos prometejski (Prometeusz cierpiący za miłość do ludzi) oraz tradycja bohatera byronicznego, samotnego buntownika wznoszącego się ponad tłum.',
            isCorrect: true
          },
          {
            id: 'ctx-dziady-trap',
            text: 'Kontekst renesansowy: horacjańska zasada „złotego środka” (aurea mediocritas).',
            isCorrect: false,
            trapNote: 'Renesansowy spokój ducha to przeciwieństwo romantycznego szału Konrada!'
          }
        ],
        linkOptions: [
          {
            id: 'l-dziady-correct',
            text: 'Mickiewicz dowodzi, że samo poświęcenie jest święte, lecz dopiero połączone z chrześcijańską pokorą (wzór Księdza Piotra) może przynieść narodowi zmartwychwstanie.',
            isCorrect: true
          },
          {
            id: 'l-dziady-trap',
            text: 'Wobec tego wniosek jest taki, że poeci nie powinni angażować się w sprawy polityczne.',
            isCorrect: false,
            trapNote: 'Nielogiczny wniosek, zaprzeczający roli wieszcza w polskim romantyzmie.'
          }
        ],
        resultingBlock: DZIADY_ARGUMENT_BLOCK
      }
    }
  ]
};

export const POLISH_SHOWCASE_LESSONS: PolishLessonShowcase[] = [
  LALKA_SHOWCASE,
  DZIADY_SHOWCASE
];
