// Egzamin maturalny z matematyki, poziom podstawowy, Formuła 2023 – maj 2023 r.
// Transkrypcja z arkusza CKE; klucz odpowiedzi: wersja A. Rozwiązania krok po kroku – opracowanie JASNE.
import { bars, geo, lines, plot, polyline } from './fig.js';

const T = String.raw;
const SC = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\n';

const STEM12 = T`W kartezjańskim układzie współrzędnych $(x, y)$ narysowano wykres funkcji $y = f(x)$ (zobacz rysunek).`;
const FIG12 = {
  plot: plot([-6, 5], [-3, 5], {
    type: 'PIECEWISE_LINEAR',
    segments: [
      { from: [-6, 2], to: [-3, 2], startDot: 'filled', endDot: 'hollow' },
      { from: [-3, -3], to: [1, 1], startDot: 'filled', endDot: 'filled' },
      { from: [1, 5], to: [2, 5], startDot: 'hollow', endDot: 'none' },
      { from: [2, 5], to: [5, 3], startDot: 'none', endDot: 'filled' }
    ]
  })
};
const STEM31 = T`Właściciel pewnej apteki przeanalizował dane dotyczące liczby obsługiwanych klientów z $30$ kolejnych dni. Przyjmijmy, że liczbę $L$ obsługiwanych klientów $n$-tego dnia opisuje funkcja` + '\n$$L(n) = -n^2 + 22n + 279$$\n' + T`gdzie $n$ jest liczbą naturalną spełniającą warunki $n \ge 1$ i $n \le 30$.`;

export default {
  examId: 'matura-maj-2023',
  examName: 'Matura Maj 2023 (Formuła 2023)',
  sourceLabel: 'Matura Maj 2023',
  refLabel: 'Matura maj 2023',
  year: 2023,
  session: 'Maj',
  totalPoints: 46,
  tasks: [
    {
      n: '1', pts: 1, t: 1, k: 'SC',
      q: T`Na osi liczbowej zaznaczono sumę przedziałów $(-\infty, -2 \rangle \cup \langle 5, +\infty)$.` + '\n\n' + SC + T`Zbiór zaznaczony na osi jest zbiorem wszystkich rozwiązań nierówności`,
      fig: { numberLine: { min: -6, max: 9, ticks: [-2, 5], intervals: [{ from: null, to: -2, toIncluded: true }, { from: 5, to: null, fromIncluded: true }] } },
      o: [T`$|x - 3{,}5| \ge 1{,}5$`, T`$|x - 1{,}5| \ge 3{,}5$`, T`$|x - 3{,}5| \le 1{,}5$`, T`$|x - 1{,}5| \le 3{,}5$`],
      a: 'B',
      s: [
        T`Zaznaczono dwa promienie „na zewnątrz” – to rozwiązanie nierówności typu $|x - a| \ge r$.`,
        T`Liczba $a$ to środek między $-2$ i $5$: $a = \frac{-2 + 5}{2} = 1{,}5$.`,
        T`Liczba $r$ to odległość od środka do każdego z końców: $r = 5 - 1{,}5 = 3{,}5$. Nierówność: $|x - 1{,}5| \ge 3{,}5$.`
      ],
      trap: T`W nierówności $|x - a| \ge r$ liczba $a$ to ŚRODEK, a $r$ to PROMIEŃ. Zamiana ról ($a = 3{,}5$, $r = 1{,}5$) daje odpowiedź A.`
    },
    {
      n: '2', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $\sqrt[3]{-\frac{27}{16}} \cdot \sqrt[3]{2}$ jest równa`,
      o: [T`$\left(-\frac{3}{2}\right)$`, T`$\frac{3}{2}$`, T`$\frac{2}{3}$`, T`$\left(-\frac{2}{3}\right)$`],
      a: 'A',
      s: [
        T`Iloczyn pierwiastków tego samego stopnia to pierwiastek z iloczynu: $\sqrt[3]{-\frac{27}{16} \cdot 2} = \sqrt[3]{-\frac{27}{8}}$.`,
        T`$\sqrt[3]{-\frac{27}{8}} = -\frac{3}{2}$, bo $\left(-\frac{3}{2}\right)^3 = -\frac{27}{8}$.`
      ],
      trap: T`Pierwiastek stopnia NIEPARZYSTEGO z liczby ujemnej istnieje i jest ujemny. Zgubienie minusa daje odpowiedź $\frac{3}{2}$.`
    },
    {
      n: '3', pts: 2, t: 2, k: 'PROOF',
      q: T`Wykaż, że dla każdej liczby naturalnej $n \ge 1$ liczba $(2n + 1)^2 - 1$ jest podzielna przez $8$.`,
      a: T`$(2n + 1)^2 - 1 = 4n(n + 1)$, a iloczyn $n(n + 1)$ dwóch kolejnych liczb naturalnych jest parzysty, więc cała liczba jest podzielna przez $4 \cdot 2 = 8$.`,
      s: [
        T`Rozwijamy kwadrat: $(2n + 1)^2 - 1 = 4n^2 + 4n + 1 - 1 = 4n^2 + 4n = 4n(n + 1)$.`,
        T`Liczby $n$ oraz $n + 1$ to dwie kolejne liczby naturalne – jedna z nich jest parzysta, więc $n(n + 1) = 2k$ dla pewnej liczby całkowitej $k$.`,
        T`Zatem $(2n + 1)^2 - 1 = 4 \cdot 2k = 8k$, czyli liczba jest podzielna przez $8$.`
      ],
      trap: T`Wyłączenie czwórki daje tylko podzielność przez $4$. Brakującą dwójkę „dostarcza” iloczyn dwóch kolejnych liczb – i to trzeba napisać wprost.`
    },
    {
      n: '4', pts: 1, t: 1, k: 'SC',
      q: SC + T`Liczba $\log_9 27 + \log_9 3$ jest równa`,
      o: ['$81$', '$9$', '$4$', '$2$'],
      a: 'D',
      s: [
        T`Suma logarytmów to logarytm iloczynu: $\log_9 (27 \cdot 3) = \log_9 81$.`,
        T`$9^2 = 81$, więc $\log_9 81 = 2$.`
      ],
      trap: T`$81$ to liczba logarytmowana, a nie wartość logarytmu. Logarytm odpowiada na pytanie: „do jakiej potęgi podnieść $9$, żeby dostać $81$?”.`,
      tip: T`Karta wzorów, str. 5: $\log_a x + \log_a y = \log_a (x \cdot y)$.`
    },
    {
      n: '5', pts: 1, t: 2, k: 'SC',
      q: SC + T`Dla każdej liczby rzeczywistej $a$ wyrażenie $(2a - 3)^2 - (2a + 3)^2$ jest równe`,
      o: [T`$-24a$`, '$0$', '$18$', T`$16a^2 - 24a$`],
      a: 'A',
      s: [
        T`$(2a - 3)^2 = 4a^2 - 12a + 9$ oraz $(2a + 3)^2 = 4a^2 + 12a + 9$.`,
        T`Odejmujemy: $4a^2 - 12a + 9 - 4a^2 - 12a - 9 = -24a$.`
      ],
      trap: T`Minus przed drugim nawiasem zmienia znaki wszystkich jego składników. Kwadraty i dziewiątki się skracają, ale wyrazy $-12a$ i $-12a$ się DODAJĄ.`
    },
    {
      n: '6', pts: 1, t: 3, k: 'SC',
      q: SC + T`Zbiorem wszystkich rozwiązań nierówności` + '\n$$-2(x + 3) \\le \\frac{2 - x}{3}$$\n' + T`jest przedział`,
      o: [T`$(-\infty, -4 \rangle$`, T`$(-\infty, 4 \rangle$`, T`$\langle -4, +\infty)$`, T`$\langle 4, +\infty)$`],
      a: 'C',
      s: [
        T`Mnożymy obie strony przez $3$: $-6(x + 3) \le 2 - x$, czyli $-6x - 18 \le 2 - x$.`,
        T`Przenosimy wyrazy: $-5x \le 20$.`,
        T`Dzielimy przez $-5$ i odwracamy znak nierówności: $x \ge -4$.`
      ],
      trap: T`Dzielenie przez liczbę ujemną odwraca znak nierówności. Bez tego wyszłoby $x \le -4$, czyli odpowiedź A.`
    },
    {
      n: '7', pts: 1, t: 3, k: 'SC',
      q: SC + T`Jednym z rozwiązań równania $\sqrt{3}(x^2 - 2)(x + 3) = 0$ jest liczba`,
      o: ['$3$', '$2$', T`$\sqrt{3}$`, T`$\sqrt{2}$`],
      a: 'D',
      s: [
        T`Iloczyn jest równy zero, gdy któryś z czynników jest równy zero. Czynnik $\sqrt{3}$ jest stałą różną od zera.`,
        T`$x^2 - 2 = 0$ daje $x = \sqrt{2}$ lub $x = -\sqrt{2}$, a $x + 3 = 0$ daje $x = -3$.`,
        T`Spośród podanych liczb rozwiązaniem jest $\sqrt{2}$.`
      ],
      trap: T`$\sqrt{3}$ to stały czynnik, a nie rozwiązanie. Z nawiasu $(x + 3)$ wychodzi $-3$, a nie $3$.`
    },
    {
      n: '8', pts: 1, t: 3, k: 'SC',
      q: SC + T`Równanie $\frac{(x + 1)(x - 1)^2}{(x - 1)(x + 1)^2} = 0$ w zbiorze liczb rzeczywistych`,
      o: [T`nie ma rozwiązania.`, T`ma dokładnie jedno rozwiązanie: $-1$.`, T`ma dokładnie jedno rozwiązanie: $1$.`, T`ma dokładnie dwa rozwiązania: $-1$ oraz $1$.`],
      a: 'A',
      s: [
        T`Dziedzina: mianownik różny od zera, czyli $x \ne 1$ i $x \ne -1$.`,
        T`Licznik jest równy zero dla $x = -1$ lub $x = 1$.`,
        T`Obie te liczby są wykluczone z dziedziny, więc równanie nie ma rozwiązań.`
      ],
      trap: T`Zanim skrócisz ułamek, wyznacz dziedzinę. „Kandydaci” $-1$ i $1$ zerują także mianownik, więc odpadają.`
    },
    {
      n: '9', pts: 3, t: 3, k: 'OPEN',
      q: T`Rozwiąż równanie` + '\n$$3x^3 - 2x^2 - 12x + 8 = 0$$\n' + T`Zapisz obliczenia.`,
      a: T`$x = \frac{2}{3}$ lub $x = -2$ lub $x = 2$.`,
      s: [
        T`Grupujemy wyrazy: $x^2(3x - 2) - 4(3x - 2) = 0$.`,
        T`$(3x - 2)(x^2 - 4) = 0$, czyli $(3x - 2)(x - 2)(x + 2) = 0$.`,
        T`$x = \frac{2}{3}$ lub $x = 2$ lub $x = -2$.`
      ],
      trap: T`Przy grupowaniu: $-12x + 8 = -4(3x - 2)$. Błąd znaku w drugim nawiasie uniemożliwia wyłączenie wspólnego czynnika.`
    },
    {
      n: '10', pts: 1, t: 5, k: 'SC',
      q: T`Na rysunku przedstawiono interpretację geometryczną w kartezjańskim układzie współrzędnych $(x, y)$ jednego z niżej zapisanych układów równań A–D.` + '\n\n' + SC + T`Układem równań, którego interpretację geometryczną przedstawiono na rysunku, jest`,
      fig: { plot: lines([[-1, 2], [2, -1]], [-5, 5], [-3, 5]) },
      o: [
        T`$\begin{cases} y = -x + 2 \\ y = -2x + 1 \end{cases}$`,
        T`$\begin{cases} y = x - 2 \\ y = -2x - 1 \end{cases}$`,
        T`$\begin{cases} y = x - 2 \\ y = 2x + 1 \end{cases}$`,
        T`$\begin{cases} y = -x + 2 \\ y = 2x - 1 \end{cases}$`
      ],
      a: 'D',
      s: [
        T`Prosta opadająca przecina oś $Oy$ w punkcie $(0, 2)$ i oś $Ox$ w punkcie $(2, 0)$: $y = -x + 2$.`,
        T`Prosta rosnąca przecina oś $Oy$ w punkcie $(0, -1)$ i przechodzi przez punkt $(1, 1)$: $y = 2x - 1$.`,
        T`Sprawdzenie: proste przecinają się w punkcie $(1, 1)$ – spełnia on oba równania układu D.`
      ],
      trap: T`Jedna prosta rośnie, druga opada – współczynniki kierunkowe muszą mieć różne znaki. To od razu eliminuje układy A i C.`
    },
    {
      n: '11', pts: 2, t: 5, k: 'MULTI',
      q: T`Dany jest prostokąt o bokach długości $a$ i $b$, gdzie $a > b$. Obwód tego prostokąta jest równy $30$. Jeden z boków prostokąta jest o $5$ krótszy od drugiego.` + '\n\n' + T`Wybierz dwie właściwe odpowiedzi spośród oznaczonych literami A–F. Zależności między długościami boków tego prostokąta zapisano w układach równań oznaczonych literami:`,
      o: [
        T`$\begin{cases} 2ab = 30 \\ a - b = 5 \end{cases}$`,
        T`$\begin{cases} 2a + b = 30 \\ a = 5b \end{cases}$`,
        T`$\begin{cases} 2(a + b) = 30 \\ b = a - 5 \end{cases}$`,
        T`$\begin{cases} 2a + 2b = 30 \\ b = 5a \end{cases}$`,
        T`$\begin{cases} 2a + 2b = 30 \\ a - b = 5 \end{cases}$`,
        T`$\begin{cases} a + b = 30 \\ a = b + 5 \end{cases}$`
      ],
      a: 'CE',
      s: [
        T`Obwód prostokąta: $2a + 2b = 30$, co można też zapisać jako $2(a + b) = 30$.`,
        T`Krótszy bok $b$ jest o $5$ krótszy od $a$: $b = a - 5$, czyli równoważnie $a - b = 5$.`,
        T`Oba warunki naraz zawierają układy C i E. W pozostałych jest błąd: iloczyn zamiast sumy (A), „$5$ razy” zamiast „o $5$” (B, D) albo suma boków zamiast obwodu (F).`
      ],
      trap: T`„O $5$ krótszy” to odejmowanie ($b = a - 5$), a „$5$ razy krótszy” to dzielenie. Obwód to $2a + 2b$, a nie $a + b$.`
    },
    {
      n: '12.1', pts: 1, t: 4, k: 'SC',
      q: STEM12 + '\n\n' + SC + T`Dziedziną funkcji $f$ jest zbiór`,
      fig: FIG12,
      o: [T`$\langle -6, 5 \rangle$`, T`$(-6, 5)$`, T`$(-3, 5 \rangle$`, T`$\langle -3, 5 \rangle$`],
      a: 'A',
      s: [
        T`Dziedzinę odczytujemy z osi $Ox$: to wszystkie argumenty, nad którymi lub pod którymi jest jakiś punkt wykresu.`,
        T`Wykres zaczyna się w punkcie o pierwszej współrzędnej $-6$ (kółko zamalowane) i kończy w punkcie o pierwszej współrzędnej $5$ (kółko zamalowane).`,
        T`Dla $x = -3$ i $x = 1$ pusta kropka jednego fragmentu jest „uzupełniona” zamalowaną kropką innego fragmentu. Zatem $D_f = \langle -6, 5 \rangle$.`
      ],
      trap: T`Puste kółka w punktach $(-3, 2)$ i $(1, 5)$ nie tworzą dziur w dziedzinie – dla $x = -3$ i $x = 1$ funkcja ma wartości na innym fragmencie wykresu.`
    },
    {
      n: '12.2', pts: 1, t: 4, k: 'SC',
      q: STEM12 + '\n\n' + SC + T`Największa wartość funkcji $f$ w przedziale $\langle -4, 1 \rangle$ jest równa`,
      fig: FIG12,
      o: ['$0$', '$1$', '$2$', '$5$'],
      a: 'C',
      s: [
        T`Dla $x \in \langle -4, -3)$ wykres jest poziomym odcinkiem na wysokości $2$, więc $f(x) = 2$.`,
        T`Dla $x \in \langle -3, 1 \rangle$ wartości rosną od $-3$ do $1$.`,
        T`Największa wartość w całym przedziale $\langle -4, 1 \rangle$ to $2$.`
      ],
      trap: T`Wartość $5$ funkcja przyjmuje dopiero dla $x > 1$ (pusta kropka w $(1, 5)$), więc w przedziale $\langle -4, 1 \rangle$ się nie liczy. Z kolei $1 = f(1)$ jest mniejsze od $2$.`
    },
    {
      n: '12.3', pts: 1, t: 4, k: 'SC',
      q: STEM12 + '\n\n' + SC + T`Funkcja $f$ jest malejąca w zbiorze`,
      fig: FIG12,
      o: [T`$\langle -6, -3)$`, T`$\langle -3, 1 \rangle$`, T`$(1, 2 \rangle$`, T`$\langle 2, 5 \rangle$`],
      a: 'D',
      s: [
        T`Funkcja jest malejąca tam, gdzie wykres „opada” przy przesuwaniu się w prawo.`,
        T`W $\langle -6, -3)$ i w $(1, 2 \rangle$ wykres jest poziomy (funkcja stała), w $\langle -3, 1 \rangle$ – rośnie.`,
        T`Wykres opada tylko dla $x \in \langle 2, 5 \rangle$ (od wartości $5$ do $3$).`
      ],
      trap: T`Funkcja stała (poziomy odcinek) nie jest ani rosnąca, ani malejąca.`
    },
    {
      n: '13', pts: 1, t: 5, k: 'SC',
      q: T`Funkcja liniowa $f$ jest określona wzorem $f(x) = ax + b$, gdzie $a$ i $b$ są pewnymi liczbami rzeczywistymi. Na rysunku przedstawiono fragment wykresu funkcji $f$ w kartezjańskim układzie współrzędnych $(x, y)$.` + '\n\n' + SC + T`Liczba $a$ oraz liczba $b$ we wzorze funkcji $f$ spełniają warunki:`,
      fig: { plot: lines([[-2.5, 0.5]], [-2, 2], [-2, 2]) },
      o: [T`$a > 0$ i $b > 0$.`, T`$a > 0$ i $b < 0$.`, T`$a < 0$ i $b > 0$.`, T`$a < 0$ i $b < 0$.`],
      a: 'C',
      s: [
        T`Wykres „opada” – funkcja jest malejąca, więc współczynnik kierunkowy jest ujemny: $a < 0$.`,
        T`Wykres przecina oś $Oy$ powyżej zera (między $0$ a $1$), więc $b = f(0) > 0$.`
      ],
      trap: T`Liczba $b$ to punkt przecięcia z osią $Oy$, a nie z osią $Ox$. Tu wykres przecina oś $Oy$ nad początkiem układu.`
    },
    {
      n: '14', pts: 1, t: 6, k: 'SC',
      q: T`Jednym z miejsc zerowych funkcji kwadratowej $f$ jest liczba $(-5)$. Pierwsza współrzędna wierzchołka paraboli, będącej wykresem funkcji $f$, jest równa $3$.` + '\n\n' + SC + T`Drugim miejscem zerowym funkcji $f$ jest liczba`,
      o: ['$11$', '$1$', '$(-1)$', '$(-13)$'],
      a: 'A',
      s: [
        T`Miejsca zerowe paraboli leżą symetrycznie względem osi symetrii $x = 3$, więc $\frac{x_1 + x_2}{2} = 3$.`,
        T`$\frac{-5 + x_2}{2} = 3$, czyli $-5 + x_2 = 6$.`,
        T`$x_2 = 11$.`
      ],
      trap: T`Od $-5$ do osi symetrii jest $8$ jednostek, więc drugie miejsce zerowe leży $8$ jednostek na PRAWO od $3$. Odpowiedź $-13$ to odłożenie tej odległości w złą stronę.`,
      tip: T`Karta wzorów, str. 8: $p = -\frac{b}{2a}$ oraz $x_1 + x_2 = -\frac{b}{a}$, stąd $p = \frac{x_1 + x_2}{2}$.`
    },
    {
      n: '15', pts: 1, t: 7, k: 'SC',
      q: T`Ciąg $(a_n)$ jest określony wzorem $a_n = 2^n \cdot (n + 1)$ dla każdej liczby naturalnej $n \ge 1$.` + '\n\n' + SC + T`Wyraz $a_4$ jest równy`,
      o: ['$64$', '$40$', '$48$', '$80$'],
      a: 'D',
      s: [
        T`Podstawiamy $n = 4$: $a_4 = 2^4 \cdot (4 + 1)$.`,
        T`$2^4 = 16$, więc $a_4 = 16 \cdot 5 = 80$.`
      ],
      trap: T`$2^4 = 16$, a nie $8$ ($2 \cdot 4$). Potęgowanie to nie mnożenie przez wykładnik.`
    },
    {
      n: '16', pts: 1, t: 7, k: 'SC',
      q: T`Trzywyrazowy ciąg $(27, 9, a - 1)$ jest geometryczny.` + '\n\n' + SC + T`Liczba $a$ jest równa`,
      o: ['$3$', '$0$', '$4$', '$2$'],
      a: 'C',
      s: [
        T`Iloraz ciągu: $q = \frac{9}{27} = \frac{1}{3}$.`,
        T`Trzeci wyraz: $9 \cdot \frac{1}{3} = 3$, więc $a - 1 = 3$.`,
        T`$a = 4$.`
      ],
      trap: T`$3$ to trzeci WYRAZ ciągu, a pytają o liczbę $a$. Trzeba jeszcze rozwiązać równanie $a - 1 = 3$.`
    },
    {
      n: '17', pts: 2, t: 7, k: 'OPEN',
      q: T`Pan Stanisław spłacił pożyczkę w wysokości $8910$ zł w osiemnastu ratach. Każda kolejna rata była mniejsza od poprzedniej o $30$ zł.` + '\n\n' + T`Oblicz kwotę pierwszej raty. Zapisz obliczenia.`,
      a: T`Pierwsza rata była równa $750$ zł.`,
      s: [
        T`Kolejne raty tworzą ciąg arytmetyczny o różnicy $r = -30$, a suma osiemnastu rat to $S_{18} = 8910$.`,
        T`$S_{18} = \frac{2a_1 + 17 \cdot (-30)}{2} \cdot 18 = 9(2a_1 - 510)$.`,
        T`$9(2a_1 - 510) = 8910$, więc $2a_1 - 510 = 990$, $2a_1 = 1500$ i $a_1 = 750$.`
      ],
      trap: T`Raty MALEJĄ, więc różnica ciągu jest ujemna: $r = -30$. Podstawienie $r = 30$ daje pierwszą ratę $240$ zł – najmniejszą zamiast największej.`,
      tip: T`Karta wzorów, str. 9: $S_n = \frac{2a_1 + (n - 1)r}{2} \cdot n$.`
    },
    {
      n: '18', pts: 1, t: 8, k: 'SC',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ zaznaczono kąt $\alpha$ o wierzchołku w punkcie $O = (0, 0)$. Jedno z ramion tego kąta pokrywa się z dodatnią półosią $Ox$, a drugie przechodzi przez punkt $P = (-3, 1)$ (zobacz rysunek).` + '\n\n' + SC + T`Tangens kąta $\alpha$ jest równy`,
      fig: { plot: polyline([[3, 0], [0, 0], [-3, 1]], [-3, 3], [-1, 2], { start: 'none', end: 'filled', labels: [{ x: -2.4, y: 1.5, text: 'P = (−3, 1)' }, { x: 0.4, y: 0.4, text: 'α' }] }) },
      o: [T`$\frac{1}{\sqrt{10}}$`, T`$\left(-\frac{3}{\sqrt{10}}\right)$`, T`$\left(-\frac{3}{1}\right)$`, T`$\left(-\frac{1}{3}\right)$`],
      a: 'D',
      s: [
        T`Dla kąta w układzie współrzędnych, którego ramię końcowe przechodzi przez punkt $P = (x, y)$: $\operatorname{tg} \alpha = \frac{y}{x}$.`,
        T`$\operatorname{tg} \alpha = \frac{1}{-3} = -\frac{1}{3}$.`
      ],
      trap: T`Tangens to $\frac{y}{x}$, a nie $\frac{x}{y}$. Liczby z $\sqrt{10}$ w mianowniku to sinus i cosinus tego kąta ($r = \sqrt{10}$).`,
      tip: T`Karta wzorów, str. 11: $\sin \alpha = \frac{y}{r}$, $\cos \alpha = \frac{x}{r}$, $\operatorname{tg} \alpha = \frac{y}{x}$.`
    },
    {
      n: '19', pts: 1, t: 8, k: 'SC',
      q: SC + T`Dla każdego kąta ostrego $\alpha$ wyrażenie $\sin^4 \alpha + \sin^2 \alpha \cdot \cos^2 \alpha$ jest równe`,
      o: [T`$\sin^2 \alpha$`, T`$\sin^6 \alpha \cdot \cos^2 \alpha$`, T`$\sin^4 \alpha + 1$`, T`$\sin^2 \alpha \cdot (\sin \alpha + \cos \alpha) \cdot (\sin \alpha - \cos \alpha)$`],
      a: 'A',
      s: [
        T`Wyłączamy $\sin^2 \alpha$ przed nawias: $\sin^2 \alpha \cdot \left(\sin^2 \alpha + \cos^2 \alpha\right)$.`,
        T`Z jedynki trygonometrycznej nawias jest równy $1$, więc wyrażenie jest równe $\sin^2 \alpha$.`
      ],
      trap: T`Odpowiedź D to rozkład wyrażenia $\sin^4\alpha - \sin^2\alpha\cos^2\alpha$ (z MINUSEM). Tutaj jest plus, więc w nawiasie pojawia się jedynka trygonometryczna.`
    },
    {
      n: '20', pts: 1, t: 9, k: 'SC',
      q: T`W rombie o boku długości $6\sqrt{2}$ kąt rozwarty ma miarę $150^\circ$.` + '\n\n' + SC + T`Iloczyn długości przekątnych tego rombu jest równy`,
      o: ['$24$', '$72$', '$36$', T`$36\sqrt{2}$`],
      a: 'B',
      s: [
        T`Pole rombu o boku $a$ i kącie $\alpha$: $P = a^2 \sin \alpha = \left(6\sqrt{2}\right)^2 \cdot \sin 150^\circ = 72 \cdot \frac{1}{2} = 36$.`,
        T`Pole rombu to także połowa iloczynu przekątnych: $P = \frac{d_1 \cdot d_2}{2}$.`,
        T`$\frac{d_1 \cdot d_2}{2} = 36$, więc $d_1 \cdot d_2 = 72$.`
      ],
      trap: T`$36$ to POLE rombu. Iloczyn przekątnych jest dwa razy większy, bo $P = \frac{d_1 d_2}{2}$.`,
      tip: T`Karta wzorów, str. 20: pole rombu $P = a^2 \sin \alpha = \frac{1}{2} d_1 d_2$. Pamiętaj: $\sin 150^\circ = \sin 30^\circ = \frac{1}{2}$.`
    },
    {
      n: '21', pts: 1, t: 9, k: 'SC',
      q: T`Punkty $A$, $B$, $C$ leżą na okręgu o środku w punkcie $O$. Kąt $ACO$ ma miarę $70^\circ$ (zobacz rysunek).` + '\n\n' + SC + T`Miara kąta ostrego $ABC$ jest równa`,
      fig: { diagram: geo({ pts: { O: [0, 0, 'tl'], A: [-0.259, -0.966, 'bl'], C: [0.423, -0.906, 'br'], B: [0.819, 0.574, 'tr'] }, segs: ['OA', 'OC', 'AC', 'AB', 'BC'], circles: [[0, 0, 1]], texts: [[0.22, -0.72, '70°']] }) },
      o: [T`$10^\circ$`, T`$20^\circ$`, T`$35^\circ$`, T`$40^\circ$`],
      a: 'B',
      s: [
        T`Trójkąt $AOC$ jest równoramienny ($|OA| = |OC|$ – promienie), więc kąty przy podstawie $AC$ są równe: $|\sphericalangle OAC| = |\sphericalangle ACO| = 70^\circ$.`,
        T`Kąt środkowy: $|\sphericalangle AOC| = 180^\circ - 2 \cdot 70^\circ = 40^\circ$.`,
        T`Kąt wpisany $ABC$ jest oparty na tym samym łuku $AC$, więc ma miarę $\frac{40^\circ}{2} = 20^\circ$.`
      ],
      trap: T`$40^\circ$ to kąt ŚRODKOWY $AOC$. Kąt wpisany $ABC$ jest od niego dwa razy mniejszy.`,
      tip: T`Karta wzorów, str. 18: kąt wpisany jest połową kąta środkowego opartego na tym samym łuku.`
    },
    {
      n: '22', pts: 2, t: 9, k: 'OPEN',
      q: T`Trójkąty prostokątne $T_1$ i $T_2$ są podobne. Przyprostokątne trójkąta $T_1$ mają długości $5$ i $12$. Przeciwprostokątna trójkąta $T_2$ ma długość $26$.` + '\n\n' + T`Oblicz pole trójkąta $T_2$. Zapisz obliczenia.`,
      a: T`$P_{T_2} = 120$`,
      s: [
        T`Przeciwprostokątna trójkąta $T_1$: $\sqrt{5^2 + 12^2} = \sqrt{169} = 13$.`,
        T`Skala podobieństwa trójkąta $T_2$ do $T_1$: $k = \frac{26}{13} = 2$.`,
        T`Pole trójkąta $T_1$: $\frac{1}{2} \cdot 5 \cdot 12 = 30$. Pola figur podobnych pozostają w stosunku $k^2$, więc $P_{T_2} = 4 \cdot 30 = 120$.`
      ],
      trap: T`Pole rośnie jak KWADRAT skali: $2^2 = 4$ razy, a nie $2$ razy. Odpowiedź $60$ to typowy błąd.`
    },
    {
      n: '23', pts: 1, t: 10, k: 'AB',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ dane są proste $k$ oraz $l$ o równaniach` + '\n$$k\\colon\\ y = \\frac{2}{3}x$$\n$$l\\colon\\ y = -\\frac{3}{2}x + 13$$\n' + T`Dokończ zdanie. Wybierz właściwe zakończenie.` + '\n\n' + T`Proste $k$ oraz $l$`,
      ab: ['są prostopadłe', 'nie są prostopadłe'],
      r: [T`$(-6, -4)$`, T`$(6, 4)$`, T`$(-6, 4)$`],
      join: 'i przecinają się w punkcie $P$ o współrzędnych',
      a: 'A2',
      s: [
        T`Iloczyn współczynników kierunkowych: $\frac{2}{3} \cdot \left(-\frac{3}{2}\right) = -1$, więc proste są prostopadłe.`,
        T`Punkt przecięcia: $\frac{2}{3}x = -\frac{3}{2}x + 13$. Mnożymy przez $6$: $4x = -9x + 78$, stąd $13x = 78$ i $x = 6$.`,
        T`$y = \frac{2}{3} \cdot 6 = 4$, czyli $P = (6, 4)$.`
      ],
      trap: T`Warunek prostopadłości to iloczyn współczynników kierunkowych równy $-1$ (liczby „odwrotne i przeciwne”), a nie ich równość.`,
      tip: T`Karta wzorów, str. 22: proste są prostopadłe, gdy $a_1 \cdot a_2 = -1$.`
    },
    {
      n: '24', pts: 1, t: 10, k: 'SC',
      q: T`W kartezjańskim układzie współrzędnych $(x, y)$ dana jest prosta $k$ o równaniu` + '\n$$y = -\\frac{1}{3}x + 2$$\n' + SC + T`Prosta o równaniu $y = ax + b$ jest równoległa do prostej $k$ i przechodzi przez punkt $P = (3, 5)$, gdy`,
      o: [T`$a = 3$ i $b = 4$.`, T`$a = -\frac{1}{3}$ i $b = 4$.`, T`$a = 3$ i $b = -4$.`, T`$a = -\frac{1}{3}$ i $b = 6$.`],
      a: 'D',
      s: [
        T`Proste równoległe mają równe współczynniki kierunkowe: $a = -\frac{1}{3}$.`,
        T`Prosta przechodzi przez $P = (3, 5)$: $5 = -\frac{1}{3} \cdot 3 + b$, czyli $5 = -1 + b$.`,
        T`$b = 6$.`
      ],
      trap: T`$a = 3$ to współczynnik prostej PROSTOPADŁEJ do $k$. Przy wyznaczaniu $b$: $5 = -1 + b$ daje $b = 6$, a nie $4$.`
    },
    {
      n: '25', pts: 1, t: 11, k: 'SC',
      q: T`Dany jest graniastosłup prawidłowy czworokątny, w którym krawędź podstawy ma długość $15$. Przekątna graniastosłupa jest nachylona do płaszczyzny podstawy pod kątem $\alpha$ takim, że $\cos \alpha = \frac{\sqrt{2}}{3}$.` + '\n\n' + SC + T`Długość przekątnej tego graniastosłupa jest równa`,
      o: [T`$15\sqrt{2}$`, '$45$', T`$5\sqrt{2}$`, '$10$'],
      a: 'B',
      s: [
        T`Kąt $\alpha$ to kąt między przekątną graniastosłupa $D$ a przekątną podstawy $d$. Podstawa jest kwadratem o boku $15$, więc $d = 15\sqrt{2}$.`,
        T`W trójkącie prostokątnym: $\cos \alpha = \frac{d}{D}$, czyli $\frac{\sqrt{2}}{3} = \frac{15\sqrt{2}}{D}$.`,
        T`$D = \frac{15\sqrt{2} \cdot 3}{\sqrt{2}} = 45$.`
      ],
      trap: T`$15\sqrt{2}$ to przekątna PODSTAWY. Przekątna graniastosłupa jest przeciwprostokątną trójkąta i musi być od niej dłuższa.`
    },
    {
      n: '26', pts: 4, t: 11, k: 'OPEN',
      q: T`Dany jest ostrosłup prawidłowy czworokątny. Wysokość ściany bocznej tego ostrosłupa jest nachylona do płaszczyzny podstawy pod kątem $30^\circ$ i ma długość równą $6$.` + '\n\n' + T`Oblicz objętość i pole powierzchni całkowitej tego ostrosłupa. Zapisz obliczenia.`,
      a: T`$V = 108$, $P_c = 108 + 72\sqrt{3}$`,
      s: [
        T`Wysokość ostrosłupa $H$, połowa krawędzi podstawy $\frac{a}{2}$ i wysokość ściany bocznej $h = 6$ tworzą trójkąt prostokątny z kątem $30^\circ$ przy podstawie.`,
        T`$H = 6 \cdot \sin 30^\circ = 3$ oraz $\frac{a}{2} = 6 \cdot \cos 30^\circ = 3\sqrt{3}$, więc $a = 6\sqrt{3}$.`,
        T`Pole podstawy: $a^2 = 108$. Objętość: $V = \frac{1}{3} \cdot 108 \cdot 3 = 108$.`,
        T`Pole powierzchni bocznej: $4 \cdot \frac{1}{2} \cdot 6\sqrt{3} \cdot 6 = 72\sqrt{3}$. Pole całkowite: $P_c = 108 + 72\sqrt{3}$.`
      ],
      trap: T`Kąt $30^\circ$ jest między wysokością ŚCIANY BOCZNEJ a podstawą – w trójkącie pojawia się połowa krawędzi podstawy ($\frac{a}{2}$), a nie połowa przekątnej.`,
      tip: T`Karta wzorów, str. 25: objętość ostrosłupa $V = \frac{1}{3} P_p \cdot H$.`
    },
    {
      n: '27', pts: 1, t: 11, k: 'SC',
      q: T`W pewnym ostrosłupie prawidłowym stosunek liczby $W$ wszystkich wierzchołków do liczby $K$ wszystkich krawędzi jest równy $\frac{W}{K} = \frac{3}{5}$.` + '\n\n' + SC + T`Podstawą tego ostrosłupa jest`,
      o: ['kwadrat.', 'pięciokąt foremny.', 'sześciokąt foremny.', 'siedmiokąt foremny.'],
      a: 'B',
      s: [
        T`Jeśli podstawą jest $n$-kąt, to ostrosłup ma $W = n + 1$ wierzchołków i $K = 2n$ krawędzi.`,
        T`$\frac{n + 1}{2n} = \frac{3}{5}$, czyli $5(n + 1) = 6n$.`,
        T`$n = 5$ – podstawą jest pięciokąt foremny.`
      ],
      trap: T`Ostrosłup ma o jeden wierzchołek więcej niż podstawa ($n + 1$), a krawędzi dwa razy tyle, ile boków podstawy ($2n$).`
    },
    {
      n: '28', pts: 1, t: 12, k: 'SC',
      q: SC + T`Wszystkich liczb naturalnych pięciocyfrowych, w których zapisie dziesiętnym występują tylko cyfry $0$, $5$, $7$ (np. $57\,075$, $55\,555$), jest`,
      o: [T`$5^3$`, T`$2 \cdot 4^3$`, T`$2 \cdot 3^4$`, T`$3^5$`],
      a: 'C',
      s: [
        T`Pierwsza cyfra liczby pięciocyfrowej nie może być zerem: do wyboru $5$ lub $7$ – dwie możliwości.`,
        T`Każda z czterech pozostałych cyfr może być dowolną z trzech: $0$, $5$, $7$.`,
        T`Z reguły mnożenia: $2 \cdot 3 \cdot 3 \cdot 3 \cdot 3 = 2 \cdot 3^4$.`
      ],
      trap: T`$3^5$ zawiera także „liczby” zaczynające się od zera, które nie są pięciocyfrowe. Zero wykluczamy tylko na PIERWSZYM miejscu.`
    },
    {
      n: '29', pts: 2, t: 14, k: 'PARTS',
      q: T`Na diagramie przedstawiono ceny pomidorów w szesnastu wybranych sklepach.` + '\n\n' + T`Uzupełnij każde zdanie. Wybierz właściwą odpowiedź spośród oznaczonych literami A–E.`,
      parts: [T`Mediana ceny kilograma pomidorów w tych wybranych sklepach jest równa`, T`Średnia cena kilograma pomidorów w tych wybranych sklepach jest równa`],
      choices: ['$5{,}80$ zł', '$5{,}73$ zł', '$5{,}85$ zł', '$6{,}00$ zł', '$5{,}70$ zł'],
      fig: { diagram: bars([['5,05', 2], ['5,60', 4], ['5,70', 2], ['6,00', 5], ['6,30', 3]], { xTitle: 'cena za 1 kg pomidorów (w zł)', yTitle: 'liczba sklepów' }) },
      a: 'CA',
      s: [
        T`Sklepów jest $16$, więc mediana to średnia arytmetyczna cen stojących na miejscach $8$ i $9$ w uporządkowanym zestawie. Narastająco: miejsca $1$–$2$ to $5{,}05$, miejsca $3$–$6$ to $5{,}60$, miejsca $7$–$8$ to $5{,}70$, miejsca $9$–$13$ to $6{,}00$.`,
        T`Mediana: $\frac{5{,}70 + 6{,}00}{2} = 5{,}85$ zł – odpowiedź C.`,
        T`Średnia: $\frac{2 \cdot 5{,}05 + 4 \cdot 5{,}60 + 2 \cdot 5{,}70 + 5 \cdot 6{,}00 + 3 \cdot 6{,}30}{16} = \frac{10{,}10 + 22{,}40 + 11{,}40 + 30{,}00 + 18{,}90}{16} = \frac{92{,}80}{16} = 5{,}80$ zł – odpowiedź A.`
      ],
      trap: T`Mediana to nie „środkowa cena na osi” ($5{,}70$ zł) – trzeba uwzględnić liczbę sklepów. Przy parzystej liczbie danych bierzemy średnią dwóch środkowych wartości.`,
      tip: T`Karta wzorów, str. 29–30: średnia ważona i mediana.`
    },
    {
      n: '30', pts: 2, t: 13, k: 'OPEN',
      q: T`Ze zbioru ośmiu liczb $\{2, 3, 4, 5, 6, 7, 8, 9\}$ losujemy ze zwracaniem kolejno dwa razy po jednej liczbie.` + '\n\n' + T`Oblicz prawdopodobieństwo zdarzenia $A$ polegającego na tym, że iloczyn wylosowanych liczb jest podzielny przez $15$. Zapisz obliczenia.`,
      a: T`$P(A) = \frac{6}{64} = \frac{3}{32}$`,
      s: [
        T`Losujemy dwa razy ze zwracaniem z ośmiu liczb: $|\Omega| = 8 \cdot 8 = 64$.`,
        T`Iloczyn jest podzielny przez $15 = 3 \cdot 5$, gdy jedna z liczb jest podzielna przez $5$ (w zbiorze tylko $5$), a druga przez $3$ (w zbiorze: $3$, $6$, $9$).`,
        T`Sprzyjające pary: $(5, 3)$, $(5, 6)$, $(5, 9)$, $(3, 5)$, $(6, 5)$, $(9, 5)$. Zatem $|A| = 6$ i $P(A) = \frac{6}{64} = \frac{3}{32}$.`
      ],
      trap: T`Kolejność losowania ma znaczenie: $(5, 3)$ i $(3, 5)$ to dwa RÓŻNE wyniki. Policzenie tylko trzech par daje dwa razy za mały wynik.`
    },
    {
      n: '31.1', pts: 1, t: 6, k: 'PF',
      q: STEM31,
      st: [T`Łączna liczba klientów obsłużonych w czasie wszystkich analizowanych dni jest równa $L(30)$.`, T`W trzecim dniu analizowanego okresu obsłużono $336$ klientów.`],
      a: 'FP',
      s: [
        T`$L(30)$ to liczba klientów obsłużonych tylko TRZYDZIESTEGO dnia, a nie suma ze wszystkich dni – stwierdzenie 1 jest fałszywe.`,
        T`$L(3) = -3^2 + 22 \cdot 3 + 279 = -9 + 66 + 279 = 336$ – stwierdzenie 2 jest prawdziwe.`
      ],
      trap: T`Wartość funkcji $L(n)$ opisuje pojedynczy dzień o numerze $n$. Łączna liczba klientów to suma $L(1) + L(2) + \ldots + L(30)$. Uwaga też na zapis: $-3^2 = -9$.`
    },
    {
      n: '31.2', pts: 2, t: 15, k: 'OPEN',
      q: STEM31 + '\n\n' + T`Którego dnia analizowanego okresu w aptece obsłużono największą liczbę klientów? Oblicz liczbę klientów obsłużonych tego dnia. Zapisz obliczenia.`,
      a: T`Najwięcej klientów obsłużono jedenastego dnia: $400$ osób.`,
      s: [
        T`Wykresem funkcji $L(n) = -n^2 + 22n + 279$ jest parabola o ramionach skierowanych w dół, więc największą wartość funkcja przyjmuje w wierzchołku.`,
        T`Pierwsza współrzędna wierzchołka: $n = -\frac{22}{2 \cdot (-1)} = 11$. Jest to liczba naturalna z przedziału od $1$ do $30$.`,
        T`$L(11) = -121 + 242 + 279 = 400$.`
      ],
      trap: T`Trzeba sprawdzić, czy wierzchołek „trafia” w liczbę naturalną z dziedziny ($1 \le n \le 30$). Tu $n = 11$ spełnia oba warunki, więc można ją przyjąć bez dodatkowych porównań.`,
      tip: T`Karta wzorów, str. 8: $p = -\frac{b}{2a}$, $q = f(p)$.`
    }
  ]
};
