import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Electronics({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="computers">{t('computers')}</Option>
            <Option value="phones_and_tablets">{t('phones_and_tablets')}</Option>
            <Option value="tv"> {t('tv')}</Option>
            <Option value="computer_accessories"> {t('computer_accessories')}</Option>
            <Option value="photo_video"> {t('photo_video')}</Option>
            <Option value="game_console"> {t('game_console')}</Option>
        </Select>
    )
}
