import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { MyNavbar } from "../../components/Navbar/Navbar";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import Categories from "../../components/category";
import CategoryCards from "../../components/category-cards/CategoryCards";
import { CustomFooter } from "../../components/footer/footer";
import LanguageModal from "../../LanguageModal";
import DynamicForm from "../../components/filters-forms/DynamicForm";
import ModalFilter from "../../components/modal-filters/ModalFilter";
import OrangeButton from "../../components/buttons/orange-button/OrangeButton";

import banner from "../../assets/New_Hvala_2_0.png";

import { Spin, message } from "antd";
import { GlobalOutlined, QuestionCircleOutlined, CloseOutlined } from "@ant-design/icons";

import {
  fetchAdvertisments,
  getUserByAuth
} from "../../services/AdvertismentsHome/test";
import { fetchAdvertismentsSearch } from "../../services/AdvertismentsHome/AdvertismentsService";
import { fetchFavoriteIds, addToFavorites, removeFromFavorites } from "../../services/favorites/FavoritesService";
import { resizeFirstImage } from "../../services/imageResizer";
import { Helmet } from "react-helmet";
import CustomCard from "../../components/card/CustomCard";
import { PopularSearchBlock } from "../../components/SEO/PopularSearchBlock";
import SearchAuto from "../../components/SearchAuto";

const TestAdvertisment = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [advertisments, setAdvertisments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleFilter, setIsModalVisibleFilter] = useState(false);

  const [searchText, setSearchText] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || params.get("search") || "";
  });
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const searchSectionRef = useRef(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency, setCurrency] = useState("");

  const [condition, setCondition] = useState("");

  const [screen_size, setScreenSize] = useState("");
  const [memory, setMemory] = useState("");

  const [size, setSize] = useState("");
  const [type, setType] = useState("");

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

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubCategory(null);
  };

  const handleSubcategoryChange = (value) => {
    setSubCategory(value);
  };

  const handleCountryChange = (value) => {
    setCountry(value);
    setRegion(null);
  };

  const handleRegionChange = (value) => {
    setRegion(value);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(parseInt(value, 10));
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(parseInt(value, 10));
  };

  const handleCurrencyChange = (value) => {
    setCurrency(value);
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

  const categories = [
    { value: "estate", label: t("estate") },
    { value: "transport", label: t("transport") },
    { value: "clothes", label: t("clothes") },
    { value: "shoes", label: t("shoes") },
    { value: "work", label: t("work") },
    { value: "electronics", label: t("electronics") },
    { value: "house_goods", label: t("house_goods") },
    {
      value: "building_materials_and_tools",
      label: t("building_materials_and_tools"),
    },
    { value: "transport_goods", label: t("transport_goods") },
    { value: "home_appliance", label: t("home_appliance") },
    { value: "service", label: t("service") },
    { value: "child_goods", label: t("child_goods") },
    { value: "health_and_beauty", label: t("health_and_beauty") },
    { value: "sport", label: t("sport") },
    { value: "hobby_n_Relax", label: t("hobby_n_Relax") },
    { value: "rest", label: t("rest") },
  ];

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

  const applyFilters = async () => {
    setLoading(true);
    setAdvertisments([]);
    setLastVisible(null);
    setCurrentPage(1);

    const filters = {
      category,
      subcategory,
      country,
      region,
      condition,
      size,
      type,
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
    };

    let adsToProcess = [];
    if (searchText.trim()) {
      setHasMore(false);
      adsToProcess = await fetchAdvertismentsSearch(searchText.trim(), filters);
      const adsWithOriginal = adsToProcess.map(ad => ({
        ...ad,
        photoUrls: ad.photoUrls || [],
        _resizing: true
      }));
      setAdvertisments(adsWithOriginal);
    } else {
      setHasMore(true);
      const { advertisments: newAds, lastDoc } = await fetchAdvertisments(
        null,
        category,
        subcategory,
        country,
        region,
        condition,
        size,
        type,
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
        currency
      );
      adsToProcess = newAds;
      const adsWithOriginalImages = newAds.map(ad => ({
        ...ad,
        photoUrls: ad.photoUrls || [],
        _resizing: true
      }));
      setAdvertisments(adsWithOriginalImages);
      setLastVisible(lastDoc);
    }

    setLoading(false);
    setIsModalVisibleFilter(false);

    const processBatch = async (adsBatch) => {
      const promises = adsBatch.map(async (ad) => {
        if (ad.photoUrls && ad.photoUrls.length > 0) {
          try {
            const resizedUrls = await resizeFirstImage(ad.photoUrls, 400, 400);
            const adId = ad.id;
            setAdvertisments((prev) =>
              prev.map((item) =>
                item.id === adId
                  ? { ...item, photoUrls: resizedUrls, _resizing: false }
                  : item
              )
            );
          } catch (error) {
            const adId = ad.id;
            setAdvertisments((prev) =>
              prev.map((item) =>
                item.id === adId ? { ...item, _resizing: false } : item
              )
            );
          }
        }
      });
      await Promise.all(promises);
    };

    const batchSize = 3;
    for (let i = 0; i < adsToProcess.length; i += batchSize) {
      const batch = adsToProcess.slice(i, i + batchSize);
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => processBatch(batch), { timeout: 1000 });
      } else {
        setTimeout(() => processBatch(batch), i * 50);
      }
    }
  };

  const resetFilters = () => {
    setSubCategory("");
    setCondition("");
    setCountry("");
    setRegion("");
    setMemory("");
    setScreenSize("");
  };

  const hasActiveFilters = !!(category || subcategory || country || region || minPrice || maxPrice || currency || condition || size || type || wheel || mileage || body || drive || year || transmission || memory || screen_size || brand);

  const handleClearFilters = (e) => {
    e?.stopPropagation?.();
    setCategory("");
    setSubCategory("");
    setCountry("");
    setRegion("");
    setMinPrice("");
    setMaxPrice("");
    setCurrency("");
    setCondition("");
    setSize("");
    setType("");
    setWheel("");
    setMileage("");
    setBody("");
    setDrive("");
    setYear("");
    setTransmission("");
    setMemory("");
    setScreenSize("");
    setBrand("");
    setAdvertisments([]);
    setLastVisible(null);
    setHasMore(true);
    setFetching(true);
  };

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const showModalFilter = () => {
    setIsModalVisibleFilter(true);
  };

  const handleCancelFilter = () => {
    setIsModalVisibleFilter(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("i18nextLng")) {
      setIsModalVisible(true);
    }
  }, []);

  const handleClickHelp = () => {
    history.push("/help");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (fetching && hasMore) {
        setLoading(true);
        
        // Убрали Firebase Debug вызовы для production
        const { advertisments: newAds, lastDoc } = await fetchAdvertisments(
          lastVisible,
          category,
          subcategory,
          country,
          region,
          condition,
          size,
          type,
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
          currency
        );
        
        // Сначала показываем объявления с оригинальными изображениями для быстрого рендера
        const adsWithOriginalImages = newAds.map(ad => ({
          ...ad,
          photoUrls: ad.photoUrls || [],
          _resizing: true // Флаг для отслеживания процесса ресайза
        }));
        
        setAdvertisments((prev) => [...prev, ...adsWithOriginalImages]);
        setLastVisible(lastDoc);
        setCurrentPage((prev) => prev + 1);
        setLoading(false);
        setFetching(false);
        
        // Параллельно обрабатываем изображения батчами для предотвращения лагов
        // Обновляем по id объявления, а не по индексу — иначе при race condition
        // (новый поиск, пагинация) фото одного объявления могут попасть в другое
        const processBatch = async (adsBatch) => {
          const promises = adsBatch.map(async (ad) => {
            if (ad.photoUrls && ad.photoUrls.length > 0) {
              try {
                const resizedUrls = await resizeFirstImage(ad.photoUrls, 400, 400);
                const adId = ad.id;
                setAdvertisments((prev) =>
                  prev.map((item) =>
                    item.id === adId
                      ? { ...item, photoUrls: resizedUrls, _resizing: false }
                      : item
                  )
                );
              } catch (error) {
                const adId = ad.id;
                setAdvertisments((prev) =>
                  prev.map((item) =>
                    item.id === adId ? { ...item, _resizing: false } : item
                  )
                );
              }
            }
          });
          await Promise.all(promises);
        };
        
        // Обрабатываем батчами по 3 объявления за раз для предотвращения лагов
        const batchSize = 3;
        for (let i = 0; i < newAds.length; i += batchSize) {
          const batch = newAds.slice(i, i + batchSize);
          if (window.requestIdleCallback) {
            window.requestIdleCallback(() => processBatch(batch), { timeout: 1000 });
          } else {
            setTimeout(() => processBatch(batch), i * 50);
          }
        }
        
        if (!lastDoc) {
          setHasMore(false);
        }
      }
    };
    fetchData();
  }, [fetching, hasMore]);

  useEffect(() => {
    const trimmed = searchText.trim();
    if (trimmed) {
      setLoading(true);
      setHasMore(false);
      const filters = {
        category,
        subcategory,
        country,
        region,
        condition,
        size,
        type,
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
      };
      fetchAdvertismentsSearch(trimmed, filters)
        .then((searchAds) => {
          setAdvertisments(searchAds);
          setLastVisible(null);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setAdvertisments([]);
      setLastVisible(null);
      setHasMore(true);
      setFetching(true);
    }
  }, [searchText, category, subcategory, country, region, condition, size, type, wheel, mileage, body, drive, year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency]);

  useEffect(() => {
    if (hasMore) {
      setFetching(true);
    }
  }, [hasMore]);

  useEffect(() => {
    setFetching(true);
  }, []);

  // Синхронизация поиска из URL (для SearchAction / переходов из Google)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || params.get("search") || "";
    if (q && q !== searchText) {
      setSearchText(q);
    }
  }, [location.search]);

  // Показываем индикатор загрузки только если запрос длится дольше 300ms (без мигания при быстром ответе)
  useEffect(() => {
    if (!loading) {
      setShowLoadingIndicator(false);
      return;
    }
    const timer = setTimeout(() => setShowLoadingIndicator(true), 300);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    const el = searchSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSearchSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-56px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      await getUserByAuth(setUser);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user?.id) return;
      try {
        const ids = await fetchFavoriteIds();
        setFavoriteIds(new Set(ids));
      } catch {
        setFavoriteIds(new Set());
      }
    };
    loadFavorites();
  }, [user?.id]);

  const handleFavoriteToggle = async (ad) => {
    if (!user?.id) {
      message.info(t("login_to_add_favorites") || "Войдите, чтобы добавить в избранное");
      return;
    }
    const isFav = favoriteIds.has(ad.id);
    try {
      if (isFav) {
        await removeFromFavorites(ad.id);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(ad.id);
          return next;
        });
      } else {
        await addToFavorites(ad);
        setFavoriteIds((prev) => new Set([...prev, ad.id]));
      }
    } catch (e) {
      if (e.message === "AUTH_REQUIRED") return;
      console.error("Favorite toggle error:", e);
    }
  };

  return (
    <>
      <Helmet>
        <title>Hvala - Oglasna Stranica Crna Gora | Oglasi Nekretnine, Transport</title>
        <meta
          name="description"
          content="Hvala - besplatna oglasna stranica za Crnu Goru. Oglasi za nekretnine, transport, odeću, elektroniku. Preuzmite Hvala app."
        />
        <meta
          name="keywords"
          content="Hvala, hvala app, hvala oglasi, hvala crna gora, oglasna stranica, oglasi Crna Gora, besplatni oglasi, kupiti prodati, nekretnine, transport, odeća, elektronika, Montenegro classifieds, free ads Montenegro, buy sell Montenegro, объявления Черногория, бесплатные объявления, купить продать"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Hvala - Oglasna Stranica Crna Gora | Oglasi"
        />
        <meta
          property="og:description"
          content="Hvala - besplatna oglasna stranica za Crnu Goru. Oglasi za nekretnine, transport, odeću, elektroniku."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hvala.app" />
        <link rel="canonical" href="https://hvala.app/" />
        <meta
          property="og:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hvala - Oglasna Stranica Crna Gora | Oglasi"
        />
        <meta
          name="twitter:description"
          content="Hvala - besplatna oglasna stranica za Crnu Goru. Oglasi za nekretnine, transport, odeću, elektroniku."
        />
        <meta
          name="twitter:image"
          content="https://hvala.app/android-chrome-512x512.png"
        />
      </Helmet>
      <style>
        {`
                @media (max-width: 1000px) {
                    body {
                    padding-top: 0;
                    }
                }
                @media (min-width: 1000px) {
                    .sticky-search-bar { top: 5.5rem !important; }
                }
                .sticky-search-bar {
                    animation: stickySearchSlide 0.25s ease-out;
                }
                @keyframes stickySearchSlide {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .home-update-ticker {
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .home-update-ticker-track {
                    display: inline-block;
                    padding-left: 100%;
                    animation: homeTickerMove 14s linear infinite;
                }
                @keyframes homeTickerMove {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .sticky-search-bar input.ant-input,
                .sticky-search-bar .ant-select-selector {
                    border-radius: 10px !important;
                    border-color: #03989F !important;
                }
                .sticky-search-bar input.ant-input:focus,
                .sticky-search-bar .ant-select-focused .ant-select-selector {
                    border-color: #00B2BB !important;
                    box-shadow: 0 0 0 2px rgba(3, 152, 159, 0.15) !important;
                }
                `}
      </style>
      <MyNavbar />
      {isSearchSticky && (
        <div
          className="container sticky-search-bar"
          style={{
            position: "fixed",
            top: "3.5rem",
            left: 0,
            right: 0,
            zIndex: 998,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 4px 20px rgba(3, 152, 159, 0.12)",
            borderBottom: "2px solid #03989F",
            padding: "14px 16px",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <div className="d-flex align-items-center gap-3" style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <SearchAuto value={searchText} onSearch={(v) => setSearchText(v)} />
            </div>
            <OrangeButton onClick={showModalFilter} width="90px" height="40px" title={t("filter")} />
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="d-flex align-items-center justify-content-center border-0 rounded-circle text-white"
                style={{
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  flexShrink: 0,
                  backgroundColor: "#dc3545",
                  transition: "transform 0.2s, background-color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.backgroundColor = "#c82333";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "#dc3545";
                }}
                title={t("reset_filters")}
                aria-label={t("reset_filters")}
              >
                <CloseOutlined style={{ fontSize: 12 }} />
              </button>
            )}
          </div>
        </div>
      )}
      <h1 className="visually-hidden">Hvala - Oglasna stranica Crna Gora. Besplatni oglasi za nekretnine, transport, odeću, elektroniku.</h1>
      <div ref={searchSectionRef}>
        <Categories
          searchText={searchText}
          onSearchChange={(value) => setSearchText(value)}
        />
      </div>
      <CategoryCards />
      <div className="container" style={{ marginTop: 8 }}>
        <div
          className="home-update-ticker"
          style={{
            border: "1px solid #E3A725",
            borderRadius: 10,
            background: "linear-gradient(90deg, #FFBF34 0%, #FFA726 100%)",
            color: "#fff",
            fontSize: 13,
            padding: "8px 0",
            textAlign: "left",
            lineHeight: 1.35,
            fontWeight: 600,
          }}
        >
          <span className="home-update-ticker-track">
            {t("home_map_update_banner")} &nbsp;•&nbsp; {t("home_map_update_banner")}
          </span>
        </div>
      </div>
      <div className="container">
        <PopularSearchBlock />
      </div>
      <LanguageModal show={isModalVisible} handleClose={handleModalClose} />
      <ModalFilter
        t={t}
        isModalVisibleFilter={isModalVisibleFilter}
        handleCancelFilter={handleCancelFilter}
        handleCurrencyChange={handleCurrencyChange}
        minPrice={minPrice}
        handleMinPriceChange={handleMinPriceChange}
        maxPrice={maxPrice}
        handleMaxPriceChange={handleMaxPriceChange}
        handleCountryChange={handleCountryChange}
        country={country}
        countryRegions={countryRegions}
        handleRegionChange={handleRegionChange}
        region={region}
        categories={categories}
        handleCategoryChange={handleCategoryChange}
        category={category}
        subcategories={subcategories}
        subcategory={subcategory}
        handleSubcategoryChange={handleSubcategoryChange}
        renderForm={() => (
          <DynamicForm
            subcategory={subcategory}
            condition={condition}
            setCondition={setCondition}
            type={type}
            setType={setType}
            size={size}
            setSize={setSize}
            brand={brand}
            setBrand={setBrand}
            memory={memory}
            setMemory={setMemory}
            screen_size={screen_size}
            setScreenSize={setScreenSize}
            body={body}
            setBody={setBody}
            wheel={wheel}
            setWheel={setWheel}
            drive={drive}
            setDrive={setDrive}
            transmission={transmission}
            setTransmission={setTransmission}
            year={year}
            setYear={setYear}
            mileage={mileage}
            setMileage={setMileage}
            rooms_amount={rooms_amount}
            setRoomsAmount={setRoomsAmount}
            area={area}
            setArea={setArea}
            owner={owner}
            setOwner={setOwner}
          />
        )}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
      <div className="app d-lg-none">
        <button
          onClick={showModal}
          className="fixed right-6 bottom-24 h-12 w-24 text-white bg-customColor2 rounded-lg flex items-center justify-center z-50"
        >
          <GlobalOutlined className="text-xl" />
          <span className="ml-2">{t("language")}</span>
        </button>
      </div>
      <div className="app d-lg-none">
        <button
          onClick={handleClickHelp}
          className="fixed left-6 bottom-24 h-12 w-24 text-white bg-customColor2 rounded-lg flex items-center justify-center z-50"
        >
          <QuestionCircleOutlined className="text-xl" />
          <span className="ml-2">{t("help_navbar")}</span>
        </button>
      </div>
      <div className="container d-none d-lg-block">
        <img
          src={banner}
          alt="Banner"
          className="img-fluid"
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div className="container d-flex justify-end align-items-center mt-3 mb-3 gap-2">
        <div className="d-flex align-items-center gap-2" style={{ position: "relative" }}>
          <OrangeButton
            onClick={showModalFilter}
            width="100px"
            heigth="50px"
            title={t("filter")}
          />
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="d-flex align-items-center justify-content-center border-0 rounded-circle bg-danger text-white"
              style={{ width: 24, height: 24, cursor: "pointer", flexShrink: 0 }}
              title={t("reset_filters")}
              aria-label={t("reset_filters")}
            >
              <CloseOutlined style={{ fontSize: 12 }} />
            </button>
          )}
        </div>
      </div>
      <div className="container">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {advertisments.map((advertisment, index) => (
            <CustomCard
              id={advertisment.id}
              key={advertisment.id || index}
              user={user}
              images={advertisment.photoUrls || []}
              price={advertisment.price}
              currency={advertisment.currency}
              title={advertisment.title}
              location={advertisment.location}
              date={advertisment.time_creation}
              showButtons={user?.role === 'admin'}
              status="active"
              _resizing={advertisment._resizing}
              isFavorite={favoriteIds.has(advertisment.id)}
              onFavoriteClick={() => handleFavoriteToggle(advertisment)}
              showFavorite={true}
            />
          ))}
        </div>
      </div>
      <div className="container d-flex justify-content-center mt-3 mb-3">
        {showLoadingIndicator && (
          <div
            className="d-flex flex-column align-items-center justify-content-center py-4"
            style={{ minHeight: 80 }}
          >
            <Spin size="large" style={{ color: "#03989F" }} />
            <span className="mt-2 text-muted" style={{ fontSize: "0.9rem" }}>
              {t("search")}…
            </span>
          </div>
        )}
      </div>
      <CustomFooter />
    </>
  );
};

export default TestAdvertisment;
