const express = require("express");
const product = require ("../controllers/productController");
const { authUser } = require("../middleware/authUser");
const upload = require("../config/multer");

const router = express.Router();

//1.read All
router.get("/", authUser, product.getAll);

//2.read One
router.get("/:id", authUser, product.getById);

// 3.create
router.post("/", authUser, upload.single("image"), product.createOne);

//4.update
router.put("/:id", authUser, product.updateOne);

//5.delete
router.delete("/:id", product.deleteOne );

module.exports = router;