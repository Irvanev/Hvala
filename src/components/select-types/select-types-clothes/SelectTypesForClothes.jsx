import React from "react";
import { Form } from "react-bootstrap"
import { useTranslation } from "react-i18next";

const SelectTypesForClothes = ({ type, setType }) => {
    const { t } = useTranslation();
    return (
        <div>
            <Form.Select aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)}>
                <option>{t('type')}</option>
                <option value="outwear">{t('outwear')}</option>
                <option value="hats">{t('hats')}</option>
                <option value="accessories">{t('accessories')}</option>
                <option value="homewear">{t('homewear')}</option>
                <option value="underwear">{t('underwear')}</option>
                <option value="shoes">{t('shoes')}</option>
                <option value="jackets_and_suits">{t('jackets_and_suits')}</option>
                <option value="shirts">{t('shirts')}</option>
                <option value="Steam sweaters_and_hoodies">{t('sweaters_and_hoodies')}</option>
                <option value="Nvidia workwear">{t('workwear')}</option>
                <option value="sportswear">{t('sportswear')}</option>
                <option value="t_shirts_and_polos">{t('t_shirts_and_polos')}</option>
                <option value="pants_and_shorts">{t('pants_and_shorts')}</option>
                <option value="rest">{t('rest')}</option>
            </Form.Select>
        </div>
    );
}

export default SelectTypesForClothes;