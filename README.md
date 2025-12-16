📦 Projet DevOps - Node.js CI/CD

<!-- 👇 REMPLACE "shawnarthur" CI-DESSOUS PAR TON VRAI NOM GITHUB -->

<!-- Le badge Docker est déjà configuré avec ton pseudo shawnarthur -->

Ce projet est une démonstration d'un pipeline DevOps complet pour le Jury.

🚀 Fonctionnalités

API Node.js : Une application web simple (server.js).

CI (Intégration Continue) : Tests automatiques lancés à chaque modification (ci.yml).

CD (Déploiement Continu) : Construction de l'image Docker et déploiement simulé à chaque Release (publish.yml).

🛠 Commandes

npm test : Lancer les tests.

docker build . : Construire l'image.

📋 Scénario de Démonstration

Modification du code sur une branche.

Pull Request : Les tests (CI) se lancent automatiquement.

Merge & Release : L'image Docker est publiée et déployée automatiquement.
