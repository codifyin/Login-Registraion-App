const mongoose = require ("mongoose");
const connect = mongoose.connect(YOUR_DATABASE_HERE);

connect.then(() => {
console.log("Database connected successfully!!!");
})

.catch(() => {
    console.log("Oops...Database cannot be connected :(");
    })

    const LoginSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },  
        email:{
            type: String,
            required: true
        }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;
