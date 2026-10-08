import { finalizeSingleChoiceTask, makeOptions } from './utils.js';

export function generateGeometry() {
  const tasks = [];

  // ARCH-19: Kąty w okręgu: środkowy i wpisany (48 zadań)
  for (let i = 1; i <= 48; i++) {
    const alpha = 20 + (i % 22) * 2; // 20, 22, ..., 62
    const beta = 2 * alpha;
    const isGivenInscribed = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');

    if (isGivenInscribed) {
      const task = {
        id: `task_math_form23_arch19_${taskNum}`,
        archetypeCode: "ARCH-19",
        category: "Planimetria",
        title: "Kąt środkowy oparty na tym samym łuku",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nKąt wpisany w okrąg o mierze $${alpha}^\\circ$ jest oparty na tym samym łuku co kąt środkowy $\\beta$. Miara kąta $\\beta$ jest równa`,
        options: makeOptions(`$${beta}^\\circ$`, [
          `$${alpha}^\\circ$`,
          `$${Math.round(alpha / 2)}^\\circ$`,
          `$${180 - alpha}^\\circ$`,
          `$${beta + 15}^\\circ$`
        ]),
        explanation: `**Krok 1:** Przywołujemy twierdzenie o kątach w okręgu opartych na tym samym łuku (Tablice CKE str. 10):\nMiara kąta środkowego jest dwa razy większa od miary kąta wpisanego opartego na tym samym łuku:\n$$\\beta = 2 \\cdot \\alpha$$\n\n**Krok 2:** Podstawiamy daną miarę kąta wpisanego $\\alpha = ${alpha}^\\circ$:\n$$\\beta = 2 \\cdot ${alpha}^\\circ$$\n\n**Krok 3:** Obliczamy wynik:\n$$\\beta = ${beta}^\\circ$$\n\n**Pułapka CKE:** Kąt środkowy jest ZAWSZE większy (dwa razy większy) od kąta wpisanego opartego na tym samym łuku. Opcja C ($${Math.round(alpha / 2)}^\\circ$) to błąd polegający na podzieleniu zamiast pomnożenia przez 2.`,
        matura_tip: "Tablice CKE str. 10: Kąt środkowy = $2 \\times$ kąt wpisany (na tym samym łuku)."
      };
      tasks.push(finalizeSingleChoiceTask(task, 19000 + i));
    } else {
      const task = {
        id: `task_math_form23_arch19_${taskNum}`,
        archetypeCode: "ARCH-19",
        category: "Planimetria",
        title: "Kąt wpisany oparty na tym samym łuku",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nKąt środkowy oparty na pewnym łuku okręgu ma miarę $${beta}^\\circ$. Miara kąta wpisanego $\\alpha$ opartego na tym samym łuku jest równa`,
        options: makeOptions(`$${alpha}^\\circ$`, [
          `$${beta}^\\circ$`,
          `$${beta * 2}^\\circ$`,
          `$${90}^\\circ$`,
          `$${alpha + 10}^\\circ$`
        ]),
        explanation: `**Krok 1:** Przywołujemy twierdzenie o kącie wpisanym i środkowym (Tablice CKE str. 10):\nKąt wpisany jest dwa razy mniejszy od kąta środkowego opartego na tym samym łuku:\n$$\\alpha = \\frac{\\beta}{2}$$\n\n**Krok 2:** Podstawiamy miarę kąta środkowego $\\beta = ${beta}^\\circ$:\n$$\\alpha = \\frac{${beta}^\\circ}{2}$$\n\n**Krok 3:** Obliczamy wynik:\n$$\\alpha = ${alpha}^\\circ$$\n\n**Pułapka CKE:** Opcja C ($${beta * 2}^\\circ$) to błąd polegający na niepotrzebnym pomnożeniu przez 2. Kąt wpisany jest ZAWSZE mniejszy od środkowego!`,
        matura_tip: "Gdy znasz kąt środkowy, kąt wpisany to dokładnie jego POŁOWA: $\\alpha = \\beta / 2$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 19000 + i));
    }
  }

  // ARCH-20: Trójkąty prostokątne i twierdzenie Pitagorasa (61 zadań)
  const triples = [
    [3, 4, 5],
    [5, 12, 13],
    [6, 8, 10],
    [8, 15, 17],
    [7, 24, 25],
    [9, 12, 15],
    [10, 24, 26],
    [12, 16, 20]
  ];

  for (let i = 1; i <= 61; i++) {
    const trip = triples[i % triples.length];
    const taskNum = String(i).padStart(3, '0');
    const findHypotenuse = (i % 2 === 1);

    if (findHypotenuse) {
      const task = {
        id: `task_math_form23_arch20_${taskNum}`,
        archetypeCode: "ARCH-20",
        category: "Planimetria",
        title: "Obliczanie przeciwprostokątnej trójkąta prostokątnego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nPrzyprostokątne trójkąta prostokątnego mają długości $${trip[0]}$ oraz $${trip[1]}$. Długość przeciwprostokątnej $c$ tego trójkąta jest równa`,
        options: makeOptions(`$${trip[2]}$`, [
          `$${trip[0] + trip[1]}$`,
          `$${trip[2] * 2}$`,
          `$${trip[1] + 1}$`,
          `$${trip[2] + 5}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy twierdzenie Pitagorasa dla trójkąta prostokątnego o przyprostokątnych $a, b$ i przeciwprostokątnej $c$ (Tablice CKE str. 9):\n$$a^2 + b^2 = c^2$$\n\n**Krok 2:** Podstawiamy długości przyprostokątnych $a = ${trip[0]}$ oraz $b = ${trip[1]}$:\n$$c^2 = ${trip[0]}^2 + ${trip[1]}^2 = ${trip[0] * trip[0]} + ${trip[1] * trip[1]} = ${trip[2] * trip[2]}$$\n\n**Krok 3:** Pierwiastkujemy obie strony równania:\n$$c = \\sqrt{${trip[2] * trip[2]}} = ${trip[2]}$$\n\n**Pułapka CKE:** Przeciwprostokątna to NIE jest zwykła suma przyprostokątnych ($${trip[0]} + ${trip[1]} = ${trip[0] + trip[1]}$)! W geometrii dodajemy KWADRATY długości.`,
        matura_tip: "Tablice CKE str. 9: Twierdzenie Pitagorasa $a^2 + b^2 = c^2$. Znajomość trójek pitagorejskich (3-4-5, 5-12-13, 8-15-17) oszczędza mnóstwo czasu na maturze!"
      };
      tasks.push(finalizeSingleChoiceTask(task, 20000 + i));
    } else {
      const task = {
        id: `task_math_form23_arch20_${taskNum}`,
        archetypeCode: "ARCH-20",
        category: "Planimetria",
        title: "Obliczanie przyprostokątnej trójkąta prostokątnego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW trójkącie prostokątnym przeciwprostokątna ma długość $${trip[2]}$, a jedna z przyprostokątnych ma długość $${trip[0]}$. Długość drugiej przyprostokątnej $b$ jest równa`,
        options: makeOptions(`$${trip[1]}$`, [
          `$${trip[2] - trip[0]}$`,
          `$${trip[2] + trip[0]}$`,
          `$${trip[1] + 2}$`,
          `$${trip[1] - 1}$`
        ]),
        explanation: `**Krok 1:** Przywołujemy twierdzenie Pitagorasa: $a^2 + b^2 = c^2 \\implies b^2 = c^2 - a^2$.\n\n**Krok 2:** Podstawiamy długości boków $c = ${trip[2]}$ oraz $a = ${trip[0]}$:\n$$b^2 = ${trip[2]}^2 - ${trip[0]}^2 = ${trip[2] * trip[2]} - ${trip[0] * trip[0]} = ${trip[1] * trip[1]}$$\n\n**Krok 3:** Wyciągamy pierwiastek kwadratowy:\n$$b = \\sqrt{${trip[1] * trip[1]}} = ${trip[1]}$$\n\n**Pułapka CKE:** Przy wyznaczaniu przyprostokątnej ODEJMUJEMY kwadrat od kwadratu przeciwprostokątnej. Nie odejmuj samych długości ($${trip[2]} - ${trip[0]} = ${trip[2] - trip[0]}$)!`,
        matura_tip: "Szukając przyprostokątnej: ZAWSZE odejmujesz kwadraty: $b^2 = c^2 - a^2$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 20000 + i));
    }
  }

  // ARCH-21: Stosunek pól figur podobnych (40 zadań)
  for (let i = 1; i <= 40; i++) {
    const k = 2 + (i % 4); // skala podobieństwa: 2, 3, 4, 5
    const p1 = 4 + (i % 7) * 2; // pole figury wyjściowej
    const p2 = p1 * k * k; // pole figury podobnej
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch21_${taskNum}`,
      archetypeCode: "ARCH-21",
      category: "Planimetria",
      title: "Stosunek pól figur podobnych",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nTrójkąt $T_2$ jest podobny do trójkąta $T_1$ w skali $k = ${k}$. Pole trójkąta $T_1$ jest równe $${p1}$. Pole trójkąta $T_2$ jest równe`,
      options: makeOptions(`$${p2}$`, [
        `$${p1 * k}$`,
        `$${p1 + k * k}$`,
        `$${p2 * 2}$`,
        `$${p2 + 20}$`
      ]),
      explanation: `**Krok 1:** Przywołujemy twierdzenie o polach figur podobnych (Tablice CKE str. 9):\nStosunek pól dwóch figur podobnych jest równy KWADRATOWI skali podobieństwa:\n$$\\frac{P_{T_2}}{P_{T_1}} = k^2$$\n\n**Krok 2:** Obliczamy kwadrat skali podobieństwa dla $k = ${k}$:\n$$k^2 = ${k}^2 = ${k * k}$$\n\n**Krok 3:** Wyznaczamy pole trójkąta $T_2$:\n$$P_{T_2} = P_{T_1} \\cdot k^2 = ${p1} \\cdot ${k * k} = ${p2}$$\n\n**Pułapka CKE:** Powszechny błąd polega na pomnożeniu pola przez samo $k$ zamiast przez $k^2$ (opcja B: $${p1} \\cdot ${k} = ${p1 * k}$). Przez $k$ mnoży się obwody i długości boków, a pola ZAWSZE przez $k^2$!`,
      matura_tip: "Tablice CKE str. 9: Boki i obwody rosną w skali $k$, a pola figur rosną w skali $k^2$!"
    };
    tasks.push(finalizeSingleChoiceTask(task, 21000 + i));
  }

  // ARCH-22: Okrąg opisany na trójkącie prostokątnym (40 zadań)
  for (let i = 1; i <= 40; i++) {
    const c = 2 * (3 + (i % 12)); // przeciwprostokątna parzysta: 6, 8, ..., 28
    const r = c / 2;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch22_${taskNum}`,
      archetypeCode: "ARCH-22",
      category: "Planimetria",
      title: "Promień okręgu opisanego na trójkącie prostokątnym",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW trójkącie prostokątnym przeciwprostokątna ma długość $${c}$. Promień okręgu opisanego na tym trójkącie jest równy`,
      options: makeOptions(`$${r}$`, [
        `$${c}$`,
        `$${c * 2}$`,
        `$${r + 2}$`,
        `$${r - 1}$`
      ]),
      explanation: `**Krok 1:** Przywołujemy własność okręgu opisanego na trójkącie prostokątnym (Tablice CKE str. 10):\nŚrodek okręgu opisanego na trójkącie prostokątnym leży dokładnie w środku przeciwprostokątnej, która jest średnicą tego okręgu ($2R = c$).\n\n**Krok 2:** Zapisujemy wzór na promień $R$:\n$$R = \\frac{c}{2}$$\n\n**Krok 3:** Podstawiamy długość przeciwprostokątnej $c = ${c}$:\n$$R = \\frac{${c}}{2} = ${r}$$\n\n**Pułapka CKE:** Przeciwprostokątna to ŚREDNICA okręgu, a promień to połowa średnicy. Opcja B ($${c}$) podaje średnicę zamiast promienia.`,
      matura_tip: "W trójkącie prostokątnym promień okręgu opisanego to ZAWSZE połowa przeciwprostokątnej: $R = c/2$."
    };
    tasks.push(finalizeSingleChoiceTask(task, 22000 + i));
  }

  // ARCH-23: Współrzędne środka odcinka (40 zadań)
  for (let i = 1; i <= 40; i++) {
    const xA = (i % 6) + 1; // 1 to 6
    const dx = 2 * (1 + (i % 4)); // 2, 4, 6, 8
    const xB = xA + dx; // strictly positive
    const yA = -1 - (i % 5); // -1, -2, -3, -4, -5
    const dy = 2 * (3 + (i % 3)); // 6, 8, 10
    const yB = yA + dy; // strictly positive, >= 1

    const xS = (xA + xB) / 2;
    const yS = (yA + yB) / 2;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch23_${taskNum}`,
      archetypeCode: "ARCH-23",
      category: "Geometria analityczna",
      title: "Współrzędne środka odcinka",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW kartezjańskim układzie współrzędnych $(x, y)$ dane są punkty $A = (${xA}, ${yA})$ oraz $B = (${xB}, ${yB})$. Środkiem odcinka $AB$ jest punkt $S$ o współrzędnych`,
      options: makeOptions(`$(${xS}, ${yS})$`, [
        `$(${xS + 1}, ${yS})$`,
        `$(${xS}, ${yS - 2})$`,
        `$(${xB - xA}, ${yB - yA})$`,
        `$(${xS - 2}, ${yS + 1})$`,
        `$(${yS}, ${xS})$`
      ]),
      explanation: `**Krok 1:** Przywołujemy wzór na współrzędne środka odcinka $AB$ (Tablice CKE str. 11):\n$$S = \\left(\\frac{x_A + x_B}{2}, \\frac{y_A + y_B}{2}\\right)$$\n\n**Krok 2:** Obliczamy pierwszą współrzędną $x_S$ jako średnią arytmetyczną odciętych:\n$$x_S = \\frac{${xA} + ${xB}}{2} = \\frac{${xA + xB}}{2} = ${xS}$$\n\n**Krok 3:** Obliczamy drugą współrzędną $y_S$ jako średnią arytmetyczną rzędnych:\n$$y_S = \\frac{${yA} + ${yB}}{2} = \\frac{${yA + yB}}{2} = ${yS}$$\nZatem środkiem odcinka jest punkt $S = (${xS}, ${yS})$.\n\n**Pułapka CKE:** Współrzędne końców DODAJEMY i dzielimy przez 2 (średnia arytmetyczna), a nie odejmujemy! Opcja D przedstawia wektor $\\vec{AB}$, a nie środek odcinka.`,
      matura_tip: "Tablice CKE str. 11: Środek odcinka to średnia arytmetyczna współrzędnych: $x_S = \\frac{x_A+x_B}{2}, y_S = \\frac{y_A+y_B}{2}$."
    };
    tasks.push(finalizeSingleChoiceTask(task, 23000 + i));
  }

  // ARCH-24: Równanie prostej przechodzącej przez dwa punkty (67 zadań)
  for (let i = 1; i <= 67; i++) {
    const a = 1 + (i % 4); // 1, 2, 3, 4
    const x1 = 1 + (i % 3); // 1, 2, 3
    const x2 = x1 + 2;
    const b = 1 + (i % 4); // strictly positive (1, 2, 3, 4)
    const y1 = a * x1 + b; // >= 2
    const y2 = a * x2 + b; // >= 4
    const taskNum = String(i).padStart(3, '0');

    const bStr = `+ ${b}`;
    const aPrefix = a === 1 ? '' : `${a}`;

    const task = {
      id: `task_math_form23_arch24_${taskNum}`,
      archetypeCode: "ARCH-24",
      category: "Geometria analityczna",
      title: "Równanie prostej przechodzącej przez dwa punkty",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW kartezjańskim układzie współrzędnych $(x, y)$ prosta przechodząca przez punkty $A = (${x1}, ${y1})$ oraz $B = (${x2}, ${y2})$ ma równanie`,
      options: makeOptions(`$y = ${aPrefix}x ${bStr}$`, [
        `$y = -${aPrefix}x ${bStr}$`,
        `$y = ${a + 1}x ${bStr}$`,
        `$y = ${aPrefix}x + ${b + 3}$`,
        `$y = ${a + 2}x$`
      ]),
      explanation: `**Krok 1:** Obliczamy współczynnik kierunkowy prostej $a$ ze wzoru (Tablice CKE str. 11):\n$$a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${a}$$\n\n**Krok 2:** Wyznaczamy wyraz wolny $b$, wstawiając współrzędne punktu $A = (${x1}, ${y1})$ do równania kierunkowego $y = ax + b$:\n$$${y1} = ${a} \\cdot ${x1} + b \\implies ${y1} = ${a * x1} + b \\implies b = ${y1} - ${a * x1} = ${b}$$\n\n**Krok 3:** Zapisujemy równanie prostej:\n$$y = ${aPrefix}x ${bStr}$$\n\n**Pułapka CKE:** We wzorze na współczynnik $a$ w liczniku stoją igreki ($y_2 - y_1$), a w mianowniku iksy ($x_2 - x_1$). Odwrócenie tego ilorazu to typowy błąd egzaminacyjny!`,
      matura_tip: "Tablice CKE str. 11: Współczynnik kierunkowy to $a = \\frac{y_B - y_A}{x_B - x_A}$. Zawsze igreki na górze!"
    };
    tasks.push(finalizeSingleChoiceTask(task, 24000 + i));
  }

  // ARCH-25: Równanie okręgu w postaci kanonicznej (40 zadań)
  for (let i = 1; i <= 40; i++) {
    const aVals = [-4, -3, -2, -1, 1, 2, 3, 4];
    const bVals = [-3, -2, -1, 1, 2, 3];
    const rVals = [2, 3, 4, 5];
    const a = aVals[i % aVals.length];
    const b = bVals[(i + 1) % bVals.length];
    const r = rVals[i % rVals.length];
    const rSq = r * r;
    const taskNum = String(i).padStart(3, '0');

    const signA = a > 0 ? `- ${a}` : `+ ${Math.abs(a)}`;
    const signB = b > 0 ? `- ${b}` : `+ ${Math.abs(b)}`;

    const task = {
      id: `task_math_form23_arch25_${taskNum}`,
      archetypeCode: "ARCH-25",
      category: "Geometria analityczna",
      title: "Środek i promień okręgu z równania",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW kartezjańskim układzie współrzędnych $(x, y)$ dany jest okrąg o równaniu $(x ${signA})^2 + (y ${signB})^2 = ${rSq}$. Środek $S$ i promień $r$ tego okręgu to`,
      options: makeOptions(`$S = (${a}, ${b})$ oraz $r = ${r}$`, [
        `$S = (${-a}, ${-b})$ oraz $r = ${r}$`,
        `$S = (${a}, ${b})$ oraz $r = ${rSq}$`,
        `$S = (${-a}, ${-b})$ oraz $r = ${rSq}$`,
        `$S = (${a + 1}, ${b})$ oraz $r = ${r}$`
      ]),
      explanation: `**Krok 1:** Przywołujemy postać kanoniczną równania okręgu (Tablice CKE str. 11):\n$$(x - a)^2 + (y - b)^2 = r^2$$\ngdzie $S = (a, b)$ to współrzędne środka okręgu, a $r > 0$ to jego promień.\n\n**Krok 2:** Odczytujemy współrzędne środka $S = (a, b)$ ze zmianą znaków:\n- Z wyrażenia $(x ${signA})$ otrzymujemy $a = ${a}$.\n- Z wyrażenia $(y ${signB})$ otrzymujemy $b = ${b}$.\nZatem $S = (${a}, ${b})$.\n\n**Krok 3:** Wyznaczamy promień $r$, wyciągając pierwiastek kwadratowy z prawej strony równania:\n$$r = \\sqrt{${rSq}} = ${r}$$\n\n**Pułapka CKE:** Prawa strona równania okręgu to $r^2$, a nie $r$! Opcja C zapomina o wyciągnięciu pierwiastka z $r^2$. Pamiętaj również o zmianie znaków współrzędnych środka.`,
      matura_tip: "Tablice CKE str. 11: $(x - a)^2 + (y - b)^2 = r^2$. Pamiętaj: współrzędne środka zmieniają znak, a promień to pierwiastek z prawej strony!"
    };
    tasks.push(finalizeSingleChoiceTask(task, 25000 + i));
  }

  return tasks;
}
