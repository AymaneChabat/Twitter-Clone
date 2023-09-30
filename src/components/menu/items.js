function Menu({data, picked}) {
    return (
            <div className='group py-0.5'>
                <span className='inline-flex items-center group-hover:bg-[#0f1419]/[.1] text-[#3B3F43] rounded-full transition-all duration-200 font-medium text-lg font-chirp'>
                    <div className="p-2">{data[0]}</div>
                    <span className={picked.toLowerCase() === data[1].toLowerCase() ? "ml-1 text-400 font-bold hidden s13:block mr-4" : "ml-1 text-400 text-gray-600 font-normal hidden s13:block mr-4"}>{data[1]}</span>
                </span>
            </div>
    );
  }
  
  export default Menu;
  