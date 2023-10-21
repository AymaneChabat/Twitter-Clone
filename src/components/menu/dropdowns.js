import { useState } from 'react';
import { AnalyticsIcon, AdsIcon, SettingsIcon, HelpIcon, DataIcon, DisplayIcon, KeyboardIcon, LogoutIcon } from '../icons/menu';
import { useDispatch } from 'react-redux';
import { DownArrow } from '../icons/menu';
import { signOut } from "../../redux/actions/authActions"
import { AnimatePresence, motion } from 'framer-motion';

// We will only use this once so no need to create a new file
function Dropdown({item}) {
    const [active,setActive] = useState(false)
    const dispatch = useDispatch()

    const parentVariants = {
        inactive: {
            rotate: 0
        },
        active: {
            rotate: 540
        }
    }

    const childVariants = {
        inactive: {
            scale: 0
        },
        active: {
            scale: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className='w-[90%] mx-auto mt-2 mb-6'>
            <div className='flex justify-between items-center' onClick={()=>{active ? setActive(false) : setActive(true)}}>
                <span className='font-semibold text-[#000000]/[.9] dark:text-[#ffffff]'>{item[0]}</span>
                    <motion.div variants={parentVariants} animate={active ? "active" : "inactive"}>
                        <DownArrow active={active}/>
                    </motion.div>
            </div>
            <div className={active ? 'pt-2 block' : 'pt-2 hidden'}>
                {item[1].map((data, index) => (
                    <div className='flex py-2 w-[100%] items-center' onClick={data[1] === "Log out" ? ()=>{dispatch(signOut())} : ""} key={index}>
                        {data[0]}
                        <span className='font-medium text-[16px] text-[#000000]/[.7] -mb-0.5 dark:text-[#ffffff] ml-2'>{data[1]}</span>
                    </div>  
                    ))}
            </div>
        </div>
    )

}

function Dropdowns() {

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
                [<SettingsIcon margin={'mr-[12px]'}/>, "Settings and privacy"],
                [<HelpIcon />, "Help Center"],
                [<DataIcon />, "Data saver"],
                [<DisplayIcon />, "Display"],
                [<KeyboardIcon />, "Keyboard shortcuts"],
                [<LogoutIcon />, "Log out"]
            ]
        ]
    ]
  return (
            <AnimatePresence>
                {dropdown.map((item, index)=>(
                    <Dropdown item={item} key={index}/>
                ))}
            </AnimatePresence>
  );
}

export default Dropdowns;
