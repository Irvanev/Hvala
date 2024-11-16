import React, { useEffect, useMemo, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form, Select } from 'antd';
import LocationService from './LocationService';

const { Option } = Select;

const RegionSelector = ({ region, setRegion, country, setCountry, coordinates, setCoordinates }) => {
    const { t } = useTranslation();
    const lservice = new LocationService();
    const regionChoice = lservice.getRegionChoice(t);
    const [manualChange, setManualChange] = useState(false);
    const buffer = useRef({ country: null, region: null });
    const locationService = new LocationService();

    // Separate lists of regions for each country
    const montenegroRegions = useMemo(() => ({
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
    }), [t]);

    const serbiaRegions = useMemo(() => ({
        belgrade: t('belgrade'),
        vojvodina: t('vojvodina'),
        sumadija_and_western_serbia: t('sumadija_and_western_serbia'),
        southern_and_eastern_serbia: t('southern_and_eastern_serbia'),
        // kosovo_and_metohija: t('kosovo_and_metohija'),
    }), [t]);

    const croatiaRegions = useMemo(() => ({
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
    }), [t]);

    const bosniaRegions = useMemo(() => ({
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
    }), [t]);

    const regionCoordinates = {
        municipality_podgorica: { lat: 42.441, lng: 19.262 },
        glavni_grad_podgorica: { lat: 42.441, lng: 19.262 },
        municipality_danilovgrad: { lat: 42.553, lng: 19.109 },
        municipality_cetinje: { lat: 42.391, lng: 18.921 },
        municipality_budva: { lat: 42.286, lng: 18.84 },
        municipality_bar: { lat: 42.1, lng: 19.1 },
        municipality_herceg_novi: { lat: 42.452, lng: 18.531 },
        municipality_kotor: { lat: 42.42, lng: 18.77 },
        municipality_tivat: { lat: 42.434, lng: 18.706 },
        municipality_ulcinj: { lat: 41.926, lng: 19.203 },
        municipality_pljevlja: { lat: 43.356, lng: 19.351 },
        municipality_bijelo_polje: { lat: 43.038, lng: 19.748 },
        municipality_zabljak: { lat: 43.154, lng: 19.122 },
        municipality_kolasin: { lat: 42.823, lng: 19.522 },
        municipality_mojkovac: { lat: 42.961, lng: 19.583 },
        municipality_berane: { lat: 42.842, lng: 19.874 },
        municipality_andrijevica: { lat: 42.737, lng: 19.791 },
        municipality_plav: { lat: 42.596, lng: 19.941 },
        municipality_rozaje: { lat: 42.838, lng: 20.167 },
        municipality_niksic: { lat: 42.775, lng: 18.944 },
        municipality_savnik: { lat: 42.955, lng: 19.095 },
        municipality_pluzine: { lat: 43.154, lng: 18.841 },
        municipality_gusinje: { lat: 42.561, lng: 19.833 },
        municipality_petrovac: { lat: 42.206, lng: 18.941 },
        municipality_tuzi: { lat: 42.362, lng: 19.331 },
        belgrade: { lat: 44.7866, lng: 20.4489 },
        vojvodina: { lat: 45.2671, lng: 19.8335 },
        sumadija_and_western_serbia: { lat: 43.9425, lng: 20.3319 },
        southern_and_eastern_serbia: { lat: 43.3209, lng: 21.8958 },
        zagreb_city: { lat: 45.8150, lng: 15.9819 },
        zagreb_county: { lat: 45.8144, lng: 15.978 },
        split_dalmatia: { lat: 43.5081, lng: 16.4402 },
        istria: { lat: 45.1333, lng: 13.5937 },
        primorje_gorski_kotar: { lat: 45.3320, lng: 14.4462 },
        lika_senj: { lat: 44.6133, lng: 15.3783 },
        virovitica_podravina: { lat: 45.8311, lng: 17.3830 },
        pozega_slavonia: { lat: 45.3400, lng: 17.6850 },
        brod_posavina: { lat: 45.1603, lng: 17.9957 },
        zadar: { lat: 44.1194, lng: 15.2314 },
        osijek_baranja: { lat: 45.5540, lng: 18.6945 },
        sisak_moslavina: { lat: 45.4667, lng: 16.3667 },
        koprivnica_krizevci: { lat: 46.1639, lng: 16.8285 },
        bjelovar_bilogora: { lat: 45.8988, lng: 16.8427 },
        karlovac: { lat: 45.4870, lng: 15.5475 },
        varazdin: { lat: 46.3057, lng: 16.3366 },
        krapina_zagorje: { lat: 46.1580, lng: 15.8782 },
        medimurje: { lat: 46.4407, lng: 16.4007 },
        sibenik_knin: { lat: 43.9275, lng: 15.9053 },
        vukovar_srijem: { lat: 45.2883, lng: 18.9992 },
        dubrovnik_neretva: { lat: 42.6507, lng: 18.0944 },
        sarajevo_canton: { lat: 43.8563, lng: 18.4131 },
        republika_srpska: { lat: 44.7758, lng: 17.1856 },
        una_sana_canton: { lat: 44.8206, lng: 15.2744 },
        posavina_canton: { lat: 45.0336, lng: 18.7068 },
        tuzla_canton: { lat: 44.5371, lng: 18.6739 },
        zenica_doboj_canton: { lat: 44.2035, lng: 17.9075 },
        bosnian_podrinje_canton_gorazde: { lat: 43.6667, lng: 18.9769 },
        central_bosnia_canton: { lat: 44.1415, lng: 17.6494 },
        herzegovina_neretva_canton: { lat: 43.3438, lng: 17.8073 },
        west_herzegovina_canton: { lat: 43.3836, lng: 17.59 },
        banja_luka: { lat: 44.7722, lng: 17.191 },
        bijeljina: { lat: 44.7559, lng: 19.2144 },
        doboj: { lat: 44.7312, lng: 18.0841 },
        prijedor: { lat: 44.9793, lng: 16.7144 },
        istocno_sarajevo: { lat: 43.8228, lng: 18.3645 },
        trebinje: { lat: 42.7110, lng: 18.3443 },
        brcko: { lat: 44.8728, lng: 18.8102 },
        canton_10: { lat: 43.9021, lng: 17.2345 }
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

    function getCountryKey(string) {
        if (string.includes("Serbia") || string.includes("Сербия") || string.includes("Србија") || string.includes("serbia")) {
            return "serbia";
        } else if (string.includes("Croatia") || string.includes("Хорватия") || string.includes("Хрватска") || string.includes("croatia")) {
            return "croatia";
        } else if (string.includes("Bosnia and Herzegovina") || string.includes("Босния и Герцеговина") || string.includes("Босна и Херцеговина") || string.includes("bosnia_and_herzegovina")) {
            return "bosnia_and_herzegovina";
        } else if (string.includes("Montenegro") || string.includes("Черногория") || string.includes("Црна Гора") || string.includes("montenegro")) {
            return "montenegro";
        } else if (string.includes("North Macedonia") || string.includes("Мacedonia") || string.includes("Северная Македония") || string.includes("Македония") || string.includes("Северна Македонија") || string.includes("north_macedonia")) {
            return "north_macedonia";
        } else {
            return "montenegro";
        }
    }

    const regions = useMemo(() => getRegionsForCountry(), [country]);

    // Initialize form
    const [form] = Form.useForm();

    useEffect(() => {
        console.log("Updated region from outside:", region);

        // Update 'region' field in the form
        form.setFieldsValue({ region, country });

    }, [region, form]);

    // useEffect((country) => {
    //     if (country) {
    //         console.log("Why im working???");
    //         const firstRegionKey = Object.keys(regions)[0]; // Get the first key from the regions list
    //         if (firstRegionKey) {
    //             var coords = regionCoordinates[firstRegionKey];
    //             setCoordinates(coords);
    //             setRegion(firstRegionKey); // Set region to the first element
    //             form.setFieldsValue({ region: firstRegionKey }); // Update form field
    //         }
    //     }
        
    // }, [country, regions, form, setRegion]);


    useEffect(() => {
        const recognizedCountryKey = getCountryKey(country);
        const recognizedRegionKey = locationService.getRegionKey(region);
        console.log(recognizedCountryKey);
        console.log(t(recognizedCountryKey));
        console.log("country is");
        console.log(recognizedRegionKey);
        console.log(t(recognizedRegionKey));
        console.log("region is");

        // Проверка и обновление через прокладку
        if (buffer.current.country !== recognizedCountryKey) {
            buffer.current.country = recognizedCountryKey;
            setCountry(recognizedCountryKey);
            form.setFieldsValue({ country: recognizedCountryKey });

            // Выбор первого региона при смене страны
            const currentRegions = getRegionsForCountry();
            const firstRegionKey = Object.keys(currentRegions)[0];
            if (firstRegionKey) {
                buffer.current.region = firstRegionKey;
                setRegion(firstRegionKey);
                setCoordinates(regionCoordinates[firstRegionKey]);
                form.setFieldsValue({ region: t(firstRegionKey) });
            }
        }

        if (buffer.current.region !== recognizedRegionKey) {
            buffer.current.region = recognizedRegionKey;
            setRegion(recognizedRegionKey);
            form.setFieldsValue({ region: t(recognizedRegionKey) });
        }

        // Обработка ручного изменения
        if (manualChange) {
            const firstRegionKey = Object.keys(regions)[0];
            if (firstRegionKey) {
                buffer.current.region = firstRegionKey;
                setRegion(firstRegionKey);
                setCoordinates(regionCoordinates[firstRegionKey]);
                form.setFieldsValue({ region: t(firstRegionKey) });
            }
            setManualChange(false);
        }
    }, [country, region, manualChange]);





    return (
        <Form form={form}>
            {/* Селектор страны */}
            <Form.Item
                label={t('country')}
                name="country"
                rules={[{ required: true, message: t('please_select_country') }]}
                style={{ marginBottom: '46px' }}
            >
                <Select
                    placeholder={t('select_country')}
                    onChange={(value) => {
                        setManualChange(true);
                        setCountry(value);
                    }}
                >
                    <Option value="montenegro">{t('montenegro')}</Option>
                    <Option value="serbia">{t('serbia')}</Option>
                    <Option value="croatia">{t('croatia')}</Option>
                    <Option value="bosnia">{t('bosnia')}</Option>
                </Select>
            </Form.Item>

            {/* Селектор региона */}
            <Form.Item
                label={t('region')}
                name="region"
                rules={[{ required: true, message: t('please_select_region') }]}
            >
                <Select
                    value={region}
                    showSearch
                    placeholder={t('select_region')}
                    optionFilterProp="children"
                    onChange={(value) => {
                        setRegion(value);
                        setCoordinates(regionCoordinates[value]);
                    }}
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
