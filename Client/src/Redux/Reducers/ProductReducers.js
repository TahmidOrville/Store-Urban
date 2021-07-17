import { FETCH_PRODUCTS, FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_SUCCESS, PRODUCT_CREATE, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS, PRODUCT_REVIEW, PRODUCT_REVIEW_FAIL, PRODUCT_REVIEW_RESET, PRODUCT_REVIEW_SUCCESS, PRODUCT_UPDATE, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../Actions/ProductActions";


export const fetchProductReducer=(state={ loading:true, products:[]},action)=>{
    switch(action.type){
        case FETCH_PRODUCTS:
        return{...state,loading: true};
        case FETCH_PRODUCTS_SUCCESS:
            return{...state, loading:false, products: action.payload};
        case FETCH_PRODUCTS_FAIL:
            return{...state, loading:false, error: action.payload}
        default:
            return state;
    }
}

export const productDetailsReducer=(state={loading:true, product:{reviews:[]}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS:
            return{...state,loading:true};

        case PRODUCT_DETAILS_SUCCESS:
            return{...state, loading:false, product: action.payload};
            
        case PRODUCT_DETAILS_FAIL:
            return{...state, loading:false, error: action.payload}    

         default:
             return state;   
    }

}
export const productDeleteReducer=(state={},action)=>{
    switch(action.type){
        case PRODUCT_DELETE:
            return{...state,loading:true};

        case PRODUCT_DELETE_SUCCESS:
            return{...state, loading:false, success:true};
            
        case PRODUCT_DELETE_FAIL:
            return{...state, loading:false, error: action.payload}    

         default:
             return state;   
    }

}

export const productCreateReducer=(state={product:{}},action)=>{
    switch(action.type){
        case PRODUCT_CREATE:
            return{...state,loading:true};

        case PRODUCT_CREATE_SUCCESS:
            return{...state, loading:false, success:true, product: action.payload};
            
        case PRODUCT_CREATE_FAIL:
            return{...state, loading:false, error: action.payload}    
        case PRODUCT_CREATE_RESET:
             return{}  
         default:
             return state;   
    }

}

export const productUpdateReducer=(state={product:{}},action)=>{
    switch(action.type){
        case PRODUCT_UPDATE:
            return{...state,loading:true};

        case PRODUCT_UPDATE_SUCCESS:
            return{...state, loading:false, success:true, product: action.payload};
            
        case PRODUCT_UPDATE_FAIL:
            return{...state, loading:false, error: action.payload}    
        case PRODUCT_UPDATE_RESET:
             return{product:{}}  
         default:
             return state;   
    }

}

export const productReviewReducer=(state={},action)=>{
    switch(action.type){
        case PRODUCT_REVIEW:
            return{...state,loading:true};

        case PRODUCT_REVIEW_SUCCESS:
            return{...state, loading:false, success:true};
            
        case PRODUCT_REVIEW_FAIL:
            return{...state, loading:false, error: action.payload}    
        case PRODUCT_REVIEW_RESET:
             return{}  
         default:
             return state;   
    }

}