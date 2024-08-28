import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const FormClothes = ({condition, setCondition, type, setType, size, setSize}) => {

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
            <label className='mt-3'>{t('type')}</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">{t('choice_type')}</Option>
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
            <label className='mt-3'>{t('size')}</label>
            <Select style={{ width: '100%' }} onChange={setSize} value={size}>
                <Option value="">{t('choice_size')}</Option>
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
        </>
    );
}

export default FormClothes;