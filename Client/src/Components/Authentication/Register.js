import React, { useEffect, useState } from 'react';
import './Login.css';
import './Register.css';
import {Form} from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { registerAction } from '../../Redux/Actions/UserActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

const [name,setName]= useState('')
const [email,setEmail]= useState('')
const [password,setPassword]= useState('')
const [confirmPassword,setConfirmPassword]= useState('')
const [message,setMessage]= useState(null)

const [numberRegex,setNumberRegex]=useState(false)
const [charRegex,setCharRegex]=useState(false)
const [lengthRegex,setLengthRegex]=useState(false)
const[mailRegex,setMailRegex]=useState(false)

const handleMail=(e)=>{
    if (e.target.name==="email") {
        setMailRegex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value));
    }
    setEmail(e.target.value)
}
const handlePassword=(e)=>{
        if (e.target.name==="password") {
        const hasNumber=/^(?=.*[0-9])/.test(e.target.value);
        hasNumber ? setNumberRegex(true):setNumberRegex(false); 
        
        const hasChar=/^(?=.*[!@#$%^&/*?.])/.test(e.target.value);
        hasChar ? setCharRegex(true):setCharRegex(false);

        const validLength=/^[a-zA-Z0-9!@#$%^&/*?.]{6,16}$/.test(e.target.value);
        validLength ? setLengthRegex(true):setLengthRegex(false);      
      
                 }
        setPassword(e.target.value)
}

const dispatch=useDispatch()

 const userRegister= useSelector(state=> state.userRegister)
 const {loading,error,userInfo}= userRegister

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
  if (password !== confirmPassword) {
     setMessage("Passwords didn't matched!") 
  }
  if (mailRegex===false) {
      setMessage("Invalid email")
  } 
  if (numberRegex===false || charRegex===false || lengthRegex===false) {
    setMessage("Invalid password")
}
    if(password===confirmPassword && mailRegex===true && numberRegex===true && charRegex===true && lengthRegex===true){
    dispatch(registerAction(name,email,password))
  }
  
}


    return (
        <div>
            {message && <MessageBox>{message}</MessageBox>}
            {error && <MessageBox>{error}</MessageBox>}
            {loading && <LoadingBox></LoadingBox>}
            <div className="formArea">
            <Form>
            <Form.Group controlId="formBasicName">
                    <Form.Label className="title">Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={name} onChange={(e)=>setName(e.target.value)}className="inputField"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="title">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleMail} className="inputField"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="title">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"  value={password} onChange={handlePassword} className="inputField" />
                </Form.Group>
                {numberRegex?<p id="passwordMsg" style={{color:"chartreuse"}}><FontAwesomeIcon icon={faCheckCircle}/>Password must contain minimum a number</p>:<p id="passwordMsg" style={{color:"red"}}><FontAwesomeIcon icon={faTimesCircle}/>Password must contain minimum a number</p>}
                {charRegex?<p id="passwordMsg" style={{color:"chartreuse"}}><FontAwesomeIcon icon={faCheckCircle}/>Password must contain minimum a special character</p>:<p id="passwordMsg" style={{color:"red"}}><FontAwesomeIcon icon={faTimesCircle}/>Password must contain minimum a special character</p>}
                {lengthRegex?<p id="passwordMsg" style={{color:"chartreuse"}}><FontAwesomeIcon icon={faCheckCircle}/>Password length must be between 6 to 16 </p>:<p id="passwordMsg" style={{color:"red"}}><FontAwesomeIcon icon={faTimesCircle}/>Password length must be between 6 to 16 </p>}

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label className="title">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="inputField" />
                </Form.Group>
                <button className="submitBtn" onClick={submitHandler}>SIGN UP</button>

               <Link to='/login'> <button className="submitBtn switchBtnR">Already have an account?</button></Link>
                </Form>
          </div>
     </div>
    );
};

export default Register;