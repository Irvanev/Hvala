import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Shoes({ handleSubCategoryChange, subcategory, t }) {
    return (
        <>
            <Select
                aria-label="Default select example"
                onChange={handleSubCategoryChange}
                value={subcategory}
                style={{ width: '100%' }}
            >
                <Option value="men_shoes">{t('mens_shoes')}</Option>
                <Option value="women_shoes">{t('womens_shoes')}</Option>
                <Option value="children_shoes">{t('childrens_shoes')}</Option>
            </Select>
        </>
    )
}
