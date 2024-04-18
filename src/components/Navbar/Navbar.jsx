import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

import { TabBar } from 'antd-mobile';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Nav, Navbar, Container } from 'react-bootstrap'
import {
    SetOutline,
    UserOutline,
    AddOutline,
    MessageOutline,
    AppstoreOutline
} from 'antd-mobile-icons'
import { MessageOutlined } from '@ant-design/icons';

export const MyNavbar = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const { pathname } = location;
    const user = JSON.parse(localStorage.getItem('user'));

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
                <a href="/profile">{t("profile")}</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/settings">{t("settings")}</a>
            </Menu.Item>
            <Menu.Item onClick={logout}>
                <a href="/logout">{t("exit")}</a>
            </Menu.Item>
        </Menu>
    );

    const tabs = [
        {
            key: '/advertisment',
            title: t("home_navbar"),
            icon: <AppstoreOutline size={24} />,
        },
        {
            key: '/settings',
            title: t("settings"),
            icon: <SetOutline size={24} />,
        },
        {
            key: '/addItem',
            title: t("addItem_navbar"),
            icon: <AddOutline size={24} />,
        },
        {
            key: '/message',
            title: t("message_navbar"),
            icon: <MessageOutline size={24} />,
        },
        {
            key: '/profile',
            title: t("profile_navbar"),
            icon: <UserOutline size={24} />,
        },
    ];


    return (
        <div>

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary d-none d-lg-block" style={{ position: 'fixed', width: '100%', zIndex: '999', top: 0 }}>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/advertisment" style={{ fontSize: '18px' }}>{t("home_navbar")}</Nav.Link>
                            <Nav.Link href="/help" style={{ fontSize: '18px' }}>{t("help_navbar")}</Nav.Link>
                            <Nav.Link href="/contacts" style={{ fontSize: '18px' }}>{t("contact_navbar")}</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/message" style={{ fontSize: '18px', padding: '12px' }}><MessageOutlined style={{ fontSize: '25px', padding: '3px' }} /></Nav.Link>
                            {user ? (
                                <Dropdown overlay={menu}>
                                    <Nav.Link href="/profile" style={{ fontSize: '18px', padding: '12px' }}>
                                        <Avatar size={32} alt={user.name} src={user.photoUrl} style={{ marginRight: '10px' }} />
                                        {user.name}<DownOutlined style={{ fontSize: '12px' }} />
                                    </Nav.Link>
                                </Dropdown>
                            ) : (
                                <Nav.Link href="/sign_in" style={{ fontSize: '18px', padding: '12px' }}>{t("auth")}</Nav.Link>
                            )}
                            <Nav.Link href="/addItem" >
                                <Button style={{ backgroundColor: 'orange', color: 'white', border: 'none' }} size='large'>{t("addItem_navbar")}</Button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className='app d-lg-none'>
                <TabBar activeKey={pathname} onChange={value => setRoute(value)} style={{
                    position: 'fixed',
                    height: '70px',
                    width: '100%',
                    bottom: 0,
                    zIndex: 9999,
                    backgroundColor: 'white',
                    borderTop: '1px solid #ccc',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                }}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>

        </div>
    );
}