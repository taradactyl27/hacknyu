const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

  router.post("/createtask", (req,res) =>{
  let task = req.body.data;
  let id = req.body.id;
  User.post(
    {_id: id},
    {$push: {scheduledtasks: task}}
  )
  });

router.delete("/deletetask", (req,res) =>{
  let id = req.body.id;
  User.remove(
    {_id: id},
  )
  });



router.put("/makeactive", (req, res) => {
  let task = req.body.data;
  let id = req.body.id;
  User.update(
    {_id: id},
    {$push: {activetasks: task}}
  )
});

router.put("/makescheduled", (req, res) => {
  let task = req.body.data;
  let id = req.body.id;
  User.update(
    {_id: id},
    {$push: {scheduledtasks: task}}
  )
});




//module.exports = TaskManager;
