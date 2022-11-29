const User = require("../models/user.model");

exports.register = (req, res) => {
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
}