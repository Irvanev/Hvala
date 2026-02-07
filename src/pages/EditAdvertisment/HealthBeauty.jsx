import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function HealthBeauty({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="makeup">{t('makeup')}</Option>
            <Option value="manicure_and_pedicure">{t('manicure_and_pedicure')}</Option>
            <Option value="healthcare_products"> {t('healthcare_products')}</Option>
            <Option value="perfume"> {t('perfume')}</Option>
            <Option value="skincare"> {t('skincare')}</Option>
            <Option value="haircare"> {t('haircare')}</Option>
            <Option value="tattoos_and_tatooing"> {t('tattoos_and_tatooing')}</Option>
            <Option value="tanning_and_sunbeds"> {t('tanning_and_sunbeds')}</Option>
            <Option value="personal_hygiene_products"> {t('personal_hygiene_products')}</Option>
            <Option value="other_cat"> {t('other_cat')}</Option>
        </Select >
    )
}
