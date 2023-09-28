import { useState } from "react";
import DeleteIcon from "../icons/posts/delete";

function DisplayImages({images, posting, setImages}) {
    const [fullscreen, setFullScreen] = useState(false)

    const imageFS = (
        <div className="fullscreen fixed top-0 left-0 w-screen h-screen object-cover z-50 bg-[#000000]/[.8] flex justify-center items-center" onClick={()=>{setFullScreen(false)}}>
            <img className="h-[700px] bg-[#ffffff] rounded-xl" src={fullscreen} onClick={(e)=>{e.stopPropagation()}} />
        </div>
    )

    const imageDisplay = (data, index) => (
        <div className={'relative w-auto min-h-[49%] overflow-hidden border rounded-lg grow ' + (images.length > 2 && data !== images[0] || images.length > 3 ? "max-h-[49%]" : "")} key={index} onClick={()=>{setFullScreen(posting === true ? data.base64 : data)}}>
            {posting ? (
                <div className='absolute text-center bg-[#ffffff]/[.5] rounded-full p-1 right-1 top-1 hover:bg-[#ffffff] cursor-pointer transition duration-300' onClick={(e)=>{e.stopPropagation();setImages(prev => prev.filter(image => image.base64 !== data.base64))}}>
                    <DeleteIcon />
                </div>
            ) : ""}
            <img className='min-w-[100%]' src={posting === true ? data.base64 : data}/>
        </div>
    )
    return (
        <div className={'flex pb-8 justify-between w-[100%] ' + (images.length > 2 ? "max-h-[300px]" : "max-h-[500px]")}>
            {fullscreen !== false ? imageFS : ""}
            <div className={'flex flex-col justify-between grow ' + (images.length > 1 ? "max-w-[49.5%]" : "")}>
                {images.map((image, index)=> (index === 0 || index === 3 ? (imageDisplay(image, index)): ""))}
            </div>
            {images.length > 1 ? (
            <div className='flex flex-col max-w-[49.5%] justify-between grow'>
                {images.slice(1,3).map((image, index)=>(imageDisplay(image, index)))}
            </div>
            ): ""}
        </div>
  );
}

export default DisplayImages;
