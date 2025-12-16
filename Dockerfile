# Image de base officielle Python minimaliste
FROM python:3.11-slim

# Empêche Python d'écrire des fichiers pyc et force le flush des logs (bonnes pratiques)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Créer un utilisateur non privilégié pour exécuter l'application (bonne pratique de sécurité)
RUN adduser --disabled-password --gecos "" --home "/nonexistent" --shell "/sbin/nologin" appuser

# Définir le répertoire de travail
WORKDIR /app

# Copier seulement les dépendances pour profiter du cache Docker
COPY requirements.txt requirements.txt

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code de l'application
COPY app app

# Changer l'utilisateur
USER appuser

# Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Démarrer l'application via Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app.main:app"]