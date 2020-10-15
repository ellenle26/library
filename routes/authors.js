const express = require("express");
const router = express.Router();
const authorsController = require("../controllers/authorsController");

router.post("/", authorsController.createAuthor);
router.get("/", authorsController.getAuthor);
router.put("/:id", authorsController.updateAuthor);
router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;
