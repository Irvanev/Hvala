import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const FormComputers = ({
    condition, setCondition,
    brand, setBrand,
    type, setType
}) => {

    const { Option } = Select;
    const { t } = useTranslation();

    return (
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
            <label className='mt-3'>{t('brand')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">{t('choice_brand')}</Option>
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
            <label className='mt-3'>{t('type')}</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">{t('choice_type')}</Option>
                <Option value="laptop">{t('laptop')}</Option>
                <Option value="stationary_computer">{t('stationary_computer')}</Option>
                <Option value="micro_computer">{t('micro_computer')}</Option>
                <Option value="monoblock">{t('monoblock')}</Option>
            </Select>
        </>
    );
}

export default FormComputers;