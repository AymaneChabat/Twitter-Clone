import FollowProfile from "./whotofollow";

function FollowProfileList() {
    const profiles = [
        ["Ash Crypto", "@Ashcryptoreal"],
        ["steph", "@spnjxnsen"],
        ["SaitAlbania", "@thealpha_wolf1"]
      ]
    return (
        <div className='w-full h-auto my-2 bg-[#EFF3F4] pt-3 rounded-2xl'>
            <h1 className='font-bold px-4 text-[23px] font-chirp'>Who to follow</h1>
            <div className='my-1'>
                {profiles.map((profile, index)=>(
                    <FollowProfile key={index} data={profile}/>
                ))}
            </div>
            <div className="hover:bg-[#000000]/[.1] py-3 rounded-b-2xl cursor-pointer">
                <a className='text-[#1d9bf0] px-4 ' href='#'>Show more</a>
            </div>
        </div>
    );
  }
  
  export default FollowProfileList;
  