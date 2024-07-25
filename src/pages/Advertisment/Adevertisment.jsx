import { Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { fetchAdvertismentsSearch, fetchAdvertisments, fetchAdditionalAdvertisements } from '../../services/AdvertismentsHome/AdvertismentsService';
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import LanguageModal from "../../LanguageModal";

import { FloatButton, Button, Result } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';
import { CustomFooter } from '../../components/footer/footer';
import { t } from 'i18next';

export const Advertisement = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [advertisment, setAdvertisement] = useState([]);
    const [advertismentAl, setAdvertisementAll] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loadedAdvertisements, setLoadedAdvertisements] = useState(40);
    const [loadMoreButtonVisible, setLoadMoreButtonVisible] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };


    const options = advertismentAl
        .map(ad => ad.title)
        .reduce((unique, title) => {
            return unique.findIndex(obj => obj.value === title) < 0
                ? [...unique, { value: title }]
                : unique;
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

    return (
        <div>
            <style type="text/css">
                {`
                @media (max-width: 1000px) {
                    body {
                    }
                }
                @media (min-width: 1000px) {
                    body {
                        padding-top: 4.5rem;
                    }
                }
                `}
            </style>

            <MyNavbar />
            <FloatButton
                icon={<GlobalOutlined />}
                style={{ right: 24, bottom: 80 }}
                onClick={showModal}
            />
            <LanguageModal
                show={isModalVisible}
                handleClose={handleModalClose}
            />
            <Categories setSearchText={setSearchText} options={options} />
            <CategoryCards />
            <Container className="album mt-3">
                {isTimeout ? (
                    <Result
                        status="500"
                        title="500"
                        subTitle="Извините, что-то пошло не так."
                        extra={<Button type="primary" onClick={() => window.location.reload()}>Обновить</Button>}
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
                    <button className="btn btn-primary" style={{ border: 'none', backgroundColor: 'orange', color: 'white' }} onClick={loadMoreAdvertisements}>
                        {t("show_more")}
                    </button>
                </div>
            )}
            <CustomFooter />
        </div>
    );
}
