import React, { useEffect,useMemo } from 'react'
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const { isSignedIn, user, isLoaded } = useUser();
    console.log(isLoaded,isSignedIn)
    const navigate = useNavigate();
    useEffect(()=>{
        if(isLoaded && !isSignedIn)
        {
          navigate('/login');
        }
      },[isLoaded,isSignedIn])
  return (
   children
  )
}

export default ProtectedRoute
