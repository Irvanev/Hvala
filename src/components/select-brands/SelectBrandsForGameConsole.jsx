import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectBrandsForGameCondole = ({brand, setBrand}) => {
    const {t} = useTranslation();
    return ( 
        <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option>{t('brand')}</option>
            <option value="Sony PlayStation">Sony PlayStation</option>
            <option value="Microsoft Xbox">Microsoft Xbox</option>
            <option value="Nintendo">Nintendo</option>
            <option value="Sega">Sega</option>
            <option value="Atari">Atari</option>
            <option value="SNK">SNK</option>
            <option value="Neo Geo">Neo Geo</option>
            <option value="Ouya">Ouya</option>
            <option value="Steam Machine">Steam Machine</option>
            <option value="Nvidia Sheild">Nvidia Sheild</option>
            <option value="Intellivision">Intellivision</option>
            <option value="GameBoy">GameBoy</option>
        </Form.Select>
     );
}
 
export default SelectBrandsForGameCondole;