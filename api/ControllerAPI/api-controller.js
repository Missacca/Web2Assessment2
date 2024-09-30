/** 
 * Import the required modules 
 */
const express = require('express');
const router = express.Router();
const dbcon = require("../crowdfunding_db.js");
const connection = dbcon.getConnection();
// Connect to db
connection.connect();

//1.Retrieve All Active Fundraisers with Categories
router.get('/fundraisers',  function(req, res) {
      connection.query("SELECT x.*, y.Category_Name AS category_name FROM FUNDRAISER x JOIN category y ON x.category_id = y.CATEGORY_ID WHERE x.ACTIVE = 1",(err,records,fields) => {
        if (err) {
            console.error('Error retrieving product:', err);
        } else {
            res.send(records);
        }
      }
  );
  });

//2.Retrieve All Categories
router.get('/categories',  (req, res) => {
    connection.query("SELECT * FROM category",(err,records,fields) => {
        if (err) {
            console.error('Error retrieving product:', err);
        } else {
            res.send(records);
        }
    });
});


//3.Retrieve Active Fundraisers Based on Criteria
router.get('/fundraisers/search', function(req, res) {
    let { category, city, minTARGET_FUNDING, maxTARGET_FUNDING } = req.query;
    const query = `
        SELECT f.*, c.Category_Name
        FROM fundraiser f
        LEFT JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.ACTIVE = 1`;
        const params = [];
        if(city){
            query += "AND f.CITY = ?";
            params.push(city);
        }
        if(category){
            query += "AND f.CATEGORY_ID = ?";
            params.push(category);
        }
        if(minTARGET_FUNDING){
            query += "AND f.TARGET_FUNDING >= ?";
            params.push(minTARGET_FUNDING);
        }
        if(maxTARGET_FUNDING){
            query += "AND f.TARGET_FUNDING <= ?";
            params.push(maxTARGET_FUNDING);
        }
        db.query(query, params, (err, records ,fields) => {
            if (err) {
                console.error('Error retrieving product:', err);
            } else {
                res.send(records);
            }
        })
    
});
//4.Retrieve Fundraiser Details by ID
router.get('/fundraisers/:id',  (req, res) => {
      const { id } = req.params;
      connection.query("SELECT * FROM fundraiser WHERE FUNDRAISER_ID = ?",[id],(err,records,fields) => {
        if (err) {
            console.error('Error retrieving product:', err);
        } else {
            res.send(records);
        }
      }
  );});
  
module.exports = router;