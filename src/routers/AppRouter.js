import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from "react-router-dom";

import { useDispatch } from "react-redux";
import { firebase } from "../firebase/firebase-config";

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {

    firebase.auth().onAuthStateChanged( async (user) => {
      
      if(user?.uid){
        dispatch( login(user.uid, user.displayName) );
        setIsLoggedIn( true );

         dispatch( startLoadingNotes( user.uid ) );
      }
      else{
        setIsLoggedIn( false );
      }

      setChecking(false);

    });

  }, [dispatch, setChecking, setIsLoggedIn]);
  

  if(checking){
    return ( <h1>Wait...</h1> );
  }

  return (
    <Router>
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Switch>
                <Route 
                    path="/auth"
                    render={ () => (
                      <PublicRoute isLogin={isLoggedIn}>
                        <AuthRouter/>
                      </PublicRoute>
                    ) }/>

                <Route 
                    exact
                    path="/"
                    render={ () => (
                      <PrivateRoute isLogin={isLoggedIn}>
                        <JournalScreen/>
                      </PrivateRoute>
                    ) }/>

            <Redirect to="/auth/login" />
                
            </Switch>
        </div>
    </Router>
  );
};
