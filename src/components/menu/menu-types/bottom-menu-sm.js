import BellIcon from '../../../components/icons/menu/bell';
import HouseIcon from '../../../components/icons/menu/home';
import SearchIcon from '../../../components/icons/menu/search';
import MessageIcon from '../../../components/icons/menu/message';
import Menu from "../../../components/menu/items";
import { useState } from 'react';


function BottomMenuSM() {

  const [active,setActive] = useState("Home")

  const menu = [
    [<HouseIcon picked={[active,"Home"]}/>,"Home"],
    [<SearchIcon picked={[active,"Explore"]} color={"#000000"} size={26}/>,"Explore"],
    [<BellIcon picked={[active,"Notifications"]}/>,"Notifications"],
    [<MessageIcon picked={[active,"Messages"]}/>,"Messages"]
  ]

  return (
    <>
        <div className='fixed w-full bottom-0 h-[60px] border-t z-40 bg-[#ffffff]'>
            <div className='flex justify-evenly items-center h-full'>
                {menu.map((pick, index) => (
                    <a href='#' onClick={()=>{setActive(pick[1])}}>
                        <Menu key={index} data={pick} picked={active}/>
                    </a>
                ))}
            </div>
        </div>
    </>
  );
}

export default BottomMenuSM;
