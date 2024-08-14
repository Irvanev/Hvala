import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function BuildingMaterial({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option value="tools">{t('tools')}</Option>
            <Option value="building_materials">{t('building_materials')}</Option>
            <Option value="heating_and_ventilation">{t('heating_and_ventilation')}</Option>
            <Option value="plumbing">{t('plumbing')}</Option>
            <Option value="electrics">{t('electrics')}</Option>
            <Option value="windows">{t('windows')}</Option>
            <Option value="doors">{t('doors')}</Option>
        </Select>
    )
}
