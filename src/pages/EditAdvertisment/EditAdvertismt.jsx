import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db, auth, storage } from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form, Input, AutoComplete, Button, Layout, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import debounce from 'lodash.debounce';
import { GeoPoint } from 'firebase/firestore';
import { MapComponent } from "./MapComponent";
import { NavBarBack } from "../../components/Navbar/NavBarBack";
import ClothesForm from "../../components/formsForAddingAdvertisements/ClothesForm"
import SelectTypesForClothes from "../../components/select-types/select-types-clothes/SelectTypesForClothes";

const { Option } = Select;
const { TextArea } = Input;

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
    const [data, setData] = useState(null);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [photoUrls, setSelectedFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currency, setCurrency] = useState('');

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

    const handleFileChange = (file) => {
        setSelectedFiles((prev) => [...prev, file]);
    }

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
                    }
                });
            } else {
                console.error('Invalid coordinates received:', selectedPlace);
            }
        } else {
            console.error('Selected place not found:', value);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const docRef = doc(db, "advertisment", id);

        const fileUrls = await Promise.all(
            photoUrls.map(async (file) => {
                const storageRef = ref(storage, 'advertisment/' + file.name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                return new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                        },
                        (error) => {
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL);
                            });
                        }
                    );
                });
            })
        );

        const updatedData = {
            title: title,
            price: price,
            currency: currency,
            phone: phoneNumber,
            description: description,
            photoUrls: photoUrls,
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
            }

            console.log("Document successfully updated!");
            history.push('/profile');
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "advertisment", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (auth.currentUser && auth.currentUser.uid === data.from_uid) {
                        setData(data);
                        setCategory(data.category);
                        setSubcategory(data.subcategory);
                        setSelectedFiles(data.photoUrls);
                        setTitle(data.title);
                        setPrice(data.price);
                        setDescription(data?.description);
                        setPhoneNumber(data?.phone);
                        setCondition(data?.condition);
                        setCurrency(data.currency);
                        setBrand(data?.brand);
                        setModel(data?.model);
                        setScreenSize(data?.screen_size);
                        setMemory(data?.memory);
                        setOwner(data?.owner);
                        setType(data?.type);
                        setArea(data?.area);
                        setMileage(data?.mileage);
                        setDrive(data?.drive);
                        setTransmission(data?.transmission);
                        setWheel(data?.wheel);
                        setYear(data?.year);
                        setBody(data?.body);
                        setColor(data?.color);
                        setOwners(data?.owners);
                        setSize(data?.size);
                        setLocation(data.location);
                        setCoordinates(data.coordinates);
                        console.log("Document data:", data);
                    } else {
                        setData(null);
                        message.error('Объявление принадлежит не этому пользвателю');
                    }
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleSubcategoryChange = (e) => {
        setSubcategory(e.target.value);
    }

    const getSubcategories = () => {
        switch (category) {
            case 'building_materials_and_tools':
                return (<BuildingMaterial t={t} />);
            case 'clothes':
                return (<Clothes t={t} />);
            case 'electronics':
                return (<Electronics t={t} />);
            case 'house_goods':
                return (<HouseGoods t={t} />);
            case 'transport_goods':
                return (<TransportGoods t={t} />);
            case 'home_appliance':
                return (<HomeAppliance t={t} />);
            case 'service':
                return (<Service t={t} />);
            case 'health_and_beauty':
                return (<HealthBeauty t={t} />);
            case 'sport':
                return (<Sport t={t} />);
            case 'hobby_n_Relax':
                return (<HobbyRelax t={t} />);
            case 'child_goods':
                return (<ChildGoods t={t} />);
            case 'estate':
                return (<Estate t={t} />);
            case 'transport':
                return (<Transport t={t} />);
            default:
                return <option>{t('choce_subcategory')}</option>;
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
                            <Form.Item className="mb-3">
                                <label>{t('type')}</label>
                                <SelectTypesForClothes type={type} setType={setType} />
                            </Form.Item>
                            <Form.Item className="mb-3 d-flex align-items-center">
                                <Input
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                                    placeholder={t('price')}
                                    className="me-2"
                                />
                                <Select value={currency} onChange={(value) => setCurrency(value)}>
                                    <Option value="">{t('currency')}</Option>
                                    <Option value="rsd">RSD</Option>
                                    <Option value="eur">EUR</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-3">
                                <label>{t('size')}</label>
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
                            <Form.Item className="mb-3">
                                <label>{t('brand')}</label>
                                <Input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </Form.Item>
                            <Form.Item className="mb-3">
                                <label>{t('condition')}</label>
                                <Select value={condition} onChange={(value) => setCondition(value)}>
                                    <Option value="">{t('condition')}</Option>
                                    <Option value="new_cond">Новое</Option>
                                    <Option value="bu_cond">Б/У</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="mb-3">
                                <label>{t('phone_number')}</label>
                                <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </Form.Item>
                            <Form.Item className="mb-3">
                                <label>{t('description')}</label>
                                <TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Item>
                            <Form.Item label={t('Coordinates')}>
                                <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setRegion={setRegion} setCountry={setCountry} setLocation={setLocation} mapRef={mapRef} />
                            </Form.Item>

                            <Form.Item label={t('Location')}>
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
                            <div className="d-grid gap-2">
                                <Button onClick={handleSubmit} type="primary" size="large">
                                    {t('add')}
                                </Button>
                            </div>
                        </LoadScript>
                    </>
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
                    }
                }
                `}
            </style>
            <MyNavbar />

            <NavBarBack />
            {data && ( // Если data не null, отобразите форму
                <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>

                    <div style={{ padding: '24px', flex: 1 }}>
                        <h3>{t('edit_advertisement')}</h3>
                        <CategorySelect handleCategoryChange={handleCategoryChange} category={category} t={t} />

                        <Form.Item
                            label={t('Subcategory')}
                            name="subcategory"
                        >
                            <Select
                                className="mb-3"
                                onChange={handleSubcategoryChange}
                                value={subcategory}
                                aria-label="Default select example"
                            >
                                {getSubcategories()}
                            </Select>
                        </Form.Item>
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
                                value={location} // Set the value to the selected location name
                                onChange={(value) => setLocation(value)} // Handle input changes
                            >
                                <Input />
                            </AutoComplete>
                        </Form.Item>
                        {getForm()}

                        
                    </div>
                </Layout>
            )}
        </>
    )
}

export default EditItem;
