const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var cron = require('node-cron');


function createTask(id,task){
  User.findOneAndUpdate({"_id": id}, 
    {$push: {"scheduledtasks": task}}, 
    {new: true, safe: true, upsert:true}).then((result) => {
      return true;
  }).catch((error) => {
      return false;
    });
};

function makeactive(id,task){
  User.findOneAndUpdate({"_id": id}, 
    {$pull: {"scheduledtasks": task}}, 
    {new: true, safe: true, upsert:true}).then((result) => {
  }).catch((error) => {
      return false;
    });
  User.findOneAndUpdate({"_id": id}, 
    {$push: {"activetasks": task}}, 
    {new: true, safe: true, upsert:true}).then((result) => {
      return true;
  }).catch((error) => {
      return false;
    });
}

function makescheduled(id,task){
  User.findOneAndUpdate({"_id": id}, 
  {$pull: {"activetasks": task}}, 
  {new: true, safe: true, upsert:true}).then((result) => {
}).catch((error) => {
    return false;
  });
User.findOneAndUpdate({"_id": id}, 
  {$push: {"scheduledtasks": task}}, 
  {new: true, safe: true, upsert:true}).then((result) => {
    return true;
}).catch((error) => {
    return false;
  });
}

function deletetask(id,task){
  User.findOneAndUpdate({"_id": id}, 
    {$pull: {"scheduledtasks": task}}, 
    {new: true, safe: true, upsert:true}).then((result) => {
      return true;
  }).catch((error) => {
      return false;
    });
}
router.post("/createtask", (req,res) =>{
  let task = req.body.data;
  let id = req.body.id;
  cron.schedule('* 1 * * * *', () => {
    console.log("setting task to active");
    makeactive(id,task);
    this.destroy();
  })
  if (createTask(id,task) === true){
    return res.status(200).json({createTask: "Created task successfully!"});
  }
  else{
    return res.status(400).json({createTask: "Creating task failed!"});
  }
});

router.delete("/deletetask", (req,res) =>{
  let task = req.body.data;
  let id = req.body.id;
  deletetask(id,task);
  if (createTask(id,task)){
    return res.status(200).json({createTask: "Deleted task successfully!"});
  }
  else{
    return res.status(400).json({createTask: "Deleting task failed!"});
  }
  });

router.put("/makeactive", (req, res) => {
  let task = req.body.data;
  let id = req.body.id;
  makeactive(id,task);
  if (createTask(id,task)){
    return res.status(200).json({createTask: "Task made active successfully!"});
  }
  else{
    return res.status(400).json({createTask: "Making task active failed!"});
  }
});

router.put("/makescheduled", (req, res) => {
  let task = req.body.data;
  let id = req.body.id;
  makescheduled(id,task)
  if (createTask(id,task)){
    return res.status(200).json({createTask: "Task Scheduled successfully!"});
  }
  else{
    return res.status(400).json({createTask: "Task Scheduling failed!"});
  }
});




module.exports = router;
