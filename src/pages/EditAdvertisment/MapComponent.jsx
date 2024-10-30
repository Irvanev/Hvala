import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { GeoPoint } from 'firebase/firestore';
import LocationService from '../../services/LocationService.js';

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

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const locationService = new LocationService();

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
        if (string.includes("Unsko-sanski") || string.includes("Унско-Санский") || string.includes("Уна-Санский") || string.includes("Una-Sana")) {
            return "una_sana_canton";
        } else if (string.includes("Posavina") || string.includes("Посавский")) {
            return "posavina_canton";
        } else if (string.includes("Tuzla") || string.includes("Тузланский")) {
            return "tuzla_canton";
        } else if (string.includes("Zenica-Doboj") || string.includes("Зеничко-Добойский")) {
            return "zenica_doboj_canton";
        } else if (string.includes("Bosnian-Podrinje") || string.includes("Боснийско-Подринский")) {
            return "bosnian_podrinje_canton_gorazde";
        } else if (string.includes("Central Bosnia") || string.includes("Центрально-Боснийский")) {
            return "central_bosnia_canton";
        } else if (string.includes("Herzegovina-Neretva") || string.includes("Герцеговинско-Неретванский")) {
            return "herzegovina_neretva_canton";
        } else if (string.includes("West Herzegovina") || string.includes("Западно-Герцеговинский")) {
            return "west_herzegovina_canton";
        } else if (string.includes("Sarajevo") || string.includes("Кантон Сараево")) {
            return "sarajevo_canton";
        } else if (string.includes("Banja Luka") || string.includes("Баня-Лука")) {
            return "banja_luka";
        } else if (string.includes("Bijeljina") || string.includes("Биелина")) {
            return "bijeljina";
        } else if (string.includes("Doboj") || string.includes("Добой")) {
            return "doboj";
        } else if (string.includes("Prijedor") || string.includes("Прийедор")) {
            return "prijedor";
        } else if (string.includes("Istočno Sarajevo") || string.includes("Источно Сараево")) {
            return "istocno_sarajevo";
        } else if (string.includes("Trebinje") || string.includes("Требинье")) {
            return "trebinje";
        } else if (string.includes("Brčko") || string.includes("Брчко")) {
            return "brcko";
        } else if (string.includes("Canton 10") || string.includes("Кантон 10")) {
            return "canton_10";
        } else if (string.includes("Podgorica") || string.includes("Подгорица")) {
            if (string.includes("Municipality")) {
                return "municipality_podgorica";
            } else if (string.includes("Capital City") || string.includes("град")) {
                return "glavni_grad_podgorica";
            }
        } else if (string.includes("Danilovgrad") || string.includes("Даниловград")) {
            return "municipality_danilovgrad";
        } else if (string.includes("Cetinje") || string.includes("Цетине")) {
            return "municipality_cetinje";
        } else if (string.includes("Budva") || string.includes("Будва")) {
            return "municipality_budva";
        } else if (string.includes("Bar") || string.includes("Бар")) {
            return "municipality_bar";
        } else if (string.includes("Herceg Novi") || string.includes("Герцег-Нови")) {
            return "municipality_herceg_novi";
        } else if (string.includes("Kotor") || string.includes("Котор")) {
            return "municipality_kotor";
        } else if (string.includes("Tivat") || string.includes("Тиват")) {
            return "municipality_tivat";
        } else if (string.includes("Ulcinj") || string.includes("Улцинь")) {
            return "municipality_ulcinj";
        } else if (string.includes("Pljevlja") || string.includes("Плевля")) {
            return "municipality_pljevlja";
        } else if (string.includes("Bijelo Polje") || string.includes("Бижело Поле")) {
            return "municipality_bijelo_polje";
        } else if (string.includes("Zabljak") || string.includes("Жабляк")) {
            return "municipality_zabljak";
        } else if (string.includes("Kolasin") || string.includes("Колашин")) {
            return "municipality_kolasin";
        } else if (string.includes("Mojkovac") || string.includes("Мойковац")) {
            return "municipality_mojkovac";
        } else if (string.includes("Berane") || string.includes("Берне")) {
            return "municipality_berane";
        } else if (string.includes("Andrijevica") || string.includes("Андриевица")) {
            return "municipality_andrijevica";
        } else if (string.includes("Plav") || string.includes("Плав")) {
            return "municipality_plav";
        } else if (string.includes("Rozaje") || string.includes("Рожае")) {
            return "municipality_rozaje";
        } else if (string.includes("Niksic") || string.includes("Никшич")) {
            return "municipality_niksic";
        } else if (string.includes("Savnik") || string.includes("Шавник")) {
            return "municipality_savnik";
        } else if (string.includes("Pluzine") || string.includes("Плужине")) {
            return "municipality_pluzine";
        } else if (string.includes("Gusinje") || string.includes("Гусиње")) {
            return "municipality_gusinje";
        } else if (string.includes("Petrovac") || string.includes("Петровац")) {
            return "municipality_petrovac";
        } else if (string.includes("Tuzi") || string.includes("Тузи")) {
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
        } else if (string.includes("Zagreb City") || string.includes("Град Загреб")) {
            return "zagreb_city";
        } else if (string.includes("Zagreb County") || string.includes("Загребская")) {
            return "zagreb_county";
        } else if (string.includes("Split-Dalmatia") || string.includes("Сплитско-Далматинская")) {
            return "split_dalmatia";
        } else if (string.includes("Istria") || string.includes("Истарская")) {
            return "istria";
        } else if (string.includes("Primorje-Gorski Kotar") || string.includes("Приморско-Горанская")) {
            return "primorje_gorski_kotar";
        } else if (string.includes("Lika-Senj") || string.includes("Лика-Сень")) {
            return "lika_senj";
        } else if (string.includes("Virovitica-Podravina") || string.includes("Вировитицко-Подравская")) {
            return "virovitica_podravina";
        } else if (string.includes("Požega-Slavonia") || string.includes("Пожешко-Славонская")) {
            return "pozega_slavonia";
        } else if (string.includes("Brod-Posavina") || string.includes("Бродско-Посавская")) {
            return "brod_posavina";
        } else if (string.includes("Zadar") || string.includes("Задар")) {
            return "zadar";
        } else if (string.includes("Osijek-Baranja") || string.includes("Осиечко-Бараньская")) {
            return "osijek_baranja";
        } else if (string.includes("Sisak-Moslavina") || string.includes("Сисачко-Мославинская")) {
            return "sisak_moslavina";
        } else if (string.includes("Koprivnica-Križevci") || string.includes("Копривницко-Крижевечка")) {
            return "koprivnica_krizevci";
        } else if (string.includes("Bjelovar-Bilogora") || string.includes("Бьеловарско-Билогорская")) {
            return "bjelovar_bilogora";
        } else if (string.includes("Karlovac") || string.includes("Карловацкая")) {
            return "karlovac";
        } else if (string.includes("Varaždin") || string.includes("Вараждинская")) {
            return "varazdin";
        } else if (string.includes("Krapina-Zagorje") || string.includes("Крапинско-Загорская")) {
            return "krapina_zagorje";
        } else if (string.includes("Međimurje") || string.includes("Меджимурская")) {
            return "medimurje";
        } else if (string.includes("Šibenik-Knin") || string.includes("Шибенско-Книнская")) {
            return "sibenik_knin";
        } else if (string.includes("Vukovar-Srijem") || string.includes("Вуковарско-Сремская")) {
            return "vukovar_srijem";
        } else if (string.includes("Dubrovnik-Neretva") || string.includes("Дубровачко-Неретванская")) {
            return "dubrovnik_neretva";
        } else {
            return "municipality_budva";
        }
    }

const getLatLng = (geoPoint) => ({
    lat: geoPoint._lat,
    lng: geoPoint._long
});

export const MapComponent = ({ coordinates, setCoordinates, setCountry, setRegion, setLocation, mapRef, testRegion, setTestRegion, testCountry, setTestCountry }) => {

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        const modCoordinates = {
            lat: coordinates.latitude,
            lng: coordinates.longitude
        }
        const latLng = modCoordinates ? modCoordinates : defaultCenter;
        console.log(modCoordinates);
        console.log(coordinates);
        if (latLng.lat && latLng.lng) {
            console.log("Pan to:", latLng);
            map.panTo(latLng);
        } else {
            console.error("Invalid coordinates:", latLng);
            map.panTo(defaultCenter);
        }
    }, [coordinates]);

    const { t } = useTranslation();

    const onDragEnd = async () => {
        if (mapRef.current) {
            const newCenter = mapRef.current.getCenter();
            const newCoordinates = {
            lat: newCenter.lat(),
            lng: newCenter.lng()
        };

        const geoPoint = new GeoPoint(newCenter.lat(), newCenter.lng());

        // Save the LatLng object
        setCoordinates(newCoordinates); // Save LatLng object

            // Fetch the address using Geocoding API
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newCoordinates }, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;
                        const formattedAddress = results[0].formatted_address;

                        console.log(results[0]);

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

                        console.log(addressComponents);
                        const { country, region, extRegion } = locationService.extractCountryAndRegion(results[0]);
                        setLocation(formattedAddress);  // Update the AutoComplete field
                        setCountry(locationService.getCountryKey(country));
                        setRegion(region);
                        setTestCountry(country);
                        setTestRegion(extRegion);
                    } else {
                        setLocation('Podgorica, Crna Gora');
                    }
                } else {
                    setLocation('Podgorica, Crna Gora');
                }
            });
        }
    };

    return (
        <LoadScript async googleMapsApiKey="AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU">
            <div style={containerStyle}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={getLatLng(coordinates) || defaultCenter}
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
            <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={12}>
                <strong>{t('region')}:</strong> {testRegion ?? "Podgorica"}
            </Col>
            <Col span={12}>
                <strong>{t('country')}:</strong> {testCountry ?? "Crna Gora"}
            </Col>
        </Row>
        </LoadScript>
    );
};
