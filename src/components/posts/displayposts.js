import Dots from "../icons/menu/dots";
import InteractionButtons from "../buttons/model";
import { Link } from "react-router-dom";
import DisplayImages from "./displayImages";
import { useSelector } from "react-redux";

function DisplayPosts({posts, users, postid}) {
    let postList = useSelector(state => postid !== undefined ? state.posts.replies : state.posts.posts)
    if (postid !== undefined) {
        postList = (postList.find(replies => replies.postId === postid)).replies
    }
    console.log(postList)
    return (
    <div>
        {posts !== undefined ? posts.map((postId, index)=>{
            const post =  postList.find(post => post.postId === postId)
            const user = users.find(user => user.id === post.post.userId)
            return (
            <Link to={"/"+user.info.username+"/post/"+post.postPath}>
                <div className="px-3 py-2 flex hover:bg-[#000000]/[.1] cursor-pointer border-b border-[#1d9bf0]/[.1] transition-all duration-200" key={index}>
                    <div>
                        <Link to={"/profile/"+user.info.username}>
                            <div className="w-[38px] h-[38px] mr-2 bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full" style={{backgroundImage: `url('${user.info.profilepicture}')`}}></div>
                        </Link>
                    </div>
                    <div className="w-[90%]">
                        <div className="flex w-full items-start justify-between">
                            <div>
                                <span className="font-bold text-[15px] font-twitterchirp mr-2">{user.info.name}</span>
                                <span className="text-[15px] font-twitterchirp text-[#536471]"><span className="text-[12px]">@</span>{user.info.username} . {post.post.time}</span>
                            </div>
                            <div className="hover:bg-[#1D9BF0]/[.1] p-2 rounded-full">
                                <Dots w={15}/>
                            </div>
                        </div>
                        <p className="text-[#0f1419]/[.8] text-[15px] font-chirp leading-[20px] break-words">
                            {post.post.content}
                            <div className="mt-4" onClick={(e)=>{e.preventDefault();e.stopPropagation()}}>
                                {post.post.media.length > 0 ? (
                                    <DisplayImages images={post.post.media} posting={false}/>
                                ) : ""}
                            </div>
                        </p>
                        <InteractionButtons data={{comments: post.post.comments, likes: post.post.likes, reposts: post.post.reports, impressions: post.post.impressions, post: post.postPath}}/>
                    </div>
                </div>
            </Link>
        )}): ""}
    </div>
  );
}

export default DisplayPosts;
