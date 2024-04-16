import React from "react";
import { Form } from 'react-bootstrap';
import { Select } from 'antd';

const SelectSubCategoryTransport = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'auto', label: t('auto') },
                    { value: 'moto', label: t('moto') },
                    { value: 'water_transport', label: t('water_transport') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryTransport;