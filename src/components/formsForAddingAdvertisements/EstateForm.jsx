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
                        setCountry(country);
                        setRegion(region);
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

const EstateForm = ({
    coordinates, setCoordinates,
    location, setLocation,
    country, setCountry,
    region, setRegion,
    title, setTitle,
    price, setPrice,
    type, setType,
    roomsAmout, setRoomsAmount,
    area, setArea,
    owner, setOwner,
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
                setCoordinates(newCoordinates);
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

                setCountry(country);
                setRegion(region);

            } else {
                console.error('Invalid coordinates received:', selectedPlace);
            }
        }
    };

    const selectAfter = (
        <Select defaultValue='Валюта' style={{ width: 120 }} onChange={(value) => setCurrency(value)}>
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
                        <InputNumber style={{ width: '100%' }} value={price} addonBefore={selectAfter} onChange={(value) => setPrice(parseInt(value, 10))} defaultValue={1} />
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
}

export default EstateForm;
