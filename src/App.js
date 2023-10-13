import './App.css';
import HomePage from './containers/pages/homepage';
import Login from './containers/pages/loginpage';
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './functions/authentication';
import { checkUser } from './redux/actions/authActions';
import { clearError } from './redux/actions/errorActions';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation();

  const currError = useSelector(state => state.error)

  useEffect(()=>{

    const body = document.body
    if (localStorage.theme === 'dark') {
      body.classList.add('dark');
      body.classList.add('bg-[#000000]');
    } else if (localStorage.theme === 'dim') {
      body.classList.add('dark');
      body.classList.add('bg-[#15202b]');
    } else {
      // Default to light if neither 'dark' nor 'dim'
      body.classList.add('light');
    }

    onAuthStateChanged(auth, async (user) => {
          if (user) {
              dispatch(checkUser((await user.getIdTokenResult()).token));
              if (location.pathname.split("/")[1] === "i") {
                  navigate("/home")
              }
          } else {
              const links = ["i/flow/login", "i/flow/signup", "i/flow/resetPassword"];
              if (!links.includes(location.pathname.slice(1))) {
                  navigate("/i/");
              }
          }
    });
  }, [])
  
  const ErrorPreview = () => {
    return (
        <div className="error-preview animate-fade-in p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute top-5 right-5 transition-all duration-300" role="alert">
          <span class="font-medium">Error!</span> {currError}.
        </div>
    )
  }

  useEffect(()=>{
    if (currError !== "") {
      setTimeout(()=>{
        dispatch(clearError())
      }, 3000)
    }
  }, [currError])

  return (
      <div className="App">
        {currError !== "" && <ErrorPreview />}
        <Routes>
          <Route path="/i/*" element={<Login />}/>
          <Route path='/*' element={<HomePage />}/>
        </Routes>
      </div>
  );
}

export default App;
