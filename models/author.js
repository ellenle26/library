const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
  },
  { toJSON: { virtuals: true } }
);

authorSchema.virtual("book", {
  ref: "Book",
  localField: "_id",
  foreignField: "author",
  justOne: false,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
