import { useState } from "react";
import DeleteIcon from "../icons/posts/delete";

function DisplayImages({images, posting, setImages}) {
    const [fullscreen, setFullScreen] = useState(false)

    const imageFS = (
        <div className="fullscreen fixed top-0 left-0 w-screen h-screen object-cover z-50 bg-[#000000]/[.8] flex justify-center items-center cursor-default" onClick={(e)=>{setFullScreen(false)}}>
            <img className="w-auto w-[600px] max-w-[90%] bg-[#ffffff] rounded-xl" src={fullscreen} loading="lazy"/>
        </div>
    )

    const size = (index) => {
        switch(images.length) {
            case 1:
                return "row-span-2 col-span-2"
            case 2:
                return "row-span-2"
            case 3: 
                if (index === 0) {
                    return "row-span-2"
                }
            default:
                return ""
        }
    }

    const imageDisplay = (data, index) => (
        <div className={'w-full h-auto grow hover:cursor-pointer hover:brightness-75 transition-all duration-300 relative ' + (size(index))} key={index} onClick={()=>{setFullScreen(posting === true ? data.base64 : data)}}>
            {posting ? (
                <div className='absolute text-center bg-[#ffffff]/[.5] rounded-full p-0.5 right-1 top-1 hover:bg-[#ffffff] cursor-pointer transition duration-300' onClick={(e)=>{e.stopPropagation();setImages(prev => prev.filter(image => image.base64 !== data.base64))}}>
                    <DeleteIcon />
                </div>
            ) : ""}
            <img className='w-full h-full object-cover' src={posting === true ? data.base64 : data}/>
        </div>
    )
    return (
        
        
        <div className='grid grid-cols-2 grid-rows-2 mb-3 justify-between w-[100%] h-[500px] rounded-xl overflow-hidden gap-0.5' onClick={(e)=>e.preventDefault()}>
            {fullscreen !== false ? imageFS : ""}
            {images.map((image, index)=> imageDisplay(image, index))}
        </div>
  );
}

export default DisplayImages;
