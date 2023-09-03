import ChoiceButtons from '../../../components/buttons/choice';
import IconTwitter from '../../../components/icons/logos/twitter-icon';
import SlideMenu from '../../../components/menu/menu-types/slide-menu-sm';
import HomePost from '../../../components/posts/home-post';
import DisplayPost from '../../../components/posts/displayposts';

function Main({setOpened, opened, w}) {

  const localChoices = ["For you", "Following"]
  
  return (
        <div className='s10:w-[35%] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto relative'>
          {opened ? <SlideMenu opened={opened} setOpened={setOpened}/> : ""}
          <div className='bg-[#ffffff]/[.9] w-[100%]'>
            <div className='w-full py-2 px-2'>
              <h1 className='ml-1 text-[18px] text-400 font-bold hidden s5:block mr-4'>Home</h1>
              <div className='block s5:hidden px-2 flex items-center pb-2'>
                <div className='w-[46.5%]'>
                  <div className='bg-[#000000] h-[30px] w-[30px] rounded-full' onClick={()=>{setOpened(true)}}></div>
                </div>
                <div>
                  <IconTwitter clas={"w-[25px]"}/>
                </div>
              </div>
            </div>
            <ChoiceButtons choices={localChoices}/>
          </div>
          {w >= 500 ? <HomePost/> : ""}
          <DisplayPost />
        </div>
  );
}

export default Main;
