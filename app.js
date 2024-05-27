const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
var methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(session(sessionOptions));
app.use(flash());

app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  console.log(res.locals.success);
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*", async (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

//Error Handling Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong" } = err;
  // res.send("Something went wrong");
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { statusCode, message, err });
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});