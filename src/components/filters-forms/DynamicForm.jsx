import React from 'react';
import FormClothes from './FormClothes';
import FormSmartphonesAndTablets from './FormSmartphonesAndTablets';
import FormTv from './FormTv';
import FormComputers from './FormComputers';
import FormComputersAccs from './FormComputersAccs';
import FormVideoGames from './FormVideoGames';
import FormTransport from './FormTransport';
import FormEstate from './FormEstate';
import FormDefault from './FormDefault';

const DynamicForm = ({
    subcategory,
    condition, setCondition,
    type, setType,
    size, setSize,
    brand, setBrand,
    memory, setMemory,
    screen_size, setScreenSize,
    body, setBody,
    wheel, setWheel,
    drive, setDrive,
    transmission, setTransmission,
    year, setYear,
    mileage, setMileage,
    rooms_amount, setRoomsAmount,
    area, setArea,
    owner, setOwner
}) => {
    switch (subcategory) {
        case 'mens_clothing':
        case 'womens_clothing':
        case 'childrens_clothing':
            return <FormClothes
                condition={condition} setCondition={setCondition}
                type={type} setType={setType}
                size={size} setSize={setSize}
            />;
        case 'phones_and_tablets':
            return <FormSmartphonesAndTablets
                condition={condition} setCondition={setCondition}
                brand={brand} setBrand={setBrand}
                memory={memory} setMemory={setMemory}
                screen_size={screen_size} setScreenSize={setScreenSize}
            />;
        case 'tv':
            return <FormTv
                condition={condition} setCondition={setCondition}
                brand={brand} setBrand={setBrand}
                screen_size={screen_size} setScreenSize={setScreenSize}
            />;
        case 'computers':
            return <FormComputers
                condition={condition} setCondition={setCondition}
                brand={brand} setBrand={setBrand}
                type={type} setType={setType}
            />;
        case 'computer_accessories':
            return <FormComputersAccs
                condition={condition} setCondition={setCondition}
                brand={brand} setBrand={setBrand}
                type={type} setType={setType}
            />
        case 'game_console':
        case 'photo_video':
            return <FormVideoGames
                condition={condition} setCondition={setCondition}
                brand={brand} setBrand={setBrand}
            />
        case 'auto':
        case 'moto':
        case 'water_transport':
            return <FormTransport
                condition={condition} setCondition={setCondition}
                brand={brand} setBrand={setBrand}
                body={body} setBody={setBody}
                wheel={wheel} setWheel={setWheel}
                drive={drive} setDrive={setDrive}
                transmission={transmission} setTransmission={setTransmission}
                year={year} setYear={setYear}
                mileage={mileage} setMileage={setMileage}
            />;
        case 'sale_estate':
        case 'rent_estate':
            return <FormEstate
                type={type} setType={setType}
                rooms_amount={rooms_amount} setRoomsAmount={setRoomsAmount}
                area={area} setArea={setArea}
                owner={owner} setOwner={setOwner}
            />
        case 'refrigerators':
        case 'washing_machines':
        case 'vacuum_cleaners':
        case 'stoves_and_ovens':
        case 'sewing_equipment':
        case 'food_preparation':
        case 'dishwasher':
            return <FormDefault
                condition={condition} setCondition={setCondition}
            />
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
            return <FormDefault
                condition={condition} setCondition={setCondition}
            />
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

export default DynamicForm;