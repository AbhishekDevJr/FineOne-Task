import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../../helpers/encryptData';

interface ProtectedRouteProps {
    children: ReactNode;
}

//Protects Routes based on Auth Token
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = decryptData(localStorage.getItem('loginToken'));
    return isAuthenticated === import.meta.env.VITE_APP_CLIENT_SECRET_KEY ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
