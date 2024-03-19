import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const NavBarForProfileMobile = () => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
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
                <ul className="navbar-nav d-flex">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                    d="M10 12.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8zm-1.5-.5h-7v-8h7v8zm1.5 0a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10 0h-8A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h8a.5.5 0 0 1 .5.5zM14.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L13.293 6H6.5a.5.5 0 0 1 0-1h6.793l-1.647-1.646a.5.5 0 0 1 .708-.708l3 3z" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBarForProfileMobile;