
function FollowProfile({data}) {
  return (
            <div className='flex justify-between items-center hover:bg-[#000000]/[.1] cursor-pointer px-4 py-2'>
                <div className='w-[37px] h-[37px] rounded-full bg-no-repeat bg-cover'  style={{backgroundImage: `url("${data[0]}")`}}></div>
                <div className='flex flex-col w-[70%] leading-5'>
                    <span className='font-bold text-[15px] font-chirp'>{data[1]}</span>
                    <span className='text-[14px] font-chirp text-[#000000]/[.8]'>@{data[2]}</span>
                </div>
                <div className='bg-[#000000] px-4 py-1 rounded-full flex justify-center'>
                    <a className='text-[#ffffff] font-chirp font-semibold text-[13px]'>Follow</a>
                </div>    
            </div>
  );
}

export default FollowProfile;
