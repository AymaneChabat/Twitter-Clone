import { useState } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import { DownArrow } from "../icons/menu";

function DropdownButton({data}) {
  const [active,setActive] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className='w-[90%] mx-auto mt-2 mb-6'>
        <div className='flex justify-between items-center' onClick={()=>{active ? setActive(false) : setActive(true)}}>
            <span className='font-semibold text-[#000000]/[.9] text-[#ffffff]'>{data[0]}</span>
            <DownArrow active={active}/>
        </div>
        <div className={active ? 'pt-2 block' : 'pt-2 hidden'}>
            {data[1].map((data0, index) => (
                  <div className='flex py-2 w-[100%] items-center' onClick={data0[1] === "Log out" ? ()=>{dispatch(signOut())} : ""} key={index}>
                      {data0[0]}
                      <span className='font-medium text-[16px] text-[#000000]/[.7] -mb-0.5 text-[#ffffff] ml-2'>{data0[1]}</span>
                  </div>  
                ))}
        </div>
    </div>
  );
}

export default DropdownButton;
