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
import PhoneAndTabletsForm from "../../components/formsForAddingAdvertisements/PhoneAndTabletsForm";
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
    const [phoneNumber, setPhoneNumber] = useState('');

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
    const [roomsAmout, setRoomsAmout] = useState('');
    const [area, setArea] = useState('');
    const [kithenArea, setKithenArea] = useState('');
    const [owner, setOwner] = useState('');
    const [type, setType] = useState('');


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
                    meleage,
                    year,
                    body,
                    color,
                    transmission,
                    drive,
                    wheel,
                    customs,
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
                    rooms_amout: roomsAmout,
                    area,
                    kithenArea: "",
                    owner,
                    description,
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
                    type: "", //!TODO
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
                        <SelectSubCategoryBuilding handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}
                    {selectedCategory === 'transport_goods' && (
                        <SelectSubCategoryTransportGoods handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}
                    {selectedCategory === 'home_appliance' && (
                        <SelectSubCategoryHomeAppliance handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}
                    {selectedCategory === 'service' && (
                        <SelectSubCategoryService handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}
                    {selectedCategory === 'child_goods' && (
                        <SelectSubCategoryChildGoods handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}
                    {selectedCategory === 'health_and_beauty' && (
                        <SelectSubCategoryHealth handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}
                    {selectedCategory === 'sport' && (
                        <SelectSubCategorySport handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}
                    {selectedCategory === 'hobby_n_Relax' && (
                        <SelectSubCategoryHobby handleSubcategoryChange={handleCategoryChange} t={t} />
                    )}

                    {(selectedSubcategory === 'auto' || selectedSubcategory === 'moto' || selectedSubcategory === 'water_transport') && (
                        <div>
                            <TarnsportForm title={title} setTitle={setTitle}
                                price={price} setPrice={setPrice}
                                brand={brand} setBrand={setBrand}
                                year={year} setYear={setYear}
                                model={model} setModel={setModel}
                                meleage={meleage} setMeleage={setMeleage}
                                body={body} setBody={setBody}
                                color={color} setColor={setColor}
                                drive={drive} setDrive={setDrive}
                                wheel={wheel} setWheel={setWheel}
                                condition={condition} setCondition={setCondition}
                                transmission={transmission} setTransmission={setTransmission}
                                customs={customs} setCustoms={setCustoms}
                                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                                description={description} setDescription={setDescription}
                                handleFileChange={handleFileChange} photoUrls={photoUrls}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    )}

                    {(selectedSubcategory === 'mens_clothing' || selectedSubcategory === 'womens_clothing' || selectedSubcategory === 'childrens_clothing') && (
                        <ClothesForm title={title} setTitle={setTitle}
                            price={price} setPrice={setPrice}
                            size={size} setSize={setSize}
                            brand={brand} setBrand={setBrand}
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

                </Form>
            </Container>

        </div>
    );
}