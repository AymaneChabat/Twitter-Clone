import { IconTwitter } from '../../icons/logos';
import Dropdowns from '../../../components/menu/dropdowns';
import { ProfileIcon, CommunityIcon, BookmarkIcon, ListIcon } from '../../icons/menu'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function SlideMenu({setOpened}) {
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state => state.users)
    const user = users.activeprofiles.find(user => user.id === currUser.user)
    const theme = useSelector(state => state.color.theme)

    const variants = {
        hidden: { x: "-50%" },
        visible: { x: "0" }
    }

    const menu = [
        [<ProfileIcon picked={["",null]}/>,"Profile"],
        [<IconTwitter clas={"w-[26px]"}/>,"Verified"],
        [<ListIcon picked={["",null]}/>,"Lists"],
        [<BookmarkIcon picked={["",null]}/>,"Bookmarks"],
        [<CommunityIcon picked={["",null]}/>,"Communities"],
    ]

    const DisplayMenuItems = ({data}) => (
        <div className='py-0.5'>
            <span className='h-[56px] inline-flex items-center text-[#000000] text-[17px]'>
                <div className="pl-0 pr-2">{data[0]}</div>
                <span className="font-bold mr-4 dark:text-white">{data[1]}</span>
            </span>
        </div>
    )

    const bgs = {"dim": "dark:bg-[#15202b]", "dark": "dark:bg-[#000000]", "light": "bg-[#ffffff]"}

    return (
        <div className='absolute top-0 h-full w-full bg-[#000000]/[.4] z-[100] block ' onClick={()=>{setOpened(false)}}>
            <motion.div key={0} variants={variants} initial="hidden" animate="visible" exit="hidden" className={'flex flex-col h-[100%] w-[280px] overflow-y-auto transition-all transition-500 ' + (bgs[theme])} onClick={(e)=>{e.stopPropagation()}}>
                <div className='w-[90%] mx-auto mt-5'>
                    <div className='bg-[#000000] rounded-full h-[40px] w-[40px]'></div>
                    <div className='h-[30%] my-[8px]'>
                        <strong className='block text-[17px] dark:text-white'>{user.info.name}</strong>
                        <span className='text-[#536471] text-[15px]'>@{user.info.username}</span>
                    </div>
                    <div className='flex mt-5'>
                        <div className='text-[15px] w-[38%]'>
                            <strong className='mr-[3px] dark:text-white'>{user.info.following.length}</strong><span className='text-[#536471]'>Following</span>
                        </div>
                        <div className='text-[15px] w-[38%]'>
                            <strong className='mr-[3px] dark:text-white'>{user.info.followers.length}</strong><span className='text-[#536471]'>Followers</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col xl:items-start '>
                    <div className='h-[100%] flex flex-col justify-around mt-2 xl:items-start items-center'>
                        <ul className='w-[90%] dark:text-[#ffffff]'>
                        {menu.map((pick, index) => (
                            <Link to={'/profile/' + user.info.username} key={index} className={pick[1] !== "Profile" ? 'pointer-events-none' : ""} onClick={()=>{setOpened(false)}}>
                                <DisplayMenuItems data={pick}/>
                            </Link>
                        ))}
                        </ul>
                    </div>
                </div>
                <Dropdowns />
            </motion.div>
        </div>
    );
}

export default SlideMenu;
