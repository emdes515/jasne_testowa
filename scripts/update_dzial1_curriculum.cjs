/**
 * Script to update Dział 1 in curriculum_matematyka.json with balanced, readable formulas,
 * visual mnemonics, and mini examples.
 */
const fs = require('fs');
const path = require('path');

const SEED_PATH = path.resolve(__dirname, '..', 'seed', 'curriculum', 'curriculum_matematyka.json');

const raw = fs.readFileSync(SEED_PATH, 'utf8');
const data = JSON.parse(raw);

const updatedFormulasByLesson = {
  'lesson-1-1': [
    {
      title: "Przedział domknięty i otwarty",
      latex: "\\langle a, b \\rangle \\implies a \\le x \\le b, \\quad (a, b) \\implies a < x < b",
      description: "$a, b$ to krańce przedziału. Nierówność nieostra $\\le$ odpowiada nawiasowi domkniętemu, ostra $<$ otwartemu.",
      mnemonic: "Ostry nawias ⟨ ⟩ = ostra/zamalowana kropka ● = znak z kreską ≤. Okrągły nawias ( ) = puste kółko ○ = znak bez kreski <. Przy nieskończoności ±∞ zawsze nawias okrągły!",
      example: "⟨2, 5) to liczby od 2 (włącznie) do 5 (bez piątki).",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Tego zapisu NIE MA w karcie wzorów. Pamiętaj: nierówność ostra ($<$ lub $>$) oznacza kółko otwarte i nawias okrągły $(a, b)$, a nierówność słaba ($\\le$ lub $\\ge$) to kółko zamalowane i nawias domknięty $\\langle a, b \\rangle$. Przy nieskończoności ($-\\infty$, $+\\infty$) zawsze stosuj nawias okrągły."
    },
    {
      title: "Suma i iloczyn przedziałów",
      latex: "A \\cup B \\text{ (Suma: bierzesz wszystko)}, \\quad A \\cap B \\text{ (Iloczyn: część wspólna)}",
      description: "Suma zawiera elementy należące do co najmniej jednego zbioru. Iloczyn zawiera wyłącznie elementy wspólne dla obu zbiorów naraz.",
      mnemonic: "Suma ∪ to miska, która zbiera wszystkie liczby z obu przedziałów. Iloczyn ∩ to wspólny daszek – tylko to, co leży pod podwójnym kreskowaniem.",
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
      description: "Liczba wymierna to taka, którą można przedstawić jako iloraz dwóch liczb całkowitych.",
      mnemonic: "Wymierna = da się zamienić na ułamek zwykły (np. 0,75 = 3/4, 0,(3) = 1/3). Niewymierna = rozwinięcie nieskończone i nieokresowe (np. √2, √3, π).",
      example: "√4 = 2 jest liczbą wymierną, ale √5 ≈ 2,236... jest liczbą niewymierną.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "W karcie wzorów na str. 2 znajdziesz definicję zbiorów. Pamiętaj: ułamek okresowy $0{,}333\\dots = \\frac{1}{3}$ to ZAWSZE liczba wymierna!"
    },
    {
      title: "Hierarchia zbiorów liczbowych",
      latex: "\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}",
      description: "Naturalne $\\mathbb{N}$ zawierają się w Całkowitych $\\mathbb{Z}$, te w Wymiernych $\\mathbb{Q}$, a wszystkie tworzą Rzeczywiste $\\mathbb{R}$.",
      mnemonic: "Pudełka jedno w drugim: od palców u dłoni ℕ, przez liczby ujemne ℤ i ułamki ℚ, aż po całą oś ℝ.",
      example: "-5 należy do ℤ i ℚ, ale NIE należy do ℕ.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "W karcie wzorów na str. 2. Pamiętaj: zero należy do liczb naturalnych $\\mathbb{N}$ i całkowitych $\\mathbb{Z}$."
    }
  ],
  'lesson-1-3': [
    {
      title: "Dodawanie i odejmowanie ułamków",
      latex: "\\frac{a}{c} \\pm \\frac{b}{c} = \\frac{a \\pm b}{c} \\quad (c \\neq 0)",
      description: "Gdy mianowniki są równe, działania wykonujesz wyłącznie na licznikach.",
      mnemonic: "Dół (mianownik) przepisujesz bez zmian, dodajesz lub odejmujesz tylko góry (liczniki).",
      example: "5/9 - 2/9 = 3/9 = 1/3.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Nigdy nie dodawaj mianowników: 1/2 + 1/3 ≠ 2/5! Zawsze sprowadzaj do wspólnego mianownika."
    },
    {
      title: "Sprowadzanie do wspólnego mianownika",
      latex: "\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{a \\cdot d \\pm c \\cdot b}{b \\cdot d}",
      description: "Mnożysz licznik i mianownik pierwszego ułamka przez dół drugiego i odwrotnie.",
      mnemonic: "Wspólny mianownik to najmniejsza wspólna wielokrotność dołów. Najprościej: pomnóż mianowniki przez siebie.",
      example: "1/4 + 2/3 = 3/12 + 8/12 = 11/12.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Przed dodawaniem ułamków mieszanych (np. 2 1/3) zamień je na ułamki niewłaściwe 7/3."
    }
  ],
  'lesson-1-4': [
    {
      title: "Mnożenie ułamków zwykłych",
      latex: "\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}",
      description: "Mnożysz licznik razy licznik, a mianownik razy mianownik. Zawsze skracaj na krzyż przed mnożeniem.",
      mnemonic: "Góra razy góra, dół razy dół. Skracaj po przekątnej, by nie liczyć wielkich liczb.",
      example: "(2/5) · (15/4) = (1 · 3) / (1 · 2) = 3/2.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Zawsze skracaj ułamki PRZED mnożeniem – oszczędzasz czas i unikasz pomyłek rachunkowych."
    },
    {
      title: "Dzielenie przez ułamek (odwrotność)",
      latex: "\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}",
      description: "Dzielenie przez ułamek zastępujesz mnożeniem przez jego odwrotność (obracasz drugi ułamek).",
      mnemonic: "Dzielenie zamień na mnożenie i obróć drugi ułamek do góry dnem.",
      example: "(4/7) : (2/3) = (4/7) · (3/2) = 6/7.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Pamiętaj: odwracasz WYŁĄCZNIE drugi ułamek, pierwszy pozostaje bez zmian!"
    }
  ],
  'lesson-1-5': [
    {
      title: "Mnożnik podwyżki i obniżki procentowej",
      latex: "c_{\\text{po}} = c_0 \\cdot \\left(1 \\pm \\frac{p}{100}\\right)",
      description: "Mnożnik podwyżki o $p\\%$ to $(1 + \\frac{p}{100})$, a obniżki to $(1 - \\frac{p}{100})$.",
      mnemonic: "Podwyżka o 20% to mnożnik 1,20. Obniżka o 30% to mnożnik 0,70 (1 - 0,30). Jedno szybkie mnożenie na kalkulatorze!",
      example: "Towar za 150 zł po obniżce o 20% kosztuje 150 · 0,80 = 120 zł.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Mnożnik podwyżki o $p\\%$ wynosi $\\left(1 + \\frac{p}{100}\\right)$, a obniżki $\\left(1 - \\frac{p}{100}\\right)$. Przy kolejnych zmianach cen mnożysz mnożniki: cena po podwyżce o $10\\%$ i obniżce o $10\\%$ to $c \\cdot 1{,}10 \\cdot 0{,}90 = 0{,}99c$ (spadek o $1\\%$)."
    },
    {
      title: "Jaki procent liczby b stanowi liczba a",
      latex: "p = \\frac{a}{b} \\cdot 100\\%",
      description: "Ułamek $\\frac{a}{b}$ wyrażony w procentach.",
      mnemonic: "W mianowniku (na dole) ZAWSZE stoi to, 'od czego' lub 'w stosunku do czego' liczysz procent (wielkość bazowa).",
      example: "15 z 60 punktów to (15/60) · 100% = 25%.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "W zadaniach 'o ile procent wzrosła wielkość' w mianowniku ZAWSZE wstawiasz wielkość bazową (początkową), a w liczniku różnicę: $p = \\frac{|b - a|}{a} \\cdot 100\\%$."
    }
  ],
  'lesson-1-6': [
    {
      title: "Różnica w punktach procentowych",
      latex: "\\Delta_{\\text{p.p.}} = p_2 - p_1",
      description: "Różnica między dwiema stopami procentowymi wyrażona w punktach procentowych (p.p.).",
      mnemonic: "Zwykłe odejmowanie procentów (25% - 20% = 5) daje punkty procentowe (p.p.), a nie zwykły procent!",
      example: "Wzrost poparcia z 10% do 12% to wzrost o 2 p.p., ale względnie aż o 20%!",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Różnica między stopami procentowymi to punkty procentowe (p.p.). Zmiana względna to różnica podzielona przez wartość początkową razy $100\\%$."
    },
    {
      title: "Błąd bezwzględny i względny",
      latex: "\\Delta = |x - x_0|, \\quad \\delta = \\frac{|x - x_0|}{x} \\cdot 100\\%",
      description: "$x$ – wartość dokładna, $x_0$ – wartość przybliżona. Błąd bezwzględny to moduł różnicy, a względny odnosi go do wartości dokładnej.",
      mnemonic: "Błąd bezwzględny = o ile się pomyliłeś (|x - x₀|). Błąd względny = błąd bezwzględny podzielony przez DOKŁADNĄ wartość (i razy 100%).",
      example: "Dokładna 250, przybliżona 240: Δ = |250 - 240| = 10, δ = (10/250) · 100% = 4%.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Tego wzoru nie ma w spisie karty wzorów! Zapamiętaj: w mianowniku błędu względnego zawsze stoi wartość dokładna $x$, nigdy przybliżenie $x_0$."
    }
  ],
  'lesson-1-7': [
    {
      title: "Działania na potęgach o tej samej podstawie",
      latex: "a^r \\cdot a^s = a^{r+s}, \\quad \\frac{a^r}{a^s} = a^{r-s}",
      description: "Mnożenie potęg o tej samej podstawie = dodawanie wykładników. Dzielenie = odejmowanie.",
      mnemonic: "Mnożenie podstaw → dodajesz wykładniki. Dzielenie podstaw → odejmujesz wykładnik z dołu od góry.",
      example: "3⁴ · 3² = 3⁶, 5⁸ / 5⁵ = 5³.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Przy mnożeniu potęg o tej samej podstawie wykładniki dodajemy, przy dzieleniu odejmujemy."
    },
    {
      title: "Potęga potęgi i wspólny wykładnik",
      latex: "(a^r)^s = a^{r \\cdot s}, \\quad (a \\cdot b)^r = a^r \\cdot b^r",
      description: "Przy potęgowaniu potęgi mnożysz wykładniki. Wspólny wykładnik rozdziela się na każdy czynnik w nawiasie.",
      mnemonic: "Nawias między wykładnikami to znak mnożenia: (aʳ)ˢ = a^(r · s).",
      example: "(2³)$^4$ = 2¹², (2x)³ = 2³ · x³ = 8x³.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Uważaj na nawiasy: $(2^3)^2 = 2^6$, ale $2^{3^2} = 2^9$."
    }
  ],
  'lesson-1-8': [
    {
      title: "Potęga o wykładniku ujemnym",
      latex: "a^{-n} = \\frac{1}{a^n}, \\quad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n",
      description: "Minus w wykładniku nie tworzy liczby ujemnej – jego jedynym zadaniem jest odwrócenie liczby do góry nogami.",
      mnemonic: "Minus w wykładniku to winda: przerzuca liczbę do mianownika i znika. Ułamek odwraca do góry dnem.",
      example: "2⁻³ = 1/2³ = 1/8. (3/4)⁻² = (4/3)² = 16/9.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Pamiętaj: $2^{-3} = \\frac{1}{8}$, a nie $-8$!"
    },
    {
      title: "Potęga zerowa",
      latex: "a^0 = 1 \\quad (a \\neq 0)",
      description: "Każda niezerowa liczba podniesiona do potęgi 0 jest równa 1.",
      mnemonic: "Dowolna liczba (oprócz zera) podniesiona do potęgi 0 daje zawsze dokładnie 1.",
      example: "(-9)⁰ = 1, ale uwaga: -9⁰ = -1 (bo minus nie jest w nawiasie).",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Zwracaj uwagę na nawiasy: $(-a)^0 = 1$, ale $-a^0 = -1$."
    }
  ],
  'lesson-1-9': [
    {
      title: "Definicja potęgi o wykładniku wymiernym",
      latex: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m \\quad (a > 0, \\; n \\ge 2)",
      description: "Mianownik $n$ to stopień pierwiastka, a licznik $m$ to wykładnik potęgi.",
      mnemonic: "Mianownik idzie do korzenia (stopień pierwiastka), a licznik zostaje na gałęzi (zwykła potęga).",
      example: "8^(2/3) = (∛8)² = 2² = 4.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Zawsze najpierw wyciągnij pierwiastek, a potem podnoś do potęgi – liczysz na mniejszych liczbach!"
    },
    {
      title: "Pierwiastek kwadratowy jako potęga 1/2",
      latex: "\\sqrt{a} = a^{\\frac{1}{2}}, \\quad \\sqrt[3]{a} = a^{\\frac{1}{3}}",
      description: "Zamiana pierwiastka na postać potęgową pozwala stosować standardowe reguły działań na potęgach.",
      mnemonic: "Brak stopnia pierwiastka oznacza stopień 2, czyli ułamek 1/2 w wykładniku.",
      example: "√a · ∛a = a^(1/2) · a^(1/3) = a^(3/6 + 2/6) = a^(5/6) = ⁶√(a⁵).",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wszystkie prawa działań na potęgach znajdują się na str. 3 karty wzorów. Gdy masz iloczyn pierwiastków o różnych stopniach, zamień je na potęgi ułamkowe."
    }
  ],
  'lesson-1-10': [
    {
      title: "Mnożenie i dzielenie pierwiastków",
      latex: "\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}, \\quad \\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}",
      description: "Możesz łączyć i rozdzielać pierwiastki tego samego stopnia przy mnożeniu i dzieleniu.",
      mnemonic: "Wspólny dach pierwiastka działa dla mnożenia i dzielenia. Przy dodawaniu i odejmowaniu NIE WOLNO wciągać pod jeden pierwiastek!",
      example: "√18 · √2 = √36 = 6.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wzory na pierwiastki znajdują się na str. 3 karty wzorów. Uważaj: $\\sqrt{a+b} \\neq \\sqrt{a} + \\sqrt{b}$!"
    },
    {
      title: "Wyłączanie czynnika przed znak pierwiastka",
      latex: "\\sqrt{a^2 \\cdot b} = a\\sqrt{b}, \\quad \\sqrt[3]{a^3 \\cdot b} = a\\sqrt[3]{b}",
      description: "Kwadrat liczby wychodzi przed pierwiastek jako pojedyncza liczba.",
      mnemonic: "Szukaj 'kwadratowych cegiełek' (4, 9, 16, 25, 36, 49, 100). Z cegiełki wyciągasz pierwiastek, reszta zostaje pod dachem.",
      example: "√72 = √(36 · 2) = 6√2.",
      in_cke_sheet: true,
      cke_page: "str. 3",
      matura_tip: "Wzory na pierwiastki znajdują się na str. 3 karty wzorów. Przed dodawaniem pierwiastków zawsze wyłącz czynniki przed znak pierwiastka."
    }
  ],
  'lesson-1-11': [
    {
      title: "Usuwanie pojedynczego pierwiastka",
      latex: "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b} \\quad (b > 0)",
      description: "Mnożysz licznik i mianownik przez $\\sqrt{b}$, aby usunąć pierwiastek z mianownika.",
      mnemonic: "Pomnóż górę i dół przez pierwiastek z dołu. Na dole pierwiastek znika: √b · √b = b.",
      example: "10 / √5 = (10√5) / 5 = 2√5.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Wzory na pierwiastki są na str. 3 karty wzorów. Zawsze pamiętaj o skróceniu ułamka po usunięciu niewymierności."
    },
    {
      title: "Usuwanie dwumianu przez sprzężenie",
      latex: "\\frac{c}{\\sqrt{a} - \\sqrt{b}} = \\frac{c(\\sqrt{a} + \\sqrt{b})}{a - b} \\quad (a \\neq b)",
      description: "Mnożysz licznik i mianownik przez to samo wyrażenie z przeciwnym znakiem w środku.",
      mnemonic: "Zmień znak w środku na przeciwny i pomnóż górę i dół. Na dole stosujesz wzór (x-y)(x+y) = x² - y².",
      example: "3 / (√5 - √2) = 3(√5 + √2) / (5 - 2) = √5 + √2.",
      in_cke_sheet: false,
      cke_page: null,
      matura_tip: "Pamiętaj o nawiasach w liczniku! W mianowniku pierwiastki znikają podnosząc się do kwadratu."
    }
  ],
  'lesson-1-12': [
    {
      title: "Wzory skróconego mnożenia stopnia 2",
      latex: "(a \\pm b)^2 = a^2 \\pm 2ab + b^2, \\quad a^2 - b^2 = (a - b)(a + b)",
      description: "Kwadrat sumy/różnicy oraz różnica kwadratów.",
      mnemonic: "Nigdy nie zapominaj o podwojonym iloczynie 2ab! (a+b)² to NIE jest a² + b².",
      example: "(x - 4)² = x² - 8x + 16, x² - 9 = (x - 3)(x + 3).",
      in_cke_sheet: true,
      cke_page: "str. 5",
      matura_tip: "Wzory skróconego mnożenia są na str. 5 karty wzorów. Uważaj na środkowy składnik 2ab oraz znak minus przed nawiasem!"
    }
  ],
  'lesson-1-13': [
    {
      title: "Definicja logarytmu",
      latex: "\\log_a b = c \\iff a^c = b \\quad (a > 0, \\; a \\neq 1, \\; b > 0)",
      description: "Logarytm to pytanie o wykładnik potęgi: do jakiej potęgi $c$ podnieść $a$, aby otrzymać $b$?",
      mnemonic: "Pytanie o logarytm: 'Podstawa na dole – do jakiej potęgi muszę ją podnieść, by wyszła liczba w środku?'",
      example: "log₂ 8 = 3, bo 2³ = 8. log₅ (1/25) = -2, bo 5⁻² = 1/25.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Definicja i własności logarytmów są na str. 4 karty wzorów. Pamiętaj o założeniach: podstawa $a > 0$ i $a \\neq 1$, liczba logarytmowana $b > 0$."
    },
    {
      title: "Własności bazowe logarytmu",
      latex: "\\log_a 1 = 0, \\quad \\log_a a = 1, \\quad a^{\\log_a b} = b",
      description: "Logarytm z 1 to zawsze 0. Logarytm z liczby równej podstawie to 1.",
      mnemonic: "Logarytm z jedynki to ZAWSZE 0 (bo cokolwiek do potęgi 0 to 1). Logarytm z tej samej liczby to 1.",
      example: "log₃ 1 = 0, log₈ 8 = 1, 5^(log₅ 9) = 9.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Definicja i własności logarytmów są na str. 4 karty wzorów. Zapis $\\log x$ bez dolnej liczby to logarytm dziesiętny o podstawie 10."
    }
  ],
  'lesson-1-14': [
    {
      title: "Działania na logarytmach o tej samej podstawie",
      latex: "\\log_a x + \\log_a y = \\log_a(x \\cdot y), \\quad \\log_a x - \\log_a y = \\log_a\\left(\\frac{x}{y}\\right)",
      description: "Suma logarytmów o tej samej podstawie to logarytm iloczynu, różnica to logarytm ilorazu.",
      mnemonic: "Plus między logarytmami → mnóż liczby w środku. Minus między logarytmami → dziel liczby w środku.",
      example: "log₂ 6 + log₂ (4/3) = log₂ (6 · 4/3) = log₂ 8 = 3.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Definicja i własności logarytmów (suma, różnica, zmiana podstawy) są na str. 4 karty wzorów. Pamiętaj: wzory działają tylko przy tej samej podstawie!"
    },
    {
      title: "Wciąganie współczynnika do wykładnika",
      latex: "k \\cdot \\log_a x = \\log_a(x^k)",
      description: "Liczba stojąca przed logarytmem wchodzi do środka jako potęga.",
      mnemonic: "Liczba z przodu wskakuje na plecy liczby logarytmowanej jako wykładnik potęgi.",
      example: "3 · log₂ 2 = log₂ (2³) = log₂ 8 = 3.",
      in_cke_sheet: true,
      cke_page: "str. 4",
      matura_tip: "Jeśli przed logarytmem stoi liczba, np. 2 log 5, najpierw wciągnij ją jako potęgę: log(5²) = log 25, zanim połączysz z innym logarytmem."
    }
  ],
  'lesson-1-15': [
    {
      title: "Definicja algebraiczna wartości bezwzględnej",
      latex: "|x| = \\begin{cases} x & \\text{dla } x \\ge 0 \\\\ -x & \\text{dla } x < 0 \\end{cases}, \\quad \\sqrt{x^2} = |x|",
      description: "Wartość bezwzględna liczby rzeczywistej jest zawsze nieujemna (odległość od zera).",
      mnemonic: "Moduł kasuje minus z liczby ujemnej, a dodatnią zostawia bez zmian. Odległość na osi nie może być ujemna!",
      example: "|-4| = 4. Dla 2 - √5 < 0: |2 - √5| = -(2 - √5) = √5 - 2.",
      in_cke_sheet: true,
      cke_page: "str. 2",
      matura_tip: "Wzory na wartość bezwzględną znajdziesz na str. 2 karty wzorów. Pamiętaj: $\\sqrt{x^2} = |x|$, nigdy samo $x$!"
    },
    {
      title: "Geometryczna interpretacja nierówności z modułem",
      latex: "|x - a| \\le r \\implies x \\in \\langle a - r, a + r \\rangle, \\quad |x - a| \\ge r \\implies x \\in (-\\infty, a-r\\rangle \\cup \\langle a+r, +\\infty)",
      description: "$|x - a|$ to odległość liczby $x$ od środka $a$ na osi, a $r$ to promień (maksymalny dystans).",
      mnemonic: "|x - a| ≤ r (odległość mała) → trzymasz się blisko środka a (jeden przedział). |x - a| ≥ r (odległość duża) → uciekasz w dwa zewnętrzne skrzydła.",
      example: "|x - 2| ≤ 3 to przedział od 2 - 3 = -1 do 2 + 3 = 5, czyli ⟨-1, 5⟩.",
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
    console.log(`Updated core_formulas for ${lesson.id} (${lesson.title})`);
  }
}

fs.writeFileSync(SEED_PATH, JSON.stringify(data, null, 2), 'utf8');
console.log(`\nSuccessfully updated ${updatedCount} lessons in ${SEED_PATH}`);
