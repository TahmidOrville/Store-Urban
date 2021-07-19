import express from 'express';
import connectDB from './config/db.js'
import cors from 'cors';
import dotenv from 'dotenv';
import  colors from 'colors';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()

const PORT= process.env.PORT || 5000;

const app=express();
app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());  
app.use('/products',productRoutes);
app.use('/users', userRoutes)
app.use('/orders',orderRoutes)
app.use('/upload',uploadRoutes)

const __dirname= path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)



if(process.env.NODE_ENV==='production'){

    app.use(express.static('Client/build'))

    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'Client','build','index.html')))
}
else{

app.get('/',(req,res)=>{
    res.send('Hello Urban admin!')
})

}
 
app.listen(PORT,()=>{
    console.log(`listening to ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})