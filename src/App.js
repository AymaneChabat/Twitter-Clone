import './App.css';
import HomePage from './containers/pages/homepage';
import Login from './containers/pages/loginpage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { checkLogged } from './functions/authentication';

function App() {
  const navigate = useNavigate();

  useEffect(()=>{
    if (!checkLogged()) {
      navigate("/i/")
    } else {
      navigate("/home")
    }
  }, [])
  
  return (
      <div className="App">
        <Routes>
          <Route path='/*' element={<HomePage />}/>
          <Route path="/i/*" element={<Login />}/>
        </Routes>
      </div>
  );
}

export default App;
