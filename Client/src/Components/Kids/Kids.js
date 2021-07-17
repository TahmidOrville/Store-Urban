import React, { useContext, useEffect, useState} from 'react';
import Products from '../Products/Products';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../Redux/Actions/ProductActions';
import { SearchContext } from '../../App';

const Kids = () => {

    const dispatch= useDispatch();
    const fetchProduct= useSelector( state=> state.fetchProductReducer); 
    const {loading,error,products}= fetchProduct;

        useEffect(()=>{
           dispatch(fetchProductsAction())
        },[dispatch])

        const [term]=useContext(SearchContext);

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
                    }).map(pd=>pd.category==="kids" && <Products
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

export default Kids;