import { UploadImage } from "../../components/icons/profile";
import { DeleteIcon } from "../../components/icons/posts";
import CredentialInput from '../../components/inputs/credentials';
import ReactFileReader from 'react-file-reader';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";


function UpdateUser({setUpdating, user}) {

    const dispatch = useDispatch()
    const currUser = useSelector(state => state.currUser)
    const [banner, setBanner] = useState({url: user.banner})
    const [pp, setPP] = useState({url: user.profilepicture})
    const info = useRef({name: "", bio: ""})

  const handleFilesPP = files => {
    setPP({file: files.fileList[0], url: files.base64})
  }

  const handleFilesBanner = files => {
    setBanner({file: files.fileList[0], url: files.base64})
  }

  const updateUserData = () => {
    const updatedData = {}
    if (info.current.name !== "" && info.current.name !== user.name) {
        updatedData["name"] = info.current.name
    }
    if (info.current.bio !== user.description) {
        updatedData["description"] = info.current.bio
    }
    if (banner.file !== undefined) {
        updatedData["banner"] = banner.file
    }
    if (pp.file !== undefined) {
        updatedData["profilepicture"] = pp.file
    }

    if (JSON.stringify(updatedData) !== "{}") {
        dispatch(updateUser(currUser.token, updatedData, currUser.user))
    }

    setUpdating(false)
  }

  return (
    <div className="absolute w-full h-full bg-[#000000]/[.7] z-50 flex justify-center items-center dark:bg-[#ffffff]/[.2] " onMouseDown={()=>{setUpdating(false)}}>
        <div className="bg-[#ffffff] s7:w-[580px] s7:h-[620px] h-full w-full s7:rounded-lg relative dark:bg-[#000000] animate-fade-in" onMouseDown={(e)=>{e.stopPropagation()}}>
            <div className="flex justify-between items-center p-2.5">
                <button className="hover:bg-[#000000]/[.1] p-2 rounded-full" onClick={()=>{setUpdating(false)}}>
                    <DeleteIcon />
                </button>
                <span className="text-[20px] w-[75%] font-chirp font-bold py-2 dark:text-[#ffffff]">
                    Edit profile
                </span>
                <button className="bg-[#000000] text-[#ffffff] py-1 px-4 rounded-full dark:border dark:hover:bg-[#ffffff]/[.1]" onClick={updateUserData}>
                    Save
                </button>
            </div>
            <div className={" w-full h-[200px] flex justify-center items-center bg-no-repeat bg-cover bg-center"} style={{backgroundImage:`url("${banner.url}")`}}>
                <ReactFileReader handleFiles={handleFilesBanner} multipleFiles={false} base64={true}>
                    <div className="p-3 hover:bg-[#000000]/[.2] rounded-full cursor-pointer bg-[#000000]/[.5] transition duration-300">
                        <UploadImage w={20}/>
                    </div>
                </ReactFileReader>
                {banner.url !== user.banner ? (
                    <button className="hover:bg-[#ffffff]/[.8] p-3 rounded-full cursor-pointer bg-[#000000]/[.5] ml-3 transition duration-300" onClick={()=>{setBanner({url: user.banner})}}>
                        <DeleteIcon />
                    </button>
                ) : ""}
            </div>
            <div className="absolute top-[195px] w-full">
                <div className="w-[130px] h-[130px] rounded-full border-4 mx-5 flex justify-center items-center border-[#ffffff] bg-no-repeat bg-cover bg-center dark:border-[#000000]" style={{backgroundImage:`url("${pp.url}")`}}>
                    <ReactFileReader handleFiles={handleFilesPP} multipleFiles={false} base64={true}>
                        <div className="p-3 hover:bg-[#000000]/[.2] rounded-full cursor-pointer bg-[#000000]/[.5] transition duration-300">
                            <UploadImage w={20}/>
                        </div>
                    </ReactFileReader>
                    {pp.url !== user.profilepicture ? (
                        <button className="hover:bg-[#ffffff]/[.8] p-3 rounded-full cursor-pointer bg-[#ffffff]/[.5] ml-3 transition duration-300" onClick={()=>{setPP({url: user.profilepicture})}}>
                            <DeleteIcon />
                        </button>
                    ) : ""}
                </div>
                <div className="mx-5 my-4">
                    <CredentialInput placeholder="Name" ref={info} refKey={"name"} defaultVal={user.name}/>
                </div>
                <div className="mx-5 my-6">
                    <CredentialInput placeholder="Bio" ref={info} refKey={"bio"} textarea={true} defaultVal={user.description}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UpdateUser;
