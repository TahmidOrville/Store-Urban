import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./useResponsiveFontSize";
import './Stripe.css'

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const CardForm = ({handleSubmit}) => {

 const [payError,setPayError]=useState()

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSub = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const {error,paymentMethod}= await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });
    if (error) {
        setPayError(error.message)
    } else{
        setPayError('')} ;
       handleSubmit({
           id:paymentMethod.id,
           country: paymentMethod.card.country
       })
  };

  return (
    <form onSubmit={handleSub} className="payForm">
      <div className="stripeElement">
      <label>
        Card details
        <CardElement
          options={options}
        />
      </label>
      </div>
      {payError&& <p id="cardErr">{payError}</p>}
      <button type="submit" disabled={!stripe} className="payBtn">
        Pay
      </button>
    </form>
  );
};

export default CardForm;

