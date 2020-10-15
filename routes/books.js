const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");

router.post("/", booksController.createBook);
router.get("/", booksController.getBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;
