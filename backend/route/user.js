const User = require('../models/users.js');
const routes = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticationToken } = require('./userAuth.js');

routes.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length <= 4) {
            return res.status(400).json({ message: "Username should be more than 4 letters" });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists..." });
        }

        const secretPassword = await bcryptjs.hash(password, 10);

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password should be more than 5 letters" });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists..." });
        }

        const data = new User({
            username: username,
            email: email,
            password: secretPassword,
            address: address,
        });

        await data.save();
        return res.status(200).json({ message: "User inserted successfully!!!", user:{
            _id:data._id,
            username:data.username,
            email:data.email,
        }});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!!!" });
    }
});

routes.post("/sign-in", async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isMatch = await bcryptjs.compare(password, user.password);

        if(!user || !isMatch){
            res.status(400).json({message: "Invalid user or password Credentials!!!!!"})
        }
        else{
            const authClaim = [
                { name : user.username },
                { role: user.role },
            ];

            const token = jwt.sign({ authClaim }, "book12book", {
                expiresIn: "30d",
            })
            res.status(200).json({
                id: user._id,
                name: user.username,
                role: user.role,
                token: token,
        });
        }
    } catch (error) {
        console.log("Error : ", error.message);
        res.status(500).json("Invalid issue by server......")
    }
});

routes.get("/get-data", authenticationToken, async (req, res)=>{
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select('-password');
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json("Invalid issue by server......")
    }
});

routes.put("/update-address", authenticationToken , async (req,res)=>{
    try {
        const { id } = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address: address});
        res.status(200).json({message: "Address updated"});
    } catch (error) {
        console.log(error)
        res.status(500).json("Invalid issue by server......")
    }
});

module.exports = routes;
