import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ChoiceButtons({choices, setChosen}) {

  const [picked,setChoice] = useState(0)
  const colors = {"#1d9bf0":"border-[#1d9bf0]", "#ffd400":"border-[#ffd400]", "#f91880":"border-[#f91880]", "#7856ff":"border-[#7856ff]", "#ff7a00":"border-[#ff7a00]", "#00ba7c":"border-[#00ba7c]"}
  const color = useSelector(state => state.color.color)
  let lastChoice = picked

  useEffect(()=>{
    lastChoice = picked

    if (setChosen !== undefined) {
      setChosen(choices[picked])
    }
  }, [picked])


  const [borderPos, setBorderPos] = useState({width:  0, left: 0})

  useEffect(()=>{
    const pickedPosition = document.getElementById(choices[picked])

    setBorderPos({width: pickedPosition.offsetWidth, left: pickedPosition.offsetLeft})
  }, [choices])

  return (
      <nav className={"border-b pb-0.5 border-[#1d9bf0]/[.1] dark:border-[#ffffff]/[.3] overflow-hidden  relative"}>
        <ul className='flex'>
          {choices.map((choice,index)=>(
            <Fragment>
              <li  key={index} className={'text-center py-3 cursor-pointer dark:hover:bg-[#ffffff]/[.15] hover:bg-[#E6E7E7]/[.6] transition-all duration-300 w-[100%]'} onClick={()=>{
                if (picked !== index) {setChoice(index)}
              }}>
                <span id={choice} className={picked === index ? ('dark:text-[#ffffff]  py-3.5 '+colors[color]+' text-md font-chirp'): 'py-3.5 text-[#7A8791] text-md font-chirp'}>
                  {choice}
                </span>
              </li>
            </Fragment>
          ))}
        </ul>
        <hr className={"border-t-8 absolute transition-all duration-300 "+colors[color]} style={{width: `${borderPos.width}px`, left: `${borderPos.left}px`}}/>
      </nav>
    );
  }
  
  export default ChoiceButtons;
  