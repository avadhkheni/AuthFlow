const express = require("express");
const router = express.Router();
const product = require ("./controllers");

//1.read All
router.get("/ReadAllProducts", product.getAll);

//2.read One
router.get("/ReadOneProduct/:id", product.getOne);

// 3.create
router.post("/CreateProduct", product.createOne);

//4.delete
router.delete("/DeleteProduct/:id", product.deleteOne );

//5.update
router.put("/UpdateProduct/:id", product.updateOne);

module.exports = router;