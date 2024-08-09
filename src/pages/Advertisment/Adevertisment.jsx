import { Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchAdvertismentsSearch, fetchAdvertisments, fetchAdditionalAdvertisements, fetchAdvertismentsByFilters } from '../../services/AdvertismentsHome/AdvertismentsService';
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import LanguageModal from "../../LanguageModal";

import { Button, Result, Space, Modal, Select, Input, InputNumber } from "antd";
import { GlobalOutlined, FilterOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';
import { CustomFooter } from '../../components/footer/footer';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

import banner from "../../assets/New_Hvala_2_0.png"

export const Advertisement = () => {
    const history = useHistory();
    const { Option } = Select;
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [advertisment, setAdvertisement] = useState([]);
    const [advertismentAl, setAdvertisementAll] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loadedAdvertisements, setLoadedAdvertisements] = useState(40);
    const [loadMoreButtonVisible, setLoadMoreButtonVisible] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleFilter, setIsModalVisibleFilter] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const showModalFilter = () => {
        setIsModalVisibleFilter(true);
    };

    const handleCancelFilter = () => {
        setIsModalVisibleFilter(false);
    };

    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currency, setCurrency] = useState('');

    const [condition, setCondition] = useState('');

    const [screen_size, setScreenSize] = useState('');
    const [memory, setMemory] = useState('');

    const [size, setSize] = useState('');
    const [type, setType] = useState('');

    const [owner, setOwner] = useState('')
    const [area, setArea] = useState('')
    const [rooms_amount, setRoomsAmount] = useState('')

    const [body, setBody] = useState('');
    const [wheel, setWheel] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [mileage, setMileage] = useState('');
    const [transmission, setTransmission] = useState('');
    const [drive, setDrive] = useState('');

    const categories =
        [
            { value: 'estate', label: t('estate') },
            { value: 'transport', label: t('transport') },
            { value: 'clothes', label: t('clothes') },
            { value: 'electronics', label: t('electronics') },
            { value: 'house_goods', label: t('house_goods') },
            { value: 'building_materials_and_tools', label: t('building_materials_and_tools') },
            { value: 'transport_goods', label: t('transport_goods') },
            { value: 'home_appliance', label: t('home_appliance') },
            { value: 'service', label: t('service') },
            { value: 'child_goods', label: t('child_goods') },
            { value: 'health_and_beauty', label: t('health_and_beauty') },
            { value: 'sport', label: t('sport') },
            { value: 'hobby_n_Relax', label: t('hobby_n_Relax') },
            { value: 'rest', label: t('rest') }
        ]

    const subcategories = {
        electronics: [
            { value: 'computers', label: t('computers') },
            { value: 'phones_and_tablets', label: t('phones_and_tablets') },
            { value: 'tv', label: t('tv') },
            { value: 'computer_accessories', label: t('computer_accessories') },
            { value: 'photo_video', label: t('photo_video') },
            { value: 'game_console', label: t('game_console') }
        ],
        clothes: [
            { value: 'mens_clothing', label: t('mens_clothing') },
            { value: 'womens_clothing', label: t('womens_clothing') },
            { value: 'childrens_clothing', label: t('childrens_clothing') }
        ],
        estate: [
            { value: 'sale_estate', label: t('sale_estate') },
            { value: 'rent_estate', label: t('rent_estate') }
        ],
        transport: [
            { value: 'auto', label: t('auto') },
            { value: 'moto', label: t('moto') },
            { value: 'water_transport', label: t('water_transport') }
        ],
        house_goods: [
            { value: 'furniture', label: t('furniture') },
            { value: 'lighting', label: t('lighting') },
            { value: 'dishes', label: t('dishes') },
            { value: 'garden_equipment', label: t('garden_equipment') },
            { value: 'domestic_cleaning', label: t('domestic_cleaning') },
            { value: 'kitchen_equipment', label: t('kitchen_equipment') },
            { value: 'other_cat', label: t('other_cat') }
        ],
        building_materials_and_tools: [
            { value: 'tools', label: t('tools') },
            { value: 'building_materials', label: t('building_materials') },
            { value: 'heating_and_ventilation', label: t('heating_and_ventilation') },
            { value: 'plumbing', label: t('plumbing') },
            { value: 'electrics', label: t('electrics') },
            { value: 'windows', label: t('windows') },
            { value: 'doors', label: t('doors') }
        ],
        transport_goods: [
            { value: 'spares', label: t('spares') },
            { value: 'tires_and_wheels', label: t('tires_and_wheels') },
            { value: 'accessories_and_tools', label: t('accessories_and_tools') }
        ],
        home_appliance: [
            { value: 'refrigerators', label: t('refrigerators') },
            { value: 'washing_machines', label: t('washing_machines') },
            { value: 'vacuum_cleaners', label: t('vacuum_cleaners') },
            { value: 'stoves_and_ovens', label: t('stoves_and_ovens') },
            { value: 'sewing_equipment', label: t('sewing_equipment') },
            { value: 'food_preparation', label: t('food_preparation') },
            { value: 'dishwasher', label: t('dishwasher') },
            { value: 'other_cat', label: t('other_cat') }
        ],
        service: [
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
        ],
        child_goods: [
            { value: 'car_seats', label: t('car_seats') },
            { value: 'health_and_care', label: t('health_and_care') },
            { value: 'toys_and_games', label: t('toys_and_games') },
            { value: 'strollers', label: t('strollers') },
            { value: 'feeding_and_nutrition', label: t('feeding_and_nutrition') },
            { value: 'bathing', label: t('bathing') },
            { value: 'nursery', label: t('nursery') },
            { value: 'diapers_and_potties', label: t('diapers_and_potties') },
            { value: 'baby_monitors', label: t('baby_monitors') },
            { value: 'maternity_products', label: t('maternity_products') },
            { value: 'schoold_supplies', label: t('schoold_supplies') },
            { value: 'other_cat', label: t('other_cat') }
        ],
        health_and_beauty: [
            { value: 'makeup', label: t('makeup') },
            { value: 'manicure_and_pedicure', label: t('manicure_and_pedicure') },
            { value: 'healthcare_products', label: t('healthcare_products') },
            { value: 'perfume', label: t('perfume') },
            { value: 'skincare', label: t('skincare') },
            { value: 'haircare', label: t('haircare') },
            { value: 'tattoos_and_tatooing', label: t('tattoos_and_tatooing') },
            { value: 'tanning_and_sunbeds', label: t('tanning_and_sunbeds') },
            { value: 'personal_hygiene_products', label: t('personal_hygiene_products') },
            { value: 'other_cat', label: t('other_cat') }
        ],
        sport: [
            { value: 'sports_protections', label: t('sports_protections') },
            { value: 'bicycles', label: t('bicycles') },
            { value: 'scooters', label: t('scooters') },
            { value: 'skateboards', label: t('skateboards') },
            { value: 'hoverboards_and_electric_scooters', label: t('hoverboards_and_electric_scooters') },
            { value: 'ball_games', label: t('ball_games') },
            { value: 'hunting_and_fishing', label: t('hunting_and_fishing') },
            { value: 'tourism_and_outdoor_recreation', label: t('tourism_and_outdoor_recreation') },
            { value: 'billiards_and_bowling', label: t('billiards_and_bowling') },
            { value: 'tennis_and_badminton', label: t('tennis_and_badminton') },
            { value: 'exercise_equipment_and_fitness', label: t('exercise_equipment_and_fitness') },
            { value: 'sports_nutrition', label: t('sports_nutrition') },
            { value: 'water_sports', label: t('water_sports') },
            { value: 'sapboards', label: t('sapboards') },
            { value: 'other_cat', label: t('other_cat') }
        ],
        hobby_n_Relax: [
            { value: 'table_games', label: t('table_games') },
            { value: 'computer_games', label: t('computer_games') },
            { value: 'books_n_magazines', label: t('books_n_magazines') },
            { value: 'tickets', label: t('tickets') },
            { value: 'collections', label: t('collections') },
            { value: 'art_materials', label: t('art_materials') },
            { value: 'music', label: t('music') },
            { value: 'music_tools', label: t('music_tools') }
        ]
    }

    const countryRegions = {
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

    const handleCategoryChange = (value) => {
        setCategory(value);
        setSubCategory(null);
    };

    const handleSubcategoryChange = (value) => {
        setSubCategory(value);
    };

    const handleCountryChange = (value) => {
        setCountry(value);
        setRegion(null);
    };

    const handleRegionChange = (value) => {
        setRegion(value);
    };

    const handleMinPriceChange = (value) => {
        setMinPrice(parseInt(value, 10));
    };

    const handleMaxPriceChange = (value) => {
        setMaxPrice(parseInt(value, 10));
    };

    const handleCurrencyChange = (value) => {
        setCurrency(value);
    };

    const applyFilters = () => {
        console.log("Фильтры:", { category, subcategory, country, region, condition, size, type, wheel, mileage, body, drive, year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency });
        fetchAdvertismentsByFilters(category, subcategory, country, region, condition, size, type, wheel, mileage, body, drive, year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency, setAdvertisement);
        setIsModalVisibleFilter(false);
    };

    const resetFilters = () => {
        setSubCategory('');
        setCondition('');
        setCountry('');
        setRegion('');
        setMemory('');
        setScreenSize('');
    };

    const FormClothes = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
            <label className='mt-3'>{t('type')}</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">{t('choice_type')}</Option>
                <Option value="outwear">{t('outwear')}</Option>
                <Option value="hats">{t('hats')}</Option>
                <Option value="accessories">{t('accessories')}</Option>
                <Option value="homewear">{t('homewear')}</Option>
                <Option value="underwear">{t('underwear')}</Option>
                <Option value="shoes">{t('shoes')}</Option>
                <Option value="jackets_and_suits">{t('jackets_and_suits')}</Option>
                <Option value="shirts">{t('shirts')}</Option>
                <Option value="Steam sweaters_and_hoodies">{t('sweaters_and_hoodies')}</Option>
                <Option value="Nvidia workwear">{t('workwear')}</Option>
                <Option value="sportswear">{t('sportswear')}</Option>
                <Option value="t_shirts_and_polos">{t('t_shirts_and_polos')}</Option>
                <Option value="pants_and_shorts">{t('pants_and_shorts')}</Option>
                <Option value="rest">{t('rest')}</Option>
            </Select>
            <label className='mt-3'>{t('size')}</label>
            <Select style={{ width: '100%' }} onChange={setSize} value={size}>
                <Option value="">{t('choice_size')}</Option>
                <Option value="XXS">XXS</Option>
                <Option value="XS">XS</Option>
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
                <Option value="XXL">XXL</Option>
                <Option value="XXXL">XXXL</Option>
                <Option value="4XL">4XL</Option>
                <Option value="5XL">5XL</Option>
            </Select>
        </>

    const FormSmartphonesAndTablets = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
            <label className='mt-3'>{t('brand')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">{t('choice_brand')}</Option>
                <Option value="Apple">Apple</Option>
                <Option value="Samsung">Samsung</Option>
            </Select>
            <label className='mt-3'>{t('memory')}</label>
            <Select style={{ width: '100%' }} onChange={setMemory} value={memory}>
                <Option value="">{t('choice_memory')}</Option>
                <Option value="32">32Gb</Option>
                <Option value="64">64Gb</Option>
                <Option value="128">128Gb</Option>
                <Option value="256">256Gb</Option>
                <Option value="512">512Gb</Option>
            </Select>
            <label className='mt-3'>{t('size_screen')}</label>
            <Select style={{ width: '100%' }} onChange={setScreenSize} value={screen_size}>
                <Option value="">{t('choice_screen_size')}</Option>
                <Option value="7">5</Option>
                <Option value="7">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </>
        ;

    const FormTransport = () =>
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

    const FormTv = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
            <label className='mt-3'>{t('brand')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">{t('choice_brand')}</Option>
                <Option value="Apple">Apple</Option>
                <Option value="Samsung">Samsung</Option>
            </Select>
            <label className='mt-3'>{t('size_screen')}</label>
            <Select style={{ width: '100%' }} onChange={setScreenSize} value={screen_size}>
                <Option value="">{t('choice_screen_size')}</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </>

    const FormComputers = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
            <label className='mt-3'>{t('brand')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">{t('choice_brand')}</Option>
                <Option value="Samsung">Samsung</Option>
                <Option value="Apple">Apple</Option>
                <Option value="Xiaomi">Xiaomi</Option>
                <Option value="Huawei">Huawei</Option>
                <Option value="Honor">Honor</Option>
                <Option value="Acer">Acer</Option>
                <Option value="Asus">Asus</Option>
                <Option value="LG">LG</Option>
                <Option value="Google">Google</Option>
                <Option value="MSI">MSI</Option>
            </Select>
            <label className='mt-3'>{t('type')}</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">{t('choice_type')}</Option>
                <Option value="laptop">{t('laptop')}</Option>
                <Option value="stationary_computer">{t('stationary_computer')}</Option>
                <Option value="micro_computer">{t('micro_computer')}</Option>
                <Option value="monoblock">{t('monoblock')}</Option>
            </Select>
        </>
        ;

    const FormComputersAccs = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
            <label className='mt-3'>{t('brand')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">{t('choice_brand')}</Option>
                <Option value="Logitech">Logitech</Option>
                <Option value="Razer">Razer</Option>
                <Option value="Microsoft">Microsoft</Option>
                <Option value="Corsair">Corsair</Option>
                <Option value="SteelSeries">SteelSeries</Option>
                <Option value="HyperX">HyperX</Option>
                <Option value="Asus">Asus</Option>
                <Option value="HP">HP</Option>
                <Option value="Dell">Dell</Option>
                <Option value="MSI">MSI</Option>
                <Option value="Lenovo">Lenovo</Option>
                <Option value="Acer">Acer</Option>
                <Option value="Apple">Apple</Option>
                <Option value="Thermaltake">Thermaltake</Option>
                <Option value="Kingston">Kingston</Option>
            </Select>
            <label className='mt-3'>{t('type')}</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">{t('choice_type')}</Option>
                <Option>{t('type')}</Option>
                <Option value="mouse">{t('mouse')}</Option>
                <Option value="keyboard">{t('keyboard')}</Option>
                <Option value="headphones">{t('headphones')}</Option>
                <Option value="monitor">{t('monitor')}</Option>
            </Select>
        </>

    const FormVideoGames = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
            <label className='mt-3'>{t('brand')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">{t('choice_brand')}</Option>
                <Option value="Sony PlayStation">Sony PlayStation</Option>
                <Option value="Microsoft Xbox">Microsoft Xbox</Option>
                <Option value="Nintendo">Nintendo</Option>
                <Option value="Sega">Sega</Option>
                <Option value="Atari">Atari</Option>
                <Option value="SNK">SNK</Option>
                <Option value="Neo Geo">Neo Geo</Option>
                <Option value="Ouya">Ouya</Option>
                <Option value="Steam Machine">Steam Machine</Option>
                <Option value="Nvidia Sheild">Nvidia Sheild</Option>
                <Option value="Intellivision">Intellivision</Option>
                <Option value="GameBoy">GameBoy</Option>
            </Select>
        </>

    const FormEstate = () =>
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

    const FormHomeAppliance = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
        </>

    const FormDefault = () =>
        <>
            <label className='mt-3'>{t('condition')}</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">{t('choice_condition')}</Option>
                <Option value="new_cond">{t('new_cond')}</Option>
                <Option value="bu_cond">{t('bu_cond')}</Option>
            </Select>
        </>

    const renderForm = () => {
        switch (subcategory) {
            case 'mens_clothing':
            case 'womens_clothing':
            case 'childrens_clothing':
                return <FormClothes />;
            case 'phones_and_tablets':
                return <FormSmartphonesAndTablets />;
            case 'tv':
                return <FormTv />;
            case 'computers':
                return <FormComputers />;
            case 'computer_accessories':
                return <FormComputersAccs />
            case 'game_console':
            case 'photo_video':
                return <FormVideoGames />
            case 'auto':
            case 'moto':
            case 'water_transport':
                return <FormTransport />;
            case 'sale_estate':
            case 'rent_estate':
                return <FormEstate />
            case 'refrigerators':
            case 'washing_machines':
            case 'vacuum_cleaners':
            case 'stoves_and_ovens':
            case 'sewing_equipment':
            case 'food_preparation':
            case 'dishwasher':
                return <FormHomeAppliance />
            case 'furniture':
            case 'lighting':
            case 'dishes':
            case 'garden_equipment':
            case 'domestic_cleaning':
            case 'kitchen_equipment':
            case 'other_cat':
            case 'tools':
            case 'building_materials':
            case 'heating_and_ventilation':
            case 'plumbing':
            case 'electrics':
            case 'windows':
            case 'doors':
            case 'spares':
            case 'tires_and_wheels':
            case 'accessories_and_tools':
            case 'sports_protections':
            case 'bicycles':
            case 'scooters':
            case 'skateboards':
            case 'hoverboards_and_electric_scooters':
            case 'ball_games':
            case 'hunting_and_fishing':
            case 'tourism_and_outdoor_recreation':
            case 'billiards_and_bowling':
            case 'tennis_and_badminton':
            case 'exercise_equipment_and_fitness':
            case 'sports_nutrition':
            case 'water_sports':
            case 'sapboards':
            case 'table_games':
            case 'computer_games':
            case 'books_n_magazines':
            case 'tickets':
            case 'collections':
            case 'art_materials':
            case 'music':
            case 'music_tools':
                return <FormDefault />
            case 'education':
            case 'handyman':
            case 'beauty_and_health':
            case 'transportation':
            case 'repair_and_construction':
            case 'computer_services':
            case 'business_services':
            case 'cleaning':
            case 'automotive_services':
            case 'appliance_repair':
            case 'event_planning':
            case 'photography_and_videography':
            case 'custom_manufacturing':
            case 'pet_care':
            case 'car_seats':
            case 'health_and_care':
            case 'toys_and_games':
            case 'strollers':
            case 'feeding_and_nutrition':
            case 'bathing':
            case 'nursery':
            case 'diapers_and_potties':
            case 'baby_monitors':
            case 'maternity_products':
            case 'schoold_supplies':
            case 'makeup':
            case 'manicure_and_pedicure':
            case 'healthcare_products':
            case 'perfume':
            case 'skincare':
            case 'haircare':
            case 'tattoos_and_tatooing':
            case 'tanning_and_sunbeds':
            case 'personal_hygiene_products':
                return null;

            default:
                return null;
        }
    };



    const options = advertismentAl
        .map(ad => ad.title)
        .reduce((unique, title) => {
            return unique.findIndex(obj => obj.value === title) < 0
                ? [...unique, { value: title }]
                : unique;
        }, []);

    const filteredAdvertisements = advertismentAl.filter(ad =>
        ad.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const loadMoreAdvertisements = async () => {
        const additionalAdvertisements = await fetchAdditionalAdvertisements(advertisment);
        if (additionalAdvertisements.length > 0) {
            setAdvertisement(prevAdvertisements => [...prevAdvertisements, ...additionalAdvertisements]);
            setLoadedAdvertisements(prevLoaded => prevLoaded + additionalAdvertisements.length);
        } else {
            setLoadMoreButtonVisible(false);
        }
    };


    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        let timer;
        const fetchData = async () => {
            setIsLoading(true);
            timer = setTimeout(() => {
                setIsTimeout(true);
            }, 10000);
            setAdvertisement(await fetchAdvertisments(loadedAdvertisements));
            setAdvertisementAll(await fetchAdvertismentsSearch());
            setIsLoading(false);
            clearTimeout(timer);
            setIsTimeout(false);
        };
        fetchData();
        return () => clearTimeout(timer);
    }, []);

    const handleClickHelp = () => {
        history.push('/help');
      };

    return (
        <>
            <Helmet>
                <title>Advertisement Page - Find the Best Deals | Hvala</title>
                <meta
                    name="description"
                    content="Discover the best advertisements for various categories including estate, transport, clothes, electronics, and more. Find great deals and offers on Hvala."
                />
                <meta
                    name="keywords"
                    content="advertisements, estate, transport, clothes, electronics, house goods, building materials, tools, transport goods, home appliance, service, child goods, health and beauty, sport, hobby, relax, rest"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    property="og:title"
                    content="Advertisement Page - Find the Best Deals | Hvala"
                />
                <meta
                    property="og:description"
                    content="Discover the best advertisements for various categories including estate, transport, clothes, electronics, and more. Find great deals and offers on Hvala."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.yourcompanywebsite.com/advertisement"
                />
                <meta
                    property="og:image"
                    content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/advertisement.jpg?alt=media&token=example-token"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Advertisement Page - Find the Best Deals | Hvala"
                />
                <meta
                    name="twitter:description"
                    content="Discover the best advertisements for various categories including estate, transport, clothes, electronics, and more. Find great deals and offers on Hvala."
                />
                <meta
                    name="twitter:image"
                    content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/advertisement.jpg?alt=media&token=example-token"
                />
            </Helmet>
            <main>
                <div>
                    <style type="text/css">
                        {`
                @media (min-width: 1000px) {
                    body {
                        padding-top: 4.5rem;
                    }
                }
                `}
                    </style>

                    <MyNavbar />
                    <div className='app d-lg-none'>
                        <button
                            onClick={showModal}
                            className="fixed right-6 bottom-20 h-12 w-24 text-white bg-customColor2 rounded-lg flex items-center justify-center z-50"
                        >
                            <GlobalOutlined className="text-xl" />
                            <span className="ml-2">{t('language')}</span>
                        </button>
                    </div>
                    <div className='app d-lg-none'>
                        <button
                            onClick={handleClickHelp}
                            className="fixed left-6 bottom-20 h-12 w-24 text-white bg-customColor2 rounded-lg flex items-center justify-center z-50"
                        >
                            <QuestionCircleOutlined className="text-xl" />
                            <span className="ml-2">{t('help_navbar')}</span>
                        </button>
                    </div>
                    <LanguageModal
                        show={isModalVisible}
                        handleClose={handleModalClose}
                    />
                    <Categories setSearchText={setSearchText} options={options} />
                    <CategoryCards />
                    <div className='container d-none d-lg-block'>
                        <img src={banner} alt="Banner" className="img-fluid" style={{borderRadius: '10px'}} />
                    </div>
                    <div className='container mt-3' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <Space>
                            <a>

                            </a>
                        </Space>
                        <a onClick={showModalFilter}>
                            <Space>
                                <FilterOutlined />
                                {t('filter')}
                            </Space>
                        </a>
                        <Modal title="Фильтры" open={isModalVisibleFilter} footer={null} onCancel={handleCancelFilter}>
                            <label className='mt-3'>{t('prices')}</label>
                            <Space style={{ width: '100%' }} align="baseline">
                                <Select defaultValue="" onChange={handleCurrencyChange} value={currency} style={{ width: 100 }}>
                                    <Select.Option value="rsd">RSD</Select.Option>
                                    <Select.Option value="eur">EUR</Select.Option>
                                </Select>
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={t('minPricePlaceholder')}
                                    value={minPrice}
                                    onChange={handleMinPriceChange}
                                />
                                <InputNumber
                                    style={{ width: '100%' }}
                                    placeholder={t('maxPricePlaceholder')}
                                    value={maxPrice}
                                    onChange={handleMaxPriceChange}
                                />
                            </Space>
                            <label className='mt-3'>{t('country')}</label>
                            <Select
                                style={{ width: '100%' }}
                                placeholder={t('choice_country')}
                                options={[
                                    { value: 'serbia', label: t('serbia') },
                                    { value: 'montenegro', label: t('montenegro') },
                                    { value: 'croatia', label: t('croatia') },
                                    { value: 'bosnia_and_herzegovina', label: t('bosnia_and_herzegovina') },
                                ]}
                                onChange={handleCountryChange}
                            />
                            {country && (
                                <>
                                    <label className='mt-3'>{t('region')}</label>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder={t('choice_region')}
                                        options={countryRegions[country]}
                                        onChange={handleRegionChange}
                                        value={region}
                                    />
                                </>
                            )}
                            <label className='mt-3'>{t('category')}</label>
                            <Select
                                style={{ width: '100%' }}
                                placeholder={t('choice_category')}
                                options={categories}
                                onChange={handleCategoryChange}
                            />
                            {category && (
                                <>
                                    <label className='mt-3'>{t('subCategory')}</label>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder={t('choice_subcategory')}
                                        options={subcategories[category]}
                                        onChange={handleSubcategoryChange}
                                        value={subcategory}
                                    />
                                </>
                            )}
                            {renderForm()}

                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Button className='mt-3' type='primary' onClick={applyFilters}
                                    style={{ backgroundColor: '#FFBF34', border: 'none' }}>{t('apply')}</Button>
                                <Button className='mt-3' type='default' onClick={resetFilters}
                                    style={{ marginLeft: '10px' }}>{t('reset')}</Button>
                            </div>
                        </Modal>
                    </div>
                    <Container className="album mt-3">
                        {isTimeout ? (
                            <Result
                                status="500"
                                title="500"
                                subTitle={t('sorry_500')}
                                extra={<Button type="primary" onClick={() => window.location.reload()}>{t('update')}</Button>}
                            />
                        ) : isLoading ? (
                            <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <DefaultCardCategory key={index} />
                                ))}
                            </Row>
                        ) : (
                            <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                                {(searchText === "" ? advertisment : filteredAdvertisements).map((advertisment, index) => (
                                    <CardAdvertisementHome key={index} advertisment={advertisment} />
                                ))}
                            </Row>
                        )}
                    </Container>
                    {loadMoreButtonVisible && (
                        <div className="text-center mt-3">
                            <button className="btn btn-primary" style={{ border: 'none', backgroundColor: '#FFBF34', color: 'white' }} onClick={loadMoreAdvertisements}>
                                {t("show_more")}
                            </button>
                        </div>
                    )}
                    <CustomFooter />
                </div>
            </main>
        </>
    );
}
