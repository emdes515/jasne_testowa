import { Task800Item } from './types';

export const PART3_WYPRACOWANIE_TASKS: Task800Item[] = [
  // =========================================================================
  // T15: FORMUŁOWANIE TEZY I DOBÓR STANOWISKA DO PROBLEMU (15 zadań)
  // ID: POL_P3_T15_001 do POL_P3_T15_015
  // =========================================================================
  {
    id: 'POL_P3_T15_001',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Formułowanie tezy: Bunt i jego konsekwencje',
    question: 'Temat wypracowania: „Bunt i jego konsekwencje dla człowieka”. Sformułuj precyzyjną, wieloaspektową tezę do tego tematu, uwzględniając zarówno pozytywne, jak i destrukcyjne skutki buntu jednostki.',
    points: 2,
    correctAnswerText: 'Bunt jest fundamentalnym aktem autoafirmacji jednostki i motorem postępu moralnego lub społecznego, lecz niesie za sobą nieuchronną samotność, cierpienie, a niekiedy samozagładę buntownika.',
    ckeKeyCriteria: [
      '2 pkt – sformułowanie dojrzałej tezy dwuaspektowej (wskazanie szans i zagrożeń/konsekwencji buntu).',
      '1 pkt – sformułowanie tezy jednostronnej lub tautologicznej.',
      '0 pkt – brak tezy lub sformułowanie niezrozumiałe.'
    ],
    explanation: 'Dobra teza maturalna nie może być jedynie powtórzeniem pytania z tematu („Bunt ma konsekwencje”). Musi definiować charakter tych konsekwencji (np. rozwój duchowy vs alienacja społeczna).',
    tags: ['bunt', 'teza', 'wypracowanie', 'Formuła 2023'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T15_002',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T15_formulowanie_tezy',
    title: 'Wybór optymalnej tezy: Człowiek – istota pełna sprzeczności',
    question: 'Dla tematu: „Człowiek – istota pełna sprzeczności”, wskaż tezę, która najlepiej spełnia standardy dojrzałego wypracowania maturalnego CKE:',
    options: [
      'Człowiek ma wiele sprzeczności, co widać w wielu lekturach szkolnych.',
      'Wewnętrzne sprzeczności w człowieku wynikają ze starcia wzniosłych ideałów z ułomnością natury ludzkiej, determinując tragizm wyborów bohatera.',
      'Każdy człowiek jest inny, dlatego jedni postępują dobrze, a inni źle.',
      'Sprzeczności człowieka to temat poruszany od starożytności po współczesność.'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'Opcja B precyzyjnie definiuje źródło sprzeczności (ideały vs ułomność) oraz ich konsekwencję (tragizm wyborów). Pozostałe opcje to banały lub tautologie.',
    tags: ['sprzeczności', 'teza', 'wybór'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T15_003',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza z hipotezą: Relacja z drugą osobą',
    question: 'Temat: „Jak relacja z drugą osobą kształtuje człowieka?”. Sformułuj hipotezę otwierającą, pokazującą relację miłosną jako czynnik nobilitujący oraz destrukcyjny.',
    points: 2,
    correctAnswerText: 'Relacja z drugim człowiekiem może stać się dla jednostki źródłem ocalenia moralnego i sensu egzystencji, ale toksyczne lub niespełnione uczucie potrafi doprowadzić do utraty tożsamości i załamania psychicznego.',
    ckeKeyCriteria: [
      '2 pkt – teza uwzględnia ambiwalentny wpływ relacji (zbawienny i destrukcyjny).',
      '1 pkt – teza jednostronna (tylko miłość jako zbawienie).'
    ],
    explanation: 'Zwróć uwagę na zestawienie np. Wokulskiego (destrukcja przez Izabelę) z Raskolnikowem (odrodzenie przez Sonię).',
    tags: ['relacja', 'miłość', 'teza'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T15_004',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Marzenia a zderzenie z rzeczywistością',
    question: 'Temat: „Marzenia o lepszym świecie a zderzenie z rzeczywistością”. Sformułuj tezę w formie konstatacji o losie idealistów w literaturze.',
    points: 2,
    correctAnswerText: 'Konfrontacja wzniosłych marzeń o naprawie świata z twardymi realiami społecznymi i cynizmem otoczenia niemal zawsze kończy się klęską jednostki, jednak ocala jej godność moralną i inspiruje kolejne pokolenia.',
    ckeKeyCriteria: ['2 pkt – wskazanie klęski zewnętrznej przy jednoczesnym zwycięstwie moralnym.'],
    explanation: 'Wzorcowy schemat interpretacji losów Stanisława Wokulskiego, Juliana Ochockiego czy Cezarego Baryki.',
    tags: ['marzenia', 'idealiści', 'teza'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T15_005',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T15_formulowanie_tezy',
    title: 'Błąd tautologii w tezie',
    question: 'Które z poniższych zdań stanowi błąd tautologii (błędnego koła) w formułowaniu tezy wypracowania?',
    options: [
      'Samotność bywa dla twórcy ceną za geniusz, izolując go od przeciętnego społeczeństwa.',
      'Poświęcenie dla ojczyzny wymaga zrzeczenia się prywatnego szczęścia.',
      'Wybory moralne są trudne, ponieważ człowiek staje przed trudnymi wyborami natury moralnej.',
      'Praca organiczna miała na celu wzmocnienie ekonomiczne wszystkich warstw narodu.'
    ],
    correctOptionIndex: 2,
    points: 1,
    explanation: 'Zdanie C to podręcznikowa tautologia – powtarza treść pytania za pomocą tych samych słów („trudne wybory są trudnymi wyborami”), nie wnosząc żadnej myśli analitycznej.',
    tags: ['błędy', 'tautologia', 'teza'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T15_006',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Rola tradycji w życiu społeczeństwa',
    question: 'Temat: „Wierność tradycji a szukanie nowych dróg – różne postawy życiowe”. Sformułuj tezę syntezującą oba bieguny.',
    points: 2,
    correctAnswerText: 'Tradycja stanowi niezbędny fundament tożsamości kulturowej i narodowej, lecz jej bezkrytyczne kultywowanie prowadzi do skostnienia, dlatego postęp wymaga nieustannego kwestionowania dawnych wzorców.',
    ckeKeyCriteria: ['2 pkt – synteza zachowawczości i postępu jako komplementarnych sił.'],
    explanation: 'Nawiązanie do motywów z Wesela Wyspiańskiego oraz Tanga Mrożka.',
    tags: ['tradycja', 'nowoczesność', 'teza'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T15_007',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Człowiek wobec sytuacji ekstremalnej',
    question: 'Temat: „Człowiek w obliczu próby ostatecznej”. Sformułuj tezę odwołującą się do etyki lagrowej i heroizmu.',
    points: 2,
    correctAnswerText: 'W sytuacjach skrajnego terroru granice moralności ulegają relatywizacji, a zachowanie człowieczeństwa wymaga heroicznego wysiłku i wierności elementarnym odruchom solidarności.',
    ckeKeyCriteria: ['2 pkt – uwzględnienie deprawacji zlagrowania oraz możliwości ocalenia godności.'],
    explanation: 'Kluczowe przy zestawieniu Borowskiego z Herlingiem-Grudzińskim i Markiem Edelmanem.',
    tags: ['wojna', 'etyka', 'teza'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T15_008',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'true_false',
    granularType: 'T15_formulowanie_tezy',
    title: 'Prawda/Fałsz: Zasady formułowania tezy w Formule 2023',
    question: 'Oceń prawdziwość zasad formułowania tezy w rozprawce maturalnej:',
    trueFalseStatements: [
      { statement: 'Teza może mieć postać pytania retorycznego kończącego wstęp.', isTrue: false, explanation: 'Pytanie to hipoteza, nie teza. Teza musi być zdaniem twierdzącym.' },
      { statement: 'Teza powinna bezpośrednio odnosić się do problemu sformułowanego w temacie polecenia.', isTrue: true, explanation: 'Musi odpowiadać wprost na pytanie problemowe.' }
    ],
    points: 1,
    explanation: 'Teza to sąd twierdzący, podlegający logicznemu dowodzeniu w rozwinięciu.',
    tags: ['zasady CKE', 'teza'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T15_009',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Władza a moralność',
    question: 'Temat: „Sprawowanie władzy jako sprawdzian moralny człowieka”. Sformułuj tezę opartą na motywie deprawacji władzą.',
    points: 2,
    correctAnswerText: 'Władza obnaża najgłębsze słabości jednostki, stając się katalizatorem moralnej degeneracji, gdy ambicja i chęć panowania biorą górę nad odpowiedzialnością za wspólnotę.',
    ckeKeyCriteria: ['2 pkt – ujęcie władzy jako pokusy niszczącej etykę jednostki.'],
    explanation: 'Doskonałe odniesienie do Makbeta, Balladyny czy Wielkiego Brata w Roku 1984.',
    tags: ['władza', 'moralność', 'teza'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T15_010',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T15_formulowanie_tezy',
    title: 'Identyfikacja hipotezy',
    question: 'Które ze zdań jest hipotezą, a nie kategoryczną tezą?',
    options: [
      'Cierpienie uszlachetnia duszę bohatera literackiego.',
      'Czy w świecie zdominowanym przez totalitaryzm możliwe jest zachowanie niezależności myślenia?',
      'Przemiana duchowa Jacka Soplicy była wynikiem głębokiego poczucia winy.',
      'Konrad w III części Dziadów ponosi klęskę z powodu pychy prometejskie.'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'Pytanie problemowe wyraża przypuszczenie i wahanie badawcze – jest to hipoteza wymagająca weryfikacji w toku wywodu.',
    tags: ['hipoteza', 'teza'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T15_011',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Wina i odkupienie',
    question: 'Temat: „Czy każda wina może zostać odkupiona?”. Sformułuj tezę rozstrzygającą to zagadnienie w świetle literatury.',
    points: 2,
    correctAnswerText: 'Odkupienie winy jest możliwe tylko wtedy, gdy sprawca przejdzie głęboką przemianę wewnętrzną, wyzna grzechy i podejmie bezinteresowną służbę na rzecz innych, lecz niektóre zbrodnie ciążą na człowieku nieodwracalnie.',
    ckeKeyCriteria: ['2 pkt – zdefiniowanie warunków odkupienia oraz granicy zbrodni nieodwracalnych.'],
    explanation: 'Porównaj Jacka Soplicę (odkupienie) z Makbetem lub Raskolnikowem.',
    tags: ['wina', 'odkupienie', 'teza'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T15_012',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Samotność z wyboru a samotność narzucona',
    question: 'Temat: „Samotność jako przekleństwo czy przywilej wybitnych jednostek?”. Sformułuj tezę maturalną.',
    points: 2,
    correctAnswerText: 'Samotność jednostki wybitnej bywa źródłem intelektualnej niezależności i siły twórczej, lecz w wymiarze emocjonalnym staje się tragicznym brzemieniem odcinającym od ciepła wspólnoty.',
    ckeKeyCriteria: ['2 pkt – synteza samotności jako przywileju kreacji i przekleństwa alienacji.'],
    explanation: 'Konrad z Dziadów, Kordian, Wokulski.',
    tags: ['samotność', 'indywidualizm', 'teza'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T15_013',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T15_formulowanie_tezy',
    title: 'Ocena poprawności tezy analitycznej',
    question: 'Dla tematu: „Wpływ przeszłości na teraźniejszość bohatera”, wskaż tezę o największym potencjale argumentacyjnym:',
    options: [
      'Przeszłość zawsze wpływa na każdego człowieka w mniejszym lub większym stopniu.',
      'Wypierana przeszłość powraca jako destrukcyjna siła determinująca wybory bohatera, zmuszając go do konfrontacji z własną tożsamością.',
      'Przeszłość to czas miniony, który bohaterowie lektur wspominają z sentymentem.',
      'W lekturach takich jak Lalka i Pan Tadeusz przeszłość odgrywa dużą rolę.'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'Opcja B precyzuje mechanizm psychologiczny (wyparcie, determinizm wyborów, tożsamość), dając szerokie pole do analizy literackiej.',
    tags: ['przeszłość', 'psychologia', 'teza'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T15_014',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Motyw ojczyzny i patriotyzmu',
    question: 'Temat: „Czym jest patriotyzm w czasach próby?”. Sformułuj tezę odrzucającą pusty patos na rzecz konkretnego czynu.',
    points: 2,
    correctAnswerText: 'Prawdziwy patriotyzm w momentach dziejowych wstrząsów wyraża się nie w deklaratywnym patosie, lecz w gotowości do codziennej, ofiarnej pracy organicznej lub bezwzględnej ofierze z życia w obronie wolności.',
    ckeKeyCriteria: ['2 pkt – zderzenie patriotyzmu czynu (walka/praca) z pustą retoryką.'],
    explanation: 'Zestawienie Kamieni na szaniec, Lalki oraz Wesela.',
    tags: ['patriotyzm', 'ojczyzna', 'teza'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T15_015',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T15_formulowanie_tezy',
    title: 'Teza: Wolność człowieka a determinizm losu',
    question: 'Temat: „Czy człowiek decyduje o swoim losie, czy podlega siłom wyższym?”. Sformułuj tezę konfrontującą wolną wolę z fatum.',
    points: 2,
    correctAnswerText: 'Choć egzystencja człowieka bywa ograniczana przez historię, fatum lub normy społeczne, to o jego ostatecznej godności decyduje zachowanie wewnętrznej wolności i odpowiedzialność za podjęte wybory.',
    ckeKeyCriteria: ['2 pkt – uznanie ograniczeń zewnętrznych przy obronie wolności wewnętrznej i godności.'],
    explanation: 'Odniesienie do Antygony, Dżumy i Roku 1984.',
    tags: ['fatum', 'wolność', 'teza'],
    difficulty: 'zaawansowana'
  },

  // =========================================================================
  // T16: DOBÓR LEKTURY OBOWIĄZKOWEJ I DOWODZENIE ARGUMENTACYJNE (15 zadań)
  // ID: POL_P3_T16_001 do POL_P3_T16_015
  // =========================================================================
  {
    id: 'POL_P3_T16_001',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Dobór lektury: Bunt przeciwko Bogu i konwenansom',
    question: 'Do tematu „Bunt i jego konsekwencje” dobierz dwie lektury obowiązkowe: jedną ukazującą bunt metafizyczny, a drugą społeczny. Krótko uzasadnij dobór bohaterów.',
    points: 2,
    correctAnswerText: 'Bunt metafizyczny: „Dziady cz. III” – Konrad w Wielkiej Improwizacji buntuje się przeciw Bogu w imię miłości do cierpiącego narodu. Bunt społeczny: „Tango” – Artur buntuje się przeciw anarchii i bezwzględnemu brakowi norm w świecie stworzonym przez rodziców.',
    ckeKeyCriteria: ['2 pkt – trafny dobór 2 lektur z precyzyjnym wskazaniem bohaterów i natury ich buntu.'],
    explanation: 'Konrad uosabia bunt romantyczny (prometeizm), Artur z Tanga bunt neokonserwatywny przeciw rozkładowi formy.',
    tags: ['bunt', 'Dziady', 'Tango', 'lektura'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T16_002',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Optymalny dobór lektury: Motyw alienacji w wielkim mieście',
    question: 'Która lektura obowiązkowa stanowi najbogatszy materiał argumentacyjny do analizy samotności i alienacji jednostki w przestrzeni miejskiej XIX wieku?',
    options: [
      '„Pan Tadeusz” Adama Mickiewicza',
      '„Lalka” Bolesława Prusa',
      '„Wesele” Stanisława Wyspiańskiego',
      '„Kordian” Juliusza Słowackiego'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'W „Lalce” Warszawa (Powiśle, Krakowskie Przedmieście) oraz Paryż stanowią kluczowe przestrzenie miejskie ukazujące samotność Wokulskiego i Rzeckiego pośród obojętnego tłumu.',
    tags: ['miasto', 'alienacja', 'Lalka'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T16_003',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Unikanie błędu kardynalnego w argumencie z „Lalki”',
    question: 'Zdający napisał w argumencie: „Stanisław Wokulski popełnił samobójstwo w ruinach zamku w Zasławiu, wysadzając się dynamitem, co jednoznacznie potwierdził doktor Szuman”. Wyjaśnij, dlaczego to stwierdzenie jest błędem merytorycznym i jak sformułować ten argument poprawnie.',
    points: 2,
    correctAnswerText: 'Finał losów Wokulskiego jest w powieści celowo otwarty i wieloznaczny. Istnieją dwie sprzeczne hipotezy: samobójstwo w Zasławiu lub wyjazd do Paryża/Indii w celu kontynuowania badań naukowych. Przedstawianie domysłu jako pewnika zniekształca koncepcję otwartej kompozycji Prusa.',
    ckeKeyCriteria: ['2 pkt – wykazanie otwartego zakończenia powieści i unikanie jednoznacznych nieprawdziwych kategoryzacji.'],
    explanation: 'Pamiętaj: Prus celowo nie dał czytelnikowi jednoznacznej odpowiedzi, co stało się z Wokulskim.',
    tags: ['błąd kardynalny', 'Lalka', 'Wokulski'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T16_004',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Argumentacja: Przemiana bohatera w „Zbrodni i karze”',
    question: 'Przedstaw 2 kluczowe etapy argumentacji dowodzącej, że przemiana moralna Rodiona Raskolnikowa dokonała się dzięki cierpieniu i ewangelicznej miłości Soni.',
    points: 2,
    correctAnswerText: 'Etap 1: Początkowa pycha intelektualna Raskolnikowa (teoria ludzi niezwykłych) załamuje się pod wpływem wyrzutów sumienia i lektury przypowieści o wskrzeszeniu Łazarza czytanej przez Sonię. Etap 2: Na katordze na Syberii, pod wpływem bezwarunkowego oddania Soni, Rodion uświadamia sobie swoją miłość do niej i wkracza na drogę odrodzenia moralnego.',
    ckeKeyCriteria: ['2 pkt – logiczny ciąg przyczynowo-skutkowy: teoria napoleońska -> kryzys sumienia -> rola Soni i Ewangelii -> katorga.'],
    explanation: 'Wskazanie symbolu wskrzeszenia Łazarza jest kluczowym dowodem analitycznym dla egzaminatora CKE.',
    tags: ['Zbrodnia i kara', 'Raskolnikow', 'przemiana'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T16_005',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Dobór lektury: Krytyka mitów narodowych',
    question: 'Wskaż dzieło, które najlepiej zdemaskuje mit solidarności ogólnonarodowej i gotowości Polaków do zrywu niepodległościowego:',
    options: [
      '„Pan Tadeusz” Adama Mickiewicza',
      '„Wesele” Stanisława Wyspiańskiego',
      '„Kordian” Juliusza Słowackiego',
      '„Potop” Henryka Sienkiewicza'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'Wyspiański w „Weselu” demaskuje chłopomanię inteligencji, uśpienie społeczeństwa i brak porozumienia klasowego (chocholi taniec, zgubiony złoty róg).',
    tags: ['Wesele', 'mity', 'naród'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T16_006',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Argumentacja: Degeneracja totalitarna w „Roku 1984”',
    question: 'Sformułuj argument wykazujący, w jaki sposób Partia w powieści Orwella niszczy zdolność człowieka do samodzielnego myślenia.',
    points: 2,
    correctAnswerText: 'Partia pozbawia obywateli wolności myśli poprzez nowomowę (redukcję słownictwa uniemożliwiającą nazwanie buntu), dwójmyślenie (nakaz jednoczesnego wierzenia w sprzeczne fakty) oraz nieustanne fałszowanie historii w Ministerstwie Prawdy.',
    ckeKeyCriteria: ['2 pkt – odwołanie do pojęć: nowomowa, dwójmyślenie, zmienianie przeszłości.'],
    explanation: 'Precyzyjna terminologia orwellowska podnosi wartość merytoryczną argumentu.',
    tags: ['Rok 1984', 'totalitaryzm', 'argumentacja'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T16_007',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'true_false',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Prawda/Fałsz: Wymogi CKE dotyczące lektur w wypracowaniu',
    question: 'Oceń prawdziwość wymogów formalnych CKE dla wypracowania w Formule 2023:',
    trueFalseStatements: [
      { statement: 'Uczeń musi obowiązkowo odwołać się do lektury wskazanej w arkuszu jako lektura obowiązkowa.', isTrue: true, explanation: 'Jest to wymóg formalny – brak odwołania do lektury z listy skutkuje drastycznym obcięciem punktów.' },
      { statement: 'Jeśli uczeń popełni błąd kardynalny w lekturze obowiązkowej, cała praca otrzymuje 0 punktów.', isTrue: true, explanation: 'Błąd kardynalny całkowicie zeruje wypracowanie (0/35 pkt).' }
    ],
    points: 1,
    explanation: 'Zasada błędu kardynalnego dotyczy wyłącznie lektur sprawdzanych w całości (lektury z gwiazdką).',
    tags: ['zasady CKE', 'błąd kardynalny'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T16_008',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Argumentacja: Solidarność wobec zła w „Dżumie”',
    question: 'Przedstaw argument dowodzący, że postawa doktora Bernarda Rieux w „Dżumie” Camusa jest przykładem laickiego heroizmu i niezgody na cierpienie.',
    points: 2,
    correctAnswerText: 'Doktor Rieux nie szuka chwały ani nagrody religijnej; walczy z epidemią z poczucia elementarnej przyzwoitości i niezgody na cierpienie niewinnych (śmierć synka sędziego Othona). Jego heroizm polega na codziennej, wyczerpującej służbie bez złudzeń co do ostatecznego zwycięstwa nad bakcylem dżumy.',
    ckeKeyCriteria: ['2 pkt – odwołanie do pojęcia przyzwoitości, laickiej moralności i buntu przeciw cierpieniu niewinnych.'],
    explanation: 'Rieux definiuje swoje powołanie jako walkę z absurdem i złem bez odwoływania się do Boga.',
    tags: ['Dżuma', 'Camus', 'Rieux', 'heroizm'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T16_009',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Dobór lektury: Motyw rozczarowania niepodległością',
    question: 'Do tematu o zderzeniu ideałów z trudną rzeczywistością po odzyskaniu niepodległości w 1918 roku, najwłaściwszą lekturą obowiązkową jest:',
    options: [
      '„Kordian” Juliusza Słowackiego',
      '„Przedwiośnie” Stefana Żeromskiego',
      '„Pan Tadeusz” Adama Mickiewicza',
      '„Inny świat” Gustawa Herlinga-Grudzińskiego'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'W „Przedwiośniu” mit szklanych domów Seweryna Baryki zderza się z błotem, nędzą robotników w Warszawie, problemem reformy rolnej w Nawłoci i zamieszkami.',
    tags: ['Przedwiośnie', 'niepodległość', 'Baryka'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T16_010',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Argumentacja: Tragizm Kordiana',
    question: 'Wykaż w 2 zdaniach, na czym polega tragizm Kordiana podczas sceny pod sypialnią Cara w Zamku Królewskim.',
    points: 2,
    correctAnswerText: 'Tragizm Kordiana polega na paraliżu woli wywołanym przez upostaciowione Strach i Imaginację oraz konflikt między patriotycznym obowiązkiem zabicia tyrana a chrześcijańskim i rycerskim kodeksem moralnym zakazującym skrytobójstwa. Kordian pada zemdlony przed drzwiami Cara, stając się ofiarą własnej etycznej wrażliwości.',
    ckeKeyCriteria: ['2 pkt – wskazanie konfliktu moralnego: kodeks rycerski/chrześcijański vs skrytobójstwo oraz halucynacje.'],
    explanation: 'Kluczowy moment dramatu Słowackiego ukazujący niedojrzałość polskiego romantycznego spiskowca.',
    tags: ['Kordian', 'tragizm', 'argumentacja'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T16_011',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Argumentacja: Spór klasowy w „Nie-Boskiej komedii” [Drugi utwór / Kontekst]',
    question: 'Sformułuj argument wykazujący racje i winy obu obozów (arystokracji i rewolucjonistów) w dramacie Zygmunta Krasińskiego.',
    points: 2,
    correctAnswerText: 'Hrabia Henryk ma rację, broniąc tradycji, wiary chrześcijańskiej i dorobku kulturowego przeszłości, lecz arystokracja jest zdegenerowana, pyszna i winna ucisku ludu. Z kolei Pankracy słusznie domaga się chleba i sprawiedliwości dla ciemiężonych, ale jego rewolucja niesie ślepą rzeź, zniszczenie i ateistyczny fanatyzm.',
    ckeKeyCriteria: ['2 pkt – wykazanie tragizmu racji cząstkowych obu stron konfliktu.'],
    explanation: 'Zwieńczeniem sporu jest scena na Okopach Świętej Trójcy i widzenie Chrystusa Mściciela (Galilaee, vicisti!). Uwaga CKE: w nowelizacji MEN Nie-Boska komedia stanowi utwór poziomu rozszerzonego, a na poziomie podstawowym służy jako świetny drugi utwór literacki lub kontekst.',
    tags: ['Nie-Boska komedia', 'rewolucja', 'Krasiński', 'nowela MEN: poziom rozszerzony'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T16_012',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Dobór lektury: Motyw odpowiedzialności za drugiego człowieka',
    question: 'Wskaż lekturę obowiązkową z XX wieku, w której centralnym motywem jest ocalenie godności i pamięci o ofiarach Holokaustu poprzez relację reporterską:',
    options: [
      '„Zdążyć przed Panem Bogiem” Hanny Krall',
      '„Inny świat” Gustawa Herlinga-Grudzińskiego',
      '„Tango” Sławomira Mrożka',
      '„Ferdydurke” Witolda Gombrowicza'
    ],
    correctOptionIndex: 0,
    points: 1,
    explanation: 'Marek Edelman w rozmowie z Hanną Krall ukazuje powstanie w getcie warszawskim jako walkę o godną śmierć oraz swoje późniejsze powołanie kardiochirurga jako wyścig z Bogiem o ludzkie życie.',
    tags: ['Krall', 'Edelman', 'Holokaust'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T16_013',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Argumentacja: Rozdarcie wewnętrzne w „Makbecie”',
    question: 'Przeanalizuj, w jaki sposób zbrodnia niszczy psychikę Makbeta i Lady Makbet.',
    points: 2,
    correctAnswerText: 'Makbet po zabójstwie Dunkana popada w paranoję i apatię moralną, mordując każdego potencjalnego rywala (Banko, rodzina Macduffa) i tracąc zdolność odczuwania ludzkich emocji. Lady Makbet, początkowo bezwzględna, ulega załamaniu nerwowemu pod ciężarem nieusuwalnej plamy krwi (somnambulizm) i popełnia samobójstwo.',
    ckeKeyCriteria: ['2 pkt – ukazanie różnych dróg autodestrukcji: tyrania/znieczulica Makbeta vs obłęd i samobójstwo żony.'],
    explanation: 'Zwróć uwagę na kontrast: Lady Makbet na początku uważa, że „trochę wody zmyje ten czyn”, by w akcie V bezskutecznie szorować dłonie.',
    tags: ['Makbet', 'Szekspir', 'zbrodnia', 'psychika'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T16_014',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Argumentacja: Walka o polskość w „Syzyfowych pracach”',
    question: 'Wskaż przełomowy moment w procesie odzyskiwania tożsamości narodowej przez Marcina Borowicza.',
    points: 2,
    correctAnswerText: 'Przełomowym momentem była lekcja języka polskiego, podczas której nowy uczeń Bernard Zygier wyrecytował „Redutę Ordona” Adama Mickiewicza. Pod wpływem zakazanej poezji romantycznej Borowicz przeżywa wstrząs emocjonalny, uświadamia sobie zakłamanie rusyfikatorów i powraca do polskiej tożsamości.',
    ckeKeyCriteria: ['2 pkt – wskazanie recytacji Zygiera, utworu Mickiewicza oraz przełomu psychologicznego Borowicza.'],
    explanation: 'Scena ta stanowi serce problematyki rusyfikacji i obudzenia świadomości patriotycznej w powieści Żeromskiego.',
    tags: ['Syzyfowe prace', 'Żeromski', 'Borowicz', 'Zygier'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T16_015',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T16_dobor_lektury_argumentacja',
    title: 'Identyfikacja spójności argumentacyjnej',
    question: 'Zdający dowodzi tezy: „Doświadczenie zła prowadzi do utraty wiary w ludzkość”. Który przykład literacki najlepiej popiera tę myśl?',
    options: [
      'Opowiadanie Tadeusza Borowskiego „Proszę państwa do gazu” – zjawisko człowieka zlagrowanego obojętnego na śmierć współwięźniów.',
      '„Pan Tadeusz” – opis polowania na niedźwiedzia z udziałem Księdza Robaka.',
      '„Treny” Kochanowskiego – pochwała cnoty w Trenie IX.',
      '„Pieśń o Rolandzie” – bohaterska śmierć rycerza z twarzą zwróconą ku Hiszpanii.'
    ],
    correctOptionIndex: 0,
    points: 1,
    explanation: 'Borowski ukazuje absolutną destrukcję norm etycznych i redukcję człowieka do walki o biologiczne przetrwanie.',
    tags: ['Borowski', 'lagry', 'argumentacja'],
    difficulty: 'podstawowa'
  },

  // =========================================================================
  // T17: DOBÓR I FUNKCJONALNE WYKORZYSTANIE KONTEKSTU (15 zadań)
  // ID: POL_P3_T17_001 do POL_P3_T17_015
  // =========================================================================
  {
    id: 'POL_P3_T17_001',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Funkcjonalny kontekst historyczny: „Dziady cz. III”',
    question: 'Wytłumacz, jak funkcjonalnie (a nie encyklopedycznie) wykorzystać kontekst procesu filomatów i filaretów do interpretacji sceny więziennej w „Dziadach cz. III”.',
    points: 2,
    correctAnswerText: 'Kontekst aresztowań wileńskich z 1823 roku i śledztwa senatora Nowosilcowa wyjaśnia męczeństwo młodzieży (Janczewski, Wasilewski), którą Mickiewicz sakralizuje, ukazując jako niewinne ofiary carskiego despotyzmu i porównując ich cierpienie do rzezi niewiniątek.',
    ckeKeyCriteria: ['2 pkt – powiązanie faktów historycznych z ich sensem symbolicznym/mesjanistycznym w dramacie.'],
    explanation: 'Kontekst jest funkcjonalny wtedy, gdy pogłębia interpretację utworu, a nie jest tylko oderwaną notką biograficzną.',
    tags: ['kontekst historyczny', 'Dziady III', 'Mickiewicz'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T17_002',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T17_dobor_kontekstu',
    title: 'Rozpoznanie kontekstu filozoficznego',
    question: 'Do interpretacji postawy doktora Rieux w „Dżumie” Camusa najbardziej trafnym kontekstem filozoficznym jest:',
    options: [
      'Filozofia egzystencjalizmu laickiego i koncepcja absurdu Alberta Camusa',
      'Stoicyzm Marka Aureliusza i poszukiwanie apatii',
      'Mesjanizm Andrzeja Towiańskiego',
      'Pozytywizm ewolucyjny Herberta Spencera'
    ],
    correctOptionIndex: 0,
    points: 1,
    explanation: 'Etyka solidarności w obliczu absurdu egzystencji („Mit Syzyfa”) to kluczowy fundament filozoficzny prozy Camusa.',
    tags: ['kontekst filozoficzny', 'egzystencjalizm', 'Camus'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T17_003',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst biograficzny: „Treny” Jana Kochanowskiego',
    question: 'Sformułuj krótkie zastosowanie kontekstu biograficznego w analizie kryzysu światopoglądowego Kochanowskiego w „Trenach”.',
    points: 2,
    correctAnswerText: 'Śmierć ukochanej córki Urszulki zburzyła w Kochanowskim wieloletnie zaufanie do renesansowej filozofii stoickiej i cnoty. Osobista tragedia ojca obnażyła bezradność mędrca wobec realnego cierpienia, co poeta wyraża w dramatycznym Trenie IX i X.',
    ckeKeyCriteria: ['2 pkt – wykazanie, jak fakt biograficzny doprowadził do kryzysu renesansowego światopoglądu.'],
    explanation: 'Kochanowski z humanisty-stoika staje się zrozpaczonym, cierpiącym ojcem.',
    tags: ['kontekst biograficzny', 'Kochanowski', 'Treny'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T17_004',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'true_false',
    granularType: 'T17_dobor_kontekstu',
    title: 'Prawda/Fałsz: Wymogi CKE dotyczące kontekstów w wypracowaniu',
    question: 'Oceń kryteria oceniania kontekstów w Formule 2023:',
    trueFalseStatements: [
      { statement: 'Kontekst musi zostać funkcjonalnie powiązany z analizowanym utworem i argumentem (nie może być tylko luźną wzmianką).', isTrue: true, explanation: 'Tzw. kontekst pozorny lub niepowiązany nie jest punktowany przez egzaminatora CKE.' },
      { statement: 'Każde wypracowanie maturalne wymaga przywołania minimum 5 różnych kontekstów.', isTrue: false, explanation: 'Wymagane jest funkcjonalne przywołanie minimum jednego dojrzałego kontekstu, zaleca się 2-3.' }
    ],
    points: 1,
    explanation: 'Liczy się jakość i funkcjonalność kontekstu, a nie ich mechaniczna liczba.',
    tags: ['zasady CKE', 'konteksty'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T17_005',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst kulturowy/mitologiczny: Motyw Ikara',
    question: 'W jaki sposób wykorzystać mit o Ikarze jako kontekst w analizie wiersza Tadeusza Różewicza „Prawa i obowiązki” lub opowiadania Jarosława Iwaszkiewicza „Ikar”?',
    points: 2,
    correctAnswerText: 'Mit o Ikarze symbolizuje romantyczny poryw, idealizm i tragiczny upadek. U Różewicza i Iwaszkiewicza kontekst ten służy demitologizacji: upadek jednostki wybitnej jest niedostrzegalny dla zajętego codziennością tłumu (nawiązanie do obrazu Bruegla), co ukazuje obojętność świata wobec tragedii.',
    ckeKeyCriteria: ['2 pkt – odniesienie do archetypu ikaryjskiego oraz jego reinterpretacji u współczesnych twórców.'],
    explanation: 'Wspaniały kontekst łączący mitologię antyczną, malarstwo renesansowe i literaturę XX wieku.',
    tags: ['kontekst kulturowy', 'Ikar', 'Różewicz'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T17_006',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T17_dobor_kontekstu',
    title: 'Identyfikacja kontekstu literackiego',
    question: 'W wypracowaniu na temat zbrodni i wyrzutów sumienia zdający zestawia „Makbeta” Szekspira ze „Zbrodnią i karą” Dostojewskiego. Jaki to rodzaj kontekstu?',
    options: [
      'Kontekst biograficzny',
      'Kontekst komparatystyczny (literacki)',
      'Kontekst społeczno-polityczny',
      'Kontekst lingwistyczny'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'Porównanie motywu zbrodni i psychologii winowajcy w dziełach z różnych epok stanowi wzorcowy kontekst literacki (komparatystyczny).',
    tags: ['kontekst literacki', 'komparatystyka'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T17_007',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst biblijny: Motyw vanitas w „Lalce”',
    question: 'Wyjaśnij, w jaki sposób kontekst Księgi Koheleta pogłębia interpretację sceny zabawy lalkami przez Ignacego Rzeckiego.',
    points: 2,
    correctAnswerText: 'Księga Koheleta i jej dewiza „Vanitas vanitatum et omnia vanitas” rzucają filozoficzne światło na refleksję Rzeckiego, który nakręcając mechaniczne zabawki, dostrzega w nich marionetki losu. Scena ta demaskuje iluzoryczność ludzkich ambicji, miłości i bogactwa poddanych nieuchronnemu przemijaniu.',
    ckeKeyCriteria: ['2 pkt – połączenie motywu teatru świata (theatrum mundi) z marnością koheletową i zabawkami Rzeckiego.'],
    explanation: 'Rzecki w piwnicy sklepu staje się filozofem egzystencji ludzkiej.',
    tags: ['kontekst biblijny', 'Kohelet', 'vanitas', 'Lalka'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T17_008',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst historycznoliteracki: Ewolucja pojęcia bohatera',
    question: 'Do tematu: „Co sprawia, że człowiek staje się bohaterem?” zaproponuj kontekst epokowy ukazujący kontrast między bohaterem romantycznym a pozytywistycznym.',
    points: 2,
    correctAnswerText: 'Bohater romantyczny (np. Kordian, Konrad) realizuje heroizm poprzez samotny, spektakularny zryw militarny lub bunt metafizyczny, często kończący się klęską. Z kolei bohater pozytywistyczny (np. Stanisław Wokulski, Stanisława Bozowska) redefiniuje bohaterstwo jako cichą, codzienną, wieloletnią pracę organiczną i oświatową na rzecz społeczeństwa.',
    ckeKeyCriteria: ['2 pkt – wykazanie ewolucji od indywidualistycznego czynu zbrojnego do pracy organicznej.'],
    explanation: 'Znakomity kontekst problemowy pokazujący dojrzałą wiedzę o rozwoju myśli społecznej w Polsce.',
    tags: ['kontekst epokowy', 'romantyzm', 'pozytywizm', 'bohater'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T17_009',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T17_dobor_kontekstu',
    title: 'Błąd pozorności kontekstu',
    question: 'Który z poniższych fragmentów wypracowania zawiera tzw. kontekst pozorny (błędny metodologicznie)?',
    options: [
      'Bolesław Prus urodził się w 1847 roku w Hrubieszowie i naprawdę nazywał się Aleksander Głowacki, a jego brat brał udział w powstaniu.',
      'Sytuacja polityczna pod zaborem rosyjskim wymuszała na Prusie stosowanie języka ezopowego w odniesieniach do powstania styczniowego.',
      'Koncepcja miłości Wokulskiego nawiązuje do romantycznego modelu fatalnego zauroczenia rodem z Cierpień młodego Wertera.',
      'Obraz Powiśla w Lalce stanowi literacką realizację postulatów utylitaryzmu i konieczności asymilacji nizin społecznych.'
    ],
    correctOptionIndex: 0,
    points: 1,
    explanation: 'Fragment A to sucha notka biograficzna, która nie wnosi nic do interpretacji tekstu ani tezy (brak powiązania funkcjonalnego).',
    tags: ['błędy', 'kontekst pozorny'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T17_010',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst malarski: „Wesele” Stanisława Wyspiańskiego',
    question: 'Wskaż, jak kontekst twórczości malarskiej Aleksandra Gierymskiego lub Jacka Malczewskiego wzbogaca analizę symboliki „Wesela”.',
    points: 2,
    correctAnswerText: 'Wyspiański jako dramaturg i malarz operuje techniką syntezy sztuk. Wprowadzenie postaci Stańczyka nawiązuje wprost do słynnego obrazu Jana Matejki „Stańczyk”, tworząc kontekst gorzkiego rozrachunku z błędami politycznymi elity, z kolei postać Wernyhory nawiązuje do płótna Matejki zapowiadającego odrodzenie Polski.',
    ckeKeyCriteria: ['2 pkt – powiązanie postaci dramatu z konkretnymi obrazami Jana Matejki i ich wymową ideową.'],
    explanation: 'Matejko jest kluczowym intertekstem ikonograficznym Wesela.',
    tags: ['kontekst malarski', 'Wesele', 'Matejko', 'sztuka'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T17_011',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst totalitarny: „Inny świat” i łagry sowieckie',
    question: 'Przedstaw, jak wiedza o systemie Gułagu pogłębia interpretację motywu zlagrowania człowieka w dziele Herlinga-Grudzińskiego.',
    points: 2,
    correctAnswerText: 'Sowiecki system łagrów został zaprojektowany tak, aby zniszczyć w człowieku poczucie godności poprzez chroniczny głód, pracę ponad siły i system kotłów żywnościowych. Wiedza ta pozwala zrozumieć, że podłość w obozie była biologiczną konsekwencją zaplanowanej inżynierii dehumanizacji, co czyni gesty solidarności (np. Kostylewa) czynami prawdziwie heroicznymi.',
    ckeKeyCriteria: ['2 pkt – ujęcie łagru jako przemyślanej machiny dehumanizacji i tła dla heroizmu moralnego.'],
    explanation: 'Herling podkreślał, że człowiek jest ludzki tylko w ludzkich warunkach.',
    tags: ['kontekst historyczny', 'Inny świat', 'łagry'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T17_012',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst mitologiczny a postawa prometejska',
    question: 'Wskaż bohatera literackiego, dla którego mit o Prometeuszu stanowi bezpośredni archetyp postawy życiowej:',
    options: [
      'Konrad z „Dziadów cz. III” (bunt w Wielkiej Improwizacji za miliony)',
      'Stanisław Wokulski z „Lalki”',
      'Papkin z „Zemsty”',
      'Ebenezer Scrooge z „Opowieści wigilijnej”'
    ],
    correctOptionIndex: 0,
    points: 1,
    explanation: 'Konrad jest uosobieniem prometeizmu – buntuje się przeciw Bogu, gotów na wieczne potępienie z miłości do cierpiącego narodu.',
    tags: ['prometeizm', 'mitologia', 'Konrad'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T17_013',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst antropologiczny: Koncepcja „formy” i „gęby” u Gombrowicza',
    question: 'Wyjaśnij funkcję kontekstu filozoficzno-społecznego teorii Formy Witolda Gombrowicza w interpretacji „Ferdydurke”.',
    points: 2,
    correctAnswerText: 'Gombrowiczowska koncepcja Formy zakłada, że człowiek nigdy nie jest w pełni autentyczny, lecz nieustannie stwarzany przez innych ludzi w relacji międzyludzkiej (przyprawianie gęby, upupianie). Ucieczka przed formą jest niemożliwa, gdyż uciekając w jedną formę, natychmiast popada się w inną.',
    ckeKeyCriteria: ['2 pkt – definicja formy jako relacji społecznej i niemożności osiągnięcia absolutnej autentyczności.'],
    explanation: 'Gęba i pupa jako uniwersalne metafory ubezwłasnowolnienia jednostki przez kulturę.',
    tags: ['Gombrowicz', 'forma', 'Ferdydurke'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T17_014',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst antyczny: Pojęcie tragizmu i hybris',
    question: 'Zastosuj pojęcia hybris i hamartii jako kontekst w analizie postawy Kreona w „Antygonie” Sofoklesa.',
    points: 2,
    correctAnswerText: 'Kreon pada ofiarą hybris (pychy władcy), stawiając prawo państwowe ponad odwiecznymi prawami boskimi. Jego hamartia (wina tragiczna) polega na błędnym przekonaniu, że bezwzględna surowość uchroni Teby przed anarchią, co doprowadza do samobójstwa jego syna Hajmona i żony Eurydyki.',
    ckeKeyCriteria: ['2 pkt – poprawne użycie i wyjaśnienie pojęć hybris i hamartia w odniesieniu do Kreona.'],
    explanation: 'Kreon jest postacią w pełni tragiczną – działał w dobrej wierze jako władca, lecz poniósł całkowitą klęskę moralną.',
    tags: ['Antygona', 'hybris', 'Kreon', 'tragedia'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T17_015',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T17_dobor_kontekstu',
    title: 'Kontekst historyczny: Geneza „Pana Tadeusza”',
    question: 'W jakim celu Adam Mickiewicz pisał „Pana Tadeusza” w Paryżu w latach 1832–1834 (kontekst emigracyjny)?',
    options: [
      'Aby uciec myślami od skłóconej, cierpiącej polskiej emigracji polistopadowej i stworzyć wyidealizowaną arkadię „kraju lat dziecinnych”.',
      'Aby wezwać Polaków do natychmiastowego powstania przeciw Prusom.',
      'Aby przypodobać się carowi Mikołajowi I i uzyskać zgodę na powrót na Litwę.',
      'Aby stworzyć podręcznik tradycji myśliwskich dla francuskiej arystokracji.'
    ],
    correctOptionIndex: 0,
    points: 1,
    explanation: 'Epilog epopei wprost wyjaśnia nostalgię i chęć ucieczki od „paryskiego bruku” do krainy szczęśliwego dzieciństwa.',
    tags: ['Pan Tadeusz', 'emigracja', 'geneza'],
    difficulty: 'podstawowa'
  },

  // =========================================================================
  // T18: TWORZENIE PEŁNEGO KONSPEKTU I PLANU ROZPRAWKI (15 zadań)
  // ID: POL_P3_T18_001 do POL_P3_T18_015
  // =========================================================================
  {
    id: 'POL_P3_T18_001',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Bunt i jego konsekwencje',
    question: 'Zbuduj pełny konspekt wypracowania na temat: „Bunt i jego konsekwencje dla człowieka”. Uwzględnij lekturę obowiązkową („Dziady cz. III”), inny utwór literacki oraz dwa konteksty.',
    points: 4,
    essayBlueprint: {
      themeNumber: 1,
      promptText: 'Bunt i jego konsekwencje dla człowieka.',
      recommendedTheses: [
        'Bunt jest wyrazem moralnej suwerenności jednostki, jednak w zderzeniu z siłami wyższymi lub normami społecznymi niesie bolesne koszty samotności i cierpienia.'
      ],
      mandatoryStarBooks: ['Dziady cz. III (Adam Mickiewicz)'],
      secondaryBooks: ['Tango (Sławomir Mrożek)', 'Antygona (Sofokles)'],
      suggestedContexts: [
        { type: 'kulturowy', description: 'Archetyp prometejskiego buntu przeciw bogom w mitologii greckiej.' },
        { type: 'historyczny', description: 'Prześladowania carskie polskiej młodzieży po powstaniu listopadowym.' }
      ],
      cardinalErrorWarning: 'Nie myl Wielkiej Improwizacji (Dziady cz. III) z Widzeniem Księdza Piotra! Konrad nie jest pyszny wobec ludzi, lecz rzuca wyzwanie Bogu z miłości do narodu.',
      modelOutline: {
        introduction: 'Wstęp: Bunt jako uniwersalne doświadczenie ludzkie. Teza: Bunt pozwala zachować godność i wolność wewnętrzną, lecz jednostka płaci za niego alienacją i klęską.',
        argument1: 'Argument 1 („Dziady cz. III”): Konrad w Wielkiej Improwizacji podejmuje samotny bunt przeciw milczącemu Bogu w imię cierpiącego narodu. Konsekwencja: kryzys duchowy, omdlenie i ocalenie duszy dopiero przez pokorę ks. Piotra.',
        argument2: 'Argument 2 („Tango”): Artur buntuje się przeciw nihilizmowi rodziców, próbując przywrócić dawne normy i tradycję. Konsekwencja: klęska intelektu w starciu z prymitywną siłą Edka.',
        contextSummary: 'Kontekst: Zestawienie buntu Konrada z mitem o Prometeuszu – cierpienie jako nieodłączny cień heroizmu.',
        conclusion: 'Zakończenie: Podsumowanie wniosków. Bunt jest motorem rozwoju etycznego, lecz wymaga od buntownika najwyższej ofiary.'
      }
    },
    correctAnswerText: 'Wzorcowy plan zrównoważonej kompozycji trójdzielnej (wstęp z tezą, dwa bogate argumenty literackie, kontekst kulturowy, podsumowanie syntetyczne).',
    ckeKeyCriteria: [
      '4 pkt – kompletny konspekt z tezą, lekturą obowiązkową, innym utworem, kontekstami i ostrzeżeniem przed błędem kardynalnym.',
      '3 pkt – brak kontekstu lub niepełna argumentacja.',
      '2 pkt – błędy w powiązaniu utworów z tezą.'
    ],
    explanation: 'Ten schemat konspektu gwarantuje spełnienie wszystkich wymagań formalnych arkusza Formuła 2023.',
    tags: ['konspekt', 'Dziady', 'Tango', 'wypracowanie'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_002',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Człowiek – istota pełna sprzeczności',
    question: 'Przygotuj konspekt rozprawki na temat: „Człowiek – istota pełna sprzeczności”. Wykorzystaj postać Stanisława Wokulskiego z „Lalki” oraz Rodiona Raskolnikowa ze „Zbrodni i kary”.',
    points: 4,
    essayBlueprint: {
      themeNumber: 1,
      promptText: 'Człowiek – istota pełna sprzeczności.',
      recommendedTheses: [
        'Wewnętrzne rozdarcie człowieka rodzi się na styku rozumu i emocji, determinując tragiczne wybory i uniemożliwiając osiągnięcie trwałej harmonii.'
      ],
      mandatoryStarBooks: ['Lalka (Bolesław Prus)'],
      secondaryBooks: ['Zbrodnia i kara (Fiodor Dostojewski)'],
      suggestedContexts: [
        { type: 'filozoficzny', description: 'Pojęcie człowieka rozpiętego między sacrum a profanum (Blaise Pascal – trzcina myśląca).' },
        { type: 'historycznoliteracki', description: 'Przejście epokowe: zmierzch romantycznego idealizmu i narodziny pozytywistycznego pragmatyzmu.' }
      ],
      cardinalErrorWarning: 'Nie twierdzić, że Wokulski nienawidził arystokracji – pragnął być przez nią zaakceptowany ze względu na miłość do Izabeli Łęckiej.',
      modelOutline: {
        introduction: 'Wstęp: Złożoność natury ludzkiej. Teza: Człowiek jest areną walki sprzecznych pragnień: chłodnego racjonalizmu i gwałtownych namiętności.',
        argument1: 'Argument 1 („Lalka”): Wokulski jako bohater na granicy epok – z jednej strony trzeźwy kupiec i naukowiec pozytywistyczny, z drugiej sentymentalny romantyk zaślepiony miłością do Izabeli.',
        argument2: 'Argument 2 („Zbrodnia i kara”): Raskolnikow – z jednej strony bezwzględny morderca testujący teorię o jednostkach niezwykłych, z drugiej człowiek wrażliwy oddający ostatnie kopiejki rodzinie Marmieładowych.',
        contextSummary: 'Kontekst pascalowski: człowiek jako trzcina najwątlejsza, ale myśląca, miotana między wielkością a nędzą.',
        conclusion: 'Zakończenie: Sprzeczności nie przekreślają wielkości człowieka, lecz stanowią o jego człowieczeństwie i głębi psychologicznej.'
      }
    },
    ckeKeyCriteria: ['4 pkt – pełna realizacja struktury konspektu z trafnym doborem Wokulskiego i Raskolnikowa.'],
    explanation: 'Znakomite zestawienie dwóch najważniejszych powieści realistycznych XIX wieku.',
    tags: ['konspekt', 'Lalka', 'Zbrodnia i kara'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_003',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Jak relacja z drugą osobą kształtuje człowieka?',
    question: 'Opracuj plan wypracowania: „Jak relacja z drugą osobą kształtuje człowieka?”. Odwołaj się do „Zbrodni i kary” (Sonia i Rodion) oraz „Lalki” (Izabela i Wokulski).',
    points: 4,
    essayBlueprint: {
      themeNumber: 2,
      promptText: 'Jak relacja z drugą osobą kształtuje człowieka?',
      recommendedTheses: [
        'Relacja z drugim człowiekiem może stać się siłą ocalającą moralnie lub toksycznym impulsem prowadzącym do autodestrukcji.'
      ],
      mandatoryStarBooks: ['Zbrodnia i kara (Fiodor Dostojewski)', 'Lalka (Bolesław Prus)'],
      secondaryBooks: ['Mały Książę (Antoine de Saint-Exupéry)'],
      suggestedContexts: [
        { type: 'filozoficzny', description: 'Filozofia dialogu Józefa Tischnera i Martina Bubera (spotkanie z Innym).' }
      ],
      cardinalErrorWarning: 'Pamiętaj: Sonia Marmieładowa nie potępia Rodiona za morderstwo, lecz nakazuje mu uklęknąć na placu Siennym i wyznać winę.',
      modelOutline: {
        introduction: 'Wstęp: Człowiek jako istota relacyjna. Teza o podwójnym wymiarze relacji: nobilitującym i niszczącym.',
        argument1: 'Argument 1 („Zbrodnia i kara”): Wpływ Soni na Raskolnikowa – bezwarunkowa ewangeliczna miłość i wspólna lektura Biblii prowadzą Rodiona do zrzucenia pychy i odrodzenia moralnego.',
        argument2: 'Argument 2 („Lalka”): Relacja Wokulskiego z Izabelą Łęcką – toksyczna fascynacja salonową arystokratką niszczy energię życiową kupca i prowadzi do załamania psychicznego.',
        contextSummary: 'Kontekst: Filozofia spotkania Tischnera – człowiek poznaje siebie dopiero w twarzy drugiego człowieka.',
        conclusion: 'Zakończenie: Relacja z drugą osobą jest zwierciadłem, w którym przegląda się ludzka dusza.'
      }
    },
    ckeKeyCriteria: ['4 pkt – zbalansowany konspekt zestawiający relację zbawienną (Sonia) z niszczącą (Izabela).'],
    explanation: 'Wzorzec kompozycyjny oparty na zestawieniu kontrastowym.',
    tags: ['konspekt', 'relacja', 'miłość'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_004',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Wolność a zniewolenie w systemie totalitarnym',
    question: 'Przygotuj konspekt wypracowania: „Cena wolności w świecie zniewolenia”. Odwołaj się do „Roku 1984” Orwella oraz „Innego świata” Herlinga-Grudzińskiego.',
    points: 4,
    essayBlueprint: {
      themeNumber: 1,
      promptText: 'Cena wolności w świecie zniewolenia.',
      recommendedTheses: [
        'W systemie totalitarnym obrona wewnętrznej suwerenności wymaga najwyższego bohaterstwa, a uległość wobec machiny terroru niszczy tożsamość jednostki.'
      ],
      mandatoryStarBooks: ['Rok 1984 (George Orwell)'],
      secondaryBooks: ['Inny świat (Gustaw Herling-Grudziński)'],
      suggestedContexts: [
        { type: 'historyczny', description: 'Funkcjonowanie mechanizmów propagandy i aparatu bezpieczeństwa w ZSRR i III Rzeszy.' }
      ],
      cardinalErrorWarning: 'Winston Smith pod wpływem tortur w Pokoju 101 zdradza Julię („Zróbcie to Julii!”) i na końcu naprawdę kocha Wielkiego Brata.',
      modelOutline: {
        introduction: 'Wstęp: Istota systemów totalitarnych. Teza: Wolność myśli jest pierwszą ofiarą dyktatury.',
        argument1: 'Argument 1 („Rok 1984”): Winston Smith – próba zachowania wolności poprzez pisanie pamiętnika i miłość do Julii kończy się całkowitym złamaniem przez O’Briena w Pokoju 101.',
        argument2: 'Argument 2 („Inny świat”): Michaił Kostylew – heroiczny wybór wolności poprzez opalanie ręki w ogniu, by nie pracować na rzecz sowieckiego łagru.',
        contextSummary: 'Kontekst: Hannah Arendt i koncepcja korzeni totalitaryzmu jako destrukcji sfery prywatnej.',
        conclusion: 'Zakończenie: Wolność jest najcenniejszą, lecz najbardziej kruchą wartością człowieka.'
      }
    },
    ckeKeyCriteria: ['4 pkt – doskonałe zestawienie mechanizmów Orwella z faktami obozowymi Grudzińskiego.'],
    explanation: 'Bardzo wysoko punktowany zestaw lektur współczesnych.',
    tags: ['konspekt', 'Rok 1984', 'Inny świat', 'wolność'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_005',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Wierność tradycji a postęp',
    question: 'Zbuduj konspekt wypracowania na temat: „Wierność tradycji a szukanie nowych dróg – różne postawy życiowe”. Wykorzystaj „Wesele” Stanisława Wyspiańskiego oraz „Tango” Sławomira Mrożka.',
    points: 4,
    essayBlueprint: {
      themeNumber: 2,
      promptText: 'Wierność tradycji a szukanie nowych dróg – różne postawy życiowe.',
      recommendedTheses: [
        'Równowaga społeczna wymaga dialogu między tradycją a nowoczesnością; odrzucenie wszelkich reguł prowadzi do chaosu i tyranii prymitywu.'
      ],
      mandatoryStarBooks: ['Wesele (Stanisław Wyspiański)'],
      secondaryBooks: ['Tango (Sławomir Mrożek)'],
      suggestedContexts: [
        { type: 'kulturowy', description: 'Pojęcie dekonstrukcji norm i awangardy w sztuce XX wieku.' }
      ],
      cardinalErrorWarning: 'Złoty róg gubi Jasiek, schylając się po czapkę z pawich piór, a nie Gospodarz czy Pan Młody!',
      modelOutline: {
        introduction: 'Wstęp: Spór pokoleń i ideologii. Teza o konieczności zachowania formy i tożsamości.',
        argument1: 'Argument 1 („Wesele”): Uwięzienie w pozornej tradycji i mitach narodowych (chocholi taniec) paraliżuje zdolność Polaków do realnego czynu.',
        argument2: 'Argument 2 („Tango”): Obalenie wszelkich zasad przez Stomila i Eleonorę doprowadza do triumfu bezwzględnego chama – Edka, który tańczy tango La Cumparsita na trupie Artura.',
        contextSummary: 'Kontekst: Zestawienie chocholego tańca z tańcem Edka jako symboli polskiej niemocy i triumfu brutalnej siły.',
        conclusion: 'Zakończenie: Wolność pozbawiona odpowiedzialności niszczy kulturę i otwiera drogę totalitaryzmowi.'
      }
    },
    ckeKeyCriteria: ['4 pkt – mistrzowska synteza Wesela i Tanga jako diagnoz polskiego losu.'],
    explanation: 'Jedno z najbardziej klasycznych i docenianych zestawień maturalnych.',
    tags: ['konspekt', 'Wesele', 'Tango', 'tradycja'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_006',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Struktura wstępu: 3 obowiązkowe elementy',
    question: 'Wymień 3 kluczowe elementy składowe wzorcowego wstępu do rozprawki maturalnej w Formule 2023.',
    points: 2,
    correctAnswerText: '1. Wprowadzenie do problemu (refleksja ogólna/filozoficzna/kulturowa nad tematem).\n2. Zdefiniowanie kluczowych pojęć z polecenia (np. czym jest bunt, sprzeczność, relacja).\n3. Precyzyjne sformułowanie tezy lub hipotezy badawczej.',
    ckeKeyCriteria: ['2 pkt – wskazanie wprowadzenia, definicji pojęć i jasnej tezy.'],
    explanation: 'Poprawnie skonstruowany wstęp nadaje kierunek całej argumentacji i robi znakomite pierwsze wrażenie na egzaminatorze.',
    tags: ['wstęp', 'kompozycja', 'konspekt'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T18_007',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Struktura akapitu argumentacyjnego (zasada MEAL/PEEL)',
    question: 'Opisz wzorcową strukturę akapitu rozwinięcia w wypracowaniu maturalnym (Point, Evidence, Explanation, Link).',
    points: 2,
    correctAnswerText: '1. Zdanie wprowadzające cząstkową myśl/argument (Point).\n2. Przywołanie konkretnego przykładu/wydarzenia z lektury (Evidence).\n3. Pogłębiona interpretacja i analiza postawy bohatera/symbolu (Explanation).\n4. Zdanie podsumowujące łączące wniosek z tezą główną wypracowania (Link).',
    ckeKeyCriteria: ['2 pkt – precyzyjny opis schematu logicznego akapitu argumentacyjnego.'],
    explanation: 'Stosowanie zasady PEEL gwarantuje spójność wywodu i eliminuje chaotyczne streszczanie fabuły.',
    tags: ['akapit', 'PEEL', 'argumentacja'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T18_008',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Rola zakończenia wypracowania',
    question: 'Który z opisów najlepiej definiuje funkcję dojrzałego zakończenia rozprawki maturalnej?',
    options: [
      'Mechaniczne powtórzenie słowo w słowo tezy i tytułów omówionych lektur.',
      'Synteza wyprowadzonych wniosków, uogólnienie refleksji na temat kondycji ludzkiej i domknięcie klamry kompozycyjnej.',
      'Wprowadzenie nowej, nieomawianej wcześniej lektury i postawienie zupełnie nowej tezy.',
      'Wyrażenie nadziei, że egzaminator oceni pracę pozytywnie.'
    ],
    correctOptionIndex: 1,
    points: 1,
    explanation: 'Zakończenie nie może tylko streszczać pracy ani wprowadzać nowych wątków – musi stanowić uogólniającą syntezę wywodu.',
    tags: ['zakończenie', 'kompozycja'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T18_009',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Władza jako sprawdzian moralny człowieka',
    question: 'Zbuduj plan wypracowania: „Władza jako sprawdzian moralny człowieka”. Odwołaj się do „Makbeta” oraz „Odprawy posłów greckich” Kochanowskiego.',
    points: 4,
    essayBlueprint: {
      themeNumber: 1,
      promptText: 'Władza jako sprawdzian moralny człowieka.',
      recommendedTheses: [
        'Sprawowanie władzy obnaża prawdziwe intencje człowieka, stając się źródłem tyranii, gdy służy egoizmowi, lub najwyższą cnotą, gdy podporządkowane jest dobru wspólnemu.'
      ],
      mandatoryStarBooks: ['Makbet (William Szekspir)'],
      secondaryBooks: ['Odprawa posłów greckich (Jan Kochanowski)', 'Balladyna (Juliusz Słowacki)'],
      suggestedContexts: [
        { type: 'filozoficzny', description: 'Makiawelizm i traktat Niccolò Machiavellego „Książę” (cel uświęca środki).' }
      ],
      cardinalErrorWarning: 'Makbet nie jest bezwolną marionetką w rękach czarownic – wiedźmy jedynie rozbudzają jego uśpioną ambicję, ale decyzję o zbrodni podejmuje sam!',
      modelOutline: {
        introduction: 'Wstęp: Władza jako pokusa i odpowiedzialność. Teza: Władza weryfikuje kręgosłup moralny jednostki.',
        argument1: 'Argument 1 („Makbet”): Droga tyrana – Makbet ulega żądzy korony, łamie przysięgę lenną i morduje króla Dunkana, co prowadzi go do krwawej dyktatury i obłędu.',
        argument2: 'Argument 2 („Odprawa posłów greckich”): Odpowiedzialność męża stanu – Antenor stawia sprawiedliwość i prawo boskie ponad prywatą, w przeciwieństwie do przekupnego Aleksandra (Parysa).',
        contextSummary: 'Kontekst: Pieśń Kochanowskiego „Wy, którzy pospolitą rzeczą władacie” jako renesansowy manifest etyki władzy.',
        conclusion: 'Zakończenie: Władza bez moralności niszczy państwo i samego władcę.'
      }
    },
    ckeKeyCriteria: ['4 pkt – kompletny konspekt zestawiający antytezą Makbeta (tyrania) z Antenorem (odpowiedzialność).'],
    explanation: 'Doskonałe połączenie dramatu elżbietańskiego z renesansowym dramatem humanistycznym. Uwaga CKE: Makbet stanowi obowiązkową lekturę z gwiazdką na PP, natomiast Odprawa posłów greckich w noweli MEN pełni funkcję drugiego utworu literackiego / poziomu rozszerzonego.',
    tags: ['konspekt', 'Makbet', 'Kochanowski', 'władza'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_010',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Kryterium spójności i łączniki międzyakapitowe',
    question: 'Zaproponuj 2 dojrzałe sformułowania łączące akapit o Wokulskim z akapitem o Raskolnikowie w wypracowaniu o sprzecznościach natury ludzkiej.',
    points: 2,
    correctAnswerText: '1. „O ile u Wokulskiego wewnętrzne pęknięcie miało podłoże emocjonalno-społeczne, o tyle w przypadku Rodiona Raskolnikowa źródłem sprzeczności stała się pycha intelektualna i próba przekroczenia norm moralnych”.\n2. „Podobny dramat rozdarcia między wzniosłą ideą a ułomnością ludzkiej psychiki odnaleźć można w prozie Fiodora Dostojewskiego”.',
    ckeKeyCriteria: ['2 pkt – płynne przejście myślowe z porównaniem założeń obu postaci.'],
    explanation: 'Płynne łączniki gwarantują maksymalną liczbę punktów za spójność tekstu.',
    tags: ['spójność', 'kompozycja', 'łączniki'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T18_011',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Miasto – labirynt czy przestrzeń szans?',
    question: 'Zbuduj plan wypracowania: „Przestrzeń miejska i jej wpływ na losy bohaterów”. Wykorzystaj obraz Warszawy w „Lalce” oraz Petersburga w „Zbrodni i karze”.',
    points: 4,
    essayBlueprint: {
      themeNumber: 1,
      promptText: 'Przestrzeń miejska i jej wpływ na losy bohaterów.',
      recommendedTheses: [
        'Wielkie miasto XIX wieku nie jest jedynie obojętnym tłem wydarzeń, lecz aktywną przestrzenią alienacji, która potęguje rozwarstwienie społeczne i popycha jednostkę do zbrodni lub rezygnacji.'
      ],
      mandatoryStarBooks: ['Lalka (Bolesław Prus)', 'Zbrodnia i kara (Fiodor Dostojewski)'],
      secondaryBooks: ['Przedwiośnie (Stefan Żeromski)'],
      suggestedContexts: [
        { type: 'kulturowy', description: 'Koncepcja flâneura (miejskiego spacerowicza) u Charles’a Baudelaire’a.' }
      ],
      cardinalErrorWarning: 'Powiśle w Lalce to dzielnica nędzy i rozkładu biologicznego (śmieci, chory koń, prostytutki), a nie dzielnica eleganckich kawiarni!',
      modelOutline: {
        introduction: 'Wstęp: Mit i anty-mit metropolii w dobie rewolucji przemysłowej. Teza o destrukcyjnym wpływie miasta na kondycję psychiczną bohatera.',
        argument1: 'Argument 1 („Lalka”): Kontrast społeczny Warszawy – salonowe Krakowskie Przedmieście i Łazienki zderzone z rynsztokiem i beznadzieją Powiśla budzą w Wokulskim rozpacz i poczucie bezsensu filantropii.',
        argument2: 'Argument 2 („Zbrodnia i kara”): Duszny, żółty Petersburg pełen pijaków, ciasnych izb przypominających szafy (pokój Raskolnikowa) staje się współsprawcą zbrodni, doprowadzając Rodiona do gorączki i obłędu.',
        contextSummary: 'Kontekst: Naturalizm Emile’a Zoli – determinizm środowiskowy kształtujący zachowania człowieka.',
        conclusion: 'Zakończenie: Miasto XIX wieku staje się metaforą kryzysu cywilizacji i samotności w tłumie.'
      }
    },
    ckeKeyCriteria: ['4 pkt – doskonała analiza przestrzeni Powiśla i Petersburga jako katalizatorów stanów psychicznych.'],
    explanation: 'Temat przestrzeni miejskiej pojawił się na maturze w czerwcu 2024 roku.',
    tags: ['konspekt', 'miasto', 'Lalka', 'Zbrodnia i kara'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_012',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'single_choice',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Objętość wypracowania a kryteria CKE',
    question: 'Jaki jest minimalny limit słów w wypracowaniu maturalnym w Formule 2023, poniżej którego praca podlega obniżeniu punktacji za kompozycję i styl?',
    options: [
      '200 słów',
      '250 słów',
      '300 słów',
      '400 słów'
    ],
    correctOptionIndex: 2,
    points: 1,
    explanation: 'Zgodnie z Informatorem CKE Formuła 2023 wypracowanie musi liczyć minimum 300 słów.',
    tags: ['zasady CKE', 'limit słów'],
    difficulty: 'podstawowa'
  },
  {
    id: 'POL_P3_T18_013',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Postawa wobec cierpienia i zła',
    question: 'Opracuj plan rozprawki: „Człowiek w obliczu cierpienia”. Zestaw postawę biblijnego Hioba z postawą Jana Kochanowskiego w „Trenach”.',
    points: 4,
    essayBlueprint: {
      themeNumber: 2,
      promptText: 'Człowiek w obliczu cierpienia.',
      recommendedTheses: [
        'Niewytłumaczalne cierpienie burzy ludzkie poczucie sprawiedliwości świata, zmuszając człowieka do przewartościowania wiary i odnalezienia nowej pokory.'
      ],
      mandatoryStarBooks: ['Księga Hioba (Biblia)', 'Treny (Jan Kochanowski)'],
      secondaryBooks: ['Dżuma (Albert Camus)'],
      suggestedContexts: [
        { type: 'filozoficzny', description: 'Problem teodycei (skąd zło na świecie rządzonym przez dobrego Boga).' }
      ],
      cardinalErrorWarning: 'Hiob nie złorzeczył Bogu, lecz kwestionował fałszywe oskarżenia przyjaciół (Elifaza, Bildada), którzy twierdzili, że cierpi za grzechy.',
      modelOutline: {
        introduction: 'Wstęp: Cierpienie jako uniwersalny problem teologiczny i filozoficzny. Teza o kryzysie i oczyszczeniu przez ból.',
        argument1: 'Argument 1 („Księga Hioba”): Hiob traci majątek, dzieci i zdrowie, lecz odrzuca łatwe pocieszenia; w dialogu z Bogiem zyskuje świadomość nieskończoności boskich wyroków.',
        argument2: 'Argument 2 („Treny”): Kochanowski po śmierci Urszulki podważa mądrość stoicką i wiarę w ład stworzenia; ukojenie przynosi dopiero Tren XIX i chrześcijańska nadzieja na spotkanie w zaświatach.',
        contextSummary: 'Kontekst: Pytanie o teodyceę w filozofii Leibniza – pogodzenie obecności cierpienia z boską opatrznością.',
        conclusion: 'Zakończenie: Cierpienie uczy pokory wobec tajemnicy istnienia i weryfikuje autentyczność ludzkiej wiary.'
      }
    },
    ckeKeyCriteria: ['4 pkt – spójny konspekt z głęboką analizą teologiczno-filozoficzną Hioba i Kochanowskiego.'],
    explanation: 'Doskonałe wykorzystanie motywu biblijnego i renesansowego.',
    tags: ['konspekt', 'Hiob', 'Kochanowski', 'cierpienie'],
    difficulty: 'zaawansowana'
  },
  {
    id: 'POL_P3_T18_014',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'short_open',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Zasada gradacji argumentów w konspekcie',
    question: 'Na czym polega zasada gradacji argumentów w wypracowaniu maturalnym i dlaczego warto ją stosować?',
    points: 2,
    correctAnswerText: 'Zasada gradacji polega na uporządkowaniu argumentów od najprostszego/najbardziej oczywistego do najgłębszego i najbardziej przekonującego (gradacja rosnąca). Sprawia to, że wywód nabiera dynamiki retorycznej, a punkt kulminacyjny przypada tuż przed syntezą w zakończeniu.',
    ckeKeyCriteria: ['2 pkt – wyjaśnienie uporządkowania rosnącego argumentów i korzyści retorycznych.'],
    explanation: 'Gradacja argumentów świadczy o wysokiej dojrzałości kompozycyjnej ucznia.',
    tags: ['gradacja', 'kompozycja', 'retoryka'],
    difficulty: 'srednia'
  },
  {
    id: 'POL_P3_T18_015',
    part: 3,
    partName: 'Warsztat wypracowania',
    taskType: 'essay_blueprint',
    granularType: 'T18_konspekt_rozprawki',
    title: 'Konspekt wypracowania: Marzenia a konfrontacja z rzeczywistością',
    question: 'Zbuduj plan wypracowania: „Marzenia o lepszym świecie a zderzenie z rzeczywistością”. Odwołaj się do mitu o szklanych domach w „Przedwiośniu” oraz do „Kordiana”.',
    points: 4,
    essayBlueprint: {
      themeNumber: 1,
      promptText: 'Marzenia o lepszym świecie a zderzenie z rzeczywistością.',
      recommendedTheses: [
        'Utopijne wizje idealnego świata rozbijają się o twarde realia ekonomiczne i polityczne, stając się źródłem gorzkiego rozczarowania, lecz jednocześnie zmuszają bohatera do dojrzałości.'
      ],
      mandatoryStarBooks: ['Przedwiośnie (Stefan Żeromski)', 'Kordian (Juliusz Słowacki)'],
      secondaryBooks: ['Lalka (Bolesław Prus)'],
      suggestedContexts: [
        { type: 'historyczny', description: 'Sytuacja geopolityczna i gospodarcza II Rzeczypospolitej po 1918 roku.' }
      ],
      cardinalErrorWarning: 'Szklane domy były opowieścią Seweryna Baryki, a nie urojeniem Cezarego. Cezary po przybyciu do Polski zderza się z błotem i nędzą przygranicznego miasteczka.',
      modelOutline: {
        introduction: 'Wstęp: Utopie literackie a rzeczywistość. Teza o bolesnym procesie odzierania młodzieńczych marzeń ze złudzeń.',
        argument1: 'Argument 1 („Przedwiośnie”): Szklane domy jako symbol cywilizacyjnego skoku Polski zderzone z nędzą Warszawy, bezrobociem i konfliktami klasowymi, co prowadzi Cezarego Barykę do marszu na Belweder.',
        argument2: 'Argument 2 („Kordian”): Poszukiwanie idei wielkiej – wędrówka po Europie (Londyn, Dover, Włochy, Watykan) obnaża cynizm i wszechwładzę pieniądza; Kordian na Mont Blanc tworzy koncepcję Winkelrieda, która również ponosi klęskę w zderzeniu ze strachem i imaginacją.',
        contextSummary: 'Kontekst: Romantyczny winkelriedyzm a pozytywistyczna praca u podstaw – dwie przeciwstawne drogi ratowania ojczyzny.',
        conclusion: 'Zakończenie: Zderzenie z rzeczywistością jest bolesne, lecz niezbędne dla ukształtowania odpowiedzialnego obywatela.'
      }
    },
    ckeKeyCriteria: ['4 pkt – wzorcowy plan łączący dramat romantyczny z powieścią dwudziestolecia międzywojennego.'],
    explanation: 'Klasyczny temat maturalny sprawdzający znajomość Kordiana i Przedwiośnia.',
    tags: ['konspekt', 'Przedwiośnie', 'Kordian', 'marzenia'],
    difficulty: 'zaawansowana'
  }
];
