// crowdfunding_db.js

//Import required modules
//Import the mysql2 module to interact with the MySQL database
const mysql = require("mysql2");
// Import body-parser, which parses the request body data in HTTP requests
const bodyParser = require("body-parser");


// import the database configuration file (db-details.js) to obtain the database connection information
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
  }
};