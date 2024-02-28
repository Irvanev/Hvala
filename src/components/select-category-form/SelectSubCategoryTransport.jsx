import React from "react";
import { Form } from 'react-bootstrap';

const SelectSubCategoryTransport = ({handleSubcategoryChange, t}) => {
    return (
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
            <option>Выберите подкатегорию</option>
            <option value="auto">{t('auto')}</option>
            <option value="moto"> {t('moto')}</option>
            <option value="water_transport">{t('water_transport')}</option>
        </Form.Select>
    );
}

export default SelectSubCategoryTransport;