import Dots from "../icons/menu/dots";
import InteractionButtons from "../buttons/model";
import { Link } from "react-router-dom";
import DisplayImages from "./displayImages";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateFollows } from "../../redux/actions/userActions";

function DisplayPosts({posts, users, postid}) {
    let postList = useSelector(state => postid !== undefined ? state.posts.replies : state.posts.posts)
    const currUser = useSelector(state => state.currUser)
    const dispatch = useDispatch()

    const [preview, setPreview] = useState(false)
    if (postid !== undefined) {
        postList = (postList.find(replies => replies.postId === postid)).replies
    }

    const post =  postList.find(post => post.postId === posts)
    const user = users.find(user => user.id === post.post.userId)

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
            }, 1000)
        }
    }

    const UserPreview = ({user}) => {
        setTimeout(()=>{
            const prev = document.querySelector("#preview")
            prev.classList.remove("opacity-0")
            prev.classList.add("opacity-100")
        },100)
        
        return (
        <div id="preview" className="absolute h-auto w-[350px] bg-[#ffffff] transition-all duration-300 z-10 top-12 left-3 p-3 border opacity-0" onMouseOut={hidePreview}>
            <div className="w-full flex justify-between items-start mb-2">
                <Link className="leading-5" to={"/profile/"+user.info.username}>
                    <div className="rounded-full w-[80px] h-[80px] bg-cover bg-no-repeat bg-center hover:brightness-75 transition-all duration-300" style={{backgroundImage:`url("${user.info.profilepicture}")`}}></div>
                </Link>
                {currUser.user.uid !== user.id ? <div className={"border px-4 py-1.5 bg-[#0f1419] rounded-full font-bold font-twitterchirp cursor-pointer text-[0.9rem] transition-all duration-400 " + (user.info.followers.includes(currUser.user.uid) ? "hover:border-[#f4212e] hover:bg-[#f4212e]/[.3] hover:text-[#f4212e] bg-[#ffffff] border-[#000000]" : "text-[#ffffff]")} onClick={()=>{dispatch(updateFollows(currUser.token, currUser.user.uid, user.info.username))}} onMouseOver={user.info.followers.includes(currUser.user.uid) ? (e)=>{e.currentTarget.innerText = "Unfollow"} : (e)=>{e.currentTarget.innerText = "Follow"}} onMouseOut={user.info.followers.includes(currUser.user.uid) ? (e)=>{e.currentTarget.innerText = "Following"} : (e)=>{e.currentTarget.innerText = "Follow"}}>{user.info.followers.includes(currUser.user.uid) ? "Following" : "Follow"}</div> : ""}
            </div>
            <div className="w-full">
                <Link className="leading-5" to={"/profile/"+user.info.username}>
                    <h1 className="font-bold text-[15px] font-chirp hover:underline">{user.info.name}</h1>
                    <span className="text-[#536471] font-chirp text-[13px]">@{user.info.username}</span>
                </Link>
                <div className="mt-3 font-chirp text-[15px] break-words	">
                    {user.info.description}
                </div>
                <div className="mt-3">
                    <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{user.info.following.length}</strong> Following</span>
                    <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{user.info.followers.length}</strong> Followers</span>
                </div>
            </div>
        </div>
    )}

    return (
    <article className="relative flex border-b border-[#1d9bf0]/[.1] transition-all duration-200" >
        {preview ? <UserPreview user={user}/> : ""}
        <Link to={"/"+user.info.username+"/post/"+post.postPath} className="w-full">
            <div className="px-3 py-2 hover:bg-[#ebebeb]/[.4] cursor-pointer flex">
                <div>
                    <Link to={"/profile/"+user.info.username}>
                        <div className="w-[50px] h-[50px] mr-2 bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full" style={{backgroundImage: `url('${user.info.profilepicture}')`}}  onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}></div>
                    </Link>
                </div>
                <div className="w-[90%]">
                    <div className="flex w-full items-start justify-between">
                        <div className="group" >
                            <span id="name" className="font-bold text-[15px] font-twitterchirp mr-2 group-hover:underline" onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}>{user.info.name}</span>
                            <span className="text-[15px] font-twitterchirp text-[#536471]"><span className="text-[12px]">@</span>{user.info.username}  {post.post.time}</span>
                        </div>
                        <div className="hover:bg-[#1D9BF0]/[.1] p-1.5 rounded-full">
                            <Dots w={12}/>
                        </div>
                    </div>
                    <p className="text-[#0f1419]/[.8] text-[15px] font-chirp leading-[20px] break-words">
                        {post.post.content}
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
