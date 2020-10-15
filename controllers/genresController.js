const Genre = require("../models/genre");
const genresController = {};

genresController.getGenre = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json({
      success: true,
      data: genres,
      message: `Found ${genres.length} genre(s)`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

genresController.createGenre = async (req, res) => {
  try {
    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.status(200).json({
      success: true,
      data: genre,
      message: `${genre.name} created`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

genresController.updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(
      reg.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: genre,
      message: `${genre.name} created`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

genresController.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: genre,
      message: `${genre.name} created`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = genresController;
