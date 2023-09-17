import { forwardRef, useState } from "react"

const CredentialInput = forwardRef(({reff, placeholder, password, textarea, defaultVal}) => {
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState(defaultVal !== undefined ? defaultVal : "")

    return (
        <div className={'relative '+ (textarea ? "h-[150px]" : "h-[65px]") + ' border-[3px] px-2 py-2 rounded-lg ' + (focused ? "border-[#1d9bf0]" : "")}>
            <div className={'transition-all transition-300 z-10 absolute pointer-events-none ' + (focused || value !== "" ? "text-[15px] top-0.5 " : "text-[#000000]/[.6] text-[20px] " + (!textarea ? "bottom-[20px]" : "top-[20px]")) + (focused ? " text-[#1d9bf0]" : "")}>{placeholder}</div>
            {!textarea ? 
            <input className='text-[18px] outline-none w-[95%] absolute bottom-[10px]' type={password ? "password" : "text"} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} ref={reff} value={value} onChange={(e)=>{setValue(e.target.value)}} maxLength={50}/>: 
            <textarea className='text-[18px] outline-none w-[95%] absolute resize-none bottom-0 h-[80%]' onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} ref={reff} onChange={(e)=>setValue(e.currentTarget.value)} maxLength={200} defaultValue={defaultVal !== undefined ? defaultVal : ""}></textarea>}
        </div>
    )
})

export default CredentialInput;