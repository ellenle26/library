const Author = require("../models/author");
const authorsController = {};

authorsController.getAuthor = async (req, res) => {
  try {
    const authors = await Author.find().populate("book");
    res.status(200).json({
      success: true,
      data: authors,
      message: `Found ${authors.length} author(s)`,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      data: err.message,
    });
  }
};

authorsController.createAuthor = async (req, res) => {
  try {
    const author = new Author({ name: req.body.name });
    await author.save();
    res.status(201).json({
      success: true,
      data: author,
      message: `${author.name} was created`,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      data: err.message,
    });
  }
};

authorsController.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: author,
      message: `Author ${author.id} updated!`,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      data: err.message,
    });
  }
};

authorsController.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: author,
      message: `Author ${author.name} was deleted`,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      data: err.message,
    });
  }
};

module.exports = authorsController;
