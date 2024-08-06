const User = require('../models/users.js');
const routes = require('express').Router();
const { authenticationToken } = require('./userAuth.js');

routes.put("/add-favourite", authenticationToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const userdata = await User.findById(id);
        const isbookFavourite = userdata.favourite.includes(bookid);
        if (isbookFavourite) {
            return res.status(200).json("Book is already in favourite...");
        }
        await User.findByIdAndUpdate(id, { $push: { favourite: bookid } });
        return res.status(200).json("Book added to favourite...");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error occuring added to favourite...");
    }
});

routes.delete("/remove-favourite", authenticationToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const userdata = await User.findById(id);
        const isbookFavourite = userdata.favourite.includes(bookid);
        if (isbookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourite: bookid } });
        }  
        return res.status(200).json("Book removed to favourite...");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error occuring removing to favourite...");
    }
});

routes.get("/get-favourite", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate("favourite");
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }
        const favouriteBook = userdata.favourite;
        return res.status(200).json({ message: "Success..", data: favouriteBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error occurring added to favourite...");
    }
});

module.exports = routes;