import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Helmet } from "react-helmet";
import Logo from "../../assets/person2.jpg";
import { MyNavbar } from "../../components/Navbar/Navbar";
import CustomCard from "../../components/card/CustomCard";
import { NavBarShare } from "../../components/Navbar/NavBarShare";
import { useParams, useHistory } from "react-router-dom";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { Rate, Modal, Input, Button, message, Card, Flex } from 'antd'
import { useTranslation } from 'react-i18next';
import CardAdvertisementHome from "../../components/card-advertisment-home/CardAdvertisementHome";

import OrangeButton from "../../components/buttons/orange-button/OrangeButton";
import BlueButton from "../../components/buttons/blue-button/BlueButton";
import InputSearch from "../../components/input-search/InputSearch";
import CustomDropdown from "../../components/dropdown/CustomDropdown";
import { FacebookOutlined, GlobalOutlined, InstagramOutlined, MailOutlined } from "@ant-design/icons";

import sellerBanner from "../../assets/sellerBanner.jpg"

const SellerProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const history = useHistory();
  const from_uid = auth.currentUser ? auth.currentUser.uid : null;
  const [userMe, setUserMe] = useState(null);

  const [searchText, setSearchText] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const qByLink = query(collection(db, "users"), where("link", "==", id));
      const linkSnapshot = await getDocs(qByLink);

      if (!linkSnapshot.empty) {
        const userData = linkSnapshot.docs[0].data();
        setSellerId(userData.id);
        return;
      }

      const qById = query(collection(db, "users"), where("id", "==", id));
      const idSnapshot = await getDocs(qById);
      if (!idSnapshot.empty) {
        setSellerId(id);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchUserAndAds = async () => {
      const qUser = query(collection(db, "users"), where("id", "==", sellerId));
      const userSnapshot = await getDocs(qUser);
      if (!userSnapshot.empty) {
        setUser(userSnapshot.docs[0].data());
      } else {
        console.log("No such user!");
      }

      const qAds = query(
        collection(db, "advertisment"),
        where("from_uid", "==", sellerId),
        where('in_archive', '==', false)
      );
      const adsSnapshot = await getDocs(qAds);
      if (!adsSnapshot.empty) {
        const adsData = adsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAds(adsData);
        const categoriesData = adsSnapshot.docs.map((doc) => doc.data().category);
        const uniqueCategories = [...new Set(categoriesData)];
        setCategories(uniqueCategories);
      } else {
        console.log("No such ads!");
      }
    };

    fetchUserAndAds();
  }, [sellerId]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredAds = selectedCategory
    ? ads.filter((ad) => ad.category === selectedCategory)
    : ads;


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

  console.log(rat)

  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const toggleReviewForm = () => {
    if (from_uid === null) {
      history.push('/sign_in');
    } else {
      setIsReviewFormVisible(!isReviewFormVisible);
    }
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
  }, [sellerId, from_uid]);

  const fetchUserData = async (sellerId) => {
    const userQuery = query(
      collection(db, 'users'),
      where('id', '==', sellerId)
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
      where('to_uid', '==', sellerId)
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
        to_uid: sellerId,
      });

      chatId = chatDoc.id;
    } else {
      chatId = chatsSnapshot.docs[0].id;
    }

    return chatId;
  };

  const handleButtonWrite = async () => {
    if (from_uid === null) {
      history.push('/sign_in');
    } else if
      (from_uid === sellerId) {
      message.error("Вы не можете написать самому себе");
    }
    else {
      const chatId = await createChat();
      history.push(`/message/${chatId}`);
    }
  }


  useEffect(() => {
    const fetchFeedbacks = async () => {
      const q = query(collection(db, "feedback"), where("to_uid", "==", sellerId));
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
  }, [sellerId]);

  const submitReview = async () => {
    try {
      const me = auth.currentUser ? auth.currentUser.uid : null;
      if (!me) {
        history.push('/sign_in');
        return;
      }

      const q = query(collection(db, "feedback"), where("from_uid", "==", me), where("to_uid", "==", sellerId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        message.error(t('error_set_feedback'));
        return;
      }

      await addDoc(collection(db, "feedback"), {
        description: reviewText,
        rating: rating,
        to_uid: sellerId,
        time_creation: serverTimestamp(),
        from_uid: me
      });

      // Получить все отзывы для продавца
      const feedbackQuery = query(collection(db, "feedback"), where("to_uid", "==", sellerId));
      const feedbackSnapshot = await getDocs(feedbackQuery);

      // Вычислить средний рейтинг
      let totalRating = 0;
      feedbackSnapshot.forEach((doc) => {
        totalRating += doc.data().rating;
      });
      const averageRating = totalRating / feedbackSnapshot.size;

      // Обновить рейтинг продавца
      const sellerCollectionRef = collection(db, "users");
      const queryUser = query(sellerCollectionRef, where("id", "==", sellerId));

      const querySnapshotUser = await getDocs(queryUser);
      querySnapshotUser.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          rating: averageRating
        });
      });

      setReviewText("");
      setRating(1);
      setIsReviewFormVisible(false);
      message.success(t('success_set_feedback'));
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleButtonCall = () => {
    if (!user.phone) {
      message.error(t('number_is_not_specified'));
      return;
    }
    if (from_uid === null) {
      history.push('/sign_in');
    } else {
      window.open(`tel:${user.phone}`);
      message.success(`tel:${user.phone}`);
    }
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredAdsBySearch = filteredAds.filter(advertisment =>
    advertisment.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const sellerName = user?.name || t('profile_navbar');
  const sellerTitle = `${sellerName} - ${t('reviewsForProfile')} | Hvala`;

  return (
    <div>
      <Helmet>
        <title>{sellerTitle}</title>
        <meta name="description" content={`Posetite profil prodavca ${sellerName} na Hvala. Pogledajte oglase, recenzije i kontaktirajte direktno.`} />
        <link rel="canonical" href={`https://hvala.app/seller/${id}`} />
        <meta property="og:title" content={sellerTitle} />
        <meta property="og:description" content={`Profil prodavca ${sellerName} - oglasi i recenzije na Hvala`} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://hvala.app/seller/${id}`} />
        <meta property="og:image" content={user?.photoUrl || "https://hvala.app/android-chrome-512x512.png"} />
      </Helmet>
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
                  .profile-name {
                    text-align: center;
                    margin-top: 60px;
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

      <NavBarShare />

      <div id="info" className="container d-none d-lg-block mt-3">
        {(user?.role === 'seller' || user?.role === 'admin') && (
          <div style={{ position: 'relative' }}>
            <img style={{ borderRadius: '10px', width: '100%', maxHeight: '500px', objectFit: 'cover' }} src={user.bannerUrl || sellerBanner} alt="User Banner" />
            {user && (
              <img
                src={user.photoUrl || Logo}
                alt="photoProfile"
                id="userPhoto"
                style={{
                  position: 'absolute',
                  bottom: '-5rem',
                  left: '5rem',
                  borderRadius: '50%',
                  border: '3px solid white',
                  width: '12.5em',
                  height: '12.5em'
                }}
              />
            )}
          </div>
        )}
        <div className="flex">
          <div className={`w-1/4 profile ${(user?.role === 'seller' || user?.role === 'admin') ? 'mt-5' : ''}`}>
            <div className="profile-picture d-flex justify-center">
              {user?.role === 'user' && (
                <img
                  src={user.photoUrl || Logo}
                  alt="photoProfile"
                  id="userPhoto"
                  style={{
                    borderRadius: '50%',
                    border: '3px solid white',
                    width: '200px',
                    height: '200px'
                  }}
                />
              )}
            </div>
            {user && (
              <>
                <h2 className={`profile-name d-flex justify-center ${(user?.role === 'seller' || user?.role === 'admin') ? 'mt-5' : ''}`} id="userName">
                  {user.name || 'User'}
                </h2>
              </>
            )}
            {user && (
              <>
                <div className="profile-reviews d-flex justify-center">
                  <Flex gap="middle" className="d-flex justify-center">
                    {(user?.rating ?? user?.raiting) > 0 && (
                      <span>{user?.rating ?? user?.raiting}</span>
                    )}
                    <Rate allowHalf disabled defaultValue={user?.rating ?? user?.raiting} />
                  </Flex>
                </div>
                <p className="d-flex justify-center" style={{ color: '#03989F' }} onClick={showModalFee}>{t('show_feedbacks')}</p>
                <div className="d-flex justify-center">
                  <OrangeButton width='50%' height='40px' onClick={handleButtonWrite} title={t('to_write')} />
                  <BlueButton width='50%' height='40px' onClick={handleButtonCall} title={t('call')} />
                </div>
              </>
            )}
            {user && (
              <Card title={(user.role === 'seller' || user.role === 'admin') ? t('contact_navbar') : t('description')} className="mt-3">
                <p style={{ fontSize: '16px' }}>
                  {user.description || t('welcome_description')}
                </p>
                {(user?.role === 'seller' || user?.role === 'admin') && (
                  <>
                    {user?.instagram ? (
                      <>
                        <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#00B2BB', fontSize: '16px' }} href={user.instagram}>
                          <InstagramOutlined /> Instagram
                        </a><br></br>
                      </>
                    ) : (
                      <p style={{ fontSize: '16px', color: '#00B2BB' }}>
                        <InstagramOutlined /> {t('there_will_be_my_instagram')}
                      </p>
                    )}
                    {user?.facebook ? (
                      <>
                        <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#00B2BB', fontSize: '16px' }} href={user.facebook}>
                          <FacebookOutlined /> Facebook
                        </a><br></br>
                      </>
                    ) : (
                      <p style={{ fontSize: '16px', color: '#00B2BB' }}>
                        <FacebookOutlined /> {t('there_will_be_my_facebook')}
                      </p>
                    )}
                    {user?.site ? (
                      <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#00B2BB', fontSize: '16px' }} href={user.site}>
                        <GlobalOutlined /> Site
                      </a>
                    ) : (
                      <p style={{ fontSize: '16px', color: '#00B2BB' }}>
                        <GlobalOutlined /> {t('there_will_be_my_site')}
                      </p>
                    )}
                    {user?.emailProfile && (
                      <p style={{ fontSize: '16px' }}>
                        <MailOutlined /> {user.emailProfile}
                      </p>
                    )}
                  </>
                )}
              </Card>
            )}
          </div>
          <div className="w-3/4">
          <div className="container album mt-3">
            <div className="d-flex align-items-center mt-3 mb-3">
              <CustomDropdown categories={categories} onCategorySelect={handleCategorySelect} />
              <InputSearch
                placeholder={t('search')}
                width='100%'
                height='40px'
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
            <Row xs={2} sm={2} md={3} lg={3} className="g-3" id="cardAds">
              {filteredAdsBySearch.map((advertisment, index) => (
                <Col key={index}>
                  <CustomCard
                    id={advertisment.id}
                    user={user}
                    images={advertisment.photoUrls}
                    price={advertisment.price}
                    currency={advertisment.currency}
                    title={advertisment.title}
                    location={advertisment.location}
                    date={advertisment.time_creation}
                    showButtons={!!from_uid && (from_uid === sellerId || userMe?.role === 'admin')}
                    status="active"
                  />
                </Col>
              ))}
            </Row>
          </div>
          </div>
        </div>
      </div>

      <div className="container d-lg-none">
        {(user?.role === 'seller' || user?.role === 'admin') && (
          <div style={{ position: 'relative' }}>
            <img style={{ borderRadius: '10px', width: '100%', objectFit: 'cover' }} src={user.bannerUrl || sellerBanner} alt="User Banner" />
            {user && (
              <img
                src={user.photoUrl || Logo}
                alt="photoProfile"
                id="userPhoto"
                style={{
                  position: 'absolute',
                  bottom: '-3rem',
                  left: '0.5rem',
                  borderRadius: '50%',
                  border: '3px solid white',
                  width: '100px',
                  height: '100px'
                }}
              />
            )}
          </div>
        )}
        <Row className="text-center">
          <Col>
            <div className="profile-picture my-3">
              {user?.role === 'user' && (
                <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
              )}
            </div>
            {user && (
              <>
                <h2 className="profile-name" id="userName">{user?.name}</h2>
                <div className="profile-reviews">
                  <Flex gap="middle" className="d-flex justify-center">
                    {(user?.rating ?? user?.raiting) > 0 && (
                      <span>{user?.rating ?? user?.raiting}</span>
                    )}
                    <Rate allowHalf disabled defaultValue={user?.rating ?? user?.raiting} />
                  </Flex>
                </div>
                <p style={{ color: '#03989F' }} onClick={showModalFee}>{t('show_feedbacks')}</p>
                <div className="d-flex justify-between">
                  <OrangeButton width='100%' height='40px' onClick={handleButtonWrite} title={t('to_write')} />
                  <BlueButton width='100%' height='40px' onClick={handleButtonCall} title={t('call')} />
                </div>
                <Modal title={t('reviewsForProfile')} open={isModalVisible} onCancel={handleCancel} footer={null}>
                  {feedbacks.map((feedback, index) => (
                    <div key={index}>
                      <h5 className='mt-3'>{new Date(feedback.time_creation?.seconds * 1000).toLocaleDateString()}</h5>
                      <h5>{t('comment_from')} {feedback.userName}</h5>
                      <p>{feedback.description} <Rate disabled defaultValue={feedback.rating} /></p>
                    </div>
                  ))}

                  {from_uid && !isReviewFormVisible && (
                    <div className='d-flex justify-content-center'>
                      <Button className='mt-3'
                        style={{ backgroundColor: '#FFBF34', border: 'none', color: 'white' }} onClick={toggleReviewForm}>{t('set_feedback')}</Button>
                    </div>
                  )}

                  {from_uid && isReviewFormVisible && (
                    <>
                      <Input.TextArea
                        className='mt-3'
                        rows={4}
                        value={reviewText}
                        onChange={handleReviewChange}
                        placeholder={t('input_feedback')}
                      />
                      <Rate className='mt-3' value={rating} onChange={handleRatingChange} />
                      <div className='d-flex justify-content-center'>
                        <Button className='mt-3'
                          style={{ backgroundColor: '#FFBF34', border: 'none', color: 'white' }} onClick={submitReview}>{t('send_feedback')}</Button>
                      </div>
                    </>
                  )}
                </Modal>
              </>
            )}
          </Col>
          {user && (
            <Card title={(user.role === 'seller' || user.role === 'admin') ? t('contact_navbar') : t('description')} className="mt-3">
              <p style={{ fontSize: '16px' }}>
                {user.description || t('welcome_description')}
              </p>
              {(user?.role === 'seller' || user?.role === 'admin') && (
                <>
                  {user?.instagram ? (
                    <>
                      <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#00B2BB', fontSize: '16px' }} href={user.instagram}>
                        <InstagramOutlined /> Instagram
                      </a><br></br>
                    </>
                  ) : (
                    <p target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#00B2BB' }}>
                      <InstagramOutlined /> {t('there_will_be_my_instagram')}
                    </p>
                  )}
                  {user?.facebook ? (
                    <>
                      <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#00B2BB', fontSize: '16px' }} href={user.facebook}>
                        <FacebookOutlined /> Facebook
                      </a><br></br>
                    </>
                  ) : (
                    <p target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', color: '#00B2BB' }}>
                      <FacebookOutlined /> {t('there_will_be_my_facebook')}
                    </p>
                  )}
                  {user?.site ? (
                    <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#00B2BB', fontSize: '16px' }} href={user.site}>
                      <GlobalOutlined /> Site
                    </a>
                  ) : (
                    <p style={{ fontSize: '16px', color: '#00B2BB' }}>
                      <GlobalOutlined /> {t('there_will_be_my_site')}
                    </p>
                  )}
                  {user?.emailProfile && (
                    <p style={{ fontSize: '16px' }}>
                      <MailOutlined /> {user.emailProfile}
                    </p>
                  )}
                </>
              )}
            </Card>
          )}
        </Row>
        <Row>
          <Col>
            <Container className="album mt-3">
              <div className="d-flex justify-center mt-3 mb-3">
                <CustomDropdown categories={categories} onCategorySelect={handleCategorySelect} />
              </div>
              <InputSearch
                placeholder={t('search')}
                width='100%'
                height='40px'
                value={searchText}
                onChange={handleSearchChange}
              />
              <Row xs={2} sm={2} className="g-3 mt-3" id="cardAds">
                {filteredAdsBySearch.map((advertisment, index) => (
                  <Col>
                    <CustomCard
                      id={advertisment.id}
                      user={user}
                      images={advertisment.photoUrls}
                      price={advertisment.price}
                      currency={advertisment.currency}
                      title={advertisment.title}
                      location={advertisment.location}
                      date={advertisment.time_creation}
                      showButtons={!!from_uid && (from_uid === sellerId || userMe?.role === 'admin')}
                      status="active"
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SellerProfile;
