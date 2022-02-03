import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { setError, removeError } from "../../actions/ui.js";

import validator from "validator";

import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../actions/auth.js';

export const RegisterScreen = () => {

  // Dispatch
  const dispatch = useDispatch();

  const {msgError} = useSelector( state => state.ui );
  // console.log(msgError);

  // Form hook{
    const [formValues, handleInputChange] = useForm({
      name: '',
      email: '',
      password: '',
      password2: ''
    });

    // Destructuring Form Values
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
      e.preventDefault();
      
      if( isFormValid() ){
        // console.log('Formulario Correcto');
        dispatch( startRegisterWithEmailPasswordName(email, password, name) )
      }

    }

    const isFormValid = () => {

      if( name.trim().length  === 0 ){
        dispatch( setError('Name is required') );
        return false;
      }
      else if( !validator.isEmail(email) ){
        dispatch( setError('Email is not valid') );
        return false;
      }
      else if( password !== password2 || password.length < 5 ){
        dispatch( setError('Password shuold be at least 6 characters and match each other') );
        return false;
      }

      dispatch( removeError() );
      return true;
    }

  return (
    <>
        <h3 className='auth__title'>Register</h3>

        <form 
          onSubmit={ handleRegister }
          className='animate__animated animate__fadeIn animate__faster'>

          {
            msgError &&
            (
              <div className='auth__alert-error'>
                {msgError}
              </div>
            )
          }

          <input 
            type='text'
            placeholder='Name'
            name='name'
            className='auth__input'
            value={ name }
            onChange={ handleInputChange }
            autoComplete='off'/>

          <input 
            type='text'
            placeholder='Email'
            name='email'
            className='auth__input'
            value={ email }
            onChange={ handleInputChange }
            autoComplete='off'/>

          <input 
            type='password'
            placeholder='Password'
            name='password'
            className='auth__input'
            value={ password }
            onChange={ handleInputChange }/>

          <input 
            type='password'
            placeholder='Confirm Password'
            name='password2'
            className='auth__input'
            value={ password2 }
            onChange={ handleInputChange }/>

          <button
            type='submit'
            className='btn btn-primary btn-block mb-5'>
              Register
          </button>

          <Link
            to="/auth/login"
            className='link'>
            Already registered?
          </Link>
        </form>
      </>
  );
};
