import React from "react";
import { Form } from "react-bootstrap"
import { Select } from 'antd';

const SelectSubCategoryHealth = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'makeup', label: t('makeup') },
                    { value: 'manicure_and_pedicure', label: t('manicure_and_pedicure') },
                    { value: 'healthcare_products', label: t('healthcare_products') },
                    { value: 'perfume', label: t('perfume') },
                    { value: 'skincare', label: t('skincare') },
                    { value: 'haircare', label: t('haircare') },
                    { value: 'tattoos_and_tatooing', label: t('tattoos_and_tatooing') },
                    { value: 'tanning_and_sunbeds', label: t('tanning_and_sunbeds') },
                    { value: 'personal_hygiene_products', label: t('personal_hygiene_products') },
                    { value: 'other_cat', label: t('other_cat') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryHealth;