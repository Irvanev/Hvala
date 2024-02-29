import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectBrandsForComputersAccs = ({brand, setBrand}) => {
    const {t} = useTranslation();
    return (
        <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option>{t('brand')}</option>
            <option value="Logitech">Logitech</option>
            <option value="Razer">Razer</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Corsair">Corsair</option>
            <option value="SteelSeries">SteelSeries</option>
            <option value="HyperX">HyperX</option>
            <option value="Asus">Asus</option>
            <option value="HP">HP</option>
            <option value="Dell">Dell</option>
            <option value="MSI">MSI</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Acer">Acer</option>
            <option value="Apple">Apple</option>
            <option value="Thermaltake">Thermaltake</option>
            <option value="Kingston">Kingston</option>
        </Form.Select>
    );
}

export default SelectBrandsForComputersAccs;