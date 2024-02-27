import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { db, auth, storage } from "../../config/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from 'react';
import { MyNavbar } from "../../components/Navbar/Navbar";
import { Button, FormGroup } from "react-bootstrap";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import NavbarForMobileRouting from "../../components/Navbar/NavbarForMobileRouting"
import ClothesForm from "../../components/formsForAddingAdvertisements/ClothesForm";
import PhoneAndTabletsForm from "../../components/formsForAddingAdvertisements/PhoneAndTabletsForm";

export const AddItem = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [photoUrls, setSelectedFiles] = useState([]);
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');

    // Для автомобилей
    const [meleage, setMeleage] = useState('');
    const [drive, setDrive] = useState(''); // привод
    const [transmission, setTransmission] = useState(''); // трансмиссия
    const [wheel, setWheel] = useState(''); // руль
    const [year, setYear] = useState(''); // год выпуска
    const [body, setBody] = useState(''); // кузов
    const [customs, setCustoms] = useState(''); // кол-во владельцев
    const [color, setColor] = useState('');

    // Для одежды
    const [size, setSize] = useState('');


    // Для телеофонов и планшетов
    const [screen_size, setScreenSize] = useState('');
    const [memory, setMemory] = useState('');

    // Для недвежимости

    const handleFileChange = (event) => {
        setSelectedFiles([...event.target.files]);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubcategory(null);
    }

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
    }

    const handleSubmit = async () => {

        const fileUrls = await Promise.all(
            photoUrls.map(async (file) => {
                const storageRef = ref(storage, 'advertisment/' + file.name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                return new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                        },
                        (error) => {
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                resolve(downloadURL);
                            });
                        }
                    );
                });
            })
        );

        let formData;

        switch (selectedSubcategory) {
            case 'phones_and_tablets':
                formData = {
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    title,
                    price,
                    brand,
                    model,
                    screen_size,
                    memory,
                    condition,
                    description,
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                    from_uid: auth.currentUser ? auth.currentUser.uid : null,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available" // !TODO
                };
                break;
            case 'auto' || 'moto' || 'water_transport':
                formData = {
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    title,
                    price,
                    brand,
                    model,
                    condition,
                    meleage,
                    year,
                    body,
                    color,
                    transmission,
                    drive,
                    wheel,
                    customs,
                    description,
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                    from_uid: auth.currentUser ? auth.currentUser.uid : null,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available" // !TODO
                };
                break;

            case 'moto':
                formData = {
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    title,
                    price,
                    brand,
                    model,
                    condition,
                    meleage,
                    year,
                    color,
                    transmission,
                    drive,
                    customs,
                    description,
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                    from_uid: auth.currentUser ? auth.currentUser.uid : null,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available" //!TODO
                };
            default:
                break;
        }

        const advertismentRef = collection(db, 'advertisment');

        addDoc(advertismentRef, formData)
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                history.push('/profile');
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
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

            <NavbarForMobileRouting />

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

                    {(selectedSubcategory === 'auto' || selectedSubcategory === 'moto' || selectedSubcategory === 'water_transport') && (
                        <div>
                            <FormGroup className="mb-3">
                                <Form.Label>Название</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </FormGroup>
                            <Form.Group className="mb-3">
                                <Form.Label>Выберите марку автомобиля</Form.Label>
                                <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                    <option>Brand</option>
                                    <option value="Audi">Audi</option>
                                    <option value="BMW">BMW</option>
                                    <option value="Mersedes">Mersedes</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Введите модель автомобиля</Form.Label>
                                <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Цена</Form.Label>
                                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Введите год выпуска</Form.Label>
                                <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2020" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Введите пробег</Form.Label>
                                <Form.Control type="number" value={meleage} onChange={(e) => setMeleage(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Выберите тип кузова</Form.Label>
                                <Form.Select aria-label="Default select example" value={body} onChange={(e) => setBody(e.target.value)}>
                                    <option>Кузов</option>
                                    <option value="Седан">Седан</option>
                                    <option value="Хэтчбек">Хэтчбек</option>
                                    <option value="Универсал">Универсал</option>
                                    <option value="Купе">Купе</option>
                                    <option value="Кабоиолет">Кабоиолет</option>
                                    <option value="Кроссовер">Кроссовер</option>
                                    <option value="Внедорожник">Внедорожник</option>
                                    <option value="Пикап">Пикап</option>
                                    <option value="Минивен">Минивен</option>
                                    <option value="Лимузин">Лимузин</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Введите цвет</Form.Label>
                                <Form.Control type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Выберите трансмиссию</Form.Label>
                                <Form.Select aria-label="Default select example" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                                    <option>Трансмиссия</option>
                                    <option value="1">Механическая</option>
                                    <option value="2">Автоматическая</option>
                                    <option value="3">Варитор</option>
                                    <option value="4">Двухсцепная</option>
                                    <option value="5">Полуавтоматичская</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Выберите привод</Form.Label>
                                <Form.Select aria-label="Default select example" value={drive} onChange={(e) => setDrive(e.target.value)}>
                                    <option>Привод</option>
                                    <option value="1">Полный</option>
                                    <option value="2">Передний</option>
                                    <option value="3">Задний</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Выберите расположение руля</Form.Label>
                                <Form.Select aria-label="Default select example" value={wheel} onChange={(e) => setWheel(e.target.value)}>
                                    <option>Руль</option>
                                    <option value="1">Левое</option>
                                    <option value="2">Правое</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Выберите состояние</Form.Label>
                                <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                    <option>Состояние</option>
                                    <option value="1">Новое</option>
                                    <option value="2">Б/У</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Введите количество владельцев</Form.Label>
                                <Form.Control type="number" value={customs} onChange={(e) => setCustoms(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Описание</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Фото</Form.Label>
                                <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
                            </Form.Group>
                            <div className="mb-3">
                                {photoUrls.map((file, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt={`preview ${index}`}
                                        style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }}
                                    />
                                ))}
                            </div>
                            <div className="d-grid gap-2">
                                <Button onClick={handleSubmit} variant="primary" size="lg">
                                    Добавить
                                </Button>
                            </div>
                        </div>
                    )}

                    { (selectedSubcategory === 'mens_clothing' || selectedSubcategory === 'womens_clothing' || selectedSubcategory === 'childrens_clothing') && (
                        <ClothesForm title={title} setTitle={setTitle}
                         price={price} setPrice={setPrice} 
                         size={size} setSize={setSize} 
                         brand={brand} setBrand={setBrand} 
                         condition={condition} setCondition={setCondition} 
                         description={description} setDescription={setDescription} 
                         handleFileChange={handleFileChange} photoUrls={photoUrls}
                         handleSubmit={handleSubmit}
                         />
                    )}
                    
                    {selectedSubcategory === 'phones_and_tablets' && (
                            <PhoneAndTabletsForm title={title} setTitle={setTitle} 
                            price={price} setPrice={setPrice} 
                            model={model} setModel={setModel} 
                            screen_size={screen_size} setScreenSize={setScreenSize} 
                            memory={memory} setMemory={setMemory} 
                            brand={brand} setBrand={setBrand} 
                            condition={condition} setCondition={setCondition} 
                            description={description} setDescription={setDescription} 
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                            />
                    )}

                </Form>
            </Container>

        </div>
    );
}