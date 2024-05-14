import { Container, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { fetchAdvertismentsSearch, fetchAdvertisments, fetchAdditionalAdvertisements } from '../../services/AdvertismentsHome/AdvertismentsService';
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import LanguageModal from "../../LanguageModal";

import { FloatButton } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';

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
        const additionalAdvertisements = await fetchAdditionalAdvertisements();
        if (additionalAdvertisements.length > 0) {
            setAdvertisement(prevAdvertisements => [...prevAdvertisements, ...additionalAdvertisements]);
            setLoadedAdvertisements(prevLoaded => prevLoaded + additionalAdvertisements.length);
        } else {
            setLoadMoreButtonVisible(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setAdvertisement(await fetchAdvertisments(loadedAdvertisements));
            setAdvertisementAll(await fetchAdvertismentsSearch());
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div>
            <style type="text/css">
                {`
                @media (max-width: 1000px) {
                    body {
                        padding-bottom: 4.5rem;
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
                {isLoading ? (
                    <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                    {Array.from({length: 10}).map((_, index) => (
                        <DefaultCardCategory key={index}/>
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
                    <button className="btn btn-primary" onClick={loadMoreAdvertisements}>
                        Показать еще
                    </button>
                </div>
            )}
        </div>
    );
}
