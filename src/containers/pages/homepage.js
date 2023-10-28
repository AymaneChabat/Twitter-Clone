import {
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { IconTwitter } from "../../components/icons/logos";
import FinalMenu from "../../containers/homepage/menu";
import LastContainer from "../homepage/last-container";
import Main from "../homepage/home";
import Explore from "../homepage/explore";
import Messages from "../homepage/messages";
import Profile from "../homepage/profile";
import Post from "../homepage/post";
import UpdateDisplay from "../homepage/updateDisplays";
import FloatingPost from "../../components/posts/floating_post";
import SlideMenu from "../../components/menu/menu-types/slide-menu-sm";


function Template() {
  const location = useLocation()
  const currUser = useSelector((state) => state.currUser);
  const users = useSelector((state) => state.users);
  const previousLocation = location.state?.previousLocation;

  const elements = [
    ["/home", <Main />],
    ["/explore", <Explore />],
    ["/messages/:chat?/info?", <Messages />],
    ["/:username", <Profile />],
    ["/:username/*", <Post />],
    ["/", <NotFound to="/home" />],
  ];

  function NotFound() {
    return <Navigate to="/home" />;
  }

  return (
    users.activeprofiles.find((user) => user.id === currUser.user) ? (
      <div
        onScroll={(e) => {
          document.querySelector("#childDiv").scrollTop =
            e.currentTarget.scrollTop;
        }}
        id="MainDiv"
        className="flex h-screen overflow-hidden"
      >
        <FinalMenu />
        <section id="main" className="box-border s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto mb-[60px] s6:mb-0 dark:border-[#ffffff]/[.3]">
          <Routes location={previousLocation || location}>
            {
              elements.map((element, index) => (
                <Route path={element[0]} element={element[1]} key={index} />
              ))
            }
          </Routes>
          {previousLocation && (
            <Routes>
              <Route path="/display" element={<UpdateDisplay />} />
              <Route path="/compose/post" element={<FloatingPost />}/>
              <Route path="/menu" element={<SlideMenu />}/>
            </Routes>
          )}
        </section>
        <LastContainer />
      </div>
    ) : <div className='w-full h-full bg-[#ffffff] flex justify-center items-center absolute animate-fade-out'><IconTwitter clas={"h-[50px] animate-bounce"}/></div>
  );
}

export default Template;
