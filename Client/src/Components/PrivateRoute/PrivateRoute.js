import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({children,...rest}) => {

    const userLogin= useSelector(state=> state.userLogin)
    const {userInfo}= userLogin

    return (
        <div>
            <Route
      {...rest}
      render={({ location }) =>
        userInfo? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
        </div>
    );
};

export default PrivateRoute;