import express from 'express'
import {addOrderItems,getOrderByUser,getOrderItemsById, getOrders, updateOrderToDelivered, updateOrderToPaid} from '../controllers/orderController.js'
import {admin, protect} from '../middleware/authMiddleware.js'

const router= express.Router()
 
router.route('/').post(protect,addOrderItems).get(protect,admin,getOrders)
router.route('/pay').post(protect,updateOrderToPaid)
router.route('/myOrders').get(protect,getOrderByUser)
router.route('/:id').get(protect,getOrderItemsById).put(protect,admin,updateOrderToDelivered)





export default router; 