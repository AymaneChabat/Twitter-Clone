import TabNavigation from "../../components/buttons/tab_navigation";
import { IconTwitter } from "../../components/icons/logos";
import HomePost from "../../components/posts/home-post";
import EditIcon from "../../components/icons/edit";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import UpdateUsername from "../../components/profiles/updateUsername";
import DisplayPosts from "../../components/posts/displayposts";
import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Main() {
  const w = useMediaQuery("(min-width:600px)")
  const { color, theme } = useSelector((state) => ({color: state.color.color, theme: state.color.theme}));
  const currUser = useSelector((state) => state.currUser);
  const users = useSelector((state) => state.users);
  const [tab, setTab] = useState('For you');
  const [updating, setUpdating] = useState(false);
  const location = useLocation()

  const localChoices = ['For you', 'Following'];
  const modes = {
    "dark": "dark:bg-[#000000]/[.5]",
    "dim": "dark:bg-[#15202b]/[.5]"
  }

  const Header = React.useMemo(() => (
    <div className={"w-full h-auto bg-[#ffffff]/[.7] bg-blur backdrop-blur-md sticky top-0 z-20 overflow-hidden "+(modes[theme])}>
      <div className="py-3 px-2">
        <header className="ml-1 text-[18px] text-400 font-bold hidden items-center mr-4 s6:flex justify-between items-center">
          <h1 className="dark:text-[#ffffff]">Home</h1>
          <span onClick={() => setUpdating(true)}>
            <EditIcon />
          </span>
        </header>
        <div className="block s6:hidden px-2 flex items-center pb-2">
          <div className="w-[46.5%]">
            <Link to={"/menu"} state={{ previousLocation: location }}>
              <div className="bg-[#000000] h-[30px] w-[30px] rounded-full"></div>
            </Link>
          </div>
          <IconTwitter clas="w-[25px]" />
        </div>
      </div>
      <TabNavigation onTabSelect={setTab} tabLabels={localChoices}/>
    </div>
  ), [tab, theme]);

  return (
    <div
      id="home"
    >
      <AnimatePresence mode="wait">
        {updating && (
          <UpdateUsername
            setUpdating={setUpdating}
            username={users.activeprofiles.find((user) => user.id === currUser.user).info.username}
          />
        )}
      </AnimatePresence>
      {Header}
      <div className="h-[90.4%]">
        {w && <HomePost color={color} />}
        <DisplayPosts user={undefined} tab={tab === 'For you' ? 'home' : 'following'} />
      </div>
    </div>
  );
}

export default Main;
