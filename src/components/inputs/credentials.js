import { forwardRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"

const CredentialInput = forwardRef(({placeholder, password, textarea, defaultVal, refKey}, ref) => {
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState(defaultVal !== undefined ? defaultVal : "")
    const colors = {"#1d9bf0":"text-[#1d9bf0]", "#ffd400":"text-[#ffd400]", "#f91880":"text-[#f91880]", "#7856ff":"text-[#7856ff]", "#ff7a00":"text-[#ff7a00]", "#00ba7c":"text-[#00ba7c]"}
    const color = useSelector(state => state.color.color)

    useEffect(()=>{
        ref.current[refKey] = value
    }, [value])

    return (
        <div className={'relative '+ (textarea ? "h-[150px]" : "h-[65px]") + ' border-[1px] px-2 py-2 rounded-lg ' + (focused ? "border-["+color+"]" : "")}>
            <div className={'dark:text-[#ffffff] transition-all transition-300 z-10 absolute pointer-events-none ' + (focused || value !== "" ? "text-[15px] top-0.5 " : "text-[#000000]/[.6] text-[20px] " + (!textarea ? "bottom-[20px] " : "top-[20px] ")) + (focused ? colors[color]+" dark:text-[#1d9bf0]" : " ")}>{placeholder}</div>
            {!textarea ? 
            <input className='text-[18px] outline-none w-[95%] absolute bottom-[10px] bg-transparent dark:text-[#ffffff]' type={password ? "password" : "text"} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} value={value} onChange={(e)=>{setValue(e.target.value)}} maxLength={50}/>: 
            <textarea className='text-[18px] outline-none w-[95%] absolute resize-none bottom-0 h-[80%] bg-transparent dark:text-[#ffffff]' onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} ref={ref} onChange={(e)=>setValue(e.currentTarget.value)} maxLength={200} defaultValue={defaultVal !== undefined ? defaultVal : ""}></textarea>}
        </div>
    )
})

export default CredentialInput;