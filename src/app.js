const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const apiRouter = require('./routes');

app.use(bodyParser.json())

mongoose.connect(
  `mongodb://localhost:27017/ynov-api`, 
).then(() => {
  console.log("successfully connect to database")
}).catch(err=>console.log(err))

app.use("/api/v1", apiRouter)

//Méthod launch app
app.listen(process.env.PORT, function () {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
}); 

// Ajouter une route + controller spécifiquement pour la MAJ du mot de passe
// Appliquer le middleware mongoose .pre() pour hasher le mdp en base de données.
// Donc à chaque fois que le mdp va être modifié le middleware va déclencher le hashage du mdp.
// -> Déplacer le hash sur le controller