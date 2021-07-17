import { USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_EDIT_FAIL, USER_EDIT_REQUEST, USER_EDIT_RESET, USER_EDIT_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../Actions/UserActions";

export const userLoginReducer=(state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return{...state,loading:true };

        case USER_LOGIN_SUCCESS:
            return{...state,loading:false, userInfo: action.payload};
            
        case USER_LOGIN_FAIL:
            return{...state,loading:false, error: action.payload}   
            
        case USER_LOGOUT:
            return{}

         default:
             return state;   
    }

}
export const userRegisterReducer=(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return{...state,loading:true };

        case USER_REGISTER_SUCCESS:
            return{...state,loading:false, userInfo: action.payload};
            
        case USER_REGISTER_FAIL:
            return{...state,loading:false, error: action.payload}   
        
         default:
             return state;   
    }
}

export const userDetailsReducer=(state={user:{}},action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return{...state,loading:true };

        case USER_DETAILS_SUCCESS:
            return{...state,loading:false, user: action.payload};
            
        case USER_DETAILS_FAIL:
            return{...state,loading:false, error: action.payload}   
        case USER_DETAILS_RESET:
                return{user:{}} 
         default:
             return state;   
    }

}

export const userUpdateReducer=(state={},action)=>{
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return{...state,loading:true };

        case USER_UPDATE_SUCCESS:
            return{...state,loading:false, success:true, userInfo: action.payload};
            
        case USER_UPDATE_FAIL:
            return{...state,loading:false, error: action.payload}   
        
         default:
             return state;   
    }

}

export const userListReducer=(state={users:[]},action)=>{
    switch(action.type){
        case USER_LIST_REQUEST:
            return{...state,loading:true };

        case USER_LIST_SUCCESS:
            return{...state,loading:false, users: action.payload};
            
        case USER_LIST_FAIL:
            return{...state,loading:false, error: action.payload}   
        
         default:
             return state;   
    }

}

export const userDeleteReducer=(state={},action)=>{
    switch(action.type){
        case USER_DELETE_REQUEST:
            return{...state,loading:true };

        case USER_DELETE_SUCCESS:
            return{...state,loading:false,success:true};
            
        case USER_DELETE_FAIL:
            return{...state,loading:false, error: action.payload}   
        
         default:
             return state;   
    }

}

export const userEditReducer=(state={user:{}},action)=>{
    switch(action.type){
        case USER_EDIT_REQUEST:
            return{...state,loading:true };

        case USER_EDIT_SUCCESS:
            return{...state,loading:false,success:true};
            
        case USER_EDIT_FAIL:
            return{...state,loading:false, error: action.payload}  
        
        case USER_EDIT_RESET:
             return{user:{}}
        
         default:
             return state;   
    }

}