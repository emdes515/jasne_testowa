import sys
import os
import re

sys.path.insert(0, os.path.abspath('.'))
sys.stdout.reconfigure(encoding='utf-8')

print("Starting curriculum builders repair for Topics 11-21...")

# Helper to replace \implies
def replace_implies(content):
    return content.replace(r'\implies', r'\longrightarrow')

# 1. Topic 11
b11 = "scripts/curriculum_builder/topic_11_builder.py"
with open(b11, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)
with open(b11, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_11_builder.py")

# 2. Topic 12
b12 = "scripts/curriculum_builder/topic_12_builder.py"
with open(b12, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)
with open(b12, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_12_builder.py")

# 3. Topic 13
b13 = "scripts/curriculum_builder/topic_13_builder.py"
with open(b13, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)
with open(b13, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_13_builder.py")

# 4. Topic 14 (Trygonometria)
b14 = "scripts/curriculum_builder/topic_14_builder.py"
with open(b14, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)

# Lesson 14.1: CKE str. 10 (definicje w trójkącie prostokątnym)
c = c.replace("'cke_page': 'str. 14'", "'cke_page': 'str. 10'")
c = c.replace("Karta wzorów CKE str. 14.", "Karta wzorów CKE str. 10 (lub str. 12 dla tożsamości).")

# Lesson 14.2: CKE str. 12 (jedynka trygonometryczna, tangens)
# Find lesson 14.2 context
c = re.sub(
    r"('title': 'Jedynka trygonometryczna',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 12. Podstawa tożsamości trygonometrycznych.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Jedynka trygonometryczna',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 12\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Tangens',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 12. Dla kątów, gdzie cosinus jest różny od zera.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Tangens',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 12\g<2>",
    c, flags=re.DOTALL
)

# Lesson 14.3: CKE str. 12-13 (tabela wartości i wzory redukcyjne)
c = c.replace("'cke_page': 'str. 15'", "'cke_page': 'str. 12–13'")
c = c.replace("Karta wzorów CKE str. 15.", "Karta wzorów CKE str. 12–13 (tabela wartości i wzory redukcyjne).")

# Lesson 14.4: CKE str. 15 (pole z sinusem)
c = c.replace("'cke_page': 'str. 17'", "'cke_page': 'str. 15'")
c = c.replace("'cke_page': 'str. 18'", "'cke_page': 'str. 19–20'")
c = c.replace("Karta wzorów CKE str. 17.", "Karta wzorów CKE str. 15 (pole trójkąta z sinusem).")
c = c.replace("Karta wzorów CKE str. 18.", "Karta wzorów CKE str. 19–20 (pole równoległoboku i rombu).")

with open(b14, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_14_builder.py")

# 5. Topic 15 (Planimetria - trójkąty)
b15 = "scripts/curriculum_builder/topic_15_builder.py"
with open(b15, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)

# L15.1: Trójkąt równoboczny CKE str. 15
c = re.sub(
    r"('title': 'Wysokość trójkąta równobocznego',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 15. a - długość boku trójkąta.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Wysokość trójkąta równobocznego',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 15\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Pole trójkąta równobocznego',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 15. Wzór na pole trójkąta równobocznego.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Pole trójkąta równobocznego',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 15\g<2>",
    c, flags=re.DOTALL
)

# L15.2: Twierdzenie Talesa CKE str. 17
c = re.sub(
    r"('title': 'Twierdzenie Talesa',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 17. Warunek: proste równoległe.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Twierdzenie Talesa',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 17\g<2>",
    c, flags=re.DOTALL
)

# L15.3: Cechy podobieństwa CKE str. 16 (already str. 16)

with open(b15, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_15_builder.py")

# 6. Topic 16 (Planimetria - czworokąty i okręgi)
b16 = "scripts/curriculum_builder/topic_16_builder.py"
with open(b16, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)

# L16.1: Czworokąty (trapez, romb) CKE str. 19-20
c = c.replace("'cke_page': 'str. 18'", "'cke_page': 'str. 19–20'")
c = c.replace("Karta wzorów CKE str. 18.", "Karta wzorów CKE str. 19–20.")

# L16.2: Kąty w okręgu CKE str. 18
# In 16.2 currently has 'str. 17'
c = re.sub(
    r"('title': 'Kąt środkowy i wpisany',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 18. Kąt środkowy jest dwa razy większy od kąta wpisanego opartego na tym samym łuku.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Kąt środkowy i wpisany',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 18\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Kąt wpisany oparty na średnicy',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 18. Kąt wpisany oparty na średnicy okręgu ma zawsze 90 stopni.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Kąt wpisany oparty na średnicy',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 18\g<2>",
    c, flags=re.DOTALL
)

# L16.3: Koło i okrąg CKE str. 17, okrąg na trójkącie prostokątnym CKE str. 15
c = re.sub(
    r"('title': 'Promień okręgu opisanego na trójkącie prostokątnym',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 15. R = c/2 (promień to połowa przeciwprostokątnej).\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Promień okręgu opisanego na trójkącie prostokątnym',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 15\g<2>",
    c, flags=re.DOTALL
)

with open(b16, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_16_builder.py")

# 7. Topic 17 (Geometria analityczna)
b17 = "scripts/curriculum_builder/topic_17_builder.py"
with open(b17, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)

# L17.1: Długość i środek odcinka CKE str. 21
c = re.sub(
    r"('title': 'Długość odcinka',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 21. Odległość punktów na płaszczyźnie kartezjańskiej.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Długość odcinka',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 21\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Współrzędne środka odcinka',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 21. Średnia arytmetyczna współrzędnych końców odcinka.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Współrzędne środka odcinka',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 21\g<2>",
    c, flags=re.DOTALL
)

# L17.2: Równanie prostej, proste prostopadłe/równoległe CKE str. 21-22
c = re.sub(
    r"('title': 'Warunek równoległości prostych',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 22. Proste są równoległe, gdy mają równe współczynniki kierunkowe.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Warunek równoległości prostych',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 22\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Warunek prostopadłości prostych',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 22. Proste są prostopadłe, gdy iloczyn ich współczynników wynosi -1.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Warunek prostopadłości prostych',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 22\g<2>",
    c, flags=re.DOTALL
)

# L17.3: Równanie okręgu CKE str. 23
c = re.sub(
    r"('title': 'Równanie okręgu w postaci kanonicznej',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 23. S(a, b) - środek okręgu, r - promień.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Równanie okręgu w postaci kanonicznej',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 23\g<2>",
    c, flags=re.DOTALL
)

# Replace any lingering 'str. 19' in topic 17
c = c.replace("'cke_page': 'str. 19'", "'cke_page': 'str. 21'")
c = c.replace("Karta wzorów CKE str. 19.", "Karta wzorów CKE str. 21–23.")

with open(b17, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_17_builder.py")

# 8. Topic 18 (Stereometria)
b18 = "scripts/curriculum_builder/topic_18_builder.py"
with open(b18, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)

# L18.1: Graniastosłupy i prostopadłościan CKE str. 24-25
c = re.sub(
    r"('title': 'Przekątna prostopadłościanu',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 25. a, b, c - długości krawędzi.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Przekątna prostopadłościanu',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 25\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość graniastosłupa',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 25. P_p - pole podstawy, H - wysokość.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość graniastosłupa',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 25\g<2>",
    c, flags=re.DOTALL
)

# L18.2: Ostrosłupy CKE str. 25
c = re.sub(
    r"('title': 'Objętość ostrosłupa',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 25. Objętość ostrosłupa to 1/3 iloczynu pola podstawy i wysokości.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość ostrosłupa',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 25\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Zależność w ścianie bocznej',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 25. Trójkąt prostokątny łączący wysokość H, promień r i wysokość ściany h_b.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Zależność w ścianie bocznej',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 25\g<2>",
    c, flags=re.DOTALL
)

# L18.3: Bryły obrotowe CKE str. 26
c = re.sub(
    r"('title': 'Objętość walca',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 26. Walec o promieniu r i wysokości H.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość walca',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 26\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość stożka',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 26. Stożek o promieniu r i wysokości H.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość stożka',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 26\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość i pole kuli',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 26. Kula o promieniu R.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Objętość i pole kuli',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 26\g<2>",
    c, flags=re.DOTALL
)

# Replace any lingering str. 20 / str. 21 in topic 18
c = c.replace("'cke_page': 'str. 20'", "'cke_page': 'str. 25'")
c = c.replace("'cke_page': 'str. 21'", "'cke_page': 'str. 26'")
c = c.replace("Karta wzorów CKE str. 20.", "Karta wzorów CKE str. 25.")
c = c.replace("Karta wzorów CKE str. 21.", "Karta wzorów CKE str. 26.")

with open(b18, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_18_builder.py")

# 9. Topic 19 (Kombinatoryka i Prawdopodobieństwo)
b19 = "scripts/curriculum_builder/topic_19_builder.py"
with open(b19, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)

# L19.1: Reguła mnożenia CKE str. 26
c = re.sub(
    r"('title': 'Reguła mnożenia',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 26. Całkowita liczba permutacji i wyborów wieloetapowych.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Reguła mnożenia',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 26\g<2>",
    c, flags=re.DOTALL
)

# L19.2: Klasyczna definicja prawdopodobieństwa CKE str. 27-28
c = re.sub(
    r"('title': 'Klasyczna definicja prawdopodobieństwa',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 28. Stosunek liczby zdarzeń sprzyjających do liczby wszystkich zdarzeń elementarnych.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Klasyczna definicja prawdopodobieństwa',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 28\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Zdarzenie przeciwne',.*?'description': ')[^']*(')",
    r"\g<1>Karta wzorów CKE str. 27. Suma prawdopodobieństw zdarzeń przeciwnych wynosi 1.\g<2>",
    c, flags=re.DOTALL
)
c = re.sub(
    r"('title': 'Zdarzenie przeciwne',.*?'cke_page': ')[^']*(')",
    r"\g<1>str. 27\g<2>",
    c, flags=re.DOTALL
)

# Lingering
c = c.replace("'cke_page': 'str. 22'", "'cke_page': 'str. 26'")
c = c.replace("'cke_page': 'str. 23'", "'cke_page': 'str. 27–28'")
c = c.replace("Karta wzorów CKE str. 22.", "Karta wzorów CKE str. 26.")
c = c.replace("Karta wzorów CKE str. 23.", "Karta wzorów CKE str. 27–28.")

with open(b19, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_19_builder.py")

# 10. Topic 20 (Statystyka)
b20 = "scripts/curriculum_builder/topic_20_builder.py"
with open(b20, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)
# L20.2: Mediana CKE str. 30
c = c.replace("'cke_page': 'str. 29–30'", "'cke_page': 'str. 30'")
c = c.replace("Karta wzorów CKE str. 29–30.", "Karta wzorów CKE str. 30.")

with open(b20, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_20_builder.py")

# 11. Topic 21 (Zadania optymalizacyjne)
b21 = "scripts/curriculum_builder/topic_21_builder.py"
with open(b21, encoding='utf-8') as f:
    c = f.read()
c = replace_implies(c)
c = c.replace("Karta wzorów CKE str. 8.", "Karta wzorów CKE str. 7–8 (postać ogólna i wierzchołek paraboli).")
c = c.replace("'cke_page': 'str. 8'", "'cke_page': 'str. 7–8'")

with open(b21, 'w', encoding='utf-8') as f:
    f.write(c)
print("Updated topic_21_builder.py")

print("All curriculum builders repaired successfully!")
