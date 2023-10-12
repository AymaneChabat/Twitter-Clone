import SlideMenu from '../../components/menu/menu-types/slide-menu-sm';
import { useEffect, useRef, useState } from 'react';
import { SearchIcon, SettingsIcon } from '../../components/icons/menu';
import ChoiceButtons from '../../components/buttons/choice';
import FollowProfile from "../../components/profiles/whotofollow"
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/actions/userActions';
import LoadingIcon from '../../components/icons/loading';

function Explore({setOpened, opened}) {

  const [search, setSearch] = useState("")
  const [focused, setFocused] = useState(false)
  const users = useSelector(state => state.users)
  const currUser = useSelector(user => user.currUser)
  const lastExplore = users.explore[users.explore.length - 1] !== undefined ? users.explore[users.explore.length - 1].id : undefined
  const [load, setLoad] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)
  const prevScroll = useRef(0)
  const dispatch = useDispatch()
  const [exploreUsers, setExplore] = useState([])
  const localChoices = ["All users"]

  useEffect(()=>{
    setExplore([])
    users.explore.forEach((user)=>{
      setExplore(prev => [...prev, users.activeprofiles.find(active => active.id === user.id)])
    })
  },[users.explore])

  useEffect(()=>{
    if (search !== "") {
      dispatch(getUsers(search, currUser.token, "search", 10, undefined))
    }
  }, [search])

  useEffect(()=>{
    if (load) {
      
      setLoad(false)
    }
  },[load])

  useEffect(()=>{
    const element = document.querySelector("#explore")
      if (users.explore.length === 0) {
        dispatch(getUsers(search, currUser.token, "explore", 12, lastExplore, setLoad))
      } else if (prevScroll.current < scrollPos && scrollPos + element.clientHeight === element.scrollHeight && load === false) {
        dispatch(getUsers(search, currUser.token, "explore", 12, lastExplore, setLoad))
      }
    prevScroll.current = scrollPos
  }, [scrollPos])

  return (
        <div className='s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto mb-[60px] s6:mb-0 dark:border-[#ffffff]/[.3]'>
          {opened ? <SlideMenu opened={opened} setOpened={setOpened}/> : ""}
          <div id='explore' className='overflow-auto h-full' onScroll={(e)=>{setScrollPos(e.currentTarget.scrollTop)}}>
            <div className='flex justify-around items-center w-[100%]'>
                <div className={'flex py-2 w-[85%] my-2 items-center rounded-full border-2 px-4 dark:bg-[#16181c] bg-['+(!focused ? "#EFF3F4] border-transparent" : "#ffffff] border border-[#1d9bf0]")}>
                    <SearchIcon picked={[false,"Explore"]} color={focused ? "#1d9bf0" : "#808080"} size={"20"}/>
                    <input onChange={(e)=>{setSearch(e.target.value)}} value={search} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} placeholder='Search' className='dark:text-[#ffffff] bg-transparent w-full ml-3 focus:outline-none font-chirp'/>
                </div>
                <div className='p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer'>
                    <SettingsIcon />
                </div>
            </div>
            <ChoiceButtons choices={localChoices}/>
            {
              search !== "" 
              ?
              users.users.map(user=>(
                <>
                <FollowProfile data={user}/>
                {load && <LoadingIcon />}
                </>
              ))
              : 
              exploreUsers.map(user=>(
                <FollowProfile data={user}/>
              ))
            }
          </div>
        </div>
  );
}

export default Explore;
