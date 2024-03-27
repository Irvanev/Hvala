import React from 'react'

export default function HobbyRelax({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="table_games">{t('table_games')}</option>
            <option value="computer_games">{t('computer_games')}</option>
            <option value="books_n_magazines"> {t('books_n_magazines')}</option>
            <option value="tickets"> {t('tickets')}</option>
            <option value="collections"> {t('collections')}</option>
            <option value="art_materials"> {t('art_materials')}</option>
            <option value="music"> {t('music')}</option>
            <option value="music_tools"> {t('music_tools')}</option>
        </>
    )
}
