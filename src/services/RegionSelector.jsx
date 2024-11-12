import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Form, Select } from 'antd';
import LocationService from './LocationService';

const { Option } = Select;

const RegionSelector = ({ region, setRegion, country, setCountry }) => {
    const { t } = useTranslation();
    const lservice = new LocationService();
    const regionChoice = lservice.getRegionChoice(t);

    // Separate lists of regions for each country
    const montenegroRegions = {
        municipality_podgorica: t('municipality_podgorica'),
        glavni_grad_podgorica: t('glavni_grad_podgorica'),
        municipality_danilovgrad: t('municipality_danilovgrad'),
        municipality_cetinje: t('municipality_cetinje'),
        municipality_budva: t('municipality_budva'),
        municipality_bar: t('municipality_bar'),
        municipality_herceg_novi: t('municipality_herceg_novi'),
        municipality_kotor: t('municipality_kotor'),
        municipality_tivat: t('municipality_tivat'),
        municipality_ulcinj: t('municipality_ulcinj'),
        municipality_pljevlja: t('municipality_pljevlja'),
        municipality_bijelo_polje: t('municipality_bijelo_polje'),
        municipality_zabljak: t('municipality_zabljak'),
        municipality_kolasin: t('municipality_kolasin'),
        municipality_mojkovac: t('municipality_mojkovac'),
        municipality_berane: t('municipality_berane'),
        municipality_andrijevica: t('municipality_andrijevica'),
        municipality_plav: t('municipality_plav'),
        municipality_rozaje: t('municipality_rozaje'),
        municipality_niksic: t('municipality_niksic'),
        municipality_savnik: t('municipality_savnik'),
        municipality_pluzine: t('municipality_pluzine'),
        municipality_gusinje: t('municipality_gusinje'),
        municipality_petrovac: t('municipality_petrovac'),
        municipality_tuzi: t('municipality_tuzi'),
    };

    const serbiaRegions = {
        belgrade: t('belgrade'),
        vojvodina: t('vojvodina'),
        sumadija_and_western_serbia: t('sumadija_and_western_serbia'),
        southern_and_eastern_serbia: t('southern_and_eastern_serbia'),
        // kosovo_and_metohija: t('kosovo_and_metohija'),
    };

    const croatiaRegions = {
        zagreb_city: t('zagreb_city'),
        bor_district: t('bor_district'),
        branicevo_district: t('branicevo_district'),
        zlatibor_district: t('zlatibor_district'),
        kolubara_district: t('kolubara_district'),
        moravica_district: t('moravica_district'),
        nisava_district: t('nisava_district'),
        pirot_district: t('pirot_district'),
        podunavlje_district: t('podunavlje_district'),
        pcinja_district: t('pcinja_district'),
        raska_district: t('raska_district'),
        rasina_district: t('rasina_district'),
        toplica_district: t('toplica_district'),
        sumadija_district: t('sumadija_district'),
        jablanica_district: t('jablanica_district'),
        zagreb_county: t('zagreb_county'),
        split_dalmatia: t('split_dalmatia'),
        istria: t('istria'),
        primorje_gorski_kotar: t('primorje_gorski_kotar'),
        lika_senj: t('lika_senj'),
        virovitica_podravina: t('virovitica_podravina'),
        pozega_slavonia: t('pozega_slavonia'),
        brod_posavina: t('brod_posavina'),
        zadar: t('zadar'),
        osijek_baranja: t('osijek_baranja'),
        sisak_moslavina: t('sisak_moslavina'),
        koprivnica_krizevci: t('koprivnica_krizevci'),
        bjelovar_bilogora: t('bjelovar_bilogora'),
        karlovac: t('karlovac'),
        varazdin: t('varazdin'),
        krapina_zagorje: t('krapina_zagorje'),
        medimurje: t('medimurje'),
        sibenik_knin: t('sibenik_knin'),
        vukovar_srijem: t('vukovar_srijem'),
        dubrovnik_neretva: t('dubrovnik_neretva')
    };

    const bosniaRegions = {
        sarajevo_canton: t('sarajevo_canton'),
        republika_srpska: t('republika_srpska'),
        una_sana_canton: t('una_sana_canton'),
        posavina_canton: t('posavina_canton'),
        tuzla_canton: t('tuzla_canton'),
        zenica_doboj_canton: t('zenica_doboj_canton'),
        bosnian_podrinje_canton_gorazde: t('bosnian_podrinje_canton_gorazde'),
        central_bosnia_canton: t('central_bosnia_canton'),
        herzegovina_neretva_canton: t('herzegovina_neretva_canton'),
        west_herzegovina_canton: t('west_herzegovina_canton'),
        banja_luka: t('banja_luka'),
        bijeljina: t('bijeljina'),
        doboj: t('doboj'),
        prijedor: t('prijedor'),
        istocno_sarajevo: t('istocno_sarajevo'),
        trebinje: t('trebinje'),
        brcko: t('brcko'),
        canton_10: t('canton_10'),
    };

    // Select regions based on the selected country
    const getRegionsForCountry = () => {
        switch (country) {
            case 'montenegro':
                return montenegroRegions;
            case 'serbia':
                return serbiaRegions;
            case 'croatia':
                return croatiaRegions;
            case 'bosnia':
                return bosniaRegions;
            default:
                return {};
        }
    };

    const regions = getRegionsForCountry();

    // Initialize form
    const [form] = Form.useForm();

    useEffect(() => {
        console.log("Updated region from outside:", region);

        // Update 'region' field in the form
        form.setFieldsValue({ region, country });

    }, [region, form]);

    useEffect(() => {
        const firstRegionKey = Object.keys(regions)[0]; // Get the first key from the regions list
        if (firstRegionKey) {
            setRegion(firstRegionKey); // Set region to the first element
            form.setFieldsValue({ region: firstRegionKey }); // Update form field
        }
    }, [country, regions, form, setRegion]);

    return (
        <Form form={form}>
            {/* Country Selector */}
            <Form.Item
                label={t('country')}
                name="country"
                rules={[{ required: true, message: t('please_select_country') }]}
                style={{ marginBottom: '46px' }}
            >
                <Select
                    placeholder={t('select_country')}
                    onChange={(value) => setCountry(value)}
                >
                    <Option value="montenegro">{t('montenegro')}</Option>
                    <Option value="serbia">{t('serbia')}</Option>
                    <Option value="croatia">{t('croatia')}</Option>
                    <Option value="bosnia">{t('bosnia')}</Option>
                </Select>
            </Form.Item>

            {/* Region Selector */}
            <Form.Item
                label={t('region')}
                name="region"
                rules={[{ required: true, message: t('please_select_region') }]}
            >
                <Select
                    showSearch
                    placeholder={t('select_region')}
                    optionFilterProp="children"
                    onChange={(value) => setRegion(value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().includes(input.toLowerCase())
                    }
                >
                    {Object.entries(regions).map(([key, label]) => (
                        <Option key={key} value={key}>
                            {label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default RegionSelector;
