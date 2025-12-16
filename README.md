# Démo de pipeline CI/CD pour une application Flask

Ce dépôt illustre comment mettre en place un pipeline **CI/CD complet** avec GitHub Actions pour une application Web simple écrite en [Flask](https://flask.palletsprojects.com/).  Il met en œuvre les bonnes pratiques DevOps : versionner le code, automatiser les tests, construire et publier une image Docker et déployer automatiquement l’application sur un serveur.

## 🗂️ Structure du projet

* **`app/`** – contient le code source de l’application Flask (`main.py`).
* **`tests/`** – tests unitaires exécutés par PyTest.
* **`requirements.txt`** – liste des dépendances Python.
* **`Dockerfile`** – instructions pour construire l’image Docker de l’application.  Le Dockerfile s’inspire de bonnes pratiques (utilisation d’une image `python:3.x‑slim`, création d’un utilisateur non privilégié, installation des dépendances et exposition du port 5000)【834011159707234†L171-L205】.
* **`.github/workflows/`** – fichiers YAML décrivant les workflows GitHub Actions : CI, publication de l’image Docker et déploiement.

## 🚀 Démarrer en local

1. Cloner le dépôt :  
   `git clone https://github.com/votre-utilisateur/devops-ci-cd-demo.git`
2. Installer les dépendances :  
   `python -m pip install --upgrade pip && pip install -r requirements.txt`
3. Exécuter l’application :  
   `python app/main.py`  
   L’application sera accessible sur [http://localhost:5000](http://localhost:5000).
4. Lancer les tests :  
   `pytest -v`  
   Les tests unitaires s’exécutent pour valider l’API.

## 🌳 Stratégie de branche

Le dépôt utilise deux branches principales :

* `dev` : branche de développement. Toute nouvelle fonctionnalité est développée via une **Pull Request** vers `dev`. Le workflow de CI s’exécute à chaque `push` sur cette branche pour s’assurer que le code reste fonctionnel.
* `main` : branche stable contenant les versions prêtes pour la production.  Les merges depuis `dev` vers `main` doivent passer par une revue de code et les **status checks** (tests) doivent être verts. Des workflows GitHub Actions permettent de n’exécuter certaines actions que sur des branches données grâce aux filtres `branches`【311895884998725†L443-L471】.

## ✅ Intégration continue (CI)

Le fichier `.github/workflows/ci.yml` définit un workflow exécuté à chaque `push` sur `dev` ou `main`.  Il effectue les étapes suivantes :

1. **Checkout du dépôt** : obtention du code source.
2. **Installation de Python** : configuration d’un interpréteur Python via l’action `setup-python`【722684170230315†L666-L688】.
3. **Installation des dépendances** : installation des packages listés dans `requirements.txt` puis de `pytest`【722684170230315†L666-L696】.
4. **Exécution des tests unitaires** : lancement de PyTest pour valider le bon fonctionnement de l’API. Les erreurs ou échecs remontent dans les logs de build.
5. **Génération et upload d’un artefact** : création d’un dossier `dist/` contenant le code et les dépendances nécessaires puis archivage via l’action `upload-artifact`. Les artefacts facilitent le passage d’une étape du pipeline à une autre.

Le déclenchement conditionnel sur des branches spécifiques utilise la clé `branches` dans la section `on.push`【311895884998725†L443-L471】.

## 🐳 Construction et publication de l’image Docker

Le fichier `.github/workflows/publish.yml` s’exécute lors de la création d’une **release** GitHub.  Il utilise les actions officielles de Docker pour :

1. **Se connecter à Docker Hub** : à l’aide de l’action `docker/login-action` et des secrets `DOCKER_USERNAME` et `DOCKER_PASSWORD`【283841589880474†L344-L361】.
2. **Extraire les métadonnées** : génération des tags (`latest` et numéro de version) via `docker/metadata-action`【283841589880474†L344-L361】.
3. **Construire et pousser l’image** : l’action `docker/build-push-action` construit l’image en utilisant le `Dockerfile` et la publie sur Docker Hub si la construction réussit【283841589880474†L332-L489】.

Avant d’utiliser ce workflow, créez un dépôt sur Docker Hub et ajoutez vos identifiants dans les **secrets** du dépôt GitHub (`DOCKER_USERNAME` et `DOCKER_PASSWORD`). Consultez la documentation GitHub pour savoir comment ajouter un secret dans les paramètres du dépôt【51400520633935†L310-L324】.

## 📦 Déploiement continu (CD)

Le fichier `.github/workflows/deploy.yml` illustre un déploiement d’une image Docker sur un serveur Linux via SSH.  Le workflow est déclenché lorsque le workflow de publication termine avec succès. Les étapes incluent :

1. **Installation de la clé SSH** : usage de l’action `webfactory/ssh-agent` pour charger la clé privée (stockée dans le secret `SSH_PRIVATE_KEY`).
2. **Ajout de l’hôte distant** dans `known_hosts`.
3. **Connexion au serveur** : connexion SSH et exécution de commandes Linux : connexion à Docker Hub, récupération de l’image publiée, arrêt et suppression du conteneur existant, création et lancement du nouveau conteneur.
4. **Notification** : en fin de déploiement, un appel à un webhook (Slack/Discord) peut être envoyé si la variable `SLACK_WEBHOOK_URL` est configurée.

Pour des raisons de sécurité, la clé privée SSH, l’adresse IP du serveur et les identifiants Docker doivent être stockés comme **secrets** GitHub. Le guide RunCloud rappelle qu’il ne faut jamais inscrire des informations sensibles directement dans les fichiers YAML du workflow et explique comment stocker ces secrets【908105939201469†L139-L169】.

## 🏅 Bonus

* **Badges** : le README fournit des emplacements pour ajouter des badges d’état (build, version, image Docker). Une fois le dépôt public et les workflows exécutés, vous pouvez utiliser les badges générés par GitHub (cf. `Settings > Actions > Generate status badge`) pour afficher l’état du build【722684170230315†L795-L840】.
* **Stratégie de branches** : imposez l’utilisation de Pull Requests avec revue obligatoire et validation des tests avant merge. Ceci peut être configuré dans `Settings > Branches` (règles de protection) et en activant les **status checks** obligatoires.
* **Tests avancés** : ajoutez des étapes de linting (par ex. l’action Ruff pour Python) ou des tests end‑to‑end dans le fichier `ci.yml`【722684170230315†L698-L735】.

Ce dépôt sert de base pédagogique : libre à vous de l’adapter à votre stack (Node.js, React, Django…) et à votre plateforme de déploiement (GitHub Pages, Render, Fly.io, etc.).
