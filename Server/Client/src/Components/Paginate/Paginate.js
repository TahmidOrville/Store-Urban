import React from 'react';
import {Pagination} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({pages,page,category,isAdmin=false}) => {
    return (
            pages > 1 &&  
        
        <div>

            <Pagination>

                   { page>1 &&
                        <LinkContainer key={page} to={`/${category}/page/${page-1}`}>
                    <Pagination.Prev />
                </LinkContainer>} 
          
                {[...Array(pages).keys()].map(x=>(
                    <LinkContainer key={x+1} to={`/${category}/page/${x+1}`}>
                        <Pagination.Item active={x+1 ===page}>{x+1}</Pagination.Item>
                    </LinkContainer>
                ))}

                {
                    page < pages &&

                    <LinkContainer key={page} to={`/${category}/page/${page+1}`}>
                        <Pagination.Next />
                    </LinkContainer>
                }

            </Pagination>

        </div>
    );
};

export default Paginate;