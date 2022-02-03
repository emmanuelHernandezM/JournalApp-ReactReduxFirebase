import React from 'react'
import { Redirect } from 'react-router-dom';
 
export const PublicRoute = ({isLogin, children}) => {
 
    return isLogin ?
            <Redirect to={'/'} />
            :
            children
}