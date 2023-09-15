import BackArrowIcon from "../../components/icons/messages/backArrow";
import CalendarIcon from "../../components/icons/profile/calendar";
import ChoiceButtons from "../../components/buttons/choice";
import DisplayPosts from "../../components/posts/displayposts";
import UpdateUser from "./updateuser"
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from "react";
import { getUsers } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from 'react-redux';


function Profile() {

  const choices = ["Posts", "Replies", "Highlights", "Media", "Likes"]
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [updating, setUpdating] = useState(false)
  const currUser = useSelector(state=>state.currUser)
  const posts = useSelector(state=>state.posts)
  const users = useSelector(state=>state.users)
  const username = window.location.pathname.split("/")[2]
  var user = users.activeprofiles.find(user => user.username === username)



  const goBack = () => {
    navigate(-1); // This function takes you back to the previous URL
  };

  useEffect(()=>{
    dispatch(getUsers("Ptr2QGXgbDKnv130PnaN", undefined, currUser.token))
  }, [])


  return (
      <Fragment>
        {user !== undefined 
        ? 
        <>
          { updating ? <UpdateUser setUpdating={setUpdating} user={user}/> : "" }
          <div className='box-border s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto relative mb-[60px] s5:mb-0'>
            <div className="w-full box-border px-3 h-[60px] border-b flex items-center justify-between bg-[#ffffff] z-50">
              <div className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer" onClick={goBack}>
                  <BackArrowIcon w={20}/>
              </div>
              <div className="leading-6 w-[90%]">
                  <h1 className="font-bold text-[22px] font-chirp">{user.name}</h1>
                  <span className="text-[#536471] font-chirp">{user.posts.length} posts</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[260px] bg-cover bg-no-repeat bg-center" style={{backgroundImage:`url("${user.banner}")`}}></div>
              <div className="absolute w-full z-40 h-[155px] s5:top-[180px] top-[160px] flex justify-between items-end px-5">
                  <div className="s5:w-[155px] s5:h-[155px] rounded-full border-4 border-[#ffffff] w-[100px] h-[100px] bg-cover bg-no-repeat" style={{backgroundImage:`url("${user.profilepicture}")`}}></div>
                  <div className="border px-4 py-1.5 bg-[#ffffff] rounded-full font-bold font-twitterchirp text-[#0f1419] hover:bg-[#0f1419]/[.1] cursor-pointer text-[0.9rem]" onClick={()=>{setUpdating(true)}}>Edit profile</div>
              </div>
              <div className="w-full s5:mt-[100px] mt-[80px] px-3">
                  <div className="leading-6">
                      <h1 className="font-bold text-[20px] font-chirp">{user.name}</h1>
                      <span className="text-[#536471] font-chirp text-[18px]">@{user.username}</span>
                  </div>
                  <div className="mt-3 font-chirp text-[18px] break-words	">
                    super cool and nice guy
                  </div>
                  <div className="flex items-center mt-1">
                      <CalendarIcon w={21}/>
                      <span className="text-[#536471] font-chirp text-[18px] ml-1 mt-1">Joined October 2020</span>
                  </div>
                  <div className="mt-3">
                      <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{user.following.length}</strong> Following</span>
                      <span className="text-[#536471] font-chirp ml-1 mt-1 text-sm mx-3"><strong>{user.followers.length}</strong> Followers</span>
                  </div>
              </div>
              <div className="mt-3">
                  <ChoiceButtons choices={choices}/>
              </div>
              <DisplayPosts />
            </div>
          </div>
        </>
        : 
        ""}
      </Fragment>
  );
}

export default Profile;
