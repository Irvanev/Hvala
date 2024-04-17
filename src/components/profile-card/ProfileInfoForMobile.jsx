import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import Logo from "../../assets/logo.png"
import { Rate } from 'antd';

const ProfileInfoForMobile = ({ user }) => {

    const rat = user?.rating

    return (
        <Row className='text-center'>
            <Col>
                <div className="profile-picture my-3">
                    <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
                </div>
                <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                <div className="profile-reviews">

                    <span>{user?.rating.toFixed(1) || '0.0'}</span>
                    {rat && <Rate disabled defaultValue={rat} />}
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