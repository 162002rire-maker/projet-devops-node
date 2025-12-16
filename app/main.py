"""Application Flask minimaliste.

Cette application expose une unique route (`/`) qui renvoie un message JSON.
Elle sert d'exemple pour un pipeline CI/CD avec Docker et GitHub Actions.
"""

from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def hello() -> tuple[dict[str, str], int]:
    """Route racine qui renvoie un message de bienvenue.

    Returns:
        dict: Réponse JSON contenant le message.
        int: Code HTTP 200.
    """
    return jsonify({"message": "Hello, CI/CD!"}), 200


def run() -> None:
    """Point d'entrée pour lancer le serveur Flask en local.

    Ce point d'entrée est utilisé lorsque vous exécutez `python app/main.py`.  Il
    n'est pas utilisé dans le conteneur Docker où l'application est servie par
    Gunicorn.
    """
    # Bind to all interfaces on port 5000
    app.run(host="0.0.0.0", port=5000)


if __name__ == "__main__":
    run()