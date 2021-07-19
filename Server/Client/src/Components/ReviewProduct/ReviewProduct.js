import React from 'react';
import './ReviewProduct.css';

const ReviewProduct = ({pd}) => {
    const{key,productId,image,name,price,qty}=pd
    return (
       <section className="range">
           <a href={`/${key}/${productId}`} className="linkText">
        <div className="reviewPdBox">
            <div className="reviewImg"><img src={image} alt={name}/></div> 
            <div className="reviewText"><p>{name}</p></div>
            <div className="reviewPrice"><p>{`${qty}x${price}= $${qty*price}`}</p></div>  
        </div>
       </a>
       </section>
    );
};

export default ReviewProduct;