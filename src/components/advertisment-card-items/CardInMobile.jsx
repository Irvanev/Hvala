import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CharactersForCard from './CharactersForCard';
import Logo from '../../assets/logo.png'
import { Rate, Breadcrumb, message, Modal, Input, Image } from "antd";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../config/firebase'

const CardInMobile = ({ adData, t, index, handleSelect, handleCallClick, userData }) => {

    const [feedbacks, setFeedbacks] = useState([]);
    const rat = userData?.rating
    const userId = userData?.id

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModalFee = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

    const toggleReviewForm = () => {
        setIsReviewFormVisible(!isReviewFormVisible);
    };

    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };


    useEffect(() => {
        const fetchFeedbacks = async () => {
            const q = query(collection(db, "feedback"), where("to_uid", "==", userId));
            const querySnapshot = await getDocs(q);

            const feedbacks = await Promise.all(
                querySnapshot.docs.map(async doc => {
                    const feedback = doc.data();
                    const userQuery = query(collection(db, "users"), where("id", "==", feedback.from_uid));
                    const userSnapshot = await getDocs(userQuery);
                    const user = userSnapshot.docs[0]?.data();

                    return { id: doc.id, ...feedback, userName: user?.name };
                })
            );

            setFeedbacks(feedbacks);
        };

        fetchFeedbacks();
    }, [userId]);

    const submitReview = async () => {
        try {
            const me = auth.currentUser ? auth.currentUser.uid : null;

            // Проверьте, существует ли уже отзыв от этого пользователя
            const q = query(collection(db, "feedback"), where("from_uid", "==", me), where("to_uid", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                message.error("Вы уже оставили отзыв этому пользователю");
                return;
            }

            await addDoc(collection(db, "feedback"), {
                description: reviewText,
                rating: rating,
                to_uid: userId,
                time_creation: serverTimestamp(),
                from_uid: me
            });

            setReviewText("");
            setRating(1);
            setIsReviewFormVisible(false);
            message.success("Отзыв добавлен");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <Container className="d-lg-none">
            <Breadcrumb
                items={[
                    {
                        title: <a href="/advertisment">{t('home_navbar')}</a>,
                    },
                    {
                        title: <a href={`/advertisments/${adData?.category}`}>{t(adData?.category)}</a>,
                    },
                    {
                        title: t(adData?.subcategory),
                    },
                ]}
            />
            <div className="product-card">
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {adData?.photoUrls.map((url, index) => (
                        <Carousel.Item key={index}>
                            <div
                                style={{
                                    backgroundColor: "#dcdcdc",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    className="d-block"
                                    src={url}
                                    alt={`Slide ${index + 1}`}
                                    style={{ maxWidth: "100%", objectFit: "contain", maxHeight: "400px" }}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Row className="mt-3">
                    {adData?.photoUrls.map((url, index) => (
                        <Col xs={3} md={2} key={index} className="mt-3">
                            <img
                                style={{ objectFit: "contain", height: "70px", width: "70px" }}
                                src={url}
                                alt={`Slide ${index + 1}`}
                                onClick={() => handleSelect(index)}
                                thumbnail
                            />
                        </Col>
                    ))}
                </Row>
                <h2 className="product-title mt-3"><strong>{adData?.price + "€"}</strong></h2>
                <h5 className="product-title" style={{ color: "grey" }}>{adData?.title}</h5>
                <Container>
                    <Row className="d-flex justify-content-center align-items-center mt-3">
                        <a
                            id="product-phone"
                            onClick={handleCallClick}
                            className="btn d-block flex-grow-1 mb-3"
                            style={{ backgroundColor: "orange", color: "white" }}
                        >
                            {t('call')}
                        </a>
                        <a
                            id="product-write"
                            href=""
                            className="btn d-block flex-grow-1 mb-3"
                            style={{ backgroundColor: "orange", color: "white" }}
                        >
                            {t('to_write')}
                        </a>
                    </Row>
                </Container>
                <CharactersForCard adData={adData} t={t} />
                <Row className="d-flex justify-content-between align-items-center mt-3">
                    <Col>
                        <Link to={`/seller/${userData?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h5 className="mb-0">{userData?.name || "User"}</h5>
                            <div className="d-flex align-items-center">
                                <span className="me-2">{userData?.rating.toFixed(1) || '0'}</span>
                                <Rate disabled defaultValue={rat} />
                            </div>
                        </Link>
                        <p onClick={showModalFee}>Посмотреть отзывы</p>

                        <Modal title="Отзывы" open={isModalVisible} onCancel={handleCancel} footer={null}>
                            {feedbacks.map((feedback, index) => (
                                <div key={index}>
                                    <h5 className='mt-3'>{new Date(feedback.time_creation?.seconds * 1000).toLocaleDateString()}</h5>
                                    <h5>Комментарий от {feedback.userName}</h5>
                                    <p>{feedback.description} <Rate disabled defaultValue={feedback.rating} /></p>
                                </div>
                            ))}

                            {!isReviewFormVisible && (
                                <Button className='mt-3'
                                    type="primary" onClick={toggleReviewForm}>Оставить отзыв</Button>
                            )}

                            {isReviewFormVisible && (
                                <>
                                    <Input.TextArea
                                        className='mt-3'
                                        rows={4}
                                        value={reviewText}
                                        onChange={handleReviewChange}
                                        placeholder="Введите ваш отзыв здесь..."
                                    />
                                    <Rate className='mt-3' value={rating} onChange={handleRatingChange} />
                                    <Button type="primary" onClick={submitReview}>Отправить отзыв</Button>
                                </>
                            )}
                        </Modal>

                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Image
                            src={userData?.photoUrl || Logo}
                            alt="Seller Image"
                            roundedCircle
                            style={{ width: "60px", height: "60px" }}
                        />
                    </Col>
                </Row>
            </div>
        </Container >
    );
}

export default CardInMobile;