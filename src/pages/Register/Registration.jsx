import React, { useState } from 'react';
import Logotype from "../../assets/logo.png"
import { auth, db } from "../../config/firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { useHistory } from 'react-router-dom';
import { MyNavbar } from '../../components/Navbar/Navbar';
import { Button, Container, Form } from "react-bootstrap";
import {useTranslation} from 'react-i18next';

export const Registration = () => {
    const {t} = useTranslation();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const checkUsername = async (username) => {
        const q = query(collection(db, "users"), where("name", "==", username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    const goBack = () => {
        history.goBack();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confPassword) {
            setErrorMessage(t('passwordsDoNotMatch'));
            return;
        }
        const isUsernameTaken = await checkUsername(username);
        if (isUsernameTaken) {
            alert(t('usernameTaken'));
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            alert(t('confirmEmail'));

            await setDoc(doc(db, 'users', user.uid), {
                addtime: serverTimestamp(),
                role: "user",
                fcmtoken: "",
                location: "",
                photoUrl: "",
                raiting: 0,
                name: username,
                email: email,
                id: user.uid
            });
            history.push('/sign_in');
            await signOut(auth);
            localStorage.clear();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>

            <style type="text/css">
                {`
                #login {
                    font-size: 20px;
                    width: 100%;
                    background-color: orange;
                    color: white;
                    border: none;
                }
                #login:hover {
                    background-color: darkorange;
                    color: white;
                }
                
                `}
            </style>

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
                </div>
            </nav>

            <MyNavbar />

            <div style={{ paddingTop: '4.5rem' }}>
                <img src={Logotype} alt="logo"
                    style={{ width: "200px", height: "200px", borderRadius: "50%", display: "block", margin: "auto" }} />
            </div>
            <Container style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <Form onSubmit={handleSubmit} style={{ width: "400px" }}>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('email')}</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('username')}</Form.Label>
                        <Form.Control type="text" value={username} autoComplete="username"
                            onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('password')}</Form.Label>
                        <Form.Control type="password" value={password} autoComplete="new-password"
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{t('confirmPassword')}</Form.Label>
                        <Form.Control type="password" value={confPassword} autoComplete="new-password"
                            onChange={e => setConfPassword(e.target.value)} />
                        <span style={{ color: 'red' }}>{errorMessage}</span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <p>{t('alreadyRegistered')} <a href="/sign_in">{t('login')}</a></p>
                    </Form.Group>
                    <div>
                        <Button type="submit" className="btn" id="login">{t('register')}</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}