import './App.css';
import HomePage from './containers/pages/homepage';
import Login from './containers/pages/loginpage';
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from './functions/authentication';
import { checkUser } from './redux/actions/authActions';
import IconTwitter from './components/icons/logos/twitter-icon';
import { fetchChats, deleteChat } from './redux/actions/chatActions';

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [slide, setSlide] = useState(true)
  const chats = useSelector(state => state.chats)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if (user) {
          dispatch(checkUser(user, (await user.getIdTokenResult()).token));
          navigate("/")
      } else {
          dispatch(checkUser({}))
          navigate('/i/')
      }
    })
    
    setTimeout(()=>{
      setSlide(false)
      setTimeout(()=>{
        setLoading(false)
      },800)
    }, 500)
  },[])

  const loadingIcon = (
    <div className={'w-full h-screen flex justify-center items-center transition-all duration-[800ms] absolute bg-[#ffffff] z-30 ' + (!slide ? "translate-y-full" : "")}>
      <IconTwitter clas={"w-[50px]"}/>
    </div>
  )

  return (
      <div className="App">
        {loading ? loadingIcon : ""}
        <Routes>
          <Route path='/*' element={<HomePage />}/>
          <Route path="/i/*" element={<Login />}/>
        </Routes>
      </div>
  );
}

export default App;
