# -*- coding: utf-8 -*-
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from scripts.curriculum_builder.helpers import resolve_badge_and_source

q1 = 'Dokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFunkcja kwadratowa $f$ jest określona wzorem'
b1 = resolve_badge_and_source('Matura maj 2024 • Zad. 14.2', question=q1, correct_answer='B')

q2 = 'Funkcja kwadratowa $f$ jest określona wzorem $f(x) = ax^2 + bx + 1$, gdzie $a$ oraz $b$ są pewnymi liczbami rzeczywistymi, takimi, że $a < 0$ i $b > 0$. Na jednym z rysunków A–D przedstawiono fragment wykresu tej funkcji w kartezjańskim układzie współrzędnych $(x, y)$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nFragment wykresu funkcji $f$ przedstawiono na rysunku'
b2 = resolve_badge_and_source('Matura czerwiec 2023 • Zad. 14', question=q2, correct_answer='D')

q3 = 'Jednym z miejsc zerowych funkcji kwadratowej $f$ jest liczba $(-5)$. Pierwsza współrzędna wierzchołka paraboli, będącej wykresem funkcji $f$, jest równa $3$.\nDokończ zdanie. Wybierz właściwą odpowiedź spośród podanych.\nDrugim miejscem zerowym funkcji $f$ jest liczba'
b3 = resolve_badge_and_source('Matura maj 2023 • Zad. 14', question=q3, correct_answer='A')

b4 = resolve_badge_and_source('Informator CKE • Zad. 46')

print('b1:', b1)
print('b2:', b2)
print('b3:', b3)
print('b4:', b4)
