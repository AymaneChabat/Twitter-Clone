import CommentsIcon from "../icons/posts/comments";
import RepostsIcon from "../icons/posts/reposts";
import LikesIcon from "../icons/posts/likes";
import ImpressionsIcon from "../icons/posts/impressions";
import ShareIcon from "../icons/posts/share"

function InteractionButtons({data}) {
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
        [<CommentsIcon />, data.comments],
        [<RepostsIcon />, data.reposts],
        [<LikesIcon />, data.likes],
        [<ImpressionsIcon />, data.impressions]
    ]
    return (
            <div className="flex justify-between mt-2">
                {display.map((pick, index)=>(
                    <div className="group flex items-center" key={index}>
                        <div className="group-hover:bg-[#1d9bf0]/[.2] p-1 transition-all duration-300 rounded-full">
                            {pick[0]}
                        </div>
                        <span className="text-[13px] group-hover:text-[#67BAF2] ml-1">{roundNumberWithSuffix(pick[1])}</span>
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