import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookieUtils';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Détruire le cookie
        document.cookie = "userEmail=; path=/; max-age=0"; // Supprime le cookie en définissant max-age à 0

        // Rediriger vers la page de connexion
        navigate('/');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Accueil (Login)</Link></li>
                <li><Link to="/inscription">Inscription</Link></li>
                <li><Link to="/objet-list">Liste des Objets</Link></li>
                <li><Link to="/pret-list">Liste des Prêts</Link></li>
                <li><Link to="/insert-objet">Ajouter un Objet</Link></li>
                {/* Afficher le bouton de déconnexion si l'utilisateur est connecté */}
                {getCookie('userEmail') && (
                    <li>
                        <button onClick={handleLogout}>Se déconnecter</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;