import FollowProfile from "./whotofollow";
import { Link } from "react-router-dom";
function FollowProfileList({profiles}) {
    return (
        <div className='w-full h-auto my-2 bg-[#f7f9f9] pt-3 rounded-2xl'>
            <h1 className='font-bold px-4 text-[23px] font-chirp'>Who to follow</h1>
            <div className='my-1'>
                {profiles.map((profile, index)=>(
                    <FollowProfile key={index} data={profile}/>
                ))}
            </div>
            <div className="hover:bg-[#000000]/[.1] py-3 rounded-b-2xl cursor-pointer">
                <Link to={"/explore"}>
                    <span className='text-[#1d9bf0] px-4'>Show more</span>
                </Link>
            </div>
        </div>
    );
  }
  
  export default FollowProfileList;
  