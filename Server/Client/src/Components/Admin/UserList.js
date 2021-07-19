import React, { useEffect } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userDeleteAction, userListAction } from '../../Redux/Actions/UserActions';
import LoadingBox from '../LoadingBox/LoadingBox';
import './UserList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faTimes,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap';

const UserList = () => {

    const dispatch =useDispatch()
    const userList= useSelector(state=>state.userList)
    const {loading,error,users}=userList

    const userDelete= useSelector(state=>state.userDelete)
    const{success:successDelete}=userDelete

    useEffect(()=>{
        dispatch(userListAction())
    },[dispatch,successDelete])


    const deleteHandler=(id)=>{
        if (window.confirm('Are you sure?')) {
            dispatch(userDeleteAction(id))
        }
      
    }

    return (
        <div className="userTableArea">
            {loading? <LoadingBox></LoadingBox>: error? <Alert variant="danger">{error}</Alert>:(
                <Table striped bordered hover size="sm" className="adminTable">
                <thead>
                  <tr>
                    <th className="shrinkField">ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user._id}>
                            <td className="shrinkField">{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? <FontAwesomeIcon icon={faCheck} style={{color:'green'}}/>:<FontAwesomeIcon icon={faTimes} style={{color:'red'}}/>}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button size="sm" variant="light" className="userBtn"> <FontAwesomeIcon icon={faEdit}/></Button>
                                </LinkContainer> <span></span>
                                <Button size="sm" variant="danger"  onClick={()=>deleteHandler(user._id)} className="userBtn"> <FontAwesomeIcon icon={faTrash}/></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </Table>
            )}
        </div>
    );
};

export default UserList;