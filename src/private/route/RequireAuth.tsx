import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'

function RequireAuth({children} :{children : JSX.Element}) {
  const {loacluser}  = useAuth();
  const location = useLocation();
  if(!loacluser.email){
    return <Navigate to="/login" state={{from: location}} replace ></Navigate>
  }
  return children;
}

export default RequireAuth