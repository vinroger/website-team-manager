const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

const feedbackSchema = new mongoose.Schema({
    inputName : String,
    inputEmail : String,
    inputFeedback : String
});
let Feedback = mongoose.model("feedback", feedbackSchema );

let db1 = process.env.DB1;
mongoose.connect(db1, {useNewUrlParser: true, useUnifiedTopology: true});


app.get("/", function(req,res){
    res.render("index");
});
  
app.listen(process.env.PORT || 3000, function(){
    console.log("server running on port 3000");
});

app.get("/feedback", function(req,res){
    res.render("feedback")
});

app.post("/feedback", function(req,res){
    let input = req.body;
    Feedback.create(input, function(err){
        if (err){
            console.log(err);
            res.redirect("/feedback");
        }
        else {
            res.redirect("/success");
        }
    });

    
});

app.get("/success", function(req,res){
    res.render("success");
});

app.get("/failed", function(req,res){
    res.render("failure");
});
