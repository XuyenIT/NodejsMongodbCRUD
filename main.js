require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const mongoose = require("mongoose");
const rootRouter = require("./routers/root.router");
const app = express();
const port = process.env.PORT;
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static file
app.use(express.static("public"));
//set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//connect mongodb
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 60000 },
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(rootRouter);
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
