import React, { useEffect, useState } from 'react';
import { MyNavbar } from '../../components/Navbar/Navbar';
import { NavBarBack } from '../../components/Navbar/NavBarBack';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Input, Modal, Select, InputNumber } from 'antd'
import DefaultCardCategory from '../../components/advertisment-card-category/DefaultCardCategory';
import CardCategory from '../../components/advertisment-card-category/CardCategory';
import { fetchAdvertismentsByCategory } from '../../services/AdvertismentsCardCategory';
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons';
import Logo from '../../assets/hvala.png'
import { t } from 'i18next';

export const CategoryAdvertisments = () => {
    const history = useHistory();
    const { category } = useParams();
    const [advertisments, setAdvertisments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { Search } = Input;
    const { Option } = Select;

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const filteredAdvertisments = advertisments.filter(ad => {
        return (minPrice ? ad.price >= minPrice : true) && (maxPrice ? ad.price <= maxPrice : true);
    });

    const goBack = () => {
        history.goBack();
    };


    useEffect(() => {
        const unsubscribe = fetchAdvertismentsByCategory(category, setAdvertisments, setIsLoading);
        return () => unsubscribe();
    }, [category]);



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

            <div className='container d-lg-none'>
                <div className='container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Search placeholder="input search text" onSearch={onSearch} size='large' />
                    <Button onClick={showModal} style={{ backgroundColor: 'orange', color: 'white', border: 'none' }} size='large' icon={<MoreOutlined />}>
                    </Button>
                </div>
            </div>

            <div className='d-none d-lg-block mt-3'>
                <div className='container mb-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='logo' style={{ marginRight: '20px' }}>
                        <img src={Logo} alt='logo' style={{ height: '40px', width: '160px' }}></img>
                    </div>
                    <Search placeholder="input search text" onSearch={onSearch} size='large' />
                    <Button onClick={showModal} style={{ marginLeft: '20px', backgroundColor: 'orange', color: 'white', border: 'none' }} size='large' icon={<MoreOutlined />}>
                        Фильтры
                    </Button>
                </div>
            </div>

            <Modal title="Фильтры" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p>Диапазон цен:</p>
                    <div>
                        <InputNumber
                            defaultValue={0}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                            style={{ marginRight: '20px' }}
                        />
                        <InputNumber
                            defaultValue={0}
                            formatter={(value) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                        />
                    </div>
                    <p>Выбор страны:</p>
                    <Select defaultValue="Россия" style={{ width: 240 }}>
                        <Option value="Россия">Россия</Option>
                        <Option value="США">США</Option>
                        <Option value="Китай">Китай</Option>
                    </Select>
                    <Button className='mt-3' type='primary' style={{ backgroundColor: 'orange', border: 'none' }}>Применить</Button>
                </div>
            </Modal>

            <Container>
                <Row>
                    <Col md={3} className='d-none d-lg-block'>
                        <Select
                            defaultValue="lucy"
                            style={{
                                marginTop: '20px',
                                width: '100%',
                            }}
                        />
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
                            <Container className="album mt-3">
                                <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                    {filteredAdvertisments.map((advertisment) => (
                                        <CardCategory key={advertisment.id} advertisment={advertisment} />
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                    )}
                </Row>
            </Container>

        </div>
    );
}