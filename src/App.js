import './App.css';
import HomePage from './containers/pages/homepage';
import Login from './containers/pages/loginpage';
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './functions/authentication';
import { checkUser } from './redux/actions';
import IconTwitter from './components/icons/logos/twitter-icon';

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const currUser = useSelector(state => state.isLogged)
  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user) {
          dispatch(checkUser(user));
          navigate("/")
      } else {
          dispatch(checkUser({}))
          navigate('/i/')
      }
    })
    setTimeout(()=>{
      setLoading(false)
    }, 1000)
  },[currUser])

  const loadingIcon = (
    <div className='w-full h-screen flex justify-center items-center'>
      <IconTwitter clas={"w-[50px]"}/>
    </div>
  )

  const routes = (
    <Routes>
      <Route path='/*' element={<HomePage />}/>
      <Route path="/i/*" element={<Login />}/>
    </Routes>
    )

  return (
      <div className="App">
        {loading ? loadingIcon : routes}
      </div>
  );
}

export default App;
