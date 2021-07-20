import React, { useContext, useEffect, useState} from 'react';
import './ProductCall.css';
import Products from '../Products/Products';
import LoadingBox from '../LoadingBox/LoadingBox';
import MessageBox from '../MessageBox/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../../Redux/Actions/ProductActions';
import { SearchContext } from '../../App';
import { useParams } from 'react-router-dom';
import Paginate from '../Paginate/Paginate';
import { Form, FormControl } from 'react-bootstrap';

const Clothing = () => {

    const {category,pageNumber}= useParams()

    const [term,setTerm]=useContext(SearchContext)
  
    const dispatch= useDispatch();

        useEffect(()=>{
            if(category==="clothing"){
                dispatch(fetchProductsAction("clothing",pageNumber))
            }
            if (category==="accessories") {
                dispatch(fetchProductsAction("accessories",pageNumber))
            }
            if (category==="kids") {
                dispatch(fetchProductsAction("kids",pageNumber))
            }
           
        },[dispatch,pageNumber,category])

        const fetchProduct= useSelector( state=> state.fetchProductReducer); 
        const {loading,error,products,pages,page}= fetchProduct;


    return  (
        <div className="cont">
            {
                loading? <LoadingBox></LoadingBox>
                :
                error? <MessageBox>{error}</MessageBox>
                :
                <div>
                     <Form inline className="phoneSearchForm">
                    <FormControl type="text" placeholder="Search" className="frm" onChange={(event)=>setTerm(event.target.value)} />
                </Form>
                    <div className="productArea">
                    { products.filter((pd)=>{
                    if (term==="") {
                        return pd
                    }else if(pd.name.toLowerCase().includes(term.toLowerCase())){
                        return pd
                    }
                    }).map(pd=> <Products
                            product={pd}
                            key={pd.key}
                        >
                        </Products>)
                    }
                    </div>

                    <div className="paginationBar">

                    <Paginate pages={pages} page={page} category={category}></Paginate>

                    </div>

                

                </div>
          
            }
            
        </div>
    )
    
};
export default Clothing;
