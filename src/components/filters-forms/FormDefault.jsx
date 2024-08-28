import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const FormDefault = ({
    condition, setCondition
}) => {

    const { Option } = Select;
    const { t } = useTranslation();

    return (
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
        </>
    );
}

export default FormDefault;