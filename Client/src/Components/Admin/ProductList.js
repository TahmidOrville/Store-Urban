import React, { useEffect } from 'react';
import { Alert, Button, Table,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProductAction, deleteProductAction, fetchAllProductsAction, fetchProductsAction, PRODUCT_CREATE_RESET} from '../../Redux/Actions/ProductActions';
import LoadingBox from '../LoadingBox/LoadingBox';
import './UserList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';

const ProductList = () => {

    const dispatch =useDispatch()
    const history=useHistory()
    const fetchAllProductReducer= useSelector(state=>state.fetchAllProductReducer)
    const {loading,error,products}=fetchAllProductReducer


    const productDelete= useSelector(state=>state.productDelete)
    const{loading:loadingDelete, error:errorDelete, success:successDelete}=productDelete

    const productCreate= useSelector(state=>state.productCreate)
    const{loading:loadingCreate, error:errorCreate, success:successCreate,product: createdProduct}=productCreate

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(fetchAllProductsAction())
        }
        
    },[dispatch,successDelete,successCreate,history,createdProduct])


    const deleteHandler=(id)=>{
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProductAction(id))
        }
      
    }

    const createProductHandler=()=>{
        dispatch(createProductAction())
    }

    return (
        <div>
            <Row className='align-items-center pdRow'>
                <Col>
                    <h3>Products</h3>
                </Col>
                <Col>
                    <Button className="my-2 pdCreateBtn" onClick={createProductHandler}> <FontAwesomeIcon icon={faPlus}/> Create Product</Button>
                </Col>
           </Row>
        
        <div className="userTableArea">
           {loadingCreate && <LoadingBox></LoadingBox> }
           {errorCreate && <Alert variant="danger">{errorCreate}</Alert>}
           {loadingDelete && <LoadingBox></LoadingBox> }
           {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
            {loading? <LoadingBox></LoadingBox>: error? <Alert variant="danger">{error}</Alert>:(
                <Table striped bordered hover size="sm" className="adminTable">
                <thead>
                  <tr>
                    <th className="shrinkField">ID</th>
                    <th>CATEGORY</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            <td className="shrinkField">{product._id}</td>
                            <td>{product.category}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button size="sm" variant="light" className="userBtn"> <FontAwesomeIcon icon={faEdit}/></Button>
                                </LinkContainer> <span></span>
                                <Button size="sm" variant="danger"  onClick={()=>deleteHandler(product._id)} className="userBtn"> <FontAwesomeIcon icon={faTrash}/></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
              </Table>
            )}
        </div>
        </div>
    );
};

export default ProductList;