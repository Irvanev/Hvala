import React from "react";
import { Form } from "react-bootstrap"

const SelectSubCategoryHobby = ({handleSubcategoryChange, t}) => {
    return (
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
            <option>{t('choce_subcategory')}</option>
            <option value="table_games">{t('table_games')}</option>
            <option value="computer_games">{t('computer_games')}</option>
            <option value="books_n_magazines"> {t('books_n_magazines')}</option>
            <option value="tickets"> {t('tickets')}</option>
            <option value="collections"> {t('collections')}</option>
            <option value="art_materials"> {t('art_materials')}</option>
            <option value="music"> {t('music')}</option>
            <option value="music_tools"> {t('music_tools')}</option>
        </Form.Select>
    );
}

export default SelectSubCategoryHobby;