import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const FormSmartphonesAndTablets = ({
    condition, setCondition, 
    brand, setBrand, 
    memory, setMemory, 
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
            <label className='mt-3'>{t('memory')}</label>
            <Select style={{ width: '100%' }} onChange={setMemory} value={memory}>
                <Option value="">{t('choice_memory')}</Option>
                <Option value="32">32Gb</Option>
                <Option value="64">64Gb</Option>
                <Option value="128">128Gb</Option>
                <Option value="256">256Gb</Option>
                <Option value="512">512Gb</Option>
            </Select>
            <label className='mt-3'>{t('size_screen')}</label>
            <Select style={{ width: '100%' }} onChange={setScreenSize} value={screen_size}>
                <Option value="">{t('choice_screen_size')}</Option>
                <Option value="7">5</Option>
                <Option value="7">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </>
    );
}

export default FormSmartphonesAndTablets;