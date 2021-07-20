import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CardForm from './CardForm';
import './Stripe.css'


const stripePromise = loadStripe('pk_test_51ItE25SAG4iLAgfKEGSFHyhP28AUnv497wWnfSp06FFtFc3TnXUVggUEaL6IzvtEBEEfQrLZqA5oWYl5iVOS64D400mhBdHXHq');

const Stripe = ({handleSubmit}) => {
    return (
            <Elements stripe={stripePromise} >
          <CardForm handleSubmit={handleSubmit}></CardForm>
        </Elements>
      );
};

export default Stripe;