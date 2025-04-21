<template>
    <div class="main-container">
        <a
            href="/"
            :style="{
                textDecoration: 'none',
                position: 'absolute',
                top: '20px',
                left: '20px',
                cursor: 'pointer',
                color: 'orange',
                backgroundColor: '#222222',
                paddingLeft: '1rem',
                paddingRight: '1.5rem',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                height: '3rem',
                fontWeight: '700',
                borderRadius: '4px',
            }"
        >
            <IconArrowBackUp />Strona Główna
        </a>
        <div class="content-container">
            <h1 :style="{ marginTop: '2rem', marginBottom: '4rem', width: '100%', textAlign: 'center' }">
                Format Turnieju
            </h1>
            <section id="main">
                <h2>Ogólne założenia formatu:</h2>

                Punkty za pojedyncze partie w meczu wyglądają następująco:
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }">
                    <li>Wygrana - <PointsBlock points="1" /></li>
                    <li>Remis - <PointsBlock points="0.5" /></li>
                    <li>Przegrana - <PointsBlock points="0" /></li>
                </ul>

                <p>
                    Wszystkie mecze turnieju będą rozgrywane w stylu "pierwszy gracz, który osiągnie X punktów wygrywa",
                    gdzie X to liczba punktów wymagana do wygranej. W przypadku remisu X-X, gracze grają do jednego
                    punktu przewagi. Mecze składają się z tylu partii ile będzie potrzebne do wyłonienia zwycięzcy.
                </p>
                <p>Przykład meczu do <PointsBlock points="1.5" />:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }">
                    <li>Wyniki <ResultsBlock l="1.5" r="0.5" />, <ResultsBlock l="2" r="0" /> oznaczają zwycięstwo.</li>
                    <li>
                        Wynik <ResultsBlock l="1" r="1" /> - żaden gracz nie osiągnął wymaganej liczby punktów, mecz
                        trwa dalej.
                    </li>
                    <li>
                        Wynik <ResultsBlock l="1.5" r="1.5" /> - remis, obydwaj gracze osiągnęli wymaganą liczbę
                        punktów, w tym przypadku gracze grają do jednego punktu przewagi.
                    </li>
                </ul>
                <p>
                    Zapisy takie jak "(białe)" lub "(czarne)" oznaczają kolor bierek, którymi gracz zaczyna pierwszą
                    partię meczu.
                </p>

                Wszystkie tempa w dalszej części dokumentu są w tym formacie:
                <ul>
                    <li>
                        czas podstawowy (minuty) + inkrementacja (sekundy):
                        <TempoBlock time="minuty" increment="sekundy" />
                    </li>
                </ul>

                <p>
                    Przykład: tempo <TempoBlock time="5" increment="0" /> oznacza, że każdy gracz rozpoczyna partię z 5
                    minutami na zegarze i nie otrzymuje dodatkowego czasu po wykonaniu posunięcia.
                </p>
            </section>
            <section id="groups">
                <h2>Grupy:</h2>
                <p>
                    16 graczy zostanie rozlosowanych do 4 grup: A, B, C i D. Każdy gracz w grupie rozgrywa jeden mecz z
                    każdym z pozostałych.
                </p>
                <p>
                    Mecze w grupie są rozgrywane do <PointsBlock points="1.5" /> tempem
                    <TempoBlock time="10" increment="0" />. W przypadku remisu w meczu (<ResultsBlock
                        l="1.5"
                        r="1.5"
                    />), gracze grają dalej tempem <TempoBlock time="5" increment="0" />, aż jeden z nich osiągnie jeden
                    punkt przewagi.
                </p>
                <p>
                    Pozycja w grupie zależy od bilansu wygranych i przegranych meczów. Bilans zapisywany jest formacie
                    "Wygrane mecze - Przegrane mecze", np. <ResultsBlock l="1" r="0" />.
                </p>
                <p>
                    Bilans jest sumowany, np. gracz z wynikiem <ResultsBlock l="1" r="0" /> po kolejnej wygranej ma
                    <ResultsBlock l="2" r="0" />, a po przegranej <ResultsBlock l="1" r="1" />.
                </p>
                <h2>Sposób rozgrywania grup:</h2>
                <p>
                    Kolejność wylosowania zawodników do grupy ma znaczenie — gracze wylosowani jako pierwszy (Gracz 1) i
                    trzeci (Gracz 3) otrzymują białe bierki w pierwszej partii meczu dwukrotnie.
                </p>
                <p>Runda 1: Gracz 1 (białe) vs Gracz 3 (czarne) Gracz 2 (białe) vs Gracz 4 (czarne)</p>
                <p>Runda 2: Gracz 3 (białe) vs Gracz 2 (czarne) Gracz 4 (białe) vs Gracz 1 (czarne)</p>
                <p>Runda 3: Gracz 1 (białe) vs Gracz 2 (czarne) Gracz 3 (białe) vs Gracz 4 (czarne)</p>
            </section>
            <section id="additionalRounds">
                <h2>Rundy dogrywkowe w grupie:</h2>
                <p>Po rozegraniu wszystkich meczów w grupie możliwe są remisy:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
                    <li>
                        <ResultsBlock l="2" r="1" />, <ResultsBlock l="2" r="1" />, <ResultsBlock l="1" r="2" />,
                        <ResultsBlock l="1" r="2" /> - w tym przypadku to kto wychodzi, na którym miejscu z grupy zależy
                        od bezpośredniego wyniku starcia graczy 1. i 2. oraz graczy 3. i 4.
                    </li>
                    <li>
                        <ResultsBlock l="3" r="0" />, <ResultsBlock l="1" r="2" />, <ResultsBlock l="1" r="2" />,
                        <ResultsBlock l="1" r="2" /> - w tym przypadku gracz na pierwszej pozycji wychodzi z grupy do
                        drabinki wygranych a gracze 2, 3, 4 rozgrywają kolejne rundy, aż do wyłonienia wyników grupy
                        (możliwy kolejny remis <ResultsBlock l="1" r="1" />, <ResultsBlock l="1" r="1" />,
                        <ResultsBlock l="1" r="1" />).
                    </li>
                    <li>
                        <ResultsBlock l="2" r="1" />, <ResultsBlock l="2" r="1" />, <ResultsBlock l="2" r="1" />,
                        <ResultsBlock l="0" r="3" /> - w tym przypadku gracz na ostatniej pozycji spada z grupy do
                        drabinki przegranych a gracze 1, 2, 3 rozgrywają kolejne rundy, aż do wyłonienia wyników grupy
                        (możliwy kolejny remis <ResultsBlock l="1" r="1" />, <ResultsBlock l="1" r="1" />,
                        <ResultsBlock l="1" r="1" />).
                    </li>
                </ul>
                <p>
                    W przypadku potrójnego remisu, jak opisano wyżej, gracze z tym samym wynikiem grają dodatkową rundę
                    tempem <TempoBlock time="5" increment="0" /> do <PointsBlock points="1.5" />.
                </p>
                <p>
                    Kolejność meczów w rundzie dogrywkowej wygląda następująco: <br />(Gracze są przypisywani w miejsca
                    “Gracz 1”, “Gracz 2”, “Gracz 3” w kolejności wylosowania do grupy)
                </p>
                <p>
                    Mecz 1: Gracz 1 (białe) vs Gracz 2 (czarne) <br />Mecz 2: Gracz 2 (białe) vs Gracz 3 (czarne)
                    <br />Mecz 3: Gracz 3 (białe) vs Gracz 1 (czarne)
                </p>
                <p>
                    W przypadku kolejnego remisu po pierwszej rundzie dogrywkowej, gracze grają kolejną rundę do
                    <PointsBlock points="1.5" />, ale tym razem tempem <TempoBlock time="1" increment="0" />. Każdy
                    następny remis w rundzie powtarza ten proces do wyłonienia wyników grupy, mecze rozgrywane są do
                    <PointsBlock points="1.5" /> tempem <TempoBlock time="1" increment="0" />.
                </p>
            </section>
            <section id="ladders">
                <h2>Drabinki:</h2>
                <p>Po fazie grupowej powstają dwie drabinki po 8 graczy: drabinka wygranych i drabinka przegranych.</p>
                <p>
                    Do drabinki wygranych trafiają gracze z 1. i 2. miejsca każdej grupy, natomiast do drabinki
                    przegranych gracze z 3. i 4. miejsca.
                </p>
                <p>
                    Drabinki wygranych i przegranych są od siebie niezależne, oznacza to, że nie da się dostać z jednej
                    drabinki do drugiej.
                </p>
                <p>
                    W przypadku remisu w meczu (np. <ResultsBlock l="1.5" r="1.5" /> w meczu do
                    <PointsBlock points="1.5" />), gracze grają dalej tempem <TempoBlock time="5" increment="0" />, aż
                    jeden z nich osiągnie jeden punkt przewagi.
                </p>
                W drabince przegranych rozgrywane są następująco:
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }">
                    <li>
                        Ćwierćfinały - do <PointsBlock points="1.5" /> tempem <TempoBlock time="10" increment="0" />
                    </li>
                    <li>Półfinały - do <PointsBlock points="1.5" /> tempem <TempoBlock time="10" increment="0" /></li>
                    <li>
                        Mecz o 11 miejsce - do <PointsBlock points="1.5" /> tempem
                        <TempoBlock time="10" increment="0" />
                    </li>
                    <li>Finał - do <PointsBlock points="1.5" /> tempem <TempoBlock time="10" increment="0" /></li>
                    <li>
                        Grupy dogrywkowe (miejsca 13-16) - do <PointsBlock points="1.5" /> tempem
                        <TempoBlock time="10" increment="0" />
                    </li>
                </ul>
                W drabince wygranych rozgrywane są następująco:
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }">
                    <li>
                        Ćwierćfinały - do <PointsBlock points="1.5" /> tempem <TempoBlock time="10" increment="0" />
                    </li>
                    <li>Półfinały - do <PointsBlock points="2.5" /> tempem <TempoBlock time="10" increment="0" /></li>
                    <li>
                        Mecz o 3 miejsce - do <PointsBlock points="2.5" /> tempem <TempoBlock time="10" increment="0" />
                    </li>
                    <li>Finał - do <PointsBlock points="4" /> tempem <TempoBlock time="10" increment="0" /></li>
                    <li>
                        Grupy dogrywkowe (miejsca 5-8) - do <PointsBlock points="1.5" /> tempem
                        <TempoBlock time="10" increment="0" />
                    </li>
                </ul>
                <p>
                    W poniższych zapisach litera oznacza grupę, a numer to pozycja wyjściowa gracza. Przykład: “A1” to
                    gracz, który zajął 1. miejsce w grupie A; “B3” to gracz z 3. miejsca w grupie B.
                </p>
                <p>Mecze w ćwierćfinałach rozgrywane są następująco:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
                    <li>
                        Drabinka wygranych: <br />Mecz 1: A1 (białe) vs B2 (czarne) <br />Mecz 2: B1 (białe) vs C2
                        (czarne) <br />Mecz 3: C1 (białe) vs D2 (czarne) <br />Mecz 4: D1 (białe) vs A2 (czarne)
                    </li>
                    <li>
                        Drabinka przegranych:<br />Mecz 1: A3 (białe) vs B4 (czarne) <br />Mecz 2: B3 (białe) vs C4
                        (czarne) <br />Mecz 3: C3 (białe) vs D4 (czarne) <br />Mecz 4: D3 (białe) vs A4 (czarne)
                    </li>
                </ul>
                <p>Mecze w półfinałach rozgrywane są następująco:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
                    <li>
                        Drabinka wygranych: <br />Mecz 1: Zwycięzca meczu A1 vs B2 vs Zwycięzca meczu B1 vs C2
                        <br />Mecz 2: Zwycięzca meczu C1 vs D2 vs Zwycięzca meczu D1 vs A2
                    </li>
                    <li>
                        Drabinka przegranych: <br />Mecz 1: Zwycięzca meczu A3 vs B4 vs Zwycięzca meczu B3 vs C4
                        <br />Mecz 2: Zwycięzca meczu C3 vs D4 vs Zwycięzca meczu D3 vs A4
                    </li>
                </ul>
                Mecze w finałach obydwu drabinek rozgrywane są następująco:
                <ul>
                    <li>Zwycięzca “Meczu 1” z półfinału vs Zwycięzca “Meczu 2” z półfinału</li>
                </ul>
                Mecze o 3. oraz 11. miejsce rozgrywane są następująco:
                <ul>
                    <li>Przegrany “Meczu 1” z półfinału vs Przegrany “Meczu 2” z półfinału</li>
                </ul>
                <p>
                    Kolory startowe bierek dla graczy w półfinałach, meczach o 3. oraz 11. miejsce i finałach są
                    losowane na żywo przed meczem.
                </p>
            </section>
            <section id="additional">
                <h2>Grupy dogrywkowe w drabinkach:</h2>
                W obydwu drabinkach powstają grupy dogrywkowe:
                <ul>
                    <li>Grupa W w drabince wygranych</li>
                    <li>Grupa L w drabince przegranych</li>
                </ul>
                <p>
                    Do grup dogrywkowych trafiają gracze którzy przegrali w ćwierćfinałach w poszczególnych grupach,
                    mają one na celu wyłonienie graczy na miejscach 5-8 oraz 13-16.
                </p>
                <ul>
                    <li>
                        Grupa W:
                        <ol>
                            <li>Przegrany meczu ćwierćfinałowego A1 vs B2</li>
                            <li>Przegrany meczu ćwierćfinałowego B1 vs C2</li>
                            <li>Przegrany meczu ćwierćfinałowego C1 vs D2</li>
                            <li>Przegrany meczu ćwierćfinałowego D1 vs A2</li>
                        </ol>
                    </li>
                    <li>
                        Grupa L:
                        <ol>
                            <li>Przegrany meczu ćwierćfinałowego A3 vs B4</li>
                            <li>Przegrany meczu ćwierćfinałowego B3 vs C4</li>
                            <li>Przegrany meczu ćwierćfinałowego C3 vs D4</li>
                            <li>Przegrany meczu ćwierćfinałowego D3 vs A4</li>
                        </ol>
                    </li>
                </ul>
                <p>
                    Grupy dogrywkowe podlegają takim samym zasadom jak zwykłe grupy. Zasade te zostały szczegółowo
                    rozpisane w punktach
                    <b class="clickable-text" @click="() => scrollToSection('groups')">Grupy</b> oraz
                    <b class="clickable-text" @click="() => scrollToSection('additionalRounds')"
                        >Rundy dogrywkowe w grupie</b
                    >.
                </p>
                <div :style="{ height: '100px' }"></div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconArrowBackUp } from '@tabler/icons-vue'
import ResultsBlock from '@/components/FormatComponents/ResultsBlock.vue'
import TempoBlock from '@/components/FormatComponents/TempoBlock.vue'
import PointsBlock from '@/components/FormatComponents/PointsBlock.vue'

const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style scoped>
.clickable-text {
    cursor: pointer;
    background-color: #222222;
    color: orange;
    padding-bottom: 2px;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
}
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
.content-container {
    max-width: 800px;
}

.content-container ul li::marker {
    color: orange;
    font-weight: 700;
}

.content-container h2 {
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    color: orange;
}
</style>
