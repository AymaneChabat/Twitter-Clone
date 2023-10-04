import './App.css';
import HomePage from './containers/pages/homepage';
import Login from './containers/pages/loginpage';
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './functions/authentication';
import { checkUser } from './redux/actions/authActions';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
          if (user) {
              dispatch(checkUser((await user.getIdTokenResult()).token));
              if (location.pathname.split("/")[1] === "i") {
                  navigate("/home");
              }
          } else {
              const links = ["i/flow/login", "i/flow/signup", "i/flow/resetPassword"];
              if (!links.includes(location.pathname.slice(1))) {
                  navigate("/i/");
              }
          }
    });
  }, [])

  return (
      <div className="App">
        <Routes>
          <Route path="/i/*" element={<Login />}/>
          <Route path='/*' element={<HomePage />}/>
        </Routes>
      </div>
  );
}

export default App;
