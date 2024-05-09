const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({})
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  await Listing.insertMany(initData.data)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

initDB();
