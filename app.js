require("dotenv").config();

const express = require("express");

const app = express();

//establish database connection
const mongoose = require("mongoose");
const mongodb = process.env.mongoString;
mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

//enable cors
const cors = require("cors");
app.use(cors());

//use routes
app.use(express.json());
const apiRouter = require("./routes/api");
app.use("/", apiRouter);

app.listen(5000);
