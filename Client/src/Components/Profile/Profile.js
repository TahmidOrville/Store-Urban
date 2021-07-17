import React, { useEffect, useState } from 'react';
import '../Authentication/Login.css';
import '../Authentication/Register.css';
import './Profile.css';
import {Alert, Button, Form, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUser,faTimes } from '@fortawesome/free-solid-svg-icons';
import { userDetailsAction, userUpdateAction } from '../../Redux/Actions/UserActions';
import { getOrderListAction } from '../../Redux/Actions/OrderActions';
import { LinkContainer } from 'react-router-bootstrap';

const Profile = () => {
const [name,setName]= useState('')
const [email,setEmail]= useState('')
const [password,setPassword]= useState('')
const [confirmPassword,setConfirmPassword]= useState('')
const [message,setMessage]= useState(null)

const [numberRegex,setNumberRegex]=useState(true)
const [charRegex,setCharRegex]=useState(true)
const [lengthRegex,setLengthRegex]=useState(true)
const[mailRegex,setMailRegex]=useState(true)

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

 const userDetails= useSelector(state=> state.userDetails)
 const {loading,error,user}= userDetails

 const userUpdateProfile= useSelector(state=> state.userUpdateProfile)
 const {success}= userUpdateProfile

 const orderList= useSelector(state=> state.orderList)
 const {loading: loadingOrders, error: errorOrders, orders}= orderList


 useEffect(()=>{
    if (!user.name) {
                dispatch(userDetailsAction('profile'))
                dispatch(getOrderListAction())
            }else{
                setName(user.name)
                setEmail(user.email)
            } 
 },[dispatch,user])


const updateHandler=(e)=>{
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
       dispatch(userUpdateAction({id: user._id, name, email, password}))
       setMessage(null)

  }
  
}


    return (
        <div className="profileArea">
           <section className="profileForm">
               <p className="profileHeading"><FontAwesomeIcon icon={faUser}/> Profile</p>
            {message && <MessageBox>{message}</MessageBox>}
            {error && <MessageBox>{error}</MessageBox>}
            {loading && <LoadingBox></LoadingBox>}
            {success && <Alert variant='success'>successfully updated</Alert>}
            <Form>
            <Form.Group controlId="formBasicName">
                    <Form.Label className="title">Name</Form.Label>
                    <Form.Control type="text" spellcheck="false" placeholder="Enter name" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="profileInput shadow-none"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="title">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleMail} className="profileInput shadow-none"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="title" value={password}>Change Password</Form.Label>
                    <Form.Control type="password" placeholder="New password" name="password" onChange={handlePassword} className="profileInput shadow-none" />
                </Form.Group>
                {numberRegex?<p id="passwordMsg" style={{color:"chartreuse"}}><FontAwesomeIcon icon={faCheckCircle}/>Password must contain minimum a number</p>:<p id="passwordMsg" style={{color:"red"}}><FontAwesomeIcon icon={faTimesCircle}/>Password must contain minimum a number</p>}
                {charRegex?<p id="passwordMsg" style={{color:"chartreuse"}}><FontAwesomeIcon icon={faCheckCircle}/>Password must contain minimum a special character</p>:<p id="passwordMsg" style={{color:"red"}}><FontAwesomeIcon icon={faTimesCircle}/>Password must contain minimum a special character</p>}
                {lengthRegex?<p id="passwordMsg" style={{color:"chartreuse"}}><FontAwesomeIcon icon={faCheckCircle}/>Password length must be between 6 to 16 </p>:<p id="passwordMsg" style={{color:"red"}}><FontAwesomeIcon icon={faTimesCircle}/>Password length must be between 6 to 16 </p>}

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label className="title" value={confirmPassword}>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm new password" name="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)} className="profileInput shadow-none" />
                </Form.Group>
                <button className="submitBtn" onClick={updateHandler}>UPDATE</button>
                </Form>
             </section>
             <section className="profileOrders">
                <p className="profileHeading">My Orders</p>
                 {
                     loadingOrders? <LoadingBox></LoadingBox>:
                     errorOrders? <Alert variant="danger">{errorOrders}</Alert>:
                     <Table striped bordered hover responsive className='table-sm'>
                           <thead>
                            <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                           {orders.map(order=>(
                               <tr key={order._id}>
                                   <td>{order._id}</td>
                                   <td>{order.createdAt.substring(0,10)}</td>
                                   <td>${order.totalPrice}</td>
                                   <td>{order.isPaid ? order.paidAt.substring(0,10) : <FontAwesomeIcon icon={faTimes} style={{color:"red"}}/> }</td>
                                   <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <FontAwesomeIcon icon={faTimes} style={{color:"red"}}/> }</td>
                                   <td>
                                       <LinkContainer to={`/ordered/${order._id}`}>
                                           <Button variant="light" size="sm">DETAILS</Button>
                                       </LinkContainer>
                                   </td>
                               </tr>
                           ))}
                        </tbody>
                     </Table>
                 }
             </section>
        </div>
    );
};

export default Profile;