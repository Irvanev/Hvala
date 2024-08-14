import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Clothes({ handleSubCategoryChange, subcategory, t }) {
    return (
        <>
            <Select
                aria-label="Default select example"
                onChange={handleSubCategoryChange}
                value={subcategory}
                style={{ width: '100%' }}
            >
                <Option value="mens_clothing">{t('mens_clothing')}</Option>
                <Option value="womens_clothing">{t('womens_clothing')}</Option>
                <Option value="childrens_clothing">{t('childrens_clothing')}</Option>
            </Select>
        </>
    )
}
