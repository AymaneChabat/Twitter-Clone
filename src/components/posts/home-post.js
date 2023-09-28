import { useState } from 'react';
import PickAudience from './audience';
import PickReplies from './repliesAudience';
import { addPost, addReply } from '../../redux/actions/postActions';
import FileIcon from '../icons/posts/files';
import ReactFileReader from 'react-file-reader';
import { useSelector, useDispatch } from 'react-redux';
import DisplayImages from './displayImages';

function HomePost({floating, setPostOpen, type, postId, username}) {
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state => state.users)
    const user = users.activeprofiles.find(user => user.id === currUser.user.uid)
    const [content,setContent] = useState('')
    const [images,setImages] = useState([])
    const dispatch = useDispatch()

    const handleFiles = files => {
        setImages([...images, {image: files.fileList[0], base64: files.base64}])
    }

    const post = () => {
        dispatch(addPost(currUser.token, {content: content, images: images.map(image => image.image)}, currUser.user.uid)); 
        document.querySelector("#contentDiv").innerHTML = ""
        setContent("")
        setImages([])
        if (floating) {
            setPostOpen(false)
        }           
    }

    const reply = () => {
        dispatch(addReply(currUser.token, {content: content, images: images.map(image => image.image)}, postId, username))
        document.querySelector("#contentDiv").innerHTML = ""
        setContent("")
        setImages([])
        if (floating) {
            setPostOpen(false)
        }   
    }

  return (
        <div className='flex min-h-[100px] border-b border-[#1d9bf0]/[.1] p-3 pt-4 max-w-[100%]'>
            <div className='mr-2'>
                <div className='w-[38px] h-[38px] bg-no-repeat bg-center bg-cover rounded-full' style={{backgroundImage: `url("${user.info.profilepicture}")`}}></div>
            </div>
            <div className='w-[90%]'>
            {type === "reply" ? "" : <PickAudience />}
                <div className='w-auto border-b relative'>
                    {content === "" ? (<div className='text-[#000000]/[.6] text-[20px] font-chirp absolute pointer-events-none h-[30px]'>{type === "reply" ? "Post your reply" : "What is happening?!"}</div>) : ""}
                    <div id="contentDiv" className={'focus:outline-none text-[20px] w-full grow-0 break-word font-chirp ' + (floating ? "min-h-[70px]" : "min-h-[50px]")} contentEditable={true} onInput={(e)=>{setContent(e.target.innerHTML)}}></div>
                    {images.length > 0 ?
                        <DisplayImages images={images} posting={true} setImages={setImages}/>
                    : ""}
                    {type === "reply" ? "" : <PickReplies />}
                </div>
                <div className='w-full pt-3 flex items-center justify-between'>
                    <div className='flex w-[8%] justify-between'>
                        <button disabled={images.length >= 4 ? true : false} className={images.length < 4 ? "opacity-100" : "opacity-50"}>
                            <ReactFileReader handleFiles={handleFiles} multipleFiles={false} base64={true}>
                                <FileIcon />
                            </ReactFileReader>
                        </button>
                    </div>
                    <button type="button" class={"text-white text-sm font-medium rounded-full transition duration-300 py-0.5 px-5 " + (content === "" && images.length === 0 ? "bg-[#1d9bf0]/[.5]" : "bg-[#1d9bf0]/[.9]")} disabled={content === "" && images.length === 0 ? true : false} onClick={type === "reply" ? reply : post}>
                        {type === "reply" ? "Reply" : "Post"}
                    </button>
                </div>
            </div>
        </div>
  );
}

export default HomePost;
