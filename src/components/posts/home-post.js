import { useEffect, useState } from 'react';
import PickAudience from './audience';
import PickReplies from './repliesAudience';
import DeleteIcon from '../icons/posts/delete';
import { addPost } from '../../redux/actions/postActions';
import FileIcon from '../icons/posts/files';
import ReactFileReader from 'react-file-reader';
import { useSelector, useDispatch } from 'react-redux';

function HomePost({floating, setPostOpen}) {
    const currUser = useSelector(state => state.currUser)
    const [content,setContent] = useState('')
    const [image,setImages] = useState(null)
    const dispatch = useDispatch()

    const handleFiles = files => {
        setImages(files.base64)
    }

    const imageDisplay = (
        <div className='relative w-[150px]'>
            <div className='absolute text-center bg-[#ffffff] rounded-full p-1 right-1 top-1 hover:bg-[#ffffff]/[.7] cursor-pointer' onClick={()=>{setImages(null)}}>
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
                        <div className={'focus:outline-none text-[20px] w-full grow-0 break-word font-chirp ' + (floating ? "min-h-[150px]" : "min-h-[90px]")} contentEditable={true} onInput={(e)=>{setContent(e.target.innerHTML)}}></div>
                        {image !== null ? imageDisplay : ""}
                        <PickReplies />
                    </div>
                </div>
                <div className='w-full pt-3 flex items-center justify-between'>
                    <div className='flex w-[8%] justify-between'>
                        <button disabled={image === null ? false : true} className={image === null ? "opacity-100" : "opacity-50"}>
                            <ReactFileReader handleFiles={handleFiles} multipleFiles={false} base64={true}>
                                <FileIcon />
                            </ReactFileReader>
                        </button>
                    </div>
                        <button type="button" class={"text-white text-sm font-medium rounded-full transition duration-300 py-0.5 px-5 " + (content === "" && image === null ? "bg-[#1d9bf0]/[.5]" : "bg-[#1d9bf0]/[.9]")} disabled={content === "" && image === null ? true : false} onClick={()=>{
                            dispatch(addPost(currUser.token, {content: content, media: []}, currUser.user.uid)); 
                            if (floating) {
                                setPostOpen(false)
                            }
                            }}>Post</button>
                    </div>
            </div>
        </div>
  );
}

export default HomePost;
