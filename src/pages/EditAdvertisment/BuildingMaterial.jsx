import React from 'react'

export default function BuildingMaterial({t}) {
    return (
        <>
            <option>Выберите подкатегорию</option>
            <option value="tools">{t('tools')}</option>
            <option value="building_materials">{t('building_materials')}</option>
            <option value="heating_and_ventilation"> {t('heating_and_ventilation')}</option>
            <option value="plumbing"> {t('plumbing')}</option>
            <option value="electrics"> {t('electrics')}</option>
            <option value="windows"> {t('windows')}</option>
            <option value="doors"> {t('doors')}</option>
        </>
    )
}
