import ChoiceButtons from '../../components/buttons/choice';
import IconTwitter from '../../components/icons/logos/twitter-icon';
import LoadingIcon from '../../components/icons/loading';
import SlideMenu from '../../components/menu/menu-types/slide-menu-sm';
import HomePost from '../../components/posts/home-post';
import DisplayPost from '../../components/posts/displayposts';
import EditIcon from '../../components/icons/edit';
import { getPost } from '../../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import CredentialInput from '../../components/inputs/credentials';
import CredentialButton from '../../components/buttons/credentials';

function Main({setOpened, opened, w}) {
  const dispatch = useDispatch()
  const currUser = useSelector(state=>state.currUser)
  const users = useSelector(state=>state.users)
  const posts = useSelector(state=>state.posts)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState("For you")
  const username = useRef()
  const [updating, setUpdating] = useState(false)

  useEffect(()=>{
      if (posts.home.length === 0 && tab === "For you") {
        dispatch(getPost(undefined, "home", undefined, undefined, currUser.token, setLoading))
      } else if (posts.following.length === 0 && tab === "Following") {
        dispatch(getPost(undefined, "following", undefined, undefined, currUser.token, setLoading))
      }
  },[tab])

  const UpdateUsername = () => (
    <div className='absolute left-0 top-0 w-full h-full bg-[#ffffff] s5:bg-[#000000]/[.5] z-40 flex justify-center items-center' onClick={()=>[setUpdating(false)]}>
      <div className='w-full h-full bg-[#ffffff] flex justify-center items-center s5:h-[700px] s5:max-w-[500px] p-4' onClick={(e)=>{e.stopPropagation()}}>
        <div className='h-[90%] flex flex-col items-center justify-between'>
          <div className='flex flex-col items-center'>
            <IconTwitter clas={"w-[30px]"}/>
            <div className='w-full py-5'>
              <h1 className='text-[20px] mb-2'>Here you can change your username</h1>
              <CredentialInput placeholder="username" ref={username} defaultVal={users.activeprofiles.find(user => user.id === currUser.user.uid).info.username}/>
            </div>
          </div>
          <div className='h-[100px] flex flex-col justify-between w-full'>
            <CredentialButton text={"Set username"}/>
            <CredentialButton text={"Cancel"} light={true} action={()=>{setUpdating(false)}}/>
          </div>
        </div>
      </div>
    </div>
  )
  
  const localChoices = ["For you", "Following"]
  
  return (
        <section className='s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto mb-[60px] s5:mb-0 s5:h-auto h-[85%]'>
          {updating ? <UpdateUsername /> : ""}
          {opened ? <SlideMenu opened={opened} setOpened={setOpened}/> : ""}
          <div className='bg-[#ffffff]/[.9] w-[100%]'>
            <div className='w-full py-2 px-2'>
              <header className='ml-1 text-[18px] text-400 font-bold hidden items-center mr-4 s5:flex justify-between'>
                <h1>Home</h1>
                <span onClick={()=>{setUpdating(true)}}>
                  <EditIcon />
                </span>
              </header>
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
          {!loading ? posts[tab === "For you" ? "home" : "following"].length > 0 ? posts[tab === "For you" ? "home" : "following"].map((post, index) => <DisplayPost postPath={post} users={users.activeprofiles} key={index} postList={posts.posts}/>)  : "" : <LoadingIcon />}
        </section>
  );
}

export default Main;
