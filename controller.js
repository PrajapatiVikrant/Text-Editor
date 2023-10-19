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
let api = {

  getallfile: async function(req,res){
    const data = await userModel.find({});
    const arr = data.map((elem,ind)=>{
      return elem.file;
    })
    
    res.json(arr);
  },
  savefile: async function (req, res) {
    let data = new userModel({ file: req.query.name, data: "empty" });
    let result = await data.save();
    res.json({
      result,
    });
  },
  deletefile: async function (req, res) {
    console.log(req.query.file);
    let deletedata = await userModel.deleteOne({ file: req.query.file });
    res.send(deletedata);
  },
  getdata: async function (req,res) {
    let data = await userModel.findOne({ file: req.params.file });
    console.log(data);
    res.json({
      file: data.file,
      data: data.data,
    });
  },
  savedata: async function (req, res) {
    let data = await userModel.updateOne(
      { file: req.body.file },
      { data: req.body.data }
    );
    console.log(data);
    res.send("saved");
  },
};
module.exports = api;
