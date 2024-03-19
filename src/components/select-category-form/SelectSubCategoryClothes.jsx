import React from "react";
import { Form } from "react-bootstrap";

const SelectSubCategoryClothes = ({handleSubcategoryChange, t}) => {
    return ( 
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
        <option>Выберите подкатегорию</option>
        <option value="mens_clothing">{t('mens_clothing')}</option>
        <option value="womens_clothing">{t('womens_clothing')}</option>
        <option value="childrens_clothing">{t('childrens_clothing')}</option>
    </Form.Select>
     );
}
 
export default SelectSubCategoryClothes;