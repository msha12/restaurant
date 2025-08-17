require('dotenv').config();

const express = require('express');
const app = express();
const ejs = require('ejs');


const connectDb = require('./config/db.js');

connectDb();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const adminRouter = require('./routes/authRoute.js')

app.use('/users', adminRouter)

app.get('/', (req, res) => {
    res.json('home page')
});


app.listen(process.env.PORT ,() => {
    console.log('Server is running on port 3000');
});