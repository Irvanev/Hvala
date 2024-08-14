import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function HobbyRelax({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="table_games">{t('table_games')}</Option>
            <Option value="computer_games">{t('computer_games')}</Option>
            <Option value="books_n_magazines"> {t('books_n_magazines')}</Option>
            <Option value="tickets"> {t('tickets')}</Option>
            <Option value="collections"> {t('collections')}</Option>
            <Option value="art_materials"> {t('art_materials')}</Option>
            <Option value="music"> {t('music')}</Option>
            <Option value="music_tools"> {t('music_tools')}</Option>
        </Select>
    )
}
