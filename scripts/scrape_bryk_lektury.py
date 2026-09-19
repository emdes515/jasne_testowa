# -*- coding: utf-8 -*-
import os
import sys
import time
import re
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding='utf-8')

BASE_OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'lektury_matura_podstawowa'))
os.makedirs(BASE_OUTPUT_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'pl,en-US;q=0.7,en;q=0.3',
}

LEKTURY = [
    # --- POZIOM PODSTAWOWY (PODSTAWA 2024 - MATURA 2025+) ---
    {
        'id': '01_Biblia',
        'author': 'Nieznany (Pismo Święte)',
        'title': 'Biblia',
        'epoch': 'Starożytność (Antyk)',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Fragmenty: Księgi Rodzaju, Hioba, Koheleta, Psalmów, Apokalipsy św. Jana',
        'primary_url': 'https://www.bryk.pl/lektury/nieznany/biblia.wiadomosci-ogolne',
        'base_slug': '/lektury/nieznany/biblia.'
    },
    {
        'id': '02_Jan_Parandowski_Mitologia',
        'author': 'Jan Parandowski',
        'title': 'Mitologia (cz. I Grecja)',
        'epoch': 'Starożytność (Antyk)',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Część I Grecja: mity o powstaniu świata, Prometeuszu, Syzyfie, Dedalu i Ikarze, Demeter i Korze, wojnie trojańskiej',
        'primary_url': 'https://www.bryk.pl/lektury/jan-parandowski/mitologia.wiadomosci-ogolne',
        'base_slug': '/lektury/jan-parandowski/mitologia.'
    },
    {
        'id': '03_Homer_Iliada',
        'author': 'Homer',
        'title': 'Iliada (fragmenty)',
        'epoch': 'Starożytność (Antyk)',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Fragmenty: epos bohaterski, gniew Achillesa, pojedynek z Hektorem, tarcza Achillesa',
        'primary_url': 'https://www.bryk.pl/lektury/homer/iliada.streszczenie-szczegolowe',
        'base_slug': '/lektury/homer/iliada.'
    },
    {
        'id': '04_Sofokles_Antygona',
        'author': 'Sofokles',
        'title': 'Antygona',
        'epoch': 'Starożytność (Antyk)',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Tragedia antyczna w całości: konflikt tragiczny, prawa boskie vs prawa ludzkie, wina tragiczna (hamartia)',
        'primary_url': 'https://www.bryk.pl/lektury/sofokles/antygona.streszczenie-szczegolowe',
        'base_slug': '/lektury/sofokles/antygona.'
    },
    {
        'id': '05_Lament_swietokrzyski',
        'author': 'Anonim',
        'title': 'Lament świętokrzyski',
        'epoch': 'Średniowiecze',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Żale Matki Boskiej pod krzyżem (fragmenty): liryka maryjna, motyw stabat mater dolorosa',
        'primary_url': 'https://www.bryk.pl/lektury/nieznany/lament-swietokrzyski.streszczenie-szczegolowe',
        'base_slug': '/lektury/nieznany/lament-swietokrzyski.'
    },
    {
        'id': '06_Rozmowa_Mistrza_Polikarpa_ze_Smiercia',
        'author': 'Anonim',
        'title': 'Rozmowa Mistrza Polikarpa ze Śmiercią',
        'epoch': 'Średniowiecze',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Fragmenty: motyw danse macabre (taniec śmierci), równość wszystkich stanów wobec śmierci',
        'primary_url': 'https://www.bryk.pl/lektury/nieznany/rozmowa-mistrza-polikarpa-ze-smiercia.streszczenie-szczegolowe',
        'base_slug': '/lektury/nieznany/rozmowa-mistrza-polikarpa-ze-smiercia.'
    },
    {
        'id': '07_Piesn_o_Rolandzie',
        'author': 'Anonim',
        'title': 'Pieśń o Rolandzie',
        'epoch': 'Średniowiecze',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Fragmenty chanson de geste: etos rycerski, śmierć rycerza, wierność władcy i Bogu',
        'primary_url': 'https://www.bryk.pl/lektury/nieznany/piesn-o-rolandzie.streszczenie-szczegolowe',
        'base_slug': '/lektury/nieznany/piesn-o-rolandzie.'
    },
    {
        'id': '08_Bogurodzica',
        'author': 'Anonim',
        'title': 'Bogurodzica',
        'epoch': 'Średniowiecze',
        'category': 'Utwory Poetyckie (Test CKE)',
        'cke_note': 'Najstarsza utrwalona polska pieśń religijna, pieśń ojczysta, motyw deesis',
        'primary_url': 'https://www.bryk.pl/lektury/nieznany/bogurodzica.streszczenie-szczegolowe',
        'base_slug': '/lektury/nieznany/bogurodzica.'
    },
    {
        'id': '09_Jan_Kochanowski_Piesni',
        'author': 'Jan Kochanowski',
        'title': 'Pieśni (w tym Pieśń IX ks. I, Pieśń V ks. II)',
        'epoch': 'Renesans',
        'category': 'Utwory Poetyckie (Test CKE)',
        'cke_note': 'Pieśń IX ks. I (Chce kto sobie przed trunkiem...), Pieśń V ks. II (O spustoszeniu Podola)',
        'primary_url': 'https://www.bryk.pl/lektury/jan-kochanowski/piesni.streszczenie-szczegolowe',
        'base_slug': '/lektury/jan-kochanowski/piesni.'
    },
    {
        'id': '10_Jan_Kochanowski_Treny',
        'author': 'Jan Kochanowski',
        'title': 'Treny (w tym Treny IX, X, XI)',
        'epoch': 'Renesans',
        'category': 'Utwory Poetyckie (Test CKE)',
        'cke_note': 'Cykl trenologiczny: ból ojcowski, kryzys światopoglądu humanistycznego (Treny IX, X, XI)',
        'primary_url': 'https://www.bryk.pl/lektury/jan-kochanowski/treny.tren-i-interpretacja-wszytki-placze-wszytki-lzy-heraklitowe',
        'base_slug': '/lektury/jan-kochanowski/treny.'
    },
    {
        'id': '11_William_Szekspir_Makbet',
        'author': 'William Szekspir',
        'title': 'Makbet',
        'epoch': 'Renesans / Przełom Baroku',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Dramat szekspirowski w całości: żądza władzy, mechanizm zbrodni, fatum a wolna wola',
        'primary_url': 'https://www.bryk.pl/lektury/william-szekspir/makbet.streszczenie-szczegolowe',
        'base_slug': '/lektury/william-szekspir/makbet.'
    },
    {
        'id': '12_Molier_Skapiec',
        'author': 'Molier',
        'title': 'Skąpiec',
        'epoch': 'Barok / Klasycyzm francuski',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Komedia w całości: portret psychologiczny skąpca (Harpagon), deformacja relacji rodzinnych',
        'primary_url': 'https://www.bryk.pl/lektury/molier/skapiec.streszczenie-szczegolowe',
        'base_slug': '/lektury/molier/skapiec.'
    },
    {
        'id': '13_Ignacy_Krasicki_Zona_modna',
        'author': 'Ignacy Krasicki',
        'title': 'Satyry (w tym Żona modna)',
        'epoch': 'Oświecenie',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Wybrana satyra: krytyka cudzoziemszczyzny, snobizmu i małżeństw dla posagu',
        'primary_url': 'https://www.bryk.pl/lektury/ignacy-krasicki/zona-modna.streszczenie-szczegolowe',
        'base_slug': '/lektury/ignacy-krasicki/zona-modna.'
    },
    {
        'id': '14_Ignacy_Krasicki_Bajki',
        'author': 'Ignacy Krasicki',
        'title': 'Bajki',
        'epoch': 'Oświecenie',
        'category': 'Szkoła Podstawowa (Test CKE)',
        'cke_note': 'Bajki epigramatyczne i narracyjne: prawdy uniwersalne o naturze ludzkiej, mechanizmy władzy i naiwności',
        'primary_url': 'https://www.bryk.pl/lektury/ignacy-krasicki/bajki.streszczenie-szczegolowe',
        'base_slug': '/lektury/ignacy-krasicki/bajki.'
    },
    {
        'id': '15_Ignacy_Krasicki_Hymn_do_milosci_ojczyzny',
        'author': 'Ignacy Krasicki',
        'title': 'Hymn do miłości ojczyzny',
        'epoch': 'Oświecenie',
        'category': 'Utwory Poetyckie (Test CKE)',
        'cke_note': 'Pieśń patriotyczna oświecenia: bezinteresowna miłość ojczyzny jako najwyższa cnota',
        'primary_url': 'https://www.bryk.pl/lektury/ignacy-krasicki/hymn-do-milosci-ojczyzny.streszczenie-szczegolowe',
        'base_slug': '/lektury/ignacy-krasicki/hymn-do-milosci-ojczyzny.'
    },
    {
        'id': '16_Adam_Mickiewicz_Romantycznosc_i_ballady',
        'author': 'Adam Mickiewicz',
        'title': 'Ballady i romanse (w tym Romantyczność)',
        'epoch': 'Romantyzm',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Manifest polskiego romantyzmu: prymat czucia i wiary nad szkiełkiem i okiem mędrca',
        'primary_url': 'https://www.bryk.pl/lektury/adam-mickiewicz/romantycznosc.streszczenie-szczegolowe',
        'base_slug': '/lektury/adam-mickiewicz/romantycznosc.'
    },
    {
        'id': '17_Adam_Mickiewicz_Oda_do_mlodosci',
        'author': 'Adam Mickiewicz',
        'title': 'Oda do młodości',
        'epoch': 'Romantyzm',
        'category': 'Utwory Poetyckie (Test CKE)',
        'cke_note': 'Wiersz przełomu oświeceniowo-romantycznego: apoteoza młodości i wspólnego czynu',
        'primary_url': 'https://www.bryk.pl/lektury/adam-mickiewicz/oda-do-mlodosci.streszczenie-szczegolowe',
        'base_slug': '/lektury/adam-mickiewicz/oda-do-mlodosci.'
    },
    {
        'id': '18_Adam_Mickiewicz_Dziady_cz_II',
        'author': 'Adam Mickiewicz',
        'title': 'Dziady cz. II',
        'epoch': 'Romantyzm',
        'category': 'Szkoła Podstawowa (Test CKE)',
        'cke_note': 'Dramat romantyczny: obrzęd dziadów, prawa moralne rządzące światem, wina i odkupienie',
        'primary_url': 'https://www.bryk.pl/lektury/adam-mickiewicz/dziady-cz-ii.streszczenie-szczegolowe',
        'base_slug': '/lektury/adam-mickiewicz/dziady-cz-ii.'
    },
    {
        'id': '19_Adam_Mickiewicz_Dziady_cz_III',
        'author': 'Adam Mickiewicz',
        'title': 'Dziady cz. III',
        'epoch': 'Romantyzm',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Dramat narodowy w całości: mesjanizm polski, prometeizm Konrada (Wielka Improwizacja), martyrologia młodzieży wileńskiej, Salon Warszawski',
        'primary_url': 'https://www.bryk.pl/lektury/adam-mickiewicz/dziady-cz-iii.streszczenie-szczegolowe',
        'base_slug': '/lektury/adam-mickiewicz/dziady-cz-iii.'
    },
    {
        'id': '20_Adam_Mickiewicz_Pan_Tadeusz',
        'author': 'Adam Mickiewicz',
        'title': 'Pan Tadeusz',
        'epoch': 'Romantyzm',
        'category': 'Szkoła Podstawowa (Test CKE)',
        'cke_note': 'Epopeja narodowa (księgi: I, II, IV, X, XI, XII): obraz szlachty polskiej, Soplicowo jako arkadia, dzieje Jacka Soplicy (ksiądz Robak)',
        'primary_url': 'https://www.bryk.pl/lektury/adam-mickiewicz/pan-tadeusz.streszczenie-szczegolowe',
        'base_slug': '/lektury/adam-mickiewicz/pan-tadeusz.'
    },
    {
        'id': '21_Aleksander_Fredro_Zemsta',
        'author': 'Aleksander Fredro',
        'title': 'Zemsta',
        'epoch': 'Romantyzm',
        'category': 'Szkoła Podstawowa (Test CKE)',
        'cke_note': 'Komedia kontuszowa w całości: spór o mur graniczny, Cześnik Raptusiewicz i Rejent Milczek, komizm postaci i języka',
        'primary_url': 'https://www.bryk.pl/lektury/aleksander-fredro/zemsta.streszczenie-szczegolowe',
        'base_slug': '/lektury/aleksander-fredro/zemsta.'
    },
    {
        'id': '22_Juliusz_Slowacki_Balladyna',
        'author': 'Juliusz Słowacki',
        'title': 'Balladyna',
        'epoch': 'Romantyzm',
        'category': 'Szkoła Podstawowa (Test CKE)',
        'cke_note': 'Tragedia romantyczna w całości: droga do władzy znaczona zbrodnią, motywy baśniowe i natura wymierzająca sprawiedliwość',
        'primary_url': 'https://www.bryk.pl/lektury/juliusz-slowacki/balladyna.streszczenie-szczegolowe',
        'base_slug': '/lektury/juliusz-slowacki/balladyna.'
    },
    {
        'id': '23_Juliusz_Slowacki_Testament_moj',
        'author': 'Juliusz Słowacki',
        'title': 'Testament mój',
        'epoch': 'Romantyzm',
        'category': 'Utwory Poetyckie (Test CKE)',
        'cke_note': 'Testament poetycki i liryka tyrtejska: rola poety przewodnika narodu',
        'primary_url': 'https://www.bryk.pl/lektury/juliusz-slowacki/testament-moj.streszczenie-szczegolowe',
        'base_slug': '/lektury/juliusz-slowacki/testament-moj.'
    },
    {
        'id': '24_Boleslaw_Prus_Lalka',
        'author': 'Bolesław Prus',
        'title': 'Lalka',
        'epoch': 'Pozytywizm',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Powieść dojrzałego realizmu w całości: panorama Warszawy, klęska ideowa pokolenia romantyków i pozytywistów, Stanisław Wokulski, Izabela Łęcka, Ignacy Rzecki',
        'primary_url': 'https://www.bryk.pl/lektury/boleslaw-prus/lalka.streszczenie-szczegolowe',
        'base_slug': '/lektury/boleslaw-prus/lalka.'
    },
    {
        'id': '25_Henryk_Sienkiewicz_Potop',
        'author': 'Henryk Sienkiewicz',
        'title': 'Potop (fragmenty)',
        'epoch': 'Pozytywizm',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Powieść ku pokrzepieniu serc (fragmenty): potop szwedzki, przemiana wewnętrzna Andrzeja Kmicica (Babinicz), obrona Jasnej Góry',
        'primary_url': 'https://www.bryk.pl/lektury/henryk-sienkiewicz/potop.streszczenie-szczegolowe',
        'base_slug': '/lektury/henryk-sienkiewicz/potop.'
    },
    {
        'id': '26_Fiodor_Dostojewski_Zbrodnia_i_kara',
        'author': 'Fiodor Dostojewski',
        'title': 'Zbrodnia i kara',
        'epoch': 'Pozytywizm / Realizm psychologiczny',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Powieść polifoniczna i psychologiczna w całości: teoria jednostek niezwykłych Raskolnikowa, motyw zbrodni, kary i odkupienia przez wiarę (Sonia)',
        'primary_url': 'https://www.bryk.pl/lektury/fiodor-dostojewski/zbrodnia-i-kara.streszczenie-szczegolowe',
        'base_slug': '/lektury/fiodor-dostojewski/zbrodnia-i-kara.'
    },
    {
        'id': '27_Stanislaw_Wyspianski_Wesele',
        'author': 'Stanisław Wyspiański',
        'title': 'Wesele',
        'epoch': 'Młoda Polska',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Dramat symboliczny i narodowy w całości: diagnoza społeczeństwa polskiego (inteligencja i chłopi), symbole: Chochoł, Złoty Róg, Czapka z pawich piór',
        'primary_url': 'https://www.bryk.pl/lektury/stanislaw-wyspianski/wesele.streszczenie-szczegolowe',
        'base_slug': '/lektury/stanislaw-wyspianski/wesele.'
    },
    {
        'id': '28_Wladyslaw_Stanislaw_Reymont_Chlopi',
        'author': 'Władysław Stanisław Reymont',
        'title': 'Chłopi (tom I: Jesień)',
        'epoch': 'Młoda Polska',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Epopeja chłopska (tom I Jesień): mityzacja życia wiejskiego, cykl biologiczno-religijny, gromada Lipiec, Maciej Boryna, Antek i Jagna',
        'primary_url': 'https://www.bryk.pl/lektury/wladyslaw-stanislaw-reymont/chlopi-t-i.streszczenie-szczegolowe',
        'base_slug': '/lektury/wladyslaw-stanislaw-reymont/chlopi-t-i.'
    },
    {
        'id': '29_Stefan_Zeromski_Przedwiosnie',
        'author': 'Stefan Żeromski',
        'title': 'Przedwiośnie',
        'epoch': 'Dwudziestolecie międzywojenne',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Powieść polityczno-społeczna w całości: dojrzewanie Cezarego Baryki, mit szklanych domów, konfrontacja rewolucji bolszewickiej i odrodzonej Polski',
        'primary_url': 'https://www.bryk.pl/lektury/stefan-zeromski/przedwiosnie.streszczenie-szczegolowe',
        'base_slug': '/lektury/stefan-zeromski/przedwiosnie.'
    },
    {
        'id': '30_Witold_Gombrowicz_Ferdydurke',
        'author': 'Witold Gombrowicz',
        'title': 'Ferdydurke (fragmenty)',
        'epoch': 'Dwudziestolecie międzywojenne',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Powieść awangardowa (fragmenty): upupienie, gęba, forma, konformizm społeczny, schemat szkoły i dworku szlacheckiego',
        'primary_url': 'https://www.bryk.pl/lektury/witold-gombrowicz/ferdydurke.streszczenie-szczegolowe',
        'base_slug': '/lektury/witold-gombrowicz/ferdydurke.'
    },
    {
        'id': '31_Tadeusz_Borowski_Prosze_panstwa_do_gazu',
        'author': 'Tadeusz Borowski',
        'title': 'Proszę państwa do gazu',
        'epoch': 'Wojna i okupacja',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Opowiadanie oświęcimskie w całości: człowiek zlagrowany, dehumanizacja, moralność odwróconego dekalogu',
        'primary_url': 'https://www.bryk.pl/lektury/tadeusz-borowski/prosze-panstwa-do-gazu.streszczenie-szczegolowe',
        'base_slug': '/lektury/tadeusz-borowski/prosze-panstwa-do-gazu.'
    },
    {
        'id': '32_Gustaw_Herling_Grudzinski_Inny_swiat',
        'author': 'Gustaw Herling-Grudziński',
        'title': 'Inny świat (fragmenty)',
        'epoch': 'Wojna i okupacja',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Zapiski łagrowe (fragmenty): obóz w Jercewie, człowiek złagrowany, granice człowieczeństwa i ocalenie godności',
        'primary_url': 'https://www.bryk.pl/lektury/gustaw-herling-grudzinski/inny-swiat.streszczenie-szczegolowe',
        'base_slug': '/lektury/gustaw-herling-grudzinski/inny-swiat.'
    },
    {
        'id': '33_Hanna_Krall_Zdazyc_przed_Panem_Bogiem',
        'author': 'Hanna Krall',
        'title': 'Zdążyć przed Panem Bogiem',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Reportaż literacki w całości: wspomnienia Marka Edelmana z powstania w getcie warszawskim, wybór sposobu umierania, praca kardiochirurga jako wyścig ze śmiercią',
        'primary_url': 'https://www.bryk.pl/lektury/hanna-krall/zdazyc-przed-panem-bogiem.streszczenie-szczegolowe',
        'base_slug': '/lektury/hanna-krall/zdazyc-przed-panem-bogiem.'
    },
    {
        'id': '34_Albert_Camus_Dzuma',
        'author': 'Albert Camus',
        'title': 'Dżuma',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Powieść parabola w całości: dżuma jako symbol totalitaryzmu i zła metafizycznego, postawa dr. Rieux (laicka świętość, heroizm codzienny)',
        'primary_url': 'https://www.bryk.pl/lektury/albert-camus/dzuma.streszczenie-szczegolowe',
        'base_slug': '/lektury/albert-camus/dzuma.'
    },
    {
        'id': '35_George_Orwell_Rok_1984',
        'author': 'George Orwell',
        'title': 'Rok 1984',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Antyutopia / dystopia w całości: państwo totalitarne, Wielki Brat, Nowomowa, zbrodnia myśli, manipulacja przeszłością',
        'primary_url': 'https://www.bryk.pl/lektury/george-orwell/rok-1984.streszczenie-szczegolowe',
        'base_slug': '/lektury/george-orwell/rok-1984.'
    },
    {
        'id': '36_Slawomir_Mrozek_Tango',
        'author': 'Sławomir Mrożek',
        'title': 'Tango',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Dramat absurdu w całości: bunt przeciwko anarchii i brakowi norm, dyktatura prostactwa i brutalnej siły (Edek)',
        'primary_url': 'https://www.bryk.pl/lektury/slawomir-mrozek/tango.streszczenie-szczegolowe',
        'base_slug': '/lektury/slawomir-mrozek/tango.'
    },
    {
        'id': '37_Marek_Nowakowski_Gora_Edek',
        'author': 'Marek Nowakowski',
        'title': 'Górą „Edek”',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Opowiadanie w całości (z tomu Prawo prerii): triumf bezwzględności, chamstwa i nowobogactwa w rzeczywistości postsocjalistycznej',
        'primary_url': 'https://www.bryk.pl/lektury/marek-nowakowski/gora-edek.streszczenie-szczegolowe',
        'base_slug': '/lektury/marek-nowakowski/gora-edek.'
    },
    {
        'id': '38_Andrzej_Stasiuk_Miejsce',
        'author': 'Andrzej Stasiuk',
        'title': 'Miejsce',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Opowiadanie w całości (z tomu Opowieści galicyjskie): pamięć o cerkwi łemkowskiej, przemijanie, obecność braku i tożsamość pogranicza',
        'primary_url': 'https://www.bryk.pl/lektury/andrzej-stasiuk/miejsce.streszczenie-szczegolowe',
        'base_slug': '/lektury/andrzej-stasiuk/miejsce.'
    },
    {
        'id': '39_Olga_Tokarczuk_Profesor_Andrews_w_Warszawie',
        'author': 'Olga Tokarczuk',
        'title': 'Profesor Andrews w Warszawie',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Opowiadanie w całości (z tomu Gra na wielu bębenkach): zagubienie angielskiego psychologa w Warszawie w grudniu 1981 r. (początek stanu wojennego)',
        'primary_url': 'https://www.bryk.pl/lektury/olga-tokarczuk/profesor-andrews-w-warszawie.streszczenie-szczegolowe',
        'base_slug': '/lektury/olga-tokarczuk/profesor-andrews-w-warszawie.'
    },
    {
        'id': '40_Ryszard_Kapuscinski_Podroze_z_Herodotem',
        'author': 'Ryszard Kapuściński',
        'title': 'Podróże z Herodotem (fragmenty)',
        'epoch': 'Literatura współczesna',
        'category': 'Podstawa 2024 (Liceum/Technikum)',
        'cke_note': 'Fragmenty reportażu refleksyjnego: spotkanie z Innym, przekraczanie granic kulturowych, Herodot jako pierwszy reporter świata',
        'primary_url': 'https://www.bryk.pl/lektury/ryszard-kapuscinski/podroze-z-herodotem.streszczenie-szczegolowe',
        'base_slug': '/lektury/ryszard-kapuscinski/podroze-z-herodotem.'
    },

    # --- LEKTURY OKRESU PRZEJŚCIOWEGO (PODSTAWA 2018 - DOPUSZCZONE 2025-2028) ---
    {
        'id': '41_Legenda_o_sw_Aleksym',
        'author': 'Anonim',
        'title': 'Legenda o św. Aleksym',
        'epoch': 'Średniowiecze',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Fragmenty legendy hagiograficznej: etos ascety, asceza średniowieczna',
        'primary_url': 'https://www.bryk.pl/lektury/nieznany/legenda-o-swietym-aleksym.streszczenie-szczegolowe',
        'base_slug': '/lektury/nieznany/legenda-o-swietym-aleksym.'
    },
    {
        'id': '42_Kwiatki_swietego_Franciszka',
        'author': 'Anonim',
        'title': 'Kwiatki świętego Franciszka z Asyżu',
        'epoch': 'Średniowiecze',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Fragmenty: franciszkanizm, radosna wiara, miłość do wszelkiego stworzenia',
        'primary_url': 'https://www.bryk.pl/lektury/nieznany/kwiatki-swietego-franciszka.streszczenie-szczegolowe',
        'base_slug': '/lektury/nieznany/kwiatki-swietego-franciszka.'
    },
    {
        'id': '43_Gall_Anonim_Kronika_polska',
        'author': 'Gall Anonim',
        'title': 'Kronika polska',
        'epoch': 'Średniowiecze',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Fragmenty: kronikarstwo średniowieczne, wzorzec idealnego władcy (Bolesław Chrobry, Bolesław Krzywousty)',
        'primary_url': 'https://www.bryk.pl/lektury/gall-anonim/kronika-galla-anonima.streszczenie-szczegolowe',
        'base_slug': '/lektury/gall-anonim/kronika-galla-anonima.'
    },
    {
        'id': '44_Jan_Kochanowski_Odprawa_poslow_greckich',
        'author': 'Jan Kochanowski',
        'title': 'Odprawa posłów greckich',
        'epoch': 'Renesans',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Pierwsza polska tragedia humanistyczna: odpowiedzialność za losy ojczyzny, krytyka prywaty szlacheckiej (Antenor vs Aleksander)',
        'primary_url': 'https://www.bryk.pl/lektury/jan-kochanowski/odprawa-poslow-greckich.streszczenie-szczegolowe',
        'base_slug': '/lektury/jan-kochanowski/odprawa-poslow-greckich.'
    },
    {
        'id': '45_Piotr_Skarga_Kazania_sejmowe',
        'author': 'Piotr Skarga',
        'title': 'Kazania sejmowe',
        'epoch': 'Renesans / Barok',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Fragmenty: kaznodziejstwo patriotyczne, choroby Rzeczypospolitej (Kazanie wtóre: O miłości ku ojczyźnie)',
        'primary_url': 'https://www.bryk.pl/lektury/piotr-skarga/kazania-sejmowe.streszczenie-szczegolowe',
        'base_slug': '/lektury/piotr-skarga/kazania-sejmowe.'
    },
    {
        'id': '46_Jan_Chryzostom_Pasek_Pamietniki',
        'author': 'Jan Chryzostom Pasek',
        'title': 'Pamiętniki',
        'epoch': 'Barok',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Fragmenty: sarmatyzm, mentalność szlachecka XVII w., pamiętnikarstwo',
        'primary_url': 'https://www.bryk.pl/lektury/jan-chryzostom-pasek/pamietniki.streszczenie-fragmenty',
        'base_slug': '/lektury/jan-chryzostom-pasek/pamietniki.'
    },
    {
        'id': '47_William_Szekspir_Romeo_i_Julia',
        'author': 'William Szekspir',
        'title': 'Romeo i Julia',
        'epoch': 'Renesans',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Tragedia miłosna w całości: potęga miłości zderzona z nienawiścią rodów Kapuletich i Montekich',
        'primary_url': 'https://www.bryk.pl/lektury/william-szekspir/romeo-i-julia.streszczenie-szczegolowe',
        'base_slug': '/lektury/william-szekspir/romeo-i-julia.'
    },
    {
        'id': '48_Adam_Mickiewicz_Konrad_Wallenrod',
        'author': 'Adam Mickiewicz',
        'title': 'Konrad Wallenrod',
        'epoch': 'Romantyzm',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Powieść poetycka: tragizm wallenrodyczny, zdrada i podstęp w imię ratowania ojczyzny (makiawelizm)',
        'primary_url': 'https://www.bryk.pl/lektury/adam-mickiewicz/konrad-wallenrod.streszczenie-szczegolowe',
        'base_slug': '/lektury/adam-mickiewicz/konrad-wallenrod.'
    },
    {
        'id': '49_Boleslaw_Prus_Z_legend_dawnego_Egiptu',
        'author': 'Bolesław Prus',
        'title': 'Z legend dawnego Egiptu',
        'epoch': 'Pozytywizm',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Nowela w całości: przemijalność ludzkich planów, marność władzy wobec przypadku i śmierci (Ramzes i Horus)',
        'primary_url': 'https://www.bryk.pl/lektury/boleslaw-prus/z-legend-dawnego-egiptu.streszczenie-szczegolowe',
        'base_slug': '/lektury/boleslaw-prus/z-legend-dawnego-egiptu.'
    },
    {
        'id': '50_Eliza_Orzeszkowa_Gloria_victis',
        'author': 'Eliza Orzeszkowa',
        'title': 'Gloria victis',
        'epoch': 'Pozytywizm',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Nowela w całości: pamięć o powstaniu styczniowym, chwała zwyciężonym, bezimienny heroizm powstańców (Romuald Traugutt, Maryś, Jagmin)',
        'primary_url': 'https://www.bryk.pl/lektury/eliza-orzeszkowa/gloria-victis.streszczenie-szczegolowe',
        'base_slug': '/lektury/eliza-orzeszkowa/gloria-victis.'
    },
    {
        'id': '51_Stefan_Zeromski_Rozdziobia_nas_kruki_wrony',
        'author': 'Stefan Żeromski',
        'title': 'Rozdzióbią nas kruki, wrony…',
        'epoch': 'Młoda Polska',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Opowiadanie w całości: tragizm schyłku powstania styczniowego, samotna śmierć Wincentego Szremskiego, obojętność i odcięcie chłopa',
        'primary_url': 'https://www.bryk.pl/lektury/stefan-zeromski/rozdziobia-nas-kruki-wrony.streszczenie-szczegolowe',
        'base_slug': '/lektury/stefan-zeromski/rozdziobia-nas-kruki-wrony.'
    },
    {
        'id': '52_Tadeusz_Borowski_Ludzie_ktorzy_szli',
        'author': 'Tadeusz Borowski',
        'title': 'Ludzie, którzy szli',
        'epoch': 'Wojna i okupacja',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Opowiadanie lagrowe w całości: mechanizm masowej Zagłady w Birkenau widziany z perspektywy boiska piłkarskiego',
        'primary_url': 'https://www.bryk.pl/lektury/tadeusz-borowski/ludzie-ktorzy-szli.streszczenie-szczegolowe',
        'base_slug': '/lektury/tadeusz-borowski/ludzie-ktorzy-szli.'
    },
    {
        'id': '53_Jozef_Mackiewicz_Droga_donikad',
        'author': 'Józef Mackiewicz',
        'title': 'Droga donikąd (fragmenty)',
        'epoch': 'Literatura współczesna',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Powieść o okupacji sowieckiej na Wileńszczyźnie',
        'primary_url': 'https://www.bryk.pl/lektury/jozef-mackiewcz/droga-donikad.streszczenie-szczegolowe',
        'base_slug': '/lektury/jozef-mackiewcz/droga-donikad.'
    },
    {
        'id': '54_Marek_Nowakowski_Raport_o_stanie_wojennym',
        'author': 'Marek Nowakowski',
        'title': 'Raport o stanie wojennym',
        'epoch': 'Literatura współczesna',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Wybrane opowiadanie o realiach stanu wojennego w Polsce',
        'primary_url': 'https://www.bryk.pl/lektury/marek-nowakowski/raport-o-stanie-wojennym-stan-wojny.streszczenie-szczegolowe',
        'base_slug': '/lektury/marek-nowakowski/raport-o-stanie-wojennym-stan-wojny.'
    },
    {
        'id': '55_Jacek_Dukaj_Katedra',
        'author': 'Jacek Dukaj',
        'title': 'Katedra',
        'epoch': 'Literatura współczesna',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Opowiadanie science fiction (z tomu W kraju niewiernych): granice poznania, wiara i cud na odległej planetoidzie',
        'primary_url': 'https://www.bryk.pl/lektury/jacek-dukaj/katedra.streszczenie-szczegolowe',
        'base_slug': '/lektury/jacek-dukaj/katedra.'
    },
    {
        'id': '56_Antoni_Libera_Madame',
        'author': 'Antoni Libera',
        'title': 'Madame',
        'epoch': 'Literatura współczesna',
        'category': 'Okres Przejściowy 2018-2028',
        'cke_note': 'Powieść o dorastaniu w PRL-u lat 60., fascynacji romanistyką i wolnym światem',
        'primary_url': 'https://www.bryk.pl/lektury/antoni-libera/madame.streszczenie-szczegolowe',
        'base_slug': '/lektury/antoni-libera/madame.'
    }
]

def fetch_html(url, retries=3):
    req = urllib.request.Request(url, headers=HEADERS)
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                return resp.read().decode('utf-8', errors='ignore')
        except Exception as e:
            if attempt == retries - 1:
                print(f"    [BŁĄD] Nie udało się pobrać {url}: {e}")
                return None
            time.sleep(1.0 + attempt)
    return None

def html_to_markdown(container):
    if not container:
        return ''
    
    # Usuń reklamy, skrypty i widgety
    for tag in container.find_all(['script', 'style', 'noscript', 'iframe', 'button', 'form']):
        tag.decompose()
    for bad in container.find_all(class_=lambda c: c and any(k in c.lower() for k in ['advert', 'banner', 'button', 'promo', 'ad-', 'social', 'modal', 'share'])):
        bad.decompose()
        
    lines = []
    for elem in container.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'ul', 'ol', 'blockquote', 'table']):
        tag = elem.name
        text = elem.get_text(' ', strip=True)
        if not text:
            continue
            
        if tag == 'h1':
            lines.append(f'# {text}\n')
        elif tag == 'h2':
            lines.append(f'## {text}\n')
        elif tag == 'h3':
            lines.append(f'### {text}\n')
        elif tag in ['h4', 'h5']:
            lines.append(f'#### {text}\n')
        elif tag == 'p':
            lines.append(f'{text}\n')
        elif tag in ['ul', 'ol']:
            for li in elem.find_all('li', recursive=False):
                li_text = li.get_text(' ', strip=True)
                if li_text:
                    lines.append(f'- {li_text}')
            lines.append('')
        elif tag == 'blockquote':
            lines.append(f'> {text}\n')
        elif tag == 'table':
            rows = elem.find_all('tr')
            for r in rows:
                cols = [c.get_text(' ', strip=True) for c in r.find_all(['th', 'td'])]
                if cols:
                    lines.append('| ' + ' | '.join(cols) + ' |')
            lines.append('')
            
    res = '\n'.join(lines)
    res = re.sub(r'\n{3,}', '\n\n', res)
    return res.strip()

def discover_subpages(soup, base_slug):
    subpages = []
    seen = set()
    for a in soup.find_all('a', href=True):
        h = a['href'].split('?')[0]
        if h.startswith(base_slug):
            title = a.get_text(' ', strip=True)
            title = re.sub(r'^\d+\s+', '', title)
            if h not in seen and title:
                seen.add(h)
                full_url = 'https://www.bryk.pl' + h
                subpages.append((full_url, title, h))
    return subpages

def process_single_lektura(item):
    folder_path = os.path.join(BASE_OUTPUT_DIR, item['id'])
    os.makedirs(folder_path, exist_ok=True)
    
    print(f"[*] Przetwarzanie: {item['id']} ({item['title']})...")
    primary_html = fetch_html(item['primary_url'])
    if not primary_html:
        print(f"  [!] Brak głównej strony dla: {item['id']}")
        return False
        
    soup = BeautifulSoup(primary_html, 'html.parser')
    subpages = discover_subpages(soup, item['base_slug'])
    
    if not subpages:
        subpages = [(item['primary_url'], item['title'], item['primary_url'].replace('https://www.bryk.pl', ''))]
        
    streszczenie_parts = []
    opracowanie_parts = []
    
    for url, title, slug in subpages:
        time.sleep(0.12)
        html = fetch_html(url)
        if not html:
            continue
        sub_soup = BeautifulSoup(html, 'html.parser')
        container = sub_soup.find('div', class_=lambda c: c and 'lectureContentInnerContainer' in c) or sub_soup.find('article')
        if not container:
            continue
            
        md = html_to_markdown(container)
        if not md or len(md) < 50:
            continue
            
        slug_lower = slug.lower()
        is_summary = any(k in slug_lower for k in [
            'streszczenie-szczegolowe', 'ksiega-', 'wygnanie-z-raju', 'przypowiesc',
            'mit-o-', 'wojna-trojanska', 'rozdzial', 'akt-', 'tom-', 'jesien', 'streszczenie-fragmenty'
        ]) and not any(k in slug_lower for k in ['streszczenie-krotkie', 'charakterystyka', 'problematyka', 'plan-wydarzen'])
        
        if is_summary:
            streszczenie_parts.append((title, md, url))
        else:
            opracowanie_parts.append((title, md, url))
            
    if not streszczenie_parts and opracowanie_parts:
        streszczenie_parts.append(opracowanie_parts.pop(0))
        
    # --- ZAPIS STRESZCZENIA SZCZEGÓŁOWEGO ---
    streszczenie_file = os.path.join(folder_path, 'streszczenie_szczegolowe.md')
    with open(streszczenie_file, 'w', encoding='utf-8') as f:
        f.write(f"# {item['title']} - Streszczenie Szczegółowe\n\n")
        f.write(f"- **Autor**: {item['author']}\n")
        f.write(f"- **Epoka**: {item['epoch']}\n")
        f.write(f"- **Kategoria CKE**: {item['category']}\n")
        f.write(f"- **Wymogi z Informatora 2025**: {item['cke_note']}\n")
        f.write(f"- **Źródło materiału**: [Bryk.pl]({item['primary_url']})\n\n")
        f.write("---\n\n")
        
        for title, md, url in streszczenie_parts:
            f.write(f"## {title}\n\n")
            f.write(f"{md}\n\n")
            f.write("---\n\n")
            
    # --- ZAPIS OPRACOWANIA ---
    opracowanie_file = os.path.join(folder_path, 'opracowanie.md')
    with open(opracowanie_file, 'w', encoding='utf-8') as f:
        f.write(f"# {item['title']} - Opracowanie i Analiza Maturalna\n\n")
        f.write(f"- **Autor**: {item['author']}\n")
        f.write(f"- **Epoka**: {item['epoch']}\n")
        f.write(f"- **Kategoria CKE**: {item['category']}\n")
        f.write(f"- **Wymogi z Informatora 2025**: {item['cke_note']}\n")
        f.write(f"- **Źródło materiału**: [Bryk.pl]({item['primary_url']})\n\n")
        f.write("---\n\n")
        
        if opracowanie_parts:
            for title, md, url in opracowanie_parts:
                f.write(f"## {title}\n\n")
                f.write(f"{md}\n\n")
                f.write("---\n\n")
        else:
            f.write("*(Wyczerpująca treść utworu oraz konteksty zostały zawarte w pliku streszczenie_szczegolowe.md)*\n")
            
    print(f"  [OK] Zapisano: {item['id']} (Streszczenie: {len(streszczenie_parts)} sekcji, Opracowanie: {len(opracowanie_parts)} sekcji)")
    return True

def generate_master_readme():
    readme_path = os.path.join(BASE_OUTPUT_DIR, 'README.md')
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write("# 📚 Baza Lektur Obowiązkowych – Matura Język Polski (Poziom Podstawowy 2025+)\n\n")
        f.write("Zestawienie opracowane na podstawie oficjalnego dokumentu **Informator o egzaminie maturalnym z języka polskiego od roku szkolnego 2024/2025** (CKE) oraz materiałów merytorycznych z serwisu **Bryk.pl**.\n\n")
        f.write("Materiały zostały sformatowane w czystym Markdownie (bez reklam, trackerów i zbędnych elementów) i podzielone na dedykowane foldery dla każdej lektury.\n\n")
        
        f.write("## 🗂️ Spis Treści i Przewodnik po Lekturach\n\n")
        f.write("| Lp. | Lektura i Autor | Epoka | Kategoria CKE | Pliki | Wymogi Egzaminacyjne (Informator 2025) |\n")
        f.write("| :--- | :--- | :--- | :--- | :---: | :--- |\n")
        
        for i, item in enumerate(LEKTURY, 1):
            folder = item['id']
            streszczenie_rel = f"./{folder}/streszczenie_szczegolowe.md"
            opracowanie_rel = f"./{folder}/opracowanie.md"
            links = f"[📖 Streszczenie]({streszczenie_rel})<br>[🔍 Opracowanie]({opracowanie_rel})"
            f.write(f"| {i} | **{item['title']}**<br>*{item['author']}* | {item['epoch']} | {item['category']} | {links} | {item['cke_note']} |\n")
            
        f.write("\n---\n\n")
        f.write("## 📊 Statystyka Zbioru\n\n")
        f.write(f"- **Łączna liczba skatalogowanych lektur**: {len(LEKTURY)}\n")
        f.write(f"- **Lektury obowiązkowe liceum (Nowa Podstawa 2024)**: {len([x for x in LEKTURY if 'Podstawa 2024' in x['category']])}\n")
        f.write(f"- **Lektury ze szkoły podstawowej (sprawdzane w teście CKE)**: {len([x for x in LEKTURY if 'Szkoła Podstawowa' in x['category']])}\n")
        f.write(f"- **Utwory poetyckie (sprawdzane w teście historycznoliterackim)**: {len([x for x in LEKTURY if 'Poetyckie' in x['category']])}\n")
        f.write(f"- **Lektury okresu przejściowego (Podstawa 2018, dopuszczone 2025–2028)**: {len([x for x in LEKTURY if 'Okres Przejściowy' in x['category']])}\n\n")
        f.write("Materiały stanowią bazę dydaktyczną dla modułu **JASNE Polski** (Filar II: Kanon Lektur & Filar III: Warsztat Wypracowania).\n")

    print(f"\n[SUKCES] Wygenerowano zbiorczy indeks: {readme_path}")

def main():
    print(f'Rozpoczynanie pobierania {len(LEKTURY)} lektur do katalogu:\n{BASE_OUTPUT_DIR}\n')
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(process_single_lektura, item): item for item in LEKTURY}
        for future in as_completed(futures):
            item = futures[future]
            try:
                future.result()
            except Exception as e:
                print(f'  [BŁĄD KRYTYCZNY] {item["id"]}: {e}')
                
    generate_master_readme()
    elapsed = time.time() - start_time
    print(f'\nCałość zakończona w czasie: {elapsed:.2f} s.')

if __name__ == '__main__':
    main()
