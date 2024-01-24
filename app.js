require('dotenv').config();
require('./db/conn.js');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var propertiesRouter = require('./routes/properties.ts');
var ownersRouter = require('./routes/owners.ts');

var app = express();
const cors = require('cors');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/properties', propertiesRouter);
app.use('/owners', ownersRouter);

module.exports = app;
