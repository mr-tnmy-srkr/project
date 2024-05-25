const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/", (req, res) => {
    console.log(req.cookies);
    res.send("Hi, I am root!");
  });
  
  app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.cookie("country", "India");
    res.send("sent you some cookie");
  });
  
  app.get("/getsignedcookies", (req, res) => {
    res.cookie("made-in", "India", { signed: true });
    res.send("sent you some cookie");
  });
  
  app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send("verified")
  })

  app.listen(3000, () => {
    console.log("server is listening on port 3000");
  });
  