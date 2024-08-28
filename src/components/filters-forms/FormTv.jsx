import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const FormTv = ({condition, setCondition, 
    brand, setBrand, 
    screen_size, setScreenSize
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
                <Option value="Apple">Apple</Option>
                <Option value="Samsung">Samsung</Option>
            </Select>
            <label className='mt-3'>{t('size_screen')}</label>
            <Select style={{ width: '100%' }} onChange={setScreenSize} value={screen_size}>
                <Option value="">{t('choice_screen_size')}</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </>
    );
}

export default FormTv;