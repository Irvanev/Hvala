import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryTransportGoods = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'spares', label: t('spares') },
                    { value: 'tires_and_wheels', label: t('tires_and_wheels') },
                    { value: 'accessories_and_tools', label: t('accessories_and_tools') }

                ]}
            />
        </>
    );
}

export default SelectSubCategoryTransportGoods;