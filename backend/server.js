// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app via express
const app = express();

var corsOptions = {
    origin: 'http://localhost:5001'
};

// Introduce middlewares via app.use() method
app.use(cors(corsOptions));

// parses requests of content-type = application/json
app.use(bodyParser.json());
// Parses requests of content-type - application/json (params in postman)
app.use(bodyParser.urlencoded({ extended: true }));

// Import all files from models folder
const db = require('./models');

// sync() method drops existing table and forces it to recreate one. I am logging if it was done successfully
db.sequelize.sync({ force: true }).then(() => {
    console.log('Dropped and re-synced the database.');
});

// Basic route via get method
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my todo app'})
});

// Have our app use the routes in the routes.js file
require("./routes/todo.routes.js")(app);

// set port, listen for reqs:
const PORT = process.env.PORT || 5000;
// Have the app run on the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});