const User = require('../models/users.js');
const Book = require('../models/book.js');
const routes = require('express').Router();
const { authenticationToken } = require('./userAuth.js');

routes.post("/books", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const adminverify = await User.findById(id);
        if (adminverify.role != "admin") {
            return res.status(400).json({ message: "You have not access by admin." })
        }
        else {
            const { url, title, author, price, desc, language } = req.body;

            const existingTitle = await Book.findOne({ title: title });
            if (existingTitle) {
                return res.status(400).json({ message: "Title already exists..." });
            }
            if (price <= 5) {
                return res.status(400).json({ message: "Price should more than 5" });
            }
            const data = new Book({
                url: url,
                title: title,
                author: author,
                price: price,
                desc: desc,
                language: language,
            });

            await data.save();
            return res.status(200).json({ message: "User inserted successfully!!!" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!!!" });
    }
});

routes.put("/update-books", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        const { url, title, author, price, desc, language } = req.body;
        if (price <= 5) {
            return res.status(400).json({ message: "Price should more than 5" });
        }

        await Book.findByIdAndUpdate(bookid, {
            url: url,
            title: title,
            author: author,
            price: price,
            desc: desc,
            language: language,
        });

        return res.status(200).json({ message: "User Updated successfully!!!" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!!!" });
    }
});

routes.delete("/delete-books", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book Deleted successfully!!!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!!!" });
    }
});

routes.get("/get-books", authenticationToken, async (req, res) => {
    try {   
        const books = await Book.find().sort({createdAt: -1});
        return res.status(200).json({ message: "Success!!!", data:books });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!!!" });
    }
});

routes.get("/get-recent-books", authenticationToken, async (req, res) => {
    try {   
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.status(200).json({ message: "Success!!!", data:books });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error Occurred!!!" });
    }
});

routes.get("/get-by-id/:id", async (req,res)=>{
    try {
        const { id } =req.params;
        const book = await Book.findById(id);
        return res.status(200).json({ message: "Success!!", data: book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!!!" });
    }
})

module.exports = routes;