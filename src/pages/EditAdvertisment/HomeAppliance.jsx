import React from 'react'

export default function HomeAppliance({t}) {
    return (
        <>
            <option>{t('choce_subcategory')}</option>
            <option value="refrigerators">{t('refrigerators')}</option>
            <option value="washing_machines">{t('washing_machines')}</option>
            <option value="vacuum_cleaners"> {t('vacuum_cleaners')}</option>
            <option value="stoves_and_ovens"> {t('stoves_and_ovens')}</option>
            <option value="sewing_equipment"> {t('sewing_equipment')}</option>
            <option value="food_preparation"> {t('food_preparation')}</option>
            <option value="dishwasher"> {t('dishwasher')}</option>
            <option value="other_cat"> {t('other_cat')}</option>
        </>
    )
}
