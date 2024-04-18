import React from "react";
import { useHistory } from "react-router-dom";
import { NavBar } from 'antd-mobile'

export const NavBarBack = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <div className="d-lg-none">
            <NavBar onBack={goBack} style={{borderBottom: 'solid 1px #c4c4c4', backgroundColor: '#ebebeb', position: 'fixed', top: 0, width: '100%', zIndex: '999'}}></NavBar>
        </div>
    );
}