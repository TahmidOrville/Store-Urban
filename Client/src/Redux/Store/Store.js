import { createStore,applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { fetchProductReducer, productDetailsReducer,productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer} from "../Reducers/ProductReducers";
import {cartReducer} from '../Reducers/CartReducers'
import {userDeleteReducer, userDetailsReducer, userEditReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer} from '../Reducers/UserReducers'
import { orderAllReducer, orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from "../Reducers/OrderReducers";

const initialState={
    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) :{} ,
        paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ''  
    },
    userLogin:{
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
        :null }    
};
const reducer=combineReducers({
   fetchProductReducer,
    productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReview: productReviewReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderAll: orderAllReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
    
})
const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store= createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));




