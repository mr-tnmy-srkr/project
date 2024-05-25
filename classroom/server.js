const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});
// ......................................................................
app.get("/reqcount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  console.log(req.session);
  res.send(`you sent the request ${req.session.count} times`);
});
// ......................................................................

// ......................................................................
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  // console.log(req.session);
  if ((name == "anonymous")) {
    req.flash("error", "user not registered!");
  } else {
    req.flash("success", "user register successfully!");
  }
  res.redirect("/hello");
});
app.get("/hello", (req, res) => {
  // console.log(req.session);
  // console.log(req.flash("success"));
  // res.send(`hello ${req.session.name}`);
  // const messages = req.flash("success");
  // express er local er modheye vorle ejs e pass korar darkar nai
  /*  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error"); */
  /* res.render("page.ejs", { name: req.session.name, msg: messages }); */
  res.render("page.ejs", { name: req.session.name });
});

// ......................................................................

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
