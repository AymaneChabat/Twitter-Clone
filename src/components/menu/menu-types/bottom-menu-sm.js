import BellIcon from '../../../components/icons/menu/bell';
import HouseIcon from '../../../components/icons/menu/home';
import SearchIcon from '../../../components/icons/menu/search';
import MessageIcon from '../../../components/icons/menu/message';
import Menu from "../../../components/menu/items";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';


function BottomMenuSM() {
  const location = useLocation();

  const [active,setActive] = useState("")

  useEffect(()=>{
    setActive("home")
  }, [location.pathname])

  const menu = [
    [<HouseIcon picked={[active,"Home"]}/>,"Home"],
    [<SearchIcon picked={[active,"Explore"]} color={"#000000"} size={26}/>,"Explore"],
    [<BellIcon picked={[active,"Notifications"]}/>,"Notifications"],
    [<MessageIcon picked={[active,"Messages"]}/>,"Messages"]
  ]

  return (
        <div className='fixed w-full bottom-0 border-t z-10 bg-[#ffffff] h-[7%]'>
            <div className='flex justify-evenly items-center h-full'>
                {menu.map((pick, index) => (
                    pick[1].toLowerCase() !== "notifications" ? (<Link to={"/"+pick[1].toLowerCase()} onClick={()=>{setActive(pick[1].toLowerCase())}}><Menu key={index} data={pick} picked={active}/></Link>) : (<a href='#' className='pointer-events-none'><Menu key={index} data={pick} picked={active}/></a>)
                ))}
            </div>
        </div>
  );
}

export default BottomMenuSM;
