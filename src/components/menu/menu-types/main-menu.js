import IconTwitter from '../../icons/logos/twitter-icon';
import BellIcon from '../../icons/menu/bell';
import HouseIcon from '../../icons/menu/home';
import SearchIcon from '../../icons/menu/search';
import ListIcon from '../../icons/menu/list';
import BookmarkIcon from '../../icons/menu/bookmark';
import CommunityIcon from '../../icons/menu/communities';
import MessageIcon from '../../icons/menu/message';
import ProfileIcon from '../../icons/menu/profile';
import MoreIcon from '../../icons/menu/more';
import PostIcon from '../../icons/menu/post';
import Menu from "../items";
import Dots from '../../icons/menu/dots';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/actions/authActions';

function MainMenu({setPostOpen, tab}) {
  

  const [active,setActive] = useState(tab)
  const dispatch = useDispatch()
  const currUser = useSelector(state => state.currUser)
  const users = useSelector(state => state.users)


  const menu = [
    [<HouseIcon picked={[active,"Home"]}/>,"Home"],
    [<SearchIcon picked={[active,"Explore"]} color={"#000000"} size={"26"}/>,"Explore"],
    [<BellIcon picked={[active,"Notifications"]}/>,"Notifications"],
    [<MessageIcon picked={[active,"Messages"]}/>,"Messages"],
    [<ListIcon picked={[active,"Lists"]}/>,"Lists"],
    [<BookmarkIcon picked={[active,"Bookmarks"]}/>,"Bookmarks"],
    [<CommunityIcon picked={[active,"Communities"]}/>,"Communities"],
    [<IconTwitter clas={"w-[26px]"}/>,"Verified"],
    [<ProfileIcon picked={[active,"Profile"]}/>,"Profile"],
    [<MoreIcon picked={[active,"More"]}/>,"More"]
  ]

  const verify = (e,n) => {
    if (n === 1) {
      if (e === "Home" || e === "Explore" || e === "Messages" || e === "Profile") {
        setActive(e)
      }
    } else if (n === 2) {
      if (e !== "Home" && e !== "Explore" && e !== "Messages" & e !== "Profile") {
        return 'pointer-events-none'
      }
    }
  }

  return (
    <>
      <div className='s13:w-[34.5%] pt-1 max-s13:max-w-[15%] s8:pr-2 px-1'>
          <div className='flex flex-col items-end h-[99%] justify-between'>
            <div className='mx-auto s8:mx-0 s13:w-[16rem]'>
              <div className='flex flex-col s13:items-start items-end'>
                <a href='#' className='p-2.5 inline-flex hover:bg-[#0f1419]/[.1] rounded-full transition-all duration-200 cursor-pointer'>
                    <IconTwitter clas={"w-[28px]"}/>
                </a>
                <div className='h-[100%] flex flex-col justify-around mt-2 s13:items-start items-center'>
                  <div className='mb-4'>
                    {menu.map((pick, index) => (
                        <Link key={index} to={ "/" + pick[1].toLowerCase() + (pick[1].toLowerCase() === 'profile' ? ("/" + users.activeprofiles[0].username) : "")} onClick={()=>{verify(pick[1],1)}} className={verify(pick[1],2)}>
                          <Menu data={pick} picked={active}/>
                        </Link>
                    ))}
                  </div>
                  <div className='inline-flex s13:block w-[100%]' onClick={()=>{setPostOpen(true)}}>
                    <button type="button" class="text-white s13:w-[16rem] px-0.5 s13:px-0 s13:py-3 bg-[#1ca4ff] hover:bg-[#0292f2] font-medium rounded-full transition duration-300 text-md"><span className='hidden s13:block'>Post</span><PostIcon /></button>
                  </div>
                </div>
              </div>
            </div>
            <div className='s8:w-[16rem] flex flex-col s13:items-start items-end mx-auto s8:mx-0'>
              <div className='s13:w-[100%]'>
                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className='flex items-center justify-around rounded-full hover:bg-[#0f1419]/[.1] p-1.5 transition-all duration-300 s13:w-[100%]'>
                  <div>
                    <div className='w-[35px] h-[35px] rounded-full bg-no-repeat bg-cover' style={{backgroundImage: `url("${users.activeprofiles[0].profilepicture}")`}}></div>
                  </div>
                  <div className='flex-col items-start hidden s13:flex w-[65%]'>
                    <span className='font-bold ml-0.5 -mb-1.5'>{users.activeprofiles[0].name}</span>
                    <span className='text-[#536471]'>@{users.activeprofiles[0].username}</span>
                  </div>
                  <div className='hidden s13:block'>
                    <Dots w={18}/>
                  </div>
                </button>
              </div>
              <div id="dropdownNavbar" class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow h-auto w-[19rem] border-2 border-solid">
                <ul class="text-sm text-gray-700 h-[100%] flex flex-col justify-evenly" aria-labelledby="dropdownLargeButton">
                  <li className='py-4 hover:bg-gray-100' onClick={()=>{dispatch(signOut())}}>
                    <a href="#" class="block px-4 font-bold text-[16px]">Log out @{users.activeprofiles[0].username}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default MainMenu;
