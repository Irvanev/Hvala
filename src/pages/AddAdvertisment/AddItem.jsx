import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { db, auth, storage } from "../../config/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from 'react';
import { MyNavbar } from "../../components/Navbar/Navbar";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import NavbarForMobileRouting from "../../components/Navbar/NavbarForMobileRouting"
import ClothesForm from "../../components/formsForAddingAdvertisements/ClothesForm";
import PhoneAndTabletsForm from "../../components/formsForAddingAdvertisements/electronics-forms/PhoneAndTabletsForm";
import TarnsportForm from "../../components/formsForAddingAdvertisements/TransportForm";
import SelectCategory from "../../components/select-category-form/SelectCategory";
import SelectSubCategoryEstate from "../../components/select-category-form/SelectSubCategoryEstate";
import SelectSubCategoryTransport from "../../components/select-category-form/SelectSubCategoryTransport";
import SelectSubCategoryClothes from "../../components/select-category-form/SelectSubCategoryClothes";
import SelectSubCategoryElectronics from "../../components/select-category-form/SelectSubCategoryElectronics";
import SelectSubCategoryHouseGoods from "../../components/select-category-form/SelectSubCategoryHouseGoods";
import SelectSubCategoryBuilding from "../../components/select-category-form/SelectSubCategoryBulding";
import SelectSubCategoryTransportGoods from "../../components/select-category-form/SelectSubCategoryTransportGoods";
import SelectSubCategoryHomeAppliance from "../../components/select-category-form/SelectSubCategoryHomeAppliance";
import SelectSubCategoryService from "../../components/select-category-form/SelectSubCategoryService";
import SelectSubCategoryChildGoods from "../../components/select-category-form/SelectSubCategoryChildGoods";
import SelectSubCategoryHealth from "../../components/select-category-form/SelectSubCategoryHealth";
import SelectSubCategorySport from "../../components/select-category-form/SelectSubCategorySport";
import SelectSubCategoryHobby from "../../components/select-category-form/SelectSubCategoryHobby";
import EstateForm from "../../components/formsForAddingAdvertisements/EstateForm";
import TvForm from "../../components/formsForAddingAdvertisements/electronics-forms/TvForm";
import GameConsoleForm from "../../components/formsForAddingAdvertisements/electronics-forms/GameConsoleForm";
import ComputerForm from "../../components/formsForAddingAdvertisements/electronics-forms/ComputerForm";
import ComputersAccsForm from "../../components/formsForAddingAdvertisements/electronics-forms/ComputersAccsForm";
import DefaultForm from "../../components/formsForAddingAdvertisements/DefaultForm"
import DefaultFormWithoutCondition from "../../components/formsForAddingAdvertisements/DefaultFormWithoutCondition";
import HomeApplianceForm from "../../components/formsForAddingAdvertisements/HomeApplianceForm";

export const AddItem = () => {
    const { t } = useTranslation();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
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
    const [type, setType] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Для автомобилей
    const [mileage, setMileage] = useState('');
    const [drive, setDrive] = useState(''); // привод
    const [transmission, setTransmission] = useState(''); // трансмиссия
    const [wheel, setWheel] = useState(''); // руль
    const [year, setYear] = useState(''); // год выпуска
    const [body, setBody] = useState(''); // кузов
    const [color, setColor] = useState('');
    const [owners, setOwners] = useState(''); // кол-во владельцев

    // Для одежды
    const [size, setSize] = useState('');


    // Для телеофонов и планшетов, телевизоры
    const [screen_size, setScreenSize] = useState('');
    const [memory, setMemory] = useState('');


    // Для недвежимости
    const [roomsAmout, setRoomsAmout] = useState('');
    const [area, setArea] = useState('');
    const [owner, setOwner] = useState('');



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
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    brand,
                    model,
                    screen_size,
                    memory,
                    condition,
                    description,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available",
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                };
                break;

            case 'tv':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    brand,
                    model,
                    screen_size,
                    condition,
                    description,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available",
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                }
                break;

            case 'game_console' || 'photo_video':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    brand,
                    model,
                    condition,
                    description,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available",
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                };
                break;

            case 'computers':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    type: type,
                    title,
                    price,
                    brand,
                    model,
                    condition,
                    description,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available",
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                };
                break;

            case 'computer_accessories':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    type: type,
                    title,
                    price,
                    brand,
                    condition,
                    description,
                    availability: "available",
                    region: "",
                    location: "",
                    country: "",
                    time_creation: serverTimestamp(),
                    photoUrls: fileUrls,
                }
                break;

            case 'auto' || 'moto' || 'water_transport':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    brand,
                    model,
                    condition,
                    mileage,
                    year,
                    body,
                    color,
                    transmission,
                    drive,
                    wheel,
                    owners,
                    customs: "",
                    description,
                    region: "",
                    location: "",
                    country: "",
                    availability: "available", // !TODO
                    photoUrls: fileUrls,
                    time_creation: serverTimestamp(),
                };
                break;

            case 'sale_estate' || 'rent_estate':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    type,
                    rooms_amount: roomsAmout,
                    area,
                    owner,
                    description,
                    kitchen_area: "",
                    to_center: "",
                    availability: "available",
                    region: "",
                    location: "",
                    country: "",
                    time_creation: serverTimestamp(),
                    photoUrls: fileUrls,
                };
                break;

            case 'mens_clothing' || 'womens_clothing' || 'childrens_clothing':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    type: type,
                    title,
                    price,
                    size,
                    brand,
                    condition,
                    description,
                    availability: "available",
                    region: "",
                    location: "",
                    country: "",
                    time_creation: serverTimestamp(),
                    photoUrls: fileUrls,
                }
                break;

            case 'refrigerators' || 'washing_machines' || 'vacuum_cleaners' || 'stoves_and_ovens' ||
                'sewing_equipment' || 'food_preparation' || 'dishwasher':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    brand,
                    condition,
                    description,
                    availability: "available",
                    region: "",
                    location: "",
                    country: "",
                    time_creation: serverTimestamp(),
                    photoUrls: fileUrls,
                }
                break;


            case 'furniture' || 'lighting' || 'dishes' || 'garden_equipment' ||
                'domestic_cleaning' || 'kitchen_equipment' || 'other_cat' || 'tools' ||
                'building_materials' || 'heating_and_ventilation' || 'plumbing' ||
                'electrics' || 'windows' || 'doors' || 'spares' || 'tires_and_wheels' ||
                'accessories_and_tools' || 'sports_protections' || 'bicycles' ||
                'scooters' || 'skateboards' || 'hoverboards_and_electric_scooters' ||
                'ball_games' || 'hunting_and_fishing' || 'tourism_and_outdoor_recreation' ||
                'billiards_and_bowling' || 'tennis_and_badminton' || 'exercise_equipment_and_fitness' ||
                'sports_nutrition' || 'water_sports' || 'sapboards' || 'table_games' ||
                'computer_games' || 'books_n_magazines' || 'tickets' || 'collections' ||
                'art_materials' || 'music' || 'music_tools':
                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    condition,
                    description,
                    availability: "available",
                    region: "",
                    location: "",
                    country: "",
                    time_creation: serverTimestamp(),
                    photoUrls: fileUrls,
                }
                break;

            case 'education' || 'handyman' || 'beauty_and_health' || 'transportation' ||
                'repair_and_construction' || 'computer_services' || 'business_services' ||
                'cleaning' || 'automotive_services' || 'appliance_repair' ||
                'event_planning' || 'photography_and_vide' || 'custom_manufacturing' ||
                'pet_care' || 'car_seats' || 'health_and_care' || 'toys_and_games' ||
                'strollers' || 'feeding_and_nutrition' || 'bathing' || 'nursery' ||
                'diapers_and_potties' || 'baby_monitors' || 'maternity_products' ||
                'schoold_supplies' || 'makeup' || 'manicure_and_pedicure' ||
                'healthcare_products' || 'perfume' || 'skincare' || 'haircare' ||
                'tattoos_and_tatooing' || 'tanning_and_sunbeds' || 'personal_hygiene_products':

                formData = {
                    from_uid: userId,
                    name: "",
                    category: selectedCategory,
                    subcategory: selectedSubcategory,
                    phone: phoneNumber,
                    title,
                    price,
                    description,
                    availability: "available",
                    region: "",
                    location: "",
                    country: "",
                    time_creation: serverTimestamp(),
                    photoUrls: fileUrls,
                }
                break;

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
                <h3>{t('create_advertisement')}</h3>
                <Form>

                    <SelectCategory handleCategoryChange={handleCategoryChange} t={t} />

                    {selectedCategory === 'estate' && (
                        <SelectSubCategoryEstate handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'transport' && (
                        <SelectSubCategoryTransport handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'clothes' && (
                        <SelectSubCategoryClothes handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'electronics' && (
                        <SelectSubCategoryElectronics handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'house_goods' && (
                        <SelectSubCategoryHouseGoods handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'building_materials_and_tools' && (
                        <SelectSubCategoryBuilding handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'transport_goods' && (
                        <SelectSubCategoryTransportGoods handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'home_appliance' && (
                        <SelectSubCategoryHomeAppliance handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'service' && (
                        <SelectSubCategoryService handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'child_goods' && (
                        <SelectSubCategoryChildGoods handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'health_and_beauty' && (
                        <SelectSubCategoryHealth handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'sport' && (
                        <SelectSubCategorySport handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'hobby_n_Relax' && (
                        <SelectSubCategoryHobby handleSubcategoryChange={handleSubcategoryChange} t={t} />
                    )}
                    {selectedCategory === 'rest' && (
                        <DefaultForm
                            title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {(selectedSubcategory === 'auto' || selectedSubcategory === 'moto' || selectedSubcategory === 'water_transport') && (
                        <TarnsportForm title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            brand={brand} setBrand={setBrand}
                            year={year} setYear={setYear}
                            model={model} setModel={setModel}
                            mileage={mileage} setMileage={setMileage}
                            body={body} setBody={setBody}
                            color={color} setColor={setColor}
                            drive={drive} setDrive={setDrive}
                            wheel={wheel} setWheel={setWheel}
                            condition={condition} setCondition={setCondition}
                            transmission={transmission} setTransmission={setTransmission}
                            owners={owners} setOwners={setOwners}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {(selectedSubcategory === 'mens_clothing' || selectedSubcategory === 'womens_clothing' || selectedSubcategory === 'childrens_clothing') && (
                        <ClothesForm title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            size={size} setSize={setSize}
                            brand={brand} setBrand={setBrand}
                            type={type} setType={setType}
                            condition={condition} setCondition={setCondition}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
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
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {selectedSubcategory === 'tv' && (
                        <TvForm title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            model={model} setModel={setModel}
                            screen_size={screen_size} setScreenSize={setScreenSize}
                            brand={brand} setBrand={setBrand}
                            condition={condition} setCondition={setCondition}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {(selectedSubcategory === 'game_console' || selectedSubcategory === 'photo_video') && (
                        <GameConsoleForm
                            title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            model={model} setModel={setModel}
                            brand={brand} setBrand={setBrand}
                            condition={condition} setCondition={setCondition}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {(selectedSubcategory === 'computers') && (
                        <ComputerForm
                            title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            model={model} setModel={setModel}
                            brand={brand} setBrand={setBrand}
                            type={type} setType={setType}
                            condition={condition} setCondition={setCondition}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {(selectedSubcategory === 'computer_accessories') && (
                        <ComputersAccsForm
                            title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            model={model} setModel={setModel}
                            brand={brand} setBrand={setBrand}
                            type={type} setType={setType}
                            condition={condition} setCondition={setCondition}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {(selectedSubcategory === 'sale_estate' || selectedSubcategory === 'rent_estate') && (
                        <EstateForm title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            type={type} setType={setType}
                            roomsAmout={roomsAmout} setRoomsAmount={setRoomsAmout}
                            area={area} setArea={setArea}
                            owner={owner} setOwner={setOwner}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            description={description} setDescription={setDescription}
                            handleFileChange={handleFileChange} photoUrls={photoUrls}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {(selectedSubcategory === 'refrigerators' || selectedSubcategory === 'washing_machines' ||
                        selectedSubcategory === 'vacuum_cleaners' || selectedSubcategory === 'stoves_and_ovens' ||
                        selectedSubcategory === 'sewing_equipment' || selectedSubcategory === 'food_preparation' ||
                        selectedSubcategory === 'dishwasher') && (
                            <HomeApplianceForm
                                title={title} setTitle={setTitle}
                                brand={brand} setBrand={setBrand}
                                price={price} setPrice={setPrice}
                                condition={condition} setCondition={setCondition}
                                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                                description={description} setDescription={setDescription}
                                handleFileChange={handleFileChange} photoUrls={photoUrls}
                                handleSubmit={handleSubmit}
                            />
                        )}

                    {(selectedSubcategory === 'furniture' || selectedSubcategory === 'lighting' ||
                        selectedSubcategory === 'dishes' || selectedSubcategory === 'garden_equipment' ||
                        selectedSubcategory === 'domestic_cleaning' || selectedSubcategory === 'kitchen_equipment' ||
                        selectedSubcategory === 'other_cat' || selectedSubcategory === 'tools' ||
                        selectedSubcategory === 'building_materials' || selectedSubcategory === 'heating_and_ventilation' ||
                        selectedSubcategory === 'plumbing' || selectedSubcategory === 'electrics' ||
                        selectedSubcategory === 'windows' || selectedSubcategory === 'doors' ||
                        selectedSubcategory === 'spares' || selectedSubcategory === 'tires_and_wheels' ||
                        selectedSubcategory === 'accessories_and_tools' || selectedSubcategory === 'sports_protections' ||
                        selectedSubcategory === 'bicycles' || selectedSubcategory === 'scooters' ||
                        selectedSubcategory === 'skateboards' || selectedSubcategory === 'hoverboards_and_electric_scooters' ||
                        selectedSubcategory === 'ball_games' || selectedSubcategory === 'hunting_and_fishing' ||
                        selectedSubcategory === 'tourism_and_outdoor_recreation' || selectedSubcategory === 'billiards_and_bowling' ||
                        selectedSubcategory === 'tennis_and_badminton' || selectedSubcategory === 'exercise_equipment_and_fitness' ||
                        selectedSubcategory === 'sports_nutrition' || selectedSubcategory === 'water_sports' ||
                        selectedSubcategory === 'sapboards' || selectedSubcategory === 'table_games' ||
                        selectedSubcategory === 'computer_games' || selectedSubcategory === 'books_n_magazines' ||
                        selectedSubcategory === 'tickets' || selectedSubcategory === 'collections' ||
                        selectedSubcategory === 'art_materials' || selectedSubcategory === 'music' ||
                        selectedSubcategory === 'music_tools') && (
                            <DefaultForm
                                title={title} setTitle={setTitle}
                                price={price} setPrice={setPrice}
                                condition={condition} setCondition={setCondition}
                                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                                description={description} setDescription={setDescription}
                                handleFileChange={handleFileChange} photoUrls={photoUrls}
                                handleSubmit={handleSubmit}
                            />
                        )}

                    {(selectedSubcategory === 'education' || selectedSubcategory === 'handyman' ||
                        selectedSubcategory === 'beauty_and_health' || selectedSubcategory === 'transportation' ||
                        selectedSubcategory === 'repair_and_construction' || selectedSubcategory === 'computer_services' ||
                        selectedSubcategory === 'business_services' || selectedSubcategory === 'cleaning' ||
                        selectedSubcategory === 'automotive_services' || selectedSubcategory === 'appliance_repair' ||
                        selectedSubcategory === 'event_planning' || selectedSubcategory === 'photography_and_videography' ||
                        selectedSubcategory === 'custom_manufacturing' || selectedSubcategory === 'pet_care' ||
                        selectedSubcategory === 'car_seats' || selectedSubcategory === 'health_and_care' ||
                        selectedSubcategory === 'toys_and_games' || selectedSubcategory === 'strollers' ||
                        selectedSubcategory === 'feeding_and_nutrition' || selectedSubcategory === 'bathing' ||
                        selectedSubcategory === 'nursery' || selectedSubcategory === 'diapers_and_potties' ||
                        selectedSubcategory === 'baby_monitors' || selectedSubcategory === 'maternity_products' ||
                        selectedSubcategory === 'schoold_supplies' || selectedSubcategory === 'makeup' ||
                        selectedSubcategory === 'manicure_and_pedicure' || selectedSubcategory === 'healthcare_products' ||
                        selectedSubcategory === 'perfume' || selectedSubcategory === 'skincare' ||
                        selectedSubcategory === 'haircare' || selectedSubcategory === 'tattoos_and_tatooing' ||
                        selectedSubcategory === 'tanning_and_sunbeds' || selectedSubcategory === 'personal_hygiene_products') && (
                            <DefaultFormWithoutCondition
                                title={title} setTitle={setTitle}
                                price={price} setPrice={setPrice}
                                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
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