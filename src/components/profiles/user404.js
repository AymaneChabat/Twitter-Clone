import { useNavigate } from "react-router";
import { BackArrowIcon } from "../icons/messages";

export default function User404 ({setFullScreen, username}) {
    const navigate = useNavigate()
    return (
        <div className="box-border s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto relative mb-[60px] s6:mb-0">
            <div className="w-full box-border px-3 h-[60px] flex items-center justify-between bg-transparent z-50">
            <div
                className="p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer"
                onClick={()=>navigate(-1)}
            >
                <BackArrowIcon w={20} />
            </div>
            <div className="leading-6 w-[90%]">
                <h1 className="flex mr-1 cursor-default">
                <span
                    id="name"
                    className="font-bold text-[16px] mr-1.5 dark:text-[#ffffff]"
                >
                    Profile
                </span>
                </h1>
            </div>
            </div>
            <div className="relative">
            <div
                className="w-full h-[260px] bg-cover bg-no-repeat hover:brightness-75 transition-all duration-300 relative cursor-pointer"
                style={{
                backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-banner.png?alt=media&token=9c871edd-35ca-43c2-8e2f-4076775e7135")`,
                }}
                onClick={() => {
                setFullScreen(
                    "https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-banner.png?alt=media&token=9c871edd-35ca-43c2-8e2f-4076775e7135"
                );
                }}
            ></div>
            <div className="absolute w-full h-[155px] s6:top-[180px] top-[160px] flex justify-between items-end px-5 pointer-events-none">
                <div className="s6:w-[155px] s6:h-[155px] rounded-full border-4 border-[#ffffff] w-[100px] h-[100px] bg-cover bg-no-repeat bg-center overflow-hidden dark:border-[#000000]">
                <img
                    className="hover:brightness-75 z-50 transition-all duration-300 cursor-pointer h-full w-full pointer-events-auto"
                    onClick={() => {
                    setFullScreen(
                        "https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-profile.png?alt=media&token=38761a1a-ce9c-4356-9589-96a70069e795"
                    );
                    }}
                    src={
                    "https://firebasestorage.googleapis.com/v0/b/realchat-4fd5d.appspot.com/o/default-profile.png?alt=media&token=38761a1a-ce9c-4356-9589-96a70069e795"
                    }
                />
                </div>
            </div>
            <div className="w-full s6:mt-[100px] mt-[80px] px-6 leading-6">
                <span className="text-[#000000] dark:text-[#ffffff] text-[20px] font-bold">
                @{username}
                </span>
            </div>
            <div className="mx-auto w-[55%] mt-8">
                <h1 className="text-[31px] dark:text-[#ffffff] font-bold">
                This account doesn't exist
                </h1>
                <span className="text-[#536471]">Try searching for another</span>
            </div>
            </div>
        </div>
    )
}