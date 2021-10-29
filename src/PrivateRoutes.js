import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { recreateUmaps } from './initialState';

export const PrivateUmapRoute = ({component: Component, ...rest}) => (

    <Route
       {...rest}
        render={props => 
            recreateUmaps ? (<Component {...props} />) :
            (<Redirect to ={{pathname:"/"}}/>)}/>
);
    