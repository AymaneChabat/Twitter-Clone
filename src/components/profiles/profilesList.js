import FollowProfile from "./whotofollow";
import { Link } from "react-router-dom";

function FollowProfileList({profiles}) {
    return (
        <div className='w-full h-auto my-2 bg-[#f7f9f9] pt-3 rounded-2xl'>
            <h1 className='font-bold px-4 text-[23px] font-chirp mb-2'>Who to follow</h1>
            {profiles.map((profile, index)=>(
                <FollowProfile key={index} data={profile}/>
            ))}
            <div className="group hover:bg-[#000000]/[.1] rounded-b-2xl px-4 py-4 cursor-pointer transition-all duration-300">
                <Link to={"/explore"}>
                    <span className='group-hover:underline text-[#1d9bf0]'>Show more</span>
                </Link>
            </div>
        </div>
    );
  }
  
  export default FollowProfileList;
  