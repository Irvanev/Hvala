import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db, auth } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { MyNavbar } from "../../components/Navbar/Navbar";
import CategorySelect from '../../pages/EditAdvertisment/CategorySelect';
import BuildingMaterial from './BuildingMaterial';
import Clothes from './Clothes';
import Shoes from './Shoes';
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
import LocationService from '../../services/LocationService.js';

const { Option } = Select;
const { TextArea } = Input;

const locationService = new LocationService();

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
    const [testRegion, setTestRegion] = useState('Podgorica');
    const [testCountry, setTestCountry] = useState('Crna Gora');

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
    const selectedPlace = options.find(option => option.value === value);
    if (selectedPlace) {
        const { longitude, latitude } = selectedPlace.f;
        if (latitude !== undefined && longitude !== undefined) {
            const newCoordinates = {
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
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
                    const { country, region } = locationService.extractCountryAndRegion(geocodeData);
                    setTestCountry(locationService.getCountryKey(country));
                    setTestRegion(locationService.getRegionKey(region));
                    console.log(geocodeData);
                    console.log(region.toLowerCase().includes("шавник")+"aboba2");
                    console.log(region.toLocaleLowerCase().includes("zagreb"));
                    setCountry(locationService.getCountryKey(country));
                    setRegion(locationService.getRegionKey(region));
                    console.log('Country:', locationService.getCountryKey(country));
                    console.log('Region:', locationService.getRegionKey(region));
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

    const handlePhotoUrlsChange = (newPhotoUrls) => {
        setPhotoUrls(newPhotoUrls);
    };


    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();

        const validPhotoUrls = photoUrls.filter(url => url !== undefined);

        const docRef = doc(db, "advertisment", id);

        const updatedData = {
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
            coordinates: new GeoPoint(coordinates.lat, coordinates.lng),
            country: country,
            region: region
        };

        const removeFields = (fields) => {
            fields.forEach(field => {
                delete updatedData[field];
            });
        };

        try {
            if (subcategory === 'transfer' || subcategory === 'taxi' ||
                subcategory === 'education' || subcategory === 'handyman' ||
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
                removeFields(['condition', 'brand', 'size', 'type', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'model', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
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
                removeFields(['brand', 'size', 'type', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'model', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }
            if (subcategory === 'phones_and_tablets') {
                removeFields(['size', 'type', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs']);
            }
            if (subcategory === 'tv') {
                removeFields(['size', 'type', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'memory']);
            }
            if (subcategory === 'game_console' || subcategory === 'photo_video') {
                removeFields(['size', 'type', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }
            if (subcategory === 'computers') {
                removeFields(['size', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }
            if (subcategory === 'computer_accessories') {
                removeFields(['size', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'model', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }
            if (subcategory === 'auto' || subcategory === 'moto' || subcategory === 'water_transport') {
                removeFields(['size', 'type', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'screen_size', 'memory']);
            }
            if (subcategory === 'sale_estate' || subcategory === 'rent_estate') {
                removeFields(['condition', 'brand', 'size', 'model', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }
            if (subcategory === 'mens_clothing' || subcategory === 'womens_clothing' || subcategory === 'childrens_clothing') {
                removeFields(['owner', 'area', 'rooms_amount', 'RoomsAmount', 'model', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }
            if (subcategory === 'men_shoes' || subcategory === 'women_shoes' || subcategory === 'children_shoes') {
                removeFields(['owner', 'area', 'rooms_amount', 'RoomsAmount', 'model', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }
            if (subcategory === 'refrigerators' || subcategory === 'washing_machines' || subcategory === 'vacuum_cleaners' ||
                subcategory === 'stoves_and_ovens' || subcategory === 'sewing_equipment' || subcategory === 'food_preparation' ||
                subcategory === 'dishwasher') {
                removeFields(['size', 'type', 'owner', 'area', 'rooms_amount', 'RoomsAmount', 'model', 'mileage', 'year', 'body', 'color', 'transmission', 'drive', 'wheel', 'owners', 'customs', 'screen_size', 'memory']);
            }

            await updateDoc(docRef, updatedData);
            setLoading(false);

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
                        setCountry(data?.country || "montenegro");
                        setRegion(data?.region || "municipality_budva");
                    } else {
                        setData(null);
                        message.error('Объявление принадлежит не этому пользователю');
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
            case 'shoes':
                return (<Shoes t={t} subcategory={subcategory} handleSubCategoryChange={handleSubcategoryChange} />);
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

    const [availableSizes, setAvailableSizes] = useState([]);

    useEffect(() => {
        setAvailableSizes(['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL']);
    },);

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
            case 'men_shoes':
            case 'women_shoes':
            case 'children_shoes':
                return (
                    <>
                        <LoadScript googleMapsApiKey="AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU">
                            <Form.Item className="mb-3">
                                <label>{t('title')}</label>
                                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                        label={t("type")}
                                        name="type"
                                        rules={[{ required: true, message: "Please input the type!" }]}
                                      >
                                        <Select
                                          aria-label="Default select example"
                                          showSearch
                                          value={type}
                                          defaultValue={type}
                                          onChange={(value) => setType(value)}
                                          optionFilterProp="children"
                                          filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                          }
                                        >
                                          <Option value="sneakers">{t("sneakers")}</Option>
                                          <Option value="boots">{t("boots")}</Option>
                                          <Option value="shoes">{t("shoes")}</Option>
                                          <Option value="trainers">{t("trainers")}</Option>
                                          <Option value="high_boots">{t("high_boots")}</Option>
                                          <Option value="moccasins">{t("moccasins")}</Option>
                                          <Option value="sports_shoes">{t("sports_shoes")}</Option>
                                          <Option value="ugg_boots">{t("ugg_boots")}</Option>
                                          <Option value="work_shoes">{t("work_shoes")}</Option>
                                          <Option value="rubber_shoes">{t("rubber_shoes")}</Option>
                                          <Option value="sandals">{t("sandals")}</Option>
                                          <Option value="slippers">{t("slippers")}</Option>
                                          <Option value="home_shoes">{t("home_shoes")}</Option>
                                          <Option value="slipons">{t("slipons")}</Option>
                                          <Option value="shoe_care">{t("shoe_care")}</Option>
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
                                <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
                            </Form.Item>
                            <Form.Item
                                        label={t("size")+ " (EU)"}
                                        name="size"
                                        rules={[{ required: true, message: "Please select the size!" }]}
                                      >
                                        <Select value={size} defaultValue={size} onChange={(value) => setSize(value)}>
                                          <Option value="35">35</Option>
                                          <Option value="36">36</Option>
                                          <Option value="37">37</Option>
                                          <Option value="38">38</Option>
                                          <Option value="39">39</Option>
                                          <Option value="40">40</Option>
                                          <Option value="41">41</Option>
                                          <Option value="42">42</Option>
                                          <Option value="43">43</Option>
                                          <Option value="44">44</Option>
                                          <Option value="45">45</Option>
                                          <Option value="46">46</Option>
                                          <Option value="47">47</Option>
                                          <Option value="48">48</Option>
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
                            <InputNumber style={{ width: '100%' }} value={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} value={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
            case 'taxi':
            case 'transfer':
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
                            <InputNumber style={{ width: '100%' }} defaultValue={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} />
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
                            mapRef={mapRef} setTestCountry={setTestCountry} setTestRegion={setTestRegion} testCountry={testCountry} testRegion={testRegion} location={location}
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
