import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'
import { protect } from '../middleware/authMiddleware.js'

const getProducts= asyncHandler( async (req,res)=>{
        const products= await Product.find({})
        res.send(products)
    })
 const getProductById= asyncHandler( async (req,res)=>{
    const product= await Product.findById(req.params.id)

    if (product) {
        res.send(product)
    } else{
        res.status(404)
      throw new Error('Product not found')
        
    }
})
const deleteProductById= asyncHandler( async (req,res)=>{
    const product= await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else{
        res.status(404)
      throw new Error('Product not found')
        
    }
})

const createProduct= asyncHandler( async (req,res)=>{
    const product= new Product({
        user:req.user._id,
        key:"sample key",
        name:"sample name",
        image:"/images/sample.jpg",
        category:"sample category",
        stock:0,
        star:0,
        description:"sample description",
        price:0,
        shipping:0,
        numReviews:0
    })

    const createdProduct= await product.save()
    res.status(201).json(createdProduct)
})

const updateProduct= asyncHandler( async (req,res)=>{
   const{key,name,image,category,stock,star,description,price,shipping,numReviews}=req.body
   const product= await Product.findById(req.params.id)

   if (product) {
       product.name= name || product.name
       product.image= image || product.image
       product.key= key || product.key
       product.category= category || product.category
       product.stock= stock || product.stock
       product.star= star || product.star
       product.description= description || product.description
       product.price= price || product.price
       product.shipping= shipping || product.shipping
       product.numReviews= numReviews || product.numReviews


       const updatedProduct= await product.save()
       res.json(updatedProduct)
   }
    else{
        res.status(404)
        throw new Error("Product not found") 
     }
})

const reviewProduct= asyncHandler( async (req,res)=>{
    const{rating,comment}=req.body
    const product= await Product.findById(req.params.id)
 
    if (product) {
         const alreadyReviewed= product.reviews.find(r=>r.user.toString()===req.user._id.toString())
         if (alreadyReviewed) {
             res.status(400)
             throw new Error('Item already reviewed')
         }
 const review={
     name: req.user.name,
     star: Number(rating),
     comment,
     user: req.user._id
 }

 product.reviews.push(review)
 product.numReviews= product.reviews.length
 product.star= product.reviews.reduce((acc,item)=>item.star+acc, 0)/ product.reviews.length 
  await product.save()
  res.status(201).json({message: "Review Added"})      
    }
     else{
         res.status(404)
         throw new Error("Product not found") 
      }
 })

export {getProducts,getProductById,deleteProductById,createProduct,updateProduct,reviewProduct}