import SlideMenu from '../../components/menu/menu-types/slide-menu-sm';
import { useState } from 'react';
import SearchIcon from '../../components/icons/menu/search';
import SettingsIcon from '../../components/icons/menu/settings';
import ChoiceButtons from '../../components/buttons/choice';

function Explore({setOpened, opened}) {

  const [search, setSearch] = useState("")
  const [focused, setFocused] = useState(false)

  const localChoices = ["For you", "Trending", "News", "Sports", "Entertainment"]

  return (
        <div className='s10:w-[30%] s10:min-w-[600px] flex-grow border-l border-r border-[#1d9bf0]/[.1] overflow-auto mb-[60px] s5:mb-0'>
          {opened ? <SlideMenu opened={opened} setOpened={setOpened}/> : ""}
          <div>
            <div className='overflow-auto border-b'>
                <div className='flex justify-around items-center w-[100%]'>
                    <div className={'flex py-2 w-[85%] my-2 items-center rounded-full border-2 px-4 bg-['+(!focused ? "#EFF3F4] border-transparent" : "#ffffff] border border-[#1d9bf0]")}>
                        <SearchIcon picked={[false,"Explore"]} color={focused ? "#1d9bf0" : "#808080"} size={"20"}/>
                        <input onChange={(e)=>{setSearch(e.target.value)}} value={search} onFocus={()=>{setFocused(true)}} onBlur={()=>{setFocused(false)}} placeholder='Search' className='bg-transparent w-full ml-3 focus:outline-none font-chirp'/>
                    </div>
                    <div className='p-2 hover:bg-[#000000]/[.1] rounded-full cursor-pointer'>
                        <SettingsIcon />
                    </div>
                </div>
                <div>
                    <ChoiceButtons choices={localChoices}/>
                </div>
            </div>
          </div>
        </div>
  );
}

export default Explore;