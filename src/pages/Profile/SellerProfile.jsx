import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Logo from "../../assets/logo_def.png";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { NavBarBack } from "../../components/Navbar/NavBarBack";
import { useParams, useHistory } from "react-router-dom";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { Rate, Modal, Input, Button, message } from 'antd'
import { useTranslation } from 'react-i18next';
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";

const SellerProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const history = useHistory();
  const from_uid = auth.currentUser ? auth.currentUser.uid : null;
  const [userMe, setUserMe] = useState(null);

  useEffect(() => {
    const fetchUserAndAds = async () => {
      const qUser = query(collection(db, "users"), where("id", "==", id));
      const userSnapshot = await getDocs(qUser);
      if (!userSnapshot.empty) {
        setUser(userSnapshot.docs[0].data());
      } else {
        console.log("No such user!");
      }

      const qAds = query(
        collection(db, "advertisment"),
        where("from_uid", "==", id)
        // ,where("in_arhive", "==", false),
      );
      const adsSnapshot = await getDocs(qAds);
      if (!adsSnapshot.empty) {
        setAds(adsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } else {
        console.log("No such ads!");
      }
    };

    fetchUserAndAds();
  }, [id]);


  const aStyle = {
    textDecoration: "none",
  };

  const [feedbacks, setFeedbacks] = useState([]);
  const rat = user?.rating || user?.raiting;
  const { id: userId } = useParams();

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
    if (!from_uid) {
      console.log('from_uid is not defined yet');
      return;
    }
  
    console.log('from_uid:', from_uid);
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
  };
  
  useEffect(() => {
    fetchUserMe();
  }, [from_uid]);

  const fetchUserData = async (userId) => {
    const userQuery = query(
      collection(db, 'users'),
      where('id', '==', userId)
    );
    const userSnapshot = await getDocs(userQuery);
  
    if (!userSnapshot.empty) {
      return userSnapshot.docs[0].data();
    } else {
      console.log('No such user!');
      return null;
    }
  };

  const createChat = async () => {
    const userData = await fetchUserData(userId);
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
  };

  const handleButtonWrite = async () => {
    const chatId = await createChat();
    history.push(`/message/${chatId}`);
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
    <div>
      <style type="text/css">
        {`
                .profile-sections a {
                    display: block;
                    margin-bottom: 10px;
                    text-decoration: none;
                    color: black;
                  }
              
                  .profile-picture img {
                      border-radius: 50%;
                      width: 100px;
                      height: 100px;
                  }
                  @media (max-width: 1000px) {
                      body {
                          padding-bottom: 5.5rem;
                          padding-top: 3.5rem;
                      }
                      .imageAdvertisment {
                        width: 100%;
                        height: 150px;
                        object-fit: cover;
                      }
                      .card {
                        height: 320px;
                        }
                  }
                  @media (min-width: 1000px) {
                    body {
                      padding-bottom: 3.5rem;
                      padding-top: 4.5rem;
                      }
                      .imageAdvertisment {
                        width: 100%;
                        height: 220px;
                        object-fit: cover;
                    }
                    .card {
                        height: 400px;
                        }
                  }
                  .location-text {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .date-text {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;  
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .date-text {
                    color: #888888; /* Замените на цвет, который вы хотите использовать */
                }
                .col .img-fluid {
                    border: 1px solid rgb(200, 200, 200);
                    border-radius: 10px;
                }
                `}
      </style>

      <MyNavbar />

      <NavBarBack />

      <Container id="info" className="d-none d-lg-block mt-3">
        <Row>
          <Col xs={3} className="profile">
            <div className="profile-picture">
              {user && (
                <Image
                  src={user.photoUrl || Logo}
                  alt="photoProfile"
                  id="userPhoto"
                />
              )}
            </div>
            {user && (
              <h2 className="profile-name" id="userName">
                {user.name}
              </h2>
            )}
            {user && (
              <>
                <div className="profile-reviews">
                  <span className="me-2">{rat.toFixed(1) || '0.0'}</span>
                  <Rate disabled defaultValue={rat} />
                </div>
                <p style={{color: '#03989F'}} onClick={showModalFee}>{t('show_feedbacks')}</p>
                <Button type="primary" onClick={handleButtonWrite} style={{ backgroundColor: '#FFBF34' }}>{t('to_write')}</Button>
              </>
            )}
          </Col>
          <Col xs={9}>
            <Container className="album mt-3">
              <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                {user &&
                  ads &&
                  ads.map((advertisment, index) => (
                    <CardAdvertisementHome key={index} advertisment={advertisment} />
                  ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <Container className="d-lg-none">
        <Row className="text-center">
          <Col>
            <div className="profile-picture my-3">
              <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
            </div>
            <h2 className="profile-name" id="userName">{user?.name}</h2>
            {user && (
              <>
                <div className="profile-reviews">
                  <span className="me-2">{rat.toFixed(1) || '0.0'}</span>
                  <Rate disabled defaultValue={rat} />
                </div>
                <p style={{color: '#03989F'}} onClick={showModalFee}>{t('show_feedbacks')}</p>
                <Button type="primary" onClick={handleButtonWrite} style={{ backgroundColor: '#FFBF34' }}>{t('to_write')}</Button>
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
              </>
            )}
            <p>{user?.description}</p>
            <div className="profile-sections">
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="album mt-3">
              <Row xs={2} sm={2} className="g-3" id="cardAds">
                {user &&
                  ads &&
                  ads.map((advertisment, index) => (
                    <CardAdvertisementHome key={index} advertisment={advertisment} />
                  ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SellerProfile;
