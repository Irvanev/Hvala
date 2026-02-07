import React, { createContext, useState, useContext } from 'react';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    return (
        <UserRoleContext.Provider value={{ role, setRole }}>
            {children}
        </UserRoleContext.Provider>
    );
};

export const useUserRole = () => useContext(UserRoleContext);