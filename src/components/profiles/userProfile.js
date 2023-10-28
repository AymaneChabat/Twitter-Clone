import { VerifiedIcon, CalendarIcon } from "../icons/profile";
import { addSampleChat } from "../../redux/actions/chatActions";
import { updateFollows } from "../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { MessageIcon } from "../icons/menu";
import { useNavigate } from "react-router";

export default function UserProfile({profile, setFullScreen, setUpdating}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const users = useSelector((state) => state.users);
    const currUser = useSelector((state) => state.currUser);
    const currUserFollowing = users.activeprofiles.find((user) => user.id === currUser.user).info.following;
    const sampleChat = Math.floor(100000 + Math.random() * 900000);
    const { id, info } = profile

    const UserActions = () =>
    currUser.user === id ? (
      <div
        className="border px-4 py-1.5 bg-[#ffffff] dark:text-[#ffffff] dark:bg-[#000000] dark:hover:bg-[#ffffff]/[.1] rounded-full font-bold font-twitterchirp text-[#0f1419] hover:bg-[#0f1419]/[.1] cursor-pointer text-[0.9rem] transition-all duration-300 pointer-events-auto"
        onClick={() => {
          setUpdating(true);
        }}
      >
        Edit profile
      </div>
    ) : (
      <div className="flex items-center pointer-events-auto">
        <div
          onClick={() => {
            dispatch(
              addSampleChat(
                currUser.token,
                currUser.user,
                id,
                sampleChat,
                navigate
              )
            );
          }}
          className="border rounded-full p-2 m-3 cursor-pointer"
        >
          <MessageIcon picked={"profile"} />
        </div>
        <div
          className={
            "border px-4 py-1.5 bg-[#0f1419] rounded-full font-bold font-twitterchirp cursor-pointer text-[0.9rem] transition-all duration-400 " +
            (currUserFollowing.includes(id)
              ? "hover:border-[#f4212e] hover:bg-[#f4212e]/[.3] hover:text-[#f4212e] bg-[#ffffff] border-[#000000]"
              : "text-[#ffffff]")
          }
          onClick={() => {
            dispatch(
              updateFollows(currUser.token, currUser.user, info.username)
            );
          }}
          onMouseOver={
            currUserFollowing.includes(id)
              ? (e) => {
                  e.currentTarget.innerText = "Unfollow";
                }
              : (e) => {
                  e.currentTarget.innerText = "Follow";
                }
          }
          onMouseOut={
            currUserFollowing.includes(id)
              ? (e) => {
                  e.currentTarget.innerText = "Following";
                }
              : (e) => {
                  e.currentTarget.innerText = "Follow";
                }
          }
        >
          {currUserFollowing.includes(id) ? "Following" : "Follow"}
        </div>
      </div>
    );

    const Connections = () => (
        <div className="mt-3">
        <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3">
            <strong>
            {id === currUser.user ? info.following.length : info.following}
            </strong>
            &nbsp; Following
        </span>
        <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3">
            <strong>
            {id === currUser.user ? info.followers.length : info.followers}
            </strong>
            &nbsp; Followers
        </span>
        </div>
    );
    return(
        <>
            <div
                className="w-full h-[260px] bg-cover bg-no-repeat hover:brightness-75 transition-all duration-300 relative cursor-pointer"
                style={{ backgroundImage: `url("${info.banner}")` }}
                onClick={() => {
                setFullScreen(info.banner);
                }}
            ></div>
            <div className="absolute w-full h-[155px] s6:top-[180px] top-[160px] flex justify-between items-end px-5 pointer-events-none">
                <div className="s6:w-[155px] s6:h-[155px] rounded-full border-4 border-[#ffffff] w-[100px] h-[100px] bg-cover bg-no-repeat bg-center overflow-hidden dark:border-[#000000]">
                <img
                    className="hover:brightness-75 z-50 transition-all duration-300 cursor-pointer h-full w-full pointer-events-auto"
                    onClick={() => {
                    setFullScreen(info.profilepicture);
                    }}
                    src={info.profilepicture}
                />
                </div>
                <UserActions />
            </div>
            <div className="w-full s6:mt-[100px] mt-[80px] px-3">
                <div className="leading-6">
                <h1 className="flex mr-1 cursor-default">
                    <span
                    id="name"
                    className="font-bold text-[15px] hover:underline mr-1.5 dark:text-[#ffffff]"
                    >
                    {info.name}
                    </span>
                    {info.username === "owner" && <VerifiedIcon />}
                </h1>
                <span className="text-[#536471] font-chirp text-[18px]">
                    @{info.username}
                </span>
                </div>
                <div className="mt-3 font-chirp text-[18px] break-words	dark:text-[#ffffff]">
                {info.description}
                </div>
                <div className="flex items-center mt-1">
                <span className="relative group flex text-[#536471] hover:underline text-[15px] ml-1 cursor-default">
                    <CalendarIcon w={21} />
                    Joined October 2020
                    <div class="absolute left-1/2 transform -translate-x-1/2 translate-y-[100%] bg-black text-white rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 text-[13px] w-full pointer-events-none">
                    20 / 05 / 2003
                    </div>
                </span>
                </div>
                <Connections />
            </div>
          </>
    )
}