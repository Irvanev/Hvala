import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {Container, Form} from "react-bootstrap";
import {useState} from 'react';
import {MyNavbar} from "../../components/Navbar/Navbar";
import {AddFormForAuto} from "../../components/AddFormForAuto";
export const AddItem = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const goBack = () => {
        history.goBack();
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubcategory(null);
    }

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
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
                        padding-top: 3.5rem;
                        padding-bottom: 2.5rem;
                    }
                }
                `}
            </style>

            <MyNavbar />

            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
                <div className="container">
                    <ul className="navbar-nav me-auto mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={goBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                     className="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <Container className="mt-3">
                <h3>Создание объявления</h3>
                <Form>
                    <Form.Select className="mb-3" aria-label="Default select example" onChange={handleCategoryChange}>
                        <option>Выберите категорию</option>
                        <option value="estate">{t('estate')}</option>
                        <option value="transport">{t('transport')}</option>
                        <option value="clothes">{t('clothes')}</option>
                        <option value="electronics">{t('electronics')}</option>
                        <option value="house_goods">{t('house_goods')}</option>
                        <option value="building_materials_and_tools">{t('building_materials_and_tools')}</option>
                        <option value="transport_goods">{t('transport_goods')}</option>
                        <option value="home_appliance">{t('home_appliance')}</option>
                        <option value="service">{t('service')}</option>
                        <option value="child_goods">{t('child_goods')}</option>
                        <option value="health_and_beauty">{t('health_and_beauty')}</option>
                        <option value="sport">{t('sport')}</option>
                        <option value="hobby_n_Relax">{t('hobby_n_Relax')}</option>
                        <option value="rest">{t('rest')}</option>
                    </Form.Select>
                    {selectedCategory === 'estate' && (
                        <Form.Select aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="house">{t('house')}</option>
                            <option value="garage">{t('garage')}</option>
                            <option value="aparment">{t('aparment')}</option>
                            <option value="commercial_real_estate">{t('commercial_real_estate')}</option>
                            <option value="room">{t('room')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'transport' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="auto">{t('auto')}</option>
                            <option value="moto"> {t('moto')}</option>
                            <option value="water_transport">{t('water_transport')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'clothes' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="mens_clothing">{t('mens_clothing')}</option>
                            <option value="womens_clothing">{t('womens_clothing')}</option>
                            <option value="childrens_clothing">{t('childrens_clothing')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'electronics' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="computers">{t('computers')}</option>
                            <option value="phones_and_tablets">{t('phones_and_tablets')}</option>
                            <option value="tv"> {t('tv')}</option>
                            <option value="computer_accessories"> {t('computer_accessories')}</option>
                            <option value="photo_video"> {t('photo_video')}</option>
                            <option value="game_console"> {t('game_console')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'house_goods' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="furniture">{t('furniture')}</option>
                            <option value="lighting">{t('lighting')}</option>
                            <option value="dishes"> {t('dishes')}</option>
                            <option value="garden_equipment"> {t('garden_equipment')}</option>
                            <option value="domestic_cleaning"> {t('domestic_cleaning')}</option>
                            <option value="kitchen_equipment"> {t('kitchen_equipment')}</option>
                            <option value="other_cat"> {t('other_cat')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'building_materials_and_tools' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="tools">{t('tools')}</option>
                            <option value="building_materials">{t('building_materials')}</option>
                            <option value="heating_and_ventilation"> {t('heating_and_ventilation')}</option>
                            <option value="plumbing"> {t('plumbing')}</option>
                            <option value="electrics"> {t('electrics')}</option>
                            <option value="windows"> {t('windows')}</option>
                            <option value="doors"> {t('doors')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'transport_goods' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="spares">{t('spares')}</option>
                            <option value="tires_and_wheels">{t('tires_and_wheels')}</option>
                            <option value="accessories_and_tools"> {t('accessories_and_tools')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'home_appliance' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="refrigerators">{t('refrigerators')}</option>
                            <option value="washing_machines">{t('washing_machines')}</option>
                            <option value="vacuum_cleaners"> {t('vacuum_cleaners')}</option>
                            <option value="stoves_and_ovens"> {t('stoves_and_ovens')}</option>
                            <option value="sewing_equipment"> {t('sewing_equipment')}</option>
                            <option value="food_preparation"> {t('food_preparation')}</option>
                            <option value="dishwasher"> {t('dishwasher')}</option>
                            <option value="other_cat"> {t('other_cat')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'service' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="education">{t('education')}</option>
                            <option value="handyman">{t('handyman')}</option>
                            <option value="beauty_and_health"> {t('beauty_and_health')}</option>
                            <option value="transportation"> {t('transportation')}</option>
                            <option value="repair_and_construction"> {t('repair_and_construction')}</option>
                            <option value="computer_services"> {t('computer_services')}</option>
                            <option value="business_services"> {t('business_services')}</option>
                            <option value="cleaning"> {t('cleaning')}</option>
                            <option value="automotive_services"> {t('automotive_services')}</option>
                            <option value="appliance_repair"> {t('appliance_repair')}</option>
                            <option value="event_planning"> {t('event_planning')}</option>
                            <option value="photography_and_videography"> {t('photography_and_videography')}</option>
                            <option value="custom_manufacturing"> {t('custom_manufacturing')}</option>
                            <option value="pet_care"> {t('pet_care')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'child_goods' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="car_seats">{t('car_seats')}</option>
                            <option value="health_and_care">{t('health_and_care')}</option>
                            <option value="toys_and_games"> {t('toys_and_games')}</option>
                            <option value="strollers"> {t('strollers')}</option>
                            <option value="feeding_and_nutrition"> {t('feeding_and_nutrition')}</option>
                            <option value="bathing"> {t('bathing')}</option>
                            <option value="nursery"> {t('nursery')}</option>
                            <option value="diapers_and_potties"> {t('diapers_and_potties')}</option>
                            <option value="baby_monitors"> {t('baby_monitors')}</option>
                            <option value="maternity_products"> {t('maternity_products')}</option>
                            <option value="schoold_supplies"> {t('schoold_supplies')}</option>
                            <option value="other_cat"> {t('other_cat')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'health_and_beauty' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="makeup">{t('makeup')}</option>
                            <option value="manicure_and_pedicure">{t('manicure_and_pedicure')}</option>
                            <option value="healthcare_products"> {t('healthcare_products')}</option>
                            <option value="perfume"> {t('perfume')}</option>
                            <option value="skincare"> {t('skincare')}</option>
                            <option value="haircare"> {t('haircare')}</option>
                            <option value="tattoos_and_tatooing"> {t('tattoos_and_tatooing')}</option>
                            <option value="tanning_and_sunbeds"> {t('tanning_and_sunbeds')}</option>
                            <option value="personal_hygiene_products"> {t('personal_hygiene_products')}</option>
                            <option value="other_cat"> {t('other_cat')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'sport' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="sports_protections">{t('sports_protections')}</option>
                            <option value="bicycles">{t('bicycles')}</option>
                            <option value="scooters"> {t('scooters')}</option>
                            <option value="skateboards"> {t('skateboards')}</option>
                            <option value="hoverboards_and_electric_scooters"> {t('hoverboards_and_electric_scooters')}</option>
                            <option value="ball_games"> {t('ball_games')}</option>
                            <option value="hunting_and_fishing"> {t('hunting_and_fishing')}</option>
                            <option value="tourism_and_outdoor_recreation"> {t('tourism_and_outdoor_recreation')}</option>
                            <option value="billiards_and_bowling"> {t('billiards_and_bowling')}</option>
                            <option value="tennis_and_badminton"> {t('tennis_and_badminton')}</option>
                            <option value="exercise_equipment_and_fitness"> {t('exercise_equipment_and_fitness')}</option>
                            <option value="sports_nutrition"> {t('sports_nutrition')}</option>
                            <option value="water_sports"> {t('water_sports')}</option>
                            <option value="sapboards"> {t('sapboards')}</option>
                            <option value="other_cat"> {t('other_cat')}</option>
                        </Form.Select>
                    )}
                    {selectedCategory === 'hobby_n_Relax' && (
                        <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange}>
                            <option>Выберите подкатегорию</option>
                            <option value="table_games">{t('table_games')}</option>
                            <option value="computer_games">{t('computer_games')}</option>
                            <option value="books_n_magazines"> {t('books_n_magazines')}</option>
                            <option value="tickets"> {t('tickets')}</option>
                            <option value="collections"> {t('collections')}</option>
                            <option value="art_materials"> {t('art_materials')}</option>
                            <option value="music"> {t('music')}</option>
                            <option value="music_tools"> {t('music_tools')}</option>
                        </Form.Select>
                    )}

                    {selectedSubcategory === 'auto' && (
                        <AddFormForAuto />
                    )}

                </Form>
            </Container>

        </div>
    );
}