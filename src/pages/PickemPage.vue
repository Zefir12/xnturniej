<template>
    <Dialog
        v-model:visible="showPatchNotes"
        modal
        header="Patch Noty v1.1"
        :style="{ width: '800px', fontSize: '14px' }"
        @hide="() => setLocalStoreItem('hasViewedPatchNotes', 'true')"
    >
        - Tomasz Fornal stety albo niestety wygrał w siatkę, i nie będzie miał czasu na turniej. Zamiast niego wchodzi
        Taku, podmienię ich pozycję(jak ktoś nic nie zmieni po prostu będzie mieć Taku tam gdzie obstawiał Fornala) żeby
        jak najmniej popsuć Pick'emy osobom które nie zdażą wejść i nanieść zmiany <br /><br /><br />
        - Zmiany w kryształowej kuli na 7:30, 24.04.2025:
        <br />
        <h3>Botez Gambit</h3>
        Nie wiem czemu, odcięło mi myślenie i dałem 1pkt na każdego zawodnika i jakoś mi wyszło 15<br /><br />
        Zmiana: 15pkt -> 16pkt
        <p>
            Dodatkowe informacje o punktacji: <br /><br />
            Punkt dostaje się za zaznaczenie że zawodnik podwali i on faktycznie podwali, oraz za niezaznaczenie
            zawodnika który nie podwali. Jeżeli w turnieju 3 osoby podwalą, a nie zaznaczysz nikogo, otrzymasz za tę
            kategorię 13 pkt. <br />Analogicznie jeśli zaznaczysz wszystkich a tylko 3 osoby podwalą otrzymasz 3 pkt.
        </p>
        <h3>Blitzcrieg & Życie w okopach</h3>
        Tutaj to samo, większość osób naturalnie liczy ruchy e4 e5 jako jeden ruch, a ja chciałem dokładniejszą
        predykcję licząc to jako dwa ruchy.
        <p>
            Zmiana w przyznawaniu punktów: <br />
            Dla zawodników którzy przeczytali pytajnik i poprawnie wybrali według zasady że e4 e5 to dwa ruchy nic sie
            nie zmienia, natomiast jeśli najkrótsza partia naprzykład potrwa 7 ruchów, (13 ruchów licząc każde
            posunięcie) to za wpisanie 13 jest pełna liczba punktów, natomiast za wpisanie 7 przyznaję połowę, w związku
            z tym że ten kto zgadywał 7 równoczesnie obstawia ruch 13 i 14, więc ma większe szanse na trafienie.
            <br />
            <br />Zmiana: Życie w okopach 15pkt -> 16pkt
        </p>
        <h3>Dodatkowe informacje</h3>
        <p>- Aby wybrać komu kibicujesz kilkasz na ikonkę avatara na górze</p>
        <p>
            - Karty w kryształowej kuli mają pytajnik w praym górnym rogu, po najechaniu wyświetla dokładniejszy opis
            karty
        </p>
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
                    <SelectPlayerPickem v-model="favourite" />
                    <Button :style="{ backgroundColor: 'red' }" @click="favourite = null">Wyczysć X</Button>
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
                    <div>🏆 0 punktów</div>
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
        <div class="data-container">
            <Tabs :style="{ width: '100%', backgroundColor: 'transparent' }" v-model:value="panelTab">
                <TabList :style="{ justifyContent: 'center' }">
                    <Tab value="0" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Informacje</span>
                    </Tab>
                    <Tab value="1" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Faza grupowa</span>
                        <span v-if="!getLocalStoreItem('hasVisitedGroupPhase')" class="dot" />
                    </Tab>
                    <Tab :disabled="false" value="2" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Drabinka</span>
                    </Tab>
                    <Tab value="3" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Kryształowa Kula</span>
                        <span v-if="!getLocalStoreItem('hasVisitedGroupPhase')" class="dot" />
                    </Tab>
                    <Tab value="4" as="div" class="flex items-center gap-2">
                        <span class="font-bold whitespace-nowrap">Ranking Twitcha</span>
                    </Tab>
                </TabList>
                <TabPanels>
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
                                <h2>Czym jest Pick’em Challenge?</h2>
                                <p>
                                    To Twój moment, żeby pokazać, że masz szachową intuicję i znasz zawodników jak
                                    własną kieszeń. Wybierasz w jaki sposób według Ciebie potoczy sie turniej oraz co
                                    sie na nim wydarzy - i zbierasz punkty za trafne typy.
                                </p>
                                <p>
                                    Proste? No własnie nie, ale być może to Ty będziesz TOP 1 jasnowidzem na polskim
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
                                <h1>Patch Noty v1.1</h1>
                                - Tomasz Fornal stety albo niestety wygrał w siatkę, i nie będzie miał czasu na turniej.
                                Zamiast niego wchodzi Taku, podmienię ich pozycję(jak ktoś nic nie zmieni po prostu
                                będzie mieć Taku tam gdzie obstawiał Fornala) żeby jak najmniej popsuć Pick'emy osobom
                                które nie zdażą wejść i nanieść zmiany <br /><br /><br />
                                - Zmiany w kryształowej kuli na 7:30, 24.04.2025:
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
                                    - Karty w kryształowej kuli mają pytajnik w praym górnym rogu, po najechaniu
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
                            <CountDownTimer
                                class="no-select"
                                rectColor="#18181b"
                                :style="{ marginTop: '-20px' }"
                                text="Możliwość wyboru zostanie zablokowana za: "
                                :date="new Date('2025-04-24T16:00:00')"
                            />
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
                            <div :style="{ display: 'flex', gap: '10px' }">
                                <StyledButton :disabled="!changes" @click="saveGroups">Zapisz zmiany</StyledButton>
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
                        <CountDownTimer
                            class="no-select"
                            rectColor="#18181b"
                            :style="{ marginTop: '-4px', marginBottom: '30px' }"
                            text="Drabinka odblokuje sie po zakończeniu fazy grupowej: "
                            :date="new Date('2025-04-25T20:00:00')"
                        />
                        <div
                            :style="{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }"
                        >
                            <IconLock size="240" color="#18181b" />
                        </div>
                    </TabPanel>
                    <TabPanel value="3" as="p" class="m-0">
                        <CountDownTimer
                            class="no-select"
                            rectColor="#18181b"
                            :style="{ marginTop: '-4px', marginBottom: '30px' }"
                            text="Możliwość wyboru zostanie zablokowana za: "
                            :date="new Date('2025-04-24T16:00:00')"
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
                            <div :style="{ display: 'flex', gap: '10px' }">
                                <StyledButton :disabled="!changesBall" @click="saveCrystallBall"
                                    >Zapisz zmiany</StyledButton
                                >
                            </div>
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
                                    desc="Każdy ruch gracza po którym przeciwnik może zbić hetmana, i zawodnik by stracił więcej niż 5 punktów w ocenie silnika, jest liczony jako podwalenie, bo jakoś trzeba odsortować poświęcenia. Punkt otrzymuje się za każde trafienie: albo że zawodonik podwali albo że NIE podwali"
                                    :image="BlindManLogo"
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
                                    desc="Ile średnio z wszystkich pratii zawodnikowi zostaje % czasu na koniec partii, np: kończy 10 minutową partie z 8 minutami na zegarze: 80% czasu, i jest liczony średni % z wszystkich gier"
                                    :image="TimerLogo"
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
                                            <SelectPlayerPickem v-model="crystalBallPicks.speedrunner" />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem :points="15" title="Narodziny wojownika" :image="EvolveLogo">
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
                                                :disabled="false"
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
                                                :disabled="false"
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
                                                :disabled="false"
                                                v-model="crystalBallPicks.longestmoves"
                                                fluid
                                                size="small"
                                                :style="{ width: '60px' }"
                                            />
                                        </div></div
                                ></CrystallBallItem>
                                <CrystallBallItem :points="5" title="Dwie armie" :image="ArmyLogo">
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
                                            <ChooseOption v-model="crystalBallPicks.blackorwhite">
                                                <template #a>Białe</template>
                                                <template #b>Czarne</template>
                                            </ChooseOption>
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem :points="10" title="Wypadek przy pracy..." :image="BlindManLogo">
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
                                                :disabled="false"
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
                                            <ChooseOption v-model="crystalBallPicks.bishopsandknights">
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
                                    desc="Przykładowo, licząc średnią arytmetyczną z głosów wszystkich obstawiających, Fornal miałby 3.14 miejsce średnio, a zajmie 1 miejsce w grupie, to dostanie 2.14 punktów różnicy w tej kategorii. Zwycięża największa dodatnia różnica. Jeśli kilka osób będzie miało remis na pierwszym miejscu, zaznaczenie dowolnej z nich daje pęlną liczbę punktów, natomiast liczone będzie z dokładnością do 3 miejsc po przecinku"
                                    :points="12"
                                    title="Czarny koń"
                                    :image="BlindManLogo"
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
                                            <SelectPlayerPickem v-model="crystalBallPicks.blackhorse" />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Przykładowo, licząc średnią arytmetyczną z głosów wszystkich obstawiających, Fornal miałby 1.14 miejsce średnio, a zajmie 2 miejsce w grupie, to dostanie -0.86 punktów różnicy w tej kategorii. Zwycięża największa ujemna różnica. Jeśli kilka osób będzie miało remis na pierwszym miejscu, zaznaczenie dowolnej z nich daje pęlną liczbę punktów, natomiast liczone będzie z dokładnością do 3 miejsc po przecinku"
                                    :points="10"
                                    title="Zawód rodziny"
                                    :image="BlindManLogo"
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
                                            <SelectPlayerPickem v-model="crystalBallPicks.familydisappointment" />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem :points="2" title="Początki" :image="BlindManLogo">
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
                                            <ChooseOption v-model="crystalBallPicks.beginings">
                                                <template #a>Będzie</template>
                                                <template #b>Nie będzie</template>
                                            </ChooseOption>
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Jeśli kilka grup będzie miało remis na pierwszym miejscu, zaznaczenie dowolnej z nich daje pęlną liczbę punktów"
                                    :points="5"
                                    title="Do ostatniej kropli krwi"
                                    :image="ArmyLogo"
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
                                    desc="Jeśli kilka osób będzie miało remis na pierwszym miejscu zaznaczenie dowolnej z nich daje pęlną liczbę punktów"
                                    title="Najlepiej zrobić samemu"
                                    :image="TimerLogo"
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
                                            <SelectPlayerPickem v-model="crystalBallPicks.bestalone" />
                                        </div>
                                    </div>
                                </CrystallBallItem>
                                <CrystallBallItem
                                    desc="Liczy sie % więc jak ktoś zagrałby 1 mecz i zrobił w nim roszade ma 100% i wygrywa tą kategorie. Jeśli kilka osób będzie miało remis na pierwszym miejscu zaznaczenie dowolnej z nich daje pęlną liczbę punktów"
                                    :points="8"
                                    title="Nigdzie nie ide"
                                    :image="TimerLogo"
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
                                            <SelectPlayerPickem v-model="crystalBallPicks.standingstill" />
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
                            <div :style="{ color: '#FAF9F6', marginBottom: '1rem', fontSize: '0.8rem' }">
                                Ranking jest odświeżany co 2 minuty (jak będzie serwer sie dobrze trzymać to podkręce
                                potem)<br />Potem dodam wyszukiwanie i ładny wygląd, dzisiaj w pierwszy dzień pilnuje
                                serwera żeby sie nie wywrócił xd
                            </div>
                            <DataTable
                                :value="pickemPlayers"
                                scrollable
                                paginator
                                :rows="15"
                                :rowsPerPageOptions="[5, 10, 15, 20, 50, 100, 500, 1000]"
                                tableStyle="min-width: 50rem max-width: 100rem"
                            >
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
                                <Column :style="{ width: '15em', backgroundColor: 'transparent' }" header="Nick">
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
                                </Column>
                                <Column header="Punkty fazy grupowej"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                                <Column header="Punkty w drabince"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                                <Column header="Punkty za kryształową kule"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                                <Column header="Punkty razem"
                                    ><template #body="">{{ 0 }}</template></Column
                                >
                            </DataTable>
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
import StyledButton from '@/components/StyledButton.vue'
import { usePickemStore } from '@/stores/pickemStore'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { getPlayerByUuid, getRandomSuccessMessage } from '@/common/helpers'
import { IconArrowBackUp, IconLock } from '@tabler/icons-vue'
import SelectPlayerPickem from '@/components/PickEmComponents/SelectPlayerPickem.vue'
import ChooseOption from '@/components/PickEmComponents/ChooseOption.vue'
import { RadioButton } from 'primevue'
import { MultiSelect } from 'primevue'
import { playerMappings } from '@/common/consts'
import avatar from '../assets/twitchicons/defaultavatar.png'
import { Dialog } from 'primevue'

const showAvatarModal = ref(false)

const toast = useToast()

const userStore = useUserStore()
const panelTab = ref(localStorage.getItem('pickemTab') || '0')
const callback = import.meta.env.VITE_ENV == 'prod' ? 'https://xnturniej.info' : 'http://localhost:5173'
const pickemStore = usePickemStore()
const changes = ref(false)
const changesBall = ref(false)
const loading = ref(true)
const showPatchNotes = ref(localStorage.getItem('hasViewedPatchNotes') == null)
const favourite = ref<null | string>(
    localStorage.getItem('favouritePickem') ? JSON.parse(localStorage.getItem('favouritePickem') ?? '{}') : null,
)
const ballLocal = localStorage.getItem('crystallBallSelections')

const replaceUUID = (input: string, fromUUID: string, toUUID: string): string => {
    const escapedUUID = fromUUID.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape special characters
    const regex = new RegExp(escapedUUID, 'g')
    return input.replace(regex, toUUID)
}
const crystalBallPicks = ref(
    ballLocal
        ? JSON.parse(
              replaceUUID(ballLocal, '420d7862-acbe-11eb-9289-c516bf3f58be', '97709332-e8df-11ef-ae1f-699fe3713de1'),
          )
        : {
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
          },
)

function haveGroupsChanged() {
    const groupLetters = ['a', 'b', 'c', 'd']
    const defaultValue = '["1","2","3","4"]'

    const b = groupLetters.some((group) => {
        const original = localStorage.getItem(`group-${group}`) ?? defaultValue
        const temp = localStorage.getItem(`temp-group-${group}`) ?? defaultValue
        return original !== temp
    })
    changes.value = b
}

const getLocalStoreItem = (key: string): string | null => {
    return localStorage.getItem(key)
}

const setLocalStoreItem = (key: string, value: string) => {
    return localStorage.setItem(key, value)
}

const saveCrystallBall = async () => {
    if (localStorage.getItem('pickemTwitchUser') == null) {
        toast.add({
            severity: 'error',
            summary: 'Błąd',
            group: 'br',
            detail: 'Aby brac udział w rankingu trzeba byc zalogowanym',
            life: 3000,
        })
        return
    }
    const result = await api.post('/pickem/choosecrystalball', {
        id: JSON.parse(localStorage.getItem('pickemTwitchUser') ?? '{}')._id,
        picks: crystalBallPicks.value,
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
    localStorage.setItem('crystallBallSelections', JSON.stringify(crystalBallPicks.value))
    changesBall.value = false
    toast.add({
        severity: 'success',
        summary: 'Zapisano zmiany',
        group: 'br',
        detail: getRandomSuccessMessage(),
        life: 3000,
    })
}

watch(
    crystalBallPicks,
    () => {
        changesBall.value = true
    },
    { deep: true },
)

watch(
    () => pickemStore.changesCounter,
    () => {
        haveGroupsChanged()
    },
)

watch(panelTab, (newVal) => {
    localStorage.setItem('pickemTab', newVal)
})

watch(favourite, async (newVal) => {
    const result = await api.post('/pickem/choosefavourite', {
        id: JSON.parse(localStorage.getItem('pickemTwitchUser') ?? '{}')._id,
        favourite: favourite.value,
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
    localStorage.setItem('favouritePickem', JSON.stringify(newVal))
    showAvatarModal.value = false
    changesBall.value = false
    toast.add({
        severity: 'success',
        summary: 'Zapisano zmiany',
        group: 'br',
        detail: getRandomSuccessMessage(),
        life: 3000,
    })
})

const saveGroups = async () => {
    loading.value = true
    const a = localStorage.getItem(`temp-group-a`) ?? '["1","2","3","4"]'
    const b = localStorage.getItem(`temp-group-b`) ?? '["1","2","3","4"]'
    const c = localStorage.getItem(`temp-group-c`) ?? '["1","2","3","4"]'
    const d = localStorage.getItem(`temp-group-d`) ?? '["1","2","3","4"]'
    localStorage.setItem(`group-a`, a)
    localStorage.setItem(`group-b`, b)
    localStorage.setItem(`group-c`, c)
    localStorage.setItem(`group-d`, d)
    if (localStorage.getItem('pickemTwitchUser') == null) {
        toast.add({
            severity: 'error',
            summary: 'Błąd',
            group: 'br',
            detail: 'Aby brac udział w rankingu trzeba byc zalogowanym',
            life: 3000,
        })
        return
    }
    const result = await api.post('/pickem/choosegroups', {
        id: JSON.parse(localStorage.getItem('pickemTwitchUser') ?? '{}')._id,
        groups: `${a}-${b}-${c}-${d}`,
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
    pickemStore.addChangesCounter()
    loading.value = false
    toast.add({
        severity: 'success',
        summary: 'Zapisano zmiany',
        group: 'br',
        detail: getRandomSuccessMessage(),
        life: 3000,
    })
}

const pickemPlayers = ref<{ name: string; favourite: boolean }[]>([])

onBeforeMount(async () => {
    localStorage.setItem(`temp-group-a`, localStorage.getItem(`group-a`) ?? '["1","2","3","4"]')
    localStorage.setItem(`temp-group-b`, localStorage.getItem(`group-b`) ?? '["1","2","3","4"]')
    localStorage.setItem(`temp-group-c`, localStorage.getItem(`group-c`) ?? '["1","2","3","4"]')
    localStorage.setItem(`temp-group-d`, localStorage.getItem(`group-d`) ?? '["1","2","3","4"]')

    const groups = await api.get('/pickem/getgroups')
    pickemStore.setGroup(groups.data)

    const response = await api.get('/pickemranking')
    pickemPlayers.value = response.data
})
</script>

<style scoped>
.dot {
    position: absolute;
    top: 10px;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: rgb(168, 14, 14);
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
