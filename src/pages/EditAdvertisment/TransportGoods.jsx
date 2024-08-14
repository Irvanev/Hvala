import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function TransportGoods({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="spares">{t('spares')}</Option>
            <Option value="tires_and_wheels">{t('tires_and_wheels')}</Option>
            <Option value="accessories_and_tools"> {t('accessories_and_tools')}</Option>
        </Select>
    )
}
