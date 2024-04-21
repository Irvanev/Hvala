import { MyNavbar } from "../../components/Navbar/Navbar";
import { NavBarLogout } from "../../components/Navbar/NavBarLogout";
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import {useTranslation} from 'react-i18next';
import { db, auth, storage } from "../../config/firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { Image, Container, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import Logo from "../../assets/logo.png";
import { Pencil } from 'react-bootstrap-icons';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Rate } from 'antd';

const ProfileSettings = () => {
    const {t} = useTranslation();
    const [user, setUser] = useState(null);
    const history = useHistory();
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const fileInput = useRef(null);

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
    const rat = user?.rating

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleImageClick = () => {
        fileInput.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const storageRef = ref(storage, 'profilePictures/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const q = query(collection(db, "users"), where("id", "==", user.id));

                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, " => ", doc.data());
                    });

                    const updatedUser = { ...user, photoUrl: downloadURL };
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    setShowModal(true);
                    window.location.reload();

                    alert(t('profilePictureChanged'));
                });
            }
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name) {
            const allUsersRef = collection(db, 'users');
            const allUsersSnapshot = await getDocs(allUsersRef);
            const isNameTaken = allUsersSnapshot.docs.some(doc => doc.data().name === name);
            if (isNameTaken) {
                alert(t('nameTaken'));
                return;
            }

            const englishCheck = /^[A-Za-z0-9_\-]*$/;
            if (!englishCheck.test(name)) {
                alert(t('nameInEnglish'));
                return;
            }

            if (name.length < 2) {
                alert(t('nameLength'));
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
                            padding-top: 3.5rem;
                            padding-bottom: 4.5rem;
                        }
                    }
                    @media (min-width: 1000px) {
                      body {
                            padding-top: 4.5rem;
                            padding-bottom: 2.5rem;
                        }
                    `}
                </style>

                <MyNavbar />
                <NavBarLogout />

                <Container id="info" className="d-none d-lg-block">
                    <Row>
                        <Col xs={3} className="profile">
                            <div className="profile-picture my-3" onClick={handleImageClick}>
                                <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
                            </div>
                            <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                            <div className="profile-reviews">
                                <span>{user?.rating.toFixed(1) || '0.0'}</span>
                                {rat && <Rate disabled defaultValue={rat} />}
                                <p id="kolRating">{user?.reviewCount || '17'} {t('reviews')}</p>
                            </div>
                        </Col>
                        <Col xs={9}>
                            <h2>{t('personalInformation')}</h2>
                            <h5>{t('email')}</h5>
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
                            <h5>{t('displayName')}</h5>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        disabled={!isEditingName}
                                        readOnly={!isEditingName}
                                        placeholder={user?.name}
                                        value={name}
                                        onChange={handleNameChange}
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
                                    {t('save')}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <Container className="d-lg-none">
                    <Row className="text-center">
                        <Col>
                            <div className="profile-picture my-3" onClick={handleImageClick}>
                                <Image src={user?.photoUrl || Logo} alt="photoProfile" id="userPhoto" className="mx-auto" />
                            </div>
                            <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                            <h2 className="profile-name" id="userName">{user?.name || 'Name'}</h2>
                            <div className="profile-reviews">
                                <span>{user?.rating.toFixed(1) || '0.0'}</span>
                                {rat && <Rate disabled defaultValue={rat} />}
                                <p id="kolRating">{user?.reviewCount || '17'} {t('reviews')}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <h1>{t('personalInformation')}</h1>
                            <h5>{t('email')}</h5>
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
                            <h5>{t('displayName')}</h5>
                            <Row className="align-items-center mb-3">
                                <Col>
                                    <Form.Control
                                        type="text"
                                        disabled={!isEditingName}
                                        readOnly={!isEditingName}
                                        placeholder={user?.name}
                                        value={name}
                                        onChange={handleNameChange}
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
                                {t('save')}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('success')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{t('usernameUpdated')}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('close')}
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    );
}

export default ProfileSettings;