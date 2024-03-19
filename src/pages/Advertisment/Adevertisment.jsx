import { Container, Row, Pagination } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { MyNavbar } from '../../components/Navbar/Navbar';
import Categories from '../../components/category';
import CategoryCards from "../../components/category-cards/CategoryCards";
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";
import DefaultCardAdvertisment from '../../components/card-advertisment-home/DefaultCardAdvertisment';

export const Advertisement = () => {
    const [ads, setAds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const adsPerPage = 52;

    useEffect(() => {
        const fetchData = async () => {
            const adCollection = collection(db, "advertisment");
            const totalAdsSnapshot = await getDocs(adCollection);
            setTotalPages(Math.ceil(totalAdsSnapshot.size / adsPerPage));

            let q = query(adCollection, orderBy("time_creation", "desc"), limit(adsPerPage));
            if (currentPage > 1) {
                const startAtSnapshot = await getDocs(query(adCollection, orderBy("time_creation", "desc"), limit((currentPage - 1) * adsPerPage)));
                const lastDocumentInPreviousPage = startAtSnapshot.docs[startAtSnapshot.docs.length - 1];
                q = query(adCollection, orderBy("time_creation", "desc"), startAfter(lastDocumentInPreviousPage), limit(adsPerPage));
            }
            const adSnapshot = await getDocs(q);
            const adList = adSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAds(adList);
            setIsLoading(false);
        };

        fetchData();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setIsLoading(true);
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <MyNavbar />
            <Categories />
            <CategoryCards />
            {isLoading ?
                <Container className="album mt-3">
                    <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <DefaultCardAdvertisment key={index} />
                        ))}
                    </Row>
                </Container>
                :
                <Container className="album mt-3">
                    <Row xs={2} sm={2} md={3} lg={4} className="g-3">
                        {ads.map((advertisment, index) => (
                            <CardAdvertisementHome key={index} advertisment={advertisment} />
                        ))}
                    </Row>
                    <Pagination className='mt-3'>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Container>
            }
        </div>
    );
}