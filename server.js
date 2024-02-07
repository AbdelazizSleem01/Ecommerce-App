import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'

const app = express();
//.env
dotenv.config();

//DB config
connectDB();


//Middlewares\
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoutes);
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})
const PORT = process.env.PORT || 8080;

//rest api 

app.get('/', (req, res) => {
    res.send(
        '<h1>Welcome to Ecommerce MERN Stack App</h1>'
    )
})



app.listen(PORT, () => {
    console.log(`Server IS Running on  ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen.bgBlack)
})
