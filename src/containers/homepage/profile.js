import { BackArrowIcon } from "../../components/icons/messages";
import TabNavigation from "../../components/buttons/tab_navigation";
import UpdateUser from "../../components/profiles/updateuser";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { getUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { VerifiedIcon } from "../../components/icons/profile";
import User404 from "../../components/profiles/user404";
import UserProfile from "../../components/profiles/userProfile";
import DisplayPosts from "../../components/posts/displayposts";
import { AnimatePresence } from "framer-motion";

function Profile() {
  const tabs = ["Posts", "Replies", "Media", "Likes"];
  const [activeTab, setActiveTab] = useState("Posts");
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const currUser = useSelector((state) => state.currUser);
  const users = useSelector((state) => state.users);
  const username = params.username;
  const foundUser = users.activeprofiles.find((user) =>user.info !== undefined ? user.info.username === username : "");
  const { id, info } = foundUser !== undefined ? foundUser : {};
  const [fullscreen, setFullScreen] = useState(false);

  const imageFS = (
    <div
      className="fullscreen fixed top-0 left-0 w-screen h-screen object-cover z-50 bg-[#000000]/[.8] flex justify-center items-center cursor-default"
      onClick={() => {
        setFullScreen(false);
      }}
    >
      <img
        className="w-auto w-[600px] max-w-[90%] bg-[#ffffff] rounded-xl"
        src={fullscreen}
        loading="lazy"
      />
    </div>
  );

  const goBack = () => {
    navigate(-1); // This function takes you back to the previous URL
  };

  useEffect(() => {
    dispatch(getUser(username, currUser.token));
  }, []);

  return id !== undefined ? (
    <Fragment>
      {fullscreen && imageFS}
      <AnimatePresence mode="sync">
        {updating && <UpdateUser setUpdating={setUpdating} user={info} />}
      </AnimatePresence>
      <div
        id="profile"
        >
        <div className="w-full box-border px-3 h-[60px] flex items-center justify-between bg-transparent z-50">
          <div
            className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer"
            onClick={goBack}
          >
            <BackArrowIcon w={20} />
          </div>
          <div className="leading-6 w-[90%]">
            <h1 className="flex mr-1 cursor-default">
              <span
                id="name"
                className="font-bold text-[16px] mr-1.5 dark:text-[#ffffff]"
              >
                {info.name}
              </span>
              {info.username === "owner" && <VerifiedIcon />}
            </h1>
            <span className="text-[#536471]">
              posts
            </span>
          </div>
        </div>
        <div className="relative">
          <UserProfile profile={{ id, info }} setFullScreen={setFullScreen} setUpdating={setUpdating}/>
          <div className="mt-3">
                <TabNavigation onTabSelect={setActiveTab} tabLabels={tabs} />
          </div>
        </div>
        <DisplayPosts tab={activeTab.toLowerCase() === "posts" ? "profile" : activeTab.toLowerCase()} user={{id, info}}/>
      </div>
    </Fragment>
  ) : (
    <User404 setFullScreen={setFullScreen} username={params.username}/>
  );
}

export default Profile;