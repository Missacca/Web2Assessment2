/*
 * This document is to make database quickly.
 */

// Import the required modules
const express = require("express");
const db = require("./crowdfunding_db");

//  Connect to the crowdfundingdatabase
let li_con = db.getConnection();
li_con.connect((err) => {
    if(err)	throw err;
    	console.log("Connected to database");
});
// SQL statement to create CATEGORY table
let sqlCreat1="CREATE TABLE CATEGORY ( "+ 
                                           "CATEGORY_ID int NOT NULL AUTO_INCREMENT,"+
										   "Category_Name varchar(255) NOT NULL,"+
										   "PRIMARY KEY (CATEGORY_ID))";

// Execute SQL to create CATEGORY table
li_con.execute(sqlCreat1, (err, records) => {
	if(err) {
		console.log("Error while creating table: CATEGORY");
	}
	else {
		console.log("CATEGORY Table created");
	}
});

// SQL statement to create FUNDRAISER table
let sqlCreat2="CREATE TABLE FUNDRAISER ( "+
                                            "FUNDRAISER_ID int NOT NULL AUTO_INCREMENT,"+
											"ORGANIZER varchar(255) NOT NULL," +
											"CAPTION varchar(255) NOT NULL,"+
											"TARGET_FUNDING decimal(15,2) NOT NULL,"+
											"CURRENT_FUNDING decimal(15,2) NOT NULL,"+
											"CITY varchar(100) NOT NULL,"+
											"ACTIVE tinyint(1) NOT NULL,"+
											"CATEGORY_ID int DEFAULT NULL,"+
											"PRIMARY KEY (FUNDRAISER_ID),"+
											"KEY CATEGORY_ID (CATEGORY_ID),"+
											"CONSTRAINT fundraiser_ibfk_1 FOREIGN KEY (CATEGORY_ID) REFERENCES category (CATEGORY_ID)) ";

// Execute SQL to create FUNDRAISER table
li_con.execute(sqlCreat2, (err, records) => {
	if(err) {
		console.log("Error while creating table: FUNDRAISER");
	}
	else {
		console.log("FUNDRAISER Table created");
	}
});
/**
 * Insert Data into FUNDRAISER Table
 * This section inserts multiple rows into the FUNDRAISER table.
 */
 let sqlarr= new Array();
sqlarr[1]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Bit', 'donated 700 dollar', 700.00, 400.00, 'Sydney', TRUE, 2)";
sqlarr[2]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Hobbit', 'donated 5000 dollar', 5000.00, 400.00, 'Sydney', false, 4)";
sqlarr[3]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Eva', 'donated 900 dollar', 900.00, 145.00, 'New York', TRUE, 3)";
sqlarr[4]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Allar', 'donated 100 books for children', 1290.00, 1155.00, 'Perth', TRUE, 3)";	
sqlarr[5]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('S1mple', 'donated 1000 dollar', 1000.00, 500.00, 'Beijing', TRUE, 1)";

// Execute SQL statements to insert data into FUNDRAISER table
for(let i=1; i < sqlarr.length; i++)
{
	li_con.execute(sqlarr[i], (err, records) => {
		if(err) {
			console.log("It is Inserting  Error");
		}
		else {
			console.log("Success!SQL is executed for inserting into FUNDRAISER table");
		}
    });
}
/**
 * Insert Data into CATEGORY Table
 * This section inserts multiple rows into the CATEGORY table.
 */
let sqlinsert= new Array(); 
sqlinsert[0]="INSERT INTO CATEGORY (Category_Name) VALUES ('Health')";
sqlinsert[1]="INSERT INTO CATEGORY  (Category_Name) VALUES ('Education')";
sqlinsert[2]="INSERT INTO CATEGORY  (Category_Name) VALUES ('Children')";
sqlinsert[3]="INSERT INTO CATEGORY  (Category_Name) VALUES ('Pool')";

// Execute SQL statements to insert data into CATEGORY table
for(let i=0; i < sqlinsert.length; i++)
{
	li_con.execute(sqlinsert[i], (err, records) => {
		if(err) {
			console.log("It is Inserting  Error");
		}
		else {
			console.log("Success!SQL is executed for inserting into CATEGORY  table");
		}
    });
}
