import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function HomeAppliance({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="refrigerators">{t('refrigerators')}</Option>
            <Option value="washing_machines">{t('washing_machines')}</Option>
            <Option value="vacuum_cleaners"> {t('vacuum_cleaners')}</Option>
            <Option value="stoves_and_ovens"> {t('stoves_and_ovens')}</Option>
            <Option value="sewing_equipment"> {t('sewing_equipment')}</Option>
            <Option value="food_preparation"> {t('food_preparation')}</Option>
            <Option value="dishwasher"> {t('dishwasher')}</Option>
            <Option value="other_cat"> {t('other_cat')}</Option>
        </Select>
    )
}
