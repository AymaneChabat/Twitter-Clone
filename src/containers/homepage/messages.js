import { Fragment, useEffect, useState } from 'react';
import SettingsIcon from '../../components/icons/menu/settings';
import SearchIcon from '../../components/icons/menu/search';
import Dots from '../../components/icons/menu/dots';
import FileIcon from '../../components/icons/posts/files';
import SendIcon from '../../components/icons/messages/send';
import DeleteIcon from '../../components/icons/posts/delete';
import DetailsIcon from '../../components/icons/messages/details';
import BackArrowIcon from '../../components/icons/messages/backArrow';
import IconTwitter from '../../components/icons/logos/twitter-icon';
import ReactFileReader from 'react-file-reader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, selectChat, removeChat } from '../../redux/actions/chatActions';
import { fetchMessages, sendMessage } from '../../redux/actions/messagesActions';
import {
  collection,
  query,
  getFirestore,
  where,
  onSnapshot
} from 'firebase/firestore';
import app from "../../functions/config"

const db = getFirestore(app)

function Messages({w}) {

  const [images,setImages] = useState("")
  const [search,setSearch] = useState('')
  const [focused,setFocused] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [chatOverflow, setChatOverflow] = useState(0)
  const [convoInfo,setConvoInfo] = useState(false)
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)
  const dispatch = useDispatch()
  const currUser = useSelector(state=>state.user)
  const chats = useSelector(state=> state.chats)
  const currMessages = useSelector(state=>state.message)
  const [snapshot, setSnapshot] = useState(false)

  // const chats = dispatch(fetchChats((await currUser).token))
  // const createchat = dispatch(createChat((await currUser).token, "B7IIn6aZL1DF7nHgF92o"))
  // const selectchat = dispatch(selectChat(""))
  // const deleteChat = dispatch(deleteChat((await currUser).token, "B7IIn6aZL1DF7nHgF92o"))
  // const getmessages = dispatch(fetchMessages((await currUser).token, "D4xbZ0bPyMHkC3tLK9s2"))
  // const sendmessage = dispatch(sendMessage((await currUser).token, {chatId: "D4xbZ0bPyMHkC3tLK9s2", content: "dead a das d", media: []}))

  useEffect(()=>{
    dispatch(fetchChats(currUser.token, chats.last, false))
    if (currUser.user !== null) {
      const q = query(collection(db, "chats"), where("participants", "array-contains", currUser.user.uid));
      onSnapshot(q, () => {
              dispatch(fetchChats(currUser.token, undefined, true))
            }); 
    }
    setSnapshot(true)
}, [])

  


  const handleFiles = files => {
    console.log(files)
    setImages(files.base64)
  }

  const loadingIcon = (
    <div>
      <IconTwitter clas={"w-[30px] mx-auto"}/>
    </div>
  )

  const scrollDetect = (e) => {
    if (chatOverflow === 0 && e.currentTarget.scrollTop > 0) {
      setChatOverflow(e.currentTarget.scrollTop)
    } else if (chatOverflow > 0 && e.currentTarget.scrollTop === 0) {
      setChatOverflow(0)
    }
  }


  function formatCustomDate(timestamp) {
    const currentDate = new Date();
    const providedDate = new Date(timestamp);
    const formattedProvidedData = providedDate.toDateString().split(" ")
  
    // Compare years, months, and days
    if (
      currentDate.getFullYear() === providedDate.getFullYear() &&
      currentDate.getMonth() === providedDate.getMonth() &&
      currentDate.getDate() === providedDate.getDate()
    ) {
      // Same day, return hours and minutes
      return providedDate.toTimeString().split(" ")[0];
    } else if (
      currentDate.getFullYear() === providedDate.getFullYear() &&
      currentDate.getMonth() === providedDate.getMonth()
    ) {
      // Same month, return day and time
      return formattedProvidedData[2] + ", " + providedDate.toTimeString().split(" ")[0]
    } else if (currentDate.getFullYear() === providedDate.getFullYear()) {
      // Same year, return month and day
      return formattedProvidedData[1] + "/" + formattedProvidedData[2]
    } else {
      // Different year, return full date
      return formattedProvidedData[1] + "/" + formattedProvidedData[2] + "/" + formattedProvidedData[3]
    }
  }

  const extractMessages = (id) => {
    dispatch(selectChat(id)); 
    setLoading(true)
    dispatch(fetchMessages(currUser.token, id))
    setTimeout(()=>{
      setLoading(false)
    },800)
  }

  const Sent = (messageInfo, index) => 
    (
    <div key={index} className='group w-auto flex flex-col items-end mb-2'>
      <div className='inline-flex w-auto max-w-[70%] items-center'>
        <div className='mr-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full hidden group-hover:block cursor-pointer'>
          <Dots w={14} />
        </div>
        <div className='bg-[#0a95f2] font-chirp px-4 py-2 rounded-l-[24px] rounded-tr-[24px] rounded-br-[4px]'>
          <div className='w-[100%] inline'>
            <span className='text-[#ffffff]'>{messageInfo.message.content}</span>
          </div>
        </div>
      </div>
      <div className='text-[#536471] font-chirp text-[14px] tracking-tighter mt-1'>
        {formatCustomDate(messageInfo.message.sentAt)} · Sent
      </div>
    </div>
  )

  const Received = (messageInfo, index) => (
    <div key={index} className='group w-auto flex flex-col items-start mb-2'>
      <div className='inline-flex w-auto max-w-[70%] items-center'>
        <div className='bg-[#daeff5]/[.3] font-chirp px-4 py-2 rounded-r-[24px] rounded-tl-[24px] rounded-bl-[4px]'>
          <div className='w-[100%] inline'>
            <span className='text-[#000000]'>{messageInfo.message.content}</span>
          </div>
        </div>
        <div className='ml-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full hidden group-hover:block cursor-pointer'>
          <Dots w={14} />
        </div>
      </div>
      <div className='text-[#536471] font-chirp text-[14px] tracking-tighter mt-1'>
        {formatCustomDate(messageInfo.message.sentAt)} · Received
      </div>
    </div>
  )

  

  const conversation = (data) => (
    <Fragment>  
      <div className='h-[5%] w-full px-3 py-2'>
        <div className='flex justify-between w-full bg-[#ffffff] h-full items-center'>
          <div className='flex items-center'>
            <div className='block s11:hidden mr-3' onClick={()=>dispatch(selectChat(null))}>
              <BackArrowIcon w={20}/>
            </div>
            {chatOverflow > 0 ? (
            <>
              <div className='w-[30px] h-[30px] bg-[#000000] rounded-full'></div>
              <span className='font-semibold tracking-tight ml-2'>{data.name}</span>
            </>
            ): ""}
          </div>
          <div className='p-1.5 hover:bg-[#000000]/[.1] rounded-full cursor-pointer' onClick={()=>{setConvoInfo(true)}}>
            <DetailsIcon w={18}/>
          </div>
        </div>
      </div>
      <div className='h-[90%] px-3 overflow-auto shrink' id='chat' onScroll={scrollDetect}>
        <div className='h-auto w-full flex flex-col items-center mb-8'>
          <div className='p-4 w-full'>
            <div className='w-full flex justify-center'>
              <div className='bg-[#000000] h-[50px] w-[50px] rounded-full'></div>
            </div>
            <h1 className='text-[#000000] mr-1 font-semibold tracking-tight w-full text-center'>{data.name}</h1>
            <h3 className='text-[#536471] font-chirp text-[16px] tracking-tighter w-full text-center'>@{data.username}</h3>
          </div>
          <p className='font-twitterchirp text-[14px] w-[70%] text-center'>Cyber Security Engineer - Synack Red Team Member</p>
          <span className='text-[#536471] font-chirp text-[14px] tracking-tighter mt-2'>Joined May 2018 · 3,551 Followers</span>
        </div>
        {!loading ? (currMessages.length > 0 ? currMessages.map((message, index)=>(
          message.message.sender === currUser.user.uid ? Sent(message, index) : Received(message, index)
        )): "") : loadingIcon}
      </div>
      <div className='w-full min-h-[5%] bottom-0 flex items-center border-t grow absolute bg-[#ffffff]'>
        <ReactFileReader handleFiles={handleFiles} multipleFiles={true} base64={true}>
          <div className='ml-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full cursor-pointer'>
            <FileIcon />
          </div>
        </ReactFileReader>
        <div className='flex py-2.5 items-center px-4 grow bg-[#ffffff]'>
          <div className='grow relative'>
            <div contentEditable={true} className='bg-transparent focus:outline-none text-sm text-[#0f1419] grow break-word' onInput={(e)=>{setNewMessage(e.target.innerHTML)}}></div>
              {images !== "" ? (
              <div className='relative h-[150px] w-[150px] mt-2'>
                <div className='absolute text-center bg-[#ffffff] rounded-full p-1 right-1 top-1 hover:bg-[#000000]/[.7] cursor-pointer' onClick={()=>{setImages("")}}>
                    <DeleteIcon />
                </div>
                <img className='h-full w-full' src={images}/>
              </div>
              ) : ""}
              {newMessage === "" && images === "" ? (<div className='text-[#000000]/[.6] text-sm font-chirp absolute pointer-events-none top-0'>Start a new message</div>) : ""}
          </div>
          <div className={newMessage === "" ? 'pointer-events-none cursor-not-allowed ml-2' : "cursor-pointer ml-2"} onClick={()=>{dispatch(sendMessage(currUser.token, {chatId: chats.activeChat, content: newMessage, media: []}))}}>
            <SendIcon w={18}/>
          </div>
        </div>
      </div>
    </Fragment>
  )

  const conversationInfo = (data) => (
    <Fragment>
      <div className='h-[5%] w-full py-2'>
        <div className='px-3 flex w-full bg-[#ffffff] h-full items-center'>
            <div className='rounded-full hover:bg-[#000000]/[.1] p-1.5 cursor-pointer' onClick={()=>{setConvoInfo(false)}}>
              <BackArrowIcon w={20}/>
            </div>
            <span className='font-bold ml-4 text-[20px] font-chirp'>Conversation info</span>
        </div>
      </div>
      <div className='flex items-center hover:bg-blue-200/[.1] px-3 py-5 mt-4 cursor-pointer border-b  border-[#536471]/[.1]'>
        <div className='w-[11%]'>
          <div className='w-[45px] h-[45px] bg-[#000000] rounded-full'></div>
        </div>
        <div className='w-[69%]'>
          <div className='flex flex-col leading-6'>
            <span className='text-[#000000] mr-1 font-semibold tracking-tight hover:underline'>{data.name}</span>
            <span className='text-[#536471] font-chirp text-md tracking-tighter'>@{data.username}</span>
          </div>
        </div>
        <div className='w-[20%]'>
          <button className='bg-[#000000] text-[#ffffff] font-twitterchirp font-bold py-2 px-5 rounded-full hover:bg-[#000000]/[.8] transition-all duration-300'>Follow</button>
        </div>
      </div>
      <div className='p-3 border-b border-[#536471]/[.1]'>
        <h1 className='font-bold font-chirp text-[23px]'>Notifications</h1>
        <div className='flex items-center justify-between mt-4 mb-2'>
          <span className='text-[#536471] font-chirp text-lg tracking-tighter'>Snooze notifications from {data.name}</span>
          <label class="relative inline-flex items-center cursor-not-allowed">
            <input type="checkbox" value="" class="sr-only peer" disabled/>
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <button className='text-center py-4 hover:bg-[#1d9bf0]/[.1] cursor-not-allowed w-full'>
        <span className='text-[#1d9bf0] text-[18px] font-semibold'>Block @{data.username}</span>
      </button>
      <button className='text-center py-4 hover:bg-[#f4212e]/[.1] cursor-pointer w-full' onClick={()=>{console.log(currUser);dispatch(removeChat(currUser.token, chats.activeChat))}}>
        <span className='text-[#f4212e] text-[18px] font-semibold text-center'>Leave Conversation</span>
      </button>
    </Fragment>
  )


  return (
    <div className='s8:w-[70%] w-[100%] border-l flex mb-[60px] s5:mb-0'>
      <div className={'min-w-[380px] border-r h-full grow s11:grow-0 ' + (chats.activeChat !== null && w < 1100 ? "hidden" : "block")}>
          <div className='flex p-3 justify-between items-center'>
            <span className='text-[18px] font-bold font-chirp'>Messages</span>
            <div className='flex w-[10%] justify-around'>
              <div className='p-1.5 hover:bg-[#000000]/[.1] rounded-full cursor-not-allowed'>
                <SettingsIcon />
              </div>
            </div>
          </div>
          <div className='my-4 px-3'>
            <div className={'flex py-2.5 my-2 items-center rounded-full border px-4 bg-[#ffffff] ' + (focused ? 'border-[#1d9bf0]' : '')}>
                <SearchIcon picked={[false,"Explore"]} color={focused ? "#1d9bf0" : "#808080"} size={"16"}/>
                <input onChange={(e)=>{setSearch(e.target.value)}} value={search} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} placeholder='Search Direct Messages' className={'bg-transparent ml-3 focus:outline-none text-sm text-[#0f1419]'}/>
            </div>
          </div>
          <div className='messages'>
            {chats.last !== undefined ? chats.chats.map((chat, index)=>(
              <div className={'cursor-pointer w-full border-[#1d9bf0] p-3 flex items-center' + (chat.id === chats.activeChat ? " border-r bg-[#97d0f7]/[.1]" : "")} key={index} id={chat.id} onClick={()=>{extractMessages(chat.id)}}>
                <div className='mr-2'>
                  <div className='w-[38px] h-[38px] bg-[#000000] rounded-full'></div>
                </div>
                <div className='leading-6'>
                  <div>
                    <span className='text-[#000000] mr-1 font-semibold tracking-tight'>{chat.user.name.length > 12 ? (chat.user.name.slice(0,12) + "...") : chat.user.name}</span>
                    <span className='text-[#536471] font-chirp text-md tracking-tighter'>@{chat.user.username.length > 12 ? (chat.user.username.slice(0,12) + "...") : chat.user.username}</span>
                    <span className='text-[#536471] font-chirp tracking-tighter'> · {formatCustomDate(chat.chat.updatedAt)}</span>
                  </div>
                  <span className='text-[15px] font-chirp'>{"hello" > 40 ? ("hello".slice(0,37) + "...") : "hello"}</span>
                </div>
              </div>
            )): loadingIcon}
          </div>
      </div>
      <div className={'s11:w-[590px] w-full border-r h-full relative ' + (w > 1100 || chats.activeChat !== null ? "block" : "hidden")}>
        {convoInfo ? conversationInfo({"name": "DemianRTG", "username": "DemianRTG"}) : chats.activeChat !== null ? conversation({"name": "DemianRTG", "username": "DemianRTG"}) : ""}
      </div>
    </div>
  );
}

export default Messages;
