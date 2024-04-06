import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Logo from "../../assets/logo.png"
import star from "../../assets/star.png";
import halfStar from "../../assets/rating2.png";
import emptyStar from "../../assets/star2.png";

const ProfileInfoForMobile = ({ user }) => {

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
        <Row className='text-center'>
            <Col>
                <div className="profile-picture my-3">
                    <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
                </div>
                <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                <div className="profile-reviews">
                    <span>{user?.rating.toFixed(1) || '0.0'}</span>
                    {stars}
                    <p id="kolRating">{user?.reviewCount || '17'} Отзывов</p>
                </div>
                <div className="profile-sections">
                    <a href="/settings">Настройки</a>
                    <a href="/message">Сообщения</a>
                </div>
            </Col>
        </Row>
    );
}

export default ProfileInfoForMobile;