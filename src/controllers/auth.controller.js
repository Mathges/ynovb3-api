const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
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

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message:"user not found"
        })
      }
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false
        })
      }
      res.send({
        message: "User logged",
        auth:true
      })
    })
  .catch(err=>res.Status(400).send(err))
}