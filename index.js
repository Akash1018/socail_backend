import express from 'express'; //New-way
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'; 
import userRoutes from './routes/users.js'; 
import dotenv from 'dotenv'
//const express = require('express')//old-way
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true})); //checks the data coming from post and filter it.
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());

app.get('/', (req,res) => {
    res.send('APP IS RUNNING')
})
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`)))
.catch((error) => console.log(error));
//MongoDb