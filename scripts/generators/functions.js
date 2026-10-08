import { finalizeSingleChoiceTask, formatSigned } from './utils.js';

export function generateFunctions() {
  const tasks = [];

  // ARCH-10: Własności funkcji z wykresu (48 zadań)
  for (let i = 1; i <= 48; i++) {
    const dLeft = -(3 + (i % 3)); // -3, -4, -5
    const dRight = 3 + (i % 4);  // 3, 4, 5, 6
    const xMid = (i % 2 === 0) ? 0 : 1;
    const yMin = -(2 + (i % 3)); // -2, -3, -4
    const yMax = 2 + (i % 3);   // 2, 3, 4
    const subType = i % 3; // 0: zbiór wartości, 1: dziedzina, 2: liczba rozwiązań
    const taskNum = String(i).padStart(3, '0');

    // Create high-fidelity SVG plot definition for MathDiagram
    const diagram = {
      type: 'PLOT',
      title: 'Wykres funkcji y = f(x)',
      caption: `Funkcja f określona na przedziale ⟨${dLeft}, ${dRight}⟩`,
      plotData: {
        type: 'PIECEWISE_LINEAR',
        xRange: [dLeft - 1, dRight + 1],
        yRange: [yMin - 1, yMax + 1],
        gridStep: 1,
        segments: [
          { from: [dLeft, yMin], to: [xMid, yMax], color: '#38bdf8', weight: 2.5, startDot: 'filled', endDot: 'none' },
          { from: [xMid, yMax], to: [dRight, 0], color: '#38bdf8', weight: 2.5, startDot: 'none', endDot: 'filled' }
        ],
        points: [
          { x: dLeft, y: yMin, label: `(${dLeft}, ${yMin})`, dot: 'filled', color: '#ffb800' },
          { x: xMid, y: yMax, label: `(${xMid}, ${yMax})`, dot: 'filled', color: '#ffb800' },
          { x: dRight, y: 0, label: `(${dRight}, 0)`, dot: 'filled', color: '#ffb800' }
        ]
      }
    };

    if (subType === 0) {
      const task = {
        id: `task_math_form23_arch10_${taskNum}`,
        archetypeCode: "ARCH-10",
        category: "Funkcje",
        title: "Zbiór wartości funkcji z wykresu",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nNa rysunku przedstawiono wykres funkcji $f$ określonej w przedziale $\\langle ${dLeft}, ${dRight} \\rangle$, której najniższy punkt ma współrzędne $(${dLeft}, ${yMin})$, a najwyższy punkt ma współrzędne $(${xMid}, ${yMax})$.\nZbiorem wartości funkcji $f$ jest przedział`,
        diagram,
        options: [
          `$\\langle ${yMin}, ${yMax} \\rangle$`,
          `$\\langle ${dLeft}, ${dRight} \\rangle$`,
          `$(${yMin}, ${yMax})$`,
          `$\\langle 0, ${yMax} \\rangle$`
        ],
        explanation: `**Krok 1:** Przypominamy definicję: zbiór wartości funkcji $y = f(x)$ to rzut całego wykresu na pionową oś $OY$.\n\n**Krok 2:** Odczytujemy z wykresu najmniejszą oraz największą wartość funkcji:\n- Najniższy punkt wykresu ma rzędną $y_{\\min} = ${yMin}$.\n- Najwyższy punkt wykresu ma rzędną $y_{\\max} = ${yMax}$.\n\n**Krok 3:** Ponieważ wykres jest ciągły i oba punkty krańcowe należą do wykresu (kropki zamalowane), zbiorem wartości jest przedział domknięty:\n$$Z_w = \\langle ${yMin}, ${yMax} \\rangle$$\n\n**Pułapka CKE:** Przedział $\\langle ${dLeft}, ${dRight} \\rangle$ to dziedzina funkcji (odczytywana z osi poziomej $OX$), a nie zbiór wartości (oś $OY$).`,
        matura_tip: "Zbiór wartości = rzut na pionową oś OY (od dołu do góry). Dziedzina = rzut na poziomą oś OX (od lewej do prawej)."
      };
      tasks.push(finalizeSingleChoiceTask(task, 10000 + i));
    } else if (subType === 1) {
      const task = {
        id: `task_math_form23_arch10_${taskNum}`,
        archetypeCode: "ARCH-10",
        category: "Funkcje",
        title: "Dziedzina funkcji z wykresu",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nNa rysunku przedstawiono wykres funkcji $f$ o punktach krańcowych $(${dLeft}, ${yMin})$ oraz $(${dRight}, 0)$. Dziedziną funkcji $f$ jest zbiór`,
        diagram,
        options: [
          `$\\langle ${dLeft}, ${dRight} \\rangle$`,
          `$\\langle ${yMin}, ${yMax} \\rangle$`,
          `$(${dLeft}, ${dRight})$`,
          `$\\langle ${dLeft}, 0 \\rangle$`
        ],
        explanation: `**Krok 1:** Przypominamy definicję: dziedzina funkcji to zbiór wszystkich argumentów $x$, dla których funkcja jest określona (rzut wykresu na oś poziomą $OX$).\n\n**Krok 2:** Odczytujemy z osi $OX$ skrajny lewy oraz skrajny prawy punkt wykresu:\n- Wykres rozpoczyna się w punkcie o odciętej $x = ${dLeft}$ (zamalowana kropka).\n- Wykres kończy się w punkcie o odciętej $x = ${dRight}$ (zamalowana kropka).\n\n**Krok 3:** Zapisujemy dziedzinę jako przedział obustronnie domknięty:\n$$D_f = \\langle ${dLeft}, ${dRight} \\rangle$$\n\n**Pułapka CKE:** Przedział $\\langle ${yMin}, ${yMax} \\rangle$ to zbiór wartości odczytany z osi $OY$. Pamiętaj: dziedzina zawsze mieszka na osi $OX$!`,
        matura_tip: "Dziedzina funkcji to zawsze oś pozioma OX. Zbiór wartości to zawsze oś pionowa OY."
      };
      tasks.push(finalizeSingleChoiceTask(task, 10000 + i));
    } else {
      const mVal = 1;
      const numSolutions = 2; // the line y = 1 intersects the 2 segments
      const task = {
        id: `task_math_form23_arch10_${taskNum}`,
        archetypeCode: "ARCH-10",
        category: "Funkcje",
        title: "Liczba rozwiązań równania f(x) = m",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nNa rysunku przedstawiono wykres funkcji $f$. Liczba rozwiązań równania $f(x) = ${mVal}$ jest równa`,
        diagram,
        options: [
          `$${numSolutions}$`,
          `$1$`,
          `$3$`,
          `$0$`
        ],
        explanation: `**Krok 1:** Interpretujemy graficznie równanie $f(x) = ${mVal}$: rozwiązania tego równania to odcięte ($x$) punktów przecięcia wykresu funkcji $y = f(x)$ z poziomą prostą o równaniu $y = ${mVal}$.\n\n**Krok 2:** Rysujemy w wyobraźni (lub przykładamy linijkę) poziomą prostą na wysokości $y = ${mVal}$.\n\n**Krok 3:** Ponieważ $y_{\\min} = ${yMin} < ${mVal} < ${yMax} = y_{\\max}$, pozioma prosta przecina najpierw ramię rosnące, a następnie ramię malejące wykresu w dokładnie $2$ punktach.\nStąd równanie $f(x) = ${mVal}$ posiada dokładnie $2$ rozwiązania.\n\n**Pułapka CKE:** Nie myl liczby rozwiązań z wartością $m$. Liczba rozwiązań to liczba punktów przecięcia, a nie wysokość prostej!`,
        matura_tip: "Równanie $f(x)=m$ rozwiązujesz graficznie: przyłóż linijkę poziomo na wysokości $m$ i policz punkty przecięcia z wykresem."
      };
      tasks.push(finalizeSingleChoiceTask(task, 10000 + i));
    }
  }

  // ARCH-11: Przesunięcia wykresu funkcji: wektory f(x-p)+q, symetrie (29 zadań)
  for (let i = 1; i <= 29; i++) {
    const p = 1 + (i % 4);
    const q = 2 + (i % 4);
    const isVector = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');

    if (isVector) {
      const task = {
        id: `task_math_form23_arch11_${taskNum}`,
        archetypeCode: "ARCH-11",
        category: "Funkcje",
        title: "Przesunięcie wykresu funkcji o wektor",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nWykres funkcji $g$ otrzymano przez przesunięcie wykresu funkcji $f(x) = x^2$ o wektor $\\vec{u} = [${p}, -${q}]$. Wzór funkcji $g$ ma postać`,
        options: [
          `$g(x) = (x - ${p})^2 - ${q}$`,
          `$g(x) = (x + ${p})^2 - ${q}$`,
          `$g(x) = (x - ${p})^2 + ${q}$`,
          `$g(x) = (x + ${p})^2 + ${q}$`
        ],
        explanation: `**Krok 1:** Przywołujemy regułę przesunięcia wykresu funkcji $f(x)$ o wektor $\\vec{u} = [p, q]$ (Tablice CKE str. 7):\n$$g(x) = f(x - p) + q$$\n\n**Krok 2:** Podstawiamy współrzędne wektora $p = ${p}$ oraz $q = -${q}$ do wzoru funkcji bazowej $f(x) = x^2$:\n$$g(x) = (x - ${p})^2 + (-${q})$$\n\n**Krok 3:** Upraszczamy zapis znaków:\n$$g(x) = (x - ${p})^2 - ${q}$$\n\n**Pułapka CKE:** Pamiętaj o przeciwnym znaku przy zmiennej $x$ w nawiasie! Przesunięcie w prawo o $+${p}$ daje w nawiasie $(x - ${p})$, a wyraz wolny za nawiasem zachowuje swój znak ($-${q}$).`,
        matura_tip: "Tablice CKE str. 7: W nawiasie z iksem znak ZAWSZE zmieniasz na przeciwny, a wyraz wolny za nawiasem ma znak zgodny ze współrzędną pionową wektora."
      };
      tasks.push(finalizeSingleChoiceTask(task, 11000 + i));
    } else {
      const task = {
        id: `task_math_form23_arch11_${taskNum}`,
        archetypeCode: "ARCH-11",
        category: "Funkcje",
        title: "Symetria wykresu funkcji względem osi OX",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nWykres funkcji $g$ jest symetryczny do wykresu funkcji $f(x) = 2x - ${q}$ względem osi $OX$. Wzór funkcji $g$ ma postać`,
        options: [
          `$g(x) = -2x + ${q}$`,
          `$g(x) = -2x - ${q}$`,
          `$g(x) = 2x + ${q}$`,
          `$g(x) = 2x - ${q}$`
        ],
        explanation: `**Krok 1:** Przywołujemy regułę symetrii osiowej względem osi $OX$ (Tablice CKE str. 7): wykres funkcji $y = -f(x)$ powstaje przez odbicie wykresu funkcji $y = f(x)$ względem osi $OX$.\n\n**Krok 2:** Tworzymy wzór nowej funkcji $g(x) = -f(x)$:\n$$g(x) = -(2x - ${q})$$\n\n**Krok 3:** Opuszczamy nawias, zmieniając znaki wszystkich składników wewnątrz:\n$$g(x) = -2x + ${q}$$\n\n**Pułapka CKE:** Minus przed całą funkcją zmienia znaki KAŻDEGO składnika, nie tylko współczynnika przy $x$! Opcja B zapomina o zmianie znaku wyrazu wolnego.`,
        matura_tip: "Symetria względem OX: negujesz całą funkcję $y = -f(x)$. Zmieniają się znaki WSZYSTKICH wyrazów!"
      };
      tasks.push(finalizeSingleChoiceTask(task, 11000 + i));
    }
  }

  // ARCH-12: Postać kanoniczna funkcji kwadratowej i współrzędne wierzchołka (48 zadań)
  for (let i = 1; i <= 48; i++) {
    // Ensure p and q are strictly non-zero so all 4 options are distinct!
    const pVals = [-4, -3, -2, -1, 1, 2, 3, 4];
    const qVals = [-3, -2, -1, 1, 2, 3];
    const p = pVals[i % pVals.length];
    const q = qVals[(i + 1) % qVals.length];
    const a = (i % 2 === 0) ? 1 : 2;
    const taskNum = String(i).padStart(3, '0');

    const pStr = p > 0 ? `- ${p}` : `+ ${Math.abs(p)}`;
    const qStr = q > 0 ? `+ ${q}` : `- ${Math.abs(q)}`;
    const aPrefix = a === 1 ? '' : `${a}`;

    const task = {
      id: `task_math_form23_arch12_${taskNum}`,
      archetypeCode: "ARCH-12",
      category: "Funkcje",
      title: "Wierzchołek paraboly z postaci kanonicznej",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nWierzchołkiem paraboli będącej wykresem funkcji kwadratowej $f(x) = ${aPrefix}(x ${pStr})^2 ${qStr}$ jest punkt $W$ o współrzędnych`,
      options: [
        `$(${p}, ${q})$`,
        `$(${-p}, ${q})$`,
        `$(${p}, ${-q})$`,
        `$(${-p}, ${-q})$`
      ],
      explanation: `**Krok 1:** Przywołujemy postać kanoniczną funkcji kwadratowej (Tablice CKE str. 8):\n$$f(x) = a(x - p)^2 + q$$\ngdzie punkt $W = (p, q)$ jest wierzchołkiem paraboli.\n\n**Krok 2:** Odczytujemy współrzędną $p$ z wnętrza nawiasu $(x ${pStr})$. Ponieważ we wzorze mamy $(x - p)$, współrzędna $p$ ma znak przeciwny do tego w nawiasie:\n$$p = ${p}$$\n\n**Krok 3:** Odczytujemy współrzędną $q$ z wyrazu wolnego za nawiasem. Wyraz wolny zachowuje swój znak:\n$$q = ${q}$$\nZatem wierzchołkiem jest punkt $W = (${p}, ${q})$.\n\n**Pułapka CKE:** Pierwszą współrzędną $p$ odczytujemy ZAWSZE ze zmianą znaku, natomiast drugą współrzędną $q$ ZAWSZE z zachowaniem znaku.`,
      matura_tip: "Tablice CKE str. 8: $y = a(x - p)^2 + q$. Pamiętaj: $p$ zmienia znak, $q$ zachowuje znak!"
    };
    tasks.push(finalizeSingleChoiceTask(task, 12000 + i));
  }

  // ARCH-13: Funkcja liniowa: prostopadłość i równoległość (54 zadania)
  for (let i = 1; i <= 54; i++) {
    const isPerpendicular = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');

    if (isPerpendicular) {
      const m = 2 + (i % 4); // 2, 3, 4, 5
      const b1 = 2 + (i % 5);
      const b2 = 1 + (i % 3);
      const task = {
        id: `task_math_form23_arch13_${taskNum}`,
        archetypeCode: "ARCH-13",
        category: "Funkcje",
        title: "Warunek prostopadłości prostych",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nProsta o równaniu $y = ${m}x + ${b1}$ jest prostopadła do prostej o równaniu`,
        options: [
          `$y = -\\frac{1}{${m}}x + ${b2}$`,
          `$y = ${m}x + ${b2}$`,
          `$y = -${m}x + ${b2}$`,
          `$y = \\frac{1}{${m}}x + ${b2}$`
        ],
        explanation: `**Krok 1:** Przywołujemy warunek prostopadłości prostych o współczynnikach kierunkowych $a_1$ i $a_2$ (Tablice CKE str. 6):\n$$a_1 \\cdot a_2 = -1 \\iff a_2 = -\\frac{1}{a_1}$$\n\n**Krok 2:** Odczytujemy współczynnik kierunkowy pierwszej prostej: $a_1 = ${m}$.\n\n**Krok 3:** Obliczamy współczynnik kierunkowy prostej prostopadłej:\n$$a_2 = -\\frac{1}{${m}}$$\nProsta prostopadła ma postać $y = -\\frac{1}{${m}}x + ${b2}$.\n\n**Pułapka CKE:** Prosta prostopadła wymaga ZARÓWNO odwrotności, JAK I zmiany znaku ($a_2 = -1/a_1$). Opcja C zapomina o odwrotności, a opcja D zapomina o minusie.`,
        matura_tip: "Tablice CKE str. 6: Prostopadłe proste to 'odwróć do góry nogami i zmień znak': $a_2 = -1/a_1$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 13000 + i));
    } else {
      // Parallel lines: diverse m solutions (1, 2, 3, 4, 5)
      const targetM = 1 + (i % 5);
      const aCoeff = 2 + (i % 3);
      const c = targetM * aCoeff;
      const b1 = 3 + (i % 4);
      const b2Val = 1 + (i % 4);

      const task = {
        id: `task_math_form23_arch13_${taskNum}`,
        archetypeCode: "ARCH-13",
        category: "Funkcje",
        title: "Warunek równoległości prostych",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nProste o równaniach $y = (${aCoeff}m - 1)x + ${b1}$ oraz $y = ${c - 1}x - ${b2Val}$ są równoległe, gdy liczba $m$ jest równa`,
        options: [
          `$${targetM}$`,
          `$${targetM + 1}$`,
          `$${-targetM}$`,
          `$0$`
        ],
        explanation: `**Krok 1:** Przywołujemy warunek równoległości dwóch prostych (Tablice CKE str. 6): proste są równoległe wtedy i tylko wtedy, gdy ich współczynniki kierunkowe są równe ($a_1 = a_2$).\n\n**Krok 2:** Przyrównujemy współczynniki kierunkowe stojące przy zmiennej $x$:\n$$${aCoeff}m - 1 = ${c - 1}$$\n\n**Krok 3:** Rozwiązujemy równanie liniowe:\n$$${aCoeff}m = ${c}$$\n$$m = \\frac{${c}}{${aCoeff}} = ${targetM}$$\n\n**Pułapka CKE:** Wyrazy wolne ($+${b1}$ i $-${b2Val}$) nie mają żadnego wpływu na równoległość prostych – decydują jedynie współczynniki przy $x$.`,
        matura_tip: "Tablice CKE str. 6: Proste równoległe mają identyczne współczynniki kierunkowe: $a_1 = a_2$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 13000 + i));
    }
  }

  return tasks;
}
