import ChoiceButtons from "../../components/buttons/choice";
import { IconTwitter } from "../../components/icons/logos";
import LoadingIcon from "../../components/icons/loading";
import SlideMenu from "../../components/menu/menu-types/slide-menu-sm";
import HomePost from "../../components/posts/home-post";
import DisplayPost from "../../components/posts/displayposts";
import EditIcon from "../../components/icons/edit";
import { getPost } from "../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { updateUser } from "../../redux/actions/userActions";
import CredentialInput from "../../components/inputs/credentials";
import CredentialButton from "../../components/buttons/credentials";

function Main({ setOpened, opened, w }) {
  const color = useSelector((state) => state.color.color);

  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUser);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("For you");
  const prevScrollY = useRef(0);
  const credentials = useRef({ username: "" });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (posts.home.length === 0 && tab === "For you") {
      dispatch(
        getPost(
          undefined,
          "home",
          undefined,
          undefined,
          currUser.token,
          setLoading
        )
      );
    } else if (posts.following.length === 0 && tab === "Following") {
      dispatch(
        getPost(
          undefined,
          "following",
          undefined,
          undefined,
          currUser.token,
          setLoading
        )
      );
    }
  }, [tab]);

  function handleScroll(e) {
    const element = e.currentTarget;

    if (
      element.scrollTop + element.clientHeight + 500 >= element.scrollHeight &&
      loading === false &&
      tab === "For you" &&
      prevScrollY.current < element.scrollTop
    ) {
      dispatch(
        getPost(
          undefined,
          "home",
          posts.home[posts.home.length - 1],
          undefined,
          currUser.token,
          setLoading
        )
      );
    } else if (
      element.scrollTop + element.clientHeight + 500 >= element.scrollHeight &&
      loading === false &&
      tab === "Following" &&
      prevScrollY.current < element.scrollTop
    ) {
      dispatch(
        getPost(
          undefined,
          "following",
          posts.following[posts.following.length - 1],
          undefined,
          currUser.token,
          setLoading
        )
      );
    }

    prevScrollY.current = element.scrollTop;
  }

  const updateUsername = () => {
    if (
      credentials.current.username !==
      users.activeprofiles.find((user) => user.id === currUser.user).info
        .username
    ) {
      dispatch(
        updateUser(
          currUser.token,
          { username: credentials.current.username },
          currUser.user
        )
      );
    }
    setUpdating(false);
  };

  const UpdateUsername = () => (
    <div
      className="absolute left-0 top-0 w-full h-full bg-[#ffffff] s6:bg-[#000000]/[.5] z-40 flex justify-center items-center dark:bg-[#ffffff]/[.4]"
      onMouseDown={() => [setUpdating(false)]}
    >
      <div
        className="w-full h-full bg-[#ffffff] flex justify-center items-center s6:h-[700px] s6:max-w-[500px] p-4 dark:bg-[#000000] rounded-xl animate-fade-in"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="h-[90%] flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <IconTwitter clas={"w-[30px]"} />
            <div className="w-full py-5">
              <h1 className="text-[20px] mb-2 dark:text-[#ffffff]">
                Here you can change your username
              </h1>
              <CredentialInput
                placeholder="username"
                ref={credentials}
                refKey={"username"}
                defaultVal={
                  users.activeprofiles.find((user) => user.id === currUser.user)
                    .info.username
                }
              />
            </div>
          </div>
          <div className="h-[100px] flex flex-col justify-between w-full">
            <CredentialButton text={"Set username"} action={updateUsername} />
            <CredentialButton
              text={"Cancel"}
              light={true}
              action={() => {
                setUpdating(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const localChoices = ["For you", "Following"];
  return (
    <section
      id="childDiv"
      className="s10:max-w-[32%] s10:min-w-[600px] flex-grow border-l border-r dark:border-[#ffffff]/[.3] border-[#1d9bf0]/[.1] s6:mb-0 s6:h-auto h-[93%] overflow-y-auto overflow-x-hidden"
      onScroll={(e) => handleScroll(e)}
    >
      {updating ? <UpdateUsername /> : ""}
      {opened ? <SlideMenu opened={opened} setOpened={setOpened} /> : ""}
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
                  setOpened(true);
                }}
              ></div>
            </div>
            <IconTwitter clas={"w-[25px]"} />
          </div>
        </div>
        <ChoiceButtons
          color={color}
          choices={localChoices}
          setChosen={setTab}
        />
      </div>
      <div className="h-[90.4%]">
        {w >= 600 ? <HomePost color={color} /> : ""}
        {posts[tab === "For you" ? "home" : "following"].length > 0
          ? posts[tab === "For you" ? "home" : "following"].map(
              (post, index) => (
                <DisplayPost
                  postPath={post}
                  key={index}
                  postList={posts.posts}
                />
              )
            )
          : ""}
        {loading && <LoadingIcon />}
      </div>
    </section>
  );
}

export default Main;
