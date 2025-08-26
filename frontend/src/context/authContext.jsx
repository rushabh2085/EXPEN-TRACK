import React, {createContext,useState,useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if(token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }catch(error) {
                localStorage.removeItem('authToken');
            }
        }
    },[]); // [] tells that the app runs only ONCE,when the app starts.

    const login = (token) => {
        localStorage.setItem('authToken', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);   
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

