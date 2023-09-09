import { forwardRef, useState } from "react"

const CredentialInput = forwardRef(({reff, placeholder, password}) => {
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState("")

    return (
        <div className={'relative h-[70px] border-[3px] px-2 py-2 rounded-lg ' + (focused ? "border-[#1d9bf0]" : "")}>
            <div className={'transition-all transition-300 z-10 absolute pointer-events-none ' + (focused || value !== "" ? "text-[15px] top-0 " : "text-[#000000]/[.6] bottom-[20px] text-[20px] ") + (focused ? " text-[#1d9bf0]" : "")}>{placeholder}</div>
            <input className='text-[20px] outline-none w-[95%] absolute bottom-[10px]' type={password ? "password" : "text"} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} ref={reff} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
        </div>
    )
})

export default CredentialInput;