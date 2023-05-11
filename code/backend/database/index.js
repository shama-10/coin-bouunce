const mongoose = require('mongoose');

const connectionString ="mongodb+srv://bugAuthor:coinbounce@cluster0.m9tktcr.mongodb.net/?retryWrites=true&w=majority";

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(connectionString, {
            connectTimeoutMS: 30000 // 30 seconds
        });
        console.log(`Database Connected to host: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

module.exports = dbConnect;



