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
  },
  {
    id: 'antygona',
    title: 'Antygona',
    author: 'Sofokles',
    epoch: 'Starożytność i Biblia',
    genre: 'Tragedia antyczna',
    isGwiazdka: true,
    summary: 'Dramat zderzenia praw boskich (nakaz pochówku brata Polinika) z prawem stanowionym przez władcę Teb, Kreona, prowadzący do nieuchronnej katastrofy rodu Labdakidów.',
    keyMotifs: ['Konflikt tragiczny', 'Prawo boskie a ludzkie', 'Władza i tyrania', 'Przeznaczenie i fatum (hamartia)', 'Miłość siostrzana'],
    mainCharacters: [
      { name: 'Antygona', description: 'Córka Edypa, bezkompromisowa i wierna religijnemu obowiązkowi pochowania zwłok brata Polinika.' },
      { name: 'Kreon', description: 'Władca Teb, stawiający autorytet państwa i litery prawa ponad więzy krwi i tradycję religijną.' },
      { name: 'Hajmon', description: 'Syn Kreona i narzeczony Antygony; bezskutecznie apeluje do ojca o rozsądek, po czym odbiera sobie życie.' }
    ],
    keyScenes: [
      { title: 'Agon Antygony i Kreona', meaning: 'Starcie dwóch równorzędnych racji moralnych: Antygona głosi „Współkochać przyszłam, nie współnienawidzić”, Kreon broni stabilności ładu państwowego.' },
      { title: 'Proroctwo Tejrezjasza i spóźniona skrucha Kreona', meaning: 'Ślepy wróżbita obwieszcza gniew bogów; Kreon ulega, lecz Antygona zdążyła już powiesić się w grobowcu.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Kreon NIE rozkazał ściąć Antygony mieczem! Kazał zamurować ją żywcem w skalnej grocie. Ponadto Kreon w finale nie ginie – zostaje sam z ciałem syna i żony Eurydyki jako złamany władca.'
  },
  {
    id: 'makbet',
    title: 'Makbet',
    author: 'William Szekspir',
    epoch: 'Renesans',
    genre: 'Tragedia szekspirowska',
    isGwiazdka: true,
    summary: 'Upadek moralny szlachetnego wodza szkockiego, który pod wpływem przepowiedni czarownic i ambicji żony wkracza na drogę krwawych morderstw i obłędu tyranii.',
    keyMotifs: ['Żądza władzy i pycha', 'Wyrzuty sumienia i psychomachia', 'Rola przepowiedni a wolna wola', 'Wina i kara', 'Zło jako siła niszcząca'],
    mainCharacters: [
      { name: 'Makbet', description: 'Wódz armii szkockiej, który po zamordowaniu króla Dunkana staje się bezwzględnym tyranem dręczonym halucynacjami.' },
      { name: 'Lady Makbet', description: 'Inspiratorka pierwszej zbrodni, która tłumi sumienie, lecz ostatecznie popada w lunatyzm i samobójczy obłęd.' },
      { name: 'Banko', description: 'Przyjaciel Makbeta, którego duch pojawia się na uczcie jako symbol niegasnącego poczucia winy mordercy.' }
    ],
    keyScenes: [
      { title: 'Królobójstwo Dunkana i motyw krwi na rękach', meaning: 'Przekroczenie granicy moralnej; Lady Makbet i Makbet odkrywają, że „cały ocean Neptuna nie zmyje tej krwi”.' },
      { title: 'Scena lunatyzmu Lady Makbet', meaning: 'Nieświadome próby zmycia wyimaginowanej plamy krwi („Precz, przeklęta plamo!”) ukazujące nieuchronną klęskę psychiczną zbrodniarza.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Makbet NIE został zabity przez żadnego ze zwykłych żołnierzy, lecz przez Makdufa, który „nie zrodził się z niewiasty” (przyszedł na świat przez cesarskie cięcie), co spełniło dwuznaczną przepowiednię czarownic!'
  },
  {
    id: 'zbrodnia-i-kara',
    title: 'Zbrodnia i kara',
    author: 'Fiodor Dostojewski',
    epoch: 'Pozytywizm',
    genre: 'Powieść psychologiczna / polifoniczna',
    isGwiazdka: true,
    summary: 'Historia Rodiona Raskolnikowa, który motywowany teorią o ludziach niezwykłych dokonuje morderstwa lichwiarki, a następnie przechodzi mękę psychiczną i duchowe zmartwychwstanie dzięki wierze i miłości Soni.',
    keyMotifs: ['Teoria nadludzi', 'Wina, sumienie i odkupienie', 'Miłość ofiarna i chrześcijańska wiara', 'Miasto grzechu (Petersburg)', 'Psychologia zbrodni'],
    mainCharacters: [
      { name: 'Rodion Raskolnikow', description: 'Ubogi student prawa, autor artykułu o prawie „jednostek niezwykłych” do przekraczania barier moralnych.' },
      { name: 'Sonia Marmieładowa', description: 'Czysta duchowo dziewczyna zmuszona do prostytucji dla ratowania głodującej rodziny; uosobienie miłosierdzia i ewangelicznej miłości.' },
      { name: 'Porfiry Pietrowicz', description: 'Błyskotliwy sędzia śledczy, który prowadzi psychologiczną grę z mordercą, nakłaniając go do dobrowolnego przyznania się do winy.' }
    ],
    keyScenes: [
      { title: 'Wspólne czytanie Ewangelii o wskrzeszeniu Łazarza', meaning: 'Przełom duchowy w sercu Raskolnikowa; zapowiedź jego własnego zmartwychwstania moralnego na syberyjskiej katordze.' },
      { title: 'Morderstwo Alony Iwanowny i Lizawiety', meaning: 'Raskolnikow zabija lichwiarkę siekierą, lecz zmuszony jest zabić także niewinną, ciężarną Lizawietę, co natychmiast kompromituje jego teorię „szlachetnej zbrodni”.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Raskolnikow zamordował DWIE kobiety – lichwiarkę Alonę Iwanownę oraz jej upośledzoną, niewinną siostrę Lizawietę! Nie pisz, że zabił tylko lichwiarkę. Pamiętaj też, że Raskolnikow sam oddał się w ręce policji za namową Soni.'
  },
  {
    id: 'dzuma',
    title: 'Dżuma',
    author: 'Albert Camus',
    epoch: 'Współczesność',
    genre: 'Powieść-parabola',
    isGwiazdka: true,
    summary: 'Kronika epidemii dżumy w algierskim Oranie będąca uniwersalną parabolą o walce człowieka ze złem metafizycznym i totalitaryzmem poprzez postawę solidarności i codziennego heroizmu.',
    keyMotifs: ['Parabola zła i totalitaryzmu', 'Laicka świętość i przyzwoitość', 'Solidarność w cierpieniu', 'Absurd istnienia', 'Bunt przeciw złu'],
    mainCharacters: [
      { name: 'Bernard Rieux', description: 'Lekarz i kronikarz wydarzeń; uważa walkę z dżumą za kwestię zwykłej ludzkiej przyzwoitości bez patosu i mistycyzmu.' },
      { name: 'Jean Tarrou', description: 'Przyjaciel Rieux, syn prokuratora; dąży do bycia „świętym bez Boga” i organizuje ochotnicze formacje sanitarne.' },
      { name: 'Joseph Grand', description: 'Skromny urzędnik niestrudzenie prowadzący statystyki ofiar epidemii i piszący w nieskończoność pierwsze zdanie powieści.' }
    ],
    keyScenes: [
      { title: 'Śmierć małego synka sędziego Othona', meaning: 'Cierpienie niewinnego dziecka wstrząsa ojcem Paneloux i doktorem Rieux, unaoczniając brak teologicznego usprawiedliwienia dla cierpienia.' },
      { title: 'Finałowe ostrzeżenie doktora Rieux', meaning: 'Bakcyl dżumy nigdy nie umiera, lecz może uśpić się w meblach i bieliznie, by kiedyś znów obudzić swe szczury i posłać je na śmierć ku przestrodze ludzi.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Dżuma w powieści Camusa NIE JEST wyłącznie opisem medycznej zarazy – to powieść-parabola symbolizująca totalitaryzm (brunatną zarazę faszyzmu/nazizmu) oraz niezawinione zło w świecie!'
  },
  {
    id: 'rok-1984',
    title: 'Rok 1984',
    author: 'George Orwell',
    epoch: 'Współczesność',
    genre: 'Dystopia / antyutopia polityczna',
    isGwiazdka: true,
    summary: 'Mroczny obraz totalitarnego superpaństwa Oceanii pod rządami Wielkiego Brata i Partii Angsocu, gdzie prywatność, prawda historyczna i miłość zostają zniszczone przez terror i nowomowę.',
    keyMotifs: ['Totalitaryzm i inwigilacja', 'Nowomowa i manipulacja prawdą', 'Dwójmyślenie (doublethink)', 'Miłość jako zakazany bunt', 'Zdrada i złamanie człowieka'],
    mainCharacters: [
      { name: 'Winston Smith', description: 'Pracownik Ministerstwa Prawdy zajmujący się fałszowaniem archiwalnych gazet; podejmuje zakazany bunt przeciw Partii.' },
      { name: 'Julia', description: 'Młoda buntowniczka z Departamentu Literatury, kochanka Winstona, buntująca się przeciw rygorom Partii poprzez erotykę.' },
      { name: 'O’Brien', description: 'Cyniczny członek Wewnętrznej Partii, który zwodzi Winstona pozorem spisku, a potem poddaje go torturom w Ministerstwie Miłości.' }
    ],
    keyScenes: [
      { title: 'Pokój 101 w Ministerstwie Miłości', meaning: 'Winston zostaje skonfrontowany ze swym największym fobiicznym lękiem (szczury) i krzyczy: „Zróbcie to Julii! Nie mnie!”, dokonując ostatecznej zdrady.' },
      { title: 'Ostatnie zdanie powieści', meaning: 'Złamany Winston siedzi w kawiarni „Pod Kasztanem” i płacząc z miłości do dyktatora, uświadamia sobie: „Kochał Wielkiego Brata”. Triumf totalitaryzmu nad duchem.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Winston Smith w finale NIE zwycięża z systemem ani nie ginie w heroicznym powstaniu! Zostaje złamany psychicznie w Pokoju 101, zdradza Julię i zaczyna szczerze kochać Wielkiego Brata!'
  },
  {
    id: 'tango',
    title: 'Tango',
    author: 'Sławomir Mrożek',
    epoch: 'Współczesność',
    genre: 'Dramat absurdu / groteska',
    isGwiazdka: true,
    summary: 'Groteskowa walka młodego Artura o przywrócenie zasad i tradycji w zdemoralizowanej, anarchicznej rodzinie artystów, która kończy się jego śmiercią i przejęciem władzy przez prymitywnego chama Edka.',
    keyMotifs: ['Kryzys wartości i anarchia', 'Bunt młodego przeciw wolności ojców', 'Groteska i teatr absurdu', 'Dyktatura brutalnej siły (cham)', 'Taniec jako symbol upadku'],
    mainCharacters: [
      { name: 'Artur', description: 'Młody student medycyny i filozofii, który pragnie zmusić rodzinę do ślubu i powrotu do norm, wierząc w zbawczą moc Formy.' },
      { name: 'Stomil i Eleonora', description: 'Rodzice Artura, starzy awangardziści celebrujący całkowity brak norm i swobodę obyczajową.' },
      { name: 'Edek', description: 'Prymityw, lokaj i kochanek Eleonory, uosobienie chamstwa i fizycznej przemocy, który zabija Artura ciosem w kark.' }
    ],
    keyScenes: [
      { title: 'Planowany ślub Artura z Alą', meaning: 'Próba wskrzeszenia tradycyjnego rytuału jako lekarstwa na anarchię, która sypie się z powodu braku autentycznej wiary i zdrady Ali.' },
      { title: 'Finałowe tango „La Cumparsita”', meaning: 'Edek zakłada marynarkę zabitego Artura i tańczy tango ze starym Eugeniuszem. Przerażająca metafora przejęcia władzy przez prymitywną, brutalną dyktaturę.' }
    ],
    cardinalWarning: 'BŁĄD KARDYNALNY CKE: Artur w „Tangu” NIE buntuje się przeciwko skostniałym normom społecznym, lecz ODWROTNIE – buntuje się przeciwko BRAKOWI norm i obyczajowej anarchii stworzonej przez jego awangardowych rodziców!'
  }
];
