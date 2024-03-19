import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectBrandsForVideo = ({brand, setBrand}) => {
    const {t} = useTranslation();
    return (
        <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
             <option>{t('brand')}</option>
            <option value="Canon">Canon</option>
            <option value="Nikon">Nikon</option>
            <option value="Sony">Sony</option>
            <option value="Fujifilm">Fujifilm</option>
            <option value="Honor">Olympus</option>
            <option value="Sigma">Sigma</option>
            <option value="Polaroid">Polaroid</option>
            <option value="Panasonic">Panasonic</option>
        </Form.Select>
    );
}

export default SelectBrandsForVideo;