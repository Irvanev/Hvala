import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth';
import { Form, Input, Checkbox, Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Logotype from "../../assets/logo.png"
import { auth } from "../../config/firebase"
import { MyNavbar } from '../../components/Navbar/Navbar';

export const Authorization = () => {
    const { Link } = Typography;
    const { t } = useTranslation();
    const history = useHistory();

    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const onRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };


    const goBack = () => {
        history.goBack();
    }

    const handleSubmit = async (values) => {
        const { email, password } = values;
        try {
            const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
            await setPersistence(auth, persistence);
    
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (user.emailVerified) {
                const userId = user.uid;
                localStorage.setItem('userId', userId);
                history.push('/advertisment');
            } else {
                setLoginError('Пожалуйста, подтвердите свой адрес электронной почты перед входом.');
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setLoginError('Неверный логин или пароль.');
            } else {
                setLoginError(error.message);
            }
        }
    };

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

            <div className='container'>
                <div style={{ paddingTop: '1.5rem' }}>
                    <img src={Logotype} alt="logo" style={{ width: "200px", height: "200px", borderRadius: "50%", display: "block", margin: "auto" }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                    <Form layout="vertical" onFinish={handleSubmit} style={{ width: "400px" }} autoComplete="on">
                        <Form.Item
                            label={t('email')}
                            name='email'
                            rules={[
                                { required: true, message: 'Пожалуйста, введите ваш email!' },
                                { type: 'email', message: 'Пожалуйста, введите корректный email!' }
                            ]}
                        >
                            <Input type="email" id="email" name='email' placeholder="name@example.com" value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label={t('password')}
                            name='password'
                            rules={[
                                { required: true, message: 'Пожалуйста, введите ваш пароль!' },
                                { min: 6, message: 'Пароль должен содержать минимум 6 символов!' }
                            ]}
                        >
                            <Input.Password id="password" name='password' value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Item>
                        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                        <Form.Item name="saveSession" valuePropName="checked">
                            <Checkbox onChange={onRememberMeChange}>{t('remember_me')}</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <p>{t('notRegisteredYet')} <Link href="/sign_up">{t('register')}</Link></p>
                        </Form.Item>
                        <Form.Item>
                            <Button size='large' type="primary" htmlType="submit" id="login">{t('login')}</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}