const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("login");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
const data = {
    name: req.body.username, 
    password: req.body.password,
    email: req.body.email
}

//checking if user already exists 
const existingUser = await collection.findOne({name: data.name});

if(existingUser){
    res.send("Actually user already exists. Please try another username.");
}else{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);

    res.send("Your account has been created successfully!");
console.log(userdata);
}

})

app.post("/login", async (req, res) => {
try{
const check = await collection.findOne({name: req.body.username});
if(!check){
    res.send("Username cannot be found.");
}
//compare the hash password from the database with the plain text
const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
if(isPasswordMatch){
    res.render("home");
}else{
    res.send("Oops...Wrong password.");
}
}catch{
res.send("Wrong details...");
}
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})