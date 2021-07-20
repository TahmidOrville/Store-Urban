import axios from 'axios';
export const ORDER_CREATE_REQUEST= 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS= 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL= 'ORDER_CREATE_FAIL'

export const ORDER_DETAILS_REQUEST= 'ORDER_DETAILS_REQUEST'
export const ORDER_DETAILS_SUCCESS= 'ORDER_DETAILS_SUCCESS'
export const ORDER_DETAILS_FAIL= 'ORDER_DETAILS_FAIL'

export const ORDER_PAY_REQUEST= 'ORDER_PAY_REQUEST'
export const ORDER_PAY_SUCCESS= 'ORDER_PAY_SUCCESS'
export const ORDER_PAY_FAIL= 'ORDER_PAY_FAIL'
export const ORDER_PAY_RESET= 'ORDER_PAY_RESET'

export const ORDER_LIST_REQUEST= 'ORDER_LIST_REQUEST'
export const ORDER_LIST_SUCCESS= 'ORDER_LIST_SUCCESS'
export const ORDER_LIST_FAIL= 'ORDER_LIST_FAIL'
export const ORDER_LIST_RESET= 'ORDER_LIST_RESET'

export const ORDER_ALL_REQUEST= 'ORDER_ALL_REQUEST'
export const ORDER_ALL_SUCCESS= 'ORDER_ALL_SUCCESS'
export const ORDER_ALL_FAIL= 'ORDER_ALL_FAIL'

export const ORDER_DELIVERY_REQUEST= 'ORDER_DELIVERY_REQUEST'
export const ORDER_DELIVERY_SUCCESS= 'ORDER_DELIVERY_SUCCESS'
export const ORDER_DELIVERY_FAIL= 'ORDER_DELIVERY_FAIL'
export const ORDER_DELIVERY_RESET= 'ORDER_DELIVERY_RESET'

export const createOrderAction=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: ORDER_CREATE_REQUEST})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.post(`/orders`,order,config)

        dispatch({type:ORDER_CREATE_SUCCESS, payload:data})
        
    }catch(error){ 
        dispatch({type:ORDER_CREATE_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const payOrderAction=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: ORDER_PAY_REQUEST})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.post(`/orders/pay`,order,config)

        dispatch({type:ORDER_PAY_SUCCESS, payload:data})
        
    }catch(error){ 
        dispatch({type:ORDER_PAY_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const getOrderDetailsAction=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: ORDER_DETAILS_REQUEST})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.get(`/orders/${id}`,config)

        dispatch({type:ORDER_DETAILS_SUCCESS, payload:data})
        
    }catch(error){ 
        dispatch({type:ORDER_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const getOrderListAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({ type: ORDER_LIST_REQUEST})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.get(`/orders/myOrders`,config)

        dispatch({type:ORDER_LIST_SUCCESS, payload:data})
        
    }catch(error){ 
        dispatch({type:ORDER_LIST_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const getOrderAllAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({ type: ORDER_ALL_REQUEST})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.get(`/orders`,config)

        dispatch({type:ORDER_ALL_SUCCESS, payload:data})
        
    }catch(error){ 
        dispatch({type:ORDER_ALL_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const deliverOrderAction=(order)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: ORDER_DELIVERY_REQUEST})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.put(`/orders/${order._id}`,order,config)

        dispatch({type:ORDER_DELIVERY_SUCCESS, payload: data})
        
    }catch(error){ 
        dispatch({type:ORDER_DELIVERY_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}


