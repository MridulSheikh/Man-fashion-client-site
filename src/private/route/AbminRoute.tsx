import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'

function AdminRoute ({children} :{children : JSX.Element}) {
  const {loacluser}  = useAuth();
  const location = useLocation();
  if(!loacluser.admin){
    return <Navigate to="/" state={{from: location}} replace ></Navigate>
  }
  return children;
}

export default AdminRoute;