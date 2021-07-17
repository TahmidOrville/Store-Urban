import mongoose from 'mongoose'

const connectDB= async()=>{
    try{

        const conn= await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
        })
      console.log(`MongoDB connected: ${conn.connection.host}`.cyan);
    } catch(error){
        console.error(`Error:${error.message}`.bgRed);
        process.exit(1)
    }
}

export default connectDB;

