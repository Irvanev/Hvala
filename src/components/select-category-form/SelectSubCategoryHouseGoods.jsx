import React from "react";
import { Form } from "react-bootstrap";

const SelectSubCategoryHouseGoods = ({handleSubcategoryChange, t}) => {
    return (
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
            <option>{t('choce_subcategory')}</option>
            <option value="furniture">{t('furniture')}</option>
            <option value="lighting">{t('lighting')}</option>
            <option value="dishes"> {t('dishes')}</option>
            <option value="garden_equipment"> {t('garden_equipment')}</option>
            <option value="domestic_cleaning"> {t('domestic_cleaning')}</option>
            <option value="kitchen_equipment"> {t('kitchen_equipment')}</option>
            <option value="other_cat"> {t('other_cat')}</option>
        </Form.Select>
    );
}

export default SelectSubCategoryHouseGoods;