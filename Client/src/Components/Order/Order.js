import React, { useEffect } from 'react';
import './Order.css';
import {Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Steps from '../Steps/Steps';
import { Alert } from 'react-bootstrap';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import { createOrderAction, payOrderAction } from '../../Redux/Actions/OrderActions';
import Stripe from '../Stripe/Stripe';


const Order = () => {

const history=useHistory()    
const cart= useSelector(state=>state.cart)
const {address,city,zip,country}=cart.shippingAddress

const orderCreate= useSelector(state=>state.orderCreate)
const{order,success,error}=orderCreate

const orderPay= useSelector(state=>state.orderPay)

useEffect(()=>{
  if (success) {
      history.push(`ordered/${order._id}`)
  }
  // eslint-disable-next-line
},[history,success])
useEffect(()=>{
    if(orderPay.success){
      history.push(`ordered/${orderPay.order._id}`)
    }
    // eslint-disable-next-line
  },[history,orderPay.success])

const dispatch=useDispatch()
const submitOrderHandler=()=>{
    dispatch(createOrderAction({
         orderItems: cart.cartItems,
         shippingAddress: cart.shippingAddress,
         paymentMethod: cart.paymentMethod,
         itemsPrice: cart.itemsPrice,
         shippingPrice: cart.shippingPrice,
         totalPrice: cart.totalPrice
    }))
}

const submitPayHandler=({id,country})=>{
    dispatch(payOrderAction({
         orderItems: cart.cartItems,
         shippingAddress: cart.shippingAddress,
         paymentMethod: cart.paymentMethod,
         itemsPrice: cart.itemsPrice,
         shippingPrice: cart.shippingPrice,
         totalPrice: cart.totalPrice,
         paymentResult:{
            id,
            country
        }
    }))
}
   
cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc+ item.price*item.qty,0).toFixed(2)
cart.shippingPrice=cart.cartItems.reduce((acc,item)=>acc+ item.shipping,0).toFixed(2)
cart.totalPrice= (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)
    return (
        <div>
            <div className="stepsArea"><Steps activeStep='3'></Steps></div>
           <section className="review">
           <div className="leftReview">
           <div className="orderArea"> 
                <div className="reviewTitle">Review your order</div>
                <div className="locationContainer">
                    <div className="reviewAddress">
                        <h6>Shipping Address</h6>
                        <p>{`${address}, ${city}-${zip}, ${country}`}</p>
                    </div>
                    <div>
                        <h6>Payment Method</h6>
                        <p>{cart.paymentMethod}</p>
                    </div>
                </div>
                 </div>
            <div  className="reviewPdContainer">
                {cart.cartItems.length===0 ? 
                    <div className="emptyMsg">
                    <Alert variant="dark">
                    <Alert.Heading>Your cart is empty!</Alert.Heading>
                    <p>
                    Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
                    Continue shopping on the urbanStore.com homepage
                    </p>
                    </Alert>
                    <Link to="/" className="continueText">Continue shopping...</Link>
                </div>:
                      cart.cartItems.map(pd=><ReviewProduct
                         key={pd.key}
                         pd={pd}
                             > </ReviewProduct>)      
            }
            </div>
           </div>
                <div className="summaryArea">
                {cart.cartItems.length!==0 && cart.paymentMethod==="Cash on delivery" && <button className="cartBtn orderBtn" onClick={submitOrderHandler}>Place order</button>}
                        <h6 className="summaryHead">Order summary</h6>
                        <div className="shipTotal">
                        <p className="shipProperty">PRODUCT COST</p>
                        <p className="shipCost">${cart.itemsPrice}</p>
                        </div>
                        <div className="shipTotal">
                        <p className="shipProperty">SHIPPING</p>
                        <p className="shipCost">${cart.shippingPrice}</p>
                        </div>
                        <div className="shipTotal">
                        <p className="shipProperty">TOTAL PRICE</p>
                        <p className="shipCost">${cart.totalPrice}</p>
                        </div>
                        {cart.cartItems.length!==0 && cart.paymentMethod==="Credit Card" && <Stripe handleSubmit={submitPayHandler}></Stripe>}
                        {error && <Alert variant='danger'>{error}</Alert>}
                    </div>
            </section>
  </div>
    );
};

export default Order;