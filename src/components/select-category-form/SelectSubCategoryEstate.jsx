import React from "react";
import { Form } from 'react-bootstrap';

const SelectSubCategoryEstate = ({ handleSubcategoryChange, t }) => {
    return ( 
        <Form.Select aria-label="Default select example" onChange={handleSubcategoryChange} className="mb-3">
            <option>{t('choce_subcategory')}</option>
            <option value="sale_estate">{t('sale_estate')}</option>
            <option value="rent_estate">{t('rent_estate')}</option>
        </Form.Select>
     );
}
 
export default SelectSubCategoryEstate;