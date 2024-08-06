const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
require("./conn/conn.js");
const signup = require("./route/user");
const book = require('./route/book.js');
const favourite = require('./route/favourite.js');
const cart = require('./route/cart.js');
const order = require('./route/order.js');

const port = process.env.PORT;

app.use("/api",signup);
app.use("/test",book);
app.use("/add",favourite);  
app.use("/add",cart);  
app.use("/add",order);



app.get("/", (req, res)=>{
    res.send("You can see Server has started!!!");
})

app.listen(port,()=>{
    console.log(`Server Started!!! Port = ${port}`);
})