import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectTypesForComputersAccs = ({type, setType}) => {
    const {t} = useTranslation();
    return (
        <Form.Select aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)}>
            <option>{t('type')}</option>
            <option value="mouse">{t('mouse')}</option>
            <option value="keyboard">{t('keyboard')}</option>
            <option value="headphones">{t('headphones')}</option>
            <option value="monitor">{t('monitor')}</option>
        </Form.Select>
    );
}

export default SelectTypesForComputersAccs;