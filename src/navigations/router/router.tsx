import React from 'react';
import AuthNavigation from '../auth-stack';
import AppNavigation from '../app-stack';
import { useSelector } from 'react-redux';

const Router = (props: any) => {
  const { userPresent } = useSelector((state: { authReducer: any }) => ({
    userPresent: state.authReducer.userPresent,
  }));

  return (
    userPresent ?
      <AppNavigation />
      :
      <AuthNavigation />
  )
}

export default Router
