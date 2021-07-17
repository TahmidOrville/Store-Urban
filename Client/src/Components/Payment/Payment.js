import React, { useState } from 'react';
import './Payment.css';
import {Col, Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Steps from '../Steps/Steps';
import { savePaymentMethodAction } from '../../Redux/Actions/CartActions';

const Payment = () => {

    const history=useHistory()
    const dispatch= useDispatch()

    const cart= useSelector(state=>state.cart)
    const {shippingAddress}= cart
    if (!shippingAddress) {
        history.push('/shipment')
    }

    const [paymentMtd,setPaymentMtd]=useState("Credit Card")
    
   

    const paymentHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethodAction(paymentMtd))
        history.push('/order')
    }

    return (
        <div className="paymentArea">
            <div className="stepsArea"><Steps activeStep='2'></Steps></div>
            <section className="paymentForm">
            <Form>
                <Form.Group>
                    <Form.Label as="legend">Select Payment Method</Form.Label>
                    <Col className="colPay">
                        <Form.Check type="radio" label="Credit or debit card" id="creditCard" name="paymentMtd" value="Credit Card" checked onChange={(e)=>setPaymentMtd(e.target.value)}></Form.Check>
                        <Form.Check type="radio" label="Cash on delivery" id="cash" name="paymentMtd" value="Cash on delivery" onChange={(e)=>setPaymentMtd(e.target.value)}></Form.Check>
                    </Col>
                    </Form.Group>  
                <button className="submitBtn paymentBtn" onClick={paymentHandler}>Continue Checkout</button>

                </Form>
            </section>
        </div>
    );
};

export default Payment;