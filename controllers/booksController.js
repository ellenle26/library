const Book = require("../models/book");
const booksController = {};

booksController.createBook = async (req, res) => {
  try {
    const { title, description, author, genre } = req.body;
    const book = new Book({ title, description, author, genre });
    await book.save();
    res.status(201).json({
      success: true,
      data: book,
      message: ` ${book.title} created!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

booksController.getBook = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("author")
      .populate("genre", "-_id-__v");
    res.status(200).json({
      success: true,
      data: books,
      message: `Found ${books.length} book(s)`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

booksController.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: book,
      message: ` ${book.title} updated!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

booksController.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: book,
      message: `${book.title} was deleted`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = booksController;
