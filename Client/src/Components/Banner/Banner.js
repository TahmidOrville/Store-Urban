import React from 'react';
import './Banner.css';
import banner1 from '../../images/banner1.jpg';
import banner2 from '../../images/banner2.jpg';
import banner3 from '../../images/banner3.jpg';
import banner4 from '../../images/banner4.jpg';
import {Carousel} from 'react-bootstrap';
const Banner = () => {
    return (
        <div>
              <Carousel className="mt-1 car">
                <Carousel.Item>
                    <img
                    className="d-block w-90 mx-auto carImage"
                    src={banner1}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-90 mx-auto carImage"
                    src={banner2}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-90 mx-auto carImage"
                    src={banner3}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-90 mx-auto carImage"
                    src={banner4}
                    alt="Fourth slide"
                    />
                </Carousel.Item>
                </Carousel>
        </div>
    );
};

export default Banner;