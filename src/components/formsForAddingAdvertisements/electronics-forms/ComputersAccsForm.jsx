import React, { useState, useCallback, useRef } from "react";
import { Form, Input, InputNumber, Button, Select, Image, Upload, AutoComplete, Spin, Row, Col  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import debounce from 'lodash.debounce';
import { GeoPoint } from 'firebase/firestore';
import LocationService from './../../../services/LocationService.js';
import RegionSelector from "../../../services/RegionSelector.jsx";

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

const MapComponent = ({ coordinates, setCoordinates, setCountry, country, setRegion, region, setLocation, location, mapRef, testRegion, setTestRegion, testCountry, setTestCountry  }) => {

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
                        setTestRegion(region);
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
        <Row gutter={16} style={{ marginTop: '20px' }}>
            {/* <Col span={12}>
                <strong>{t('region')}:</strong> {testRegion ?? "Podgorica"}
            </Col>
            <Col span={12}>
                <strong>{t('country')}:</strong> {testCountry ?? "Crna Gora"}
            </Col> */}
        </Row>
        <RegionSelector region={testRegion} setRegion={setTestRegion} country={testCountry} setCountry={setTestCountry} coordinates={coordinates} setCoordinates={setCoordinates} location={location} setLocation={setLocation}></RegionSelector>
        </div>
    );
};

const ComputersAccsForm = ({
    coordinates, setCoordinates,
    location, setLocation,
    country, setCountry,
    region, setRegion,
    title, setTitle,
    price, setPrice,
    brand, setBrand,
    model, setModel,
    type, setType,
    condition, setCondition,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleSubmit, handleFileListChange,
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

    const handleChange = ({ fileList: fl }) => {
        setFileList(fl);
        const files = (fl || []).map((f) => f.originFileObj).filter(Boolean);
        handleFileListChange?.(files);
    };

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
                        name="title"
                        label={t('title')}
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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
                        <InputNumber style={{ width: '100%' }} value={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} defaultValue={1} />
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

                    <Form.Item label={t('photos')}>
                        <Upload
                            multiple
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => false}
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
                        <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setRegion={setRegion} setCountry={setCountry} setLocation={setLocation} mapRef={mapRef} setTestCountry={setTestCountry} setTestRegion={setTestRegion} testCountry={testCountry} testRegion={testRegion} location={location} />
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

export default ComputersAccsForm;