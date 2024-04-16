import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryHouseGoods = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'furniture', label: t('furniture') },
                    { value: 'lighting', label: t('lighting') },
                    { value: 'dishes', label: t('dishes') },
                    { value: 'garden_equipment', label: t('garden_equipment') },
                    { value: 'domestic_cleaning', label: t('domestic_cleaning') },
                    { value: 'kitchen_equipment', label: t('kitchen_equipment') },
                    { value: 'other_cat', label: t('other_cat') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryHouseGoods;