import React from 'react'

export default function Clothes({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="mens_clothing">{t('mens_clothing')}</option>
            <option value="womens_clothing">{t('womens_clothing')}</option>
            <option value="childrens_clothing">{t('childrens_clothing')}</option>
        </>
    )
}
