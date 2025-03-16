require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const playerRoutes = require("./Router/playerListRoutes");
// const path = require("./Public")

const PORT = process.env.PORT || 4001;
const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("Public"));

// Connection to mongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Has Connected!");
  })
  .catch((err) => {
    console.log(err, "err from Mongodb");
  });

// Routes
app.use("/api/v1/list", playerRoutes);

app.listen(PORT, () => console.log(`Server Has Connected On ${PORT}`));
