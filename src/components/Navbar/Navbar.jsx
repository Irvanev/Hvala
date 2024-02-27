import React, {useState, useEffect} from 'react';
import {auth} from '../../config/firebase';
import {signOut} from 'firebase/auth';
import {Badge, Button, Container, Nav, Navbar} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {MdLanguage} from "react-icons/md";
import LanguageModal from '../../LanguageModal';
import {useLocation} from 'react-router-dom';

export const MyNavbar = () => {
    const {t} = useTranslation();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    const getFillColor = (path) => {
        return location.pathname === path ? "orange" : "currentColor";
    }

    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
        if (isUserLoggedIn) {
            setIsUserLoggedIn(true);
            setIsLoading(false);
        }

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                localStorage.setItem('isUserLoggedIn', true);
                setIsUserLoggedIn(true);
                setIsLoading(false);
            } else {
                localStorage.removeItem('isUserLoggedIn');
                setIsUserLoggedIn(false);
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>

            <style>
                {`
                    #navPc {
                        box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
                    }
                `}
            </style>

            <Navbar expand="md" bg="light" fixed="top" className="d-none d-lg-block" id="navPc">
                <Container>
                    <Nav className="me-auto mb-2 mb-md-0">
                        <Nav.Item>
                            <Nav.Link active href="#" onClick={() => setShowModal(true)}>
                                <MdLanguage size={24}/>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active href="/advertisment">{t('home_navbar')}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active href="/help">{t('help_navbar')}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/contacts">{t('contact_navbar')}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="d-flex">
                        <Nav.Item>
                            <Button variant="light" href="/message">
                                {t('message_navbar')} <Badge bg="secondary">9</Badge>
                                <span className="visually-hidden">unread messages</span>
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            {isUserLoggedIn ? (
                                <Nav.Link active href="/profile">{t('profile_navbar')}</Nav.Link>
                            ) : (
                                <Nav.Link active href="/sign_in">{t('auth')}</Nav.Link>
                            )}
                        </Nav.Item>
                        {isUserLoggedIn && (
                            <Nav.Item>
                                <Nav.Link href="/sign_in" onClick={handleLogout}>{t('exit')}</Nav.Link>
                            </Nav.Item>
                        )}
                        <Nav.Link className="btn" role="button" href="/addItem" id="addItemButton"
                                  style={{backgroundColor: "orange", color: "white"}}>{t('addItem_navbar')}</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Navbar expand="md" bg="light" fixed="bottom" className="d-lg-none" id="navMob"
                    style={{height: "80px", display: "flex", alignItems: "flex-start"}}>
                <Container className="d-flex justify-content-around">
                    <Nav.Link href="/advertisment">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                             fill={getFillColor("/advertisment")}
                             className="bi bi-house"
                             viewBox="0 0 16 16">
                            <path
                                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                        </svg>
                    </Nav.Link>
                    <Nav.Link href="" onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={getFillColor("/settings")}
                             className="bi bi-gear"
                             viewBox="0 0 16 16">
                            <path
                                d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path
                                d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                    </Nav.Link>
                    <Nav.Link href="/addItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={getFillColor("/addItem")}
                             className="bi bi-plus-square"
                             viewBox="0 0 16 16">
                            <path
                                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Nav.Link>
                    <Nav.Link href="/message">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={getFillColor("/message")}
                             className="bi bi-chat-dots"
                             viewBox="0 0 16 16">
                            <path
                                d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            <path
                                d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                        </svg>
                    </Nav.Link>
                    <Nav.Link href="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={getFillColor("/profile")}
                             className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </Nav.Link>
                </Container>
            </Navbar>

            <LanguageModal show={showModal} handleClose={() => setShowModal(false)}/>

        </div>
    );
}