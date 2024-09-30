const express = require('express');
const path = require('path');
const app = express();
const port = 2427;

app.use(express.static('app'));

// Existing API routes here (e.g., /fundraisers, /categories, etc.)
app.get('/Homepage', (req, res) => {
    res.sendFile(__dirname + '/app/Homepage.html');
});
app.get('/Search', (req, res) => {
    res.sendFile(__dirname + '/app/Search.html');
});
app.get('/Fundraisers', (req, res) => {
    res.sendFile(__dirname + '/app/Fundraisers.html');
});
app.use("/",(req,res)=>{
    res.send(`<p>You should use <a href="http://localhost:2427/Homepage">Homepage</a> to Visit Homepage.</p>
              <p>You should use <a href="http://localhost:2427/Search">Search</a> to Visit Search page.</p>
              <p>You should use <a href="http://localhost:2427/Fundraisers">Fundraisers</a> to Visit Fundraisers page.</p>`);
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
