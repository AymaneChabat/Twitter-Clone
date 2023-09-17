import Dots from "../icons/menu/dots";
import InteractionButtons from "../buttons/model";

function DisplayPosts({posts}) {
    return (
    <div>
        {posts !== undefined ? posts.posts.map((post, index)=>(
                    <div className="px-3 py-2 flex hover:bg-[#000000]/[.1] cursor-pointer border-b" key={index}>
                        <div className="w-[38px] h-[38px] mr-2 bg-[url('https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80')] bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full" >
                        </div>
                        <div className="w-[90%]">
                            <div className="flex w-full items-start justify-between">
                                <div>
                                    <span className="font-bold text-[15px] font-twitterchirp mr-2">asd</span>
                                    <span className="text-[15px] font-twitterchirp text-[#536471]"><span className="text-[12px]">@</span>asd . {post.post.time}</span>
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
                            <InteractionButtons data={{comments: post.post.comments.length, likes: post.post.likes.length, reposts: post.post.reports.length, impressions: post.post.impressions.length}}/>
                        </div>
                    </div>
                )): ""}
    </div>
  );
}

export default DisplayPosts;
