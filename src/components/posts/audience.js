import EarthIcon from '../icons/dropdowns/earth';
import CloseCircle from '../icons/dropdowns/circlePersons';
import DownArrow from '../icons/menu/downarrow';
import { useState } from 'react';

function PickAudience() {

    const [audiencePick,setAudience] = useState(false)
    const [active,setActive] = useState(0)
    const [animate,setAnimate] = useState(' opacity-0')

    window.addEventListener("click", ()=>{
        if (audiencePick) {
            setAudience(false)
            setAnimate(' opacity-0')
        }
    })

    const audienceAnimate = () => {
        if (audiencePick) {
            setAudience(false)
            setAnimate(" opacity-0")
        } else {
            setAudience(true)
            setTimeout(()=>{
                setAnimate(" opacity-100")
            },10)
        }
    }

    const dropdown = (
        <div id="dropdownNavbar" class={"z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow h-auto w-[19rem] border-2 border-solid transition-all transition-300" + animate} >
            <ul class="py-2 text-sm text-gray-700 h-[100%] flex flex-col justify-evenly" aria-labelledby="dropdownLargeButton">
                <li>
                    <span href="#" class="block px-4 py-2 font-bold text-[17px] font-twitterchirp">Choose audience</span>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100/[.5] font-bold text-[14px] font-twitterchirp flex items-center" onClick={()=>{setActive(0);setAudience(false)}}>
                        <div className='bg-[#1D9BF0] mr-2 p-2 rounded-full'>
                            <EarthIcon />
                        </div>
                        Everyone
                    </a>
                </li>
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100/[.5] font-bold text-[14px] font-twitterchirp flex items-center" onClick={()=>{setActive(1);setAudience(false)}}>
                        <div className='bg-[#00BA7C] mr-2 p-2 rounded-full'>
                            <CloseCircle />
                        </div>
                        <div>
                        Circle
                        <div className='text-[13px]'>0 <span className='font-bold text-[12px] text-[#000000]/[.5] '>People</span> <a className='underline font-bold text-[13px] px-2 py-1 rounded-full hover:bg-[#000000]/[.2] transition-all transition-300'>Edit</a></div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    )

  return (
        <div className='mb-4' onClick={(e)=>{e.stopPropagation()}}>
            <button className={'text-[13px] font-bold px-2 border rounded-full flex items-center w-[100px] justify-around' + (active === 1 ? " text-[#00ba7c] border-[#00ba7c]" : " text-[#37A6F1]")} onClick={audienceAnimate}>{active === 0 ? "Everyone" : "Circle"} <DownArrow size={12}/></button>
            {audiencePick ? dropdown : ""}
        </div>
  );
}

export default PickAudience;

