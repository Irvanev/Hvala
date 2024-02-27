import { Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";

export const Advertisement = () => {
    const [ads, setAds] = useState([]);

    const fetchAds = async () => {
        let adsQuery = query(collection(db, 'advertisment'), orderBy('time_creation', 'desc'));

        const adsSnapshot = await getDocs(adsQuery);
        const adsList = adsSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(advertisment => Object.keys(advertisment).length > 1);
        setAds(adsList);

    };

    useEffect(() => {
        fetchAds();
    }, []);

    return (
        <div>

            <MyNavbar />
            <Categories />
            <CategoryCards />

            <Container className="album mt-3">
                <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                    {ads.map((advertisment, index) => (
                        <CardAdvertisementHome key={index} advertisment={advertisment} />
                    ))}
                </Row>
            </Container>

        </div>
    );
}