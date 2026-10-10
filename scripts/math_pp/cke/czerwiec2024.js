// Egzamin maturalny z matematyki, poziom podstawowy, Formuła 2023 – termin dodatkowy, czerwiec 2024 r.
// Transkrypcja z arkusza CKE; klucz odpowiedzi: wersja A. Rozwiązania krok po kroku – opracowanie JASNE.
import { bars, geo, panels, parabola, polyline } from './fig.js';

const T = String.raw;
const SC = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\n';

const STEM11 = T`W kartezjańskim układzie współrzędnych $(x, y)$ przedstawiono wykres funkcji $f$ (rysunek 1.). Każdy z punktów przecięcia wykresu funkcji $f$ z prostą o równaniu $y = 2$ ma obie współrzędne całkowite.`;
const F11 = polyline([[-1, 4], [0, 2], [1, 0], [7, 4]], [-5, 7], [-3, 6]);
const G11 = polyline([[-5, 4], [-3, 0], [3, 4]], [-5, 7], [-3, 6]);
const STEM15 = T`Funkcja kwadratowa $f$ jest określona wzorem $f(x) = -(x + 1)^2 + 4$.`;
const STEM16 = T`Ciąg $(a_n)$ jest określony wzorem $a_n = 2 \cdot (-1)^{n+1} + 5$ dla każdej liczby naturalnej $n \ge 1$.`;
const STEM23 = T`W kartezjańskim układzie współrzędnych $(x, y)$ dany jest okrąg $\mathcal{O}$ o równaniu` + '\n$$(x - 1)^2 + (y + 2)^2 = 5$$\n';

export default {
  examId: 'matura-czerwiec-2024',
  examName: 'Matura Czerwiec 2024 (Formuła 2023)',
  sourceLabel: 'Matura Czerwiec 2024',
  refLabel: 'Matura czerwiec 2024',
  year: 2024,
  session: 'Czerwiec',
  totalPoints: 46,
  tasks: [
    {
      n: '1', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $2^{-1} \cdot 32^{\frac{3}{5}}$ jest równa`,
      o: ['$(-16)$', '$(-4)$', '$2$', '$4$'],
      a: 'D',
      s: [
        T`$32 = 2^5$, więc $32^{\frac{3}{5}} = \left(2^5\right)^{\frac{3}{5}} = 2^{3} = 8$.`,
        T`$2^{-1} = \frac{1}{2}$.`,
        T`$\frac{1}{2} \cdot 8 = 4$.`
      ],
      trap: T`Wykładnik ujemny nie daje liczby ujemnej: $2^{-1} = \frac{1}{2}$, a nie $-2$. Dlatego wynik nie może być ujemny.`
    },
    {
      n: '2', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $\log_{3}\left(\frac{3}{2}\right) + \log_{3}\left(\frac{2}{9}\right)$ jest równa`,
      o: [T`$\log_{3}\frac{31}{18}$`, T`$\log_{3}\frac{5}{11}$`, '$(-1)$', T`$\frac{1}{3}$`],
      a: 'C',
      s: [
        T`Suma logarytmów o tej samej podstawie to logarytm iloczynu: $\log_{3}\left(\frac{3}{2} \cdot \frac{2}{9}\right)$.`,
        T`$\frac{3}{2} \cdot \frac{2}{9} = \frac{6}{18} = \frac{1}{3}$.`,
        T`$\log_{3}\frac{1}{3} = -1$, bo $3^{-1} = \frac{1}{3}$.`
      ],
      trap: T`Przy dodawaniu logarytmów liczby logarytmowane się MNOŻY, a nie dodaje. Odpowiedź z ułamkiem $\frac{31}{18}$ powstaje z dodania $\frac{3}{2} + \frac{2}{9}$.`,
      tip: T`Karta wzorów, str. 5: $\log_a x + \log_a y = \log_a (x \cdot y)$.`
    },
    {
      n: '3', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $\left(2\sqrt{10} + \sqrt{2}\right)^2$ jest równa`,
      o: ['$22$', '$42$', T`$42 + 4\sqrt{5}$`, T`$42 + 8\sqrt{5}$`],
      a: 'D',
      s: [
        T`Wzór $(a + b)^2 = a^2 + 2ab + b^2$ dla $a = 2\sqrt{10}$, $b = \sqrt{2}$.`,
        T`$a^2 = 4 \cdot 10 = 40$, $b^2 = 2$, $2ab = 2 \cdot 2\sqrt{10} \cdot \sqrt{2} = 4\sqrt{20} = 4 \cdot 2\sqrt{5} = 8\sqrt{5}$.`,
        T`Razem: $40 + 8\sqrt{5} + 2 = 42 + 8\sqrt{5}$.`
      ],
      trap: T`Kwadrat sumy to nie suma kwadratów – wynik $42$ pomija podwojony iloczyn $2ab$. Trzeba też uprościć $\sqrt{20} = 2\sqrt{5}$.`
    },
    {
      n: '4', pts: 1, t: 1, k: 'SC',
      q: T`Klient wpłacił do banku na trzyletnią lokatę kwotę w wysokości $K_0$ zł. Po każdym rocznym okresie oszczędzania bank dolicza odsetki w wysokości $6\%$ od kwoty bieżącego kapitału znajdującego się na lokacie – zgodnie z procentem składanym.` + '\n\n' + SC + T`Po trzech latach oszczędzania w tym banku kwota na lokacie (bez uwzględniania podatków) jest równa`,
      o: [T`$K_0 \cdot (1{,}06)^3$`, T`$K_0 \cdot (1{,}02)^3$`, T`$K_0 \cdot (1{,}03)^6$`, T`$K_0 \cdot 1{,}18$`],
      a: 'A',
      s: [
        T`Po każdym roku kapitał rośnie o $6\%$, czyli jest mnożony przez $1 + 0{,}06 = 1{,}06$.`,
        T`Po trzech latach mnożymy trzykrotnie: $K_0 \cdot 1{,}06 \cdot 1{,}06 \cdot 1{,}06 = K_0 \cdot (1{,}06)^3$.`
      ],
      trap: T`$K_0 \cdot 1{,}18$ to procent prosty ($3 \cdot 6\% = 18\%$). W procencie składanym odsetki dopisuje się do kapitału i w kolejnym roku one też „pracują”.`,
      tip: T`Karta wzorów, str. 10: $K_n = K \cdot \left(1 + \frac{p}{100}\right)^n$.`
    },
    {
      n: '5', pts: 2, t: 2, k: 'PROOF',
      q: T`Wykaż, że dla każdej liczby naturalnej $n \ge 1$ liczba $5n^3 - 5n$ jest podzielna przez $30$.`,
      a: T`$5n^3 - 5n = 5 \cdot (n - 1) \cdot n \cdot (n + 1)$, a iloczyn trzech kolejnych liczb całkowitych jest podzielny przez $6$, więc cała liczba jest podzielna przez $5 \cdot 6 = 30$.`,
      s: [
        T`Rozkładamy na czynniki: $5n^3 - 5n = 5n(n^2 - 1) = 5(n - 1) \cdot n \cdot (n + 1)$.`,
        T`Liczby $n - 1$, $n$, $n + 1$ to trzy kolejne liczby całkowite. Wśród nich jest co najmniej jedna parzysta i dokładnie jedna podzielna przez $3$, więc ich iloczyn jest podzielny przez $6$.`,
        T`Zatem $(n - 1) \cdot n \cdot (n + 1) = 6k$ dla pewnej liczby całkowitej $k$ i $5n^3 - 5n = 5 \cdot 6k = 30k$.`
      ],
      trap: T`Samo wyłączenie piątki nie kończy dowodu. Trzeba uzasadnić podzielność iloczynu trzech kolejnych liczb przez $2$ ORAZ przez $3$.`
    },
    {
      n: '6', pts: 1, t: 3, k: 'SC',
      q: SC + T`Liczba wszystkich całkowitych dodatnich rozwiązań nierówności` + '\n$$\\frac{3x - 5}{12} < \\frac{1}{3}$$\n' + T`jest równa`,
      o: ['$2$', '$3$', '$5$', '$6$'],
      a: 'A',
      s: [
        T`Mnożymy obie strony przez $12$: $3x - 5 < 4$.`,
        T`$3x < 9$, czyli $x < 3$.`,
        T`Całkowite dodatnie liczby mniejsze od $3$ to $1$ i $2$ – są dwie.`
      ],
      trap: T`Nierówność jest ostra, więc $x = 3$ nie jest rozwiązaniem. Zero nie jest liczbą dodatnią, więc też go nie liczymy.`
    },
    {
      n: '7', pts: 1, t: 5, k: 'SC',
      q: SC + T`Układ równań $\begin{cases} x - 2y = 3 \\ -4x + 8y = -12 \end{cases}$`,
      o: ['nie ma rozwiązań.', 'ma dokładnie jedno rozwiązanie.', 'ma dokładnie dwa rozwiązania.', 'ma nieskończenie wiele rozwiązań.'],
      a: 'D',
      s: [
        T`Mnożymy pierwsze równanie przez $-4$: $-4x + 8y = -12$.`,
        T`Otrzymaliśmy dokładnie drugie równanie. Oba równania opisują tę samą prostą.`,
        T`Układ jest nieoznaczony – ma nieskończenie wiele rozwiązań.`
      ],
      trap: T`Gdyby po pomnożeniu zgadzała się tylko lewa strona, a prawa nie – układ byłby sprzeczny (brak rozwiązań). Tu zgadza się wszystko, łącznie z wyrazem wolnym.`
    },
    {
      n: '8', pts: 1, t: 2, k: 'SC',
      q: SC + T`Dla każdej liczby rzeczywistej $x$ różnej od: $(-1)$, $0$ i $1$, wartość wyrażenia $\frac{2x^2}{x^2 - 1} \cdot \frac{x + 1}{x}$ jest równa wartości wyrażenia`,
      o: [T`$2x + 2$`, T`$\frac{2x}{x - 1}$`, T`$\frac{2x}{x^2 - 1}$`, T`$\frac{2x^3 + 1}{x^3 - 1}$`],
      a: 'B',
      s: [
        T`Rozkładamy mianownik: $x^2 - 1 = (x - 1)(x + 1)$.`,
        T`$\frac{2x^2}{(x - 1)(x + 1)} \cdot \frac{x + 1}{x}$ – skracamy $(x + 1)$ oraz $x$.`,
        T`Zostaje $\frac{2x}{x - 1}$.`
      ],
      trap: T`Skracać wolno tylko CZYNNIKI. Najpierw rozłóż $x^2 - 1$ na iloczyn, dopiero potem skracaj.`
    },
    {
      n: '9', pts: 1, t: 2, k: 'NUM',
      q: T`Wielomian $W(x) = ax^3 + bx^2 + cx + d$ jest iloczynem wielomianów $F(x) = (2 - 3x)^2$ oraz $G(x) = 3x - 2$.` + '\n\n' + T`Uzupełnij zdanie. Wpisz odpowiednią liczbę tak, aby zdanie było prawdziwe.` + '\n\n' + T`Suma $a + b + c + d$ współczynników wielomianu $W$ jest równa …`,
      a: '1',
      s: [
        T`Suma współczynników wielomianu to jego wartość dla $x = 1$: $W(1) = a + b + c + d$.`,
        T`$W(1) = F(1) \cdot G(1) = (2 - 3)^2 \cdot (3 - 2) = 1 \cdot 1 = 1$.`
      ],
      trap: T`Nie trzeba wymnażać nawiasów. Wystarczy podstawić $x = 1$ – i pamiętać, że $(-1)^2 = 1$.`
    },
    {
      n: '10', pts: 3, t: 3, k: 'OPEN',
      q: T`Rozwiąż równanie` + '\n$$4x^3 - 12x^2 - x + 3 = 0$$\n' + T`Zapisz obliczenia.`,
      a: T`$x = 3$ lub $x = -\frac{1}{2}$ lub $x = \frac{1}{2}$.`,
      s: [
        T`Grupujemy wyrazy: $4x^2(x - 3) - (x - 3) = 0$.`,
        T`$(x - 3)(4x^2 - 1) = 0$, a ze wzoru na różnicę kwadratów: $(x - 3)(2x - 1)(2x + 1) = 0$.`,
        T`$x = 3$ lub $x = \frac{1}{2}$ lub $x = -\frac{1}{2}$.`
      ],
      trap: T`Przy grupowaniu $-x + 3 = -(x - 3)$. Zgubiony minus daje nawias $(x + 3)$ i grupowanie się nie udaje.`
    },
    {
      n: '11.1', pts: 1, t: 4, k: 'FILL',
      q: STEM11 + '\n\n' + T`Uzupełnij zdanie. Wpisz odpowiedni przedział tak, aby zdanie było prawdziwe.` + '\n\n' + T`Zbiorem wszystkich rozwiązań nierówności $f(x) \le 2$ jest przedział …`,
      fig: { plot: F11 },
      a: T`$\langle 0, 4 \rangle$`,
      s: [
        T`Rysujemy w myśli prostą $y = 2$. Wykres funkcji przecina ją w punktach $(0, 2)$ oraz $(4, 2)$.`,
        T`$f(x) \le 2$ dla tych argumentów, dla których wykres leży na prostej $y = 2$ lub pod nią – czyli między $x = 0$ a $x = 4$.`,
        T`Nierówność jest nieostra, więc $x \in \langle 0, 4 \rangle$.`
      ],
      trap: T`Rozwiązaniem nierówności są ARGUMENTY (odczytujemy z osi $Ox$), a nie wartości. Przedział $\langle 0, 2 \rangle$ to zbiór wartości, a nie rozwiązanie.`
    },
    {
      n: '11.2', pts: 1, t: 4, k: 'AB',
      q: STEM11 + ' ' + T`Na rysunku 2. przedstawiono wykres funkcji $g$, powstałej w wyniku przesunięcia równoległego wykresu funkcji $f$ wzdłuż osi $Ox$ o $4$ jednostki w lewo.` + '\n\n' + T`Dokończ zdanie. Wybierz właściwe zakończenie.` + '\n\n' + T`Funkcje $f$ i $g$ są powiązane zależnością`,
      fig: { plot: panels([['Rysunek 1. – wykres funkcji f', F11], ['Rysunek 2. – wykres funkcji g', G11]]) },
      ab: [T`$g(x) = f(x + 4)$`, T`$g(x) = f(x - 4)$`, T`$g(x) = f(x) - 4$`],
      r: ['dziedziny', 'zbiory wartości'],
      join: 'oraz mają takie same',
      a: 'A2',
      s: [
        T`Przesunięcie wykresu o $4$ jednostki w LEWO wzdłuż osi $Ox$ opisuje wzór $g(x) = f(x + 4)$.`,
        T`Przesunięcie poziome zmienia dziedzinę: $D_f = \langle -1, 7 \rangle$, a $D_g = \langle -5, 3 \rangle$.`,
        T`Zbiór wartości się nie zmienia: obie funkcje przyjmują wartości z przedziału $\langle 0, 4 \rangle$.`
      ],
      trap: T`Znak we wzorze jest „odwrotny” do kierunku: przesunięcie w lewo to $f(x + 4)$, w prawo – $f(x - 4)$. Wzór $f(x) - 4$ przesuwa wykres w dół.`
    },
    {
      n: '12', pts: 1, t: 4, k: 'PF',
      q: T`Funkcja $y = f(x)$ jest określona za pomocą tabeli` + '\n$$\\begin{array}{c|ccccc} x & -2 & -1 & 0 & 1 & 2 \\\\ \\hline y & -1 & 0 & 1 & 0 & 3 \\end{array}$$',
      st: [T`Funkcja $f$ ma dokładnie jedno miejsce zerowe.`, T`W kartezjańskim układzie współrzędnych $(x, y)$ wykres funkcji $f$ jest symetryczny względem osi $Oy$.`],
      a: 'FF',
      s: [
        T`Miejsca zerowe to argumenty, dla których $y = 0$: z tabeli $x = -1$ oraz $x = 1$. Są dwa, więc stwierdzenie 1 jest fałszywe.`,
        T`Symetria względem osi $Oy$ wymagałaby $f(-x) = f(x)$ dla każdego argumentu. Tymczasem $f(-2) = -1$, a $f(2) = 3$ – stwierdzenie 2 jest fałszywe.`
      ],
      trap: T`Miejsce zerowe to argument $x$, dla którego wartość jest równa $0$ – a nie argument $x = 0$. W tabeli dla $x = 0$ wartość to $1$.`
    },
    {
      n: '13', pts: 1, t: 5, k: 'SC',
      q: T`Liczba $2$ jest miejscem zerowym funkcji liniowej $f(x) = (3 - m)x + 4$.` + '\n\n' + SC + T`Liczba $m$ jest równa`,
      o: ['$0$', '$3$', '$4$', '$5$'],
      a: 'D',
      s: [
        T`Miejsce zerowe $2$ oznacza, że $f(2) = 0$: $(3 - m) \cdot 2 + 4 = 0$.`,
        T`$6 - 2m + 4 = 0$, czyli $2m = 10$ i $m = 5$.`
      ],
      trap: T`Dla $m = 3$ współczynnik przy $x$ jest równy zero i funkcja $f(x) = 4$ w ogóle nie ma miejsc zerowych.`
    },
    {
      n: '14', pts: 2, t: 6, k: 'OPEN',
      q: T`Parabola, która jest wykresem funkcji kwadratowej $f$, ma z osiami kartezjańskiego układu współrzędnych $(x, y)$ dokładnie dwa punkty wspólne: $M = (0, 18)$ oraz $N = (3, 0)$.` + '\n\n' + T`Wyznacz wzór funkcji kwadratowej $f$. Zapisz obliczenia.`,
      a: T`$f(x) = 2(x - 3)^2$, czyli $f(x) = 2x^2 - 12x + 18$.`,
      s: [
        T`Punkt $M$ leży na osi $Oy$, więc jedynym punktem wspólnym paraboli z osią $Ox$ jest $N = (3, 0)$. Parabola jest styczna do osi $Ox$ – punkt $N$ to jej wierzchołek.`,
        T`Postać kanoniczna: $f(x) = a(x - 3)^2$.`,
        T`Z punktu $M$: $f(0) = a \cdot 9 = 18$, więc $a = 2$ i $f(x) = 2(x - 3)^2$.`
      ],
      trap: T`„Dokładnie dwa punkty wspólne z osiami” – jeden z nich jest na osi $Oy$, więc na osi $Ox$ zostaje tylko JEDEN. To oznacza jedno miejsce zerowe, czyli wierzchołek na osi $Ox$.`
    },
    {
      n: '15.1', pts: 1, t: 6, k: 'SC',
      q: STEM15 + ' ' + T`Na jednym z rysunków A–D przedstawiono, w kartezjańskim układzie współrzędnych $(x, y)$, fragment wykresu funkcji $y = f(x)$.` + '\n\n' + SC + T`Fragment wykresu funkcji $y = f(x)$ przedstawiono na rysunku`,
      fig: {
        plot: panels([
          ['A', parabola(1, 1, -4, [-5, 5], [-5, 5])],
          ['B', parabola(-1, -1, 4, [-5, 5], [-5, 5])],
          ['C', parabola(1, -1, -4, [-5, 5], [-5, 5])],
          ['D', parabola(-1, 1, 4, [-5, 5], [-5, 5])]
        ])
      },
      o: ['A', 'B', 'C', 'D'],
      a: 'B',
      s: [
        T`Wzór $f(x) = -(x + 1)^2 + 4$ jest w postaci kanonicznej $a(x - p)^2 + q$ z $a = -1$, $p = -1$, $q = 4$.`,
        T`$a < 0$, więc ramiona paraboli są skierowane w dół – odpadają rysunki A i C.`,
        T`Wierzchołek to $(-1, 4)$ – leży na lewo od osi $Oy$. Taki wykres jest na rysunku B.`
      ],
      trap: T`Nawias $(x + 1)$ oznacza $p = -1$, czyli wierzchołek po LEWEJ stronie osi $Oy$. Rysunek D ma wierzchołek w $(1, 4)$.`
    },
    {
      n: '15.2', pts: 1, t: 6, k: 'PF',
      q: STEM15,
      st: [T`Wykres funkcji $f$ przecina oś $Oy$ kartezjańskiego układu współrzędnych $(x, y)$ w punkcie o współrzędnych $(0, 4)$.`, T`Miejsca zerowe funkcji $f$ są równe: $(-3)$ oraz $1$.`],
      a: 'FP',
      s: [
        T`Punkt przecięcia z osią $Oy$: $f(0) = -(0 + 1)^2 + 4 = 3$, czyli $(0, 3)$ – stwierdzenie 1 jest fałszywe.`,
        T`Miejsca zerowe: $-(x + 1)^2 + 4 = 0$, czyli $(x + 1)^2 = 4$, stąd $x + 1 = 2$ lub $x + 1 = -2$, więc $x = 1$ lub $x = -3$ – stwierdzenie 2 jest prawdziwe.`
      ],
      trap: T`Liczba $4$ we wzorze to druga współrzędna WIERZCHOŁKA, a nie punkt przecięcia z osią $Oy$. Ten zawsze liczymy jako $f(0)$.`
    },
    {
      n: '16.1', pts: 1, t: 7, k: 'SC',
      q: STEM16 + '\n\n' + SC + T`Suma dziesięciu początkowych kolejnych wyrazów tego ciągu jest równa`,
      o: ['$3$', '$7$', '$50$', '$100$'],
      a: 'C',
      s: [
        T`Dla $n$ nieparzystych $(-1)^{n+1} = 1$, więc $a_n = 2 + 5 = 7$. Dla $n$ parzystych $(-1)^{n+1} = -1$, więc $a_n = -2 + 5 = 3$.`,
        T`Wśród dziesięciu początkowych wyrazów jest pięć siódemek i pięć trójek.`,
        T`$S_{10} = 5 \cdot 7 + 5 \cdot 3 = 50$.`
      ],
      trap: T`To nie jest ciąg arytmetyczny ani geometryczny – wzory na sumę z karty tu nie działają. Wystarczy wypisać wyrazy: $7, 3, 7, 3, \ldots$`
    },
    {
      n: '16.2', pts: 1, t: 7, k: 'PF',
      q: STEM16,
      st: [T`Ciąg $(a_n)$ jest malejący.`, T`Ciąg $(a_n)$ jest geometryczny.`],
      a: 'FF',
      s: [
        T`Kolejne wyrazy: $7, 3, 7, 3, \ldots$ Ciąg raz maleje, raz rośnie ($a_3 > a_2$), więc nie jest malejący – stwierdzenie 1 jest fałszywe.`,
        T`W ciągu geometrycznym iloraz kolejnych wyrazów jest stały. Tu $\frac{a_2}{a_1} = \frac{3}{7}$, a $\frac{a_3}{a_2} = \frac{7}{3}$ – stwierdzenie 2 jest fałszywe.`
      ],
      trap: T`Spadek z $a_1 = 7$ do $a_2 = 3$ nie wystarcza, by ciąg był malejący – KAŻDY następny wyraz musiałby być mniejszy od poprzedniego.`
    },
    {
      n: '17', pts: 1, t: 7, k: 'SC',
      q: T`W ciągu arytmetycznym $(a_n)$, określonym dla każdej liczby naturalnej $n \ge 1$, dane są wyrazy: $a_1 = 7$ oraz $a_2 = 13$.` + '\n\n' + SC + T`Wyraz $a_{10}$ jest równy`,
      o: ['$(-47)$', '$52$', '$61$', '$67$'],
      a: 'C',
      s: [
        T`Różnica ciągu: $r = a_2 - a_1 = 13 - 7 = 6$.`,
        T`$a_{10} = a_1 + 9r = 7 + 9 \cdot 6 = 61$.`
      ],
      trap: T`Do dziesiątego wyrazu dodajemy różnicę $9$ razy, nie $10$. Wynik $67$ to już $a_{11}$.`,
      tip: T`Karta wzorów, str. 9: $a_n = a_1 + (n - 1)r$.`
    },
    {
      n: '18', pts: 1, t: 7, k: 'SC',
      q: T`Trzywyrazowy ciąg $(-1, 2, x)$ jest arytmetyczny. Trzywyrazowy ciąg $(-1, 2, y)$ jest geometryczny.` + '\n\n' + SC + T`Liczby $x$ oraz $y$ spełniają warunki`,
      o: [T`$x > 0$ i $y > 0$`, T`$x > 0$ i $y < 0$`, T`$x < 0$ i $y > 0$`, T`$x < 0$ i $y < 0$`],
      a: 'B',
      s: [
        T`Ciąg arytmetyczny: $r = 2 - (-1) = 3$, więc $x = 2 + 3 = 5 > 0$.`,
        T`Ciąg geometryczny: $q = \frac{2}{-1} = -2$, więc $y = 2 \cdot (-2) = -4 < 0$.`
      ],
      trap: T`Te same dwa początkowe wyrazy dają zupełnie inne trzecie wyrazy: w arytmetycznym DODAJEMY różnicę, w geometrycznym MNOŻYMY przez iloraz (tutaj ujemny).`
    },
    {
      n: '19', pts: 1, t: 8, k: 'SC',
      q: SC + T`Liczba $1 + \cos^2 27^\circ$ jest równa`,
      o: [T`$2 - \sin^2 27^\circ$`, T`$\sin^2 27^\circ$`, T`$2 + \sin^2 27^\circ$`, '$2$'],
      a: 'A',
      s: [
        T`Z jedynki trygonometrycznej: $\cos^2 27^\circ = 1 - \sin^2 27^\circ$.`,
        T`$1 + \cos^2 27^\circ = 1 + 1 - \sin^2 27^\circ = 2 - \sin^2 27^\circ$.`
      ],
      trap: T`Jedynka trygonometryczna to $\sin^2 \alpha + \cos^2 \alpha = 1$. Samo $1 + \cos^2 \alpha$ nie jest równe ani $2$, ani $\sin^2 \alpha$.`,
      tip: T`Karta wzorów, str. 12: $\sin^2 \alpha + \cos^2 \alpha = 1$.`
    },
    {
      n: '20', pts: 1, t: 8, k: 'SC',
      q: T`Podstawy trapezu prostokątnego $ABCD$ mają długości: $|AB| = 8$ oraz $|CD| = 5$. Wysokość $AD$ tego trapezu ma długość $\sqrt{3}$ (zobacz rysunek).` + '\n\n' + SC + T`Miara kąta ostrego $ABC$ jest równa`,
      fig: { diagram: geo({ pts: { A: [0, 0, 'bl'], B: [8, 0, 'br'], C: [5, 1.732, 'tr'], D: [0, 1.732, 'tl'] }, segs: ['AB', 'BC', 'CD', 'DA'], texts: [[4, -0.45, '8'], [2.5, 2.15, '5'], [-0.5, 0.87, '√3']], height: 220 }) },
      o: [T`$15^\circ$`, T`$30^\circ$`, T`$45^\circ$`, T`$60^\circ$`],
      a: 'B',
      s: [
        T`Z wierzchołka $C$ opuszczamy wysokość na podstawę $AB$; jej spodek oznaczmy $E$. Wtedy $|CE| = \sqrt{3}$ oraz $|EB| = 8 - 5 = 3$.`,
        T`W trójkącie prostokątnym $EBC$: $\operatorname{tg} |\sphericalangle ABC| = \frac{|CE|}{|EB|} = \frac{\sqrt{3}}{3}$.`,
        T`$\operatorname{tg} 30^\circ = \frac{\sqrt{3}}{3}$, więc kąt $ABC$ ma miarę $30^\circ$.`
      ],
      trap: T`$\frac{\sqrt{3}}{3}$ to tangens $30^\circ$, a $\sqrt{3}$ – tangens $60^\circ$. Pomylenie przyprostokątnych (stosunek $\frac{3}{\sqrt{3}}$) daje $60^\circ$.`,
      tip: T`Karta wzorów, str. 12: tabela wartości funkcji trygonometrycznych dla $30^\circ$, $45^\circ$, $60^\circ$.`
    },
    {
      n: '21', pts: 1, t: 9, k: 'SC',
      q: T`Punkty $A$, $B$ oraz $C$ leżą na okręgu o środku w punkcie $S$. Długość łuku $AB$, na którym jest oparty kąt wpisany $ACB$, jest równa $\frac{1}{5}$ długości okręgu (zobacz rysunek).` + '\n\n' + SC + T`Miara kąta ostrego $ACB$ jest równa`,
      fig: { diagram: geo({ pts: { S: [0, 0, 'tr'], A: [-0.819, -0.574, 'l'], B: [0.292, -0.956, 'b'], C: [-0.342, 0.94, 't'] }, segs: ['CA', 'CB'], circles: [[0, 0, 1]] }) },
      o: [T`$18^\circ$`, T`$30^\circ$`, T`$36^\circ$`, T`$72^\circ$`],
      a: 'C',
      s: [
        T`Łuk równy $\frac{1}{5}$ okręgu odpowiada kątowi środkowemu $\frac{1}{5} \cdot 360^\circ = 72^\circ$.`,
        T`Kąt wpisany oparty na tym samym łuku jest dwa razy mniejszy: $\frac{72^\circ}{2} = 36^\circ$.`
      ],
      trap: T`$72^\circ$ to miara kąta ŚRODKOWEGO. Kąt wpisany $ACB$ jest jego połową.`,
      tip: T`Karta wzorów, str. 18: kąt wpisany jest równy połowie kąta środkowego opartego na tym samym łuku.`
    },
    {
      n: '22', pts: 2, t: 9, k: 'OPEN',
      q: T`Bok kwadratu $ABCD$ ma długość równą $12$. Punkt $S$ jest środkiem boku $BC$ tego kwadratu. Na odcinku $AS$ leży punkt $P$ taki, że odcinek $BP$ jest prostopadły do odcinka $AS$.` + '\n\n' + T`Oblicz długość odcinka $BP$. Zapisz obliczenia.`,
      a: T`$|BP| = \frac{12\sqrt{5}}{5}$`,
      s: [
        T`Trójkąt $ABS$ jest prostokątny (kąt prosty przy $B$), $|AB| = 12$, $|BS| = 6$. Z twierdzenia Pitagorasa: $|AS| = \sqrt{144 + 36} = \sqrt{180} = 6\sqrt{5}$.`,
        T`Odcinek $BP$ jest wysokością trójkąta $ABS$ opuszczoną na przeciwprostokątną $AS$. Pole trójkąta liczymy na dwa sposoby: $\frac{1}{2} \cdot 12 \cdot 6 = \frac{1}{2} \cdot 6\sqrt{5} \cdot |BP|$.`,
        T`$|BP| = \frac{72}{6\sqrt{5}} = \frac{12}{\sqrt{5}} = \frac{12\sqrt{5}}{5}$.`
      ],
      trap: T`$BP$ nie jest środkową ani połową przekątnej – to WYSOKOŚĆ trójkąta prostokątnego opuszczona na przeciwprostokątną. Najszybciej wyznacza się ją z pola.`
    },
    {
      n: '23.1', pts: 1, t: 10, k: 'PF',
      q: STEM23.trimEnd(),
      st: [T`Do okręgu $\mathcal{O}$ należy punkt o współrzędnych $(-1, -3)$.`, T`Promień okręgu $\mathcal{O}$ jest równy $5$.`],
      a: 'PF',
      s: [
        T`Podstawiamy punkt do równania: $(-1 - 1)^2 + (-3 + 2)^2 = 4 + 1 = 5$ – równanie jest spełnione, stwierdzenie 1 jest prawdziwe.`,
        T`W równaniu $(x - a)^2 + (y - b)^2 = r^2$ po prawej stronie stoi KWADRAT promienia: $r^2 = 5$, więc $r = \sqrt{5}$ – stwierdzenie 2 jest fałszywe.`
      ],
      trap: T`Liczba po prawej stronie równania okręgu to $r^2$, a nie $r$.`,
      tip: T`Karta wzorów, str. 23: $(x - a)^2 + (y - b)^2 = r^2$ – okrąg o środku $(a, b)$ i promieniu $r$.`
    },
    {
      n: '23.2', pts: 1, t: 10, k: 'SC',
      q: STEM23 + T`Okrąg $\mathcal{K}$ jest obrazem okręgu $\mathcal{O}$ w symetrii środkowej względem początku układu współrzędnych.` + '\n\n' + SC + T`Okrąg $\mathcal{K}$ jest określony równaniem`,
      o: [T`$(x - 1)^2 + (y + 2)^2 = 5$`, T`$(x + 1)^2 + (y + 2)^2 = 5$`, T`$(x - 1)^2 + (y - 2)^2 = 5$`, T`$(x + 1)^2 + (y - 2)^2 = 5$`],
      a: 'D',
      s: [
        T`Środek okręgu $\mathcal{O}$ to $S = (1, -2)$.`,
        T`Symetria środkowa względem punktu $(0, 0)$ zmienia znaki obu współrzędnych: $S' = (-1, 2)$. Promień się nie zmienia.`,
        T`Równanie okręgu $\mathcal{K}$: $(x + 1)^2 + (y - 2)^2 = 5$.`
      ],
      trap: T`Symetria względem początku układu zmienia znak OBU współrzędnych. Zmiana tylko jednej to symetria osiowa względem osi $Ox$ lub $Oy$.`
    },
    {
      n: '24', pts: 4, t: 10, k: 'OPEN',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ dane są punkty $A = (2, 8)$ oraz $B = (10, 2)$. Symetralna odcinka $AB$ przecina oś $Ox$ układu współrzędnych w punkcie $P$.` + '\n\n' + T`Oblicz współrzędne punktu $P$ oraz długość odcinka $AP$. Zapisz obliczenia.`,
      a: T`$P = \left(\frac{9}{4}, 0\right)$, $|AP| = \frac{5\sqrt{41}}{4}$`,
      s: [
        T`Środek odcinka $AB$: $M = \left(\frac{2 + 10}{2}, \frac{8 + 2}{2}\right) = (6, 5)$. Współczynnik kierunkowy prostej $AB$: $\frac{2 - 8}{10 - 2} = -\frac{3}{4}$.`,
        T`Symetralna jest prostopadła do $AB$ i przechodzi przez $M$: jej współczynnik kierunkowy to $\frac{4}{3}$, a równanie: $y = \frac{4}{3}(x - 6) + 5 = \frac{4}{3}x - 3$.`,
        T`Punkt $P$ leży na osi $Ox$, więc $y = 0$: $\frac{4}{3}x = 3$, $x = \frac{9}{4}$. Zatem $P = \left(\frac{9}{4}, 0\right)$.`,
        T`$|AP| = \sqrt{\left(2 - \frac{9}{4}\right)^2 + (8 - 0)^2} = \sqrt{\frac{1}{16} + 64} = \sqrt{\frac{1025}{16}} = \frac{5\sqrt{41}}{4}$.`
      ],
      trap: T`Symetralna przechodzi przez ŚRODEK odcinka i jest do niego prostopadła – jej współczynnik kierunkowy to $\frac{4}{3}$, a nie $-\frac{3}{4}$ ani $\frac{3}{4}$.`,
      tip: T`Sprawdzenie: punkt symetralnej jest równo odległy od końców odcinka, więc powinno być $|AP| = |BP|$. Rzeczywiście $|BP| = \sqrt{\left(\frac{31}{4}\right)^2 + 4} = \frac{5\sqrt{41}}{4}$.`
    },
    {
      n: '25', pts: 1, t: 11, k: 'SC',
      q: T`Ostrosłup prawidłowy ma $2024$ ściany boczne.` + '\n\n' + SC + T`Liczba wszystkich krawędzi tego ostrosłupa jest równa`,
      o: ['$2025$', '$2026$', '$4048$', '$4052$'],
      a: 'C',
      s: [
        T`Ostrosłup ma tyle ścian bocznych, ile boków ma jego podstawa – podstawą jest $2024$-kąt.`,
        T`Krawędzi podstawy jest $2024$ i krawędzi bocznych też $2024$ (po jednej z każdego wierzchołka podstawy).`,
        T`Razem: $2 \cdot 2024 = 4048$.`
      ],
      trap: T`$2025$ to liczba wszystkich ŚCIAN (boczne + podstawa) albo wierzchołków, a nie krawędzi.`
    },
    {
      n: '26', pts: 1, t: 11, k: 'SC',
      q: T`Przekątna ściany sześcianu ma długość $2\sqrt{2}$.` + '\n\n' + SC + T`Objętość tego sześcianu jest równa`,
      o: ['$8$', '$24$', T`$\frac{16\sqrt{6}}{9}$`, T`$16\sqrt{2}$`],
      a: 'A',
      s: [
        T`Ściana sześcianu jest kwadratem o boku $a$; jej przekątna ma długość $a\sqrt{2}$.`,
        T`$a\sqrt{2} = 2\sqrt{2}$, więc $a = 2$.`,
        T`$V = a^3 = 8$.`
      ],
      trap: T`Mowa o przekątnej ŚCIANY ($a\sqrt{2}$), a nie o przekątnej sześcianu ($a\sqrt{3}$). Pomylenie ich daje odpowiedź $\frac{16\sqrt{6}}{9}$.`
    },
    {
      n: '27', pts: 1, t: 11, k: 'SC',
      q: T`Podstawą graniastosłupa prawidłowego czworokątnego jest kwadrat o boku długości $4$. Przekątna tego graniastosłupa jest nachylona do płaszczyzny podstawy pod kątem $\alpha$ takim, że $\operatorname{tg} \alpha = 2$.` + '\n\n' + SC + T`Wysokość tego graniastosłupa jest równa`,
      o: ['$2$', '$8$', T`$8\sqrt{2}$`, T`$16\sqrt{2}$`],
      a: 'C',
      s: [
        T`Kąt nachylenia przekątnej graniastosłupa do podstawy to kąt między tą przekątną a przekątną podstawy.`,
        T`Przekątna podstawy (kwadratu o boku $4$): $d = 4\sqrt{2}$.`,
        T`W trójkącie prostokątnym: $\operatorname{tg} \alpha = \frac{H}{d}$, więc $H = 2 \cdot 4\sqrt{2} = 8\sqrt{2}$.`
      ],
      trap: T`Przyprostokątną przy kącie $\alpha$ jest PRZEKĄTNA podstawy ($4\sqrt{2}$), a nie krawędź podstawy ($4$). Z krawędzią wyszłoby błędne $H = 8$.`
    },
    {
      n: '28', pts: 1, t: 14, k: 'SC',
      q: T`Na diagramie przedstawiono wyniki sprawdzianu z matematyki w pewnej klasie maturalnej. Na osi poziomej podano oceny, które uzyskali uczniowie tej klasy, a na osi pionowej podano liczbę uczniów, którzy otrzymali daną ocenę.` + '\n\n' + SC + T`Średnia arytmetyczna ocen uzyskanych z tego sprawdzianu przez uczniów tej klasy jest równa`,
      fig: { diagram: bars([[1, 2], [2, 9], [3, 5], [4, 3], [5, 5], [6, 1]], { xTitle: 'ocena', yTitle: 'liczba uczniów' }) },
      o: ['$3$', '$3{,}12$', '$3{,}5$', '$4{,}1(6)$'],
      a: 'B',
      s: [
        T`Liczba uczniów: $2 + 9 + 5 + 3 + 5 + 1 = 25$.`,
        T`Suma ocen: $1 \cdot 2 + 2 \cdot 9 + 3 \cdot 5 + 4 \cdot 3 + 5 \cdot 5 + 6 \cdot 1 = 2 + 18 + 15 + 12 + 25 + 6 = 78$.`,
        T`Średnia: $\frac{78}{25} = 3{,}12$.`
      ],
      trap: T`Średnia ocen to nie średnia liczb $1$–$6$ (czyli $3{,}5$) ani średnia wysokości słupków ($\frac{25}{6} = 4{,}1(6)$). Każdą ocenę mnożymy przez liczbę uczniów.`
    },
    {
      n: '29', pts: 1, t: 12, k: 'SC',
      q: SC + T`Wszystkich liczb naturalnych czterocyfrowych parzystych, w których zapisie dziesiętnym występują tylko cyfry $2$, $4$, $7$ (np.: $7272$, $2222$, $7244$), jest`,
      o: ['$16$', '$27$', '$54$', '$81$'],
      a: 'C',
      s: [
        T`Liczba jest parzysta, gdy jej ostatnia cyfra jest parzysta: na miejscu jedności może stać $2$ lub $4$ – dwie możliwości.`,
        T`Na każdym z trzech pozostałych miejsc może stać dowolna z trzech cyfr.`,
        T`Z reguły mnożenia: $3 \cdot 3 \cdot 3 \cdot 2 = 54$.`
      ],
      trap: T`$81 = 3^4$ to wszystkie liczby z tych cyfr, także nieparzyste. Warunek parzystości ogranicza tylko OSTATNIĄ cyfrę.`
    },
    {
      n: '30', pts: 1, t: 13, k: 'SC',
      q: T`W pudełku znajdują się wyłącznie kule białe i czarne. Kul czarnych jest $18$. Z tego pudełka w sposób losowy wyciągamy jedną kulę. Prawdopodobieństwo zdarzenia polegającego na tym, że wyciągniemy kulę czarną, jest równe $\frac{3}{5}$.` + '\n\n' + SC + T`Liczba kul białych w pudełku, przed wyciągnięciem jednej kuli, była równa`,
      o: ['$9$', '$12$', '$15$', '$30$'],
      a: 'B',
      s: [
        T`Niech $n$ oznacza liczbę wszystkich kul. Wtedy $\frac{18}{n} = \frac{3}{5}$.`,
        T`$3n = 90$, więc $n = 30$.`,
        T`Kul białych jest $30 - 18 = 12$.`
      ],
      trap: T`$30$ to liczba WSZYSTKICH kul. Pytają o kule białe – trzeba jeszcze odjąć $18$ czarnych.`
    },
    {
      n: '31', pts: 2, t: 13, k: 'OPEN',
      q: T`Doświadczenie losowe polega na dwukrotnym rzucie symetryczną sześcienną kostką do gry, która na każdej ściance ma inną liczbę oczek – od jednego oczka do sześciu oczek.` + '\n\n' + T`Oblicz prawdopodobieństwo zdarzenia $A$ polegającego na tym, że w pierwszym rzucie wypadnie większa liczba oczek niż w drugim rzucie. Zapisz obliczenia.`,
      a: T`$P(A) = \frac{15}{36} = \frac{5}{12}$`,
      s: [
        T`Wszystkich wyników dwukrotnego rzutu kostką jest $|\Omega| = 6 \cdot 6 = 36$.`,
        T`Zliczamy pary (pierwszy rzut, drugi rzut) z większą liczbą w pierwszym rzucie: dla $2$ jest $1$ para, dla $3$ – $2$, dla $4$ – $3$, dla $5$ – $4$, dla $6$ – $5$. Razem $|A| = 1 + 2 + 3 + 4 + 5 = 15$.`,
        T`$P(A) = \frac{15}{36} = \frac{5}{12}$.`
      ],
      trap: T`To nie jest $\frac{1}{2}$: z $36$ wyników $6$ to remisy (ta sama liczba oczek), a pozostałe $30$ dzieli się po równo – stąd $15$.`
    },
    {
      n: '32', pts: 2, t: 15, k: 'PARTS',
      q: T`Właściciel sklepu z zabawkami przeprowadził lokalne badanie rynkowe dotyczące wpływu zmiany ceny zestawu klocków na liczbę kupujących ten produkt. Z badania wynika, że dzienny przychód $P$ ze sprzedaży zestawów klocków, w zależności od kwoty obniżki ceny zestawu o $x$ zł, wyraża się wzorem` + '\n$$P(x) = (70 - x)(20 + x)$$\n' + T`gdzie $x$ jest liczbą całkowitą spełniającą warunki $x \ge 0$ i $x \le 60$.` + '\n\n' + T`Uzupełnij każde zdanie. Wybierz właściwą odpowiedź spośród oznaczonych literami A–E.`,
      parts: [T`Dzienny przychód ze sprzedaży zestawów klocków będzie największy, gdy liczba $x$ jest równa`, T`Dzienny przychód ze sprzedaży zestawów klocków będzie równy $800$ zł, gdy liczba $x$ jest równa`],
      choices: ['$25$', '$30$', '$45$', '$50$', '$60$'],
      a: 'AE',
      s: [
        T`Miejsca zerowe funkcji $P$ to $x = 70$ oraz $x = -20$. Ramiona paraboli są skierowane w dół, więc wartość największa jest w wierzchołku: $x = \frac{70 + (-20)}{2} = 25$ (liczba należy do dziedziny) – odpowiedź A.`,
        T`$P(x) = 800$: $(70 - x)(20 + x) = 800$, czyli $-x^2 + 50x + 1400 = 800$, stąd $x^2 - 50x - 600 = 0$.`,
        T`$\Delta = 2500 + 2400 = 4900$, $\sqrt{\Delta} = 70$, więc $x = \frac{50 + 70}{2} = 60$ lub $x = \frac{50 - 70}{2} = -10$. Warunek $0 \le x \le 60$ spełnia tylko $x = 60$ – odpowiedź E.`
      ],
      trap: T`Wierzchołek leży w połowie między miejscami zerowymi $70$ i $-20$, a nie między $0$ a $60$. W drugiej części ujemne rozwiązanie $x = -10$ trzeba odrzucić.`,
      tip: T`Miejsca zerowe leżą symetrycznie względem osi paraboli, więc pierwsza współrzędna wierzchołka to ich średnia: $p = \frac{x_1 + x_2}{2}$.`
    }
  ]
};
