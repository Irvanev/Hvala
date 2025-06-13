import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryShoes = ({handleSubcategoryChange, t}) => {
    return ( 
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'men_shoes', label: t('mens_shoes') },
                    { value: 'women_shoes', label: t('womens_shoes') },
                    { value: 'children_shoes', label: t('childrens_shoes') }
                ]}
            />
        </>
     );
}
 
export default SelectSubCategoryShoes;