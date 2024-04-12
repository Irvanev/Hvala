import React from "react";
import { Form } from "react-bootstrap";

const SelectSubCategoryTransportGoods = ({handleSubcategoryChange, t}) => {
    return (
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
            <option>{t('choce_subcategory')}</option>
            <option value="spares">{t('spares')}</option>
            <option value="tires_and_wheels">{t('tires_and_wheels')}</option>
            <option value="accessories_and_tools"> {t('accessories_and_tools')}</option>
        </Form.Select>
    );
}

export default SelectSubCategoryTransportGoods;