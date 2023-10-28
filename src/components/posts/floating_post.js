import { useSelector } from "react-redux";
import HomePost from "../../components/posts/home-post";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

export default function FloatingPost() {
    const theme = useSelector((state) => state.color.theme);
    const navigate = useNavigate()
    const floatPostVariants = {
        hidden: { marginTop: '-50px', opacity: 0 },
        visible: { marginTop: 0, opacity: 1 },
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

    return(
        <div
          className={`absolute w-full h-full top-0 left-0 s7:bg-[#000000]/[.4] z-50 s7:pt-[50px] bg-[#ffffff] ${bg()}`}
          onMouseDown={() => {
            navigate(-1)
          }}
        >
          <motion.div
            variants={floatPostVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`w-100% s7:w-[650px] rounded-lg border border-[#ffffff]/[.1] mx-auto ${bg()}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <HomePost floating={true} />
          </motion.div>
        </div>
    )
}