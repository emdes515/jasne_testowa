import { BookSummary } from '../../types';

export const POLISH_BOOK_SUMMARIES: Record<string, BookSummary> = {
  'dziady-cz-3': {
    title: 'Dziady cz. III',
    author: 'Adam Mickiewicz',
    epoch: 'Romantyzm',
    genre: 'Dramat romantyczny',
    plot_overview: 'Akcja dramatu toczy się w 1823/1824 roku w Wilnie, Petersburgu i podwarszawskim dworku. Utwór ukazuje męczeństwo polskiej młodzieży (proces filomatów), prometejski bunt Konrada przeciwko Bogu w obronie cierpiącego narodu, mistyczne Widzenie Księdza Piotra zapowiadające odrodzenie Polski oraz bezlitosną demaskację carskiego despotyzmu i konformizmu polskich elit.',
    key_events: [
      'Prolog w celi bazylianów: Symboliczna śmierć nieszczęśliwego kochanka Gustawa i narodziny bojownika Konrada.',
      'Scena więzienna (Wigilia): Opowieść Sobolewskiego o wywózce katorżników na Sybir i pieśni więźniów.',
      'Wielka Improwizacja: Samotny monolog Konrada, żądanie „rządu dusz” i konfrontacja z milczącym Bogiem.',
      'Egzorcyzmy i Widzenie Księdza Piotra: Wizja Polski jako Chrystusa Narodów ukrzyżowanego przez trzech zaborców.',
      'Salon Warszawski: Kontrast patriotycznej młodzieży przy drzwiach z ugodową arystokracją przy stoliku.',
      'Bal u Senatora: Okrucieństwo Nowosilcowa wobec pani Rollison i piorun rażący Doktora.'
    ],
    characters: [
      { name: 'Konrad', role: 'Bohater prometejski; poeta-wieszcz żądający od Boga władzy nad ludźmi z miłości do narodu.' },
      { name: 'Ksiądz Piotr', role: 'Pokorny bernardyn, mistyk; otrzymuje łaskę poznania planu bożego wobec Polski.' },
      { name: 'Senator Nowosilcow', role: 'Okrutny carski namiestnik; cyniczny oprawca młodzieży wileńskiej żądny carskich łask.' },
      { name: 'Pani Rollison', role: 'Niewidoma matka uwięzionego i katowanego studenta; symbol bezgranicznego macierzyństwa i rozpaczy.' }
    ],
    key_scenes: [
      {
        scene: 'Wielka Improwizacja (Akt I, sc. 2)',
        significance: 'Najsłynniejszy monolog polskiego romantyzmu. Konrad grzeszy pychą (hybris), ale nie dokończa bluźnierstwa („Tyś carem!” mówi Diabeł), co ratuje jego duszę.'
      },
      {
        scene: 'Widzenie Księdza Piotra (Akt I, sc. 5)',
        significance: 'Fundament polskiego mesjanizmu romantycznego: analogia losu Polski do męki i zmartwychwstania Jezusa Chrystusa.'
      },
      {
        scene: 'Salon Warszawski (Akt I, sc. 7)',
        significance: 'Słynna diagnoza narodu Wysockiego: „Nasz naród jak lawa, z wierzchu zimna i twarda, sucha i plugawa, lecz wewnętrznego ognia sto lat nie wyziębi”.'
      }
    ]
  },

  'lalka': {
    title: 'Lalka',
    author: 'Bolesław Prus',
    epoch: 'Pozytywizm',
    genre: 'Powieść realistyczna (społeczno-obyczajowa)',
    plot_overview: 'Dzieje zamożnego warszawskiego kupca Stanisława Wokulskiego, który motywowany namiętną miłością do arystokratki Izabeli Łęckiej zdobywa olbrzymi majątek na dostawach wojennych. Prus kreśli panoramiczny obraz polskiego społeczeństwa końca XIX wieku, obnażając bezduszność arystokracji, apatię mieszczaństwa oraz klęskę haseł pracy organicznej i pracy u podstaw.',
    key_events: [
      'Powrót Wokulskiego z Bułgarii z kapitałem 300 tysięcy rubli zdobytym na wojnie.',
      'Otwarcie nowoczesnego sklepu przy Krakowskim Przedmieściu i założenie spółki do handlu ze Wschodem.',
      'Działalność filantropijna: pomoc ubogim z Powiśla (kamieniarz Węgiełek, prostytutka Magdalena, bracia Wysoccy).',
      'Pamiętnik starego subiekta: retrospekcje Ignacego Rzeckiego z Wiosny Ludów na Węgrzech i kult Napoleona.',
      'Wykupienie dłużnych weksli Łęckich i kamienicy przez Wokulskiego.',
      'Wyprawa do Paryża i spotkanie z naukowcem profesorem Geistem badającym metal lżejszy od wody.',
      'Dramat w pociągu: rozmowa Izabeli ze Starskim po angielsku, zerwanie zaręczyn i próba samobójcza Wokulskiego w Skierniewicach.',
      'Zniknięcie Wokulskiego po wysadzeniu zamku w Zasławiu i śmierć Rzeckiego przy wystawie z zabawkami.'
    ],
    characters: [
      { name: 'Stanisław Wokulski', role: 'Bohater na pograniczu epok: romantyk w miłości (idealista) i pozytywista w działaniu (racjonalista, naukowiec).' },
      { name: 'Izabela Łęcka', role: 'Arystokratka żyjąca w świecie salonowych pozorów; postrzega miłość jako transakcję handlową, a Wokulskiego traktuje instrumentalnie.' },
      { name: 'Ignacy Rzecki', role: 'Stary subiekt, romantyczny idealista polityczny, uczestnik Wiosny Ludów; uosobienie uczciwości i pracowitości.' },
      { name: 'Julian Ochocki', role: 'Młody arystokrata-naukowiec marzący o zbudowaniu maszyny latającej; odrzuca salonowe konwenanse na rzecz wiedzy.' }
    ],
    key_scenes: [
      {
        scene: 'Spacer Wokulskiego po Powiślu',
        significance: 'Manifest degradacji polskiego społeczeństwa: skrajna nędza proletariatu i bezużyteczność polskiej arystokracji trwoniącej majątki.'
      },
      {
        scene: 'Scena w pociągu (rozmowa po angielsku)',
        significance: 'Ostateczne zniszczenie romantycznych złudzeń Wokulskiego o czystości uczuć Izabeli; triumf zdrady i fałszu salonu.'
      },
      {
        scene: 'Zabawa Rzeckiego lalkami na wystawie',
        significance: 'Metafora toposu theatrum mundi (świat teatrem, ludzie marionetkami): gorzka refleksja nad bezradnością człowieka wobec ślepego losu.'
      }
    ]
  },

  'kordian': {
    title: 'Kordian',
    author: 'Juliusz Słowacki',
    epoch: 'Romantyzm',
    genre: 'Dramat romantyczny',
    plot_overview: 'Dramat ideowo polemiczny wobec „Dziadów cz. III”. Przedstawia dojrzewanie młodego poety od młodzieńczego weltschmerzu i prób samobójczych, przez gorzką podróż edukacyjną po Europie, aż po odnalezienie idei winkelriedyzmu na szczycie Mont Blanc i próbę samotnego zamachu na cara Mikołaja I w Warszawie.',
    key_events: [
      'Akt I: Młodzieńcza melancholia w dworku, nieszczęśliwa miłość do Laury i nieudana próba samobójcza.',
      'Akt II: Podróż po Europie – konfrontacja z komercjalizmem (Anglia), kupną miłością (Włochy/Wioletta) i cynizmem papieża (Watykan).',
      'Monolog na szczycie Mont Blanc: Przemiana bohatera i proklamacja hasła „Polska Winkelriedem narodów!”.',
      'Akt III: Koronacja cara w Warszawie i spisek koronacyjny w podziemiach katedry św. Jana.',
      'Droga do sypialni cara: Starcie ze zmaterializowanymi projekcjami własnej psychiki (Strach i Imaginacja) oraz zemdlenie przed progiem.',
      'Szpital dla obłąkanych: Diabeł ukazujący Kordianowi szaleńców jako parodię mesjańskich idei.',
      'Scena na placu Saskim i rozkaz egzekucji wstrzymany przez księcia Konstantego.'
    ],
    characters: [
      { name: 'Kordian', role: 'Bohater romantyczny, indywidualista; dąży do poświęcenia życia za ojczyznę, lecz zostaje sparaliżowany wewnętrznymi oporami moralnymi.' },
      { name: 'Car Mikołaj I', role: 'Bezwzględny despota, morderca polskich dążeń niepodległościowych, gardzący polskim prawem.' },
      { name: 'Wielki Książę Konstanty', role: 'Brat cara o gwałtownej, nieobliczalnej naturze; podziwia odwagę Kordiana na placu Saskim.' },
      { name: 'Papież', role: 'Polityk cyniczny; nakazuje Polakom posłuszeństwo carowi i grozi klątwą w razie buntu.' }
    ],
    key_scenes: [
      {
        scene: 'Monolog na szczycie Mont Blanc',
        significance: 'Odrzucenie bierności mesjanizmu na rzecz aktywnego poświęcenia narodowego: „Polska Winkelriedem narodów!” – przyjęcie na siebie ciosu wrogów w walce.'
      },
      {
        scene: 'Wędrówka do sypialni cara (Strach i Imaginacja)',
        significance: 'Psychologiczne studium niemocy moralnej: zabójstwo cara (choć tyrana) kłóci się z polskim rycerskim etosem i sumieniem bohatera.'
      }
    ]
  },

  'pan-tadeusz': {
    title: 'Pan Tadeusz',
    author: 'Adam Mickiewicz',
    epoch: 'Romantyzm',
    genre: 'Epopeja narodowa',
    plot_overview: 'Napisana trzynastozgłoskowcem epopeja przedstawiająca życie polskiej szlachty na Litwie w latach 1811–1812 w przededniu wyprawy Napoleona na Rosję. Osią kompozycyjną jest spór o zamek między Soplicami a Horeszkami, wątek miłosny Tadeusza, Zosi i Telimeny oraz historia Jacka Soplicy (Księdza Robaka), który rehabilituje się z dawnej zdrady jako emisariusz narodowy.',
    key_events: [
      'Powrót Tadeusza do Soplicowa i pierwsze spotkanie z Zosią.',
      'Konflikt o zamek Horeszkowa i polowanie na niedźwiedzia uratowane przez strzał Robaka.',
      'Koncert Wojskiego na rogu i spór Asesora z Rejentem o psy Kusego i Sokoła.',
      'Zajazd szlachecki na Soplicowo pod wodzą Hrabiego i Gerwazego.',
      'Wspólna walka zjednoczonej szlachty z oddziałem rosyjskim majora Płuta.',
      'Śmiertelna spowiedź Jacka Soplicy i wybaczenie przez Gerwazego.',
      'Rok 1812: Wkroczenie wojsk polskich z Dąbrowskim, zaręczyny Tadeusza i Zosi, uwłaszczenie chłopów oraz koncert Jankiela.'
    ],
    characters: [
      { name: 'Jacek Soplica (Ksiądz Robak)', role: 'Warchoł i morderca Stolnika, który przechodzi metamorfozę w pokornego emisariusza narodowego; bohater dynamiczny.' },
      { name: 'Tadeusz Soplica', role: 'Młody patriota, przedstawiciel nowego pokolenia; decyduje się na uwłaszczenie chłopów.' },
      { name: 'Sędzia Soplica', role: 'Gospodarz Soplicowa, strażnik dawnych obyczajów, tradycji, gościnności i etykiety szlacheckiej.' },
      { name: 'Gerwazy Rębajło', role: 'Wierny klucznik Horeszków, pałający żądzą zemsty na rodzie Sopliców; ostatecznie przebacza Jackowi.' }
    ],
    key_scenes: [
      {
        scene: 'Spowiedź Jacka Soplicy na łożu śmierci',
        significance: 'Kulminacja wątku rehabilitacji narodowej: zbrodniarz wyznaje winy, dowiaduje się o rozgrzeszeniu przez Stolnika i otrzymuje list z rehabilitacją od Napoleona.'
      },
      {
        scene: 'Koncert Jankiela (Księga XII)',
        significance: 'Muzyczna panorama historii Polski: Konstytucja 3 Maja, konfederacja targowicka, rzeź Pragi i radosny Mazurek Dąbrowskiego.'
      }
    ]
  },

  'wesele': {
    title: 'Wesele',
    author: 'Stanisław Wyspiański',
    epoch: 'Młoda Polska',
    genre: 'Dramat neoromantyczny / symboliczny',
    plot_overview: 'Dramat oparty na autentycznym weselu poety Lucjana Rydla z chłopką Jadwigą Mikołajczykówną w podkrakowskich Bronowicach (1900 r.). Zderzenie realistycznej zabawy weselnej z nocnymi zjawami obnaża iluzoryczność młodopolskiej „chłopomanii”, głęboki podział między inteligencją a chłopstwem oraz niezdolność polskiego narodu do zbrojnego powstania.',
    key_events: [
      'Akt I: Realistyczne dialogi weselników, spory polityczne Czepca z Dziennikarzem i zjawisko chłopomanii.',
      'Akt II: Przybycie Chochoła i korowód zjaw ucieleśniających kompleksy i lęki bohaterów (Widmo, Stańczyk, Rycerz Czarny, Hetman Branicki, Upiór Szeli, Wernyhora).',
      'Przekazanie Złotego Rogu Gospodarzowi przez Wernyhorę jako wezwania do narodowego zrywu.',
      'Gospodarz oddaje Złoty Róg Jaśkowi, nakazując zwołać powstańców z kosami.',
      'Akt III: Zgromadzenie uzbrojonych chłopów o świcie czekających na znak do ataku.',
      'Zgubienie Złotego Rogu przez Jaśka schylającego się po czapkę z pawich piór („ostał ci się ino sznur”).',
      'Chocholi taniec: Zgromadzeni weselnicy wpadają w hipnotyczny, letargiczny trans prowadzony przez Chochoła.'
    ],
    characters: [
      { name: 'Gospodarz (Włodzimierz Tetmajer)', role: 'Szlachcic osiadły na wsi; cieszy się autorytetem, lecz z lenistwa oddaje róg parobkowi.' },
      { name: 'Pan Młody (Lucjan Rydel)', role: 'Poeta zapatrzony w powierzchowną urodę wiejskiego folkloru (chłopomania bez zrozumienia realiów wsi).' },
      { name: 'Dziennikarz (Rudolf Starzewski)', role: 'Konserwatywny publicysta krakowski; marzy o wielkości, lecz szerzy dekadencki marazm i zwątpienie.' },
      { name: 'Czepiec', role: 'Wójt Bronowic, pełen wigoru i chęci do walki; ma świadomość siły chłopstwa („Cóż tam, panie, w polityce?”).' },
      { name: 'Jasiek', role: 'Młody chłopak goniący za błyskotkami; gubi Złoty Róg przez przywiązanie do czapki z pawich piór (próżność).' }
    ],
    key_scenes: [
      {
        scene: 'Rozmowa Dziennikarza ze Stańczykiem (Akt II)',
        significance: 'Stańczyk wręcza Dziennikarzowi Kaduceusz (laskę błazna) z poleceniem „mąć nim tę kadź narodową” – krytyka bierności i uśpienia narodu przez konserwatystów.'
      },
      {
        scene: 'Upiór Jakuba Szeli ukazujący się Dziadowi',
        significance: 'Przypomnienie krwawej rzezi galicyjskiej z 1846 roku: dowód na to, że bratanie się panów z chłopami to ułuda, pod którą wciąż tli się wrogość klasowa.'
      },
      {
        scene: 'Chocholi Taniec (Finał Aktu III)',
        significance: 'Najsłynniejszy symbol literatury polskiej: letarg, marazm, uwięzienie w kole niemocy i utrata historycznej szansy na odzyskanie niepodległości.'
      }
    ]
  },

  'przedwiosnie': {
    title: 'Przedwiośnie',
    author: 'Stefan Żeromski',
    epoch: 'Dwudziestolecie międzywojenne',
    genre: 'Powieść społeczno-polityczna',
    plot_overview: 'Losy Cezarego Baryki urodzonego w Baku. Powieść przedstawia okrucieństwo rewolucji bolszewickiej, mit o szklanych domach stworzony przez ojca Seweryna, podróż do odrodzonej Polski, udział w wojnie polsko-bolszewickiej 1920 r., romansowy pobyt w Nawłoci oraz poszukiwanie drogi naprawy II Rzeczypospolitej.',
    key_events: [
      'Młodość Cezarego w Baku: zachwyt rewolucją, śmierć matki i konfrontacja z chaosem i okrucieństwem wojny domowej.',
      'Ucieczka z ojcem: opowieść Seweryna o „szklanych domach” – utopijnej, zamożnej i czystej Polsce.',
      'Śmierć Seweryna i przybycie Cezarego do zrujnowanej, błotnistej Warszawy (zderzenie mitu z rzeczywistością).',
      'Udział w wojnie 1920 r. i ocalenie życia Hipolitowi Wielosławskiemu.',
      'Pobyt w szlacheckiej Nawłoci: romans z Laurą Kościeniecką i Karoliną Szarłatowiczówną, salonowe próżniactwo ziemiaństwa.',
      'Powrót do Warszawy: debata o przyszłości Polski między Szymonem Gajowcem (reforma ewolucyjna) a Antonim Lulkiem (rewolucja komunistyczna).',
      'Finał: Marsz robotników na Belweder – Cezary idzie w pierwszym szeregu w mundurze polskim, ale „odrębnie”.'
    ],
    characters: [
      { name: 'Cezary Baryka', role: 'Młody gniewny, rozdarty między wschodnią rewolucją a zachodnią ewolucją; szuka trzeciej drogi dla Polski.' },
      { name: 'Seweryn Baryka', role: 'Ojciec Cezarego, twórca idealistycznego mitu o szklanych domach dających godne życie każdemu obywatelowi.' },
      { name: 'Szymon Gajowiec', role: 'Urzędnik państwowy, zwolennik powolnych reform monetarnych, edukacji i umacniania granic.' },
      { name: 'Antoni Lulek', role: 'Chorowity fanatyk idei komunistycznej; dąży do obalenia państwa polskiego w imię rewolucji międzynarodowej.' }
    ],
    key_scenes: [
      {
        scene: 'Mit o szklanych domach',
        significance: 'Konfrontacja marzenia o nowoczesnej, sprawiedliwej cywilizacyjnie Polsce z realnym ubóstwem i brudem przygranicznych miasteczek.'
      },
      {
        scene: 'Marsz na Belweder (Finał powieści)',
        significance: 'Otwarty, wieloznaczny gest buntu: Cezary idzie z komunistami z rozpaczy po zapaści państwa, ale w polskim mundurze – protest przeciwko bierności rządu.'
      }
    ]
  },

  'ferdydurke': {
    title: 'Ferdydurke',
    author: 'Witold Gombrowicz',
    epoch: 'Dwudziestolecie międzywojenne',
    genre: 'Powieść awangardowa / groteskowa',
    plot_overview: 'Trzydziestoletni Józio Kowalski zostaje cofnięty do szkoły przez profesora Pimkę i poddany procesowi upupiania (infantylizacji). Powieść jest uniwersalną rozprawą o pułapce formy, niedojrzałości, gębie i narzucaniu człowiekowi sztucznych ról społecznych.',
    key_events: [
      'Pojawienie się profesora Pimki i porwanie Józia do szkoły dyrektora Piórkowskiego.',
      'Pojedynek na miny między Miętusem (chłopakiem zbuntowanym) a Syfonem (wzorem niewinności).',
      'Pobyt na stancji u postępowych Młodziaków: walka z nowoczesną „formą” pensjonarki Zuty.',
      'Zdemaskowanie podwójnej moralności inżynierostwa Młodziaków przez intrygę w sypialni Zuty.',
      'Wyprawa z Miętusem na wieś do Bolimowa w poszukiwaniu „prawdziwego parobka”.',
      'Pobyt we dworze wujostwa Hurleckich: arystokratyczna forma i feudalne bicie parobka po twarzy.',
      'Porwanie Zosi i ucieczka Józia: uświadomienie sobie, że „nie ma ucieczki przed gębą, jak tylko w inną gębę”.'
    ],
    characters: [
      { name: 'Józio Kowalski', role: '30-letni pisarz uwikłany w proces infantylizacji; próbuje zachować autentyczność, lecz stale wpada w nową formę.' },
      { name: 'Profesor Pimko', role: 'Filolog z Krakowa, ucieleśnienie szkolnej tresury i redukowania dorosłych do bezwolnych dzieci („pupa”).' },
      { name: 'Zuta Młodziakówna', role: 'Wysportowana, arogancka pensjonarka ucieleśniająca modną w dwudziestoleciu pozę nowoczesności i swobody obyczajowej.' },
      { name: 'Miętus', role: 'Uczeń zbuntowany, poszukujący autentyzmu w wulgarności i braterstwie z prostym ludem („parobkiem”).' }
    ],
    key_scenes: [
      {
        scene: 'Pojedynek na miny Miętusa z Syfonem',
        significance: 'Genialna groteska ukazująca bezsensowność ideologicznych starć prowadzonych za pomocą narzuconych póz i grymasów („gęby”).'
      },
      {
        scene: 'Finałowe porwanie Zosi w Bolimowie',
        significance: 'Ostateczna konkluzja filozoficzna Gombrowicza: człowiek nigdy nie osiąga czystego autentyzmu; uciekając przed jedną formą, nieuchronnie popada w kolejną.'
      }
    ]
  },

  'makbet': {
    title: 'Makbet',
    author: 'William Shakespeare',
    epoch: 'Renesans',
    genre: 'Tragedia elżbietańska',
    plot_overview: 'Tragedia szkockiego wodza Makbeta, który pod wpływem przepowiedni czarownic i za namową żony Lady Makbet morduje prawowitego króla Dunkana, aby przejąć tron. Zbrodnia pociąga za sobą lawinę kolejnych morderstw, prowadząc małżonków do obłędu i ostatecznej klęski.',
    key_events: [
      'Przepowiednia wiedźm na wrzosowisku: Makbet zostanie tanem Kawdoru i królem Szkocji.',
      'Podżeganie przez Lady Makbet i zamordowanie śpiącego króla Dunkana w zamku Inverness.',
      'Objęcie tronu i nasilenie paranoi władcy: zlecenie zabójstwa Banka i jego syna Fleance’a.',
      'Uczta królewska i przerażenie Makbeta na widok krwawego ducha Banka.',
      'Rzeź rodziny Makdufa w zamku Fife.',
      'Szaleństwo Lady Makbet: lunatykowanie i bezskuteczne próby zmycia niewidzialnej krwi z rąk.',
      'Przepowiednia o lesie Birnam i człowieku nienarodzonym z kobiety.',
      'Marsz armii pod gałęziami lasu Birnam, śmierć Makbeta w pojedynku z Makdufem i koronacja Malkolma.'
    ],
    characters: [
      { name: 'Makbet', role: 'Dzielny rycerz, który pod wpływem chorej ambicji niszczy swoje sumienie; staje się krwawym tyranem.' },
      { name: 'Lady Makbet', role: 'Bezwzględna inspiratorka pierwszej zbrodni; ostatecznie załamuje się psychicznie pod ciężarem winy i popełnia samobójstwo.' },
      { name: 'Banko', role: 'Rycerz prawy i roztropny; odrzuca kuszenie czarownic, pada ofiarą mordu na rozkaz przyjaciela.' },
      { name: 'Makduf', role: 'Szkocki szlachcic urodzony przez cesarskie cięcie; mściciel i wykonawca sprawiedliwości.' }
    ],
    key_scenes: [
      {
        scene: 'Monolog Lady Makbet ze sztyletem i plamą krwi',
        significance: 'Psychologiczne studium nieodwracalności winy: „Żadne perfumy Arabii nie osłodzą tej małej rączki”.'
      },
      {
        scene: 'Monolog Makbeta po śmierci żony („Jutro, jutro i znów jutro”) ',
        significance: 'Gorzka diagnoza sensu ludzkiego bytu: życie jako cień ruchomy i opowieść idioty, głośna i wrzaskliwa, a nieznacząca nic.'
      }
    ]
  },

  'antygona': {
    title: 'Antygona',
    author: 'Sofokles',
    epoch: 'Starożytność',
    genre: 'Tragedia grecka',
    plot_overview: 'Tragedia zderzenia dwóch równorzędnych racji moralnych: prawa boskiego (reprezentowanego przez Antygonę, która pragnie pogrzebać ciało brata Polinejkesa) z prawem ludzkim i racją stanu (uosabianą przez władcę Teb Kreona, który uznał Polinejkesa za zdrajcę ojczyzny).',
    key_events: [
      'Edykt Kreona zakazujący pod karą śmierci pochówku Polinejkesa.',
      'Śmiała decyzja Antygony i symboliczne posypanie zwłok brata ziemią.',
      'Pojmanie Antygony przez strażników i spór z Kreonem przed pałacem.',
      'Wstawiennictwo Hajmona (syna Kreona i narzeczonego Antygony) odrzucone przez ojca.',
      'Zamurowanie Antygony żywcem w skalnej grocie.',
      'Ostrzeżenie wróżbity Tyrezjasza zapowiadającego gniew bogów.',
      'Spóźniona zmiana decyzji Kreona: samobójstwo Antygony, Hajmona oraz królowej Eurydyki.',
      'Moralna i życiowa klęska osamotnionego Kreona.'
    ],
    characters: [
      { name: 'Antygona', role: 'Bohaterka tragiczna; stawia odwieczne prawa religijne i miłość siostrzaną ponad ziemski edykt władcy („Współkochać przyszłam, nie współnienawidzić”).' },
      { name: 'Kreon', role: 'Władca Teb zaślepiony pychą (hybris) i racją państwową; myli autorytet władzy z tyranią.' },
      { name: 'Ismena', role: 'Ugodowa, lękliwa siostra Antygony; uważa, że kobiety nie powinny sprzeciwiać się prawom mężczyzn.' },
      { name: 'Tyrezjasz', role: 'Ślepy wróżbita obdarzony boskim wglądem; obnaża pychę Kreona i zapowiada rychłą karę.' }
    ],
    key_scenes: [
      {
        scene: 'Agon (spór) Antygony z Kreonem',
        significance: 'Kulminacja konfliktu tragicznego: starcie niezbywalnego prawa naturalnego/religijnego z prawem pozytywnym stanowionym przez państwo.'
      },
      {
        scene: 'Finałowy lament Kreona',
        significance: 'Oczyszczenie tragiczne (katharsis): pycha władcy prowadzi do śmierci całej jego rodziny i świadomości własnej bezsilności.'
      }
    ]
  },

  'biblia': {
    title: 'Biblia (Stary i Nowy Testament)',
    author: 'Tradycja natchniona / Przekład ks. Jakuba Wujka',
    epoch: 'Starożytność i Biblia',
    genre: 'Tekst sakralny / przypowieści, hymny, listy',
    plot_overview: 'Fundament tożsamości europejskiej. Stary Testament ukazuje stworzenie świata (Genesis), przymierze z Abrahamem i Mojżeszem oraz mądrościowe rozważania o znikomości świata (Księga Koheleta – topos vanitas) i cierpieniu sprawiedliwego (Księga Hioba – teodycea). Nowy Testament to Ewangelie o życiu Jezusa, przypowieści moralne (O synu marnotrawnym, O miłosiernym Samarytaninie) oraz profetyczna Apokalipsa św. Jana.',
    key_events: [
      'Genesis: Stworzenie świata z niczego (creatio ex nihilo) i grzech pierworodny Adama i Ewy.',
      'Księga Hioba: Szatan odbiera Hiobowi dzieci, majątek i zdrowie za zgodą Boga; niezłomna wierność Hioba i triumf teodycei.',
      'Księga Koheleta: Medytacja nad przemijaniem: „Marność nad marnościami i wszystko marność” (Vanitas vanitatum et omnia vanitas).',
      'Przypowieści ewangeliczne: Samarytanin jako wzór miłosierdzia, Syn Marnotrawny jako obraz wybaczenia i nawrócenia.',
      'Hymn o miłości św. Pawła (1 Kor 13): Miłość jako cnota najwyższa, cierpliwa, nie zazdroszcząca.',
      'Apokalipsa św. Jana: Wizja końca świata, walka Niewiasty ze Smokiem, Czterej Jeźdźcy Apokalipsy i Nowe Jeruzalem.'
    ],
    characters: [
      { name: 'Hiob', role: 'Człowiek prawy i bogobojny poddany skrajnej próbie cierpienia; archetyp cierpienia niezawinionego.' },
      { name: 'Kohelet', role: 'Mędrzec biblijny rozważający bezcelowość ludzkich zabiegów o dobra doczesne w obliczu nieuchronnej śmierci.' },
      { name: 'Miłosierny Samarytanin', role: 'Archetyp bezinteresownej pomocy bliźniemu ponad podziałami narodowymi i religijnymi.' },
      { name: 'Syn Marnotrawny', role: 'Błądzący człowiek, który po upadku potrafi ukorzyć się, powrócić i doświadczyć bezwarunkowej miłości ojca.' }
    ],
    key_scenes: [
      {
        scene: 'Dysputa Hioba z przyjaciółmi',
        significance: 'Odrzucenie tezy, że cierpienie jest zawsze karą za grzechy: niezawinione cierpienie bywa próbą wiary i tajemnicą bożą.'
      },
      {
        scene: 'Wizja Czterech Jeźdźców w Apokalipsie',
        significance: 'Symboliczne plagi ludzkości: wojna, zaraza, głód i śmierć – stały topos katastroficzny w kulturze europejskiej.'
      }
    ]
  },

  'bogurodzica': {
    title: 'Bogurodzica & Lament świętokrzyski',
    author: 'Utwory anonimowe',
    epoch: 'Średniowiecze',
    genre: 'Pieśń religijna / Lament (plankt)',
    plot_overview: '„Bogurodzica” – najstarsza polska pieśń religijna i zarazem carmen patrium (hymn państwowy rycerstwa). Opiera się na kompozycji Deesis: prośbie do Chrystusa przez pośrednictwo Maryi i Jana Chrzciciela o godne życie i zbawienie wieczne. „Lament świętokrzyski” to arcydzieło polskiej liryki pasyjnej, przedstawiające cierpienie Maryi pod krzyżem jako ból zwykłej, bezradnej matki (motyw Stabat Mater).',
    key_events: [
      'Strofa 1 Bogurodzicy: Prośba do Bogurodzicy Dziewicy o pozyskanie łaski u Syna dla wiernych.',
      'Strofa 2 Bogurodzicy: Wezwanie przez wzgląd na Jana Chrzciciela o zbożny pobyt na ziemi i raj po śmierci.',
      'Lament świętokrzyski: Monolog Maryi apelującej do wszystkich ludzi, archanioła Gabriela i innych matek o współczucie w cierpieniu.'
    ],
    characters: [
      { name: 'Bogurodzica (Maryja)', role: 'W Bogurodzicy: potężna Królowa Niebios, orędowniczka ludzkości u Chrystusa. W Lamencie: czuła, cierpiąca ziemska matka.' },
      { name: 'Jan Chrzciciel', role: 'Wielki prorok i drugi orędownik ludzkości w kanonicznym trójpostaciowym motywie Deesis.' },
      { name: 'Chrystus', role: 'Władca i Zbawiciel (Pantokrator), do którego zanoszone są modlitwy.' }
    ],
    key_scenes: [
      {
        scene: 'Strofa 2 Bogurodzicy („Twego dziela Krzciciela”) ',
        significance: 'Ukazanie teologicznej idei pośrednictwa świętych: człowiek średniowieczny uważał się za zbyt grzesznego, by zwracać się do Chrystusa bezpośrednio.'
      },
      {
        scene: 'Apostrofa Maryi do Syna w Lamencie („Synku miły i wybrany”) ',
        significance: 'Humanizacja i desakralizacja bólu Maryi: przejmujący obraz matczynej miłości pragnącej ulżyć konającemu dziecku.'
      }
    ]
  }
};

/**
 * Pomocnik wyszukujący streszczenie lektury po tytule, lekturze lub fragmencie nazwy
 */
export function getPolishBookSummary(searchString?: string): BookSummary | undefined {
  if (!searchString) return undefined;
  const normalized = searchString.toLowerCase().trim();

  if (normalized.includes('dziad') || normalized.includes('konrad')) return POLISH_BOOK_SUMMARIES['dziady-cz-3'];
  if (normalized.includes('lalk') || normalized.includes('wokulsk') || normalized.includes('rzeck')) return POLISH_BOOK_SUMMARIES['lalka'];
  if (normalized.includes('kordian') || normalized.includes('mont blanc') || normalized.includes('słowack')) return POLISH_BOOK_SUMMARIES['kordian'];
  if (normalized.includes('pan tadeusz') || normalized.includes('soplic') || normalized.includes('tadeusz')) return POLISH_BOOK_SUMMARIES['pan-tadeusz'];
  if (normalized.includes('wesel') || normalized.includes('chochoł') || normalized.includes('wyspiańsk')) return POLISH_BOOK_SUMMARIES['wesele'];
  if (normalized.includes('przedwioś') || normalized.includes('baryk') || normalized.includes('szklan')) return POLISH_BOOK_SUMMARIES['przedwiosnie'];
  if (normalized.includes('ferdydurk') || normalized.includes('gęba') || normalized.includes('pupa')) return POLISH_BOOK_SUMMARIES['ferdydurke'];
  if (normalized.includes('makbet') || normalized.includes('szekspir') || normalized.includes('duncan')) return POLISH_BOOK_SUMMARIES['makbet'];
  if (normalized.includes('antygon') || normalized.includes('kreon') || normalized.includes('sofokl')) return POLISH_BOOK_SUMMARIES['antygona'];
  if (normalized.includes('bibli') || normalized.includes('hiob') || normalized.includes('kohelet') || normalized.includes('apokalips')) return POLISH_BOOK_SUMMARIES['biblia'];
  if (normalized.includes('bogurodzic') || normalized.includes('lament') || normalized.includes('deesis')) return POLISH_BOOK_SUMMARIES['bogurodzica'];

  return undefined;
}
