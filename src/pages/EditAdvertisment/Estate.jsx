import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Estate({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="sale_estate">{t('sale_estate')}</Option>
            <Option value="rent_estate">{t('rent_estate')}</Option>
        </Select>
    )
}
