import React from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../../helpers/encryptData';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = decryptData(localStorage.getItem('loginToken'));
    return isAuthenticated === 'chintapakdumdum' ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
