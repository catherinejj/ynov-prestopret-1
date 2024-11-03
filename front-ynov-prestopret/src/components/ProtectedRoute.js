import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookieUtils';

function ProtectedRoute({ children }) {
    const userEmail = getCookie('userEmail');

    if (!userEmail) {
        // Redirige vers la page de connexion si le cookie n'est pas présent
        return <Navigate to="/" />;
    }

    // Rendre le composant enfant si le cookie est présent
    return children;
}

export default ProtectedRoute;