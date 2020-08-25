const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {getLoginPage} = require('./routes/login');
const {getResumePage, addResumePage, addResume, deleteResume, editResume, editResumePage} = require('./routes/resume');
const {getPortfolioPage, addPortfolioPage, addPortfolio, deletePortfolio, editPortfolio, editPortfolioPage} = require('./routes/portfolio');
const port = 5000;

// Connection to the DB
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'individual_project',
    port: 3600
});

// // connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database!');
});
global.db = db;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// Login Page
app.get('/login', getLoginPage);
app.get('/', getLoginPage);

// Home Page
app.get('/index', getHomePage);

// Resume Routes for the app
app.get('/resume', getResumePage);
app.get('/addresume', addResumePage);
app.get('/editresume/:resume_id', editResumePage);
app.get('/deleteresume/:resume_id', deleteResume);
app.post('/addresume', addResume);
app.post('/editresume/:resume_id', editResume);

// Portfolio Routes for the app
app.get('/portfolio', getPortfolioPage);
app.get('/addportfolio', addPortfolioPage);
app.get('/editportfolio/:portfolio_id', editPortfolioPage);
app.get('/deleteportfolio/:portfolio_id', deletePortfolio);
app.post('/addportfolio', addPortfolio);
app.post('/editportfolio/:portfolio_id', editPortfolio);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});