const User = require('../models/users.js');
const routes = require('express').Router();
const { authenticationToken } = require('./userAuth.js');

routes.put("/add-cart", authenticationToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const userdata = await User.findById(id);
        const isbookinCart = userdata.cart.includes(bookid);
        if (isbookinCart) {
            return res.status(200).json("Book is already in Cart...");
        }
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        return res.status(200).json("Book added to Cart...");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error occuring added to Cart...");
    }
});

routes.put("/remove-cart-id/:bookid", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        return res.status(200).json("Book removed to Cart...");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error occuring removing to Cart...");
    }
});

routes.get("/get-cart", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userdata = await User.findById(id).populate("cart");
        if (!userdata) {
            return res.status(404).json({ message: "User not found" });
        }
        const cartBook = userdata.cart;
        return res.status(200).json({ message: "Success..", data: cartBook });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Error occurring get to cart...");
    }
});

module.exports = routes;