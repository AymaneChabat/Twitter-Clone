import { useState } from "react";
import DownArrow from "../icons/menu/downarrow";
import DropdownItems from "./dropdownitems";

function DropdownButton({data}) {
  const [active,setActive] = useState(false)

  return (
    <div className='w-[90%] mx-auto mt-2 mb-6'>
        <div className='flex justify-between items-center' onClick={()=>{active ? setActive(false) : setActive(true)}}>
            <span className='font-semibold text-[#000000]/[.9]'>{data[0]}</span>
            <DownArrow active={active}/>
        </div>
        <div className={active ? 'pt-2 block' : 'pt-2 hidden'}>
            {data[1].map((data0, index) => (
                  <DropdownItems key={index} data={data0}/>
                ))}
        </div>
    </div>
  );
}

export default DropdownButton;
