import Dots from "../icons/menu/dots";
import InteractionButtons from "../buttons/model";
import { Link } from "react-router-dom";
import DisplayImages from "./displayImages";
import { useSelector } from "react-redux";
import { useState } from "react";
import VerifiedIcon from "../icons/profile/verified";
import UserPreview from "../profiles/userPreview";

function DisplayPosts({postPath, postList, reply}) {
    const [preview, setPreview] = useState(false)
    const users = useSelector(state=>state.users.activeprofiles)
    const post = postList.find(post => post.postPath === postPath)
    const user = users.find(user => user.id === post.post.userId)
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
    <article className={"relative flex border-[#1d9bf0]/[.1] transition-all duration-200" + (reply ? "" : " border-b")} >
        {preview ? <UserPreview user={user} action={hidePreview}/> : ""}
        <Link to={"/"+user.info.username+"/post/"+post.postPath} className="w-full">
            <div className="h-full px-3 py-2 hover:bg-[#ebebeb]/[.4] cursor-pointer flex">
                <div className="h-full overflow-hidden flex flex-col items-center mr-2">
                    <Link to={"/profile/"+user.info.username}>
                        <div className="w-[45px] h-[45px] bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full" style={{backgroundImage: `url('${user.info.profilepicture}')`}}  onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}></div>
                    </Link>
                    {reply ? <div className="h-full w-[2px] bg-[#cfd9de]"></div> : ""}
                </div>
                <div className="w-[88%]">
                    <div className="flex w-full items-start justify-between">
                        <div className="group flex flex justify-center items-center">
                            <h1 className="flex mr-1" onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}>
                                <span id="name" className="font-bold text-[15px] hover:underline mr-1.5">{user.info.name}</span> 
                                {user.info.username === "owner" ? <VerifiedIcon /> : ""}
                            </h1>
                            <span className="text-[15px] text-[#536471]"><span className="text-[12px]">@</span>{user.info.username}  {post.post.time}</span>
                        </div>
                        <div className="hover:bg-[#1D9BF0]/[.1] p-1.5 rounded-full">
                            <Dots w={12}/>
                        </div>
                    </div>
                    <p className="text-[#0f1419]/[.8] text-[15px] font-chirp leading-[20px] break-words">
                        {returnPostContent(post.post.content).split("\n").map((line,index)=>(
                            <div key={index}>{line}</div>
                        ))}
                        <div onClick={(e)=>{e.preventDefault();e.stopPropagation()}} className="mt-2">
                            {post.post.media.length > 0 ? (
                                <DisplayImages images={post.post.media} posting={false}/>
                            ) : ""}
                        </div>
                    </p>
                    <InteractionButtons data={{comments: post.post.comments, likes: post.post.likes, reposts: post.post.reposts, impressions: post.post.impressions, post: post.postPath}}/>
                </div>
            </div>
        </Link>
    </article>
  );
}

export default DisplayPosts;
