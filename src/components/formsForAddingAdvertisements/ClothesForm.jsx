import React, { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, InputNumber, Button, Select, Image, Upload, AutoComplete, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import debounce from 'lodash.debounce';
import { GeoPoint } from 'firebase/firestore';

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
            setCoordinates(geoPoint);

            // Fetch the address using Geocoding API
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newCoordinates }, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;
                        const formattedAddress = results[0].formatted_address;

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

                        setLocation(formattedAddress);  // Update the AutoComplete field
                        setCountry(getCountryKey(country));
                        setRegion(getRegionKey(region));
                    } else {
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

    const [availableSizes, setAvailableSizes] = useState([]);

    useEffect(() => {
        if (type === 'shoes') {
            setAvailableSizes(['3.5', '4', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16']);
        } else {
            setAvailableSizes(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL']);
        }
    }, [type]);

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

            if (response.status === 200) {
                const data = await response.json();
                const places = data.places;
                if (places && places.length > 0) {
                    setOptions(places.map(place => ({
                        label: place.formattedAddress,
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

    const handleSelect = async (value) => {
        const selectedPlace = options.find(option => option.value === value);
        console.log(selectedPlace);
        console.log('here')
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

                let country = '';
                let region = '';
                const addressComponents = selectedPlace.address_components;

                if (addressComponents.length >= 6) {
                    country = addressComponents[5]?.longText || '';
                    region = addressComponents[4]?.longText || '';
                } else if (addressComponents.length >= 5) {
                    country = addressComponents[4]?.longText || '';
                    region = addressComponents[3]?.longText || '';
                } else if (addressComponents.length >= 4) {
                    country = addressComponents[3]?.longText || '';
                    region = addressComponents[2]?.longText || '';
                } else if (addressComponents.length >= 3) {
                    country = addressComponents[2]?.longText || '';
                    region = addressComponents[1]?.longText || '';
                } else if (addressComponents.length >= 2) {
                    country = addressComponents[1]?.longText || '';
                    region = addressComponents[0]?.longText || '';
                }

                console.log(addressComponents)
                console.log(country);
                console.log(region);
                console.log(value);
                console.log(newCoordinates);
                console.log('----');

                setCountry(getCountryKey(country));
                setRegion(getRegionKey(region));

            } else {
                console.error('Invalid coordinates received:', selectedPlace);
            }
        }
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
                        name='price'
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
                            {availableSizes.map(size => (
                                <Option key={size} value={size}>{size}</Option>
                            ))}
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
                        <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setRegion={setRegion} setCountry={setCountry} setLocation={setLocation} mapRef={mapRef} />
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