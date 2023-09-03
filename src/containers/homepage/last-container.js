import SearchIcon from '../../components/icons/menu/search';
import FollowProfileList from '../../components/profiles/profilesList';
import TrendingList from '../../components/trends/trendsList';
import { useState } from 'react';

function LastContainer({w,page}) {

  const [search, setSearch] = useState('')
  const [focused,setFocused] = useState(false)

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

  const searchDiv = (
      <div className='hidden s10:inline overflow-auto'>
        <div className={'flex py-2 my-2 items-center rounded-full border-2 px-4 bg-['+(!focused ? "#EFF3F4] border-transparent" : "#ffffff] border border-[#1d9bf0]")}>
            <SearchIcon picked={[false,"Explore"]} color={focused ? "#1d9bf0" : "#808080"} size={"20"}/>
            <input onChange={(e)=>{setSearch(e.target.value)}} value={search} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} placeholder='Search' className='bg-transparent w-full ml-3 focus:outline-none'/>
        </div>
      </div>
    )

  const show = (
    <div className='w-[0%] s6:w-[10%] s10:w-[33%] h-full'>
    <div className='ml-2 w-[20rem] overflow-auto h-screen'>
        {page === "home" || page === "profile" ? searchDiv : ""}
        <FollowProfileList />
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
    <>{w < 1000 || page == "messages" ?  "" : show}</>
  );
}

export default LastContainer;
