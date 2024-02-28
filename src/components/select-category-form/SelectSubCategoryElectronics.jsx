import React from "react";
import { Form } from "react-bootstrap";

const SelectSubCategoryElectronics = ({handleSubcategoryChange, t}) => {
    return (
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
            <option>Выберите подкатегорию</option>
            <option value="computers">{t('computers')}</option>
            <option value="phones_and_tablets">{t('phones_and_tablets')}</option>
            <option value="tv"> {t('tv')}</option>
            <option value="computer_accessories"> {t('computer_accessories')}</option>
            <option value="photo_video"> {t('photo_video')}</option>
            <option value="game_console"> {t('game_console')}</option>
        </Form.Select>
    );
}

export default SelectSubCategoryElectronics;