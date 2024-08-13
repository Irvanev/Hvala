import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Clothes({ t }) {
    return (
        <Select>
            <Option value="">{t('choce_subcategory')}</Option>
            <Option value="mens_clothing">{t('mens_clothing')}</Option>
            <Option value="womens_clothing">{t('womens_clothing')}</Option>
            <Option value="childrens_clothing">{t('childrens_clothing')}</Option>
        </Select>
    )
}
