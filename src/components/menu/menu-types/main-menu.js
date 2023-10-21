import { IconTwitter } from '../../icons/logos';
import { VerifiedIcon } from '../../icons/profile'
import { CheckMark } from "../../icons/dropdowns"
import { PostIcon } from '../../icons/menu';
import Menu from "../items";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../../redux/actions/authActions';
import { setBtnColor, setTheme } from '../../../redux/actions/themeActions';
import TwitterButton from '../../buttons/twitterbutton';
import { ProfileIcon, MessageIcon, CommunityIcon, BookmarkIcon, ListIcon, SearchIcon, HouseIcon, BellIcon, Dots, DisplayIcon } from "../../icons/menu"
import { motion, AnimatePresence } from 'framer-motion';

function MainMenu({setPostOpen, tab}) {
  
  const [active,setActive] = useState(tab)
  const dispatch = useDispatch()
  const currUserId = useSelector(state => state.currUser)
  const users = useSelector(state => state.users)
  const currUser = users.activeprofiles.find(user => user.id = currUserId.user)
  const [logout, setLogout] = useState(false) 
  const chats = useSelector(state=> state.chats)
  const [showMenu, setShowMenu] = useState(false)
  const color = useSelector(state => state.color.color)
  const colorsCode = ["#1d9bf0", "#ffd400", "#f91880", "#7856ff", "#ff7a00", "#00ba7c"]
  const bg = ["light", "dim", "dark"]
  const modes = {
    "light": ["Default", "#ffffff"],
    "dark": ["Lights out", "#000000"],
    "dim": ["Dim", "#15202b"]
  }
  const bgMode = useSelector(state => state.color.theme)



  const updateColor = (e) => {
    localStorage.btnColor = e
    dispatch(setBtnColor(e))
  }

  const updateTheme = () => {
    const body = document.body

    // First, remove all theme classes
    body.classList.remove('dark', 'dim', 'light', 'bg-[#000000]', 'bg-[#15202b]');

    // Decide on the theme to set
    if (localStorage.theme === 'dark') {
      body.classList.add('dark');
      body.classList.add('bg-[#000000]');
    } else if (localStorage.theme === 'dim') {
      body.classList.add('dark');
      body.classList.add('bg-[#15202b]');
    } else {
      // Default to light if neither 'dark' nor 'dim'
      body.classList.add('light');
    }
  };
  
  const updateDisplay = React.useMemo(() => {
    const variants = {
      hidden: {
        scale: 0, 
        opacity: 0
      },
      visible: {
        scale: 1, 
        opacity: 1,
        transition: {
          duration: 0.25
        }
      }
    }
    
    const colors = {"#1d9bf0":"bg-[#1d9bf0]", "#ffd400":"bg-[#ffd400]", "#f91880":"bg-[#f91880]", "#7856ff":"bg-[#7856ff]", "#ff7a00":"bg-[#ff7a00]", "#00ba7c":"bg-[#00ba7c]"}
    return (
      <div className='w-full h-full absolute top-0 left-0 bg-[#000000]/[.2] z-40 flex justify-center items-center dark:bg-[#ffffff]/[.2]' onMouseDown={()=>{setShowMenu(false)}}>
        <motion.div key={"0"} variants={variants} initial='hidden' animate='visible' exit="hidden" className={'s6:w-[560px] s6:h-[500px] max-h-[90%] flex items-center w-full h-full s6:rounded-2xl bg-['+ (modes[bgMode][1]) + ']'} onMouseDown={(e)=>{e.stopPropagation()}}>
          <div className='s6:w-full s6:h-full h-[60%] p-3 flex flex-col justify-between items-center'>
            <div className='text-center'>
              <h1 className='font-bold text-[20px] dark:text-[#ffffff]'>Customize your view</h1>
              <span className='text-[#536471] text-[14px] tracking-wider'>These settings affect all X accounts on this browser.</span>
            </div>
            <article className="h-auto w-[80%] px-3 py-3 flex transition-all duration-300 border dark:border-[#536471] rounded-xl">
              <div className='w-[12%]'>
                <div className="w-[42px] h-[42px] rounded-full bg-[#000000] flex justify-center items-center">
                  <IconTwitter clas={'w-[27px] fill-[#ffffff]'}/>
                </div>
              </div>
              <div className="w-[88%]">
                  <div className="flex w-full items-start justify-between">
                      <div className="group flex flex justify-center items-center">
                          <h1 className="flex mr-1" >
                              <span id="name" className="font-bold text-[15px] hover:underline mr-1.5 dark:text-[#ffffff]">X</span> 
                              <VerifiedIcon />
                          </h1>
                          <span className="text-[15px] text-[#71767b]">@X · 16m</span>
                      </div>
                  </div>
                  <p className="dark:text-[#ffffff] text-[#0f1419]/[.8] text-[15px] leading-[20px] break-words">
                      At the heart of X are short messages called posts -- just like this one -- which can include photos, videos, links, text, hashtags, and mentions like @X.
                  </p>
              </div>
            </article>
            <div className='w-[90%] '>
              <h1 className='text-[#536471] text-[15px] mb-1 dark:text-white'>Color</h1>
              <ul className='flex justify-between items-center bg-[#1e2732] px-4 py-2 rounded-xl relative'>
                {colorsCode && colorsCode.map((C, index) => (
                  <li index={index} className={"w-[40px] h-[40px] flex jusity-center items-center p-0.5 hover:border-[2px] rounded-full transition-all duration-100"} onClick={()=>{updateColor(C)}}>
                    <div className={'w-[100%] h-[100%] rounded-full flex justify-center items-center '+(colors[C])}>
                    {color === C && <div className='absolute z-40'>
                      <CheckMark color={"#ffffff] h-[25px] w-[25px"}/>
                    </div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-[90%]'>
              <h1 className='text-[#536471] text-[15px] mb-1 dark:text-white'>Background</h1>
              <ul className='flex justify-between items-center bg-transparent rounded-xl relative w-full'>
                {bg && bg.map((bg, index) => (
                  <li index={index} className={"group w-[30%] h-full flex justify-center items-center p-0.5 transition-all duration-100 py-6 border cursor-default bg-[" + (modes[bg][1]) + "]" + (bgMode === bg ? " border-[#00ba7c]  transition-all duration-300" : "")} onClick={()=>{dispatch(setTheme(bg)); localStorage.theme = bg}}>
                    <div className='flex w-full justify-evenly items-center'>
                      <div className={'w-[20px] h-[20px] flex justify-center items-center rounded-full border ' + (bgMode === bg ? " bg-[#00ba7c] group-hover:border-[#00ba7c] transition-all duration-300" : "")}>
                        {bgMode === bg && <CheckMark color={"#ffffff] w-[20px] h-[20px"}/>}
                      </div>
                      <h1 className={"w-[50%] text-left text-sm " + (bg !== "light" ? "text-[#ffffff]" : "")}>{modes[bg][0]}</h1>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-full'>
                <div className='mx-auto w-[80px] h-[35px]' onClick={()=>{setShowMenu(false)}}>
                  <TwitterButton content={"Done"}/>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  })

  useEffect(()=>{
      updateTheme()
  }, [bg])

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
    [<DisplayIcon />,"Display"]
    
  ]

  const verify = (e,n,element) => {
    if (n === 1) {
      if (e === "Home" || e === "Messages" || e === "Profile" || e === "Explore") {
        setActive(e)
      } else if (e === "Display") {
        element.preventDefault()
        setShowMenu(true)
      } else {
        return element.preventDefault()
      }
    } else if (n === 2) {
      if (e !== "Home" && e !== "Messages" & e !== "Profile" && e !== "Explore" && e !== "Display") {
        return 'cursor-not-allowed opacity-90'
      }
    }
  }

  const showLogout = () => {
    if (logout) {
      setLogout(false)
    }
  }
  
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
    <div className='s13:w-[34.5%] pt-1 max-s13:max-w-[15%] s8:pr-2 px-1' onClick={showLogout}>
      <AnimatePresence>
        {showMenu && updateDisplay}
      </AnimatePresence>
      <div className='flex flex-col items-end h-[99%] justify-between'>
        <div className='mx-auto s8:mx-0 s13:w-[16rem]'>
          <div className='flex flex-col s13:items-start items-end'>
            <a href='#' className='p-2.5 inline-flex hover:bg-[#0f1419]/[.1] rounded-full transition-all duration-200 cursor-pointer'>
                <IconTwitter clas={"w-[28px]"}/>
            </a>
            <nav className='h-[100%] w-full flex flex-col justify-around mt-2 s13:items-start items-center'>
              <div className='mb-4'>
                {menu.map((pick, index) => (
                    <Link key={index} to={ "/" + (pick[1].toLowerCase() !== "profile" ? pick[1].toLowerCase() : "") + (linkConditions(pick[1].toLowerCase()))} onClick={(e)=>{verify(pick[1],1,e)}} className={verify(pick[1],2)}>
                      <Menu data={pick} picked={active}/>
                    </Link>
                ))}
              </div>
              <div className='inline-flex s13:block w-[100%] h-[40px]' onClick={()=>{setPostOpen(true)}}>
                {/*<button type="button" class="text-white s13:w-[16rem] px-0.5 s13:px-0 s13:py-3 bg-[#1ca4ff] hover:bg-[#0292f2] font-medium rounded-full transition duration-300 text-md"><span className='hidden s13:block'>Post</span><PostIcon /></button>*/}
                <div className='hidden s13:block h-full'>
                <TwitterButton color={color} content={"Post"}/>
                </div>
                <div className='s13:hidden mx-auto'>
                  <TwitterButton color={color} content={<PostIcon />}/>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className='s13:w-[16rem] flex s13:items-start items-end mx-auto s13:mx-0 relative' onClick={(e)=>{
          e.stopPropagation(); 
          if (logout) {
            setLogout(false)
          } else {
            setLogout(true)
          };}}>
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
          {logout === true ?
          (
          <div class="z-10 bg-white rounded-lg h-auto w-[17rem] border-2 border-solid mb-3 absolute bottom-[50px]" onClick={(e)=>e.stopPropagation()}>
            <ul class="text-sm text-gray-700 h-[100%] flex flex-col justify-evenly">
              <li className='py-4 hover:bg-gray-100' onClick={()=>{dispatch(signOut())}}>
                <a href="#" class="block px-4 text-[16px]">Log out {currUser.info.username}</a>
              </li>
            </ul>
          </div>
          ) : ""}
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
