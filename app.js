const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.model');
require('dotenv').config();

app.use(bodyParser.json())

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.gl9tkny.mongodb.net/?retryWrites=true&w=majority`, 
).then(() => {
  console.log("successfully connect to database")
}).catch(err=>console.log(err))

app.post('/auth/register', (req, res) => {
  // const { firstName, lastName, password, email } = req.body;
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email
  });

  newUser.save()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(400).send(err)
  })

})

//Méthod launch app
app.listen(process.env.PORT, function () {
  console.log("Server launch");
}); 