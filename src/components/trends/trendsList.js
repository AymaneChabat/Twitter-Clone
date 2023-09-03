import Dots from "../icons/menu/dots";

function TrendingList() {
    const trends = [
        ["1 · Football · Trending", "Ivan Jaime", "3,672"],
        ["2 · Football · Trending", "Taremi", "19.9K"],
        ["3 · Pop · Trending", "FC Porto", ""],
        ["4 · Football · Trending", "Young Boys", "3,476"],
        ["5 · Football · Trending", "#OnePieceNetflix", "12K"],
        ["6 · Trending ", "UCLdraw", "25.3K"],
        ["7 · UEFA Champions League · Trending", "Barcelona", "60.8K"],
        ["8 · UEFA Champions League · Trending", "Madrid", "60.8K"]
      ]

    return (
        <div className='w-full h-auto mb-4 pt-3 bg-[#EFF3F4] rounded-2xl'>
            <h1 className='font-bold px-4 text-[23px] font-chirp'>Portugal trends</h1>
            <div className='my-1'>
                {trends.map((trend, index)=>(
                    <div key={index} className='py-2 hover:bg-[#000000]/[.1] px-4 cursor-pointer'>
                        <div className='flex items-center justify-between'>
                            <span className='text-[13px] font-chirp text-[#536471]/[.8]'>{trend[0]}</span>
                            <Dots w={14}/>
                        </div>
                        <div className='leading-5'>
                            <h1 className='font-bold font-chirp text-[#000000]/[.9] tracking-tight m-0'>{trend[1]}</h1>
                            <span className='text-[#000000]/[.4] text-[13px] font-semibold'>{trend[2] !== "" ? trend[2]+" mentions" : ""}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-4 hover:bg-[#000000]/[.1] py-3 rounded-b-2xl cursor-pointer">
                <a className='text-[#1d9bf0]' href='#'>Show more</a>
            </div>
        </div>
    );
  }
  
  export default TrendingList;
  