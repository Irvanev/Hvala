import React from 'react'

export default function HealthBeauty({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="makeup">{t('makeup')}</option>
            <option value="manicure_and_pedicure">{t('manicure_and_pedicure')}</option>
            <option value="healthcare_products"> {t('healthcare_products')}</option>
            <option value="perfume"> {t('perfume')}</option>
            <option value="skincare"> {t('skincare')}</option>
            <option value="haircare"> {t('haircare')}</option>
            <option value="tattoos_and_tatooing"> {t('tattoos_and_tatooing')}</option>
            <option value="tanning_and_sunbeds"> {t('tanning_and_sunbeds')}</option>
            <option value="personal_hygiene_products"> {t('personal_hygiene_products')}</option>
            <option value="other_cat"> {t('other_cat')}</option>
        </>
    )
}
