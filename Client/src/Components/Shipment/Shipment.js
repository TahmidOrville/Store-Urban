import React, { useState } from 'react';
import './Shipment.css';
import {Form} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddressAction } from '../../Redux/Actions/CartActions';
import Steps from '../Steps/Steps';
import AlternativeSteps from '../Steps/AlternativeSteps';

const Shipment = () => {

    const cart= useSelector(state=>state.cart)
    const {shippingAddress}= cart

    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [zip,setZip]=useState(shippingAddress.zip)
    const [country,setCountry]=useState(shippingAddress.country)
    
    const history=useHistory()
    const dispatch= useDispatch()

    const shippingHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddressAction({address,city,zip,country}))
        history.push('/payment')
    }

    return (
        <div className="shipArea">
            <div className="stepsArea desktopStepper"><Steps activeStep='1'></Steps></div>
            <div className="stepsArea phoneStepper"><AlternativeSteps activeStep='1'></AlternativeSteps> </div>
            <section className="shipForm">
            <Form>
            <Form.Group controlId="address">
                    <Form.Label className="title">Address</Form.Label>
                    <Form.Control type="text" placeholder="Your address"  value={address} onChange={(e)=>setAddress(e.target.value)} className="profileInput shadow-none"/>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label className="title">City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city"  value={city} onChange={(e)=>setCity(e.target.value)} className="profileInput shadow-none"/>
                </Form.Group>

                <Form.Group controlId="zip">
                    <Form.Label className="title">Zip</Form.Label>
                    <Form.Control type="text" placeholder="Postal code"  value={zip}  onChange={(e)=>setZip(e.target.value)} className="profileInput shadow-none" />
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label className="title">Country</Form.Label>
                    <Form.Control type="text" placeholder="Country"  value={country}  onChange={(e)=>setCountry(e.target.value)} className="profileInput shadow-none" />
                </Form.Group>
                {
                    (address && city && zip && country)? 
                        <button className="submitBtn shipBtn" onClick={shippingHandler}>Continue Checkout</button>:
                        <button className="submitBtn shipBtn" onClick={shippingHandler} disabled>Continue Checkout</button>
                        
                    
                }

                </Form>
            </section>
        </div>
    );
};

export default Shipment;