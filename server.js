const express = require("express");
const app  = express();
require("dotenv").config({ path: './config/.env' });

const dbConfig = require('./config/dbConfig');//connecting to database



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
})