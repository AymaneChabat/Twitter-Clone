import FinalMenu from '../../containers/homepage/menu';
import LastContainer from '../homepage/last-container';
import Main from '../homepage/home/home';
import Explore from '../homepage/explore/explore';
import Messages from '../homepage/messages/messages';
import { useState } from 'react';
import Profile from '../homepage/profile/profile';


function HomePage() {

  const [opened,setOpened] = useState(false)

  const [w,setW] = useState(window.innerWidth)
  window.addEventListener('resize', ()=>{setW(window.innerWidth)})

  return (
      <div className='flex h-screen overflow-hidden'>
        <FinalMenu w={w}/>
        <Profile />
        <LastContainer w={w} page={"profile"}/>
      </div>
  );
}

export default HomePage;
