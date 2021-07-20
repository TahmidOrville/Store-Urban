// import {ADD_TO_CART,REMOVE_FROM_CART,CONTROL_QUANTITY,CLEAR_CART,FETCH_PRODUCTS,FETCH_PRODUCTS_SUCCESS} from '../Actions/CartActions';

// export const initialState={
//     loading:false,
//     cart:[],
//     products:[]

// }

// const CartReducers = (state=initialState,action) => {
//     switch(action.type){

//     case FETCH_PRODUCTS:
//         return{...state,loading:true}

//     case FETCH_PRODUCTS_SUCCESS:
//         return{
//             ...state,
//             loading:false,
//             products:action.products
//         }
//     case ADD_TO_CART:
//         let newCart;
//         const sameProduct= state.cart.find(pd=>pd.productKey===action.key);

//         if (sameProduct) {
            
//             let previousQuantity= sameProduct.quantity;
//             sameProduct.quantity=previousQuantity+action.count;
//             sameProduct.total=action.product.price*(previousQuantity+action.count);
//             // console.log(sameProduct);
//             newCart=[...state.cart]
//         }

//         else{
//             const newItem={
//                 productKey:action.key,
//                 product:action.product,
//                 quantity:action.count,
//                 total:action.product.price*action.count,  
//             }
//              newCart=[...state.cart,newItem]
//         }
//         return {...state,cart:newCart}
        
//     case REMOVE_FROM_CART:
//         const remainingCart=state.cart.filter(p=>p.productKey!==action.key)
//         return {...state,cart:remainingCart}

//     case CONTROL_QUANTITY:

//         const item= state.cart.find(f=>f.productKey===action.key);
//             item.quantity=action.count;
//             item.total=action.product.price*action.count;
//              const updatedCart=[...state.cart];
//              return{...state,cart:updatedCart}
        
//     case CLEAR_CART:
//         return {...state,cart:[]}

//         default:
//             return state;
//     }
// };

// export default CartReducers;