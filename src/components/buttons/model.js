import CommentsIcon from "../icons/posts/comments";
import RepostsIcon from "../icons/posts/reposts";
import LikesIcon from "../icons/posts/likes";
import ImpressionsIcon from "../icons/posts/impressions";
import ShareIcon from "../icons/posts/share"
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../redux/actions/postActions";

function InteractionButtons({data}) {
    const currUser = useSelector(state => state.currUser)
    const users = useSelector(state => state.users)
    const currUserInfo = users.activeprofiles.find(user => user.id === currUser.user)
    const dispatch = useDispatch()

    const roundNumberWithSuffix = (num) => {
        if (num < 1000) {
          return num.toLocaleString(); // Use standard number formatting for < 1,000
        } else if (num < 1000000) {
          return (num / 1000).toFixed(1) + 'K'; // Convert to K format
        } else {
          return (num / 1000000).toFixed(1) + 'M'; // Convert to M format
        }
      }

    const prevent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const display = [
        [<CommentsIcon />, data.comments, "", (e)=>{prevent(e);}],
        [<RepostsIcon />, data.reposts, currUserInfo.info.reposts.includes(data.post) ? "#00ba7c" : "", (e)=>{prevent(e)}],
        [<LikesIcon fill={currUserInfo.info.likes.includes(data.post) ? "#f91863" : ""}/>, data.likes, currUserInfo.info.likes.includes(data.post) ? "#f91863" : "", (e)=>{prevent(e);dispatch(updatePost(data.post, currUser.token, currUser.user, currUserInfo.info.likes.includes(data.post) ? "decrement" : "increment"))}],
    ]
    return (
            <div className="flex justify-between mt-2">
                {display.map((pick, index)=>(
                    <div className="group flex items-center cursor-pointer" key={index} onClick={pick[3]}>
                        <div className={"group-hover:bg-["+pick[2]+"]/[.2] p-1 transition-all duration-300 rounded-full pointer-events-none"}>
                            {pick[0]}
                        </div>
                        <span className={"text-[13px] text-["+pick[2]+"] group-hover:text-["+pick[2]+"] ml-1 pointer-events-none"}>{roundNumberWithSuffix(pick[1])}</span>
                    </div>
                ))}
                <div className="group flex items-center">
                    <div className="group-hover:bg-[#1d9bf0]/[.2] p-1 transition-all duration-300 rounded-full">
                        <ShareIcon />
                    </div>
                </div>
            </div>
    )
}


export default InteractionButtons;