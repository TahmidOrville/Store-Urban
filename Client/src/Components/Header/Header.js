import React, { useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faShoppingCart, faUser,faUserShield } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import logo from '../../logo.png';
import { Navbar,Form,FormControl,Button, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import { logoutAction, USER_DETAILS_RESET } from '../../Redux/Actions/UserActions';


const Header = () => {
  
const [term,setTerm]=useContext(SearchContext)
// console.log(term);
const cart= useSelector(state=> state.cart)
const {cartItems}=cart

const userLogin = useSelector(state=> state.userLogin)
 const {userInfo}= userLogin
 
 const dispatch= useDispatch()
 const logoutHandler=()=>{
     dispatch(logoutAction())
    //  window.location.reload();
 }
const handleProfileDetails=()=>{
    dispatch({type:USER_DETAILS_RESET})
}
    return (
        <div className="navArea">
            <Navbar collapseOnSelect bg="dark" expand="lg">
            <Link to="/"><img src={logo} alt="" className="logo"/></Link>
            {
                    userInfo && userInfo.isAdmin ?
                    <div class="navAdminDown">
                        <FontAwesomeIcon icon={faUserShield} id="adminIcon"/>
                        <NavDropdown  title='Dashboard' id="navAdmin">
                        <LinkContainer to="/admin/userList" id="navProfileText"><NavDropdown.Item >Users</NavDropdown.Item></LinkContainer>
                        <LinkContainer to="/admin/productList" id="navProfileText"><NavDropdown.Item >Products</NavDropdown.Item></LinkContainer>
                        <LinkContainer to="/admin/orderList" id="navProfileText"><NavDropdown.Item >Orders</NavDropdown.Item></LinkContainer>
                        
                        </NavDropdown>
                    </div>: <div className="navAdminDown"></div>
                }
            <Form inline className="form">
                    <FormControl type="text" placeholder="Search" className="frm" onChange={(event)=>setTerm(event.target.value)} />
                </Form>
           {
                    userInfo ?
                    <div id="navNameDown">
                        <span id="hello">Hello, </span>
                        <NavDropdown title={userInfo.name.split(' ').slice(-1).join(' ')} id="navUserName">
                        <LinkContainer to="/profile" id="navProfileText" onClick={handleProfileDetails}><NavDropdown.Item > Profile & Orders</NavDropdown.Item></LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </div>:
                    <Link to="/login" className="text-light show navText"><FontAwesomeIcon icon={faUser}/> Sign In</Link>
                }
                
                <Link to="/cart" className="text-light show navText"><FontAwesomeIcon icon={faShoppingCart}/><span id="numberCircle">{cartItems.length}</span></Link>
                
                
      </Navbar>
        </div>
    );
};

export default Header;
