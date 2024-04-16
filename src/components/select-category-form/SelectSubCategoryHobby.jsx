import React from "react";
import { Form } from "react-bootstrap"
import { Select } from 'antd';

const SelectSubCategoryHobby = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'table_games', label: t('table_games') },
                    { value: 'computer_games', label: t('computer_games') },
                    { value: 'books_n_magazines', label: t('books_n_magazines') },
                    { value: 'tickets', label: t('tickets') },
                    { value: 'collections', label: t('collections') },
                    { value: 'art_materials', label: t('art_materials') },
                    { value: 'music', label: t('music') },
                    { value: 'music_tools', label: t('music_tools') }
                ]}
            />
        </>
    );
}

export default SelectSubCategoryHobby;