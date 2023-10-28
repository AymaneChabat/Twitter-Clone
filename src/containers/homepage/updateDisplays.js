import { useSelector } from "react-redux";
import { IconTwitter } from "../../components/icons/logos";
import { motion } from 'framer-motion';
import { VerifiedIcon } from "../../components/icons/profile";
import { CheckMark } from "../../components/icons/dropdowns";
import { setBtnColor, setTheme } from '../../redux/actions/themeActions';
import { useDispatch } from "react-redux";
import TwitterButton from "../../components/buttons/twitterbutton";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateDisplay() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const colorsCode = ["#1d9bf0", "#ffd400", "#f91880", "#7856ff", "#ff7a00", "#00ba7c"]

  const bg = ["light", "dim", "dark"]

  const modes = {
    "light": ["Default", "#ffffff"],
    "dark": ["Lights out", "#000000"],
    "dim": ["Dim", "#15202b"]
  }

  const colors = {"#1d9bf0":"bg-[#1d9bf0]", "#ffd400":"bg-[#ffd400]", "#f91880":"bg-[#f91880]", "#7856ff":"bg-[#7856ff]", "#ff7a00":"bg-[#ff7a00]", "#00ba7c":"bg-[#00ba7c]"}

  const { color, theme } = useSelector(state => ({
    color: state.color.color,
    theme: state.color.theme
  }));

  const variants = {
    hidden: {
      scale: 0, 
      opacity: 0
    },
    visible: {
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.25
      }
    }
  }

  const updateThemeBody = () => {
    const body = document.body

    // First, remove all theme classes
    body.classList.remove('dark', 'dim', 'light', 'bg-[#000000]', 'bg-[#15202b]');

    // Decide on the theme to set
    if (localStorage.theme === 'dark') {
      body.classList.add('dark');
      body.classList.add('bg-[#000000]');
    } else if (localStorage.theme === 'dim') {
      body.classList.add('dark');
      body.classList.add('bg-[#15202b]');
    } else {
      // Default to light if neither 'dark' nor 'dim'
      body.classList.add('light');
    }
  };

  const updateColor = (e) => {
    localStorage.btnColor = e
    dispatch(setBtnColor(e))
  }

  const updateTheme = (e) => {
    dispatch(setTheme(e)); 
    localStorage.theme = e
    updateThemeBody()
  }
    
  return (
    <div className='w-full h-full absolute top-0 left-0 bg-[#000000]/[.2] z-40 flex justify-center items-center dark:bg-[#000000]/[.4]' onMouseDown={()=>{navigate(-1)}}>
      <motion.div key={"0"} variants={variants} initial='hidden' animate='visible' exit="hidden" className={'s6:w-[560px] s6:h-[500px] s6:max-h-[90%] flex items-center w-screen h-screen s6:rounded-2xl bg-['+ (modes[theme][1]) + ']'} onMouseDown={(e)=>{e.stopPropagation()}}>
        <div className='s6:w-full s6:h-full h-[70%] p-3 flex flex-col justify-between items-center'>
          <div className='text-center'>
            <h1 className='font-bold text-[20px] dark:text-[#ffffff]'>Customize your view</h1>
            <span className='text-[#536471] text-[14px] tracking-wider'>These settings affect all X accounts on this browser.</span>
          </div>
          <article className="h-auto w-[80%] px-3 py-3 flex transition-all duration-300 border dark:border-[#536471] rounded-xl">
            <div className='w-[12%]'>
              <div className="w-[42px] h-[42px] rounded-full bg-[#000000] flex justify-center items-center">
                <IconTwitter clas={'w-[27px] fill-[#ffffff]'}/>
              </div>
            </div>
            <div className="w-[88%]">
                <div className="flex w-full items-start justify-between">
                    <div className="group flex flex justify-center items-center">
                        <h1 className="flex mr-1" >
                            <span id="name" className="font-bold text-[15px] hover:underline mr-1.5 dark:text-[#ffffff]">X</span> 
                            <VerifiedIcon />
                        </h1>
                        <span className="text-[15px] text-[#71767b]">@X · 16m</span>
                    </div>
                </div>
                <p className="dark:text-[#ffffff] text-[#0f1419]/[.8] text-[15px] leading-[20px] break-words">
                    At the heart of X are short messages called posts -- just like this one -- which can include photos, videos, links, text, hashtags, and mentions like @X.
                </p>
            </div>
          </article>
          <div className='w-[90%] '>
            <h1 className='text-[#536471] text-[15px] mb-1 dark:text-white'>Color</h1>
            <ul className='flex justify-between items-center bg-[#1e2732] px-4 py-2 rounded-xl relative'>
              {colorsCode && colorsCode.map((C, index) => (
                <li index={index} className={"w-[40px] h-[40px] flex jusity-center items-center p-0.5 hover:border-[2px] rounded-full transition-all duration-100"} onClick={()=>{updateColor(C)}}>
                  <div className={'w-[100%] h-[100%] rounded-full flex justify-center items-center '+(colors[C])}>
                  {color === C && <div className='absolute z-40'>
                    <CheckMark color={"#ffffff] h-[25px] w-[25px"}/>
                  </div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-[90%]'>
            <h1 className='text-[#536471] text-[15px] mb-1 dark:text-white'>Background</h1>
            <ul className='grid s6:grid-cols-3 grid-rows-3 s6:grid-rows-1 bg-transparent rounded-xl relative w-full gap-0.5'>
              {bg && bg.map((bg, index) => (
                <li index={index} className={"group h-full flex justify-center items-center p-0.5 transition-all duration-100 py-6 border cursor-default bg-[" + (modes[bg][1]) + "]" + (theme === bg ? " border-[#00ba7c]  transition-all duration-300" : "")} onClick={()=>{updateTheme(bg)}}>
                  <div className='flex w-full justify-evenly items-center'>
                    <div className={'w-[20px] h-[20px] flex justify-center items-center rounded-full border ' + (theme === bg ? " bg-[#00ba7c] group-hover:border-[#00ba7c] transition-all duration-300" : "")}>
                      {theme === bg && <CheckMark color={"#ffffff] w-[20px] h-[20px"}/>}
                    </div>
                    <h1 className={"w-[50%] text-left text-sm " + (bg !== "light" ? "text-[#ffffff]" : "")}>{modes[bg][0]}</h1>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full'>
              <div className='mx-auto w-[80px] h-[35px]' onMouseDown={()=>{navigate(location.state.previousLocation)}}>
                <TwitterButton content={"Done"}/>
              </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 