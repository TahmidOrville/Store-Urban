import React, { useEffect } from 'react';
import './SeeOrder.css';
import {Link,useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { deliverOrderAction, getOrderDetailsAction, ORDER_DELIVERY_RESET } from '../../Redux/Actions/OrderActions';
import Steps from '../Steps/Steps';
import AlternativeSteps from '../Steps/AlternativeSteps';

const SeeOrder = () => {
const {id}=useParams()
   
const userLogin= useSelector(state=> state.userLogin)
const {userInfo}= userLogin

const orderDeliver= useSelector(state=>state.orderDeliver)
const {loading:deliverLoading,success:deliverSuccess,error:deliverError}=orderDeliver

const updateToDelivered=(order)=>{
    dispatch(deliverOrderAction(order))
}

const dispatch=useDispatch()
useEffect(()=>{
    if (deliverSuccess) {
        dispatch({type:ORDER_DELIVERY_RESET})
    }
    dispatch(getOrderDetailsAction(id))
},[dispatch,id,deliverSuccess])

const orderDetails= useSelector(state=>state.orderDetails)
const{order,loading,error}=orderDetails

    return loading? <LoadingBox></LoadingBox>: error? <MessageBox>{error}</MessageBox>:
   <div>
        <div className="stepsArea desktopStepper"><Steps activeStep='4'></Steps></div>
            <div className="stepsArea phoneStepper"><AlternativeSteps activeStep='4'></AlternativeSteps> </div>
       <section className="review">
   <div className="leftReview">
   <div className="orderArea"> 
        <div className="reviewTitle"><h4 id="orderNumber">ORDER {id}</h4></div>
        <div className="userInfoBox">
            <div className="reviewName">
                <h6>USER</h6>
                <p>{order.user.name}</p>
            </div>
            <div className="reviewName">
                <h6>Email</h6>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </div>
        </div>
        <div className="locationContainer">
            <div className="reviewAddress">
                <h6>Shipping Address</h6>
                <p>{`${order.shippingAddress.address}, ${order.shippingAddress.city}-${order.shippingAddress.zip}, ${order.shippingAddress.country}`}</p>
            </div>
            <div>
                <h6>Payment Method</h6>
                <p>{order.paymentMethod}</p>
            </div>
        </div>
         </div>
    <div  className="reviewPdContainer">
        {order.orderItems.length===0 ? 
            <div className="emptyMsg">
            <Alert variant="dark">
            <Alert.Heading>No placed order</Alert.Heading>
            <p>
            Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
            Continue shopping on the urbanStore.com homepage
            </p>
            </Alert>
            <Link to="/" className="continueText">Continue shopping...</Link>
        </div>:
              order.orderItems.map(pd=><ReviewProduct
                 key={pd._id}
                 pd={pd}
                     > </ReviewProduct>)      
    }
    </div>
   </div>
        <div className="rightArea">
               <div className="sumArea">
                    {/* {order.orderItems.length!==0 && <button className="cartBtn orderBtn">Pay</button>} */}
                <h6 className="summaryHead">Order summary</h6>
                <div className="shipTotal">
                <p className="shipProperty">PRODUCT COST</p>
                <p className="shipCost">${order.itemsPrice}</p>
                </div>
                <div className="shipTotal">
                <p className="shipProperty">SHIPPING</p>
                <p className="shipCost">${order.shippingPrice}</p>
                </div>
                <div className="shipTotal">
                <p className="shipProperty">TOTAL PRICE</p>
                <p className="shipCost">${order.totalPrice}</p>
                </div>
                {order.isPaid? 
                <div className="shipTotal paid">
                <p className="shipProperty">PAYMENT STATUS</p>
                <p className="shipCost">Paid</p>
                </div>:
                <div className="shipTotal notPaid">
                <p className="shipProperty">PAYMENT STATUS</p>
                <p className="shipCost">Not Paid</p>
                </div>}
                {deliverLoading && <LoadingBox></LoadingBox>}
                {deliverError && <Alert variant="danger">{deliverError}</Alert>}
                {order.isDelivered? 
                <div className="shipTotal paid">
                <p className="shipProperty">DELIVERY STATUS</p>
                <p className="shipCost">Delivered</p>
                </div>:
                <div className="shipTotal notPaid">
                <p className="shipProperty">DELIVERY STATUS</p>
                <p className="shipCost">Not Delivered</p>
                </div>}
               </div>
            
            {
                userInfo && userInfo.isAdmin && order.isDelivered==false &&
                <button className="cartBtn orderBtn" style={{"marginTop":"5px"}} onClick={()=>updateToDelivered(order)} >MARK AS DELIVERED</button>
             }

        </div>
    </section>
   </div>
};

export default SeeOrder;