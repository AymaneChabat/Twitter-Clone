import { BackArrowIcon } from "../../components/icons/messages";
import { Dots } from "../../components/icons/menu";
import DisplayImages from "../../components/posts/displayImages";
import DisplayPost from "../../components/posts/displaypost";
import InteractionButtons from "../../components/buttons/interaction_buttons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost, getReplies } from "../../redux/actions/postActions";
import { getUser } from "../../redux/actions/userActions";
import LoadingIcon from "../../components/icons/loading";
import HomePost from "../../components/posts/home-post";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);
  const currUser = useSelector((state) => state.currUser);

  const post = posts.posts.find((post) => post.postPath === params["*"]);
  var user =
    post !== undefined
      ? users.activeprofiles.find((user) => user.id === post.post.userId)
      : undefined;

  const returnPostContent = (content) =>{
    return content.replace(/<div>(.*?)<\/div>/g, '\n$1');
    }

  useEffect(() => {
    if (post === undefined) {
      dispatch(
        getPost(params["*"], "", undefined, undefined, undefined, setLoading)
      );
    } else {
      if (
        users.activeprofiles.find((user) => user.id === post.post.userId) ===
        undefined
      ) {
        dispatch(getUser(params.username, currUser.token));
      }
      if (
        posts.postReplies.find((reply) => reply.postPath === params["*"]) ===
        undefined
      ) {
        dispatch(
          getReplies(currUser.token, params["*"], params.username, setLoading)
        );
      }
    }
  }, [params, posts]);

  const goBack = () => {
    navigate(-1); // This function takes you back to the previous URL
  };

  return (
    <div className="s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto mb-[60px] s6:mb-0 dark:border-[#ffffff]/[.3]">
      <div className="w-full box-border px-3 h-[60px] flex items-center justify-between z-50">
        <div
          className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer"
          onClick={goBack}
        >
          <BackArrowIcon w={20} />
        </div>
        <div className="leading-6 w-[90%]">
          <h1 className="font-bold text-[20px] dark:text-[#ffffff]">Post</h1>
        </div>
      </div>
      {post !== undefined && user !== undefined ? (
        <>
          <div className="px-3 py-2 border-b border-[#1d9bf0]/[.1] transition-all duration-200">
            <div className="flex">
              <Link to={"/" + user.info.username}>
                <div
                  className="w-[45px] h-[45px] mr-2 bg-center bg-cover bg-no-repeat bg-origin-padding rounded-full"
                  style={{
                    backgroundImage: `url('${user.info.profilepicture}')`,
                  }}
                ></div>
              </Link>
              <div className="flex w-full items-start justify-between mb-3">
                <div className="flex flex-col leading-6">
                  <span className="font-bold text-[15px] mr-2 dark:text-[#ffffff]">
                    {user.info.name}
                  </span>
                  <span className="text-[15px] text-[#536471]">
                    <span className="text-[12px]">@</span>
                    {user.info.username}
                  </span>
                </div>
                <div className="hover:bg-[#1D9BF0]/[.1] p-2 rounded-full">
                  <Dots w={15} />
                </div>
              </div>
            </div>
            <div className="border-b border-[#1d9bf0]/[.1]">
              <p className="text-[#0f1419]/[.8] text-[15px] leading-[20px] break-words dark:text-[#ffffff]">
                {returnPostContent(post.post.content)}
                <div className="mt-4">
                  {post.post.media.length > 0 && (
                    <DisplayImages images={post.post.media} posting={false} />
                  )}
                </div>
              </p>
            </div>
            <InteractionButtons
              data={{
                comments: post.post.comments,
                likes: post.post.likes,
                reposts: post.post.reposts,
                impressions: post.post.impressions,
                post: post.postPath,
              }}
            />
          </div>
          <div className="border-[#1d9bf0]/[.1] border-b-0.5 border-t-0.5">
            <HomePost
              floating={false}
              type={"reply"}
              postId={params["*"]}
              username={params.username}
            />
          </div>
          <div>
            {posts.postReplies.find(
              (reply) => reply.postPath === params["*"]
            ) &&
              posts.postReplies
                .find((reply) => reply.postPath === params["*"])
                .replies.map((post, index) => (
                  <DisplayPost
                    key={index}
                    postPath={post}
                    users={users.activeprofiles}
                    postid={params["*"]}
                    postList={posts.posts}
                  />
                ))}
            {loading && <LoadingIcon />}
          </div>
        </>
      ) : (
        <pre className="w-full h-[40%] flex flex-col justify-center items-center">
          <span className="text-[#536471]">
            Hmm...this page doesn't exist. Try browsing your feed for something
            else
          </span>
          <Link to={"/home"}>
            <button
              type="button"
              class="text-white w-[7rem] px-0.5 py-1.5 bg-[#1ca4ff] hover:bg-[#0292f2] font-medium rounded-full transition duration-300 text-md mt-3"
            >
              Browse
            </button>
          </Link>
        </pre>
      )}
    </div>
  );
}

export default Post;
