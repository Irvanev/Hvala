import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

import { Avatar, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Nav, Navbar, Container } from 'react-bootstrap'
import { MessageOutlined } from '@ant-design/icons';
import LanguageModal from '../../LanguageModal';

export const MyNavbar = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const user = JSON.parse(localStorage.getItem('user'));

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleHomeClick = () => {
        history.push('/');
    };
    const handleSettingsClick = () => {
        history.push('/settings');
    };
    const handleAddItemClick = () => {
        history.push('/addItem');
    };
    const handleMessageClick = () => {
        history.push('/message');
    };
    const handleProfileClick = () => {
        history.push('/profile');
    };

    const getButtonStyle = (path) => {
        return location.pathname === path ? 'text-customColor2' : 'text-customColor3';
      };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const setRoute = (value) => {
        history.push(value);
    };

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
        } catch (error) {
            alert(error.message);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile" style={{ textDecoration: 'none' }}>{t("profile_navbar")}</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/settings" style={{ textDecoration: 'none' }}>{t("settings")}</Link>
            </Menu.Item>
            <Menu.Item onClick={logout}>
                <a style={{ textDecoration: 'none' }} href="/sign_in">{t("exit")}</a>
            </Menu.Item>
        </Menu>
    );


    return (
        <div>

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary d-none d-lg-block" style={{ position: 'fixed', width: '100%', zIndex: '999', top: 0, backgroundColor: '#f8f9fa' }}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="" style={{ textDecoration: 'none' }} onClick={showModal}>
                                <Nav.Link href="" style={{ fontSize: '18px' }}><GlobalOutlined /> {t("language")}</Nav.Link>
                            </Link>

                            <LanguageModal
                                show={isModalVisible}
                                handleClose={handleModalClose}
                            />
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Nav.Link href="/" style={{ fontSize: '18px' }}>{t("home_navbar")}</Nav.Link>
                            </Link>
                            <Link to="/help" style={{ textDecoration: 'none' }}>
                                <Nav.Link href='/help' style={{ fontSize: '18px' }}>{t("help_navbar")}</Nav.Link>
                            </Link>
                            <Link to="/contacts" style={{ textDecoration: 'none' }}>
                                <Nav.Link href="/contacts" style={{ fontSize: '18px' }}>{t("contact_navbar")}</Nav.Link>
                            </Link>
                        </Nav>
                        <Nav>
                            <Link to="/message" style={{ textDecoration: 'none' }}>
                                <Nav.Link href="/message" style={{ fontSize: '18px', padding: '12px' }}><MessageOutlined style={{ fontSize: '25px', padding: '3px' }} /></Nav.Link>
                            </Link>
                            {user ? (
                                <Dropdown overlay={menu}>
                                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                                        <Nav.Link href="/profile" style={{ fontSize: '18px', padding: '12px' }}>
                                            <Avatar size={32} alt={user.name} src={user.photoUrl} style={{ marginRight: '10px' }} />
                                            {user.name}<DownOutlined style={{ fontSize: '12px' }} />
                                        </Nav.Link>
                                    </Link>
                                </Dropdown>
                            ) : (
                                <Link to="/sign_in" style={{ textDecoration: 'none' }}>
                                    <Nav.Link href="/sign_in" style={{ fontSize: '18px', padding: '12px' }}>{t("auth")}</Nav.Link>
                                </Link>
                            )}
                            <Link to="/addItem" style={{ textDecoration: 'none' }}>
                                <Nav.Link href="/addItem" >
                                    <Button style={{ backgroundColor: '#FFBF34', color: 'white', border: 'none' }} size='large'>{t("addItem_navbar")}</Button>
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className='app d-lg-none'>


                <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-customColor1 border-t rounded-t-2xl border-gray-200">
                    <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                        <button onClick={handleHomeClick} type="button" className="inline-flex flex-col items-center justify-center px-5 group е">
                            <svg class={`w-6 h-6 ${getButtonStyle('/advertisment')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd" />
                            </svg>
                            <span class={`text-sm text-customColor3  group-hover:text-customColor2 ${getButtonStyle('/advertisment')}`}>{t("home_navbar")}</span>
                        </button>
                        <button onClick={handleSettingsClick} type="button" class="inline-flex flex-col items-center justify-center px-5 border-gray-200 group dark:border-gray-600">
                            <svg class={`w-6 h-6 ${getButtonStyle('/settings')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M5 13.17a3.001 3.001 0 0 0 0 5.66V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 0 0-2 0v9.17ZM11 20v-9.17a3.001 3.001 0 0 1 0-5.66V4a1 1 0 1 1 2 0v1.17a3.001 3.001 0 0 1 0 5.66V20a1 1 0 1 1-2 0Zm6-1.17V20a1 1 0 1 0 2 0v-1.17a3.001 3.001 0 0 0 0-5.66V4a1 1 0 1 0-2 0v9.17a3.001 3.001 0 0 0 0 5.66Z" />
                            </svg>
                            <span class={`text-sm text-customColor3  group-hover:text-customColor2 ${getButtonStyle('/settings')}`}>{t("settings")}</span>
                        </button>

                        <button onClick={handleAddItemClick} type="button" class="inline-flex flex-col items-center justify-center px-5 group">
                            <svg class={`w-6 h-6 ${getButtonStyle('/addItem')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            <span class={`text-sm text-customColor3  group-hover:text-customColor2 ${getButtonStyle('/addItem')}`}>{t("addItem_navbar")}</span>
                        </button>

                        <button onClick={handleMessageClick} type="button" class="inline-flex flex-col items-center justify-center px-5 group">
                            <svg class={`w-6 h-6 ${getButtonStyle('/message')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z" clip-rule="evenodd" />
                            </svg>
                            <span class={`text-sm text-customColor3  group-hover:text-customColor2 ${getButtonStyle('/message')}`}>{t("message_navbar")}</span>
                        </button>

                        <button onClick={handleProfileClick} type="button" class="inline-flex flex-col items-center justify-center px-5 border-gray-200 group dark:border-gray-600">
                            <svg class={`w-6 h-6 ${getButtonStyle('/profile')}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd" />
                            </svg>
                            <span class={`text-sm text-customColor3  group-hover:text-customColor2 ${getButtonStyle('/profile')}`}>{t("profile_navbar")}</span>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    );
}