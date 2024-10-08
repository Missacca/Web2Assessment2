// SetUp the enviroment
// Connect the required modules
const express = require("express");

// Import body-parser to parse the request body
const bodyParser = require("body-parser");

// Import CORS middleware to allow cross-source requests
const cors = require("cors");

//Include our RESTFul API 
const appAPI = require("./controllerAPI/api-controller");

/* 
 * Create a web server that uses express, CORS and bodyParser
 */
// Create an Express server instance
const li_server = express();
//use CORS middleware to allow cross-source requests
li_server.use(cors());
//transfer to json data
li_server.use(bodyParser.json());
li_server.use(bodyParser.urlencoded({extended:true}));

/**
 *  Map the urls with the API
 *  The default url is: /api
 */
li_server.use("/api", appAPI);
li_server.use("/",(req,res)=>{
    res.send("This is LiYunlin Assessment2 Server side");
})

//start the web server on PORT: 5044
li_server.listen(5044);
console.log("Server is up now and running on port localhost:5044");