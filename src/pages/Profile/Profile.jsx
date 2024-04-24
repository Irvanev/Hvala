import React, { useEffect, useState } from "react";
import styles from './profile.module.css'

import { Container, Row, Col } from 'react-bootstrap';
import { MyNavbar } from '../../components/Navbar/Navbar';
import { useTranslation } from 'react-i18next';
import ProfileCardForPc from '../../components/profile-card/ProfileInfoForPc';
import { fetchUser, fetchReviews, fetchAdvertisements, fetchAdvertismentsArchive } from '../../services/ProfileService';
import ProfileInfoForMobile from '../../components/profile-card/ProfileInfoForMobile';
import ModalForNumberReports from '../../components/profile-card/ModalForNumberReports';
import { Button, Empty, Tabs, Badge, Space } from 'antd';
import { NavBarLogout } from '../../components/Navbar/NavBarLogout';
import CardAdvertisementProfile from '../../components/profile-card/CardAdvertismentProfile'
import CardAdvertisementProfileArchive from "../../components/profile-card/CardAdvertismentArchive";
import CardAdvertisementProfileMobile from "../../components/profile-card/CardAdvertismentProfileMobile";
import CardAdvertisementProfileArchiveMobile from "../../components/profile-card/CardAdvertismentArchiveMobile";

export const Profile = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [reviews, setReviews] = useState([]);
    const [advertisment, setAdvertisements] = useState([]);
    const [advertismentArchive, setAdvertisementsArchive] = useState([]);
    const { TabPane } = Tabs;


    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            const user = await fetchUser(userId);
            const { reviews, feedbackCount } = await fetchReviews(userId);
            const advertisements = await fetchAdvertisements(userId);
            const archive = await fetchAdvertismentsArchive(userId);
            setUser({ ...user, reviewCount: feedbackCount });
            setReviews(reviews);
            setAdvertisements(advertisements);
            setAdvertisementsArchive(archive);
        };
        fetchData();
    }, [advertisment]);

    return (
        <div>

            <MyNavbar />
            <div className={styles.bodyStyle}>
                <Container id="info" className="d-none d-lg-block mt-3">
                    <Row>
                        <ProfileCardForPc user={user} handleShow={handleShow} />
                        <Col xs={9}>
                            <Container className="album mt-3">
                                <Tabs defaultActiveKey="1" type="card">
                                    <TabPane
                                        tab={
                                            <Space>
                                                {advertisment.length > 0 && <Badge color="orange" count={advertisment.length} />}
                                                Мои объявления
                                            </Space>
                                        }
                                        key="1"
                                    >
                                        <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                            {advertisment.length > 0 ? (
                                                advertisment.map((advertisment, index) => (
                                                    <CardAdvertisementProfile key={index} advertisment={advertisment} />
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
                                    <TabPane
                                        tab={
                                            <Space>
                                                {advertismentArchive.length > 0 && <Badge color="orange" count={advertismentArchive.length} />}
                                                Архив
                                            </Space>
                                        }
                                        key="2"
                                    >
                                        <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
                                            {advertismentArchive.length > 0 ? (
                                                advertismentArchive.map((advertismentArchive, index) => (
                                                    <CardAdvertisementProfileArchive key={index} advertismentArchive={advertismentArchive} />
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
                                </Tabs>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <NavBarLogout />

                <Container className="d-lg-none">
                    <ProfileInfoForMobile user={user} handleShow={handleShow} />
                    <Row>
                        <Container className="album mt-3">
                            <Tabs defaultActiveKey="1" type="card">
                                <TabPane
                                    tab={
                                        <Space>
                                            {advertisment.length > 0 && <Badge color="orange" count={advertisment.length} />}
                                            Мои объявления
                                        </Space>
                                    }
                                    key="1"
                                >
                                    <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                        {advertisment.length > 0 ? (
                                            advertisment.map((advertisment, index) => (
                                                <CardAdvertisementProfileMobile key={index} advertisment={advertisment} />
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
                                <TabPane
                                        tab={
                                            <Space>
                                                {advertismentArchive.length > 0 && <Badge color="orange" count={advertismentArchive.length} />}
                                                Архив
                                            </Space>
                                        }
                                        key="2"
                                    >
                                    <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                                        {(advertismentArchive.map((advertismentArchive, index) => (
                                            <CardAdvertisementProfileArchiveMobile key={index} advertismentArchive={advertismentArchive} />
                                        )))}
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Container>
                    </Row>
                </Container>
            </div>

            <ModalForNumberReports show={show} handleClose={handleClose} reviews={reviews} />

        </div>
    );
}