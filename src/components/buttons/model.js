import CommentsIcon from "../icons/posts/comments";
import RepostsIcon from "../icons/posts/reposts";
import LikesIcon from "../icons/posts/likes";
import ImpressionsIcon from "../icons/posts/impressions";
import ShareIcon from "../icons/posts/share"
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../redux/actions/postActions";

function InteractionButtons({data}) {
    const currUser = useSelector(state => state.currUser)
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
    const display = [
        [<CommentsIcon />, data.comments.length, "", ()=>{}],
        [<RepostsIcon />, data.reposts.length, data.reposts.includes(currUser.user.uid) ? "#00ba7c" : "", ()=>{}],
        [<LikesIcon fill={data.likes.includes(currUser.user.uid) ? "#f91863" : ""}/>, data.likes.length, data.likes.includes(currUser.user.uid) ? "#f91863" : "", ()=>{}],
        [<ImpressionsIcon />, data.impressions.length, "", ()=>{}]
    ]
    return (
            <div className="flex justify-between mt-2">
                {display.map((pick, index)=>(
                    <div className="group flex items-center" key={index} onClick={()=>{dispatch(updatePost(data.post, currUser.token, currUser.user.uid))}}>
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