import React, { useState, useCallback, useRef } from "react";
import { Form, Input, InputNumber, Button, Select, Image, Upload, AutoComplete } from 'antd';
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

const MapComponent = ({ coordinates, setCoordinates, setLocationName, mapRef }) => {

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
                        console.log(results[0].formatted_address);
                        setLocationName(results[0].formatted_address);
                    } else {
                        console.log("NOT OK");
                        setLocationName('No results found');
                    }
                } else {
                    setLocationName('Geocoder failed due to: ' + status);
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
    title, setTitle,
    price, setPrice,
    condition, setCondition,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleSubmit, handleFileChange
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
    const [coordinates, setCoordinates] = useState(center);
    const [locationName, setLocationName] = useState('');
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

    const handleSelect = async (value) => {
        const selectedPlace = options.find(option => option.value === value);
        console.log(selectedPlace);
        if (selectedPlace) {
            const longitude = selectedPlace.f.longitude;
            const latitude = selectedPlace.f.latitude;
             // Assuming `latitude` and `longitude` are correct
            if (latitude !== undefined && longitude !== undefined) {
                const newCoordinates = {
                    lat: parseFloat(latitude), // Convert to float if necessary
                    lng: parseFloat(longitude),
                };
                setCoordinates(newCoordinates); // Update coordinates state
                setLocationName(value); // Set the selected location name

                // Trigger MapComponent to update with new coordinates
                if (mapRef.current) {
                    mapRef.current.panTo(newCoordinates);
                }
            } else {
                console.error('Invalid coordinates received:', selectedPlace);
            }
        }
    };




    const handleSelectCoordinates = async (f) => {
        const locationValue = `${f.lat},${f.lng}`;
        console.log(locationValue);
        setCoordinates(locationValue);
    }



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
                        name='price'
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <InputNumber
                            prefix="€"
                            value={price}
                            onChange={(value) => setPrice(parseInt(value, 10))}
                            style={{ width: '100%' }}
                        />
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

                    <Form.Item label={t('coordinates')}>
                        <MapComponent coordinates={coordinates} setCoordinates={setCoordinates} setLocationName={setLocationName} mapRef={mapRef} />
                    </Form.Item>

                    <Form.Item label={t('location_name')}>
                        <AutoComplete
                            options={options}
                            onSearch={debounceFetchSuggestions}
                            onSelect={handleSelect}
                            placeholder="Search location"
                            value={locationName} // Set the value to the selected location name
                            onChange={(value) => setLocationName(value)} // Handle input changes
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
                        <Button type="primary" onClick={onSubmit} size='large' style={{ backgroundColor: 'orange', width: '150px' }}>
                            {t('add')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </LoadScript>
    );
};

export default DefaultForm;
