import React, { useEffect, useState } from 'react';
import { MyNavbar } from '../../components/Navbar/Navbar';
import { NavBarBack } from '../../components/Navbar/NavBarBack';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Modal, Select, Input, Space, Dropdown, InputNumber } from 'antd'
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';
import CardAdvertisementHome from '../../components/card-advertisment-home/CardAdvertisementHome';
import { fetchAdvertismentsByCategory, fetchAdvertismentsByFilters } from '../../services/AdvertismentsCardCategory';
import { DownOutlined, SmileOutlined, FilterOutlined } from '@ant-design/icons';
import { t } from 'i18next';
import Categories from '../../components/category';

import styles from './Container.module.css';

export const CategoryAdvertisments = () => {
    const { category } = useParams();
    const [advertisments, setAdvertisments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { Option } = Select;

    const [subcategory, setSubCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');

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

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ];

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
            { value: 'sale_estate', label: t('sale_estate') },
            { value: 'rent_estate', label: t('rent_estate') },
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

    const currentSubcategories = subcategories[category] || [];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [searchText, setSearchText] = useState('');

    const options = advertisments
        .map(ad => ad.title)
        .reduce((unique, title) => {
            return unique.findIndex(obj => obj.value === title) < 0
                ? [...unique, { value: title }]
                : unique;
        }, []);

    const filteredAdvertisements = advertisments.filter(ad =>
        ad.title.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        let unsubscribe;

        unsubscribe = fetchAdvertismentsByCategory(category, setAdvertisments, setIsLoading);
        return () => unsubscribe();
    }, [category]);

    const applyFilters = () => {
        console.log("Фильтры:", { category, subcategory, country, region, condition, memory, brand, transmission, body, wheel, drive, year, mileage });
        fetchAdvertismentsByFilters(category, subcategory, country, region, condition, size, type, wheel, mileage, body, drive, year, transmission, memory, screen_size, brand, setAdvertisments, setIsLoading
        );
        setIsModalOpen(false);
    };

    const resetFilters = () => {
        setSubCategory('');
        setCondition('');
        setCountry('');
        setRegion('');
        setMemory('');
        setScreenSize('');
        fetchAdvertismentsByCategory(category, setAdvertisments, setIsLoading);
    };

    useEffect(() => {
        resetFilters();
    }, [category]);

    const FormSmartphonesAndTablets = () =>
        <>
            <label className='mt-3'>Состояние</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">Выберите состояние</Option>
                <Option value="new_cond">Новое</Option>
                <Option value="bu_cond">Б/У</Option>
            </Select>
            <label className='mt-3'>Бренд</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">Выберите бренд</Option>
                <Option value="Apple">Apple</Option>
                <Option value="Samsung">Samsung</Option>
            </Select>
            <label className='mt-3'>Память</label>
            <Select style={{ width: '100%' }} onChange={setMemory} value={memory}>
                <Option value="">Выберите память</Option>
                <Option value="32">32Gb</Option>
                <Option value="64">64Gb</Option>
                <Option value="128">128Gb</Option>
                <Option value="256">256Gb</Option>
                <Option value="512">512Gb</Option>
            </Select>
            <label className='mt-3'>Размер экрана</label>
            <Select style={{ width: '100%' }} onChange={setScreenSize} value={screen_size}>
                <Option value="">Выберите размер экрана</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </>
        ;

    const FormTransport = () =>
        <>
            <label className='mt-3'>Состояние</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">Выберите состояние</Option>
                <Option value="condition_new">{t('condition_new')}</Option>
                <Option value="used">{t('used')}</Option>
            </Select>
            <label className='mt-3'>{t('choice_mark')}</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">Выберите бренд</Option>
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
                <Option value="">Выберите тип кузова</Option>
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
            <label className='mt-3'>{t('choice_wheel')}</label>
            <Select value={wheel} onChange={(value) => setWheel(value)}
                style={{
                    width: '100%',
                }}>
                <Option value="">Выберите расположение руля</Option>
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
            <label className='mt-3'>Состояние</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">Выберите состояние</Option>
                <Option value="new_cond">Новое</Option>
                <Option value="bu_cond">Б/У</Option>
            </Select>
            <label className='mt-3'>Бренд</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">Выберите бренд</Option>
                <Option value="Apple">Apple</Option>
                <Option value="Samsung">Samsung</Option>
            </Select>
            <label className='mt-3'>Размер экрана</label>
            <Select style={{ width: '100%' }} onChange={setScreenSize} value={screen_size}>
                <Option value="">Выберите размер экрана</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
            </Select>
        </>

    const FormComputers = () =>
        <>
            <label className='mt-3'>Состояние</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">Выберите состояние</Option>
                <Option value="new_cond">Новое</Option>
                <Option value="bu_cond">Б/У</Option>
            </Select>
            <label className='mt-3'>Бренд</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">Выберите бренд</Option>
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
            <label className='mt-3'>Тип</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">Выберите тип</Option>
                <Option value="laptop">{t('laptop')}</Option>
                <Option value="stationary_computer">{t('stationary_computer')}</Option>
                <Option value="micro_computer">{t('micro_computer')}</Option>
                <Option value="monoblock">{t('monoblock')}</Option>
            </Select>
        </>
        ;

    const FormComputersAccs = () =>
        <>
            <label className='mt-3'>Состояние</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">Выберите состояние</Option>
                <Option value="new_cond">Новое</Option>
                <Option value="bu_cond">Б/У</Option>
            </Select>
            <label className='mt-3'>Бренд</label>
            <Select style={{ width: '100%' }} onChange={setBrand} value={brand}>
                <Option value="">Выберите бренд</Option>
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
            <label className='mt-3'>Тип</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">Выберите тип</Option>
                <Option>{t('type')}</Option>
                <Option value="mouse">{t('mouse')}</Option>
                <Option value="keyboard">{t('keyboard')}</Option>
                <Option value="headphones">{t('headphones')}</Option>
                <Option value="monitor">{t('monitor')}</Option>
            </Select>
        </>

    const FormEstate = () =>
        <>
            <label className='mt-3'>Тип</label>
            <Select style={{ width: '100%' }} onChange={setType} value={type}>
                <Option value="">Выберите тип</Option>
                <Option value="house">{t('house')}</Option>
                <Option value="garage">{t('garage')}</Option>
                <Option value="aparment">{t('aparment')}</Option>
                <Option value="commercial_real_estate">{t('commercial_real_estate')}</Option>
                <Option value="room">{t('room')}</Option>
            </Select>
            <label className='mt-3'>Количество комнат</label>
            <Input type="text" value={rooms_amount} onChange={(e) => setRoomsAmount(e.target.value)} />
            <label className='mt-3'>Площадь</label>
            <Input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
            <label className='mt-3'>Владелец или риелтор</label>
            <Select style={{ width: '100%' }} onChange={setOwner} value={owner}>
                <Option value="">Выберите собственика</Option>
                <Option value="owner">{t('owner')}</Option>
                <Option value="realtor">{t('realtor')}</Option>
            </Select>
        </>

    const FormHomeAppliance = () =>
        <>
            <label className='mt-3'>Состояние</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">Выберите состояние</Option>
                <Option value="new_cond">Новое</Option>
                <Option value="bu_cond">Б/У</Option>
            </Select>
        </>

    const FormDefault = () =>
        <>
            <label className='mt-3'>Состояние</label>
            <Select style={{ width: '100%' }} onChange={setCondition} value={condition}>
                <Option value="">Выберите состояние</Option>
                <Option value="new_cond">Новое</Option>
                <Option value="bu_cond">Б/У</Option>
            </Select>
        </>

    const renderForm = () => {
        switch (subcategory) {
            case 'phones_and_tablets':
                return <FormSmartphonesAndTablets />;
            case 'tv':
                return <FormTv />;
            case 'computers':
                return <FormComputers />;
            case 'computer_accessories':
                return <FormComputersAccs />
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

    return (
        <div>

            <style type="text/css">
                {`
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 6rem;
                        padding-top: 3.5rem;
                    }
                }
                @media (min-width: 1000px) {
                  body {
                        padding-top: 4.5rem;
                        padding-bottom: 2.5rem;
                    }
                }
                `}
            </style>

            <MyNavbar />
            <NavBarBack />

            <Categories setSearchText={setSearchText} options={options} />

            <Container>
                <Row>
                    <Col md={3} className=' d-none d-lg-block'>

                        <label className='mt-3'>Страна</label>
                        <Select style={{ width: '100%' }} onChange={value => setCountry(value)} value={country}>
                            <Option value="">Выберите страну</Option>
                            <Option value="serbia">{t('serbia')}</Option>
                            <Option value="montenegro">{t('montenegro')}</Option>
                            <Option value="croatia">{t('croatia')}</Option>
                            <Option value="bosnia_and_herzegovina">{t('bosnia_and_herzegovina')}</Option>
                        </Select>

                        {country && (
                            <>
                                <label className='mt-3'>Регион</label>
                                <Select style={{ width: '100%' }} onChange={value => setRegion(value)} value={region}>
                                    {countryRegions[country] ? countryRegions[country].map(region => (
                                        <Option key={region.value} value={region.value}>
                                            {region.label}
                                        </Option>
                                    )) : null}
                                </Select>
                            </>
                        )}

                        <label className='mt-3'>Подкатегория</label>
                        <Select style={{ width: '100%' }} onChange={setSubCategory} value={subcategory}>
                            <Option value="">Выберите подкатегорию</Option>
                            {currentSubcategories.map(subcategory => (
                                <Option key={subcategory.value} value={subcategory.value}>
                                    {subcategory.label}
                                </Option>
                            ))}
                        </Select>

                        {renderForm()}

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button className='mt-3' type='primary' onClick={applyFilters}
                                style={{ backgroundColor: 'orange', border: 'none' }}>Применить</Button>
                            <Button className='mt-3' type='default' onClick={resetFilters}
                                style={{ marginLeft: '10px' }}>Сбросить</Button>
                        </div>
                    </Col>
                    {isLoading ? (
                        <Col md={9}>
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <DefaultCardCategory key={index} />
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    ) : (
                        <Col md={9}>
                            <Container className="album">
                                <div className='d-lg-none'>
                                    <div className={styles.container}>
                                        <div className={styles.sorting}>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                }}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        Сортировать
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className={styles.filters}>
                                            <a onClick={showModal}>
                                                <Space>
                                                    <FilterOutlined />
                                                    Фильтры
                                                </Space>
                                            </a>
                                            <Modal title="Фильтры" open={isModalOpen} footer={null} onCancel={handleCancel}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    <p>Диапазон цен:</p>
                                                    <div>
                                                        <InputNumber
                                                            defaultValue={0}
                                                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                            style={{ marginRight: '20px' }}
                                                        />
                                                        <InputNumber
                                                            defaultValue={0}
                                                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                                        />
                                                    </div>
                                                    <label className='mt-3'>Страна</label>
                                                    <Select style={{ width: '100%' }} onChange={value => setCountry(value)} value={country}>
                                                        <Option value="">Выберите страну</Option>
                                                        <Option value="serbia">{t('serbia')}</Option>
                                                        <Option value="montenegro">{t('montenegro')}</Option>
                                                        <Option value="croatia">{t('croatia')}</Option>
                                                        <Option value="bosnia_and_herzegovina">{t('bosnia_and_herzegovina')}</Option>
                                                    </Select>

                                                    {country && (
                                                        <>
                                                            <label className='mt-3'>Регион</label>
                                                            <Select style={{ width: '100%' }} onChange={value => setRegion(value)} value={region}>
                                                                {countryRegions[country] ? countryRegions[country].map(region => (
                                                                    <Option key={region.value} value={region.value}>
                                                                        {region.label}
                                                                    </Option>
                                                                )) : null}
                                                            </Select>
                                                        </>
                                                    )}

                                                    <label className='mt-3'>Подкатегория</label>
                                                    <Select style={{ width: '100%' }} onChange={setSubCategory} value={subcategory}>
                                                        <Option value="">Выберите подкатегорию</Option>
                                                        {currentSubcategories.map(subcategory => (
                                                            <Option key={subcategory.value} value={subcategory.value}>
                                                                {subcategory.label}
                                                            </Option>
                                                        ))}
                                                    </Select>

                                                    {renderForm()}

                                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                        <Button className='mt-3' type='primary' onClick={applyFilters}
                                                            style={{ backgroundColor: 'orange', border: 'none' }}>Применить</Button>
                                                        <Button className='mt-3' type='default' onClick={resetFilters}
                                                            style={{ marginLeft: '10px' }}>Сбросить</Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>

                                <Row xs={2} sm={2} md={3} lg={3} className="g-3 mt-1" id="cardAds">
                                    {filteredAdvertisements.length > 0 ? (
                                        filteredAdvertisements.map((advertisment, index) => (
                                            <CardAdvertisementHome key={index} advertisment={advertisment} />
                                        ))
                                    ) : (
                                        <Col>
                                            <p>По вашему запросу ничего не найдено.</p>
                                        </Col>
                                    )}
                                </Row>
                            </Container>
                        </Col>
                    )}
                </Row>
            </Container>

        </div>
    );
}