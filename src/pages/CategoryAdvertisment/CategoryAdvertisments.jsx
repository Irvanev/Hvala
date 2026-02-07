import React, { useEffect, useState } from "react";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { NavBarBack } from "../../components/Navbar/NavBarBack";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  Button,
  Modal,
  Select,
  Input,
  Space,
  Dropdown,
  InputNumber,
} from "antd";
import DefaultCardCategory from "../../components/advertisment-card-category/DefaultCardCategory";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import {
  fetchAdvertismentsByCategory,
  fetchAdvertismentsByFilters,
} from "../../services/AdvertismentsCardCategory";
import { DownOutlined, SmileOutlined, FilterOutlined } from "@ant-design/icons";
import { t } from "i18next";
import Categories from "../../components/category";

import styles from "./Container.module.css";
import CustomCard from "../../components/card/CustomCard";
import { Helmet } from "react-helmet";
import InputSearch from "../../components/input-search/InputSearch";
import CategoriesAds from "../../components/categoryAds";
import { EstateMap } from "../../components/estate-map/EstateMap";
import { getShoeTypesBySubcategory, SHOE_BRANDS } from "../../types/shoeTypes.js";
import { WORK_SPHERES } from "../../types/workTypes.js";

const BODY_CLASS_ESTATE_MAP = "estate-map-page";

export const CategoryAdvertisments = () => {
  const { category } = useParams();
  const [advertisments, setAdvertisments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { Option } = Select;

  // Класс на body нужен, чтобы стили InfoWindow карты применялись (окно рендерится вне .estate-map-container)
  useEffect(() => {
    if (category === "estate") {
      document.body.classList.add(BODY_CLASS_ESTATE_MAP);
      return () => document.body.classList.remove(BODY_CLASS_ESTATE_MAP);
    }
  }, [category]);

  const [subcategory, setSubCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency, setCurrency] = useState("");

  const [screen_size, setScreenSize] = useState("");
  const [memory, setMemory] = useState("");

  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [seasonality, setSeasonality] = useState("");
  const [shoe_type, setShoeType] = useState("");
  const [size_eu, setSizeEu] = useState("");
  const [size_us, setSizeUs] = useState("");
  const [employment_type, setEmploymentType] = useState("");
  const [work_sphere, setWorkSphere] = useState("");
  const [experience_min, setExperienceMin] = useState("");

  const [owner, setOwner] = useState("");
  const [area, setArea] = useState("");
  const [rooms_amount, setRoomsAmount] = useState("");

  const [body, setBody] = useState("");
  const [wheel, setWheel] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [drive, setDrive] = useState("");

  const handleMinPriceChange = (value) => {
    setMinPrice(parseInt(value, 10));
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(parseInt(value, 10));
  };

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  };

  const subcategories = {
    electronics: [
      { value: "computers", label: t("computers") },
      { value: "phones_and_tablets", label: t("phones_and_tablets") },
      { value: "tv", label: t("tv") },
      { value: "computer_accessories", label: t("computer_accessories") },
      { value: "photo_video", label: t("photo_video") },
      { value: "game_console", label: t("game_console") },
    ],
    clothes: [
      { value: "mens_clothing", label: t("mens_clothing") },
      { value: "womens_clothing", label: t("womens_clothing") },
      { value: "childrens_clothing", label: t("childrens_clothing") },
    ],
    shoes: [
      { value: "mens_shoes", label: t("mens_shoes") },
      { value: "womens_shoes", label: t("womens_shoes") },
      { value: "childrens_shoes", label: t("childrens_shoes") },
    ],
    work: [
      { value: "vacancies", label: t("vacancies") },
      { value: "resumes", label: t("resumes") },
    ],
    estate: [
      { value: "sale_estate", label: t("sale_estate") },
      { value: "rent_estate", label: t("rent_estate") },
    ],
    transport: [
      { value: "auto", label: t("auto") },
      { value: "moto", label: t("moto") },
      { value: "water_transport", label: t("water_transport") },
    ],
    house_goods: [
      { value: "furniture", label: t("furniture") },
      { value: "lighting", label: t("lighting") },
      { value: "dishes", label: t("dishes") },
      { value: "garden_equipment", label: t("garden_equipment") },
      { value: "domestic_cleaning", label: t("domestic_cleaning") },
      { value: "kitchen_equipment", label: t("kitchen_equipment") },
      { value: "other_cat", label: t("other_cat") },
    ],
    building_materials_and_tools: [
      { value: "sale_estate", label: t("sale_estate") },
      { value: "rent_estate", label: t("rent_estate") },
      { value: "tools", label: t("tools") },
      { value: "building_materials", label: t("building_materials") },
      { value: "heating_and_ventilation", label: t("heating_and_ventilation") },
      { value: "plumbing", label: t("plumbing") },
      { value: "electrics", label: t("electrics") },
      { value: "windows", label: t("windows") },
      { value: "doors", label: t("doors") },
    ],
    transport_goods: [
      { value: "spares", label: t("spares") },
      { value: "tires_and_wheels", label: t("tires_and_wheels") },
      { value: "accessories_and_tools", label: t("accessories_and_tools") },
    ],
    home_appliance: [
      { value: "refrigerators", label: t("refrigerators") },
      { value: "washing_machines", label: t("washing_machines") },
      { value: "vacuum_cleaners", label: t("vacuum_cleaners") },
      { value: "stoves_and_ovens", label: t("stoves_and_ovens") },
      { value: "sewing_equipment", label: t("sewing_equipment") },
      { value: "food_preparation", label: t("food_preparation") },
      { value: "dishwasher", label: t("dishwasher") },
      { value: "other_cat", label: t("other_cat") },
    ],
    service: [
      { value: "education", label: t("education") },
      { value: "handyman", label: t("handyman") },
      { value: "beauty_and_health", label: t("beauty_and_health") },
      { value: "transportation", label: t("transportation") },
      { value: "repair_and_construction", label: t("repair_and_construction") },
      { value: "computer_services", label: t("computer_services") },
      { value: "business_services", label: t("business_services") },
      { value: "cleaning", label: t("cleaning") },
      { value: "automotive_services", label: t("automotive_services") },
      { value: "appliance_repair", label: t("appliance_repair") },
      { value: "event_planning", label: t("event_planning") },
      {
        value: "photography_and_videography",
        label: t("photography_and_videography"),
      },
      { value: "custom_manufacturing", label: t("custom_manufacturing") },
      { value: "pet_care", label: t("pet_care") },
    ],
    child_goods: [
      { value: "car_seats", label: t("car_seats") },
      { value: "health_and_care", label: t("health_and_care") },
      { value: "toys_and_games", label: t("toys_and_games") },
      { value: "strollers", label: t("strollers") },
      { value: "feeding_and_nutrition", label: t("feeding_and_nutrition") },
      { value: "bathing", label: t("bathing") },
      { value: "nursery", label: t("nursery") },
      { value: "diapers_and_potties", label: t("diapers_and_potties") },
      { value: "baby_monitors", label: t("baby_monitors") },
      { value: "maternity_products", label: t("maternity_products") },
      { value: "schoold_supplies", label: t("schoold_supplies") },
      { value: "other_cat", label: t("other_cat") },
    ],
    health_and_beauty: [
      { value: "makeup", label: t("makeup") },
      { value: "manicure_and_pedicure", label: t("manicure_and_pedicure") },
      { value: "healthcare_products", label: t("healthcare_products") },
      { value: "perfume", label: t("perfume") },
      { value: "skincare", label: t("skincare") },
      { value: "haircare", label: t("haircare") },
      { value: "tattoos_and_tatooing", label: t("tattoos_and_tatooing") },
      { value: "tanning_and_sunbeds", label: t("tanning_and_sunbeds") },
      {
        value: "personal_hygiene_products",
        label: t("personal_hygiene_products"),
      },
      { value: "other_cat", label: t("other_cat") },
    ],
    sport: [
      { value: "sports_protections", label: t("sports_protections") },
      { value: "bicycles", label: t("bicycles") },
      { value: "scooters", label: t("scooters") },
      { value: "skateboards", label: t("skateboards") },
      {
        value: "hoverboards_and_electric_scooters",
        label: t("hoverboards_and_electric_scooters"),
      },
      { value: "ball_games", label: t("ball_games") },
      { value: "hunting_and_fishing", label: t("hunting_and_fishing") },
      {
        value: "tourism_and_outdoor_recreation",
        label: t("tourism_and_outdoor_recreation"),
      },
      { value: "billiards_and_bowling", label: t("billiards_and_bowling") },
      { value: "tennis_and_badminton", label: t("tennis_and_badminton") },
      {
        value: "exercise_equipment_and_fitness",
        label: t("exercise_equipment_and_fitness"),
      },
      { value: "sports_nutrition", label: t("sports_nutrition") },
      { value: "water_sports", label: t("water_sports") },
      { value: "sapboards", label: t("sapboards") },
      { value: "other_cat", label: t("other_cat") },
    ],
    hobby_n_Relax: [
      { value: "table_games", label: t("table_games") },
      { value: "computer_games", label: t("computer_games") },
      { value: "books_n_magazines", label: t("books_n_magazines") },
      { value: "tickets", label: t("tickets") },
      { value: "collections", label: t("collections") },
      { value: "art_materials", label: t("art_materials") },
      { value: "music", label: t("music") },
      { value: "music_tools", label: t("music_tools") },
    ],
  };

  const countryRegions = {
    serbia: [
      { value: "vojvodina", label: t("vojvodina") },
      { value: "belgrade", label: t("belgrade") },
      {
        value: "sumadija_and_western_serbia",
        label: t("sumadija_and_western_serbia"),
      },
      {
        value: "southern_and_eastern_serbia",
        label: t("southern_and_eastern_serbia"),
      },
      { value: "kosovo_and_metohija", label: t("kosovo_and_metohija") },
    ],
    montenegro: [
      { value: "glavni_grad_podgorica", label: t("glavni_grad_podgorica") },
      {
        value: "municipality_danilovgrad",
        label: t("municipality_danilovgrad"),
      },
      { value: "municipality_cetinje", label: t("municipality_cetinje") },
      { value: "municipality_budva", label: t("municipality_budva") },
      { value: "municipality_bar", label: t("municipality_bar") },
      {
        value: "municipality_herceg_novi",
        label: t("municipality_herceg_novi"),
      },
      { value: "municipality_kotor", label: t("municipality_kotor") },
      { value: "municipality_tivat", label: t("municipality_tivat") },
      { value: "municipality_ulcinj", label: t("municipality_ulcinj") },
      { value: "municipality_pljevlja", label: t("municipality_pljevlja") },
      {
        value: "municipality_bijelo_polje",
        label: t("municipality_bijelo_polje"),
      },
      { value: "municipality_zabljak", label: t("municipality_zabljak") },
      { value: "municipality_kolasin", label: t("municipality_kolasin") },
      { value: "municipality_mojkovac", label: t("municipality_mojkovac") },
      { value: "municipality_berane", label: t("municipality_berane") },
      {
        value: "municipality_andrijevica",
        label: t("municipality_andrijevica"),
      },
      { value: "municipality_plav", label: t("municipality_plav") },
      { value: "municipality_rozaje", label: t("municipality_rozaje") },
      { value: "municipality_niksic", label: t("municipality_niksic") },
      { value: "municipality_savnik", label: t("municipality_savnik") },
      { value: "municipality_pluzine", label: t("municipality_pluzine") },
    ],
    croatia: [
      { value: "zagreb_city", label: t("zagreb_city") },
      { value: "zagreb_county", label: t("zagreb_county") },
      { value: "split_dalmatia", label: t("split_dalmatia") },
      { value: "istria", label: t("istria") },
      { value: "primorje_gorski_kotar", label: t("primorje_gorski_kotar") },
      { value: "lika_senj", label: t("lika_senj") },
      { value: "virovitica_podravina", label: t("virovitica_podravina") },
      { value: "pozega_slavonia", label: t("pozega_slavonia") },
      { value: "brod_posavina", label: t("brod_posavina") },
      { value: "zadar", label: t("zadar") },
      { value: "osijek_baranja", label: t("osijek_baranja") },
      { value: "sisak_moslavina", label: t("sisak_moslavina") },
      { value: "koprivnica_krizevci", label: t("koprivnica_krizevci") },
      { value: "bjelovar_bilogora", label: t("bjelovar_bilogora") },
      { value: "karlovac", label: t("karlovac") },
      { value: "varazdin", label: t("varazdin") },
      { value: "krapina_zagorje", label: t("krapina_zagorje") },
      { value: "medimurje", label: t("medimurje") },
      { value: "sibenik_knin", label: t("sibenik_knin") },
      { value: "vukovar_srijem", label: t("vukovar_srijem") },
      { value: "dubrovnik_neretva", label: t("dubrovnik_neretva") },
    ],
    bosnia_and_herzegovina: [
      { value: "una_sana_canton", label: t("Una-Sana Canton") },
      { value: "posavina_canton", label: t("Posavina Canton") },
      { value: "tuzla_canton", label: t("Tuzla Canton") },
      { value: "zenica_doboj_canton", label: t("Zenica-Doboj Canton") },
      {
        value: "bosnian_podrinje_canton_gorazde",
        label: t("Bosnian-Podrinje Canton Goražde"),
      },
      { value: "central_bosnia_canton", label: t("Central Bosnia Canton") },
      {
        value: "herzegovina_neretva_canton",
        label: t("Herzegovina-Neretva Canton"),
      },
      { value: "west_herzegovina_canton", label: t("West Herzegovina Canton") },
      { value: "sarajevo_canton", label: t("Sarajevo Canton") },
      { value: "canton_10", label: t("Canton 10") },
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

  const [searchText, setSearchText] = useState("");

  const options = advertisments
    .map((ad) => ad.title)
    .reduce((unique, title) => {
      return unique.findIndex((obj) => obj.value === title) < 0
        ? [...unique, { value: title }]
        : unique;
    }, []);

  const filteredAdvertisements = advertisments.filter((ad) =>
    ad.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    let unsubscribe;

    unsubscribe = fetchAdvertismentsByCategory(
      category,
      setAdvertisments,
      setIsLoading
    );
    return () => unsubscribe();
  }, [category]);

  const applyFilters = () => {
    console.log("Фильтры:", {
      category,
      subcategory,
      country,
      region,
      condition,
      memory,
      brand,
      transmission,
      body,
      wheel,
      drive,
      year,
      mileage,
    });
    fetchAdvertismentsByFilters(
      category,
      subcategory,
      country,
      region,
      condition,
      size,
      type,
      seasonality,
      shoe_type,
      size_eu,
      size_us,
      employment_type,
      work_sphere,
      experience_min,
      wheel,
      mileage,
      body,
      drive,
      year,
      transmission,
      memory,
      screen_size,
      brand,
      minPrice,
      maxPrice,
      currency,
      setAdvertisments,
      setIsLoading
    );
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setSubCategory("");
    setCondition("");
    setCountry("");
    setRegion("");
    setMemory("");
    setScreenSize("");
    setSeasonality("");
    setShoeType("");
    setSizeEu("");
    setSizeUs("");
    setEmploymentType("");
    setWorkSphere("");
    setExperienceMin("");
    fetchAdvertismentsByCategory(category, setAdvertisments, setIsLoading);
  };

  useEffect(() => {
    resetFilters();
  }, [category]);

  const FormClothes = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
      <label className="mt-3">{t("type")}</label>
      <Select style={{ width: "100%" }} onChange={setType} value={type}>
        <Option value="">{t("choice_type")}</Option>
        <Option value="outwear">{t("outwear")}</Option>
        <Option value="hats">{t("hats")}</Option>
        <Option value="accessories">{t("accessories")}</Option>
        <Option value="homewear">{t("homewear")}</Option>
        <Option value="underwear">{t("underwear")}</Option>
        <Option value="shoes">{t("shoes")}</Option>
        <Option value="jackets_and_suits">{t("jackets_and_suits")}</Option>
        <Option value="shirts">{t("shirts")}</Option>
        <Option value="Steam sweaters_and_hoodies">
          {t("sweaters_and_hoodies")}
        </Option>
        <Option value="Nvidia workwear">{t("workwear")}</Option>
        <Option value="sportswear">{t("sportswear")}</Option>
        <Option value="t_shirts_and_polos">{t("t_shirts_and_polos")}</Option>
        <Option value="pants_and_shorts">{t("pants_and_shorts")}</Option>
        <Option value="rest">{t("rest")}</Option>
      </Select>
      <label className="mt-3">{t("size")}</label>
      <Select style={{ width: "100%" }} onChange={setSize} value={size}>
        <Option value="">{t("choice_size")}</Option>
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
  );

  const FormShoes = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select style={{ width: "100%" }} onChange={setCondition} value={condition}>
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
      <label className="mt-3">{t("seasonality")}</label>
      <Select style={{ width: "100%" }} onChange={setSeasonality} value={seasonality}>
        <Option value="">{t("choice_seasonality")}</Option>
        <Option value="summer">{t("season_summer")}</Option>
        <Option value="winter">{t("season_winter")}</Option>
        <Option value="demi">{t("season_demi")}</Option>
        <Option value="all_season">{t("season_all")}</Option>
      </Select>
      <label className="mt-3">{t("shoe_type")}</label>
      <Select style={{ width: "100%" }} onChange={setShoeType} value={shoe_type}>
        <Option value="">{t("choice_shoe_type")}</Option>
        {getShoeTypesBySubcategory(subcategory).map((opt) => (
          <Option key={opt.value} value={opt.value}>{t(opt.labelKey)}</Option>
        ))}
      </Select>
      <label className="mt-3">{t("size_eu")}</label>
      <Select style={{ width: "100%" }} onChange={setSizeEu} value={size_eu}>
        <Option value="">{t("choice_size")}</Option>
        {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50].map((s) => (
          <Option key={s} value={String(s)}>{s}</Option>
        ))}
      </Select>
      <label className="mt-3">{t("size_us")}</label>
      <Select style={{ width: "100%" }} onChange={setSizeUs} value={size_us} allowClear>
        <Option value="">{t("choice_size")}</Option>
        {["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"].map((s) => (
          <Option key={s} value={s}>{s}</Option>
        ))}
      </Select>
      <label className="mt-3">{t("brand")}</label>
      <Select
        style={{ width: "100%" }}
        value={brand || undefined}
        onChange={setBrand}
        placeholder={t("choice_brand")}
        showSearch
        allowClear
        filterOption={(input, option) =>
          (option?.children ?? '').toString().toLowerCase().includes((input || '').toLowerCase())
        }
      >
        <Option value="">{t("choice_brand")}</Option>
        {SHOE_BRANDS.map((b) => (
          <Option key={b} value={b}>{b}</Option>
        ))}
      </Select>
    </>
  );

  const FormWork = () => (
    <>
      <label className="mt-3">{t("work_sphere")}</label>
      <Select style={{ width: "100%" }} onChange={setWorkSphere} value={work_sphere}>
        <Option value="">{t("choice_work_sphere")}</Option>
        {WORK_SPHERES.map((s) => (
          <Option key={s.value} value={s.value}>{t(s.labelKey)}</Option>
        ))}
      </Select>
      <label className="mt-3">{t("employment_type")}</label>
      <Select style={{ width: "100%" }} onChange={setEmploymentType} value={employment_type}>
        <Option value="">{t("choice_employment_type")}</Option>
        <Option value="full_time">{t("employment_full_time")}</Option>
        <Option value="part_time">{t("employment_part_time")}</Option>
        <Option value="remote">{t("employment_remote")}</Option>
        <Option value="freelance">{t("employment_freelance")}</Option>
        <Option value="internship">{t("employment_internship")}</Option>
        <Option value="seasonal">{t("employment_seasonal")}</Option>
      </Select>
      <label className="mt-3">{t("experience_years")}</label>
      <InputNumber style={{ width: "100%" }} min={0} max={50} value={experience_min} onChange={(v) => setExperienceMin(v != null ? v : "")} placeholder={t("experience_years")} />
      <label className="mt-3">{t("salary")}</label>
      <InputNumber style={{ width: "100%" }} placeholder={t("minPricePlaceholder")} value={minPrice} onChange={handleMinPriceChange} />
      <InputNumber style={{ width: "100%", marginTop: "8px" }} placeholder={t("maxPricePlaceholder")} value={maxPrice} onChange={handleMaxPriceChange} />
    </>
  );

  const FormSmartphonesAndTablets = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
      <label className="mt-3">{t("brand")}</label>
      <Select style={{ width: "100%" }} onChange={setBrand} value={brand}>
        <Option value="">{t("choice_brand")}</Option>
        <Option value="Apple">Apple</Option>
        <Option value="Samsung">Samsung</Option>
      </Select>
      <label className="mt-3">{t("memory")}</label>
      <Select style={{ width: "100%" }} onChange={setMemory} value={memory}>
        <Option value="">{t("choice_memory")}</Option>
        <Option value="32">32Gb</Option>
        <Option value="64">64Gb</Option>
        <Option value="128">128Gb</Option>
        <Option value="256">256Gb</Option>
        <Option value="512">512Gb</Option>
      </Select>
      <label className="mt-3">{t("size_screen")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setScreenSize}
        value={screen_size}
      >
        <Option value="">{t("choice_screen_size")}</Option>
        <Option value="7">5</Option>
        <Option value="7">6</Option>
        <Option value="7">7</Option>
        <Option value="8">8</Option>
      </Select>
    </>
  );
  const FormTransport = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="condition_new">{t("condition_new")}</Option>
        <Option value="used">{t("used")}</Option>
      </Select>
      <label className="mt-3">{t("brand")}</label>
      <Select style={{ width: "100%" }} onChange={setBrand} value={brand}>
        <Option value="">{t("choice_mark")}</Option>
        <Option value="Audi">Audi</Option>
        <Option value="BMW">BMW</Option>
        <Option value="Mercedes-Benz">Mersedes</Option>
        <Option value="Porshe">Porshe</Option>
        <Option value="Volvo">Volvo</Option>
        <Option value="Volkswagen">Volkswagen</Option>
        <Option value="Ford">Ford</Option>
        <Option value="Opel">Opel</Option>
      </Select>
      <label className="mt-3">{t("choice_body")}</label>
      <Select
        showSearch
        style={{
          width: "100%",
        }}
        value={body}
        onChange={(value) => setBody(value)}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="">{t("choice_type_body")}</Option>
        <Option value="sedan">{t("sedan")}</Option>
        <Option value="hatchback">{t("hatchback")}</Option>
        <Option value="station_wagon">{t("station_wagon")}</Option>
        <Option value="coupe">{t("coupe")}</Option>
        <Option value="convertible">{t("convertible")}</Option>
        <Option value="crossover">{t("crossover")}</Option>
        <Option value="suv_sport_utility_vehicle">
          {t("suv_sport_utility_vehicle")}
        </Option>
        <Option value="pickup_truck">{t("pickup_truck")}</Option>
        <Option value="minivan">{t("minivan")}</Option>
        <Option value="Limousine">{t("Limousine")}</Option>
      </Select>
      <label className="mt-3">{t("wheel")}</label>
      <Select
        value={wheel}
        onChange={(value) => setWheel(value)}
        style={{
          width: "100%",
        }}
      >
        <Option value="">{t("choice_wheel")}</Option>
        <Option value="left_hand_drive">{t("left_hand_drive")}</Option>
        <Option value="right_hand_drive">{t("right_hand_drive")}</Option>
      </Select>
      <label className="mt-3">{t("choice_drive")}</label>
      <Select
        value={drive}
        onChange={(value) => setDrive(value)}
        style={{
          width: "100%",
        }}
      >
        <Option value="fwd">{t("fwd")}</Option>
        <Option value="rwd">{t("rwd")}</Option>
        <Option value="awd">{t("awd")}</Option>
        <Option value="four_wd">{t("four_wd")}</Option>
      </Select>
      <label className="mt-3">{t("choce_transmission")}</label>
      <Select
        value={transmission}
        onChange={(value) => setTransmission(value)}
        style={{
          width: "100%",
        }}
      >
        <Option value="manual_t">{t("manual_t")}</Option>
        <Option value="auto_t">{t("auto_t")}</Option>
        <Option value="semi_auto_t">{t("semi_auto_t")}</Option>
        <Option value="dual_clutch_t">{t("dual_clutch_t")}</Option>
        <Option value="continuously_t">{t("continuously_t")}</Option>
      </Select>
      <label className="mt-3">{t("input_year")}</label>
      <Input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <label className="mt-3">{t("input_meleage")}</label>
      <Input
        type="text"
        value={mileage}
        onChange={(e) => setMileage(e.target.value)}
      />
    </>
  );

  const FormTv = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
      <label className="mt-3">{t("brand")}</label>
      <Select style={{ width: "100%" }} onChange={setBrand} value={brand}>
        <Option value="">{t("choice_brand")}</Option>
        <Option value="Apple">Apple</Option>
        <Option value="Samsung">Samsung</Option>
      </Select>
      <label className="mt-3">{t("size_screen")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setScreenSize}
        value={screen_size}
      >
        <Option value="">{t("choice_screen_size")}</Option>
        <Option value="7">7</Option>
        <Option value="8">8</Option>
      </Select>
    </>
  );

  const FormComputers = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
      <label className="mt-3">{t("brand")}</label>
      <Select style={{ width: "100%" }} onChange={setBrand} value={brand}>
        <Option value="">{t("choice_brand")}</Option>
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
      <label className="mt-3">{t("type")}</label>
      <Select style={{ width: "100%" }} onChange={setType} value={type}>
        <Option value="">{t("choice_type")}</Option>
        <Option value="laptop">{t("laptop")}</Option>
        <Option value="stationary_computer">{t("stationary_computer")}</Option>
        <Option value="micro_computer">{t("micro_computer")}</Option>
        <Option value="monoblock">{t("monoblock")}</Option>
      </Select>
    </>
  );
  const FormComputersAccs = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
      <label className="mt-3">{t("brand")}</label>
      <Select style={{ width: "100%" }} onChange={setBrand} value={brand}>
        <Option value="">{t("choice_brand")}</Option>
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
      <label className="mt-3">{t("type")}</label>
      <Select style={{ width: "100%" }} onChange={setType} value={type}>
        <Option value="">{t("choice_type")}</Option>
        <Option>{t("type")}</Option>
        <Option value="mouse">{t("mouse")}</Option>
        <Option value="keyboard">{t("keyboard")}</Option>
        <Option value="headphones">{t("headphones")}</Option>
        <Option value="monitor">{t("monitor")}</Option>
      </Select>
    </>
  );

  const FormVideoGames = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
      <label className="mt-3">{t("brand")}</label>
      <Select style={{ width: "100%" }} onChange={setBrand} value={brand}>
        <Option value="">{t("choice_brand")}</Option>
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
  );

  const FormEstate = () => (
    <>
      <label className="mt-3">{t("type")}</label>
      <Select style={{ width: "100%" }} onChange={setType} value={type}>
        <Option value="">{t("choice_type")}</Option>
        <Option value="house">{t("house")}</Option>
        <Option value="garage">{t("garage")}</Option>
        <Option value="aparment">{t("aparment")}</Option>
        <Option value="commercial_real_estate">
          {t("commercial_real_estate")}
        </Option>
        <Option value="room">{t("room")}</Option>
      </Select>
      <label className="mt-3">{t("rooms_amount")}</label>
      <Input
        type="text"
        value={rooms_amount}
        onChange={(e) => setRoomsAmount(e.target.value)}
      />
      <label className="mt-3">{t("area")}</label>
      <Input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <label className="mt-3">{t("owner_rent")}</label>
      <Select style={{ width: "100%" }} onChange={setOwner} value={owner}>
        <Option value="">{t("input_owner_rent")}</Option>
        <Option value="owner">{t("owner")}</Option>
        <Option value="realtor">{t("realtor")}</Option>
      </Select>
    </>
  );

  const FormHomeAppliance = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
    </>
  );

  const FormDefault = () => (
    <>
      <label className="mt-3">{t("condition")}</label>
      <Select
        style={{ width: "100%" }}
        onChange={setCondition}
        value={condition}
      >
        <Option value="">{t("choice_condition")}</Option>
        <Option value="new_cond">{t("new_cond")}</Option>
        <Option value="bu_cond">{t("bu_cond")}</Option>
      </Select>
    </>
  );

  const renderForm = () => {
    switch (subcategory) {
      case "mens_clothing":
      case "womens_clothing":
      case "childrens_clothing":
        return <FormClothes />;
      case "mens_shoes":
      case "womens_shoes":
      case "childrens_shoes":
        return <FormShoes />;
      case "vacancies":
      case "resumes":
        return <FormWork />;
      case "phones_and_tablets":
        return <FormSmartphonesAndTablets />;
      case "tv":
        return <FormTv />;
      case "computers":
        return <FormComputers />;
      case "computer_accessories":
        return <FormComputersAccs />;
      case "game_console":
      case "photo_video":
        return <FormVideoGames />;
      case "auto":
      case "moto":
      case "water_transport":
        return <FormTransport />;
      case "sale_estate":
      case "rent_estate":
        return <FormEstate />;
      case "refrigerators":
      case "washing_machines":
      case "vacuum_cleaners":
      case "stoves_and_ovens":
      case "sewing_equipment":
      case "food_preparation":
      case "dishwasher":
        return <FormHomeAppliance />;
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
        return <FormDefault />;
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
      case "photography_and_videography":
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
        return null;

      default:
        return null;
    }
  };

  const getDescription = (category) => {
    switch (category) {
      case "estate":
        return "Otkrijte najbolje oglase za nekretnine, uključujući stanove, kuće, zemljišta i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "transport":
        return "Otkrijte najbolje oglase za transport, uključujući automobile, motocikle, bicikle i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "electronics":
        return "Otkrijte najbolje oglase za elektroniku, uključujući telefone, računare, televizore i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "clothes":
        return "Otkrijte najbolje oglase za odeću, uključujući mušku, žensku i dečiju odeću. Pronađite sjajne ponude i popuste na Hvala.";
      case "shoes":
        return "Otkrijte najbolje oglase za obuću, uključujući mušku, žensku i dečiju obuću. Pronađite sjajne ponude i popuste na Hvala.";
      case "work":
        return "Otkrijte najbolje oglase za posao, vakansije i rezime. Pronađite posao ili kandidata na Hvala.";
      case "house_goods":
        return "Otkrijte najbolje oglase za kućne proizvode, uključujući nameštaj, dekoracije i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "building_materials_and_tools":
        return "Otkrijte najbolje oglase za građevinske materijale i alate, uključujući cement, cigle, alatke i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "transport_goods":
        return "Otkrijte najbolje oglase za transport robe, uključujući kamione, prikolice i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "petSupplies":
        return "Otkrijte najbolje oglase za opremu za kućne ljubimce, uključujući hranu, igračke i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "home_appliance":
        return "Otkrijte najbolje oglase za kućne aparate, uključujući frižidere, veš mašine i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "service":
        return "Otkrijte najbolje oglase za usluge, uključujući popravke, čišćenje i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "child_goods":
        return "Otkrijte najbolje oglase za dečiju robu, uključujući igračke, odeću i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "health_and_beauty":
        return "Otkrijte najbolje oglase za zdravlje i lepotu, uključujući kozmetiku, suplemente i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "sport":
        return "Otkrijte najbolje oglase za sport, uključujući opremu, odeću i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "hobby_n_Relax":
        return "Otkrijte najbolje oglase za hobije i opuštanje, uključujući knjige, muziku i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      case "rest":
        return "Otkrijte najbolje oglase za odmor, uključujući putovanja, smeštaj i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
      default:
        return "Otkrijte najbolje oglase za razne kategorije, uključujući nekretnine, transport, odeću, elektroniku i još mnogo toga. Pronađite sjajne ponude i popuste na Hvala.";
    }
  };

  const getUrl = (category) => {
    switch (category) {
      case "estate":
        return "https://hvala.app/advertisments/estate";
      case "transport":
        return "https://hvala.app/advertisments/transport";
      case "electronics":
        return "https://hvala.app/advertisments/electronics";
      case "clothes":
        return "https://hvala.app/advertisments/clothes";
      case "shoes":
        return "https://hvala.app/advertisments/shoes";
      case "work":
        return "https://hvala.app/advertisments/work";
      case "house_goods":
        return "https://hvala.app/advertisments/house_goods";
      case "building_materials_and_tools":
        return "https://hvala.app/advertisments/building_materials_and_tools";
      case "transport_goods":
        return "https://hvala.app/advertisments/transport_goods";
      case "petSupplies":
        return "https://hvala.app/advertisments/petSupplies";
      case "home_appliance":
        return "https://hvala.app/advertisments/home_appliance";
      case "service":
        return "https://hvala.app/advertisments/service";
      case "child_goods":
        return "https://hvala.app/advertisments/child_goods";
      case "health_and_beauty":
        return "https://hvala.app/advertisments/health_and_beauty";
      case "sport":
        return "https://hvala.app/advertisments/sport";
      case "hobby_n_Relax":
        return "https://hvala.app/advertisments/hobby_n_Relax";
      case "rest":
        return "https://hvala.app/advertisments/rest";
      default:
        return "https://hvala.app";
    }
  };

  const getKeywords = (category) => {
    switch (category) {
      case "estate":
        return "oglasi, nekretnine, stanovi, kuće, zemljišta";
      case "transport":
        return "oglasi, transport, automobili, motocikli, bicikle";
      case "electronics":
        return "oglasi, elektronika, telefoni, računari, televizori";
      case "clothes":
        return "oglasi, odeća, muška odeća, ženska odeća, dečija odeća";
      case "shoes":
        return "oglasi, obuća, muška obuća, ženska obuća, dečija obuća";
      case "work":
        return "oglasi, posao, vakansije, rad, zaposlenje";
      case "house_goods":
        return "oglasi, kućni proizvodi, nameštaj, dekoracije";
      case "building_materials_and_tools":
        return "oglasi, građevinski materijali, alatke, cement, cigle";
      case "transport_goods":
        return "oglasi, transport robe, kamioni, prikolice";
      case "petSupplies":
        return "oglasi, oprema za kućne ljubimce, hrana za ljubimce, igračke za ljubimce";
      case "home_appliance":
        return "oglasi, kućni aparati, frižideri, veš mašine";
      case "service":
        return "oglasi, usluge, popravke, čišćenje";
      case "child_goods":
        return "oglasi, dečija roba, igračke, dečija odeća";
      case "health_and_beauty":
        return "oglasi, zdravlje i lepota, kozmetika, suplementi";
      case "sport":
        return "oglasi, sport, sportska oprema, sportska odeća";
      case "hobby_n_Relax":
        return "oglasi, hobiji, opuštanje, knjige, muzika";
      case "rest":
        return "oglasi, odmor, putovanja, smeštaj";
      default:
        return "oglasi, nekretnine, transport, odeća, elektronika, kućni proizvodi, građevinski materijali, alati, transport robe, kućni aparati, usluge, dečija roba, zdravlje i lepota, sport, hobi, opuštanje, odmor";
    }
  };

  const description = getDescription(category);
  const keywords = getKeywords(category);
  const url = getUrl(category);
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredAdsBySearch = filteredAdvertisements.filter(advertisment =>
    advertisment.title.toLowerCase().includes(searchText.toLowerCase())
  );

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

      <Helmet>
        <title>{`Oglasna Stranica - ${
          category ? t(category) : "Pronađite Najbolje Ponude"
        } | Hvala`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content={`Oglasna Stranica - ${
            category ? t(category) : "Pronađite Najbolje Ponude"
          } | Hvala`}
        />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/oglasna-stranica.jpg?alt=media&token=primer-token"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Oglasna Stranica - ${
            category ? t(category) : "Pronađite Najbolje Ponude"
          } | Hvala`}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/oglasna-stranica.jpg?alt=media&token=primer-token"
        />
      </Helmet>

      <CategoriesAds handleSearchChange={handleSearchChange} searchText={searchText}/>

      {/* Карта недвижимости: отступы по краям — paddingLeft/paddingRight (px) */}
      {category === "estate" && (
        <div style={{ paddingLeft: 48, paddingRight: 48 }}>
          <EstateMap advertisements={filteredAdvertisements} />
        </div>
      )}

      <Container>
        <Row>
          <Col md={3} className=" d-none d-lg-block">
            <label className="mt-3">{t("prices")}</label>
            <Space style={{ width: "100%" }} align="baseline">
              <Select
                defaultValue=""
                onChange={handleCurrencyChange}
                value={currency}
                style={{ width: 100 }}
              >
                <Select.Option value="rsd">RSD</Select.Option>
                <Select.Option value="eur">EUR</Select.Option>
              </Select>
              <InputNumber
                style={{ width: "100%" }}
                placeholder={t("minPricePlaceholder")}
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <InputNumber
                style={{ width: "100%" }}
                placeholder={t("maxPricePlaceholder")}
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </Space>
            <label className="mt-3">{t("country")}</label>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => setCountry(value)}
              value={country}
            >
              <Option value="">{t("choice_country")}</Option>
              <Option value="serbia">{t("serbia")}</Option>
              <Option value="montenegro">{t("montenegro")}</Option>
              <Option value="croatia">{t("croatia")}</Option>
              <Option value="bosnia_and_herzegovina">
                {t("bosnia_and_herzegovina")}
              </Option>
            </Select>

            {country && (
              <>
                <label className="mt-3">{t("region")}</label>
                <Select
                  style={{ width: "100%" }}
                  onChange={(value) => setRegion(value)}
                  value={region}
                >
                  {countryRegions[country]
                    ? countryRegions[country].map((region) => (
                        <Option key={region.value} value={region.value}>
                          {region.label}
                        </Option>
                      ))
                    : null}
                </Select>
              </>
            )}

            <label className="mt-3">{t("subCategory")}</label>
            <Select
              style={{ width: "100%" }}
              onChange={setSubCategory}
              value={subcategory}
            >
              <Option value="">{t("choice_subcategory")}</Option>
              {currentSubcategories.map((subcategory) => (
                <Option key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </Option>
              ))}
            </Select>

            {renderForm()}

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                className="mt-3"
                type="primary"
                onClick={applyFilters}
                style={{ backgroundColor: "orange", border: "none" }}
              >
                {t("apply")}
              </Button>
              <Button
                className="mt-3"
                type="default"
                onClick={resetFilters}
                style={{ marginLeft: "10px" }}
              >
                {t("reset")}
              </Button>
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
                <div className="d-lg-none">
                  <div className={styles.container}>
                    <div className={styles.filters}>
                      <a onClick={showModal}>
                        <Space>
                          <FilterOutlined />
                          {t("filter")}
                        </Space>
                      </a>
                      <Modal
                        title={t("filter")}
                        open={isModalOpen}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <label className="mt-3">{t("prices")}</label>
                        <Space style={{ width: "100%" }} align="baseline">
                          <Select
                            defaultValue={t("currency")}
                            onChange={handleCurrencyChange}
                            style={{ width: 120 }}
                          >
                            <Select.Option value="rsd">RSD</Select.Option>
                            <Select.Option value="eur">EUR</Select.Option>
                          </Select>
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder={t("minPricePlaceholder")}
                            value={minPrice}
                            onChange={handleMinPriceChange}
                          />
                          <InputNumber
                            style={{ width: "100%" }}
                            placeholder={t("maxPricePlaceholder")}
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                          />
                        </Space>
                        <label className="mt-3">{t("country")}</label>
                        <Select
                          style={{ width: "100%" }}
                          onChange={(value) => setCountry(value)}
                          value={country}
                        >
                          <Option value="">{t("choice_country")}</Option>
                          <Option value="serbia">{t("serbia")}</Option>
                          <Option value="montenegro">{t("montenegro")}</Option>
                          <Option value="croatia">{t("croatia")}</Option>
                          <Option value="bosnia_and_herzegovina">
                            {t("bosnia_and_herzegovina")}
                          </Option>
                        </Select>

                        {country && (
                          <>
                            <label className="mt-3">{t("region")}</label>
                            <Select
                              style={{ width: "100%" }}
                              onChange={(value) => setRegion(value)}
                              value={region}
                            >
                              {countryRegions[country]
                                ? countryRegions[country].map((region) => (
                                    <Option
                                      key={region.value}
                                      value={region.value}
                                    >
                                      {region.label}
                                    </Option>
                                  ))
                                : null}
                            </Select>
                          </>
                        )}

                        <label className="mt-3">{t("subCategory")}</label>
                        <Select
                          style={{ width: "100%" }}
                          onChange={setSubCategory}
                          value={subcategory}
                        >
                          <Option value="">{t("choice_subcategory")}</Option>
                          {currentSubcategories.map((subcategory) => (
                            <Option
                              key={subcategory.value}
                              value={subcategory.value}
                            >
                              {subcategory.label}
                            </Option>
                          ))}
                        </Select>

                        {renderForm()}

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            className="mt-3"
                            type="primary"
                            onClick={applyFilters}
                            style={{
                              backgroundColor: "orange",
                              border: "none",
                            }}
                          >
                            {t("apply")}
                          </Button>
                          <Button
                            className="mt-3"
                            type="default"
                            onClick={resetFilters}
                            style={{ marginLeft: "10px" }}
                          >
                            {t("reset")}
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>

                <Row
                  xs={2}
                  sm={2}
                  md={2}
                  lg={3}
                  className="g-3 mt-1"
                  id="cardAds"
                >
                  {filteredAdvertisements.length > 0 ? (
                    filteredAdvertisements.map((advertisment, index) => (
                      <Col>
                        <CustomCard
                          id={advertisment.id}
                          key={index}
                          images={advertisment.photoUrls}
                          price={advertisment.price}
                          currency={advertisment.currency}
                          title={advertisment.title}
                          location={advertisment.location}
                          date={advertisment.time_creation}
                          showButtons={false}
                          status="active"
                        />
                      </Col>
                    ))
                  ) : (
                    <Col>
                      <p>{t("request_error")}</p>
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
};
