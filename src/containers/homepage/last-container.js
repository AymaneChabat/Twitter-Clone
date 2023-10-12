import { Link } from 'react-router-dom';
import { SearchIcon } from '../../components/icons/menu';
import FollowProfile from "../../components/profiles/whotofollow"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, resetUsers } from '../../redux/actions/userActions';
import { getUser } from '../../redux/actions/userActions';

function LastContainer({w,page}) {

  const [search, setSearch] = useState('')
  const [focused,setFocused] = useState(false)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const currUser = useSelector(state => state.currUser)
  const color = useSelector(state => state.color.color)
  const colors = {"#1d9bf0":"focus-within:border-[#1d9bf0]", "#ffd400":"focus-within:border-[#ffd400]", "#f91880":"focus-within:border-[#f91880]", "#7856ff":"focus-within:border-[#7856ff]", "#ff7a00":"focus-within:border-[#ff7a00]", "#00ba7c":"focus-within:border-[#00ba7c]"}

  useEffect(()=>{
    dispatch(getUser("owner", currUser.token))

    window.document.addEventListener("click", ()=>{
      if (focused === true) {
        setFocused(false)
      }
    })
  }, [])

  const profiles = [users.activeprofiles.find(user => user.id === 'Ri2E74kPo1dPCUt1nwC7GPy0BR52')]

  const footerLinks = [
    'About',
    'Help Center',
    'Terms of Service',
    'Privacy Policy',
    'Cookie Policy',
    'Accessibility',
    'Ads info',
    'Blog',
    'Status',
    'Careers',
    'Brand Resources',
    'Advertising',
    'Marketing',
    'X for Business',
    'Developers',
    'Directory',
    'Settings'
  ];

  useEffect(()=>{
    if (search !== "") {
      dispatch(getUsers(search, undefined, "search", 5, undefined))
    } else if (users.users.length > 0) {
      dispatch(resetUsers())
    }
  }, [search])

  const SearchResults = ({user}) => {
    return(
      <Link to={"/profile/"+user.info.username}>
          <div className='flex py-4 px-7 justify-between items-center hover:bg-[#000000]/[.1] transition-all duration-200 cursor-pointer dark:bg-[#16181c] dark:hover:bg-[#000000]/[.8]' onClick={()=>{setFocused(false); setSearch("")}}>
            <div className='w-[45px] h-[45px] rounded-full bg-no-repeat bg-center bg-cover' style={{backgroundImage: `url('${user.info.profilepicture}')`}}></div>
            <div className='w-[80%] flex flex-col justify-center'>
              <div className='max-w-[200px] overflow-hidden relative block text-ellipsis whitespace-nowrap'>
                <span className='font-bold text-[15px] dark:text-[#ffffff]'>{user.info.name}</span>
              </div>
              <div className='max-w-[200px] overflow-hidden relative block text-ellipsis whitespace-nowrap'>
                <span className='text-[#536471] text-[13px]'>@{user.info.username}</span>
              </div>
            </div>
          </div>
      </Link>
  )}

  const searchDiv = (
      <div className='hidden s10:inline overflow-auto relative' onClick={(e)=>{e.stopPropagation(); setFocused(true)}}>
        <div className={'group flex py-2 my-2 items-center rounded-full border-2 px-4 bg-[#EFF3F4] border-transparent focus-within:bg-[#ffffff] border '+colors[color]+' transition-all duration-200 dark:bg-[#16181c]'}>
            <SearchIcon picked={[false,"Explore"]} color={color} size={"20"}/>
            <input onChange={(e)=>{setSearch(e.target.value)}} value={search} placeholder='Search' className='bg-transparent w-full ml-3 focus:outline-none dark:text-[#ffffff]'/>
        </div>
        {focused && users.users.length > 0 ? 
          <div className='w-full h-auto border-2 absolute z-40 bg-[#ffffff] dark:border-[#16181c]/[.9]'>
            {users.users.map((user, index)=>(
                <SearchResults user={user} key={index}/>
            ))}
          </div> 
        : ""}
      </div>
    )

  const show = (
    <aside className='w-[0%] s6:w-[10%] s10:w-[33%] h-full'>
      <div className='ml-2 w-[23rem] overflow-auto h-screen'>
          {page === "home" || page === "profile" ? searchDiv : ""}
          {profiles[0] !== undefined ? 
            <div className='w-full h-auto my-2 bg-[#f7f9f9] pt-3 rounded-2xl dark:bg-[#16181c]'>
                <h1 className='font-bold px-4 text-[20px] mb-2 dark:text-[#ffffff]'>Who to follow</h1>
                {profiles.map((profile, index)=>(
                    <FollowProfile key={index} data={profile}/>
                ))}
                <div className="group hover:bg-[#000000]/[.1] rounded-b-2xl px-4 py-4 cursor-pointer transition-all duration-300">
                    <Link to={"/explore"}>
                        <span className={'group-hover:underline text-[' + (color) + ']'}>Show more</span>
                    </Link>
                </div>
            </div>
          : ""}
          <ul className='w-full flex flex-wrap justify-center pb-4'>
            {footerLinks.map((link, index)=>(
              <li key={index} className='text-[11px] mx-1 hover:underline cursor-pointer text-[#000000]/[.7] dark:text-[#ffffff]'>
                {link}
              </li>
            ))}
            <li className='text-[11px] mx-1 hover:underline cursor-pointer text-[#000000]/[.7]'>
              &copy; 2023 X Corp.
            </li>
          </ul>
      </div>
    </aside>
  )


  return (
    <>{w < 1000 || page[0] === "m" ?  "" : show}</>
  );
}

export default LastContainer;
