import { Link } from "react-router-dom";

function FollowProfile({data}) {
  return (
        <Link to={"/profile/"+ data[2]}>
            <div className='flex justify-between items-center hover:bg-[#7fc9fa]/[.1] cursor-pointer px-4 py-3 duration-300 transition-all'>
                <div className='w-[50px] h-[50px] rounded-full bg-no-repeat bg-cover'  style={{backgroundImage: `url("${data[0]}")`}}></div>
                <div className='flex flex-col w-[70%] leading-6'>
                    <span className='font-bold text-[17px] font-chirp'>{data[1]}</span>
                    <span className='text-[14px] font-chirp text-[#000000]/[.8]'>@{data[2]}</span>
                </div>
                <div className='bg-[#000000] px-4 py-1 rounded-full flex justify-center'>
                    <a className='text-[#ffffff] font-chirp font-semibold text-[15px]'>Follow</a>
                </div>    
            </div>
        </Link>
  );
}

export default FollowProfile;
