import React, { useState } from 'react';
import styles from './authorizations.module.css'
import { useHistory, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Form, Input, Flex, Modal, Spin, message } from 'antd';
import { useTranslation } from 'react-i18next';
import Logotype from "../../assets/logo_def.png"
import { auth, db } from "../../config/firebase"
import { MyNavbar } from '../../components/Navbar/Navbar';
import { NavBarBack } from '../../components/Navbar/NavBarBack';
import { useUserRole } from '../../context/UserRoleContext';

import { collection, query, getDocs, where } from "firebase/firestore";

export const Authorization = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setRole } = useUserRole();

    const handleSubmit = async (values) => {
        const { email, password } = values;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                const userId = user.uid;
                localStorage.setItem('userId', userId);

                // Получите роль пользователя из базы данных или другого источника
                const userRole = await fetchUserRole(userId);
                setRole(userRole);

                history.push('/profile');
            } else {
                setLoginError(t('confirm_email'));
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setLoginError(t('invalid_email_or_password'));
            } else {
                setLoginError(error.message);
            }
        }
    };

    const fetchUserRole = async (userId) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('id', '==', userId));
        const querySnapshot = await getDocs(q);

        let userRole = null;
        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                userRole = doc.data().role;
            }
        });

        return userRole;
    };

    const handlePasswordReset = async () => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            message.success(t('forgot_password_sent'));
            setIsModalVisible(false);
        } catch (error) {
            setResetError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>

            <NavBarBack />

            <MyNavbar />

            <div className={styles.body}>
                <div className='container'>
                    <div style={{ paddingTop: '4.5rem' }}>
                        <img src={Logotype} alt="logo" style={{ width: "200px", height: "200px", borderRadius: "50%", display: "block", margin: "auto" }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                        <Form layout="vertical" onFinish={handleSubmit} style={{ width: "400px" }} autoComplete="on">
                            <Form.Item
                                label={t('email')}
                                name='email'
                                rules={[
                                    { required: true, message: t('input_email') },
                                    { type: 'email', message: t('input_correct_email') }
                                ]}
                            >
                                <Input type="email" id="email" name='email' placeholder="name@example.com" value={email}
                                    onChange={e => setEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                label={t('password')}
                                name='password'
                                rules={[
                                    { required: true, message: t('input_password') },
                                    { min: 6, message: t('input_correct_password') }
                                ]}
                            >
                                <Input.Password id="password" name='password' value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </Form.Item>
                            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                            <Form.Item>
                                <Flex justify="space-between" align="center">
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <p>{t('notRegisteredYet')} <Link to={`/sign_up`} className={styles.customLink}>{t('register')}</Link></p>
                                    </Form.Item>
                                    <p><a className={styles.customLink} onClick={showModal} href="#">{t('forgot_password')}</a></p>
                                </Flex>
                            </Form.Item>
                            <Form.Item>
                                <button className={styles.submitButton} size='large' htmlType="submit" id="login">{t('login')}</button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <Modal title={t('recovery_password')} visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form layout="vertical" onFinish={handlePasswordReset}>
                    <Form.Item
                        label="Email"
                        name="resetEmail"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите ваш email' },
                            { type: 'email', message: 'Пожалуйста, введите корректный email' }
                        ]}
                    >
                        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <button disabled={loading} className={styles.submitButton} size='large' htmlType="submit">{loading ? <Spin /> : t('send')}</button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}