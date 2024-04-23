import React from "react";
import { Col, Image } from "react-bootstrap";
import Logo from "../../assets/logo.png"
import { useTranslation } from 'react-i18next';
import { Rate } from 'antd';
import styles from './profileInfo.module.css'

const ProfileInfoForPc = ({ user, handleShow }) => {
    const { t } = useTranslation();
    const rat = user?.rating || user?.raiting;

    function getReviewText(count) {
        if (count === 0) return t('noReviews');
        if (count === 1) return t('oneReview');
        if (count > 1 && count < 5) return `${count} ${t('multipleReviews')}`;
        return `${count} ${t('reviews')}`;
    }

    return (
        <Col xs={3} className="profile">
            <div className={styles.profilePicture}>
                <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" />
            </div>
            <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
            <div className="profile-reviews d-flex align-items-center">
                <span className="me-2">{user?.rating.toFixed(1) || '0.0'}</span>
                {rat && <Rate disabled defaultValue={rat} />}
            </div>
            <a onClick={handleShow} style={{ cursor: 'pointer' }}>
                <p >{getReviewText(user?.reviewCount || 0)}</p>
            </a>
            <div className={styles.profileSections}>
                <a href="/settings">{t('settings')}</a>
                <a href="/message">{t('messageForProfile')}</a>
            </div>
        </Col>
    );
}

export default ProfileInfoForPc;