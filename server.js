// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");


// Server Setup
const app = express();
const PORT = process.env.PORT || 8000;

//Express
app.use(express.static('/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());