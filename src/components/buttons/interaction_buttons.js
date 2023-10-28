import { ShareIcon, LikesIcon, RepostsIcon, CommentsIcon } from "../icons/posts"
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../redux/actions/postActions";

function InteractionButtons({ data, setReplying }) {
  // Get the current user from Redux state
  const currUser = useSelector(state => state.currUser);
  const users = useSelector(state => state.users);
  // Find the current user's information from the list of active profiles
  const currUserInfo = users.activeprofiles.find(user => user.id === currUser.user);
  const dispatch = useDispatch();

  // Function to format numbers with K (thousands) and M (millions) suffix
  const roundNumberWithSuffix = (num) => {
    if (num < 1000) {
      return num.toLocaleString(); // Use standard number formatting for < 1,000
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // Convert to K format
    } else {
      return (num / 1000000).toFixed(1) + 'M'; // Convert to M format
    }
  }

  // Function to prevent default behavior of an event
  const prevent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  // Define icons and their associated data and actions
  const Icons = [
    // Comments icon
    [
      <CommentsIcon />,
      data.comments,
      "",
      (e) => { prevent(e); setReplying(true) }
    ],
    // Reposts icon
    [
      <RepostsIcon />,
      data.reposts,
      currUserInfo.info.reposts.includes(data.post) ? "#00ba7c" : "",
      (e) => { prevent(e) }
    ],
    // Likes icon
    [
      <LikesIcon fill={currUserInfo.info.likes.includes(data.post) ? "#f91863" : ""}/>,
      data.likes,
      currUserInfo.info.likes.includes(data.post) ? "#f91863" : "",
      (e) => {
        prevent(e);
        // Dispatch the updatePost action with the appropriate parameters
        dispatch(updatePost(data.post, currUser.token, currUser.user, currUserInfo.info.likes.includes(data.post) ? "decrement" : "increment"));
      }
    ],
  ];

  return (
    <div className="flex justify-between mt-2">
      {Icons.map((iconData, index) => (
        <div className="group flex items-center cursor-pointer" key={index} onClick={iconData[3]}>
          <div className={"group-hover:bg-["+iconData[2]+"]/[.2] p-1 transition-all duration-300 rounded-full pointer-events-none"}>
            {iconData[0]}
          </div>
          <span className={"text-[13px] dark:text-[#ffffff] text-["+iconData[2]+"] group-hover:text-["+iconData[2]+"] ml-1 pointer-events-none"}>{iconData[1] !== 0 ? roundNumberWithSuffix(iconData[1]) : ""}</span>
        </div>
      ))}
      <div className="group flex items-center">
        <div className="group-hover:bg-[#1d9bf0]/[.2] p-1 transition-all duration-300 rounded-full">
          <ShareIcon />
        </div>
      </div>
    </div>
  );
}

export default InteractionButtons;
