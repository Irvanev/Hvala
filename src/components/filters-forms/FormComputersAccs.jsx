import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const FormComputersAccs = ({
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
            <label className='mt-3'>{t('type')}</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">{t('choice_type')}</Option>
                <Option>{t('type')}</Option>
                <Option value="mouse">{t('mouse')}</Option>
                <Option value="keyboard">{t('keyboard')}</Option>
                <Option value="headphones">{t('headphones')}</Option>
                <Option value="monitor">{t('monitor')}</Option>
            </Select>
        </>
    );
}

export default FormComputersAccs;