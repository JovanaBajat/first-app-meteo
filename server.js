const express = require('express');
const path = require('path');// Charge le middleware des routes
const morgan = require('morgan'); // Charge le middleware de logging
const bodyParser = require('body-parser');
const routes = require('./routes'); // Charge le fichier routes.js

const app = express();

app.set('view engine', 'ejs'); // Indique qu'il y a des fichiers ejs
app.set('views', path.resolve(__dirname, 'views')); // Indique le chemin de dossier views (set = indique)

app.use(express.static(path.resolve(__dirname, 'public'))); /* Indique que le dossier public contient des fichiers 
statiques (middleware chargé de base) à utiliser */
app.use(morgan('dev')); // Active le middleware de logging
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes); // (use = utilise les middlewares)

app.listen(8000, "localhost",() => {
  console.log("server is running!")
});
