const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});

app.get("/listing", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs", { allListings });
});

/* 
  let sampleListing = new Listing({
    title: "My new villa",
    description: "By the beach",
    price: 1200,
    location: "California",
    country: "India",
  });
  await sampleListing
    .save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  res.send("successful testing");
});
 */

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
