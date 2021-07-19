import axios from "axios"
import { ORDER_LIST_RESET } from "./OrderActions"

export const USER_LOGIN_REQUEST= 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS= 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL= 'USER_LOGIN_FAIL'
export const USER_LOGOUT= 'USER_LOGOUT'

export const USER_REGISTER_REQUEST= 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS= 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAIL= 'USER_REGISTER_FAIL'

export const USER_DETAILS_REQUEST= 'USER_DETAILS_REQUEST'
export const USER_DETAILS_SUCCESS= 'USER_DETAILS_SUCCESS'
export const USER_DETAILS_FAIL= 'USER_DETAILS_FAIL'
export const USER_DETAILS_RESET= 'USER_DETAILS_RESET'

export const USER_UPDATE_REQUEST= 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS= 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAIL= 'USER_UPDATE_FAIL'
export const USER_UPDATE_RESET= 'USER_UPDATE_RESET'

export const USER_LIST_REQUEST= 'USER_LIST_REQUEST'
export const USER_LIST_SUCCESS= 'USER_LIST_SUCCESS'
export const USER_LIST_FAIL= 'USER_LIST_FAIL'

export const USER_DELETE_REQUEST= 'USER_DELETE_REQUEST'
export const USER_DELETE_SUCCESS= 'USER_DELETE_SUCCESS'
export const USER_DELETE_FAIL= 'USER_DELETE_FAIL'

export const USER_EDIT_REQUEST= 'USER_EDIT_REQUEST'
export const USER_EDIT_SUCCESS= 'USER_EDIT_SUCCESS'
export const USER_EDIT_FAIL= 'USER_EDIT_FAIL'
export const USER_EDIT_RESET= 'USER_EDIT_RESET'

export const loginAction=(email,password)=>async(dispatch)=>{
    try{
        dispatch({ type: USER_LOGIN_REQUEST })

        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data}= await axios.post('/users/login',{email,password},config)

        dispatch({type:USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({type:USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}
export const logoutAction=()=>(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:ORDER_LIST_RESET})
}

export const registerAction=(name,email,password)=>async(dispatch)=>{
    try{
        dispatch({ type: USER_REGISTER_REQUEST })

        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data}= await axios.post('/users/register',{name,email,password},config)

        dispatch({type:USER_REGISTER_SUCCESS, payload:data})
        dispatch({type:USER_LOGIN_SUCCESS, payload:data})

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        dispatch({type:USER_REGISTER_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const userDetailsAction=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: USER_DETAILS_REQUEST })

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.get(`/users/${id}`,config)

        dispatch({type:USER_DETAILS_SUCCESS, payload:data})
        
    }catch(error){
        dispatch({type:USER_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const userUpdateAction=(user)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: USER_UPDATE_REQUEST })

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.put(`/users/profile`,user,config)

        dispatch({type:USER_UPDATE_SUCCESS, payload:data})
        
    }catch(error){ 
        dispatch({type:USER_UPDATE_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const userListAction=()=>async(dispatch,getState)=>{
    try{
        dispatch({ type: USER_LIST_REQUEST })

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.get(`/users`,config)

        dispatch({type:USER_LIST_SUCCESS, payload:data})
        
    }catch(error){ 
        dispatch({type:USER_LIST_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const userDeleteAction=(id)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: USER_DELETE_REQUEST })

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/users/${id}`,config)

        dispatch({type:USER_DELETE_SUCCESS})
        
    }catch(error){ 
        dispatch({type:USER_DELETE_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}

export const userEditAction=(user)=>async(dispatch,getState)=>{
    try{
        dispatch({ type: USER_EDIT_REQUEST })

        const {userLogin:{userInfo}}=getState()

        const config={
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}= await axios.put(`/users/${user._id}`,user,config)

        dispatch({type:USER_EDIT_SUCCESS})
        dispatch({type:USER_DETAILS_SUCCESS, payload: data})
        
    }catch(error){ 
        dispatch({type:USER_EDIT_FAIL,
            payload:
              error.response && error.response.data.message?
              error.response.data.message : error.message })
    }
}