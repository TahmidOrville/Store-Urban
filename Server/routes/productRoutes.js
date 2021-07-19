import express from 'express'
import {getProducts,getProductById, deleteProductById, updateProduct, createProduct, reviewProduct, getAllProducts} from '../controllers/productControllers.js'
import { protect,admin } from '../middleware/authMiddleware.js'
const router= express.Router()
 

router.route('/').get(getAllProducts).post(protect,admin,createProduct)
router.route('/:category').get(getProducts)
router.route('/:category/:id').get(getProductById)
router.route('/:id').delete(protect,admin,deleteProductById).put(protect,admin,updateProduct)
router.route('/:id/reviews').post(protect,reviewProduct)



export default router; 