**Guide d'installation du projet en local**

Ce document vous explique les étapes à suivre pour installer et exécuter le projet en local. Le projet est composé de deux parties : un backend et un frontend.

### Prérequis
1. Assurez-vous d'avoir un serveur Apache fonctionnel sur votre machine.
2. Installez Node.js (https://nodejs.org/) pour exécuter le backend.
3. Installez MySQL (https://dev.mysql.com/) pour la base de données.
4. Clonez les deux répertoires du projet depuis GitHub :
   - Backend : [Lien GitHub Backend](https://github.com/boutamente-abdessamad/Voile-Style---simple-site-Backend)
   - Frontend : [Lien GitHub Frontend](https://github.com/boutamente-abdessamad/Voile-Style---simple-site/tree/main)

---

### Partie Backend

Le backend utilise **Express.js** (https://expressjs.com/) pour le serveur et **MySQL** pour la gestion de la base de données.

#### Étapes d'installation
1. **Téléchargement du projet**
   - Clonez ou téléchargez le projet backend depuis le lien GitHub.
   - Naviguez vers le dossier racine du projet.

2. **Installation des dépendances**
   - Ouvrez un terminal dans le dossier racine du projet.
   - Exécutez la commande suivante :
     ```bash
     npm install
     ```
     > Cette commande installe toutes les dépendances nécessaires mentionnées dans le fichier `package.json`.

3. **Migrations**
   - Exécutez la commande suivante :
     ```bash
     npm run migrate
     ```
     > Cette commande crée les tables nécessaires dans la base de données MySQL.

4. **Ajout de données de départ**
   - Exécutez la commande suivante :
     ```bash
     npm run seed
     ```
     > Cette commande insère des données initiales dans la base de données (par exemple, des utilisateurs, produits, etc.).

5. **Démarrage du serveur**
   - Exécutez la commande suivante :
     ```bash
     npm run start
     ```
     > Cette commande démarre le serveur backend sur le port défini (par défaut : 3000).

#### Remarque importante
Ces étapes doivent être complétées avant de passer à la partie frontend.

---

### Partie Frontend

Le frontend utilise **HTML5**, **CSS**, **Bootstrap** (https://getbootstrap.com/) et **jQuery** (https://jquery.com/) pour la conception de l'interface utilisateur.

#### Étapes d'installation
1. **Téléchargement du projet**
   - Clonez ou téléchargez le projet frontend depuis le lien GitHub.
   - Copiez les fichiers dans le dossier racine de votre serveur Apache.


#### Fonctionnalités principales
- Les requêtes sont gérées via **AJAX API**, permettant de communiquer avec le backend sans recharger la page.

---

### Références des technologies
1. **Node.js** : https://nodejs.org/
2. **Express.js** : https://expressjs.com/
3. **MySQL** : https://dev.mysql.com/
4. **Bootstrap** : https://getbootstrap.com/
5. **jQuery** : https://jquery.com/
6. **HTML5** : https://developer.mozilla.org/fr/docs/Web/HTML
7. **CSS** : https://developer.mozilla.org/fr/docs/Web/CSS

---

### Questions ou Problèmes ?
Pour toute question ou problème lié à l'installation, n'hésitez pas à me contacter.

