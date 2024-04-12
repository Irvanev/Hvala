import React from 'react'

export default function TransportGoods({t}) {
    return (
        <>
            <option>{t('choce_subcategory')}</option>
            <option value="spares">{t('spares')}</option>
            <option value="tires_and_wheels">{t('tires_and_wheels')}</option>
            <option value="accessories_and_tools"> {t('accessories_and_tools')}</option>
        </>
    )
}
