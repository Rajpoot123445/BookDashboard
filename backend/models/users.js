const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        require:true,
        unique:true,
    },
    email: {
        type: String,
        require:true,
        unique:true,
    },
    password: {
        type: String,
        require:true,
    },
    address: {
        type: String,
        require:true,
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3541/3541871.png",
    },
    role: {
        type: String,
        default: "user",
        enum:["user","admin"],
    },
    favourite:[{
        type: mongoose.Types.ObjectId,
        ref: 'books',
    }],
    cart:[{
        type: mongoose.Types.ObjectId,
        ref: "books",
    }],
    orders:[{
        type: mongoose.Types.ObjectId,
        ref: "orders"
    }],
},
{timestamps:true}
);

module.exports = mongoose.model("users",user);