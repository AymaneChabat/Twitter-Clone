import CredentialInput from "../inputs/credentials";
import { motion } from "framer-motion";
import { updateUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { IconTwitter } from "../icons/logos";
import CredentialButton from "../buttons/credentials";

function UpdateUsername({ setUpdating, username }) {
    const dispatch = useDispatch()
    const currUser = useSelector(state => state.currUser)
    const credentials = useRef({ username: "" });


    const usernameVariants = {
        hidden: {
          scale: 0.8, 
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


    const updateUsername = () => {
        if (credentials.current.username !== username) {
          dispatch(
            updateUser(
              currUser.token,
              { username: credentials.current.username },
              currUser.user
            )
          );
        }
        setUpdating(false);
      };

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-[#ffffff] s6:bg-[#000000]/[.5] z-40 flex justify-center items-center dark:bg-[#ffffff]/[.4]"
      onMouseDown={() => [setUpdating(false)]}>
      <motion.div
        key="0" variants={usernameVariants} initial="hidden" animate="visible" exit="hidden" 
        className="w-full h-full bg-[#ffffff] flex justify-center items-center s6:h-[700px] s6:max-w-[500px] p-4 dark:bg-[#000000] rounded-xl animate-fade-in"
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="h-[90%] flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <IconTwitter clas={"w-[30px]"} />
            <div className="w-full py-5">
              <h1 className="text-[20px] mb-2 dark:text-[#ffffff]">
                Here you can change your username
              </h1>
              <CredentialInput
                placeholder="username"
                ref={credentials}
                refKey={"username"}
                defaultVal={username}
              />
            </div>
          </div>
          <div className="h-[100px] flex flex-col justify-between w-full">
            <CredentialButton text={"Set username"} action={updateUsername} />
            <CredentialButton
              text={"Cancel"}
              light={true}
              action={() => {
                setUpdating(false);
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateUsername;
