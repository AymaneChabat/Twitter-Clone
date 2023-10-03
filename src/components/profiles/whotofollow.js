import { Link } from "react-router-dom";
import VerifiedIcon from "../icons/profile/verified";
import { useDispatch, useSelector } from "react-redux";
import { updateFollows } from "../../redux/actions/userActions";
import UserPreview from "./userPreview";
import { useState } from "react";

function FollowProfile({data}) {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state => state.users)
    const followed = users.activeprofiles.find(user => user.id === currUser.user).info.following.includes(data.id)
    const [preview, setPreview] = useState(false)

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
        <Link to={"/profile/"+ data.info.username}>
            <div className='flex items-center hover:bg-[#7fc9fa]/[.1] cursor-pointer px-4 py-3 duration-300 transition-all relative'>
                {preview ? <UserPreview user={data} action={hidePreview}/> : ""}
                <div className='w-[50px] h-[50px] mr-2 rounded-full bg-no-repeat bg-cover'  style={{backgroundImage: `url("${data.info.profilepicture}")`}} onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}></div>
                <div className='flex flex-col leading-6'>
                    <span id="name" className="flex" onMouseOver={(e)=>{showPreview(e)}} onMouseOut={hidePreview}>
                        <span className='font-bold text-[17px] overflow-hidden max-w-[120px] text-ellipsis whitespace-nowrap mr-1.5'>{data.info.name}</span>
                        {data.info.username === "owner" ? <VerifiedIcon /> : ""}
                    </span>
                    <span className='text-[14px] text-[#000000]/[.8]'>@{data.info.username}</span>
                </div>
                {data.id !== currUser.user ? 
                <div className='px-4 py-1 rounded-full flex justify-center absolute right-0' onClick={(e)=>{e.preventDefault()}}>
                    <div className={"border px-4 py-1.5 bg-[#0f1419] rounded-full font-bold font-twitterchirp cursor-pointer text-[0.9rem] transition-all duration-400 " + (followed ? "hover:border-[#f4212e] hover:bg-[#f4212e]/[.3] hover:text-[#f4212e] bg-[#ffffff] border-[#000000]" : "text-[#ffffff]")} onClick={()=>{dispatch(updateFollows(currUser.token, currUser.user, data.info.username))}} onMouseOver={followed ? (e)=>{e.currentTarget.innerText = "Unfollow"} : (e)=>{e.currentTarget.innerText = "Follow"}} onMouseOut={followed ? (e)=>{e.currentTarget.innerText = "Following"} : (e)=>{e.currentTarget.innerText = "Follow"}}>{followed ? "Following" : "Follow"}</div>
                </div>  : ""}  
            </div>
        </Link>
  );
}

export default FollowProfile;
