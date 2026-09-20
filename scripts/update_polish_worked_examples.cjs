const fs = require('fs');
const path = require('path');

const WORKED_EXAMPLES = {
  'pol-lesson-1-1': {
    problem: "Przeczytaj dwa fragmenty tekstów nieliterackich:\n\nTekst 1: „Piramida Cheopsa w Gizie ma obecnie wysokość 138,75 m, a jej podstawa tworzy kwadrat o boku 230,36 m. Do jej budowy użyto około 2,3 miliona kamiennych bloków”.\n\nTekst 2: „To po prostu niewiarygodny skandal! Aż we mnie kipi ze złości, gdy patrzę na te bezduszne, betonowe potworki niszczące krajobraz mojego ukochanego miasta!”.\n\nZadanie CKE: Wskaż dominującą funkcję językową w każdym z tekstów i uzasadnij odpowiedź wskaźnikami stylistycznymi.",
    steps: [
      {
        num: 1,
        label: "Identyfikacja celu wypowiedzi i intencji nadawcy",
        text: "Tekst 1 służy obiektywnemu przekazaniu danych geometrycznych i faktów historycznych bez ujawniania emocji autora. Tekst 2 wyraża silne, subiektywne wzburzenie nadawcy."
      },
      {
        num: 2,
        label: "Wskazanie wskaźników stylistycznych",
        text: "W tekście 1 występują zdania oznajmujące, precyzyjne liczby i neutralne słownictwo. W tekście 2 pojawiają się wykrzyknienia, czasowniki wyrażające wzburzenie („kipi ze złości”) oraz pejoratywne epitety wartościujące („bezduszne betonowe potworki”)."
      },
      {
        num: 3,
        label: "Sformułowanie wniosku CKE",
        text: "W tekście 1 dominantą jest funkcja informatywna (poznawcza), natomiast w tekście 2 – funkcja ekspresywna (emotywna)."
      }
    ],
    result: "Tekst 1: funkcja informatywna (fakty, liczby, styl neutralny). Tekst 2: funkcja ekspresywna (słownictwo wartościujące, wykrzyknienia)."
  },
  'pol-lesson-1-2': {
    problem: "Przeanalizuj trzy komunikaty językowe:\n1) „Zgaś zbędne światło! Każda kilowatogodzina to mniej smogu nad twoim domem”.\n2) „Słuchaj, jesteś tam jeszcze? Coś przerywa nam na linii!”.\n3) „Słowo «topos» w filologii oznacza odwieczny motyw kulturowy i literacki”.\n\nZadanie CKE: Przyporządkuj właściwe funkcje językowe (fatyczną, impresywną, metajęzykową) do powyższych wypowiedzi.",
    steps: [
      {
        num: 1,
        label: "Analiza wektora wpływu na odbiorcę",
        text: "Komunikat 1 stosuje tryb rozkazujący („Zgaś!”) połączony z argumentem motywacyjnym – jego bezpośrednim celem jest skłonienie odbiorcy do określonego działania (funkcja impresywna)."
      },
      {
        num: 2,
        label: "Analiza drożności kanału kontaktu",
        text: "Komunikat 2 nie wnosi żadnych danych merytorycznych; służy wyłącznie sprawdzeniu i podtrzymaniu kontaktu telefonicznego między rozmówcami (funkcja fatyczna)."
      },
      {
        num: 3,
        label: "Analiza wypowiedzi o kodzie językowym",
        text: "Komunikat 3 wyjaśnia definicję i znaczenie samego wyrazu językowego („topos”) – przedmiotem wypowiedzi jest kod językowy (funkcja metajęzykowa)."
      }
    ],
    result: "1) Funkcja impresywna (nakłanianie do działania), 2) Funkcja fatyczna (utrzymanie kontaktu), 3) Funkcja metajęzykowa (objaśnienie kodu językowego)."
  },
  'pol-lesson-2-1': {
    problem: "W debacie publicznej polityk powiedział o swoim oponencie:\n„Nie powinniśmy słuchać pana Kowalskiego w kwestii reformy edukacji, gdyż sam dwukrotnie powtarzał klasę w liceum!”.\n\nZadanie CKE: Nazwij zastosowany chwyt erystyczny i wyjaśnij, dlaczego stanowi on naruszenie zasad rzeczowej dyskusji.",
    steps: [
      {
        num: 1,
        label: "Identyfikacja przedmiotu ataku (osoba vs teza)",
        text: "Mówca nie odnosi się do merytorycznej wartości propozycji reformy edukacji ani nie analizuje argumentów oponenta. Zamiast tego wyciąga fakt z życia prywatnego i biografii rozmówcy."
      },
      {
        num: 2,
        label: "Rozpoznanie chwytu erystycznego",
        text: "Skierowanie ataku na cechy osobiste, przeszłość lub kompetencje oponenta zamiast dyskusji z jego stanowiskiem to klasyczny chwyt erystyczny: argumentum ad personam (atak osobisty)."
      },
      {
        num: 3,
        label: "Ocena błędu logicznego wg kryteriów CKE",
        text: "Argument jest logicznie bezwartościowy, ponieważ trudności szkolne w młodości nie wykluczają posiadania trafnych i wartościowych rozwiązań merytorycznych w dorosłym życiu."
      }
    ],
    result: "Mówca zastosował argumentum ad personam (atak osobisty). Narusza on zasady dyskusji, bo uderza w człowieka zamiast w jego tezę."
  },
  'pol-lesson-3-1': {
    problem: "Przeczytaj fragment wypowiedzi Czepca z „Wesela” Stanisława Wyspiańskiego:\n„Cóż tam, panie, w polityce?\nChińcyki trzymają się mocno!?\n(...) Panowie duzo wiecie,\nwitoć tańcujecie, a my nie”.\n\nZadanie CKE: Wskaż rodzaj stylizacji zastosowanej we fragmencie i określ jej funkcję w dramacie.",
    steps: [
      {
        num: 1,
        label: "Identyfikacja zjawisk leksykalnych i fonetycznych",
        text: "Wypowiedź zawiera formy fonetyczne typowe dla gwary wiejskiej Małopolski („Chińcyki”), słownictwo gwarowe („witoć”) oraz uproszczenia („duzo”)."
      },
      {
        num: 2,
        label: "Rozpoznanie typu stylizacji",
        text: "Świadome wprowadzenie cech gwary wiejskiej do języka utworu literackiego to dialektyzacja (stylizacja gwarowa)."
      },
      {
        num: 3,
        label: "Określenie funkcji artystycznej i dramaturgicznej",
        text: "Zabieg ten służy realistycznej charakterystyce środowiskowej Czepca jako chłopa oraz uwypukla barierę komunikacyjną między chłopstwem a inteligencją."
      }
    ],
    result: "Dialektyzacja (stylizacja gwarowa) pełniąca funkcję realistycznej charakterystyki środowiskowej małopolskiego chłopa."
  },
  'pol-lesson-4-1': {
    problem: "Zadanie CKE: Na podstawie dwóch tekstów (Tekst 1: o korzyściach płynących z automatyzacji pracy i rozwoju algorytmów AI; Tekst 2: o zagrożeniach dla prywatności i erozji relacji międzyludzkich) napisz notatkę syntetyzującą na temat: „Wpływ technologii na życie współczesnego człowieka”.\nNotatka musi liczyć 60–90 wyrazów.",
    steps: [
      {
        num: 1,
        label: "Ustalenie wspólnego mianownika problemowego",
        text: "Oba teksty rozważają transformację codzienności pod wpływem cyfryzacji, lecz prezentują odmienne bieguny oceny zjawiska."
      },
      {
        num: 2,
        label: "Zestawienie komparatywne (porównanie bez streszczania)",
        text: "Pierwszy autor akcentuje optymalizację czasu i usprawnienie diagnostyki, z kolei drugi autor alarmuje o rosnącym poczuciu samotności i ryzyku inwigilacji."
      },
      {
        num: 3,
        label: "Redakcja spójnego akapitu w rygorze słów (CKE 60–90)",
        text: "„Obaj autorzy analizują wieloaspektowy wpływ nowoczesnych technologii na egzystencję człowieka. Podczas gdy pierwszy publicysta skupia się na optymalizacji codziennych obowiązków oraz rewolucyjnych udogodnieniach w medycynie, drugi autor przestrzega przed utratą prywatności i osłabieniem więzi społecznych. Wspólnym wnioskiem płynącym z obu tekstów jest przekonanie, że postęp technologiczny wymaga od jednostki krytycznego myślenia oraz odpowiedzialnego wyznaczania granic między światem cyfrowym a sferą humanistyczną”. (67 wyrazów)."
      }
    ],
    result: "Wzorcowa notatka syntetyzująca 60–90 słów (4/4 pkt): zwięzła synteza stanowisk bez streszczeń i bez zwrotów „moim zdaniem”."
  },
  'pol-lesson-5-3': {
    problem: "Przeczytaj fragment Księgi Hioba:\n„Nagi wyszedłem z łona matki i nagi tam wrócę. Dał Pan i zabrał Pan. Niech będzie imię Pańskie błogosławione!”.\n\nZadanie CKE: Na podstawie fragmentu wyjaśnij sens biblijnej postawy Hioba wobec niezawinionego cierpienia.",
    steps: [
      {
        num: 1,
        label: "Analiza sytuacji egzystencjalnej bohatera",
        text: "Hiob – człowiek prawy i bogobojny – traci w jednej chwili rodzinę, majątek i zdrowie. Jego cierpienie nie jest karą za grzechy, lecz tajemniczą próbą wiary."
      },
      {
        num: 2,
        label: "Rozpoznanie postawy Hiobowej",
        text: "Bohater nie popada w bluźnierstwo ani nie buntuje się przeciwko Bogu. Uznaje absolutną transcendencję Stwórcy i kruchość ludzkiego bytu."
      },
      {
        num: 3,
        label: "Wymiar uniwersalny w literaturze",
        text: "Postawa Hiobowa staje się archetypem godności człowieka i niezłomnego zaufania wobec cierpienia, którego ludzki rozum nie potrafi pojąć."
      }
    ],
    result: "Postawa Hioba uosabia wierność i bezwarunkowe zaufanie Bogu w obliczu tajemnicy niezawinionego cierpienia."
  },
  'pol-lesson-6-2': {
    problem: "Przeczytaj fragment Lamentu świętokrzyskiego:\n„Synku miły i wybrany, / Rozdziel z matką swoją rany; / A wszakom cię, synku miły, w swym sercu nosiła”.\n\nZadanie CKE: Wyjaśnij, na czym polega humanizacja wizerunku Maryi w „Lamencie świętokrzyskim” w zestawieniu z „Bogurodzicą”.",
    steps: [
      {
        num: 1,
        label: "Przypomnienie wizerunku Maryi w Bogurodzicy",
        text: "W Bogurodzicy Maryja występuje w majestacie (motyw Deesis) jako niebiańska orędowniczka i Królowa pośrednicząca między ludźmi a Bogiem."
      },
      {
        num: 2,
        label: "Analiza środków w Lamencie świętokrzyskim",
        text: "W Lamencie Maryja jest matką stojącą pod krzyżem (motyw Stabat Mater Dolorosa). Cierpi fizycznie i psychicznie, używa czułych zdrobnień („synku miły”), szukając współczucia u innych matek."
      },
      {
        num: 3,
        label: "Sformułowanie wniosku CKE",
        text: "Humanizacja polega na sprowadzeniu sacrum do wymiaru ziemskich, powszechnie zrozumiałych emocji bezbronnej matki opłakującej śmierć syna."
      }
    ],
    result: "Humanizacja polega na ukazaniu Maryi jako cierpiącej ziemskiej matki, która w intymnym monologu opłakuje konającego syna."
  },
  'pol-lesson-7-2': {
    problem: "Przeczytaj fragment Trenu IX Jana Kochanowskiego:\n„Kupić by cię, Mądrości, za drogie pieniądze! (...) Terazem ze stopniów spadł i to jedno wiem, / Żem był człowiek przed szkodą, człowiek i po szkodzie”.\n\nZadanie CKE: Wyjaśnij, na czym polega kryzys światopoglądowy mędrca ukazany w Trenach Kochanowskiego.",
    steps: [
      {
        num: 1,
        label: "Rekonstrukcja stoickiego ideału humanizmu",
        text: "Przez lata Kochanowski głosił stoicką cnotę (apatheia), według której filozoficzna Mądrość czyni człowieka niewzruszonym na ciosy losu i śmierć bliskich."
      },
      {
        num: 2,
        label: "Zderzenie z osobistym dramatem",
        text: "Śmierć córki Urszulki obala renesansowe aksjomaty. Poeta uświadamia sobie, że stoickie recepty były iluzją – mędrzec w obliczu rozpaczy staje się bezradnym ojcem."
      },
      {
        num: 3,
        label: "Wniosek i odbudowa równowagi",
        text: "Kryzys dotyka wiary w ład świata, cnotę i rozum. Przezwycięża go dopiero Tren XIX („Sen”), przynoszący pocieszenie w chrześcijańskiej nadziei."
      }
    ],
    result: "Kryzys polega na załamaniu stoickiej wiary w samowystarczalność ludzkiego rozumu i cnoty w obliczu osobistej tragedii."
  },
  'pol-lesson-8-2': {
    problem: "Przeczytaj bajkę Ignacego Krasickiego „Jagnię i wilcy”:\n„Zawżdy znajdzie przyczynę, kto zdobyczy pragnie. / Dwaj wilcy jedno w lesie nadybali jagnię; / Już go mieli rozerwać; rzekło: «Jakim prawem?» / «Smacznyś, słaby i w lesie!» – zjedli niezabawem”.\n\nZadanie CKE: Wyjaśnij wymowę alegoryczną bajki oraz sformułuj jej uniwersalny morał.",
    steps: [
      {
        num: 1,
        label: "Analiza bohaterów zwierzęcych i ich ról",
        text: "Jagnię to alegoria słabości, niewinności i praworządności. Wilcy uosabiają brutalną przemoc, egoizm i bezwzględność."
      },
      {
        num: 2,
        label: "Konfrontacja prawa moralnego z siłą",
        text: "Na pytanie jagnięcia o prawo wilcy odpowiadają trzema argumentami fizycznymi: „Smacznyś, słaby i w lesie!”. W świecie pozbawionym zasad liczy się wyłącznie naga przewaga."
      },
      {
        num: 3,
        label: "Uogólnienie morału oświeceniowego",
        text: "Krasicki demaskuje cynizm silniejszych: w relacjach społecznych i politycznych prawo moralne nie chroni słabych, jeśli nie mają za sobą realnej siły obronnej."
      }
    ],
    result: "O prawie decyduje siła, a nie racja moralna. Praworządność bez siły staje się bezbronną ofiarą agresji silniejszego."
  },
  'pol-lesson-9-2': {
    problem: "Przeczytaj przestrogę Widma Złego Pana z „Dziadów cz. II” Adama Mickiewicza:\n„Bo kto nie był człowiekiem ni razu, / Temu człowiek nie pomoże”.\n\nZadanie CKE: Na podstawie fragmentu wyjaśnij kodeks etyczny ludu przedstawiony w obrzędzie Dziadów.",
    steps: [
      {
        num: 1,
        label: "Sytuacja moralna Widma",
        text: "Dziedzic wioski za życia wykazał się skrajnym brakiem miłosierdzia: kazał wychłostać głodnego chłopa za jabłko i wygnał w wigilijną noc kobietę z niemowlęciem na mróz."
      },
      {
        num: 2,
        label: "Pojęcie człowieczeństwa w tradycji romantycznej",
        text: "W ujęciu Mickiewicza bycie człowiekiem oznacza zdolność do elementarnej empatii, współczucia i pomocy potrzebującym."
      },
      {
        num: 3,
        label: "Nieodwracalność kary za bezduszność",
        text: "Kto za życia zerwał więź solidarności z ludźmi, po śmierci zostaje całkowicie wykluczony ze wspólnoty – duchy ptactwa uniemożliwiają mu zaznanie choćby kropli ulgi."
      }
    ],
    result: "Etyka ludowa głosi, że człowiekiem jest tylko ten, kto potrafi współczuć innym. Bezduszność za życia zamyka drogę do zbawienia."
  },
  'pol-lesson-9-3': {
    problem: "Przeczytaj słowa Balladyny po dokonaniu zbrodni w lesie malinowym:\n„Kto zabił? – Starsza... – Alboż to nie moje maliny? (...) Co ja zrobiłam? – Ktoś tu idzie... / Piekielne słowo! Siostro! Gdzie ty? Gdzie ty?”.\n\nZadanie CKE: Wyjaśnij, na czym polega tragiczny mechanizm eskalacji zbrodni w dramacie Juliusza Słowackiego.",
    steps: [
      {
        num: 1,
        label: "Motywacja pierwszej zbrodni",
        text: "Balladyna zabija Alinę pod wpływem chorobliwej żądzy władzy i awansu społecznego – zdobycie dzbana malin otwiera jej drogę do małżeństwa z hrabią Kirkorem."
      },
      {
        num: 2,
        label: "Psychologia mataczenia i eskalacji",
        text: "Jedna zbrodnia zmusza bohaterkę do popełniania kolejnych morderstw w celu zatarcia śladów (Gralon, Kostryn, Pustelnik, uwięzienie i wygnanie matki)."
      },
      {
        num: 3,
        label: "Nieuchronność sprawiedliwości",
        text: "Niezmywalne krwawe znamię na czole oraz sąd królewski, w którym Balladyna wydaje potrójny wyrok śmierci na samą siebie, ukazują nieodwracalność kary za zło."
      }
    ],
    result: "Zbrodnia rodzi zbrodnię: żądza władzy popycha Balladynę na ścieżkę zła, która kończy się sprawiedliwym uderzeniem pioruna."
  },
  'pol-lesson-10-3': {
    problem: "Przeczytaj słowa Jacka Soplicy (Księdza Robaka) ze spowiedzi w „Panu Tadeuszu” Adama Mickiewicza:\n„Ja, com z pychy upadł tak nisko, com był zdrajcą ojczyzny... jam Bogu i Polsce życie poświęcił”.\n\nZadanie CKE: Przedstaw etapy ewolucji Jacka Soplicy jako wzorca romantycznego bohatera dynamicznego.",
    steps: [
      {
        num: 1,
        label: "Warchoł i pyszny magnacki sługa (Jacek)",
        text: "W młodości był butnym szlachcicem, który z powodu urażonej dumy i czarnej polewki zabił Stolnika Horeszkę, przez co okrzyknięto go stronnikiem Moskali."
      },
      {
        num: 2,
        label: "Pokuta i przemiana w cichego emisariusza (Robak)",
        text: "Odrzuca imię, przywdziewa habit bernardyna i przyjmuje przydomek Robak (znak ukorzenia). Rezygnuje z indywidualizmu na rzecz tajnej pracy organicznej na Litwie przed wkroczeniem wojsk Napoleona."
      },
      {
        num: 3,
        label: "Rehabilitacja i odkupienie",
        text: "Ratując życie Gerwazemu i Tadeuszowi oraz organizując obronę dworu, zmywa z siebie hańbę zdrajcy i zostaje pośmiertnie zrehabilitowany przez naród."
      }
    ],
    result: "Soplica przekształca się z pysznego awanturnika w pokornego emisariusza, który odkupuje prywatne winy ofiarną służbą ojczyźnie."
  },
  'pol-lesson-12-1': {
    problem: "Wypowiedź Andrzeja Kmicica z „Potopu” Henryka Sienkiewicza:\n„Jam nie Kmicic, com na ojczyznę rękę podnosił pod Radziwiłłem... Jam Babinicz, proch i sługa Rzeczypospolitej”.\n\nZadanie CKE: Wskaż przełomowy moment przemiany wewnętrznej Kmicica i wyjaśnij funkcję motywu zmiany nazwiska.",
    steps: [
      {
        num: 1,
        label: "Nieświadoma zdrada i pycha rycerska",
        text: "Kmicic ślepo ufa hetmanowi Januszowi Radziwiłłowi, składając mu przysięgę na krzyż, przez co staje się narzędziem w rękach szwedzkich najeźdźców."
      },
      {
        num: 2,
        label: "Przełom moralny w Piliszkach",
        text: "Po odkryciu zdrady hetmana Kmicic przeżywa wstrząs. Przybiera nazwisko Babinicz, aby anonimowo, krwią i poświęceniem odkupić swoje grzechy wobec ojczyzny i ukochanej Oleńki."
      },
      {
        num: 3,
        label: "Heroizm i rehabilitacja",
        text: "Obrona Jasnej Góry (wysadzenie szwedzkiej kolubryny) oraz ocalenie króla Jana Kazimierza w wąwozie czynią z niego prawdziwego obrońcę wiary i ojczyzny."
      }
    ],
    result: "Zmiana nazwiska na Babinicz symbolizuje odrzucenie pychy i początek odkupienia win przez bohaterską służbę Rzeczypospolitej."
  },
  'pol-lesson-14-2': {
    problem: "Przeczytaj słowa z finału „Ferdydurke” Witolda Gombrowicza:\n„Nie ma ucieczki przed gębą, jak tylko w inną gębę, a przed człowiekiem schronić się można jedynie w objęcia innego człowieka. Przed pupą zaś wcale nie ma ucieczki”.\n\nZadanie CKE: Zdefiniuj pojęcia „gęby” i „upupienia” oraz wyjaśnij, dlaczego wg autora ucieczka przed Formą jest niemożliwa.",
    steps: [
      {
        num: 1,
        label: "Wyjaśnienie zjawiska «upupienia»",
        text: "Upupienie to narzucenie człowiekowi stanu infantylizmu, niedojrzałości i zależności przez instytucje społeczne (np. szkołę dyrektora Piórkowskiego)."
      },
      {
        num: 2,
        label: "Wyjaśnienie zjawiska «gęby»",
        text: "Gęba to narzucona z zewnątrz maska, poza i rola społeczna, którą człowiek przybiera pod presją spojrzenia drugiego człowieka."
      },
      {
        num: 3,
        label: "Wniosek o wszechwładzy Formy",
        text: "Człowiek nie może istnieć w próżni – każda próba zerwania maski rodzi natychmiast nową Formę, ponieważ nasza tożsamość jest nieustannie stwarzana przez relacje z otoczeniem."
      }
    ],
    result: "«Upupienie» to wtłoczenie w infantylizm, a «gęba» to maska społeczna. Przed Formą nie ma ucieczki, bo stwarzamy się w oczach innych."
  },
  'pol-lesson-15-1': {
    problem: "Przeczytaj fragment opowiadania Tadeusza Borowskiego „U nas w Auschwitzu...”:\n„Nie ma zbrodni, której by człowiek nie popełnił, aby się ratować... Myśmy byli znieczuleni. Nie współczuliśmy nikomu”.\n\nZadanie CKE: Wyjaśnij pojęcie «człowieka zlagrowanego» oraz wskaż rolę techniki behawioryzmu w prozie Borowskiego.",
    steps: [
      {
        num: 1,
        label: "Istota zlagrowania",
        text: "Człowiek zlagrowany to jednostka, której moralność i psychika zostały całkowicie zreorganizowane przez system obozu koncentracyjnego wokół jednego celu: biologicznego przetrwania za wszelką cenę."
      },
      {
        num: 2,
        label: "Odwrócenie dekalogu",
        text: "W lagrze tradycyjne wartości etyczne (miłosierdzie, solidarność) prowadziły do szybkiej śmierci. Moralnością staje się zdobycie miski zupy i butów po zmarłym."
      },
      {
        num: 3,
        label: "Funkcja metody behawioralnej",
        text: "Borowski opisuje wyłącznie zewnętrzne fakty, odruchy fizjologiczne i czyny bez psychologizowania i komentarzy moralizatorskich, co potęguje szokujący chłód narracji."
      }
    ],
    result: "Człowiek zlagrowany to jednostka odarta z wartości w imię przetrwania, a behawioryzm beznamiętnie dokumentuje to odczłowieczenie."
  },
  'pol-lesson-15-3': {
    problem: "Przeczytaj słowa Marka Edelmana z reportażu Hanny Krall „Zdążyć przed Panem Bogiem”:\n„Chodziło tylko o wybór sposobu umierania. Przecież nie o to, żeby przeżyć... Chodziło o to, żeby nie dać się zarżnąć bez słowa”.\n\nZadanie CKE: Wyjaśnij, na czym polega demitologizacja powstania w getcie warszawskim dokonana przez Marka Edelmana.",
    steps: [
      {
        num: 1,
        label: "Konfrontacja mitu z faktami",
        text: "Demitologizacja polega na odrzuceniu patosu, wzniosłych haseł o heroizmie i romantycznej legendy o pięknej śmierci na barykadzie."
      },
      {
        num: 2,
        label: "Prawda o powstaniu w getcie",
        text: "Edelman ukazuje nagą prawdę: bojownicy byli głodni, słabi, pozbawieni broni i wiedzieli, że nie mają szans na zwycięstwo. Ich walka była wyłącznie wyborem godnej śmierci."
      },
      {
        num: 3,
        label: "Misja powojenna kardiochirurga",
        text: "Edelman ratując pacjentów w szpitalu kontynuuje ten sam bój – stara się «zdążyć przed Panem Bogiem» i ocalić choć jedno życie."
      }
    ],
    result: "Demitologizacja polega na odrzuceniu patosu i ukazaniu, że powstanie w getcie było tragicznym wyborem godnego sposobu umierania."
  },
  'pol-lesson-16-1': {
    problem: "Przeczytaj wypowiedź doktora Bernarda Rieux z powieści Alberta Camusa „Dżuma”:\n„Nie wierzę w bohaterstwo. Interesuje mnie tylko to, żeby być człowiekiem... Trzeba walczyć tak czy inaczej i nie padać na kolana”.\n\nZadanie CKE: Przedstaw paraboliczny sens epidemii oraz wyjaśnij pojęcie «laickiego heroizmu».",
    steps: [
      {
        num: 1,
        label: "Paraboliczny charakter utworu",
        text: "Dżuma w Oranie to parabola zła w wymiarze historycznym (faszyzm, wojna), metafizycznym (absurd świata, cierpienie niewinnych dzieci) oraz biologicznym (śmierć)."
      },
      {
        num: 2,
        label: "Definicja laickiego heroizmu",
        text: "Bohaterstwo doktora Rieux nie wynika z religijnej wiary w nagrodę wieczną ani z pychy. To cichy, codzienny obowiązek niesienia ulgi cierpiącym wbrew beznadziei."
      },
      {
        num: 3,
        label: "Przesłanie etyczne Camusa",
        text: "Choć bakcyl dżumy nigdy nie ginie i może powrócić, człowiek ma obowiązek zachować godność i solidarność z drugim człowiekiem."
      }
    ],
    result: "Dżuma to parabola zła na świecie, a laicki heroizm to codzienna, sumienna walka z cierpieniem bez szukania religijnego poklasku."
  },
  'pol-lesson-16-2': {
    problem: "Trzy hasła Partii z powieści George'a Orwella „Rok 1984”:\n„Wojna to pokój. Wolność to niewola. Ignorancja to siła”.\n\nZadanie CKE: Wyjaśnij, w jaki sposób totalitarny system Oceanii posługuje się nowomową i dwójmyśleniem do manipulowania ludzką świadomością.",
    steps: [
      {
        num: 1,
        label: "Rola i konstrukcja nowomowy (Newspeak)",
        text: "Nowomowa ogranicza zasób słownictwa do tego stopnia, aby wyeliminować słowa umożliwiające nazwanie sprzeciwu (np. słowo «wolność» ma oznaczać jedynie wolność od zarazków)."
      },
      {
        num: 2,
        label: "Mechanizm dwójmyślenia (doublethink)",
        text: "Zdolność do jednoczesnego wyznawania dwóch sprzecznych sądów i bezwzględnej wiary w oba na rozkaz Partii (np. uznanie wojny za gwarant pokoju)."
      },
      {
        num: 3,
        label: "Zniszczenie prawdy obiektywnej",
        text: "Poprzez ciągłą reedukację i niszczenie dokumentów Partia kontroluje przeszłość, teraźniejszość i ludzkie myśli, odbierając obywatelom suwerenność."
      }
    ],
    result: "Nowomowa i dwójmyślenie niszczą pamięć i obiektywną prawdę, uniemożliwiając jednostce samą myśl o wolności i buncie."
  },
  'pol-lesson-16-3': {
    problem: "Finał dramatu Sławomira Mrożka „Tango” – taniec Edka z Eugeniuszem nad ciałem Artura:\n„Ja wam pokażę, co to porządek. Wyście tylko gadali i buntowali się, a ja umiem trzasnąć w kark. Zatańczmy tango!”.\n\nZadanie CKE: Zinterpretuj symbolikę finałowego tańca Edka w kontekście problematyki utworu.",
    steps: [
      {
        num: 1,
        label: "Porażka buntu intelektualisty (Artura)",
        text: "Artur chciał siłą przywrócić stare normy w domu owładniętym permisywizmem rodziców. Zginął z rąk Edka, bo w świecie zniszczonych wartości czysta teoria przegrywa z siłą."
      },
      {
        num: 2,
        label: "Symbolika postaci Edka",
        text: "Edek reprezentuje chamstwo, prymitywizm i pragmatykę przemocy fizycznej. W próżni aksjologicznej to on staje się nowym panem i dyktatorem."
      },
      {
        num: 3,
        label: "Wymowa finałowego tanga La Cumparsita",
        text: "Taniec prymitywnego chama ze starym inteligentem (Eugeniuszem) to tragikomiczny symbol kapitulacji kultury i inteligencji przed terrorem siły."
      }
    ],
    result: "Finałowe tango Edka to symbol triumfu brutalnej siły i prymitywizmu nad bezradną inteligencją w świecie upadku wartości."
  },
  'pol-lesson-17-1': {
    problem: "Temat wypracowania maturalnego CKE:\n„Czy człowiek jest kowalem własnego losu, czy marionetką w rękach przeznaczenia? Rozważ problem, odwołując się do lektury obowiązkowej oraz wybranego kontekstu”.\n\nZadanie CKE: Dokonaj dekonstrukcji tematu i sformułuj poprawną, pogłębioną tezę.",
    steps: [
      {
        num: 1,
        label: "Dekonstrukcja opozycji pojęciowej tematu",
        text: "Temat stawia pozorny dylemat rozłączny: absolutny wpływ człowieka na życie vs całkowity determinizm zewnętrzny (fatum, historia, biologia)."
      },
      {
        num: 2,
        label: "Odrzucenie uproszczeń i banału",
        text: "Niedojrzała praca ogranicza się do stwierdzenia: „Uważam, że człowiek ma trochę wpływu, a trochę nie”. Praca dojrzała precyzuje granice wolności moralnej."
      },
      {
        num: 3,
        label: "Sformułowanie tezy maturalnej",
        text: "„Choć okoliczności zewnętrzne, fatum czy mechanizmy dziejowe ograniczają ludzkie działania, to człowiek zachowuje pełną suwerenność w sferze wyborów moralnych i to one decydują o jego godności”."
      }
    ],
    result: "Człowiek podlega determinizmowi okoliczności zewnętrznych, lecz zachowuje pełną wolność i odpowiedzialność za wybory moralne."
  },
  'pol-lesson-18-1': {
    problem: "Napisz wzorcowy akapit argumentacyjny metodą C-W-K (Cząstkowa teza – Wyczerpujące rozwinięcie/dowód – Konkluzja) na podstawie „Lalki” Bolesława Prusa do tematu: „Wpływ wielkich namiętności na życie człowieka”.",
    steps: [
      {
        num: 1,
        label: "C – Twierdzenie cząstkowe (Sentence claim)",
        text: "Wielka, bezkrytyczna namiętność miłosna może zaburzyć racjonalną ocenę rzeczywistości i stać się przyczyną autodestrukcji wybitnej jednostki."
      },
      {
        num: 2,
        label: "W – Weryfikacja argumentem z lektury (Evidence)",
        text: "Stanisław Wokulski, genialny kupiec i pozytywistyczny przedsiębiorca, pod wpływem uczucia do arystokratki Izabeli Łęckiej idealizuje kobietę i traci czujność. Gdy podczas podróży pociągiem do Krakowa odkrywa jej flirt ze Starskim, jego światopogląd legnie w gruzach, co prowadzi go do próby samobójczej na torach w Skierniewicach."
      },
      {
        num: 3,
        label: "K – Konkluzja akapitu (Micro-conclusion)",
        text: "Przykład Wokulskiego dowodzi, że uczucie niepoparte wzajemnością i trzeźwym osądem przemienia się w destrukcyjną siłę niszczącą życiowy dorobek i psychikę człowieka."
      }
    ],
    result: "Wzorcowy akapit C-W-K: logiczne spięcie tezy cząstkowej, analizy sceny w Skierniewicach oraz syntetycznego wniosku."
  },
  'pol-lesson-19-1': {
    problem: "Uczeń piszący wypracowanie o totalitaryzmie w „Innym świecie” Gustawa Herlinga-Grudzińskiego napisał:\n„Grudziński urodził się w 1919 roku w Kielcach, a po wojnie mieszkał we Włoszech, gdzie pisał «Dziennik pisany nocą»”.\n\nZadanie CKE: Wyjaśnij, dlaczego egzaminator oceni ten kontekst jako niefunkcjonalny (0 pkt) i zaproponuj kontekst w 100% funkcjonalny.",
    steps: [
      {
        num: 1,
        label: "Diagnoza błędu pozornego kontekstu",
        text: "Podanie suchych dat, miejsca urodzenia czy innych dzieł autora bez powiązania z analizowanym problemem to kontekst fasadowy (nie wnosi nic do interpretacji)."
      },
      {
        num: 2,
        label: "Wymóg funkcjonalności CKE",
        text: "Kontekst musi tłumaczyć zjawisko przedstawione w utworze: jego genezę, filozoficzny sens, tło historyczne lub dialog międzytekstowy."
      },
      {
        num: 3,
        label: "Sformułowanie funkcjonalnego kontekstu literackiego",
        text: "„Motto «Innego świata» pochodzi ze «Wspomnień z domu umarłych» Fiodora Dostojewskiego. Grudziński nawiązuje do carskiej katorgi, aby ukazać nową, jeszcze bardziej bezwzględną jakość sowieckiego GUŁ-agu: w odróżnieniu od XIX-wiecznego więzienia łagier stalinowski dążył do całkowitego przełamania sumienia i odczłowieczenia więźnia”."
      }
    ],
    result: "Kontekst niefunkcjonalny to sucha notka biograficzna. Kontekst funkcjonalny (np. motto z Dostojewskiego) pogłębia interpretację utworu."
  },
  'pol-lesson-20-1': {
    problem: "Uczeń w wypracowaniu z „Lalki” Bolesława Prusa napisał:\n„Stanisław Wokulski żeni się z Izabelą Łęcką, a po ślubie razem otwierają nowy sklep w Warszawie i pomagają paryskim uczonym”.\n\nZadanie CKE: Wyjaśnij, dlaczego to stwierdzenie stanowi błąd kardynalny i jakie pociąga za sobą konsekwencje w ocenie arkusza.",
    steps: [
      {
        num: 1,
        label: "Definicja błędu kardynalnego wg CKE",
        text: "Błąd kardynalny to całkowite zafałszowanie fabuły, wymowy lub losów głównych postaci w lekturze obowiązkowej (z gwiazdką), dowodzące jej nieznajomości."
      },
      {
        num: 2,
        label: "Konsekwencje formalne dla maturzysty",
        text: "Popełnienie błędu kardynalnego skutkuje automatycznym wyzerowaniem całej części wypracowania (0/35 pkt) i praktycznie uniemożliwia zdanie matury!"
      },
      {
        num: 3,
        label: "Wyjaśnienie zniekształcenia fabuły",
        text: "Wokulski nigdy nie poślubił Izabeli; jej zdrada i chłód doprowadziły go do klęski psychicznej i próby samobójczej. Ślub zrujnowałby całą problematykę powieści."
      }
    ],
    result: "Błąd kardynalny natychmiast zeruje wypracowanie (0/35 pkt). Wokulski nigdy nie poślubił Izabeli Łęckiej!"
  }
};

// 1. Zaktualizuj seed/curriculum/curriculum_jezyk_polski.json
const seedPath = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_jezyk_polski.json');
const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

let updatedSeedCount = 0;
for (const topic of seedData.topics) {
  for (const lesson of (topic.lessons || [])) {
    if (WORKED_EXAMPLES[lesson.id]) {
      if (!lesson.theory_pill) {
        lesson.theory_pill = { concept_essence: lesson.title };
      }
      lesson.theory_pill.worked_example = WORKED_EXAMPLES[lesson.id];
      updatedSeedCount++;
    }
  }
}
fs.writeFileSync(seedPath, JSON.stringify(seedData, null, 2), 'utf8');
console.log(`[OK] Updated ${updatedSeedCount} lessons in ${seedPath}`);

// 2. Zaktualizuj pliki w mat (jeśli istnieją)
const matCurriculumPath = path.resolve('C:', 'Users', 'mateu', 'Downloads', 'mat', 'Jezyk_polski_podstawa', 'curriculum_jezyk_polski.json');
if (fs.existsSync(matCurriculumPath)) {
  fs.writeFileSync(matCurriculumPath, JSON.stringify(seedData, null, 2), 'utf8');
  console.log(`[OK] Synced aggregate to ${matCurriculumPath}`);
}

const matDir = path.resolve('C:', 'Users', 'mateu', 'Downloads', 'mat', 'Jezyk_polski_podstawa', 'curriculum');
if (fs.existsSync(matDir)) {
  const files = fs.readdirSync(matDir).filter(f => f.endsWith('.json'));
  for (const f of files) {
    const p = path.join(matDir, f);
    const dzialData = JSON.parse(fs.readFileSync(p, 'utf8'));
    let dzialUpdated = false;
    for (const l of (dzialData.lessons || [])) {
      if (WORKED_EXAMPLES[l.id]) {
        if (!l.theory_pill) l.theory_pill = { concept_essence: l.title };
        l.theory_pill.worked_example = WORKED_EXAMPLES[l.id];
        dzialUpdated = true;
      }
    }
    if (dzialUpdated) {
      fs.writeFileSync(p, JSON.stringify(dzialData, null, 2), 'utf8');
      console.log(`[OK] Updated worked_example in ${f}`);
    }
  }
}

// 3. Przebuduj fallback: src/data/polishCurriculumFallback.ts
require('./build_polish_fallback.cjs');
console.log('[OK] Successfully rebuilt polishCurriculumFallback.ts');
