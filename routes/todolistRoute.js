const todolistController = require("../controllers/todolistController");
const express = require("express");
const router = express.Router();

router.get("/:id/mylist", todolistController.index)
router.get("/:id/", todolistController.show)
router.post("/add", todolistController.create)
router.post("/:id/handleChecked", todolistController.handleChecked)
router.put("/:id/update", todolistController.update)


module.exports = router