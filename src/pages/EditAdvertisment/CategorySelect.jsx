import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const CategorySelect = ({ handleCategoryChange, category }) => {
    const { t } = useTranslation();

    return (
        <div>
            <Select
                className="mb-3"
                aria-label="Default select example"
                onChange={handleCategoryChange}
                value={category}
                style={{ width: '100%' }}
            >
                <Option value="">{t('choce_category')}</Option>
                <Option value="estate">{t('estate')}</Option>
                <Option value="transport">{t('transport')}</Option>
                <Option value="clothes">{t('clothes')}</Option>
                <Option value="electronics">{t('electronics')}</Option>
                <Option value="house_goods">{t('house_goods')}</Option>
                <Option value="building_materials_and_tools">{t('building_materials_and_tools')}</Option>
                <Option value="transport_goods">{t('transport_goods')}</Option>
                <Option value="home_appliance">{t('home_appliance')}</Option>
                <Option value="service">{t('service')}</Option>
                <Option value="child_goods">{t('child_goods')}</Option>
                <Option value="health_and_beauty">{t('health_and_beauty')}</Option>
                <Option value="sport">{t('sport')}</Option>
                <Option value="hobby_n_Relax">{t('hobby_n_Relax')}</Option>
                <Option value="rest">{t('rest')}</Option>
            </Select>
        </div>
    );
};

export default CategorySelect;