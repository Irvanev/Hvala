// CardItemComponent.jsx
import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import CharactersForCard from './CharactersForCard';
import ModalForNumberPhone from './ModalForNumberPhone';
import { Link, useHistory } from 'react-router-dom';
import Logo from "../../assets/logo_def.png"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db, auth } from '../../config/firebase'
import { Modal, Input, Button, message, Breadcrumb, Rate, Image } from "antd";



const CardInPc = ({ adData, t, index, handleSelect, handleCallClick, showModal, handleCloseModal, userData, fromUid }) => {

  const [feedbacks, setFeedbacks] = useState([]);
  const rat = userData?.rating || userData?.raiting;
  const userId = userData?.id
  const from_uid = auth.currentUser ? auth.currentUser.uid : null;
  const history = useHistory();
  const [userMe, setUserMe] = useState(null);

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

  const fetchUserMe = async () => { 
    const userQuery = query(
      collection(db, 'users'),
      where('id', '==', from_uid)
    );
    const userSnapshot = await getDocs(userQuery);
    
    if (!userSnapshot.empty) {
      userSnapshot.forEach((doc) => {
        setUserMe(doc.data());
      });
    } else {
      console.log('No such user!');
    }
  }


  const createChat = async () => {
    const chatsQuery = query(
      collection(db, 'message'),
      where('from_uid', '==', from_uid),
      where('to_uid', '==', userId)
    );
    const chatsSnapshot = await getDocs(chatsQuery);

    let chatId;
    if (chatsSnapshot.empty) {
      const chatDoc = await addDoc(collection(db, 'message'), {
        from_name: userMe?.name,
        from_uid: from_uid,
        from_avatar: userMe?.photoUrl,
        last_msg: '',
        last_time: serverTimestamp(),
        to_avatar: userData?.photoUrl,
        to_name: userData?.name,
        to_uid: userId,
      });
      

      chatId = chatDoc.id;
    } else {
      chatId = chatsSnapshot.docs[0].id;
    }

    return chatId;
  }

  const handleButtonWrite = async () => {
    if (from_uid===null) {
      history.push('/sign_in');
    } else {
      const chatId = await createChat();
      history.push(`/message/${chatId}`);
    }
  }


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
      fetchUserMe();
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
        message.error(t('error_set_feedback'));
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
      message.success(t('success_set_feedback'));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


  const profileImage = {
    width: "60px",
    height: "60px",
  };

  const productPhone = {
    backgroundColor: "#FFBF34",
    color: "white",
    border: "none",
  };

  return (
    <Container className="mt-3 d-none d-lg-block">
      <Row>
        <Col xs={6}>
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
          <h2 id="product-title">{adData?.title}</h2>
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
                    style={{ objectFit: 'contain', maxWidth: "100%", height: '400px' }}
                    onClick={() => handleSelect(index)}
                    src={url}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <Row className="mt-3">
            {adData?.photoUrls.map((url, index) => (
              <Col xs={4} md={2} key={index}>
                <Image
                  width={100}
                  height={100}
                  style={{ objectFit: 'contain' }}
                  onClick={() => handleSelect(index)}
                  src={url}
                  alt={`Slide ${index + 1}`}
                  preview={false}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <div className="col-3" style={{ paddingTop: "40px" }}>
          <h2 id="product-price">{adData?.price + "€"}</h2>
          <a
            id="product-phone"
            onClick={handleCallClick}
            className="btn d-block mb-3"
            style={productPhone}
          >
            {t('call')}
          </a>
          <a
            id="product-phone"
            className="btn d-block mb-3"
            style={productPhone}
            onClick={handleButtonWrite}
          >
            {t('to_write')}
          </a>
          <div
            className="d-flex justify-content-between mt-3"
            id="seller-info"
          ></div>
          <div className="d-flex justify-content-between mt-3">
            <div>
              <Link to={`/seller/${userData?.id}`} style={{ textDecoration: 'none' }}>
                <h5 className="mb-0">{userData?.name || 'User'}</h5>
              </Link>
              <div className="d-flex align-items-center">
                <span className="me-2">{userData?.rating || userData?.raiting}</span>
                <Rate disabled defaultValue={rat} />
              </div>
              <p onClick={showModalFee}>{t('show_feedbacks')}</p>

              <Modal title={t('reviewsForProfile')} open={isModalVisible} onCancel={handleCancel} footer={null}>
                {feedbacks.map((feedback, index) => (
                  <div key={index}>
                    <h5 className='mt-3'>{new Date(feedback.time_creation?.seconds * 1000).toLocaleDateString()}</h5>
                    <h5>{t('comment_from')} {feedback.userName}</h5>
                    <p>{feedback.description} <Rate disabled defaultValue={feedback.rating} /></p>
                  </div>
                ))}

                {!isReviewFormVisible && (
                  <Button className='mt-3'
                    type="primary" onClick={toggleReviewForm}>{t('set_feedback')}</Button>
                )}

                {isReviewFormVisible && (
                  <>
                    <Input.TextArea
                      className='mt-3'
                      rows={4}
                      value={reviewText}
                      onChange={handleReviewChange}
                      placeholder={t('input_feedback')}
                    />
                    <Rate className='mt-3' value={rating} onChange={handleRatingChange} />
                    <Button type="primary" onClick={submitReview}>{t('send_feedback')}</Button>
                  </>
                )}
              </Modal>

            </div>
            <Link to={`/seller/${userData?.id}`} style={{ textDecoration: 'none' }}>
              <img
                src={userData?.photoUrl || Logo}
                alt="Seller Image"
                className="rounded-circle"
                style={profileImage}
              />
            </Link>
          </div>
        </div>
        <ModalForNumberPhone adData={adData} showModal={showModal} handleCloseModal={handleCloseModal} />
      </Row>
      <CharactersForCard adData={adData} t={t} />
    </Container>
  );
}

export default CardInPc;