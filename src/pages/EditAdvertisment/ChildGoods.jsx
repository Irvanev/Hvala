import React from 'react'

export default function ChildGoods({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="car_seats">{t('car_seats')}</option>
            <option value="health_and_care">{t('health_and_care')}</option>
            <option value="toys_and_games"> {t('toys_and_games')}</option>
            <option value="strollers"> {t('strollers')}</option>
            <option value="feeding_and_nutrition"> {t('feeding_and_nutrition')}</option>
            <option value="bathing"> {t('bathing')}</option>
            <option value="nursery"> {t('nursery')}</option>
            <option value="diapers_and_potties"> {t('diapers_and_potties')}</option>
            <option value="baby_monitors"> {t('baby_monitors')}</option>
            <option value="maternity_products"> {t('maternity_products')}</option>
            <option value="schoold_supplies"> {t('schoold_supplies')}</option>
            <option value="other_cat"> {t('other_cat')}</option>
        </>
    )
}
