const Product = require('../models/product.model');

exports.createProduct = (req, res) => {
  Product.create(req.body)
    .then(product => {
    res.send(product)
  })
  .catch(err=>res.status(404).send(err))
}