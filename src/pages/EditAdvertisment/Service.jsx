import React from 'react'

export default function Service({ t }) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="education">{t('education')}</option>
            <option value="handyman">{t('handyman')}</option>
            <option value="beauty_and_health"> {t('beauty_and_health')}</option>
            <option value="transportation"> {t('transportation')}</option>
            <option value="repair_and_construction"> {t('repair_and_construction')}</option>
            <option value="computer_services"> {t('computer_services')}</option>
            <option value="business_services"> {t('business_services')}</option>
            <option value="cleaning"> {t('cleaning')}</option>
            <option value="automotive_services"> {t('automotive_services')}</option>
            <option value="appliance_repair"> {t('appliance_repair')}</option>
            <option value="event_planning"> {t('event_planning')}</option>
            <option value="photography_and_videography"> {t('photography_and_videography')}</option>
            <option value="custom_manufacturing"> {t('custom_manufacturing')}</option>
            <option value="pet_care"> {t('pet_care')}</option>
        </>
    )
}
