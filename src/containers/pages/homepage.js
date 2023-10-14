import { Route, useLocation, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconTwitter } from '../../components/icons/logos';
import FinalMenu from '../../containers/homepage/menu';
import LastContainer from '../homepage/last-container';
import Main from '../homepage/home';
import Explore from '../homepage/explore';
import Messages from '../homepage/messages';
import Profile from '../homepage/profile';
import Post from '../homepage/post';

function Template() {
  const currUser = useSelector(state => state.currUser)
  const users = useSelector(state => state.users)
  const [page, setPage] = useState("home");
  const location = useLocation();
  const [opened,setOpened] = useState(false)
  const [w,setW] = useState(window.innerWidth)
  window.addEventListener('resize', ()=>{setW(window.innerWidth)})

  useEffect(() => {
      setPage(location.pathname.slice(1,))
    }, [location]);

  const elements = [
      ["/home", <Main opened={opened} setOpened={setOpened} w={w}/>],
      ["/explore", <Explore opened={opened} setOpened={setOpened}/>],
      ["/messages/:chat?", <Messages w={w}/>],
      ["/:username", <Profile />],
      ["/:username/post/*", <Post />],
      ["/", <NotFound to="/home"/>]
  ]


  function NotFound() {
      return <Navigate to="/home" />;
    }
  

  return (
    users.activeprofiles.find((user) => user.id === currUser.user) !== undefined &&
      <div onScroll={(e)=>{document.querySelector('#childDiv').scrollTop = e.currentTarget.scrollTop}} id='MainDiv' className='flex h-screen overflow-hidden'>
          <FinalMenu w={w}/>
          <Routes>
              {elements && elements.map((element, index)=>(
                  <Route path={element[0]} element={element[1]} index={index}/>
              ))}
          </Routes>
          <LastContainer w={w} page={page}/>
      </div>
  )
}

export default Template;
