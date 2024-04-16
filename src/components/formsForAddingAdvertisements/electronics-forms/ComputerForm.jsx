import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Select, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const ComputerForm = ({
    title, setTitle,
    price, setPrice,
    brand, setBrand,
    model, setModel,
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
};

export default ComputerForm;