const express = require("express");
const app  = express();
const connectDatabase = require('./config/dbConfig');
app.use(express.json());
require("dotenv").config({ path: './config/.env' });

//connecting to database
connectDatabase();

const userRouter = require('./routes/userRoutes');

app.use("/api/user", userRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
})