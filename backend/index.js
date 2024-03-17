const express = require('express');
var cors = require('cors');
const labourRoute = require('./routes/labour');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/labour',labourRoute);

module.exports = app;