const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// La route principale (Ce que verra le jury)
app.get('/', (req, res) => {
    res.status(200).send('Bonjour le Jury ! Version Node.js opérationnelle.');
});

// Endpoint technique pour vérifier que l'app est en vie
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

// Démarrage du serveur
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Application démarrée sur le port ${port}`);
    });
}

module.exports = app;