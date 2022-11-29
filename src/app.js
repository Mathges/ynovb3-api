const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const apiRouter = require('./routes');

app.use(bodyParser.json())

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.gl9tkny.mongodb.net/?retryWrites=true&w=majority`, 
).then(() => {
  console.log("successfully connect to database")
}).catch(err=>console.log(err))

app.use("/api/v1", apiRouter)

//Méthod launch app
app.listen(process.env.PORT, function () {
  console.log("Server launch");
}); 