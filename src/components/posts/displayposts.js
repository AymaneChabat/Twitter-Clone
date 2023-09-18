import Dots from "../icons/menu/dots";
import InteractionButtons from "../buttons/model";
import { useEffect, useState } from "react";

function DisplayPosts({posts, users}) {
    return (
    <div>
        {posts !== undefined ? posts.map((post, index)=>{ 
            var user = users.find(user => user.id === post.post.userId)
            return (
                    <div className="px-3 py-2 flex hover:bg-[#000000]/[.1] cursor-pointer border-b" key={index}>
                        <div className="w-[38px] h-[38px] mr-2 bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full" style={{backgroundImage: `url('${user.info.profilepicture}')`}}>
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
                            <div>
                                <p className="text-[#0f1419]/[.8] text-[15px] font-chirp leading-[20px] break-words">
                                    {post.post.content}
                                    {post.post.media.length > 0 ? (
                                        <div className="w-[100%] mt-1">
                                            {post.post.images.map((img,index)=>(
                                                <img src={img} key={index} className="rounded-lg border"/>
                                            ))}
                                        </div>
                                    ) : ""}
                                </p>
                            </div>
                            <InteractionButtons data={{comments: post.post.comments, likes: post.post.likes, reposts: post.post.reports, impressions: post.post.impressions}}/>
                        </div>
                    </div>
                )}): ""}
    </div>
  );
}

export default DisplayPosts;
