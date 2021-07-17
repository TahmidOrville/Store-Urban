import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

const addOrderItems= asyncHandler( async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,shippingPrice,totalPrice}= req.body
    if (orderItems && orderItems.length ===0) {
        res.status(400)
        throw new Error('No order items')
    }else{
        const order= new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder= await order.save()
        res.status(201).json(createdOrder)
    }
})

const updateOrderToPaid= asyncHandler( async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,shippingPrice,totalPrice,paymentResult}= req.body
    if (orderItems && orderItems.length ===0) {
        res.status(400)
        throw new Error('No order items')
    }else{
        const order= new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            isPaid: true,
            paidAt: Date.now(),
            paymentResult
        })

        const createdOrder= await order.save()
        res.status(201).json(createdOrder)
    }
    // const order= await Order.findById(req.params.id)
    //  if (order) {
    //      order.isPaid= true
    //      order.paidAt= Date.now()
    //      order.paymentResult= {
    //          id: req.body.id,
    //          country: req.body.country
    //      }
    //      const updatedOrder= await order.save()
    //      res.json(updatedOrder)
    //  }
     
    //  else{
    //      res.status(404)
    //      throw new Error('Order not found')
    //  }
})

const getOrderItemsById= asyncHandler( async(req,res)=>{

    const order= await Order.findById(req.params.id).populate('user', 'name email')
     if (order) {
        res.status(200).json(order)
     }else{
         res.status(404)
         throw new Error('Order not found')
     }
})

const getOrderByUser= asyncHandler( async(req,res)=>{

    const orders= await Order.find({user: req.user._id})
     res.json(orders)
})

const getOrders= asyncHandler( async(req,res)=>{

    const orders= await Order.find({}).populate('user','id name')
     res.json(orders)
})

const updateOrderToDelivered= asyncHandler( async(req,res)=>{

    const order= await Order.findById(req.params.id)
     if (order) {
         order.isDelivered= true
         order.deliveredAt= Date.now()
         
         const updatedOrder= await order.save()
         res.json(updatedOrder)
     }
     
     else{
         res.status(404)
         throw new Error('Order not found')
     }
})

export {addOrderItems,getOrderItemsById,updateOrderToPaid,getOrderByUser,getOrders,updateOrderToDelivered}