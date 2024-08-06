import React, { useState } from 'react';
import Logotype from "../../assets/logo_def.png"
import { auth, db } from "../../config/firebase"
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import { useHistory, Link } from 'react-router-dom';
import { MyNavbar } from '../../components/Navbar/Navbar';
import { Form, Input, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { NavBarBack } from '../../components/Navbar/NavBarBack';

import styles from "./registration.module.css";

export const Registration = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loginError, setLoginError] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        history.push('/sign_in');
            await signOut(auth);
            localStorage.clear();
    };

    const handleCancel = async () => {
        setIsModalVisible(false);
        history.push('/sign_in');
            await signOut(auth);
            localStorage.clear();
    };

    const checkUsername = async (username) => {
        const q = query(collection(db, "users"), where("name", "==", username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    const checkEmail = async (email) => {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    const handleSubmit = async (e) => {
        if (password !== confPassword) {
            return;
        }
        const isUsernameTaken = await checkUsername(username);
        if (isUsernameTaken) {
            setLoginError('Имя пользвателя уже занято!');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            showModal();

            await setDoc(doc(db, 'users', user.uid), {
                addtime: serverTimestamp(),
                role: "user",
                fcmtoken: "",
                location: "",
                photoUrl: "",
                rating: 0,
                name: username,
                email: email,
                id: user.uid
            });
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
                @media (max-width: 1000px) {
                    body {
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

            <NavBarBack />

            <MyNavbar />

            <div className='container'>
                <div style={{ paddingTop: '4.5rem' }}>
                    <img src={Logotype} alt="logo"
                        style={{ width: "200px", height: "200px", borderRadius: "50%", display: "block", margin: "auto" }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <Form layout='vertical' onFinish={handleSubmit} style={{ width: "400px" }}>
                        <Form.Item
                            label={t('email')}
                            name="email"
                            rules={[
                                { required: true, message: t('input_email') },
                                { type: 'email', message: t('input_correct_email') },
                                () => ({
                                    validator(_, value) {
                                        return checkEmail(value).then(isEmailTaken => {
                                            if (isEmailTaken) {
                                                return Promise.reject(t('email_busy'));
                                            }
                                            return Promise.resolve();
                                        });
                                    },
                                }),
                            ]}
                        >
                            <Input type="email" placeholder="name@example.com" value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('username')}
                            name="username"
                            rules={[
                                { required: true, message: t('input_username') },
                                () => ({
                                    validator(_, value) {
                                        return checkUsername(value).then(isUsernameTaken => {
                                            if (isUsernameTaken) {
                                                return Promise.reject(t('username_busy'));
                                            }
                                            return Promise.resolve();
                                        });
                                    },
                                }),
                            ]}
                        >
                            <Input type="text" value={username} autoComplete="username"
                                onChange={e => setUsername(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('password')}
                            name="password"
                            rules={[
                                { required: true, message: t('input_password') },
                                { min: 6, message: t('input_correct_password') }
                            ]}
                        >
                            <Input.Password value={password} autoComplete="new-password"
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('confirmPassword')}
                            name="confirmPassword"
                            rules={[
                                { required: true, message: t('input_password_again') },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(t('passwords_not_match')));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password value={confPassword} autoComplete="new-password"
                                onChange={e => setConfPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <p>{t('alreadyRegistered')} <Link to={`/sign_in`} className={styles.customLink}>{t('login')}</Link></p>
                        </Form.Item>
                        <Form.Item>
                            <button  size='large' htmlType="submit" className={styles.submitButton}>{t('register')}</button>
                        </Form.Item>
                        <Modal title={t('confirming_email')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>{t('confirmEmail')}</p>
                        </Modal>
                    </Form>
                </div>
            </div>
        </div>
    );
}