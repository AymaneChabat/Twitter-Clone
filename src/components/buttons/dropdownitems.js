function DropdownItems({data}) {
  
  return (
            <div className='flex py-2 w-[100%] items-center'>
                {data[0]}
                <span className='font-medium text-[16px] text-[#000000]/[.7] -mb-0.5'>{data[1]}</span>
            </div>
  );
}

export default DropdownItems;
