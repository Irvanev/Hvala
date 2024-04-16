import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryHomeAppliance = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'refrigerators', label: t('refrigerators') },
                    { value: 'washing_machines', label: t('washing_machines') },
                    { value: 'vacuum_cleaners', label: t('vacuum_cleaners') },
                    { value: 'stoves_and_ovens', label: t('stoves_and_ovens') },
                    { value: 'sewing_equipment', label: t('sewing_equipment') },
                    { value: 'food_preparation', label: t('food_preparation') },
                    { value: 'dishwasher', label: t('dishwasher') },
                    { value: 'other_cat', label: t('other_cat') }

                ]}
            />
        </>
    );
}

export default SelectSubCategoryHomeAppliance;