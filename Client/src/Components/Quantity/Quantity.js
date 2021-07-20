import React, { useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import {Col,Row} from 'react-bootstrap';
import { QtyContext } from '../../App';

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
const Quantity = (props) => {
    const classes = useStyles();
    const [qty,setQty]=useContext(QtyContext);
    return (
        <div>
             <Row>
                        <Col id="qtyTitle">Qty</Col>
                        <Col>
                        <FormControl className={classes.margin} id="optionBox">
                            <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={qty}
                            onChange={(e)=>setQty(e.target.value)}
                            MenuProps={MenuProps}
                            input={<BootstrapInput />}
                            >
                             {
                                 [...Array(props.stock).keys()].map(x=>(
                                     <MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>
                                 ))
                             }
                            </Select>
                        </FormControl>
                        </Col>
                    
                    </Row>
        </div>
    );
};

export default Quantity;