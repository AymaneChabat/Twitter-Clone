import Dots from "../icons/menu/dots";
import InteractionButtons from "../buttons/model";
import ReactPlayer from 'react-player';


function DisplayPosts({data}) {
    const sample = [
        {
            "userId": "0",
            "profilePic": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80",
            "name":"DJ Akademiks",
            "username": "Akademics",
            "time": "23h",
            "content": "In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.",
            "images": [],
            "video": "",
            "interactions": {
                "comments": 350,
                "reposts": 400,
                "likes": 13000,
                "impressions": 12000546
           }
        },
        {
            "userId": "0",
            "profilePic": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80",
            "name":"DJ Akademiks",
            "username": "Akademics",
            "time": "23h",
            "content": "",
            "images": ["https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80"],
            "video": "",
            "interactions": {
                "comments": 350,
                "reposts": 400,
                "likes": 13000,
                "impressions": 12000546
           }
        },
        {
            "userId": "0",
            "profilePic": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80",
            "name":"DJ Akademiks",
            "username": "Akademics",
            "time": "23h",
            "content": "In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.",
            "images": [],
            "video": "",
            "interactions": {
                "comments": 350,
                "reposts": 400,
                "likes": 13000,
                "impressions": 12000546
           }
        },
        {
            "userId": "0",
            "profilePic": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80",
            "name":"DJ Akademiks",
            "username": "Akademics",
            "time": "23h",
            "content": "In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.",
            "images": [],
            "video": "",
            "interactions": {
                "comments": 350,
                "reposts": 400,
                "likes": 13000,
                "impressions": 12000546
           }
        },
        {
            "userId": "0",
            "profilePic": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80",
            "name":"DJ Akademiks",
            "username": "Akademics",
            "time": "23h",
            "content": "In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.",
            "images": [],
            "video": "",
            "interactions": {
                "comments": 350,
                "reposts": 400,
                "likes": 13000,
                "impressions": 12000546
           }
        },
        {
            "userId": "0",
            "profilePic": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80",
            "name":"DJ Akademiks",
            "username": "Akademics",
            "time": "23h",
            "content": "In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.",
            "images": [],
            "video": "",
            "interactions": {
                "comments": 350,
                "reposts": 400,
                "likes": 13000,
                "impressions": 12000546
           }
        },
        {
            "userId": "0",
            "profilePic": "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80",
            "name":"DJ Akademiks",
            "username": "Akademics",
            "time": "23h",
            "content": "In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.In Houston rich dudes are having “bottle wars” meaning they buy expensive liquor and instead of drinking it pour it out to flex on other dudes in the club.",
            "images": [],
            "video": "https://firebasestorage.googleapis.com/v0/b/testnordpass.appspot.com/o/IPlogged.webm?alt=media&token=344b1c75-0811-42ed-87de-b1fd7141c6dc",
           "interactions": {
                "comments": 350,
                "reposts": 400,
                "likes": 13000,
                "impressions": 12000546
           }
        }
    ]

  return (
    <div>
        {sample.map((post, index)=>(
            <div className="px-3 py-2 flex hover:bg-[#000000]/[.1] cursor-pointer border-b" key={index}>
                <div className="w-[38px] h-[38px] mr-2 bg-[url('https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=320&h=320&q=80')] bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full">
                </div>
                <div className="w-[90%]">
                    <div className="flex w-full items-start justify-between">
                        <div>
                            <span className="font-bold text-[15px] font-twitterchirp mr-2">{post.name}</span>
                            <span className="text-[15px] font-twitterchirp text-[#536471]"><span className="text-[12px]">@</span>{post.username} . {post.time}</span>
                        </div>
                        <div className="hover:bg-[#1D9BF0]/[.1] p-2 rounded-full">
                            <Dots w={15}/>
                        </div>
                    </div>
                    <div>
                        <p className="text-[#0f1419]/[.8] text-[15px] font-chirp leading-[20px] break-words">
                            {post.content}
                            {post.images.length > 0 ? (
                                <div className="w-[100%] mt-1">
                                    {post.images.map((img,index)=>(
                                        <img src={img} key={index} className="rounded-lg border"/>
                                    ))}
                                </div>
                            ) : ""}
                            {post.video !== "" ? (
                                <div className="w-[100%] h-[auto] mt-1">
                                    <ReactPlayer
                                    url={post.video}
                                    width="640"
                                    height="360"
                                    controls
                                    />
                                </div>
                            ): ""}
                        </p>
                    </div>
                    <InteractionButtons data={post.interactions}/>
                </div>
            </div>
        ))}
    </div>
  );
}

export default DisplayPosts;
