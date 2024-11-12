import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Select } from 'antd';
import LocationService from './LocationService';
const { Option } = Select;

const RegionSelector = ({ region, setRegion, country, setCountry }) => {
    const { t } = useTranslation();
    const lservice = new LocationService();
    const regionChoice = lservice.getRegionChoice(t);

    // Инициализируем форму
    const [form] = Form.useForm();

    useEffect(() => {
        console.log("Updated region from outside:", region);

        // Обновляем значение поля 'region' в форме
        form.setFieldsValue({ region });
    }, [region, form]);

    return (
        <Form form={form}>
            <Form.Item
                label={t('region')}
                name="region" // Форма будет управлять этим полем
                rules={[{ required: true, message: t('please_select_region') }]}
            >
                <Select
                    showSearch
                    placeholder={t('select_region')}
                    optionFilterProp="children"
                    onChange={(value) => setRegion(value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {Object.entries(regionChoice).map(([key, label]) => (
                        <Option key={key} value={key}>
                            {label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default RegionSelector;
