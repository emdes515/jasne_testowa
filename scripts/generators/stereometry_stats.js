import { finalizeSingleChoiceTask, makeOptions, gcd } from './utils.js';

export function generateStereometryAndStats() {
  const tasks = [];

  // ARCH-26: Graniastosłup prawidłowy czworokątny (54 zadania)
  for (let i = 1; i <= 54; i++) {
    const a = 2 + (i % 5); // 2, 3, 4, 5, 6
    // Ensure h != a to prevent V === Pc collision!
    let h = 3 + (i % 4);  // 3, 4, 5, 6
    if (h === a) {
      h = a + 2;
    }
    const v = a * a * h;
    const pc = 2 * (a * a) + 4 * (a * h);
    const taskNum = String(i).padStart(3, '0');
    const isVol = (i % 2 === 1);

    if (isVol) {
      const task = {
        id: `task_math_form23_arch26_${taskNum}`,
        archetypeCode: "ARCH-26",
        category: "Stereometria",
        title: "Objętość graniastosłupa prawidłowego czworokątnego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW graniastosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a wysokość graniastosłupa jest równa $${h}$. Objętość tego graniastosłupa jest równa`,
        options: makeOptions(`$${v}$`, [
          `$${Math.round(v / 3)}$`,
          `$${a * h}$`,
          `$${v * 2}$`,
          `$${v + 15}$`
        ]),
        explanation: `**Krok 1:** Podstawą graniastosłupa prawidłowego czworokątnego jest kwadrat o boku $a = ${a}$. Obliczamy pole podstawy (Tablice CKE str. 13):\n$$P_p = a^2 = ${a}^2 = ${a * a}$$\n\n**Krok 2:** Przywołujemy wzór na objętość graniastosłupa $V = P_p \\cdot H$ i podstawiamy wysokość $H = ${h}$:\n$$V = ${a * a} \\cdot ${h}$$\n\n**Krok 3:** Wykonujemy mnożenie:\n$$V = ${v}$$\n\n**Pułapka CKE:** Opcja B ($${Math.round(v / 3)}$) to objętość ostrosłupa (ze współczynnikiem $\\frac{1}{3}$). Graniastosłup nie ma $\\frac{1}{3}$ we wzorze na objętość!`,
        matura_tip: "Tablice CKE str. 13: Objętość graniastosłupa to po prostu pole podstawy razy wysokość: $V = P_p \\cdot H$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 26000 + i));
    } else {
      const task = {
        id: `task_math_form23_arch26_${taskNum}`,
        archetypeCode: "ARCH-26",
        category: "Stereometria",
        title: "Pole powierzchni całkowitej graniastosłupa prawidłowego czworokątnego",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nW graniastosłupie prawidłowym czworokątnym krawędź podstawy ma długość $${a}$, a wysokość graniastosłupa jest równa $${h}$. Pole powierzchni całkowitej tego graniastosłupa jest równe`,
        options: makeOptions(`$${pc}$`, [
          `$${4 * a * h}$`,
          `$${pc - a * a}$`,
          `$${pc + 20}$`,
          `$${pc * 2}$`
        ]),
        explanation: `**Krok 1:** Pole powierzchni całkowitej graniastosłupa to suma pól dwóch podstaw i czterech ścian bocznych:\n$$P_c = 2P_p + P_b$$\n\n**Krok 2:** Obliczamy pole obu podstaw (kwadraty o boku $a = ${a}$) oraz pole powierzchni bocznej:\n$$2P_p = 2 \\cdot ${a}^2 = 2 \\cdot ${a * a} = ${2 * a * a}$$\n$$P_b = 4 \\cdot (a \\cdot H) = 4 \\cdot (${a} \\cdot ${h}) = ${4 * a * h}$$\n\n**Krok 3:** Dodajemy pola:\n$$P_c = ${2 * a * a} + ${4 * a * h} = ${pc}$$\n\n**Pułapka CKE:** Pamiętaj, że graniastosłup ma DWIE podstawy (dolną i górną). Opcja B pomija obie podstawy, a opcja C uwzględnia tylko jedną podstawę.`,
        matura_tip: "Graniastosłup ma ZAWSZE dwa denka: $P_c = 2P_p + P_b$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 26000 + i));
    }
  }

  // ARCH-27: Ostrosłup prawidłowy czworokątny (48 zadań)
  for (let i = 1; i <= 48; i++) {
    const trips = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13]];
    const t = trips[i % trips.length];
    const baseEdge = t[0] * 2;
    const height = t[1];
    const pp = baseEdge * baseEdge;
    const vol = (pp * height) / 3;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch27_${taskNum}`,
      archetypeCode: "ARCH-27",
      category: "Stereometria",
      title: "Objętość ostrosłupa prawidłowego czworokątnego",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nPodstawą ostrosłupa prawidłowego czworokątnego jest kwadrat o boku $a = ${baseEdge}$, a wysokość tego ostrosłupa jest równa $H = ${height}$. Objętość tego ostrosłupa jest równa`,
      options: makeOptions(`$${vol}$`, [
        `$${vol * 3}$`,
        `$${vol + 14}$`,
        `$${vol * 2}$`,
        `$${vol - 6}$`
      ]),
      explanation: `**Krok 1:** Podstawą ostrosłupa jest kwadrat o boku $a = ${baseEdge}$. Obliczamy pole podstawy (Tablice CKE str. 13):\n$$P_p = a^2 = ${baseEdge}^2 = ${pp}$$\n\n**Krok 2:** Przywołujemy wzór na objętość ostrosłupa:\n$$V = \\frac{1}{3} P_p \\cdot H$$\n\n**Krok 3:** Podstawiamy $P_p = ${pp}$ oraz $H = ${height}$:\n$$V = \\frac{1}{3} \\cdot ${pp} \\cdot ${height} = ${vol}$$\n\n**Pułapka CKE:** Nie zapomnij podzielić iloczynu przez 3 (opcja B to objętość graniastosłupa o takich samych wymiarach). Ostrosłup to bryła ze szpicem i zawsze ma $\\frac{1}{3}$ we wzorze na objętość!`,
      matura_tip: "Tablice CKE str. 13: Ostrosłup to szpic, a każdy szpic ma $\\frac{1}{3}$ we wzorze na objętość: $V = \\frac{1}{3} P_p \\cdot H$."
    };
    tasks.push(finalizeSingleChoiceTask(task, 27000 + i));
  }

  // ARCH-28: Bryły obrotowe (walec, stożek, kula) (40 zadań)
  for (let i = 1; i <= 40; i++) {
    const subType = i % 3; // 0: walec, 1: stożek, 2: kula
    const r = 2 + (i % 4);
    const taskNum = String(i).padStart(3, '0');

    if (subType === 0) {
      const h = 3 + (i % 4);
      const vCoeff = r * r * h;
      const task = {
        id: `task_math_form23_arch28_${taskNum}`,
        archetypeCode: "ARCH-28",
        category: "Stereometria",
        title: "Objętość walca",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nPromień podstawy walca jest równy $r = ${r}$, a jego wysokość wynosi $h = ${h}$. Objętość tego walca jest równa`,
        options: makeOptions(`$${vCoeff}\\pi$`, [
          `$${Math.round(vCoeff / 3)}\\pi$`,
          `$${2 * r * h}\\pi$`,
          `$${vCoeff * 2}\\pi$`,
          `$${vCoeff + 15}\\pi$`
        ]),
        explanation: `**Krok 1:** Przywołujemy wzór na objętość walca (Tablice CKE str. 14):\n$$V = \\pi r^2 h$$\n\n**Krok 2:** Podstawiamy promień podstawy $r = ${r}$ oraz wysokość $h = ${h}$:\n$$V = \\pi \\cdot ${r}^2 \\cdot ${h} = \\pi \\cdot ${r * r} \\cdot ${h}$$\n\n**Krok 3:** Wykonujemy mnożenie:\n$$V = ${vCoeff}\\pi$$\n\n**Pułapka CKE:** Opcja B to objętość stożka (ze współczynnikiem $\\frac{1}{3}$). Walec ma dwie równoległe podstawy i nie posiada $\\frac{1}{3}$ we wzorze na objętość!`,
        matura_tip: "Tablice CKE str. 14: Objętość walca to $V = \\pi r^2 h$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 28000 + i));
    } else if (subType === 1) {
      const h3 = 3 * (1 + (i % 3)); // wysokość podzielna przez 3
      const vCoeff = (r * r * h3) / 3;
      const task = {
        id: `task_math_form23_arch28_${taskNum}`,
        archetypeCode: "ARCH-28",
        category: "Stereometria",
        title: "Objętość stożka",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nPromień podstawy stożka jest równy $r = ${r}$, a jego wysokość wynosi $h = ${h3}$. Objętość tego stożka jest równa`,
        options: makeOptions(`$${vCoeff}\\pi$`, [
          `$${vCoeff * 3}\\pi$`,
          `$${r * h3}\\pi$`,
          `$${vCoeff + 10}\\pi$`,
          `$${vCoeff - 5}\\pi$`
        ]),
        explanation: `**Krok 1:** Przywołujemy wzór na objętość stożka (Tablice CKE str. 14):\n$$V = \\frac{1}{3} \\pi r^2 h$$\n\n**Krok 2:** Podstawiamy $r = ${r}$ oraz $h = ${h3}$:\n$$V = \\frac{1}{3} \\cdot \\pi \\cdot ${r}^2 \\cdot ${h3} = \\frac{1}{3} \\cdot \\pi \\cdot ${r * r} \\cdot ${h3}$$\n\n**Krok 3:** Skracamy ułamek $\\frac{1}{3}$ z wysokością $${h3}$:\n$$V = ${vCoeff}\\pi$$\n\n**Pułapka CKE:** Stożek to bryła ze szpicem, pamiętaj o współczynniku $\\frac{1}{3}$ (opcja B to objętość walca bez podziału przez 3).`,
        matura_tip: "Tablice CKE str. 14: Objętość stożka to $V = \\frac{1}{3}\\pi r^2 h$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 28000 + i));
    } else {
      const areaCoeff = 4 * r * r;
      const task = {
        id: `task_math_form23_arch28_${taskNum}`,
        archetypeCode: "ARCH-28",
        category: "Stereometria",
        title: "Pole powierzchni kuli",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nPromień kuli jest równy $R = ${r}$. Pole powierzchni tej kuli jest równe`,
        options: makeOptions(`$${areaCoeff}\\pi$`, [
          `$${r * r}\\pi$`,
          `$${2 * areaCoeff}\\pi$`,
          `$${areaCoeff + 12}\\pi$`,
          `$${areaCoeff - 8}\\pi$`
        ]),
        explanation: `**Krok 1:** Przywołujemy wzór na pole powierzchni kuli (Tablice CKE str. 14):\n$$P = 4\\pi R^2$$\n\n**Krok 2:** Podstawiamy promień kuli $R = ${r}$:\n$$P = 4 \\cdot \\pi \\cdot ${r}^2 = 4 \\cdot \\pi \\cdot ${r * r}$$\n\n**Krok 3:** Obliczamy iloczyn:\n$$P = ${areaCoeff}\\pi$$\n\n**Pułapka CKE:** Opcja B ($\\pi R^2$) to pole koła wielkiego kuli. Całkowite pole powierzchni kuli jest dokładnie 4 razy większe!`,
        matura_tip: "Tablice CKE str. 14: Pole powierzchni kuli to dokładnie 4 pola jej koła wielkiego: $P = 4\\pi R^2$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 28000 + i));
    }
  }

  // ARCH-29: Kombinatoryka (54 zadania)
  for (let i = 1; i <= 54; i++) {
    const isThreeDigits = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');

    if (isThreeDigits) {
      const nDigits = 5 + (i % 4); // 5, 6, 7, 8
      const total = nDigits * nDigits * nDigits;
      const noRepTotal = nDigits * (nDigits - 1) * (nDigits - 2);

      const task = {
        id: `task_math_form23_arch29_${taskNum}`,
        archetypeCode: "ARCH-29",
        category: "Kombinatoryka",
        title: "Reguła mnożenia dla liczb trzycyfrowych",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nIle jest wszystkich liczb naturalnych trzycyfrowych, których cyfry należą do zbioru $\\{1, 2, 3, \\dots, ${nDigits}\\}$ (cyfry mogą się powtarzać)?`,
        options: makeOptions(`$${total}$`, [
          `$${nDigits * 3}$`,
          `$${noRepTotal}$`,
          `$${total - nDigits}$`,
          `$${total + 25}$`
        ]),
        explanation: `**Krok 1:** Analizujemy liczbę pozycji w liczbie trzycyfrowej (setki, dziesiątki, jedności) oraz zbiór dostępnych cyfr o mocy $n = ${nDigits}$.\n\n**Krok 2:** Stosujemy regułę mnożenia (Tablice CKE str. 16), pamiętając, że cyfry MOGĄ się powtarzać:\n- Na pozycji setek możemy umieścić dowolną z $${nDigits}$ cyfr,\n- Na pozycji dziesiątek możemy umieścić dowolną z $${nDigits}$ cyfr,\n- Na pozycji jedności możemy umieścić dowolną z $${nDigits}$ cyfr.\n\n**Krok 3:** Mnożymy liczbę możliwości dla poszczególnych pozycji:\n$$N = ${nDigits} \\cdot ${nDigits} \\cdot ${nDigits} = ${total}$$\n\n**Pułapka CKE:** Opcja C ($${noRepTotal}$) dotyczy sytuacji bez powtórzeń cyfr. W zadaniu jest wyraźnie zaznaczone, że cyfry mogą się powtarzać!`,
        matura_tip: "Tablice CKE str. 16: Gdy elementy mogą się powtarzać, każda pozycja ma tyle samo możliwości ($n^k$)."
      };
      tasks.push(finalizeSingleChoiceTask(task, 29000 + i));
    } else {
      const nDigits = 6 + (i % 4); // 6, 7, 8, 9
      const total = nDigits * (nDigits - 1) * (nDigits - 2) * (nDigits - 3);

      const task = {
        id: `task_math_form23_arch29_${taskNum}`,
        archetypeCode: "ARCH-29",
        category: "Kombinatoryka",
        title: "Reguła mnożenia bez powtórzeń",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nCzterocyfrowy kod PIN tworzymy z cyfr ze zbioru $\\{1, 2, 3, \\dots, ${nDigits}\\}$ tak, że żadna cyfra w kodzie się nie powtarza. Liczba wszystkich takich kodów jest równa`,
        options: makeOptions(`$${total}$`, [
          `$${Math.pow(nDigits, 4)}$`,
          `$${nDigits * 4}$`,
          `$${Math.round(total / 2)}$`,
          `$${total + 30}$`
        ]),
        explanation: `**Krok 1:** Analizujemy liczbę pozycji w kodzie 4-cyfrowym oraz warunek: cyfry NIE mogą się powtarzać.\n\n**Krok 2:** Na każde kolejne miejsce możemy wybrać o jedną cyfrę mniej niż na poprzednie:\n- 1. cyfra: $${nDigits}$ możliwości,\n- 2. cyfra: $${nDigits - 1}$ możliwości,\n- 3. cyfra: $${nDigits - 2}$ możliwości,\n- 4. cyfra: $${nDigits - 3}$ możliwości.\n\n**Krok 3:** Stosujemy regułę mnożenia:\n$$N = ${nDigits} \\cdot ${nDigits - 1} \\cdot ${nDigits - 2} \\cdot ${nDigits - 3} = ${total}$$\n\n**Pułapka CKE:** Opcja B ($${Math.pow(nDigits, 4)}$) to sytuacja z powtórzeniami cyfr ($n^4$). Zwracaj szczególną uwagę na zwrot 'bez powtórzeń'!`,
        matura_tip: "Gdy elementy nie mogą się powtarzać, każda kolejna decyzja ma o 1 opcję mniej!"
      };
      tasks.push(finalizeSingleChoiceTask(task, 29000 + i));
    }
  }

  // ARCH-30: Rachunek prawdopodobieństwa (62 zadania)
  for (let i = 1; i <= 62; i++) {
    const sumTarget = 4 + (i % 8); // sumy od 4 do 11
    let count = 0;
    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        if (d1 + d2 === sumTarget) count++;
      }
    }

    const g = gcd(count, 36);
    const num = count / g;
    const den = 36 / g;
    const taskNum = String(i).padStart(3, '0');

    const optCorrect = `$\\frac{${num}}{${den}}$`;
    const optDist1 = `$\\frac{${count + 1}}{36}$`;
    const optDist2 = `$\\frac{${num}}{${den + 2}}$`;
    const optDist3 = `$\\frac{${count}}{12}$`;

    const task = {
      id: `task_math_form23_arch30_${taskNum}`,
      archetypeCode: "ARCH-30",
      category: "Prawdopodobieństwo",
      title: "Klasyczny model prawdopodobieństwa w rzucie dwiema kostkami",
      points: 1,
      type: "SINGLE_CHOICE",
      content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nRzucamy dwa razy symetryczną sześcienną kostką do gry. Prawdopodobieństwo zdarzenia $A$ polegającego na tym, że suma wyrzuconych oczek jest równa $${sumTarget}$, wynosi`,
      options: makeOptions(optCorrect, [
        optDist1,
        optDist2,
        optDist3,
        `$\\frac{1}{2}$`,
        `$\\frac{1}{6}$`
      ]),
      explanation: `**Krok 1:** Wyznaczamy moc przestrzeni zdarzeń elementarnych $\\Omega$ dla dwukrotnego rzutu kostką sześcienną:\n$$|\\Omega| = 6 \\cdot 6 = 36$$\n\n**Krok 2:** Wyznaczamy liczbę zdarzeń sprzyjających zdarzeniu $A$ (suma oczek równa $${sumTarget}$):\nSprzyjających par wyników $(d_1, d_2)$ jest dokładnie $${count}$. Zatem $|A| = ${count}$.\n\n**Krok 3:** Obliczamy prawdopodobieństwo klasyczne i skracamy ułamek (Tablice CKE str. 16):\n$$P(A) = \\frac{|A|}{|\\Omega|} = \\frac{${count}}{36} = \\frac{${num}}{${den}}$$\n\n**Pułapka CKE:** Pamiętaj, że rzuty są rozróżnialne: para $(1, 4)$ i para $(4, 1)$ to dwa odrębne zdarzenia elementarne!`,
      matura_tip: "Tablice CKE str. 16: Prawdopodobieństwo klasyczne $P(A) = \\frac{|A|}{|\\Omega|}$. Zawsze skracaj ułamek końcowy!"
    };
    tasks.push(finalizeSingleChoiceTask(task, 30000 + i));
  }

  // ARCH-31: Statystyka: średnia arytmetyczna i mediana (48 zadań)
  for (let i = 1; i <= 48; i++) {
    const isMedian = (i % 2 === 1);
    const taskNum = String(i).padStart(3, '0');

    if (isMedian) {
      // Unordered data set of odd length (7 elements)
      const baseNumbers = [2 + (i % 3), 4 + (i % 3), 5 + (i % 3), 7 + (i % 3), 8 + (i % 3), 9 + (i % 3), 11 + (i % 3)];
      const displayed = [baseNumbers[3], baseNumbers[0], baseNumbers[5], baseNumbers[1], baseNumbers[6], baseNumbers[2], baseNumbers[4]];
      const sorted = [...displayed].sort((a, b) => a - b);
      const median = sorted[3]; // middle element

      const task = {
        id: `task_math_form23_arch31_${taskNum}`,
        archetypeCode: "ARCH-31",
        category: "Statystyka",
        title: "Mediana nieuporządkowanego zestawu danych",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nMediana zestawu siedmiu danych liczb: $${displayed.join(', ')}$ jest równa`,
        options: makeOptions(`$${median}$`, [
          `$${displayed[3]}$`, // naive middle element without sorting
          `$${median + 1}$`,
          `$${median - 2}$`,
          `$${median + 3}$`
        ]),
        explanation: `**Krok 1:** Aby wyznaczyć medianę, ZAWSZE najpierw porządkujemy zestaw danych w kolejności niemalejącej:\n$$${sorted.join(' \\le ')}$$\n\n**Krok 2:** Zliczamy liczbę danych: $n = 7$ (liczba nieparzysta).\n\n**Krok 3:** Mediana to wartość środkowego wyrazu (na pozycji $\\frac{n+1}{2} = \\frac{7+1}{2} = 4$):\n$$M_e = ${median}$$\n\n**Pułapka CKE:** Nigdy nie wybieraj elementu środkowego z NIEUPORZĄDKOWANEGO ciągu (opcja B: $${displayed[3]}$)! Porządkowanie danych to bezwzględny wymóg definicji mediany.`,
        matura_tip: "Złota reguła mediany: ZAWSZE najpierw ustaw liczby od najmniejszej do największej!"
      };
      tasks.push(finalizeSingleChoiceTask(task, 31000 + i));
    } else {
      // Mean with missing element
      const targetMean = 5 + (i % 5);
      const arr = [2 + (i % 3), 4 + (i % 3), 6 + (i % 3), 7 + (i % 3)];
      const sumKnown = arr.reduce((acc, v) => acc + v, 0);
      const missingX = 5 * targetMean - sumKnown;

      const task = {
        id: `task_math_form23_arch31_${taskNum}`,
        archetypeCode: "ARCH-31",
        category: "Statystyka",
        title: "Wyznaczanie brakującej liczby ze średniej arytmetycznej",
        points: 1,
        type: "SINGLE_CHOICE",
        content: `Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\n\nŚrednia arytmetyczna zestawu pięciu liczb: $${arr.join(', ')}, x$ jest równa $${targetMean}$. Liczba $x$ jest równa`,
        options: makeOptions(`$${missingX}$`, [
          `$${missingX + 2}$`,
          `$${targetMean}$`,
          `$${missingX - 1}$`,
          `$${missingX + 5}$`
        ]),
        explanation: `**Krok 1:** Zapisujemy definicję średniej arytmetycznej dla 5 liczb (Tablice CKE str. 17):\n$$\\bar{x} = \\frac{${arr.join(' + ')} + x}{5} = ${targetMean}$$\n\n**Krok 2:** Obliczamy sumę znanych liczb:\n$$${sumKnown} + x = 5 \\cdot ${targetMean} = ${5 * targetMean}$$\n\n**Krok 3:** Wyznaczamy niewiadomą $x$:\n$$x = ${5 * targetMean} - ${sumKnown} = ${missingX}$$\n\n**Pułapka CKE:** Pamiętaj o pomnożeniu średniej przez liczbę WSZYSTKICH elementów ($5$, a nie $4$).`,
        matura_tip: "Tablice CKE str. 17: Średnia razy liczba elementów daje sumę wszystkich składników: $\\bar{x} \\cdot n = \\sum x_i$."
      };
      tasks.push(finalizeSingleChoiceTask(task, 31000 + i));
    }
  }

  // ARCH-32: Zadania optymalizacyjne (zadania otwarte - 54 zadania)
  for (let i = 1; i <= 54; i++) {
    const pHalf = 20 + i * 2; // obwód = 40 + i * 4
    const obwod = 2 * pHalf;
    const optX = pHalf / 2;
    const maxArea = optX * optX;
    const taskNum = String(i).padStart(3, '0');

    const task = {
      id: `task_math_form23_arch32_${taskNum}`,
      archetypeCode: "ARCH-32",
      category: "Optymalizacja",
      title: "Optymalizacja pola prostokąta przy stałym obwodzie",
      points: 3,
      type: "NUMERIC_INPUT",
      content: `Właściciel działki rekreacyjnej chce ogrodzić siatką o łącznej długości $${obwod}\\text{ m}$ prostokątny plac zabaw dla dzieci.\nWyznacz wymiary tego prostokąta tak, aby jego pole powierzchni było największe, oraz oblicz to największe pole. Podaj wartość maksymalnego pola w metrach kwadratowych.`,
      correct_answer: `${maxArea}`,
      explanation: `**Krok 1: Modelowanie matematyczne.**\nNiech $x > 0$ oraz $y > 0$ oznaczają długości boków prostokątnego placu zabaw.\nObwód prostokąta wynosi $2x + 2y = ${obwod}$, stąd:\n$$x + y = ${pHalf} \\implies y = ${pHalf} - x$$\n\n**Krok 2: Wyznaczenie dziedziny geometrycznej.**\nPonieważ długości boków muszą być ściśle dodatnie:\n$$x > 0 \\quad \\text{oraz} \\quad ${pHalf} - x > 0 \\implies x < ${pHalf}$$\nZatem dziedzina funkcji to przedział: $D = (0, ${pHalf})$.\n\n**Krok 3: Zbudowanie funkcji celu.**\nPole prostokąta jako funkcja zmiennej $x$ ma postać:\n$$P(x) = x \\cdot y = x(${pHalf} - x) = -x^2 + ${pHalf}x$$\nJest to funkcja kwadratowa, której wykresem jest parabola o ramionach skierowanych w dół ($a = -1 < 0$).\n\n**Krok 4: Wyznaczenie ekstremum w wierzchołku paraboli.**\nFunkcja kwadratowa osiąga wartość największą w wierzchołku paraboli $W = (x_W, P_{\\max})$:\n$$x_W = -\\frac{b}{2a} = -\\frac{${pHalf}}{2 \\cdot (-1)} = \\frac{${pHalf}}{2} = ${optX}$$\nLiczba $x = ${optX}$ należy do dziedziny ($${optX} \\in (0, ${pHalf})$).\nDrugi bok wynosi:\n$$y = ${pHalf} - ${optX} = ${optX}$$\n\n**Krok 5: Obliczenie wartości maksymalnej i odpowiedź.**\nMaksymalne pole powierzchni wynosi:\n$$P_{\\max} = P(${optX}) = ${optX} \\cdot ${optX} = ${maxArea}\\text{ m}^2$$\n\n**Wniosek:** Największe pole ma działka w kształcie kwadratu o wymiarach $${optX}\\text{ m} \\times ${optX}\\text{ m}$, a maksymalne pole jest równe **${maxArea} m²**.\n\n**Pułapka CKE:** W zadaniu otwartym z optymalizacji CKE bezwzględnie wymaga zdefiniowania zmiennych, wyznaczenia dziedziny geometrycznej $D$ oraz formalnego uzasadnienia, dlaczego funkcja osiąga w danym punkcie wartość największą (np. $a < 0$).`,
      matura_tip: "Tablice CKE str. 8: Wierzchołek paraboli $x_W = -b / (2a)$ wyznacza punkt optymalny. Zawsze pamiętaj o wyznaczeniu dziedziny!"
    };
    tasks.push(task);
  }

  return tasks;
}
