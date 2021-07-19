import React, { useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faShoppingCart, faUser,faUserShield } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import logo from '../../logo.png';
import { Navbar,Form,FormControl,Button, NavDropdown, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap'
import { logoutAction, USER_DETAILS_RESET } from '../../Redux/Actions/UserActions';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import userIcon from '../../images/icons8-user-48.png'
import boxIcon from '../../images/icons8-box-64.png'
import truckIcon from '../../images/icons8-truck-50.png'
import profileIcon from '../../images/icons8-admin-settings-male-64.png'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Header = () => {

    const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
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

            <div className="desktopUser">
            <Navbar collapseOnSelect bg="dark" expand="lg" >
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
                <div className="space"></div>
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
      
<div className="phoneUser" >
<div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        id="resNav"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/"><img src={logo} alt="" className="logo"/></Link>
          <Link to="/cart" className="text-light show navText"><FontAwesomeIcon icon={faShoppingCart}/><span id="numberCircle">{cartItems.length}</span></Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
        {
                    userInfo ?
                    <div id="navNameDown">
                        <span id="hello">Hello, </span>
                        <ListItem button >
                        <ListItemText primary={`${userInfo.name.split(' ').slice(-1).join(' ')}`} id="navUserName" />
                        </ListItem>
                    </div>:
                    <Link to="/login" className="resText drawerLinkText"><FontAwesomeIcon icon={faUser}/> Sign In</Link>
                }
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
           {
                    userInfo &&
                    <div >
                           <ListItem>
                              <img src={userIcon} alt="" className="drawerIcon" />
                               <Link to='/profile' onClick={handleProfileDetails} className="drawerLinkText"><ListItemText primary={`Profile & Orders`}/></Link>
                            </ListItem>

                            <ListItem>
                              <ListItemText primary={`Sign Out`} onClick={logoutHandler} className="signOutText"/>
                            </ListItem>
                    </div> 
                    }
             {
                    userInfo && userInfo.isAdmin ?
                    <div>
                        <FontAwesomeIcon icon={faUserShield} id="adminIcon"/>
                          <ListItemText primary={`Dashboard`}/>
                           <ListItem>
                               <img src={profileIcon} alt="" className="drawerIcon" />
                               <Link to='/admin/userList' className="drawerLinkText"><ListItemText primary={`Users`}/></Link>
                            </ListItem>
                            <ListItem>
                               <img src={boxIcon} alt="" className="drawerIcon" />
                               <Link to='/admin/productList' className="drawerLinkText"><ListItemText primary={`Products`}/></Link>
                            </ListItem>
                            <ListItem>
                               <img src={truckIcon} alt="" className="drawerIcon" />
                               <Link to='/admin/orderList' className="drawerLinkText"><ListItemText primary={`Orders`}/></Link>
                            </ListItem>
                            


                    </div>: <div></div>
                }

        </List>
      </Drawer>
       
    </div>


</div>


        </div>
        
    );
};

export default Header;
