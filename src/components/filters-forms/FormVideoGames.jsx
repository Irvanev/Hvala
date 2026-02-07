import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const FormVideoGames = ({
    condition, setCondition, 
    brand, setBrand
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
                <Option value="Sony PlayStation">Sony PlayStation</Option>
                <Option value="Microsoft Xbox">Microsoft Xbox</Option>
                <Option value="Nintendo">Nintendo</Option>
                <Option value="Sega">Sega</Option>
                <Option value="Atari">Atari</Option>
                <Option value="SNK">SNK</Option>
                <Option value="Neo Geo">Neo Geo</Option>
                <Option value="Ouya">Ouya</Option>
                <Option value="Steam Machine">Steam Machine</Option>
                <Option value="Nvidia Sheild">Nvidia Sheild</Option>
                <Option value="Intellivision">Intellivision</Option>
                <Option value="GameBoy">GameBoy</Option>
            </Select>
        </>
    );
}

export default FormVideoGames;