import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function ChildGoods({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="car_seats">{t('car_seats')}</Option>
            <Option value="health_and_care">{t('health_and_care')}</Option>
            <Option value="toys_and_games"> {t('toys_and_games')}</Option>
            <Option value="strollers"> {t('strollers')}</Option>
            <Option value="feeding_and_nutrition"> {t('feeding_and_nutrition')}</Option>
            <Option value="bathing"> {t('bathing')}</Option>
            <Option value="nursery"> {t('nursery')}</Option>
            <Option value="diapers_and_potties"> {t('diapers_and_potties')}</Option>
            <Option value="baby_monitors"> {t('baby_monitors')}</Option>
            <Option value="maternity_products"> {t('maternity_products')}</Option>
            <Option value="schoold_supplies"> {t('schoold_supplies')}</Option>
            <Option value="other_cat"> {t('other_cat')}</Option>
        </Select>
    )
}
