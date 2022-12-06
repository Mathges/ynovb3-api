const { reset } = require("nodemon");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/user.model");

exports.getUser = (req, res) => {
  User.findById(req.userToken.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
        message: "user not found"
      })
    }
      res.send(user);
  })
  .catch(err => res.status(400).send(err)) 
}

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found"
        })
      }
      User.findById(user._id).then(userupdated => {
        res.send(userupdated);
      })
    })
    .catch(err => res.status(400).send(err))
}

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    res.send(user)
  }).catch(err=>res.status(400).send(err))
}

exports.getUsers = (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(err => res.status(400).send(err));
}

exports.updateUserWishlist = (req, res) => {
  User.findById(req.userToken.id).then(user => {
    const { wishlist } = user;
    if (wishlist.includes(req.body.productId)) {
      return res.send({
        message:"product already in you wishlist"
      })
    }
    user.wishlist.push(req.body.productId);
    user.save().then(userUpdate => {
      User.findById(req.userToken.id).populate('wishlist')
        .then(user => res.send(user))
          .catch(err => res.status(404).send(err))
    })
  })
}