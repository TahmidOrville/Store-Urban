import React from 'react';
import { Alert } from 'react-bootstrap';

const MessageBox = (props) => {
    return (
        <div>
            <Alert variant='danger'>
                {props.children}
            </Alert>
        </div>
    );
};

export default MessageBox;