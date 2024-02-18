import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; // Путь к вашему файлу firebase config

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [loading, setLoading] = useState(JSON.parse(localStorage.getItem('loading')) || true);
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuthenticated')) || false);

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            if (user) {
                setIsAuthenticated(true);
                localStorage.setItem('isAuthenticated', true);
            } else {
                setIsAuthenticated(false);
                localStorage.setItem('isAuthenticated', false);
            }
            setLoading(false);
            localStorage.setItem('loading', false);
        });
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/sign_in" />
                )
            }
        />
    );
};

export default PrivateRoute;