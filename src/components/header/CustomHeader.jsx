import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.css";
import logo from "../../assets/new_logo.png";

import { Button, Input } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  BarsOutlined,
  GlobalOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import OrangeButton from "../buttons/orange-button/OrangeButton";
import BlueButton from "../buttons/blue-button/BlueButton";

const CustomHeader = () => {
  const isAuth = localStorage.getItem("isAuthenticated");
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Отслеживаем прокрутку страницы
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Закрываем дропдаун при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Закрываем дропдаун при нажатии Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowCategoriesDropdown(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleCategoriesDropdown = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
  };

  // Категории с иконками (для наглядности)
  const categories = [
    {
      name: "Электроника",
      icon: "📱",
      subcategories: [
        "Смартфоны",
        "Планшеты",
        "Ноутбуки",
        "ТВ и аудио",
        "Фото и видео",
        "Игровые приставки",
      ],
    },
    {
      name: "Недвижимость",
      icon: "🏠",
      subcategories: [
        "Квартиры",
        "Дома",
        "Комнаты",
        "Земельные участки",
        "Коммерческая",
        "Новостройки",
      ],
    },
    {
      name: "Транспорт",
      icon: "🚗",
      subcategories: [
        "Автомобили",
        "Мотоциклы",
        "Спецтехника",
        "Водный транспорт",
        "Запчасти",
        "Аренда авто",
      ],
    },
    {
      name: "Работа",
      icon: "💼",
      subcategories: ["Вакансии", "Резюме", "Услуги", "Бизнес и партнерство"],
    },
    {
      name: "Услуги",
      icon: "🔧",
      subcategories: [
        "Ремонт",
        "Строительство",
        "Красота",
        "Перевозки",
        "IT услуги",
        "Бытовые услуги",
      ],
    },
    {
      name: "Личные вещи",
      icon: "👕",
      subcategories: [
        "Одежда",
        "Обувь",
        "Аксессуары",
        "Часы и украшения",
        "Красота и здоровье",
        "Детская одежда",
      ],
    },
  ];

  const headerClassName = `${style.header} ${isScrolled ? style.scrolled : ""}`;

  return (
    <header className={headerClassName}>
      {/* Верхний уровень хедера */}
      <div className={style.topHeader}>
        <div className={`container ${style.headerContainer}`}>
          <div className={style.topLinks}>
            <Link to="/help" className={style.headerLink}>
              <GlobalOutlined style={{ marginRight: "10px" }} />
              Язык
            </Link>
            <Link to="/help" className={style.headerLink}>
              Помощь
            </Link>
            <Link to="/contacts" className={style.headerLink}>
              Контактная информация
            </Link>
            <Link to="/about" className={style.headerLink}>
              О нас
            </Link>
            <Link to="/faq" className={style.headerLink}>
              FAQ
            </Link>
          </div>

          <div className={style.topButtons}>
            <Link to="/addItem">
              <BlueButton
                title="Разместить объявление"
                width="220px"
                height="40px"
                margin="0 0 0 10px"
              >
                <PlusOutlined />
                Разместить объявление
              </BlueButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Разделительная линия */}
      <div className={style.divider}></div>

      {/* Нижний уровень хедера */}
      <div className={style.bottomHeader}>
        <div className={`container ${style.headerContainer}`}>
          <div className={style.logoSection}>
            <Link to="/">
              <img src={logo} alt="Logo" className={style.logo} />
            </Link>
          </div>

          <div className={style.searchControls}>
            <div className={style.categoryDropdownContainer} ref={buttonRef}>
              <OrangeButton
                title="Категории"
                width="200px"
                height="40px"
                padding="0 10px 0 10px"
                margin="0 10px 0 0"
                onClick={toggleCategoriesDropdown}
              >
                <BarsOutlined style={{ marginRight: "10px" }} />
                Категории
              </OrangeButton>
            </div>
            <Input
              placeholder="Поиск товаров..."
              className={style.searchInput}
            />
          </div>

          <div className={style.profileSection}>
            {isAuth === "true" ? (
              <Button type="text" className={style.profileButton}>
                <UserOutlined />
                Профиль
              </Button>
            ) : (
              <Button type="text" className={style.profileButton}>
                <UserOutlined />
                Вход и регистрация
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Выпадающее меню категорий */}
      {showCategoriesDropdown && (
        <div
          className={style.categoriesDropdown}
          onClick={() => setShowCategoriesDropdown(false)}
        >
          <div
            className={style.dropdownContent}
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.dropdownHeader}>
              <h3>Категории товаров</h3>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setShowCategoriesDropdown(false)}
                className={style.closeButton}
              />
            </div>
            <div className={style.categoriesTwoColumn}>
              {/* Левая колонка с основными категориями */}
              <div className={style.categoriesList}>
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`${style.categoryItem} ${
                      selectedCategory === index ? style.selectedCategory : ""
                    }`}
                    onMouseEnter={() => setSelectedCategory(index)} // Заменяем onClick на onMouseEnter
                  >
                    <span className={style.categoryIcon}>{category.icon}</span>
                    {category.name}
                  </div>
                ))}
              </div>

              {/* Правая колонка с подкатегориями */}
              <div className={style.subcategoriesList}>
                <h4>{categories[selectedCategory].name}</h4>
                <div className={style.subcategoriesGrid}>
                  {categories[selectedCategory].subcategories.map(
                    (subcategory, idx) => (
                      <Link
                        to={`/category/${categories[
                          selectedCategory
                        ].name.toLowerCase()}/${subcategory.toLowerCase()}`}
                        key={idx}
                        className={style.subcategoryLink}
                        onClick={() => setShowCategoriesDropdown(false)}
                      >
                        {subcategory}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CustomHeader;
