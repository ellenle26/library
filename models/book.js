const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  genre: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Genre",
      required: true,
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
