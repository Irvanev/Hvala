import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryElectronics = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'computers', label: t('computers') },
                    { value: 'phones_and_tablets', label: t('phones_and_tablets') },
                    { value: 'tv', label: t('tv') },
                    { value: 'computer_accessories', label: t('computer_accessories') },
                    { value: 'photo_video', label: t('photo_video') },
                    { value: 'game_console', label: t('game_console') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryElectronics;