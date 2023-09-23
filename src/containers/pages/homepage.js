import { Fragment, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../homepage/home';
import Explore from '../homepage/explore';
import Messages from '../homepage/messages';
import Profile from '../homepage/profile';
import Template from '../homepage/template';

function HomePage() {
  const [opened,setOpened] = useState(false)
  const [w,setW] = useState(window.innerWidth)
  window.addEventListener('resize', ()=>{setW(window.innerWidth)})
   


  function NotFound() {
    return <Navigate to="/home" />;
  }

  const elements = [
    ["/home", <Main opened={opened} setOpened={setOpened} w={w}/>],
    ["/explore", <Explore opened={opened} setOpened={setOpened}/>],
    ["/messages/:chat?", <Messages w={w}/>],
    ["/profile/:username", <Profile />]
  ]

  return (
      <Fragment>
        <Routes>
          {elements.map((element, index)=>(
            <Route key={index} path={element[0]} exact element={<Template w={w} element={element[1]}/>} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Fragment>
  );
}

export default HomePage;
