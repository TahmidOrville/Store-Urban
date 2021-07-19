import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../Authentication/Login.css';
import '../Authentication/Register.css';
import '../Profile/Profile.css';
import './UserEdit.css';
import {Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router';
import { productDetailsAction, PRODUCT_UPDATE_RESET, updateProductAction } from '../../Redux/Actions/ProductActions';


const ProductEdit = () => {

 const{id}=useParams();

 const [name,setName]= useState('')
 const [price,setPrice]= useState(0)
 const [image,setImage]= useState('')
 const [key,setKey]= useState('')
 const [category,setCategory]= useState('')
 const [stock,setStock]= useState(0)
 const [star,setStar]= useState(0)
 const [description,setDescription]= useState('')
 const [shipping,setShipping]= useState(0)
 const [numReviews,setNumReviews]= useState(0)

 const [uploading,setUploading]=useState(false)

const dispatch=useDispatch()
const history= useHistory()

 const productDetailsReducer= useSelector(state=> state.productDetailsReducer)
 const {loading,error,product}= productDetailsReducer

 const productUpdate= useSelector(state=> state.productUpdate)
 const {loading:updateLoading,error:updateError,success:updateSuccess}= productUpdate




 useEffect(()=>{

        if (updateSuccess) {
          dispatch({type: PRODUCT_UPDATE_RESET}) 
          history.push('/admin/productList') 
        }else{

            if (!product.name || product._id !== id) {
                dispatch(productDetailsAction("category",id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setKey(product.key)
                setCategory(product.category)
                setStock(product.stock)
                setStar(product.star)
                setDescription(product.description)
                setShipping(product.shipping)
                setNumReviews(product.numReviews)  
            }
    
        }
     },[dispatch,id,history,product,updateSuccess])

const editHandler=(e)=>{
  e.preventDefault()
  dispatch(updateProductAction({
      _id: id,
      name,price,image,key,category,stock,star,description,shipping,numReviews
  }))
 
}

const uploadFileHandler= async(e)=>{
    const file= e.target.files[0]
    const formData= new FormData()
    formData.append('image',file)
    setUploading(true)

    try{
        const config={
            headers:{
                'Content-Type': 'multipart/form-data',
            }
    }

        const {data}= await axios.post("/upload",formData,config)
        setImage(data)
        setUploading(false)
            
} catch(error){
    console.error(error)
    setUploading(false)
}
}


    return (
        <div>
           <section className="profileForm editFormArea productEditFormContainer">
               <p className="profileHeading"><FontAwesomeIcon icon={faUser}/> Edit Product</p>
                {updateLoading && <LoadingBox></LoadingBox>}
                {updateError && <MessageBox>{updateError}</MessageBox> }
               {loading ? <LoadingBox></LoadingBox>:error ? <MessageBox>{error}</MessageBox>:
                <Form className="editForm">
                <Form.Group controlId="formBasicName">
                        <Form.Label className="title">Name</Form.Label>
                        <Form.Control type="text" spellcheck="false" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>
    
                    <Form.Group controlId="formBasicKey">
                        <Form.Label className="title">Key</Form.Label>
                        <Form.Control type="email" placeholder="Enter key"  value={key} onChange={(e)=>setKey(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice">
                        <Form.Label className="title">Price</Form.Label>
                        <Form.Control type="number" spellcheck="false" placeholder="Enter price" value={price} onChange={(e)=>setPrice(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicImage">
                        <Form.Label className="title">Image</Form.Label>
                        <Form.Control type="text" spellcheck="false" placeholder="Set Image URL" value={image} onChange={(e)=>setImage(e.target.value)} className="profileInput shadow-none"/>
                        <Form.File id='image-file' label="Choose File" custom onChange={uploadFileHandler}></Form.File>
                        {uploading && <LoadingBox></LoadingBox>}
                    </Form.Group>

                    <Form.Group controlId="formBasicCategory">
                        <Form.Label className="title">Category</Form.Label>
                        <Form.Control type="text" spellcheck="false" placeholder="Enter category" value={category} onChange={(e)=>setCategory(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicStock">
                        <Form.Label className="title">Stock</Form.Label>
                        <Form.Control type="number" spellcheck="false" placeholder="Enter stock" value={stock} onChange={(e)=>setStock(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicStar">
                        <Form.Label className="title">Star</Form.Label>
                        <Form.Control type="number" spellcheck="false" placeholder="Enter star" value={star} onChange={(e)=>setStar(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicDescription">
                        <Form.Label className="title">Description</Form.Label>
                        <Form.Control as="textarea" rows={3} spellcheck="false" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicShipping">
                        <Form.Label className="title">Shipping</Form.Label>
                        <Form.Control type="number" spellcheck="false" placeholder="Enter shipping" value={shipping} onChange={(e)=>setShipping(e.target.value)} className="profileInput shadow-none"/>
                    </Form.Group>

                        
                    <Button type="submit" variant="primary" onClick={editHandler}>UPDATE</Button>
                    </Form>}
      
             </section>
        </div>
    );
};

export default ProductEdit;