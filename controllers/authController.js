const authController = {};
const User = require("../models/user");

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("no password or email");
    }

    const user = await User.loginWithEmail(email, password);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = authController;
