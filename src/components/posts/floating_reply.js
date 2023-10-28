
import { CloseIcon } from "../icons/posts";
import React from "react";
import { motion } from "framer-motion";
import HomePost from "./home-post";
import DisplayPost from "./displaypost";
import { useSelector } from "react-redux";

const FloatingReply = ({postPath, postList, setReplying}) => {
    const theme = useSelector((state) => state.color.theme);
    const floatReplyVariants = {
        hidden: { 
            marginTop: '-50px', 
            opacity: 0 
        },
        visible: { 
            marginTop: 0, 
            opacity: 1 
        },
    };

    const bg = () => {
        switch (theme) {
            case 'dim':
            return 'bg-[#15202b]';
            case 'dark':
            return 'bg-[#000000]';
            default:
            return 'bg-[#ffffff]';
        }
        };
    
    return (
        <div className="absolute w-full h-screen overflow-auto left-0 top-0 s7:bg-[#000000]/[.1] z-50 s7:py-[50px] bg-[#ffffff] dark:bg-[#000000]/[.4]" onMouseDown={()=>{setReplying(false)}}>
          <motion.div
            key={Math.random()}
            variants={floatReplyVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={'w-100% s7:w-[650px] rounded-lg border border-[#ffffff]/[.1] mx-auto bg-[#ffffff] overflow-hidden relative dark:' + bg()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className={"w-full flex items-center justify-between px-4 py-1 z-50 sticky top-0 h-[50px] bg-[#ffffff]/[.5] backdrop-blur-sm dark:" + bg()}>
                <button className="p-1 border rounded-full" onMouseDown={()=>{setReplying(false)}}>
                    <CloseIcon color={"#000000"}/>
                </button>
                <button className="dark:text-white">Drafts</button>
            </div>
            <DisplayPost main={true} postPath={postPath} postList={postList} floating={true}/>
            <HomePost floating={true} type={"reply"} postId={postPath} setReplying={setReplying}/>
          </motion.div>
        </div>
    )
} 

export default FloatingReply;