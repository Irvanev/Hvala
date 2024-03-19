import React from "react";
import { Form } from "react-bootstrap"

const SelectSubCategorySport = ({handleSubcategoryChange, t}) => {
    return (
        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
            <option>Выберите подкатегорию</option>
            <option value="sports_protections">{t('sports_protections')}</option>
            <option value="bicycles">{t('bicycles')}</option>
            <option value="scooters"> {t('scooters')}</option>
            <option value="skateboards"> {t('skateboards')}</option>
            <option value="hoverboards_and_electric_scooters"> {t('hoverboards_and_electric_scooters')}</option>
            <option value="ball_games"> {t('ball_games')}</option>
            <option value="hunting_and_fishing"> {t('hunting_and_fishing')}</option>
            <option value="tourism_and_outdoor_recreation"> {t('tourism_and_outdoor_recreation')}</option>
            <option value="billiards_and_bowling"> {t('billiards_and_bowling')}</option>
            <option value="tennis_and_badminton"> {t('tennis_and_badminton')}</option>
            <option value="exercise_equipment_and_fitness"> {t('exercise_equipment_and_fitness')}</option>
            <option value="sports_nutrition"> {t('sports_nutrition')}</option>
            <option value="water_sports"> {t('water_sports')}</option>
            <option value="sapboards"> {t('sapboards')}</option>
            <option value="other_cat"> {t('other_cat')}</option>
        </Form.Select>
    );
}

export default SelectSubCategorySport;