import { useState } from 'react';
import PickAudience from './audience';
import PickReplies from './repliesAudience';
import PostFooter from './postfooter';
import DeleteIcon from '../icons/posts/delete';

function HomePost() {

    const [content,setContent] = useState('')
    const [image,setImages] = useState(null)
    const imageDisplay = (
        <div className='relative'>
            <div className='absolute text-center bg-[#000000] rounded-full p-1 right-1 top-1 hover:bg-[#000000]/[.7] cursor-pointer' onClick={()=>{setImages(null)}}>
                <DeleteIcon />
            </div>
            <img src={image} />
        </div>
    )


  return (
        <div className='flex min-h-[150px] border-b border-[#1d9bf0]/[.1] p-3 max-w-[100%]'>
            <div className='mr-2'>
                <div className='w-[38px] h-[38px] bg-[#000000] rounded-full'></div>
            </div>
            <div className='w-[90%]'>
                <PickAudience />
                <div className='w-auto border-b relative'>
                    {content === "" ? (<div className='text-[#000000]/[.6] text-[20px] font-chirp absolute pointer-events-none h-[30px]'>What is happening?!</div>) : ""}
                    <div className='max-w-[100%]'>
                        <div className='focus:outline-none text-[20px] w-full grow-0 break-word font-chirp min-h-[50px]' contentEditable={true} onInput={(e)=>{setContent(e.target.innerHTML)}}></div>
                        {image !== null ? imageDisplay : ""}
                        <PickReplies />
                    </div>
                </div>
                <PostFooter content={content} image={image} setImages={setImages} setContent={setContent}/>
            </div>
        </div>
  );
}

export default HomePost;
