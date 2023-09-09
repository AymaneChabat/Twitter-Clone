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
    return (
            <div className="flex justify-between mt-2">
                <div className="group flex items-center">
                    <div className="group-hover:bg-[#67BAF2]/[.2] p-1 transition-all transition-300 rounded-full">
                        <CommentsIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#67BAF2] ml-1">{roundNumberWithSuffix(data.comments)}</span>
                </div>
                <div className="group flex items-center">
                    <div className="group-hover:bg-[#00ba7c]/[.2] p-1 transition-all transition-300 rounded-full">
                        <RepostsIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#00ba7c] ml-1">{roundNumberWithSuffix(data.reposts)}</span>
                </div>
                <div className="group flex  items-center">
                    <div className="group-hover:bg-[#00ba7c]/[.2] p-1 transition-all transition-300 rounded-full">
                        <LikesIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#f91863] ml-1">{roundNumberWithSuffix(data.likes)}</span>
                </div>
                <div className="group flex  items-center">
                    <div className="group-hover:bg-[#1d9bf0]/[.2] p-1 transition-all transition-300 rounded-full">
                        <ImpressionsIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#67BAF2] ml-1">{roundNumberWithSuffix(data.impressions)}</span>
                </div>
                <div className="group flex items-center">
                    <div className="group-hover:bg-[#1d9bf0]/[.2] p-1 transition-all transition-300 rounded-full">
                        <ShareIcon />
                    </div>
                </div>
            </div>
    )
}


export default InteractionButtons;