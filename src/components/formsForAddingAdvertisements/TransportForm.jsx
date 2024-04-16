import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, InputNumber, Button, Select, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TarnsportForm = ({
    title, setTitle,
    brand, setBrand,
    model, setModel,
    price, setPrice,
    year, setYear,
    mileage, setMileage,
    body, setBody,
    color, setColor,
    transmission, setTransmission,
    drive, setDrive,
    wheel, setWheel,
    condition, setCondition,
    owners, setOwners,
    phoneNumber, setPhoneNumber,
    description, setDescription,
    handleSubmit, handleFileChange
}) => {
    const { t } = useTranslation();
    const { Option } = Select;

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

    const handlePreview = async (file) => {
        setPreviewImage(file.thumbUrl);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList }) => setFileList(fileList);

    return (
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
                    name='price'
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber
                        prefix="€"
                        value={price}
                        onChange={(value) => setPrice(parseInt(value, 10))}
                        style={{
                            width: '100%',
                        }}
                    />
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

                <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" onClick={onSubmit} size='large' style={{ backgroundColor: 'orange', width: '150px' }}>
                        {t('add')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default TarnsportForm;