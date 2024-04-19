import React, {useEffect, useState} from "react";
import styles from './profile.module.css'

import Logo from '../../assets/logo.png';
import {Container, Row, Col} from 'react-bootstrap';
import {MyNavbar} from '../../components/Navbar/Navbar';
import {Link} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import ProfileCardForPc from '../../components/profile-card/ProfileInfoForPc';
import {fetchUser, fetchReviews, fetchAdvertisements, deleteAdvertisement} from '../../services/ProfileService';
import ProfileInfoForMobile from '../../components/profile-card/ProfileInfoForMobile';
import ModalForNumberReports from '../../components/profile-card/ModalForNumberReports';
import {Button, Carousel, Empty, Tabs, Card, Dropdown, Menu, Modal} from 'antd';
import {NavBarLogout} from '../../components/Navbar/NavBarLogout';
import {EditOutlined, EllipsisOutlined} from '@ant-design/icons';

export const Profile = () => {
    const {i18n} = useTranslation();
    const {t} = useTranslation();
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reviews, setReviews] = useState([]);
    const [advertisment, setAdvertisements] = useState([]);
    const {TabPane} = Tabs;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDeleteClick = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleMenuClick = (e) => {
        // Обработка клика по элементу меню
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" onClick={handleDeleteClick}>Удалить</Menu.Item>
        </Menu>
    );

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            const user = await fetchUser(userId);
            const {reviews, feedbackCount} = await fetchReviews(userId);
            const advertisements = await fetchAdvertisements(userId);
            setUser({...user, reviewCount: feedbackCount});
            setReviews(reviews);
            setAdvertisements(advertisements);
        };

        fetchData();
    }, []);

    return (
        <div>

            <MyNavbar/>
            <div className={styles.bodyStyle}>
                <Container id="info" className="d-none d-lg-block mt-3">
                    <Row>
                        <ProfileCardForPc user={user} handleShow={handleShow}/>
                        <Col xs={9}>
                            <Container className="album mt-3">
                                <Tabs defaultActiveKey="1" type="card">
                                    <TabPane tab="Мои объявления" key="1">
                                        <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                            {advertisment.length > 0 ? (
                                                advertisment.map((advertisment) => (
                                                    <Col key={advertisment.id}>
                                                        <Card
                                                            hoverable
                                                            actions={[
                                                                <EditOutlined key="edit"/>,
                                                                <Dropdown
                                                                    overlay={menu}
                                                                    visible={dropdownVisible}
                                                                    onVisibleChange={setDropdownVisible}
                                                                >
                                                                    <EllipsisOutlined onClick={() => setDropdownVisible(!dropdownVisible)} />
                                                                </Dropdown>,
                                                                <Modal
                                                                    title="Удаление"
                                                                    visible={modalVisible}
                                                                    onCancel={handleModalClose}
                                                                    footer={[
                                                                        <Button key="back" onClick={handleModalClose}>
                                                                            Отмена
                                                                        </Button>,
                                                                        <Button key="submit" type="primary" onClick={() => {
                                                                            deleteAdvertisement(advertisment.id);
                                                                            setModalVisible(false);
                                                                        }}>
                                                                            Удалить
                                                                        </Button>,
                                                                    ]}
                                                                >
                                                                    Вы уверены, что хотите удалить этот элемент?
                                                                </Modal>
                                                            ]}
                                                            cover={
                                                                <Link to={`/advertisment/${advertisment.id}`}
                                                                      style={{textDecoration: "none"}}>
                                                                    <Carousel>
                                                                        {(
                                                                            advertisment.photoUrls.map((url, index) => (
                                                                                <div className={styles.carousel}
                                                                                     key={index}>
                                                                                    <img
                                                                                        className={styles.imageCarousel}
                                                                                        alt="example"
                                                                                        src={url || Logo}/>
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </Carousel>
                                                                </Link>
                                                            }
                                                        >
                                                            <div className={styles.cardContext}>
                                                                <Link to={`/advertisment/${advertisment.id}`}>
                                                                    <Card.Meta title={advertisment.title}/>
                                                                    <h5 style={{color: 'grey'}}>{advertisment.price + '€'}</h5>
                                                                    <p className={styles.textLocation}>
                                                                        {advertisment.location}
                                                                    </p>
                                                                    <p className={styles.date}>
                                                                        {advertisment.time_creation && advertisment.time_creation.seconds ?
                                                                            new Date(advertisment.time_creation.seconds * 1000).toLocaleString(i18n.language, {
                                                                                day: 'numeric',
                                                                                month: 'long',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            }) : 'Не указано время создания'
                                                                        }
                                                                    </p>
                                                                </Link>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                ))
                                            ) : (
                                                <div>
                                                    <Empty
                                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                        imageStyle={{
                                                            height: 60,
                                                        }}
                                                        description={
                                                            <span>Тут будут ваши объявления</span>
                                                        }
                                                    >
                                                        <Button type="primary">Создать объявление</Button>
                                                    </Empty>
                                                </div>
                                            )}
                                        </Row>
                                    </TabPane>
                                    <TabPane tab="Архив" key="2">
                                        {/* Здесь разместите код для отображения архива */}
                                    </TabPane>
                                </Tabs>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <NavBarLogout/>

                <Container className="d-lg-none">
                    <ProfileInfoForMobile user={user} handleShow={handleShow}/>
                    <Row>
                        <Container className="album mt-3">
                            <Tabs defaultActiveKey="1" type="card">
                                <TabPane tab="Мои объявления" key="1">
                                    <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                        {advertisment.length > 0 ? (
                                            advertisment.map((advertisment) => (
                                                <Col key={advertisment.id}>
                                                    <Card
                                                        hoverable
                                                        actions={[

                                                            <EditOutlined key="edit"/>,
                                                            <EllipsisOutlined key="ellipsis"/>,
                                                        ]}
                                                        cover={
                                                            <Link to={`/advertisment/${advertisment.id}`}
                                                                  style={{textDecoration: "none"}}>
                                                                <Carousel>
                                                                    {(
                                                                        advertisment.photoUrls.map((url, index) => (
                                                                            <div className={styles.carousel}
                                                                                 key={index}>
                                                                                <img className={styles.imageCarousel}
                                                                                     alt="example" src={url || Logo}/>
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                </Carousel>
                                                            </Link>
                                                        }
                                                    >
                                                        <div className={styles.cardContext}>
                                                            <Link to={`/advertisment/${advertisment.id}`}>
                                                                <Card.Meta title={advertisment.title}/>
                                                                <h5 style={{color: 'grey'}}>{advertisment.price + '€'}</h5>
                                                                <p className={styles.textLocation}>
                                                                    {advertisment.location}
                                                                </p>
                                                                <p className={styles.date}>
                                                                    {advertisment.time_creation && advertisment.time_creation.seconds ?
                                                                        new Date(advertisment.time_creation.seconds * 1000).toLocaleString(i18n.language, {
                                                                            day: 'numeric',
                                                                            month: 'long',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        }) : 'Не указано время создания'
                                                                    }
                                                                </p>
                                                            </Link>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))
                                        ) : (
                                            <div className={styles.emptyMobile}>
                                                <Empty
                                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                    imageStyle={{
                                                        height: 60,
                                                    }}
                                                    description={
                                                        <span>Тут будут ваши объявления</span>
                                                    }
                                                >
                                                    <Button type="primary">Создать объявление</Button>
                                                </Empty>
                                            </div>
                                        )}
                                    </Row>
                                </TabPane>
                                <TabPane tab="Архив" key="2">
                                    {/* Здесь разместите код для отображения архива */}
                                </TabPane>
                            </Tabs>
                        </Container>
                    </Row>
                </Container>
            </div>

            <ModalForNumberReports show={show} handleClose={handleClose} reviews={reviews}/>

        </div>
    );
}