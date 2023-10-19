import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import initialState from './initialState';

export const PrivateUmapRoute = ({component: Component, ...rest}) => (

    <Route
       {...rest}
        render={props => 
            initialState.recreateUmaps ? (<Component {...props} />) :
            (<Redirect to ={{pathname:"/"}}/>)}/>
);
    