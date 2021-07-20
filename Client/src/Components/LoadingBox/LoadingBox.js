import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingBox = () => {
    return (
        <div style={{"marginTop":"10%"}}>
            <Spinner animation="grow" variant="info" size="sm" />
            <Spinner animation="grow" variant="light" size="sm" />
            <Spinner animation="grow" variant="dark" size="sm" />
        </div>
    );
};

export default LoadingBox;