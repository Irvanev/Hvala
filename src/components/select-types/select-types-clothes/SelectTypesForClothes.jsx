import React from "react";
import { Select } from 'antd';
import { useTranslation } from "react-i18next";

const SelectTypesForClothes = ({ type, setType }) => {
    const { t } = useTranslation();
    const { Option } = Select;
    return (
        <div>
            <Select aria-label="Default select example" value={type} onChange={(value) => setType(value)} style={{width: '100%'}}>
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
        </div>
    );
}

export default SelectTypesForClothes;