import { useTranslation } from "react-i18next";

class LocationService {

    getRegionKey(string) {
        if (
            string.toLowerCase().includes("republika srpska") || 
            string.toLowerCase().includes("република српска") || 
            string.toLowerCase().includes("република сербская") || 
            string.toLowerCase().includes("srpska") || 
            string.toLowerCase().includes("српска") 
        ) {
            return "republika_srpska";
        } else if (
            string.toLowerCase().includes("unsko-sanski") || 
            string.toLowerCase().includes("унско-санский") || 
            string.toLowerCase().includes("уна-санский") || 
            string.toLowerCase().includes("una-sana") || 
            string.toLowerCase().includes("унско-сански") || 
            string.toLowerCase().includes("unsko-sanski kanton")
        ) {
            return "una_sana_canton";
        } else if (
            string.toLowerCase().includes("posavina") || 
            string.toLowerCase().includes("посавский") || 
            string.toLowerCase().includes("посавина кантон") || 
            string.toLowerCase().includes("посавски кантон") || 
            string.toLowerCase().includes("posavski kanton")
        ) {
            return "posavina_canton";
        } else if (
            string.toLowerCase().includes("tuzla") || 
            string.toLowerCase().includes("тузланский") || 
            string.toLowerCase().includes("тузла кантон") || 
            string.toLowerCase().includes("тузлански кантон") || 
            string.toLowerCase().includes("tuzlanski kanton")
        ) {
            return "tuzla_canton";
        } else if (
            string.toLowerCase().includes("zenica-doboj") || 
            string.toLowerCase().includes("зеничко-добойский") || 
            string.toLowerCase().includes("зеница-добой кантон") || 
            string.toLowerCase().includes("зеничко-добојски кантон") || 
            string.toLowerCase().includes("zeničko-dobojski kanton")
        ) {
            return "zenica_doboj_canton";
        } else if (
            string.toLowerCase().includes("bosnian podrinje") || 
            string.toLowerCase().includes("bosnian-podrinje") || 
            string.toLowerCase().includes("боснийско-подринский") || 
            string.toLowerCase().includes("боснийско-подринье кантон") || 
            string.toLowerCase().includes("босанско-подрињски кантон") || 
            string.toLowerCase().includes("bosansko-podrinjski kanton")
        ) {
            return "bosnian_podrinje_canton_gorazde";
        } else if (
            string.toLowerCase().includes("central bosnia") || 
            string.toLowerCase().includes("центрально-боснийский") || 
            string.toLowerCase().includes("центральная босния кантон") || 
            string.toLowerCase().includes("средњобосански кантон") || 
            string.toLowerCase().includes("srednjobosanski kanton")
        ) {
            return "central_bosnia_canton";
        } else if (
            string.toLowerCase().includes("herzegovina-neretva") || 
            string.toLowerCase().includes("герцеговино-неретвенский") || 
            string.toLowerCase().includes("герцеговино-неретвенский кантон") || 
            string.toLowerCase().includes("херцеговачко-неретвански кантон") || 
            string.toLowerCase().includes("hercegovačko-neretvanski kanton")
        ) {
            return "herzegovina_neretva_canton";
        } else if (
            string.toLowerCase().includes("west herzegovina") || 
            string.toLowerCase().includes("западно-герцеговинский") || 
            string.toLowerCase().includes("западная герцеговина кантон") || 
            string.toLowerCase().includes("западнохерцеговачки кантон") || 
            string.toLowerCase().includes("zapadnohercegovački kanton")
        ) {
            return "west_herzegovina_canton";
        } else if (
            string.toLowerCase().includes("sarajevo") || 
            string.toLowerCase().includes("кантон сараево") || 
            string.toLowerCase().includes("сараевский кантон") || 
            string.toLowerCase().includes("сарајевски кантон") || 
            string.toLowerCase().includes("sarajevski kanton")
        ) {
            return "sarajevo_canton";
        } else if (
            string.toLowerCase().includes("banja luka") || 
            string.toLowerCase().includes("баня-лука") || 
            string.toLowerCase().includes("бања лука") || 
            string.toLowerCase().includes("banja luka")
        ) {
            return "banja_luka";
        } else if (
            string.toLowerCase().includes("bijeljina") || 
            string.toLowerCase().includes("биелина") || 
            string.toLowerCase().includes("бијељина") || 
            string.toLowerCase().includes("bijeljina")
        ) {
            return "bijeljina";
        } else if (
            string.toLowerCase().includes("doboj") || 
            string.toLowerCase().includes("добой") || 
            string.toLowerCase().includes("добој")
        ) {
            return "doboj";
        } else if (
            string.toLowerCase().includes("prijedor") || 
            string.toLowerCase().includes("прийедор") || 
            string.toLowerCase().includes("приједор") || 
            string.toLowerCase().includes("prijedor")
        ) {
            return "prijedor";
        } else if (
            string.toLowerCase().includes("istočno sarajevo") || 
            string.toLowerCase().includes("источно сараево") || 
            string.toLowerCase().includes("источно сарајево") || 
            string.toLowerCase().includes("istočno sarajevo")
        ) {
            return "istocno_sarajevo";
        } else if (
            string.toLowerCase().includes("trebinje") || 
            string.toLowerCase().includes("требинье") || 
            string.toLowerCase().includes("требиње") || 
            string.toLowerCase().includes("trebinje")
        ) {
            return "trebinje";
        } else if (
            string.toLowerCase().includes("brčko") || 
            string.toLowerCase().includes("брчко") || 
            string.toLowerCase().includes("brcko")
        ) {
            return "brcko";
        } else if (
            string.toLowerCase().includes("canton 10") || 
            string.toLowerCase().includes("кантон 10") || 
            string.toLowerCase().includes("кантон десет") || 
            string.toLowerCase().includes("kanton 10")
        ) {
            return "canton_10";
        } else if (
            string.toLowerCase().includes("podgorica") || 
            string.toLowerCase().includes("подгорица") || 
            string.toLowerCase().includes("podgorica") ||
            string.toLowerCase().includes("подгорица")
        ) {
            if (string.toLowerCase().includes("municipality")) {
                return "municipality_podgorica";
            } else if (
                string.toLowerCase().includes("capital city") || 
                string.toLowerCase().includes("град") || 
                string.toLowerCase().includes("grad")
            ) {
                return "glavni_grad_podgorica";
            } else {
                return "municipality_podgorica";
            }
        } else if (
            string.toLowerCase().includes("danilovgrad") || 
            string.toLowerCase().includes("даниловград") || 
            string.toLowerCase().includes("danilovgrad")
        ) {
            return "municipality_danilovgrad";
        } else if (
            string.toLowerCase().includes("cetinje") || 
            string.toLowerCase().includes("цетине") || 
            string.toLowerCase().includes("cetinje")
        ) {
            return "municipality_cetinje";
        } else if (
            string.toLowerCase().includes("budva") || 
            string.toLowerCase().includes("будва") || 
            string.toLowerCase().includes("budva")
        ) {
            return "municipality_budva";
        } else if (
            (string.toLowerCase().includes("bar") || 
            string.toLowerCase().includes("бар") || 
            string.toLowerCase().includes("bar"))
        ) {
            return "municipality_bar";
        } else if (
            string.toLowerCase().includes("herceg novi") || 
            string.toLowerCase().includes("герцег-нови") || 
            string.toLowerCase().includes("herceg novi") || 
            string.toLowerCase().includes("херцег-нови")
        ) {
            return "municipality_herceg_novi";
        } else if (
            string.toLowerCase().includes("kotor") || 
            string.toLowerCase().includes("котор") || 
            string.toLowerCase().includes("kotor")
        ) {
            return "municipality_kotor";
        } else if (
            string.toLowerCase().includes("tivat") || 
            string.toLowerCase().includes("тиват") || 
            string.toLowerCase().includes("tivat")
        ) {
            return "municipality_tivat";
        } else if (
            string.toLowerCase().includes("ulcinj") || 
            string.toLowerCase().includes("улцинь") || 
            string.toLowerCase().includes("ulcinj") ||
            string.toLowerCase().includes("улцињ")
        ) {
            return "municipality_ulcinj";
        } else if (
            string.toLowerCase().includes("pljevlja") || 
            string.toLowerCase().includes("плевля") || 
            string.toLowerCase().includes("pljevlja") ||
            string.toLowerCase().includes("пљевља")
        ) {
            return "municipality_pljevlja";
        } else if (
            string.toLowerCase().includes("bijelo polje") || 
            string.toLowerCase().includes("бијело поље") || 
            string.toLowerCase().includes("bijelo polje")
        ) {
            return "municipality_bijelo_polje";
        } else if (
            string.toLowerCase().includes("zabljak") || 
            string.toLowerCase().includes("жабляк") || 
            string.toLowerCase().includes("žabljak") || 
            string.toLowerCase().includes("жабљак")
        ) {
            return "municipality_zabljak";
        } else if (
            string.toLowerCase().includes("kolasin") || 
            string.toLowerCase().includes("колашин") || 
            string.toLowerCase().includes("kolašin")
        ) {
            return "municipality_kolasin";
        } else if (
            string.toLowerCase().includes("mojkovac") || 
            string.toLowerCase().includes("мойковац") || 
            string.toLowerCase().includes("mojkovac") ||
            string.toLowerCase().includes("мојковац")
        ) {
            return "municipality_mojkovac";
        } else if (
            string.toLowerCase().includes("berane") || 
            string.toLowerCase().includes("берне") || 
            string.toLowerCase().includes("berane") ||
            string.toLowerCase().includes("беране")
        ) {
            return "municipality_berane";
        } else if (
            string.toLowerCase().includes("andrijevica") || 
            string.toLowerCase().includes("андриевица") || 
            string.toLowerCase().includes("andrijevica") ||
            string.toLowerCase().includes("андријевица")
        ) {
            return "municipality_andrijevica";
        } else if (
            string.toLowerCase().includes("plav") || 
            string.toLowerCase().includes("плав") || 
            string.toLowerCase().includes("plav")
        ) {
            return "municipality_plav";
        } else if (
            string.toLowerCase().includes("rozaje") || 
            string.toLowerCase().includes("рожае") || 
            string.toLowerCase().includes("rožaje") ||
            string.toLowerCase().includes("рожаје")
        ) {
            return "municipality_rozaje";
        } else if (
            string.toLowerCase().includes("niksic") || 
            string.toLowerCase().includes("никшич") || 
            string.toLowerCase().includes("nikšić") ||
            string.toLowerCase().includes("никшић")
        ) {
            return "municipality_niksic";
        } else if (
            string.toLowerCase().includes("savnik") || 
            string.toLowerCase().includes("шавник") || 
            string.toLowerCase().includes("šavnik") ||
            string.toLowerCase().includes("шаўник")
        ) {
            return "municipality_savnik";
        } else if (
            string.toLowerCase().includes("pluzine") || 
            string.toLowerCase().includes("плужине") || 
            string.toLowerCase().includes("plužine") ||
            string.toLowerCase().includes("плужине")
        ) {
            return "municipality_pluzine";
        } else if (
            string.toLowerCase().includes("gusinje") || 
            string.toLowerCase().includes("гусиње") || 
            string.toLowerCase().includes("gusinje")
        ) {
            return "municipality_gusinje";
        } else if (
            string.toLowerCase().includes("petrovac") || 
            string.toLowerCase().includes("петровац") || 
            string.toLowerCase().includes("petrovac")
        ) {
            return "municipality_petrovac";
        } else if (
            string.toLowerCase().includes("tuzi") || 
            string.toLowerCase().includes("тузи") || 
            string.toLowerCase().includes("tuzi")
        ) {
            return "municipality_tuzi";
        } else if (string.includes("Vojvodina") || string.includes("Воеводина")) {
            return "vojvodina";
        } else if (string.includes("Belgrade") || string.includes("Белград")) {
            return "belgrade";
        } else if (string.includes("Šumadija") || string.includes("Шумадийский")) {
            return "sumadija_and_western_serbia";
        } else if (string.includes("Southern and Eastern Serbia") || string.includes("Южно-Банатский")) {
            return "southern_and_eastern_serbia";
        } else if (string.includes("Kosovo and Metohija") || string.includes("Косово и Метохия")) {
            return "kosovo_and_metohija";
        } else if (string.includes("Belgrade") || string.includes("Белград") || string.includes("Београд")) {
            return "belgrade";
        } else if (string.includes("Bor") || string.includes("Bor") || string.includes("Борский") || string.includes("Борски")) {
            return "bor_district";
        } else if (string.includes("Braničevo District") || string.includes("Braničevo") || string.includes("Браничевский") || string.includes("Браничевски округ")) {
            return "branicevo_district";
        } else if (string.includes("Zlatibor District") || string.includes("Zlatibor") || string.includes("Златиборский") || string.includes("Златиборски округ")) {
            return "zlatibor_district";
        } else if (string.includes("Kolubara District") || string.includes("Kolubara") || string.includes("Колубарский") || string.includes("Колубарски округ")) {
            return "kolubara_district";
        } else if (string.includes("Moravica District") || string.includes("Moravica") || string.includes("Моравичский") || string.includes("Моравички округ")) {
            return "moravica_district";
        } else if (string.includes("Nišava District") || string.includes("Nišava") || string.includes("Нишавский") || string.includes("Нишавски округ")) {
            return "nisava_district";
        } else if (string.includes("Pirot District") || string.includes("Pirot") || string.includes("Пиротский") || string.includes("Пиротски округ")) {
            return "pirot_district";
        } else if (string.includes("Podunavlje District") || string.includes("Podunavlje") || string.includes("Подунайский") || string.includes("Подунавски")) {
            return "podunavlje_district";
        } else if (string.includes("Pčinja District") || string.includes("Pčinja") || string.includes("Пчиньский") || string.includes("Пчињски")) {
            return "pcinja_district";
        } else if (string.includes("Raška District") || string.includes("Raška") || string.includes("Рашский") || string.includes("Рашки")) {
            return "raska_district";
        } else if (string.includes("Rasina District") || string.includes("Rasina") || string.includes("Расинский") || string.includes("Расински")) {
            return "rasina_district";
        } else if (string.includes("Toplica District") || string.includes("Toplica") || string.includes("Топличский") || string.includes("Топлички")) {
            return "toplica_district";
        } else if (string.includes("Šumadija District") || string.includes("Šumadija") || string.includes("Шумадийский") || string.includes("Шумадијски")) {
            return "sumadija_district";
        } else if (string.includes("Jablanica District") || string.includes("Jablanica") || string.includes("Ябланичский") || string.includes("Јабланички")) {
            return "jablanica_district";
        } else if (string.toLowerCase().includes("zagreb city") || string.toLowerCase().includes("град загреб") || string.toLowerCase().includes("загреб") || string.toLowerCase().includes("zagreb")) {
        return "zagreb_city";
        } else if (string.toLowerCase().includes("zagrebačka županija") || string.toLowerCase().includes("загребская")) {
            return "zagreb_county";
        } else if (string.toLowerCase().includes("splitsko-dalmatinska županija") || string.toLowerCase().includes("сплитско-далматинская")) {
            return "split_dalmatia";
        } else if (string.toLowerCase().includes("istarska županija") || string.toLowerCase().includes("истарская")) {
            return "istria";
        } else if (string.toLowerCase().includes("primorsko-goranska županija") || string.toLowerCase().includes("приморско-горанская")) {
            return "primorje_gorski_kotar";
        } else if (string.toLowerCase().includes("ličko-senjska županija") || string.toLowerCase().includes("лика-сень") || string.toLowerCase().includes("lika-senj")) {
            return "lika_senj";
        } else if (string.toLowerCase().includes("virovitičko-podravska županija") || string.toLowerCase().includes("вировитицко-подравская")) {
            return "virovitica_podravina";
        } else if (string.toLowerCase().includes("požeško-slavonska županija") || string.toLowerCase().includes("пожешко-славонская") || string.toLowerCase().includes("požega-slavonia")) {
            return "pozega_slavonia";
        } else if (string.toLowerCase().includes("brodsko-posavska županija") || string.toLowerCase().includes("бродско-посавская")) {
            return "brod_posavina";
        } else if (string.toLowerCase().includes("zadarska županija") || string.toLowerCase().includes("задар")) {
            return "zadar";
        } else if (string.toLowerCase().includes("osječko-baranjska županija") || string.toLowerCase().includes("осиечко-бараньская")) {
            return "osijek_baranja";
        } else if (string.toLowerCase().includes("sisačko-moslavačka županija") || string.toLowerCase().includes("сисачко-мославинская")) {
            return "sisak_moslavina";
        } else if (string.toLowerCase().includes("koprivničko-križevačka županija") || string.toLowerCase().includes("копривницко-крижевечка")) {
            return "koprivnica_krizevci";
        } else if (string.toLowerCase().includes("bjelovarsko-bilogorska županija") || string.toLowerCase().includes("бьеловарско-билогорская") || string.toLowerCase().includes("bjelovar-bilogora")) {
            return "bjelovar_bilogora";
        } else if (string.toLowerCase().includes("karlovačka županija") || string.toLowerCase().includes("карловацкая") || string.toLowerCase().includes("karlovac")) {
            return "karlovac";
        } else if (string.toLowerCase().includes("varaždinska županija") || string.toLowerCase().includes("вараждинская")) {
            return "varazdin";
        } else if (string.toLowerCase().includes("krapinsko-zagorska županija") || string.toLowerCase().includes("крапинско-загорская")) {
            return "krapina_zagorje";
        } else if (string.toLowerCase().includes("međimurska županija") || string.toLowerCase().includes("меджимурская")) {
            return "medimurje";
        } else if (string.toLowerCase().includes("šibensko-kninska županija") || string.toLowerCase().includes("шибенско-книнская")) {
            return "sibenik_knin";
        } else if (string.toLowerCase().includes("vukovarsko-srijemska županija") || string.toLowerCase().includes("вуковарско-сремская")) {
            return "vukovar_srijem";
        } else if (string.toLowerCase().includes("dubrovačko-neretvanska županija") || string.toLowerCase().includes("дубровачко-неретванская")) {
            return "dubrovnik_neretva";
        } else {
            return "municipality_podgorica";
        }
    };


    // regions.js
getRegionChoice = (t) => ({
    republika_srpska: t('republika_srpska'),
    una_sana_canton: t('una_sana_canton'),
    posavina_canton: t('posavina_canton'),
    tuzla_canton: t('tuzla_canton'),
    zenica_doboj_canton: t('zenica_doboj_canton'),
    bosnian_podrinje_canton_gorazde: t('bosnian_podrinje_canton_gorazde'),
    central_bosnia_canton: t('central_bosnia_canton'),
    herzegovina_neretva_canton: t('herzegovina_neretva_canton'),
    west_herzegovina_canton: t('west_herzegovina_canton'),
    sarajevo_canton: t('sarajevo_canton'),
    banja_luka: t('banja_luka'),
    bijeljina: t('bijeljina'),
    doboj: t('doboj'),
    prijedor: t('prijedor'),
    istocno_sarajevo: t('istocno_sarajevo'),
    trebinje: t('trebinje'),
    brcko: t('brcko'),
    canton_10: t('canton_10'),
    municipality_podgorica: t('municipality_podgorica'),
    glavni_grad_podgorica: t('glavni_grad_podgorica'),
    municipality_danilovgrad: t('municipality_danilovgrad'),
    municipality_cetinje: t('municipality_cetinje'),
    municipality_budva: t('municipality_budva'),
    municipality_bar: t('municipality_bar'),
    municipality_herceg_novi: t('municipality_herceg_novi'),
    municipality_kotor: t('municipality_kotor'),
    municipality_tivat: t('municipality_tivat'),
    municipality_ulcinj: t('municipality_ulcinj'),
    municipality_pljevlja: t('municipality_pljevlja'),
    municipality_bijelo_polje: t('municipality_bijelo_polje'),
    municipality_zabljak: t('municipality_zabljak'),
    municipality_kolasin: t('municipality_kolasin'),
    municipality_mojkovac: t('municipality_mojkovac'),
    municipality_berane: t('municipality_berane'),
    municipality_andrijevica: t('municipality_andrijevica'),
    municipality_plav: t('municipality_plav'),
    municipality_rozaje: t('municipality_rozaje'),
    municipality_niksic: t('municipality_niksic'),
    municipality_savnik: t('municipality_savnik'),
    municipality_pluzine: t('municipality_pluzine'),
    municipality_gusinje: t('municipality_gusinje'),
    municipality_petrovac: t('municipality_petrovac'),
    municipality_tuzi: t('municipality_tuzi'),
    vojvodina: t('vojvodina'),
    belgrade: t('belgrade'),
    sumadija_and_western_serbia: t('sumadija_and_western_serbia'),
    southern_and_eastern_serbia: t('southern_and_eastern_serbia'),
    kosovo_and_metohija: t('kosovo_and_metohija'),
    bor_district: t('bor_district'),
    branicevo_district: t('branicevo_district'),
    zlatibor_district: t('zlatibor_district'),
    kolubara_district: t('kolubara_district'),
    moravica_district: t('moravica_district'),
    nisava_district: t('nisava_district'),
    pirot_district: t('pirot_district'),
    podunavlje_district: t('podunavlje_district'),
    pcinja_district: t('pcinja_district'),
    raska_district: t('raska_district'),
    rasina_district: t('rasina_district'),
    toplica_district: t('toplica_district'),
    sumadija_district: t('sumadija_district'),
    jablanica_district: t('jablanica_district'),
    zagreb_city: t('zagreb_city'),
    zagreb_county: t('zagreb_county'),
    split_dalmatia: t('split_dalmatia'),
    istria: t('istria'),
    primorje_gorski_kotar: t('primorje_gorski_kotar'),
    lika_senj: t('lika_senj'),
    virovitica_podravina: t('virovitica_podravina'),
    pozega_slavonia: t('pozega_slavonia'),
    brod_posavina: t('brod_posavina'),
    zadar: t('zadar'),
    osijek_baranja: t('osijek_baranja'),
    sisak_moslavina: t('sisak_moslavina'),
    koprivnica_krizevci: t('koprivnica_krizevci'),
    bjelovar_bilogora: t('bjelovar_bilogora'),
    karlovac: t('karlovac'),
    varazdin: t('varazdin'),
    krapina_zagorje: t('krapina_zagorje'),
    medimurje: t('medimurje'),
    sibenik_knin: t('sibenik_knin'),
    vukovar_srijem: t('vukovar_srijem'),
    dubrovnik_neretva: t('dubrovnik_neretva')
});


    getCountryKey(string) {
        if (string.includes("Serbia") || string.includes("Сербия") || string.includes("Србија")) {
            return "serbia";
        } else if (string.includes("Croatia") || string.includes("Хорватия") || string.includes("Хрватска")) {
            return "croatia";
        } else if (string.includes("Bosnia and Herzegovina") || string.includes("Босния и Герцеговина") || string.includes("Босна и Херцеговина")) {
            return "bosnia_and_herzegovina";
        } else if (string.includes("Montenegro") || string.includes("Черногория") || string.includes("Црна Гора")) {
            return "montenegro";
        } else if (string.includes("North Macedonia") || string.includes("Мacedonia") || string.includes("Северная Македония") || string.includes("Македония") || string.includes("Северна Македонија")) {
            return "north_macedonia";
        } else {
            return "montenegro";
        }
    }

    regionMapping = {
    // Войводина
    "severni banat": "vojvodina",
    "severni banat okrug": "vojvodina",
    "северни банат": "vojvodina",
    "северни банат округ": "vojvodina",
    "севернобанатски округ": "vojvodina",
    "srednji banat": "vojvodina",
    "srednji banat okrug": "vojvodina",
    "средњи банат": "vojvodina",
    "средњи банат округ": "vojvodina",
    "средњобанатски округ": "vojvodina",
    "juzni banat": "vojvodina",
    "juzni banat okrug": "vojvodina",
    "јужни банат": "vojvodina",
    "јужни банат округ": "vojvodina",
    "јужнобанатски округ": "vojvodina",
    "juznobacki": "vojvodina",
    "juznobacki okrug": "vojvodina",
    "јужнобачки округ": "vojvodina",
    "zapadnobacki": "vojvodina",
    "zapadnobacki okrug": "vojvodina",
    "западнобачки округ": "vojvodina",
    "srem": "vojvodina",
    "sremski okrug": "vojvodina",
    "сремски округ": "vojvodina",
    "воеводина": "vojvodina",
    "војводина": "vojvodina",
    
    // Белград
    "belgrade": "belgrade",
    "belgrade okrug": "belgrade",
    "белград": "belgrade",
    "београд": "belgrade",
    "град београд": "belgrade",
    
    // Шумадия и Западная Сербия
    "zlatiborski": "sumadija_and_western_serbia",
    "zlatiborski okrug": "sumadija_and_western_serbia",
    "златиборски округ": "sumadija_and_western_serbia",
    "kolubarski": "sumadija_and_western_serbia",
    "kolubarski okrug": "sumadija_and_western_serbia",
    "колубарски округ": "sumadija_and_western_serbia",
    "macvanski": "sumadija_and_western_serbia",
    "macvanski okrug": "sumadija_and_western_serbia",
    "мачвански округ": "sumadija_and_western_serbia",
    "moravicki": "sumadija_and_western_serbia",
    "moravicki okrug": "sumadija_and_western_serbia",
    "моравички округ": "sumadija_and_western_serbia",
    "pomoravski": "sumadija_and_western_serbia",
    "pomoravski okrug": "sumadija_and_western_serbia",
    "поморавски округ": "sumadija_and_western_serbia",
    "rasinski": "sumadija_and_western_serbia",
    "rasinski okrug": "sumadija_and_western_serbia",
    "расински округ": "sumadija_and_western_serbia",
    "raski": "sumadija_and_western_serbia",
    "raski okrug": "sumadija_and_western_serbia",
    "рашки округ": "sumadija_and_western_serbia",
    "sumadijski": "sumadija_and_western_serbia",
    "sumadijski okrug": "sumadija_and_western_serbia",
    "шумадијски округ": "sumadija_and_western_serbia",
    
    // Южная и Восточная Сербия
    "bor": "southern_and_eastern_serbia",
    "bor okrug": "southern_and_eastern_serbia",
    "борски округ": "southern_and_eastern_serbia",
    "branicevo": "southern_and_eastern_serbia",
    "branicevo okrug": "southern_and_eastern_serbia",
    "браничевски округ": "southern_and_eastern_serbia",
    "zajecarski": "southern_and_eastern_serbia",
    "zajecarski okrug": "southern_and_eastern_serbia",
    "зајечарски округ": "southern_and_eastern_serbia",
    "nisava": "southern_and_eastern_serbia",
    "nisava okrug": "southern_and_eastern_serbia",
    "нишавски округ": "southern_and_eastern_serbia",
    "pirotski": "southern_and_eastern_serbia",
    "pirotski okrug": "southern_and_eastern_serbia",
    "пиротски округ": "southern_and_eastern_serbia",
    "podunavski": "southern_and_eastern_serbia",
    "podunavski okrug": "southern_and_eastern_serbia",
    "подунавски округ": "southern_and_eastern_serbia",
    "pcinjski": "southern_and_eastern_serbia",
    "pcinjski okrug": "southern_and_eastern_serbia",
    "пчињски округ": "southern_and_eastern_serbia",
    "toplicki": "southern_and_eastern_serbia",
    "toplicki okrug": "southern_and_eastern_serbia",
    "топлички округ": "southern_and_eastern_serbia",
    "jablanica": "southern_and_eastern_serbia",
    "jablanica okrug": "southern_and_eastern_serbia",
    "јабланички округ": "southern_and_eastern_serbia",
    
    // Косово и Метохия
    "kosovo and metohija": "kosovo_and_metohija",
    "kosovski okrug": "kosovo_and_metohija",
    "косово и метохија": "kosovo_and_metohija",
    "косовски округ": "kosovo_and_metohija"
};



    getSerbianRegionKey(string) {
        const normalizedString = string.toLowerCase();
        const cleanedString = normalizedString.replace(/\bokrug\b|\bокруг\b/g, '').trim();

        return this.regionMapping[cleanedString] || "unknown_region";
    }

    extractCountryAndRegion = (geocodeResult) => {
        let country = '';
        let region = '';
        let extRegion = '';

        // First pass to extract the country
        geocodeResult.address_components.forEach(component => {
            if (component.types.includes('country')) {
                country = component.long_name;
            }
        });

        console.log("Country extracted:", country); // For debugging
        console.log(country.toLowerCase().includes('bosnia') || country.toLowerCase().includes('босния') || country.toLowerCase().includes('bosna'));
        geocodeResult.address_components.forEach(component => {
            if (country.toLowerCase().includes('bosnia') || 
                country.toLowerCase().includes('босния') || 
                country.toLowerCase().includes('bosna')) {
                
                if (component.types.includes('administrative_area_level_2')) {
                    region = this.getRegionKey(component.long_name);
                    extRegion = component.long_name;
                    console.log('Region from administrative_area_level_2:', region);
                } else if (component.types.includes('administrative_area_level_1')  && !region) {
                    region = this.getRegionKey(component.long_name);
                    extRegion = component.long_name;
                    console.log('Region from administrative_area_level_1:', region);
                } else {
                    console.log('No matching administrative area found.');
                }
                
                console.log("Country:", country);
                console.log("Region:", region);
            }
        else if ((component.types.includes('administrative_area_level_1') || component.types.includes('administrative_area_level_2') || component.types.includes('locality')) && !(country.toLowerCase().includes('bosnia') || country.toLowerCase().includes('босния') || country.toLowerCase().includes('bosna'))) {
                console.log(!(country.toLowerCase().includes('bosnia') || country.toLowerCase().includes('босния') || country.toLowerCase().includes('bosna')));
                region = this.getRegionKey(component.long_name);
                extRegion = component.long_name;
                console.log('popa');
                console.log("Region before mapping:", component.long_name);
                console.log(`Country includes 'Сербия': ${country.includes('Сербия')}`);

                if (country.includes('Сербия') || country.includes('Serbia') || country.includes('Србиja')) {
                    console.log("Mapping region for Serbia");
                    const mappedRegion = this.getSerbianRegionKey(component.long_name);
                    console.log("Mapped Region:", mappedRegion);
                    if (mappedRegion !== "unknown_region") {
                        region = mappedRegion;
                    }
                }
            } 
        });

        return { country, region, extRegion };
    };
}

export default LocationService;
