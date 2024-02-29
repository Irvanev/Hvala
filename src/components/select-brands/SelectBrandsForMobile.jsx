import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectBrandsForMobile = ({brand, setBrand}) => {
    const {t} = useTranslation();
    return (
        <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option>{t('brand')}</option>
            <option value="Samsung">Samsung</option>
            <option value="Apple">Apple</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Huawei">Huawei</option>
            <option value="Honor">Honor</option>
            <option value="HTC">HTC</option>
            <option value="Oppo">Oppo</option>
            <option value="Realme">Realme</option>
            <option value="Nokia">Nokia</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Acer">Acer</option>
            <option value="Alcatel">Alcatel</option>
            <option value="Asus">Asus</option>
            <option value="LG">LG</option>
            <option value="Meizu">Meizu</option>
            <option value="Google">Google</option>
            <option value="Oppo">Oppo</option>
        </Form.Select>
    );
}

export default SelectBrandsForMobile;