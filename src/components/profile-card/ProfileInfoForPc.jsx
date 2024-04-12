import React from "react";
import { Col, Image } from "react-bootstrap";
import Logo from "../../assets/logo.png"
import star from "../../assets/star.png";
import {useTranslation} from 'react-i18next';
import halfStar from "../../assets/rating2.png";
import emptyStar from "../../assets/star2.png";

const ProfileInfoForPc = ({user, handleShow}) => {
    const {t} = useTranslation();

    function getReviewText(count) {
        if (count === 0) return t('noReviews');
        if (count === 1) return t('oneReview');
        if (count > 1 && count < 5) return `${count} ${t('multipleReviews')}`;
        return `${count} ${t('reviews')}`;
    }

    const stars = Array(5).fill(null).map((_, index) => {
        if (user?.rating > index) {
            if (user?.rating > index + 0.5) {
                return <img src={star} alt="star" width="20" height="20" />;
            } else {
                return <img src={halfStar} alt="half star" width="20" height="20" />;
            }
        } else {
            return <img src={emptyStar} alt="empty star" width="20" height="20" />;
        }
    });

    return (
        <Col xs={3} className="profile">
            <div className="profile-picture">
                <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" />
            </div>
            <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
            <div className="profile-reviews d-flex align-items-center">
                <span className="me-2">{user?.rating.toFixed(1) || '0.0'}</span>
                {stars}
            </div>
            <a onClick={handleShow} style={{ cursor: 'pointer' }}>
                <h4>{getReviewText(user?.reviewCount || 0)}</h4>
            </a>
            <div className="profile-sections">
                <a href="/settings">{t('settings')}</a>
                <a href="/message">{t('messageForProfile')}</a>
            </div>
        </Col>
    );
}

export default ProfileInfoForPc;