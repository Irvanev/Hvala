import React from "react";
import { Form } from "react-bootstrap"
import { Select } from 'antd';

const SelectSubCategoryChildGoods = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'car_seats', label: t('car_seats') },
                    { value: 'health_and_care', label: t('health_and_care') },
                    { value: 'toys_and_games', label: t('toys_and_games') },
                    { value: 'strollers', label: t('strollers') },
                    { value: 'feeding_and_nutrition', label: t('feeding_and_nutrition') },
                    { value: 'bathing', label: t('bathing') },
                    { value: 'nursery', label: t('nursery') },
                    { value: 'diapers_and_potties', label: t('diapers_and_potties') },
                    { value: 'baby_monitors', label: t('baby_monitors') },
                    { value: 'maternity_products', label: t('maternity_products') },
                    { value: 'schoold_supplies', label: t('schoold_supplies') },
                    { value: 'other_cat', label: t('other_cat') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryChildGoods;