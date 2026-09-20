/**
 * Script to refine Dział 1 in curriculum_matematyka.json and mirror
 * Eliminates redundancy, cleans up descriptions, and provides genuine CKE traps.
 */
const fs = require('fs');
const path = require('path');

const SEED_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');
const MIRROR_PATH = 'c:/Users/mateu/Downloads/mat/curriculum_matematyka.json';

const raw = fs.readFileSync(SEED_PATH, 'utf8');
const data = JSON.parse(raw);

const updatedFormulasByLesson = {
  'lesson-1-1': [
    {
      title: "Przedział domknięty i otwarty",
      latex: "\\langle a, b \\rangle \\implies a \\le x \\le b, \\quad (a, b) \\implies a < x < b",
      description: "Ostry nawias ⟨ ⟩ oznacza nierówność słabą z kreską ($\\le, \\ge$) i zamalowaną kropkę na osi. Okrągły nawias ( ) oznacza nierówność ostrą ($<, >$) i puste kółko. Przy nieskończoności ($-\\infty, +\\infty$) zawsze stawiasz nawias okrągły.",
      example: "⟨2, 5) to liczby od 2 (włącznie) do 5 (bez piątki).",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Tego zapisu NIE MA w karcie wzorów. Pamiętaj: nierówność ostra ($<$ lub $>$) oznacza kółko otwarte i nawias okrągły $(a, b)$, a nierówność słaba ($\\le$ lub $\\ge$) to kółko zamalowane i nawias domknięty $\\langle a, b \\rangle$. Przy nieskończoności ($-\\infty$, $+\\infty$) zawsze stosuj nawias okrągły."
    },
    {
      title: "Suma i iloczyn przedziałów",
      latex: "A \\cup B \\text{ (Suma: wszystko)}, \\quad A \\cap B \\text{ (Iloczyn: część wspólna)}",
      description: "Suma $A \\cup B$ działa jak miska – zbiera wszystkie elementy z obu przedziałów naraz. Iloczyn $A \\cap B$ to wspólny daszek – zawiera wyłącznie liczby, które należą jednocześnie do obu przedziałów (podwójne kreskowanie na osi).",
      example: "Dla A = ⟨1, 4⟩ i B = ⟨3, 6⟩: suma A ∪ B = ⟨1, 6⟩, a iloczyn A ∩ B = ⟨3, 4⟩.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Tego zapisu NIE MA w karcie wzorów. Pamiętaj: suma $A \\cup B$ to połączenie obu przedziałów (bierzesz wszystko), a iloczyn (część wspólna) $A \\cap B$ to tylko część nakładająca się na siebie. Na maturze zawsze narysuj oba przedziały na jednej osi liczbowej, aby uniknąć pomyłki na krańcach."
    }
  ],
  'lesson-1-2': [
    {
      title: "Definicja liczby wymiernej",
      latex: "x = \\frac{p}{q} \\quad (p, q \\in \\mathbb{Z}, \\; q \\neq 0)",
      description: "Liczba wymierna to każda liczba, którą da się zapisać w postaci ułamka zwykłego dwóch liczb całkowitych (np. rozwinięcia skończone lub okresowe). Liczby niewymierne mają rozwinięcie nieskończone i nieokresowe (np. $\\sqrt{2}, \\pi$).",
      example: "$\\sqrt{4} = 2$ oraz $0{,}75 = \\frac{3}{4}$ to liczby wymierne, ale $\\sqrt{5} \\approx 2{,}236\\dots$ jest niewymierna.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "W karcie wzorów na str. 2 znajdziesz definicję zbiorów. Pamiętaj: ułamek okresowy $0{,}333\\dots = \\frac{1}{3}$ to ZAWSZE liczba wymierna!"
    },
    {
      title: "Hierarchia zbiorów liczbowych",
      latex: "\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}",
      description: "Zbiory liczb są jak pudełka włożone jedno w drugie: naturalne $\\mathbb{N}$ mieszczą się w całkowitych $\\mathbb{Z}$, te w wymiernych $\\mathbb{Q}$, a wszystkie razem tworzą zbiór liczb rzeczywistych $\\mathbb{R}$.",
      example: "Liczba -5 należy do $\\mathbb{Z}$ i $\\mathbb{Q}$, ale NIE należy do $\\mathbb{N}$.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "W karcie wzorów na str. 2. Pamiętaj: zero należy do liczb naturalnych $\\mathbb{N}$ i całkowitych $\\mathbb{Z}$."
    }
  ],
  'lesson-1-3': [
    {
      title: "Cechy podzielności przez 3 i 9",
      latex: "3 \\mid n \\iff \\text{suma cyfr dzieli się przez 3}",
      description: "Liczba dzieli się przez 3 (lub przez 9) wtedy i tylko wtedy, gdy suma wszystkich jej cyfr jest podzielna odpowiednio przez 3 (lub przez 9). Ostatnia cyfra nie decyduje o podzielności przez 3!",
      example: "Dla liczby 4125: suma cyfr to 4 + 1 + 2 + 5 = 12. Ponieważ 12 dzieli się przez 3, liczba 4125 dzieli się przez 3 (ale nie przez 9).",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Cech podzielności NIE MA w karcie wzorów. W zadaniach CKE często pojawia się pytanie o brakującą cyfrę $x$ w zapisie $24x1$, tak aby liczba dzieliła się przez 9."
    },
    {
      title: "Liczby pierwsze i złożone",
      latex: "p \\in \\{2, 3, 5, 7, 11, 13, 17, 19, \\dots\\}",
      description: "Liczba pierwsza to liczba naturalna większa od 1, która dzieli się wyłącznie przez 1 i przez samą siebie (ma dokładnie 2 dzielniki). Liczba złożona ma co najmniej 3 dzielniki.",
      example: "Liczba 2 jest jedyną parzystą liczbą pierwszą. Liczba 9 ma dzielniki 1, 3, 9, więc jest złożona.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Pułapka CKE: liczby 0 i 1 NIE SĄ ani pierwsze, ani złożone! Najmniejszą liczbą pierwszą jest 2."
    }
  ],
  'lesson-1-4': [
    {
      title: "Mnożenie ułamków zwykłych",
      latex: "\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}",
      description: "Mnożysz licznik razy licznik, a mianownik razy mianownik. Zawsze skracaj ułamki na krzyż (po przekątnej) przed wykonaniem mnożenia, aby uniknąć liczenia na wielkich liczbach.",
      example: "\\frac{2}{5} \\cdot \\frac{15}{4} = \\frac{1 \\cdot 3}{1 \\cdot 2} = \\frac{3}{2}",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Uwaga na liczby mieszane: przed mnożeniem zawsze zamień je na ułamek niewłaściwy (np. $1\\frac{1}{2} = \\frac{3}{2}$). Nigdy nie mnóż osobno całości i ułamków!"
    },
    {
      title: "Dzielenie przez ułamek (odwrotność)",
      latex: "\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}",
      description: "Dzielenie przez ułamek to mnożenie przez jego odwrotność – znak dzielenia zamieniasz na mnożenie i obracasz wyłącznie drugi ułamek (dzielnik) do góry dnem.",
      example: "\\frac{4}{7} : \\frac{2}{3} = \\frac{4}{7} \\cdot \\frac{3}{2} = \\frac{2 \\cdot 3}{7 \\cdot 1} = \\frac{6}{7}",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Odwracasz WYŁĄCZNIE drugi ułamek, pierwszy pozostawiasz bez zmian. Pamiętaj też, że mianownik i licznik dzielnika nie mogą być zerem."
    },
    {
      title: "Sprowadzanie do wspólnego mianownika",
      latex: "\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{a \\cdot d \\pm c \\cdot b}{b \\cdot d}",
      description: "Przy dodawaniu i odejmowaniu ułamków o różnych mianownikach musisz najpierw rozszerzyć ułamki do wspólnego mianownika. Dodajesz lub odejmujesz tylko liczniki, mianownik pozostaje wspólny.",
      example: "\\frac{1}{4} + \\frac{2}{3} = \\frac{3}{12} + \\frac{8}{12} = \\frac{11}{12}",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Najczęstsza pułapka rachunkowa: nigdy nie dodawaj mianowników do siebie (np. $\\frac{1}{2} + \\frac{1}{3} \\neq \\frac{2}{5}$)! Zawsze wyznacz wspólny mianownik."
    }
  ],
  'lesson-1-5': [
    {
      title: "Mnożnik podwyżki i obniżki procentowej",
      latex: "c_{\\text{po}} = c_0 \\cdot \\left(1 \\pm \\frac{p}{100}\\right)",
      description: "Zamiast liczyć procent i dodawać/odejmować, pomnóż cenę początkową przez mnożnik: podwyżka o 20% to mnożnik $1{,}20$, a obniżka o 30% to mnożnik $0{,}70$ ($1 - 0{,}30$). Jedno szybkie działanie na kalkulatorze!",
      example: "Towar za 150 zł po obniżce o 20% kosztuje 150 · 0,80 = 120 zł.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Mnożnik podwyżki o $p\\%$ wynosi $\\left(1 + \\frac{p}{100}\\right)$, a obniżki $\\left(1 - \\frac{p}{100}\\right)$. Przy kolejnych zmianach cen mnożysz mnożniki: cena po podwyżce o $10\\%$ i obniżce o $10\\%$ to $c \\cdot 1{,}10 \\cdot 0{,}90 = 0{,}99c$ (spadek o $1\\%$)."
    },
    {
      title: "Jaki procent liczby b stanowi liczba a",
      latex: "p = \\frac{a}{b} \\cdot 100\\%",
      description: "Dzielisz część $a$ przez całość $b$ i mnożysz przez 100%. W mianowniku na dole zawsze wstawiasz wielkość odniesienia (bazę).",
      example: "15 punktów z 60 możliwych to $\\frac{15}{60} \\cdot 100\\% = 25\\%$.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "W zadaniach 'o ile procent wzrosła wielkość' w mianowniku ZAWSZE wstawiasz wielkość bazową (początkową), a w liczniku różnicę: $p = \\frac{|b - a|}{a} \\cdot 100\\%$."
    }
  ],
  'lesson-1-6': [
    {
      title: "Różnica w punktach procentowych",
      latex: "\\Delta_{\\text{p.p.}} = p_2 - p_1",
      description: "Zwykłe arytmetyczne odjęcie dwóch stóp procentowych daje wynik w punktach procentowych (p.p.), a nie w zwykłych procentach.",
      example: "Wzrost oprocentowania lokaty z 5% do 7% to wzrost o 2 p.p. (bezwzględnie), ale względnie o $\\frac{2}{5} \\cdot 100\\% = 40\\%$!",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Różnica między stopami procentowymi to punkty procentowe (p.p.). Zmiana względna to różnica podzielona przez wartość początkową razy $100\\%$."
    },
    {
      title: "Błąd bezwzględny i względny",
      latex: "\\Delta = |x - x_0|, \\quad \\delta = \\frac{|x - x_0|}{x} \\cdot 100\\%",
      description: "$x$ to wartość dokładna, a $x_0$ to przybliżenie. Błąd bezwzględny $\\Delta$ mówi o ile jednostek się pomyliłeś. Błąd względny $\\delta$ odnosi ten błąd do wartości dokładnej i wyraża go w procentach.",
      example: "Dla wartości dokładnej 250 i przybliżenia 240: $\\Delta = |250 - 240| = 10$, $\\delta = \\frac{10}{250} \\cdot 100\\% = 4\\%$.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Tego wzoru nie ma w spisie karty wzorów! Zapamiętaj: w mianowniku błędu względnego zawsze stoi wartość dokładna $x$, nigdy przybliżenie $x_0$."
    }
  ],
  'lesson-1-7': [
    {
      title: "Działania na potęgach o tej samej podstawie",
      latex: "a^r \\cdot a^s = a^{r+s}, \\quad \\frac{a^r}{a^s} = a^{r-s}",
      description: "Gdy mnożysz potęgi o jednakowej podstawie, podstawę przepisujesz, a wykładniki dodajesz. Przy dzieleniu podstawę przepisujesz, a wykładnik z mianownika odejmujesz od wykładnika z licznika.",
      example: "$3^4 \\cdot 3^2 = 3^{4+2} = 3^6 = 729, \\quad \\frac{5^8}{5^5} = 5^{8-5} = 5^3 = 125$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Przy mnożeniu potęg o tej samej podstawie wykładniki dodajemy, przy dzieleniu odejmujemy."
    },
    {
      title: "Potęga potęgi i wspólny wykładnik",
      latex: "(a^r)^s = a^{r \\cdot s}, \\quad (a \\cdot b)^r = a^r \\cdot b^r",
      description: "Przy potęgowaniu potęgi mnożysz wykładniki przez siebie. Wspólny wykładnik za nawiasem rozdziela się na każdy czynnik iloczynu wewnątrz nawiasu.",
      example: "$(2^3)^4 = 2^{3 \\cdot 4} = 2^{12}, \\quad (2x)^3 = 2^3 \\cdot x^3 = 8x^3$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Uważaj na nawiasy: $(2^3)^2 = 2^6$, ale $2^{3^2} = 2^9$."
    }
  ],
  'lesson-1-8': [
    {
      title: "Potęga o wykładniku ujemnym",
      latex: "a^{-n} = \\frac{1}{a^n}, \\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n",
      description: "Minus w wykładniku działa jak winda: odwraca liczbę do góry dnem i znika. Sam minus w wykładniku NIGDY nie tworzy liczby ujemnej!",
      example: "$2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}, \\quad \\left(\\frac{3}{4}\\right)^{-2} = \\left(\\frac{4}{3}\\right)^2 = \\frac{16}{9}$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Pamiętaj: $2^{-3} = \\frac{1}{8}$, a nie $-8$!"
    },
    {
      title: "Potęga zerowa",
      latex: "a^0 = 1 \\quad (a \\neq 0)",
      description: "Dowolna niezerowa liczba podniesiona do potęgi 0 daje zawsze wynik 1.",
      example: "$(-9)^0 = 1$, ale uwaga na zapis bez nawiasu: $-9^0 = -(9^0) = -1$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Zwracaj uwagę na nawiasy: $(-a)^0 = 1$, ale $-a^0 = -1$."
    }
  ],
  'lesson-1-9': [
    {
      title: "Definicja potęgi o wykładniku wymiernym",
      latex: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m \\quad (a > 0, \\; n \\ge 2)",
      description: "Mianownik ułamka $n$ idzie do korzenia (staje się stopniem pierwiastka), a licznik $m$ pozostaje zwykłą potęgą.",
      example: "$8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Zawsze najpierw wyciągnij pierwiastek, a potem podnoś do potęgi – liczysz na mniejszych liczbach!"
    },
    {
      title: "Pierwiastek kwadratowy jako potęga 1/2",
      latex: "\\sqrt{a} = a^{\\frac{1}{2}}, \\quad \\sqrt[3]{a} = a^{\\frac{1}{3}}",
      description: "Brak stopnia przy pierwiastku oznacza stopień 2, czyli potęgę $\\frac{1}{2}$. Zamiana na potęgi pozwala łatwo mnożyć pierwiastki o różnych stopniach.",
      example: "$\\sqrt{a} \\cdot \\sqrt[3]{a} = a^{\\frac{1}{2}} \\cdot a^{\\frac{1}{3}} = a^{\\frac{3}{6} + \\frac{2}{6}} = a^{\\frac{5}{6}} = \\sqrt[6]{a^5}$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Gdy masz iloczyn pierwiastków o różnych stopniach, zamień je na potęgi ułamkowe."
    }
  ],
  'lesson-1-10': [
    {
      title: "Mnożenie i dzielenie pierwiastków",
      latex: "\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}, \\quad \\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}",
      description: "Iloczyn i iloraz pierwiastków tego samego stopnia możesz połączyć pod jeden wspólny znak pierwiastka. Uwaga: reguła NIE DZIAŁA przy dodawaniu i odejmowaniu!",
      example: "$\\sqrt{18} \\cdot \\sqrt{2} = \\sqrt{18 \\cdot 2} = \\sqrt{36} = 6$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wzory na pierwiastki znajdują się na str. 3 karty wzorów. Uważaj: $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$!"
    },
    {
      title: "Wyłączanie czynnika przed znak pierwiastka",
      latex: "\\sqrt{a^2 \\cdot b} = a\\sqrt{b}, \\quad \\sqrt[3]{a^3 \\cdot b} = a\\sqrt[3]{b}",
      description: "Rozłóż liczbę pod pierwiastkiem na iloczyn takiej liczby, z której znasz dokładny pierwiastek (cegiełki: 4, 9, 16, 25, 36, 49, 100), i wyciągnij ją na zewnątrz.",
      example: "$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}, \\quad \\sqrt[3]{24} = \\sqrt[3]{8 \\cdot 3} = 2\\sqrt[3]{3}$.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wzory na pierwiastki znajdują się na str. 3 karty wzorów. Przed dodawaniem pierwiastków zawsze wyłącz czynniki przed znak pierwiastka."
    }
  ],
  'lesson-1-11': [
    {
      title: "Usuwanie pojedynczego pierwiastka",
      latex: "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b} \\quad (b > 0)",
      description: "Mnożysz licznik i mianownik przez ten sam pierwiastek z mianownika. Na dole pierwiastek znika ($\\sqrt{b} \\cdot \\sqrt{b} = b$), a na górze pojawia się pierwiastek.",
      example: "$\\frac{10}{\\sqrt{5}} = \\frac{10\\sqrt{5}}{5} = 2\\sqrt{5}$.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Wzory na pierwiastki są na str. 3 karty wzorów. Zawsze pamiętaj o skróceniu ułamka po usunięciu niewymierności."
    },
    {
      title: "Usuwanie dwumianu przez sprzężenie",
      latex: "\\frac{c}{\\sqrt{a} - \\sqrt{b}} = \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b} \\quad (a \\neq b)",
      description: "Mnożysz licznik i mianownik przez to samo wyrażenie, ale z przeciwnym znakiem w środku. W mianowniku stosujesz wzór $(x-y)(x+y) = x^2 - y^2$, dzięki czemu pierwiastki się kasują.",
      example: "$\\frac{3}{\\sqrt{5} - \\sqrt{2}} = \\frac{3(\\sqrt{5} + \\sqrt{2})}{5 - 2} = \\frac{3(\\sqrt{5} + \\sqrt{2})}{3} = \\sqrt{5} + \\sqrt{2}$.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Pamiętaj o nawiasach w liczniku! W mianowniku pierwiastki znikają podnosząc się do kwadratu."
    }
  ],
  'lesson-1-12': [
    {
      title: "Wzory skróconego mnożenia stopnia 2",
      latex: "(a \\pm b)^2 = a^2 \\pm 2ab + b^2, \\quad a^2 - b^2 = (a - b)(a + b)",
      description: "Kwadrat sumy i różnicy zawsze ma trzy składniki – pamiętaj o podwojonym iloczynie $2ab$ w środku! Różnica kwadratów $a^2 - b^2$ rozkłada się na iloczyn dwóch nawiasów.",
      example: "$(x - 4)^2 = x^2 - 8x + 16, \\quad x^2 - 9 = (x - 3)(x + 3)$.",
      in_cke_sheet: true,
      cke_page: "str. 5",
      matura_tip: "Wzory skróconego mnożenia są na str. 5 karty wzorów. Uważaj na środkowy składnik 2ab oraz znak minus przed nawiasem!"
    }
  ],
  'lesson-1-13': [
    {
      title: "Definicja logarytmu",
      latex: "\\log_a b = c \\iff a^c = b \\quad (a > 0, \\; a \\neq 1, \\; b > 0)",
      description: "Logarytm to pytanie o wykładnik potęgi: 'Do jakiej potęgi $c$ muszę podnieść podstawę $a$, aby otrzymać liczbę logarytmowaną $b$?'",
      example: "$\\log_2 8 = 3$, bo $2^3 = 8$. $\\log_5 \\frac{1}{25} = -2$, bo $5^{-2} = \\frac{1}{25}$.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Definicja i własności logarytmów są na str. 4 karty wzorów. Pamiętaj o założeniach: podstawa $a > 0$ i $a \\neq 1$, liczba logarytmowana $b > 0$."
    },
    {
      title: "Własności bazowe logarytmu",
      latex: "\\log_a 1 = 0, \\quad \\log_a a = 1, \\quad a^{\\log_a b} = b",
      description: "Logarytm z 1 to zawsze 0 (bo każda liczba podniesiona do potęgi 0 daje 1). Logarytm z liczby równej podstawie to zawsze 1 (bo $a^1 = a$).",
      example: "$\\log_3 1 = 0, \\quad \\log_8 8 = 1, \\quad 5^{\\log_5 9} = 9$.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Definicja i własności logarytmów są na str. 4 karty wzorów. Zapis $\\log x$ bez dolnej liczby to logarytm dziesiętny o podstawie 10."
    }
  ],
  'lesson-1-14': [
    {
      title: "Działania na logarytmach o tej samej podstawie",
      latex: "\\log_a x + \\log_a y = \\log_a(x \\cdot y), \\quad \\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)",
      description: "Suma logarytmów o jednakowej podstawie zamienia się w logarytm iloczynu liczb w środku. Różnica logarytmów zamienia się w logarytm ilorazu (dzielenia).",
      example: "$\\log_2 6 + \\log_2 \\frac{4}{3} = \\log_2 \\left(6 \\cdot \\frac{4}{3}\\right) = \\log_2 8 = 3$.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Definicja i własności logarytmów (suma, różnica, zmiana podstawy) są na str. 4 karty wzorów. Pamiętaj: wzory działają tylko przy tej samej podstawie!"
    },
    {
      title: "Wciąganie współczynnika do wykładnika",
      latex: "k \\cdot \\log_a x = \\log_a(x^k)",
      description: "Liczba stojąca przed logarytmem wchodzi do środka jako wykładnik potęgi liczby logarytmowanej.",
      example: "$3 \\cdot \\log_2 2 = \\log_2(2^3) = \\log_2 8 = 3$.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Jeśli przed logarytmem stoi liczba, np. 2 log 5, najpierw wciągnij ją jako potęgę: log(5²) = log 25, zanim połączysz z innym logarytmem."
    }
  ],
  'lesson-1-15': [
    {
      title: "Definicja algebraiczna wartości bezwzględnej",
      latex: "|x| = \\begin{cases} x & \\text{dla } x \\ge 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}, \\quad \\sqrt{x^2} = |x|",
      description: "Wartość bezwzględna to geometryczna odległość liczby od zera na osi – nigdy nie może być ujemna. Z liczby ujemnej usuwa minus, a dodatnią pozostawia bez zmian.",
      example: "$|-4| = 4$. Ponieważ $2 - \\sqrt{5} < 0$, to $|2 - \\sqrt{5}| = -(2 - \\sqrt{5}) = \\sqrt{5} - 2$.",
      in_cke_sheet: true,
      cke_page: "str. 2",
      matura_tip: "Wzory na wartość bezwzględną znajdziesz na str. 2 karty wzorów. Pamiętaj: $\\sqrt{x^2} = |x|$, nigdy samo $x$!"
    },
    {
      title: "Geometryczna interpretacja nierówności z modułem",
      latex: "|x - a| \\le r \\implies x \\in \\langle a - r, a + r \\rangle, \\quad |x - a| \\ge r \\implies x \\in (-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)",
      description: "$|x - a|$ to odległość liczby $x$ od punktu centralnego $a$ na osi, a $r$ to promień (maksymalny zasięg). Nierówność $\\le r$ oznacza jeden przedział wokół środka, a $\\ge r$ to dwa zewnętrzne skrzydła.",
      example: "$|x - 2| \\le 3$ oznacza liczby w odległości co najwyżej 3 od 2, czyli przedział $\\langle 2 - 3, 2 + 3 \\rangle = \\langle -1, 5 \\rangle$.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Zapamiętaj tę regułę – przydaje się w zadaniach zamkniętych. Środek przedziału to średnia arytmetyczna krańców $a = \\frac{x_1 + x_2}{2}$."
    }
  ]
};

const dzial1 = data.topics.find(t => t.id === 'dzial-1');
if (!dzial1) {
  console.error('Dział 1 not found!');
  process.exit(1);
}

let updatedCount = 0;
for (const lesson of dzial1.lessons) {
  if (updatedFormulasByLesson[lesson.id]) {
    lesson.theory_pill.core_formulas = updatedFormulasByLesson[lesson.id];
    updatedCount++;
    console.log(`Refined core_formulas for ${lesson.id} (${lesson.title})`);
  }
}

fs.writeFileSync(SEED_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`\nSuccessfully updated ${updatedCount} lessons in ${SEED_PATH}`);

if (fs.existsSync(path.dirname(MIRROR_PATH))) {
  fs.writeFileSync(MIRROR_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully mirrored to ${MIRROR_PATH}`);
}
