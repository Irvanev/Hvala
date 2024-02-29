import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SelectTypeForComputer = ({type, setType}) => {
    const {t} = useTranslation();
    return (
        <Form.Select aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)}>
            <option>{t('type')}</option>
            <option value="laptop">{t('laptop')}</option>
            <option value="stationary_computer">{t('stationary_computer')}</option>
            <option value="micro_computer">{t('micro_computer')}</option>
            <option value="monoblock">{t('monoblock')}</option>
        </Form.Select>
    );
}

export default SelectTypeForComputer;