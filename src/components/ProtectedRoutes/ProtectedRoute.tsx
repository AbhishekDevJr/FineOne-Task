import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../../helpers/encryptData';

interface ProtectedRouteProps {
    children: ReactNode;
}

//Protects Routes based on Auth Token
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const verifyUserApi = async () => {
        try {
            const userAuthVerify = await fetch(`${import.meta.env.VITE_APP_BACK_END_URL}/user/verify-auth/`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                credentials: 'include',
            });
            const userAuthVerifyJson = await userAuthVerify.json()

            if (userAuthVerifyJson?.title === 'User Authenticated' && userAuthVerifyJson?.authenticated) {
                setIsAuthenticated(true);
            }
            else {
                setIsAuthenticated(false);
            }
        }
        catch (e) {
            console.log(e)
            setIsAuthenticated(false)
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        verifyUserApi();
    }, []);

    if (isLoading) return <div>Verifying User Authentication...</div>;

    return isAuthenticated ? children : <Navigate to="/" />;

};

export default ProtectedRoute;
