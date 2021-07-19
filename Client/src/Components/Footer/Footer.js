import React, { useEffect, useState } from 'react';
import './Footer.css'
import logo from '../../logo.png'

const Footer = () => {

    const [top,setTop]=useState(false)

    useEffect(() => {
        if (top===true) {
            window.scrollTo(0, 0)
            setTop(false)
        }
        }, [top]) 
    const topHandler=()=>{
        setTop(true)
    }
    return (
       <div className="footerContainer">
       <div id="topRoute" onClick={topHandler}>Back to Top</div>
        <section className="footerArea">
            <div className="leftFooterArea">
                <h5 className="footerHeadText">Get to Know Us</h5>
                <p>Careers</p>
                <p>Blog</p>
                <p className="hiddenText">About Urban Store</p>
                <p className="hiddenText">Investor Relations</p>
                <p className="hiddenText">Urban Store Tours</p>

            </div>
            <div className="centralFooterArea">
            <h5 className="footerHeadText">Make Money with Us</h5>
                <p>Sell products on Urban Store</p>
                <p>Sell on Urban Store business</p>
                <p className="hiddenText">Sell apps on Urban Store</p>
                <p className="hiddenText">Become an Affiliate</p>
                <p className="hiddenText">Advertise Your Products </p>
            </div>
            <div className="rightFooterArea">
            <h5 className="footerHeadText">Let Us Help You</h5>
                <p>Urban Store & COVID-19</p>
                <p>Shipping Rates and Policies</p>
                <p className="hiddenText">Urban Store Assistant</p>
            </div>
        </section>
        <div className="footerLogo">
            <img src={logo} alt="urbanStore"/>
            <p className="copyRight">© 2021-2022, UrbanStore.com, Inc. or its affiliates </p>
        </div>
       </div>
    );
};

export default Footer;