import IconTwitter from '../../icons/logos/twitter-icon';
import ListIcon from '../../icons/menu/list';
import BookmarkIcon from '../../icons/menu/bookmark';
import CommunityIcon from "../../icons/menu/communities";
import ProfileIcon from '../../icons/menu/profile';
import Dropdowns from '../../../components/menu/dropdowns';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function SlideMenu({opened,setOpened}) {
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state => state.users)
    const user = users.activeprofiles.find(user => user.id === currUser.user.uid)

    const menu = [
        [<ProfileIcon picked={["",null]}/>,"Profile"],
        [<IconTwitter clas={"w-[26px]"}/>,"Verified"],
        [<ListIcon picked={["",null]}/>,"Lists"],
        [<BookmarkIcon picked={["",null]}/>,"Bookmarks"],
        [<CommunityIcon picked={["",null]}/>,"Communities"],
    ]

    const DisplayMenuItems = ({data}) => (
        <div className='py-0.5'>
            <span className='h-[56px] inline-flex items-center text-[#000000] text-[17px] font-twitterchirp'>
                <div className="pl-0 pr-2">{data[0]}</div>
                <span className="font-bold mr-4">{data[1]}</span>
            </span>
        </div>
    )

    return (
        <div className={opened ? 'absolute h-full w-full bg-[#000000]/[.4] transition-all transition-300 z-[100] block' : 'absolute h-full w-full bg-[#000000]/[.4] transition-all transition-300 -translate-x-full z-[100] block'} onClick={()=>{setOpened(false)}}>
            <div className='flex flex-col h-[100%] w-[280px] bg-[#ffffff] overflow-y-auto' onClick={(e)=>{e.stopPropagation()}}>
                <div className='w-[90%] mx-auto mt-5'>
                    <div>
                        <div className='flex justify-between'>
                            <div className='bg-[#000000] rounded-full h-[40px] w-[40px]'></div>
                            <div className='border-solid border rounded-full text-center h-[30px] w-[30px]'>
                                <span>+</span>
                            </div>
                        </div>
                        <div className='h-[30%] mb-[8px] mt-[8px]'>
                            <strong className='block text-[17px]'>{user.info.name}</strong>
                            <span className='text-[#536471] text-[15px] font-semibold'>@{user.info.username}</span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='text-[15px] w-[38%]'>
                            <strong className='mr-[3px]'>{user.info.following.length}</strong><span className='text-[#536471] font-semibold'>Following</span>
                        </div>
                        <div className='text-[15px] w-[38%]'>
                            <strong className='mr-[3px]'>{user.info.followers.length}</strong><span className='text-[#536471] font-semibold'>Followers</span>
                        </div>
                    </div>    
                </div>
                <div className='flex flex-col xl:items-start '>
                    <div className='h-[100%] flex flex-col justify-around mt-2 xl:items-start items-center'>
                        <ul className='w-[90%]'>
                        {menu.map((pick, index) => (
                            <Link to={'/profile/' + user.info.username} key={index} className={pick[1] !== "Profile" ? 'pointer-events-none' : ""} onClick={()=>{setOpened(false)}}>
                                <DisplayMenuItems data={pick}/>
                            </Link>
                        ))}
                        </ul>
                    </div>
                </div>
                <Dropdowns />
            </div>
        </div>
    );
}

export default SlideMenu;
