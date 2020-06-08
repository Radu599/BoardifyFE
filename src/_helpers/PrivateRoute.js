import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {store} from "./store";

const PrivateRoute = ({component: Component, ...rest}) => {
    const isLoggedIn = store.getState().authentication.loggedIn;

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                )
            }
        />
    )
}

export default PrivateRoute
