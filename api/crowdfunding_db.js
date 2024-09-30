// crowdfunding_db.js

// Import required modules 
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const http = require("http");

// Create connection to the database
var db = require("./db-details.js");

// Create db Connection
module.exports = {
  getConnection: ()=>{
      return mysql.createConnection({
          host: db.host,
          user: db.user,
          password: db.password,
          database: db.database 
      });
       // Connect to the database
      connection.connect((err) => {
        if (err) {
          console.error("Database connection failed:", err.message);
        } else {
          console.log("Successfully connected to the database.");
        }
      });
  
      return connection;
  }
};