import { IconTwitter } from '../../icons/logos';
import { ProfileIcon, CommunityIcon, BookmarkIcon, ListIcon } from '../../icons/menu'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AnalyticsIcon, AdsIcon, SettingsIcon, HelpIcon, DataIcon, DisplayIcon, KeyboardIcon, LogoutIcon } from '../../icons/menu';
import { DownArrow } from '../../icons/menu';
import { AnimatePresence, motion } from 'framer-motion';


const dropdown = [
    ["Creator Studio", [
            [<AnalyticsIcon />, "Analytics"]
        ]
    ],
    ["Professional Tools", [
            [<AdsIcon />, "Ads"]
        ]
    ],
    ["Settings and Support", [
            [<SettingsIcon />, "Settings and privacy"],
            [<HelpIcon />, "Help Center"],
            [<DataIcon />, "Data saver"],
            [<DisplayIcon />, "Display"],
            [<KeyboardIcon />, "Keyboard shortcuts"],
            [<LogoutIcon />, "Log out"]
        ]
    ]
]

const menu = [
    [<ProfileIcon />,"Profile"],
    [<IconTwitter clas={"w-[26px]"}/>,"Verified"],
    [<ListIcon />,"Lists"],
    [<BookmarkIcon />,"Bookmarks"],
    [<CommunityIcon />,"Communities"],
]

function Dropdown({item}) {
    const location = useLocation()
    const [active,setActive] = useState(false)
    const path = (item) => {
        switch(item) {
            case "Log out":
                return "/logout"
            case "Display":
                return "/display"
            default:
                return ""
        }
    }

    const parentVariants = {
        inactive: {
            rotate: 0
        },
        active: {
            rotate: 540
        }
    }

    return (
        <div className='w-[90%] mx-auto mt-2 mb-6'>
            <div className='flex justify-between items-center' onClick={()=>{active ? setActive(false) : setActive(true)}}>
                <span className='font-semibold text-[#000000]/[.9] dark:text-[#ffffff]'>{item[0]}</span>
                    <motion.div variants={parentVariants} animate={active ? "active" : "inactive"}>
                        <DownArrow active={active} size={17}/>
                    </motion.div>
            </div>
            <div className={active ? 'pt-2 block' : 'pt-2 hidden'}>
                {item[1].map((data, index) => (
                    <Link to={path(data[1])} className={'flex py-2 w-[100%] items-center ' + (data[1] === "Log out" ? "cursor-pointer" : "cursor-default")} state={{previousLocation: location}} key={index}>
                        {data[0]}
                        <span className='font-medium text-[16px] text-[#000000]/[.7] -mb-0.5 dark:text-[#ffffff] ml-2'>{data[1]}</span>
                    </Link>  
                    ))}
            </div>
        </div>
    )

}

function SlideMenu() {
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state => state.users)
    const user = users.activeprofiles.find(user => user.id === currUser.user)
    const theme = useSelector(state => state.color.theme)
    const navigate = useNavigate()

    const variants = {
        hidden: { x: "-50%" },
        visible: { x: "0" }
    }


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
        <div className='absolute top-0 h-full w-full bg-[#000000]/[.4] z-[100] block ' onClick={()=>{navigate(-1)}}>
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
                            <Link to={'/profile/' + user.info.username} key={index} className={pick[1] !== "Profile" ? 'pointer-events-none' : ""} onClick={()=>{navigate(-1)}}>
                                <DisplayMenuItems data={pick}/>
                            </Link>
                        ))}
                        </ul>
                    </div>
                </div>
                <AnimatePresence>
                    {dropdown.map((item, index)=>(
                        <Dropdown item={item} key={index}/>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default SlideMenu;
