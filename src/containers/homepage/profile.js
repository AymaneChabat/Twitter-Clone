import BackArrowIcon from "../../components/icons/messages/backArrow";
import CalendarIcon from "../../components/icons/profile/calendar";
import MessageIcon from "../../components/icons/menu/message";
import ChoiceButtons from "../../components/buttons/choice";
import DisplayPosts from "../../components/posts/displayposts";
import UpdateUser from "./updateuser"
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from "react";
import { getUsers } from "../../redux/actions/userActions";
import { getPost } from "../../redux/actions/postActions";
import { addSampleChat } from "../../redux/actions/chatActions";
import { useDispatch, useSelector } from 'react-redux';


function Profile() {

  const choices = ["Posts", "Replies", "Media", "Likes"]
  const [chosen, setChosen] = useState("Posts")
  const params = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)
  const currUser = useSelector(state=>state.currUser)
  const posts = useSelector(state=>state.posts)
  const users = useSelector(state=>state.users)
  const username = params.username
  const user = users.activeprofiles.find(user => user.info.username === username) !== undefined ? users.activeprofiles.find(user => user.info.username === username) : {}
  var postsFound = posts[chosen.toLowerCase() === "posts" ? "profile" : chosen.toLowerCase()].find(posts => posts.user === user.id)
  const sampleChat = Math.floor(100000 + Math.random() * 900000)



  const goBack = () => {
    navigate(-1); // This function takes you back to the previous URL
  };

  
  useEffect(()=>{
    if (JSON.stringify(user) === '{}') {
      dispatch(getUsers(undefined, username, currUser.token, "profile"))
    }
    switch(chosen) {
      case "Posts":
        if (posts.profile.find(posts => posts.user === user.id) === undefined) {
          dispatch(getPost(undefined, "profile", undefined, username))
        }
        return
      case "Likes":
        if (posts.likes.find(posts => posts.user === user.id) === undefined) {
          dispatch(getPost(undefined, "likes", 0, username))
        }
        return
      case "Media":
        if (posts.media.find(posts => posts.user === user.id) === undefined) {
          dispatch(getPost(undefined, "media", 0, username))
        }
        return
    }
  }, [username, chosen])
  
  return (
      <Fragment>
        {JSON.stringify(user) !== "{}" 
        ? 
        <>
          { updating ? <UpdateUser setUpdating={setUpdating} user={user.info}/> : "" }
          <div className='box-border s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto relative mb-[60px] s5:mb-0'>
            <div className="w-full box-border px-3 h-[60px] border-b flex items-center justify-between bg-[#ffffff] z-50">
              <div className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer" onClick={goBack}>
                  <BackArrowIcon w={20}/>
              </div>
              <div className="leading-6 w-[90%]">
                  <h1 className="font-bold text-[22px] font-chirp">{user.info.name}</h1>
                  <span className="text-[#536471] font-chirp">{user.info.posts.length} posts</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[260px] bg-cover bg-no-repeat bg-center" style={{backgroundImage:`url("${user.info.banner}")`}}></div>
              <div className="absolute w-full z-40 h-[155px] s5:top-[180px] top-[160px] flex justify-between items-end px-5">
                  <div className="s5:w-[155px] s5:h-[155px] rounded-full border-4 border-[#ffffff] w-[100px] h-[100px] bg-cover bg-no-repeat bg-center" style={{backgroundImage:`url("${user.info.profilepicture}")`}}></div>
                  {currUser.user.uid === user.id 
                  ? 
                  <div className="border px-4 py-1.5 bg-[#ffffff] rounded-full font-bold font-twitterchirp text-[#0f1419] hover:bg-[#0f1419]/[.1] cursor-pointer text-[0.9rem]" onClick={()=>{setUpdating(true)}}>Edit profile</div> 
                  : 
                  <div className="flex items-center">
                      <div onClick={()=>{dispatch(addSampleChat(currUser.token, currUser.user.uid, user.id, sampleChat, navigate))}} className="border rounded-full p-2 m-3 cursor-pointer">
                        <MessageIcon picked={"profile"}/>
                      </div>
                    <div className="border px-4 py-1.5 bg-[#0f1419] rounded-full font-bold font-twitterchirp text-[#ffffff] cursor-pointer text-[0.9rem]">Follow</div>
                  </div>}
              </div>
              <div className="w-full s5:mt-[100px] mt-[80px] px-3">
                  <div className="leading-6">
                      <h1 className="font-bold text-[20px] font-chirp">{user.info.name}</h1>
                      <span className="text-[#536471] font-chirp text-[18px]">@{user.info.username}</span>
                  </div>
                  <div className="mt-3 font-chirp text-[18px] break-words	">
                    {user.info.description}
                  </div>
                  <div className="flex items-center mt-1">
                      <CalendarIcon w={21}/>
                      <span className="text-[#536471] hover: font-chirp text-[15px] ml-1">Joined October 2020</span>
                  </div>
                  <div className="mt-3">
                      <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{user.info.following.length}</strong> Following</span>
                      <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{user.info.followers.length}</strong> Followers</span>
                  </div>
              </div>
              <div className="mt-3">
                  <ChoiceButtons choices={choices} setChosen={setChosen}/>
              </div>
              {postsFound !== undefined ? <DisplayPosts posts={postsFound.posts} users={users.activeprofiles}/> : ""}
            </div>
          </div>
        </>
        : 
        ""}
      </Fragment>
  );
}

export default Profile;
