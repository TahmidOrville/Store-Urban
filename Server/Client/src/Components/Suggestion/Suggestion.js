import React from 'react';
import { Link } from 'react-router-dom';
import './Suggestion.css';


const Suggestion = (props) => {

    
    const{currentKey,suggestedItem}=props
    const{_id,image,key,category,name,price}=suggestedItem
    return (
        currentKey!==key && category &&
        <Link to={`/${key}/${_id}`} className="moreItems">
        <div className="suggestedContainer">
                <img src={image} alt={name}/> 
                <p>{name}</p>
                <p>${price}</p> 
        </div>
        </Link>
    );
};

export default Suggestion;