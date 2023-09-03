import EarthIcon from '../icons/dropdowns/earth';
import CloseCircle from '../icons/dropdowns/circlePersons';
import Mentions from '../icons/dropdowns/@';
import CheckMark from '../icons/dropdowns/check';
import { useState } from 'react';

function PickReplies() {

    const [active,setActive] = useState(false)
    const [animate,setAnimate] = useState(" opacity-0")
    const [selected, setSelected] = useState(0)
    const choices = [<><EarthIcon color={"#37A6F1"}/><span className='ml-1'>Everyone</span></>, <><CloseCircle color={"#37A6F1"}/><span className='ml-1'>People you follow</span></>, <><Mentions color={"#37A6F1"}/><span className='ml-1'>Only people you mention</span></>]

    window.addEventListener("click", ()=>{
        if (active) {
            setActive(false)
            setAnimate(' opacity-0')
        }
    })

    const audienceAnimate = () => {
        if (active) {
            setActive(false)
            setAnimate(" opacity-0")
        } else {
            setActive(true)
            setTimeout(()=>{
                setAnimate(" opacity-100")
            },10)
        }
    }

    const dropdown = (
        <div id="dropdownNavbar" class={"z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow h-auto w-[19rem] transition-all transition-300" + animate} >
            <ul class="py-2 text-sm text-gray-700 h-[100%] flex flex-col justify-evenly" aria-labelledby="dropdownLargeButton">
                <li className='py-2'>
                    <span href="#" class="block px-4 font-bold text-[17px] font-twitterchirp">Who can reply?</span>
                    <p className='ml-4 text-[#536471] text-[15px]'>Choose who can reply to this post.<br /> Anyone mentioned can always reply.</p>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100/[.5] font-bold text-[14px] font-twitterchirp flex items-center" onClick={()=>{setSelected(0);setActive(false)}}>
                        <div className='bg-[#1D9BF0] mr-2 p-2 rounded-full'>
                            <EarthIcon />
                        </div>
                        <span className='w-[90%]'>
                            Everyone
                        </span>
                        <div>
                            {selected === 0 ? <CheckMark /> : ""}
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100/[.5] font-bold text-[14px] font-twitterchirp flex items-center" onClick={()=>{setSelected(1);setActive(false)}}>
                        <div className='bg-[#1D9BF0] mr-2 p-2 rounded-full'>
                            <CloseCircle />
                        </div>
                        <span className='w-[90%]'>
                            People you follow
                        </span>
                        <div>
                            {selected === 1 ? <CheckMark /> : ""}
                        </div>
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100/[.5] font-bold text-[14px] font-twitterchirp flex items-center" onClick={()=>{setSelected(2);setActive(false)}}>
                        <div className='bg-[#1D9BF0] mr-2 p-2 rounded-full'>
                            <Mentions />
                        </div>
                        <span className='w-[90%]'>
                            Only people you mention
                        </span>
                        <div>
                            {selected === 2 ? <CheckMark /> : ""}
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )

  return (
    <div onClick={(e)=>{e.stopPropagation()}} className='py-1'>
        <button className='text-[#37A6F1] text-[13px] font-bold px-2 rounded-full flex items-end justify-around py-1 hover:bg-[#37A6F1]/[.1] transition transition-300 mb-1' onClick={audienceAnimate}>{choices[selected]}</button>
        {active ? dropdown : ""}
    </div>
  );
}

export default PickReplies;