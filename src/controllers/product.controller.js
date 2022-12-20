const Product = require('../models/product.model');

exports.createProduct = (req, res) => {
  Product.create(req.body)
    .then(product => {
      res.send(product)
    })
    .catch(err => res.status(404).send(err))
}

exports.filterProducts = async (req, res) => {
  try {
    // const products = await Product.find({
    //   stock: {
    //     $gt:0
    //   },
    //   reference: {
    //     $regex: new RegExp("^AF", "i")
    //   },
    //   ...req.body.searchString ? {
    //     $or: [
    //       {
    //         description: {
    //           $regex: new RegExp(req.body.searchString, "i")
    //         },
    //       },
    //       {
    //         name: {
    //           $regex: new RegExp(req.body.searchString, "i")
    //         },
    //       }

    //     ]
    //   }: {},
    //   ...req.body.range ? {
    //     price: {
    //       $gt: req.body.range[1],
    //       $lt: req.body.range[0] || 0,
    //     }
    //   }: {}
    // });
    const products = await Product.find({});


    function filterProduct(products) {
      // first filter, on stock and price
      let basicFilter = products.filter(product =>
        product.stock > 0 &&
        product.reference.includes("AF")
      )

      if (req.body.searchString) {
        // if there is a search string, i reassign the first filter result with a new one
        basicFilter = basicFilter.filter(product =>
          product.description.includes(req.body.searchString) ||
          product.name.inculdes(req.body.searchString)
        )
      }

      if (req.body.range) {
        // if there is a range, same than searchString
        basicFilter = basicFilter.filter(product =>
          product.price < req.body.range[1] &&
          product.price > req.body.range[0]
        )
      }
      return basicFilter
    }

    const response = filterProduct(products);
    return res.send(response);
  } catch (error) {
    console.log(error);
    return res.send({"message": "error during research, sry"})
  }

}