import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './ProductDetails.css';
import Rating from '@material-ui/lab/Rating';
import ReactImageMagnify from 'react-image-magnify';
import {fetchProductsAction, productDetailsAction, PRODUCT_REVIEW_RESET, reviewProductAction } from '../../Redux/Actions/ProductActions';
import {useDispatch, useSelector} from 'react-redux';
import Suggestion from '../Suggestion/Suggestion';
import {Col,Row,Toast,ListGroup,Form,Button } from 'react-bootstrap';
import lock from '../../images/padlock (1).png';
import LoadingBox from '../LoadingBox/LoadingBox';
import { useHistory } from "react-router-dom";
import { IdContext} from '../../App';
import Quantity from '../Quantity/Quantity';
import MessageBox from '../MessageBox/MessageBox';


const ProductDetails = () => {
    
    const{key,id}=useParams();
    
    const dispatch= useDispatch();
    const productDetail= useSelector( state=> state.productDetailsReducer); 
    const {loading,product}= productDetail;
    const {name,category,description,stock,star,image,shipping,price,numReviews}= product; 

    const productReview= useSelector( state=> state.productReview); 
    const {error:reviewError,success:reviewSuccess}= productReview;
    
    useEffect(()=>{
        if (reviewSuccess) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_REVIEW_RESET})
        }
        dispatch(productDetailsAction("category",id))
     },[dispatch,id,reviewSuccess])

    
    

    const fetchProduct= useSelector( state=> state.fetchProductReducer); 
    const {products}= fetchProduct;

        useEffect(()=>{
           dispatch(fetchProductsAction(category,1))
        },[dispatch,category])


    const someProducts=products.slice(0,4)

    const [show, setShow] = useState(false);
    const [visible,setVisible]=useState(false)
    
    const [pid,setId]=useContext(IdContext)

   let history=useHistory()

    const handleAddCart=()=>{
            setId(id)
            history.push('/cart') 
    }

    const userLogin= useSelector( state=> state.userLogin); 
    const {userInfo}= userLogin;

    const [rating,setRating]=useState(0)
    const[comment,setComment]=useState('')


    const reviewSubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(reviewProductAction(id,{
            rating,
            comment
        }))

    }

    return (
        <div> 
            {
                loading? <LoadingBox></LoadingBox>
                :
                <div>
        <div className="detailsArea">
           
                <div className="imgContainer">
                <ReactImageMagnify {...{
                        smallImage: {
                            alt: name,
                            width: 450,
                            height: 500,
                            src:image
                        },
                        largeImage: {
                            src: image,
                            width: 1100,
                            height: 1500,
                        }
                    }} />
            </div>
            <div className="imgContainerPhone">
                <ReactImageMagnify {...{
                        smallImage: {
                            alt: name,
                            width: 360,
                            height: 340,
                            src:image
                        },
                        largeImage: {
                            src: image,
                            width: 600,
                            height: 700,
                        }
                    }} />
            </div>
            

            <div className="textContainer">
                <p id="pdName">{name}</p>
                <p id="description">{description}</p>
                {star && <Rating name="half-rating-read" defaultValue={star} precision={0.5} readOnly />}
                <p>{numReviews} reviews</p>
                <div className="financeSection">
                    <p id="finance">Price: ${price} + ${shipping} shipping & import fees</p>
                    <p id="stock">{stock} more left in stock</p>
                </div>

            </div>

            <div className="infoCard">
                <p id="cardPrice">${price}</p>
                <p id="cardShip">+ ${shipping} shipping  & Import Fees</p>

                <section className="qty">
                   <Quantity stock={stock}></Quantity>
                </section>

                 <button className="cartBtn" onClick={handleAddCart}>Add to Cart</button>

                <Row>
                    <Col xs={6}>
                        <Toast onClose={() => setShow(false)} show={show} delay={3000} style={{ position: 'absolute', top: 30,left: -10,width:"250px"}}>
                    <Toast.Header>
                            <strong className="mr-auto">Your transaction is secure</strong>
                        </Toast.Header>
                        <Toast.Body>We work hard to protect your security and privacy. Our payment security system encrypts your information during transmission. We don’t share your credit card details with third-party sellers, and we don’t sell your information to others. </Toast.Body>
                        </Toast>
                    </Col>
                    <Col xs={15}>
                        <p onClick={() => setShow(true)} id="secure"><img src={lock} alt='Info'/>Secure transaction...</p>
                    </Col>
                    </Row>

                    <Row className="toastBox"> 
                    <Col xs={6}>
                        <Toast onClose={() => setVisible(false)} show={visible} style={{ position: 'absolute',top: 30,left: -40,width:"250px"}}>
                        <Toast.Header></Toast.Header>
                        <Toast.Body>In most cases, items shipped from UrbanStore.com may be returned for a full refund.</Toast.Body>
                        </Toast>
                    </Col>
                    <Col xs={15}>
                        <p onClick={() => setVisible(true)} id="secure">Return policy: This item is returnable...</p>
                    </Col>
                    </Row>
                    <p className="manufacture">Ships from: UrbanStore.com</p>
                    <p className="manufacture">Sold by: UrbanStore.com</p>

            </div>

        </div>

        <div className="reviewContainer">
           <p id="reviewHeadline">Reviews</p>
           {product.reviews.length===0 && <MessageBox>No Reviews</MessageBox>}
            <ListGroup variant="flush" >
                {product.reviews.map(review=>(
                    <ListGroup.Item key={review._id} className="reviewBox">
                        <strong>{review.name}</strong>
                        <br/>
                        <Rating name="half-rating-read" defaultValue={review.star} precision={0.5} readOnly />
                        <p>{review.createdAt.substring(0,10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item className="reviewBox">
                   <p id="reviewHeadline">Write a comment</p>
                    {reviewError && <MessageBox>{reviewError}</MessageBox>}
                    {userInfo? (
                    <Form onSubmit={reviewSubmitHandler}>
                        <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={rating} onChange={e=>setRating(e.target.value)} className="reviewTextBox form-control shadow-none">
                            <option value=''>select...</option>
                            <option value='1'>Poor</option>
                            <option value='2'>Fair</option>
                            <option value='3'>Good</option>
                            <option value='4'>Very Good</option>
                            <option value='5'>Excellent</option>
                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" row='3' value={comment} onChange={e=>setComment(e.target.value)} className="reviewTextBox form-control shadow-none"></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>
                    ):<p>Please Login</p>}
                </ListGroup.Item>
            </ListGroup>
        </div>

        <div>
            <p id="related">Related products</p>
        </div>

        <div className="similar">
                {
                    someProducts.map(pd=><Suggestion
                        key={pd.key}
                        currentKey={key}
                        suggestedItem={pd}
                    ></Suggestion>)
                }
            </div>

        </div>
            }
            
        </div>
        
    );
};

export default ProductDetails;