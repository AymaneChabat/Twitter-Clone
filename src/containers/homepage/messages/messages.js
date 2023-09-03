import { useState } from 'react';
import SettingsIcon from '../../../components/icons/menu/settings';
import SearchIcon from '../../../components/icons/menu/search';
import Dots from '../../../components/icons/menu/dots';
import FileIcon from '../../../components/icons/posts/files';
import SendIcon from '../../../components/icons/messages/send';
import DeleteIcon from '../../../components/icons/posts/delete';
import DetailsIcon from '../../../components/icons/messages/details';
import BackArrowIcon from '../../../components/icons/messages/backArrow';
import ReactFileReader from 'react-file-reader';

function Messages() {

  const [images,setImages] = useState("")
  const [search,setSearch] = useState('')
  const [focused,setFocused] = useState(false)
  const [activeChat,setActiveChat] = useState(0)
  const [newMessage, setNewMessage] = useState("")
  const [chatOverflow, setChatOverflow] = useState(0)
  const [convoInfo,setConvoInfo] = useState(false)

  const handleFiles = files => {
    setImages(files.base64)
  }

  const chats = [
    {
      chatId: "0",
      profileP: "#000000",
      name: "mehdisadir",
      username: "silentgh00st",
      lastupdate: "May 11",
      lastmessage: "And this is a critical vulnerability too"
    },
    {
      chatId: "1",
      profileP: "#000000",
      name: "HackerOnedzadzadazdazd",
      username: "Hacker0x01adazdazdazdzad",
      lastupdate: "Apr 26",
      lastmessage: "what is the cvss for an attack that stakerl ezalkj"
    },
    {
      chatId: "2",
      profileP: "#000000",
      name: "DemianRTG",
      username: "DemianRTG",
      lastupdate: "Jan 18",
      lastmessage: "But thanks for the offer"
    }
  ]


  const messages = {
      "0": [{
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "hey guys I need help in one of my reports",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "I really can help you just text me",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "no I cant say thank you bruh",
        sentAt: "Apr 3, 2023, 12:31PM"
      }],
      "1": [{
        sender: 0,
        content: "yeah whatsap",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "I really can help you just text me",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "yeah whatsap",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "I really can help you just text me",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "yeah whatsap",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "I really can help you just text me",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "I really can help you just text me",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "I really can help you just text me",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "no I cant say thank you bruh",
        sentAt: "Apr 3, 2023, 12:31PM"
      }],
      "2": [{
        sender: 0,
        content: "no whats apo",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "yessir i can help you",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 1,
        content: "I really can help you just text me",
        sentAt: "Apr 3, 2023, 12:31PM"
      },
      {
        sender: 0,
        content: "no I cant say thank you bruh",
        sentAt: "Apr 3, 2023, 12:31PM"
      }]
    }

  const Sent = messageInfo => (
    <div className='group w-auto flex flex-col items-end mb-2'>
      <div className='inline-flex w-auto max-w-[70%] items-center'>
        <div className='mr-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full hidden group-hover:block cursor-pointer'>
          <Dots w={14} />
        </div>
        <div className='bg-[#0a95f2] font-chirp px-4 py-2 rounded-l-[24px] rounded-tr-[24px] rounded-br-[4px]'>
          <div className='w-[100%] inline'>
            <span className='text-[#ffffff]'>{messageInfo.content}</span>
          </div>
        </div>
      </div>
      <div className='text-[#536471] font-chirp text-[14px] tracking-tighter mt-1'>
        {messageInfo.sentAt} · Sent
      </div>
    </div>
  )

  const Received = messageInfo => (
    <div className='group w-auto flex flex-col items-start mb-2'>
      <div className='inline-flex w-auto max-w-[70%] items-center'>
        <div className='bg-[#daeff5]/[.3] font-chirp px-4 py-2 rounded-r-[24px] rounded-tl-[24px] rounded-bl-[4px]'>
          <div className='w-[100%] inline'>
            <span className='text-[#000000]'>{messageInfo.content}</span>
          </div>
        </div>
        <div className='ml-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full hidden group-hover:block cursor-pointer'>
          <Dots w={14} />
        </div>
      </div>
      <div className='text-[#536471] font-chirp text-[14px] tracking-tighter mt-1'>
        {messageInfo.sentAt} · Received
      </div>
    </div>
  )

  const scrollDetect = (e) => {
    if (chatOverflow === 0 && e.currentTarget.scrollTop > 0) {
      setChatOverflow(e.currentTarget.scrollTop)
    } else if (chatOverflow > 0 && e.currentTarget.scrollTop === 0) {
      setChatOverflow(0)
    }
  }

  const conversation = (data) => (
  <>
    <div className='h-[5%] w-full px-3 py-2'>
      <div className='flex justify-between w-full bg-[#ffffff] h-full items-center'>
        <div className='flex items-center'>
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
      {messages[activeChat].map((message)=>(
        message.sender === 0 ? Sent(message) : Received(message)
      ))}
    </div>
    <div className='w-full min-h-[5%] bottom-0 flex items-center border-t grow absolute bg-[#ffffff]'>
      <div className='ml-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full cursor-pointer'>
        <ReactFileReader handleFiles={handleFiles} multipleFiles={false} base64={true}>
          <FileIcon />
        </ReactFileReader>
      </div>
      <div className='flex py-2.5 items-center px-4 grow bg-[#ffffff]'>
        <div className='grow relative'>
          <div contentEditable={true} className='bg-transparent focus:outline-none text-sm text-[#0f1419] grow break-word' onInput={(e)=>{setNewMessage(e.target.innerHTML)}}></div>
            {images !== "" ? (
            <div className='relative'>
              <div className='absolute text-center bg-[#000000] rounded-full p-1 right-1 top-1 hover:bg-[#000000]/[.7] cursor-pointer' onClick={()=>{setImages("")}}>
                  <DeleteIcon />
              </div>
              <img src={images}/>
            </div>
            ) : ""}
            {newMessage === "" && images === "" ? (<div className='text-[#000000]/[.6] text-sm font-chirp absolute pointer-events-none top-0'>Start a new message</div>) : ""}
        </div>
        <div className={newMessage === "" ? 'pointer-events-none cursor-not-allowed ml-2' : "cursor-pointer ml-2"}>
          <SendIcon w={18}/>
        </div>
      </div>
    </div>
  </>
  )

  const conversationInfo = (data) => (
    <>
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
          <button className='bg-[#000000] text-[#ffffff] font-twitterchirp font-bold py-2 px-5 rounded-full hover:bg-[#000000]/[.8] transition-all transition-300'>Follow</button>
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
      <div className='text-center py-4 hover:bg-[#1d9bf0]/[.1] cursor-not-allowed'>
        <span className='text-[#1d9bf0] text-[18px] font-semibold'>Block @{data.username}</span>
      </div>
      <div className='text-center py-4 hover:bg-[#f4212e]/[.1] cursor-pointer'>
        <span className='text-[#f4212e] text-[18px] font-semibold text-center'>Leave Conversation</span>
      </div>
    </>
  )


  return (
    <div className='s8:w-[70%] w-[100%] border-l flex'>
      <div className='min-w-[380px] border-r h-full grow s11:grow-0'>
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
            {chats.map((chat, index)=>(
              <div className={'cursor-pointer w-full border-[#1d9bf0] p-3 flex items-center' + (chat.chatId === activeChat ? " border-r bg-[#97d0f7]/[.1]" : "")} key={index} id={chat.chatId} onClick={()=>{setActiveChat(chat.chatId)}}>
                <div className='mr-2'>
                  <div className='w-[38px] h-[38px] bg-[#000000] rounded-full'></div>
                </div>
                <div className='leading-6'>
                  <div>
                    <span className='text-[#000000] mr-1 font-semibold tracking-tight'>{chat.name.length > 12 ? (chat.name.slice(0,12) + "...") : chat.name}</span>
                    <span className='text-[#536471] font-chirp text-md tracking-tighter'>@{chat.username.length > 12 ? (chat.username.slice(0,12) + "...") : chat.username}</span>
                    <span className='text-[#536471] font-chirp tracking-tighter'> · {chat.lastupdate}</span>
                  </div>
                  <span className='text-[15px] font-chirp'>{chat.lastmessage.length > 40 ? (chat.lastmessage.slice(0,37) + "...") : chat.lastmessage}</span>
                </div>
              </div>
            ))}
          </div>
      </div>
      <div className='min-w-[590px] border-r h-full relative hidden s11:block '>
        {convoInfo ? conversationInfo({"name": "DemianRTG", "username": "DemianRTG"}) : conversation({"name": "DemianRTG", "username": "DemianRTG"})}
      </div>
    </div>
  );
}

export default Messages;
