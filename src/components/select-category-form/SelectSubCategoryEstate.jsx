import React from "react";
import { Form } from 'react-bootstrap';
import { Select } from 'antd';

const SelectSubCategoryEstate = ({ handleSubcategoryChange, t }) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'sale_estate', label: t('sale_estate') },
                    { value: 'rent_estate', label: t('rent_estate') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryEstate;