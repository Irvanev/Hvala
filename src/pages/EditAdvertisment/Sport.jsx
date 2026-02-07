import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

export default function Sport({ handleSubCategoryChange, subcategory, t }) {
    return (
        <Select
            className="mb-3"
            aria-label="Default select example"
            onChange={handleSubCategoryChange}
            value={subcategory}
            style={{ width: '100%' }}
        >
            <Option>{t('choce_subcategory')}</Option>
            <Option value="sports_protections">{t('sports_protections')}</Option>
            <Option value="bicycles">{t('bicycles')}</Option>
            <Option value="scooters"> {t('scooters')}</Option>
            <Option value="skateboards"> {t('skateboards')}</Option>
            <Option
                value="hoverboards_and_electric_scooters"> {t('hoverboards_and_electric_scooters')}</Option>
            <Option value="ball_games"> {t('ball_games')}</Option>
            <Option value="hunting_and_fishing"> {t('hunting_and_fishing')}</Option>
            <Option value="tourism_and_outdoor_recreation"> {t('tourism_and_outdoor_recreation')}</Option>
            <Option value="billiards_and_bowling"> {t('billiards_and_bowling')}</Option>
            <Option value="tennis_and_badminton"> {t('tennis_and_badminton')}</Option>
            <Option value="exercise_equipment_and_fitness"> {t('exercise_equipment_and_fitness')}</Option>
            <Option value="sports_nutrition"> {t('sports_nutrition')}</Option>
            <Option value="water_sports"> {t('water_sports')}</Option>
            <Option value="sapboards"> {t('sapboards')}</Option>
            <Option value="other_cat"> {t('other_cat')}</Option>
        </Select>
    )
}
