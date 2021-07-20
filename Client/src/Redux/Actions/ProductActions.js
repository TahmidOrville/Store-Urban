import Axios from 'axios';
export const FETCH_PRODUCTS="FETCH_PRODUCTS";
export const FETCH_PRODUCTS_SUCCESS="FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAIL="FETCH_PRODUCTS_FAIL";

export const FETCH_ALL_PRODUCTS="FETCH_ALL_PRODUCTS";
export const FETCH_ALL_PRODUCTS_SUCCESS="FETCH_ALL_PRODUCTS_SUCCESS";
export const FETCH_ALL_PRODUCTS_FAIL="FETCH_ALL_PRODUCTS_FAIL";

export const PRODUCT_DETAILS="PRODUCT_DETAILS";
export const PRODUCT_DETAILS_SUCCESS="PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL="PRODUCT_DETAILS_FAIL";

export const PRODUCT_DELETE="PRODUCT_DELETE";
export const PRODUCT_DELETE_SUCCESS="PRODUCT_DELETE_SUCCESS";
export const PRODUCT_DELETE_FAIL="PRODUCT_DELETE_FAIL";

export const PRODUCT_CREATE="PRODUCT_CREATE";
export const PRODUCT_CREATE_SUCCESS="PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAIL="PRODUCT_CREATE_FAIL";
export const PRODUCT_CREATE_RESET="PRODUCT_CREATE_RESET";

export const PRODUCT_UPDATE="PRODUCT_UPDATE";
export const PRODUCT_UPDATE_SUCCESS="PRODUCT_UPDATE_SUCCESS";
export const PRODUCT_UPDATE_FAIL="PRODUCT_UPDATE_FAIL";
export const PRODUCT_UPDATE_RESET="PRODUCT_UPDATE_RESET";

export const PRODUCT_REVIEW="PRODUCT_REVIEW";
export const PRODUCT_REVIEW_SUCCESS="PRODUCT_REVIEW_SUCCESS";
export const PRODUCT_REVIEW_FAIL="PRODUCT_REVIEW_FAIL";
export const PRODUCT_REVIEW_RESET="PRODUCT_REVIEW_RESET";



export const fetchProductsAction=(category,pageNumber='')=>async (dispatch)=>{
   
    try{
        dispatch({type: FETCH_PRODUCTS})
        const {data} = await Axios.get(`/products/${category}/list?pageNumber=${pageNumber}`);
        dispatch({type: FETCH_PRODUCTS_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: FETCH_PRODUCTS_FAIL, payload: error.message })
    }
}

export const fetchAllProductsAction=()=>async (dispatch)=>{
   
    try{
        dispatch({type: FETCH_ALL_PRODUCTS})
        const {data} = await Axios.get(`/products`);
        dispatch({type: FETCH_ALL_PRODUCTS_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: FETCH_ALL_PRODUCTS_FAIL, payload: error.message })
    }
}

export const productDetailsAction=(id)=> async(dispatch)=>{
    
      try{
            dispatch({type: PRODUCT_DETAILS, payload:id})
            const {data}= await Axios.get(`/products/${id}`);
            dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
      }catch(error){
                  dispatch({type:PRODUCT_DETAILS_FAIL,
                           payload:
                             error.response && error.response.data.message?
                             error.response.data.message : error.message })
    }
}

export const deleteProductAction=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: PRODUCT_DELETE})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        await Axios.delete(`/products/${id}`,config)

        dispatch({type:PRODUCT_DELETE_SUCCESS})
        
    }catch(error){ 
        dispatch({type:PRODUCT_DELETE_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const createProductAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({ type: PRODUCT_CREATE})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await Axios.post(`/products`,{},config)

        dispatch({type:PRODUCT_CREATE_SUCCESS, payload: data})
        
    }catch(error){ 
        dispatch({type:PRODUCT_CREATE_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const updateProductAction=(product)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: PRODUCT_UPDATE})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await Axios.put(`/products/${product._id}`,product,config)

        dispatch({type:PRODUCT_UPDATE_SUCCESS, payload: data})
        
    }catch(error){ 
        dispatch({type:PRODUCT_UPDATE_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const reviewProductAction=(productId,review)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: PRODUCT_REVIEW})

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        await Axios.post(`/products/${productId}/reviews`,review,config)

        dispatch({type:PRODUCT_REVIEW_SUCCESS})
        
    }catch(error){ 
        dispatch({type:PRODUCT_REVIEW_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
} 