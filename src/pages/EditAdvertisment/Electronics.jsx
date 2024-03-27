import React from 'react'

export default function Electronics({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="computers">{t('computers')}</option>
            <option value="phones_and_tablets">{t('phones_and_tablets')}</option>
            <option value="tv"> {t('tv')}</option>
            <option value="computer_accessories"> {t('computer_accessories')}</option>
            <option value="photo_video"> {t('photo_video')}</option>
            <option value="game_console"> {t('game_console')}</option>
        </>
    )
}
