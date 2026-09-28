export interface LekturaCard {
  id: string;
  title: string;
  author: string;
  epoch: string;
  genre: string;
  isGwiazdka: boolean; // lektura obowiązkowa z gwiazdką CKE (błąd kardynalny)
  summary: string;
  keyMotifs: string[];
  mainCharacters: { name: string; description: string }[];
  keyScenes: { title: string; meaning: string }[];
  cardinalWarning: string;
}

export const MATURA_LEKTURY: LekturaCard[] = [
  {
    id: 'lalka',
    title: 'Lalka',
    author: 'Bolesław Prus',
    epoch: 'Pozytywizm',
    genre: 'Powieść realistyczna / społeczno-obyczajowa',
    isGwiazdka: true,
    summary: 'Losy Stanisława Wokulskiego – kupca z romantyczną duszą i pozytywistycznym umysłem, którego zgubne uczucie do arystokratki Izabeli Łęckiej doprowadza do rozpadu iluzji o polskim społeczeństwie.',
    keyMotifs: ['Miłość destrukcyjna', 'Idealizm kontra realizm', 'Arystokracja vs mieszczaństwo', 'Praca organiczna', 'Miasto (Warszawa, Paryż)'],
    mainCharacters: [
      { name: 'Stanisław Wokulski', description: 'Tragiczny bohater na pograniczu dwóch epok: powstaniec styczniowy (romantyk) oraz genialny przedsiębiorca i filantrop (pozytywista).' },
      { name: 'Ignacy Rzecki', description: 'Stary subiekt, wierny przyjaciel Wokulskiego, ostatni polski romantyk i bonapartysta, autor pamiętnika.' },
      { name: 'Izabela Łęcka', description: 'Arystokratka żyjąca w świecie pozorów, dla której ludzie spoza jej sfery to istoty niższe; obiekt obsesyjnej miłości Wokulskiego.' },
      { name: 'Julian Ochocki', description: 'Młody naukowiec idealista, marzący o zbudowaniu maszyny latającej z metalu lżejszego od powietrza.' }
    ],
    keyScenes: [
      { title: 'Rozmowa w pociągu po angielsku', meaning: 'Wokulski odkrywa flirt Izabeli ze Starskim i zniknięcie podarowanego jej medalionu, co burzy jego idealistyczny obraz ukochanej i prowadzi do próby samobójczej pod kołami pociągu w Skierniewicach.' },
      { title: 'Medytacje Rzeckiego przy lalkach', meaning: 'Metafora teatru świata (theatrum mundi) – ludzie są bezwolnymi marionetkami nakręcanymi przez ślepy los.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Zakończenie losów Wokulskiego jest OTWARTE! Nie pisz ze stuprocentową pewnością, że Wokulski zginął pod ruinami w Zasławku ani że uciekł do Paryża. Prus celowo pozostawił to w sferze domysłów (list Ochockiego vs zeznania Szlangbauma).'
  },
  {
    id: 'dziady-3',
    title: 'Dziady część III',
    author: 'Adam Mickiewicz',
    epoch: 'Romantyzm',
    genre: 'Dramat romantyczny',
    isGwiazdka: true,
    summary: 'Mistyczny dramat martyrologiczny ukazujący cierpienie polskiej młodzieży pod zaborem carskim, koncepcję mesjanizmu narodowego (Polska Chrystusem narodów) oraz bunt poety przeciwko Bogu.',
    keyMotifs: ['Mesjanizm narodowy', 'Prometeizm i pycha', 'Cierpienie i martyrologia', 'Walka dobra ze złem (psychomachia)', 'Poezja i kreacja'],
    mainCharacters: [
      { name: 'Konrad (wcześniej Gustaw)', description: 'Poeta-wieszcz, prometeusz gotowy cierpieć za miliony; wyzywa Boga na pojedynek serc w Wielkiej Improwizacji.' },
      { name: 'Ksiądz Piotr', description: 'Pokorny bernardyn, przeciwieństwo pysznego Konrada; dostępuje łaski widzenia przyszłości Polski (Mesjasz 44).' },
      { name: 'Senator Nowosilcow', description: 'Okrutny carski namiestnik, uosobienie despotyzmu i cynizmu (scena snu senatora).' }
    ],
    keyScenes: [
      { title: 'Wielka Improwizacja', meaning: 'Konrad w ekstazie twórczej żąda od Boga rządu dusz. Pycha doprowadza go na skraj bluźnierstwa (nazwanie Boga carem przez szatana), przed czym ratuje go mdłość.' },
      { title: 'Salon warszawski', meaning: 'Słynny podział polskiego społeczeństwa: „Nasz naród jak lawa, z wierzchu zimna i twarda, sucha i plugawa, lecz wewnętrznego ognia sto lat nie wyziębi”.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Konrad NIE został potępiony ani opętany na zawsze! Przed ostatecznym bluźnierstwem pada zemdlony, a jego duszę ratuje wstawiennictwo Ewy i modlitwy Księdza Piotra. Nie myl Konrada z cz. III z Gustawem z cz. IV jako dwóch odrębnych ludzi – to ta sama postać po wewnętrznej metamorfozie (Gustavus obiit, natus est Conradus).'
  },
  {
    id: 'wesele',
    title: 'Wesele',
    author: 'Stanisław Wyspiański',
    epoch: 'Młoda Polska',
    genre: 'Dramat narodowy / symboliczny',
    isGwiazdka: true,
    summary: 'Wesele inteligenta Lucjana Rydla z chłopką Jadwigą Mikołajczykówną w podkrakowskich Bronowicach staje się surową diagnozą niezdolności Polaków do zjednoczenia i wywalczenia niepodległości.',
    keyMotifs: ['Niemoc narodowa', 'Mitopatia i chocholi taniec', 'Konflikt chłopów i panów', 'Sztuka vs czyn', 'Symbole narodowe'],
    mainCharacters: [
      { name: 'Gospodarz (Włodzimierz Tetmajer)', description: 'Szanowany łącznik między szlachtą a chłopami; otrzymuje od Wernyhory złoty róg, ale lekkomyślnie powierza go Jaśkowi.' },
      { name: 'Poeta (Kazimierz Przerwa-Tetmajer)', description: 'Dekadent szukający wzniosłości, któremu ukazuje się Rycerz (Zawisza Czarny) symbolizujący dawną moc i honor.' },
      { name: 'Jasiek', description: 'Młody drużba, który gubi złoty róg schylając się po czapkę z pawich piór.' },
      { name: 'Chochoł', description: 'Słomiane okrycie krzaku róży; grając na patykach wprowadza zebranych w trans niemocy (chocholi taniec).' }
    ],
    keyScenes: [
      { title: 'Pojawienie się Wernyhory', meaning: 'Legendarny ukraiński wieszcz przekazuje Gospodarzowi rozkaz poderwania narodu do powstania oraz Złoty Róg budzący ducha walki.' },
      { title: 'Finałowy Chocholi Taniec', meaning: 'Jasiek wraca bez rogu z samym sznurem; zgromadzeni z kosami i pistoletami stoją zahipnotyzowani, tańcząc w sennym, błędnym kole niemocy.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Powstanie w „Weselu” NIE WYBUCHA! Polacy zaprzepaszczają dziejową szansę z powodu prywatnego materializmu Jaśka (schylił się po czapkę z piór i zgubił złoty róg) oraz bierności inteligencji. Taniec chocholi to symbol uśpienia narodu, a nie triumfu!'
  },
  {
    id: 'kordian',
    title: 'Kordian',
    author: 'Juliusz Słowacki',
    epoch: 'Romantyzm',
    genre: 'Dramat romantyczny',
    isGwiazdka: true,
    summary: 'Ewolucja młodego nieszczęśliwie zakochanego szlachcica w dojrzałego bojownika o wolność ojczyzny. Słowacki polemizuje z mesjanizmem Mickiewicza, przedstawiając koncepcję winkelriedyzmu („Polska Winkelriedem narodów”).',
    keyMotifs: ['Winkelriedyzm vs Mesjanizm', 'Rozczarowanie światem (jaskółczy niepokój)', 'Władza i tyrania', 'Walka z własnymi słabościami'],
    mainCharacters: [
      { name: 'Kordian', description: 'Wrażliwy młodzieniec, który po próbie samobójczej podróżuje po Europie (Anglia, Włochy, Watykan, Mont Blanc) i postanawia zabić cara.' },
      { name: 'Papież', description: 'Reprezentuje obojętność instytucji Kościoła wobec cierpienia Polaków; nakazuje uległość carowi pod groźbą klątwy.' },
      { name: 'Strach i Imaginacja', description: 'Personifikacje psychicznych oporów i wyrzutów sumienia Kordiana idącego zamordować cara Mikołaja I.' }
    ],
    keyScenes: [
      { title: 'Monolog na szczycie Mont Blanc', meaning: 'Punkt kulminacyjny przemiany bohatera. Kordian odrzuca bierność i ogłasza ideę winkelriedyzmu – Polska ma poświęcić się w walce z caratem, skupiając na sobie cios wrogów.' },
      { title: 'Droga do carskiej sypialni', meaning: 'Kordian nie jest w stanie pokonać moralnego wstrętu przed skrytobójstwem (etyka rycerska); pada zemdlony przed drzwiami cara.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Kordian NIE ZABIŁ cara! Przed sypialnią cara Kordian toczy wewnętrzną walkę ze Strachem i Imaginacją i pada zemdlony. Zamach nie doszedł do skutku przez słabość psychiczną bohatera i niechęć narodu do skrytobójstwa.'
  },
  {
    id: 'przedwiosnie',
    title: 'Przedwiośnie',
    author: 'Stefan Żeromski',
    epoch: 'Dwudziestolecie międzywojenne',
    genre: 'Powieść polityczno-społeczna',
    isGwiazdka: true,
    summary: 'Dojrzewanie Cezarego Baryki na tle krwawej rewolucji w Baku, wojny polsko-bolszewickiej 1920 r. oraz odbudowy niepodległej Polski poszukującej właściwej drogi reform.',
    keyMotifs: ['Mit szklanych domów', 'Rewolucja i jej okrucieństwo', 'Odbudowa państwa polskiego', 'Trudne wybory ideowe', 'Miłość w Nawłoci'],
    mainCharacters: [
      { name: 'Cezary Baryka', description: 'Młody, porywczy buntownik, początkowo zafascynowany rewolucją w Baku; po powrocie do Polski konfrontuje marzenia z bolesną rzeczywistością.' },
      { name: 'Seweryn Baryka', description: 'Ojciec Cezarego, który w drodze do Polski roztacza przed synem utopijną wizję nowoczesnych szklanych domów zapewniających czystość i dobrobyt.' },
      { name: 'Szymon Gajowiec', description: 'Urzędnik państwowy, zwolennik powolnych, ewolucyjnych reform gospodarczych i silnej waluty polskiej.' }
    ],
    keyScenes: [
      { title: 'Opowieść o szklanych domach', meaning: 'Piekielna tęsknota za ojczyzną idealną. Seweryn tworzy baśń o technologicznie doskonałej Polsce, która ma zmotywować chorego syna do dotarcia do kraju.' },
      { title: 'Marsz na Belweder w finale', meaning: 'Cezary w czapce żołnierskiej idzie obok robotników i komunistów, lecz jednocześnie „idzie oddzielnie” – nie jest to jednoznaczne poparcie komunizmu, lecz wyraz desperacji i wołania o radykalne zmiany.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: „Szklane domy” to MIT i marzenie ojca, a NIE rzeczywistość! Po przekroczeniu granicy Cezary widzi błoto, nędzę, ruderę i walące się chałupy w Chłodku, a nie szklane osiedla. Pamiętaj też, że Cezary w marszu na Belweder idzie ODDZIELNIE – nie staje się bezkrytycznym komunistą!'
  },
  {
    id: 'pan-tadeusz',
    title: 'Pan Tadeusz',
    author: 'Adam Mickiewicz',
    epoch: 'Romantyzm',
    genre: 'Epopeja narodowa',
    isGwiazdka: false,
    summary: 'Wielka epopeja szlachecka ukazująca obyczaje, spory i nadzieje niepodległościowe Polaków na Litwie w przededniu wyprawy Napoleona na Moskwę w 1812 roku.',
    keyMotifs: ['Ojczyzna prywatna (Litwa)', 'Tradycja i obyczajowość szlachecka', 'Wina, pokuta i odkupienie', 'Zgoda narodowa'],
    mainCharacters: [
      { name: 'Jacek Soplica (Ksiądz Robak)', description: 'Zabójca Stolnika Horeszki; po latach pychy zmywa winę cichą i niebezpieczną służbą emisariusza patriotycznego w habicie bernardyna.' },
      { name: 'Tadeusz Soplica', description: 'Syn Jacka, młody patriota zakochany w Zosi, uwłaszczający chłopów w finale.' },
      { name: 'Ksiądz Robak', description: 'Postać kluczowa: to sam Jacek Soplica, który oddaje życie zasłaniając Hrabiego i Gerwazego przed kulą moskiewską.' }
    ],
    keyScenes: [
      { title: 'Spowiedź Jacka Soplicy', meaning: 'Jacek na łożu śmierci wyjawia Gerwazemu swą prawdziwą tożsamość. Gerwazy wyznaje, że umierający Stolnik przed śmiercią uczynił znak krzyża w stronę Jacka na znak przebaczenia.' },
      { title: 'Polonez i koncert Jankiela', meaning: 'Harmonia narodu i artystyczne przypomnienie najważniejszych kart z historii Polski (Konstytucja 3 Maja, Targowica, rzeź Pragi, Dąbrowski).' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Jacek Soplica NIE BYŁ zdrajcą ojczyzny na usługach Moskali! Choć Moskale uznali go za stronnika po zabójstwie Stolnika, Jacek odrzucił ich honory i majątek, udał się na emigrację i całe życie pokutował jako emisariusz Ksiądz Robak.'
  }
];
