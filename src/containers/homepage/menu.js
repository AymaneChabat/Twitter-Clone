import { useState, useEffect } from "react";
import BottomMenuSM from "../../components/menu/menu-types/bottom-menu-sm";
import MainMenu from "../../components/menu/menu-types/main-menu";
import HomePost from "../../components/posts/home-post";
import PostIcon from "../../components/icons/menu/post";
import BackArrowIcon from "../../components/icons/messages/backArrow";
import { useLocation } from "react-router";

function FinalMenu({w}) {

  const [postOpen, setPostOpen] = useState(false)
  const location = useLocation();
  const [page, setPage] = useState(location.pathname.slice(1,))

  
  useEffect(() => {
    setPage(location.pathname.slice(1,));
    }, [location]);
    
  return (
    <>
        {postOpen ? (
            <div className='absolute w-full h-full s7:bg-[#000000]/[.4] z-50 s7:pt-[200px] bg-[#ffffff]' onClick={()=>{setPostOpen(false)}}>
              <div className="px-4 py-2 s7:hidden" onClick={()=>{setPostOpen(false)}}>
                <BackArrowIcon w={20} />
              </div>
              <div className='w-100% s7:w-[650px] rounded-lg mx-auto bg-[#ffffff]' onClick={(e)=>e.stopPropagation()}>
                <HomePost floating={true} setPostOpen={setPostOpen}/>
              </div>
            </div>
          ) : ""}
        {w < 500 ? <BottomMenuSM /> : <MainMenu setPostOpen={setPostOpen} tab={(page.charAt(0).toUpperCase() + page.slice(1))}/> }
        {w < 500 && page === "home" ? (
          <div className='fixed right-4 bottom-[70px]' onClick={()=>{setPostOpen(true)}}>
            <button type="button" class="text-white s13:w-[16rem] px-0.5 s13:px-0 s13:py-3 bg-[#1ca4ff] hover:bg-[#0292f2] font-medium rounded-full transition duration-300 text-md"><PostIcon /></button>
          </div>
        ) : ""}
    </>
  );
}

export default FinalMenu;
