import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db, auth } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MyNavbar } from "../../components/Navbar/Navbar";
import CategorySelect from '../../pages/EditAdvertisment/CategorySelect';
import BuildingMaterial from './BuildingMaterial';
import Clothes from './Clothes';
import Electronics from './Electronics';
import HouseGoods from './HouseGoods';
import TransportGoods from './TransportGoods';
import HomeAppliance from './HomeAppliance';
import Service from './Service';
import HealthBeauty from './HealthBeauty';
import Sport from './Sport';
import HobbyRelax from './HobbyRelax';
import ChildGoods from './ChildGoods';
import Estate from './Estate';
import Transport from './Transport';
import { message } from 'antd';
import React, { useState, useRef, useEffect } from "react";
import { Form, Input, AutoComplete, Button, Select, InputNumber, Spin } from 'antd';
import { LoadScript } from '@react-google-maps/api';
import debounce from 'lodash.debounce';
import { GeoPoint } from 'firebase/firestore';
import { MapComponent } from "./MapComponent";
import { NavBarBack } from "../../components/Navbar/NavBarBack";
import SelectTypesForClothes from "../../components/select-types/select-types-clothes/SelectTypesForClothes";
import PhotoUpload from "./PhotoUpload";
import SaveButton from "./SaveButton";

const { Option } = Select;
const { TextArea } = Input;


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




function EditItem() {
    const { t } = useTranslation();
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currency, setCurrency] = useState('');
    const [photoUrls, setPhotoUrls] = useState([]);

    const [condition, setCondition] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [screen_size, setScreenSize] = useState('');
    const [memory, setMemory] = useState('');

    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [owner, setOwner] = useState('');
    const [roomsAmout, setRoomsAmount] = useState('');

    const [size, setSize] = useState('');

    const [mileage, setMileage] = useState('');
    const [drive, setDrive] = useState(''); // привод
    const [transmission, setTransmission] = useState(''); // трансмиссия
    const [wheel, setWheel] = useState(''); // руль
    const [year, setYear] = useState(''); // год выпуска
    const [body, setBody] = useState(''); // кузов
    const [color, setColor] = useState('');
    const [owners, setOwners] = useState(''); // кол-во владельцев

    const [coordinates, setCoordinates] = useState('');
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [options, setOptions] = useState([]);

    const selectAfter = (
        <Select defaultValue={t('currency')} value={currency} style={{ width: 120 }} onChange={(value) => setCurrency(value)}>
            <Option value="eur">€</Option>
            <Option value="rsd">RSD</Option>
        </Select>
    );

    const fetchSuggestions = async (value) => {
        try {
            const apiKey = 'AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU';
            const url = "https://places.googleapis.com/v1/places:searchText";
            const headers = {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.*',
            };
            const body = JSON.stringify({ textQuery: value });

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            console.log(response);
            console.log("HI-THERE");

            if (response.status === 200) {
                const data = await response.json();
                const places = data.places;
                if (places && places.length > 0) {
                    setOptions(places.map(place => ({
                        label: place.formattedAddress,  // Extract text from displayName object
                        value: place.formattedAddress,
                        address_components: place.addressComponents,
                        f: place.location
                    })));
                } else {
                    console.log("No places found");
                }
            } else {
                throw new Error("Failed to fetch suggestions: ${response.statusText}");
            }
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    const debounceFetchSuggestions = debounce(fetchSuggestions, 300);

    const mapRef = useRef(null);

    const handleSelect = async (value) => {
        console.log(value);
        console.log("HERE");
        const selectedPlace = options.find(option => option.value === value);

        if (selectedPlace) {
            const longitude = selectedPlace.f.longitude;
            const latitude = selectedPlace.f.latitude;

            if (latitude !== undefined && longitude !== undefined) {
                const newCoordinates = {
                    lat: parseFloat(latitude),
                    lng: parseFloat(longitude),
                };
                const geoPoint = new GeoPoint(newCoordinates.lat, newCoordinates.lng);
                setCoordinates(geoPoint);
                setLocation(value);

                if (mapRef.current) {
                    mapRef.current.panTo(newCoordinates);
                }
                console.log(latitude, longitude);

                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: newCoordinates }, (results, status) => {
                    if (status === 'OK' && results.length > 0) {
                        const addressComponents = results[0].address_components;
                        let country = '';
                        let region = '';

                        addressComponents.forEach(component => {
                            if (component.types.includes('country')) {
                                country = component.long_name;
                            }
                            if (component.types.includes('administrative_area_level_1')) {
                                region = component.long_name;
                            }
                            if (region === '' && component.types.includes('locality')) {
                                region = component.long_name
                            }
                        });

                        setCountry(getCountryKey(country));
                        setRegion(getRegionKey(region));

                        console.log('Address Components:', addressComponents);
                        console.log('Country:', country);
                        console.log('Region:', region);
                        console.log('Selected Value:', value);
                        console.log('New Coordinates:', newCoordinates);
                        console.log('----');
                    } else {
                        console.error('Geocoder failed due to: ' + status);
                        setCountry(getCountryKey(country));
                        setRegion(getRegionKey(region));
                    }
                });
            } else {
                console.error('Invalid coordinates received:', selectedPlace);
                setCountry(getCountryKey(country));
                setRegion(getRegionKey(region));
            }
        } else {
            console.error('Selected place not found:', value);
        }
    };

    const handlePhotoUrlsChange = (newPhotoUrls) => {
        setPhotoUrls(newPhotoUrls);
    };


    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        const validPhotoUrls = photoUrls.filter(url => url !== undefined);

        const docRef = doc(db, "advertisment", id);

        const updatedData = {
            from_uid: auth.currentUser.uid,
            title: title,
            price: price,
            currency: currency,
            phone: phoneNumber,
            description: description,
            photoUrls: validPhotoUrls,
            category: category,
            subcategory: subcategory,
            condition: condition,
            brand: brand,
            model: model,
            screen_size: screen_size,
            memory: memory,
            owner: owner,
            owners: owners,
            year: year,
            body: body,
            color: color,
            wheel: wheel,
            transmission: transmission,
            drive: drive,
            mileage: mileage,
            size: size,
            roomsAmout: roomsAmout,
            type: type,
            area: area,
            location: location,
            coordinates: coordinates,
            country: country,
            region: region
        };

        try {
            // Если категория является услугой, удалите поле condition !TODO
            if (subcategory === 'education' || subcategory === 'handyman' ||
                subcategory === 'beauty_and_health' || subcategory === 'transportation' ||
                subcategory === 'repair_and_construction' || subcategory === 'computer_services' ||
                subcategory === 'business_services' || subcategory === 'cleaning' ||
                subcategory === 'automotive_services' || subcategory === 'appliance_repair' ||
                subcategory === 'event_planning' || subcategory === 'photography_and_videography' ||
                subcategory === 'custom_manufacturing' || subcategory === 'pet_care' ||
                subcategory === 'car_seats' || subcategory === 'health_and_care' ||
                subcategory === 'toys_and_games' || subcategory === 'strollers' ||
                subcategory === 'feeding_and_nutrition' || subcategory === 'bathing' ||
                subcategory === 'nursery' || subcategory === 'diapers_and_potties' ||
                subcategory === 'baby_monitors' || subcategory === 'maternity_products' ||
                subcategory === 'schoold_supplies' || subcategory === 'makeup' ||
                subcategory === 'manicure_and_pedicure' || subcategory === 'healthcare_products' ||
                subcategory === 'perfume' || subcategory === 'skincare' ||
                subcategory === 'haircare' || subcategory === 'tattoos_and_tatooing' ||
                subcategory === 'tanning_and_sunbeds' || subcategory === 'personal_hygiene_products') {
                await updateDoc(docRef, {
                    ...updatedData,
                    condition: deleteField(),
                    brand: deleteField(),
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'furniture' || subcategory === 'lighting' ||
                subcategory === 'dishes' || subcategory === 'garden_equipment' ||
                subcategory === 'domestic_cleaning' || subcategory === 'kitchen_equipment' ||
                subcategory === 'other_cat' || subcategory === 'tools' ||
                subcategory === 'building_materials' || subcategory === 'heating_and_ventilation' ||
                subcategory === 'plumbing' || subcategory === 'electrics' ||
                subcategory === 'windows' || subcategory === 'doors' ||
                subcategory === 'spares' || subcategory === 'tires_and_wheels' ||
                subcategory === 'accessories_and_tools' || subcategory === 'sports_protections' ||
                subcategory === 'bicycles' || subcategory === 'scooters' ||
                subcategory === 'skateboards' || subcategory === 'hoverboards_and_electric_scooters' ||
                subcategory === 'ball_games' || subcategory === 'hunting_and_fishing' ||
                subcategory === 'tourism_and_outdoor_recreation' || subcategory === 'billiards_and_bowling' ||
                subcategory === 'tennis_and_badminton' || subcategory === 'exercise_equipment_and_fitness' ||
                subcategory === 'sports_nutrition' || subcategory === 'water_sports' ||
                subcategory === 'sapboards' || subcategory === 'table_games' ||
                subcategory === 'computer_games' || subcategory === 'books_n_magazines' ||
                subcategory === 'tickets' || subcategory === 'collections' ||
                subcategory === 'art_materials' || subcategory === 'music' ||
                subcategory === 'music_tools') {
                await updateDoc(docRef, {
                    ...updatedData,
                    brand: deleteField(),
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'phones_and_tablets') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                });
            }
            if (subcategory === 'tv') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'game_console' || subcategory === 'photo_video') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'computers') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'computer_accessories') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'auto' || subcategory === 'moto' || subcategory === 'water_transport') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'sale_estate' || subcategory === 'rent_estate') {
                await updateDoc(docRef, {
                    ...updatedData,
                    condition: deleteField(),
                    brand: deleteField(),
                    size: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'mens_clothing' || subcategory === 'womens_clothing' || subcategory === 'childrens_clothing') {
                await updateDoc(docRef, {
                    ...updatedData,
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'refrigerators' || subcategory === 'washing_machines' || subcategory === 'vacuum_cleaners' ||
                subcategory === 'stoves_and_ovens' || subcategory === 'sewing_equipment' || subcategory === 'food_preparation' ||
                subcategory === 'dishwasher') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });

            }

            else {
                await updateDoc(docRef, updatedData);
                setLoading(false);
            }
            const localStorageKey = `advertisment_${id}`;
            localStorage.setItem(localStorageKey, JSON.stringify(updatedData));

            console.log("Document successfully updated!");
            history.push('/profile');
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const docRef = doc(db, "advertisment", id);
    //             const docSnap = await getDoc(docRef);

    //             if (docSnap.exists()) {
    //                 const data = docSnap.data();
    //                 if (auth.currentUser && auth.currentUser.uid === data.from_uid) {
    //                     setData(data);
    //                     setPhotoUrls(data?.photoUrls || [])
    //                     setCategory(data?.category||"");
    //                     setSubcategory(data?.subcategory||"");
    //                     setTitle(data?.title||"");
    //                     setPrice(data?.price||"");
    //                     setDescription(data?.description||"");
    //                     setPhoneNumber(data?.phone||"");
    //                     setCondition(data?.condition||"");
    //                     setCurrency(data.currency||"");
    //                     setBrand(data?.brand||"");
    //                     setModel(data?.model||"");
    //                     setScreenSize(data?.screen_size||"");
    //                     setMemory(data?.memory||"");
    //                     setOwner(data?.owner||"");
    //                     setType(data?.type||"");
    //                     setArea(data?.area||"");
    //                     setMileage(data?.mileage||"");
    //                     setDrive(data?.drive||"");
    //                     setTransmission(data?.transmission||"");
    //                     setWheel(data?.wheel||"");
    //                     setYear(data?.year||"");
    //                     setBody(data?.body||"");
    //                     setColor(data?.color||"");
    //                     setOwners(data?.owners||"");
    //                     setSize(data?.size||"");
    //                     setLocation(data?.location||"");
    //                     setCoordinates(data?.coordinates||"");
    //                     console.log("Document data:", data);
    //                     console.log("FETCHING");
    //                 } else {
    //                     setData(null);
    //                     message.error('Объявление принадлежит не этому пользвателю');
    //                     console.log("FETCHING");
    //                 }
    //             } else {
    //                 console.log("No such document!");
    //                 console.log("FETCHING");
    //             }
    //         } catch (error) {
    //             console.error('Ошибка при получении данных:', error);
    //             console.log("FETCHING");
    //         }
    //     };

    //     fetchData();
    //     console.log("FETCHING--");
    // }, [id]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const localStorageKey = `advertisment_${id}`;
            const cachedData = localStorage.getItem(localStorageKey);
            if (cachedData) {
                const data = JSON.parse(cachedData);
                console.log(data.from_uid);
                console.log(auth.currentUser.uid);
                if (auth.currentUser && auth.currentUser.uid === data.from_uid) {
                    setData(data);
                    setPhotoUrls(data?.photoUrls || []);
                    setCategory(data?.category || "");
                    setSubcategory(data?.subcategory || "");
                    setTitle(data?.title || "");
                    setPrice(data?.price || "");
                    setDescription(data?.description || "");
                    setPhoneNumber(data?.phone || "");
                    setCondition(data?.condition || "");
                    setCurrency(data.currency || "");
                    setBrand(data?.brand || "");
                    setModel(data?.model || "");
                    setScreenSize(data?.screen_size || "");
                    setMemory(data?.memory || "");
                    setOwner(data?.owner || "");
                    setType(data?.type || "");
                    setArea(data?.area || "");
                    setMileage(data?.mileage || "");
                    setDrive(data?.drive || "");
                    setTransmission(data?.transmission || "");
                    setWheel(data?.wheel || "");
                    setYear(data?.year || "");
                    setBody(data?.body || "");
                    setColor(data?.color || "");
                    setOwners(data?.owners || "");
                    setSize(data?.size || "");
                    setLocation(data?.location || "");
                    setCoordinates(data?.coordinates || "");
                    console.log("Document data from cache:", data);
                } else {
                    setData(null);
                    message.error('Объявление принадлежит не этому пользователю');
                    console.log("FETCHING from cache");
                }
            } else {
                const docRef = doc(db, "advertisment", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    localStorage.setItem(localStorageKey, JSON.stringify(data));
                        setData(data);
                        setPhotoUrls(data?.photoUrls || []);
                        setCategory(data?.category || "");
                        setSubcategory(data?.subcategory || "");
                        setTitle(data?.title || "");
                        setPrice(data?.price || "");
                        setDescription(data?.description || "");
                        setPhoneNumber(data?.phone || "");
                        setCondition(data?.condition || "");
                        setCurrency(data.currency || "");
                        setBrand(data?.brand || "");
                        setModel(data?.model || "");
                        setScreenSize(data?.screen_size || "");
                        setMemory(data?.memory || "");
                        setOwner(data?.owner || "");
                        setType(data?.type || "");
                        setArea(data?.area || "");
                        setMileage(data?.mileage || "");
                        setDrive(data?.drive || "");
                        setTransmission(data?.transmission || "");
                        setWheel(data?.wheel || "");
                        setYear(data?.year || "");
                        setBody(data?.body || "");
                        setColor(data?.color || "");
                        setOwners(data?.owners || "");
                        setSize(data?.size || "");
                        setLocation(data?.location || "");
                        setCoordinates(data?.coordinates || "");
                        console.log("Document data from DB:", data);
                    // if (auth.currentUser && auth.currentUser.uid === data.from_uid) {
                    //     localStorage.setItem(localStorageKey, JSON.stringify(data));
                    //     setData(data);
                    //     setPhotoUrls(data?.photoUrls || []);
                    //     setCategory(data?.category || "");
                    //     setSubcategory(data?.subcategory || "");
                    //     setTitle(data?.title || "");
                    //     setPrice(data?.price || "");
                    //     setDescription(data?.description || "");
                    //     setPhoneNumber(data?.phone || "");
                    //     setCondition(data?.condition || "");
                    //     setCurrency(data.currency || "");
                    //     setBrand(data?.brand || "");
                    //     setModel(data?.model || "");
                    //     setScreenSize(data?.screen_size || "");
                    //     setMemory(data?.memory || "");
                    //     setOwner(data?.owner || "");
                    //     setType(data?.type || "");
                    //     setArea(data?.area || "");
                    //     setMileage(data?.mileage || "");
                    //     setDrive(data?.drive || "");
                    //     setTransmission(data?.transmission || "");
                    //     setWheel(data?.wheel || "");
                    //     setYear(data?.year || "");
                    //     setBody(data?.body || "");
                    //     setColor(data?.color || "");
                    //     setOwners(data?.owners || "");
                    //     setSize(data?.size || "");
                    //     setLocation(data?.location || "");
                    //     setCoordinates(data?.coordinates || "");
                    //     console.log("Document data from DB:", data);
                    // } else {
                    //     setData(null);
                    //     message.error('Объявление принадлежит не этому пользователю');
                    //     console.log("FETCHING from DB");
                    // }
                } else {
                    console.log("No such document!");
                    console.log("FETCHING from DB");
                }
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            console.log("FETCHING error");
        }
    };

    fetchData();
    console.log("FETCHING initiated");
}, [id]);


    const handleCategoryChange = (value) => {
        setCategory(value);
        setSubcategory('')
    }

    const handleSubcategoryChange = (value) => {
        setSubcategory(value);
    }

    const getSubcategories = () => {
        switch (category) {
            case 'building_materials_and_tools':
                return (<BuildingMaterial t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'clothes':
                return (<Clothes t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'electronics':
                return (<Electronics t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'house_goods':
                return (<HouseGoods t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'transport_goods':
                return (<TransportGoods t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'home_appliance':
                return (<HomeAppliance t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'service':
                return (<Service t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'health_and_beauty':
                return (<HealthBeauty t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'sport':
                return (<Sport t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'hobby_n_Relax':
                return (<HobbyRelax t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'child_goods':
                return (<ChildGoods t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'estate':
                return (<Estate t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            case 'transport':
                return (<Transport t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
            default:
                return <Option>{t('choce_subcategory')}</Option>;
        }
    }

    const getForm = () => {
        switch (subcategory) {
            case 'mens_clothing':
            case 'womens_clothing':
            case 'childrens_clothing':
                return (
                    <>
                        <LoadScript googleMapsApiKey="AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU">
                            <Form.Item className="mb-3">
                                <label>{t('title')}</label>
                                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                className="mb-3"
                                label={t('type')}
                            >
                                <SelectTypesForClothes type={type} setType={setType} />
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
                                <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
                            </Form.Item>
                            <Form.Item
                                className="mb-3"
                                label={t('size')}
                            >
                                <Select value={size} onChange={(value) => setSize(value)}>
                                    <Option value="">{t('size')}</Option>
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
                            <Form.Item
                                className="mb-3"
                                label={t('brand')}
                            >
                                <Input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                className="mb-3"
                                label={t('condition')}
                            >
                                <Select value={condition} onChange={(value) => setCondition(value)}>
                                    <Option value="new_cond">{t('new_cond')}</Option>
                                    <Option value="bu_cond">{t('bu_cond')}</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                className="mb-3"
                                label={t('phone_number')}
                            >
                                <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                className="mb-3"
                                label={t('description')}
                            >
                                <TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                className="mb-3"
                                label={t('photos')}
                            >
                                <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                            </Form.Item>
                        </LoadScript>
                    </>
                )
            case 'auto':
            case 'moto':
            case 'water_transport':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('choice_mark')}>
                            <Select
                                showSearch
                                value={brand}
                                onChange={(value) => setBrand(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Audi">Audi</Option>
                                <Option value="BMW">BMW</Option>
                                <Option value="Mersedes">Mersedes</Option>
                                <Option value="Porshe">Porshe</Option>
                                <Option value="Volvo">Volvo</Option>
                                <Option value="Volkswagen">Volkswagen</Option>
                                <Option value="Ford">Ford</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('input_model')}>
                            <Input type="tel" value={model} onChange={(e) => setModel(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} value={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item label={t('input_year')}>
                            <Input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('input_meleage')}>
                            <Input type="text" value={mileage} onChange={(e) => setMileage(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('choice_body')}>
                            <Select
                                showSearch
                                value={body}
                                onChange={(value) => setBody(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="sedan">{t('sedan')}</Option>
                                <Option value="hatchback">{t('hatchback')}</Option>
                                <Option value="station_wagon">{t('station_wagon')}</Option>
                                <Option value="coupe">{t('coupe')}</Option>
                                <Option value="convertible">{t('convertible')}</Option>
                                <Option value="crossover">{t('crossover')}</Option>
                                <Option value="suv_sport_utility_vehicle">{t('suv_sport_utility_vehicle')}</Option>
                                <Option value="pickup_truck">{t('pickup_truck')}</Option>
                                <Option value="minivan">{t('minivan')}</Option>
                                <Option value="Limousine">{t('Limousine')}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('enter_color')}>
                            <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('choce_transmission')}>
                            <Select value={transmission} onChange={(value) => setTransmission(value)}>
                                <Option value="manual_t">{t('manual_t')}</Option>
                                <Option value="auto_t">{t('auto_t')}</Option>
                                <Option value="semi_auto_t">{t('semi_auto_t')}</Option>
                                <Option value="dual_clutch_t">{t('dual_clutch_t')}</Option>
                                <Option value="continuously_t">{t('continuously_t')}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('choice_drive')}>
                            <Select value={drive} onChange={(value) => setDrive(value)}>
                                <Option value="fwd">{t('fwd')}</Option>
                                <Option value="rwd">{t('rwd')}</Option>
                                <Option value="awd">{t('awd')}</Option>
                                <Option value="four_wd">{t('four_wd')}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('choice_wheel')}>
                            <Select value={wheel} onChange={(value) => setWheel(value)}>
                                <Option value="left_hand_drive">{t('left_hand_drive')}</Option>
                                <Option value="right_hand_drive">{t('right_hand_drive')}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={t('choice_condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
                        >
                            <Select value={condition} onChange={(value) => setCondition(value)}>
                                <Option value="condition_new">{t('condition_new')}</Option>
                                <Option value="used">{t('used')}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('choice_customs')}>
                            <Input type="text" value={owners} onChange={(e) => setOwners(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('phone_number')}>
                            <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('description')}>
                            <Input.TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>

                    </Form>
                )
            case 'phones_and_tablets':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('brand')}>
                            <Select
                                showSearch
                                value={brand}
                                onChange={(value) => setBrand(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Samsung">Samsung</Option>
                                <Option value="Apple">Apple</Option>
                                <Option value="Xiaomi">Xiaomi</Option>
                                <Option value="Huawei">Huawei</Option>
                                <Option value="Honor">Honor</Option>
                                <Option value="HTC">HTC</Option>
                                <Option value="Oppo">Oppo</Option>
                                <Option value="Realme">Realme</Option>
                                <Option value="Nokia">Nokia</Option>
                                <Option value="OnePlus">OnePlus</Option>
                                <Option value="Acer">Acer</Option>
                                <Option value="Alcatel">Alcatel</Option>
                                <Option value="Asus">Asus</Option>
                                <Option value="LG">LG</Option>
                                <Option value="Meizu">Meizu</Option>
                                <Option value="Google">Google</Option>
                                <Option value="Oppo">Oppo</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('model')}>
                            <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
                        </Form.Item>
                        <Form.Item label={t('size_screen')}>
                            <Input type="text" value={screen_size} onChange={(e) => setScreenSize(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('memory')}>
                            <Input type="text" value={memory} onChange={(e) => setMemory(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'tv':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('brand')}>
                            <Select
                                showSearch
                                value={brand}
                                onChange={(value) => setBrand(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Samsung">Samsung</Option>
                                <Option value="Apple">LG</Option>
                                <Option value="Xiaomi">Xiaomi</Option>
                                <Option value="Huawei">Panasonic</Option>
                                <Option value="Honor">Philips</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('model')}>
                            <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item label={t('size_screen')}>
                            <Input type="tel" value={screen_size} onChange={(e) => setScreenSize(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'game_console':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('brand')}>
                            <Select
                                showSearch
                                value={brand}
                                onChange={(value) => setBrand(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Sony PlayStation">Sony PlayStation</Option>
                                <Option value="Microsoft Xbox">Microsoft Xbox</Option>
                                <Option value="Nintendo">Nintendo</Option>
                                <Option value="Sega">Sega</Option>
                                <Option value="Atari">Atari</Option>
                                <Option value="SNK">SNK</Option>
                                <Option value="Neo Geo">Neo Geo</Option>
                                <Option value="Ouya">Ouya</Option>
                                <Option value="Steam Machine">Steam Machine</Option>
                                <Option value="Nvidia Sheild">Nvidia Sheild</Option>
                                <Option value="Intellivision">Intellivision</Option>
                                <Option value="GameBoy">GameBoy</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('model')}>
                            <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item
                            label={t('condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'photo_video':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('brand')}>
                            <Select
                                showSearch
                                value={brand}
                                onChange={(value) => setBrand(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Canon">Canon</Option>
                                <Option value="Sony">Sony</Option>
                                <Option value="Nikon">Nikon</Option>
                                <Option value="Tamron">Tamron</Option>
                                <Option value="Fujifilm">Fujifilm</Option>
                                <Option value="Panasonic">Panasonic</Option>
                                <Option value="Olympus">Olympus</Option>

                            </Select>
                        </Form.Item>
                        <Form.Item label={t('model')}>
                            <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item
                            label={t('condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'computers':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >

                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('brand')}>
                            <Select
                                showSearch
                                value={brand}
                                onChange={(value) => setBrand(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Samsung">Samsung</Option>
                                <Option value="Apple">Apple</Option>
                                <Option value="Xiaomi">Xiaomi</Option>
                                <Option value="Huawei">Huawei</Option>
                                <Option value="Honor">Honor</Option>
                                <Option value="Acer">Acer</Option>
                                <Option value="Asus">Asus</Option>
                                <Option value="LG">LG</Option>
                                <Option value="Google">Google</Option>
                                <Option value="MSI">MSI</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('model')}>
                            <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('type')}>
                            <Select value={type} onChange={(value) => setType(value)}>
                                <Option value="laptop">{t('laptop')}</Option>
                                <Option value="stationary_computer">{t('stationary_computer')}</Option>
                                <Option value="micro_computer">{t('micro_computer')}</Option>
                                <Option value="monoblock">{t('monoblock')}</Option>
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item
                            label={t('condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'computer_accessories':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('brand')}>
                            <Select
                                showSearch
                                value={brand}
                                onChange={(value) => setBrand(value)}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="Logitech">Logitech</Option>
                                <Option value="Razer">Razer</Option>
                                <Option value="Microsoft">Microsoft</Option>
                                <Option value="Corsair">Corsair</Option>
                                <Option value="SteelSeries">SteelSeries</Option>
                                <Option value="HyperX">HyperX</Option>
                                <Option value="Asus">Asus</Option>
                                <Option value="HP">HP</Option>
                                <Option value="Dell">Dell</Option>
                                <Option value="MSI">MSI</Option>
                                <Option value="Lenovo">Lenovo</Option>
                                <Option value="Acer">Acer</Option>
                                <Option value="Apple">Apple</Option>
                                <Option value="Thermaltake">Thermaltake</Option>
                                <Option value="Kingston">Kingston</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('model')}>
                            <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('type')}>
                            <Select value={type} onChange={(value) => setType(value)}>
                                <Option>{t('type')}</Option>
                                <Option value="mouse">{t('mouse')}</Option>
                                <Option value="keyboard">{t('keyboard')}</Option>
                                <Option value="headphones">{t('headphones')}</Option>
                                <Option value="monitor">{t('monitor')}</Option>
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item
                            label={t('condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'rent_estate':
            case 'sale_estate':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('type')}
                            name="type"
                            rules={[{ required: true, message: 'Please input the type!' }]}
                        >
                            <Select aria-label="Default select example" value={type} onChange={(value) => setType(value)}>
                                <Option value="house">{t('house')}</Option>
                                <Option value="garage">{t('garage')}</Option>
                                <Option value="aparment">{t('aparment')}</Option>
                                <Option value="commercial_real_estate">{t('commercial_real_estate')}</Option>
                                <Option value="room">{t('room')}</Option>
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
                            <InputNumber style={{ width: '100%' }} value={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item label={t('rooms_amount')}>
                            <Input type="text" value={roomsAmout} onChange={(e) => setRoomsAmount(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('area')}>
                            <Input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('owner_rent')}
                        >
                            <Select aria-label="Default select example" value={owner} onChange={(value) => setOwner(value)}>
                                <Option value="owner">{t('owner')}</Option>
                                <Option value="realtor">{t('realtor')}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={t('phone_number')}>
                            <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('description')}>
                            <Input.TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'refrigerators':
            case 'washing_machines':
            case 'vacuum_cleaners':
            case 'stoves_and_ovens':
            case 'sewing_equipment':
            case 'food_preparation':
            case 'dishwasher':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('brand')}>
                            <Input type='text' value={brand} onChange={(e) => setBrand(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item
                            label={t('condition')}
                            name='condition'
                            rules={[{ required: true, message: 'Please input the price!' }]}
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'furniture':
            case 'lighting':
            case 'dishes':
            case 'garden_equipment':
            case 'domestic_cleaning':
            case 'kitchen_equipment':
            case 'other_cat':
            case 'tools':
            case 'building_materials':
            case 'heating_and_ventilation':
            case 'plumbing':
            case 'electrics':
            case 'windows':
            case 'doors':
            case 'spares':
            case 'tires_and_wheels':
            case 'accessories_and_tools':
            case 'sports_protections':
            case 'bicycles':
            case 'scooters':
            case 'skateboards':
            case 'hoverboards_and_electric_scooters':
            case 'ball_games':
            case 'hunting_and_fishing':
            case 'tourism_and_outdoor_recreation':
            case 'billiards_and_bowling':
            case 'tennis_and_badminton':
            case 'exercise_equipment_and_fitness':
            case 'sports_nutrition':
            case 'water_sports':
            case 'sapboards':
            case 'table_games':
            case 'computer_games':
            case 'books_n_magazines':
            case 'tickets':
            case 'collections':
            case 'art_materials':
            case 'music':
            case 'music_tools':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical">
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
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
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            case 'education':
            case 'handyman':
            case 'beauty_and_health':
            case 'transportation':
            case 'repair_and_construction':
            case 'computer_services':
            case 'business_services':
            case 'cleaning':
            case 'automotive_services':
            case 'appliance_repair':
            case 'event_planning':
            case 'photography_and_videography':
            case 'custom_manufacturing':
            case 'pet_care':
            case 'car_seats':
            case 'health_and_care':
            case 'toys_and_games':
            case 'strollers':
            case 'feeding_and_nutrition':
            case 'bathing':
            case 'nursery':
            case 'diapers_and_potties':
            case 'baby_monitors':
            case 'maternity_products':
            case 'schoold_supplies':
            case 'makeup':
            case 'manicure_and_pedicure':
            case 'healthcare_products':
            case 'perfume':
            case 'skincare':
            case 'haircare':
            case 'tattoos_and_tatooing':
            case 'tanning_and_sunbeds':
            case 'personal_hygiene_products':
                return (
                    <Form
                        className='mt-3'
                        layout="vertical"
                    >
                        <Form.Item
                            className="mb-3"
                            label={t('title')}
                        >
                            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))}  />
                        </Form.Item>
                        <Form.Item label={t('phone_number')}>
                            <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={t('description')}>
                            <Input.TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            className="mb-3"
                            label={t('photos')}
                        >
                            <PhotoUpload data={{ photoUrls }} onPhotoUrlsChange={handlePhotoUrlsChange} />
                        </Form.Item>
                    </Form>
                )
            default:
                return null;
        }
    }

    return (
        <>
            <style type="text/css">
                {`
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 4.5rem;
                        padding-top: 3.5rem;
                    }
                }
                @media (min-width: 1000px) {
                    body {
                        padding-top: 4.5rem;
                    }
                }
                `}
            </style>
            <MyNavbar />

            <NavBarBack />
            {data && (

                <Form
                    className='mt-3 container'
                    layout="vertical"
                >
                    <h3>{t('edit_advertisement')}</h3>
                    <Form.Item
                        label={t('category')}
                        name="category"
                    >
                        <CategorySelect handleCategoryChange={handleCategoryChange} category={category} t={t} />
                    </Form.Item>

                    <Form.Item
                        label={t('Subcategory')}
                        name="subcategory"
                    >
                        {getSubcategories()}
                    </Form.Item>
                    {getForm()}
                    <Form.Item label={t('Coordinates')}>
                        <MapComponent
                            coordinates={coordinates}
                            setCoordinates={setCoordinates}
                            setRegion={setRegion}
                            setCountry={setCountry}
                            setLocation={setLocation}
                            mapRef={mapRef}
                        />
                    </Form.Item>

                    <Form.Item label={t('Location')}>
                        <AutoComplete
                            options={options}
                            onSearch={debounceFetchSuggestions}
                            onSelect={handleSelect}
                            placeholder="Search location"
                            value={location}
                            onChange={(value) => setLocation(value)}
                        >
                            <Input />
                        </AutoComplete>
                    </Form.Item>
                    <SaveButton loading={loading} handleSubmit={handleSubmit} t={t} />
                </Form>
            )}
        </>
    )
}

export default EditItem;
