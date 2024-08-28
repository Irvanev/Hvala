import React from "react";
import { Select, Input } from "antd";
import { useTranslation } from "react-i18next";

const FormTransport = ({
    condition, setCondition,
    brand, setBrand,
    body, setBody,
    wheel, setWheel,
    drive, setDrive,
    transmission, setTransmission,
    year, setYear,
    mileage, setMileage
}) => {

    const { Option } = Select;
    const { t } = useTranslation();

    return (
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="condition_new">{t('condition_new')}</Option>
                <Option value="used">{t('used')}</Option>
            </Select>
            <label className='mt-3'>{t('brand')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">{t('choice_mark')}</Option>
                <Option value="Audi">Audi</Option>
                <Option value="BMW">BMW</Option>
                <Option value="Mercedes-Benz">Mersedes</Option>
                <Option value="Porshe">Porshe</Option>
                <Option value="Volvo">Volvo</Option>
                <Option value="Volkswagen">Volkswagen</Option>
                <Option value="Ford">Ford</Option>
                <Option value="Opel">Opel</Option>
            </Select>
            <label className='mt-3'>{t('choice_body')}</label>
            <Select
                showSearch
                style={{
                    width: '100%',
                }}
                value={body}
                onChange={(value) => setBody(value)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="">{t('choice_type_body')}</Option>
                <Option value="sedan">{t('sedan')}</Option>
                <Option value="hatchback">{t('hatchback')}</Option>
                <Option value="station_wagon">{t('station_wagon')}</Option>
                <Option value="coupe">{t('coupe')}</Option>
                <Option value="convertible">{t('convertible')}</Option>
                <Option value="crossover">{t('crossover')}</Option>
                <Option value="suv_sport_utility_vehicle">{t('suv_sport_utility_vehicle')}</Option>
                <Option value="pickup_truck">{t('pickup_truck')}</Option>
                <Option value="minivan">{t('minivan')}</Option>
                <Option value="Limousine">{t('Limousine')}</Option>
            </Select>
            <label className='mt-3'>{t('wheel')}</label>
            <Select value={wheel} onChange={(value) => setWheel(value)}
                style={{
                    width: '100%',
                }}>
                <Option value="">{t('choice_wheel')}</Option>
                <Option value="left_hand_drive">{t('left_hand_drive')}</Option>
                <Option value="right_hand_drive">{t('right_hand_drive')}</Option>
            </Select>
            <label className='mt-3'>{t('choice_drive')}</label>
            <Select value={drive} onChange={(value) => setDrive(value)}
                style={{
                    width: '100%',
                }}>
                <Option value="fwd">{t('fwd')}</Option>
                <Option value="rwd">{t('rwd')}</Option>
                <Option value="awd">{t('awd')}</Option>
                <Option value="four_wd">{t('four_wd')}</Option>
            </Select>
            <label className='mt-3'>{t('choce_transmission')}</label>
            <Select value={transmission} onChange={(value) => setTransmission(value)}
                style={{
                    width: '100%',
                }}>
                <Option value="manual_t">{t('manual_t')}</Option>
                <Option value="auto_t">{t('auto_t')}</Option>
                <Option value="semi_auto_t">{t('semi_auto_t')}</Option>
                <Option value="dual_clutch_t">{t('dual_clutch_t')}</Option>
                <Option value="continuously_t">{t('continuously_t')}</Option>
            </Select>
            <label className='mt-3'>{t('input_year')}</label>
            <Input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            <label className='mt-3'>{t('input_meleage')}</label>
            <Input type="text" value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </>
    );
}

export default FormTransport;