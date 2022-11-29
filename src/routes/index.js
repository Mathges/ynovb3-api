const express = require('express');
const router = express.Router();
const authRouter = require("./auth.route");

router.use("/auth", authRouter);
// router.use("/product", productRouter);
// router.use("/user", userRouter);
// router.user("/order", orderRouter);

module.exports = router;