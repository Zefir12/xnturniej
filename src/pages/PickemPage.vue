<template>
    <Dialog
        v-model:visible="showPatchNotes"
        modal
        header="Informacja!"
        :style="{ width: '800px', fontSize: '14px' }"
        @hide="() => setLocalStoreItem('hasViewedPatchNotesv2', 'true')"
        >Bagieta wycofuje się z turnieju(sprawy prywatne), kto ma jeszcze okazje niech pozmienia sobie pickemy w
        drabince. Natomiast dla ludzi którzy nie zdażą zareagować, podmieniam w jego miejsce Diablesa. Nie jest to
        rozwiązanie idealne, ale nie mam lepszego.
    </Dialog>
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
    </div>
    <div class="page-container" :style="{ fontFamily: 'Source Sans Pro' }">
        <div class="user-container">
            <img
                :style="{
                    height: '130px',
                    marginTop: '15px',
                    marginBottom: '30px',
                    marginRight: '30px',
                }"
                :src="SzachMatLogo"
            />

            <div
                :style="{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    marginLeft: '-30px',
                }"
                v-if="userStore.pickemTwitchUser != null"
            >
                <Dialog
                    v-model:visible="showAvatarModal"
                    modal
                    header="Edit Profile"
                    :style="{ width: '25rem', height: '25rem' }"
                >
                    Wybierz komu kibicujesz - będzie widoczne w rankingu obok nicku:
                    <SelectPlayerPickem v-model="favourite" @onSelected="(t) => saveFavourite(t)" />
                    <Button
                        :style="{ backgroundColor: 'red' }"
                        @click="
                            () => {
                                saveFavourite(null)
                                favourite = null
                            }
                        "
                        >Wyczysć X</Button
                    >
                </Dialog>
                <div
                    @click="showAvatarModal = true"
                    :style="{
                        width: '60px',
                        height: '60px',
                        border: '1px solid black',
                        cursor: 'pointer',
                        position: 'relative',
                    }"
                >
                    <img
                        :style="{ width: '100%', height: '100%', opacity: '0.5' }"
                        :src="favourite ? getPlayerByUuid(favourite)?.avatar : avatar"
                    />
                    <span
                        v-if="getPlayerByUuid(favourite as string)?.avatar == undefined"
                        :style="{ position: 'absolute', top: '2px', right: '2px' }"
                        class="dot"
                    />
                </div>
                <div>
                    <span>Zalogowany jako: </span>
                    <div
                        :style="{
                            backgroundColor: 'transparent',
                            padding: '0px 0px',
                            borderRadius: '4px',
                            fontWeight: '800',
                        }"
                    >
                        {{ userStore.pickemTwitchUser.displayName }}
                    </div>
                    <div>
                        🏆
                        {{
                            (userStore.playerData?.group_points ?? 0) +
                            (userStore.playerData?.ladder_points ?? 0) +
                            (userStore.playerData?.ball_points ?? 0)
                        }}
                        punktów
                    </div>
                </div>
            </div>

            <a
                :style="{ textDecoration: 'none', marginBottom: '20px' }"
                v-if="userStore.pickemTwitchUser == null"
                :href="`https://id.twitch.tv/oauth2/authorize?client_id=rria64c2ylpvlo1iazn2gnt8mkw4zc&redirect_uri=${callback}/twitch/callback&response_type=code&scope=user:read:email`"
            >
                <div class="twitch-button">
                    <div :style="{ fontWeight: 'bold' }">Połącz z kontem Twitch</div>
                </div>
            </a>
        </div>
        <div class="data-container" :style="{ width: '100%' }">
            <Tabs :style="{ width: '100%', backgroundColor: 'transparent' }" v-model:value="panelTab">
                <TabList :style="{ justifyContent: 'center' }">
                    <Tab value="0" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Informacje</span>
                    </Tab>
                    <Tab value="1" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Faza grupowa</span>
                    </Tab>
                    <Tab :disabled="false" value="2" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Drabinka</span>
                    </Tab>
                    <Tab value="3" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Kryształowa Kula</span>
                    </Tab>
                    <Tab value="4" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Ranking Twitcha</span>
                    </Tab>
                    <Tab value="5" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Statystyki</span>
                    </Tab>
                </TabList>
                <TabPanels :style="{ display: 'flex', justifyContent: 'center' }">
                    <TabPanel value="0" as="p" class="m-0">
                        <div
                            :style="{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: '#FAF9F6',
                            }"
                        >
                            <div :style="{ maxWidth: '800px', margin: 'auto' }">
                                <!-- <h1 :style="{ textAlign: 'center', marginBottom: '10rem' }">
                                    Finalna punktacja jutro o 18 po podliczeniu kryształowej kuli!
                                </h1> -->
                                <h2>Czym jest Pick’em Challenge?</h2>
                                <p>
                                    To Twój moment, żeby pokazać, że masz szachową intuicję i znasz zawodników jak
                                    własną kieszeń. Wybierasz w jaki sposób według Ciebie potoczy sie turniej oraz co
                                    sie na nim wydarzy - i zbierasz punkty za trafne typy.
                                </p>
                                <p>
                                    Proste? No właśnie nie, ale być może to Ty będziesz TOP 1 jasnowidzem na polskim
                                    Twitchu.
                                </p>

                                <h2>Jak to działa?</h2>
                                Wbijasz na panele pick’em używając zakładek powyżej. Typujesz zawodników, którzy Twoim
                                zdaniem dojdą najdalej. Oglądasz transmisję z turnieju, zgarniasz punkty i sprawdzasz,
                                czy jesteś szefem predykcji czy tylko randomem z czatu
                                <img
                                    :style="{ height: '20px' }"
                                    src="https://cdn.7tv.app/emote/01GPQJ1NKR000BGP5H3DVAPXAN/1x.avif"
                                />
                                <p>
                                    Żeby być w rankingu i mieć zliczane punkty musisz zalogować sie twitchem, ale można
                                    też typować samemu dla siebie anonimowo
                                </p>
                                <h2>🏆 Co jest do wygrania?</h2>
                                <p>
                                    Chwała i sława z bycia topką rankingu Twitcha! A dla trzech najlepiej typujących -
                                    dowolny kurs z ostre-debiuty.pl
                                </p>
                                <div
                                    :style="{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }"
                                >
                                    <Button
                                        @click="panelTab = '1'"
                                        :style="{
                                            padding: '12px',
                                            fontWeight: '800',
                                            backgroundColor: '#eaa500',
                                            width: '200px',
                                            marginTop: '20px',
                                        }"
                                        >{{ 'Zacznij typować'.toUpperCase() }}</Button
                                    >
                                </div>
                                <br /><br />
                                <h1>Patch Noty v1.2.1</h1>
                                <p>
                                    Do tej pory wybory były zapisywane zarówno na serwerze jak i lokalnie. Żeby
                                    oszczędzić serwerowi obciążenia - skoro i tak to te same dane to po co pytać serwer.
                                    Natomiast ten system nie pozwalał przelogować się na inne urządzenie/przeglądarke bo
                                    nie było na nich lokalnie tych danych. Po tym updacie powinno wszystko się
                                    zsynchronizować i od teraz wyświetla dane prosto z serwera.
                                </p>
                                <p>
                                    Dodam dzisiaj system dodawania brakujących punktów osobom które dołączyły po czasie.
                                    Nie mają one nic zaznaczone w kryształowej kuli, ale ich wybór grup jest traktowany
                                    tak jakby wybrali ustawienie domyślnie wylosowane. Jak dobrze pójdzie to dorzuce
                                    dzisiaj nową zakładke statystyki żeby móc porównywać swoje wybory i zobaczyć jak
                                    głosowała publiczność. I może poprawie czas ładowania i sortowania rankingu
                                </p>
                                <br /><br />
                                <h1>Patch Noty v1.2</h1>
                                <p>
                                    - wydłużenie czasu na typowanie do 16:30 żeby dać czas ludziom którzy dopiero po
                                    pracy/szkole/spaniu zauważą że wszedł Taku za Fornala
                                </p>
                                <br /><br />
                                <h1>Patch Noty v1.1</h1>
                                - Tomasz Fornal stety albo niestety wygrał w siatkę, i nie będzie miał czasu na turniej.
                                Zamiast niego wchodzi Taku, podmienię ich pozycję(jak ktoś nic nie zmieni po prostu
                                będzie mieć Taku tam gdzie obstawiał Fornala) żeby jak najmniej popsuć Pick'emy osobom
                                które nie zdażą wejść i nanieść zmiany <br /><br /><br />
                                - Zmiany w kryształowej kuli:
                                <br />
                                <h3>Botez Gambit</h3>
                                Nie wiem czemu, odcięło mi myślenie i dałem 1pkt na każdego zawodnika i jakoś mi wyszło
                                15<br /><br />
                                Zmiana: 15pkt -> 16pkt
                                <p>
                                    Dodatkowe informacje o punktacji: <br /><br />
                                    Punkt dostaje się za zaznaczenie że zawodnik podwali i on faktycznie podwali, oraz
                                    za niezaznaczenie zawodnika który nie podwali. Jeżeli w turnieju 3 osoby podwalą, a
                                    nie zaznaczysz nikogo, otrzymasz za tę kategorię 13 pkt. <br />Analogicznie jeśli
                                    zaznaczysz wszystkich a tylko 3 osoby podwalą otrzymasz 3 pkt.
                                </p>
                                <h3>Blitzcrieg & Życie w okopach</h3>
                                Tutaj to samo, większość osób naturalnie liczy ruchy e4 e5 jako jeden ruch, a ja
                                chciałem dokładniejszą predykcję licząc to jako dwa ruchy.
                                <p>
                                    Zmiana w przyznawaniu punktów: <br />
                                    Dla zawodników którzy przeczytali pytajnik i poprawnie wybrali według zasady że e4
                                    e5 to dwa ruchy nic sie nie zmienia, natomiast jeśli najkrótsza partia naprzykład
                                    potrwa 7 ruchów, (13 ruchów licząc każde posunięcie) to za wpisanie 13 jest pełna
                                    liczba punktów, natomiast za wpisanie 7 przyznaję połowę, w związku z tym że ten kto
                                    zgadywał 7 równoczesnie obstawia ruch 13 i 14, więc ma większe szanse na trafienie.
                                    <br />
                                    <br />Zmiana: Życie w okopach 15pkt -> 16pkt
                                </p>
                                <h3>Dodatkowe informacje</h3>
                                <p>- Aby wybrać komu kibicujesz kilkasz na ikonkę avatara na górze</p>
                                <p>
                                    - Karty w kryształowej kuli mają pytajnik w prawym górnym rogu, po najechaniu
                                    wyświetla dokładniejszy opis karty
                                </p>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1" as="p" class="m-0">
                        <div
                            :style="{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '40px',
                                color: '#FAF9F6',
                                fontFamily: 'Source Sans Pro',
                            }"
                        >
                            <Toast />
                            <!-- <h3 v-if="expirationDates.groups.getTime() < Date.now()">
                                Finalna punktacja jutro o 18:00 po podliczeniu kryształowej kuli
                            </h3> -->
                            <div
                                class="no-select"
                                :style="{
                                    paddingLeft: '0px',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '20px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }"
                            >
                                <GroupContainer group="a" />
                                <GroupContainer group="b" />
                                <GroupContainer group="c" />
                                <GroupContainer group="d" />
                            </div>
                            <div :style="{ maxWidth: '800px' }">
                                <h2>📜 ZASADY – FAZA GRUPOWA PICK’EM CHALLENGE</h2>
                                <p>Okej, jak działa punktacja w fazie grupowej?</p>
                                <p>
                                    Jeżeli trafisz prawidłowo czy zawodnik wychodzi z grupy, czy trafia do drabinki
                                    pocieszenia zdobywasz: <PointsBlock points="+1" />
                                </p>
                                <p>
                                    Dodatkowo jeżeli trafisz dokładne miejsce które zawodnik zajmie w grupie:
                                    <PointsBlock points="+2" />
                                </p>

                                W sumie do zgarnięcia za fazę grupową jest aż 48 punktów. Aby wziąć udział w rankingu
                                online trzeba być zalogowanym
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="2" as="p" class="m-0">
                        <div
                            v-if="expirationDates.laddersOpen.getTime() > Date.now()"
                            :style="{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }"
                        >
                            <CountDownTimer
                                class="no-select"
                                rectColor="#18181b"
                                :style="{ marginTop: '-4px', marginBottom: '30px' }"
                                text="Drabinka odblokuje sie po zakończeniu fazy grupowej: "
                                :date="expirationDates.laddersOpen"
                            />
                            <div
                                :style="{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }"
                            >
                                <IconLock size="240" color="#18181b" />
                            </div>
                        </div>
                        <div
                            v-else
                            :style="{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }"
                        >
                            <LaddersPage />
                        </div>
                    </TabPanel>
                    <TabPanel value="3" as="p" class="m-0">
                        <CountDownTimer
                            v-if="expirationDates.crystalball.getTime() > Date.now()"
                            class="no-select"
                            rectColor="#18181b"
                            :style="{ marginTop: '-4px', marginBottom: '30px' }"
                            text="Możliwość wyboru zostanie zablokowana za: "
                            :date="expirationDates.crystalball"
                        />
                        <div
                            :style="{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginBottom: '30px',
                            }"
                        >
                            <!-- <h3 v-if="expirationDates.crystalball.getTime() < Date.now()">
                                Finalna punktacja jutro o 18:00 po podliczeniu kryształowej kuli
                            </h3> -->
                        </div>
                        <div
                            class="no-select"
                            :style="{
                                width: '100%',
                                maxWidth: '1200px',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                color: '#FAF9F6',
                            }"
                        >
                            <div
                                :style="{
                                    maxWidth: '1200px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    gap: '8px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }"
                            >
                                <CrystallBallItem
                                    :points="16"
                                    title="Botez Gambit"
                                    desc="Każdy ruch gracza po którym przeciwnik może zbić hetmana, i zawodnik by stracił więcej niż 5 punktów w ocenie silnika, jest liczony jako podwalenie, bo jakoś trzeba odsortować poświęcenia. Punkt otrzymuje się za każde trafienie: albo że zawodnik podwali albo że NIE podwali"
                                    :image="BlindManLogo"
                                    correct-value="Wszyscy poza sucharem i hiszpanem"
                                    :isCorrect="crystalBallPicks.botezPlayers == crystalstats.botezGambit"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '55px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Którzy zawodnicy według ciebie podwalą hetmana?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <MultiSelect
                                                v-model="crystalBallPicks.botezPlayers"
                                                display="chip"
                                                option-value="uuid"
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                :style="{ flexGrow: 1, maxWidth: '150px' }"
                                                :options="Object.values(playerMappings)"
                                                optionLabel="name"
                                                placeholder="Wybierz graczy"
                                                class="w-full md:w-80 multi-selector"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    :points="5"
                                    title="Speedrunner"
                                    desc="Ile średnio ze wszystkich partii zawodnikowi zostaje % czasu na koniec partii, np: kończy 10 minutową partie z 8 minutami na zegarze: 80% czasu, i jest liczony średni % z wszystkich gier"
                                    :image="TimerLogo"
                                    correct-value="Netrodal"
                                    :isCorrect="crystalBallPicks.speedrunner == crystalstats.speedrunner"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '40px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Który zawodnik zużyje średnio najmniej czasu podczas swoich partii
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <SelectPlayerPickem
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.speedrunner"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    :points="15"
                                    title="Narodziny wojownika"
                                    :image="EvolveLogo"
                                    correct-value="52"
                                    :isCorrect="crystalBallPicks.newhetmans == crystalstats.totalqueens"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '55px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Ile pionków zostanie zamienionych w hetmana podczas turnieju?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <InputNumber
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.newhetmans"
                                                fluid
                                                size="small"
                                                :style="{ width: '60px' }"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Liczymy ruchy obu zawodników: 1.e4 e5 2.Gc4 Sc6 3.Hh5 Sf6?? 4.Hxf7# to 7 ruchów"
                                    :points="8"
                                    title="Blitzkrieg"
                                    :image="BlindManLogo"
                                    correct-value="12 (23 i 24 też, patrz znak zapytania)"
                                    :isCorrect="
                                        crystalBallPicks.shortestmoves == 12 ||
                                        crystalBallPicks.shortestmoves == 23 ||
                                        crystalBallPicks.shortestmoves == 24
                                    "
                                    ><div
                                        :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }"
                                    ></div>
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '60px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Ile ruchów potrwa najkrótsza partia w turnieju?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <InputNumber
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                fluid
                                                v-model="crystalBallPicks.shortestmoves"
                                                size="small"
                                                :style="{ width: '60px' }"
                                            />
                                        </div></div
                                ></CrystallBallItem>
                                <CrystallBallItem
                                    desc="Liczymy ruchy obu zawodników: 1.e4 e5 2.Gc4 Sc6 3.Hh5 Sf6?? 4.Hxf7# to 7 ruchów"
                                    :points="16"
                                    title="Życie w okopach"
                                    :image="BlindManLogo"
                                    correct-value="96 (192 i 191 też, patrz znak zapytania)"
                                    :isCorrect="
                                        crystalBallPicks.longestmoves == 96 ||
                                        crystalBallPicks.longestmoves == 192 ||
                                        crystalBallPicks.longestmoves == 191
                                    "
                                    ><div
                                        :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }"
                                    ></div>
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '60px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Ile ruchów potrwa najdłuższa partia w turnieju?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <InputNumber
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.longestmoves"
                                                fluid
                                                size="small"
                                                :style="{ width: '60px' }"
                                            />
                                        </div></div
                                ></CrystallBallItem>
                                <CrystallBallItem
                                    :points="5"
                                    title="Dwie armie"
                                    :image="ArmyLogo"
                                    correct-value="Więcej wygrały białe"
                                    :isCorrect="(crystalBallPicks.blackorwhite == 'a') == crystalstats.whiteOrBlack"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '40px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Na przestrzeni całego turnieju w sumie: - czy więcej partii wygrają białe,
                                            czy może czarne?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <ChooseOption
                                                v-model="crystalBallPicks.blackorwhite"
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                            >
                                                <template #a>Białe</template>
                                                <template #b>Czarne</template>
                                            </ChooseOption>
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    :points="10"
                                    title="Wypadek przy pracy..."
                                    :image="BlindManLogo"
                                    correct-value="5"
                                    :isCorrect="crystalBallPicks.pats == crystalstats.pats"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '60px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Ile wydarzy się patów podczas turnieju?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <InputNumber
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.pats"
                                                fluid
                                                size="small"
                                                :style="{ width: '60px' }"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Liczone są wszystkie figury we wszystkich partiach turniejowych w sumie"
                                    :points="2"
                                    title="Biskup i Osioł"
                                    :image="BlindManLogo"
                                    correct-value="Przeżyło więcej gońców"
                                    :isCorrect="
                                        (crystalBallPicks.bishopsandknights == 'a') == crystalstats.survivedTotal
                                    "
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '40px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Czy podczas turnieju do końca partii w sumie dożyje więcej skoczków czy
                                            gońców?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <ChooseOption
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.bishopsandknights"
                                            >
                                                <template #a
                                                    >Więcej<br />
                                                    Gońców</template
                                                >
                                                <template #b
                                                    >Więcej<br />
                                                    Skoczków</template
                                                >
                                            </ChooseOption>
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Przykładowo, licząc średnią arytmetyczną z głosów wszystkich obstawiających, Fornal miałby 3.14 miejsce średnio, a zajmie 1 miejsce w grupie, to dostanie 2.14 punktów różnicy w tej kategorii. Zwycięża największa dodatnia różnica. Jeśli kilka osób będzie miało remis na pierwszym miejscu, zaznaczenie dowolnej z nich daje pełną liczbę punktów, natomiast liczone będzie z dokładnością do 3 miejsc po przecinku"
                                    :points="12"
                                    title="Czarny koń"
                                    :image="BlindManLogo"
                                    correct-value="Kubon"
                                    :isCorrect="crystalBallPicks.blackhorse == crystalstats.darkhorse"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '24px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Który gracz według Ciebie będzie miał największą różnicę między zajętym
                                            miejscem w grupie a tym które przewidywała publiczność?(pozytywnie zaskoczy)
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <SelectPlayerPickem
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.blackhorse"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Przykładowo, licząc średnią arytmetyczną z głosów wszystkich obstawiających, Fornal miałby 1.14 miejsce średnio, a zajmie 2 miejsce w grupie, to dostanie -0.86 punktów różnicy w tej kategorii. Zwycięża największa ujemna różnica. Jeśli kilka osób będzie miało remis na pierwszym miejscu, zaznaczenie dowolnej z nich daje pełną liczbę punktów, natomiast liczone będzie z dokładnością do 3 miejsc po przecinku"
                                    :points="10"
                                    title="Zawód rodziny"
                                    :image="BlindManLogo"
                                    correct-value="Suchar"
                                    :isCorrect="crystalBallPicks.familydisappointment == crystalstats.zawodrodziny"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '24px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Który gracz według Ciebie będzie miał największą różnicę między zajętym
                                            miejscem w grupie a tym które przewidywała publiczność?(rozczaruje)
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <SelectPlayerPickem
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.familydisappointment"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    :points="2"
                                    title="Początki"
                                    :image="BlindManLogo"
                                    correct-value="E4 było zagrane częściej"
                                    :isCorrect="(crystalBallPicks.beginings == 'a') == crystalstats.openings"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '40px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Czy E4 będzie zagrane więcej razy jako pierwszy ruch niż wszystkie pozostałe
                                            opcje razem wzięte?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <ChooseOption
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.beginings"
                                            >
                                                <template #a>Będzie</template>
                                                <template #b>Nie będzie</template>
                                            </ChooseOption>
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Jeśli kilka grup będzie miało remis na pierwszym miejscu, zaznaczenie dowolnej z nich daje pełną liczbę punktów"
                                    :points="5"
                                    title="Do ostatniej kropli krwi"
                                    :image="ArmyLogo"
                                    correct-value="A"
                                    :isCorrect="crystalBallPicks.bloodyGroup == crystalstats.bloodyGroup"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '60px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            W której z grup wydarzy się najwięcej dogrywek?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <div
                                                v-for="category in ['A', 'B', 'C', 'D']"
                                                :key="category"
                                                :style="{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0px',
                                                    flexDirection: 'column',
                                                }"
                                            >
                                                <RadioButton
                                                    :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                    v-model="crystalBallPicks.bloodyGroup"
                                                    :inputId="category"
                                                    name="dynamic"
                                                    :value="category"
                                                />
                                                <label :for="category">{{ category }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    :points="8"
                                    desc="Jeśli kilka osób będzie miało remis na pierwszym miejscu zaznaczenie dowolnej z nich daje pełną liczbę punktów"
                                    title="Najlepiej zrobić samemu"
                                    :image="TimerLogo"
                                    correct-value="Kubon"
                                    :isCorrect="crystalBallPicks.bestalone == crystalstats.bestalone"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '40px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Który zawodnik podczas turnieju w sumie zbije najwięcej materiału królem?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <SelectPlayerPickem
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.bestalone"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Liczy sie % więc jak ktoś zagrałby 1 mecz i zrobił w nim roszade ma 100% i wygrywa tą kategorie. Jeśli kilka osób będzie miało remis na pierwszym miejscu zaznaczenie dowolnej z nich daje pełną liczbę punktów"
                                    :points="8"
                                    title="Nigdzie nie ide"
                                    :image="TimerLogo"
                                    correct-value="Netrodal"
                                    :isCorrect="crystalBallPicks.standingstill == crystalstats.standingstill"
                                >
                                    <div
                                        :style="{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            gap: '55px',
                                            flexDirection: 'column',
                                        }"
                                    >
                                        <div :style="{ paddingLeft: '10px', paddingRight: '10px', marginTop: '-5px' }">
                                            Który zawodnik wykona najmniej roszad(w % rozegranych partii)?
                                        </div>
                                        <div
                                            :style="{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }"
                                        >
                                            <SelectPlayerPickem
                                                :disabled="expirationDates.crystalball.getTime() < Date.now()"
                                                v-model="crystalBallPicks.standingstill"
                                            />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="4" as="p" class="m-0">
                        <div
                            :style="{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                color: '#FAF9F6',
                            }"
                        >
                            <div
                                :style="{
                                    color: '#FAF9F6',
                                    marginBottom: '1rem',
                                    fontSize: '0.8rem',
                                    textAlign: 'center',
                                }"
                            >
                                <h1 :style="{ color: 'orange' }">
                                    Finalny ranking Pick'em Billin SZACH-MAT
                                    <span :style="{ fontSize: '0.4rem' }">inwidej.. yyy...</span>
                                    <span :style="{ fontSize: '0.6rem' }">inwita.. yyy...</span> Invitational!
                                </h1>
                            </div>
                            <DataTable
                                :value="pickemPlayers"
                                scrollable
                                paginator
                                :style="{ borderRadius: '8px', overflow: 'hidden' }"
                                :rows="15"
                                :rowsPerPageOptions="[5, 10, 15, 20, 50, 100, 500, 1000]"
                                tableStyle="min-width: 50rem max-width: 100rem"
                                v-model:filters="filters"
                                :globalFilterFields="['name']"
                            >
                                <template #header>
                                    <div class="flex justify-end">
                                        <IconField>
                                            <InputIcon>
                                                <i class="pi pi-search" />
                                            </InputIcon>
                                            <InputText
                                                v-model="filters['global'].value"
                                                placeholder="Szukaj po nicku"
                                            />
                                        </IconField>
                                    </div>
                                </template>
                                <Column :style="{ width: '10em' }" header="Miejsce w rankingu">
                                    <template #body="{ data }"
                                        ><div
                                            :style="{
                                                height: '2rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginLeft: '1rem',
                                            }"
                                        >
                                            {{ pickemPlayers.findIndex((x) => x === data) + 1 }}
                                        </div></template
                                    >
                                </Column>
                                <Column
                                    field="name"
                                    sortable
                                    :style="{ width: '15em', backgroundColor: 'transparent' }"
                                    header="Nick"
                                >
                                    <template #body="{ data }">
                                        <div
                                            :style="{
                                                display: 'flex',
                                                alignItems: 'center',
                                                height: '40px',
                                                gap: '5px',
                                            }"
                                        >
                                            <img
                                                v-tooltip.top="
                                                    `${data.name} kibicuje: ${getPlayerByUuid(data?.favourite)?.name}`
                                                "
                                                v-if="data.favourite"
                                                :style="{ width: '40px', height: '40px' }"
                                                :src="getPlayerByUuid(data?.favourite)?.avatar"
                                            />{{ data.name }}
                                        </div>
                                    </template>
                                    <template #filter="{ filterModel, filterCallback }">
                                        <InputText
                                            v-model="filterModel.value"
                                            type="text"
                                            @input="filterCallback()"
                                            placeholder="Search by name"
                                        />
                                    </template>
                                </Column>
                                <Column sortable field="group_points" header="Punkty fazy grupowej"
                                    ><template #body="{ data }">{{ data.group_points ?? 0 }}</template></Column
                                >
                                <Column sortable field="ladder_points" header="Punkty w drabince"
                                    ><template #body="{ data }">{{ data.ladder_points ?? 0 }}</template></Column
                                >
                                <Column field="ball_points" sortable header="Punkty za kryształową kule"
                                    ><template #body="{ data }">{{ data.ball_points ?? 0 }}</template></Column
                                >
                                <Column
                                    sortable
                                    field="total_points"
                                    header="Punkty razem"
                                    :style="{ width: '10em', textAlign: 'center', color: 'orange', fontWeight: 'bold' }"
                                    ><template #body="{ data }"
                                        ><PointsBlock :points="`${data.total_points ?? 0}`" /></template
                                ></Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                    <TabPanel value="5" as="p" class="m-0">
                        <h2 :style="{ textAlign: 'center' }">Jak ludzie obstawiali kryształową kulę:</h2>
                        <h3 :style="{ textAlign: 'center', marginBottom: '50px' }">
                            Aż <span :style="{ color: 'orange', fontWeight: 'bold' }">8578</span> osób wrzuciło swoją
                            kryształową kulę do puli
                        </h3>
                        <div
                            :style="{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: '50px',
                                flexWrap: 'wrap',
                            }"
                            v-if="true"
                        >
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Botez Gambit:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Podwalą hetmana:
                                </div>
                                <div v-for="stat in stats.botezPlayers" :key="stat.option">
                                    <PlayerProgressBar :value="stat.percent" :uuid="stat.option" />
                                </div>
                            </div>
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Speedrunner:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Zużyje najmniej czasu:
                                </div>
                                <div v-for="stat in stats.speedrunner" :key="stat.option">
                                    <PlayerProgressBar :value="stat.percent" :uuid="stat.option" />
                                </div>
                            </div>

                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Czarny Koń:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Najbardziej pozytywnie zaskoczy:
                                </div>
                                <div v-for="stat in stats.blackhorse" :key="stat.option">
                                    <PlayerProgressBar :value="stat.percent" :uuid="stat.option" />
                                </div>
                            </div>

                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Zawód Rodziny:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Najbardziej rozczaruje:
                                </div>
                                <div v-for="stat in stats.familydisappointment" :key="stat.option">
                                    <PlayerProgressBar :value="stat.percent" :uuid="stat.option" />
                                </div>
                            </div>

                            <div class="player-column">
                                <h3 :style="{ color: 'orange', textWrap: 'nowrap' }">Najlepiej zrobić samemu:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Najwięcej materiału zbitego królem:
                                </div>
                                <div v-for="stat in stats.bestalone" :key="stat.option">
                                    <PlayerProgressBar :value="stat.percent" :uuid="stat.option" />
                                </div>
                            </div>

                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Nigdzie nie ide:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Najmniej roszad w (%):
                                </div>
                                <div v-for="stat in stats.standingstill" :key="stat.option">
                                    <PlayerProgressBar :value="stat.percent" :uuid="stat.option" />
                                </div>
                            </div>
                        </div>
                        <div
                            :style="{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: '50px',
                                marginTop: '50px',
                                flexWrap: 'wrap',
                            }"
                            v-if="true"
                        >
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Do ostatniej kropli krwi:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Najwięcej będzie dogrywek w grupie:
                                </div>
                                <div v-for="stat in stats.bloodyGroup" :key="stat.option">
                                    <OptionProgressBar :name="`Grupa ${stat.option}`" :value="stat.percent" />
                                </div>
                                <h3 :style="{ color: 'orange', marginTop: '82px' }">Biskup i Osioł:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Do końca partii dożyje w sumie więcej:
                                </div>
                                <div v-for="stat in stats.bishopsandknights" :key="stat.option">
                                    <OptionProgressBar
                                        :name="stat.option == 'a' ? 'Koni' : stat.option == 'b' ? 'Gońców' : 'Brak'"
                                        :value="stat.percent"
                                    />
                                </div>
                            </div>
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Początki:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Najczęsciej granym otwarciem będzie:
                                </div>
                                <div v-for="stat in stats.beginings" :key="stat.option">
                                    <OptionProgressBar
                                        :name="
                                            stat.option == 'a'
                                                ? 'E4'
                                                : stat.option == 'b'
                                                  ? 'Pozostałe otwarcia'
                                                  : 'Brak'
                                        "
                                        :value="stat.percent"
                                    />
                                </div>
                                <h3 :style="{ color: 'orange', marginTop: '150px' }">Dwie armie:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Najwięcej partii wygrają:
                                </div>
                                <div v-for="stat in stats.blackorwhite" :key="stat.option">
                                    <OptionProgressBar
                                        :name="stat.option == 'a' ? 'Białe' : stat.option == 'b' ? 'Czarne' : 'Brak'"
                                        :value="stat.percent"
                                    />
                                </div>
                            </div>
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Narodziny wojownika:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    Ilość dorobionych hetmanów:
                                </div>
                                <div v-for="stat in stats.newhetmans" :key="stat.option">
                                    <OptionProgressBar :name="stat.option" :value="stat.percent" />
                                </div>
                            </div>
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Blitzkrieg:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    W najkrótszej partii będzie ruchów:
                                </div>
                                <div v-for="stat in stats.shortestmoves" :key="stat.option">
                                    <OptionProgressBar :name="stat.option" :value="stat.percent" />
                                </div>
                            </div>
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Życie w okopach:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    W najdłuższej partii będzie ruchów:
                                </div>
                                <div v-for="stat in stats.longestmoves" :key="stat.option">
                                    <OptionProgressBar :name="stat.option" :value="stat.percent" />
                                </div>
                            </div>
                            <div class="player-column">
                                <h3 :style="{ color: 'orange' }">Wypadek przy pracy:</h3>
                                <div :style="{ fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }">
                                    W turnieju będzie patów:
                                </div>
                                <div v-for="stat in stats.pats" :key="stat.option">
                                    <OptionProgressBar :name="stat.option" :value="stat.percent" />
                                </div>
                            </div>
                        </div>
                        <h2 :style="{ textAlign: 'center', marginTop: '140px' }">
                            Jak ludzie obstawiali faze grupową:
                        </h2>
                        <h3 :style="{ textAlign: 'center', marginBottom: '50px' }">
                            Aż <span :style="{ color: 'orange', fontWeight: 'bold' }">8425</span> osób obstawiło fazę
                            grupową
                        </h3>
                        <div
                            v-for="(group, index) in groupstats"
                            :key="group.players[0].uuid"
                            :style="{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }"
                        >
                            <h2>Grupa {{ index }}</h2>
                            <div
                                :style="{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '10px',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    marginRight: '50px',
                                }"
                            >
                                <PlayerInGroupStats
                                    v-for="group in index == 'A'
                                        ? groupstats.A.players
                                        : index == 'B'
                                          ? groupstats.B.players
                                          : index == 'C'
                                            ? groupstats.C.players
                                            : groupstats.D.players"
                                    :key="group.uuid"
                                    :uuid="group.uuid"
                                    :place="group.averagePlacement"
                                    :votes="group.votes"
                                />
                            </div>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { onBeforeMount, ref, watch } from 'vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import GroupContainer from '@/components/PickEmComponents/GroupContainer.vue'
import CrystallBallItem from '@/components/PickEmComponents/CrystallBallItem.vue'
import { Button } from 'primevue'
import BlindManLogo from '@/assets/icons/pickem/blindmanlogo.png'
import TimerLogo from '@/assets/icons/pickem/timerb.png'
import EvolveLogo from '@/assets/icons/pickem/evolve.png'
import ArmyLogo from '@/assets/icons/pickem/army.png'
import SzachMatLogo from '@/assets/icons/szachmatlogo.png'
import { DataTable, Column } from 'primevue'
import PointsBlock from '@/components/FormatComponents/PointsBlock.vue'
import api from '@/common/api'
import CountDownTimer from '@/components/CountDownTimer.vue'
import { InputNumber } from 'primevue'
import LaddersPage from '@/components/PickEmComponents/LaddersPage.vue'
import { usePickemStore } from '@/stores/pickemStore'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { getPlayerByUuid, getRandomSuccessMessage } from '@/common/helpers'
import { IconArrowBackUp, IconLock } from '@tabler/icons-vue'
import SelectPlayerPickem from '@/components/PickEmComponents/SelectPlayerPickem.vue'
import ChooseOption from '@/components/PickEmComponents/ChooseOption.vue'
import { RadioButton } from 'primevue'
import { MultiSelect } from 'primevue'
import { expirationDates, playerMappings } from '@/common/consts'
import avatar from '../assets/twitchicons/defaultavatar.png'
import { Dialog } from 'primevue'
import { FilterMatchMode } from '@primevue/core'
import { InputText } from 'primevue'
import { IconField, InputIcon } from 'primevue'
import statsJson from '@/assets/stats.json'
import groupstatsJson from '@/assets/groupstats.json'
import crystalstatsJson from '@/assets/crystalstats.json'
import PlayerProgressBar from '@/components/PickEmComponents/PlayerProgressBar.vue'
import OptionProgressBar from '@/components/PickEmComponents/OptionProgressBar.vue'
import PlayerInGroupStats from '@/components/PickEmComponents/PlayerInGroupStats.vue'

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

const showAvatarModal = ref(false)

const toast = useToast()

const userStore = useUserStore()
const panelTab = ref(localStorage.getItem('pickemTab') || '0')
const callback = import.meta.env.VITE_ENV == 'prod' ? 'https://xnturniej.info' : 'http://localhost:5173'
const pickemStore = usePickemStore()
const showPatchNotes = ref(localStorage.getItem('hasViewedPatchNotesv2') == null)
const favourite = ref<null | string>()

const crystalBallPicks = ref({
    botezPlayers: [],
    speedrunner: null,
    blackhorse: null,
    familydisappointment: null,
    bestalone: null,
    standingstill: null,
    bloodyGroup: null as string | null,
    newhetmans: null as null | number,
    shortestmoves: null as null | number,
    longestmoves: null as null | number,
    pats: null as null | number,
    beginings: null as null | string,
    blackorwhite: null as null | string,
    bishopsandknights: null as null | string,
})

const stats = ref(statsJson)
const groupstats = ref(groupstatsJson)
const crystalstats = ref(crystalstatsJson)

const getLocalStoreItem = (key: string): string | null => {
    return localStorage.getItem(key)
}

const setLocalStoreItem = (key: string, value: string) => {
    return localStorage.setItem(key, value)
}

watch(panelTab, (newVal) => {
    localStorage.setItem('pickemTab', newVal)
})

const saveFavourite = async (newFavourite: string | null) => {
    const result = await api.post('/pickem/choosefavourite', {
        id: JSON.parse(localStorage.getItem('pickemTwitchUser') ?? '{}')._id,
        favourite: newFavourite,
    })
    if (!result) {
        toast.add({
            severity: 'error',
            summary: 'Błąd',
            group: 'br',
            detail: 'Wystąpił błąd podczas zapisywania zmian',
            life: 3000,
        })
        return
    }
    showAvatarModal.value = false
    toast.add({
        severity: 'success',
        summary: 'Zapisano zmiany',
        group: 'br',
        detail: getRandomSuccessMessage(),
        life: 3000,
    })
}

const pickemPlayers = ref<{ name: string; favourite: string; group_points: number; total_points: number }[]>([])

onBeforeMount(async () => {
    await userStore.onBeforeMount()
    favourite.value = userStore.playerData?.favourite

    if (userStore.playerData?.crystallBall) {
        crystalBallPicks.value = userStore.playerData?.crystallBall
        console.log(crystalBallPicks.value.longestmoves)
    }

    const groups = await api.get('/pickem/getgroups')
    const grupsData = groups.data as string[][]

    if (userStore.playerData) {
        const shiftOrder = userStore.playerData.groups.split('-').map((order) => JSON.parse(order))
        grupsData.forEach((group, index) => {
            const order = shiftOrder[index] // Get the order for this group
            group.players = order.map((placeIndex: string) => {
                const player = group.players.find((p: { place: string }) => p.place === placeIndex)
                return player
            })
        })

        pickemStore.setGroup(grupsData)
    }

    const response = await api.get('/pickemranking')
    pickemPlayers.value = response.data
})
</script>

<style scoped>
.player-column {
    width: 250px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    background-color: #18181b;
    margin: -20px;
    padding: 20px;
    border-radius: 16px;
}
.dot {
    position: absolute;
    top: 16px;
    right: 10px;
    width: 8px;
    height: 8px;
    background-color: rgb(255, 14, 14);
    border-radius: 50%;
}
.no-select {
    user-select: none;
    -webkit-user-select: none; /* For Safari */
    -moz-user-select: none; /* For Firefox */
    -ms-user-select: none; /* For Internet Explorer/Edge */
}
.data-container {
    margin-top: -11px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.user-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #18181b;
    margin-bottom: -42px;
}
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.twitch-button {
    background-color: #6441a5;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
