/** 
 * Import the required modules
 * express,Router, crowdfunding_db.js(Creat by self), connection
 */
const express = require('express');
const router = express.Router();
const dbcon = require("../crowdfunding_db.js");
const connection = dbcon.getConnection();

// Connect to db
connection.connect();

/**
 * 1.Retrieve All Active Fundraisers with Categories
 * @route GET /fundraisers
 * @description Fetches all active fundraisers with their corresponding categories.
 * @param req - The request object.
 * @param res - The response object.
 * @return Array of fundraiser records with category names.
 */
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

/**
 *2.Retrieve All Categories
 * @route GET /categories
 * @description Fetches all categories from the database.
 * @param req - The request object.
 * @param res - The response object.
 * @return Array of category records.
 */
router.get('/categories',  (req, res) => {
    connection.query("SELECT * FROM category",(err,records,fields) => {
        if (err) {
            console.error('Error retrieving product:', err);
        } else {
            res.send(records);
        }
    });
});

/**
 * 3.Retrieve Active Fundraisers Based on Criteria
 * @route GET /fundraisers/search
 * @description Fetches active fundraisers based on the specified search criteria.
 * @param req - The request object containing query parameters for search (category, CAPTION, city, ORGANIZER, TARGET_FUNDING, CURRENT_FUNDING).
 * @param res - The response object.
 * @return Array of fundraiser records that match the search criteria.
 */
router.get('/fundraisers/search', function(req, res) {
    let { category, CAPTION, city, ORGANIZER, TARGET_FUNDING, CURRENT_FUNDING } = req.query;
    let query = `
        SELECT f.*, c.Category_Name
        FROM fundraiser f
        LEFT JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE f.ACTIVE = 1
    `;
        const params = [];
        if(CAPTION){
            query += " AND f.CAPTION = ?";
            params.push(CAPTION);
        }
        if(ORGANIZER){
            query += " AND f.ORGANIZER = ?";
            params.push(ORGANIZER);
        }
        if(city){
            query += " AND f.CITY = ?";
            params.push(city);
        }
        if(category){
            query += " AND c.Category_Name = ?";
            params.push(category);
        }
        if(TARGET_FUNDING){
            query += " AND f.TARGET_FUNDING = ?";
            params.push(TARGET_FUNDING);
        }
        if(CURRENT_FUNDING){
            query += " AND f.CURRENT_FUNDING = ?";
            params.push(CURRENT_FUNDING);
        }
       connection.query(query, params, (err, records ,fields) => {
            if (err) {
                console.error('Error retrieving product:', err);
            } else {
                res.send(records);
            }
        })
    
});

/**
 * 4.Retrieve Fundraiser Details by ID
 * @route GET /fundraisers/:id
 * @description Fetches the details of a specific fundraiser by its ID.
 * @param req - The request object containing the fundraiser ID as a route parameter.
 * @param res - The response object.
 * @return Fundraiser record with category name for the specified ID.
 */
router.get('/fundraisers/:id',  (req, res) => {
      const { id } = req.params;
      const sql=` SELECT f.FUNDRAISER_ID, f.ORGANIZER, f.CAPTION, f.TARGET_FUNDING, f.CURRENT_FUNDING, f.CITY, f.ACTIVE, c.Category_Name FROM fundraiser f LEFT JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID WHERE f.FUNDRAISER_ID = ?`
      connection.query(sql,[id],(err,records,fields) => {
        if (err) {
            console.error('Error retrieving product:', err);
        } else {
            res.send(records);
        }
      }
  );});

module.exports = router;