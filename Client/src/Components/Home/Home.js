import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import ProductCategory from '../ProductCategory/ProductCategory';
import './Home.css';
const Home = () => {

    return (
        <div className="homeArea">
            <Banner></Banner>
            <div className="categoryArea">
                 <ProductCategory></ProductCategory>
            </div>
        </div>
    );
};

export default Home;