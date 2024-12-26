//This file is responsible for connecting to the MongoDB database.

import mongoose from 'mongoose'          //A library to connect to MongoDB.

export const connectDB = async () => {
    try {
        console.log("mongo_uri: ", process.env.MONGO_URI);
        const con = await mongoose.connect(process.env.MONGO_URI);         //Uses mongoose.connect(process.env.MONGO_URI) to connect to the database.
        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (error) {
        console.log("Error conntencting to MongoDB: ", error.message);
        process.exit(1)
    }
}