import mongoose from 'mongoose'

const reviewSchema=mongoose.Schema({
    name:{ type: String, required: true},
    star:{ type: Number, required: true},
    comment:{ type: String, required: true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'  
      }
},{
    timestamps: true
})

const productSchema= mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'  
    },
    key:{
        type: String,
        required: true
    }, 
    name:{
        type: String,
        required: true 
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    star:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    shipping:{
        type: Number,
        required: true
    },
    reviews:[reviewSchema],
    numReviews:{
        type: Number,
        required: true,
        default:0
    },
},{
    timestamps: true
})

const Product= mongoose.model('Product',productSchema)

export default Product