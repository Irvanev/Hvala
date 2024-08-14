import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function HouseGoods({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="furniture">{t('furniture')}</Option>
            <Option value="lighting">{t('lighting')}</Option>
            <Option value="dishes"> {t('dishes')}</Option>
            <Option value="garden_equipment"> {t('garden_equipment')}</Option>
            <Option value="domestic_cleaning"> {t('domestic_cleaning')}</Option>
            <Option value="kitchen_equipment"> {t('kitchen_equipment')}</Option>
            <Option value="other_cat"> {t('other_cat')}</Option>
        </Select>
    )
}
