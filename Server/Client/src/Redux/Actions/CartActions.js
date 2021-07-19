import Axios from 'axios';
export const CART_ADD_ITEM= 'CART_ADD_ITEM'
export const CART_REMOVE_ITEM= 'CART_REMOVE_ITEM'
export const CART_SAVE_SHIPPING_ADDRESS='CART_SAVE_SHIPPING_ADDRESS'
export const CART_SAVE_PAYMENT_METHOD='CART_SAVE_PAYMENT_METHOD'

export const addToCartAction= (category,id,qty)=>async(dispatch,getState)=>{
    const {data}= await Axios.get(`/products/${category}/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            productId: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            shipping: data.shipping,
            stock: data.stock,
            qty
        }
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCartAction=(id)=> async(dispatch,getState)=>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload:{id}
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddressAction=(data)=> async(dispatch)=>{
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethodAction=(data)=> async(dispatch)=>{
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}