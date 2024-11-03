import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ObjetList from './components/ObjetList';
import PretList from './components/PretList';
import InsertObjet from './components/InsertObjet';
import Inscription from './components/Inscription';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <div>
                {/* Affiche la barre de navigation sur chaque page */}
                <Navbar />
                <Routes>
                    {/* Page d'accueil avec le composant Login */}
                    <Route path="/" element={<Login />} />

                    {/* Route pour l'inscription */}
                    <Route path="/inscription" element={<Inscription />} />

                    {/* Routes protégées */}
                    <Route path="/objet-list" element={
                        <ProtectedRoute>
                            <ObjetList />
                        </ProtectedRoute>
                    } />
                    <Route path="/pret-list" element={
                        <ProtectedRoute>
                            <PretList />
                        </ProtectedRoute>
                    } />
                    <Route path="/insert-objet" element={
                        <ProtectedRoute>
                            <InsertObjet />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;