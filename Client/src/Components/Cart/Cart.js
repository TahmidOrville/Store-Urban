import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction } from '../../Redux/Actions/CartActions';
import CartProduct from '../CartProduct/CartProduct';
import './Cart.css';
import { IdContext, QtyContext } from '../../App';
import { Link, useHistory } from 'react-router-dom';

const Cart = () => {

     const [qty]=useContext(QtyContext);
    const [pid]=useContext(IdContext)

    const dispatch=useDispatch()
    useEffect(()=>{
            if (pid) {
                dispatch(addToCartAction("category",pid,qty))
            }
    },[dispatch,pid,qty])

    const cart= useSelector(state=> state.cart)
    const {cartItems}=cart
    // console.log(cartItems);
    let history=useHistory()

    const handleCheckout=()=>{
        history.push('/shipment')
    }

    return (
        <div>
            {
                cartItems.length===0 ? 
                <div className="emptyMsg">
                    <Alert variant="dark">
                    <Alert.Heading>Your cart is empty!</Alert.Heading>
                    <p>
                    Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
                    Continue shopping on the urbanStore.com homepage
                    </p>
                    </Alert>
                    <Link to="/" className="continueText">Continue shopping...</Link>
                </div>
                    : 
                    <div className="cartArea">
                       <div className="cartPdZone">
                            {
                                    cartItems.map(pd=><CartProduct
                                    key={pd.productId} 
                                    product={pd}></CartProduct>)
                                }
                       </div>
                      <div className="rightArea">
                        <div className="totalZone">
                            <p className="itemPrice"> SUBTOTAL ({cartItems.reduce((acc,item)=>acc+item.qty, 0)} ITEMS) :</p>
                            <p className="itemPrice">${cartItems.reduce((acc,item)=>acc+((item.price)*(item.qty)), 0).toFixed(2)}</p>
                            <button className="cartBtn" id="checkoutBtn"  onClick={handleCheckout}>Proceed to checkout</button>
                        </div>
                        <Link to="/" className="continueText">Continue shopping...</Link>
                      </div>
                    </div>
            }
        </div>
    );
};

export default Cart;