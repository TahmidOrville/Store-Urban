import React, { useContext, useEffect, useState} from 'react';
import Products from '../Products/Products';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../Redux/Actions/ProductActions';
import { SearchContext } from '../../App';


const Accessories = () => {
 
    const dispatch= useDispatch();
    const fetchProduct= useSelector( state=> state.fetchProductReducer); 
    const {loading,error,products}= fetchProduct;
    const [term]=useContext(SearchContext);

        useEffect(()=>{
           dispatch(fetchProductsAction())
        },[dispatch])

    return (
        <div>
            {
                loading? <LoadingBox></LoadingBox>
                :
                error? <MessageBox>{error}</MessageBox>
                :
                <div className="productArea">
                {
                    products.filter((pd)=>{
                        if (term==="") {
                            return pd
                        }else if(pd.name.toLowerCase().includes(term.toLowerCase())){
                            return pd
                        }
                    }).map(pd=>pd.category==="accessories" && <Products
                        product={pd}
                        key={pd.key}
                    >
                    </Products>)
                }
            </div>
            }
            
        </div>
    );
};

export default Accessories;