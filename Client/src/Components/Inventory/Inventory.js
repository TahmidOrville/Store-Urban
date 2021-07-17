import React from 'react';
import data from '../../data';
const Inventory = () => {
    const handleAddProduct=()=>{

        fetch('http://localhost:5000/addProduct',{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body: JSON.stringify(data)
        })

    }
    return (
        <div>
            {/* <button onClick={handleAddProduct}>Add products</button> */}
        </div>
    );
};

export default Inventory;