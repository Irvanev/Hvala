import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Service({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="education">{t('education')}</Option>
            <Option value="handyman">{t('handyman')}</Option>
            <Option value="beauty_and_health"> {t('beauty_and_health')}</Option>
            <Option value="transportation"> {t('transportation')}</Option>
            <Option value="taxi"> {t('taxi')}</Option>
            <Option value="transfer"> {t('transfer')}</Option>
            <Option value="repair_and_construction"> {t('repair_and_construction')}</Option>
            <Option value="computer_services"> {t('computer_services')}</Option>
            <Option value="business_services"> {t('business_services')}</Option>
            <Option value="cleaning"> {t('cleaning')}</Option>
            <Option value="automotive_services"> {t('automotive_services')}</Option>
            <Option value="appliance_repair"> {t('appliance_repair')}</Option>
            <Option value="event_planning"> {t('event_planning')}</Option>
            <Option value="photography_and_videography"> {t('photography_and_videography')}</Option>
            <Option value="custom_manufacturing"> {t('custom_manufacturing')}</Option>
            <Option value="pet_care"> {t('pet_care')}</Option>
        </Select>
    )
}
