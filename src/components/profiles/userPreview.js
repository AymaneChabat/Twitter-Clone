import { Link } from "react-router-dom";
import { VerifiedIcon } from "../icons/profile";
import { useDispatch, useSelector } from "react-redux";
import { updateFollows } from "../../redux/actions/userActions";

function UserPreview({user, action}) {
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state => state.users.activeprofiles)
    const followed = users.find(user => user.id === currUser.user).info.following.includes(user.id)
    const dispatch = useDispatch()

    return (
        <div id="preview" className="animate-fade-in absolute h-auto w-[350px] bg-[#ffffff] dark:bg-[#000000] dark:border-[#ffffff]/[.2] transition-all duration-300 z-10 top-12 left-3 p-3 border" onMouseOut={action}>
            <div className="w-full flex justify-between items-start mb-2">
                <Link className="leading-5" to={"/"+user.info.username}>
                    <div className="rounded-full w-[80px] h-[80px] bg-cover bg-no-repeat bg-center hover:brightness-75 transition-all duration-300" style={{backgroundImage:`url("${user.info.profilepicture}")`}}></div>
                </Link>
                {currUser.user !== user.id ? <div className={"border px-4 py-1.5 bg-[#0f1419] rounded-full font-bold font-twitterchirp cursor-pointer text-[0.9rem] transition-all duration-400 " + (followed ? "hover:border-[#f4212e] hover:bg-[#f4212e]/[.3] hover:text-[#f4212e] bg-[#ffffff] border-[#000000]" : "text-[#ffffff]")} onClick={()=>{dispatch(updateFollows(currUser.token, currUser.user, user.info.username))}} onMouseOver={followed ? (e)=>{e.currentTarget.innerText = "Unfollow"} : (e)=>{e.currentTarget.innerText = "Follow"}} onMouseOut={followed ? (e)=>{e.currentTarget.innerText = "Following"} : (e)=>{e.currentTarget.innerText = "Follow"}}>{followed ? "Following" : "Follow"}</div> : ""}
            </div>
            <div className="w-full">
                <Link className="leading-5" to={"/"+user.info.username}>
                    <h1 className="flex">
                        <span className="font-bold text-[15px] hover:underline mr-1.5 dark:text-[#ffffff]">{user.info.name}</span> 
                        {user.info.username === "owner" ? <VerifiedIcon /> : ""}
                    </h1>
                    <span className="text-[#536471] text-[13px]">@{user.info.username}</span>
                </Link>
                <div className="mt-3 text-[15px] break-words dark:text-[#ffffff]">
                    {user.info.description}
                </div>
                <div className="mt-3">
                    <span className="text-[#536471] ml-1 mt-1 text-sm mx-3 dark:text-[#ffffff]"><strong>{user.id === currUser.user ? user.info.following.length : user.info.following}</strong> Following</span>
                    <span className="text-[#536471] ml-1 mt-1 text-sm mx-3 dark:text-[#ffffff]"><strong>{user.id === currUser.user ? user.info.followers.length : user.info.followers}</strong> Followers</span>
                </div>
            </div>
        </div>
    );
  }
  
  export default UserPreview;
  