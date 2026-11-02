const express = require ("express");
const app = express();
const userSchema = require("./models/user");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.render("index")
})

app.listen(3000,() => {
    console.log("server running on port 3000")
})
