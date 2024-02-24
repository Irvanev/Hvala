import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import { MyNavbar } from "../../components/Navbar/Navbar";
import { useParams, useHistory } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";
import star from "../../assets/star.png";
import halfStar from "../../assets/rating2.png";
import emptyStar from "../../assets/star2.png";

const SellerProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const history = useHistory();

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

  const aStyle = {
    textDecoration: "none",
  };
  const goBack = () => {
    history.goBack();
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

      <Container id="info" className="d-none d-lg-block">
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
              <div className="profile-reviews">
                {stars}
              </div>
            )}
          </Col>
          <Col xs={9}>
            <Container className="album mt-3">
              <Row xs={2} sm={2} md={3} lg={4} className="g-3" id="cardAds">
                {user &&
                  ads &&
                  ads.map((advertisment, index) => (
                    <Col key={index}>
                      <Link
                        key={advertisment.id}
                        to={`/advertisment/${advertisment.id}`}
                        style={aStyle}
                      >
                        <Card className="shadow-sm">
                          <Card.Img
                            variant="top"
                            src={
                              (advertisment.photoUrls &&
                                advertisment.photoUrls[0]) ||
                              Logo
                            }
                            alt="imageAdvertisment"
                            className="imageAdvertisment"
                          />
                          <Card.Body>
                            <Card.Text>
                              <span className="location-text">
                                {advertisment.title}
                              </span>
                              <strong>
                                {advertisment.price + "€"}
                                <br />
                              </strong>
                              <span className="location-text">
                                {advertisment.location}
                              </span>
                              <span className="date-text">
                                {new Date(
                                  advertisment.time_creation.seconds * 1000
                                ).toLocaleString("ru", {
                                  day: "numeric",
                                  month: "long",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
        <div className="container">
          <ul className="navbar-nav me-auto mb-md-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                onClick={goBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <Container className="d-lg-none">
        <Row className="text-center">
          <Col>
            <div className="profile-picture my-3">
              <Image src={user?.photoURL || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
            </div>
            <h2 className="profile-name" id="userName">{user?.name}</h2>
            {user && (
              <div className="profile-reviews">
                {stars}
              </div>
            )}
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
                    <Col key={index}>
                      <Link
                        key={advertisment.id}
                        to={`/advertisment/${advertisment.id}`}
                        style={aStyle}
                      >
                        <Card className="shadow-sm">
                          <Card.Img
                            variant="top"
                            src={
                              (advertisment.photoUrls &&
                                advertisment.photoUrls[0]) ||
                              Logo
                            }
                            alt="imageAdvertisment"
                            className="imageAdvertisment"
                          />
                          <Card.Body>
                            <Card.Text>
                              <span className="location-text">
                                {advertisment.title}
                              </span>
                              <strong>
                                {advertisment.price + "€"}
                                <br />
                              </strong>
                              <span className="location-text">
                                {advertisment.location}
                              </span>
                              <span className="date-text">
                                {new Date(
                                  advertisment.time_creation.seconds * 1000
                                ).toLocaleString("ru", {
                                  day: "numeric",
                                  month: "long",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
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
