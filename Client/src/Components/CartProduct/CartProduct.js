import React, { useEffect } from 'react';
import './CartProduct.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {Col,Row} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCartAction, removeFromCartAction } from '../../Redux/Actions/CartActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow'])
    },
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const style={
    backgroundColor:"white",
};
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 90,
        backgroundColor:style.backgroundColor,
      },
    },
  };

const CartProduct = (props) => {
    const classes = useStyles();
    const dispatch=useDispatch()
    
    const {productId,name,image,stock,price,qty}=props.product

   const handleRemove=(id)=>{
      dispatch(removeFromCartAction(id))
   }

    return (
        <div className="cartPdContainer">
            <div className="pictureContainer">
                <img src={image} alt={name}/>
            </div>
            <div className="infoContainer">
                <p id="itemName">{name}</p>
                <p id="itemStock">{stock} left in stock</p>
                <Row className="qtyCont">
                        <Col id="qtyTitle">Qty</Col>
                        <Col id="selectArea">
                        <FormControl className={classes.margin} id="optionBox">
                            <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={qty}
                            onChange={(e)=>
                                dispatch(addToCartAction(productId,Number(e.target.value)))
                            }
                            MenuProps={MenuProps}
                            input={<BootstrapInput />}
                            >
                             {
                                 [...Array(stock).keys()].map(x=>(
                                     <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                                 ))
                             }
                            </Select>
                        </FormControl>
                        </Col>
                    
                    </Row>
            </div>
            <div className="infoContainer2">
            <p className="itemPrice">${price}</p>
            <button id="deleteBtn" onClick={()=>handleRemove(productId)}><FontAwesomeIcon icon={faTrashAlt}/></button>
            </div>
        </div>
    );
};

export default CartProduct;