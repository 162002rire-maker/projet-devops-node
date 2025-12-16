"""Tests unitaires pour l'application Flask.

Utilise PyTest pour vérifier que la route racine retourne un message et un code 200.
"""

from app.main import app


def test_root_route() -> None:
    """Vérifie que la route `/` renvoie un message JSON et un statut HTTP 200."""
    with app.test_client() as client:
        response = client.get("/")
        assert response.status_code == 200
        data = response.get_json()
        assert data == {"message": "Hello, CI/CD!"}