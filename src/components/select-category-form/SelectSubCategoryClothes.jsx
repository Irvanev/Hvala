import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryClothes = ({handleSubcategoryChange, t}) => {
    return ( 
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'mens_clothing', label: t('mens_clothing') },
                    { value: 'womens_clothing', label: t('womens_clothing') },
                    { value: 'childrens_clothing', label: t('childrens_clothing') }
                ]}
            />
        </>
     );
}
 
export default SelectSubCategoryClothes;