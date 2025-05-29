const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
const mongoose =require('mongoose');
const userRouter= require('./routes/userRoutes');
const newsRouter = require('./routes/newsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.use('/api/v1/users',userRouter)
app.use('/api/v1/news', newsRouter);
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});




module.exports = app;