import CommentsIcon from "./comments";
import RepostsIcon from "./reposts";
import LikesIcon from "./likes";
import ImpressionsIcon from "./impressions";
import ShareIcon from "./share"

function InteractionButtons({data}) {
    return (
            <div className="flex justify-between mt-2">
                <div className="group flex items-center">
                    <div className="group-hover:bg-[#67BAF2]/[.2] p-1 transition-all transition-300 rounded-full">
                        <CommentsIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#67BAF2] ml-1">{data.comments}</span>
                </div>
                <div className="group flex items-center">
                    <div className="group-hover:bg-[#00ba7c]/[.2] p-1 transition-all transition-300 rounded-full">
                        <RepostsIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#00ba7c] ml-1">{data.reposts}</span>
                </div>
                <div className="group flex  items-center">
                    <div className="group-hover:bg-[#00ba7c]/[.2] p-1 transition-all transition-300 rounded-full">
                        <LikesIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#f91863] ml-1">{data.likes}</span>
                </div>
                <div className="group flex  items-center">
                    <div className="group-hover:bg-[#1d9bf0]/[.2] p-1 transition-all transition-300 rounded-full">
                        <ImpressionsIcon />
                    </div>
                    <span className="text-[13px] group-hover:text-[#67BAF2] ml-1">{data.impressions}</span>
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