import { Link } from 'react-router-dom';
import SearchIcon from '../../components/icons/menu/search';
import FollowProfileList from '../../components/profiles/profilesList';
import TrendingList from '../../components/trends/trendsList';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/actions/userActions';

function LastContainer({w,page}) {

  const [search, setSearch] = useState('')
  const [focused,setFocused] = useState(false)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const profiles = [
    ["Ash Crypto", "@Ashcryptoreal"],
    ["steph", "@spnjxnsen"],
    ["SaitAlbania", "@thealpha_wolf1"]
  ]

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
    dispatch(getUsers(undefined, search, undefined, "home"))
  }, [search])

  const SearchResults = ({user}) => {
    return(
      <Link to={"/profile/"+user.info.username}>
          <div className='flex py-4 px-7 justify-between items-center hover:bg-[#000000]/[.1] transition-all duration-200 cursor-pointer'>
            <div className='w-[45px] h-[45px] rounded-full' style={{backgroundImage: `url("${user.info.profilepicture}")`}}></div>
            <div className='w-[80%] flex flex-col justify-center'>
              <div className='max-w-[200px] overflow-hidden relative block text-ellipsis whitespace-nowrap'>
                <span className='font-bold text-[15px] font-chirp'>{user.info.name}</span>
              </div>
              <div className='max-w-[200px] overflow-hidden relative block text-ellipsis whitespace-nowrap'>
                <span className='text-[#536471] font-chirp text-[13px]'>@{user.info.username}</span>
              </div>
            </div>
          </div>
      </Link>
  )}

  const searchDiv = (
      <div className='hidden s10:inline overflow-auto relative'>
        <div className={'flex py-2 my-2 items-center rounded-full border-2 px-4 bg-['+(!focused ? "#EFF3F4] border-transparent" : "#ffffff] border border-[#1d9bf0]")}>
            <SearchIcon picked={[false,"Explore"]} color={focused ? "#1d9bf0" : "#808080"} size={"20"}/>
            <input onChange={(e)=>{setSearch(e.target.value)}} value={search} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} placeholder='Search' className='bg-transparent w-full ml-3 focus:outline-none'/>
        </div>
        {users.users.length > 0 ? 
          <div className='w-full h-auto border-2 absolute z-40 bg-[#ffffff]'>
            {users.users.map((user, index)=>(
                <SearchResults user={user} key={index}/>
            ))}
          </div> 
        : ""}
      </div>
    )

  const show = (
    <div className='w-[0%] s6:w-[10%] s10:w-[35.5%] h-full'>
      <div className='ml-2 w-[22rem] overflow-auto h-screen'>
          {page === "home" || page === "profile" ? searchDiv : ""}
          <FollowProfileList profiles={profiles}/>
          {page === "home" || page === "profile" ? <TrendingList /> : ""}
          <ul className='w-full flex flex-wrap justify-center pb-4'>
            {footerLinks.map((link, index)=>(
              <li key={index} className='text-[11px] mx-1 hover:underline cursor-pointer text-[#000000]/[.7]'>
                {link}
              </li>
            ))}
            <li className='text-[11px] mx-1 hover:underline cursor-pointer text-[#000000]/[.7]'>
              &copy; 2023 X Corp.
            </li>
          </ul>
      </div>
    </div>
  )


  return (
    <>{w < 1000 || page === "messages" ?  "" : show}</>
  );
}

export default LastContainer;
