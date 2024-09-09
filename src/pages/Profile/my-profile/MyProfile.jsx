import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from './my-profile.module.css';

import { MyNavbar } from "../../../components/Navbar/Navbar";
import { NavBarLogout } from "../../../components/Navbar/NavBarLogout";
import OrangeButton from "../../../components/buttons/orange-button/OrangeButton";

import photoProfile from "../../../assets/person2.jpg";

import { Rate, Spin, Tabs, Empty, Modal, Badge } from "antd";

import { fetchUserProfile, fetchUserAdvertisment, fetchUserFeedback, fetchUserAdvertismentArchive } from "../../../services/profile/Profile";
import CustomCard from "../../../components/card/CustomCard";

const { TabPane } = Tabs;

const MyProfile = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [advertisment, setAdvertisment] = useState([]);
    const [advertismentArchive, setAdvertismentArchive] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalFeedbackOpen, setIsModalFeedbackOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("active");

    const showFeedbackModal = () => {
        setIsModalFeedbackOpen(true);
    };

    const handleFeedbackCancel = () => {
        setIsModalFeedbackOpen(false);
    };


    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchUserProfile(setUser, setLoading);
            await fetchUserAdvertisment(setAdvertisment, setLoading);
            await fetchUserAdvertismentArchive(setAdvertismentArchive, setLoading);
            await fetchUserFeedback(setFeedback, setLoading);
        };

        loadData();
    }, []);

    if (loading) {
        return <Spin size="large" className={styles.spinner} />;
    }

    const handleEditButtonClick = () => {
        history.push("/settings");
    }

    return (
        <>
            <MyNavbar />
            <NavBarLogout />
            <div className={styles.container}>
                <div className={styles.profileInfo}>
                    <img src={user?.photoUrl || photoProfile} alt="user" className={styles.profileImage} />
                    <h2 className={styles.profileName}>{user?.name || 'User'}</h2>
                    <div className={styles.ratingContainer}>
                        {(user?.rating ?? user?.raiting) > 0 && (
                            <span className={styles.ratingValue}>{user?.rating ?? user?.raiting}</span>
                        )}
                        <Rate allowHalf disabled defaultValue={user?.rating ?? user?.raiting} />
                    </div>
                    <a
                        className={`${styles.reviews} ${feedback.length === 0 ? styles.inactive : ''}`}
                        onClick={feedback.length > 0 ? showFeedbackModal : null}
                    >
                        {feedback.length > 0 ? `${feedback.length} ${t('reviews')}` : t('noReviews')}
                    </a>
                    <OrangeButton onClick={handleEditButtonClick} width='200px' height='40px' title={t('edit_profile')} />
                </div>
                <Tabs defaultActiveKey="active" onChange={setActiveTab}>
                    <TabPane
                        tab={
                            <Badge count={advertisment.length} color="#FFBF34" offset={[10, 0]}>
                                <span style={{ fontSize: '0.8rem' }}>{t('current_ads')}</span>
                            </Badge>
                        }
                        key="active"
                    >
                        <div className={styles.profileCards}>
                            {advertisment.length > 0 ? (
                                advertisment.map((advertisment, index) => (
                                    <CustomCard
                                        id={advertisment.id}
                                        key={index}
                                        user={user}
                                        images={advertisment.photoUrls}
                                        price={advertisment.price}
                                        currency={advertisment.currency}
                                        title={advertisment.title}
                                        location={advertisment.location}
                                        date={advertisment.time_creation}
                                        showButtons={true}
                                        status="active"
                                    />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <Badge count={advertismentArchive.length} color="#FFBF34" offset={[10, 0]}>
                                <span style={{ fontSize: '0.8rem' }}>{t('archive_adsv')}</span>
                            </Badge>
                        }
                        key="archived"
                    >
                        <div className={styles.profileCards}>
                            {advertismentArchive.length > 0 ? (
                                advertismentArchive.map((advertismentArchive, index) => (
                                    <CustomCard
                                        id={advertismentArchive.id}
                                        key={index}
                                        user={user}
                                        images={advertismentArchive.photoUrls}
                                        price={advertismentArchive.price}
                                        currency={advertismentArchive.currency}
                                        title={advertismentArchive.title}
                                        location={advertismentArchive.location}
                                        date={advertismentArchive.time_creation}
                                        showButtons={true}
                                        status="archived"
                                    />
                                ))
                            ) : (
                                <Empty />
                            )}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            <Modal title="Feedbacks" open={isModalFeedbackOpen} onCancel={handleFeedbackCancel} footer={null}>
                {feedback.map((fb, index) => (
                    <article key={index}>
                        <div className="flex">
                            <img className="w-10 h-10 me-4 rounded-full" src={fb.fromUser?.photoUrl || photoProfile} alt={fb.fromUser?.name || "Пользователь"} />
                            <div className="font-medium dark:text-white me-4">
                                <p>{fb.fromUser?.name}  <time dateTime={fb.time_creation.toDate().toISOString()} className="block text-sm text-gray-500 dark:text-gray-400">
                                    {fb.time_creation.toDate().toLocaleDateString()}
                                </time></p>
                            </div>
                            <Rate className="" allowHalf disabled defaultValue={fb.rating} />
                        </div>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">{fb.description}</p>
                    </article>
                ))}
            </Modal>
        </>
    );
}

export default MyProfile;