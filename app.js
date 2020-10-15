var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", function () {
  console.log("MongoDB database connection established successfully!");
});

var indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
const genresRouter = require("./routes/genres");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/genres", genresRouter);
app.use("/users", usersRouter);
app.use("/login", authRouter);

module.exports = app;
