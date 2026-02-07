import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase'; // Путь к вашему файлу firebase config

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [loading, setLoading] = useState(() => auth.currentUser == null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!auth.currentUser);

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            setIsAuthenticated(!!user);
            setLoading(false);
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