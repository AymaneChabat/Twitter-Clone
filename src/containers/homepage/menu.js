import { useState, useEffect } from "react";
import BottomMenuSM from "../../components/menu/menu-types/bottom-menu-sm";
import MainMenu from "../../components/menu/menu-types/main-menu";
import HomePost from "../../components/posts/home-post";
import { PostIcon } from "../../components/icons/menu";
import { BackArrowIcon } from "../../components/icons/messages";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

function FinalMenu({w}) {
  const theme = useSelector(state => state.color.theme)
  const [postOpen, setPostOpen] = useState(false)
  const location = useLocation();
  const [page, setPage] = useState(location.pathname.slice(1,))

  const bg = () => {
    switch (theme) {
      case "dim":
        return "bg-[#15202b]"
      case "dark":
        return "bg-[#000000]"
      default:
        return "bg-[#ffffff]"
    }
  }

  useEffect(() => {
    setPage(location.pathname.slice(1,));
    }, [location]);
    
  return (
    <>
        {postOpen ? (
            <div className={'absolute w-full h-full s7:bg-[#000000]/[.4] z-50 s7:pt-[200px] bg-[#ffffff] ' + (bg())} onMouseDown={()=>{setPostOpen(false)}}>
              <div className="px-4 py-2 s7:hidden" onClick={()=>{setPostOpen(false)}}>
                <BackArrowIcon w={20} />
              </div>
              <div className={'w-100% s7:w-[650px] rounded-lg border border-[#ffffff]/[.1] mx-auto ' + (bg())} onMouseDown={(e)=>e.stopPropagation()}>
                <HomePost floating={true} setPostOpen={setPostOpen}/>
              </div>
            </div>
          ) : ""}
        {w < 600 ? <BottomMenuSM /> : <MainMenu setPostOpen={setPostOpen} tab={(page.charAt(0).toUpperCase() + page.slice(1))}/> }
        {w < 600 && page === "home" ? (
          <div className='fixed right-4 bottom-[70px] z-20' onClick={()=>{setPostOpen(true)}}>
            <button type="button" class="text-white s13:w-[16rem] px-0.5 s13:px-0 s13:py-3 bg-[#1ca4ff] hover:bg-[#0292f2] font-medium rounded-full transition duration-300 text-md"><PostIcon /></button>
          </div>
        ) : ""}
    </>
  );
}

export default FinalMenu;
