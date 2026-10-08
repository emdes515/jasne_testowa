import { PolishLesson } from '../../types/lessonTypes';

export const POLISH_LESSONS: PolishLesson[] = [
  // =========================================================================
  // MODUŁ I: CZĘŚĆ 1 CKE – JĘZYK POLSKI W UŻYCIU & NOTATKA SYNTETYZUJĄCA
  // =========================================================================
  {
    id: 'lekcja-1',
    number: 1,
    title: 'Czytanie Krytyczne i Analiza Tekstu Nieliterackiego',
    subtitle: 'Fakty, opinie, manipulacja semantyczna i zadania Prawda/Fałsz',
    module: 'Język w użyciu',
    durationMinutes: 45,
    introduction: {
      lead: 'Część 1 matury (Zeszyt 1) rozpoczyna się od dwóch tekstów popularnonaukowych lub publicystycznych. Ta 45-minutowa lekcja nauczy Cię, jak w 12 minut bezbłędnie zidentyfikować tezę autorów i nie wpaść w pułapki zadań Prawda/Fałsz.',
      objectives: [
        'Odróżnianie obiektywnych faktów od subiektywnych opinii i ocen publicystycznych.',
        'Wychwytywanie manipulacji semantycznych i nadinterpretacji w zadaniach P/F.',
        'Szybka technika czytania analitycznego z ołówkiem w ręku (metoda słów-kluczy).'
      ],
      theoryPoints: [
        {
          title: 'Fakt a Opinia w Arkuszu CKE',
          content: 'Fakt to informacja sprawdzalna empirycznie lub historycznie (np. „turystyka stanowi 10% globalnego PKB”). Opinia to wartościowanie autora (np. „masowa turystyka degraduje duszę człowieka”). W zadaniach P/F egzaminatorzy często zamieniają opinię autora w stwierdzenie kategoryczne lub przypisują mu tezę, której w tekście nie postawił.'
        },
        {
          title: 'Zasada dosłowności i kontekstu',
          content: 'Odpowiadając na pytania z Części 1, bazujesz WYŁĄCZNIE na dołączonym fragmencie. Nie dopowiadaj własnej wiedzy ogólnej. Jeśli stwierdzenie w tabeli brzmi rozsądnie, ale tekst o tym milczy – odpowiedź brzmi: FAŁSZ.'
        }
      ],
      ckeExaminerTips: [
        'Zwracaj uwagę na kwantyfikatory: słowa „zawsze”, „nigdy”, „wszyscy”, „wyłącznie” w 90% przypadków oznaczają zdanie FAŁSZYWE w kluczu CKE.',
        'Nie czytaj najpierw całego tekstu – przeczytaj pierwsze dwa pytania, a dopiero potem zacznij lekturę akapitów.'
      ],
      gatekeeper: {
        question: 'W zadaniu Prawda/Fałsz w arkuszu CKE pojawia się stwierdzenie zawierające słowo „zawsze” lub „wyłącznie”. Jak oceni je klucz CKE, jeśli w tekście padło sformułowanie „często”?',
        options: [
          'PRAWDA – autor uważa zjawisko za powszechne, więc dopuszcza się uogólnienie.',
          'FAŁSZ – kwantyfikator skrajny („zawsze”) wypacza sens tekstu źródłowego („często”).',
          'PRAWDA – jeśli ogólna wymowa tekstu jest zgodna z intuicją czytelnika.',
          'Nie da się tego rozstrzygnąć bez znajomości biografii autora.'
        ],
        correctIndex: 1,
        explanation: 'Klucz CKE opiera się na żelaznej dosłowności: słowo „często” nie jest tożsame ze słowem „zawsze”. Zastąpienie określenia relatywnego kwantyfikatorem kategorycznym czyni zdanie FAŁSZYWYM.',
        hint: 'Zwróć uwagę na patent egzaminatora o kwantyfikatorach skrajnych („zawsze”, „nigdy”).'
      }
    },
    taskIds: ['pol-p1-001', 'pol-p1-007'],
    summary: {
      keyTakeaways: [
        'Zadania P/F sprawdzają wierność tekstowi źródłowemu, a nie Twoją wiedzę pozatekstową.',
        'Uważaj na zniekształcenia skrajne: „często” to nie to samo co „zawsze”.'
      ],
      reflection: 'Przeanalizuj dowolny artykuł prasowy i podkreśl na czerwono opinie, a na zielono fakty.'
    }
  },
  {
    id: 'lekcja-2',
    number: 2,
    title: 'Retoryka, Środki Stylistyczne i Funkcje Języka',
    subtitle: 'Funkcja impresywna, poznawcza, perswazyjna i rola figur stylistycznych',
    module: 'Język w użyciu',
    durationMinutes: 45,
    introduction: {
      lead: 'W każdym arkuszu CKE pojawia się pytanie o funkcję językową lub zabieg retoryczny. Ta lekcja da Ci niezawodny algorytm rozpoznawania funkcji i poprawnego formułowania odpowiedzi za pełen punkt.',
      objectives: [
        'Błyskawiczne rozpoznawanie funkcji językowych: impresywnej, poznawczej, ekspresywnej i fatycznej.',
        'Nazywanie zabiegów retorycznych (pytanie retoryczne, anafora, antyteza, apostrofa).',
        'Poprawna formuła odpowiedzi: NAZWA ŚRODKA + JEGO FUNKCJA W TEKŚCIE.'
      ],
      theoryPoints: [
        {
          title: 'Wielka Czwórka Funkcji Językowych',
          content: '1. Impresywna (apelatywna): nakłanianie odbiorcy (tryb rozkazujący, wołacz, apele).\n2. Poznawcza (informacyjna): przekaz obiektywnych danych i definicji (styl neutralny, 3. osoba).\n3. Ekspresywna: wyrażanie emocji nadawcy (wykrzyknienia, epitety wartościujące).\n4. Fatyczna: podtrzymanie kontaktu („wiesz?”, „zauważmy”, „halo”).'
        },
        {
          title: 'Żelazna reguła punktowania: Nazwa + Funkcja',
          content: 'CKE nie przyznaje punktu za samo nazwanie środka (np. „pytanie retoryczne”) bez określenia jego roli. Funkcja musi odnosić się do sensu tekstu: „aby zmusić odbiorcę do refleksji nad...”.'
        }
      ],
      ckeExaminerTips: [
        'Jeśli w pytaniu pada czasownik w 1. os. l. mn. („spójrzmy”, „zastanówmy się”), jest to zabieg inkluzywny (budowanie wspólnoty z czytelnikiem) w ramach funkcji impresywnej.'
      ],
      gatekeeper: {
        question: 'Jaka formuła odpowiedzi w pytaniu otwartym o zabieg retoryczny gwarantuje pełen punkt w kluczu CKE?',
        options: [
          'Podanie wyłącznie poprawnej nazwy środka (np. „pytanie retoryczne”).',
          'Przepisanie całego zdania z tekstu w cudzysłowie bez nazywania zabiegu.',
          'Poprawna nazwa środka ORAZ określenie jego konkretnej funkcji w budowaniu sensu wypowiedzi.',
          'Opisanie własnych emocji, jakie to zdanie wywołało u czytelnika.'
        ],
        correctIndex: 2,
        explanation: 'Egzaminator CKE nigdy nie przyznaje pełnej noty za samą nazwę środka. Wymagana jest formuła dwuczłonowa: NAZWA (np. antyteza) + FUNKCJA W TEKŚCIE (np. uwypuklenie kontrastu między postawą A i B).',
        hint: 'Kluczowa zasada z teorii: samo nazwanie środka to za mało!'
      }
    },
    taskIds: ['pol-p1-003', 'pol-p1-004'],
    summary: {
      keyTakeaways: [
        'Funkcja tekstu zależy od celu nadawcy, a nie od tematu tekstu.',
        'Zawsze uzasadniaj funkcję środka stylistycznego konkretnym cytatem lub parafrazą myśli.'
      ],
      reflection: 'Zwróć uwagę na reklamy w internecie – która funkcja językowa w nich dominuje?'
    }
  },
  {
    id: 'lekcja-3',
    number: 3,
    title: 'Konfrontacja Stanowisk Autorów',
    subtitle: 'Pytania typu: „Czy autor 1 zgodziłby się z autorem 2? Uzasadnij”',
    module: 'Język w użyciu',
    durationMinutes: 45,
    introduction: {
      lead: 'Zadanie konfrontacyjne łączy oba teksty Zeszytu 1. Egzaminator bada Twoją umiejętność zestawienia dwóch perspektyw badawczych. Poznaj schemat konstrukcji odpowiedzi, który gwarantuje punkt.',
      objectives: [
        'Identyfikacja punktu spornego lub wspólnego mianownika obu tekstów.',
        'Budowanie precyzyjnego uzasadnienia w formule: Teza ➔ Argument Tekstu 1 ➔ Kontrargument Tekstu 2.',
        'Unikanie powierzchownych odpowiedzi typu „obaj piszą o turystyce”.'
      ],
      theoryPoints: [
        {
          title: 'Struktura Wzorcowej Odpowiedzi',
          content: 'Krok 1: Jednoznaczna odpowiedź (Tak, zgodziłby się / Nie, nie zgodziłby się).\nKrok 2: Przywołanie stanowiska Autora 1 (z parafrazą jego argumentu).\nKrok 3: Wykazanie opozycji lub spójności z poglądem Autora 2.'
        }
      ],
      ckeExaminerTips: [
        'Nigdy nie odpowiadaj samym „Nie, nie zgodziłby się” bez podania racji obu autorów – za brak uzasadnienia z obu tekstów przysługuje 0 punktów.'
      ],
      gatekeeper: {
        question: 'Uczeń w zadaniu konfrontacyjnym napisał: „Nie, autor 1 nie zgodziłby się z autorem 2, ponieważ autor 1 uważa podróże za stratę czasu”. Dlaczego egzaminator CKE przyzna 0 punktów?',
        options: [
          'Ponieważ odpowiedź nie zawiera cytatu po łacinie.',
          'Ponieważ zabrakło uzasadnienia odwołującego się do stanowiska Autora 2 (porównano tylko jeden tekst).',
          'Ponieważ autorzy zawsze zgadzają się ze sobą w arkuszu CKE.',
          'Ponieważ odpowiedź jest zbyt długa.'
        ],
        correctIndex: 1,
        explanation: 'W zadaniach konfrontacyjnych warunkiem koniecznym zdobycia punktu jest wykazanie racji OBU autorów. Odwołanie się wyłącznie do jednego tekstu skutkuje zerem w kluczu CKE.',
        hint: 'Sprawdź wskazówkę egzaminatora o konieczności uwzględnienia obu tekstów.'
      }
    },
    taskIds: ['pol-p1-005', 'pol-p1-002'],
    summary: {
      keyTakeaways: [
        'Autorzy na maturze niemal nigdy nie zgadzają się w 100% – szukaj subtelnych różnic w ich podejściu do problemu.',
        'Używaj łączników logicznych: „natomiast”, „podczas gdy”, „w przeciwieństwie do”.'
      ],
      reflection: 'Gdy czytasz dwie opinie w internecie, zdefiniuj precyzyjnie oś sporu.'
    }
  },
  {
    id: 'lekcja-4',
    number: 4,
    title: 'Notatka Syntetyzująca cz. 1: Anatomia Limitu 60–90 Słów',
    subtitle: 'Kluczowe zadanie Części 1 (aż 4 punkty na 10 możliwych!)',
    module: 'Język w użyciu',
    durationMinutes: 45,
    introduction: {
      lead: 'Notatka syntetyzująca waży 4 punkty (40% Części 1 i 6.7% całej matury). Napisanie 59 słów lub 91 słów grozi utratą punktów za kompozycję! Podczas tej lekcji opanujesz matematyczny schemat 75 słów.',
      objectives: [
        'Zrozumienie oficjalnej matrycy oceniania CKE (0–2 pkt za treść, 0–1 pkt za spójność, 0–1 pkt za język).',
        'Opanowanie żelaznej struktury: Zdanie wprowadzające ➔ Autor 1 ➔ Autor 2 ➔ Syntetyczny wniosek.',
        'Trening liczenia wyrazów i unikania „lania wody”.'
      ],
      theoryPoints: [
        {
          title: 'Oficjalne Kryteria CKE (4 Punkty)',
          content: '• 2 pkt – synteza obu tekstów: przedstawienie stanowiska tekstu 1, tekstu 2 oraz uogólnienia łączącego/dzielącego oba ujęcia.\n• 1 pkt – spójność tekstu ciągłego (brak podpunktów, logiczne powiązania międzyzdaniowe).\n• 1 pkt – poprawność językowa, ortograficzna i interpunkcyjna (maksymalnie 1 błąd każdego typu).'
        },
        {
          title: 'Algorytm 4 Zdań (Idealne 70–80 słów)',
          content: 'Zdanie 1: Obydwa teksty podejmują problematykę [TEMAT], ukazując jej różnorodne oblicza.\nZdanie 2: [Autor 1] zwraca uwagę na [Stanowisko 1], podkreślając, że...\nZdanie 3: Z kolei [Autor 2] akcentuje [Stanowisko 2], dowodząc, iż...\nZdanie 4: Wspólnym wnioskiem płynącym z obu wypowiedzi jest konstatacja, że [SYNTEZA].'
        }
      ],
      ckeExaminerTips: [
        'Nie wprowadzaj własnych opinii! Notatka to relacja z cudzych poglądów, a nie Twoje wypracowanie.',
        'Słowa jednoliterowe („w”, „z”, „i”, „o”) liczą się jako pełne wyrazy!'
      ],
      gatekeeper: {
        question: 'Maturzysta napisał merytoryczną notatkę syntetyzującą, która liczy dokładnie 57 słów. Co zrobi egzaminator CKE zgodnie z oficjalnym schematem oceniania?',
        options: [
          'Zaokrągli liczbę słów w górę i przyzna 4/4 punkty.',
          'Obetnie punkty w kryterium kompozycji i formy, ponieważ tekst nie osiągnął progu 60 słów.',
          'Wstawi błąd kardynalny i wyzeruje cały arkusz.',
          'Przeliczy słowa ponownie, ignorując spójniki „i”, „w”, „z”.'
        ],
        correctIndex: 1,
        explanation: 'Oficjalny limit słów to dokładnie 60–90 wyrazów. Poniżej 60 słów egzaminator ma bezwzględny obowiązek obniżyć ocenę za spójność i kompozycję tekstu.',
        hint: 'Limit CKE ma sztywne widełki: minimum 60, maksimum 90 wyrazów.'
      }
    },
    taskIds: ['pol-p1-006'],
    summary: {
      keyTakeaways: [
        'Zawsze celuj w 75 słów – to daje margines bezpieczeństwa od 60 do 90.',
        'W notatce syntetyzującej musisz zsyntetyzować OBA teksty, nigdy tylko jeden.'
      ],
      reflection: 'Spróbuj streścić w dokładnie 75 słowach dwa ulubione filmy.'
    }
  },
  {
    id: 'lekcja-5',
    number: 5,
    title: 'Notatka Syntetyzująca cz. 2: Warsztat Pisarski',
    subtitle: 'Trening pisania notatki na temat upływu czasu i pamięci kulturowej',
    module: 'Język w użyciu',
    durationMinutes: 45,
    introduction: {
      lead: 'Czas na intensywny trening praktyczny. W tej 45-minutowej sesji przećwiczysz napisanie dwóch pełnych notatek syntetyzujących pod presją limitu słów, korzystając z naszego licznika na żywo.',
      objectives: [
        'Zastosowanie szablonu 4 zdań na autentycznych tekstach z matury 2024.',
        'Eliminacja typowych błędów stylistycznych (powtórzenia słowa „tekst”, „autor”).',
        'Praktyczne sprawdzenie pracy przez AI Tutora.'
      ],
      theoryPoints: [
        {
          title: 'Synonimy do notatki syntetyzującej',
          content: 'Zamiast powtarzać „autor pisze”: autor dowodzi, publicysta argumentuje, badacz wskazuje, eseista akcentuje, autorka unaocznia, konkluduje.'
        }
      ],
      ckeExaminerTips: [
        'Notatka musi być jednym spójnym akapitem. Podział na punkty lub myślniki skutkuje obcięciem punktu za kompozycję.'
      ],
      gatekeeper: {
        question: 'W jaki sposób należy sformatować graficznie notatkę syntetyzującą w arkuszu CKE?',
        options: [
          'W postaci wypunktowanej listy od myślników (1 myślnik = 1 tekst).',
          'W postaci tabeli porównawczej z dwiema kolumnami.',
          'Jako jeden spójny, ciągły akapit tekstu bez podziału na punkty.',
          'W formie dialogu między oboma autorami.'
        ],
        correctIndex: 2,
        explanation: 'Notatka syntetyzująca musi mieć postać tekstu ciągłego (zazwyczaj jednego zwartego akapitu). Użycie punktorów uniemożliwia przyznanie punktu za kompozycję.',
        hint: 'CKE wymaga tekstu ciągłego, a nie notatki konspektowej.'
      }
    },
    taskIds: ['pol-p1-008', 'pol-p1-010'],
    summary: {
      keyTakeaways: [
        'Perfekcyjna notatka to zwięzłość, synteza i zerowa liczba błędów ortograficznych.',
        'Po napisaniu ZAWSZE policz słowa palcem na arkuszu brudnopisu!'
      ],
      reflection: 'Zwróć uwagę na interpunkcję przy imiesłowach przysłówkowych (zawsze po przecinku!).'
    }
  },

  // =========================================================================
  // MODUŁ II: CZĘŚĆ 2 CKE – TEST HISTORYCZNOLITERACKI & LEKTURY Z GWIAZDKĄ
  // =========================================================================
  {
    id: 'lekcja-6',
    number: 6,
    title: 'Starożytność & Biblia',
    subtitle: 'Archetypy, topos vanitas, Księga Koheleta i frazeologia (100% występowalności)',
    module: 'Test historycznoliteracki',
    epoch: 'Starożytność i Biblia',
    durationMinutes: 45,
    introduction: {
      lead: 'Nie było w Formule 2023 arkusza bez zadania z Antyku lub Biblii! To gwarantowany 1–2 punkty na start Testu Historycznoliterackiego. Poznaj fundamenty europejskiej kultury.',
      objectives: [
        'Opanowanie archetypów: prometejski (bunt i altruizm) oraz ikaryjski (marzenia vs realizm).',
        'Topos vanitas z Księgi Koheleta i jego obecność w literaturze kolejnych epok.',
        'Znajomość frazeologizmów biblijnych (hiobowa wieść, sądny dzień, kolos na glinianych nogach).'
      ],
      theoryPoints: [
        {
          title: 'Biblia: Mądrość Koheleta i Hioba',
          content: 'Księga Koheleta przynosi refleksję nad znikomością ziemskich dóbr („Vanitas vanitatum et omnia vanitas”). Księga Hioba to studium niezawinionego cierpienia i bezwarunkowej wierności Bogu (teodycea).'
        },
        {
          title: 'Mitologia grecka: Prometeusz i Antygona',
          content: 'Prometeusz stworzył człowieka z gliny i łez, a wykradając ogień bogom, poświęcił się dla ludzkości. Antygona reprezentuje konflikt tragiczny między prawem boskim (odwiecznym) a stanowionym przez władcę (Kreon).'
        }
      ],
      ckeExaminerTips: [
        'W zadaniach o vanitas egzaminator często prosi o odwołanie do motywu przemijania w Baroku (np. wiersze Naborowskiego lub Sępa Szarzyńskiego).'
      ],
      gatekeeper: {
        question: 'Na czym polega istota konfliktu tragicznego w „Antygonie” Sofoklesa?',
        options: [
          'Na nienawiści Antygony do swojej siostry Ismeny.',
          'Na zderzeniu dwóch równorzędnych racji (prawa boskiego i prawa ludzkiego), gdzie każdy wybór prowadzi do katastrofy.',
          'Na nieszczęśliwym zbiegu okoliczności i pomyłce posłańca.',
          'Na chęci zdobycia władzy królewskiej w Tebach przez Antygonę.'
        ],
        correctIndex: 1,
        explanation: 'Tragizm grecki polega na uwikłaniu bohatera w konieczność wyboru między dwiema równorzędnymi normami moralnymi (pochówek brata wg prawa religijnego vs posłuszeństwo edyktowi Kreona).',
        hint: 'Prawo boskie (moralne) kontra prawo państwowe (władcy).'
      }
    },
    taskIds: ['pol-p2-001', 'pol-p2-002', 'pol-p2-003'],
    summary: {
      keyTakeaways: [
        'Topos vanitas to najczęstszy motyw łączący Antyk/Biblię z Barokiem na maturze.',
        'Archetyp to pradawny wzorzec zachowania utrwalony w kulturze.'
      ],
      reflection: 'Wskaż jeden współczesny film realizujący motyw prometejskiego buntu.'
    }
  },
  {
    id: 'lekcja-7',
    number: 7,
    title: 'Średniowiecze',
    subtitle: 'Motyw Deesis w Bogurodzicy, danse macabre i wzorce parenetyczne',
    module: 'Test historycznoliteracki',
    epoch: 'Średniowiecze',
    durationMinutes: 45,
    introduction: {
      lead: 'Średniowiecze na maturze to przede wszystkim „Bogurodzica” oraz motyw tańca śmierci. W tej 45-minutowej lekcji nauczysz się bezbłędnie analizować najstarszą polską pieśń religijną.',
      objectives: [
        'Precyzyjna definicja motywu Deesis i wskazanie orędowników w Bogurodzicy.',
        'Sens egalitaryzmu śmierci w motywie danse macabre (Rozmowa Mistrza Polikarpa ze Śmiercią).',
        'Wzorce parenetyczne epoki: rycerz (Pieśń o Rolandzie) oraz święty/asceta (Legenda o św. Aleksym).'
      ],
      theoryPoints: [
        {
          title: 'Bogurodzica i Motyw Deesis',
          content: 'Deesis (z gr. modlitwa, prośba) to kompozycja z Chrystusem w centrum oraz Maryją i Janem Chrzcicielem po bokach jako pośrednikami zanoszącymi prośby grzesznych ludzi. W 1. strofie orędowniczką jest Bogurodzica, w 2. – Jan Chrzciciel („Twego dziela Krzciciela”).'
        },
        {
          title: 'Danse Macabre (Taniec Śmierci)',
          content: 'Alegoryczny taniec kościotrupa z przedstawicielami wszystkich stanów społecznych. Przypominał o nieuchronności końca i równości wszystkich ludzi w obliczu zgonu.'
        }
      ],
      ckeExaminerTips: [
        'Pamiętaj o archaizmach w Bogurodzicy: leksykalne („dziela” = dla, „zyszczy” = pozyskaj), fleksyjne („Bogiem sławiena” = przez Boga sławiona).'
      ],
      gatekeeper: {
        question: 'Kto pełni rolę orędowników (pośredników między ludźmi a Chrystusem) w motywie Deesis ukazanym w „Bogurodzicy”?',
        options: [
          'Święty Piotr i Święty Paweł.',
          'Matka Boża (Maryja) oraz Święty Jan Chrzciciel.',
          'Papież i król Polski.',
          'Archanioł Michał i król Dawid.'
        ],
        correctIndex: 1,
        explanation: 'Motyw Deesis to trójpostaciowy układ ikonograficzny i teologiczny: centralna postać Chrystusa Zbawiciela oraz Maryja i Jan Chrzciciel wstawiający się za grzesznymi ludźmi.',
        hint: '1. strofa zwraca się do Maryi, a 2. strofa przywołuje Jana Chrzciciela („Twego dziela Krzciciela”).'
      }
    },
    taskIds: ['pol-p2-004', 'pol-p2-005'],
    summary: {
      keyTakeaways: [
        'Bogurodzica jest pieśnią teocentryczną, realizującą ideę orędownictwa świętych.',
        'Danse macabre przypominał o marności ziemskich urzędów.'
      ],
      reflection: 'Czy współczesna kultura oswoiła śmierć tak jak kultura średniowieczna?'
    }
  },
  {
    id: 'lekcja-8',
    number: 8,
    title: 'Renesans: Jan Kochanowski',
    subtitle: 'Kryzys humanizmu w Trenach, stoicyzm, epikureizm i cnota obywatelska',
    module: 'Test historycznoliteracki',
    epoch: 'Renesans',
    durationMinutes: 45,
    introduction: {
      lead: 'Jan Kochanowski to najważniejszy autor renesansu na maturze. Ta lekcja skupia się na kryzysie filozofii stoickiej ukazanym w „Trenach” – jednym z ulubionych tematów egzaminatorów CKE.',
      objectives: [
        'Zrozumienie załamania stoickiej cnoty i mądrości po śmierci dziecka w Trenach IX, X, XI.',
        'Idea cnoty i odpowiedzialności za ojczyznę w „Odprawie posłów greckich” i „Pieśniach”.',
        'Synkretyzm filozoficzny humanisty (łączenie stoicyzmu z chrześcijaństwem).'
      ],
      theoryPoints: [
        {
          title: 'Ewolucja postawy ojca w Trenach',
          content: 'Początek: rozpacz i żal (Treny I–VIII).\nKulminacja kryzysu: zwątpienie w potęgę Mądrości (Tren IX), kryzys wiary w życie wieczne: „Gdzieśkolwiek jest, jeśliś jest” (Tren X), bunt przeciw cnocie: „Fraszka cnota!” (Tren XI).\nUkojenie i katharsis: Tren XIX (Sen) – matka poety przynosi ukojenie i przywraca wiarę w Boski ład.'
        }
      ],
      ckeExaminerTips: [
        'W zadaniach o Trenach zawsze łącz cierpienie poety z załamaniem jego filozofii życiowej (stoicyzmu) – to właśnie stanowi o wielkości literackiej tego cyklu.'
      ],
      gatekeeper: {
        question: 'W którym z poniższych Trenów Kochanowski przeżywa najgłębszy kryzys wiary w życie pozagrobowe córki („Gdzieśkolwiek jest, jeśliś jest... czyś do raju wzięta?”)?',
        options: [
          'Tren I',
          'Tren X',
          'Tren XIX (Sen)',
          'We Fraszkach'
        ],
        correctIndex: 1,
        explanation: 'Tren X to punkt kulminacyjny wątpliwości religijnych Kochanowskiego – ojciec rozpacza, pytając, gdzie podziewa się dusza Urszulki (w niebie, w czyśćcu, na wyspach szczęśliwych, czy w ogóle przestała istnieć).',
        hint: 'To centralny tren cyklu, w którym poeta pyta: „Orszulo moja wdzięczna, gdzieś mi się podziała?”.'
      }
    },
    taskIds: ['pol-p2-006'],
    summary: {
      keyTakeaways: [
        'Treny to pomnik żałoby wystawiony dziecku (wcześniej treny pisano tylko wielkim wodzom i królom).',
        'Kochanowski udowadnia, że mądrość książkowa nie chroni przed autentycznym ludzkim cierpieniem.'
      ],
      reflection: 'Jak stoicka postawa sprawdza się w dzisiejszym, pełnym stresu świecie?'
    }
  },
  {
    id: 'lekcja-9',
    number: 9,
    title: 'Barok i Oświecenie',
    subtitle: 'Konceptyzm Morsztyna, marność Naborowskiego i dydaktyzm Krasickiego',
    module: 'Test historycznoliteracki',
    epoch: 'Barok',
    durationMinutes: 45,
    introduction: {
      lead: 'Dwie epoki kontrastów: barokowy niepokój metafizyczny i popisy konceptu oraz oświeceniowy rozum i satyra naprawiająca państwo. Lekcja niezbędna do rozwiązania zadań komparatystycznych.',
      objectives: [
        'Rozpoznawanie barokowych środków stylistycznych: koncept, paradoks, antyteza, hiperbola.',
        'Przemijanie i czas w poezji Daniela Naborowskiego („Krótkość żywota”, „Marność”).',
        'Satyry i bajki Ignacego Krasickiego jako narzędzie dydaktyzmu oświeceniowego.'
      ],
      theoryPoints: [
        {
          title: 'Barok: Poezja Konceptu i Sarmatyzm',
          content: 'Jan Andrzej Morsztyn w sonecie „Do trupa” zestawia nieszczęśliwie zakochanego z nieboszczykiem (zaskakujący koncept). Naborowski ukazuje czas jako mgnienie oka („dźwięk, cień, dym, wiatr, błysk”). Z kolei Jan Chryzostom Pasek w „Pamiętnikach” ukazuje mentalność sarmacką: religijność połączoną z pieniactwem i wojaczką.'
        },
        {
          title: 'Oświecenie: Krasicki – Uczyć Bawiąc',
          content: 'Satyry („Do króla”, „Pijaństwo”, „Świat zepsuty”) krytykują wady narodowe: pijaństwo, bezkrytyczne naśladowanie obcej mody, anarchię szlachecką.'
        }
      ],
      ckeExaminerTips: [
        'Zadania z baroku bardzo często łączone są z reprodukcją dzieła sztuki (np. obraz vanitas ze szkieletem gaszącym świecę).'
      ],
      gatekeeper: {
        question: 'Na czym polega koncept w słynnym sonecie „Do trupa” Jana Andrzeja Morsztyna?',
        options: [
          'Na pochwale życia rycerskiego i odwagi żołnierza na polu bitwy.',
          'Na zaskakującym zestawieniu cierpiącego nieszczęśliwie zakochanego ze spokojnym nieboszczykiem.',
          'Na krytyce wad polskiej szlachty w czasach sarmatyzmu.',
          'Na wyznaniu grzechów przed Bogiem w godzinie śmierci.'
        ],
        correctIndex: 1,
        explanation: 'Morsztyn buduje koncept na paradoksie: nieboszczyk zginął od strzały śmierci i zaznaje wiecznego spokoju, podczas gdy zakochany płonie ogniem miłości i cierpi niewypowiedziane męki.',
        hint: 'Koncept łączy dwie skrajności: trupa i żywego człowieka nieszczęśliwie zakochanego.'
      }
    },
    taskIds: ['pol-p2-007', 'pol-p2-016'],
    summary: {
      keyTakeaways: [
        'Koncept miał zadziwić i zachwycić czytelnika nieoczywistym skojarzeniem.',
        'Krasicki krytykował wady ustroju i ludzi, by ratować upadającą Rzeczpospolitą.'
      ],
      reflection: 'Zastanów się, czy współczesne memy internetowe nie pełnią roli oświeceniowych satyr.'
    }
  },
  {
    id: 'lekcja-10',
    number: 10,
    title: 'Romantyzm cz. 1: Adam Mickiewicz – Dziady cz. III',
    subtitle: 'Wielka Improwizacja, prometeizm Konrada, mesjanizm i martyrologia (100% CKE)',
    module: 'Test historycznoliteracki',
    epoch: 'Romantyzm',
    lektura: 'Dziady cz. III (Adam Mickiewicz)',
    durationMinutes: 45,
    introduction: {
      lead: 'Absolutny król polskiej matury! „Dziady cz. III” pojawiają się w 100% arkuszy Formuły 2023. W 45 minut poznasz kluczowe sceny, spory ideowe i zabezpieczysz się przed błędem kardynalnym.',
      objectives: [
        'Analiza Wielkiej Improwizacji: motywacja Konrada, pycha (hybris) i walka o duszę.',
        'Widzenie Księdza Piotra i koncepcja mesjanizmu narodowego („Polska Chrystusem narodów”).',
        'Obraz społeczeństwa polskiego w scenie Salonu Warszawskiego („nasz naród jak lawa...”).'
      ],
      theoryPoints: [
        {
          title: 'Konrad – Bohater Prometejski',
          content: 'Konrad kocha cały naród („Nazywam się Milijon – bo za milijony kocham i cierpię katusze”). Jego bunt jest altruistyczny, ale cechuje go pycha: żąda od Boga władzy absolutnej („rząd dusz”) i zarzuca Mu, że jest tylko mądrością, a nie miłością. Przed wiecznym potępieniem ratuje go to, że bluźnierstwa („Tyś carem!”) dopowiada szatan, a sam bohater mdleje.'
        },
        {
          title: 'Salon Warszawski – Podział Narodu',
          content: 'Przy stoliku: arystokracja, generałowie, damy – mówią po francusku, chwalą cara, nudzą się. Przy drzwiach: młodzież patriotyczna rozmawia o męczeństwie Cichowskiego. Podsumowanie Piotra Wysockiego: lawa z wierzchu zimna i plugawa, lecz wewnątrz gorejąca świętym ogniem.'
        }
      ],
      ckeExaminerTips: [
        'BŁĄD KARDYNALNY: Napisanie, że Konrad osobiście nazwał Boga carem, lub że Ksiądz Piotr potępił Konrada (Ksiądz Piotr modli się o ocalenie jego duszy!).'
      ],
      gatekeeper: {
        question: 'Kto w kulminacyjnym momencie Wielkiej Improwizacji wypowiada ostateczne bluźnierstwo, nazywając Boga „carem”, gdy Konrad mdleje?',
        options: [
          'Sam Konrad, z pełną premedytacją i świadomością.',
          'Głos Diabła (Szatan), dopowiadający słowo zza pleców zemdlonego Konrada.',
          'Ksiądz Piotr wchodzący do celi więziennej.',
          'Widmo Doktora ukazujące się w celi.'
        ],
        correctIndex: 1,
        explanation: 'To kluczowy niuans fabularny: Konrad traci przytomność i nie wypowiada osobiście ostatecznego przekleństwa – dopowiada je Diabeł. Dzięki temu oraz modlitwom Ewy i ks. Piotra dusza Konrada może zostać ocalona.',
        hint: 'Zwróć uwagę na ostrzeżenie przed błędem kardynalnym w teorii lekcji!'
      }
    },
    taskIds: ['pol-p2-008', 'pol-p2-009'],
    summary: {
      keyTakeaways: [
        'Dziady cz. III łączą dramat narodowy z kosmiczną walką dobra ze złem o duszę bohatera.',
        'Mesjanizm mickiewiczowski nadawał sens klęsce powstania listopadowego – cierpienie Polski odkupi wolność innych ludów.'
      ],
      reflection: 'Czy poświęcenie jednostki dla dobra ogółu jest zawsze uzasadnione moralnie?'
    }
  },
  {
    id: 'lekcja-11',
    number: 11,
    title: 'Romantyzm cz. 2: Słowacki i Mickiewicz',
    subtitle: 'Kordian (winkelriedyzm) vs Dziady oraz Pan Tadeusz (Jacek Soplica)',
    module: 'Test historycznoliteracki',
    epoch: 'Romantyzm',
    lektura: 'Kordian (Juliusz Słowacki)',
    durationMinutes: 45,
    introduction: {
      lead: 'Druga wielka lektura romantyczna z gwiazdką. Dowiedz się, dlaczego Słowacki odrzucił bierne cierpienie Mickiewicza i stworzył koncepcję aktywnego czynu zbrojnego – winkelriedyzmu.',
      objectives: [
        'Monolog Kordiana na szczycie Mont Blanc i hasło: „Polska Winkelriedem narodów!”.',
        'Przemiana Kordiana z nieszczęśliwego kochanka w spiskowca i zamachowca.',
        'Jacek Soplica jako wzorzec romantyka-pokutnika (rehabilitacja narodowa).'
      ],
      theoryPoints: [
        {
          title: 'Mesjanizm vs Winkelriedyzm',
          content: 'Mickiewicz (Dziady III): Polska jest Chrystusem narodów – ma cierpieć i czekać na cudowne zmartwychwstanie.\nSłowacki (Kordian): Polska jest Winkelriedem narodów – ma wziąć na swoją pierś ostrza wrogów i aktywnie walczyć z carem, otwierając drogę wolności dla reszty Europy.'
        },
        {
          title: 'Strach i Imaginacja pod sypialnią cara',
          content: 'Kordian nie jest w stanie dokonać zamachu na cara Mikołaja I – paraliżują go personifikacje jego własnych wątpliwości moralnych (Strach i Imaginacja). Upada zemdlony, co obnaża niedojrzałość romantycznego indywidualizmu do realnego czynu politycznego.'
        }
      ],
      ckeExaminerTips: [
        'Zestawienie winkelriedyzmu z mesjanizmem to jedno z klasycznych zadań komparatystycznych CKE za 2 punkty.'
      ],
      gatekeeper: {
        question: 'Czym różni się idea winkelriedyzmu (Słowacki) od idei mesjanizmu (Mickiewicz)?',
        options: [
          'Winkelriedyzm zakłada pogodzenie się z zaborcą i lojalizm.',
          'Winkelriedyzm postuluje aktywną walkę i otwarcie drogi do wolności innym ludom, podczas gdy mesjanizm akcentuje cierpienie i ofiarę na wzór Chrystusa.',
          'Oba pojęcia oznaczają ucieczkę emigracyjną do Paryża.',
          'Winkelriedyzm odnosi się wyłącznie do pracy organicznej w fabrykach.'
        ],
        correctIndex: 1,
        explanation: 'Mesjanizm Mickiewicza to idea „Polski Chrystusem narodów” (cierpienie uszlachetnia). Słowacki w Kordianie na Mont Blanc ogłasza „Polska Winkelriedem narodów” – postulat aktywnego uderzenia w tyrana.',
        hint: 'Szwajcarski bohater Arnold Winkelried wbił włócznie wrogów we własną pierś, aby otworzyć wyłom dla rodaków.'
      }
    },
    taskIds: ['pol-p2-010'],
    summary: {
      keyTakeaways: [
        'Słowacki krytykuje samotną walkę spiskową – do zwycięstwa potrzebny jest cały naród, a nie pojedynczy szaleniec.',
        'Jacek Soplica (Ksiądz Robak) to ewolucja bohatera romantycznego: z dumnego watażki staje się cichym emisariuszem ludu.'
      ],
      reflection: 'Czy cel uświęca środki w walce o wolność ojczyzny?'
    }
  },
  {
    id: 'lekcja-12',
    number: 12,
    title: 'Pozytywizm cz. 1: Bolesław Prus – Lalka',
    subtitle: 'Stanisław Wokulski na pograniczu romantyzmu i pozytywizmu (100% CKE)',
    module: 'Test historycznoliteracki',
    epoch: 'Pozytywizm',
    lektura: 'Lalka (Bolesław Prus)',
    durationMinutes: 45,
    introduction: {
      lead: 'Lalka to najważniejsza powieść polskiego realizmu i absolutny pewniak maturalny. Pasuje do 100% tematów wypracowań w Formule 2023! Ta 45-minutowa lekcja da Ci pełen portret psychologiczny Wokulskiego.',
      objectives: [
        'Wskazanie i uzasadnienie cech romantyka i pozytywisty w osobowości Wokulskiego.',
        'Analiza niszczącej miłości do Izabeli Łęckiej.',
        'Wewnętrzne rozdarcie bohatera i jego próba samobójcza w Skierniewicach.'
      ],
      theoryPoints: [
        {
          title: 'Wokulski jako Bohater Synkretyczny',
          content: 'Romantyk: udział w powstaniu styczniowym (zesłanie na Syberię), idealistyczna miłość do kobiety traktowanej jak bóstwo, samotność, skłonność do rozpaczy i próba samobójcza.\nPozytywista: kult nauki i techniki (wspieranie wynalazców Geista i Ochockiego), przedsiębiorczość, praca organiczna i u podstaw (pomoc prostytutce Mariannie, furmanowi Wysockiemu, rzemieślnikowi Węgiełkowi).'
        }
      ],
      ckeExaminerTips: [
        'BŁĄD KARDYNALNY: Twierdzenie, że Wokulski poślubił Izabelę, lub że z całą pewnością zginął w Zasławiu (Prus celowo pozostawił los Wokulskiego otwarty!).'
      ],
      gatekeeper: {
        question: 'Która z poniższych postaw Stanisława Wokulskiego dowodzi jego korzeni ROMANTYCZNYCH?',
        options: [
          'Założenie spółki handlowej do handlu ze Wschodem i powiększenie majątku.',
          'Finansowanie badań laboratoryjnych profesora Geista w Paryżu.',
          'Udział w powstaniu styczniowym oraz idealistyczna, niszcząca miłość do Izabeli Łęckiej.',
          'Spłacenie długów Tomasza Łęckiego i wykupienie kamienicy.'
        ],
        correctIndex: 2,
        explanation: 'Powstanie styczniowe, zesłanie do Irkucka oraz traktowanie Izabeli jak niedostępnego anioła (idealizm miłosny w duchu Mickiewicza) to czyste cechy romantyka.',
        hint: 'Handel i fabryki to cechy pozytywisty – szukaj walki narodowej i miłości idealnej.'
      }
    },
    taskIds: ['pol-p2-011', 'pol-p2-012'],
    summary: {
      keyTakeaways: [
        'Wokulski przegrał, ponieważ przerósł swoje czasy – arystokracja nim gardziła jako „kupcem”, a pozytywiści potępiali za uganianie się za panną Łęcką.',
        'Lalka to wielka panorama rozpadu więzi społecznych końca XIX wieku.'
      ],
      reflection: 'Czy Wokulski kochał prawdziwą Izabelę, czy jedynie wykreowany przez siebie ideał?'
    }
  },
  {
    id: 'lekcja-13',
    number: 13,
    title: 'Pozytywizm cz. 2: Panorama Społeczna w Lalce',
    subtitle: 'Ignacy Rzecki, arystokracja warszawska, Powiśle i praca organiczna',
    module: 'Test historycznoliteracki',
    epoch: 'Pozytywizm',
    lektura: 'Lalka (Bolesław Prus)',
    durationMinutes: 45,
    introduction: {
      lead: 'Kontynuacja analizy arcydzieła Prusa. Skupimy się na wątkach drugoplanowych, które egzaminatorzy sprawdzają w pytaniach szczegółowych oraz które są doskonałym materiałem na argumenty w wypracowaniu.',
      objectives: [
        'Rola „Pamiętnika starego subiekta” Ignacego Rzeckiego (narracja subiektywna, bonapartyzm).',
        'Krytyka arystokracji (Tomasz Łęcki, Kazimierz Starski, baronostwo Krzeszowscy).',
        'Obraz nędzy na warszawskim Powiślu jako dowód bankructwa programu pozytywistycznego.'
      ],
      theoryPoints: [
        {
          title: 'Ignacy Rzecki – Ostatni Romantyk',
          content: 'Uczestnik Wiosny Ludów na Węgrzech, wierzy w wyzwolenie narodów przez ród Bonapartych. W Warszawie żyje rytmem sklepu i tęsknoty za dawnymi ideałami. Scena z nakręcaniem zabawek w oknie sklepu to wielka metafora teatru świata (theatrum mundi) – ludzie są tylko marionetkami w rękach losu.'
        }
      ],
      ckeExaminerTips: [
        'Pamiętaj o dwóch narratorach w Lalce: obiektywny narrator trzecioosobowy oraz subiektywny narrator pierwszoosobowy w Pamiętniku Rzeckiego.'
      ],
      gatekeeper: {
        question: 'Jaki topos kulturowy realizuje słynna scena z „Lalki”, w której Ignacy Rzecki samotnie nakręca mechaniczne zabawki w oknie sklepu?',
        options: [
          'Topos tyrtejski (wezwanie do walki zbrojnej).',
          'Topos theatrum mundi (świat jako teatr, ludzie jako kukiełki sterowane losem).',
          'Topos arkadyjski (kraina wiecznej szczęśliwości).',
          'Topos labiryntu bez wyjścia.'
        ],
        correctIndex: 1,
        explanation: 'Zabawa lalkami przez Rzeckiego to klasyczny topos theatrum mundi: „Marionetki!... Wszystko marionetki!... Zdaje im się, że robią, co chcą, a robią tylko, co im każe sprężyna”.',
        hint: 'Ludzie jako nakręcane mechaniczne lalki w rękach wyższych sił.'
      }
    },
    taskIds: ['pol-p2-012', 'pol-p3-003'],
    summary: {
      keyTakeaways: [
        'Arystokracja w Lalce to pasożytnicza kasta marnotrawiąca kapitał na podróże i hazard.',
        'Prus udowadnia, że praca u podstaw pojedynczych filantropów to kropla w morzu potrzeb nędzarzy z Powiśla.'
      ],
      reflection: 'Czym różni się podejście Wokulskiego do pomocy ubogim od salonowej filantropii pani Wąsowskiej?'
    }
  },
  {
    id: 'lekcja-14',
    number: 14,
    title: 'Młoda Polska: Stanisław Wyspiański – Wesele',
    subtitle: 'Osoby dramatu, zjawy, chłopi i inteligencja, symbolika Złotego Rogu (100% CKE)',
    module: 'Test historycznoliteracki',
    epoch: 'Młoda Polska',
    lektura: 'Wesele (Stanisław Wyspiański)',
    durationMinutes: 45,
    introduction: {
      lead: 'Najważniejszy dramat narodowy XX wieku. Wesele to bezlitosna diagnoza niemożności zjednoczenia chłopów i inteligencji do walki o wolność. Poznaj każdą zjawę i symbol bronowickiej chaty.',
      objectives: [
        'Dopasowanie zjaw (osób dramatu) do bohaterów realnych i ich psychologiczna interpretacja.',
        'Geneza dramatu: autentyczne wesele poety Lucjana Rydla z Jadwigą Mikołajczykówną.',
        'Kluczowe symbole: Złoty Róg, czapka z pawich piór, kaduceusz, chocholi taniec.'
      ],
      theoryPoints: [
        {
          title: 'Kto komu się ukazuje?',
          content: '• Widmo (malarz Ludwik de Laveaux) ➔ Marysi (niespełniona romantyczna miłość).\n• Stańczyk (błazen zygmuntowski) ➔ Dziennikarzowi (wyrzuty sumienia za uśpienie narodu krakowskim konserwatyzmem, wręcza mu Kaduceusz Polski).\n• Rycerz Czarny (Zawisza Czarny) ➔ Poecie (tęsknota za dawną siłą i czynami bohaterstwa).\n• Hetman (Branicki) ➔ Panu Młodemu (zarzut zdrady własnej szlacheckiej klasy na rzecz chłopomanii).\n• Upiór (Jakub Szela) ➔ Dziadowi (pamięć o krwawej rabacji galicyjskiej z 1846 roku – przepaść między chłopem a panem).\n• Wernyhora (legendarny wieszcz kozacki) ➔ Gospodarzowi (powierza mu Złoty Róg – misję zwołania powstania).'
        }
      ],
      ckeExaminerTips: [
        'BŁĄD KARDYNALNY: Twierdzenie, że powstanie wybuchło i Polacy wygrali, albo że to Gospodarz osobiście zgubił Złoty Róg (zgubił go Jasiek, schylając się po czapkę z pawich piór!).'
      ],
      gatekeeper: {
        question: 'Dlaczego Jasiek gubi Złoty Róg powierzony mu w „Weselu”, co uniemożliwia zwołanie narodowego powstania?',
        options: [
          'Został zaatakowany i obrabowany przez austriackich żołnierzy.',
          'Schylił się po czapkę z pawich piór, którą wiatr strącił mu z głowy (przedłożył próżność nad los ojczyzny).',
          'Upiór Jakuba Szeli wyrwał mu go siłą na rozdrożu.',
          'Zasnął pijany w karczmie u Żyda Jankiela.'
        ],
        correctIndex: 1,
        explanation: '„Miałeś, chamie, złoty róg, ostał ci się ino sznur”. Jasiek schylił się po świecącą czapkę z pawimi piórami (symbol prywaty i próżności), gubiąc bezcenny róg wzywający do czynu.',
        hint: 'Chodzi o słynną scenę z pawim piórem i sznurem.'
      }
    },
    taskIds: ['pol-p2-013', 'pol-p2-014', 'pol-p3-004'],
    summary: {
      keyTakeaways: [
        'Chłopomania inteligencji była powierzchowną modą – inteligenci bali się chłopów i nie potrafili nimi dowodzić.',
        'Chocholi taniec symbolizuje zniewolenie, bezwład i marazm polskiego społeczeństwa.'
      ],
      reflection: 'Co dziś w polskim społeczeństwie pełni rolę „chocholego tańca”?'
    }
  },
  {
    id: 'lekcja-15',
    number: 15,
    title: 'Dwudziestolecie Międzywojenne: Żeromski i Gombrowicz',
    subtitle: 'Przedwiośnie (szklane domy, rewolucja w Baku) oraz Ferdydurke (forma i gęba)',
    module: 'Test historycznoliteracki',
    epoch: 'Dwudziestolecie międzywojenne',
    lektura: 'Przedwiośnie (Stefan Żeromski)',
    durationMinutes: 45,
    introduction: {
      lead: 'Czas odzyskanej niepodległości i bolesnego rozczarowania rzeczywistością II RP. W tej lekcji przeanalizujesz losy Cezarego Baryki oraz filozoficzną satyrę Witolda Gombrowicza.',
      objectives: [
        'Analiza mitu szklanych domów Seweryna Baryki jako utopijnego marzenia o nowoczesnej Polsce.',
        'Doświadczenie krwawej rewolucji bolszewickiej w Baku i jej wpływ na Cezarego Barykę.',
        'Spór o kształt odrodzonej Polski: ewolucja Gajowca vs rewolucja Lulka.'
      ],
      theoryPoints: [
        {
          title: 'Etapy dojrzewania Cezarego Baryki',
          content: '1. Baku: młodzieńcza fascynacja rewolucją, a następnie szok po widoku okrucieństwa i śmierci matki.\n2. Podróż do Polski: ojciec opowiada mu mit o szklanych domach; zderzenie z błotnistym, biednym miasteczkiem granicznym.\n3. Wojna 1920: ochotnicza obrona Warszawy, przyjaźń z Hipolitem Wielosławskim.\n4. Nawłoć: urok beztroskiego życia ziemiańskiego, romans z Laurą Kościeniecką.\n5. Warszawa: marsz na Belweder w finale – gest buntu przeciw bezradności rządu, lecz w odrębnym żołnierskim mundurze.'
        }
      ],
      ckeExaminerTips: [
        'W pytaniach o Przedwiośnie pamiętaj, że marsz na Belweder w finale nie jest jednoznacznym poparciem komunistów – Cezary idzie obok nich, manifestując niezgodę na nędzę robotników.'
      ],
      gatekeeper: {
        question: 'Czym w rzeczywistości okazała się wizja „szklanych domów”, o której Seweryn Baryka opowiadał synowi w drodze do odrodzonej Polski?',
        options: [
          'Prawdziwym osiedlem robotniczym wybudowanym w centrum Warszawy.',
          'Utopijnym mitem i marzeniem starego ojca, brutalnie skontrastowanym z błotem i nędzą przygranicznego miasteczka.',
          'Ostrzeżeniem przed zgubnym wpływem zachodnich technologii.',
          'Projektem architektonicznym stworzonym przez komunistów w Baku.'
        ],
        correctIndex: 1,
        explanation: 'Szklane domy to mit kompensacyjny – idealistyczna baśń schorowanego ojca o czystej, cywilizowanej i równej Polsce. Cezary po przekroczeniu granicy widzi nędzę, brud i walące się rudery.',
        hint: 'Pomyśl o rozczarowaniu Cezarego Baryki po dotarciu do granicy polskiej.'
      }
    },
    taskIds: ['pol-p3-005'],
    summary: {
      keyTakeaways: [
        'Przedwiośnie to powieść rozrachunkowa z polską niepodległością – ostrzeżenie przed niebezpieczeństwem rewolucji społecznej.',
        'W Ferdydurke człowiek nigdy nie jest w pełni autentyczny – zawsze podlega presji Formy narzucanej przez innych.'
      ],
      reflection: 'Dlaczego ludzie ulegają utopijnym ideologiom w czasach kryzysu?'
    }
  },
  {
    id: 'lekcja-16',
    number: 16,
    title: 'Wojna i Okupacja: Literatura Obozowa',
    subtitle: 'Inny świat Gustawa Herlinga-Grudzińskiego oraz opowiadania Tadeusza Borowskiego',
    module: 'Test historycznoliteracki',
    epoch: 'Wojna i okupacja',
    lektura: 'Inny świat (Gustaw Herling-Grudziński)',
    durationMinutes: 45,
    introduction: {
      lead: 'Wstrząsające świadectwa totalitaryzmu XX wieku. Ta lekcja nauczy Cię kluczowych pojęć maturalnych: człowieka zlagrowanego, człowieka złagrowanego oraz załamania dekalogu w warunkach nieludzkich.',
      objectives: [
        'Zdefiniowanie pojęcia „człowieka złagrowanego” (Herling-Grudziński) i „człowieka zlagrowanego” (Borowski).',
        'Analiza motta Innego świata: „Tu otwierał się inny, odrębny świat...”.',
        'Postawy ocalenia człowieczeństwa: Michaił Kostylew, Natalia Lwowna.'
      ],
      theoryPoints: [
        {
          title: 'Łagier wg Gustawa Herlinga-Grudzińskiego',
          content: 'Sowiecki Gułag (Jercewo) to system zaprojektowany do systematycznego łamania kręgosłupa moralnego więźnia przez głód, katorżniczą pracę w lesie i donosicielstwo. Autor formułuje tezę: „Człowiek jest ludzki w ludzkich warunkach”. Mimo to dowodzi, że jednostka może ocalić godność – jak Kostylew, który opalał rękę w ogniu, by nie pracować dla oprawców, a w finale wybrał samobójstwo.'
        },
        {
          title: 'Człowiek Zlagrowany u Tadeusza Borowskiego',
          content: 'W opowiadaniach oświęcimskich („Proszę państwa do gazu”) Borowski ukazuje proces biologizacji człowieka – w walce o przetrwanie więzień przejmuje moralność obozową, obojętnieje na los idących do komory gazowej i sam staje się trybikiem fabryki śmierci.'
        }
      ],
      ckeExaminerTips: [
        'W wypracowaniu na temat wojny pamiętaj o rozróżnieniu łagru (sowieckiego obozu pracy przymusowej) od lagru (niemieckiego obozu koncentracyjnego i zagłady).'
      ],
      gatekeeper: {
        question: 'W jaki sposób inżynier Michaił Kostylew w „Innym świecie” protestował przeciwko zbrodniczemu systemowi sowieckiego łagru?',
        options: [
          'Zorganizował zbrojne powstanie więźniów w lesie.',
          'Świadomie opalał własną rękę w ogniu, aby nie pracować dla swoich oprawców.',
          'Złożył pisemną skargę do komendanta obozu w Jercewie.',
          'Uciekł z obozu i przedostał się do Armii Andersa.'
        ],
        correctIndex: 1,
        explanation: 'Kostylew potajemnie przypalał rękę w ogniu, wybierając fizyczne cierpienie, byle tylko nie oddawać ani grama pracy na rzecz nieludzkiego imperium Gułagu. Ostatecznie odebrał sobie życie, by ocalić resztki wolnej woli.',
        hint: 'Szukaj bohaterskiego aktu buntu poprzez samookaleczenie w imię ocalenia duszy.'
      }
    },
    taskIds: ['pol-p2-015'],
    summary: {
      keyTakeaways: [
        'Literatura obozowa odrzuca tradycyjny heroizm na rzecz bolesnej prawdy o kruchości ludzkiej moralności pod presją głodu.',
        'W Innym świecie ostatnia scena (odmowa powiedzenia „Rozumiem” byłemu donosicielowi w Rzymie) symbolizuje powrót do praw rządzących światem ludzi wolnych.'
      ],
      reflection: 'Czy w sytuacjach skrajnych obowiązują te same normy etyczne co w czasie pokoju?'
    }
  },
  {
    id: 'lekcja-17',
    number: 17,
    title: 'Wojna i Okupacja: Zagłada i Pamięć',
    subtitle: 'Hanna Krall – Zdążyć przed Panem Bogiem (Marek Edelman i powstanie w getcie)',
    module: 'Test historycznoliteracki',
    epoch: 'Wojna i okupacja',
    lektura: 'Zdążyć przed Panem Bogiem (Hanna Krall)',
    durationMinutes: 45,
    introduction: {
      lead: 'Reportaż, który zmienił polskie myślenie o powstaniu w getcie warszawskim. Poznaj unikalną perspektywę Marka Edelmana – ostatniego przywódcy ŻOB-u i powojennego kardiochirurga.',
      objectives: [
        'Zrozumienie deheroizacji powstania w getcie – walka o godną śmierć z bronią w ręku.',
        'Metafora wyścigu z Panem Bogiem: praca kardiochirurga ratującego ludzkie życie na stole operacyjnym.',
        'Postawy w getcie: Anielewicz, Pola Lifszyc, Krystyna Krahelska.'
      ],
      theoryPoints: [
        {
          title: 'Wyścig z Bogiem',
          content: 'Marek Edelman jako lekarz uważa swoją misję za kontynuację walki z czasów getta: Pan Bóg chce zdmuchnąć świeczkę ludzkiego życia, a zadaniem lekarza jest zdążyć przed Nim i osłonić płomień choćby na chwilę.'
        }
      ],
      ckeExaminerTips: [
        'Zwróć uwagę na formę reportażu: nieliniowy montaż scen, lapidarny, suchy styl Edelmana, brak patosu i heroizmu.'
      ],
      gatekeeper: {
        question: 'Na czym polega metafora „wyścigu z Panem Bogiem” w zawodowym życiu powojennym Marka Edelmana?',
        options: [
          'Na rywalizacji naukowej o nagrodę Nobla z medycyny.',
          'Na pracy kardiochirurga, który na stole operacyjnym stara się uratować gasnące życie pacjenta, zanim Bóg zdmuchnie płomień świecy.',
          'Na próbie zbudowania świątyni w centrum zniszczonej Warszawy.',
          'Na ucieczce z płonącego getta kanałami.'
        ],
        correctIndex: 1,
        explanation: 'Edelman po wojnie został lekarzem kardiochirurgiem. Uważał, że jego rola to ciągły wyścig ze Stwórcą: Bóg próbuje zgasić ludzkie życie, a lekarz ma za zadanie wygrać ten wyścig i uratować człowieka.',
        hint: 'Metafora dotyczy operacji serca i ratowania życia pacjentów.'
      }
    },
    taskIds: ['pol-p3-002'],
    summary: {
      keyTakeaways: [
        'Dla Edelmana śmierć w komorze gazowej nie była gorsza od śmierci z pistoletem w ręku – każda śmierć jest równa.',
        'Prawdziwym heroizmem było ocalenie godności drugiego człowieka.'
      ],
      reflection: 'Dlaczego prawda o tragedii bywa bardziej poruszająca bez patetycznych słów?'
    }
  },
  {
    id: 'lekcja-18',
    number: 18,
    title: 'Współczesność: Parabola Zła i Bunt',
    subtitle: 'Albert Camus (Dżuma), Sławomir Mrożek (Tango) oraz George Orwell (Rok 1984)',
    module: 'Test historycznoliteracki',
    epoch: 'Współczesność',
    durationMinutes: 45,
    introduction: {
      lead: 'Wielka trójka lektur współczesnych. Powieść paraboliczna, groteska dramaturgiczna i antyutopia totalitarna. Ta lekcja przygotuje Cię do zadań sprawdzających diagnozę współczesnego świata.',
      objectives: [
        'Odczytanie wielopoziomowej paraboli w „Dżumie” (zaraza, zło moralne, wojna, absurd istnienia).',
        'Postawa laickiej świętości doktora Bernarda Rieux i Tarrou.',
        '„Tango” Mrożka: bunt Artura przeciw anarchii i narodziny prymitywnego totalitaryzmu (Edek).'
      ],
      theoryPoints: [
        {
          title: 'Dżuma Camusa – Heroizm Codzienności',
          content: 'Doktor Rieux nie uważa się za bohatera – z dżumą walczy z poczucia zwykłej ludzkiej przyzwoitości. Finałowa sentencja przypomina, że bakcyl dżumy nigdy nie umiera, lecz może powrócić ku nieszczęściu ludzi.'
        },
        {
          title: 'Tango Mrożka – Groteskowy Bunt',
          content: 'Artur buntuje się przeciw brakowi jakichkolwiek norm u rodziców (Stomila i Eleonory). Próbuje przywrócić stare formy (ślub z Alą), lecz ostatecznie ginie z rąk chamskiego Edka, który przejmuje rządy siły i tańczy tango La Cumparsita nad trupem Artura.'
        }
      ],
      ckeExaminerTips: [
        '„Dżuma” i „Tango” doskonale sprawdzają się w wypracowaniach na temat postaw ludzi wobec zła, buntu pokoleniowego i utraty wartości.'
      ],
      gatekeeper: {
        question: 'Czym w powieści parabolicznej Alberta Camusa jest tytułowa „dżuma” atakująca miasto Oran?',
        options: [
          'Wyłącznie autentyczną chorobą zakaźną bez żadnych podtekstów.',
          'Wieloznaczną metaforą zła: faszyzmu/wojny, absurdalności ludzkiej egzystencji oraz pierwiastka destrukcji tkwiącego w każdym człowieku.',
          'Karą zesłaną przez Boga za grzechy mieszkańców.',
          'Eksperymentem medycznym przeprowadzonym przez doktora Rieux.'
        ],
        correctIndex: 1,
        explanation: 'Jako powieść-parabola „Dżuma” ma sens dosłowny (epidemia dżumy dymieniczej) oraz uniwersalny sens przenośny: zło w świecie, wojna, brunatna zaraza totalitaryzmu i absurd cierpienia niewinnych.',
        hint: 'Parabola zawsze posiada drugie, głębsze dno filozoficzne i metaforyczne.'
      }
    },
    taskIds: ['pol-p3-001', 'pol-p3-005'],
    summary: {
      keyTakeaways: [
        'Parabola polega na podporządkowaniu fabuły głębszemu sensowi filozoficznemu i uniwersalnemu.',
        'Współczesność w lekturach CKE przestrzega przed uśpieniem czujności wobec totalitaryzmów.'
      ],
      reflection: 'W jaki sposób bakcyl dżumy uobecnia się w dzisiejszym życiu społecznym?'
    }
  },

  // =========================================================================
  // MODUŁ III: CZĘŚĆ 3 CKE – WARSZTAT WYPRACOWANIA & BŁĘDY KARDYNALNE
  // =========================================================================
  {
    id: 'lekcja-19',
    number: 19,
    title: 'Warsztat Wypracowania cz. 1: Architektura Konspektu',
    subtitle: 'Formułowanie tezy, podział na akapity i spełnienie formalnych kryteriów CKE (35 pkt)',
    module: 'Warsztat wypracowania',
    durationMinutes: 45,
    introduction: {
      lead: 'Wypracowanie decyduje o prawie 60% Twojego wyniku z matury. W tej lekcji poznasz algorytm tworzenia żelaznego konspektu, który eliminuje ryzyko chaosu kompozycyjnego i braku słów.',
      objectives: [
        'Prawidłowe sformułowanie tezy lub hipotezy w odpowiedzi na temat problemowy.',
        'Trójdzielna kompozycja: Wstęp (z tezą) ➔ Argument 1 (lektura z gwiazdką) ➔ Argument 2 (inny utwór) ➔ Kontekst ➔ Zakończenie.',
        'Unikanie streszczania fabuły na rzecz analizy problemowej.'
      ],
      theoryPoints: [
        {
          title: 'Struktura Oceny CKE (35 Punktów)',
          content: '• Spełnienie warunków formalnych (0–1 pkt): odwołanie do lektury obowiązkowej, innego utworu i kontekstu.\n• Kompetencje literackie i kulturowe (0–16 pkt): trafność argumentacji, brak błędów rzeczowych.\n• Kompozycja (0–7 pkt): układ akapitów, spójność logiczna.\n• Język, styl, ortografia i interpunkcja (0–11 pkt).'
        }
      ],
      ckeExaminerTips: [
        'Zawsze pisz wstęp dopiero wtedy, gdy wiesz, co napiszesz w rozwinięciu! Konspekt na brudnopisie to fundament sukcesu.'
      ],
      gatekeeper: {
        question: 'Co grozi maturzyście w kryterium spełnienia warunków formalnych (Część 3), jeśli w wypracowaniu nie odwoła się do żadnego kontekstu?',
        options: [
          'Automatyczny błąd kardynalny i 0/35 punktów.',
          'Utrata punktu formalnego oraz obniżenie punktacji w kryterium kompetencji literackich i kulturowych.',
          'Egzaminator sam dopisze kontekst na podstawie biografii autora.',
          'Żadne konsekwencje – kontekst jest opcjonalny.'
        ],
        correctIndex: 1,
        explanation: 'Przywołanie co najmniej jednego kontekstu jest formalnym wymogiem CKE w poleceniu maturalnym. Jego brak skutkuje bezpośrednią utratą cennych punktów w matrycy oceniania.',
        hint: 'Kontekst to obowiązkowy element polecenia CKE („odwołaj się do wybranego kontekstu”).'
      }
    },
    taskIds: ['pol-p3-001'],
    summary: {
      keyTakeaways: [
        'Każdy akapit rozwinięcia musi zaczynać się od cząstkowej tezy argumentacyjnej, a nie od streszczenia.',
        'Praca bez kontekstu traci punkty w kryterium kompetencji kulturowych.'
      ],
      reflection: 'Zbuduj plan wypracowania na temat: „Samotność jako wybór czy przekleństwo człowieka”.'
    }
  },
  {
    id: 'lekcja-20',
    number: 20,
    title: 'Warsztat Wypracowania cz. 2: Żelazne Lektury Uniwersalne',
    subtitle: 'Jak wykorzystać „Lalkę”, „Dziady cz. III” i „Zbrodnię i karę” w KAŻDYM temacie CKE',
    module: 'Warsztat wypracowania',
    durationMinutes: 45,
    introduction: {
      lead: 'Nie musisz pamiętać 40 lektur, by napisać wypracowanie na 100%. Wystarczą 3 doskonale opanowane dzieła uniwersalne. Pokażemy Ci, jak dopasować Lalkę i Dziady do dowolnego problemu maturalnego.',
      objectives: [
        'Matryca uniwersalności: przyporządkowanie Wokulskiego i Konrada do 10 typowych motywów CKE.',
        'Wątki poboczne w Lalce jako ratunek przy trudnych tematach (praca, przestrzeń, błędy, relacje).',
        'Budowanie wieloaspektowej argumentacji porównawczej.'
      ],
      theoryPoints: [
        {
          title: 'Wokulski Pasuje do Wszystkiego',
          content: '• Sprzeczności ludzkiej natury? Wokulski: romantyk z epoki przedpotopowej i chłodny pozytywista.\n• Bunt i jego skutki? Bunt przeciw arystokracji i konwenansom salonu.\n• Relacja z drugą osobą? Toksyczna miłość do Izabeli vs wierna przyjaźń z Rzeckim.\n• Wpływ przestrzeni? Warszawa Powiśla (ruina) vs Paryż (ład, postęp).\n• Postawy wobec błędów? Zaufanie Starskiemu i próba samobójcza po podsłuchaniu rozmowy w pociągu.'
        }
      ],
      ckeExaminerTips: [
        'Odwołując się do lektury obowiązkowej, musisz wykazać znajomość CAŁEGO utworu, a nie tylko jednego epizodu.'
      ],
      gatekeeper: {
        question: 'W jaki sposób należy przywołać lekturę obowiązkową (np. „Lalkę”) w argumencie wypracowania, by uzyskać najwyższą notę za kompetencje literackie?',
        options: [
          'Szczegółowo streścić pierwsze 5 rozdziałów powieści.',
          'Wykazać funkcjonalną znajomość całego utworu: przeanalizować motywacje bohatera i jego wybory w relacji do problemu postawionego w temacie.',
          'Wypisać imiona wszystkich subiektów pracujących w sklepie Wokulskiego.',
          'Skupić się wyłącznie na opisach strojów Izabeli Łęckiej.'
        ],
        correctIndex: 1,
        explanation: 'CKE surowo karze streszczanie („streszczaństwo”). Najwyższe noty przyznawane są za ujęcie problemowe – gdy uczeń analizuje postawę bohatera i dowodzi słuszności swojej tezy.',
        hint: 'Egzaminator nie chce streszczenia, chce analizy problemowej.'
      }
    },
    taskIds: ['pol-p3-002'],
    summary: {
      keyTakeaways: [
        'Opanowanie Lalki i Dziadów cz. III daje 100% gwarancję posiadania lektury obowiązkowej do każdego tematu.',
        'Zawsze określaj funkcję bohatera w utworze, a nie tylko jego czyny.'
      ],
      reflection: 'Dopasuj Wokulskiego do tematu: „Pieniądze a poczucie szczęścia w życiu człowieka”.'
    }
  },
  {
    id: 'lekcja-21',
    number: 21,
    title: 'Wykrywacz Błędów Kardynalnych (Ochrona przed 0/35 pkt)',
    subtitle: 'Analiza kazusów faktograficznych zerujących całe wypracowanie',
    module: 'Warsztat wypracowania',
    durationMinutes: 45,
    introduction: {
      lead: 'Najgroźniejszy koszmar maturzysty. Błąd kardynalny oznacza natychmiastowe przyznanie 0 punktów za całe wypracowanie – niezależnie od tego, jak pięknym językiem zostało napisane! W tej lekcji nauczysz się go unikać.',
      objectives: [
        'Definicja błędu kardynalnego CKE: rażące zniekształcenie fabuły lub wymowy lektury obowiązkowej.',
        'Rozróżnienie błędu kardynalnego (0 pkt) od zwykłego błędu rzeczowego (drobna utrata punktu).',
        'Trening na 10 autentycznych pułapkach maturalnych z ostatnich lat.'
      ],
      theoryPoints: [
        {
          title: 'Czym JEST, a czym NIE JEST błąd kardynalny?',
          content: 'Błąd KARDYNALNY dotyczy wyłącznie lektury sprawdzanej w całości (lektury z gwiazdką) i musi całkowicie wypaczać sens utworu lub kluczowe wydarzenie.\nPrzykład błędu kardynalnego: „Wokulski ożenił się z Łęcką”, „Konrad zabił cara”, „Antygona błagała Kreona o litość”.\nZwykły błąd rzeczowy: pomylenie imienia siostry Izabeli, nazwanie Rzeckiego subiektem w sklepie jubilerskim zamiast galanteryjnym.'
        }
      ],
      ckeExaminerTips: [
        'Jeśli nie pamiętasz dokładnego nazwiska bohatera drugoplanowego, opisz go funkcyjnie (np. „stary przyjaciel kupca”, „adwokat rodziny”) zamiast zmyślać!'
      ],
      gatekeeper: {
        question: 'Które z poniższych zdań w wypracowaniu maturalnym stanowi BŁĄD KARDYNALNY skutkujący natychmiastową oceną 0/35 punktów?',
        options: [
          '„Rzecki pracował w sklepie galanteryjnym przez ponad dwadzieścia lat”.',
          '„Konrad w celi klasztornej zorganizował udany zamach i osobiście zastrzelił cara Mikołaja I”.',
          '„Wokulski poznał Izabelę Łęcką podczas spektaklu w teatrze”.',
          '„Akcja Dziadów części III rozgrywa się częściowo w Wilnie”.'
        ],
        correctIndex: 1,
        explanation: 'Stwierdzenie, że Konrad zastrzelił cara, całkowicie fałszuje fabułę i przesłanie „Dziadów cz. III” (to Kordian Słowackiego stał pod sypialnią cara, a Konrad toczył walkę duchową z Bogiem). Skutek: 0 punktów za całą pracę!',
        hint: 'Błąd kardynalny to zmyślenie kluczowego faktu w lekturze z gwiazdką.'
      }
    },
    taskIds: ['pol-p3-003', 'pol-p3-004'],
    summary: {
      keyTakeaways: [
        'Lepiej napisać o lekturze mniej, ale w 100% pewnych faktów, niż wymyślać zakończenia powieści.',
        'Nigdy nie pisz o lekturze, której nie znasz z tekstu lub solidnego opracowania.'
      ],
      reflection: 'Wymień 3 lektury z gwiazdką, w których zakończenie fabuły jest otwarte lub tragiczne.'
    }
  },
  {
    id: 'lekcja-22',
    number: 22,
    title: 'Architekt Kontekstów',
    subtitle: 'Kontekst filozoficzny, historyczny, biograficzny, kulturowy i literacki',
    module: 'Warsztat wypracowania',
    durationMinutes: 45,
    introduction: {
      lead: 'Kontekst w wypracowaniu to warunek konieczny uzyskania maksymalnej punktacji za kompetencje literackie. Dowiedz się, czym różni się kontekst funkcjonalny od pustej wzmianki.',
      objectives: [
        'Rozróżnienie rodzajów kontekstów: filozoficzny (Sartre, Camus, Tischner), historyczny, biograficzny.',
        'Funkcjonalne wplatanie kontekstu: kontekst musi wyjaśniać sens lektury, a nie wisieć w próżni.',
        'Bank uniwersalnych kontekstów filozoficznych do literatury XX i XIX wieku.'
      ],
      theoryPoints: [
        {
          title: 'Jak poprawnie wpleść kontekst?',
          content: 'Zły kontekst: „Camus był francuskim pisarzem i dostał Nobla”. (Wzmianka bez związku).\nDobry kontekst funkcjonalny: „Postawę doktora Rieux warto zinterpretować w kontekście filozofii egzystencjalizmu Alberta Camusa. W świecie pozbawionym transcendentnego ładu jedyną odpowiedzią człowieka na absurd i cierpienie jest bunt wyrażający się w solidarności z innymi ludźmi”.'
        }
      ],
      ckeExaminerTips: [
        'Kontekst nie może być kolejnym argumentem literackim – musi być tłem wyjaśniającym motywację bohaterów lub genezę dzieła.'
      ],
      gatekeeper: {
        question: 'Czym charakteryzuje się KONTEKST FUNKCJONALNY w rozumieniu kryteriów egzaminacyjnych CKE?',
        options: [
          'Podaniem dokładnej daty urodzin i imion rodziców autora na wstępie.',
          'Wzbogaceniem analizy utworu o wiedzę pozatekstową (np. filozoficzną, historyczną), która bezpośrednio wyjaśnia sens i motywację zachowań bohaterów.',
          'Opisaniem fabuły innego filmu, który nie ma żadnego związku z tematem rozprawki.',
          'Przepisaniem fragmentu biografii z Wikipedii do zakończenia pracy.'
        ],
        correctIndex: 1,
        explanation: 'Kontekst funkcjonalny współpracuje z Twoim wywodem – wyjaśnia, dlaczego utwór ma taki wydźwięk lub jak wpisuje się w dany nurt myślowy epoki.',
        hint: 'Słowo-klucz: „funkcjonalny” oznacza, że kontekst czemuś służy w analizie.'
      }
    },
    taskIds: ['pol-p3-005'],
    summary: {
      keyTakeaways: [
        'Tylko kontekst funkcjonalny gwarantuje punkty w kryterium CKE.',
        'Zapamiętaj 3 pojęcia filozoficzne: egzystencjalizm (Camus), stoicyzm (Marek Aureliusz) oraz etykę odpowiedzialności (Tischner/Levinas).'
      ],
      reflection: 'Dobierz kontekst historyczny do lektury „Inny świat”.'
    }
  },
  {
    id: 'lekcja-23',
    number: 23,
    title: 'Język, Styl i Kompozycja Rozprawki',
    subtitle: 'Słownictwo problemowe, unikanie kolokwializmów i spójność tekstu',
    module: 'Warsztat wypracowania',
    durationMinutes: 45,
    introduction: {
      lead: 'Za sam język, kompozycję i ortografię możesz zdobyć aż 18 z 35 punktów w wypracowaniu! W tej lekcji wyczyścisz swój styl z powtórzeń, kolokwializmów i błędów składniowych.',
      objectives: [
        'Wzbogacenie słownictwa o terminologię analityczną (determinizm, ambiwalencja, parabola, archetyp).',
        'Eliminacja potocyzmów („Wokulski miał doła”, „Konrad wkurzył się na Boga”).',
        'Stosowanie bogatych spójników logicznych i płynnych przejść międzyakapitowych.'
      ],
      theoryPoints: [
        {
          title: 'Słownik Młodego Humanisty',
          content: 'Zamiast: „bohater jest dziwny” ➔ postać cechuje ambiwalencja i wewnętrzne sprzeczności.\nZamiast: „akcja dzieje się w złych czasach” ➔ losy jednostki determinowane są przez uwarunkowania historyczno-społeczne.\nZamiast: „autor chciał pokazać” ➔ pisarz unaocznia, demaskuje, problematyzuje.'
        }
      ],
      ckeExaminerTips: [
        'Wielu maturzystów traci punkty za błędy interpunkcyjne – pamiętaj, że zdania podrzędne (zaczynające się od „który”, „ponieważ”, „że”, „gdy”) muszą być oddzielone przecinkami z OBU stron!'
      ],
      gatekeeper: {
        question: 'Które z poniższych sformułowań reprezentuje dojrzały, poprawny styl eseju maturalnego?',
        options: [
          '„Konrad wkurzył się na Boga i nawrzucał Mu w Wielkiej Improwizacji”.',
          '„Postawa Konrada w Wielkiej Improwizacji cechuje się prometejską hybris i metafizycznym buntem w imię dobra narodu”.',
          '„Wokulski miał mega doła przez Izabelę i próbował ze sobą skończyć”.',
          '„Bohaterowie Wesela to po prostu totalne lenie i nic im się nie chciało”.'
        ],
        correctIndex: 1,
        explanation: 'Język wypracowania maturalnego wymaga stylu erudycyjnego, obiektywnego i unikania żargonu młodzieżowego czy potocyzmów („wkurzył się”, „miał mega doła”).',
        hint: 'Wybierz zdanie posługujące się precyzyjnymi pojęciami analitycznymi.'
      }
    },
    taskIds: ['pol-p1-004'],
    summary: {
      keyTakeaways: [
        'Dojrzały język przekonuje egzaminatora, że ma do czynienia z oczytanym i świadomym maturzystą.',
        'Przeznacz ostatnie 15 minut egzaminu wyłącznie na spokojne sprawdzenie przecinków i ortografii.'
      ],
      reflection: 'Przepisz zdanie potoczne na język eseju naukowego.'
    }
  },
  {
    id: 'lekcja-24',
    number: 24,
    title: 'Wielka Próba Maturalna i Zarządzanie Czasem',
    subtitle: 'Strategia 240 minut: podział czasu, kolejność rozwiązywania i karta odpowiedzi',
    module: 'Warsztat wypracowania',
    durationMinutes: 45,
    introduction: {
      lead: 'Zwieńczenie kursu. Matura to nie tylko wiedza, ale i żelazna strategia zarządzania 240 minutami. W tej lekcji dowiesz się, jak rozłożyć siły, by nie zabrakło Ci czasu na wypracowanie.',
      objectives: [
        'Złoty podział 240 minut: 45 min Zeszyt 1 (Część 1) ➔ 45 min Zeszyt 1 (Część 2) ➔ 135 min Wypracowanie ➔ 15 min korekta.',
        'Taktyka „trudnych pytań” – jak nie zaciąć się na jednym zadaniu za 1 punkt.',
        'Ostateczna check-lista przed wejściem na salę egzaminacyjną.'
      ],
      theoryPoints: [
        {
          title: 'Optymalny Harmonogram 240 minut',
          content: '0:00 – 0:45: Część 1 (Język w użyciu) + brudnopis notatki syntetyzującej.\n0:45 – 1:30: Część 2 (Test historycznoliteracki) – rozwiązanie zadań chronologicznie.\n1:30 – 1:50: Zeszyt 2: Wybór tematu, konspekt, wybór lektury i tezy na brudnopisie.\n1:50 – 3:45: Pisanie czystopisu wypracowania (min. 300 słów).\n3:45 – 4:00: Sprawdzenie czystopisu, interpunkcji, limitu słów notatki i przeniesienie odpowiedzi.'
        }
      ],
      ckeExaminerTips: [
        'Nigdy nie wychodź przed czasem! Ostatnie minuty poświęcone na wnikliwą autokorektę ratują średnio od 3 do 7 punktów.'
      ],
      gatekeeper: {
        question: 'Jaka jest minimalna zalecana objętość wypracowania maturalnego w Formule 2023, gwarantująca pełne ocenienie bogactwa języka i stylu?',
        options: [
          'Minimum 150 słów.',
          'Bezpieczne 300+ słów (poniżej 300 słów CKE drastycznie obniża ocenę za język i kompozycję).',
          'Dokładnie 90 słów (tak jak w notatce syntetyzującej).',
          'Minimum 1000 słów.'
        ],
        correctIndex: 1,
        explanation: 'Oficjalny próg CKE wynosi 300 wypracowanych słów. Praca krótsza niż 300 słów nie może otrzymać maksymalnych punktów w kryteriach językowych i kompozycyjnych.',
        hint: 'Pamiętaj: 60–90 słów to notatka w Części 1, a wypracowanie w Zeszycie 2 to cel 300+ słów.'
      }
    },
    taskIds: ['pol-p3-001'],
    summary: {
      keyTakeaways: [
        'Opanowanie, spokój i konsekwentne trzymanie się planu to klucz do zdanego egzaminu na 90%+.',
        'Wszystkie narzędzia i wiedzę masz już w ręku – jesteś gotowy na oficjalną maturę CKE!'
      ],
      reflection: 'Zrób sobie pełną próbę generalną w naszym Symulatorze 240 minut bez przerw i rozpraszaczy.'
    }
  }
];

export function getLessonById(id: string): PolishLesson | undefined {
  return POLISH_LESSONS.find((l) => l.id === id);
}

export function getLessonsByModule(moduleName: string): PolishLesson[] {
  return POLISH_LESSONS.filter((l) => l.module === moduleName);
}

export interface PolishSection {
  id: string;
  numericId: number;
  title: string;
  short_title: string;
  pillarName: string;
  icon: string;
  points_range: string;
  description: string;
  lessonIds: string[];
}

export const POLISH_SECTIONS: PolishSection[] = [
  {
    id: "pol-dzial-1",
    numericId: 1,
    title: "Dział 1: Język polski w użyciu & Czytanie krytyczne",
    short_title: "Język w użyciu",
    pillarName: "Część 1 CKE • Zeszyt 1",
    icon: "FileText",
    points_range: "10 pkt",
    description: "Analiza tekstu nieliterackiego, fakty i opinie, manipulacja semantyczna, słowa-klucze i tabela Prawda/Fałsz.",
    lessonIds: ["lekcja-1", "lekcja-2", "lekcja-3"]
  },
  {
    id: "pol-dzial-2",
    numericId: 2,
    title: "Dział 2: Notatka syntetyzująca CKE (Klucz do 4 pkt)",
    short_title: "Notatka syntetyzująca",
    pillarName: "Część 1 CKE • Zeszyt 1",
    icon: "PenTool",
    points_range: "4 pkt",
    description: "Zasady notatki syntetyzującej, twardy limit 60–90 słów, synteza dwóch tekstów i eliminacja opinii własnej.",
    lessonIds: ["lekcja-4", "lekcja-5"]
  },
  {
    id: "pol-dzial-3",
    numericId: 3,
    title: "Dział 3: Środki stylistyczne, retoryka i funkcje języka",
    short_title: "Retoryka i styl",
    pillarName: "Część 1 CKE • Zeszyt 1",
    icon: "Zap",
    points_range: "4–6 pkt",
    description: "Funkcja impresywna, ekspresywna, poznawcza, perswazyjna, ironia, pytania retoryczne i figury słowne.",
    lessonIds: ["lekcja-2"]
  },
  {
    id: "pol-dzial-4",
    numericId: 4,
    title: "Dział 4: Starożytność i Biblia – Fundamenty kultury",
    short_title: "Antyk i Biblia",
    pillarName: "Test historycznoliteracki",
    icon: "BookOpen",
    points_range: "4–6 pkt",
    description: "Księga Hioba, Kohelet, Apokalipsa św. Jana, mitologia grecka, Iliada, Antygona Sofoklesa i toposy antyczne.",
    lessonIds: ["lekcja-6"]
  },
  {
    id: "pol-dzial-5",
    numericId: 5,
    title: "Dział 5: Średniowiecze – Teocentryzm, asceza i etos rycerski",
    short_title: "Średniowiecze",
    pillarName: "Test historycznoliteracki",
    icon: "Shield",
    points_range: "3–5 pkt",
    description: "Bogurodzica, Lament świętokrzyski, Legenda o św. Aleksym, Rozmowa Mistrza Polikarpa i Pieśń o Rolandzie.",
    lessonIds: ["lekcja-7"]
  },
  {
    id: "pol-dzial-6",
    numericId: 6,
    title: "Dział 6: Renesans – Humanizm i harmonia świata",
    short_title: "Renesans",
    pillarName: "Test historycznoliteracki",
    icon: "Award",
    points_range: "4–6 pkt",
    description: "Jan Kochanowski (Pieśni, Treny, Odprawa posłów greckich), humanizm, stoicyzm, epikureizm i kryzys światopoglądowy.",
    lessonIds: ["lekcja-8"]
  },
  {
    id: "pol-dzial-7",
    numericId: 7,
    title: "Dział 7: Barok – Niepokój egzystencjalny i koncept",
    short_title: "Barok",
    pillarName: "Test historycznoliteracki",
    icon: "Layers",
    points_range: "3–5 pkt",
    description: "Daniel Naborowski (Krótkość żywota), Jan Andrzej Morsztyn (Do trupa), vanitas, konceptyzm i sarmatyzm (Pasek).",
    lessonIds: ["lekcja-9"]
  },
  {
    id: "pol-dzial-8",
    numericId: 8,
    title: "Dział 8: Oświecenie – Rozum, dydaktyzm i krytyka wad",
    short_title: "Oświecenie",
    pillarName: "Test historycznoliteracki",
    icon: "Lightbulb",
    points_range: "3–4 pkt",
    description: "Ignacy Krasicki (Bajki, Satyry, Hymn do miłości ojczyzny), racjonalizm, krytyka sarmatyzmu i teatr stanisławowski.",
    lessonIds: ["lekcja-9"]
  },
  {
    id: "pol-dzial-9",
    numericId: 9,
    title: "Dział 9: Romantyzm – Mesjanizm, walka i mistycyzm",
    short_title: "Romantyzm",
    pillarName: "Test historycznoliteracki",
    icon: "Flame",
    points_range: "8–12 pkt",
    description: "Adam Mickiewicz (Dziady cz. III, Konrad Wallenrod, Pan Tadeusz), Juliusz Słowacki (Kordian) i Cyprian Kamil Norwid.",
    lessonIds: ["lekcja-10", "lekcja-11"]
  },
  {
    id: "pol-dzial-10",
    numericId: 10,
    title: "Dział 10: Pozytywizm – Praca organiczna i realizm",
    short_title: "Pozytywizm",
    pillarName: "Test historycznoliteracki",
    icon: "Award",
    points_range: "8–12 pkt",
    description: "Lalka Bolesława Prusa (Wokulski, Rzecki, Łęcka), praca organiczna i u podstaw, Gloria victis oraz Zbrodnia i kara.",
    lessonIds: ["lekcja-12", "lekcja-13"]
  },
  {
    id: "pol-dzial-11",
    numericId: 11,
    title: "Dział 11: Młoda Polska – Wesele Wyspiańskiego i modernizm",
    short_title: "Młoda Polska",
    pillarName: "Test historycznoliteracki",
    icon: "Zap",
    points_range: "7–10 pkt",
    description: "Wesele Stanisława Wyspiańskiego, chocholi taniec, bronowicka chata, dekadentyzm, poezja Tetmajera i Kasprowicza.",
    lessonIds: ["lekcja-14"]
  },
  {
    id: "pol-dzial-12",
    numericId: 12,
    title: "Dział 12: Dwudziestolecie międzywojenne – Awangarda i rozczarowanie",
    short_title: "Dwudziestolecie międzywojenne",
    pillarName: "Test historycznoliteracki",
    icon: "Compass",
    points_range: "6–8 pkt",
    description: "Przedwiośnie Stefana Żeromskiego (szklane domy, Cezary Baryka), Schulz (Sklepy cynamonowe) i Gombrowicz (Ferdydurke).",
    lessonIds: ["lekcja-15"]
  },
  {
    id: "pol-dzial-13",
    numericId: 13,
    title: "Dział 13: Literatura wojenna i okupacyjna – Odczłowieczenie i heroizm",
    short_title: "Literatura wojenna i okupacyjna",
    pillarName: "Test historycznoliteracki",
    icon: "Shield",
    points_range: "6–8 pkt",
    description: "Opowiadania Tadeusza Borowskiego, Inny świat Gustawa Herlinga-Grudzińskiego oraz Zdążyć przed Panem Bogiem Hanny Krall.",
    lessonIds: ["lekcja-16", "lekcja-17"]
  },
  {
    id: "pol-dzial-14",
    numericId: 14,
    title: "Dział 14: Literatura współczesna – Moralność i groteska",
    short_title: "Współczesność",
    pillarName: "Test historycznoliteracki",
    icon: "Users",
    points_range: "4–6 pkt",
    description: "Tango Sławomira Mrożka, Dżuma Alberta Camusa, Rok 1984 George'a Orwella, poezja Szymborskiej, Różewicza i Herberta.",
    lessonIds: ["lekcja-18"]
  },
  {
    id: "pol-dzial-15",
    numericId: 15,
    title: "Dział 15: Warsztat Wypracowania Maturalnego (35 pkt)",
    short_title: "Warsztat wypracowania",
    pillarName: "Część 2 CKE • Zeszyt 2",
    icon: "PenTool",
    points_range: "35 pkt",
    description: "Struktura rozprawki problemowej, kompozycja tezy, dobór lektur z gwiazdką, konteksty i eliminacja błędu kardynalnego.",
    lessonIds: ["lekcja-19", "lekcja-20", "lekcja-21", "lekcja-22", "lekcja-23", "lekcja-24"]
  }
];

export function getPolishLessonsBySection(sectionId: string): PolishLesson[] {
  const section = POLISH_SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  return POLISH_LESSONS.filter(l => section.lessonIds.includes(l.id));
}

