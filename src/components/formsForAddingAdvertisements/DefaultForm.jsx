import React, { useState, useCallback, useRef } from "react";
import { Form, Input, InputNumber, Button, Select, Image, Upload, AutoComplete, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import debounce from 'lodash.debounce';

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

const MapComponent = ({ coordinates, setCoordinates, setCountry, country, setRegion, region, setLocation, location, mapRef }) => {

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

    function getCountryKey(countryName) {
        return countryMappings[countryName] || null;  // Вернуть стандартизированный ключ или null, если отображение не найдено
    }

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
            setCoordinates(newCoordinates);

            // Fetch the address using Geocoding API
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newCoordinates }, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;
                        const formattedAddress = results[0].formatted_address;

                        console.log(results[0]);

                        let country = '';
                        let region = '';

                        if (addressComponents.length >= 6) {
                            country = addressComponents[5]?.long_name || '';
                            region = addressComponents[4]?.long_name || '';
                        } else if (addressComponents.length >= 5) {
                            country = addressComponents[4]?.long_name || '';
                            region = addressComponents[3]?.long_name || '';
                        } else if (addressComponents.length >= 4) {
                            country = addressComponents[3]?.long_name || '';
                            region = addressComponents[2]?.long_name || '';
                        }

                        console.log(country);
                        console.log(region);

                        setLocation(formattedAddress);
                        setCountry(getCountryKey(country));
                        //setRegion(getRegionKey(region)); !TODO
                    } else {
                        console.log("NOT OK");
                        setLocation('No results found');
                    }
                } else {
                    setLocation('Geocoder failed due to: ' + status);
                }
            });
        }
    };


    return (
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
    );
};

const DefaultForm = ({
    coordinates, setCoordinates,
    location, setLocation,
    country, setCountry,
    region, setRegion,
    title, setTitle,
    price, setPrice,
    condition, setCondition,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleSubmit, handleFileChange,
    currency, setCurrency,
    loading
}) => {
    const { t } = useTranslation();
    const { Option } = Select;
    const mapRef = useRef(null);

    const [form] = Form.useForm();

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("haha lolo" + values);
            // handleSubmit(values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    // const [coordinates, setCoordinates] = useState(center);
    // const [locationName, setLocationName] = useState('');
    const [options, setOptions] = useState([]);

    const handlePreview = async (file) => {
        setPreviewImage(file.thumbUrl);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

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


    // const fetchSuggestions = async (value) => {
    //     try {
    //         const apiKey = 'AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU'; // Replace with your actual API key
    //         const url = 'https://places.googleapis.com/v1/places:autocomplete';

    //         const headers = {
    //             'Content-Type': 'application/json',
    //             'X-Goog-Api-Key': apiKey,
    //         };
    //         console.log(value);
    //         const body = JSON.stringify({
    //             input: value,

    //             // Add any other parameters as needed
    //         });

    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: headers,
    //             body: body,
    //         });

    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch suggestions: ${response.statusText}`);
    //         }

    //         const data = await response.json();

    //         if (data.predictions && data.predictions.length > 0) {
    //             const suggestions = data.predictions.map(prediction => ({
    //                 text: prediction.description, // Extracting only the text name
    //             }));
    //             console.log("Suggestions:", suggestions);
    //             // Set your state or do further processing with suggestions
    //         } else {
    //             console.log("No suggestions found");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching suggestions:", error);
    //     }
    // };



    const debounceFetchSuggestions = debounce(fetchSuggestions, 300);

    // const handleSelect = async (value) => {
    //     const selectedPlace = options.find(option => option.value === value);
    //     console.log(selectedPlace);
    //     console.log('here')
    //     if (selectedPlace) {
    //         const longitude = selectedPlace.f.longitude;
    //         const latitude = selectedPlace.f.latitude;
    //         if (latitude !== undefined && longitude !== undefined) {
    //             const newCoordinates = {
    //                 lat: parseFloat(latitude), 
    //                 lng: parseFloat(longitude),
    //             };
    //             setCoordinates(newCoordinates); 
    //             setLocation(value); 

    //             if (mapRef.current) {
    //                 mapRef.current.panTo(newCoordinates);
    //             }

    //             let country = '';
    //             let region = '';
    //             const addressComponents = selectedPlace.address_components;

    //             if (addressComponents.length >= 6) {
    //                 country = addressComponents[5]?.longText || '';
    //                 region = addressComponents[4]?.longText || '';
    //             } else if (addressComponents.length >= 5) {
    //                 country = addressComponents[4]?.longText || '';
    //                 region = addressComponents[3]?.longText || '';
    //             } else if (addressComponents.length >= 4) {
    //                 country = addressComponents[3]?.longText || '';
    //                 region = addressComponents[2]?.longText || '';
    //             } else if (addressComponents.length >= 3) {
    //                 country = addressComponents[2]?.longText || '';
    //                 region = addressComponents[1]?.longText || '';
    //             } else if (addressComponents.length >= 2) {
    //                 country = addressComponents[1]?.longText || '';
    //                 region = addressComponents[0]?.longText || '';
    //             }

    //             console.log(addressComponents)
    //             console.log(country);
    //             console.log(region);
    //             console.log(value);
    //             console.log(newCoordinates);
    //             console.log('----');

    //             setCountry(country);
    //             setRegion(region);

    //         } else {
    //             console.error('Invalid coordinates received:', selectedPlace);
    //         }
    //     }
    // };

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
                setCoordinates(newCoordinates);
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

    function getCountryKey(string) {
        if (string.contains("Serbia") || string.contains("Сербия") || string.contains("Србија")) {
            return "serbia";
        } else if (string.contains("Croatia") || string.contains("Хорватия") || string.contains("Хрватска")) {
            return "croatia";
        } else if (string.contains("Bosnia and Herzegovina") || string.contains("Босния и Герцеговина") || string.contains("Босна и Херцеговина")) {
            return "bosnia_and_herzegovina";
        } else if (string.contains("Montenegro") || string.contains("Черногория") || string.contains("Црна Гора")) {
            return "montenegro";
        } else if (string.contains("North Macedonia") || string.contains("Мacedonia") || string.contains("Северная Македония") || string.contains("Македония") || string.contains("Северна Македонија")) {
            return "north_macedonia";
        }

    }


    function getRegionKey(string) {
        if (string.contains("Unsko-sanski") || string.contains("Унско-Санский") || string.contains("Уна-Санский") || string.contains("Una-Sana")) {
            return "una_sana_canton";
        } else if (string.contains("Posavina") || string.contains("Посавский")) {
            return "posavina_canton";
        } else if (string.contains("Tuzla") || string.contains("Тузланский")) {
            return "tuzla_canton";
        } else if (string.contains("Zenica-Doboj") || string.contains("Зеничко-Добойский")) {
            return "zenica_doboj_canton";
        } else if (string.contains("Bosnian-Podrinje") || string.contains("Боснийско-Подринский")) {
            return "bosnian_podrinje_canton_gorazde";
        } else if (string.contains("Central Bosnia") || string.contains("Центрально-Боснийский")) {
            return "central_bosnia_canton";
        } else if (string.contains("Herzegovina-Neretva") || string.contains("Герцеговинско-Неретванский")) {
            return "herzegovina_neretva_canton";
        } else if (string.contains("West Herzegovina") || string.contains("Западно-Герцеговинский")) {
            return "west_herzegovina_canton";
        } else if (string.contains("Sarajevo") || string.contains("Кантон Сараево")) {
            return "sarajevo_canton";
        } else if (string.contains("Banja Luka") || string.contains("Баня-Лука")) {
            return "banja_luka";
        } else if (string.contains("Bijeljina") || string.contains("Биелина")) {
            return "bijeljina";
        } else if (string.contains("Doboj") || string.contains("Добой")) {
            return "doboj";
        } else if (string.contains("Prijedor") || string.contains("Прийедор")) {
            return "prijedor";
        } else if (string.contains("Istočno Sarajevo") || string.contains("Источно Сараево")) {
            return "istocno_sarajevo";
        } else if (string.contains("Trebinje") || string.contains("Требинье")) {
            return "trebinje";
        } else if (string.contains("Brčko") || string.contains("Брчко")) {
            return "brcko";
        } else if (string.contains("Canton 10") || string.contains("Кантон 10")) {
            return "canton_10";
        } else if (string.contains("Podgorica") || string.contains("Подгорица")) {
            if (string.contains("Municipality")) {
                return "municipality_podgorica";
            } else if (string.contains("Capital City") || string.contains("град")) {
                return "glavni_grad_podgorica";
            }
        } else if (string.contains("Danilovgrad") || string.contains("Даниловград")) {
            return "municipality_danilovgrad";
        } else if (string.contains("Cetinje") || string.contains("Цетине")) {
            return "municipality_cetinje";
        } else if (string.contains("Budva") || string.contains("Будва")) {
            return "municipality_budva";
        } else if (string.contains("Bar") || string.contains("Бар")) {
            return "municipality_bar";
        } else if (string.contains("Herceg Novi") || string.contains("Герцег-Нови")) {
            return "municipality_herceg_novi";
        } else if (string.contains("Kotor") || string.contains("Котор")) {
            return "municipality_kotor";
        } else if (string.contains("Tivat") || string.contains("Тиват")) {
            return "municipality_tivat";
        } else if (string.contains("Ulcinj") || string.contains("Улцинь")) {
            return "municipality_ulcinj";
        } else if (string.contains("Pljevlja") || string.contains("Плевля")) {
            return "municipality_pljevlja";
        } else if (string.contains("Bijelo Polje") || string.contains("Бижело Поле")) {
            return "municipality_bijelo_polje";
        } else if (string.contains("Zabljak") || string.contains("Жабляк")) {
            return "municipality_zabljak";
        } else if (string.contains("Kolasin") || string.contains("Колашин")) {
            return "municipality_kolasin";
        } else if (string.contains("Mojkovac") || string.contains("Мойковац")) {
            return "municipality_mojkovac";
        } else if (string.contains("Berane") || string.contains("Берне")) {
            return "municipality_berane";
        } else if (string.contains("Andrijevica") || string.contains("Андриевица")) {
            return "municipality_andrijevica";
        } else if (string.contains("Plav") || string.contains("Плав")) {
            return "municipality_plav";
        } else if (string.contains("Rozaje") || string.contains("Рожае")) {
            return "municipality_rozaje";
        } else if (string.contains("Niksic") || string.contains("Никшич")) {
            return "municipality_niksic";
        } else if (string.contains("Savnik") || string.contains("Шавник")) {
            return "municipality_savnik";
        } else if (string.contains("Pluzine") || string.contains("Плужине")) {
            return "municipality_pluzine";
        } else if (string.contains("Gusinje") || string.contains("Гусиње")) {
            return "municipality_gusinje";
        } else if (string.contains("Petrovac") || string.contains("Петровац")) {
            return "municipality_petrovac";
        } else if (string.contains("Tuzi") || string.contains("Тузи")) {
            return "municipality_tuzi";
        } else if (string.contains("Vojvodina") || string.contains("Воеводина")) {
            return "vojvodina";
        } else if (string.contains("Belgrade") || string.contains("Белград")) {
            return "belgrade";
        } else if (string.contains("Šumadija") || string.contains("Шумадийский")) {
            return "sumadija_and_western_serbia";
        } else if (string.contains("Southern and Eastern Serbia") || string.contains("Южно-Банатский")) {
            return "southern_and_eastern_serbia";
        } else if (string.contains("Kosovo and Metohija") || string.contains("Косово и Метохия")) {
            return "kosovo_and_metohija";
        } else if (string.contains("Belgrade") || string.contains("Белград") || string.contains("Београд")) {
            return "belgrade";
        } else if (string.contains("Bor District") || string.contains("Bor") || string.contains("Борский округ") || string.contains("Борски округ")) {
            return "bor_district";
        } else if (string.contains("Braničevo District") || string.contains("Braničevo") || string.contains("Браничевский округ") || string.contains("Браничевски округ")) {
            return "branicevo_district";
        } else if (string.contains("Zlatibor District") || string.contains("Zlatibor") || string.contains("Златиборский округ") || string.contains("Златиборски округ")) {
            return "zlatibor_district";
        } else if (string.contains("Kolubara District") || string.contains("Kolubara") || string.contains("Колубарский округ") || string.contains("Колубарски округ")) {
            return "kolubara_district";
        } else if (string.contains("Moravica District") || string.contains("Moravica") || string.contains("Моравичский округ") || string.contains("Моравички округ")) {
            return "moravica_district";
        } else if (string.contains("Nišava District") || string.contains("Nišava") || string.contains("Нишавский округ") || string.contains("Нишавски округ")) {
            return "nisava_district";
        } else if (string.contains("Pirot District") || string.contains("Pirot") || string.contains("Пиротский округ") || string.contains("Пиротски округ")) {
            return "pirot_district";
        } else if (string.contains("Podunavlje District") || string.contains("Podunavlje") || string.contains("Подунайский округ") || string.contains("Подунавски округ")) {
            return "podunavlje_district";
        } else if (string.contains("Pčinja District") || string.contains("Pčinja") || string.contains("Пчиньский округ") || string.contains("Пчињски округ")) {
            return "pcinja_district";
        } else if (string.contains("Raška District") || string.contains("Raška") || string.contains("Рашский округ") || string.contains("Рашки округ")) {
            return "raska_district";
        } else if (string.contains("Rasina District") || string.contains("Rasina") || string.contains("Расинский округ") || string.contains("Расински округ")) {
            return "rasina_district";
        } else if (string.contains("Toplica District") || string.contains("Toplica") || string.contains("Топличский округ") || string.contains("Топлички округ")) {
            return "toplica_district";
        } else if (string.contains("Šumadija District") || string.contains("Šumadija") || string.contains("Шумадийский округ") || string.contains("Шумадијски округ")) {
            return "sumadija_district";
        } else if (string.contains("Jablanica District") || string.contains("Jablanica") || string.contains("Ябланичский округ") || string.contains("Јабланички округ")) {
            return "jablanica_district";
        } else if (string.contains("Zagreb City") || string.contains("Град Загреб")) {
            return "zagreb_city";
        } else if (string.contains("Zagreb County") || string.contains("Загребская жупания")) {
            return "zagreb_county";
        } else if (string.contains("Split-Dalmatia") || string.contains("Сплитско-Далматинская")) {
            return "split_dalmatia";
        } else if (string.contains("Istria") || string.contains("Истарская жупания")) {
            return "istria";
        } else if (string.contains("Primorje-Gorski Kotar") || string.contains("Приморско-Горанская жупания")) {
            return "primorje_gorski_kotar";
        } else if (string.contains("Lika-Senj") || string.contains("Лика-Сень")) {
            return "lika_senj";
        } else if (string.contains("Virovitica-Podravina") || string.contains("Вировитицко-Подравская жупания")) {
            return "virovitica_podravina";
        } else if (string.contains("Požega-Slavonia") || string.contains("Пожешко-Славонская жупания")) {
            return "pozega_slavonia";
        } else if (string.contains("Brod-Posavina") || string.contains("Бродско-Посавская жупания")) {
            return "brod_posavina";
        } else if (string.contains("Zadar") || string.contains("Задар")) {
            return "zadar";
        } else if (string.contains("Osijek-Baranja") || string.contains("Осиечко-Бараньская жупания")) {
            return "osijek_baranja";
        } else if (string.contains("Sisak-Moslavina") || string.contains("Сисачко-Мославинская жупания")) {
            return "sisak_moslavina";
        } else if (string.contains("Koprivnica-Križevci") || string.contains("Копривницко-Крижевечка жупания")) {
            return "koprivnica_krizevci";
        } else if (string.contains("Bjelovar-Bilogora") || string.contains("Бьеловарско-Билогорская жупания")) {
            return "bjelovar_bilogora";
        } else if (string.contains("Karlovac") || string.contains("Карловацкая жупания")) {
            return "karlovac";
        } else if (string.contains("Varaždin") || string.contains("Вараждинская жупания")) {
            return "varazdin";
        } else if (string.contains("Krapina-Zagorje") || string.contains("Крапинско-Загорская жупания")) {
            return "krapina_zagorje";
        } else if (string.contains("Međimurje") || string.contains("Меджимурская жупания")) {
            return "medimurje";
        } else if (string.contains("Šibenik-Knin") || string.contains("Шибенско-Книнская жупания")) {
            return "sibenik_knin";
        } else if (string.contains("Vukovar-Srijem") || string.contains("Вуковарско-Сремская жупания")) {
            return "vukovar_srijem";
        } else if (string.contains("Dubrovnik-Neretva") || string.contains("Дубровачко-Неретванская жупания")) {
            return "dubrovnik_neretva";
        } else {
            return "unknown_region";
        }
    }



    const handleSelectCoordinates = async (f) => {
        const locationValue = `${f.lat},${f.lng}`;
        console.log(locationValue);
        setCoordinates(locationValue);
    }

    const selectAfter = (
        <Select defaultValue='Валюта' style={{ width: 120 }} onChange={(value) => setCurrency(value)}>
            <Option value="eur">€</Option>
            <Option value="rsd">RSD</Option>
        </Select>
    );



    return (
        <LoadScript googleMapsApiKey="AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU">
            <div>
                <Form form={form} className='mt-3' layout="vertical">
                    <Form.Item
                        name="title"
                        label={t('title')}
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Form.Item>

                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spin style={{ color: '#03989F' }} spinning={loading}>
                            <Button type="primary" onClick={onSubmit} size='large' style={{ backgroundColor: '#FFBF34', width: '150px' }}>
                                {t('add')}
                            </Button>
                        </Spin>
                    </Form.Item>
                </Form>
            </div>
        </LoadScript>
    );
};

export default DefaultForm;
