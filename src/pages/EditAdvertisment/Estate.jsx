import React from 'react'

export default function Estate({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="sale_estate">{t('sale_estate')}</option>
            <option value="rent_estate">{t('rent_estate')}</option>
        </>
    )
}
