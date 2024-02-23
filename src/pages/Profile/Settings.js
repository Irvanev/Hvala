import { MyNavbar } from "../../components/Navbar/Navbar";
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { db, auth } from "../../config/firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { Image, Container, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { Pencil } from 'react-bootstrap-icons';

const ProfileSettings = () => {
    const [user, setUser] = useState(null);
    const history = useHistory();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState("");
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            let user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('id', '==', userId));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    user = doc.data();
                    localStorage.setItem('user', JSON.stringify(user));
                });
            }
            setUser(user);
        };

        fetchUser();
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name) {
            const allUsersRef = collection(db, 'users');
            const allUsersSnapshot = await getDocs(allUsersRef);
            const isNameTaken = allUsersSnapshot.docs.some(doc => doc.data().name === name);
            if (isNameTaken) {
                alert('Это имя уже занято. Пожалуйста, выберите другое имя.');
                return;
            }

            const englishCheck = /^[A-Za-z0-9_\-]*$/;
            if (!englishCheck.test(name)) {
                alert('Имя должно быть на английском языке. Пожалуйста, введите имя на английском языке.');
                return;
            }

            if (name.length < 2) {
                alert('Имя должно содержать не менее 2 символов. Пожалуйста, введите имя длиной не менее 2 символов.');
                return;
            }

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where("id", "==", user.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    name: name
                });
                let updatedUser = { ...user, name: name };
                localStorage.removeItem('user');
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                setShowModal(true);
                window.location.reload();
            });
        }
    };

    const goBack = () => {
        history.goBack();
    }
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error.message);
        }
    };

    const StarRating = ({ rating }) => {
        return (
            <div>

                <style type="text/css">
                    {`
                    .star-filled {
                        color: yellow;
                    }
                    
                    .star-empty {
                        color: gray;
                    }
                    @media (max-width: 1000px) {
                          body {
                              padding-bottom: 6.0rem;
                          }
                      }
                      @media (min-width: 1000px) {
                          body {
                              padding-top: 4.5rem;
                              padding-bottom: 3.5em;
                          }
                      }
                    `}
                </style>

                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i}>
                            <FontAwesomeIcon className={ratingValue <= rating ? 'star-filled' : 'star-empty'} icon={fasStar} />
                        </label>
                    );
                })}
            </div>
        );
    };

    return (
        <div>

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
                            padding-bottom: 3.5rem;
                            padding-top: 3.5rem;
                        }
                    }
                    @media (min-width: 1000px) {
                    body {
                            padding-top: 3.5rem;
                        }
                    }
                    `}
                </style>

                <MyNavbar />

                <Container id="info" className="d-none d-lg-block">
                    <Row>
                        <Col xs={3} className="profile">
                            <div className="profile-picture">
                                <Image src={user?.photoURL || Logo} alt="photoProfile" id="userPhoto" />
                            </div>
                            <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                            <div className="profile-reviews">
                                <span>{user?.rating.toFixed(1) || '0.0'}</span>
                                <StarRating rating={user?.rating || 0} />
                                <p id="kolRating">{user?.reviewCount || '17'} Отзывов</p>
                            </div>
                            <div className="profile-sections">
                                <a href="/settings">Настройки</a>
                                <a href="/message">Сообщения</a>
                            </div>
                        </Col>
                        <Col xs={9}>
                            <h2>Линчая информация</h2>
                            <h5>Электронная почта</h5>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        disabled={!isEditingEmail}
                                        readOnly={!isEditingEmail}
                                        placeholder={user?.email}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-secondary">
                                        <Pencil />
                                    </Button>
                                </Col>
                            </Row>
                            <h5>Отображаемое имя</h5>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        disabled={!isEditingName}
                                        readOnly={!isEditingName}
                                        placeholder={user?.name}
                                        value={name} // Установите значение контрола
                                        onChange={handleNameChange} // Добавьте обработчик изменения
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-secondary" onClick={() => setIsEditingName(!isEditingName)}>
                                        <Pencil />
                                    </Button>
                                </Col>
                            </Row>
                            <Form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                                <Button variant="warning" style={{ backgroundColor: "orange", color: "white" }} type="submit">
                                    Сохранить
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light d-lg-none">
                    <div className="container">
                        <ul className="navbar-nav me-auto mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={goBack}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                        className="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav d-flex">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                        className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                            d="M10 12.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8zm-1.5-.5h-7v-8h7v8zm1.5 0a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10 0h-8A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h8a.5.5 0 0 1 .5.5zM14.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L13.293 6H6.5a.5.5 0 0 1 0-1h6.793l-1.647-1.646a.5.5 0 0 1 .708-.708l3 3z" />
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
                            <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                            <div className="profile-reviews">
                                <span>{user?.rating.toFixed(1) || '0.0'}</span>
                                <StarRating rating={user?.rating || 0} />
                                <p id="kolRating">{user?.reviewCount || '17'} Отзывов</p>
                            </div>
                            <div className="profile-sections">
                                <a href="/settings">Настройки</a>
                                <a href="/message">Сообщения</a>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <h1>Линчая информация</h1>
                            <h5>Электронная почта</h5>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        disabled={!isEditingEmail}
                                        readOnly={!isEditingEmail}
                                        placeholder={user?.email}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-secondary">
                                        <Pencil />
                                    </Button>
                                </Col>
                            </Row>
                            <h5>Отображаемое имя</h5>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        disabled={!isEditingName}
                                        readOnly={!isEditingName}
                                        placeholder={user?.name}
                                        value={name} // Установите значение контрола
                                        onChange={handleNameChange} // Добавьте обработчик изменения
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button variant="outline-secondary" onClick={() => setIsEditingName(!isEditingName)}>
                                        <Pencil />
                                    </Button>
                                </Col>
                            </Row>
                            <Form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                                <Button variant="warning" style={{ backgroundColor: "orange", color: "white" }} type="submit">
                                    Сохранить
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Успех</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Имя пользователя успешно обновлено!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    );
}

export default ProfileSettings;