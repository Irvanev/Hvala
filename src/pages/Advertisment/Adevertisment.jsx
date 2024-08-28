import { Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchAdvertismentsSearch, fetchAdvertisments, fetchAdditionalAdvertisements, fetchAdvertismentsByFilters } from '../../services/AdvertismentsHome/AdvertismentsService';
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import LanguageModal from "../../LanguageModal";

import { Button, Result, Space } from "antd";
import { GlobalOutlined, FilterOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';
import { CustomFooter } from '../../components/footer/footer';
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";

import banner from "../../assets/New_Hvala_2_0.png"
import { categories } from '../../types/categories';
import { subcategories } from '../../types/subcategories';
import { countryRegions } from '../../types/countryRegions';
import DynamicForm from '../../components/filters-forms/DynamicForm';
import ModalFilter from '../../components/modal-filters/ModalFilter';

export const Advertisement = () => {
    const history = useHistory();
    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(true);
    const [advertisment, setAdvertisement] = useState([]);
    const [advertismentAl, setAdvertisementAll] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loadedAdvertisements, setLoadedAdvertisements] = useState(40);
    const [loadMoreButtonVisible, setLoadMoreButtonVisible] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleFilter, setIsModalVisibleFilter] = useState(false);

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

    const [category, setCategory] = useState('');
    const [subcategory, setSubCategory] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [currency, setCurrency] = useState('');

    const [condition, setCondition] = useState('');

    const [screen_size, setScreenSize] = useState('');
    const [memory, setMemory] = useState('');

    const [size, setSize] = useState('');
    const [type, setType] = useState('');

    const [owner, setOwner] = useState('')
    const [area, setArea] = useState('')
    const [rooms_amount, setRoomsAmount] = useState('')

    const [body, setBody] = useState('');
    const [wheel, setWheel] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('');
    const [mileage, setMileage] = useState('');
    const [transmission, setTransmission] = useState('');
    const [drive, setDrive] = useState('');

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

    const applyFilters = () => {
        console.log("Фильтры:", { category, subcategory, country, region, condition, size, type, wheel, mileage, body, drive, year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency });
        fetchAdvertismentsByFilters(category, subcategory, country, region, condition, size, type, wheel, mileage, body, drive, year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency, setAdvertisement);
        setIsModalVisibleFilter(false);
    };

    const resetFilters = () => {
        setSubCategory('');
        setCondition('');
        setCountry('');
        setRegion('');
        setMemory('');
        setScreenSize('');
    };

    useEffect(() => {
        if (!localStorage.getItem('i18nextLng')) {
            setIsModalVisible(true);
        }
    }, []);

    const filteredAdvertisements = advertismentAl.filter(ad =>
        ad.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const loadMoreAdvertisements = async () => {
        const additionalAdvertisements = await fetchAdditionalAdvertisements(advertisment);
        if (additionalAdvertisements.length > 0) {
            setAdvertisement(prevAdvertisements => [...prevAdvertisements, ...additionalAdvertisements]);
            setLoadedAdvertisements(prevLoaded => prevLoaded + additionalAdvertisements.length);
        } else {
            setLoadMoreButtonVisible(false);
        }
    };


    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
        let timer;
        const fetchData = async () => {
            setIsLoading(true);
            timer = setTimeout(() => {
                setIsTimeout(true);
            }, 10000);
            setAdvertisement(await fetchAdvertisments(loadedAdvertisements));
            setAdvertisementAll(await fetchAdvertismentsSearch());
            setIsLoading(false);
            clearTimeout(timer);
            setIsTimeout(false);
        };
        fetchData();
        return () => clearTimeout(timer);
    }, []);

    const handleClickHelp = () => {
        history.push('/help');
    };

    return (
        <>
            <Helmet>
                <title>Advertisement Page - Find the Best Deals | Hvala</title>
                <meta
                    name="description"
                    content="Discover the best advertisements for various categories including estate, transport, clothes, electronics, and more. Find great deals and offers on Hvala."
                />
                <meta
                    name="keywords"
                    content="advertisements, estate, transport, clothes, electronics, house goods, building materials, tools, transport goods, home appliance, service, child goods, health and beauty, sport, hobby, relax, rest"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    property="og:title"
                    content="Advertisement Page - Find the Best Deals | Hvala"
                />
                <meta
                    property="og:description"
                    content="Discover the best advertisements for various categories including estate, transport, clothes, electronics, and more. Find great deals and offers on Hvala."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.yourcompanywebsite.com/advertisement"
                />
                <meta
                    property="og:image"
                    content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/advertisement.jpg?alt=media&token=example-token"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Advertisement Page - Find the Best Deals | Hvala"
                />
                <meta
                    name="twitter:description"
                    content="Discover the best advertisements for various categories including estate, transport, clothes, electronics, and more. Find great deals and offers on Hvala."
                />
                <meta
                    name="twitter:image"
                    content="https://firebasestorage.googleapis.com/v0/b/hvala-2c8a4.appspot.com/o/advertisement.jpg?alt=media&token=example-token"
                />
            </Helmet>
            <main>
                <div>
                    <style type="text/css">
                        {`
                @media (min-width: 1000px) {
                    body {
                        padding-top: 4.5rem;
                    }
                }
                `}
                    </style>

                    <MyNavbar />
                    <div className='app d-lg-none'>
                        <button
                            onClick={showModal}
                            className="fixed right-6 bottom-20 h-12 w-24 text-white bg-customColor2 rounded-lg flex items-center justify-center z-50"
                        >
                            <GlobalOutlined className="text-xl" />
                            <span className="ml-2">{t('language')}</span>
                        </button>
                    </div>
                    <div className='app d-lg-none'>
                        <button
                            onClick={handleClickHelp}
                            className="fixed left-6 bottom-20 h-12 w-24 text-white bg-customColor2 rounded-lg flex items-center justify-center z-50"
                        >
                            <QuestionCircleOutlined className="text-xl" />
                            <span className="ml-2">{t('help_navbar')}</span>
                        </button>
                    </div>
                    <LanguageModal
                        show={isModalVisible}
                        handleClose={handleModalClose}
                    />
                    <Categories />
                    <CategoryCards />
                    <div className='container d-none d-lg-block'>
                        <img src={banner} alt="Banner" className="img-fluid" style={{ borderRadius: '10px' }} />
                    </div>
                    <div className='container mt-3' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <Space>
                            <a>

                            </a>
                        </Space>
                        <a onClick={showModalFilter}>
                            <Space>
                                <FilterOutlined />
                                {t('filter')}
                            </Space>
                        </a>
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
                                    condition={condition} setCondition={setCondition}
                                    type={type} setType={setType}
                                    size={size} setSize={setSize}
                                    brand={brand} setBrand={setBrand}
                                    memory={memory} setMemory={setMemory}
                                    screen_size={screen_size} setScreenSize={setScreenSize}
                                    body={body} setBody={setBody}
                                    wheel={wheel} setWheel={setWheel}
                                    drive={drive} setDrive={setDrive}
                                    transmission={transmission} setTransmission={setTransmission}
                                    year={year} setYear={setYear}
                                    mileage={mileage} setMileage={setMileage}
                                    rooms_amount={rooms_amount} setRoomsAmount={setRoomsAmount}
                                    area={area} setArea={setArea}
                                    owner={owner} setOwner={setOwner}
                                />
                            )}
                            applyFilters={applyFilters}
                            resetFilters={resetFilters}
                        />
                    </div>
                    <Container className="album mt-3">
                        {isTimeout ? (
                            <Result
                                status="500"
                                title="500"
                                subTitle={t('sorry_500')}
                                extra={<Button type="primary" onClick={() => window.location.reload()}>{t('update')}</Button>}
                            />
                        ) : isLoading ? (
                            <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <DefaultCardCategory key={index} />
                                ))}
                            </Row>
                        ) : (
                            <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                                {(searchText === "" ? advertisment : filteredAdvertisements).map((advertisment, index) => (
                                    <CardAdvertisementHome key={index} advertisment={advertisment} />
                                ))}
                            </Row>
                        )}
                    </Container>
                    {loadMoreButtonVisible && (
                        <div className="text-center mt-3">
                            <button className="btn btn-primary" style={{ border: 'none', backgroundColor: '#FFBF34', color: 'white' }} onClick={loadMoreAdvertisements}>
                                {t("show_more")}
                            </button>
                        </div>
                    )}
                    <CustomFooter />
                </div>
            </main>
        </>
    );
}
