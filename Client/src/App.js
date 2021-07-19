import React, { createContext, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Home from "./Components/Home/Home";
import Header from './Components/Header/Header'
import Inventory from "./Components/Inventory/Inventory";
import ProductCall from "./Components/ProductCall/ProductCall";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Shipment from "./Components/Shipment/Shipment";
import Login from "./Components/Authentication/Login";
import Profile from "./Components/Profile/Profile";
import Register from "./Components/Authentication/Register";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Footer from "./Components/Footer/Footer";
import Payment from './Components/Payment/Payment';
import Order from './Components/Order/Order';
import SeeOrder from './Components/SeeOrder/SeeOrder';
import NoMatch from './Components/NoMatch/NoMatch'
import UserList from "./Components/Admin/UserList";
import ProductList from "./Components/Admin/ProductList";
import UserEdit from "./Components/Admin/UserEdit";
import ProductEdit from "./Components/Admin/ProductEdit";
import OrderList from "./Components/Admin/OrderList";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";



export const SearchContext=createContext()
export const QtyContext= createContext()
export const IdContext=createContext()
function App() {

const [term,setTerm]=useState("")
const [qty,setQty]=useState(1)
const [pid,setId]=useState("")

  return (
    <IdContext.Provider value={[pid,setId]}>
    <SearchContext.Provider value={[term,setTerm]}>
      <QtyContext.Provider value={[qty,setQty]}>
        
    <div className="App">
      <Router>
        <ScrollToTop></ScrollToTop>
        <Header></Header>
          <Switch>
           
            <Route path="/inventory">
                <Inventory></Inventory>
            </Route>
        
            <Route path="/:category/page/:pageNumber">
              <ProductCall></ProductCall>
            </Route>

            <PrivateRoute path="/admin/orderList">
               <OrderList></OrderList>
            </PrivateRoute>
            <Route path="/cart">
              <Cart></Cart>
            </Route>
            <PrivateRoute path="/admin/productList">
               <ProductList></ProductList>
            </PrivateRoute>
            <PrivateRoute path="/admin/product/:id/edit">
               <ProductEdit></ProductEdit>
            </PrivateRoute>
            <PrivateRoute path="/admin/userList">
               <UserList></UserList>
            </PrivateRoute>
          
            <PrivateRoute path="/admin/user/:id/edit">
               <UserEdit></UserEdit>
            </PrivateRoute>
            <PrivateRoute path="/ordered/:id">
               <SeeOrder></SeeOrder>
            </PrivateRoute>
            <Route path="/:key/:id">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path="/login">
               <Login></Login>
            </Route>
            <Route path="/register">
               <Register></Register>
            </Route>
            <PrivateRoute path="/profile">
               <Profile></Profile>
            </PrivateRoute>
            <PrivateRoute path="/shipment">
               <Shipment></Shipment>
            </PrivateRoute>
            <PrivateRoute path="/payment">
               <Payment></Payment>
            </PrivateRoute>
           
            <PrivateRoute path="/order">
               <Order></Order>
            </PrivateRoute>
            <Route path="/" exact>
                <Home></Home>
            </Route>
            <Route path='*'>
              <NoMatch></NoMatch>
            </Route>
            
          </Switch>
             <Footer></Footer>
        </Router>
    </div>
    </QtyContext.Provider>
    </SearchContext.Provider>
    </IdContext.Provider>
  );
}

export default App;
