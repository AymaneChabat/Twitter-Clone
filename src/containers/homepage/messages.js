import { Fragment, useEffect, useState } from 'react';
import { SettingsIcon, SearchIcon, Dots } from '../../components/icons/menu';
import { FileIcon, DeleteIcon } from '../../components/icons/posts';
import { SendIcon, DetailsIcon, BackArrowIcon } from '../../components/icons/messages';
import LoadingIcon from '../../components/icons/loading';
import ReactFileReader from 'react-file-reader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, selectChat, removeChat, createChat } from '../../redux/actions/chatActions';
import { fetchMessages, sendMessage } from '../../redux/actions/messagesActions';
import { collection, query, getFirestore, where, onSnapshot } from 'firebase/firestore';
import app from "../../functions/config"
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const db = getFirestore(app)

function Messages({w}) {

  const params = useParams()
  const navigate = useNavigate()
  const [images,setImages] = useState("")
  const [search,setSearch] = useState('')
  const [focused,setFocused] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [chatOverflow, setChatOverflow] = useState(0)
  const [convoInfo,setConvoInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const currUser = useSelector(state=>state.currUser)
  const chats = useSelector(state=> state.chats)
  const users = useSelector(state => state.users)
  const currMessages = useSelector(state=>state.message)
  const activeUser = chats.chats.find(chat => chat.id === chats.activeChat) !== undefined ? users.activeprofiles.find(user => user.id === (chats.chats.find(chat => chat.id === chats.activeChat)).chat.participants.filter(participant => participant !== currUser.user)[0]) : ""
  const messages = chats.activeChat !== null ? currMessages.find(messages => messages.chat === chats.activeChat) : undefined

  useEffect(()=>{
    const messageDiv = document.querySelector("#newMessage")
    if (messageDiv) {
      messageDiv.addEventListener('keydown', (event) => {
        const sendButton = document.querySelector("#sendM");
        const keyCode = event.keyCode ? event.keyCode : event.which;
      
        if (keyCode === 13) {
          event.preventDefault();
          event.textContent +=

          sendButton.click()
        }
      });
    }
    
    const q = query(collection(db, "chats"), where("participants", "array-contains", currUser.user));
    onSnapshot(q, () => {
        dispatch(fetchChats(currUser.token, undefined, true))
    });
  }, [])

  useEffect(() => {
    let initialSnapshot = true; // Initialize the flag
  
    if (chats.activeChat !== null) {
      if (chats.activeChat.slice(0, 6) !== "sample") {
        const q = query(collection(db, "chats/" + chats.activeChat + "/messages"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (initialSnapshot) {
              // Ignore initial snapshot changes
              return;
            }
            if (change.type === "added") {
              dispatch(
                sendMessage(
                  undefined,
                  {
                    chatId: chats.activeChat,
                    message: { ...change.doc.data() },
                    id: change.doc.id,
                  },
                  "snapshot"
                )
              );
            }
          });
      
          // After processing the initial snapshot, set the flag to false
          initialSnapshot = false;
        });
  
        // Cleanup function
        return () => {
          unsubscribe(); // Unsubscribe when the component unmounts
        };
      }
    }
  }, [chats.activeChat]);
  

  const handleFiles = files => {
    setImages(files.base64)
  }

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

  useEffect(()=>{
    if (params.chat !== undefined) {
      dispatch(selectChat(params.chat));
    } else {
      dispatch(selectChat(null));
    }
    if (messages === undefined && chats.activeChat !== null) {
      dispatch(fetchMessages(currUser.token, chats.activeChat))
    }
  }, [params.chat, chats.activeChat])
  
  const Sent = (messageInfo, index) => (
    <div key={index} className='group w-auto flex flex-col items-end mb-2'>
      <div className='inline-flex w-auto max-w-[70%] items-center'>
        <div className='mr-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300'>
          <Dots w={14} />
        </div>
        <div className='bg-[#0a95f2] font-chirp px-4 py-2 rounded-l-[24px] rounded-tr-[24px] rounded-br-[4px]'>
          <span className='text-[#ffffff]'>{messageInfo.message.content}</span>
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
        <div className='bg-[#daeff5]/[.3] dark:bg-[#2f3336] px-4 py-2 rounded-r-[24px] rounded-tl-[24px] rounded-bl-[4px]'>
          <div className='w-[100%] inline'>
            <span className='text-[#000000] dark:text-[#ffffff]'>{messageInfo.message.content}</span>
          </div>
        </div>
        <div className='ml-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duuration-300'>
          <Dots w={14} />
        </div>
      </div>
      <div className='text-[#536471] text-[14px] tracking-tighter mt-1'>
        {formatCustomDate(messageInfo.message.sentAt)} · Received
      </div>
    </div>
  )

  const conversation = (data) => (
    <Fragment>  
      <div className='h-[95%] overflow-auto shrink transition-all duration-300 px-3' id='chat' onScroll={scrollDetect}>
        <div className='w-full py-2 h-[5%] sticky top-0 bg-transparent bg-blur backdrop-blur-sm'>
          <div className='flex justify-between w-full h-full items-center'>
            <div className='flex items-center'>
              <Link to={"/messages"}>
                <div className='block s11:hidden mr-3'>
                  <BackArrowIcon w={20}/>
                </div>
              </Link>
              {chatOverflow > 0 && (
              <>
                <div className='w-[30px] h-[30px] bg-[#000000] rounded-full'></div>
                <span className='font-semibold tracking-tight ml-2 dark:text-[#ffffff]'>{data.info.name}</span>
              </>
              )}
            </div>
            <div className='p-1.5 hover:bg-[#000000]/[.1] rounded-full cursor-pointer' onClick={()=>{setConvoInfo(true)}}>
              <DetailsIcon w={18}/>
            </div>
          </div>
        </div>
        <div className='h-auto w-full flex flex-col items-center mb-8'>
          <div className='p-4 w-full'>
            <div className='w-full flex justify-center'>
              <div className='h-[50px] w-[50px] rounded-full bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url("${data.info.profilepicture}")`}}></div>
            </div>
            <h1 className='text-[#000000] mr-1 font-semibold tracking-tight w-full text-center dark:text-[#ffffff]'>{data.info.name}</h1>
            <h3 className='text-[#536471] text-[16px] tracking-tighter w-full text-center'>@{data.info.username}</h3>
          </div>
          <p className='font-twitterchirp text-[14px] w-[70%] text-center dark:text-[#ffffff]'>{data.info.description}</p>
          <span className='text-[#536471] text-[14px] tracking-tighter mt-2'>Joined May 2018 · 3,551 Followers</span>
        </div>
        {!loading ? (messages && messages.messages.map((message, index)=>(
          message.message.sender === currUser.user ? Sent(message, index) : Received(message, index)
        ))): <LoadingIcon />}
      </div>
      <div className='w-full min-h-[5%] bottom-0 flex items-center border-t border-[#1d9bf0]/[.1] grow absolute bg-[#ffffff] dark:bg-[#16181c]'>
        <ReactFileReader handleFiles={handleFiles} multipleFiles={true} base64={true}>
          <div className='ml-2 p-2 hover:bg-[#0a95f2]/[.2] rounded-full cursor-pointer'>
            <FileIcon />
          </div>
        </ReactFileReader>
        <div className='flex py-2.5 items-center px-4 grow bg-[#ffffff] dark:bg-transparent'>
          <div className='grow relative'>
            <div id='newMessage' contentEditable={true} className='dark:text-[#ffffff] bg-transparent focus:outline-none text-sm text-[#0f1419] grow break-word' onInput={(e)=>{setNewMessage(e.target.innerHTML)}}></div>
              {images !== "" ? (
              <div className='relative h-[150px] w-[150px] mt-2'>
                <div className='absolute text-center bg-[#ffffff] rounded-full p-1 right-1 top-1 hover:bg-[#000000]/[.7] cursor-pointer' onClick={()=>{setImages("")}}>
                    <DeleteIcon />
                </div>
                <img className='h-full w-full' src={images}/>
              </div>
              ) : ""}
              {newMessage === "" && images === "" && <div className='text-[#000000]/[.6] text-sm font-chirp absolute pointer-events-none top-0 dark:text-[#ffffff]/[.6]'>Start a new message</div>}
          </div>
          <div id='sendM' className={newMessage === "" ? 'pointer-events-none cursor-not-allowed ml-2' : "cursor-pointer ml-2"} onClick={()=>{
            const chatId = chats.activeChat;
            const messageData = {
              chatId,
              content: newMessage,
              media: [],
            };
          
            if (chatId.slice(0, 6) === "sample") {
              dispatch(createChat(currUser.token, activeUser.id, chatId, navigate, messageData));
            } else {
              dispatch(sendMessage(currUser.token, messageData));
            }
          
            setNewMessage("");
            document.querySelector("#newMessage").innerHTML = "";
          }}>
            <SendIcon w={18}/>
          </div>
        </div>
      </div>
    </Fragment>
  )

  const conversationInfo = (data) => (
    <Fragment>
      <div className='h-[5%] w-full py-2'>
        <div className='px-3 flex w-full h-full items-center'>
            <div className='rounded-full hover:bg-[#000000]/[.1] p-1.5 cursor-pointer' onClick={()=>{setConvoInfo(false)}}>
              <BackArrowIcon w={20}/>
            </div>
            <span className='font-bold ml-4 text-[20px] dark:text-[#ffffff]'>Conversation info</span>
        </div>
      </div>
      <div className='flex items-center hover:bg-blue-200/[.1] px-3 py-5 mt-4 cursor-pointer border-b border-[#536471]/[.1] transition-all duration-300'>
        <div className='w-[11%]'>
          <div className='w-[45px] h-[45px] rounded-full bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url("${data.info.profilepicture}")`}}></div>
        </div>
        <div className='w-[69%]'>
          <div className='flex flex-col leading-6'>
            <span className='text-[#000000] mr-1 font-semibold tracking-tight hover:underline dark:text-[#ffffff]'>{data.info.name}</span>
            <span className='text-[#536471] font-chirp text-md tracking-tighter'>@{data.info.username}</span>
          </div>
        </div>
        <div className='w-[20%]'>
          <button className='bg-[#000000] text-[#ffffff] font-twitterchirp font-bold py-2 px-5 rounded-full hover:bg-[#000000]/[.8] dark:bg-[#ffffff] dark:text-[#000000] dark:hover:brightness-75 transition-all duration-300'>Follow</button>
        </div>
      </div>
      <div className='p-3 border-b border-[#536471]/[.1]'>
        <h1 className='font-bold dark:text-[#ffffff] text-[23px]'>Notifications</h1>
        <div className='flex items-center justify-between mt-4 mb-2'>
          <span className='text-[#536471] font-chirp text-lg tracking-tighter'>Snooze notifications from &nbsp;&nbsp;{data.info.name}</span>
          <label class="relative inline-flex items-center cursor-not-allowed">
            <input type="checkbox" value="" class="sr-only peer" disabled/>
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <button className='text-center py-4 hover:bg-[#1d9bf0]/[.1] cursor-not-allowed w-full transition-all duration-300'>
        <span className='text-[#1d9bf0] text-[18px] font-semibold'>Block @{data.info.username}</span>
      </button>
      <Link to={"/messages"}>
        <button className='text-center py-4 hover:bg-[#f4212e]/[.1] cursor-pointer w-full transition-all duration-300' onClick={()=>{setConvoInfo(false);dispatch(removeChat(currUser.token, chats.activeChat))}}>
          <span className='text-[#f4212e] text-[18px] font-semibold text-center'>Leave Conversation</span>
        </button>
      </Link>
    </Fragment>
  )


  return (
    <section className='s8:w-[70%] w-[100%] border-l flex mb-[60px] s6:mb-0 max-h-[93%] s6:max-h-[100%] s6:h-auto border-[#1d9bf0]/[.1] dark:border-[#ffffff]/[.3]'>
      <div className={'s7:w-[380px] border-r h-full grow s11:grow-0 border-[#1d9bf0]/[.1] dark:border-[#ffffff]/[.3] ' + (chats.activeChat !== null && w < 1100 ? "hidden" : "block")}>
          <div className='flex p-3 justify-between items-center'>
            <span className='text-[18px] font-bold dark:text-[#ffffff]'>Messages</span>
            <div className='flex w-[10%] justify-around'>
              <div className='p-1.5 hover:bg-[#000000]/[.1] rounded-full cursor-not-allowed'>
                <SettingsIcon />
              </div>
            </div>
          </div>
          <div className='my-4 px-3'>
            <div className={'flex py-2.5 my-2 items-center rounded-full border px-4 bg-[#ffffff] dark:bg-[#16181c] dark:border-[#000000] ' + (focused ? 'border-[#1d9bf0] ' : '')}>
                <SearchIcon picked={[false,"Explore"]} color={focused ? "#1d9bf0" : "#808080"} size={"16"}/>
                <input onChange={(e)=>{setSearch(e.target.value)}} value={search} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} placeholder='Search Direct Messages' className='bg-transparent ml-3 focus:outline-none text-sm text-[#0f1419] dark:text-[#ffffff]'/>
            </div>
          </div>
          <div className='messages'>
            {chats.chats.length > 0 && chats.chats.map((chat, index)=>{
              const user = users.activeprofiles.find(user => user.id === chat.chat.participants.filter(participant => participant !== currUser.user)[0])
              return(
              <Link to={"/messages/"+chat.id}>
                <div className={'cursor-pointer w-full border-[#1d9bf0] p-3 flex items-center ' + (chat.id === chats.activeChat ? "border-r bg-[#97d0f7]/[.1]" : "")} key={index} id={chat.id}>
                  <div className='mr-2'>
                    <div className='w-[38px] h-[38px] rounded-full bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url("${user.info.profilepicture}")`}}></div>
                  </div>
                  <div className='leading-6 block'>
                    <div className='flex'>
                      <div className='s7:max-w-[80px] max-w-[140px] overflow-hidden relative block text-ellipsis whitespace-nowrap dark:text-[#ffffff]'>
                        <span className='text-[#000000] mr-1 tracking-tight dark:text-[#ffffff] '>{user.info.name}</span>
                      </div>
                      <div className='s7:max-w-[80px] max-w-[140px] overflow-hidden relative block text-ellipsis whitespace-nowrap mr-1 dark:text-[#536471]'>
                        <span className='text-[#536471] font-chirp text-md tracking-tighter'>@{user.info.username}</span>
                      </div>
                      <div className='overflow-hidden relative block text-ellipsis whitespace-nowrap'>
                        <span className='text-[#536471] font-chirp tracking-tighter'> · {formatCustomDate(chat.chat.updatedAt)}</span>
                      </div>
                    </div>
                    <div className='s7:max-w-[300px] max-w-[350px] overflow-hidden relative block text-ellipsis whitespace-nowrap'>
                      <span className='text-[15px] dark:text-[#ffffff]'>hello</span>
                    </div>
                  </div>
                </div>
              </Link>
            )})}
          </div>
      </div>
      <div className={'s11:w-[590px] w-full border-r h-full relative border-[#1d9bf0]/[.1] dark:border-[#ffffff]/[.3] ' + (w > 1100 || chats.activeChat !== null ? "block" : "hidden")}>
        {activeUser.id !== undefined && (convoInfo ? conversationInfo(activeUser) : chats.activeChat !== null ? conversation(activeUser) : "")}
      </div>
    </section>
  );
}

export default Messages;
