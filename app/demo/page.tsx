'use client';
import React from 'react';
import { useSelector, useDispatch } from '@/lib/store';
import { loginSuccess, logoutSuccess } from '@/lib/slices/mainSlice';

const LoginComponent = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginSuccess(true));
  };

  const handleLogout = () => {
    dispatch(logoutSuccess(false));
  };

  return (
    <div>
      <h1>{isLoggedIn ? 'Logged In' : 'Logged Out'}</h1>
      <button
        onClick={handleLogin}
        style={{ color: 'red', background: 'green' }}
      >
        Login
      </button>
      <button onClick={handleLogout}>Logout</button>
      <p>{isLoggedIn}</p>
    </div>
  );
};

export default LoginComponent;
