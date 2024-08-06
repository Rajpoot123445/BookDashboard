const mongodb = require('mongoose');
const connectDB = process.env.MONGODB;

const conn = ()=>{
    try {
        mongodb.connect(connectDB);
        console.log("Connect Database Successfully!!!!");
    } catch (error) {
        console.log(error);
    }
}

conn();