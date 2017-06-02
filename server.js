// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const multer = require('multer');
const db = require('./db-config');

// Get our API routes
const api = require('./server/routes/api');
// const index= require('./src/main');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: path.join(__dirname, 'public/upload/temp')}).any('files'));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file


// app.use('/', index);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(3000,function(){
	console.log("server port : "+3000);
});

/**
 * Create HTTP server.
 */
// const server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
// server.listen(port, () => console.log(`API running on localhost:${port}`));