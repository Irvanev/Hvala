import { serverTimestamp } from "firebase/firestore";

export const buildFormData = ({
  userId,
  selectedCategory,
  selectedSubcategory,
  phoneNumber,
  title,
  price,
  currency,
  description,
  region,
  location,
  country,
  coordinates,
  fileUrls,
  brand,
  model,
  screen_size,
  memory,
  condition,
  type,
  mileage,
  year,
  body,
  color,
  transmission,
  drive,
  wheel,
  owners,
  roomsAmout,
  area,
  owner,
  size,
  seasonality,
  shoe_type,
  size_eu,
  size_us,
  employment_type,
  work_sphere,
  experience_required,
  experience_years,
  company_name,
  full_name,
  citizenship,
  age,
}) => {
  let formData;

  switch (selectedCategory) {
    case "rest":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    default:
      break;
  }

  switch (selectedSubcategory) {
    case "phones_and_tablets":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        brand,
        model,
        screen_size,
        memory,
        condition,
        description,
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        availability: "available",
        photoUrls: fileUrls,
        time_creation: serverTimestamp(),
        in_archive: false,
        web: true,
      };
      break;

    case "tv":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        brand,
        model,
        screen_size,
        condition,
        description,
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        availability: "available",
        photoUrls: fileUrls,
        time_creation: serverTimestamp(),
        in_archive: false,
        web: true,
      };
      break;

    case "game_console":
    case "photo_video":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        brand,
        model,
        condition,
        description,
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        availability: "available",
        photoUrls: fileUrls,
        time_creation: serverTimestamp(),
        in_archive: false,
        web: true,
      };
      break;

    case "computers":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        type: type,
        title,
        price,
        currency,
        brand,
        model,
        condition,
        description,
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        availability: "available",
        photoUrls: fileUrls,
        time_creation: serverTimestamp(),
        in_archive: false,
        web: true,
      };
      break;

    case "computer_accessories":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        type: type,
        title,
        price,
        currency,
        brand,
        condition,
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    case "auto":
    case "moto":
    case "water_transport":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
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
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        availability: "available",
        photoUrls: fileUrls,
        time_creation: serverTimestamp(),
        in_archive: false,
        web: true,
      };
      break;

    case "sale_estate":
    case "rent_estate":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        type,
        rooms_amount: roomsAmout,
        area,
        owner,
        description,
        kitchen_area: "",
        to_center: "",
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    case "mens_clothing":
    case "womens_clothing":
    case "childrens_clothing":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        type: type,
        title,
        price,
        currency,
        size,
        brand,
        condition,
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    case "mens_shoes":
    case "womens_shoes":
    case "childrens_shoes":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        seasonality: seasonality ?? "",
        shoe_type: shoe_type ?? "",
        size_eu: size_eu ?? "",
        size_us: size_us ?? "",
        brand,
        condition,
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    case "vacancies":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        employment_type: employment_type ?? "",
        work_sphere: work_sphere ?? "",
        experience_required: experience_required ?? "",
        company_name: company_name ?? "",
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;
    case "resumes":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        employment_type: employment_type ?? "",
        work_sphere: work_sphere ?? "",
        experience_years: experience_years ?? "",
        full_name: full_name ?? "",
        citizenship: citizenship ?? "",
        age: age ?? "",
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    case "refrigerators":
    case "washing_machines":
    case "vacuum_cleaners":
    case "stoves_and_ovens":
    case "sewing_equipment":
    case "food_preparation":
    case "dishwasher":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        brand,
        condition,
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    case "furniture":
    case "lighting":
    case "dishes":
    case "garden_equipment":
    case "domestic_cleaning":
    case "kitchen_equipment":
    case "other_cat":
    case "tools":
    case "building_materials":
    case "heating_and_ventilation":
    case "plumbing":
    case "electrics":
    case "windows":
    case "doors":
    case "spares":
    case "tires_and_wheels":
    case "accessories_and_tools":
    case "sports_protections":
    case "bicycles":
    case "scooters":
    case "skateboards":
    case "hoverboards_and_electric_scooters":
    case "ball_games":
    case "hunting_and_fishing":
    case "tourism_and_outdoor_recreation":
    case "billiards_and_bowling":
    case "tennis_and_badminton":
    case "exercise_equipment_and_fitness":
    case "sports_nutrition":
    case "water_sports":
    case "sapboards":
    case "table_games":
    case "computer_games":
    case "books_n_magazines":
    case "tickets":
    case "collections":
    case "art_materials":
    case "music":
    case "music_tools":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        condition,
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    case "education":
    case "handyman":
    case "beauty_and_health":
    case "transportation":
    case "repair_and_construction":
    case "computer_services":
    case "business_services":
    case "cleaning":
    case "automotive_services":
    case "appliance_repair":
    case "event_planning":
    case "photography_and_vide":
    case "custom_manufacturing":
    case "pet_care":
    case "car_seats":
    case "health_and_care":
    case "toys_and_games":
    case "strollers":
    case "feeding_and_nutrition":
    case "bathing":
    case "nursery":
    case "diapers_and_potties":
    case "baby_monitors":
    case "maternity_products":
    case "schoold_supplies":
    case "makeup":
    case "manicure_and_pedicure":
    case "healthcare_products":
    case "perfume":
    case "skincare":
    case "haircare":
    case "tattoos_and_tatooing":
    case "tanning_and_sunbeds":
    case "personal_hygiene_products":
      formData = {
        from_uid: userId,
        name: "",
        category: selectedCategory,
        subcategory: selectedSubcategory,
        phone: phoneNumber,
        title,
        price,
        currency,
        description,
        availability: "available",
        region: region ?? "municipality_budva",
        location: location,
        country: country ?? "montenegro",
        coordinates: coordinates,
        time_creation: serverTimestamp(),
        photoUrls: fileUrls,
        in_archive: false,
        web: true,
      };
      break;

    default:
      break;
  }

  // Нормализация заголовка для поиска по префиксу (title_normalized)
  if (formData) {
    const rawTitle = (formData.title ?? "").toString();
    formData.title_normalized = rawTitle.toLowerCase().trim();
  }

  return formData;
};
