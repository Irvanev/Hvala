import { Container, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

import { collection, query, where, getDocs,orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../../config/firebase";

//import { fetchAdvertisments } from '../../services/AdvertismentsHome/AdvertismentsService';
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import {FloatButton} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import LanguageModal from "../../LanguageModal";
export const Advertisement = () => {
    const [advertisment, setAdvertisement] = useState([]);
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

    const options = advertisment
        .map(ad => ad.title)
        .reduce((unique, title) => {
            return unique.findIndex(obj => obj.value === title) < 0
                ? [...unique, { value: title }]
                : unique;
        }, []);

    const filteredAdvertisements = advertisment.filter(ad =>
        ad.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const fetchAdvertisments = async () => {
        const advertismentsCollection = collection(db, "advertisment");
        const q = query(
            advertismentsCollection,
            orderBy("time_creation", "desc"),
            limit(loadedAdvertisements)
        );
        const querySnapshot = await getDocs(q);
        const advertisments = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        return advertisments;
    }



    const loadMoreAdvertisements = async () => {
        const additionalAdvertisements = await fetchAdditionalAdvertisements();
        if (additionalAdvertisements.length > 0) {
            setAdvertisement(prevAdvertisements => [...prevAdvertisements, ...additionalAdvertisements]);
            setLoadedAdvertisements(prevLoaded => prevLoaded + additionalAdvertisements.length);
        } else {
            setLoadMoreButtonVisible(false);
        }
    };

    const fetchAdditionalAdvertisements = async () => {
        const advertismentsCollection = collection(db, "advertisment");
        const q = query(
            advertismentsCollection,
            orderBy("time_creation", "desc"),
            limit(40),
            startAfter(advertisment[advertisment.length - 1].time_creation)
        );
        const querySnapshot = await getDocs(q);
        const additionalAdvertisements = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
        return additionalAdvertisements;
    }

    useEffect(() => {
        const fetchData = async () => {
            setAdvertisement(await fetchAdvertisments());
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
                <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                    {filteredAdvertisements.map((advertisment, index) => (
                        <CardAdvertisementHome key={index} advertisment={advertisment} />
                    ))}
                </Row>
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
