const express = require("express");
const router = express.Router();
const user = require ("./controllers");

//1.read All-

router.get("/getAllUsers", user.getAll);

//2.read One
router.get("/GetOneUser/:id", user.getOne);

//5.update
router.put("/UpdateUser/:id", user.updateOne);

//4.delete
router.delete("/DeleteUser/:id", user.deleteOne);



module.exports = router;