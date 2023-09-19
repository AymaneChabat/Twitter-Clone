import { useState } from "react";

function ChoiceButtons({choices}) {

  const [picked,setChoice] = useState(0)

    return (
        <div className="border-b pb-0.5 border-[#1d9bf0]/[.1]">
              <ul className='flex'>
                {choices.map((choice,index)=>(
                  <li className={'text-center py-3 cursor-pointer hover:bg-[#E6E7E7]/[.6] transition-all duration-300 w-[100%]'} onClick={()=>{
                    if (picked !== index) {setChoice(index)}
                  }}>
                    <span className={picked === index ? 'border-b-4 py-3.5 border-[#1D9BF0] text-md font-chirp' : 'py-3.5 text-[#7A8791] text-md font-chirp'}>
                      {choice}
                    </span> 
                  </li>
                ))}
              </ul>
            </div>
    );
  }
  
  export default ChoiceButtons;
  