import React from 'react'

export default function Transport({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="auto">{t('auto')}</option>
            <option value="moto"> {t('moto')}</option>
            <option value="water_transport">{t('water_transport')}</option>
        </>
    )
}
