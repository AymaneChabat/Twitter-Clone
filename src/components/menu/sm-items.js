function SMItem({data}) {
    return (
        <div className='py-0.5'>
            <span className='h-[56px] inline-flex items-center text-[#000000] text-[20px] font-google'>
                <div className="pl-0 pr-4">{data[0]}</div>
                <span className="ml-1 font-bold mr-4">{data[1]}</span>
            </span>
        </div>
    );
  }
  
  export default SMItem;
  