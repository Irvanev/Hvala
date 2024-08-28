import React from "react";
import { Input, Select } from "antd";
import { useTranslation } from "react-i18next";

const FormEstate = ({
    type, setType, 
    rooms_amount, setRoomsAmount, 
    area, setArea, 
    owner, setOwner
}) => {

    const { Option } = Select;
    const { t } = useTranslation();

    return (
        <>
            <label className='mt-3'>{t('type')}</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">{t('choice_type')}</Option>
                <Option value="house">{t('house')}</Option>
                <Option value="garage">{t('garage')}</Option>
                <Option value="aparment">{t('aparment')}</Option>
                <Option value="commercial_real_estate">{t('commercial_real_estate')}</Option>
                <Option value="room">{t('room')}</Option>
            </Select>
            <label className='mt-3'>{t('rooms_amount')}</label>
            <Input type="text" value={rooms_amount} onChange={(e) => setRoomsAmount(e.target.value)} />
            <label className='mt-3'>{t('area')}</label>
            <Input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
            <label className='mt-3'>{t('owner_rent')}</label>
            <Select style={{ width: '100%' }} onChange={setOwner} value={owner}>
                <Option value="">{t('input_owner_rent')}</Option>
                <Option value="owner">{t('owner')}</Option>
                <Option value="realtor">{t('realtor')}</Option>
            </Select>
        </>
    );
}

export default FormEstate;