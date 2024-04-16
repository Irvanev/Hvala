import React from "react";
import { Form } from "react-bootstrap"
import { Select } from 'antd';

const SelectSubCategorySport = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'sports_protections', label: t('sports_protections') },
                    { value: 'bicycles', label: t('bicycles') },
                    { value: 'scooters', label: t('scooters') },
                    { value: 'skateboards', label: t('skateboards') },
                    { value: 'hoverboards_and_electric_scooters', label: t('hoverboards_and_electric_scooters') },
                    { value: 'ball_games', label: t('ball_games') },
                    { value: 'hunting_and_fishing', label: t('hunting_and_fishing') },
                    { value: 'tourism_and_outdoor_recreation', label: t('tourism_and_outdoor_recreation') },
                    { value: 'billiards_and_bowling', label: t('billiards_and_bowling') },
                    { value: 'tennis_and_badminton', label: t('tennis_and_badminton') },
                    { value: 'exercise_equipment_and_fitness', label: t('exercise_equipment_and_fitness') },
                    { value: 'sports_nutrition', label: t('sports_nutrition') },
                    { value: 'water_sports', label: t('water_sports') },
                    { value: 'sapboards', label: t('sapboards') },
                    { value: 'other_cat', label: t('other_cat') }
                ]}
            />
        </>
    );
}

export default SelectSubCategorySport;