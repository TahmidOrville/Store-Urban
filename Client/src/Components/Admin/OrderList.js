import React, { useEffect } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox/LoadingBox';
import './UserList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faTimes,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap';
import { getOrderAllAction } from '../../Redux/Actions/OrderActions';

const OrderList = () => {

    const dispatch =useDispatch()
    const orderAll=useSelector(state=>state.orderAll)
    const{loading,error,orders}=orderAll

  

    useEffect(()=>{
        dispatch(getOrderAllAction())
    },[dispatch])



    return (
        <div className="userTableArea">
            {loading? <LoadingBox></LoadingBox>: error? <Alert variant="danger">{error}</Alert>:(
                <Table striped bordered hover size="sm">
                 <thead>
                            <tr>
                            <th>ID</th>
                            <th>USER</th>
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
                                   <td>{order.user.name}</td>
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
            )}
        </div>
    );
};

export default OrderList;