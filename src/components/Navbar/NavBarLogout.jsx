import React from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import { NavBar } from 'antd-mobile'
import { LogoutOutlined } from '@ant-design/icons';

export const NavBarLogout = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="d-lg-none">
            <NavBar onBack={goBack} right={<LogoutOutlined onClick={handleLogout} style={{fontSize: '22px'}}/>}
            style={{borderBottom: 'solid 1px #c4c4c4', backgroundColor: '#ebebeb', position: 'fixed', top: 0, width: '100%', zIndex: '999'}}></NavBar>
        </div>
    );
}