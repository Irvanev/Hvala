import React from "react";
import { Form } from "react-bootstrap";

const SelectSubCategoryBuilding = ({handleSubcategoryChange, t}) => {
    return (
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
            <option>Выберите подкатегорию</option>
            <option value="tools">{t('tools')}</option>
            <option value="building_materials">{t('building_materials')}</option>
            <option value="heating_and_ventilation"> {t('heating_and_ventilation')}</option>
            <option value="plumbing"> {t('plumbing')}</option>
            <option value="electrics"> {t('electrics')}</option>
            <option value="windows"> {t('windows')}</option>
            <option value="doors"> {t('doors')}</option>
        </Form.Select>
    );
}

export default SelectSubCategoryBuilding;