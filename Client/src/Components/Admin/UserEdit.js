import React, { useEffect, useState } from 'react';
import '../Authentication/Login.css';
import '../Authentication/Register.css';
import '../Profile/Profile.css';
import './UserEdit.css';
import {Alert, Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { userDetailsAction, userEditAction, USER_EDIT_RESET} from '../../Redux/Actions/UserActions';
import { useHistory, useParams } from 'react-router';


const UserEdit = () => {

 const{id}=useParams();

const [name,setName]= useState('')
const [email,setEmail]= useState('')
const [isAdmin,setIsAdmin]= useState(false)
const[mailRegex,setMailRegex]=useState(true)
const[mailErr,setMailErr]=useState('')

const handleMail=(e)=>{
    if (e.target.name==="email") {
        setMailRegex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value));
    }
    setEmail(e.target.value)
}


const dispatch=useDispatch()
const history= useHistory()

 const userDetails= useSelector(state=> state.userDetails)
 const {loading,error,user}= userDetails

 const userEdit= useSelector(state=> state.userEdit)
 const {loading:editLoading,error:editError,success:editSuccess}= userEdit



 useEffect(()=>{
     if (editSuccess) {
         dispatch({type: USER_EDIT_RESET})
         history.push('/admin/userList')
     } else{
        if (!user.name || user._id !== id) {
            dispatch(userDetailsAction(id))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
     }
    
 },[dispatch,user,id,editSuccess,history])

const editHandler=(e)=>{
  e.preventDefault()
  if (mailRegex===true) {
    dispatch(userEditAction({_id: id, name,email,isAdmin}))
  }else{
      setMailErr('Invalid Email')
  }
 
}


    return (
        <div>
           <section className="profileForm editFormArea">
               <p className="profileHeading"><FontAwesomeIcon icon={faUser}/> Edit User</p>
               {editLoading && <LoadingBox></LoadingBox>}
               {editError && <Alert variant="danger">{editError}</Alert>}
               {loading ? <LoadingBox></LoadingBox>:error ? <MessageBox>{error}</MessageBox>:
                <Form className="editForm">
                <Form.Group controlId="formBasicName">
                        <Form.Label className="title">Name</Form.Label>
                        <Form.Control type="text" spellcheck="false" placeholder="Enter name" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>
    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className="title">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleMail} className="profileInput shadow-none"/>
                    </Form.Group>
                    {mailRegex===false && <p style={{color:"red"}}>{mailErr}</p>}
                    <Form.Group controlId="formBasicAdmin">
                        <Form.Check type="checkbox" label="Admin" checked={isAdmin}  onChange={(e)=>setIsAdmin(e.target.checked)}/>
                    </Form.Group>
                    <Button type="submit" variant="primary" onClick={editHandler}>UPDATE</Button>
                    </Form>}
      
             </section>
        </div>
    );
};

export default UserEdit;