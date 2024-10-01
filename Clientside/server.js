// Import the required modules
const express = require('express');

//set the path here, connect the path module
const path = require('path');

//Connect the express module
const app = express();

//set the whole front port here, which is 2427.
// This port is because it is our student ID front 4 mun
const port = 2427;

// Serve static files from the 'app' directory
app.use(express.static('app'));
/* Function name: GET route for '/Homepage'
 * Sends the Homepage.html file as the response.
 * Params: req - the request object, res - the response object
 */
app.get('/Homepage', (req, res) => {
    res.sendFile(__dirname + '/app/Homepage.html');
});

/* Function name: GET route for '/Search'
 * Sends the Search.html file as the response.
 * Params: req - the request object, res - the response object
 */
app.get('/Search', (req, res) => {
    res.sendFile(__dirname + '/app/Search.html');
});

/* Function name: GET route for '/Fundraisers'
 * Sends the Fundraisers.html file as the response.
 * Params: req - the request object, res - the response object
 */
app.get('/Fundraisers', (req, res) => {
    res.sendFile(__dirname + '/app/Fundraisers.html');
});

/* Function name: Default route for all other paths
 * Sends a message with links to valid pages.
 * Params: req - the request object, res - the response object
 */

app.use("/",(req,res)=>{
    res.send(`<p>You should use <a href="http://localhost:2427/Homepage">Homepage</a> to Visit Homepage.</p>
              <p>You should use <a href="http://localhost:2427/Search">Search</a> to Visit Search page.</p>
              <p>You should use <a href="http://localhost:2427/Fundraisers">Fundraisers</a> to Visit Fundraisers page.</p>`);
})

/* Start the server and listen on the specified port.
 * Logs a message indicating the server's URL when it starts.
 */
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/Homepage`);
});
