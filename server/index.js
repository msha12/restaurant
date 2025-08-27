require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");


const connectDb = require('./config/db.js');
connectDb();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(methodOverride("_method"));


/// api router
const apiRouter = require('./routes/api/allAPiRoutes.js')
app.use('/api',apiRouter)


const homeRouter = require('./routes/homeRoute.js')
const authRouter = require('./routes/authRoute.js')
const menuRouter = require('./routes/menuRoute.js')
const chefRouter = require('./routes/chefRoute.js')
const userRouter = require('./routes/userRoute.js')
const packageRouter = require('./routes/packageRoute.js')
const reservationRouter = require('./routes/reservationRoute.js')

const verifyToken = require('./middlewares/verifyToken.js')
const checkIfAdmin = require('./middlewares/checkIfAdmin.js')
const attachUser = require('./middlewares/userMiddleware');


app.use(authRouter)
app.use(verifyToken, attachUser);
app.use('/home', homeRouter)
app.use('/menu',menuRouter)
app.use('/chef',checkIfAdmin,chefRouter)
app.use('/reservation', reservationRouter)
app.use('/package', packageRouter)
app.use('/user',checkIfAdmin,userRouter)





app.listen(process.env.PORT ,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
});