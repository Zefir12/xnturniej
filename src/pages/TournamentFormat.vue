<template>
    <div :style="{ position: 'fixed', top: '20px', left: '20px', color: '#FAF9F6' }">
        <a
            href="/"
            :style="{
                textDecoration: 'none',

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
        <div class="section-navigation" :style="{ marginTop: '10px' }">
            <div
                class="section-name-navigation"
                v-for="section in sections"
                :key="section"
                @click="scrollToSection(section)"
            >
                {{ sectionNameMap[section as keyof typeof sectionNameMap] }}
                <IconArrowBadgeLeftFilled
                    size="20"
                    :style="{
                        color: 'orange',
                        marginBottom: '-6px',
                        transition: 'all 0.2s ease',
                        opacity: section == activeSection ? '1' : '0',
                        transform: section == activeSection ? 'translateX(0px)' : 'translateX(40px)',
                    }"
                />
                <IconArrowBadgeLeftFilled
                    size="20"
                    :style="{
                        color: 'orange',
                        marginBottom: '-6px',
                        transition: 'all 0.4s ease',
                        marginLeft: '-10px',
                        opacity: section == activeSection ? '1' : '0',
                        transform: section == activeSection ? 'translateX(0px)' : 'translateX(40px)',
                    }"
                />
                <IconArrowBadgeLeftFilled
                    size="20"
                    :style="{
                        color: 'orange',
                        marginBottom: '-6px',
                        marginLeft: '-10px',
                        transition: 'all 0.5s ease',
                        opacity: section == activeSection ? '1' : '0',
                        transform: section == activeSection ? 'translateX(0px)' : 'translateX(40px)',
                    }"
                />
            </div>
        </div>
    </div>
    <div class="main-container">
        <div class="content-container">
            <h1 :style="{ marginTop: '6rem', marginBottom: '2rem', width: '100%', textAlign: 'center' }">
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
                    Wszystkie mecze turnieju będą rozgrywane w stylu
                    <b>"pierwszy gracz, który osiągnie X punktów wygrywa"</b>, gdzie X to liczba punktów wymagana do
                    wygranej. W przypadku remisu X-X, gracze grają do jednego punktu przewagi. Mecze składają się z tylu
                    partii, ile będzie konieczne, by wyłonić zwycięzcę meczu.
                </p>
                <p>Przykład meczu do <PointsBlock points="1.5" />:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }">
                    <li>
                        Wyniki <ResultsBlock l="1.5" r="0.5" />, <ResultsBlock l="2" r="0" /> oznaczają zwycięstwo
                        jednego z graczy.
                    </li>
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
                    Zapisy takie jak <b>"(białe)"</b> lub <b>"(czarne)"</b> oznaczają kolor bierek/figur, którymi gracz
                    zaczyna pierwszą partię meczu. <b>Uczestnicy zamieniają się kolorami co partię.</b>
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
                <p>Szesnastu graczy zostanie rozlosowanych do 4 grup: A, B, C i D.</p>
                <p>
                    Grupy zostaną wylosowane na żywo na kanale
                    <a :href="'https://twitch.tv/xntentacion'">twitch.tv/xntentacion</a> dzień przed rozpoczęciem
                    Turnieju, dokładniej <b>23.04.2025</b>.
                </p>
                <p>
                    Pozycja startowa w grupie określana jest na podstawie kolejności wylosowania uczestników do grup.
                    Każdy gracz w grupie rozgrywa jeden mecz z każdym z pozostałych.
                </p>
                <p>
                    Mecze w grupie są rozgrywane do <PointsBlock points="1.5" /> tempem
                    <TempoBlock time="10" increment="0" />.<br />
                </p>
                <p>W przypadku grup dogrywkowych jest to tempo <TempoBlock time="5" increment="0" />. <br /></p>
                <p>
                    W przypadku remisu w meczu (<ResultsBlock l="1.5" r="1.5" />), gracze grają dalej tempem
                    <TempoBlock time="5" increment="0" />, aż jeden z nich osiągnie jeden punkt przewagi.
                </p>
                <p>
                    Pozycja w grupie zależy od bilansu wygranych i przegranych meczów. Bilans zapisywany jest formacie
                    "Wygrane mecze - Przegrane mecze", np. <ResultsBlock l="1" r="0" />.
                </p>
                <p>
                    W fazie grupowej każdy uczestnik będzie miał zapisywany bilans meczów w formacie „wygrane mecze -
                    przegrane mecze” (np. <ResultsBlock l="2" r="1" />). Pozycja w grupie zależy od różnicy pomiędzy
                    liczbą wygranych i przegranych, im wyższa względem innych zawodników, tym lepsze miejsce w tabeli.
                    Bilans jest sumowany po każdym meczu, np. gracz z wynikiem <ResultsBlock l="1 " r="0" /> po kolejnym
                    wygranym meczu będzie mieć <ResultsBlock l="2" r="0" />, a po przegranym
                    <ResultsBlock l="2" r="1" />.
                </p>
                <h4 :style="{ color: 'orange' }">Sposób rozgrywania grup:</h4>
                <p>
                    Gracze na <b>pozycji startowej</b> 1. - pierwszej (Gracz 1) i 3. - trzeciej (Gracz 3) otrzymują
                    białe bierki/figury w pierwszej partii meczu dwukrotnie.
                </p>
                <b>Runda 1</b>:
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }">
                    <li>
                        <ColorBlock variant="white">Gracz 1 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 3 (czarne)</ColorBlock>
                    </li>
                    <li>
                        <ColorBlock variant="white">Gracz 2 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 4 (czarne)</ColorBlock>
                    </li>
                </ul>
                <b>Runda 2</b>:
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }">
                    <li>
                        <ColorBlock variant="white">Gracz 3 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 2 (czarne)</ColorBlock>
                    </li>
                    <li>
                        <ColorBlock variant="white">Gracz 4 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 1 (czarne)</ColorBlock>
                    </li>
                </ul>
                <b>Runda 3</b>:
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }">
                    <li>
                        <ColorBlock variant="white">Gracz 1 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 2 (czarne)</ColorBlock>
                    </li>
                    <li>
                        <ColorBlock variant="white">Gracz 3 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 4 (czarne)</ColorBlock>
                    </li>
                </ul>
            </section>
            <section id="additionalRounds">
                <h2>Rundy dogrywkowe w grupie:</h2>
                <p>Po rozegraniu wszystkich meczów w grupie możliwe są remisy:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
                    <li>
                        <ResultsBlock l="2" r="1" />, <ResultsBlock l="2" r="1" />, <ResultsBlock l="1" r="2" />,
                        <ResultsBlock l="1" r="2" /> - w tym przypadku to kto wychodzi, na którym miejscu z grupy zależy
                        od bezpośrednich wyników starć pomiędzy zawodnikami z miejsc 1, 2 oraz 3, 4.
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
                    <b>Kolejność meczów w rundzie dogrywkowej wygląda następująco:</b><br />
                    (Gracze są przypisywani w miejsca “Gracz 1”, “Gracz 2”, “Gracz 3”, opisane poniżej, według
                    pierwotnej kolejności wylosowania do grupy/pozycji startowej)
                </p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }">
                    <li>
                        Mecz 1: <ColorBlock variant="white">Gracz 1 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 2 (czarne)</ColorBlock>
                    </li>
                    <li>
                        Mecz 2: <ColorBlock variant="white">Gracz 2 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 3 (czarne)</ColorBlock>
                    </li>
                    <li>
                        Mecz 3: <ColorBlock variant="white">Gracz 3 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">Gracz 1 (czarne)</ColorBlock>
                    </li>
                </ul>
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
                    W poniżej opisanych meczach, w przypadku remisu (np. <ResultsBlock l="1.5" r="1.5" /> w meczu do
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
                        <TempoBlock time="5" increment="0" />
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
                    <li>Finał - do <PointsBlock points="3.5" /> tempem <TempoBlock time="10" increment="0" /></li>
                    <li>
                        Grupy dogrywkowe (miejsca 5-8) - do <PointsBlock points="1.5" /> tempem
                        <TempoBlock time="5" increment="0" />
                    </li>
                </ul>
                <p>
                    W poniższych zapisach litera oznacza grupę, a numer to pozycja wyjściowa gracza. Przykład: “A1” to
                    gracz, który zajął 1. miejsce w grupie A; “B3” to gracz z 3. miejsca w grupie B.
                </p>
                <p>Mecze w ćwierćfinałach rozgrywane są następująco:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
                    <li :style="{ lineHeight: '1.6rem' }">
                        Drabinka wygranych: <br />Mecz 1: <ColorBlock variant="white">A1 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">B2 (czarne)</ColorBlock> <br />Mecz 2:
                        <ColorBlock variant="white">B1 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">C2 (czarne)</ColorBlock> <br />Mecz 3:
                        <ColorBlock variant="white">C1 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">D2 (czarne)</ColorBlock> <br />Mecz 4:
                        <ColorBlock variant="white">D1 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">A2 (czarne)</ColorBlock>
                    </li>
                    <li :style="{ lineHeight: '1.6rem' }">
                        Drabinka przegranych:<br />Mecz 1: <ColorBlock variant="white">A3 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">B4 (czarne)</ColorBlock> <br />Mecz 2:
                        <ColorBlock variant="white">B3 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">C4 (czarne)</ColorBlock> <br />Mecz 3:
                        <ColorBlock variant="white">C3 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">D4 (czarne)</ColorBlock> <br />Mecz 4:
                        <ColorBlock variant="white">D3 (białe)</ColorBlock> vs
                        <ColorBlock variant="black">A4 (czarne)</ColorBlock>
                    </li>
                </ul>
                <p>Mecze w półfinałach rozgrywane są następująco:</p>
                <ul :style="{ display: 'flex', flexDirection: 'column', gap: '1rem' }">
                    <li>
                        Drabinka wygranych:
                        <br />Mecz 1: Zwycięzca meczu A1 vs B2 vs Zwycięzca meczu B1 vs C2 <br />Mecz 2: Zwycięzca meczu
                        C1 vs D2 vs Zwycięzca meczu D1 vs A2
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
                    Kolory startowe bierek/figur dla graczy w półfinałach, meczach o 3. oraz 11. miejsce i finałach są
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
                    mają one na celu wyłonienie graczy na miejscach 5-8(Grupa W) oraz 13-16(Grupa L).
                </p>
                <b>Pozycja startowa graczy w grupach dogrywkowych:</b>
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
                    <b class="clickable-text" @click="() => scrollToSection('additionalRounds')">
                        Rundy dogrywkowe w grupie</b
                    >
                    , z tą różnicą, że tempo meczów to <TempoBlock time="5" increment="0" />.
                </p>
                <div :style="{ height: '100px' }"></div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconArrowBackUp, IconArrowBadgeLeftFilled } from '@tabler/icons-vue'
import ResultsBlock from '@/components/FormatComponents/ResultsBlock.vue'
import TempoBlock from '@/components/FormatComponents/TempoBlock.vue'
import ColorBlock from '@/components/FormatComponents/ColorBlock.vue'
import PointsBlock from '@/components/FormatComponents/PointsBlock.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const activeSection = ref<string>('main')
const sections = ['main', 'groups', 'additionalRounds', 'ladders', 'additional']

const sectionNameMap = {
    main: 'Ogólne',
    groups: 'Grupy',
    additionalRounds: 'Rundy dogrywkowe',
    ladders: 'Drabinki',
    additional: 'Dogrywki w drabinkach',
}

const handleScroll = () => {
    for (const link of sections) {
        const section = document.getElementById(link)
        if (!section) continue

        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
            activeSection.value = link
            break
        }
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<style scoped>
.section-name-navigation {
    cursor: pointer;
}
.section-name-navigation:hover {
    color: orange;
}
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
    color: #faf9f6;
    flex-direction: column;
    align-items: center;
}
.content-container {
    max-width: 800px;
    margin-left: 20px;
    margin-right: 20px;
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
.section-navigation {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-weight: 700;
    font-size: 14px;
}
@media (max-width: 1000px) {
    .section-navigation {
        display: none;
    }
}
</style>
