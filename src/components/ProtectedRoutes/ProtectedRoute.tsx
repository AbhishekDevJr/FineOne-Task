import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../../helpers/encryptData';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = decryptData(localStorage.getItem('loginToken'));
    return isAuthenticated === 'chintapakdumdum' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
