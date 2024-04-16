import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectCategory = ({ handleCategoryChange, t }) => {
    return (
        <>
            <Form.Label>{t('category')}</Form.Label>
            <Select
                onChange={handleCategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'estate', label: t('estate') },
                    { value: 'transport', label: t('transport') },
                    { value: 'clothes', label: t('clothes') },
                    { value: 'electronics', label: t('electronics') },
                    { value: 'house_goods', label: t('house_goods') },
                    { value: 'building_materials_and_tools', label: t('building_materials_and_tools') },
                    { value: 'transport_goods', label: t('transport_goods') },
                    { value: 'home_appliance', label: t('home_appliance') },
                    { value: 'service', label: t('service') },
                    { value: 'child_goods', label: t('child_goods') },
                    { value: 'health_and_beauty', label: t('health_and_beauty') },
                    { value: 'sport', label: t('sport') },
                    { value: 'hobby_n_Relax', label: t('hobby_n_Relax') },
                    { value: 'rest', label: t('rest') }
                ]}
            />
        </>
    );
}

export default SelectCategory;