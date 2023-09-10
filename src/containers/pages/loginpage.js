import Footer from '../login/footer';
import Main from '../login/main';
import AuthUI from '../login/authenticationUI';
import { useLocation } from 'react-router';
import React, { useState, useEffect } from 'react';

function Login() {
  const [page, setPage] = useState("")
    const location = useLocation();

    useEffect(() => {
        setPage(location.pathname.slice(1,));
    }, [location]);

  const urls = ["i/flow/login", "i/flow/signup", "i/flow/resetPassword"]
  
  return (
      <div className='flex flex-col h-screen'>
        {urls.includes(page) ? <AuthUI /> : ""}
        <Main />
        <Footer />
      </div>
  );
}

export default Login;
