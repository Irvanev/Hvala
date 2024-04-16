import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Select, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const ClothesForm = ({
    title, setTitle,
    price, setPrice,
    size, setSize,
    brand, setBrand,
    type, setType,
    condition, setCondition,
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
                    name='prie'
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
                <Form.Item
                    label={t('size')}
                    name="size"
                    rules={[{ required: true, message: 'Please select the size!' }]}
                >
                    <Select value={size} onChange={(value) => setSize(value)}>
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
                <Form.Item label={t('brand')}>
                    <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
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

export default ClothesForm;