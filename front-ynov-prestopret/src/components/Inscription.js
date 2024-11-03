import React, { useState } from 'react';
import { hashPassword } from '../utils/hashUtils'; // Importer la fonction de hachage si nécessaire

function Register() {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setCookie = (name, value, maxAge) => {
        document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const hashedPassword = await hashPassword(password);

            const formData = new URLSearchParams();
            formData.append('prenom_utilisateur', prenom);
            formData.append('nom_utilisateur', nom);
            formData.append('email', email);
            formData.append('mdp', hashedPassword);

            fetch('http://localhost/back-ynov-prestopret/api.php?action=registerUser', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        // Créer un cookie après l'inscription réussie
                        setCookie('userEmail', email, 3600); // Cookie valable 1 heure
                        alert('Inscription réussie !');
                    } else {
                        alert('Erreur lors de l\'inscription.');
                    }
                })
                .catch((error) => {
                    console.error('Erreur :', error);
                });
        } catch (error) {
            alert('Erreur lors du hachage du mot de passe');
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Prénom :</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nom :</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Register;