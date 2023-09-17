import UploadImage from "../../components/icons/profile/image";
import DeleteIcon from "../../components/icons/posts/delete";
import CredentialInput from '../../components/inputs/credentials';
import ReactFileReader from 'react-file-reader';
import { useRef, useState } from "react";


function UpdateUser({setUpdating, user}) {

    const [banner, setBanner] = useState({url: user.banner})
    const [pp, setPP] = useState({url: user.profilepicture})
    const name = useRef()
    const bio = useRef()

  const handleFilesPP = files => {
    setPP({file: files.fileList[0], url: files.base64})
  }

  const handleFilesBanner = files => {
    setBanner({file: files.fileList[0], url: files.base64})
  }

  return (
    <div className="absolute w-full h-full bg-[#000000]/[.7] z-50 flex justify-center items-center" onClick={()=>{setUpdating(false)}}>
        <div className="bg-[#ffffff] s7:w-[580px] s7:h-[620px] h-full w-full s7:rounded-lg relative" onClick={(e)=>{e.stopPropagation()}}>
            <div className="flex justify-between items-center p-2.5">
                <button className="hover:bg-[#000000]/[.1] p-2 rounded-full" onClick={()=>{setUpdating(false)}}>
                    <DeleteIcon />
                </button>
                <span className="text-[20px] w-[60%] font-chirp font-bold py-2">
                    Edit profile
                </span>
                <button className="bg-[#000000] text-[#ffffff] py-1 px-4 rounded-full font-chirp">
                    Save
                </button>
            </div>
            <div className={" w-full h-[200px] flex justify-center items-center bg-no-repeat bg-cover"} style={{backgroundImage:`url("${banner.url}")`}}>
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
                <div className="w-[130px] h-[130px] rounded-full border-4 mx-5 flex justify-center items-center border-[#ffffff] bg-no-repeat bg-cover" style={{backgroundImage:`url("${pp.url}")`}}>
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
                    <CredentialInput placeholder="Name" ref={name} defaultVal={user.name}/>
                </div>
                <div className="mx-5 my-6">
                    <CredentialInput placeholder="Bio" ref={bio} textarea={true} defaultVal={user.description}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UpdateUser;
