import React from 'react'
import { Redirect } from 'react-router-dom'
 
export const PrivateRoute = ({isLogin,children}) => {
 
    return isLogin ? 
        children
        : <Redirect 
            to={'/auth'}
        />
}