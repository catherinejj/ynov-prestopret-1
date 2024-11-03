import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook pour la navigation

    const handleLogin = (event) => {
        event.preventDefault();

        // Préparer les données à envoyer
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('mdp', password);

        // Envoyer les données à l'API backend en POST pour la connexion
        fetch('http://localhost/back-ynov-prestopret/api.php?action=loginUser', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Créer un cookie après la connexion réussie
                    document.cookie = `userEmail=${email}; path=/; max-age=3600`; // Cookie valable 1 heure
                    alert('Connexion réussie !');
                    // Redirection vers la page ObjetList
                    navigate('/objet-list');
                } else {
                    alert('Erreur lors de la connexion : ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Erreur :', error);
            });
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;