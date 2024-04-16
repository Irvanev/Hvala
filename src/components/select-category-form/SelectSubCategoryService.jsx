import React from "react";
import { Form } from "react-bootstrap";
import { Select } from 'antd';

const SelectSubCategoryService = ({handleSubcategoryChange, t}) => {
    return (
        <>
        <Form.Label className="mt-3">{t('subCategory')}</Form.Label>
            <Select
                onChange={handleSubcategoryChange}
                style={{ width: '100%' }}
                options={[
                    { value: 'education', label: t('education') },
                    { value: 'handyman', label: t('handyman') },
                    { value: 'beauty_and_health', label: t('beauty_and_health') },
                    { value: 'transportation', label: t('transportation') },
                    { value: 'repair_and_construction', label: t('repair_and_construction') },
                    { value: 'computer_services', label: t('computer_services') },
                    { value: 'business_services', label: t('business_services') },
                    { value: 'cleaning', label: t('cleaning') },
                    { value: 'automotive_services', label: t('automotive_services') },
                    { value: 'appliance_repair', label: t('appliance_repair') },
                    { value: 'event_planning', label: t('event_planning') },
                    { value: 'photography_and_videography', label: t('photography_and_videography') },
                    { value: 'custom_manufacturing', label: t('custom_manufacturing') },
                    { value: 'pet_care', label: t('pet_care') }

                ]}
            />
        </>
    );
}

export default SelectSubCategoryService;