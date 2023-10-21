import ChoiceButtons from "../../components/buttons/choice";
import { IconTwitter } from "../../components/icons/logos";
import SlideMenu from "../../components/menu/menu-types/slide-menu-sm";
import HomePost from "../../components/posts/home-post";
import EditIcon from "../../components/icons/edit";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import UpdateUsername from "../../components/profiles/updateUsername";
import DisplayPosts from "../../components/posts/displayposts";

function Main({ setOpened, opened, w }) {
  const color = useSelector((state) => state.color.color);
  const currUser = useSelector((state) => state.currUser);
  const users = useSelector((state) => state.users);
  const [tab, setTab] = useState("For you");
  const [updating, setUpdating] = useState(false);


  const localChoices = ["For you", "Following"];
  const Header = React.useMemo(() => (
      <div className="w-full h-auto bg-transparent bg-blur backdrop-blur-md sticky top-0 z-20 overflow-hidden">
        <div className="py-3 px-2">
          <header className="ml-1 text-[18px] text-400 font-bold hidden items-center mr-4 s6:flex justify-between items-center">
            <h1 className="dark:text-[#ffffff]">Home</h1>
            <span
              onClick={() => {
                setUpdating(true);
              }}
            >
              <EditIcon />
            </span>
          </header>
          <div className="block s6:hidden px-2 flex items-center pb-2">
            <div className="w-[46.5%]">
              <div
                className="bg-[#000000] h-[30px] w-[30px] rounded-full"
                onClick={() => {
                  setOpened(true)
                }}
              ></div>
            </div>
            <IconTwitter clas={"w-[25px]"} />
          </div>
        </div>
        <ChoiceButtons color={color} choices={localChoices} setChosen={setTab} />
      </div>
  ), [tab])

  return (
    <section 
      id="home"
      className="s10:max-w-[32%] s10:min-w-[600px] flex-grow border-l border-r dark:border-[#ffffff]/[.3] border-[#1d9bf0]/[.1] s6:mb-0 s6:h-auto h-[93%] overflow-y-auto overflow-x-hidden"
      >
      <AnimatePresence mode="wait">
        {updating && <UpdateUsername setUpdating={setUpdating} username={users.activeprofiles.find((user) => user.id === currUser.user).info.username}/>}
      </AnimatePresence>
      {Header}
      <div className="h-[90.4%]">
        {w >= 600 ? <HomePost color={color} /> : ""}
        {<DisplayPosts  user={undefined} tab={tab === "For you" ? "home" : "following"}/>}
      </div>
    </section>
  );
}

export default Main;
