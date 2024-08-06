import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Logo from "../../assets/logo_def.png"
import { Rate } from 'antd';
import styles from './profileInfo.module.css'
import { useTranslation } from "react-i18next";

const ProfileInfoForMobile = ({ user, handleShow }) => {
    const { t } = useTranslation();
    const rat = user?.rating

    function getReviewText(count) {
        if (count === 0) return t('noReviews');
        if (count === 1) return t('oneReview');
        if (count > 1 && count < 5) return `${count} ${t('multipleReviews')}`;
        return `${count} ${t('reviews')}`;
    }

    return (
        <Row className='text-center'>
            <Col>
                <div className={styles.profilePicture}>
                    <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
                </div>
                <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                <div className="profile-reviews">

                    <span>{user?.rating.toFixed(1) || '0.0'}</span>
                    {rat && <Rate disabled defaultValue={rat} />}
                    <a onClick={handleShow} style={{ cursor: 'pointer' }}>
                        <p >{getReviewText(user?.reviewCount || 0)}</p>
                    </a>
                </div>
                <div className={styles.profileSections}>
                    <a href="/settings">{t('settings')}</a>
                    <a href="/message">{t('message_navbar')}</a>
                </div>
            </Col>
        </Row>
    );
}

export default ProfileInfoForMobile;