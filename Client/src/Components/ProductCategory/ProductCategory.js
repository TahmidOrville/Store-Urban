import React, { useEffect, useState } from 'react';
import './ProductCategory.css';
import {Card,Button} from 'react-bootstrap';
import fashion from '../../images/fashion.jpg';
import accessories from '../../images/accessories.jpg';
import kids from '../../images/kids.jpg'
import { Link } from 'react-router-dom';;

const ProductCategory = () => {

    
    return (
        <div className="cardArea">
        
                <Link to="/clothing" className="categoryTitle">

                <Card style={{ width: '25rem' }} className="card">
                    <Card.Title>Clothing</Card.Title>
                    <Card.Img variant="top" src={fashion} height="250px" />
                    <Card.Body>
                        <Button variant="primary" size="sm" className="moreBtn">Shop Now</Button>
                    </Card.Body>
                </Card>
            </Link>

            <Link to="/accessories" className="categoryTitle">
            <Card style={{ width: '25rem' }} className="card">
                 <Card.Title>Accessories</Card.Title>
                <Card.Img variant="top" src={accessories} height="250px" />
                <Card.Body>
                    <Button variant="primary" size="sm" className="moreBtn">Shop Now</Button>
                </Card.Body>
            </Card>
            </Link>
            <Link to="/kids" className="categoryTitle">
            <Card style={{ width: '25rem' }} className="card">
                 <Card.Title>Kids</Card.Title>
                <Card.Img variant="top" src={kids} height="250px" />
                <Card.Body>
                    <Button variant="primary" size="sm" className="moreBtn">Shop Now</Button>
                </Card.Body>
            </Card>
            </Link>
        </div>
    );
};

export default ProductCategory;