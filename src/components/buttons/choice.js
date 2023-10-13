import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChoiceButtons({choices, setChosen}) {

  const [picked,setChoice] = useState(0)
  const colors = {"#1d9bf0":"border-[#1d9bf0]", "#ffd400":"border-[#ffd400]", "#f91880":"border-[#f91880]", "#7856ff":"border-[#7856ff]", "#ff7a00":"border-[#ff7a00]", "#00ba7c":"border-[#00ba7c]"}
  const color = useSelector(state => state.color.color)

  useEffect(()=>{
    if (setChosen !== undefined) {
      setChosen(choices[picked])
    }
  }, [picked])

  return (
      <nav className={"border-b pb-0.5 border-[#1d9bf0]/[.1] dark:border-[#ffffff]/[.3]"}>
        <ul className='flex'>
          {choices.map((choice,index)=>(
            <li index={index} className={'text-center py-3 cursor-pointer dark:hover:bg-[#ffffff]/[.15] hover:bg-[#E6E7E7]/[.6] transition-all duration-300 w-[100%]'} onClick={()=>{
              if (picked !== index) {setChoice(index)}
            }}>
              <span className={picked === index ? ('dark:text-[#ffffff] border-b-4 py-3.5 '+colors[color]+' text-md font-chirp'): 'py-3.5 text-[#7A8791] text-md font-chirp'}>
                {choice}
              </span> 
            </li>
          ))}
        </ul>
      </nav>
    );
  }
  
  export default ChoiceButtons;
  