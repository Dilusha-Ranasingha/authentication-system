//This is the main entry point of my backend.

import express from 'express';         //A framework to create APIs easily.
import dotenv from 'dotenv';         //To load environment variables
import { connectDB } from './config/connectDB.js';
import authRoutes from './routes/auth.route.js';    //Imports the authRoutes from the auth.route.js file.
import indexRoutes from './routes/index.route.js';  //Imports the indexRoutes from the index.route.js file.

dotenv.config();
const app = express();


app.use('/', indexRoutes);        //Tells the server to use the indexRoutes when the URL has / in it.
app.use('/api/auth' , authRoutes);     //Tells the server to use the authRoutes when the URL has /api/auth in it.

app.listen(3000, ()=>{            //Starts the server on port 3000.
    console.log('Server is running on port 3000');
    connectDB();                 //Calls connectDB() when the server starts to connect to MongoDB using your .env file.
})
