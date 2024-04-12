import React from 'react'
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Form, Container, FormGroup, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import NavbarForMobileRouting from "../../components/Navbar/NavbarForMobileRouting"
import { MyNavbar } from "../../components/Navbar/Navbar";
import CategorySelect from '../../pages/EditAdvertisment/CategorySelect';
import BuildingMaterial from './BuildingMaterial';
import Clothes from './Clothes';
import Electronics from './Electronics';
import HouseGoods from './HouseGoods';
import TransportGoods from './TransportGoods';
import HomeAppliance from './HomeAppliance';
import Service from './Service';
import HealthBeauty from './HealthBeauty';
import Sport from './Sport';
import HobbyRelax from './HobbyRelax';
import ChildGoods from './ChildGoods';
import Estate from './Estate';
import Transport from './Transport';

import SelectBrandsForMobile from "../../components/select-brands/SelectBrandsForMobile";
import SelectTypesForComputersAccs from "../../components/select-types/select-types-electronics/SelectTypesForComputersAccs";
import SelectBrandsForComputersAccs from "../../components/select-brands/SelectBrandsForComputersAccs";
import SelectBrandsForComputers from "../../components/select-brands/SelectBrandsForComputers";
import SelectTypeForComputer from "../../components/select-types/select-types-electronics/SelectTypesForComputers";
import SelectBrandsForGameCondole from "../../components/select-brands/SelectBrandsForGameConsole";
import SelectTypesForClothes from "../../components/select-types/select-types-clothes/SelectTypesForClothes";

export default function EditItem() {
    const { t } = useTranslation();
    const history = useHistory();
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [photoUrls, setSelectedFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [condition, setCondition] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [screen_size, setScreenSize] = useState('');
    const [memory, setMemory] = useState('');

    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [owner, setOwner] = useState('');
    const [roomsAmout, setRoomsAmount] = useState('');

    const [size, setSize] = useState('');

    const [mileage, setMileage] = useState('');
    const [drive, setDrive] = useState(''); // привод
    const [transmission, setTransmission] = useState(''); // трансмиссия
    const [wheel, setWheel] = useState(''); // руль
    const [year, setYear] = useState(''); // год выпуска
    const [body, setBody] = useState(''); // кузов
    const [color, setColor] = useState('');
    const [owners, setOwners] = useState(''); // кол-во владельцев

    const handleSubmit = async (e) => {

        e.preventDefault();

        const docRef = doc(db, "advertisment", id);

        const updatedData = {
            title: title,
            price: price,
            phone: phoneNumber,
            description: description,
            photoUrls: photoUrls,
            category: category,
            subcategory: subcategory,
            condition: condition,
            brand: brand,
            model: model,
            screen_size: screen_size,
            memory: memory,
            owner: owner,
            owners: owners,
            year: year,
            body: body,
            color: color,
            wheel: wheel,
            transmission: transmission,
            drive: drive,
            mileage: mileage,
            size: size,
            roomsAmout: roomsAmout,
            type: type,
            area: area,
        };

        try {
            // Если категория является услугой, удалите поле condition !TODO
            if (subcategory === 'education' || subcategory === 'handyman' ||
                subcategory === 'beauty_and_health' || subcategory === 'transportation' ||
                subcategory === 'repair_and_construction' || subcategory === 'computer_services' ||
                subcategory === 'business_services' || subcategory === 'cleaning' ||
                subcategory === 'automotive_services' || subcategory === 'appliance_repair' ||
                subcategory === 'event_planning' || subcategory === 'photography_and_videography' ||
                subcategory === 'custom_manufacturing' || subcategory === 'pet_care' ||
                subcategory === 'car_seats' || subcategory === 'health_and_care' ||
                subcategory === 'toys_and_games' || subcategory === 'strollers' ||
                subcategory === 'feeding_and_nutrition' || subcategory === 'bathing' ||
                subcategory === 'nursery' || subcategory === 'diapers_and_potties' ||
                subcategory === 'baby_monitors' || subcategory === 'maternity_products' ||
                subcategory === 'schoold_supplies' || subcategory === 'makeup' ||
                subcategory === 'manicure_and_pedicure' || subcategory === 'healthcare_products' ||
                subcategory === 'perfume' || subcategory === 'skincare' ||
                subcategory === 'haircare' || subcategory === 'tattoos_and_tatooing' ||
                subcategory === 'tanning_and_sunbeds' || subcategory === 'personal_hygiene_products') {
                await updateDoc(docRef, {
                    ...updatedData,
                    condition: deleteField(),
                    brand: deleteField(),
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'furniture' || subcategory === 'lighting' ||
                subcategory === 'dishes' || subcategory === 'garden_equipment' ||
                subcategory === 'domestic_cleaning' || subcategory === 'kitchen_equipment' ||
                subcategory === 'other_cat' || subcategory === 'tools' ||
                subcategory === 'building_materials' || subcategory === 'heating_and_ventilation' ||
                subcategory === 'plumbing' || subcategory === 'electrics' ||
                subcategory === 'windows' || subcategory === 'doors' ||
                subcategory === 'spares' || subcategory === 'tires_and_wheels' ||
                subcategory === 'accessories_and_tools' || subcategory === 'sports_protections' ||
                subcategory === 'bicycles' || subcategory === 'scooters' ||
                subcategory === 'skateboards' || subcategory === 'hoverboards_and_electric_scooters' ||
                subcategory === 'ball_games' || subcategory === 'hunting_and_fishing' ||
                subcategory === 'tourism_and_outdoor_recreation' || subcategory === 'billiards_and_bowling' ||
                subcategory === 'tennis_and_badminton' || subcategory === 'exercise_equipment_and_fitness' ||
                subcategory === 'sports_nutrition' || subcategory === 'water_sports' ||
                subcategory === 'sapboards' || subcategory === 'table_games' ||
                subcategory === 'computer_games' || subcategory === 'books_n_magazines' ||
                subcategory === 'tickets' || subcategory === 'collections' ||
                subcategory === 'art_materials' || subcategory === 'music' ||
                subcategory === 'music_tools') {
                await updateDoc(docRef, {
                    ...updatedData,
                    brand: deleteField(),
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'phones_and_tablets') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                });
            }
            if (subcategory === 'tv') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'game_console' || subcategory === 'photo_video') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'computers') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'computer_accessories') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'auto' || subcategory === 'moto' || subcategory === 'water_transport') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'sale_estate' || subcategory === 'rent_estate') {
                await updateDoc(docRef, {
                    ...updatedData,
                    condition: deleteField(),
                    brand: deleteField(),
                    size: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'mens_clothing' || subcategory === 'womens_clothing' || subcategory === 'childrens_clothing') {
                await updateDoc(docRef, {
                    ...updatedData,
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }
            if (subcategory === 'refrigerators' || subcategory === 'washing_machines' || subcategory === 'vacuum_cleaners' ||
                subcategory === 'stoves_and_ovens' || subcategory === 'sewing_equipment' || subcategory === 'food_preparation' ||
                subcategory === 'dishwasher') {
                await updateDoc(docRef, {
                    ...updatedData,
                    size: deleteField(),
                    type: deleteField(),
                    owner: deleteField(),
                    area: deleteField(),
                    rooms_amount: deleteField(),
                    model: deleteField(),
                    mileage: deleteField(),
                    year: deleteField(),
                    body: deleteField(),
                    color: deleteField(),
                    transmission: deleteField(),
                    drive: deleteField(),
                    wheel: deleteField(),
                    owners: deleteField(),
                    customs: deleteField(),
                    screen_size: deleteField(),
                    memory: deleteField(),
                });
            }

            else {
                await updateDoc(docRef, updatedData);
            }

            console.log("Document successfully updated!");
            history.push('/profile');
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "advertisment", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setData(data);
                    setCategory(data.category);
                    setSubcategory(data.subcategory);
                    setSelectedFiles(data.photoUrls);
                    setTitle(data.title);
                    setPrice(data.price);
                    setDescription(data.description);
                    setPhoneNumber(data.phone);
                    setCondition(data.condition);
                    console.log("Document data:", data);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleSubcategoryChange = (e) => {
        setSubcategory(e.target.value);
    }

    const getSubcategories = () => {
        switch (category) {
            case 'building_materials_and_tools':
                return (<BuildingMaterial t={t} />);
            case 'clothes':
                return (<Clothes t={t} />);
            case 'electronics':
                return (<Electronics t={t} />);
            case 'house_goods':
                return (<HouseGoods t={t} />);
            case 'transport_goods':
                return (<TransportGoods t={t} />);
            case 'home_appliance':
                return (<HomeAppliance t={t} />);
            case 'service':
                return (<Service t={t} />);
            case 'health_and_beauty':
                return (<HealthBeauty t={t} />);
            case 'sport':
                return (<Sport t={t} />);
            case 'hobby_n_Relax':
                return (<HobbyRelax t={t} />);
            case 'child_goods':
                return (<ChildGoods t={t} />);
            case 'estate':
                return (<Estate t={t} />);
            case 'transport':
                return (<Transport t={t} />);
            default:
                return <option>{t('choce_subcategory')}</option>;
        }
    }

    const getForm = () => {
        switch (subcategory) {
            case 'computer_services':
            case 'education':
            case 'handyman':
            case 'beauty_and_health':
            case 'transportation':
            case 'repair_and_construction':
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


                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>

                    </>
                )

            case 'furniture':
            case 'lighting':
            case 'dishes':
            case 'garden_equipment':
            case 'domestic_cleaning':
            case 'kitchen_equipment':
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
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('condition')}</Form.Label>
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">Новое</option>
                                <option value="bu_cond">Б/У</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )
            case 'phones_and_tablets':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <SelectBrandsForMobile brand={brand} setBrand={setBrand} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('model')}</Form.Label>
                            <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("size_screen")}</Form.Label>
                            <Form.Control type="number" placeholder="6.7" value={screen_size} onChange={(e) => setScreenSize(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('memory')}</Form.Label>
                            <Form.Control type="number" value={memory} onChange={(e) => setMemory(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">{t('new_cond')}</option>
                                <option value="bu_cond">{t('bu_cond')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )

            case 'refrigerators':
            case 'washing_machines':
            case 'vacuum_cleaners':
            case 'stoves_and_ovens':
            case 'sewing_equipment':
            case 'food_preparation':
            case 'dishwasher':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('brand')}</Form.Label>
                            <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('condition')}</Form.Label>
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">Новое</option>
                                <option value="bu_cond">Б/У</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )

            case 'sale_estate':
            case 'rent_estate':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)}>
                                <option>{t('type')}</option>
                                <option value="house">{t('house')}</option>
                                <option value="garage">{t('garage')}</option>
                                <option value="aparment">{t('aparment')}</option>
                                <option value="commercial_real_estate">{t('commercial_real_estate')}</option>
                                <option value="room">{t('room')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('rooms_amount')}</Form.Label>
                            <Form.Control type="number" value={roomsAmout} onChange={(e) => setRoomsAmount(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('area')}</Form.Label>
                            <Form.Control type="number" value={area} onChange={(e) => setArea(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={owner} onChange={(e) => setOwner(e.target.value)}>
                                <option>{t('owner_rent')}</option>
                                <option value="owner">{t('owner')}</option>
                                <option value="realtor">{t('realtor')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )
            case 'computer_accessories':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <SelectBrandsForComputersAccs brand={brand} setBrand={setBrand} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('model')}</Form.Label>
                            <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <SelectTypesForComputersAccs type={type} setType={setType} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">{t('new_cond')}</option>
                                <option value="bu_cond">{t('bu_cond')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )
            case 'computers':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <SelectBrandsForComputers brand={brand} setBrand={setBrand} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('model')}</Form.Label>
                            <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <SelectTypeForComputer type={type} setType={setType} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">{t('new_cond')}</option>
                                <option value="bu_cond">{t('bu_cond')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )
            case 'game_console':
            case 'photo_video':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <SelectBrandsForGameCondole brand={brand} setBrand={setBrand} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('model')}</Form.Label>
                            <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">{t('new_cond')}</option>
                                <option value="bu_cond">{t('bu_cond')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )
            case 'tv':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option>{t('brand')}</option>
                                <option value="Samsung">Samsung</option>
                                <option value="Apple">Apple</option>
                                <option value="Xiaomi">Xiaomi</option>
                                <option value="Huawei">Huawei</option>
                                <option value="Honor">Honor</option>
                                <option value="HTC">HTC</option>
                                <option value="Oppo">Oppo</option>
                                <option value="Realme">Realme</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('model')}</Form.Label>
                            <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t("size_screen")}</Form.Label>
                            <Form.Control type="number" placeholder="6.7" value={screen_size} onChange={(e) => setScreenSize(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('new_cond')}</option>
                                <option value="new_cond">{t('condition')}</option>
                                <option value="bu_cond">{t('bu_cond')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)}>
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )
            case 'mens_clothing':
            case 'womens_clothing':
            case 'childrens_clothing':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('type')}</Form.Label>
                            <SelectTypesForClothes type={type} setType={setType} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('size')}</Form.Label>
                            <Form.Select aria-label="Default select example" value={size} onChange={(e) => setSize(e.target.value)}>
                                <option>{t('size')}</option>
                                <option value="XXS">XXS</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                                <option value="4XL">4XL</option>
                                <option value="5XL">5XL</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('brand')}</Form.Label>
                            <Form.Control type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('condition')}</Form.Label>
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">Новое</option>
                                <option value="bu_cond">Б/У</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )
            case 'auto':
            case 'moto':
            case 'water_transport':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option>{t('choice_mark')}</option>
                                <option value="Audi">Audi</option>
                                <option value="BMW">BMW</option>
                                <option value="Mersedes">Mersedes</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('input_model')}</Form.Label>
                            <Form.Control type="text" value={model} onChange={(e) => setModel(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('input_year')}</Form.Label>
                            <Form.Control type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2020" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('input_meleage')}</Form.Label>
                            <Form.Control type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={body} onChange={(e) => setBody(e.target.value)}>
                                <option>{t('choice_body')}</option>
                                <option value="sedan">{t('sedan')}</option>
                                <option value="hatchback">{t('hatchback')}</option>
                                <option value="station_wagon">{t('station_wagon')}</option>
                                <option value="coupe">{t('coupe')}</option>
                                <option value="convertible">{t('convertible')}</option>
                                <option value="crossover">{t('crossover')}</option>
                                <option value="Внедорsuv_sport_utility_vehicleожник">{t('Внедорsuv_sport_utility_vehicleожник')}</option>
                                <option value="pickup_truck">{t('pickup_truck')}</option>
                                <option value="minivan">{t('minivan')}</option>
                                <option value="Limousine">{t('Limousine')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('enter_color')}</Form.Label>
                            <Form.Control type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                                <option>{t('choce_transmission')}</option>
                                <option value="manual_t">{t('manual_t')}</option>
                                <option value="auto_t">{t('auto_t')}</option>
                                <option value="semi_auto_t">{t('semi_auto_t')}</option>
                                <option value="dual_clutch_t">{t('dual_clutch_t')}</option>
                                <option value="continuously_t">{t('continuously_t')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={drive} onChange={(e) => setDrive(e.target.value)}>
                                <option>{t('choice_drive')}</option>
                                <option value="fwd">{t('fwd')}</option>
                                <option value="rwd">{t('rwd')}</option>
                                <option value="awd">{t('awd')}</option>
                                <option value="four_wd">{t('four_wd')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={wheel} onChange={(e) => setWheel(e.target.value)}>
                                <option>{t('choice_wheel')}</option>
                                <option value="left_hand_drive">{t('left_hand_drive')}</option>
                                <option value="right_hand_drive">{t('right_hand_drive')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('choice_condition')}</option>
                                <option value="condition_new">{t('condition_new')}</option>
                                <option value="used">{t('used')}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('choice_customs')}</Form.Label>
                            <Form.Control type="number" value={owners} onChange={(e) => setOwners(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )

            case 'rest':
                return (
                    <>
                        <FormGroup className="mb-3">
                            <Form.Label>{t('title')}</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormGroup>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('price')}</Form.Label>
                            <Form.Control type="text" value={price} onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('condition')}</Form.Label>
                            <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>{t('condition')}</option>
                                <option value="new_cond">Новое</option>
                                <option value="bu_cond">Б/У</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('phone_number')}</Form.Label>
                            <Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{t('description')}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button onClick={handleSubmit} variant="primary" size="lg">
                                {t('add')}
                            </Button>
                        </div>
                    </>
                )

            default:
                return null;
        }
    }

    return (
        <>
            <MyNavbar />

            <NavbarForMobileRouting />
            <Container className="mt-3">
                <h3>{t('edit_advertisement')}</h3>
                <CategorySelect handleCategoryChange={handleCategoryChange} category={category} t={t} />

                <Form.Select className="mb-3" aria-label="Default select example" onChange={handleSubcategoryChange} value={subcategory}>
                    {getSubcategories()}
                </Form.Select>
                {getForm()}
            </Container>
        </>
    )
}
