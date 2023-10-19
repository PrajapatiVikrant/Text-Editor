const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./models/mydb");
const userModel = require("./models/user");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//all middleware
app.use("/allfile",require('./Route'))   // to get all file
app.use("/savefile", require("./Route")); //to save file
app.use("/deletefile", require("./Route")); //to delete file
app.use("/getdata", require("./Route")); //getfiledata
app.use("/data", require("./Route")); //to save date in file
app.listen(5000);
console.log("Sever listen at port 5000");
