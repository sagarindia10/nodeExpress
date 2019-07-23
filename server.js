var express=require("express")
var path=require("path");
var app=express();
var router = express.Router();
var mongo = require("mongodb");
var assert = require("assert");
var bodyParser = require('body-parser');

var url = "mongodb://localhost:27017/test";
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/",function(request, response)
{
    response.sendFile((__dirname + "/ht.html"));
});



app.post("/insert",urlencodedParser,function(request, response, next)
{
    console.log("Start");
    console.log(request.body);
    console.log("End");

    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = request.body
  dbo.collection("film").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

    response.redirect("/");
});


app.get("/get-data",function(request,response,next)
{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("film").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
response.redirect("/");
    });




app.listen(1337,function(){ console.log("Listening 1337 port");})
