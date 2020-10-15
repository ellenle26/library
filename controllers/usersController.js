const User = require("../models/user");

const usersController = {};

usersController.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json({
      success: true,
      data: user,
      message: `${user.name} created`,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};

usersController.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
      message: `Found ${users.length} user(s)`,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = usersController;
