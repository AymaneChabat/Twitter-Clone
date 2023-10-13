import { BackArrowIcon } from "../../components/icons/messages";
import { MessageIcon } from "../../components/icons/menu";
import ChoiceButtons from "../../components/buttons/choice";
import DisplayPosts from "../../components/posts/displayposts";
import UpdateUser from "./updateuser"
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from "react";
import { getUser, updateFollows } from "../../redux/actions/userActions";
import { getPost } from "../../redux/actions/postActions";
import { addSampleChat } from "../../redux/actions/chatActions";
import { useDispatch, useSelector } from 'react-redux';
import LoadingIcon from "../../components/icons/loading";
import { VerifiedIcon, CalendarIcon } from "../../components/icons/profile";


function Profile() {
  const [fullscreen, setFullScreen] = useState(false)

  const imageFS = (
      <div className="fullscreen fixed top-0 left-0 w-screen h-screen object-cover z-50 bg-[#000000]/[.8] flex justify-center items-center cursor-default" onClick={(e)=>{setFullScreen(false)}}>
          <img className="w-auto w-[600px] max-w-[90%] bg-[#ffffff] rounded-xl" src={fullscreen} loading="lazy"/>
      </div>
  )



  const choices = ["Posts", "Replies", "Media", "Likes"]
  const [chosen, setChosen] = useState("Posts")
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scrollPos, setScrollPos] = useState(0)
  const prevScroll = useRef(0)
  const currUser = useSelector(state=>state.currUser)
  const posts = useSelector(state=>state.posts)
  const users = useSelector(state=>state.users)
  const currUserFollowing = users.activeprofiles.find(user => user.id === currUser.user).info.following
  const username = params.username
  const foundUser = users.activeprofiles.find(user => user.info !== undefined ? user.info.username === username : "");
  const {id, info} = foundUser !== undefined ? foundUser : {};
  var postsFound = posts[chosen.toLowerCase() === "posts" ? "profile" : chosen.toLowerCase()].find(posts => posts.user === id)
  const sampleChat = Math.floor(100000 + Math.random() * 900000)

  const goBack = () => {
    navigate(-1); // This function takes you back to the previous URL
  };

  useEffect(()=>{
    dispatch(getUser(username, currUser.token))
  }, [])

  useEffect(()=>{
    const element = document.querySelector("#profile")
    if (id !== undefined && loading === false) {
      const userPosts = posts[chosen.toLowerCase() === "posts" ? "profile" : chosen.toLowerCase()].find(posts => posts.user === id)
      if (userPosts === undefined) {
        dispatch(getPost(undefined, chosen.toLowerCase() === "posts" ? "profile" : chosen.toLowerCase(), chosen.toLowerCase() !== "replies" && chosen.toLowerCase() !== "likes" ? undefined : 0, username, currUser.token, setLoading))
      } else if (prevScroll.current < scrollPos && scrollPos + element.clientHeight === element.scrollHeight) {
        dispatch(getPost(undefined, chosen.toLowerCase() === "posts" ? "profile" : chosen.toLowerCase(), chosen.toLowerCase() !== "replies" && chosen.toLowerCase() !== "likes" ? userPosts.posts[userPosts.posts.length - 1] : userPosts.posts.length, username, currUser.token, setLoading))
      }
    }
    prevScroll.current = scrollPos
  }, [username, chosen, scrollPos, id])

  const UserActions = () => (
    currUser.user === id 
      ? 
      <div className="border px-4 py-1.5 bg-[#ffffff] dark:text-[#ffffff] dark:bg-[#000000] dark:hover:bg-[#ffffff]/[.1] rounded-full font-bold font-twitterchirp text-[#0f1419] hover:bg-[#0f1419]/[.1] cursor-pointer text-[0.9rem] transition-all duration-300 pointer-events-auto" onClick={()=>{setUpdating(true)}}>Edit profile</div> 
      : 
      <div className="flex items-center pointer-events-auto">
          <div onClick={()=>{dispatch(addSampleChat(currUser.token, currUser.user, id, sampleChat, navigate))}} className="border rounded-full p-2 m-3 cursor-pointer">
            <MessageIcon picked={"profile"}/>
          </div>
        <div className={"border px-4 py-1.5 bg-[#0f1419] rounded-full font-bold font-twitterchirp cursor-pointer text-[0.9rem] transition-all duration-400 " + (currUserFollowing.includes(id) ? "hover:border-[#f4212e] hover:bg-[#f4212e]/[.3] hover:text-[#f4212e] bg-[#ffffff] border-[#000000]" : "text-[#ffffff]")} onClick={()=>{dispatch(updateFollows(currUser.token, currUser.user, info.username))}} onMouseOver={currUserFollowing.includes(id) ? (e)=>{e.currentTarget.innerText = "Unfollow"} : (e)=>{e.currentTarget.innerText = "Follow"}} onMouseOut={currUserFollowing.includes(id) ? (e)=>{e.currentTarget.innerText = "Following"} : (e)=>{e.currentTarget.innerText = "Follow"}}>{currUserFollowing.includes(id) ? "Following" : "Follow"}</div>
      </div>
  )

  const Connections = () => (
    <div className="mt-3">
        <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{id === currUser.user ? info.following.length : info.following}</strong> Following</span>
        <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{id === currUser.user ? info.followers.length : info.followers}</strong> Followers</span>
    </div>
  )

  return (
    id !== undefined ? 
      <Fragment>
          {updating && <UpdateUser setUpdating={setUpdating} user={info}/>}
          {fullscreen && imageFS}
          <div id="profile" className='box-border s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto relative mb-[60px] s6:mb-0 dark:border-[#ffffff]/[.3]' onScroll={(e)=>{setScrollPos(e.currentTarget.scrollTop)}}>
            <div className="w-full box-border px-3 h-[60px] flex items-center justify-between bg-transparent z-50">
              <div className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer" onClick={goBack}>
                  <BackArrowIcon w={20}/>
              </div>
              <div className="leading-6 w-[90%]">
                <h1 className="flex mr-1 cursor-default">
                    <span id="name" className="font-bold text-[16px] mr-1.5 dark:text-[#ffffff]">{info.name}</span> 
                    {info.username === "owner" && <VerifiedIcon />}
                </h1>
                <span className="text-[#536471]">{postsFound !== undefined ? postsFound.posts.length : 0} posts</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[260px] bg-cover bg-no-repeat hover:brightness-75 transition-all duration-300 relative cursor-pointer" style={{backgroundImage:`url("${info.banner}")`}} onClick={()=>{setFullScreen(info.banner)}}></div>
              <div className="absolute w-full h-[155px] s6:top-[180px] top-[160px] flex justify-between items-end px-5 pointer-events-none">
                  <div className="s6:w-[155px] s6:h-[155px] rounded-full border-4 border-[#ffffff] w-[100px] h-[100px] bg-cover bg-no-repeat bg-center overflow-hidden dark:border-[#000000]">
                    <img className="hover:brightness-75 z-50 transition-all duration-300 cursor-pointer h-full w-full pointer-events-auto" onClick={()=>{setFullScreen(info.profilepicture)}} src={info.profilepicture} />
                  </div>
                  <UserActions />
              </div>
              <div className="w-full s6:mt-[100px] mt-[80px] px-3">
                  <div className="leading-6">
                    <h1 className="flex mr-1 cursor-default">
                        <span id="name" className="font-bold text-[15px] hover:underline mr-1.5 dark:text-[#ffffff]">{info.name}</span>
                        {info.username === "owner" && <VerifiedIcon />}
                    </h1>
                    <span className="text-[#536471] font-chirp text-[18px]">@{params.username}</span>
                  </div>
                  <div className="mt-3 font-chirp text-[18px] break-words	dark:text-[#ffffff]">
                    {info.description}
                  </div>
                  <div className="flex items-center mt-1">
                      <span className="relative group flex text-[#536471] hover:underline text-[15px] ml-1 cursor-default">
                        <CalendarIcon w={21}/>
                        Joined October 2020
                        <div class="absolute left-1/2 transform -translate-x-1/2 translate-y-[100%] bg-black text-white rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-300 text-[13px] w-full pointer-events-none">20 / 05 / 2003</div>
                      </span>
                  </div>
                  <Connections />
              </div>
              <div className="mt-3">
                <ChoiceButtons choices={choices} setChosen={setChosen}/>
              </div>
              {postsFound !== undefined &&
                postsFound.posts.map((post, index) => 
                chosen !== "Replies" ? 
                  <DisplayPosts postPath={post} users={users.activeprofiles} key={index} postList={posts.posts}/> 
                :
                  <Fragment>
                    <DisplayPosts postPath={post.mainPost} users={users.activeprofiles} key={index + "1"} postList={posts.posts} main={true}/>
                    <DisplayPosts postPath={post.replyPost} users={users.activeprofiles} key={index + "2"} postList={posts.posts} reply={true}/>
                  </Fragment>
                )  
              }
              {loading && <LoadingIcon />}
            </div>
          </div>
      </Fragment>
            : 
      <Fragment>
          <div className='box-border s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto relative mb-[60px] s6:mb-0'>
            <div className="w-full box-border px-3 h-[60px] flex items-center justify-between bg-transparent z-50">
              <div className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer" onClick={goBack}>
                  <BackArrowIcon w={20}/>
              </div>
              <div className="leading-6 w-[90%]">
                <h1 className="flex mr-1 cursor-default">
                    <span id="name" className="font-bold text-[16px] mr-1.5 dark:text-[#ffffff]">Profile</span>
                </h1>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[260px] bg-cover bg-no-repeat hover:brightness-75 transition-all duration-300 relative cursor-pointer" style={{backgroundImage:`url("https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-banner.png?alt=media&token=9c871edd-35ca-43c2-8e2f-4076775e7135")`}} onClick={()=>{setFullScreen("https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-banner.png?alt=media&token=9c871edd-35ca-43c2-8e2f-4076775e7135")}}></div>
              <div className="absolute w-full h-[155px] s6:top-[180px] top-[160px] flex justify-between items-end px-5 pointer-events-none">
                <div className="s6:w-[155px] s6:h-[155px] rounded-full border-4 border-[#ffffff] w-[100px] h-[100px] bg-cover bg-no-repeat bg-center overflow-hidden dark:border-[#000000]">
                  <img className="hover:brightness-75 z-50 transition-all duration-300 cursor-pointer h-full w-full pointer-events-auto" onClick={()=>{setFullScreen("https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-profile.png?alt=media&token=38761a1a-ce9c-4356-9589-96a70069e795")}} src={"https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-profile.png?alt=media&token=38761a1a-ce9c-4356-9589-96a70069e795"} />
                </div>
              </div>
              <div className="w-full s6:mt-[100px] mt-[80px] px-6 leading-6">
                <span className="text-[#000000] dark:text-[#ffffff] text-[20px] font-bold">@{params.username}</span>
              </div>
              <div className="mx-auto w-[55%] mt-8">
                <h1 className="text-[31px] dark:text-[#ffffff] font-bold">This account doesn't exist</h1>
                <span className="text-[#536471]">Try searching for another</span>
              </div>
            </div>
          </div>
      </Fragment>
  );
}

export default Profile;
