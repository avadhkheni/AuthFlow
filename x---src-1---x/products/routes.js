const express = require("express");
const product = require ("./controllers");
const { authUser } = require("../auth/middleware/authUser");
const upload = require("../auth/config/multerconfig");
const uplode = require("../auth/config/multerconfig");

const router = express.Router();

//1.read All
router.get("/ReadAllProducts", authUser, product.getAll);

//1.getData
router.get("/ReadData", authUser, product.getData);

//2.read One
router.get("/ReadOneProduct/:id", authUser, product.getOne);

// 3.create
router.post("/CreateProduct", authUser,uplode.single("image"), product.createOne);

//4.update
router.put("/UpdateProduct/:id", authUser, product.updateOne);

//5.delete
router.delete("/DeleteProduct/:id", product.deleteOne );


module.exports = router;