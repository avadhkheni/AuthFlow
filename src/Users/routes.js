const express = require("express");
const router = express.Router();
const user = require ("./controllers");

//1.read All-

router.get("/test", user.getAll);

// Routes.get("/test/2", product.getAll);

//2.read One
router.get("/product/:id", user.getOne);

//5.update
router.put("/:index", user.updateOne);

//4.delete
router.delete("/:index", user.deleteOne );



module.exports = router;