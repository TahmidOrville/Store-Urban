import React, { useEffect, useState } from 'react';
import './Login.css'
import {loginAction} from '../../Redux/Actions/UserActions'
import {Form} from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';

const Login = () => {

const [email,setEmail]= useState('')
const [password,setPassword]= useState('')

const dispatch=useDispatch()

 const userLogin = useSelector(state=> state.userLogin)
 const {loading,error,userInfo}= userLogin

 let history = useHistory()
 let location = useLocation()
 let { from } = location.state || { from: { pathname: "/" } };

 useEffect(()=>{
    if(userInfo){
        history.replace(from);
    }
 },[history,userInfo,from])

const submitHandler=(e)=>{
  e.preventDefault()
  dispatch(loginAction(email,password))
}


    return (
        <div className="formArea">
            {error && <MessageBox>{error}</MessageBox>}
            {loading && <LoadingBox></LoadingBox>}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="title">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}className="inputField"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="title" value={password}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="inputField" />
                </Form.Group>
                <button className="submitBtn" onClick={submitHandler}>SIGN IN</button>
                <div className="ask">
                    <span className="line"></span>
                <p className="askText">New to urbanStore?</p>
                <span className="line"></span>
                </div>
               <Link to='/register'> <button className="submitBtn switchBtn">CREATE YOUR ACCOUNT</button></Link>
                </Form>
     </div>
    );
};

export default Login;