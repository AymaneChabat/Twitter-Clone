import ChoiceButtons from '../../components/buttons/choice';
import IconTwitter from '../../components/icons/logos/twitter-icon';
import LoadingIcon from '../../components/icons/loading';
import SlideMenu from '../../components/menu/menu-types/slide-menu-sm';
import HomePost from '../../components/posts/home-post';
import DisplayPost from '../../components/posts/displayposts';
import { getPost } from '../../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Main({setOpened, opened, w}) {

  const dispatch = useDispatch()
  const currUser = useSelector(state=>state.currUser)
  const users = useSelector(state=>state.users)
  const posts = useSelector(state=>state.posts)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState("For you")

  useEffect(()=>{
      setLoading(true)
      if (posts.home.length === 0 && tab === "For you") {
        dispatch(getPost(undefined, "home", undefined, undefined, currUser.token))
      } else if (posts.following.length === 0) {
        dispatch(getPost(undefined, "following", undefined, undefined, currUser.token))
      }
      setTimeout(()=>{
        setLoading(false)
      }, 1000)
  },[tab])
  
  const localChoices = ["For you", "Following"]
  
  return (
        <div className='s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto mb-[60px] s5:mb-0'>
          {opened ? <SlideMenu opened={opened} setOpened={setOpened}/> : ""}
          <div className='bg-[#ffffff]/[.9] w-[100%]'>
            <div className='w-full py-2 px-2'>
              <h1 className='ml-1 text-[18px] text-400 font-bold hidden s5:block mr-4'>Home</h1>
              <div className='block s5:hidden px-2 flex items-center pb-2'>
                <div className='w-[46.5%]'>
                  <div className='bg-[#000000] h-[30px] w-[30px] rounded-full' onClick={()=>{setOpened(true)}}></div>
                </div>
                <div>
                  <IconTwitter clas={"w-[25px]"}/>
                </div>
              </div>
            </div>
            <ChoiceButtons choices={localChoices} setChosen={setTab}/>
          </div>
          {w >= 500 ? <HomePost/> : ""}
          {!loading ? posts[tab === "For you" ? "home" : "following"].length > 0 ? posts[tab === "For you" ? "home" : "following"].map((post, index) => <DisplayPost posts={post} users={users.activeprofiles} key={index}/>)  : "" : <LoadingIcon />}
        </div>
  );
}

export default Main;
