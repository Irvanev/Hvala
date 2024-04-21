import React, { useState } from "react";
import { Form, Select, Input } from 'antd';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const { Option } = Select;

export const CountryRegion = ({ country, setCountry, region, setRegion, location, setLocation, t }) => {
    const [regions, setRegions] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: 22.54992, lng: 0 });

    const handleCountryChange = (value) => {
        setCountry(value);
        setRegions(regionsByCountry[value]);
    };

    const regionsByCountry = {
        serbia: [
            { value: 'vojvodina', label: t('vojvodina') },
            { value: 'belgrade', label: t('belgrade') },
            { value: 'sumadija_and_western_serbia', label: t('sumadija_and_western_serbia') },
            { value: 'southern_and_eastern_serbia', label: t('southern_and_eastern_serbia') },
            { value: 'kosovo_and_metohija', label: t('kosovo_and_metohija') },
        ],
        montenegro: [
            { value: 'glavni_grad_podgorica', label: t('glavni_grad_podgorica') },
            { value: 'municipality_danilovgrad', label: t('municipality_danilovgrad') },
            { value: 'municipality_cetinje', label: t('municipality_cetinje') },
            { value: 'municipality_budva', label: t('municipality_budva') },
            { value: 'municipality_bar', label: t('municipality_bar') },
            { value: 'municipality_herceg_novi', label: t('municipality_herceg_novi') },
            { value: 'municipality_kotor', label: t('municipality_kotor') },
            { value: 'municipality_tivat', label: t('municipality_tivat') },
            { value: 'municipality_ulcinj', label: t('municipality_ulcinj') },
            { value: 'municipality_pljevlja', label: t('municipality_pljevlja') },
            { value: 'municipality_bijelo_polje', label: t('municipality_bijelo_polje') },
            { value: 'municipality_zabljak', label: t('municipality_zabljak') },
            { value: 'municipality_kolasin', label: t('municipality_kolasin') },
            { value: 'municipality_mojkovac', label: t('municipality_mojkovac') },
            { value: 'municipality_berane', label: t('municipality_berane') },
            { value: 'municipality_andrijevica', label: t('municipality_andrijevica') },
            { value: 'municipality_plav', label: t('municipality_plav') },
            { value: 'municipality_rozaje', label: t('municipality_rozaje') },
            { value: 'municipality_niksic', label: t('municipality_niksic') },
            { value: 'municipality_savnik', label: t('municipality_savnik') },
            { value: 'municipality_pluzine', label: t('municipality_pluzine') },
        ],
        croatia: [
            { value: 'zagreb_city', label: t('zagreb_city') },
            { value: 'zagreb_county', label: t('zagreb_county') },
            { value: 'split_dalmatia', label: t('split_dalmatia') },
            { value: 'istria', label: t('istria') },
            { value: 'primorje_gorski_kotar', label: t('primorje_gorski_kotar') },
            { value: 'lika_senj', label: t('lika_senj') },
            { value: 'virovitica_podravina', label: t('virovitica_podravina') },
            { value: 'pozega_slavonia', label: t('pozega_slavonia') },
            { value: 'brod_posavina', label: t('brod_posavina') },
            { value: 'zadar', label: t('zadar') },
            { value: 'osijek_baranja', label: t('osijek_baranja') },
            { value: 'sisak_moslavina', label: t('sisak_moslavina') },
            { value: 'koprivnica_krizevci', label: t('koprivnica_krizevci') },
            { value: 'bjelovar_bilogora', label: t('bjelovar_bilogora') },
            { value: 'karlovac', label: t('karlovac') },
            { value: 'varazdin', label: t('varazdin') },
            { value: 'krapina_zagorje', label: t('krapina_zagorje') },
            { value: 'medimurje', label: t('medimurje') },
            { value: 'sibenik_knin', label: t('sibenik_knin') },
            { value: 'vukovar_srijem', label: t('vukovar_srijem') },
            { value: 'dubrovnik_neretva', label: t('dubrovnik_neretva') },
        ],
        bosnia_and_herzegovina: [
            { value: 'una_sana_canton', label: t('Una-Sana Canton') },
            { value: 'posavina_canton', label: t('Posavina Canton') },
            { value: 'tuzla_canton', label: t('Tuzla Canton') },
            { value: 'zenica_doboj_canton', label: t('Zenica-Doboj Canton') },
            { value: 'bosnian_podrinje_canton_gorazde', label: t('Bosnian-Podrinje Canton Goražde') },
            { value: 'central_bosnia_canton', label: t('Central Bosnia Canton') },
            { value: 'herzegovina_neretva_canton', label: t('Herzegovina-Neretva Canton') },
            { value: 'west_herzegovina_canton', label: t('West Herzegovina Canton') },
            { value: 'sarajevo_canton', label: t('Sarajevo Canton') },
            { value: 'canton_10', label: t('Canton 10') },
        ],
    };

    return (
        <>
            <Form.Item
                label={t('country')}
                name='country'
                rules={[{ required: true, message: 'Please chose the country!' }]}
            >
                <Select value={country} onChange={handleCountryChange}>
                    <Option value="serbia">{t('serbia')}</Option>
                    <Option value="montenegro">{t('montenegro')}</Option>
                    <Option value="croatia">{t('croatia')}</Option>
                    <Option value="bosnia_and_herzegovina">{t('bosnia_and_herzegovina')}</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label={t('region')}
                name='region'
                rules={[{ required: true, message: 'Please chose the region!' }]}

            >
                <Select value={region} onChange={(value) => setRegion(value)}>
                    {regions.map((region) => (
                        <Option key={region.value} value={region.value}>
                            {region.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label={t('location')}>
                <Input type="text" value={`${location.lat}, ${location.lng}`} onChange={(e) => setLocation(e.target.value)} />
            </Form.Item>
            <APIProvider apiKey='AIzaSyD7K42WP5zjV99GP3xll40eFr_5DaAk3ZU'>
                <Map
                    style={{ width: '100%', height: '400px' }}
                    defaultCenter={{ lat: 22.54992, lng: 0 }}
                    defaultZoom={3}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    onClick={(e) => {
                        const lat = e.lat;
                        const lng = e.lng;
                        setCoordinates({ lat, lng });
                        setLocation({ lat, lng });
                    }}
                >
                    <Marker
                        position={coordinates}
                    />
                </Map>
            </APIProvider>
        </>
    );
};