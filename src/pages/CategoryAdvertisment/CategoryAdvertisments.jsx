import React, {useEffect, useState} from 'react';
import {MyNavbar} from '../../components/Navbar/Navbar';
import {NavBarBack} from '../../components/Navbar/NavBarBack';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import {Button, Input, Modal, Select, InputNumber} from 'antd'
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';
import CardAdvertisementHome from '../../components/card-advertisment-home/CardAdvertisementHome';
import {fetchAdvertismentsByCategory, fetchAdvertismentsBySubcategory} from '../../services/AdvertismentsCardCategory';
import {t} from 'i18next';
import Categories from '../../components/category';

export const CategoryAdvertisments = () => {
    const {category} = useParams();
    const [advertisments, setAdvertisments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {Option} = Select;

    const [selectedSubcategory, setSelectedSubcategory] = useState(null);


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
        if (selectedSubcategory) {
            unsubscribe = fetchAdvertismentsBySubcategory(category, selectedSubcategory, setAdvertisments, setIsLoading);
        } else {
            unsubscribe = fetchAdvertismentsByCategory(category, setAdvertisments, setIsLoading);
        }
        return () => unsubscribe();
    }, [category, selectedSubcategory]);

    let subcategories;

    switch (category) {
        case 'clothes':
            subcategories = [
                {value: 'womens_clothing', label: 'Женская одежда'},
                {value: 'mens_clothing', label: 'Мужская одежда'},
                {value: 'childrens_clothing', label: 'Детская одежда'}
            ];
            break;
        case 'electronics':
            subcategories = [
                {value: 'computers', label: t('computers')},
                {value: 'phones_and_tablets', label: t('phones_and_tablets')},
                {value: 'tv', label: t('tv')},
                {value: 'computer_accessories', label: t('computer_accessories')},
                {value: 'photo_video', label: t('photo_video')},
                {value: 'game_console', label: t('game_console')}
            ];
            break;
        case 'transport':
            subcategories = [
                {value: 'auto', label: t('auto')},
                {value: 'moto', label: t('moto')},
                {value: 'water_transport', label: t('water_transport')}
            ];
            break;
        case 'estate':
            subcategories = [
                {value: 'sale_estate', label: t('sale_estate')},
                {value: 'rent_estate', label: t('rent_estate')}
            ];
            break;
        case 'house_goods':
            subcategories = [
                {value: 'furniture', label: t('furniture')},
                {value: 'lighting', label: t('lighting')},
                {value: 'dishes', label: t('dishes')},
                {value: 'garden_equipment', label: t('garden_equipment')},
                {value: 'domestic_cleaning', label: t('domestic_cleaning')},
                {value: 'kitchen_equipment', label: t('kitchen_equipment')},
                {value: 'other_cat', label: t('other_cat')}
            ];
            break;
        case 'building_materials_and_tools':
            subcategories = [
                {value: 'sale_estate', label: t('sale_estate')},
                {value: 'rent_estate', label: t('rent_estate')},
                {value: 'tools', label: t('tools')},
                {value: 'building_materials', label: t('building_materials')},
                {value: 'heating_and_ventilation', label: t('heating_and_ventilation')},
                {value: 'plumbing', label: t('plumbing')},
                {value: 'electrics', label: t('electrics')},
                {value: 'windows', label: t('windows')},
                {value: 'doors', label: t('doors')}
            ];
            break;
        case 'transport_goods':
            subcategories = [
                {value: 'spares', label: t('spares')},
                {value: 'tires_and_wheels', label: t('tires_and_wheels')},
                {value: 'accessories_and_tools', label: t('accessories_and_tools')}
            ];
            break;
        case 'home_appliance':
            subcategories = [
                {value: 'refrigerators', label: t('refrigerators')},
                {value: 'washing_machines', label: t('washing_machines')},
                {value: 'vacuum_cleaners', label: t('vacuum_cleaners')},
                {value: 'stoves_and_ovens', label: t('stoves_and_ovens')},
                {value: 'sewing_equipment', label: t('sewing_equipment')},
                {value: 'food_preparation', label: t('food_preparation')},
                {value: 'dishwasher', label: t('dishwasher')},
                {value: 'other_cat', label: t('other_cat')}
            ];
            break;
        case 'service':
            subcategories = [
                {value: 'education', label: t('education')},
                {value: 'handyman', label: t('handyman')},
                {value: 'beauty_and_health', label: t('beauty_and_health')},
                {value: 'transportation', label: t('transportation')},
                {value: 'repair_and_construction', label: t('repair_and_construction')},
                {value: 'computer_services', label: t('computer_services')},
                {value: 'business_services', label: t('business_services')},
                {value: 'cleaning', label: t('cleaning')},
                {value: 'automotive_services', label: t('automotive_services')},
                {value: 'appliance_repair', label: t('appliance_repair')},
                {value: 'event_planning', label: t('event_planning')},
                {value: 'photography_and_videography', label: t('photography_and_videography')},
                {value: 'custom_manufacturing', label: t('custom_manufacturing')},
                {value: 'pet_care', label: t('pet_care')}
            ];
            break;
        case 'child_goods':
            subcategories = [
                {value: 'car_seats', label: t('car_seats')},
                {value: 'health_and_care', label: t('health_and_care')},
                {value: 'toys_and_games', label: t('toys_and_games')},
                {value: 'strollers', label: t('strollers')},
                {value: 'feeding_and_nutrition', label: t('feeding_and_nutrition')},
                {value: 'bathing', label: t('bathing')},
                {value: 'nursery', label: t('nursery')},
                {value: 'diapers_and_potties', label: t('diapers_and_potties')},
                {value: 'baby_monitors', label: t('baby_monitors')},
                {value: 'maternity_products', label: t('maternity_products')},
                {value: 'schoold_supplies', label: t('schoold_supplies')},
                {value: 'other_cat', label: t('other_cat')}
            ];
            break;
        case 'health_and_beauty':
            subcategories = [
                {value: 'makeup', label: t('makeup')},
                {value: 'manicure_and_pedicure', label: t('manicure_and_pedicure')},
                {value: 'healthcare_products', label: t('healthcare_products')},
                {value: 'perfume', label: t('perfume')},
                {value: 'skincare', label: t('skincare')},
                {value: 'haircare', label: t('haircare')},
                {value: 'tattoos_and_tatooing', label: t('tattoos_and_tatooing')},
                {value: 'tanning_and_sunbeds', label: t('tanning_and_sunbeds')},
                {value: 'personal_hygiene_products', label: t('personal_hygiene_products')},
                {value: 'other_cat', label: t('other_cat')}
            ];
            break;
        case 'sport':
            subcategories = [
                {value: 'sports_protections', label: t('sports_protections')},
                {value: 'bicycles', label: t('bicycles')},
                {value: 'scooters', label: t('scooters')},
                {value: 'skateboards', label: t('skateboards')},
                {value: 'hoverboards_and_electric_scooters', label: t('hoverboards_and_electric_scooters')},
                {value: 'ball_games', label: t('ball_games')},
                {value: 'hunting_and_fishing', label: t('hunting_and_fishing')},
                {value: 'tourism_and_outdoor_recreation', label: t('tourism_and_outdoor_recreation')},
                {value: 'billiards_and_bowling', label: t('billiards_and_bowling')},
                {value: 'tennis_and_badminton', label: t('tennis_and_badminton')},
                {value: 'exercise_equipment_and_fitness', label: t('exercise_equipment_and_fitness')},
                {value: 'sports_nutrition', label: t('sports_nutrition')},
                {value: 'water_sports', label: t('water_sports')},
                {value: 'sapboards', label: t('sapboards')},
                {value: 'other_cat', label: t('other_cat')}
            ];
            break;
        case 'hobby_n_Relax':
            subcategories = [
                { value: 'table_games', label: t('table_games') },
                { value: 'computer_games', label: t('computer_games') },
                { value: 'books_n_magazines', label: t('books_n_magazines') },
                { value: 'tickets', label: t('tickets') },
                { value: 'collections', label: t('collections') },
                { value: 'art_materials', label: t('art_materials') },
                { value: 'music', label: t('music') },
                { value: 'music_tools', label: t('music_tools') }
            ];
            break;
        default:
            subcategories = [];
    }


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

            <MyNavbar/>
            <NavBarBack/>

            <Categories setSearchText={setSearchText} options={options}/>

            <Modal title="Фильтры" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <p>Диапазон цен:</p>
                    <div>
                        <InputNumber
                            defaultValue={0}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                            style={{marginRight: '20px'}}
                        />
                        <InputNumber
                            defaultValue={0}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                        />
                    </div>
                    <p>Выбор страны:</p>
                    <Select defaultValue="Россия" style={{width: 240}}>
                        <Option value="Россия">Россия</Option>
                        <Option value="США">США</Option>
                        <Option value="Китай">Китай</Option>
                    </Select>
                    <Button className='mt-3' type='primary'
                            style={{backgroundColor: 'orange', border: 'none'}}>Применить</Button>
                </div>
            </Modal>

            <Container>
                <Row>
                    <Col md={3} className=' d-none d-lg-block'>
                        <Select
                            defaultValue="Выберите подкатегорию"
                            style={{
                                marginTop: '20px',
                                width: '100%',
                            }}
                            onChange={(value) => setSelectedSubcategory(value)}
                        >
                            {subcategories.map((subcategory, index) => (
                                <Option key={index} value={subcategory.value}>
                                    {subcategory.label}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    {isLoading ? (
                        <Col md={9}>
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                    {Array.from({length: 10}).map((_, index) => (
                                        <DefaultCardCategory key={index}/>
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    ) : (
                        <Col md={9}>
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                    {filteredAdvertisements.map((advertisment, index) => (
                                        <CardAdvertisementHome key={index} advertisment={advertisment} />
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    )}
                </Row>
            </Container>

        </div>
    );
}