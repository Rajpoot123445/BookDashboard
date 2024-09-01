const User = require('../models/users.js');
const Order = require('../models/orders.js');
const routes = require('express').Router();
const { authenticationToken } = require('./userAuth.js');

routes.post("/place-order", authenticationToken, async (req, res) => {
    const { id } = req.headers;
    const { order } = req.body;

    try {
        for (const orderData of order) {
            
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id }
            });
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.status(200).json({ message: "Success!!! Orders Placed..." });
    } catch (error) {
        console.error("Error placing orders:", error);
        return res.status(500).json({ message: "An error occurred while placing orders." });
    }
});

// Particular User
routes.get("/get-order-history", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const orderData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });
        return res.status(200).json({ message: "Success!!!", data: orderData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server issue in orders." });
    }
});

// --> Admin

routes.get("/get-all-orders", authenticationToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({ path: "book", }).populate({ path: "user" }).sort({ createdAt: -1 });
        return res.status(200).json({ message: "Success!!!", data: userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server issue in orders." });
    }
});

routes.put("/update-status/:id", authenticationToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.status(200).json({ message: "Status Update Successfully!!!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server issue in orders." });
    }
})



module.exports = routes;