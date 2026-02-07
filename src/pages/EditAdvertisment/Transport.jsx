import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Transport({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="auto">{t('auto')}</Option>
            <Option value="moto"> {t('moto')}</Option>
            <Option value="water_transport">{t('water_transport')}</Option>
        </Select>
    )
}
