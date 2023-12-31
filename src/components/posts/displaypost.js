import { Dots } from "../icons/menu";
import InteractionButtons from "../buttons/interaction_buttons";
import { Link } from "react-router-dom";
import DisplayImages from "./displayImages";
import { useDispatch, useSelector } from "react-redux";
import { VerifiedIcon } from "../icons/profile";
import UserPreview from "../profiles/userPreview";
import { DeleteIcon } from "../icons/posts";
import { deletePost } from "../../redux/actions/postActions";
import React, { useEffect, Fragment, useState } from "react";
import { AnimatePresence } from "framer-motion";
import FloatingReply from "./floating_reply";

function postedAt(timestampInMilliseconds) {
    const millisecondsPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerMonth = 30;  // an average number
    const monthsPerYear = 12;

    let secondsElapsed = Math.floor((Date.now() - timestampInMilliseconds) / millisecondsPerSecond);
    
    if (secondsElapsed === -1) {
        return 'Now'
    }
    if (secondsElapsed < secondsPerMinute) {
        return `${secondsElapsed} seconds ago`;
    }

    let minutesElapsed = Math.floor(secondsElapsed / secondsPerMinute);
    if (minutesElapsed < minutesPerHour) {
        return `${minutesElapsed} minutes ago`;
    }

    let hoursElapsed = Math.floor(minutesElapsed / minutesPerHour);
    if (hoursElapsed < hoursPerDay) {
        return `${hoursElapsed} hours ago`;
    }

    let daysElapsed = Math.floor(hoursElapsed / hoursPerDay);
    if (daysElapsed < daysPerMonth) {
        return `${daysElapsed} days ago`;
    }

    let monthsElapsed = Math.floor(daysElapsed / daysPerMonth);
    if (monthsElapsed < monthsPerYear) {
        return `${monthsElapsed} months ago`;
    }


    let yearsElapsed = Math.floor(monthsElapsed / monthsPerYear);
    return `${yearsElapsed} years ago`;
}



const DisplayPost = ({postPath, reply, main, postList, floating}) => {
    const [preview, setPreview] = useState(false)
    const [replying, setReplying] = useState(false)
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state=>state.users.activeprofiles)
    const post = postPath ? postList.find(post => post.postPath === postPath) : "Deleted"

    const user = post !== "Deleted" ? users.find(user => user.id === post.post.userId) : undefined
    const [options, setOptions] = useState(false)

    useEffect(()=>{
        window.document.addEventListener("click", () => {
            if (options !== false) {
                setOptions(false)
            }
        })
        
    }, [options])

    const returnPostContent = (content) =>{
        return content.replace(/<div>(.*?)<\/div>/g, '\n$1');
    }

    const showPreview = (e) => {
        setTimeout(()=>{
            if (e.target.matches(":hover")) {
                setPreview(true)
            }
        }, 500)
    }

    const hidePreview = () => {
        const name = document.querySelector("#name")
        const prev = document.querySelector("#preview")

        if (prev !== undefined && preview === true) {
            setTimeout(()=>{
                if (!name.matches(":hover") && !prev.matches(":hover")) {
                    prev.classList.remove("opacity-100")
                    prev.classList.add("opacity-0")
                    setTimeout(()=>{
                        setPreview(false)
                    }, 500)
                }
            }, 500)
        }
    }

    return (
    post !== "Deleted" ? 
    <Fragment>
        <AnimatePresence>
            { 
            replying && 
                <FloatingReply postList={postList} postPath={postPath} setReplying={setReplying}/>
            }
        </AnimatePresence>
        <article className={"relative flex border-[#1d9bf0]/[.1] transition-all duration-200 dark:border-[#ffffff]/[.3]" + (reply ? "" : " border-b")} >
            {preview && <UserPreview user={user} action={hidePreview}/>}
            <Link to={"/"+user.info.username+"/"+post.postPath} className="w-full">
                <div className="h-full px-3 py-3 hover:bg-[#ebebeb]/[.4] cursor-pointer flex transition-all duration-300 dark:hover:bg-[#000000]/[.1] overflow-hidden">
                    <div className="h-full flex flex-col items-center mr-2">
                        {reply ? <div className="h-2 -mt-3 w-[2px] bg-[#cfd9de]"></div> : ""}
                        <Link to={"/"+user.info.username}>
                            <div className="w-[45px] h-[45px] bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full" style={{backgroundImage: `url('${user.info.profilepicture}')`}}  onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}></div>
                        </Link>
                        {main ? <div className="h-full -mb-2 w-[2px] bg-[#cfd9de]"></div> : ""}
                    </div>
                    <div className="w-[88%]">
                        <div className="flex w-full items-start justify-between">
                            <div className="group flex flex-wrap justify-start items-center text-left">
                                <h1 className="flex mr-1 " onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}>
                                    <span id="name" className="font-bold text-[15px] hover:underline mr-1.5 dark:text-[#ffffff] max-w-[150px] truncate overflow-hidden">{user.info.name}</span> 
                                    {user.info.username === "owner" ? <VerifiedIcon /> : ""}
                                </h1>
                                <span className="text-[15px] text-[#71767b] max-w-[800px] truncate overflow-hidden"><span className="text-[12px]">@</span>{user.info.username} · {postedAt(post.post.postedAt)}</span>
                            </div>
                            <div onClick={(e)=>{e.stopPropagation(); e.preventDefault()}}>
                                <div className="p-1.5 hover:bg-[#1D9BF0]/[.1] rounded-full" onClick={!options ? () => {setOptions(true)} : () => {setOptions(false)}}>
                                    <Dots w={12}/>
                                </div>
                                {user.id === currUser.user && <div className={"dark:bg-[#000000] dark:hover:brightness-75 hover:bg-[#ffffff]/[.9] absolute bg-[#ffffff] w-[60%] border z-40 px-2 opacity-0 transition-all duration-500 -translate-x-[90%] " + (options ? "opacity-100" : "pointer-events-none")}>
                                    <button className="flex justify-around w-full items-center py-2" onClick={()=>{dispatch(deletePost(currUser.token, post.postPath)); setOptions(false)}}>
                                        <DeleteIcon color={"#f4212e"}/>
                                        <span className="dark:text-[#ffffff] text-[#f4212e] text-[16px] font-semibold w-[85%] text-left ">Delete</span>
                                    </button>
                                </div>}
                            </div>
                        </div>
                        <p className="dark:text-[#ffffff] text-[#0f1419]/[.8] text-[15px] font-chirp leading-[20px] break-words">
                            {returnPostContent(post.post.content).split("\n").map((line,index)=>(
                                <div key={index}>{line}</div>
                            ))}
                            <div onClick={(e)=>{e.preventDefault();e.stopPropagation()}} className="mt-2">
                                {post.post.media.length > 0 && <DisplayImages images={post.post.media} posting={false}/>}
                            </div>
                        </p>
                        {!floating && <InteractionButtons setReplying={setReplying} data={{comments: post.post.comments, likes: post.post.likes, reposts: post.post.reposts, impressions: post.post.impressions, post: post.postPath}}/>}
                    </div>
                </div>
            </Link>
        </article>
    </Fragment> : 
    <div className="py-2 px-3">
        <span className="border rounded-2xl block px-3 py-1 bg-transparent text-[#000000]/[.6] dark:text-[#ffffff]">Post has been deleted</span>
    </div>
  );
}

export default DisplayPost;
