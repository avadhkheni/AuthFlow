const express = require("express");
const router = express.Router();
const product = require ("./controllers");

//1.read All-

router.get("/test", product.getAll);

// Routes.get("/test/2", product.getAll);

//2.read One
router.get("/product/:id", product.getOne);

// 3. create
router.post("/products", product.createOne);

//4.delete
router.delete("/:index", product.deleteOne );

//5.update
router.put("/:index", product.updateOne);


module.exports = router;