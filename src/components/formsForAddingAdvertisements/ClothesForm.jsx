import React, { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, InputNumber, Button, Select, Image, Upload, AutoComplete, Spin, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import debounce from 'lodash.debounce';
import { GeoPoint } from 'firebase/firestore';
import LocationService from '../../services/LocationService.js';
import RegionSelector from "../../services/RegionSelector.jsx";

const containerStyle = {
    width: '100%',
    height: '400px',
    position: 'relative'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const markerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -100%)',
    zIndex: 1,
};

var lservice = new LocationService();

function getCountryKey(string) {
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


    function getRegionKey(string) {
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
    }

const MapComponent = ({ coordinates, setCoordinates, setCountry, country, setRegion, region, setLocation, location, mapRef, testRegion, setTestRegion, testCountry, setTestCountry }) => {
    const countryMappings = {
        'Черногория': 'montenegro',
        'Црна Гора': 'montenegro',
        'Crna Gora': 'montenegro',
        'Montenegro': 'montenegro',
        'Сербия': 'serbia',
        'Србија': 'serbia',
        'Srbija': 'serbia',
        'Serbia': 'serbia',
        'Хорватия': 'croatia',
        'Хрватска': 'croatia',
        'Hrvatska': 'croatia',
        'Croatia': 'croatia',
        'Босния и Герцеговина': 'bosnia_and_herzegovina',
        'Босна и Херцеговина': 'bosnia_and_herzegovina',
        'Bosna i Hercegovina': 'bosnia_and_herzegovina',
        'Bosnia and Herzegovina': 'bosnia_and_herzegovina'
    };

    const { Option } = Select;

    const { t } = useTranslation();

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        map.panTo(coordinates);
    }, [coordinates]);

    const onDragEnd = async () => {
        if (mapRef.current) {
            const newCenter = mapRef.current.getCenter();
            const newCoordinates = {
                lat: newCenter.lat(),
                lng: newCenter.lng()
            };
            const geoPoint = new GeoPoint(newCoordinates.lat, newCoordinates.lng);
            setCoordinates(newCoordinates);
            // Fetch the address using Geocoding API
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newCoordinates }, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;
                        const formattedAddress = results[0].formatted_address;

                        // let country = '';
                        // let region = '';

                        // if (addressComponents.length >= 6) {
                        //     country = addressComponents[5]?.long_name || '';
                        //     region = addressComponents[4]?.long_name || '';
                        // } else if (addressComponents.length >= 5) {
                        //     country = addressComponents[4]?.long_name || '';
                        //     region = addressComponents[3]?.long_name || '';
                        // } else if (addressComponents.length >= 4) {
                        //     country = addressComponents[3]?.long_name || '';
                        //     region = addressComponents[2]?.long_name || '';
                        // }
                        const { country, region, extRegion } = extractCountryAndRegion(results[0]);
                        setLocation(formattedAddress);  // Update the AutoComplete field
                        setCountry(getCountryKey(country));
                        setRegion(region);
                        setTestCountry(country);
                        setTestRegion(region);
                        console.log(results[0]);
                        console.log(region);
                    } else {
                        setLocation('Podgorica, Crna Gora');
                    }
                } else {
                    setLocation('Podgorica, Crna Gora');
                }
            });
        }
    };

    const regionMapping = {
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
    
};

function getSerbianRegionKey(string) {
    const normalizedString = string.toLowerCase();

    // Удаляем слово "okrug" или "округ" из строки для упрощения сопоставления
    const cleanedString = normalizedString.replace(/\bokrug\b|\bокруг\b/g, '').trim();
    if (regionMapping[cleanedString]) {
        return regionMapping[cleanedString];
    }

    return "unknown_region";
}

const extractCountryAndRegion = (geocodeResult) => {
    let country = '';
    let region = '';
    let extRegion = '';

    // First pass to extract the country
    geocodeResult.address_components.forEach(component => {
        if (component.types.includes('country')) {
            country = component.long_name;
        }
    });

    geocodeResult.address_components.forEach(component => {
        if (country.toLowerCase().includes('bosnia') || 
            country.toLowerCase().includes('босния') || 
            country.toLowerCase().includes('bosna')) {
            
            if (component.types.includes('administrative_area_level_2')) {
                region = getRegionKey(component.long_name);
                extRegion = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')  && !region) {
                region = getRegionKey(component.long_name);
            } else {
                console.log('No matching administrative area found.');
            }
            
        }
    else if ((component.types.includes('administrative_area_level_1') || component.types.includes('administrative_area_level_2') || component.types.includes('locality')) && !(country.toLowerCase().includes('bosnia') || country.toLowerCase().includes('босния') || country.toLowerCase().includes('bosna'))) {
            region = getRegionKey(component.long_name);
            extRegion = component.long_name;

            if (country.includes('Сербия') || country.includes('Serbia') || country.includes('Србиja')) {
                const mappedRegion = getSerbianRegionKey(component.long_name);
                if (mappedRegion !== "unknown_region") {
                    region = mappedRegion;
                }
            }
        } 
    });

    return { country, region, extRegion };
};

    const regionChoice = lservice.getRegionChoice(t);

    return (
    <div>
        <div style={containerStyle}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={coordinates}
                zoom={10}
                onLoad={onLoad}
                onDragEnd={onDragEnd}
            />
            <img
                src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                alt="marker"
                style={markerStyle}
            />
        </div>

        <Form.Item
            label={t('region')}
            name="region"
            rules={[{ required: true, message: 'Please select a region!' }]}
        >
            <RegionSelector region={testRegion} setRegion={setTestRegion} country={testCountry} setCountry={setTestCountry}></RegionSelector>
        </Form.Item>

    </div>
);

};

const ClothesForm = ({
    title, setTitle,
    price, setPrice,
    size, setSize,
    brand, setBrand,
    type, setType,
    condition, setCondition,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleSubmit, handleFileChange,
    setCoordinates, coordinates,
    setLocation, location,
    setCountry, setRegion,
    currency, setCurrency,
    loading
}) => {
    const { t } = useTranslation();
    const { Option } = Select;
    const mapRef = useRef(null);

    const [form] = Form.useForm();
    const [testRegion, setTestRegion] = useState('Podgorica');
    const [testCountry, setTestCountry] = useState('Crna Gora');
    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            handleSubmit(values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [options, setOptions] = useState([]);


    const handlePreview = async (file) => {
        setPreviewImage(file.thumbUrl);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

    const suggestionCache = {}; // Initialize a cache object

    const fetchSuggestions = async (value) => {
        // Avoid fetching if input is too short
        if (value.length < 3) return;

        // Check cache for existing results
        if (suggestionCache[value]) {
            setOptions(suggestionCache[value]); // Use cached data if available
            return;
        }

        try {
            const apiKey = 'AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU';
            const url = "https://places.googleapis.com/v1/places:searchText";
            const headers = {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.formattedAddress,places.addressComponents,places.location',
            };

            const body = JSON.stringify({ textQuery: value });

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.status === 200) {
                const data = await response.json();
                const places = data.places;

                if (places && places.length > 0) {
                    const mappedOptions = places.map(place => ({
                        label: place.formattedAddress || "Unknown address",
                        value: place.formattedAddress || "Unknown address",
                        address_components: place.addressComponents,
                        location: place.location
                    }));
                    
                    // Cache the results
                    suggestionCache[value] = mappedOptions;
                    
                    // Update the options with the fetched data
                    setOptions(mappedOptions);
                } else {
                    console.log("No places found");
                }
            } else {
                throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
            }
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    const debounceFetchSuggestions = debounce(fetchSuggestions, 1000);

    const handleSelect = async (value) => {
    const selectedPlace = options.find(option => option.value === value);
    
    if (selectedPlace) {
        const { location } = selectedPlace;
        if (location && location.latitude !== undefined && location.longitude !== undefined) {
            const newCoordinates = {
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
            };
            const geoPoint = new GeoPoint(newCoordinates.lat, newCoordinates.lng);
            setCoordinates(newCoordinates);
            setLocation(value);

            if (mapRef.current) {
                mapRef.current.panTo(newCoordinates);
            }

            try {
                const geocodeData = await fetchGeocodingData(newCoordinates.lat, newCoordinates.lng);
                if (geocodeData) {
                    const { country, region } = extractCountryAndRegion(geocodeData);
                    setTestCountry(getCountryKey(country));
                    setTestRegion(getRegionKey(region));
                    setCountry(getCountryKey(country));
                    setRegion(getRegionKey(region));
                } else {
                    console.warn('Geocoding API не вернул данных.');
                }
            } catch (error) {
                console.error('Ошибка при вызове Geocoding API:', error);
            }
        } else {
            console.error('Invalid coordinates received:', selectedPlace);
        }
    }
};

const fetchGeocodingData = async (lat, lng) => {
    const apiKey = 'AIzaSyA0JYzidakTvQYEe0pS50vshlex2Q4jg4g';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    
    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        if (data.status === 'OK' && data.results.length > 0) {
            return data.results[0];
        }
    }
    return null;
};

const regionMapping = {
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
    
};

function getSerbianRegionKey(string) {
    const normalizedString = string.toLowerCase();

    // Удаляем слово "okrug" или "округ" из строки для упрощения сопоставления
    const cleanedString = normalizedString.replace(/\bokrug\b|\bокруг\b/g, '').trim();
    if (regionMapping[cleanedString]) {
        return regionMapping[cleanedString];
    }

    return "unknown_region";
}

const extractCountryAndRegion = (geocodeResult) => {
    let country = '';
    let region = '';
    let extRegion = '';

    geocodeResult.address_components.forEach(component => {
        if (component.types.includes('country')) {
            country = component.long_name;
        }
    });

    geocodeResult.address_components.forEach(component => {
        if (country.toLowerCase().includes('bosnia') || 
            country.toLowerCase().includes('босния') || 
            country.toLowerCase().includes('bosna')) {
            
            if (component.types.includes('administrative_area_level_2')) {
                region = getRegionKey(component.long_name);
                extRegion = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')  && !region) {
                region = getRegionKey(component.long_name);
                extRegion = component.long_name;
            } else {
                console.log('No matching administrative area found.');
            }
        }
    else if ((component.types.includes('administrative_area_level_1') || component.types.includes('administrative_area_level_2') || component.types.includes('locality')) && !(country.toLowerCase().includes('bosnia') || country.toLowerCase().includes('босния') || country.toLowerCase().includes('bosna'))) {
            region = getRegionKey(component.long_name);
            extRegion = component.long_name;
            if (country.includes('Сербия') || country.includes('Serbia') || country.includes('Србиja')) {
                const mappedRegion = getSerbianRegionKey(component.long_name);
                if (mappedRegion !== "unknown_region") {
                    region = mappedRegion;
                }
            }
        } 
    });

    return { country, region, extRegion };
};

    const selectAfter = (
        <Select defaultValue={t('currency')} style={{ width: 120 }} onChange={(value) => setCurrency(value)}>
            <Option value="eur">€</Option>
            <Option value="rsd">RSD</Option>
        </Select>
    );

    return (
        <LoadScript googleMapsApiKey="AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU">
            <div>
                <Form
                    form={form}
                    className='mt-3'
                    layout="vertical"
                >
                    <Form.Item
                        label={t('title')}
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label={t('type')}
                        name="type"
                        rules={[{ required: true, message: 'Please input the type!' }]}
                    >
                        <Select
                            aria-label="Default select example"
                            showSearch
                            value={type}
                            onChange={(value) => setType(value)}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="outwear">{t('outwear')}</Option>
                            <Option value="hats">{t('hats')}</Option>
                            <Option value="accessories">{t('accessories')}</Option>
                            <Option value="homewear">{t('homewear')}</Option>
                            <Option value="underwear">{t('underwear')}</Option>
                            <Option value="shoes">{t('shoes')}</Option>
                            <Option value="jackets_and_suits">{t('jackets_and_suits')}</Option>
                            <Option value="shirts">{t('shirts')}</Option>
                            <Option value="Steam sweaters_and_hoodies">{t('sweaters_and_hoodies')}</Option>
                            <Option value="Nvidia workwear">{t('workwear')}</Option>
                            <Option value="sportswear">{t('sportswear')}</Option>
                            <Option value="t_shirts_and_polos">{t('t_shirts_and_polos')}</Option>
                            <Option value="pants_and_shorts">{t('pants_and_shorts')}</Option>
                            <Option value="rest">{t('rest')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={t('price')}
                        name='prie'
                        rules={[
                            { required: true, message: 'Please input the price!' },
                            {
                                validator: (_, value) => {
                                    if (!value || value <= 0) {
                                        return Promise.reject(new Error('Price must be greater than zero!'));
                                    }
                                    if (!currency) {
                                        return Promise.reject(new Error('Please select a currency!'));
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} value={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} defaultValue={1} />
                    </Form.Item>
                    <Form.Item
                        label={t('size')}
                        name="size"
                        rules={[{ required: true, message: 'Please select the size!' }]}
                    >
                        <Select value={size} onChange={(value) => setSize(value)}>
                            <Option value="XXS">XXS</Option>
                            <Option value="XS">XS</Option>
                            <Option value="S">S</Option>
                            <Option value="M">M</Option>
                            <Option value="L">L</Option>
                            <Option value="XL">XL</Option>
                            <Option value="XXL">XXL</Option>
                            <Option value="XXXL">XXXL</Option>
                            <Option value="4XL">4XL</Option>
                            <Option value="5XL">5XL</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('brand')}>
                        <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label={t('condition')}
                        name='condition'
                        rules={[{ required: true, message: 'Please input the condition!' }]}
                    >
                        <Select value={condition} onChange={(value) => setCondition(value)}>
                            <Option value="new_cond">{t('new_cond')}</Option>
                            <Option value="bu_cond">{t('bu_cond')}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={t('phone_number')}>
                        <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Form.Item>
                    <Form.Item label={t('description')}>
                        <Input.TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>

                    <Form.Item label={t('photos')}>
                        <Upload
                            multiple
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={file => {
                                handleFileChange(file);
                                return false;
                            }}
                        >
                            {fileList.length >= 8 ? null :
                                <button
                                    style={{
                                        border: 0,
                                        background: 'none',
                                    }}
                                    type="button"
                                >
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        Upload
                                    </div>
                                </button>
                            }
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>

                    <Form.Item label={t('coordinates')}>
                        <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setRegion={setRegion} setCountry={setCountry} setLocation={setLocation} mapRef={mapRef} setTestCountry={setTestCountry} setTestRegion={setTestRegion} testCountry={testCountry} testRegion={testRegion} />
                    </Form.Item>

                    <Form.Item label={t('location_name')}>
                        <AutoComplete
                            options={options}
                            onSearch={debounceFetchSuggestions}
                            onSelect={handleSelect}
                            placeholder="Search location"
                            value={location} // Set the value to the selected location name
                            onChange={(value) => setLocation(value)} // Handle input changes
                        >
                            <Input />
                        </AutoComplete>
                        
                    </Form.Item>



                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spin style={{color: '#03989F'}} spinning={loading}>
                            <Button type="primary" onClick={onSubmit} size='large' style={{ backgroundColor: '#FFBF34', width: '150px' }}>
                                {t('add')}
                            </Button>
                        </Spin>
                    </Form.Item>
                </Form>
            </div>
        </LoadScript>
    );
}

export default ClothesForm;