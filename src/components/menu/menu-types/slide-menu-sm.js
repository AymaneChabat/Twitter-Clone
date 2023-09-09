import SMList from '../../../components/menu/sm-menu-list';
import Dropdowns from '../../../components/menu/dropdowns';

function SlideMenu({opened,setOpened}) {
  return (
    <div className={opened ? 'absolute h-full w-full bg-[#000000]/[.4] transition-all transition-300 z-[100] block' : 'absolute h-full w-full bg-[#000000]/[.4] transition-all transition-300 -translate-x-full z-[100] block'} onClick={()=>{setOpened(false)}}>
        <div className='flex flex-col h-[100%] w-[280px] bg-[#ffffff] overflow-y-auto' onClick={(e)=>{e.stopPropagation()}}>
            <div className='w-[90%] mx-auto mt-5'>
                <div>
                    <div className='flex justify-between'>
                        <div className='bg-[#000000] rounded-full h-[40px] w-[40px]'></div>
                        <div className='border-solid border rounded-full text-center h-[30px] w-[30px]'>
                            <span>+</span>
                        </div>
                    </div>
                    <div className='h-[30%] mb-[8px] mt-[8px]'>
                        <strong className='block text-[17px]'>a</strong>
                        <span className='text-[#536471] text-[15px] font-semibold'>@yesIwannachange</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='text-[15px] w-[38%]'>
                        <strong className='mr-[3px]'>17</strong><span className='text-[#536471] font-semibold'>Following</span>
                    </div>
                    <div className='text-[15px] w-[38%]'>
                        <strong className='mr-[3px]'>11</strong><span className='text-[#536471] font-semibold'>Followers</span>
                    </div>
                </div>    
            </div>
            <SMList />
            <Dropdowns />
        </div>
    </div>
  );
}

export default SlideMenu;
