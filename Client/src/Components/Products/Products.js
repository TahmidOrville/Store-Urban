import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import Rating from '@material-ui/lab/Rating';

const Products = (props) => {

const {_id,key,name,star,image}=props.product 

    return (
        <a href={`/${key}/${_id}`} className="categoryTitle">   
        <div className="productBox">
            <div className="imageArea">
                <img src={image} alt=""/>
            </div>
            <div className="textArea">
                    <p>{name}</p>
                    <Rating name="half-rating-read" defaultValue={parseFloat(star)} precision={0.5} readOnly />
                    <p id="detailsText">View details...</p>
            </div>
        </div>
        </a>
    );
};

export default Products;