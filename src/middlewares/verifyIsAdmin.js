function verifyIsAdmin(req, res, next) {
  console.log(req.userToken);
  if (!req.userToken.isAdmin) {
    res.status('401').send({
      auth: false,
      message: "you must be Admin"
    })
  }
  next();
}

module.exports = verifyIsAdmin;