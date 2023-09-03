import BackArrowIcon from "../../../components/icons/messages/backArrow";

function Profile() {

  return (
    <div className='s10:w-[35%] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto relative'>
          <div className="w-[full] px-3 h-[60px] border-b flex items-center justify-between">
            <div className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer">
                <BackArrowIcon w={20}/>
            </div>
            <div className="leading-6 w-[90%]">
                <h1 className="font-bold text-[22px]">a</h1>
                <span className="text-[#536471] font-chirp">25 posts</span>
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-[#cfd9de] h-[200px]"></div>
            <div className=""></div>
            <div></div>
          </div>
    </div>
  );
}

export default Profile;
