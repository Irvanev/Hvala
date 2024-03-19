import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectBrandsForComputers = ({brand, setBrand}) => {
    const {t} = useTranslation();
    return (
        <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option >{t('brand')}</option>
            <option value="Samsung">Samsung</option>
            <option value="Apple">Apple</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Huawei">Huawei</option>
            <option value="Honor">Honor</option>
            <option value="Acer">Acer</option>
            <option value="Asus">Asus</option>
            <option value="LG">LG</option>
            <option value="Google">Google</option>
            <option value="MSI">MSI</option>
        </Form.Select>
    );
}

export default SelectBrandsForComputers;