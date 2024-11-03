-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 18 oct. 2024 à 09:54
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ynov_prestopret`
--

-- --------------------------------------------------------

--
-- Structure de la table `emprunteur`
--

CREATE TABLE `emprunteur` (
  `id` int(11) NOT NULL,
  `nom_emprunteur` varchar(255) NOT NULL,
  `prenom_emprunteur` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `emprunteur`
--

INSERT INTO `emprunteur` (`id`, `nom_emprunteur`, `prenom_emprunteur`, `email`) VALUES
(1, 'Empreinteur1', 'Paul', 'teterq@eport.lm');

-- --------------------------------------------------------

--
-- Structure de la table `objet`
--

CREATE TABLE `objet` (
  `id` int(11) NOT NULL,
  `nom_objet` varchar(255) NOT NULL DEFAULT 'Sans Nom',
  `description_objet` text NOT NULL,
  `date_objet` datetime NOT NULL DEFAULT current_timestamp(),
  `statut_objet` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `objet`
--

INSERT INTO `objet` (`id`, `nom_objet`, `description_objet`, `date_objet`, `statut_objet`) VALUES
(1, 'sandales', 'à talon', '2024-10-18 09:30:32', 1);

-- --------------------------------------------------------

--
-- Structure de la table `pret`
--

CREATE TABLE `pret` (
  `id` int(255) NOT NULL,
  `nom_pret` varchar(255) NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `fk_emprunteur` int(11) NOT NULL,
  `fk_objet` int(11) NOT NULL,
  `fk_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pret`
--

INSERT INTO `pret` (`id`, `nom_pret`, `date_debut`, `date_fin`, `fk_emprunteur`, `fk_objet`, `fk_utilisateur`) VALUES
(1, 'chaussures', '2024-10-17 20:49:45', '2026-10-30 20:49:45', 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `nom_utilisateur` varchar(255) NOT NULL,
  `prenom_utilisateur` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom_utilisateur`, `prenom_utilisateur`, `email`, `mdp`) VALUES
(1, 'Y', 'Angie', 'angie@angie.co.ll', '123456');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `emprunteur`
--
ALTER TABLE `emprunteur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `objet`
--
ALTER TABLE `objet`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pret`
--
ALTER TABLE `pret`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_empreinteur` (`fk_emprunteur`),
  ADD KEY `fk_objet` (`fk_objet`),
  ADD KEY `fk_utilisateur` (`fk_utilisateur`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `emprunteur`
--
ALTER TABLE `emprunteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `objet`
--
ALTER TABLE `objet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `pret`
--
ALTER TABLE `pret`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `pret`
--
ALTER TABLE `pret`
  ADD CONSTRAINT `fk_empreinteur` FOREIGN KEY (`fk_emprunteur`) REFERENCES `emprunteur` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_utilisateur` FOREIGN KEY (`fk_utilisateur`) REFERENCES `utilisateur` (`id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `pret_ibfk_1` FOREIGN KEY (`fk_objet`) REFERENCES `objet` (`id`) ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
