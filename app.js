const express = require ("express");
const app = express();
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt')

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.render("index")
})
app.post("/register", async (req, res) => {
    let { email, password, name, username, age } = req.body;

    // 1. Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).send("User already Registered");

    // 2. Hash the password securely
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            
            // 3. Create the user in MongoDB with the hashed password
            let createdUser = await userModel.create({
                username,
                name,
                email,
                age,
                password: hash // Save the hash, NEVER the plain password!
            });

            // 4. Send back the created user (or redirect to home/login later)
            res.status(201).send(createdUser);
        });
    });
});
app.listen(3000,() =>{
    console.log("server runing on port 3000")

})