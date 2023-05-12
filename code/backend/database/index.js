const mongoose = require('mongoose');

const connectionString ="mongodb+srv://bugAuthor:ZBbDF6P32XYg9wz4@cluster0.m9tktcr.mongodb.net/coin-bounce?retryWrites=true&w=majority";

const dbConnect = async () => {
   try {
    const conn  = await mongoose.connect(connectionString);
    console.log(`Database Connected to host:'${conn.connection.host}`);

   } catch (error) {
    console.log(`Error:${error}`);
   }
}

module.exports = dbConnect;