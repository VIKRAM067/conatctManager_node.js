const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectdb = require("./config/dbConnection");
const dotenv = require("dotenv").config(); 

connectdb();

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json()) // this this middleware for bodyparser for json files
app.use("/api/contacts", require("./routes/userRoutes")); // this is the user register and login routes or middleware
app.use("/api/contacts", require("./contactRoutes")); // this is known to be a middleware
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})

