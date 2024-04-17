import { Container, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, startAfter, limit } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import { Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Advertisement = () => {
    const [advertisment, setAdvertisment] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);

    const fetchAds = async (afterDoc) => {
        let adsList;

        const adsCollection = collection(db, 'advertisment');
        let q = query(adsCollection, orderBy("time_creation", "desc"), limit(20));
        if (afterDoc) {
            q = query(adsCollection, orderBy("time_creation", "desc"), startAfter(afterDoc), limit(20));
        }

        const adsSnapshot = await getDocs(q);
        adsList = adsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setLastDoc(adsSnapshot.docs[adsSnapshot.docs.length - 1]);

        setAdvertisment(prevAds => [...prevAds, ...adsList]);
    };

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchMoreData = () => {
        fetchAds(lastDoc);
    };



    return (
        <div>
            <MyNavbar />
            <Categories />
            <CategoryCards />
            <Container className="album mt-3">
                <InfiniteScroll
                    dataLength={advertisment.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<Skeleton active />}
                >
                    <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                        {advertisment.map((advertisment, index) => (
                            <CardAdvertisementHome key={index} advertisment={advertisment} />
                        ))}
                    </Row>
                </InfiniteScroll>
            </Container>
        </div>
    );
}