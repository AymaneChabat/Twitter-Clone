import { Link } from "react-router-dom";
import VerifiedIcon from "../icons/profile/verified";
import { useDispatch, useSelector } from "react-redux";
import { updateFollows } from "../../redux/actions/userActions";
function FollowProfile({data}) {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.currUser)
    const user = useSelector(state => state.users)
    const followed = user.activeprofiles.find(user => user.id === currUser.user.uid).info.following.includes("4JUjE5h350cSaL1khXnkbBZ5snk1")
  return (
        <Link to={"/profile/"+ data.username}>
            <div className='flex items-center hover:bg-[#7fc9fa]/[.1] cursor-pointer px-4 py-3 duration-300 transition-all relative'>
                <div className='w-[50px] h-[50px] mr-2 rounded-full bg-no-repeat bg-cover'  style={{backgroundImage: `url("${data.profilepicture}")`}}></div>
                <div className='flex flex-col leading-6'>
                    <span className="flex"><span className='font-bold text-[17px] overflow-hidden max-w-[120px] text-ellipsis whitespace-nowrap mr-1.5'>{data.name}</span>{data.username === "owner" ? <VerifiedIcon /> : ""}</span>
                    <span className='text-[14px] text-[#000000]/[.8]'>@{data.username}</span>
                </div>
                {"4JUjE5h350cSaL1khXnkbBZ5snk1" !== currUser.user.uid ? 
                <div className='px-4 py-1 rounded-full flex justify-center absolute right-0' onClick={(e)=>{e.preventDefault()}}>
                    <div className={"border px-4 py-1.5 bg-[#0f1419] rounded-full font-bold font-twitterchirp cursor-pointer text-[0.9rem] transition-all duration-400 " + (followed ? "hover:border-[#f4212e] hover:bg-[#f4212e]/[.3] hover:text-[#f4212e] bg-[#ffffff] border-[#000000]" : "text-[#ffffff]")} onClick={()=>{dispatch(updateFollows(currUser.token, currUser.user.uid, data.username))}} onMouseOver={followed ? (e)=>{e.currentTarget.innerText = "Unfollow"} : (e)=>{e.currentTarget.innerText = "Follow"}} onMouseOut={followed ? (e)=>{e.currentTarget.innerText = "Following"} : (e)=>{e.currentTarget.innerText = "Follow"}}>{followed ? "Following" : "Follow"}</div>
                </div>  : ""}  
            </div>
        </Link>
  );
}

export default FollowProfile;
