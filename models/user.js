const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltrounds = 10;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      trim: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: [true, "User must have an email"],
      trim: true,
      unique: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, saltrounds);
  next();
});

userSchema.statics.loginWithEmail = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!email) {
    throw new Error("we don't have that user");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("password is not match");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
