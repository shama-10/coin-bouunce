const mongoose = require('mongoose');
const {MONGODB_CONNECTION_STRING} = require('../config/index');

//const connectionString ="mongodb+srv://bugAuthor:ZBbDF6P32XYg9wz4@cluster0.m9tktcr.mongodb.net/coin-bounce?retryWrites=true&w=majority";

const dbConnect = async () => {
   try {
   mongoose.set('strictQuery',false);
    const conn  = await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log(`Database Connected to host:'${conn.connection.host}`);

   } catch (error) {
    console.log(`Error:${error}`);
   }
}

module.exports = dbConnect;