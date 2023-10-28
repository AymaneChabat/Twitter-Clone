import { IconTwitter } from '../../icons/logos';
import { PostIcon } from '../../icons/menu';
import Menu from "../items";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/actions/authActions';
import TwitterButton from '../../buttons/twitterbutton';
import { ProfileIcon, MessageIcon, CommunityIcon, BookmarkIcon, ListIcon, SearchIcon, HouseIcon, BellIcon, Dots, DisplayIcon } from "../../icons/menu"

const menu = [
  [<HouseIcon />,"Home"],
  [<SearchIcon color={"#000000"} size={"26"}/>,"Explore"],
  [<BellIcon />,"Notifications", null],
  [<MessageIcon />,"Messages"],
  [<ListIcon />,"Lists", null],
  [<BookmarkIcon />,"Bookmarks", null],
  [<CommunityIcon />,"Communities", null],
  [<IconTwitter clas={"w-[26px]"}/>,"Verified", null],
  [<ProfileIcon />,"Profile"],
  [<DisplayIcon />,"Display"]
]

function MainMenu() {
  const location = useLocation()
  const dispatch = useDispatch()
  const currUserId = useSelector(state => state.currUser)
  const users = useSelector(state => state.users)
  const currUser = users.activeprofiles.find(user => user.id = currUserId.user)
  const [logout, setLogout] = useState(false) 
  const chats = useSelector(state=> state.chats)
  const color = useSelector(state => state.color.color);

  const linkConditions = (pick) => {
    switch(pick) {
      case "profile":
        return currUser.info.username !== undefined ? currUser.info.username : ""
      case "messages":
        return "/" + (chats.activeChat !== undefined && chats.activeChat !== null ? chats.activeChat : "")
      default:
        return ""
    }
  }

  useEffect(()=>{
    window.document.addEventListener("click", ()=>{
      if (logout) {
        setLogout(false)
      }
    })
  }, [])

  return (
    <div className='s13:w-[34.5%] pt-1 max-s13:max-w-[15%] s8:pr-2 px-1'>
      <div className='flex flex-col items-end h-[99%] justify-between'>
        <div className='mx-auto s8:mx-0 s13:w-[16rem]'>
          <div className='flex flex-col s13:items-start items-end'>
            <Link to='home' className='p-2.5 inline-flex hover:bg-[#0f1419]/[.1] rounded-full transition-all duration-200 cursor-pointer'>
                <IconTwitter clas={"w-[28px]"}/>
            </Link>
            <nav className='h-[100%] w-full flex flex-col justify-around mt-2 s13:items-start items-center'>
              <div className='mb-4'>
                {menu.map((pick, index) => (
                    <Link key={index} to={ "/" + (pick[1].toLowerCase() !== "profile" ? pick[1].toLowerCase() : "") + (linkConditions(pick[1].toLowerCase()))} state={{ previousLocation: pick[1] === "Display" ? location : undefined }} className={pick[2] === null ? "pointer-events-none" : ""}>
                      <Menu data={pick}/>
                    </Link>
                ))}
              </div>
              <Link to={"/compose/post"} className='inline-flex s13:block w-[100%] h-[40px]' state={{ previousLocation: location}}>
                <div className='hidden s13:block h-full'>
                  <TwitterButton color={color} content={"Post"}/>
                </div>
                <div className='s13:hidden mx-auto'>
                  <TwitterButton color={color} content={<PostIcon />}/>
                </div>
              </Link>
            </nav>
          </div>
        </div>
        <div className='s13:w-[16rem] flex s13:items-start items-end mx-auto s13:mx-0 relative group'>
          <div className='s13:w-[100%]'>
            <button className='flex items-center justify-around rounded-full hover:bg-[#0f1419]/[.1] p-1.5 transition-all duration-300 s13:w-[100%] border' >
              <div>
                <div className='w-[35px] h-[35px] rounded-full bg-no-repeat bg-cover' style={{backgroundImage: `url("${currUser.info.profilepicture}")`}}></div>
              </div>
              <div className='flex-col items-start hidden s13:flex w-[65%]'>
                <span className='font-bold ml-0.5 -mb-1.5 dark:text-[#ffffff]'>{currUser.info.name}</span>
                <span className='text-[#536471]'>@{currUser.info.username}</span>
              </div>
              <div className='hidden s13:block'>
                <Dots w={18}/>
              </div>
            </button>
          </div>
          <div class="z-10 bg-white rounded-lg h-auto w-[17rem] border-2 border-solid absolute bottom-[50px] hidden group-hover:block">
            <ul class="text-sm text-gray-700 h-full flex flex-col justify-evenly">
              <li className='py-4 hover:bg-gray-100' onClick={()=>{dispatch(signOut())}}>
                <a href="#" class="block px-4 text-[16px]">Log out {currUser.info.username}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
