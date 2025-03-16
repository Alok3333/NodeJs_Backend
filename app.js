require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const playerRoutes = require("./Router/playerListRoutes");

const PORT = process.env.PORT || 4001;
const app = express();

app.use(express.json());

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
