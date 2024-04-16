import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryBuilding = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'sale_estate', label: t('sale_estate') },
                    { value: 'rent_estate', label: t('rent_estate') },
                    { value: 'tools', label: t('tools') },
                    { value: 'building_materials', label: t('building_materials') },
                    { value: 'heating_and_ventilation', label: t('heating_and_ventilation') },
                    { value: 'plumbing', label: t('plumbing') },
                    { value: 'electrics', label: t('electrics') },
                    { value: 'windows', label: t('windows') },
                    { value: 'doors', label: t('doors') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryBuilding;